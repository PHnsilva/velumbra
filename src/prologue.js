const $ = (selector) => document.querySelector(selector);
const storageKey = 'velumbra.prologue.v1';
const mediaMotion = matchMedia('(prefers-reduced-motion: reduce)');
const defaults = { sound: false, volume: 30, motion: mediaMotion.matches ? 'reduced' : 'full', profile: null };
let settings = { ...defaults };
let storageAvailable = true;
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (stored && typeof stored === 'object') {
    if (typeof stored.sound === 'boolean') settings.sound = stored.sound;
    if (Number.isFinite(stored.volume)) settings.volume = Math.max(0, Math.min(100, stored.volume));
    if (['reduced', 'full'].includes(stored.motion)) settings.motion = stored.motion;
    if (stored.profile && typeof stored.profile.name === 'string' && stored.profile.name.trim().length >= 2 && stored.profile.name.length <= 32 && ['neutral', 'feminine', 'masculine'].includes(stored.profile.treatment) && ['rws','marseille','thoth','lenormand'].includes(stored.profile.deck)) settings.profile = stored.profile;
  }
} catch { storageAvailable = false; }
function save() { try { localStorage.setItem(storageKey, JSON.stringify(settings)); storageAvailable = true; } catch { storageAvailable = false; } }
const decks = {
  rws: { name: 'Rider–Waite–Smith', short: 'Rider–Waite–Smith', count: 78, facts: '22 ARCANOS MAIORES · 56 MENORES', description: 'Cenas ilustradas transformam cada carta em uma pequena narrativa. Símbolos, gestos e detalhes ajudam a construir a leitura.', cards: [{n:'0',name:'O Louco',symbol:'☼',text:'Começos, liberdade e o passo em direção ao desconhecido.'},{n:'XVIII',name:'A Lua',symbol:'☾',text:'Incerteza, imaginação e aquilo que ainda não está claro.'},{n:'XIII',name:'A Morte',symbol:'✧',text:'Encerramento de um ciclo e abertura para uma transformação.'}] },
  marseille: { name: 'Tarô de Marselha', short: 'Marselha', count: 78, facts: '22 ARCANOS MAIORES · 56 MENORES', description: 'Uma tradição de formas marcantes e cartas numeradas de naipe. A composição visual, os números e as relações entre cartas orientam a interpretação.', cards: [{n:'SEM NÚMERO',name:'O Louco',symbol:'☼',text:'Movimento, liberdade e caminhos ainda não definidos.'},{n:'II',name:'A Papisa',symbol:'☾',text:'Conhecimento reservado, silêncio e atenção ao que se revela aos poucos.'},{n:'VIII',name:'A Justiça',symbol:'⚖',text:'Equilíbrio, responsabilidade e avaliação das consequências.'}] },
  thoth: { name: 'Tarô de Thoth', short: 'Thoth', count: 78, facts: '22 ARCANOS MAIORES · 56 MENORES', description: 'Uma linguagem de correspondências esotéricas e símbolos densos. Alguns nomes, figuras de corte e relações diferem das outras tradições.', cards: [{n:'VIII',name:'Ajustamento',symbol:'⚖',text:'Equilíbrio dinâmico, precisão e responsabilidade pelas escolhas.'},{n:'XIV',name:'Arte',symbol:'✧',text:'Integração de opostos e transformação pela combinação.'},{n:'XX',name:'O Aeon',symbol:'☼',text:'Reavaliação, passagem e mudança de perspectiva.'}] },
  lenormand: { name: 'Petit Lenormand', short: 'Lenormand', count: 36, facts: '36 SÍMBOLOS · LEITURA POR COMBINAÇÕES', description: 'Conhecido no Brasil como baralho cigano. Seus símbolos cotidianos se combinam como palavras de uma frase; a leitura inicial não utiliza inversões.', cards: [{n:'I',name:'O Cavaleiro',symbol:'♞',text:'Notícias, aproximação e movimento. O contexto vem das cartas vizinhas.'},{n:'XXVI',name:'O Livro',symbol:'▥',text:'Conhecimento, estudo ou algo que permanece reservado.'},{n:'XXXII',name:'A Lua',symbol:'☾',text:'Reconhecimento, sensibilidade e imagem, conforme a combinação.'}] }
};
let introTimer, introFinishTimer, whisperTimer;
let introLeaving = false;
let lastTrigger = null;
let sound = null;
let soundAllowed = false;
let soundOperation = 0;
let ambientWhisperTimer;
let voiceIndex = 0;
const panel = $('#panel');
document.documentElement.dataset.motion = settings.motion;

function intro() {
  clearTimeout(introTimer); clearTimeout(introFinishTimer);
  if (panel.open) panel.close();
  $('#whisper').hidden = true;
  stopVoice();
  introLeaving = false;
  $('#intro').hidden = false;
  $('#intro').classList.remove('leaving');
  $('#menu').hidden = true; $('#menu').inert = true;
  $('#skip-intro').focus({ preventScroll: true });
  introTimer = setTimeout(enterCabin, settings.motion === 'reduced' ? 4500 : 7500);
}
function enterCabin() {
  if (introLeaving || $('#intro').hidden) return;
  introLeaving = true; clearTimeout(introTimer);
  $('#intro').classList.add('leaving');
  $('#menu').hidden = false; $('#menu').inert = false;
  introFinishTimer = setTimeout(() => {
    $('#intro').hidden = true;
    $('#game-title').focus({ preventScroll: true });
    if(soundAllowed) playWhisper(0,true);
    scheduleAmbientWhisper();
  }, settings.motion === 'reduced' ? 0 : 1050);
}
$('#skip-intro').addEventListener('click', () => { setSound(true); enterCabin(); });
$('#silent-entry').addEventListener('click', () => { setSound(false); enterCabin(); });
$('#replay').addEventListener('click', intro);

function whisper(text, index = null) {
  clearTimeout(whisperTimer);
  $('#whisper-text').textContent = text;
  $('#whisper').hidden = false;
  if(index !== null) playWhisper(index);
  whisperTimer = setTimeout(() => { $('#whisper').hidden = true; }, 8500);
}
$('#close-whisper').addEventListener('click', () => { $('#whisper').hidden = true; });
const whispers = ['Chegue mais perto. Eu já estava esperando.', 'Escolha com calma. As cartas se lembram.', 'Pode olhar. Nada aqui adormece por completo.', 'Seu lugar está à mesa.'];
let whisperIndex = 0;
$('#portrait').addEventListener('click', async () => { if(!soundAllowed) await setSound(true, false); const index=whisperIndex++ % whispers.length; whisper(whispers[index], index); });

function setPanel(title, kicker, content) {
  $('#panel-title').textContent = title;
  $('#panel-kicker').textContent = kicker;
  $('#panel-content').innerHTML = content;
  if (!panel.open) panel.showModal();
  $('#panel-title').focus({ preventScroll: true });
  panel.scrollTop = 0;
}
function closePanel() { panel.close(); lastTrigger?.focus({ preventScroll: true }); }
$('#close-panel').addEventListener('click', closePanel);
panel.addEventListener('click', (event) => { if (event.target === panel) { const r = panel.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closePanel(); } });
panel.addEventListener('close', () => lastTrigger?.focus({ preventScroll: true }));
document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => { lastTrigger = button; openPanel(button.dataset.panel); }));
function openPanel(name) {
  $('#whisper').hidden = true;
  playPaper();
  ({ consult: showConsult, decks: () => showDecks('rws'), journal: showJournal, settings: showSettings })[name]?.();
}
function showConsult() {
  setPanel('Sente-se à mesa', 'PREPARAR A CONSULTA', `
    <p class="panel-lead">“Diga como devo chamar você. Depois, escolha quais cartas deseja conhecer.”</p>
    <form id="consult-form">
      <div class="form-grid"><label class="field" for="visitor-name">SEU NOME<input id="visitor-name" name="name" autocomplete="given-name" minlength="2" maxlength="32" placeholder="Como a velha deve chamar você?" required aria-describedby="profile-error"></label><label class="field" for="treatment">FORMA DE TRATAMENTO<select id="treatment" name="treatment"><option value="neutral">Neutro / não informar</option><option value="feminine">Feminino</option><option value="masculine">Masculino</option></select></label></div>
      <fieldset><legend>ESCOLHA UM BARALHO</legend><div class="deck-options">${Object.entries(decks).map(([id,deck])=>`<label class="deck-radio"><input type="radio" name="deck" value="${id}" ${id==='rws'?'checked':''}><span><strong>${deck.short}</strong><small>${deck.count} CARTAS · ${id==='lenormand'?'COMBINAÇÕES':'TARÔ'}</small></span></label>`).join('')}</div></fieldset>
      <p id="profile-error" class="error" role="alert" hidden></p>
      <p class="scope-note">Esta abertura permite preparar seu lugar e explorar uma prévia dos baralhos. As tiragens e leituras ainda estão em preparação.</p>
      <div class="actions"><button class="action-button" type="submit">Preparar meu lugar <span aria-hidden="true">→</span></button><button class="action-button secondary" type="button" id="consult-decks">Conhecer os baralhos</button></div>
    </form>`);
  if (settings.profile) { $('#visitor-name').value = settings.profile.name; $('#treatment').value = settings.profile.treatment; document.querySelector(`input[name="deck"][value="${settings.profile.deck}"]`).checked = true; }
  $('#consult-decks').addEventListener('click', () => showDecks(document.querySelector('input[name="deck"]:checked').value));
  $('#consult-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#visitor-name').value.trim().replace(/\s+/g,' ');
    if (name.length < 2 || name.length > 32) { $('#profile-error').textContent = 'Informe um nome entre 2 e 32 caracteres.'; $('#profile-error').hidden = false; $('#visitor-name').focus(); return; }
    settings.profile = { name, treatment: $('#treatment').value, deck: document.querySelector('input[name="deck"]:checked').value };
    save(); showWelcome(); updateGreeting();
  });
}
function updateGreeting() {
  if (settings.profile) { $('#invitation').replaceChildren(document.createTextNode(`${settings.profile.name}, seu lugar está guardado.`),document.createElement('br'),document.createTextNode('A velha espera pela sua escolha.')); }
}
function showWelcome() {
  const { name, treatment, deck } = settings.profile;
  const greeting = { neutral: 'Seu lugar está preparado', feminine: 'Seja bem-vinda', masculine: 'Seja bem-vindo' }[treatment];
  setPanel('Um lugar à sua espera', 'A VELHA', `<div class="welcome-card"><img src="./public/art/the-elder.png" alt="A velha"><div><h3 id="welcome-name"></h3><p>“Guarde sua pergunta por um instante. Pode conhecer as cartas enquanto preparo a mesa.”</p></div></div><div class="prepared-deck"><span>SEU BARALHO</span><strong>${decks[deck].name}</strong></div><p class="scope-note">O sorteio, a interpretação e O Veredito ainda não estão disponíveis nesta abertura. ${storageAvailable ? 'Sua preferência fica salva somente neste navegador.' : 'O navegador não permitiu salvar suas preferências; elas permanecerão apenas nesta sessão.'}</p><div class="actions"><button class="action-button" id="welcome-decks">Explorar uma prévia <span aria-hidden="true">→</span></button><button class="action-button secondary" id="welcome-back">Voltar à cabana</button></div>`);
  playWhisper(3);
  $('#welcome-name').textContent = `${greeting}, ${name}.`;
  $('#welcome-decks').addEventListener('click', () => showDecks(deck));
  $('#welcome-back').addEventListener('click', closePanel);
}
function showDecks(selected) {
  const deck = decks[selected];
  setPanel('Os quatro baralhos', 'O ARMÁRIO DE CARTAS', `<div role="tablist" aria-label="Tradições de cartomancia" class="deck-tabs">${Object.entries(decks).map(([id,d])=>`<button role="tab" class="deck-tab" id="tab-${id}" aria-selected="${id===selected}" aria-controls="deck-details" tabindex="${id===selected?'0':'-1'}" data-deck="${id}">${d.short}</button>`).join('')}</div><section role="tabpanel" id="deck-details" aria-labelledby="tab-${selected}" tabindex="0"><p class="deck-description">${deck.description}</p><p class="deck-facts">${deck.facts}</p><h3 class="sample-heading">PRÉVIA · TRÊS CARTAS DA TRADIÇÃO</h3><div class="card-samples">${deck.cards.map(c=>`<article class="sample-card"><span class="sample-number">${c.n}</span><span class="sample-symbol" aria-hidden="true">${c.symbol}</span><h3>${c.name}</h3><p>${c.text}</p></article>`).join('')}</div><p class="scope-note">Amostras de conteúdo introdutório. A coleção completa e suas ilustrações ainda estão em preparação. O sentido de uma carta depende da pergunta e da tiragem.</p></section><div class="actions"><button class="action-button" id="deck-choose">Escolher este baralho <span aria-hidden="true">→</span></button><button class="action-button secondary" id="deck-back">Voltar à cabana</button></div>`);
  document.querySelectorAll('[data-deck]').forEach(tab => {
    tab.addEventListener('click', () => { showDecks(tab.dataset.deck); $(`#tab-${tab.dataset.deck}`).focus(); });
    tab.addEventListener('keydown', event => { const ids = Object.keys(decks); let next; if(event.key==='ArrowRight') next = ids[(ids.indexOf(selected)+1)%ids.length]; if(event.key==='ArrowLeft') next = ids[(ids.indexOf(selected)+ids.length-1)%ids.length]; if(event.key==='Home') next = ids[0]; if(event.key==='End') next = ids.at(-1); if(next){event.preventDefault();showDecks(next);$(`#tab-${next}`).focus();} });
  });
  $('#deck-choose').addEventListener('click', () => { showConsult(); document.querySelector(`input[name="deck"][value="${selected}"]`).checked = true; $('#visitor-name').focus(); });
  $('#deck-back').addEventListener('click', closePanel);
}
function showJournal() {
  setPanel('O diário', 'REGISTROS DA CABANA', `<div class="empty-journal"><span class="empty-symbol" aria-hidden="true">▥</span><h3>As páginas ainda estão em branco.</h3><p>Nenhuma leitura foi realizada. Quando as consultas estiverem disponíveis, este espaço receberá suas cartas, reflexões e vereditos.</p></div><p class="scope-note">As preferências de nome e baralho não são registradas como consultas. Nesta versão, nenhum dado é enviado a um serviço de interpretação.</p><div class="actions"><button class="action-button" id="journal-back">Voltar à cabana <span aria-hidden="true">→</span></button></div>`);
  $('#journal-back').addEventListener('click', closePanel);
}
function showSettings() {
  setPanel('Ajustes', 'O RITMO DA CABANA', `<label class="setting-row" for="setting-sound"><span><h3>Som ambiente</h3><p>Vento baixo e ressonâncias da cabana.</p></span><input class="switch" type="checkbox" id="setting-sound" ${soundAllowed?'checked':''}></label><label class="setting-row" for="setting-volume"><span><h3>Volume</h3><p id="volume-value">${settings.volume}%</p></span><input class="volume-control" type="range" id="setting-volume" min="0" max="100" value="${settings.volume}" aria-label="Volume do ambiente"></label><label class="setting-row" for="setting-motion"><span><h3>Reduzir movimento</h3><p>Desativa partículas, flutuação e paralaxe.</p></span><input class="switch" type="checkbox" id="setting-motion" ${settings.motion==='reduced'?'checked':''}></label><div class="setting-row"><span><h3>Abertura</h3><p>Reveja a chegada à cabana.</p></span><button class="action-button secondary" id="settings-replay">Rever</button></div><p class="setting-info" id="settings-storage">${storageAvailable ? 'Ajustes salvos somente neste navegador. O som começa após sua interação.' : 'O armazenamento local está indisponível. Os ajustes valem para esta sessão.'}</p>`);
  const soundDescription = $('#setting-sound').closest('label').querySelector('p'); soundDescription.textContent = 'Vento, madeira e os cochichos da velha.';
  $('#setting-sound').addEventListener('change', async event => { const input=event.currentTarget; await setSound(input.checked); input.checked = soundAllowed; });
  $('#setting-volume').addEventListener('input', event => { settings.volume = Number(event.target.value); $('#volume-value').textContent = `${settings.volume}%`; if(sound) sound.master.gain.setTargetAtTime(settings.volume / 100 * .3, sound.ctx.currentTime,.12); save(); });
  $('#setting-motion').addEventListener('change', event => { settings.motion = event.target.checked?'reduced':'full'; document.documentElement.dataset.motion = settings.motion; save(); resizeDust(); });
  const resetRow = document.createElement('div'); resetRow.className = 'setting-row';
  resetRow.innerHTML = '<span><h3>Identificação</h3><p>Esqueça o nome, tratamento e baralho salvos.</p></span><button class="action-button secondary" id="forget-profile">Limpar</button>';
  $('#settings-storage').before(resetRow);
  $('#forget-profile').addEventListener('click', () => { settings.profile = null; save(); $('#invitation').replaceChildren(document.createTextNode('A velha ergue os olhos.'),document.createElement('br'),document.createTextNode('Há um lugar para você à mesa.')); $('#forget-profile').textContent = 'Limpo'; $('#forget-profile').disabled = true; });
  $('#settings-replay').addEventListener('click', intro);
}

function createSound() {
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio) throw new Error('Audio unavailable');
  const ctx = new Audio();
  const master = ctx.createGain(); master.gain.value = settings.volume / 100 * .3; master.connect(ctx.destination);
  const buffer = ctx.createBuffer(1,ctx.sampleRate * 5,ctx.sampleRate);
  const values = buffer.getChannelData(0); let last = 0;
  for(let i=0;i<values.length;i++) { last = (last + Math.random()*.04-.02)/1.02; values[i]=last*4; }
  const wind=ctx.createBufferSource();wind.buffer=buffer;wind.loop=true;
  const low=ctx.createBiquadFilter();low.type='lowpass';low.frequency.value=380;
  wind.connect(low).connect(master);wind.start();
  const hum=ctx.createOscillator();hum.type='sine';hum.frequency.value=55;
  const humGain=ctx.createGain();humGain.gain.value=.045;
  hum.connect(humGain).connect(master);hum.start();
  return {ctx,master,voices:[],loading:null,currentVoice:null};
}
function loadWhispers() {
  if(!sound) return Promise.resolve([]);
  if(!sound.loading) {
    const engine=sound;
    engine.loading=Promise.all([0,1,2,3].map(async index=>{
      const response=await fetch(`./public/audio/whisper-${index}.wav`);
      if(!response.ok) throw new Error('Whisper unavailable');
      return engine.ctx.decodeAudioData(await response.arrayBuffer());
    })).then(voices=>{engine.voices=voices;return voices;}).catch(()=>{engine.loading=null;return [];});
  }
  return sound.loading;
}
function stopVoice() {
  if(sound?.currentVoice) {const active=sound.currentVoice;sound.currentVoice=null;try{active.stop();}catch{}}
  $('#entity-stage').classList.remove('speaking');
}
async function playWhisper(index, showCaption = false) {
  if(!soundAllowed || !sound || document.hidden) return;
  const engine=sound;
  const voices=await loadWhispers();
  if(!soundAllowed || engine!==sound || engine.ctx.state!=='running' || !voices[index] || document.hidden || !$('#intro').hidden) return;
  stopVoice();
  const voice=engine.ctx.createBufferSource();voice.buffer=voices[index];
  const gain=engine.ctx.createGain();gain.gain.value=3;
  const pan=engine.ctx.createStereoPanner();pan.pan.value=.18;
  voice.connect(gain).connect(pan).connect(engine.master);
  engine.currentVoice=voice;
  $('#entity-stage').classList.add('speaking');
  voice.onended=()=>{if(engine.currentVoice===voice){engine.currentVoice=null;$('#entity-stage').classList.remove('speaking');}};
  voice.start();
  if(showCaption) {
    clearTimeout(whisperTimer);$('#whisper-text').textContent=whispers[index];$('#whisper').hidden=false;
    whisperTimer=setTimeout(()=>{$('#whisper').hidden=true;},(voice.buffer.duration+.5)*1000);
  }
}
function scheduleAmbientWhisper() {
  clearTimeout(ambientWhisperTimer);
  if(!soundAllowed || document.hidden) return;
  ambientWhisperTimer=setTimeout(()=>{
    if(!panel.open && $('#intro').hidden && !sound?.currentVoice) playWhisper(voiceIndex++%4,true);
    scheduleAmbientWhisper();
  },18000+Math.random()*13000);
}
async function setSound(enabled, greeting = true) {
  const operation=++soundOperation;
  try {
    if(enabled) { if(!sound) sound=createSound(); await sound.ctx.resume(); } else if(sound) await sound.ctx.suspend();
    if(operation!==soundOperation) return;
    soundAllowed=enabled; settings.sound=enabled; save();
    if(enabled) { loadWhispers().then(()=>{if(greeting && soundAllowed && !panel.open && $('#intro').hidden)playWhisper(0,true);}); scheduleAmbientWhisper(); }
    else { clearTimeout(ambientWhisperTimer);stopVoice(); }
  } catch { soundAllowed=false; settings.sound=false; whisper('Seu navegador não liberou o som. Você pode continuar em silêncio.'); }
  $('#audio-toggle').setAttribute('aria-pressed',String(soundAllowed));
  $('#audio-label').textContent=soundAllowed?'Silenciar a cabana':'Ouvir a cabana';
}
function playPaper() {
  if(!soundAllowed || !sound || sound.ctx.state!=='running') return;
  const now=sound.ctx.currentTime,noise=sound.ctx.createBuffer(1,sound.ctx.sampleRate*.28,sound.ctx.sampleRate);
  const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/data.length*5);
  const source=sound.ctx.createBufferSource();source.buffer=noise;
  const filter=sound.ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=900;filter.Q.value=.65;
  const gain=sound.ctx.createGain();gain.gain.setValueAtTime(.1,now);gain.gain.exponentialRampToValueAtTime(.001,now+.27);
  source.connect(filter).connect(gain).connect(sound.master);source.start();
}
$('#audio-toggle').addEventListener('click',()=>setSound(!soundAllowed));

const canvas=$('#dust'), ctx=canvas.getContext('2d');
let particles=[], width=0,height=0,frame=null,lastTime=0;
let pointer={x:-1000,y:-1000};
function resizeDust() {
  width=innerWidth;height=innerHeight;
  const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx?.setTransform(ratio,0,0,ratio,0,0);
  particles=Array.from({length:width<680?25:48},()=>({x:Math.random()*width,y:Math.random()*height,v:.06+Math.random()*.16,r:Math.random()*1.1+.3,phase:Math.random()*6.28}));
  if(frame) cancelAnimationFrame(frame);frame=null;lastTime=0;
  if(ctx) ctx.clearRect(0,0,width,height);
  if(settings.motion==='full' && !document.hidden && ctx) frame=requestAnimationFrame(animateDust);
}
function animateDust(time) {
  if(settings.motion==='reduced' || document.hidden) {frame=null;return;}
  const step=lastTime?Math.min((time-lastTime)/16.667,3):1;lastTime=time;ctx.clearRect(0,0,width,height);
  particles.forEach(p=>{p.y-=p.v*step;p.x+=Math.sin(time*.0002+p.phase)*.1*step;const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);if(d<105 && d>1){p.x+=dx/d*.55*step;p.y+=dy/d*.55*step;}if(p.y<0)p.y=height;if(p.x>width)p.x=0;if(p.x<0)p.x=width;ctx.fillStyle=`rgba(215,170,91,${.1+(Math.sin(time*.0006+p.phase)+1)*.14})`;ctx.fillRect(Math.round(p.x),Math.round(p.y),p.r,p.r);});
  frame=requestAnimationFrame(animateDust);
}
addEventListener('resize',resizeDust);
addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;if(settings.motion==='full'){document.documentElement.style.setProperty('--px',`${(event.clientX/innerWidth-.5)*25}px`);document.documentElement.style.setProperty('--py',`${(event.clientY/innerHeight-.5)*18}px`);}} ,{passive:true});
document.addEventListener('pointerleave',()=>{pointer={x:-1000,y:-1000};document.documentElement.style.setProperty('--px','0px');document.documentElement.style.setProperty('--py','0px');});
document.addEventListener('click',event=>{if(panel.open || !$('#intro').hidden || settings.motion==='reduced' || event.target.closest('button,input,select,label,dialog,a'))return;const ripple=document.createElement('span');ripple.className='table-ripple';ripple.style.left=`${event.clientX-7}px`;ripple.style.top=`${event.clientY-7}px`;document.body.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});});
document.addEventListener('visibilitychange',()=>{resizeDust();clearTimeout(ambientWhisperTimer);if(document.hidden){stopVoice();if(sound)sound.ctx.suspend().catch(()=>{});}else if(soundAllowed && sound){sound.ctx.resume().then(scheduleAmbientWhisper).catch(()=>{});}});
mediaMotion.addEventListener('change',event=>{if(event.matches){settings.motion='reduced';document.documentElement.dataset.motion='reduced';save();resizeDust();}});
document.addEventListener('keydown',event=>{if(!$('#intro').hidden && event.key==='Escape')enterCabin();});
updateGreeting();resizeDust();intro();
