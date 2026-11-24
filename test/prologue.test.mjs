import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule, SyntheticModule } from 'node:vm';
import { JSDOM } from 'jsdom';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { compileDeckCatalog } from '../scripts/compile-decks.mjs';
import Cabin from '../app/cabin.tsx';

const root = new URL('../', import.meta.url);

// Exercise the actual page and controller. Only graphics, sound and browser timing
// are excluded: these tests validate DOM flows, not visual or audio acceptance.
async function openCabin(t, { AudioContext = null } = {}) {
  const html = renderToStaticMarkup(createElement(Cabin));
  const dom = new JSDOM(html, { url: 'https://velumbra.test/', runScripts: 'outside-only' });
  const { window } = dom;
  const context = dom.getInternalVMContext();
  t.after(() => window.close());
  if (AudioContext) window.AudioContext = AudioContext;
  window.matchMedia = () => ({ matches: false, addEventListener() {} });
  let timerId = 0;
  const timers = new Map();
  window.setTimeout = (callback, delay) => { const id = ++timerId; timers.set(id, {callback, delay}); return id; };
  window.clearTimeout = id => timers.delete(id);
  const panel = window.document.querySelector('#panel');
  panel.showModal = () => { panel.open = true; };
  panel.close = () => { panel.open = false; panel.dispatchEvent(new window.Event('close')); };

  let sceneRefreshes = 0;
  const scene = new SyntheticModule(['createScene'], function () {
    this.setExport('createScene', () => ({ refresh() { sceneRefreshes += 1; } }));
  }, { context });
  const deckSource = await readFile(new URL('src/decks.ts', root), 'utf8');
  const decks = new SourceTextModule(compileDeckCatalog(deckSource), {context});
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
    sceneRefreshes() { return sceneRefreshes; },
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

test('a biblioteca renderiza as três amostras de cada sistema sem misturar tradições', async t => {
  const { $, window } = await openCabin(t);
  $('[data-panel="decks"]').click();
  const expected = {
    rws: ['O Louco', 'A Lua', 'A Morte'],
    marseille: ['O Louco', 'A Papisa', 'A Justiça'],
    thoth: ['Ajustamento', 'Arte', 'O Aeon'],
    lenormand: ['O Cavaleiro', 'O Livro', 'A Lua'],
  };
  for (const [id, names] of Object.entries(expected)) {
    $(`#tab-${id}`).click();
    assert.deepEqual([...window.document.querySelectorAll('#deck-details .sample-card h3')].map(node => node.textContent), names);
  }
});

test('ajustes controlam som, volume e pedido de movimento reduzido', async t => {
  const audioState = { resume: 0, suspend: 0, gains: [] };
  class AudioContextFixture {
    constructor() { this.state='suspended';this.sampleRate=4;this.currentTime=0;this.destination={}; }
    createGain() {
      return {gain:{value:0,setTargetAtTime(...args){audioState.gains.push(args);},setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(target){return target;}};
    }
    createBuffer(_channels,length) { return {getChannelData:()=>new Float32Array(length)}; }
    createBufferSource() { return {connect(target){return target;},start(){},stop(){}}; }
    createBiquadFilter() { return {frequency:{value:0},Q:{value:0},connect(target){return target;}}; }
    createOscillator() { return {frequency:{value:0},connect(target){return target;},start(){}}; }
    async decodeAudioData() { return {}; }
    async resume() { audioState.resume+=1;this.state='running'; }
    async suspend() { audioState.suspend+=1;this.state='suspended'; }
  }
  const app=await openCabin(t,{AudioContext:AudioContextFixture}),{$,window}=app;
  window.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(4)});
  $('[data-panel="settings"]').click();
  $('#setting-sound').checked=true;
  $('#setting-sound').dispatchEvent(new window.Event('change',{bubbles:true}));
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(audioState.resume,1);
  assert.equal($('#audio-toggle').getAttribute('aria-pressed'),'true');
  assert.equal($('#audio-toggle').getAttribute('aria-label'),'Silenciar a cabana');

  $('#setting-volume').value='80';
  $('#setting-volume').dispatchEvent(new window.Event('input',{bubbles:true}));
  assert.equal($('#volume-value').textContent,'80%');
  assert.ok(audioState.gains.some(([value])=>value===.24));

  $('#setting-motion').checked=true;
  $('#setting-motion').dispatchEvent(new window.Event('change',{bubbles:true}));
  assert.equal(window.document.documentElement.dataset.motion,'reduced');
  assert.equal(app.sceneRefreshes(),1);

  $('#setting-sound').checked=false;
  $('#setting-sound').dispatchEvent(new window.Event('change',{bubbles:true}));
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(audioState.suspend,1);
  assert.equal($('#audio-toggle').getAttribute('aria-pressed'),'false');
  assert.equal($('#audio-toggle').getAttribute('aria-label'),'Ouvir a cabana');
});

test('som indisponível no navegador produz fallback acessível e não anuncia ativação', async t => {
  const { $, window }=await openCabin(t);
  $('#audio-toggle').click();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal($('#audio-toggle').getAttribute('aria-pressed'),'false');
  assert.equal($('#audio-toggle').getAttribute('aria-label'),'Ouvir a cabana');
  assert.equal($('#audio-status').textContent,'Som indisponível neste navegador.');
  assert.equal(JSON.parse(window.localStorage.getItem('velumbra.prologue.v1')).sound,false);
});
