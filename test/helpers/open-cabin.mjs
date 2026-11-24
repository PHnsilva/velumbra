import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule, SyntheticModule } from 'node:vm';
import { JSDOM } from 'jsdom';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { compileDeckCatalog } from '../../scripts/compile-decks.mjs';
import Cabin from '../../app/cabin.tsx';
import { createConsultation } from '../../src/consultation.js';

const root = new URL('../../', import.meta.url);

// Exercise the actual page and controller. Only graphics, sound and browser timing
// are excluded: these tests validate DOM flows, not visual or audio acceptance.
export async function openCabin(t, { AudioContext = null, initialJournal = null, storageFailure = null } = {}) {
  const html = renderToStaticMarkup(createElement(Cabin));
  const dom = new JSDOM(html, { url: 'https://velumbra.test/', runScripts: 'outside-only' });
  const { window } = dom;
  if(initialJournal !== null) window.localStorage.setItem('velumbra.reading-journal', initialJournal);
  if(storageFailure) {
    const proto = Object.getPrototypeOf(window.localStorage);
    const fail = () => { throw new Error('Storage blocked'); };
    if(storageFailure==='read') proto.getItem=fail;
    if(storageFailure==='write') proto.setItem=fail;
  }
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
  const sceneGestures = [];
  const scene = new SyntheticModule(['createScene'], function () {
    this.setExport('createScene', () => ({
      refresh() { sceneRefreshes += 1; },
      performGesture(name) { sceneGestures.push(name); return true; },
    }));
  }, { context });
  const deckSource = await readFile(new URL('src/decks.ts', root), 'utf8');
  const decks = new SourceTextModule(compileDeckCatalog(deckSource), {context});
  const consultation = new SyntheticModule(['createConsultation'], function(){ this.setExport('createConsultation',createConsultation); }, {context});
  const controller = new SourceTextModule(await readFile(new URL('src/prologue.js', root), 'utf8'), {context});
  await controller.link(specifier => {
    if (specifier === './scene.js') return scene;
    if (specifier === './decks.js') return decks;
    if (specifier === './consultation.js') return consultation;
    throw new Error(`Unexpected dependency: ${specifier}`);
  });
  await controller.evaluate();
  const $ = selector => window.document.querySelector(selector);
  $('#silent-entry').click();
  for (const [id, timer] of timers) if (timer.delay <= 800) { timers.delete(id); timer.callback(); }
  assert.equal($('#intro').hidden, true);

  return {
    $, window,
    sceneGestures,
    flushTimers(maxDelay=800) { for (const [id, timer] of timers) if(timer.delay<=maxDelay) {timers.delete(id);timer.callback();} },
    change(selector, value) {
      $(selector).value = value;
      $(selector).dispatchEvent(new window.Event('input', { bubbles: true }));
    },
    submit(selector) { $(selector).dispatchEvent(new window.Event('submit', {cancelable: true, bubbles: true})); },
    saved() { return JSON.parse(window.localStorage.getItem('velumbra.prologue.v1')).profile; },
    sceneRefreshes() { return sceneRefreshes; },
  };
}

