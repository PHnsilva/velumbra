import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule, SyntheticModule } from 'node:vm';
import { JSDOM } from 'jsdom';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Cabin from '../app/cabin.tsx';

const root = new URL('../', import.meta.url);

// Exercise the actual page and controller. Only graphics, sound and browser timing
// are excluded: these tests validate DOM flows, not visual or audio acceptance.
async function openCabin(t) {
  const html = renderToStaticMarkup(createElement(Cabin));
  const dom = new JSDOM(html, { url: 'https://velumbra.test/', runScripts: 'outside-only' });
  const { window } = dom;
  const context = dom.getInternalVMContext();
  t.after(() => window.close());
  window.matchMedia = () => ({ matches: false, addEventListener() {} });
  let timerId = 0;
  const timers = new Map();
  window.setTimeout = (callback, delay) => { const id = ++timerId; timers.set(id, {callback, delay}); return id; };
  window.clearTimeout = id => timers.delete(id);
  const panel = window.document.querySelector('#panel');
  panel.showModal = () => { panel.open = true; };
  panel.close = () => { panel.open = false; panel.dispatchEvent(new window.Event('close')); };

  const scene = new SyntheticModule(['createScene'], function () {
    this.setExport('createScene', () => ({ refresh() {} }));
  }, { context });
  const decks = new SourceTextModule(await readFile(new URL('src/decks.js', root), 'utf8'), {context});
  const controller = new SourceTextModule(await readFile(new URL('src/prologue.js', root), 'utf8'), {context});
  await controller.link(specifier => {
    if (specifier === './scene.js') return scene;
    if (specifier === './decks.js') return decks;
    throw new Error(`Unexpected dependency: ${specifier}`);
  });
  await controller.evaluate();
  const $ = selector => window.document.querySelector(selector);
  $('#silent-entry').click();
  for (const [id, timer] of timers) if (timer.delay <= 800) { timers.delete(id); timer.callback(); }
  assert.equal($('#intro').hidden, true);

  return {
    $, window,
    change(selector, value) {
      $(selector).value = value;
      $(selector).dispatchEvent(new window.Event('input', { bubbles: true }));
    },
    submit(selector) { $(selector).dispatchEvent(new window.Event('submit', {cancelable: true, bubbles: true})); },
    saved() { return JSON.parse(window.localStorage.getItem('velumbra.prologue.v1')).profile; },
  };
}

test('preserva nome e tratamento ao explorar e escolher outro baralho, sem salvar o rascunho', async t => {
  const app = await openCabin(t), { $ } = app;
  app.change('#table-name', 'Nome inicial'); app.submit('#table-form');
  app.change('#visitor-name', 'Nome revisado'); $('#treatment').value = 'feminine';
  $('#consult-decks').click(); $('#tab-lenormand').click(); $('#deck-choose').click();
  assert.equal($('#visitor-name').value, 'Nome revisado');
  assert.equal($('#treatment').value, 'feminine');
  assert.equal($('input[name="deck"]:checked').value, 'lenormand');
  assert.equal(app.saved().name, 'Nome inicial');
  app.submit('#consult-form');
  assert.deepEqual(app.saved(), {name:'Nome revisado', treatment:'feminine', deck:'lenormand'});
  assert.equal($('#saved-name').textContent, 'Nome revisado');
});

test('voltar da biblioteca retorna ao formulário sem trocar a escolha nem perder o rascunho', async t => {
  const app = await openCabin(t), { $ } = app;
  app.change('#table-name', 'Inicial'); app.submit('#table-form');
  app.change('#visitor-name', 'Rascunho'); $('#treatment').value = 'masculine';
  $('input[value="thoth"]').checked = true;
  $('#consult-decks').click();
  $('#tab-thoth').dispatchEvent(new app.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));
  $('#deck-back').click();
  assert.equal($('#panel').open, true);
  assert.equal($('#visitor-name')?.value, 'Rascunho');
  assert.equal($('#treatment').value, 'masculine');
  assert.equal($('input[name="deck"]:checked').value, 'thoth');
});

test('erros de nome sinalizam o campo e desaparecem ao corrigir ou limpar identificação', async t => {
  const app = await openCabin(t), { $ } = app;
  app.change('#table-name', '   '); app.submit('#table-form');
  assert.equal($('#name-error').hidden, false);
  assert.equal($('#table-name').getAttribute('aria-invalid'), 'true');
  app.change('#table-name', 'Nome');
  assert.equal($('#name-error').hidden, true);
  assert.notEqual($('#table-name').getAttribute('aria-invalid'), 'true');
  app.submit('#table-form');
  app.change('#visitor-name', '   '); app.submit('#consult-form');
  assert.equal($('#profile-error').hidden, false);
  assert.equal($('#visitor-name').getAttribute('aria-invalid'), 'true');
  app.change('#visitor-name', 'Corrigido');
  assert.equal($('#profile-error').hidden, true);
  $('#close-panel').click();
  app.change('#table-name', '   '); app.submit('#table-form');
  $('[data-panel="settings"]').click(); $('#forget-profile').click(); $('#close-panel').click();
  assert.equal($('#table-name').value, '');
  assert.equal($('#name-error').hidden, true);
  assert.notEqual($('#table-name').getAttribute('aria-invalid'), 'true');
  assert.equal(app.saved(), null);
});

test('sair do formulário descarta só o rascunho e mantém a identificação confirmada', async t => {
  const app = await openCabin(t), { $ } = app;
  app.change('#table-name', 'Confirmado'); app.submit('#table-form');
  app.change('#visitor-name', 'Não confirmado'); $('#consult-decks').click();
  $('#close-panel').click(); $('[data-panel="decks"]').click(); $('#deck-choose').click();
  assert.equal($('#visitor-name').value, 'Confirmado');
  assert.equal(app.saved().name, 'Confirmado');
});

test('rascunho e confirmação tratam o nome como texto, inclusive após visitar os baralhos', async t => {
  const app = await openCabin(t), { $ } = app;
  const literal='<img src=x onerror=alert(1)>';
  app.change('#table-name', 'Inicial'); app.submit('#table-form');
  app.change('#visitor-name', literal); $('#consult-decks').click(); $('#deck-back').click();
  assert.equal($('#visitor-name').value, literal);
  app.submit('#consult-form');
  assert.equal($('#saved-name').textContent, literal);
  assert.equal($('img[onerror]'), null);
});
