
/* ================= Neue Spiele v3.96: Wasserrutsche, Mückenjagd, Putten ================= */
GAMES.splice(0,GAMES.length,...GAMES.filter(function(g){return g.id!=='moto'&&g.id!=='stack'}));
GAMES.push(
 {id:'tower',n:'Turmbau',e:'🏗️',g:[6,10,14],time:60,d:'tower',gs:'tap',lb:'Tippen = Block loslassen',ctl:'',how:'Stapel die Blöcke. Wenn es kippt, fällt der Turm!'},
 {id:'wslide',n:'Wasserrutsche',e:'🛝',g:[8,14,20],time:60,d:'wslide',gs:'lr',lb:'Halten links/rechts',ctl:'',how:'Spring über die Lücken: kurz tippen = springen! Gedrückt halten links/rechts = lenken.'},
 {id:'maze',n:'Mückenjagd',e:'🦟',g:[4,7,10],time:60,d:'maze',gs:'s4',lb:'Wischen',ctl:'',how:'Stich die Leute. Die Oma hat eine Klatsche!'},
 {id:'golf',n:'Golf',e:'⛳',g:[5,9,13],time:60,d:'golf',gs:'flick',lb:'Wischen = Schlagen',ctl:'',how:'Wisch zum Loch. Länger wischen = stärker. Wasser oder Out (weisse Pfähle) = Loch verloren!'}
);
(function(){var od=demoHTML;demoHTML=function(g){
  if(g.d==='wslide')return '<div class="dm dm-ws"><span class="wsc"></span><span class="wsk">🛟</span><span class="wsf">👆</span></div>';
  if(g.d==='maze')return '<div class="dm dm-mz"><i class="mw a"></i><i class="mw b"></i><i class="mw c"></i><span class="mm">🦟</span><span class="mh">🏃</span><span class="mo">👵</span><span class="wsf">👆</span></div>';
  if(g.d==='golf')return '<div class="dm dm-gf"><span class="gfh">⛳</span><span class="gfb"></span><span class="gff">☝️</span><i class="gfl"></i></div>';
  if(g.d==='tower')return '<div class="dm dm-tw"><span class="twj"></span><span class="twb"></span><i class="tw1"></i><i class="tw2"></i><i class="tw3"></i><span class="wsf">👆</span></div>';
  return od(g)}})();
function gRnd(a,b){return a+Math.random()*(b-a)}
function gHash(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}

/* ---------------- Wasserrutsche (halbrunde Stahlröhre) ---------------- */
GAMEFN.wslide=function(cv,cx,w,h,score,over){
  /* Pseudo-3D-Rutsche: Strecke aus Abschnitten (gerade, Kurve, Gefälle), Physik in Metern/Sekunden */
  var crossed=0,gapFall=0,s=0,lives=3,fr=0,P=[],F=[],z=0,v=3,u=0,uv=0,steerI=0,inv=90,fall=0,fx=0,armed=false,nextChk=50,tilt=0,bgOff=0,camS=.06,i;
  var HZ=h*.34,CAMD=6,CAMH=2.3,FOC=(h*.8-HZ)*CAMD/CAMH,HW=1.0,RISE=.55,NS=12;
  var K=[],S=[],H=[0],COL=[],GAP=[],jh=0,jv=0,air=false,tapT=0,tapX=0,tapY=0,warnGap=-1;
  var COLS=[['#1E88E5','#1565C0'],['#FDD835','#F9A825'],['#E53935','#C62828'],['#8E24AA','#6A1B9A'],['#00ACC1','#00838F']];
  var plan=[],ci=0;
  function addSeg(len,k,sl){var n0=K.length,kPrev=n0?K[n0-1]:0,c=ci++%COLS.length;for(var j=0;j<len;j++){var e=Math.min(1,Math.min(j,len-j)/8),kk=k*e+(j<8?kPrev*(1-e)*0:0);K.push(k*Math.min(1,j/8)*Math.min(1,(len-j)/8));S.push(sl);H.push(H[H.length-1]-sl);COL.push(c);GAP.push(addSeg.gap?1:0)}}
  function addGap(){var d=Math.min(1,K.length/1500);addSeg(14+Math.round(Math.random()*8),0,.065);addSeg.gap=1;addSeg(Math.round(4+d*4+Math.random()*2.5),0,.065);addSeg.gap=0;addSeg(8,0,.065)}
  addSeg(55,0,.07);
  function gen(){var d=Math.min(1,K.length/1200),r=Math.random();
    if(K.length<100||r<.62){addGap();return}r=Math.random();
    if(r<.35){addSeg(28+Math.random()*10,0,.3+.08*d);addSeg(18,0,.05)}
    else if(r<.45){var sg=Math.random()<.5?-1:1,kk=(.005+.004*d+Math.random()*.004)*sg;addSeg(22+Math.random()*12,kk,.065);addSeg(22+Math.random()*12,-kk,.065)}
    else if(r<.8){var sg2=Math.random()<.5?-1:1;addSeg(24+Math.random()*16,(.006+.006*d+Math.random()*.004)*sg2,.065)}
    else addSeg(20+Math.random()*20,0,.07)}
  function ens(n){while(K.length<n+2)gen()}
  function at(A,q){ens(Math.ceil(q)+1);var i0=Math.floor(q),fq=q-i0;return A[i0]+(A[i0+1]-A[i0])*fq}
  function hAt(q){ens(Math.ceil(q)+1);var i0=Math.floor(q),fq=q-i0;return H[i0]+(H[i0+1]-H[i0])*fq}
  /* Steuerung: halten links/rechts */
  var touches={};function upd(){var a=0;for(var k in touches)a+=touches[k];steerI=Math.max(-1,Math.min(1,a))}
  function side(x){var rc=cv.getBoundingClientRect();return (x-rc.left)<rc.width/2?-1:1}
  function jump(){if(air||fall>0)return;air=true;jv=4.6;F.push({x:w/2,y:h*.42,t:'HOPP!',l:30,c:'#fff'})}
  function ts(e){if(e.cancelable)e.preventDefault();for(var j=0;j<e.changedTouches.length;j++){var t=e.changedTouches[j];if(e.type==='touchstart'){tapT=performance.now();tapX=t.clientX;tapY=t.clientY}else if(tapY-t.clientY>40){jump();tapY=-1e9}touches[t.identifier]=side(t.clientX)}upd()}
  function te(e){for(var j=0;j<e.changedTouches.length;j++){var t=e.changedTouches[j];if(performance.now()-tapT<200&&Math.abs(t.clientX-tapX)<25&&Math.abs(t.clientY-tapY)<25)jump();delete touches[t.identifier]}upd()}
  function md(e){touches.m=side(e.clientX);tapT=performance.now();tapX=e.clientX;tapY=e.clientY;upd()}function mm(e){if(touches.m!=null){touches.m=side(e.clientX);upd()}}function mu(e){if(touches.m!=null&&performance.now()-tapT<200&&Math.abs(e.clientX-tapX)<25)jump();delete touches.m;upd()}
  function kd(e){if(e.key===' '||e.key==='ArrowUp'){jump();if(e.preventDefault)e.preventDefault()}if(e.key==='ArrowLeft'){touches.k=-1;upd()}if(e.key==='ArrowRight'){touches.k=1;upd()}}function ku(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){delete touches.k;upd()}}
  cv.addEventListener('touchstart',ts,{passive:false});cv.addEventListener('touchmove',ts,{passive:false});cv.addEventListener('touchend',te);cv.addEventListener('touchcancel',te);
  cv.addEventListener('mousedown',md);window.addEventListener('mousemove',mm);window.addEventListener('mouseup',mu);window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
  function unb(){cv.removeEventListener('touchstart',ts);cv.removeEventListener('touchmove',ts);cv.removeEventListener('touchend',te);cv.removeEventListener('touchcancel',te);cv.removeEventListener('mousedown',md);window.removeEventListener('mousemove',mm);window.removeEventListener('mouseup',mu);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)}
  /* Fahrer */
  /* Rutscher in Rückenlage, Füsse voraus, nur mit Badehose (Ansicht von hinten oben) */
  var SK='#F1C29C',SK2='#D99E78',SKH='#FFE0C7';
  function limbR(x1,y1,x2,y2,w1,w2,c1,c2){var dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;var g=cx.createLinearGradient(x1+nx*w1,y1+ny*w1,x1-nx*w1,y1-ny*w1);g.addColorStop(0,c2);g.addColorStop(.45,c1);g.addColorStop(1,c2);cx.fillStyle=g;cx.beginPath();cx.moveTo(x1+nx*w1,y1+ny*w1);cx.lineTo(x2+nx*w2,y2+ny*w2);cx.arc(x2,y2,w2,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI);cx.lineTo(x1-nx*w1,y1-ny*w1);cx.arc(x1,y1,w1,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI);cx.closePath();cx.fill()}
  function rider(x,y,sc,rot){cx.save();cx.translate(x,y);cx.rotate(rot);cx.scale(sc,sc);
    /* Wasser-Bugwelle */
    cx.fillStyle='rgba(255,255,255,.7)';[-1,1].forEach(function(sd){cx.beginPath();cx.moveTo(sd*12,6);cx.quadraticCurveTo(sd*24,0+Math.sin(fr*.5)*2,sd*22,-14);cx.quadraticCurveTo(sd*17,-4,sd*12,-6);cx.fill()});
    var kick=Math.sin(fr*.3)*1.5,fast=v>13;
    /* Beine (nach vorne gestreckt) */
    [-1,1].forEach(function(sd){limbR(sd*7,-30,sd*8.5,-50+sd*kick,6.2,4.6,SK,SK2);limbR(sd*8.5,-50+sd*kick,sd*9,-66+sd*kick,4.6,3.4,SK,SK2);
      cx.fillStyle=SK;cx.beginPath();cx.ellipse(sd*9.3,-70+sd*kick,3.6,4.8,sd*.2,0,7);cx.fill();cx.fillStyle=SK2;for(var tq=0;tq<4;tq++){cx.beginPath();cx.arc(sd*(7.4+tq*1.3),-74.2+sd*kick+Math.abs(tq-1.5)*.4,.85,0,7);cx.fill()}
      cx.strokeStyle='rgba(160,100,70,.35)';cx.lineWidth=.8;cx.beginPath();cx.arc(sd*8.5,-50+sd*kick,3,Math.PI*.2,Math.PI*.8);cx.stroke()});
    /* Badehose */
    var bg=cx.createLinearGradient(-13,0,13,0);bg.addColorStop(0,'#C62828');bg.addColorStop(.5,'#EF5350');bg.addColorStop(1,'#B71C1C');cx.fillStyle=bg;cx.beginPath();cx.moveTo(-12.5,-17);cx.lineTo(12.5,-17);cx.lineTo(14,-33);cx.lineTo(1.5,-34);cx.lineTo(0,-30);cx.lineTo(-1.5,-34);cx.lineTo(-14,-33);cx.closePath();cx.fill();
    cx.fillStyle='#fff';cx.fillRect(-12.6,-19.5,25.2,2.2);cx.fillStyle='rgba(255,255,255,.85)';cx.beginPath();cx.moveTo(10.5,-20);cx.lineTo(12.5,-20);cx.lineTo(13.8,-32.5);cx.lineTo(11.8,-32.8);cx.closePath();cx.fill();cx.beginPath();cx.moveTo(-10.5,-20);cx.lineTo(-12.5,-20);cx.lineTo(-13.8,-32.5);cx.lineTo(-11.8,-32.8);cx.closePath();cx.fill();
    cx.strokeStyle='#fff';cx.lineWidth=.8;cx.beginPath();cx.moveTo(-1.2,-19);cx.quadraticCurveTo(-2.5,-15,-4,-14.5);cx.moveTo(1.2,-19);cx.quadraticCurveTo(2.5,-15,4,-14.5);cx.stroke();
    /* Oberkörper */
    var tg=cx.createLinearGradient(-15,0,15,0);tg.addColorStop(0,SK2);tg.addColorStop(.4,SK);tg.addColorStop(.6,SKH);tg.addColorStop(1,SK2);cx.fillStyle=tg;cx.beginPath();cx.moveTo(-12.5,-17);cx.quadraticCurveTo(-14,-8,-17,0);cx.quadraticCurveTo(-16,5,-9,6);cx.lineTo(9,6);cx.quadraticCurveTo(16,5,17,0);cx.quadraticCurveTo(14,-8,12.5,-17);cx.closePath();cx.fill();
    cx.strokeStyle='rgba(170,110,80,.4)';cx.lineWidth=.9;cx.beginPath();cx.moveTo(-9,-1.5);cx.quadraticCurveTo(-4.5,1,0,-.5);cx.quadraticCurveTo(4.5,1,9,-1.5);cx.moveTo(0,-2);cx.lineTo(0,-13);cx.moveTo(-4,-7);cx.lineTo(4,-7);cx.moveTo(-3.5,-11);cx.lineTo(3.5,-11);cx.stroke();
    cx.fillStyle='rgba(150,90,60,.6)';cx.beginPath();cx.ellipse(0,-15,.9,1.2,0,0,7);cx.fill();
    cx.fillStyle='rgba(200,120,90,.55)';cx.beginPath();cx.arc(-5.5,-3.2,.9,0,7);cx.arc(5.5,-3.2,.9,0,7);cx.fill();
    /* Wassertropfen auf der Haut */
    cx.fillStyle='rgba(255,255,255,.8)';[[-7,-9],[6,-12],[-3,-4],[9,-5],[-9,-46],[9,-58]].forEach(function(q){cx.beginPath();cx.arc(q[0],q[1],.8,0,7);cx.fill()});
    /* Arme */
    [-1,1].forEach(function(sd){var a1=fast?Math.sin(fr*.35+sd)*.5:0;
      if(fast){limbR(sd*14.5,1,sd*24,-10-a1*6,4.2,3.4,SK,SK2);limbR(sd*24,-10-a1*6,sd*29,-24-a1*8,3.4,2.8,SK,SK2);cx.fillStyle=SK;cx.beginPath();cx.arc(sd*29.5,-26.5-a1*8,3.4,0,7);cx.fill()}
      else{limbR(sd*14.5,1,sd*16,-12,4.2,3.4,SK,SK2);limbR(sd*16,-12,sd*6,-12,3.4,3,SK,SK2);cx.fillStyle=SK;cx.beginPath();cx.ellipse(sd*4.5,-12,3.2,3.8,0,0,7);cx.fill()}});
    /* Kopf (Hinterkopf, nasse Haare) */
    cx.fillStyle=SK2;cx.fillRect(-3.5,4,7,4);
    cx.fillStyle=SK;cx.beginPath();cx.ellipse(-8.6,9.5,2.2,3,0,0,7);cx.ellipse(8.6,9.5,2.2,3,0,0,7);cx.fill();
    var hg=cx.createRadialGradient(-2,7,1,0,10,10);hg.addColorStop(0,'#6D4C41');hg.addColorStop(1,'#3E2723');cx.fillStyle=hg;cx.beginPath();cx.ellipse(0,10,8.6,9.4,0,0,7);cx.fill();
    cx.strokeStyle='rgba(20,10,5,.5)';cx.lineWidth=.9;for(var hq=-3;hq<=3;hq++){cx.beginPath();cx.moveTo(hq*2,2);cx.quadraticCurveTo(hq*2.6,10,hq*1.6,18.5);cx.stroke()}
    cx.fillStyle='rgba(255,255,255,.35)';cx.beginPath();cx.ellipse(-2.5,6,3,1.5,-.4,0,7);cx.fill();
    cx.restore()}
  function shade(hex,k){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;function c(x){return Math.max(0,Math.min(255,Math.round(k>=0?x+(255-x)*k:x*(1+k))))}return 'rgb('+c(r)+','+c(g)+','+c(b)+')'}
  var L=loopRun(function(f){var dt=Math.min(.05,f/60);fr+=f;inv=Math.max(0,inv-f);
    /* Längsphysik */
    var zr=z+CAMD,sl=at(S,zr),kz=at(K,zr);
    if(fall>0){fall-=f;fx+=f;if(fall<=0){u=0;uv=0;inv=110;armed=false;v=Math.max(5,v*.6);if(lives<=0){L.stop();unb();over();return}}}
    else{var base=.04-Math.min(.015,z/8000);v+=(22*(sl-base)-.0042*v*v)*dt;v=Math.max(2.5,v);z+=v*dt;
      /* Querphysik: Lenken gegen Fliehkraft, die Rinne zieht zur Mitte */
      var vc=Math.min(v,15),acc=steerI*4.4-kz*vc*vc*.33-u*2.2;uv+=acc*dt;uv*=Math.exp(-3.2*dt);u+=uv*dt;tilt+=((uv*.35+u*.25)-tilt)*Math.min(1,8*dt);
      if(Math.abs(u)>.86)armed=true;if(armed&&Math.abs(u)<.5){armed=false;s++;score(s);F.push({x:w/2,y:h*.5,t:'Knapp! +1',l:50,c:'#FFEB3B'})}
      if(air){jv-=12*dt;jh+=jv*dt;if(GAP[Math.floor(zr)])crossed=1;if(jh<=0){jh=0;jv=0;air=false;burst(P,w/2,h*.8,14,['#fff','#B3E5FC'],5);if(crossed&&!GAP[Math.floor(zr)]){crossed=0;s++;score(s);F.push({x:w/2,y:h*.4,t:'Gesprungen! +1',l:50,c:'#B9F6CA'})}}}
      var gi=Math.floor(zr);ens(gi+1);if(GAP[gi]&&!air){lives--;fall=70;fx=0;gapFall=1;shakeBox();F.push({x:w/2,y:h*.45,t:lives>0?'Abgestürzt!':'Raus!',l:55,c:'#FF8A80'});var ge=gi;while(GAP[ge])ge++;z=ge+2-CAMD}
      if(fall<=0&&Math.abs(u)>1.12){lives--;fall=60;fx=0;gapFall=0;shakeBox();F.push({x:w/2,y:h*.45,t:lives>0?'Hoppla!':'Raus!',l:50,c:'#FF8A80'})}
      if(z>=nextChk){nextChk+=50;s++;score(s);F.push({x:w*.5,y:h*.2,t:Math.round(z)+' m',l:40,c:'#fff'})}}
    camS+=((.065+(sl-.065)*.3)-camS)*Math.min(1,dt*2);bgOff+=kz*v*dt*w*.6;
    /* Himmel und Landschaft */
    var sk=cx.createLinearGradient(0,0,0,HZ);sk.addColorStop(0,'#4FB3F6');sk.addColorStop(1,'#DDF3FF');cx.fillStyle=sk;cx.fillRect(0,0,w,HZ+2);
    glow(cx,w*.78,HZ*.35,w*.24,'rgba(255,250,210,.85)');cx.fillStyle='#FFF6B0';cx.beginPath();cx.arc(w*.78,HZ*.35,w*.045,0,7);cx.fill();
    cx.fillStyle='rgba(255,255,255,.95)';cloud(cx,((w*.2-bgOff*.2)%(w+160)+w+160)%(w+160)-80,HZ*.25,w*.05);cloud(cx,((w*.62-bgOff*.15)%(w+160)+w+160)%(w+160)-80,HZ*.5,w*.04);
    hills(cx,w,HZ+30,HZ-4,HZ*.22,-bgOff*.4,.011,'#A7CCE8','#86B6DC');hills(cx,w,HZ+30,HZ+4,HZ*.14,-bgOff*.7+60,.02,'#5DB98F','#348F69');
    /* Bodenebene: Becken und Wiese */
    var gg=cx.createLinearGradient(0,HZ,0,h);gg.addColorStop(0,'#7FD3E8');gg.addColorStop(.25,'#42B8D8');gg.addColorStop(1,'#1E9CC6');cx.fillStyle=gg;cx.fillRect(0,HZ+2,w,h-HZ);
    for(i=0;i<14;i++){var yy=HZ+6+Math.pow(i/14,1.8)*(h-HZ),wv=(fr*.6+i*37)%w;cx.strokeStyle='rgba(255,255,255,'+(.12+.12*i/14)+')';cx.lineWidth=1+i*.12;cx.beginPath();cx.moveTo(wv-20-i*3,yy);cx.quadraticCurveTo(wv,yy-2-i*.2,wv+20+i*3,yy);cx.stroke()}
    for(i=0;i<9;i++){var px2=((i*w/8-bgOff*1.1)%(w+60)+w+60)%(w+60)-30;cx.font=Math.floor(w*.07)+'px sans-serif';cx.textAlign='center';cx.textBaseline='bottom';cx.fillText(i%3===1?'⛱️':'🌴',px2,HZ+8)}
    /* Strecke projizieren (von der Kamera nach vorne) */
    var sl0=[],a=0,x=0,dz,d=2.6,h0=hAt(z),q;
    var dPrev=0;while(d<160){q=z+d;var hd=hAt(q)-h0+camS*d;var X=x,sc=FOC/d;sl0.push({d:d,sx:w/2+X*sc,sy:HZ+(CAMH-hd)*sc,sc:sc,c:COL[Math.min(COL.length-1,Math.floor(q))],q:q});
      dz=d<30?.7:d<70?1.4:2.6;a+=at(K,q)*dz;x+=a*dz;d+=dz}
    /* Fahrerposition (Tiefe CAMD) */
    var rp=null;for(i=0;i<sl0.length-1;i++){if(sl0[i].d<=CAMD&&sl0[i+1].d>CAMD){var kk2=(CAMD-sl0[i].d)/(sl0[i+1].d-sl0[i].d);rp={sx:sl0[i].sx+(sl0[i+1].sx-sl0[i].sx)*kk2,sy:sl0[i].sy+(sl0[i+1].sy-sl0[i].sy)*kk2,sc:FOC/CAMD};break}}
    /* zeichnen von hinten nach vorne */
    function P3(sp,uu){var hh=RISE*uu*uu;return [sp.sx+uu*HW*sp.sc,sp.sy-hh*sp.sc]}
    var lastPil=-1;
    for(i=sl0.length-1;i>0;i--){var A=sl0[i],B=sl0[i-1];
      /* Stützen */
      var pid=Math.floor(A.q/14);if(pid!==lastPil&&A.d<120){lastPil=pid;var pb=A.sy+.35*A.sc,pg=HZ+(CAMH+7)*A.sc;if(pg>pb){cx.fillStyle='#B0BEC5';cx.fillRect(A.sx-.09*A.sc,pb,.18*A.sc,pg-pb);cx.fillStyle='#78909C';cx.fillRect(A.sx+.02*A.sc,pb,.07*A.sc,pg-pb)}}
      var gA=GAP[Math.floor(A.q)],gB=GAP[Math.floor(B.q)];
      if(gA||gB){if(gA!==gB){var E=gA?B:A;cx.strokeStyle='#4E342E';cx.lineWidth=Math.max(1.5,.06*E.sc);cx.lineJoin='round';cx.beginPath();for(var zj=0;zj<=10;zj++){var uu2=-1.18+zj*.236,pq=P3(E,uu2);cx.lineTo(pq[0],pq[1]+((zj%2)?.08:-.04)*E.sc)}cx.stroke();
          cx.fillStyle='rgba(120,200,255,.7)';for(zj=0;zj<5;zj++){var dr=P3(E,-.4+zj*.2);cx.fillRect(dr[0]-1,dr[1],2,(.4+((fr*.7+zj*13)%30)/30*1.6)*E.sc)}}
        if(rp&&A.d>CAMD&&B.d<=CAMD&&fall<=0)drawRider();continue}
      /* Aussenseite der Rinne (unterhalb der Kante) */
      var col=COLS[A.c],stripe=Math.floor(A.q/3)%2;
      cx.fillStyle=shade(col[1],-.25);cx.beginPath();var o1=P3(A,-1.18),o2=P3(A,1.18),o3=P3(B,1.18),o4=P3(B,-1.18);cx.moveTo(o1[0],o1[1]);cx.lineTo(A.sx-HW*A.sc*1.05,A.sy+.3*A.sc);cx.lineTo(A.sx+HW*A.sc*1.05,A.sy+.3*A.sc);cx.lineTo(o2[0],o2[1]);cx.lineTo(o3[0],o3[1]);cx.lineTo(B.sx+HW*B.sc*1.05,B.sy+.3*B.sc);cx.lineTo(B.sx-HW*B.sc*1.05,B.sy+.3*B.sc);cx.lineTo(o4[0],o4[1]);cx.closePath();cx.fill();
      /* Innenfläche in Streifen */
      for(var j=0;j<NS;j++){var u0=-1.18+j*2.36/NS,u1=u0+2.36/NS,um=(u0+u1)/2,lt=.16*Math.cos((um+.35)*1.3)-.1*Math.abs(um);
        var p1=P3(A,u0),p2=P3(A,u1),p3=P3(B,u1),p4=P3(B,u0);cx.fillStyle=shade(stripe?col[0]:col[1],lt);cx.beginPath();cx.moveTo(p1[0],p1[1]);cx.lineTo(p2[0],p2[1]);cx.lineTo(p3[0],p3[1]+.6);cx.lineTo(p4[0],p4[1]+.6);cx.closePath();cx.fill()}
      /* Wasserfilm */
      var wf=.42,w1=P3(A,-wf),w2=P3(A,wf),w3=P3(B,wf),w4=P3(B,-wf),wa=.35+.15*Math.sin(A.q*.9-fr*.35);cx.fillStyle='rgba(190,240,255,'+wa+')';cx.beginPath();cx.moveTo(w1[0],w1[1]);cx.lineTo(w2[0],w2[1]);cx.lineTo(w3[0],w3[1]);cx.lineTo(w4[0],w4[1]);cx.closePath();cx.fill();
      if(Math.floor(A.q*1.3-fr*.25)%5===0){var sx3=Math.sin(A.q*1.7)*.25;var s1=P3(A,sx3-.08),s2=P3(A,sx3+.08);cx.fillStyle='rgba(255,255,255,.55)';cx.fillRect(s1[0],s1[1]-1,s2[0]-s1[0],Math.max(1.2,A.sc*.03))}
      /* Kante (weisser Rand) */
      [-1.18,1.18].forEach(function(uu){var e1=P3(A,uu),e2=P3(B,uu);cx.strokeStyle='#F5F7FA';cx.lineWidth=Math.max(1.2,.07*B.sc);cx.beginPath();cx.moveTo(e1[0],e1[1]);cx.lineTo(e2[0],e2[1]);cx.stroke();cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=Math.max(.6,.025*B.sc);var g1=P3(A,uu*.8),g2=P3(B,uu*.8);cx.beginPath();cx.moveTo(g1[0],g1[1]);cx.lineTo(g2[0],g2[1]);cx.stroke()});
      /* Fahrer zeichnen, wenn seine Tiefe erreicht ist */
      if(rp&&A.d>CAMD&&B.d<=CAMD&&fall<=0)drawRider()}
    function drawRider(){var lift=RISE*Math.min(1.25,u*u)*rp.sc,rx0=rp.sx+u*HW*rp.sc*.95,ry0=rp.sy-lift+.05*rp.sc-jh*rp.sc,sc2=rp.sc*HW/48*.62;if(jh>0){cx.fillStyle='rgba(0,40,70,.25)';cx.beginPath();cx.ellipse(rx0,ry0+jh*rp.sc+10*sc2,22*sc2,6*sc2,0,0,7);cx.fill()}
      if(inv>0&&Math.floor(fr/6)%2)cx.globalAlpha=.6;
      if(Math.abs(u)>.82)glow(cx,rx0,ry0,sc2*40,'rgba(255,70,70,'+(.3+.25*Math.sin(fr*.6))+')');
      for(var k=0;k<3;k++){cx.fillStyle='rgba(255,255,255,'+(.5-k*.14)+')';cx.beginPath();cx.ellipse(rx0-uv*(k+1)*12,ry0+10*sc2+k*7,(15-k*3)*sc2,4*sc2,0,0,7);cx.fill()}
      rider(rx0,ry0,sc2,tilt);cx.globalAlpha=1;
      if(fr%2<f)burst(P,rx0+(Math.random()-.5)*20*sc2,ry0+8*sc2,1,['#fff','#B3E5FC'],2+v*.1)}
    if(fall>0&&rp){var fk=Math.min(1,fx/40),dir=Math.sign(u||1),rx1=gapFall?rp.sx:rp.sx+dir*HW*rp.sc*1.1+dir*fk*w*.3,ry1=gapFall?rp.sy+fk*fk*h*.45:rp.sy-RISE*rp.sc-Math.sin(fk*3.14)*h*.18+fk*h*.25;if(fx<50)rider(rx1,ry1,rp.sc*HW/48*.62*(1-.3*fk),fx*.25*dir);if(fx>38&&fx<40+f)burst(P,rx1,ry1,30,['#fff','#81D4FA'],9)}
    /* Tempo-Linien bei hoher Geschwindigkeit */
    if(v>12){var al=Math.min(.5,(v-12)/12);cx.strokeStyle='rgba(255,255,255,'+al+')';cx.lineWidth=2;for(i=0;i<10;i++){var an=gHash(i+Math.floor(fr/3)*13)*6.28,r1=w*(.35+gHash(i+5)*.2),r2=r1+w*.12;cx.beginPath();cx.moveTo(w/2+Math.cos(an)*r1,h*.55+Math.sin(an)*r1*.7);cx.lineTo(w/2+Math.cos(an)*r2,h*.55+Math.sin(an)*r2*.7);cx.stroke()}}
    var gz=-1;for(var gq=Math.floor(z+CAMD);gq<z+CAMD+38;gq++){ens(gq+1);if(GAP[gq]){gz=gq;break}}
    if(gz>0&&!air&&fall<=0){var dd2=gz-(z+CAMD),pul=.75+.25*Math.sin(fr*.4);cx.save();cx.globalAlpha=pul;cx.fillStyle='rgba(229,57,53,.92)';rr(cx,w*.12,h*.25,w*.76,h*.07,14);cx.fill();cx.fillStyle='#fff';cx.font='900 '+Math.floor(w*.046)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('⚠️ Lücke! Tippen = springen',w/2,h*.285);cx.restore();
      cx.fillStyle='rgba(255,255,255,.9)';cx.font='800 '+Math.floor(w*.038)+'px sans-serif';cx.textAlign='center';cx.fillText('noch '+Math.max(0,Math.round(dd2))+' m',w/2,h*.345)}
    /* Tempo-Anzeige */
    cx.save();var kmh=Math.round(v*3.6);cx.font='800 '+Math.floor(w*.04)+'px sans-serif';cx.textAlign='left';cx.textBaseline='bottom';cx.fillStyle='rgba(0,40,70,.55)';rr(cx,w*.03,h*.9,w*.25,h*.065,10);cx.fill();cx.fillStyle='#fff';cx.fillText(kmh+' km/h',w*.06,h*.952);cx.restore();
    if(z<25&&fall<=0&&gz<0){cx.save();cx.font='700 '+Math.floor(w*.042)+'px sans-serif';cx.textAlign='center';cx.fillStyle='#fff';cx.strokeStyle='rgba(0,40,70,.6)';cx.lineWidth=4;var t2='Halte links oder rechts zum Lenken';cx.strokeText(t2,w/2,h*.2);cx.fillText(t2,w/2,h*.2);cx.restore()}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  cv.__ws=function(){var gd=-1;for(var q=Math.floor(z+CAMD);q<z+CAMD+60;q++){ens(q+1);if(GAP[q]){gd=q-(z+CAMD);break}}return {z:z,v:v,u:u,s:s,lives:lives,gd:gd,air:air}};cv.__jump=jump;cv.__steer=function(x){touches.t=x;upd()};
  return function(){L.stop();unb()}};

/* ---------------- Mückenjagd (Labyrinth) ---------------- */
GAMEFN.maze=function(cv,cx,w,h,score,over){
  var MAP=['#########','#.......#','#.##.##.#','#.......#','#.#.#.#.#','#...#...#','#.#.#.#.#','#.......#','#.##.##.#','#.......#','#########'],NC=9,NR=11,cs=Math.floor(Math.min(w/NC,h/NR)),ox=Math.floor((w-cs*NC)/2),oy=Math.floor((h-cs*NR)/2);
  var s=0,lives=3,fr=0,P=[],F=[],inv=0,i,j,dpr=cv.width/w,rel=300,camX=w/2,camY=h/2;
  function open(x,y){return y>=0&&y<NR&&x>=0&&x<NC&&MAP[y][x]!=='#'}
  /* statischer Hintergrund */
  var bgc=document.createElement('canvas');bgc.width=w*dpr;bgc.height=h*dpr;var bx=bgc.getContext('2d');bx.scale(dpr,dpr);
  (function(){
    function room(i,j){if(j<4)return i<4?0:1;if(j<7)return 2;return i<4?3:4}
    bx.fillStyle='#6D4C41';bx.fillRect(0,0,w,h);
    for(j=0;j<NR;j++)for(i=0;i<NC;i++){if(MAP[j][i]==='#')continue;var x=ox+i*cs,y=oy+j*cs,r=room(i,j);
      if(r===0){bx.fillStyle=((i+j)%2)?'#F3EEDC':'#B7D7B0';bx.fillRect(x,y,cs,cs);bx.fillStyle='rgba(0,0,0,.05)';bx.fillRect(x,y,cs,1);bx.fillRect(x,y,1,cs)}
      else if(r===1){bx.fillStyle='#9FC4E8';bx.fillRect(x,y,cs,cs);bx.fillStyle='rgba(255,255,255,.28)';for(var q=0;q<4;q++){bx.beginPath();bx.arc(x+cs*(.2+.2*q),y+cs*(.25+.5*((q+i+j)%2)),cs*.07,0,7);bx.fill()}}
      else if(r===2){bx.fillStyle=((i+Math.floor(j/1))%2)?'#D9A66B':'#CF9A5E';bx.fillRect(x,y,cs,cs);bx.strokeStyle='rgba(90,50,10,.35)';bx.lineWidth=1;bx.strokeRect(x+.5,y+.5,cs-1,cs-1);bx.beginPath();bx.moveTo(x,y+cs/2);bx.lineTo(x+cs,y+cs/2);bx.stroke()}
      else if(r===3){bx.fillStyle=((i+j)%2)?'#D6EEF7':'#BFE3F1';bx.fillRect(x,y,cs,cs);bx.strokeStyle='rgba(255,255,255,.8)';bx.strokeRect(x+.5,y+.5,cs-1,cs-1)}
      else{bx.fillStyle='#A9784C';bx.fillRect(x,y,cs,cs);bx.strokeStyle='rgba(60,30,5,.4)';bx.beginPath();for(var q2=1;q2<4;q2++){bx.moveTo(x,y+q2*cs/4);bx.lineTo(x+cs,y+q2*cs/4)}bx.stroke()}}
    /* Wandschatten + Waende */
    for(j=0;j<NR;j++)for(i=0;i<NC;i++){if(MAP[j][i]!=='#')continue;var x2=ox+i*cs,y2=oy+j*cs;bx.fillStyle='rgba(0,0,0,.28)';bx.fillRect(x2+cs*.12,y2+cs*.14,cs,cs)}
    for(j=0;j<NR;j++)for(i=0;i<NC;i++){if(MAP[j][i]!=='#')continue;var x3=ox+i*cs,y3=oy+j*cs,ext=(i===0||j===0||i===NC-1||j===NR-1);
      bx.fillStyle=ext?'#8D3B2E':'#E9E2D3';bx.fillRect(x3,y3,cs,cs);
      if(ext){bx.strokeStyle='rgba(255,220,200,.25)';bx.lineWidth=1;for(var q3=1;q3<4;q3++){bx.beginPath();bx.moveTo(x3,y3+q3*cs/4);bx.lineTo(x3+cs,y3+q3*cs/4);bx.stroke()}}
      else{bx.fillStyle='#F8F5EE';bx.fillRect(x3+cs*.06,y3+cs*.06,cs*.88,cs*.88);bx.strokeStyle='rgba(120,100,80,.5)';bx.lineWidth=1.5;bx.strokeRect(x3+.75,y3+.75,cs-1.5,cs-1.5);bx.fillStyle='rgba(0,0,0,.07)';bx.fillRect(x3+cs*.06,y3+cs*.7,cs*.88,cs*.24)}}
    /* Deko */
    var DK=[[1,1,'🍳'],[3,3,'🍽️'],[7,1,'🛏️'],[5,3,'🧸'],[1,5,'📚'],[7,5,'🛋️'],[2,7,'🛁'],[3,9,'🚿'],[5,9,'🪴'],[7,9,'🖥️'],[1,3,'🪴'],[7,3,'🪴']];
    bx.textAlign='center';bx.textBaseline='middle';bx.globalAlpha=.55;bx.font=Math.floor(cs*.5)+'px sans-serif';DK.forEach(function(d){if(MAP[d[1]][d[0]]!=='#')bx.fillText(d[2],ox+(d[0]+.5)*cs,oy+(d[1]+.55)*cs)});bx.globalAlpha=1;
    /* Teppiche */
    bx.fillStyle='rgba(183,28,28,.22)';rr(bx,ox+2.2*cs,oy+4.2*cs,cs*4.6,cs*.6,cs*.2);bx.fill();
  })();
  function mk(cx0,cy0,sp,kind,col){return {cx:cx0,cy:cy0,dx:0,dy:0,p:0,sp:sp,k:kind,col:col,hx:cx0,hy:cy0,st:0,face:1,want:null,ph:Math.random()*6}}
  var M=mk(4,7,.098,'m'),HC=[['#1E88E5','#5D4037'],['#1E88E5','#5D4037'],['#1E88E5','#5D4037'],['#1E88E5','#5D4037']],HM=[[1,1],[7,1],[1,9],[7,9]].map(function(a,k){var e=mk(a[0],a[1],.062,'h',HC[k]);e.dx=1;return e}),OM=mk(4,3,.058,'o');OM.hold=280;
  function pos(e){return {x:e.cx+e.dx*e.p,y:e.cy+e.dy*e.p}}
  function ai(e,flee){var m=pos(M),o=[],d=[[1,0],[-1,0],[0,1],[0,-1]];d.forEach(function(v){if(open(e.cx+v[0],e.cy+v[1]))o.push(v)});if(o.length>1)o=o.filter(function(v){return !(v[0]===-e.dx&&v[1]===-e.dy)});if(!o.length){e.dx=-e.dx;e.dy=-e.dy;return}
    var best=o[0],bv=flee?-1e9:1e9;if(Math.random()<(flee?.14:.22)){best=o[Math.floor(Math.random()*o.length)]}else o.forEach(function(v){var dd=Math.hypot(e.cx+v[0]-m.x,e.cy+v[1]-m.y)+Math.random()*.3;if(flee?dd>bv:dd<bv){bv=dd;best=v}});e.dx=best[0];e.dy=best[1]}
  function advance(e,dist){var g=0;while(dist>1e-6&&g++<12){
      if(e.p===0){
        if(e.k==='m'){var wv=e.want;if(wv&&open(e.cx+wv[0],e.cy+wv[1])){e.dx=wv[0];e.dy=wv[1];e.want=null}
          if(!(e.dx||e.dy)||!open(e.cx+e.dx,e.cy+e.dy)){e.dx=0;e.dy=0;return}}
        else ai(e,e.k==='h');
        if(!(e.dx||e.dy))return}
      var adv=Math.min(dist,1-e.p);e.p+=adv;dist-=adv;if(e.p>=.999999){e.cx+=e.dx;e.cy+=e.dy;e.p=0}}}
  function setWant(v){if(!v)return;if(M.p>0&&(M.dx||M.dy)&&v[0]===-M.dx&&v[1]===-M.dy){M.cx+=M.dx;M.cy+=M.dy;M.dx=-M.dx;M.dy=-M.dy;M.p=1-M.p;M.want=null;return}
    M.want=v;M.wt=90;if(M.p===0&&!(M.dx||M.dy)&&open(M.cx+v[0],M.cy+v[1])){M.dx=v[0];M.dy=v[1];M.want=null}}
  var JS=null;function jpt(e){var q=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0])||e;return {x:q.clientX,y:q.clientY}}
  function jdn(e){if(e.cancelable)e.preventDefault();var q=jpt(e),r=cv.getBoundingClientRect();JS={ox:q.x,oy:q.y,rx:q.x-r.left,ry:q.y-r.top,mv:false}}
  function jmv(e){if(!JS)return;if(e.cancelable)e.preventDefault();var q=jpt(e),dx=q.x-JS.ox,dy=q.y-JS.oy,d=Math.hypot(dx,dy);if(d>8){JS.mv=true;setWant(Math.abs(dx)>Math.abs(dy)?[dx<0?-1:1,0]:[0,dy<0?-1:1]);if(d>34){JS.ox+=dx*(d-34)/d;JS.oy+=dy*(d-34)/d}}}
  function jup(){if(JS&&!JS.mv){var m=pos(M),mx=ox+(m.x+.5)*cs,my=oy+(m.y+.5)*cs,ddx=JS.rx-mx,ddy=JS.ry-my;setWant(Math.abs(ddx)>Math.abs(ddy)?[ddx<0?-1:1,0]:[0,ddy<0?-1:1])}JS=null}
  function jkd(e){var V={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(V){e.preventDefault();setWant(V)}}
  cv.addEventListener('touchstart',jdn,{passive:false});cv.addEventListener('touchmove',jmv,{passive:false});cv.addEventListener('touchend',jup);cv.addEventListener('touchcancel',function(){JS=null});cv.addEventListener('mousedown',jdn);window.addEventListener('mousemove',jmv);window.addEventListener('mouseup',jup);document.addEventListener('keydown',jkd);
  function unb(){cv.removeEventListener('touchstart',jdn);cv.removeEventListener('touchmove',jmv);cv.removeEventListener('touchend',jup);cv.removeEventListener('mousedown',jdn);window.removeEventListener('mousemove',jmv);window.removeEventListener('mouseup',jup);document.removeEventListener('keydown',jkd)}
  function mosq(x,y,ang,t){cx.save();cx.translate(x,y);cx.rotate(ang+Math.PI/2);var u=cs/27;cx.scale(u,u);
    glow(cx,0,0,22,'rgba(255,60,60,.25)');cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(5,9,10,5,0,0,7);cx.fill();
    cx.strokeStyle='#2B2B2B';cx.lineWidth=1.4;cx.lineCap='round';[[-1,-4],[-1,1],[-1,6],[1,-4],[1,1],[1,6]].forEach(function(l,k){var sw=Math.sin(t*.5+k)*3;cx.beginPath();cx.moveTo(l[0]*3,l[1]);cx.lineTo(l[0]*12,l[1]-3+sw);cx.lineTo(l[0]*15,l[1]+5+sw);cx.stroke()});
    var wf=Math.sin(t*1.6)*.5;cx.fillStyle='rgba(220,240,255,.7)';cx.strokeStyle='rgba(120,160,200,.8)';cx.lineWidth=.8;cx.save();cx.translate(-3,-3);cx.rotate(-.7-wf);cx.beginPath();cx.ellipse(-9,0,13,5.5,0,0,7);cx.fill();cx.stroke();cx.restore();cx.save();cx.translate(3,-3);cx.rotate(.7+wf);cx.beginPath();cx.ellipse(9,0,13,5.5,0,0,7);cx.fill();cx.stroke();cx.restore();
    cx.fillStyle=grad(cx,-5,0,5,0,'#555','#222');cx.beginPath();cx.ellipse(0,9,4.6,10,0,0,7);cx.fill();cx.strokeStyle='rgba(255,255,255,.55)';cx.lineWidth=1.3;for(var a=0;a<4;a++){cx.beginPath();cx.moveTo(-4,4+a*4.2);cx.lineTo(4,4+a*4.2);cx.stroke()}
    cx.fillStyle='#3A3A3A';cx.beginPath();cx.ellipse(0,-2,5,5.4,0,0,7);cx.fill();cx.fillStyle='#4A4A4A';cx.beginPath();cx.arc(0,-9,4.2,0,7);cx.fill();
    cx.fillStyle='#FF1744';cx.beginPath();cx.arc(-2.6,-10,1.9,0,7);cx.arc(2.6,-10,1.9,0,7);cx.fill();cx.fillStyle='#fff';cx.fillRect(-3,-11,1,1);cx.fillRect(2.2,-11,1,1);
    cx.strokeStyle='#111';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(0,-12);cx.lineTo(0,-22);cx.stroke();cx.beginPath();cx.moveTo(-1.5,-12);cx.quadraticCurveTo(-6,-17,-5,-21);cx.moveTo(1.5,-12);cx.quadraticCurveTo(6,-17,5,-21);cx.lineWidth=.8;cx.stroke();
    cx.restore()}
  function human(e,t){var q=pos(e),x=ox+(q.x+.5)*cs,y=oy+(q.y+.5)*cs,u=cs/27,st=e.st>0,run=Math.sin(t*.55+e.ph),moving=!st;if(e.dx)e.face=e.dx;
    if(e.hide>0)return;cx.save();cx.translate(x,y);cx.scale(u,u);
    cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(0,14,11,4,0,0,7);cx.fill();
    cx.save();cx.scale(e.face,1);
    var pa=Math.sin(t*.9+e.ph)*(moving?1:.3);
    cx.strokeStyle='#37474F';cx.lineWidth=4;cx.lineCap='round';cx.beginPath();cx.moveTo(-3,6);cx.lineTo(-3+run*5,14);cx.moveTo(3,6);cx.lineTo(3-run*5,14);cx.stroke();
    cx.fillStyle=e.col[0];rr(cx,-7,-4,14,13,5);cx.fill();cx.fillStyle='rgba(255,255,255,.28)';rr(cx,-5,-3,6,4,2);cx.fill();
    cx.strokeStyle='#F2B98F';cx.lineWidth=3.2;cx.beginPath();cx.moveTo(-7,-1);cx.lineTo(-13,-10+pa*4);cx.moveTo(7,-1);cx.lineTo(13,-10-pa*4);cx.stroke();
    cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(0,-10,7.2,0,7);cx.fill();cx.fillStyle=e.col[1];cx.beginPath();cx.arc(0,-12,7.4,3.3,6.1);cx.fill();
    cx.fillStyle='#fff';cx.beginPath();cx.arc(-2.7,-10.5,2.2,0,7);cx.arc(2.7,-10.5,2.2,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(-2.4,-10.5,1,0,7);cx.arc(3,-10.5,1,0,7);cx.fill();
    cx.fillStyle='#B71C1C';cx.beginPath();cx.ellipse(0,-6,2,2.6+Math.abs(run)*.8,0,0,7);cx.fill();
    if(st){cx.fillStyle='#E53935';cx.beginPath();cx.arc(-3,-15,2.6,0,7);cx.fill()}
    cx.restore();
    if(!st){cx.fillStyle='#4FC3F7';var dr=(t*.4)%8;cx.beginPath();cx.ellipse(-10*e.face,-20+dr*.4,1.6,2.4,0,0,7);cx.fill();cx.fillStyle='#FFEB3B';cx.font='bold 12px sans-serif';cx.textAlign='center';cx.fillText('!',11,-24+Math.sin(t*.7)*2)}
    else{cx.font='12px sans-serif';cx.textAlign='center';cx.fillText('💫',0,-22+Math.sin(t*.3)*2)}
    cx.restore()}
  function oma(e,t){var q=pos(e),x=ox+(q.x+.5)*cs,y=oy+(q.y+.5)*cs,u=cs/27,run=Math.sin(t*.45);if(e.dx)e.face=e.dx||e.face||1;cx.save();cx.translate(x,y);cx.scale(u,u);
    var pl=.5+.5*Math.sin(t*.25);glow(cx,0,6,34+pl*6,'rgba(255,0,0,'+(.35+.2*pl)+')');cx.strokeStyle='rgba(229,57,53,'+(.7+.3*pl)+')';cx.lineWidth=3;cx.beginPath();cx.ellipse(0,15,16+pl*2,6+pl,0,0,7);cx.stroke();cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(0,15,12,4.5,0,0,7);cx.fill();cx.save();cx.scale(e.face||1,1);
    cx.strokeStyle='#8D6E63';cx.lineWidth=4;cx.lineCap='round';cx.beginPath();cx.moveTo(-3,8);cx.lineTo(-3+run*4,15);cx.moveTo(3,8);cx.lineTo(3-run*4,15);cx.stroke();
    cx.fillStyle=grad(cx,0,-4,0,12,'#E53935','#7F0000');cx.beginPath();cx.moveTo(-6,-4);cx.lineTo(6,-4);cx.lineTo(10,11);cx.lineTo(-10,11);cx.closePath();cx.fill();cx.fillStyle='#fff';[[-3,2],[3,5],[-1,8]].forEach(function(d){cx.beginPath();cx.arc(d[0],d[1],1.2,0,7);cx.fill()});
    var sw=Math.sin(t*.5)*.5;cx.strokeStyle='#F2B98F';cx.lineWidth=3.2;cx.beginPath();cx.moveTo(6,-2);cx.lineTo(13,-11);cx.stroke();
    cx.save();cx.translate(13,-11);cx.rotate(-.6+sw);cx.strokeStyle='#FBC02D';cx.lineWidth=2.4;cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,-9);cx.stroke();cx.fillStyle='#FFEE58';cx.strokeStyle='#F9A825';cx.lineWidth=1;rr(cx,-6,-22,12,13,2);cx.fill();cx.stroke();cx.strokeStyle='rgba(249,168,37,.7)';for(var a=-4;a<=4;a+=4){cx.beginPath();cx.moveTo(a,-21);cx.lineTo(a,-10);cx.stroke()}cx.restore();
    cx.strokeStyle='#F2B98F';cx.lineWidth=3.2;cx.beginPath();cx.moveTo(-6,-2);cx.lineTo(-11,3);cx.stroke();
    cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(0,-10,7.2,0,7);cx.fill();cx.fillStyle='#CFD8DC';cx.beginPath();cx.arc(0,-12.5,7.4,3.3,6.1);cx.fill();cx.beginPath();cx.arc(-1,-19,3.6,0,7);cx.fill();
    cx.strokeStyle='#37474F';cx.lineWidth=1.1;cx.beginPath();cx.arc(-2.8,-10,2.5,0,7);cx.arc(2.8,-10,2.5,0,7);cx.moveTo(-.3,-10);cx.lineTo(.3,-10);cx.stroke();cx.fillStyle='#111';cx.fillRect(-3.4,-10.6,1.2,1.2);cx.fillRect(2.2,-10.6,1.2,1.2);
    cx.strokeStyle='#C62828';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(-2,-5);cx.lineTo(2,-6.2);cx.stroke();cx.beginPath();cx.moveTo(-5,-14.5);cx.lineTo(-1,-13);cx.moveTo(5,-14.5);cx.lineTo(1,-13);cx.stroke();
    cx.restore();cx.font='bold 15px sans-serif';cx.textAlign='center';cx.fillStyle='#FF1744';cx.fillText('💢',2,-30+Math.sin(t*.4)*2);cx.restore()}
  function reset(){M.cx=4;M.cy=7;M.dx=0;M.dy=0;M.p=0;M.want=null;OM.cx=4;OM.cy=3;OM.dx=0;OM.dy=0;OM.p=0;OM.hold=140;HM.forEach(function(e){if(e.st<=0&&false){}})}
  var L=loopRun(function(f){fr+=f;inv=Math.max(0,inv-f);if(OM.hold>0)OM.hold-=f;
    if(M.want){M.wt-=f;if(M.wt<=0)M.want=null}
    if(M.want&&(M.dx||M.dy)&&M.p>0){var wq=M.want;if(wq[0]*M.dx+wq[1]*M.dy===0){if(M.p>.6&&open(M.cx+M.dx+wq[0],M.cy+M.dy+wq[1]))M.p=.9999999;else if(M.p<=.4&&open(M.cx+wq[0],M.cy+wq[1]))M.p=0}}
    advance(M,M.sp*f);var mpos=pos(M);if(M.dx||M.dy)M.ang=Math.atan2(M.dy,M.dx);if(M.ang==null)M.ang=-Math.PI/2;
    var sc=1+Math.min(.3,s*.02);HM.forEach(function(e){if(e.st>0){e.st-=f;e.hide=e.st<110&&e.st>0&&Math.floor(e.st/6)%2?1:0;if(e.st<=0){e.cx=e.hx;e.cy=e.hy;e.dx=1;e.dy=0;e.p=0;e.hide=0}return}advance(e,e.sp*sc*f);
      var q=pos(e);if(Math.hypot(q.x-mpos.x,q.y-mpos.y)<.62){e.st=140;s++;score(s);F.push({x:ox+(q.x+.5)*cs,y:oy+(q.y+.5)*cs-cs*.6,t:'ZACK! +1',l:46,c:'#FFEB3B'});burst(P,ox+(q.x+.5)*cs,oy+(q.y+.5)*cs,14,['#FF1744','#fff','#FFEB3B'],7)}});
    if(OM.hold<=0){advance(OM,OM.sp*f);var oq=pos(OM);if(inv<=0&&Math.hypot(oq.x-mpos.x,oq.y-mpos.y)<.6){lives--;shakeBox();burst(P,ox+(mpos.x+.5)*cs,oy+(mpos.y+.5)*cs,26,['#fff','#CFD8DC','#FF8A80'],9);F.push({x:w/2,y:h*.45,t:'KLATSCH!',l:50,c:'#FF8A80'});if(lives<=0){L.stop();unb();over();return}reset();inv=120}}
    var ZM=1.25,tgx=ox+(mpos.x+.5)*cs,tgy=oy+(mpos.y+.5)*cs;camX+=(tgx-camX)*Math.min(1,.12*f);camY+=(tgy-camY)*Math.min(1,.12*f);var vx0=Math.max(0,Math.min(w-w/ZM,camX-w/ZM/2)),vy0=Math.max(0,Math.min(h-h/ZM,camY-h/ZM/2));cx.save();cx.scale(ZM,ZM);cx.translate(-vx0,-vy0);
    cx.drawImage(bgc,0,0,w,h);
    var t=fr;HM.forEach(function(e){human(e,t)});if(OM.hold>0&&Math.floor(fr/8)%2){cx.globalAlpha=.5}oma(OM,t);cx.globalAlpha=1;
    if(inv<=0||Math.floor(fr/4)%2)mosq(ox+(mpos.x+.5)*cs,oy+(mpos.y+.5)*cs,M.ang,fr);
    stepP(cx,P,f);floatTxt(cx,F,f);cx.restore();
    /* Nacht-Vignette */
    var vg=cx.createRadialGradient(w/2,h/2,w*.35,w/2,h/2,w*.75);vg.addColorStop(0,'rgba(0,0,20,0)');vg.addColorStop(1,'rgba(0,0,20,.18)');cx.fillStyle=vg;cx.fillRect(0,0,w,h);
    hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}};

/* ---------------- Golf: Putten (Kurvenbahn, 3D-Look) ---------------- */
GAMEFN.golf=function(cv,cx,w,h,score,over){
  var s=0,fr=0,P=[],F=[],i,dpr=cv.width/w,hole=0,putt=0,state='aim',drag=null,sink=0,msg=null,mt=0,br=w*.0145,hr=br*1.62,MAXP=4,RW0=w*.07;
  var B={x:0,y:0,vx:0,vy:0},H={x:0,y:0},rest={x:0,y:0},PATH=[],WID=[],LK=[],BK=[],TR=[],GR=null,trail=[],bgc=document.createElement('canvas'),ZM=1.65,BQ=dpr*ZM;bgc.width=w*BQ;bgc.height=h*BQ;var bx=bgc.getContext('2d');bx.scale(BQ,BQ);var OBX=w*.045,camX=w/2,camY=h/2,camZ=1,intro=0,TYPES=['dogleg','s','straight','island','grove'],T0=Math.floor(Math.random()*5),htype='dogleg',STK=[];
  function bez(a,b,c,d,t){var u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d}
  function blob(x,y,r,sy,rot){return {x:x,y:y,r:r,sy:sy,rot:rot,p1:Math.random()*6.28,p2:Math.random()*6.28,p3:Math.random()*6.28}}
  function bR(o,th){return o.r*(1+.2*Math.sin(2*th+o.p1)+.13*Math.sin(3*th+o.p2)+.07*Math.sin(5*th+o.p3))}
  function bIn(o,px,py,k){k=k||1;var dx=px-o.x,dy=py-o.y,c=Math.cos(-o.rot),sn=Math.sin(-o.rot),lx=dx*c-dy*sn,ly=(dx*sn+dy*c)/o.sy;return Math.hypot(lx,ly)<bR(o,Math.atan2(ly,lx))*k}
  function bPath(c,o,k){k=k||1;c.beginPath();for(var q=0;q<=48;q++){var th=q/48*6.2832,r=bR(o,th)*k,lx=Math.cos(th)*r,ly=Math.sin(th)*r*o.sy,cs=Math.cos(o.rot),sn=Math.sin(o.rot),X=o.x+lx*cs-ly*sn,Y=o.y+lx*sn+ly*cs;q?c.lineTo(X,Y):c.moveTo(X,Y)}c.closePath()}
  function dPath(px,py){var bd=1e9,bi=0;for(var q=0;q<PATH.length;q++){var d=Math.hypot(px-PATH[q].x,py-PATH[q].y);if(d<bd){bd=d;bi=q}}return {d:bd,i:bi}}
  function zoneAt(px,py){if(GR&&bIn(GR,px,py,1.12))return 'green';var a=dPath(px,py),hw=WID[a.i]/2;return a.d<=hw?'fair':a.d<=hw+RW0?'rough':a.d<=hw+RW0+OBX?'wood':'ob'}
  function newHole(){putt=0;state='aim';sink=0;trail=[];msg=null;PATH=[];WID=[];LK=[];BK=[];TR=[];STK=[];intro=0;htype=TYPES[(T0+hole)%5];var WB=htype==='straight'?.15:htype==='grove'?.24:htype==='island'?.17:.19;
    var tx,ty=h*.9,gxx,gyy=h*.22,sg,A,c1x,c2x,ph,bestD=0,bestP=null,at,Sc,LL0=null;
    for(at=0;at<80;at++){tx=w*gRnd(.34,.66);gxx=w*gRnd(.28,.72);sg=Math.random()<.5?-1:1;A=htype==='straight'?w*gRnd(.02,.08):htype==='dogleg'?w*gRnd(.42,.52):htype==='s'?w*gRnd(.36,.46):w*gRnd(.18,.3);Sc=htype==='s';c1x=Math.max(w*.08,Math.min(w*.92,tx+sg*A));c2x=Math.max(w*.08,Math.min(w*.92,gxx+(Sc?-1:1)*sg*A*gRnd(.7,1.1)));ph=Math.random()*6;PATH=[];WID=[];
      for(i=0;i<=52;i++){var t=i/52;PATH.push({x:bez(tx,c1x,c2x,gxx,t),y:bez(ty,h*.68,h*.44,gyy,t),t:t});WID.push(w*(WB+.03*Math.sin(t*6+ph)))}
      bestD=0;bestP=null;for(var q=6;q<=18;q++){var lt=q/24,lx=tx+(gxx-tx)*lt,ly=ty+(gyy-ty)*lt,da=dPath(lx,ly),dd=da.d-WID[da.i]/2-RW0;if(dd>bestD){bestD=dd;bestP={x:lx,y:ly}}}
      if(bestP&&bestD>=w*.05){var LL=blob(bestP.x,bestP.y,Math.max(w*.055,Math.min(w*.125,bestD*.95+RW0*.5)),.78,Math.atan2(gyy-ty,gxx-tx)+1.5708),bad=false;for(var q2=0;q2<PATH.length&&!bad;q2++){var pp=PATH[q2],a2=pp.t<1?PATH[Math.min(52,q2+1)]:pp,nx=-(a2.y-pp.y),ny=a2.x-pp.x,nl2=Math.hypot(nx,ny)||1;nx/=nl2;ny/=nl2;for(var sd0=-1;sd0<=1;sd0++)if(bIn(LL,pp.x+nx*sd0*WID[q2]*.5,pp.y+ny*sd0*WID[q2]*.5,1.05))bad=true}if(!bad&&!bIn(LL,tx,ty,1.4)&&!bIn(LL,gxx,gyy,1.4)){LL0=LL;break}}}
    var ldx=gxx-tx,ldy=gyy-ty,lAng=Math.atan2(ldy,ldx)+1.5708,lR=LL0?LL0.r:w*.06;
    if(LL0)LK.push(LL0);
    var lq=bestP||{x:tx,y:ty},lk2=null;for(var q3=5;q3<=19;q3+=2){var l2={x:tx+ldx*q3/24,y:ty+ldy*q3/24};var d3=dPath(l2.x,l2.y);if(Math.hypot(l2.x-lq.x,l2.y-lq.y)>lR*1.9&&d3.d-WID[d3.i]/2-RW0>-w*.02){lk2=l2;break}}
    if(lk2&&hole>0){var lr2=Math.min(w*.09,lR*.8);LK.push(blob(lk2.x,lk2.y,lr2,.75,lAng))}
    GR=blob(gxx,gyy,w*(htype==='island'?.1:htype==='straight'?.09:.12),.85,Math.random()*3);H.x=gxx+gRnd(-1,1)*w*.025;H.y=gyy+gRnd(-1,1)*w*.025;B.x=tx;B.y=ty;B.vx=B.vy=0;B.gone=0;rest.x=B.x;rest.y=B.y;
    function nrm(k){var a=PATH[Math.max(0,k-1)],b=PATH[Math.min(PATH.length-1,k+1)],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1;return {x:-dy/l,y:dx/l}}
    var nl=htype==='island'?0:hole<2?0:1,nb=htype==='straight'?4:htype==='island'?1:hole<1?1:hole<3?2:3,k;
    if(htype==='island'){var e0=PATH[46],e1=PATH[52],ddx=e1.x-e0.x,ddy=e1.y-e0.y,dl=Math.hypot(ddx,ddy)||1;ddx/=dl;ddy/=dl;var nx0=-ddy,ny0=ddx,RR=GR.r;
      [[1,.15],[-1,.15],[0,1]].forEach(function(q){var cxl=GR.x+nx0*q[0]*RR*1.95+ddx*q[1]*RR*1.5,cyl=GR.y+ny0*q[0]*RR*1.95+ddy*q[1]*RR*1.5;if(q[0]===0){cxl=GR.x+ddx*RR*1.9;cyl=GR.y+ddy*RR*1.9}
        cxl=Math.max(RR*.4,Math.min(w-RR*.4,cxl));cyl=Math.max(h*.09,cyl);LK.push(blob(cxl,cyl,RR*(q[0]===0?1.1:1.0),.8,Math.atan2(ddy,ddx)))})}
    if(htype==='grove'){[.42,.55,.62].forEach(function(tt,j){var ii=Math.round(tt*52),pp=PATH[ii],n0=nrm(ii),off=(j-1)*WID[ii]*.28;TR.push({x:pp.x+n0.x*off,y:pp.y+n0.y*off,r:w*.05,pine:j!==1,s:.5,mid:1})})}
    for(k=0;k<nl;k++){for(var tr=0;tr<40;tr++){var t2=gRnd(.22,.7),ii=Math.round(t2*52),n=nrm(ii),sd=(k?-sg:sg)*(Math.random()<.5?1:-1),R=w*gRnd(.095,.125),off=WID[ii]/2+RW0+R*.75,cx2=PATH[ii].x+n.x*off*sd,cy2=PATH[ii].y+n.y*off*sd;
        if(cx2>R*.6&&cx2<w-R*.6&&cy2>h*.15&&cy2<h*.82&&LK.every(function(o){return Math.hypot(o.x-cx2,o.y-cy2)>R*2.3})){LK.push(blob(cx2,cy2,R,gRnd(.62,.8),Math.atan2(n.y,n.x)+gRnd(-.5,.5)));break}}}
    for(k=0;k<nb;k++){for(var tr2=0;tr2<40;tr2++){var t3=k===0?gRnd(.8,.9):gRnd(.35,.7),jj=Math.round(t3*52),n2=nrm(jj),sd2=Math.random()<.5?-1:1,R2=w*gRnd(.045,.065),of2=WID[jj]/2*(k===0?.55:.8)+R2*.5,bx2=PATH[jj].x+n2.x*of2*sd2,by2=PATH[jj].y+n2.y*of2*sd2;
        if(bx2>R2&&bx2<w-R2&&Math.hypot(bx2-H.x,by2-H.y)>R2+hr*3&&Math.hypot(bx2-B.x,by2-B.y)>R2+br*8&&BK.every(function(o){return Math.hypot(o.x-bx2,o.y-by2)>R2*2.4})&&LK.every(function(o){return !bIn(o,bx2,by2,1.3)})){BK.push(blob(bx2,by2,R2,gRnd(.5,.7),Math.atan2(n2.y,n2.x)+1.57+gRnd(-.4,.4)));break}}}
    for(i=0;i<160&&TR.length<40;i++){var px=gRnd(0,w),py=gRnd(h*.07,h*.99),r=w*gRnd(.04,.062),a=dPath(px,py);if(a.d>WID[a.i]/2+RW0+r*.9&&LK.every(function(o){return !bIn(o,px,py,1.25)})&&TR.every(function(o){return Math.hypot(o.x-px,o.y-py)>(o.r+r)*.8})&&Math.hypot(px-B.x,py-B.y)>w*.12)TR.push({x:px,y:py,r:r,pine:Math.random()<.6,s:Math.random()})}
    TR.sort(function(a,b){return a.y-b.y});
    /* Out-Grenze mit weissen Pfählen */
    var BND=function(ii){return WID[ii]/2+RW0+OBX};
    for(i=0;i<=52;i+=2){var n3=nrm(i);[-1,1].forEach(function(sd){var sx=PATH[i].x+n3.x*BND(i)*sd,sy=PATH[i].y+n3.y*BND(i)*sd,dd=dPath(sx,sy);if(Math.abs(dd.d-BND(dd.i))<4)STK.push({x:sx,y:sy})})}
    [[0,-1],[52,1]].forEach(function(e){var ii=e[0],d0=ii?PATH[52]:PATH[0],d1=ii?PATH[50]:PATH[2],ax=d0.x-d1.x,ay=d0.y-d1.y,al=Math.hypot(ax,ay)||1,base=Math.atan2(ay/al,ax/al);for(var q=-4;q<=4;q++){var an=base+q*.36,R0=BND(ii),sx=d0.x+Math.cos(an)*R0,sy=d0.y+Math.sin(an)*R0,dd=dPath(sx,sy);if(Math.abs(dd.d-BND(dd.i))<4)STK.push({x:sx,y:sy})}});
    STK=STK.filter(function(o){return o.x>-5&&o.x<w+5&&o.y>-5&&o.y<h+5&&LK.every(function(l){return !bIn(l,o.x,o.y,1.1)})});
    paintBg()}
  function pine(c,x,y,r){c.save();c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+r*.7,y+r*.1,r*1.25,r*.38,-.15,0,7);c.fill();c.fillStyle='#4E342E';c.fillRect(x-r*.1,y-r*.5,r*.2,r*.55);
    for(var l=0;l<4;l++){var yy=y-r*.35-l*r*.55,ww=r*(1.05-l*.2);c.fillStyle=grad(c,x-ww,yy,x+ww,yy,'#2E8B4A','#0F4A22');c.beginPath();c.moveTo(x,yy-r*.95);c.lineTo(x+ww,yy);c.lineTo(x-ww,yy);c.closePath();c.fill();c.fillStyle='rgba(180,255,190,.16)';c.beginPath();c.moveTo(x,yy-r*.95);c.lineTo(x-ww,yy);c.lineTo(x-ww*.3,yy);c.closePath();c.fill()}c.restore()}
  function oak(c,x,y,r){c.save();c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+r*.7,y+r*.1,r*1.3,r*.4,-.15,0,7);c.fill();c.fillStyle=grad(c,x-r*.15,y,x+r*.15,y,'#6D4C41','#3E2723');c.fillRect(x-r*.14,y-r*.9,r*.28,r*.95);
    [[-.55,-1.3,.7],[.55,-1.3,.7],[0,-1.75,.8],[0,-1.2,.85]].forEach(function(q,k){var cxp=x+q[0]*r,cyp=y+q[1]*r,rr2=q[2]*r;c.fillStyle=grad(c,cxp-rr2,cyp-rr2,cxp+rr2,cyp+rr2,k%2?'#43A047':'#2E7D32','#14501F');c.beginPath();c.arc(cxp,cyp,rr2,0,7);c.fill()});c.fillStyle='rgba(200,255,170,.2)';c.beginPath();c.arc(x-r*.35,y-r*1.85,r*.45,0,7);c.fill();c.restore()}
  function paintBg(){var c=bx;
    var g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#14501F');g.addColorStop(1,'#1F6B2C');c.fillStyle=g;c.fillRect(0,0,w,h);
    for(i=0;i<420;i++){c.strokeStyle='rgba('+(30+gHash(i)*50|0)+','+(100+gHash(i+4)*70|0)+',50,.45)';c.lineWidth=1;var qx=gHash(i+1)*w,qy=gHash(i+2)*h;c.beginPath();c.moveTo(qx,qy);c.lineTo(qx+2,qy-6);c.stroke()}
    function seg(extra,col,al,cap){c.save();c.lineCap=cap||'round';c.lineJoin='round';c.strokeStyle=col;c.globalAlpha=al;for(var q=0;q<PATH.length-1;q++){c.lineWidth=WID[q]+extra;c.beginPath();c.moveTo(PATH[q].x,PATH[q].y);c.lineTo(PATH[q+1].x,PATH[q+1].y);c.stroke()}c.restore()}
    c.fillStyle='rgba(0,0,0,.14)';c.fillRect(0,0,w,h);seg(2*(RW0+OBX),'#1E6B2B',1);c.save();c.globalAlpha=.5;for(i=0;i<500;i++){var qx2=gHash(i+900)*w,qy2=gHash(i+901)*h;c.strokeStyle='rgba(150,220,120,.35)';c.lineWidth=.6;c.beginPath();c.moveTo(qx2,qy2);c.lineTo(qx2+1,qy2-3);c.stroke()}c.restore();
    seg(2*RW0+26,'#2F7D32',.35);seg(2*RW0+10,'#3A8F3A',.6);seg(2*RW0,'#43A047',1);
    /* Seen */
    LK.forEach(function(o){c.save();c.fillStyle='rgba(0,0,0,.3)';bPath(c,o,1.18);c.fill();c.fillStyle='#E3D3A1';bPath(c,o,1.14);c.fill();var wg=c.createRadialGradient(o.x,o.y,o.r*.1,o.x,o.y,o.r*1.1);wg.addColorStop(0,'#0B6FA8');wg.addColorStop(.6,'#2AA5DA');wg.addColorStop(1,'#6FD3F2');c.fillStyle=wg;bPath(c,o,1);c.fill();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;c.stroke();c.clip();c.fillStyle='rgba(255,255,255,.12)';for(var q=0;q<6;q++){c.beginPath();c.ellipse(o.x-o.r*.2+q*6,o.y-o.r*.3+q*5,o.r*.5,o.r*.07,-.3,0,7);c.fill()}c.restore()});
    /* Spielbahn */
    seg(10,'#2F7D32',1);seg(0,'#5BBF4C',1);
    c.save();c.lineCap='butt';for(var q=0;q<PATH.length-1;q++){var st=Math.floor(q/2)%2;c.strokeStyle=st?'rgba(120,220,100,.35)':'rgba(30,110,40,.18)';c.lineWidth=WID[q]-3;c.beginPath();c.moveTo(PATH[q].x,PATH[q].y);c.lineTo(PATH[q+1].x,PATH[q+1].y);c.stroke()}c.restore();
    seg(-WID[0]*.55,'rgba(255,255,220,.07)',1);
    /* Green */
    c.save();c.fillStyle='#4C9E44';bPath(c,GR,1.14);c.fill();var gg=c.createRadialGradient(GR.x-GR.r*.3,GR.y-GR.r*.3,GR.r*.1,GR.x,GR.y,GR.r*1.1);gg.addColorStop(0,'#8CE27A');gg.addColorStop(1,'#5CC24F');c.fillStyle=gg;bPath(c,GR,1);c.fill();c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=1.5;for(var k=1;k<4;k++){bPath(c,GR,1-k*.2);c.stroke()}c.strokeStyle='rgba(0,60,0,.3)';c.lineWidth=2.5;bPath(c,GR,1);c.stroke();c.restore();
    /* Bunker */
    BK.forEach(function(o){c.save();c.fillStyle='#3B8537';bPath(c,o,1.16);c.fill();c.fillStyle='rgba(0,0,0,.25)';bPath(c,o,1.08);c.fill();var sg=c.createRadialGradient(o.x-o.r*.3,o.y-o.r*.3,o.r*.1,o.x,o.y,o.r);sg.addColorStop(0,'#FBEBBE');sg.addColorStop(1,'#E2C27F');c.fillStyle=sg;c.save();bPath(c,o,1);c.fill();c.clip();c.fillStyle='rgba(120,80,20,.22)';c.save();c.translate(o.x+o.r*.14,o.y+o.r*.14);c.scale(1,1);bPath(c,{x:0,y:0,r:o.r,sy:o.sy,rot:o.rot,p1:o.p1,p2:o.p2,p3:o.p3},1);c.restore();c.beginPath();c.rect(0,0,0,0);c.strokeStyle='rgba(150,110,40,.35)';c.lineWidth=1;for(var q=0;q<5;q++){c.beginPath();c.ellipse(o.x,o.y,o.r*(.3+q*.15),o.r*o.sy*(.3+q*.15),o.rot,.4,2.6);c.stroke()}for(var q2=0;q2<80;q2++){var an=gHash(q2+o.x)*6.28,rd=Math.sqrt(gHash(q2+o.y))*o.r*.9;c.fillStyle='rgba(140,100,40,.35)';c.fillRect(o.x+Math.cos(an)*rd,o.y+Math.sin(an)*rd*o.sy,1.5,1.5)}c.restore();c.restore()});
    /* Loch */
    c.save();c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(H.x+1,H.y+2,hr*1.3,hr*1.05,0,0,7);c.fill();c.fillStyle='#E8F5E9';c.beginPath();c.ellipse(H.x,H.y,hr*1.12,hr*.95,0,0,7);c.fill();var hg=c.createRadialGradient(H.x,H.y-hr*.3,hr*.1,H.x,H.y,hr*1.05);hg.addColorStop(0,'#000');hg.addColorStop(1,'#3A2A12');c.fillStyle=hg;c.beginPath();c.ellipse(H.x,H.y,hr,hr*.85,0,0,7);c.fill();c.restore();
    /* Abschlag */
    [-1,1].forEach(function(q){c.fillStyle='#FFEB3B';c.beginPath();c.arc(PATH[0].x+q*br*3.2,PATH[0].y+br*.5,br*.6,0,7);c.fill();c.strokeStyle='#F9A825';c.lineWidth=1.5;c.stroke()});
    /* Baeume */
    TR.forEach(function(o){o.pine?pine(c,o.x,o.y,o.r):oak(c,o.x,o.y,o.r)});
    for(i=0;i<11;i++)pine(c,w*(i+.5)/11+gRnd(-8,8),h*.06+gRnd(-3,3),w*.05);
    STK.forEach(function(o){c.save();c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(o.x+w*.008,o.y+1,w*.009,w*.003,.3,0,7);c.fill();c.fillStyle='#FFFFFF';c.fillRect(o.x-w*.0035,o.y-w*.026,w*.007,w*.026);c.fillStyle='#CFD8DC';c.fillRect(o.x+w*.0005,o.y-w*.026,w*.003,w*.026);c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=.6;c.strokeRect(o.x-w*.0035,o.y-w*.026,w*.007,w*.026);c.restore()});
    }
  function ballAt(x,y,r,sc,al){cx.save();cx.globalAlpha=al==null?1:al;cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.ellipse(x+r*.4,y+r*.55,r*1.0*sc,r*.55*sc,0,0,7);cx.fill();cx.fillStyle=grad(cx,x-r,y-r,x+r,y+r,'#FFFFFF','#B0BEC5');cx.beginPath();cx.arc(x,y,r*sc,0,7);cx.fill();cx.fillStyle='rgba(0,0,0,.12)';for(var a=0;a<5;a++){cx.beginPath();cx.arc(x+Math.cos(a*1.3)*r*.45*sc,y+Math.sin(a*1.9)*r*.45*sc,r*.12*sc,0,7);cx.fill()}cx.fillStyle='rgba(255,255,255,.95)';cx.beginPath();cx.arc(x-r*.3*sc,y-r*.35*sc,r*.25*sc,0,7);cx.fill();cx.restore()}
  function pdn(e){if(state!=='aim')return;if(e.cancelable)e.preventDefault();var t=e.touches?e.touches[0]:e;drag={x0:t.clientX,y0:t.clientY,x1:t.clientX,y1:t.clientY}}
  function pmv(e){if(!drag)return;if(e.cancelable)e.preventDefault();var t=(e.touches&&e.touches[0])||e;drag.x1=t.clientX;drag.y1=t.clientY}
  function pup(){if(!drag)return;var d=drag;drag=null;if(state!=='aim')return;var dx=d.x1-d.x0,dy=d.y1-d.y0,len=Math.hypot(dx,dy);if(len<14)return;var pw=Math.min(1,len/(w*.5)),v=(pw*w*.0072+w*.0008)*1.25;B.vx=dx/len*v;B.vy=dy/len*v;rest.x=B.x;rest.y=B.y;putt++;state='roll'}
  cv.addEventListener('touchstart',pdn,{passive:false});cv.addEventListener('touchmove',pmv,{passive:false});cv.addEventListener('touchend',pup);cv.addEventListener('touchcancel',function(){drag=null});cv.addEventListener('mousedown',pdn);window.addEventListener('mousemove',pmv);window.addEventListener('mouseup',pup);
  function done(pts,txt,col){state='next';mt=0;if(pts>0){s+=pts;score(s)}msg={t:txt,c:col,win:pts>0}}
  newHole();cv.__gh=function(){hole++;newHole()};cv.__gs=function(){return {type:htype,state:state,s:s,hole:hole,stk:STK.length}};cv.__shot=function(dx,dy){drag={x0:0,y0:0,x1:dx,y1:dy};pup()};
  var L=loopRun(function(f){fr+=f;
    if(state==='roll'){var sub=Math.max(1,Math.ceil(Math.hypot(B.vx,B.vy)*f/(br*.8)));for(var u=0;u<sub;u++){var ff=f/sub;B.x+=B.vx*ff;B.y+=B.vy*ff;
        var zn=zoneAt(B.x,B.y),fr0=zn==='green'?.988:zn==='fair'?.987:zn==='rough'?.962:.935;if(BK.some(function(o){return bIn(o,B.x,B.y)}))fr0=.925;var fric=Math.pow(fr0,ff);B.vx*=fric;B.vy*=fric;
        if(B.x<br+2){B.x=br+2;B.vx=Math.abs(B.vx)*.6}if(B.x>w-br-2){B.x=w-br-2;B.vx=-Math.abs(B.vx)*.6}if(B.y<h*.075){B.y=h*.075;B.vy=Math.abs(B.vy)*.6}if(B.y>h-br-2){B.y=h-br-2;B.vy=-Math.abs(B.vy)*.6}
        for(var q=0;q<TR.length;q++){var o=TR[q],dx=B.x-o.x,dy=B.y-o.y,d=Math.hypot(dx,dy),mn=o.r*.38+br;if(d<mn&&d>0){var nx=dx/d,ny=dy/d,dp=B.vx*nx+B.vy*ny;if(dp<0){B.vx-=1.7*dp*nx;B.vy-=1.7*dp*ny}B.x=o.x+nx*mn;B.y=o.y+ny*mn;burst(P,B.x,B.y,5,['#9CCC65','#fff'],3)}}
        if(LK.some(function(o){return bIn(o,B.x,B.y,.97)})){burst(P,B.x,B.y,26,['#fff','#81D4FA','#4FC3F7'],8);F.push({x:B.x,y:B.y-12,t:'Platsch!',l:46,c:'#81D4FA'});B.vx=B.vy=0;B.gone=1;done(0,'Wasser!','#81D4FA');break}
        if(zoneAt(B.x,B.y)==='ob'){B.vx=B.vy=0;burst(P,B.x,B.y,12,['#fff','#ddd'],4);done(0,'Out!','#FF8A80');break}
        var hd=Math.hypot(B.x-H.x,B.y-H.y),sp=Math.hypot(B.vx,B.vy);
        if(hd<hr*2.2&&sp<w*.0085){B.vx+=(H.x-B.x)*.012*ff;B.vy+=(H.y-B.y)*.012*ff}
        if(hd<hr*.9&&sp<w*.0066){state='sink';sink=0;B.vx=B.vy=0;break}}
      if(state==='roll'&&Math.hypot(B.vx,B.vy)<.07){B.vx=B.vy=0;if(putt>=MAXP){done(0,'Leider daneben','#FF8A80')}else state='aim'}}
    else if(state==='sink'){sink+=f;B.x+=(H.x-B.x)*.25*f;B.y+=(H.y-B.y)*.25*f;if(sink>=22){var pts=Math.max(1,5-putt);burst(P,H.x,H.y,pts>=3?46:28,['#FFD54F','#fff','#FF80AB','#80D8FF','#B9F6CA'],12);done(pts,putt===1?'EINLOCHEN! +'+pts:'Drin! +'+pts,'#FFEB3B')}}
    else if(state==='next'){mt+=f;if(mt>55){hole++;newHole()}}
    intro+=f;var tz=intro<45?1:ZM,kz=intro<45?0:Math.min(1,(intro-45)/40);camZ=1+(ZM-1)*(kz*kz*(3-2*kz));
    var fx=B.x+(H.x-B.x)*.22,fy=B.y+(H.y-B.y)*.22-h*.04;if(state==='sink'||(state==='next'&&!B.gone&&msg&&msg.win)){fx=H.x;fy=H.y}
    var hwv=w/2/camZ,hhv=h/2/camZ,txc=Math.max(hwv,Math.min(w-hwv,fx)),tyc=Math.max(hhv,Math.min(h-hhv,fy));if(kz<1){txc=w/2+(txc-w/2)*kz;tyc=h/2+(tyc-h/2)*kz;camX=txc;camY=tyc}else{camX+=(txc-camX)*Math.min(1,.08*f);camY+=(tyc-camY)*Math.min(1,.08*f)}
    cx.save();cx.translate(w/2,h/2);cx.scale(camZ,camZ);cx.translate(-camX,-camY);
    cx.drawImage(bgc,0,0,w,h);
    LK.forEach(function(o){cx.save();bPath(cx,o,1);cx.clip();cx.strokeStyle='rgba(255,255,255,.55)';cx.lineWidth=1.5;for(var q=0;q<3;q++){var r3=Math.max(.01,(((fr*.5+q*14)%40)+40)%40/40);cx.globalAlpha=.6*(1-r3);cx.beginPath();cx.ellipse(o.x+Math.sin(q*2+o.p1)*o.r*.4,o.y+Math.cos(q*3)*o.r*.2,o.r*.5*r3,o.r*.3*r3,0,0,7);cx.stroke()}cx.restore()});
    /* Fahne mit Schatten */
    var fw=Math.sin(fr*.15)*3,FH=h*.12;cx.save();cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.moveTo(H.x-2,H.y);cx.lineTo(H.x+2,H.y);cx.lineTo(H.x+FH*.7+w*.07,H.y+FH*.25);cx.lineTo(H.x+FH*.7,H.y+FH*.2);cx.fill();
    cx.strokeStyle='#F5F5F5';cx.lineWidth=3;cx.lineCap='round';cx.beginPath();cx.moveTo(H.x,H.y);cx.lineTo(H.x,H.y-FH);cx.stroke();cx.fillStyle='#E53935';cx.beginPath();cx.moveTo(H.x,H.y-FH);cx.quadraticCurveTo(H.x+w*.04,H.y-FH+fw,H.x+w*.08,H.y-FH*.88+fw*.6);cx.quadraticCurveTo(H.x+w*.04,H.y-FH*.7-fw,H.x,H.y-FH*.68);cx.fill();cx.fillStyle='rgba(255,255,255,.3)';cx.beginPath();cx.moveTo(H.x,H.y-FH);cx.lineTo(H.x+w*.045,H.y-FH*.93+fw*.5);cx.lineTo(H.x,H.y-FH*.85);cx.fill();cx.restore();
    if(state==='roll'){trail.push({x:B.x,y:B.y});if(trail.length>12)trail.shift();trail.forEach(function(t,k){cx.globalAlpha=k/trail.length*.35;cx.fillStyle='#fff';cx.beginPath();cx.arc(t.x,t.y,br*(.3+k/trail.length*.6),0,7);cx.fill()});cx.globalAlpha=1}else trail=[];
    if(state==='sink')ballAt(B.x,B.y,br,Math.max(.1,1-sink/22),1);else if(!(state==='next'&&msg&&msg.win)&&!B.gone)ballAt(B.x,B.y,br,1);
    if(state==='aim'&&drag){var dx=drag.x1-drag.x0,dy=drag.y1-drag.y0,len=Math.hypot(dx,dy);if(len>6){var pw=Math.min(1,len/(w*.5)),ux=dx/len,uy=dy/len,L2=pw*w*.5/camZ,col=pw<.5?'#B9F6CA':pw<.8?'#FFEB3B':'#FF8A65';cx.save();cx.lineCap='round';cx.strokeStyle='rgba(255,255,255,.95)';cx.lineWidth=3.5;cx.setLineDash([2,9]);cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=4;cx.beginPath();cx.moveTo(B.x+ux*br*2,B.y+uy*br*2);cx.lineTo(B.x+ux*L2,B.y+uy*L2);cx.stroke();cx.setLineDash([]);var ex=B.x+ux*L2,ey=B.y+uy*L2;cx.fillStyle=col;cx.beginPath();cx.moveTo(ex+ux*10,ey+uy*10);cx.lineTo(ex-uy*7-ux*4,ey+ux*7-uy*4);cx.lineTo(ex+uy*7-ux*4,ey-ux*7-uy*4);cx.fill();cx.restore();cx.strokeStyle=col;cx.lineWidth=4;cx.beginPath();cx.arc(B.x,B.y,br*2.4,-Math.PI/2,-Math.PI/2+pw*6.283);cx.stroke()}}
    else if(state==='aim'){cx.strokeStyle='rgba(255,255,255,'+(.4+.3*Math.sin(fr*.15))+')';cx.lineWidth=2;cx.beginPath();cx.arc(B.x,B.y,br*2.2+Math.sin(fr*.15)*2,0,7);cx.stroke()}
    stepP(cx,P,f);floatTxt(cx,F,f);cx.restore();
    /* Richtung zur Fahne, wenn sie nicht im Bild ist */
    var sx2=(H.x-camX)*camZ+w/2,sy2=(H.y-camY)*camZ+h/2;if(sx2<0||sx2>w||sy2<0||sy2>h){var ex2=Math.max(w*.08,Math.min(w*.92,sx2)),ey2=Math.max(h*.1,Math.min(h*.92,sy2)),an3=Math.atan2(sy2-ey2,sx2-ex2);cx.save();cx.translate(ex2,ey2);cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.arc(0,0,w*.055,0,7);cx.fill();cx.font=Math.floor(w*.05)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('⛳',0,0);cx.rotate(an3);cx.fillStyle='#fff';cx.beginPath();cx.moveTo(w*.075,0);cx.lineTo(w*.05,-w*.02);cx.lineTo(w*.05,w*.02);cx.fill();cx.restore()}
    if(msg&&state==='next'){cx.font='bold '+Math.floor(w*.09)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=6;cx.strokeStyle='rgba(0,0,0,.5)';var sc2=Math.min(1,mt/8);cx.save();cx.translate(w/2,h*.5);cx.scale(sc2,sc2);cx.strokeText(msg.t,0,0);cx.fillStyle=msg.c;cx.fillText(msg.t,0,0);cx.restore()}
    cx.font='bold '+Math.floor(w*.045)+'px sans-serif';cx.textAlign='left';cx.textBaseline='top';cx.lineWidth=4;cx.strokeStyle='rgba(0,0,0,.5)';var tx2='⛳ '+(hole+1)+'   Schlag '+Math.min(MAXP,putt+(state==='aim'?1:0))+'/'+MAXP;cx.strokeText(tx2,w*.03,w*.02);cx.fillStyle='#fff';cx.fillText(tx2,w*.03,w*.02);bigScore(cx,w,s)});
  return function(){L.stop();cv.removeEventListener('touchstart',pdn);cv.removeEventListener('touchmove',pmv);cv.removeEventListener('touchend',pup);cv.removeEventListener('mousedown',pdn);window.removeEventListener('mousemove',pmv);window.removeEventListener('mouseup',pup)}};

/* ---------------- Turmbau (Statik + Kippen) ---------------- */
GAMEFN.tower=function(cv,cx,w,h,score,over){
  var s=0,lives=3,fr=0,P=[],F=[],i,BASEY=h*.88,PW=w*.62,PX=w/2,BH=w*.085,stack=[],drop=null,hang=null,cam=0,camT=0,tipG=[],cx0=w/2,cvx=0,tt=0,wob=0,wobT=0,spawnIn=0,CY=h*.16,trolley=w/2,dir=1;
  var KIND=['crate','brick','stone','plank'],COL={crate:['#D9A25B','#A8722F'],brick:['#D9644A','#9E3B28'],stone:['#B0BEC5','#78909C'],plank:['#8D6E63','#5D4037']};
  function newBlock(){var wd=w*(stack.length<2?.24:.065+Math.pow(Math.random(),.8)*.2),kd=KIND[Math.floor(Math.random()*4)],base=kd==='plank'?BH*.7:BH,tall=stack.length<2?1:Math.max(.75,Math.min(1.7,.16*w/wd)),hh=base*tall;return {w:wd,h:hh,k:kd,x:0,y:0,m:wd*hh}}
  function topY(){var y=BASEY;stack.forEach(function(b){y-=b.h});return y}
  function layout(){var y=BASEY;stack.forEach(function(b){b.y=y-b.h;y=b.y})}
  function contact(i){var lo,hi,b=stack[i];if(i===0){lo=PX-PW/2;hi=PX+PW/2}else{var a=stack[i-1];lo=a.x-a.w/2;hi=a.x+a.w/2}return [Math.max(lo,b.x-b.w/2),Math.min(hi,b.x+b.w/2)]}
  function check(){var M=0,MX=0,minM=1;for(var k=stack.length-1;k>=0;k--){var b=stack[k];M+=b.m;MX+=b.m*b.x;var com=MX/M,c=contact(k);if(c[1]-c[0]<2||com<c[0]||com>c[1]){return {bad:k,pivot:com<(c[0]+c[1])/2?c[0]:c[1],dir:com<(c[0]+c[1])/2?-1:1}}var mg=Math.min(com-c[0],c[1]-com)/((c[1]-c[0])/2);if(mg<minM)minM=mg}return {bad:-1,margin:minM}}
  var unb=bindTap(cv,function(){if(!hang||drop)return;drop={b:hang,x:trolley,y:CY+h*.07-cam,vy:0,vx:cvx*.5};hang=null;spawnIn=0});
  function blockDraw(b,x,y,rot){cx.save();cx.translate(x,y);if(rot)cx.rotate(rot);var c=COL[b.k],bw=b.w,bh=b.h;
    cx.fillStyle='rgba(0,0,0,.22)';rr(cx,-bw/2+3,-bh/2+4,bw,bh,4);cx.fill();
    cx.fillStyle=grad(cx,0,-bh/2,0,bh/2,c[0],c[1]);rr(cx,-bw/2,-bh/2,bw,bh,4);cx.fill();
    cx.save();rr(cx,-bw/2,-bh/2,bw,bh,4);cx.clip();
    if(b.k==='brick'){cx.strokeStyle='rgba(255,220,200,.45)';cx.lineWidth=1.2;for(var r=1;r<3;r++){cx.beginPath();cx.moveTo(-bw/2,-bh/2+r*bh/3);cx.lineTo(bw/2,-bh/2+r*bh/3);cx.stroke()}for(var r2=0;r2<3;r2++)for(var q=0;q<bw/14;q++){var xx=-bw/2+q*14+(r2%2)*7;cx.beginPath();cx.moveTo(xx,-bh/2+r2*bh/3);cx.lineTo(xx,-bh/2+(r2+1)*bh/3);cx.stroke()}}
    else if(b.k==='crate'){cx.strokeStyle='rgba(90,50,10,.6)';cx.lineWidth=2.5;cx.strokeRect(-bw/2+3,-bh/2+3,bw-6,bh-6);cx.beginPath();cx.moveTo(-bw/2+3,-bh/2+3);cx.lineTo(bw/2-3,bh/2-3);cx.moveTo(bw/2-3,-bh/2+3);cx.lineTo(-bw/2+3,bh/2-3);cx.stroke()}
    else if(b.k==='stone'){cx.fillStyle='rgba(255,255,255,.18)';for(var q2=0;q2<5;q2++){cx.beginPath();cx.arc(-bw/2+gHash(q2+bw)*bw,-bh/2+gHash(q2+3)*bh,3+q2%3,0,7);cx.fill()}cx.strokeStyle='rgba(60,70,80,.4)';cx.beginPath();cx.moveTo(-bw*.2,-bh/2);cx.lineTo(-bw*.1,bh*.1);cx.lineTo(-bw*.25,bh/2);cx.stroke()}
    else{cx.strokeStyle='rgba(40,20,5,.35)';cx.lineWidth=1;for(var q3=0;q3<4;q3++){var yy=-bh/2+(q3+1)*bh/5;cx.beginPath();cx.moveTo(-bw/2,yy);cx.bezierCurveTo(-bw/4,yy-2,bw/4,yy+2,bw/2,yy);cx.stroke()}}
    cx.fillStyle='rgba(255,255,255,.28)';cx.fillRect(-bw/2,-bh/2,bw,bh*.16);cx.fillStyle='rgba(0,0,0,.15)';cx.fillRect(-bw/2,bh/2-bh*.14,bw,bh*.14);cx.restore();
    cx.strokeStyle='rgba(40,25,10,.55)';cx.lineWidth=1.5;rr(cx,-bw/2,-bh/2,bw,bh,4);cx.stroke();cx.restore()}
  function startTip(k,pv,dr){var grp=stack.splice(k,stack.length-k);tipG.push({bl:grp,px:pv,py:grp[0].y+grp[0].h,dir:dr,th:0,om:.004,dy:0,vy:0,dx:0,free:false});lives--;shakeBox();F.push({x:w/2,y:h*.4,t:lives>0?'Umgekippt!':'Eingestürzt!',l:55,c:'#FF8A80'});if(lives<=0)setTimeout(function(){if(RW&&!RW.done)over()},900)}
  var dprT=cv.width/w,LY={};
  (function(){function mk(hh){var c=document.createElement('canvas');c.width=w*dprT;c.height=hh*dprT;var x=c.getContext('2d');x.scale(dprT,dprT);return {c:c,x:x,h:hh}}
    var a=mk(h*.34),x=a.x,hh=a.h,k;
    x.fillStyle='#A9C0D8';x.beginPath();x.moveTo(0,hh);for(k=0;k<=12;k++)x.lineTo(k*w/12,hh*(.35+.4*Math.abs(Math.sin(k*1.7+1))));x.lineTo(w,hh);x.fill();
    x.fillStyle='#8FAAC6';x.beginPath();x.moveTo(0,hh);for(k=0;k<=9;k++)x.lineTo(k*w/9,hh*(.5+.35*Math.abs(Math.sin(k*2.3+.4))));x.lineTo(w,hh);x.fill();
    x.fillStyle='rgba(255,255,255,.85)';for(k=0;k<=12;k++){var py=hh*(.35+.4*Math.abs(Math.sin(k*1.7+1)));if(py<hh*.55){x.beginPath();x.moveTo(k*w/12,py);x.lineTo(k*w/12-14,py+16);x.lineTo(k*w/12+14,py+16);x.fill()}}
    x.fillStyle='#6FB57A';x.beginPath();x.moveTo(0,hh);for(k=0;k<=30;k++)x.lineTo(k*w/30,hh*(.82+.1*Math.sin(k*.6)));x.lineTo(w,hh);x.fill();
    x.fillStyle='#3E8E4F';for(k=0;k<40;k++){var tx=gHash(k)*w;x.beginPath();x.moveTo(tx,hh*.88);x.lineTo(tx-5,hh);x.lineTo(tx+5,hh);x.fill()}
    LY.hill=a.c;
    var b=mk(h*.5);x=b.x;hh=b.h;for(k=0;k<14;k++){var bw=w*(.06+gHash(k)*.05),bx=k*w/13-bw*.2,bh=hh*(.3+gHash(k+3)*.55);x.fillStyle='rgba(150,175,205,.85)';x.fillRect(bx,hh-bh,bw,bh);x.fillStyle='rgba(255,255,255,.45)';for(var yy=hh-bh+6;yy<hh-6;yy+=9)for(var xx=bx+4;xx<bx+bw-4;xx+=8)if(gHash(xx+yy)>.4)x.fillRect(xx,yy,3.5,4);if(k%4===1){x.fillStyle='#90A4AE';x.fillRect(bx+bw/2-1,hh-bh-14,2,14)}}
    LY.c1=b.c;
    var c=mk(h*.4);x=c.x;hh=c.h;for(k=0;k<9;k++){var bw3=w*(.08+gHash(k+9)*.06),bx3=k*w/8.2-bw3*.2,bh3=hh*(.35+gHash(k+13)*.55);x.fillStyle=grad(x,0,hh-bh3,0,hh,'#6F8BAA','#4C6684');x.fillRect(bx3,hh-bh3,bw3,bh3);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(bx3+bw3-5,hh-bh3,5,bh3);
      for(var y3=hh-bh3+8;y3<hh-8;y3+=11)for(var x3=bx3+5;x3<bx3+bw3-8;x3+=10){x.fillStyle=gHash(x3*3+y3)>.55?'#FFE9A8':'rgba(190,215,240,.55)';x.fillRect(x3,y3,5,6)}
      x.fillStyle='#455A70';x.fillRect(bx3+bw3*.3,hh-bh3-6,bw3*.4,6);if(k%3===0){x.fillStyle='#37474F';x.fillRect(bx3+bw3*.5-1,hh-bh3-18,2,12)}}
    LY.c2=c.c})();
  hang=newBlock();if(RW)RW.dbg=function(){return [trolley,w,stack.length,s,lives]};
  var L=loopRun(function(f){fr+=f;tt+=f;
    var sp=.028*(1+Math.min(.9,stack.length*.07));var prevX=trolley;trolley=w/2+Math.sin(tt*sp)*w*.33;cvx=trolley-prevX;
    if(!hang&&!drop){spawnIn+=f;if(spawnIn>30)hang=newBlock()}
    layout();var yT=topY(),camGoal=Math.max(0,h*.5-yT);cam+=(camGoal-cam)*.06*f;
    if(drop){drop.vy+=.5*f;drop.y+=drop.vy*f;drop.x+=drop.vx*f;drop.vx*=Math.pow(.97,f);var b=drop.b,landY=yT-b.h/2;
      if(drop.y>=landY){var lo,hi;if(stack.length){var a=stack[stack.length-1];lo=a.x-a.w/2;hi=a.x+a.w/2}else{lo=PX-PW/2;hi=PX+PW/2}
        var ov=Math.min(hi,drop.x+b.w/2)-Math.max(lo,drop.x-b.w/2);
        if(ov<b.w*.08){/* daneben */drop.miss=true;drop.rot=(drop.rot||0)+.06*f*(drop.x<(lo+hi)/2?-1:1);if(drop.y>BASEY+h*.5){lives--;shakeBox();F.push({x:w/2,y:h*.4,t:'Daneben!',l:45,c:'#FF8A80'});drop=null;if(lives<=0){L.stop();unb();over();return}}}
        else{b.x=drop.x;stack.push(b);drop=null;layout();var ck=check();burst(P,b.x,b.y+b.h/2+cam,10,['#fff','#FFE0B2'],4);
          if(ck.bad>=0){startTip(ck.bad,ck.pivot,ck.dir);if(lives<=0){L.stop();unb();over();return}}
          else{s=stack.length;score(s);wobT=ck.margin<.3?1:0;if(wobT){wob=1;F.push({x:b.x,y:b.y-10+cam,t:'Wackel!',l:40,c:'#FFEB3B'})}else F.push({x:b.x,y:b.y-10+cam,t:'+1',l:30,c:'#fff'})}}}
      else if(drop&&drop.miss){}}
    /* kippende Gruppen */
    for(i=tipG.length-1;i>=0;i--){var g=tipG[i];g.th+=g.om*f;g.om+=.0035*f*(1+g.th);if(g.th>.7){g.free=true}if(g.free){g.vy+=.45*f;g.dy+=g.vy*f;g.dx+=g.dir*1.6*f;g.th+=.015*f}if(g.dy>h*1.2){tipG.splice(i,1);s=stack.length;score(s)}}
    if(wob>0)wob=Math.max(0,wob-.012*f);
    /* Zeichnen */
    var sk=cx.createLinearGradient(0,0,0,h);sk.addColorStop(0,'#3F97E8');sk.addColorStop(.55,'#9DD3F7');sk.addColorStop(1,'#FFF1CF');cx.fillStyle=sk;cx.fillRect(0,0,w,h);
    var sxx=w*.8,syy=h*.13+cam*.1;glow(cx,sxx,syy,w*.34,'rgba(255,245,170,.7)');cx.save();cx.translate(sxx,syy);cx.rotate(fr*.002);cx.fillStyle='rgba(255,250,200,.12)';for(i=0;i<12;i++){cx.rotate(.5236);cx.beginPath();cx.moveTo(0,0);cx.lineTo(w*.7,-w*.03);cx.lineTo(w*.7,w*.03);cx.fill()}cx.restore();cx.fillStyle='#FFF59D';cx.beginPath();cx.arc(sxx,syy,w*.05,0,7);cx.fill();cx.fillStyle='#FFFDE7';cx.beginPath();cx.arc(sxx-w*.012,syy-w*.012,w*.03,0,7);cx.fill();
    /* Wolken */
    [[.15,.1,.07,.1,.2],[.55,.22,.05,.07,.28],[.85,.3,.06,.05,.18],[.3,.4,.045,.04,.3]].forEach(function(c,k){var px=((c[0]*w+fr*c[3])%(w+200))-100,py=h*c[1]+cam*c[4],r=w*c[2];cx.fillStyle='rgba(160,185,215,.5)';cloud(cx,px+4,py+r*.35,r);cx.fillStyle='rgba(255,255,255,.96)';cloud(cx,px,py,r)});
    /* Vögel */
    for(i=0;i<4;i++){var bx2=((fr*.45+i*95+i*i*30)%(w+80))-40,by2=h*(.18+i*.05)+cam*.15+Math.sin(fr*.05+i)*6,fl=Math.sin(fr*.3+i*2)*4;cx.strokeStyle='#37474F';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(bx2-7,by2+fl);cx.quadraticCurveTo(bx2-3,by2-3,bx2,by2);cx.quadraticCurveTo(bx2+3,by2-3,bx2+7,by2+fl);cx.stroke()}
    /* Heissluftballon */
    var bxl=((fr*.12+w*.6)%(w+160))-80,byl=h*.34+cam*.22+Math.sin(fr*.02)*8,br2=w*.045;cx.fillStyle='rgba(0,0,0,.12)';cx.beginPath();cx.ellipse(bxl+3,byl+br2*2.2,br2*.5,br2*.18,0,0,7);cx.fill();
    ['#E53935','#FDD835','#1E88E5','#43A047','#FB8C00'].forEach(function(c,k){cx.fillStyle=c;cx.beginPath();cx.ellipse(bxl+(k-2)*br2*.3,byl,br2*(.5-Math.abs(k-2)*.12),br2*1.05,0,0,7);cx.fill()});cx.strokeStyle='#5D4037';cx.lineWidth=1;cx.beginPath();cx.moveTo(bxl-br2*.5,byl+br2*.8);cx.lineTo(bxl-br2*.18,byl+br2*1.8);cx.moveTo(bxl+br2*.5,byl+br2*.8);cx.lineTo(bxl+br2*.18,byl+br2*1.8);cx.stroke();cx.fillStyle='#8D6E63';cx.fillRect(bxl-br2*.22,byl+br2*1.8,br2*.44,br2*.3);
    /* Berge, Stadt (Parallax) */
    cx.drawImage(LY.hill,0,BASEY+cam*.12-LY.hill.height/dprT,w,LY.hill.height/dprT);cx.drawImage(LY.c1,0,BASEY+cam*.3-LY.c1.height/dprT,w,LY.c1.height/dprT);cx.drawImage(LY.c2,0,BASEY+cam*.55-LY.c2.height/dprT,w,LY.c2.height/dprT);
    cx.save();cx.translate(0,cam);
    cx.fillStyle=grad(cx,0,BASEY,0,BASEY+h*.3,'#7CCB5A','#3E8E2C');cx.fillRect(0,BASEY,w,h*2);
    cx.fillStyle='#B59B6E';cx.fillRect(0,BASEY+h*.05,w,h*.07);cx.fillStyle='rgba(60,40,10,.25)';for(i=0;i<90;i++)cx.fillRect(gHash(i)*w,BASEY+h*.05+gHash(i+4)*h*.07,2,2);cx.fillStyle='rgba(60,40,10,.2)';cx.fillRect(0,BASEY+h*.075,w,3);cx.fillRect(0,BASEY+h*.105,w,3);
    cx.strokeStyle='rgba(30,100,20,.5)';cx.lineWidth=1.3;for(i=0;i<120;i++){var gx=gHash(i+7)*w,gy=BASEY+gHash(i+2)*h*.04;cx.beginPath();cx.moveTo(gx,gy);cx.lineTo(gx+1.5,gy-5);cx.stroke()}
    [['#E53935',.015],['#1E88E5',.015]].forEach(function(c,k){var cw=w*.13,chh=h*.055,cxp=w*c[1];for(var lv=0;lv<(k?1:2);lv++){var cy2=BASEY-chh*(lv+1)+2;cx.fillStyle=lv?'#FBC02D':c[0];cx.fillRect(cxp,cy2,cw,chh);cx.strokeStyle='rgba(0,0,0,.25)';cx.lineWidth=1;for(var q=1;q<9;q++){cx.beginPath();cx.moveTo(cxp+q*cw/9,cy2+2);cx.lineTo(cxp+q*cw/9,cy2+chh-2);cx.stroke()}cx.fillStyle='rgba(255,255,255,.25)';cx.fillRect(cxp,cy2,cw,3);cx.strokeStyle='rgba(0,0,0,.45)';cx.strokeRect(cxp+.5,cy2+.5,cw-1,chh-1)}});
    for(i=0;i<3;i++){var cnx=w*.2+i*w*.03;cx.fillStyle='#FF6D00';cx.beginPath();cx.moveTo(cnx,BASEY-h*.035);cx.lineTo(cnx-6,BASEY);cx.lineTo(cnx+6,BASEY);cx.fill();cx.fillStyle='#fff';cx.fillRect(cnx-4,BASEY-h*.02,8,3);cx.fillStyle='#E65100';cx.fillRect(cnx-8,BASEY-2,16,3)}
    cx.fillStyle='#78909C';cx.fillRect(w*.03,BASEY+h*.03,w*.2,3);for(i=0;i<5;i++){cx.fillStyle='#546E7A';cx.fillRect(w*.03+i*w*.05,BASEY+h*.005,3,h*.03);cx.fillStyle=i%2?'#fff':'#E53935';cx.fillRect(w*.03+i*w*.05+3,BASEY+h*.005,w*.047,5)}
    var ex=w*.8,ey=BASEY;cx.fillStyle='#B8860B';cx.fillStyle='#212121';rr(cx,ex-w*.07,ey-h*.022,w*.14,h*.022,h*.011);cx.fill();for(i=0;i<5;i++){cx.fillStyle='#424242';cx.beginPath();cx.arc(ex-w*.055+i*w*.027,ey-h*.011,h*.009,0,7);cx.fill()}
    cx.fillStyle='#FFC107';rr(cx,ex-w*.05,ey-h*.058,w*.1,h*.04,5);cx.fill();cx.fillStyle='#FFB300';cx.fillRect(ex-w*.05,ey-h*.026,w*.1,h*.008);cx.fillStyle='#FFD54F';rr(cx,ex-w*.012,ey-h*.098,w*.06,h*.045,5);cx.fill();cx.fillStyle='#B3E5FC';rr(cx,ex-w*.004,ey-h*.09,w*.044,h*.028,3);cx.fill();
    cx.strokeStyle='#F9A825';cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.moveTo(ex-w*.05,ey-h*.05);cx.lineTo(ex-w*.11,ey-h*.1);cx.lineTo(ex-w*.15,ey-h*.04);cx.stroke();cx.strokeStyle='#8D6E63';cx.lineWidth=2;cx.beginPath();cx.moveTo(ex-w*.11,ey-h*.1);cx.lineTo(ex-w*.125,ey-h*.075);cx.stroke();cx.fillStyle='#616161';cx.beginPath();cx.moveTo(ex-w*.15,ey-h*.04);cx.lineTo(ex-w*.175,ey-h*.03);cx.lineTo(ex-w*.16,ey-h*.012);cx.lineTo(ex-w*.14,ey-h*.022);cx.fill();
    cx.fillStyle='#D7C08A';cx.beginPath();cx.moveTo(w*.62,BASEY+2);cx.quadraticCurveTo(w*.66,BASEY-h*.05,w*.7,BASEY+2);cx.fill();cx.fillStyle='rgba(120,90,40,.3)';cx.beginPath();cx.moveTo(w*.66,BASEY-h*.035);cx.quadraticCurveTo(w*.69,BASEY-h*.02,w*.7,BASEY+2);cx.lineTo(w*.66,BASEY+2);cx.fill();
    [[.93,.05],[.58,.035],[.1,.03]].forEach(function(t){var tx=w*t[0],r=w*t[1];cx.fillStyle='rgba(0,0,0,.2)';cx.beginPath();cx.ellipse(tx+r*.4,BASEY+2,r*1.1,r*.25,0,0,7);cx.fill();cx.fillStyle='#6D4C41';cx.fillRect(tx-2,BASEY-r*1.2,4,r*1.2);[[0,-1.6,1],[-.6,-1.2,.7],[.6,-1.2,.7]].forEach(function(q,k){cx.fillStyle=k?'#43A047':'#2E7D32';cx.beginPath();cx.arc(tx+q[0]*r,BASEY+q[1]*r,q[2]*r,0,7);cx.fill()})});
    cx.fillStyle='#8D6E63';cx.fillRect(w*.5-1.5,BASEY-h*.06,3,h*.06);cx.fillStyle='#FFD600';rr(cx,w*.44,BASEY-h*.1,w*.12,h*.045,4);cx.fill();cx.strokeStyle='#212121';cx.lineWidth=2;rr(cx,w*.44,BASEY-h*.1,w*.12,h*.045,4);cx.stroke();cx.fillStyle='#212121';cx.font='bold '+Math.floor(w*.026)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('BAUSTELLE',w*.5,BASEY-h*.0775);
    for(i=0;i<5;i++){cx.fillStyle=i%2?'#E53935':'#FFB300';cx.beginPath();cx.arc(w*.02+i*8,BASEY-4,4,0,7);cx.fill()}
    for(i=0;i<24;i++){var fx=gHash(i+30)*w,fy=BASEY+h*.015+gHash(i+31)*h*.03;cx.fillStyle=['#FFEB3B','#fff','#F48FB1'][i%3];cx.beginPath();cx.arc(fx,fy,1.8,0,7);cx.fill()}cx.fillStyle='#8D8D8D';rr(cx,PX-PW/2-6,BASEY,PW+12,h*.04+400,6);cx.fill();cx.fillStyle=grad(cx,0,BASEY,0,BASEY+h*.04,'#CFD8DC','#90A4AE');rr(cx,PX-PW/2,BASEY,PW,h*.04+400,5);cx.fill();
    cx.fillStyle='#FFC107';for(i=0;i<12;i++){if(i%2)continue;cx.beginPath();cx.moveTo(PX-PW/2+i*PW/12,BASEY+h*.03);cx.lineTo(PX-PW/2+(i+1)*PW/12,BASEY+h*.03);cx.lineTo(PX-PW/2+(i+1)*PW/12-6,BASEY+h*.045);cx.lineTo(PX-PW/2+i*PW/12-6,BASEY+h*.045);cx.fill()}
    /* Turm mit Wackeln */
    var n=stack.length;stack.forEach(function(b,k){var wb=wob*Math.sin(fr*.35)*(k/Math.max(1,n))*5;blockDraw(b,b.x+wb,b.y+b.h/2,wb*.004)});
    tipG.forEach(function(g){cx.save();cx.translate(g.px+g.dx,g.py+g.dy);cx.rotate(g.dir*g.th);cx.translate(-g.px,-g.py);g.bl.forEach(function(b){blockDraw(b,b.x,b.y+b.h/2,0)});cx.restore()});
    if(drop){blockDraw(drop.b,drop.x,drop.y,drop.rot||0)}
    cx.restore();
    /* Kran */
    var JY=CY-h*.075,JH=h*.032,MX=w*.045,MW=w*.07;
    cx.fillStyle='rgba(0,0,0,.12)';cx.fillRect(MX+4,JY,MW,h);
    cx.fillStyle='#F9A825';cx.fillRect(MX,JY,4,h);cx.fillRect(MX+MW-4,JY,4,h);cx.strokeStyle='#E65100';cx.lineWidth=2;for(var my=JY;my<h;my+=h*.05){cx.beginPath();cx.moveTo(MX+4,my);cx.lineTo(MX+MW-4,my+h*.05);cx.moveTo(MX+MW-4,my);cx.lineTo(MX+4,my+h*.05);cx.stroke();cx.beginPath();cx.moveTo(MX+4,my);cx.lineTo(MX+MW-4,my);cx.stroke()}
    cx.fillStyle='#8D8D8D';cx.fillRect(-4,JY-h*.01,w*.07,h*.035);cx.fillStyle='#A5A5A5';cx.fillRect(-4,JY-h*.01,w*.07,3);cx.fillStyle='#757575';for(i=0;i<3;i++)cx.fillRect(w*.012*i+2,JY-h*.01,2,h*.035);
    cx.fillStyle='#FFB300';cx.fillRect(MX-w*.02,JY-h*.005,w,JH);cx.fillStyle='#E65100';cx.fillRect(MX-w*.02,JY-h*.005,w,3);cx.fillRect(MX-w*.02,JY-h*.005+JH-3,w,3);
    cx.strokeStyle='#E65100';cx.lineWidth=1.8;for(i=0;i<=26;i++){var jx=MX+MW+i*(w-MX-MW)/26;cx.beginPath();cx.moveTo(jx,JY-h*.005+JH-2);cx.lineTo(jx+(w-MX-MW)/52,JY-h*.005+2);cx.lineTo(jx+(w-MX-MW)/26,JY-h*.005+JH-2);cx.stroke()}
    cx.fillStyle='#fff';for(i=0;i<4;i++)cx.fillRect(w-w*.07+i*w*.018,JY-h*.005,w*.009,JH);cx.fillStyle='#E53935';for(i=0;i<4;i++)cx.fillRect(w-w*.07+i*w*.018+w*.009,JY-h*.005,w*.009,JH);
    cx.fillStyle='#FFB300';cx.beginPath();cx.moveTo(MX,JY-h*.005);cx.lineTo(MX+MW/2,JY-h*.12);cx.lineTo(MX+MW,JY-h*.005);cx.fill();cx.strokeStyle='#37474F';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(MX+MW/2,JY-h*.12);cx.lineTo(w*.55,JY-h*.005);cx.moveTo(MX+MW/2,JY-h*.12);cx.lineTo(w*.9,JY-h*.005);cx.moveTo(MX+MW/2,JY-h*.12);cx.lineTo(w*.01,JY-h*.01);cx.stroke();
    var bl=Math.floor(fr/20)%2;cx.fillStyle=bl?'#FF1744':'#7F0000';cx.beginPath();cx.arc(MX+MW/2,JY-h*.125,4,0,7);cx.fill();if(bl)glow(cx,MX+MW/2,JY-h*.125,16,'rgba(255,23,68,.6)');
    cx.fillStyle='#FFF8E1';rr(cx,MX+MW,JY-h*.055,w*.07,h*.05,5);cx.fill();cx.strokeStyle='#E65100';cx.lineWidth=2;rr(cx,MX+MW,JY-h*.055,w*.07,h*.05,5);cx.stroke();cx.fillStyle='#4FC3F7';rr(cx,MX+MW+w*.012,JY-h*.047,w*.042,h*.027,3);cx.fill();cx.fillStyle='rgba(255,255,255,.5)';cx.fillRect(MX+MW+w*.014,JY-h*.045,w*.012,h*.022);
    cx.fillStyle='#37474F';rr(cx,trolley-w*.035,JY+JH-h*.004,w*.07,h*.02,4);cx.fill();cx.fillStyle='#FFC107';cx.fillRect(trolley-w*.03,JY+JH-h*.004,w*.06,3);cx.fillStyle='#212121';cx.beginPath();cx.arc(trolley-w*.02,JY+JH-h*.004,3,0,7);cx.arc(trolley+w*.02,JY+JH-h*.004,3,0,7);cx.fill();
    cx.strokeStyle='#212121';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(trolley-2,JY+JH+h*.016);cx.lineTo(trolley-2,CY+h*.052);cx.moveTo(trolley+2,JY+JH+h*.016);cx.lineTo(trolley+2,CY+h*.052);cx.stroke();
    cx.fillStyle='#FFC107';rr(cx,trolley-7,CY+h*.05,14,h*.017,3);cx.fill();cx.strokeStyle='#37474F';cx.lineWidth=2.2;cx.beginPath();cx.arc(trolley,CY+h*.072,5,-.5,Math.PI*.9);cx.stroke();
    if(hang){var bk=hang;bk.hw=bk.w;blockDraw(bk,trolley,CY+h*.07+bk.h/2,Math.sin(tt*sp*2)*.04);cx.strokeStyle='#212121';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(trolley,CY+h*.06);cx.lineTo(trolley-bk.w*.4,CY+h*.07+bk.h*.1);cx.moveTo(trolley,CY+h*.06);cx.lineTo(trolley+bk.w*.4,CY+h*.07+bk.h*.1);cx.stroke()}
    cx.save();cx.translate(0,cam);stepP(cx,P,f);floatTxt(cx,F,f);cx.restore();
    hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}};
