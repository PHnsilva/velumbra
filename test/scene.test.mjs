import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule } from 'node:vm';
import { JSDOM } from 'jsdom';

const source=await readFile(new URL('../src/scene.js',import.meta.url),'utf8');

test('movimento reduzido interrompe o loop da cena até ser reativado',async t=>{
  const dom=new JSDOM('<canvas id="room"></canvas><canvas id="elder"></canvas>',{runScripts:'outside-only'});
  const {window}=dom,draws={room:0,elder:0};
  t.after(()=>window.close());
  Object.defineProperty(window.document,'hidden',{configurable:true,value:false});
  Object.defineProperty(window,'innerWidth',{configurable:true,value:1000});
  Object.defineProperty(window,'innerHeight',{configurable:true,value:700});
  window.HTMLCanvasElement.prototype.getContext=function(){
    const name=this.id==='room'?'room':'elder';
    return {
      imageSmoothingEnabled:true,globalAlpha:1,fillStyle:'',
      clearRect(){},drawImage(){draws[name]+=1;},fillRect(){draws[name]+=1;},
      createRadialGradient(){return {addColorStop(){}};},
    };
  };
  window.document.createElement('canvas').getContext=window.HTMLCanvasElement.prototype.getContext;
  class ImageFixture {
    set src(value){this.source=value;queueMicrotask(()=>this.onload?.());}
  }
  window.Image=ImageFixture;
  let nextFrame=0;
  const pending=new Map();
  window.requestAnimationFrame=callback=>{const id=++nextFrame;pending.set(id,callback);return id;};
  window.cancelAnimationFrame=id=>pending.delete(id);

  const module=new SourceTextModule(source,{context:dom.getInternalVMContext()});
  await module.link(()=>{throw new Error('Unexpected scene dependency');});
  await module.evaluate();
  let motion='reduced';
  const scene=module.namespace.createScene({getMotion:()=>motion,getSpeaking:()=>false});
  await new Promise(resolve=>setImmediate(resolve));

  const runNextFrame=time=>{
    const entry=pending.entries().next().value;
    assert.ok(entry,'expected one scheduled frame');
    pending.delete(entry[0]);entry[1](time);
  };
  assert.equal(pending.size,1);
  runNextFrame(0);
  assert.equal(pending.size,0,'reduced motion draws once and stops scheduling frames');
  assert.ok(draws.room>0&&draws.elder>0,'scene and character were drawn');

  motion='full';scene.refresh();
  assert.equal(pending.size,1);
  runNextFrame(100);
  assert.equal(pending.size,1,'full motion keeps animation frames scheduled');

  motion='reduced';scene.refresh();
  assert.equal(pending.size,1);
  runNextFrame(200);
  assert.equal(pending.size,0,'returning to reduced motion stops the animation loop');
});
