import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const output=join(root,'dist');
// Check the resolved target before removing generated output on Windows.
if(dirname(output)!==root || basename(output)!=='dist') throw new Error('Destino de build inválido.');
await rm(output,{recursive:true,force:true});
await mkdir(output, { recursive: true });
await copyFile(join(root,'index.html'), join(output,'index.html'));
await cp(join(root,'src'), join(output,'src'), { recursive: true });
await cp(join(root,'public'), join(output,'public'), { recursive: true });
console.log('Prólogo preparado em dist/.');
