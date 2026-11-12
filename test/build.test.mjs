import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import test from 'node:test';

test('preparação limpa apenas o runtime gerado, publica a lista permitida e independe do cwd', async t => {
  const tempRoot = resolve(tmpdir());
  const fixture = await mkdtemp(join(tempRoot, 'velumbra-build-'));
  assert.equal(dirname(fixture), tempRoot);
  assert.ok(basename(fixture).startsWith('velumbra-build-'));
  t.after(() => rm(fixture, {recursive:true,force:true}));
  for(const dir of ['scripts','src','public/runtime']) await mkdir(join(fixture,dir),{recursive:true});
  await copyFile(new URL('../scripts/prepare-runtime.mjs',import.meta.url),join(fixture,'scripts/prepare-runtime.mjs'));
  for(const name of ['prologue.js','scene.js','decks.js']) await writeFile(join(fixture,'src',name),`export const name='${name}';`);
  await writeFile(join(fixture,'src/private.js'),'do not publish');
  await writeFile(join(fixture,'public/card.txt'),'preserve artwork');
  await writeFile(join(fixture,'public/runtime/obsolete.js'),'stale');
  const prepare = cwd => execFileSync(process.execPath,[join(fixture,'scripts/prepare-runtime.mjs')],{cwd});
  prepare(fixture);
  await assert.rejects(readFile(join(fixture,'public/runtime/obsolete.js')),{code:'ENOENT'});
  await assert.rejects(readFile(join(fixture,'public/runtime/private.js')),{code:'ENOENT'});
  for(const name of ['prologue.js','scene.js','decks.js']) {
    assert.equal(await readFile(join(fixture,'public/runtime',name),'utf8'),await readFile(join(fixture,'src',name),'utf8'));
  }
  await writeFile(join(fixture,'src/prologue.js'),'export const version=2;');
  await writeFile(join(fixture,'public/runtime/removed.js'),'stale again');
  prepare(tempRoot);
  assert.equal(await readFile(join(fixture,'public/runtime/prologue.js'),'utf8'),'export const version=2;');
  await assert.rejects(readFile(join(fixture,'public/runtime/removed.js')),{code:'ENOENT'});
  assert.equal(await readFile(join(fixture,'public/card.txt'),'utf8'),'preserve artwork');
  assert.equal(await readFile(join(fixture,'src/private.js'),'utf8'),'do not publish');
});
