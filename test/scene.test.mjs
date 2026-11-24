import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule } from 'node:vm';
import { JSDOM } from 'jsdom';

const source = await readFile(new URL('../src/scene.js', import.meta.url), 'utf8');

test('movimento reduzido interrompe o loop da cena até ser reativado', async t => {
  const dom = new JSDOM('<canvas id="room"></canvas><canvas id="elder"></canvas>', { runScripts: 'outside-only' });
  const { window } = dom;
  t.after(() => window.close());
  let motion = 'reduced', frameId = 0;
  const pending = new Map(), draws = { room: 0, elder: 0 };
  Object.defineProperty(window.document, 'hidden', { configurable: true, value: false });
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 700 });
  window.HTMLCanvasElement.prototype.getContext = function () {
    const name = this.id === 'room' ? 'room' : 'elder';
    return { imageSmoothingEnabled: true, globalAlpha: 1, fillStyle: '', clearRect() {}, drawImage() { draws[name] += 1; },
      fillRect() { draws[name] += 1; }, createRadialGradient() { return { addColorStop() {} }; } };
  };
  window.document.createElement('canvas').getContext = window.HTMLCanvasElement.prototype.getContext;
  window.Image = class { set src(value) { this.source = value; queueMicrotask(() => this.onload?.()); } };
  window.requestAnimationFrame = callback => { const id = ++frameId; pending.set(id, callback); return id; };
  window.cancelAnimationFrame = id => pending.delete(id);
  const module = new SourceTextModule(source, { context: dom.getInternalVMContext() });
  await module.link(() => { throw new Error('Unexpected scene dependency'); });
  await module.evaluate();
  const scene = module.namespace.createScene({ getMotion: () => motion, getSpeaking: () => false });
  await new Promise(resolve => setImmediate(resolve));
  const runNextFrame = time => { const entry = pending.entries().next().value; assert.ok(entry, 'expected one scheduled frame'); pending.delete(entry[0]); entry[1](time); };
  assert.equal(pending.size, 1); runNextFrame(0);
  assert.equal(pending.size, 0, 'reduced motion draws once and stops scheduling frames');
  assert.ok(draws.room > 0 && draws.elder > 0, 'scene and character were drawn');
  motion = 'full'; scene.refresh(); assert.equal(pending.size, 1); runNextFrame(100);
  assert.equal(pending.size, 1, 'full motion keeps animation frames scheduled');
  motion = 'reduced'; scene.refresh(); assert.equal(pending.size, 1); runNextFrame(200);
  assert.equal(pending.size, 0, 'returning to reduced motion stops the animation loop');
});

test('gestos da velha movem as mãos em sequência e respeitam movimento reduzido', async t => {
  const dom = new JSDOM('<canvas id="room"></canvas><canvas id="elder"></canvas>', { runScripts: 'outside-only' });
  const { window } = dom;
  t.after(() => window.close());
  let now = 0, frameId = 0;
  const frames = new Map(), handRows = [];
  Object.defineProperty(window, 'performance', { configurable: true, value: { now: () => now } });
  Object.defineProperty(window.document, 'hidden', { configurable: true, value: false });
  window.requestAnimationFrame = callback => { const id = ++frameId; frames.set(id, callback); return id; };
  window.cancelAnimationFrame = id => frames.delete(id);
  window.Image = class { set src(value) { this._src = value; queueMicrotask(() => this.onload?.()); } get src() { return this._src; } };
  window.HTMLCanvasElement.prototype.getContext = function () {
    const canvas = this;
    return { imageSmoothingEnabled: true, clearRect() {}, fillRect() {},
      drawImage(...args) { if (canvas.id === 'elder' && args.length === 9 && args[2] >= 168) handRows.push(args); },
      createRadialGradient() { return { addColorStop() {} }; } };
  };
  const module = new SourceTextModule(source, { context: dom.getInternalVMContext() });
  await module.link(() => { throw new Error('Unexpected scene dependency'); });
  await module.evaluate();
  let motion = 'full';
  const scene = module.namespace.createScene({ getMotion: () => motion, getSpeaking: () => false });
  await new Promise(resolve => setImmediate(resolve));
  const paintNext = timestamp => {
    now = timestamp;
    const callback = frames.values().next().value;
    assert.equal(typeof callback, 'function', `a frame is scheduled (queued: ${frames.size})`);
    frames.delete(frames.keys().next().value);
    callback(timestamp);
  };
  paintNext(0);
  const initialLeft = handRows.find(args => args[1] === 0 && args[2] === 200)?.[5];
  const initialRight = initialLeft + 90;
  assert.equal(typeof initialLeft, 'number');
  assert.equal(typeof initialRight, 'number');
  assert.equal(scene.performGesture('deal'), true); paintNext(400);
  const dealLeft = handRows.filter(args => args[1] === 0 && args[2] === 200).at(-1)?.[5];
  const dealRight = handRows.filter(args => args[1] === 90 && args[2] === 200).at(-1)?.[5];
  assert.ok(dealLeft > initialLeft, 'left hand reaches inward');
  assert.ok(dealRight < initialRight, 'right hand reaches inward');
  assert.equal(scene.performGesture('reaction'), true);
  assert.equal(scene.performGesture('shuffle'), true);
  assert.equal(scene.performGesture('reveal'), true);
  assert.equal(scene.performGesture('unknown'), false);
  motion = 'reduced'; scene.refresh(); paintNext(900);
  assert.equal(scene.performGesture('deal'), true); paintNext(901);
  assert.equal(frames.size, 0, 'reduced motion does not schedule an animation loop');
});
