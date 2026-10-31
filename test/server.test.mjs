import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import net from 'node:net';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { compileDeckCatalog } from '../scripts/compile-decks.mjs';

test('build Next.js serve a cabana e os módulos corretos sem publicar arquivos do projeto', {timeout:30000}, async t => {
  const socket=net.createServer();
  await new Promise(resolve=>socket.listen(0,'127.0.0.1',resolve));
  const port=socket.address().port;
  await new Promise(resolve=>socket.close(resolve));
  const child=spawn(process.execPath,[fileURLToPath(new URL('../node_modules/next/dist/bin/next',import.meta.url)),'start','--hostname','127.0.0.1','--port',String(port)],{
    cwd:fileURLToPath(new URL('../',import.meta.url)),windowsHide:true,env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},
  });
  t.after(async()=>{if(child.exitCode===null){const exit=once(child,'exit');child.kill();await exit;}});
  let output='';
  await new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(new Error(`Servidor não iniciou: ${output}`)),15000);
    child.stdout.on('data',chunk=>{output+=chunk;if(output.includes('Ready')){clearTimeout(timeout);resolve();}});
    child.stderr.on('data',chunk=>{output+=chunk;});
    child.once('error',error=>{clearTimeout(timeout);reject(error);});
    child.once('exit',code=>{clearTimeout(timeout);reject(new Error(`Servidor encerrou: ${code}\n${output}`));});
  });
  const origin=`http://127.0.0.1:${port}`;
  const response=await fetch(origin);
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/<html lang="pt-BR"/);
  assert.match(html,/id="table-form"/);
  assert.match(html,/Qual seu nome\?/);
  assert.match(html,/Falar com a velha/);
  for(const name of ['prologue.js','scene.js','decks.js']) {
    const resource=await fetch(`${origin}/runtime/${name}`);
    assert.equal(resource.status,200,name);
    const expected=name==='decks.js'
      ? compileDeckCatalog(await readFile(new URL('../src/decks.ts',import.meta.url),'utf8'))
      : await readFile(new URL(`../src/${name}`,import.meta.url),'utf8');
    assert.equal(await resource.text(),expected);
  }
  for(const path of ['/fonts/velumbra.ttf','/art/cabin-pixel.png','/art/elder-pixel.png','/audio/murmur-0.wav','/brand/velumbra-icon.png']) {
    const resource=await fetch(origin+path);
    assert.equal(resource.status,200,path);
    assert.ok((await resource.arrayBuffer()).byteLength>0,path);
  }
  for(const path of ['/scripts/prepare-runtime.mjs','/src/prologue.js','/.git/HEAD']) {
    assert.equal((await fetch(origin+path)).status,404,path);
  }
});
