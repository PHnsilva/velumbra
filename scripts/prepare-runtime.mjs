import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { buildSync } from 'esbuild';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileDeckCatalog } from './compile-decks.mjs';

// Keep the approved scene running during the incremental React migration.
// Only these browser modules are published; scripts and project files stay private.
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const publicRoot=join(root,'public');
const target=join(publicRoot,'runtime');
// Preserve the stale-artifact fix from PR #1, restricted to generated modules.
if(dirname(target)!==publicRoot || basename(target)!=='runtime') throw new Error('Destino do runtime inválido.');
await rm(target,{recursive:true,force:true});
await mkdir(target, { recursive: true });
for (const name of ['prologue.js', 'scene.js']) {
  await copyFile(join(root,'src',name),join(target,name));
}
const catalog = await readFile(join(root, 'src', 'decks.ts'), 'utf8');
await writeFile(join(target, 'decks.js'), compileDeckCatalog(catalog));

buildSync({ entryPoints: [join(root, 'src/consultation.js')], outfile: join(target, 'consultation.js'), bundle: true, format: 'esm', target: 'es2022', logLevel: 'silent' });
// Owner-authorized Lenormand test edition. The other drafts stay out of public.
// Only this newly generated directory is cleaned; existing artwork is preserved.
const artRoot=join(publicRoot,'art','cards');
const previewRoot=join(artRoot,'lenormand-preview');
if(dirname(previewRoot)!==artRoot || basename(previewRoot)!=='lenormand-preview') throw new Error('Destino da edição de teste inválido.');
const sources=join(root,'docs','card-drafts','lenormand');
const files=[];
for(const folder of ['', 'second-seven', 'third-four', 'fourth-seven', 'fifth-seven', 'last-four']) {
  for(const file of await readdir(join(sources,folder))) if(/^\d{2}-[a-z-]+\.svg$/.test(file)) files.push({file,source:join(sources,folder,file)});
}
if(files.length!==36 || new Set(files.map(item=>item.file.slice(0,2))).size!==36 || files.some(item=>Number(item.file.slice(0,2))<1 || Number(item.file.slice(0,2))>36)) throw new Error('A edição Lenormand precisa de 36 ilustrações únicas.');
await rm(previewRoot,{recursive:true,force:true});
await mkdir(previewRoot,{recursive:true});
for(const item of files) await copyFile(item.source,join(previewRoot,item.file));
