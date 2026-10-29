import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import test from 'node:test';

test('build substitui artefatos antigos e não depende da pasta em que é executado', async t => {
  const tempRoot = resolve(tmpdir());
  const fixture = await mkdtemp(join(tempRoot, 'velumbra-build-'));
  // Verify the final absolute target before recursive cleanup on Windows.
  assert.equal(dirname(fixture), tempRoot);
  assert.ok(basename(fixture).startsWith('velumbra-build-'));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  for (const dir of ['scripts', 'src', 'public', 'dist']) await mkdir(join(fixture, dir));
  await copyFile(new URL('../scripts/build.mjs', import.meta.url), join(fixture, 'scripts/build.mjs'));
  await writeFile(join(fixture, 'index.html'), '<title>Teste</title>');
  await writeFile(join(fixture, 'src/controller.js'), 'export const version = 1;');
  await writeFile(join(fixture, 'public/card.txt'), 'card');
  await writeFile(join(fixture, 'dist/removed.wav'), 'stale');
  await writeFile(join(fixture, 'keep.txt'), 'preserve');
  const build = (cwd=fixture) => execFileSync(process.execPath, [join(fixture, 'scripts/build.mjs')], {cwd});
  build();
  assert.equal(await readFile(join(fixture, 'dist/index.html'), 'utf8'), '<title>Teste</title>');
  assert.equal(await readFile(join(fixture, 'dist/public/card.txt'), 'utf8'), 'card');
  await assert.rejects(readFile(join(fixture, 'dist/removed.wav')), {code:'ENOENT'});
  await unlink(join(fixture, 'public/card.txt'));
  await writeFile(join(fixture, 'src/controller.js'), 'export const version = 2;');
  build(tempRoot);
  await assert.rejects(readFile(join(fixture, 'dist/public/card.txt')), {code:'ENOENT'});
  assert.equal(await readFile(join(fixture, 'dist/src/controller.js'), 'utf8'), 'export const version = 2;');
  assert.equal(await readFile(join(fixture, 'keep.txt'), 'utf8'), 'preserve');
});
