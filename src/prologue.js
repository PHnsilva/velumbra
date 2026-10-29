import { decks } from './decks.js';
import { createScene } from './scene.js';

const $ = selector => document.querySelector(selector);
const storageKey='velumbra.prologue.v1';
const mediaMotion=matchMedia('(prefers-reduced-motion: reduce)');
let settings={sound:false,volume:30,motion:mediaMotion.matches?'reduced':'full',profile:null};
let storageAvailable=true;
try {
  const stored=JSON.parse(localStorage.getItem(storageKey)||'null');
  if(stored && typeof stored==='object') {
    if(typeof stored.sound==='boolean') settings.sound=stored.sound;
    if(Number.isFinite(stored.volume)) settings.volume=Math.max(0,Math.min(100,stored.volume));
    if(['reduced','full'].includes(stored.motion)) settings.motion=stored.motion;
    if(stored.profile && typeof stored.profile.name==='string' && stored.profile.name.trim().length>=2 && stored.profile.name.length<=32 && ['neutral','feminine','masculine'].includes(stored.profile.treatment) && Object.hasOwn(decks,stored.profile.deck)) settings.profile=stored.profile;
  }
} catch { storageAvailable=false; }
function save() {try {localStorage.setItem(storageKey,JSON.stringify(settings));storageAvailable=true;}catch{storageAvailable=false;}}
const panel=$('#panel');
let introTimer,introFinishTimer,bubbleTimer,ambientTimer;
let introLeaving=false,lastTrigger=null,sound=null,soundAllowed=false,soundOperation=0,voiceIndex=0;
let consultDraft=null;
document.documentElement.dataset.motion=settings.motion;
const scene=createScene({getMotion:()=>settings.motion,getSpeaking:()=>Boolean(sound?.currentVoice)});

function hideBubble() {clearTimeout(bubbleTimer);$('#whisper').hidden=true;}
function intro() {
  clearTimeout(introTimer);clearTimeout(introFinishTimer);hideBubble();stopVoice();
  if(panel.open) panel.close();
  introLeaving=false;$('#intro').hidden=false;$('#intro').classList.remove('leaving');
  $('#menu').hidden=true;$('#menu').inert=true;$('#skip-intro').focus({preventScroll:true});
  introTimer=setTimeout(enterCabin,settings.motion==='reduced'?3500:5500);
}
function enterCabin() {
  if(introLeaving || $('#intro').hidden) return;
  introLeaving=true;clearTimeout(introTimer);$('#intro').classList.add('leaving');
  $('#menu').hidden=false;$('#menu').inert=false;
  introFinishTimer=setTimeout(()=>{$('#intro').hidden=true;$('#game-title').focus({preventScroll:true});scheduleMurmur();},settings.motion==='reduced'?0:800);
}
$('#skip-intro').addEventListener('click',()=>{setSound(true);enterCabin();});
$('#silent-entry').addEventListener('click',()=>{setSound(false);enterCabin();});
$('#portrait').addEventListener('click',()=>{
  hideBubble();$('#whisper').hidden=false;
  bubbleTimer=setTimeout(hideBubble,5000);
  if(soundAllowed) playMurmur(voiceIndex++%4);
});
$('#table-area').addEventListener('click',()=>{$('#table-name').focus();hideBubble();});
$('#table-name').addEventListener('focus',hideBubble);
$('#table-name').addEventListener('input',()=>setNameError('#table-name','#name-error'));
$('#table-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=normalizeName($('#table-name').value);
  if(!validName(name)) {setNameError('#table-name','#name-error','Use de 2 a 32 caracteres.');$('#table-name').focus();return;}
  settings.profile={name,treatment:settings.profile?.treatment||'neutral',deck:settings.profile?.deck||'rws'};
  save();updateName();lastTrigger=$('#table-name');showConsult();
});
function normalizeName(value) {return value.trim().replace(/\s+/g,' ');}
function validName(name) {return name.length>=2 && name.length<=32;}
function setNameError(inputSelector,errorSelector,message='') {
  const input=$(inputSelector),error=$(errorSelector);
  error.textContent=message;error.hidden=!message;
  if(message)input.setAttribute('aria-invalid','true');else input.removeAttribute('aria-invalid');
}
function updateName() {$('#table-name').value=settings.profile?.name||'';setNameError('#table-name','#name-error');}

function setPanel(title,content) {
  hideBubble();stopVoice();playPaper();
  $('#panel-title').textContent=title;$('#panel-content').innerHTML=content;
  if(!panel.open) panel.showModal();
  $('#panel-title').focus({preventScroll:true});panel.scrollTop=0;
}
function closePanel() {panel.close();}
$('#close-panel').addEventListener('click',closePanel);
panel.addEventListener('close',()=>{consultDraft=null;lastTrigger?.focus({preventScroll:true});});
panel.addEventListener('click',event=>{
  if(event.target!==panel) return;
  const r=panel.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) closePanel();
});
document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>{
  lastTrigger=button;
  ({decks:()=>showDecks(settings.profile?.deck||'rws'),journal:showJournal,settings:showSettings})[button.dataset.panel]?.();
}));
function showConsult(selected=consultDraft?.deck||settings.profile?.deck||'rws') {
  consultDraft={...(consultDraft||settings.profile||{name:normalizeName($('#table-name').value),treatment:'neutral'}),deck:selected};
  setPanel('Seu lugar',`<form id="consult-form">
    <div class="form-grid"><label class="field" for="visitor-name">Nome<input id="visitor-name" autocomplete="given-name" minlength="2" maxlength="32" required aria-describedby="profile-error"></label><label class="field" for="treatment">Tratamento<select id="treatment"><option value="neutral">Neutro / não informar</option><option value="feminine">Feminino</option><option value="masculine">Masculino</option></select></label></div>
    <fieldset><legend>Baralho</legend><div class="deck-options">${Object.entries(decks).map(([id,deck])=>`<label class="deck-radio"><input type="radio" name="deck" value="${id}" ${id===selected?'checked':''}><span><strong>${deck.short}</strong><small>${deck.count} cartas</small></span></label>`).join('')}</div></fieldset>
    <p id="profile-error" class="error" role="alert" hidden></p><p class="scope-note">O prólogo permite salvar suas preferências e examinar amostras. As tiragens ainda não estão disponíveis.</p>
    <div class="actions"><button class="action-button" type="submit">Salvar</button><button class="action-button secondary" type="button" id="consult-decks">Ver baralhos</button></div></form>`);
  $('#visitor-name').value=consultDraft.name;
  $('#treatment').value=consultDraft.treatment;
  $('#visitor-name').addEventListener('input',()=>setNameError('#visitor-name','#profile-error'));
  $('#consult-decks').addEventListener('click',()=>{
    consultDraft={name:$('#visitor-name').value,treatment:$('#treatment').value,deck:document.querySelector('input[name="deck"]:checked').value};
    showDecks(consultDraft.deck,{returnToConsult:true});
  });
  $('#consult-form').addEventListener('submit',event=>{
    event.preventDefault();const name=normalizeName($('#visitor-name').value);
    if(!validName(name)) {setNameError('#visitor-name','#profile-error','Use de 2 a 32 caracteres.');$('#visitor-name').focus();return;}
    settings.profile={name,treatment:$('#treatment').value,deck:document.querySelector('input[name="deck"]:checked').value};
    consultDraft=null;save();updateName();showSaved();
  });
}
function showSaved() {
  setPanel('Preferências salvas',`<p class="panel-lead" id="saved-name"></p><div class="prepared-deck"><span>Baralho</span><strong>${decks[settings.profile.deck].name}</strong></div><p class="scope-note">${storageAvailable?'Dados salvos somente neste navegador.':'O armazenamento está indisponível. Os dados valem para esta sessão.'} O sorteio e a interpretação ainda estão em preparação.</p><div class="actions"><button class="action-button" id="saved-decks">Ver amostras</button><button class="action-button secondary" id="saved-back">Voltar</button></div>`);
  $('#saved-name').textContent=settings.profile.name;
  $('#saved-decks').addEventListener('click',()=>showDecks(settings.profile.deck));$('#saved-back').addEventListener('click',closePanel);
}
function showDecks(selected,{returnToConsult=false}={}) {
  const deck=decks[selected];
  setPanel('Baralhos',`<div role="tablist" aria-label="Tradições de cartomancia" class="deck-tabs">${Object.entries(decks).map(([id,d])=>`<button role="tab" class="deck-tab" id="tab-${id}" aria-selected="${id===selected}" aria-controls="deck-details" tabindex="${id===selected?'0':'-1'}" data-deck="${id}">${d.short}</button>`).join('')}</div><section role="tabpanel" id="deck-details" aria-labelledby="tab-${selected}" tabindex="0"><p class="deck-description">${deck.description}</p><p class="deck-facts">${deck.facts}</p><h3 class="sample-heading">Amostra: três cartas</h3><div class="card-samples">${deck.cards.map(c=>`<article class="sample-card"><span class="sample-number">${c.n}</span><span class="sample-symbol" aria-hidden="true">${c.symbol}</span><h3>${c.name}</h3><p>${c.text}</p></article>`).join('')}</div><p class="scope-note">A coleção completa e suas ilustrações ainda estão em preparação. O sentido das cartas depende da pergunta e da tiragem.</p></section><div class="actions"><button class="action-button" id="deck-choose">Escolher baralho</button><button class="action-button secondary" id="deck-back">Voltar</button></div>`);
  document.querySelectorAll('[data-deck]').forEach(tab=>{
    tab.addEventListener('click',()=>{showDecks(tab.dataset.deck,{returnToConsult});$(`#tab-${tab.dataset.deck}`).focus();});
    tab.addEventListener('keydown',event=>{
      const ids=Object.keys(decks);let next;
      if(event.key==='ArrowRight')next=ids[(ids.indexOf(selected)+1)%ids.length];
      if(event.key==='ArrowLeft')next=ids[(ids.indexOf(selected)+ids.length-1)%ids.length];
      if(event.key==='Home')next=ids[0];if(event.key==='End')next=ids.at(-1);
      if(next){event.preventDefault();showDecks(next,{returnToConsult});$(`#tab-${next}`).focus();}
    });
  });
  $('#deck-choose').addEventListener('click',()=>showConsult(selected));
  $('#deck-back').textContent=returnToConsult?'Voltar à identificação':'Voltar';
  $('#deck-back').addEventListener('click',()=>returnToConsult?showConsult():closePanel());
}
function showJournal() {
  setPanel('Diário',`<div class="empty-journal"><h3>Nenhuma leitura registrada.</h3><p>As consultas aparecerão aqui quando as tiragens estiverem disponíveis.</p></div><p class="scope-note">Nome e baralho são preferências, não consultas. Nenhum dado é enviado a um serviço de interpretação nesta versão.</p><div class="actions"><button class="action-button" id="journal-back">Voltar</button></div>`);
  $('#journal-back').addEventListener('click',closePanel);
}
function showSettings() {
  setPanel('Som e movimento',`<label class="setting-row" for="setting-sound"><span><h3>Som</h3><p>Vento, madeira e grunhidos sem palavras.</p></span><input class="switch" type="checkbox" id="setting-sound" ${soundAllowed?'checked':''}></label><label class="setting-row" for="setting-volume"><span><h3>Volume</h3><p id="volume-value">${settings.volume}%</p></span><input class="volume-control" type="range" id="setting-volume" min="0" max="100" value="${settings.volume}" aria-label="Volume do ambiente"></label><label class="setting-row" for="setting-motion"><span><h3>Reduzir movimento</h3><p>Pausa a velha, velas, névoa e partículas.</p></span><input class="switch" type="checkbox" id="setting-motion" ${settings.motion==='reduced'?'checked':''}></label><div class="setting-row"><span><h3>Abertura</h3></span><button class="action-button secondary" id="settings-replay">Rever</button></div><div class="setting-row"><span><h3>Identificação</h3><p>Apagar nome, tratamento e baralho.</p></span><button class="action-button secondary" id="forget-profile">Limpar</button></div><p class="setting-info">${storageAvailable?'Preferências salvas somente neste navegador.':'Armazenamento indisponível. Os ajustes valem para esta sessão.'}</p>`);
  $('#setting-sound').addEventListener('change',async event=>{const input=event.currentTarget;await setSound(input.checked);input.checked=soundAllowed;});
  $('#setting-volume').addEventListener('input',event=>{settings.volume=Number(event.target.value);$('#volume-value').textContent=`${settings.volume}%`;if(sound)sound.master.gain.setTargetAtTime(settings.volume/100*.3,sound.ctx.currentTime,.12);save();});
  $('#setting-motion').addEventListener('change',event=>{settings.motion=event.target.checked?'reduced':'full';document.documentElement.dataset.motion=settings.motion;save();scene.refresh();});
  $('#settings-replay').addEventListener('click',intro);
  $('#forget-profile').addEventListener('click',()=>{settings.profile=null;consultDraft=null;save();updateName();$('#forget-profile').textContent='Limpo';$('#forget-profile').disabled=true;});
}

function createSound() {
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio) throw new Error('Audio unavailable');
  const ctx=new Audio(),master=ctx.createGain();master.gain.value=settings.volume/100*.3;master.connect(ctx.destination);
  const buffer=ctx.createBuffer(1,ctx.sampleRate*5,ctx.sampleRate),values=buffer.getChannelData(0);let last=0;
  for(let i=0;i<values.length;i++){last=(last+Math.random()*.04-.02)/1.02;values[i]=last*4;}
  const wind=ctx.createBufferSource();wind.buffer=buffer;wind.loop=true;
  const low=ctx.createBiquadFilter();low.type='lowpass';low.frequency.value=380;wind.connect(low).connect(master);wind.start();
  const hum=ctx.createOscillator(),humGain=ctx.createGain();hum.type='sine';hum.frequency.value=55;humGain.gain.value=.045;hum.connect(humGain).connect(master);hum.start();
  return {ctx,master,voices:[],loading:null,currentVoice:null};
}
function loadMurmurs() {
  if(!sound) return Promise.resolve([]);
  if(!sound.loading){const engine=sound;engine.loading=Promise.all([0,1,2,3].map(async index=>{
    const response=await fetch(`./public/audio/murmur-${index}.wav`);if(!response.ok)throw new Error('Murmur unavailable');return engine.ctx.decodeAudioData(await response.arrayBuffer());
  })).then(voices=>{engine.voices=voices;return voices;}).catch(()=>{engine.loading=null;return [];});}
  return sound.loading;
}
function stopVoice() {if(sound?.currentVoice){const active=sound.currentVoice;sound.currentVoice=null;try{active.stop();}catch{}}$('#entity-stage').classList.remove('speaking');}
async function playMurmur(index) {
  if(!soundAllowed||!sound||document.hidden||panel.open) return;
  const engine=sound,voices=await loadMurmurs();
  if(!soundAllowed||engine!==sound||engine.ctx.state!=='running'||!voices[index]||document.hidden||panel.open||!$('#intro').hidden)return;
  stopVoice();const voice=engine.ctx.createBufferSource();voice.buffer=voices[index];
  const gain=engine.ctx.createGain();gain.gain.value=2.1;voice.connect(gain).connect(engine.master);engine.currentVoice=voice;
  $('#entity-stage').classList.add('speaking');
  voice.onended=()=>{if(engine.currentVoice===voice){engine.currentVoice=null;$('#entity-stage').classList.remove('speaking');}};voice.start();
}
function scheduleMurmur() {
  clearTimeout(ambientTimer);if(!soundAllowed||document.hidden)return;
  ambientTimer=setTimeout(()=>{if(!panel.open&&$('#intro').hidden&&!sound?.currentVoice)playMurmur(voiceIndex++%4);scheduleMurmur();},20000+Math.random()*14000);
}
async function setSound(enabled) {
  const operation=++soundOperation;
  try {
    if(enabled){if(!sound)sound=createSound();await sound.ctx.resume();}else if(sound)await sound.ctx.suspend();
    if(operation!==soundOperation)return;
    soundAllowed=enabled;settings.sound=enabled;save();
    if(enabled){loadMurmurs();scheduleMurmur();}else{clearTimeout(ambientTimer);stopVoice();}
  } catch {soundAllowed=false;settings.sound=false;$('#audio-status').textContent='Som indisponível neste navegador.';}
  $('#audio-toggle').setAttribute('aria-pressed',String(soundAllowed));
  const label=soundAllowed?'Silenciar a cabana':'Ouvir a cabana';$('#audio-toggle').setAttribute('aria-label',label);$('#audio-toggle').title=label;
  $('#audio-label').textContent=soundAllowed?'Silenciar':'Som';
}
function playPaper() {
  if(!soundAllowed||!sound||sound.ctx.state!=='running')return;
  const now=sound.ctx.currentTime,noise=sound.ctx.createBuffer(1,sound.ctx.sampleRate*.22,sound.ctx.sampleRate),data=noise.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/data.length*5);
  const source=sound.ctx.createBufferSource();source.buffer=noise;
  const filter=sound.ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=900;filter.Q.value=.65;
  const gain=sound.ctx.createGain();gain.gain.setValueAtTime(.1,now);gain.gain.exponentialRampToValueAtTime(.001,now+.21);source.connect(filter).connect(gain).connect(sound.master);source.start();
}
$('#audio-toggle').addEventListener('click',()=>setSound(!soundAllowed));
document.addEventListener('visibilitychange',()=>{clearTimeout(ambientTimer);if(document.hidden){stopVoice();if(sound)sound.ctx.suspend().catch(()=>{});}else if(soundAllowed&&sound)sound.ctx.resume().then(scheduleMurmur).catch(()=>{});});
mediaMotion.addEventListener('change',event=>{if(event.matches){settings.motion='reduced';document.documentElement.dataset.motion='reduced';save();scene.refresh();}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){hideBubble();if(!$('#intro').hidden)enterCabin();}});
updateName();intro();
