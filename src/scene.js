// A deliberately small framebuffer keeps every animation on the same pixel grid.
export function createScene({ getMotion, getSpeaking }) {
  const room = document.querySelector('#room');
  const elder = document.querySelector('#elder');
  const roomContext = room.getContext('2d');
  const elderContext = elder.getContext('2d');
  const body = document.createElement('canvas');
  body.width = 180; body.height = 240;
  const bodyContext = body.getContext('2d');
  const cabinImage = new Image(), elderImage = new Image();
  let ready = false, frame = null, lastPaint = -Infinity, phase = 0;
  let pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  const motes = Array.from({length:24}, (_,i) => ({x:(i*.173)%1,y:(i*.317)%1,speed:.006+(i%5)*.002}));
  for (const context of [roomContext, elderContext, bodyContext]) if (context) context.imageSmoothingEnabled = false;

  function load(image, source) {
    return new Promise(resolve => { image.onload = () => resolve(true); image.onerror = () => resolve(false); image.src = source; });
  }
  Promise.all([load(cabinImage,'./public/art/cabin-pixel.png'),load(elderImage,'./public/art/elder-pixel.png')]).then(results => {
    if (!roomContext || !elderContext || !bodyContext) return;
    ready = results.every(Boolean);
    if (!ready) return;
    bodyContext.drawImage(elderImage,0,0,180,240);
    refresh();
  });

  function resize() {
    room.width = innerWidth < 600 ? 240 : Math.min(480,Math.round(innerWidth/4));
    room.height = Math.round(room.width * innerHeight / innerWidth);
    if (roomContext) roomContext.imageSmoothingEnabled = false;
  }
  function drawRoom(time, moving) {
    const c = roomContext, w = room.width, h = room.height;
    c.clearRect(0,0,w,h);
    const shift = moving ? Math.round(pointer.x) : 0;
    c.drawImage(cabinImage,-3+shift,-2,w+6,h+4);
    c.fillStyle = '#070708'; c.globalAlpha = .12; c.fillRect(0,0,w,h); c.globalAlpha = 1;
    // Candle flames, illumination and smoke are redrawn, rather than a zoom of a still.
    for (const [x,y,offset] of [[.067,.399,0],[.959,.444,1.9]]) {
      const flicker = moving ? Math.sin(time*9+offset)*.2 + Math.sin(time*17+offset)*.12 : 0;
      const cx = Math.round(w*x)+shift, cy = Math.round(h*y);
      const glow = c.createRadialGradient(cx,cy,1,cx,cy,w*.14);
      glow.addColorStop(0,`rgba(211,113,39,${.15+flicker*.13})`);glow.addColorStop(1,'rgba(100,35,20,0)');
      c.fillStyle=glow;c.fillRect(cx-w*.14,cy-w*.14,w*.28,w*.28);
      const sway = moving ? Math.round(Math.sin(time*7+offset)) : 0;
      c.fillStyle='#c76a2e';c.fillRect(cx-1,cy-7+sway,3,10);
      c.fillStyle='#f1bf72';c.fillRect(cx,cy-5+sway,2,7);
      c.fillStyle='#f9ddb0';c.fillRect(cx,cy-1,1,3);
      if (moving) {
        c.fillStyle='#c0ae91';c.globalAlpha=.13;
        for(let i=0;i<7;i++) {const rise=(time*7+i*5+offset*5)%38;c.fillRect(cx+Math.round(Math.sin(rise*.19+time)*2),cy-8-rise,2,3);}
        c.globalAlpha=1;
      }
    }
    // The far curtain sways by a few source pixels while the table stays stable.
    if(moving) {
      const dx=Math.round(Math.sin(time*.7)*1.5);
      c.drawImage(cabinImage,560,40,140,500,Math.round(w*.335)+shift+dx,Math.round(h*.043),Math.round(w*.084),Math.round(h*.531));
    }
    // Low, drifting bands of fog and dust remain coarse, never smooth film grain.
    for(let i=0;i<5;i++) {
      const x = (w*(.2+i*.23)+(moving?time*(2+i*.3):0))%(w*1.5)-w*.25;
      const y = h*(.73+i*.035)+(moving?Math.round(Math.sin(time*.3+i)*2):0);
      c.fillStyle=`rgba(143,148,128,${.018+i*.004})`;c.fillRect(Math.round(x),Math.round(y),Math.round(w*.45),2+i%2);
    }
    for(const p of motes) {
      const y = ((p.y-(moving?time*p.speed:0))%1+1)%1;
      const x = p.x+(moving?Math.sin(time*.5+p.y*9)*.008:0);
      c.fillStyle='#b5a98c';c.globalAlpha=.12+Math.sin(time+p.x*8)*.08;c.fillRect(Math.round(x*w),Math.round(y*h),1,1);
    }
    c.globalAlpha=1;
  }
  function drawElder(time, moving) {
    const c=elderContext;
    c.clearRect(0,0,180,240);
    const speaking = moving && getSpeaking();
    const breath = moving ? Math.sin(time*1.45) : 0;
    const turn = moving ? Math.sin(time*.63)*1.6 + pointer.x*.3 : 0;
    const nod = speaking ? Math.sin(time*12)*1.4 : 0;
    // Rows in the head, shoulders, mantle and hands move by distinct amounts.
    for(let y=0;y<240;y++) {
      const headWeight = Math.max(0,1-Math.abs(y-80)/82);
      const handWeight = Math.max(0,(y-168)/72);
      const x = Math.round(turn*headWeight + Math.sin(time*1.1)*handWeight*(moving?1:0));
      const dy = Math.round((-breath*1.5+nod)*headWeight - breath*handWeight);
      const spread = moving ? Math.round(breath*Math.max(0,1-Math.abs(y-155)/70)) : 0;
      c.drawImage(body,0,y,180,1,x-spread,y+dy,180+spread*2,2);
    }
    const headX=Math.round(turn), headY=Math.round(-breath*1.5+nod);
    // Eye positions are expressed in this 180x240 sprite, and follow its head.
    const blink = moving && (time%6.7>6.45 || (time+2.1)%17>16.83);
    if (blink) {
      c.fillStyle='#503725';c.fillRect(78+headX,77+headY,7,2);c.fillRect(97+headX,77+headY,7,2);
      c.fillStyle='#231a16';c.fillRect(78+headX,79+headY,7,1);c.fillRect(97+headX,79+headY,7,1);
    }
    if(speaking && Math.sin(time*21)>.1) {
      c.fillStyle='#231317';c.fillRect(86+headX,96+headY,10,2);c.fillStyle='#69412a';c.fillRect(87+headX,98+headY,8,1);
    }
  }
  function paint(timestamp) {
    frame=null;
    if(!ready || document.hidden) return;
    const moving=getMotion()==='full';
    if(timestamp-lastPaint>=1000/12 || !moving) {
      if(moving && Number.isFinite(lastPaint)) phase+=Math.min((timestamp-lastPaint)/1000,.25);
      lastPaint=timestamp;
      pointer.x+=(target.x-pointer.x)*.13;pointer.y+=(target.y-pointer.y)*.13;
      drawRoom(phase,moving);drawElder(phase,moving);
    }
    if(moving) frame=requestAnimationFrame(paint);
  }
  function refresh() {
    if(frame) cancelAnimationFrame(frame);frame=null;lastPaint=-Infinity;
    resize();
    if(ready&&!document.hidden) frame=requestAnimationFrame(paint);
  }
  addEventListener('resize',refresh);
  addEventListener('pointermove',event => {target={x:(event.clientX/innerWidth-.5)*3,y:(event.clientY/innerHeight-.5)*2};},{passive:true});
  document.addEventListener('pointerleave',()=>{target={x:0,y:0};});
  document.addEventListener('visibilitychange',refresh);
  refresh();
  return {refresh};
}
