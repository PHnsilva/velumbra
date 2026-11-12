import { copyFile, mkdir, rm } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep the approved scene running during the incremental React migration.
// Only these browser modules are published; scripts and project files stay private.
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const publicRoot=join(root,'public');
const target=join(publicRoot,'runtime');
// Preserve the stale-artifact fix from PR #1, restricted to generated modules.
if(dirname(target)!==publicRoot || basename(target)!=='runtime') throw new Error('Destino do runtime inválido.');
await rm(target,{recursive:true,force:true});
await mkdir(target, { recursive: true });
for (const name of ['prologue.js', 'scene.js', 'decks.js']) {
  await copyFile(join(root,'src',name),join(target,name));
}
