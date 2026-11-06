/* ---------------- Ski-Lawine & Feuerwehr (Varianten der Flucht-Spiele) ---------------- */
GAMES.push(
 {id:'ski',n:'Lawinen-Flucht',e:'⛷️',g:T3(14),time:60,d:'ski',gs:'tap',lb:'Tippen',ctl:'',how:'Spring über Schneekugeln und Absperrungen. Die Lawine kommt!'}
);
(function(){var od=demoHTML;demoHTML=function(g){
  if(g.d==='ski')return '<div class="dm dm-ski"><span class="dwv"></span><span class="dgy">⛷️</span><span class="dob2">⚪</span><span class="dfin">👆</span></div>';
  return od(g)}})();
function runLike(T,cv,cx,w,h,score,over){
  var gy=h*(T.gy||.8),P0=h*.1,px=w*.34,y=0,vy=0,s=0,lives=3,inv=0,off=0,fr=0,P=[],F=[],items=[],next=w*.55,GG=RW.g.g,i,wx=-w*.02,dying=false,kd=0,nsp=0,fly=!!T.fly,ceil=h*.1;
  var unb=bindTap(cv,function(){if(dying)return;if(fly){vy=h*.0125;burst(P,px-P0*.3,gy-y-P0*.5,6,T.jet,3)}else if(y<=1){vy=h*(T.jv||.0285);burst(P,px,gy,10,T.dust,3)}});
  var BG=document.createElement('canvas'),dpr=cv.width/w;BG.width=w*dpr;BG.height=h*dpr;var bx=BG.getContext('2d');bx.scale(dpr,dpr);T.bg(bx,w,h,gy);
  var L=loopRun(function(f){fr+=f;inv-=f;var k=(s>=GG[0]?1:0)+(s>=GG[1]?1:0),sp=w*T.sp*(T.ramp?(.8+.35*Math.min(1,s/14)):1)*Math.pow(1.18,k);
    if(fly){vy-=h*.00066*f;y+=vy*f;if(y<=0){y=0;vy=Math.max(vy,0)}if(y>gy-ceil){y=gy-ceil;vy=Math.min(vy,0)}}
    else{vy-=h*T.G*f;y+=vy*f;if(y<=0){y=0;vy=0}}
    off+=sp*f;next-=sp*f;
    var wt=dying?px+w*.3:w*(-.02+(3-lives)*.075)+Math.sin(fr*.04)*w*.012;wx+=(wt-wx)*Math.min(1,(dying?.08:.05)*f);
    if(dying){kd+=f;if(wx>px-P0*.1||kd>80){L.stop();unb();over();return}}
    if(!dying&&next<=0){var it=T.spawn(h,w,s,nsp++);it.x=w+10;it.ok=false;items.push(it);next=w*(T.gap?T.gap(s)+Math.random()*.3:(.5+Math.random()*.45))}
    items.forEach(function(it){it.x-=sp*f+(it.mv?w*it.mv*f:0);it.rot=(it.rot||0)+f*.15;if(!it.ok&&it.x+it.wd<px-P0*.3){it.ok=true;s++;score(s);burst(P,px,gy-y-P0,10,T.pass,5)}});
    items=items.filter(function(it){if(it.x<-w*.3)return false;if(dying)return true;var ox=px+P0*.28>it.x+it.wd*.14&&px-P0*.28<it.x+it.wd*.86,hit=ox&&y<it.ht*.82;
      if(hit&&inv<=0){lives--;inv=70;if(fly)vy=h*.012;else vy=h*.01;burst(P,px,gy-y-P0/2,20,T.hitc,9);F.push({x:px,y:gy-y-P0*1.4,t:T.ouch,l:50,c:'#FF8A80'});if(lives<=0)dying=true;return false}return true});
    if(T.tilt){cx.save();cx.translate(px,gy);cx.rotate(T.tilt);cx.scale(1.18,1.18);cx.translate(-px,-gy)}cx.drawImage(BG,0,0,w,h);T.layer(cx,w,h,gy,off,fr);
    items.forEach(function(it){T.obj(cx,it,gy,h,w,fr)});
    T.hero(cx,px,gy-y,P0,fr,y,vy,inv>0&&Math.floor(fr/5)%2&&false);if(T.tilt)cx.restore();
    T.wall(cx,wx,w,h,gy,fr);
    if(inv>0){cx.strokeStyle='rgba(255,255,255,'+(.2+.2*Math.sin(fr*.5))+')';cx.lineWidth=3;cx.beginPath();cx.arc(px,gy-y-P0*.55,P0*.8,0,7);cx.stroke()}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}}
/* ----- Ski ----- */
GAMEFN.ski=function(cv,cx,w,h,score,over){return runLike({gy:.8,sp:.0072,ramp:1,tilt:.15,jv:.026,gap:function(s){return 1.15-.5*Math.min(1,s/14)},G:.0009,ouch:'AUA!',dust:['#fff','#CFE8FF'],jet:['#fff'],pass:['#fff','#B3E5FC','#FFD54F'],hitc:['#fff','#90CAF9','#CFD8DC'],
  spawn:function(h,w,s,n){var dd=Math.min(1,s/14),sz=h*.135;if(n<1)return {k:'ball',wd:sz*.7,ht:sz*.7,mv:0};if(Math.random()<.5)return {k:'ball',wd:sz*(.65+dd*.6+Math.random()*.25),ht:sz*(.65+dd*.7+Math.random()*.25),mv:.0006+dd*.0034};return {k:'fence',wd:sz*(1.1+dd*.6),ht:sz*(.6+dd*.3)}},
  bg:function(x,w,h,gy){var sk=x.createLinearGradient(0,0,0,gy);sk.addColorStop(0,'#5FA8E8');sk.addColorStop(.6,'#BFE0FA');sk.addColorStop(1,'#F0F8FF');x.fillStyle=sk;x.fillRect(0,0,w,gy+2);
    glow(x,w*.8,h*.14,w*.3,'rgba(255,255,230,.7)');x.fillStyle='#FFF9C4';x.beginPath();x.arc(w*.8,h*.14,w*.045,0,7);x.fill();
    x.fillStyle='#9FB4CF';x.beginPath();x.moveTo(0,gy);x.lineTo(w*.12,gy-h*.3);x.lineTo(w*.25,gy-h*.12);x.lineTo(w*.42,gy-h*.34);x.lineTo(w*.6,gy-h*.1);x.lineTo(w*.78,gy-h*.28);x.lineTo(w,gy-h*.08);x.lineTo(w,gy);x.fill();
    x.fillStyle='#fff';[[.12,.3],[.42,.34],[.78,.28]].forEach(function(q){var X=w*q[0],Y=gy-h*q[1];x.beginPath();x.moveTo(X,Y);x.lineTo(X-w*.07,Y+h*.1);x.lineTo(X-w*.03,Y+h*.08);x.lineTo(X,Y+h*.12);x.lineTo(X+w*.03,Y+h*.08);x.lineTo(X+w*.07,Y+h*.1);x.fill()});
    x.fillStyle='#78909C';x.beginPath();x.moveTo(0,gy);x.lineTo(w*.2,gy-h*.1);x.lineTo(w*.5,gy-h*.03);x.lineTo(w*.8,gy-h*.12);x.lineTo(w,gy-h*.04);x.lineTo(w,gy);x.fill();
    x.fillStyle=grad(x,0,gy,0,h,'#FFFFFF','#CFE3F5');x.fillRect(0,gy,w,h-gy);x.strokeStyle='#9FC3E6';x.lineWidth=2;x.beginPath();x.moveTo(0,gy);x.lineTo(w,gy);x.stroke()},
  layer:function(cx,w,h,gy,off,fr){var i;for(i=0;i<5;i++){var tx=((i*120-off*.35)%(w+120)+w+120)%(w+120)-60,tr=h*.09;cx.fillStyle='rgba(0,0,0,.12)';cx.beginPath();cx.ellipse(tx+6,gy-h*.004,tr*.6,tr*.12,0,0,7);cx.fill();cx.fillStyle='#4E342E';cx.fillRect(tx-2,gy-h*.04,4,h*.04);for(var l=0;l<3;l++){cx.fillStyle='#2E7D5B';cx.beginPath();cx.moveTo(tx,gy-h*.1-l*h*.045);cx.lineTo(tx+tr*(.55-l*.1),gy-h*.045-l*h*.045);cx.lineTo(tx-tr*(.55-l*.1),gy-h*.045-l*h*.045);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.moveTo(tx,gy-h*.1-l*h*.045);cx.lineTo(tx+tr*(.3-l*.05),gy-h*.07-l*h*.045);cx.lineTo(tx-tr*(.3-l*.05),gy-h*.07-l*h*.045);cx.fill()}}
    cx.strokeStyle='rgba(120,160,210,.5)';cx.lineWidth=2;for(i=0;i<10;i++){var sx=((i*77-off)%(w+60)+w+60)%(w+60)-30,sy=gy+h*.03+(i%4)*h*.045;cx.beginPath();cx.moveTo(sx,sy);cx.quadraticCurveTo(sx+18,sy-3,sx+40,sy);cx.stroke()}
    cx.fillStyle='rgba(255,255,255,.9)';for(i=0;i<30;i++){var fx=((i*53-fr*(1+i%3*.5)*.9)%w+w)%w,fy=((i*41+fr*(1.4+i%4*.3))%(h*.9));cx.beginPath();cx.arc(fx,fy,1.3+(i%3)*.6,0,7);cx.fill()}},
  obj:function(cx,it,gy,h,w,fr){var x=it.x,wd=it.wd,ht=it.ht;cx.save();cx.fillStyle='rgba(60,90,140,.3)';cx.beginPath();cx.ellipse(x+wd/2+4,gy+3,wd*.6,h*.012,0,0,7);cx.fill();
    if(it.k==='ball'){var r=Math.min(wd,ht)/2,cxp=x+wd/2,cyp=gy-r;cx.translate(cxp,cyp);cx.rotate(-it.rot);var g=cx.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);g.addColorStop(0,'#fff');g.addColorStop(.7,'#DCEBFA');g.addColorStop(1,'#9DB9DB');cx.fillStyle=g;cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();cx.strokeStyle='rgba(120,150,190,.7)';cx.lineWidth=2;for(var q=0;q<3;q++){cx.beginPath();cx.arc(0,0,r*(.35+q*.22),q*2,q*2+1.5);cx.stroke()}cx.fillStyle='#6D4C41';cx.fillRect(r*.2,-r*.3,3,3);cx.fillRect(-r*.5,r*.2,3,2)}
    else{cx.fillStyle='#546E7A';cx.fillRect(x+wd*.08,gy-ht,4,ht);cx.fillRect(x+wd*.88,gy-ht,4,ht);for(var b=0;b<2;b++){var by=gy-ht*(.95-b*.45),bh=ht*.32;for(var s2=0;s2<6;s2++){cx.fillStyle=s2%2?'#fff':'#E53935';cx.fillRect(x+wd*.08+s2*wd*.8/6,by,wd*.8/6+.5,bh)}cx.strokeStyle='rgba(0,0,0,.35)';cx.lineWidth=1;cx.strokeRect(x+wd*.08,by,wd*.8,bh)}cx.fillStyle='#fff';cx.fillRect(x+wd*.04,gy-5,wd*.16,5);cx.fillRect(x+wd*.8,gy-5,wd*.16,5)}
    cx.restore()},
  hero:function(cx,x,y,P0,fr,air){cx.save();cx.translate(x,y);var ang=air>3?-.25:0;cx.rotate(ang);var bob=air>3?0:Math.sin(fr*.4)*P0*.03;
    cx.fillStyle='rgba(60,90,140,.25)';if(air<=3){cx.beginPath();cx.ellipse(0,0,P0*.6,P0*.07,0,0,7);cx.fill()}
    cx.fillStyle='#E53935';rr(cx,-P0*.62,-P0*.06,P0*1.3,P0*.07,P0*.03);cx.fill();cx.beginPath();cx.moveTo(P0*.68,-P0*.06);cx.quadraticCurveTo(P0*.85,-P0*.1,P0*.88,-P0*.18);cx.lineTo(P0*.82,-P0*.1);cx.lineTo(P0*.66,-P0*.01);cx.fill();
    cx.strokeStyle='#1A237E';cx.lineWidth=P0*.15;cx.lineCap='round';cx.beginPath();cx.moveTo(-P0*.08,-P0*.1);cx.lineTo(-P0*.18,-P0*.36+bob);cx.lineTo(P0*.1,-P0*.55+bob);cx.moveTo(P0*.12,-P0*.1);cx.lineTo(P0*.18,-P0*.34+bob);cx.lineTo(P0*.1,-P0*.55+bob);cx.stroke();
    cx.fillStyle='#FF7043';rr(cx,-P0*.18,-P0*.98+bob,P0*.4,P0*.5,P0*.12);cx.fill();cx.fillStyle='#fff';cx.fillRect(-P0*.18,-P0*.74+bob,P0*.4,P0*.05);
    cx.strokeStyle='#FF7043';cx.lineWidth=P0*.1;cx.beginPath();cx.moveTo(P0*.12,-P0*.88+bob);cx.lineTo(P0*.38,-P0*.66+bob);cx.stroke();cx.strokeStyle='#8D6E63';cx.lineWidth=2.5;cx.beginPath();cx.moveTo(P0*.38,-P0*.66+bob);cx.lineTo(-P0*.1,air>3?-P0*.1:-P0*.02);cx.stroke();
    cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(P0*.03,-P0*1.08+bob,P0*.19,0,7);cx.fill();cx.fillStyle='#1976D2';cx.beginPath();cx.arc(P0*.03,-P0*1.12+bob,P0*.21,Math.PI,0);cx.fill();cx.fillRect(-P0*.18,-P0*1.12+bob,P0*.42,P0*.05);cx.fillStyle='#B3E5FC';rr(cx,P0*.08,-P0*1.1+bob,P0*.16,P0*.1,3);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(P0*.03,-P0*1.3+bob,P0*.06,0,7);cx.fill();
    cx.restore()},
  wall:function(cx,wx,w,h,gy,fr){var i;cx.save();for(i=0;i<22;i++){var yy=h*.1+i*(gy-h*.05)/22+Math.sin(fr*.06+i)*5,rr2=h*(.1+.03*Math.sin(i*1.7+fr*.05)),xx=wx-rr2*.3+Math.sin(fr*.08+i*2)*6;cx.fillStyle=i%3?'rgba(255,255,255,.96)':'rgba(215,232,250,.96)';cx.beginPath();cx.arc(xx,yy,rr2*.85,0,7);cx.fill()}
    cx.fillStyle='rgba(255,255,255,.95)';cx.fillRect(-w*.3,0,wx-w*.01,h);cx.fillStyle='rgba(180,205,235,.5)';for(i=0;i<8;i++){cx.beginPath();cx.arc(wx-w*.04-(i%3)*10,h*.1+i*h*.1,h*.04,0,7);cx.fill()}
    for(i=0;i<16;i++){cx.fillStyle='rgba(255,255,255,.8)';cx.beginPath();cx.arc(wx+Math.sin(fr*.1+i)*18+10+(i%4)*6,h*.12+(i*h*.052)%(gy),3+(i%3),0,7);cx.fill()}cx.restore()}
  },cv,cx,w,h,score,over)};

/* ---------------- Neue Anleitung: Original-Screenshot + grosse Hand ---------------- */
var HND={
 flappy:{k:'tap',x:50,y:72},tetris:{k:'s4',x:50,y:60},cannon:{k:'tap',x:50,y:60},runner:{k:'tap',x:50,y:75},stack:{k:'tap',x:50,y:75},
 pong:{k:'drag',x:50,y:78},roulette:{k:'tap',x:50,y:70},snake:{k:'s4',x:50,y:55},basket:{k:'tap',x:50,y:78},round:{k:'tap',x:55,y:60},
 base:{k:'tap',x:50,y:68},arch:{k:'tap',x:50,y:70},tower:{k:'tap',x:50,y:60},wslide:{k:'lr',x:30,y:78,x2:70},maze:{k:'s4',x:50,y:60},
 golf:{k:'flick',x:50,y:78,y2:40},ski:{k:'tap',x:50,y:75}};
var HTXT={tap:'Tippen',lr:'Links / rechts tippen oder wischen',s4:'Wischen in alle Richtungen',drag:'Finger ziehen',flick:'Wischen = Putten',tet:'Wischen'};
(function(){var od=demoHTML,oz=gzHTML;
 demoHTML=function(g){var h=HND[g.id];if(!h)return od(g);var x2=h.x2==null?h.x:h.x2,y2=h.y2==null?h.y:h.y2;
  return '<div class="dmx"><img src="img/g_'+g.id+'.jpg" alt="" onerror="this.style.display=\'none\'"><div class="hnd hk-'+h.k+'" style="--x1:'+h.x+'%;--y1:'+h.y+'%;--x2:'+x2+'%;--y2:'+y2+'%"><i class="htr"></i><span>👆</span><u class="hrp"></u></div><div class="dmt"><b>'+(HTXT[h.k]||'')+'</b></div></div>'};
 gzHTML=function(g){return HND[g.id]?'':oz(g)}})();

(function(){
function nz(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9+ ]+/g,' ').replace(/\s+/g,' ').trim()}
function hay(t){var kw=t.subject==='franz'?'vocabulaire vocab wortschatz franzosisch':t.subject==='engl'?'vocabulary vocab wortschatz english englisch':t.subject==='mathe'?'mathe mathematik':'deutsch';return nz([t.title,t.chapter,t.src||'',kw].join(' '))}
function closeS(){var o=document.getElementById('tsov');if(o)o.remove()}
ACT.tsearch=function(){
  closeS();
  var ts=topicsOf(nav.child,nav.subject),o=document.createElement('div');o.id='tsov';o.className='tsov';
  o.innerHTML='<div class="tspan" role="dialog" aria-label="Thema suchen"><div class="tsin"><input id="tsq" type="search" placeholder="Thema suchen, z. B. vocab unit 1" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="tsx" aria-label="Schliessen">✕</button></div><div class="tsres" id="tsres"></div></div>';
  document.body.appendChild(o);
  var q=o.querySelector('#tsq'),res=o.querySelector('#tsres');
  function show(){var w=nz(q.value).split(' ').filter(Boolean),L=ts.filter(function(t){var h=hay(t);return w.every(function(x){return h.indexOf(x)>=0})});
    res.innerHTML=L.length?L.map(function(t){var m=/^Unit\s*(\d+(?:\+\d+)?)\s*·\s*(.*)$/.exec(t.title),tg=(t.subject==='franz'?'Vocabulaire':t.subject==='engl'?'Vocabulary':'');return '<button class="tsr s-'+esc(t.subject)+'" data-id="'+esc(t.id)+'"><b>'+esc(m?'Unit '+m[1]+' · '+m[2]:t.title)+'</b><small>'+esc([tg,t.src||''].filter(Boolean).join(' · '))+'</small></button>'}).join(''):'<p class="tsno">Nichts gefunden</p>'}
  show();q.addEventListener('input',show);
  o.addEventListener('click',function(e){
    if(e.target===o||e.target.closest('.tsx')){closeS();return}
    var r=e.target.closest('.tsr');if(!r)return;
    var id=r.getAttribute('data-id'),t=topicById(id);closeS();
    nav.topen=nav.topen||{};nav.topen[id]=true;nav.chopen=nav.chopen||{};nav.chopen[nav.subject+'|'+t.chapter]=true;
    render();var el=document.querySelector('.tctog[data-id="'+id+'"]');if(el){var c=el.closest('.card');c.scrollIntoView({block:'center'});c.classList.add('tsflash');setTimeout(function(){c.classList.remove('tsflash')},1600)}
  });
  setTimeout(function(){try{q.focus()}catch(e){}},50);
};
})();

/* ---------- Profil + Konto: Name, Bild, Farbe, PIN (Firebase REST) ---------- */
(function(){
var FB={p:'easyschool-46e7c',k:'AIzaSyChuoDc0qp3wfo9rqwAIT_-bbbiZ-24Hj4'},acc=cloudAcct(),pend=null,chain=Promise.resolve();
function U(id,q){return 'https://firestore.googleapis.com/v1/projects/'+FB.p+'/databases/(default)/documents/kids/'+id+'?key='+FB.k+(q||'')}
function sha(t){var b=new TextEncoder().encode(t);return crypto.subtle.digest('SHA-256',b).then(function(h){return Array.prototype.map.call(new Uint8Array(h),function(x){return ('0'+x.toString(16)).slice(-2)}).join('')})}
function keyOf(n,pin){return sha('es1:'+n.toLowerCase().replace(/\s+/g,' ').trim()+':'+pin).then(function(h){return h.slice(0,40)})}
function pT(){var v=0;try{v=parseInt(localStorage.getItem('es.profT'),10)||0}catch(e){}return v}
function setPT(v){try{localStorage.setItem('es.profT',String(v))}catch(e){}}
function prof(){return {n:myName(),a:myAv(),c:myCol(),t:pT()}}
function applyProf(r,force){if(!r)return false;if(!force&&(r.t||0)<=pT())return false;setMyName(r.n||'');setMyAv(r.a||0);setMyCol(r.c==null?AVCOL.length-1:r.c);setPT(r.t||0);return true}
function get(id){return fetch(U(id)).then(function(r){if(r.status===404)return null;if(!r.ok)throw new Error('http '+r.status);return r.json()}).then(function(j){if(!j||!j.fields)return null;var o={};try{o.d=JSON.parse(j.fields.d.stringValue)}catch(e){o.d={}}try{o.p=JSON.parse(j.fields.p.stringValue)}catch(e){o.p=null}return o})}
function put(id,out,pr){return fetch(U(id,'&updateMask.fieldPaths=d&updateMask.fieldPaths=p&updateMask.fieldPaths=t'),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:{d:{stringValue:JSON.stringify(out)},p:{stringValue:JSON.stringify(pr)},t:{integerValue:String(Date.now())}}})}).then(function(r){if(!r.ok)throw new Error('http '+r.status)})}
function run(force){
  if(!acc)return Promise.resolve();
  chain=chain.then(function(){return get(acc.id)}).then(function(res){
    var rem=(res&&res.d)||{},out={},diff=!res,chg=false;
    if(res&&res.p&&applyProf(res.p,force))chg=true;
    C.children.forEach(function(c){var id=c.id;if(rem[id])mergeRemote(id,rem[id]);out[id]=prepared(id);sync.last[id]=stable(out[id]);if(!rem[id]||stable(shape(rem[id]))!==stable(out[id]))diff=true});
    var pr=prof();if(!res||!res.p||res.p.n!==pr.n||res.p.a!==pr.a||res.p.c!==pr.c)diff=true;
    if(chg&&(nav.view==='home'))render();
    if(!diff){sync.state='synced';updateSync();return}
    var isNew=!res;return put(acc.id,out,pr).then(function(){sync.state='synced';updateSync();if(isNew)fetch('https://firestore.googleapis.com/v1/projects/'+FB.p+'/databases/(default)/documents:commit?key='+FB.k,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({writes:[{transform:{document:'projects/'+FB.p+'/databases/(default)/documents/meta/stats',fieldTransforms:[{fieldPath:'n',increment:{integerValue:'1'}}]}}]})}).catch(function(){})})
  }).catch(function(e){sync.state='local';updateSync();throw e});
  var cur=chain;chain=chain.catch(function(){});return cur;
}
function req(){if(!acc)return Promise.resolve();if(!pend)pend=new Promise(function(res){setTimeout(function(){pend=null;res(run().catch(function(){}))},500)});return pend}
function hook(){sync.db={doc:function(){return {set:function(){return req()},onSnapshot:function(){}}}};sync.noWrite=false}
function resume(){if(!acc)return;hook();run().catch(function(){});
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&acc)run().catch(function(){})});
  setInterval(function(){if(acc&&!document.hidden)run().catch(function(){})},60000)}
var oi=initDb;initDb=function(){oi();resume()};
function close(){var o=document.getElementById('pfov');if(o)o.remove();render()}
function touchProf(){setPT(Date.now());req()}
ACT.avopen=function(){
  var o=document.getElementById('pfov');if(o)o.remove();
  acc=cloudAcct();o=document.createElement('div');o.id='pfov';o.className='pfov';
  var st={v:'main',mode:'create',msg:'',err:0,n:myName(),pin:'',first:''};
  function dots(){var s='';for(var i=0;i<Math.max(4,st.pin.length);i++)s+='<b class="'+(i<st.pin.length?'on':'')+'"></b>';return s}
  function keys(){var k='';[1,2,3,4,5,6,7,8,9,'',0,'⌫'].forEach(function(x){k+=x===''?'<i></i>':'<button class="pfk" data-d="'+x+'" aria-label="'+x+'">'+x+'</button>'});return k}
  function draw(){
    var h='',cc=myCol(),cur=myAv();
    if(st.v==='av'){
      h='<div class="pfh"><button class="pfdone" data-k="back">‹ Profil</button><b>Bild</b><span style="min-width:70px"></span></div><div class="avgrid pfg">'+Array.apply(null,{length:AV_N}).map(function(_,i){return '<button class="avopt'+(i===cur?' on':'')+'" data-k="av" data-i="'+i+'" aria-label="Avatar '+(i+1)+'">'+avPic(i,48)+'</button>'}).join('')+'</div>';
    }else{
      h='<div class="pfh"><span style="min-width:70px"></span><span></span><button class="pfdone" data-k="done">Fertig</button></div><p class="pfhd">'+(acc?'Dein Profil':'Wähle einen Namen und einen PIN, damit du deine XP nicht verlierst.')+'</p>'+
      '<div class="pfme"><button class="pfbig" data-k="pic" aria-label="Bild ändern">'+avPic(cur,64)+'<em>✎</em></button><div class="pfmid">'+(acc?'<div class="pfrow ro"><span class="pfrn">'+esc(acc.name)+'</span><span class="pfst">☁ gespeichert</span></div>':'<input id="pfn" class="pfin" maxlength="14" placeholder="Dein Name" value="'+esc(st.n)+'" autocomplete="off" autocapitalize="words" spellcheck="false">')+
      '<div class="pfcols">'+AVCOL.map(function(c,i){return '<button class="pfc'+(i===cc?' on':'')+'" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+')" data-k="col" data-i="'+i+'" aria-label="Farbe '+(i+1)+'"></button>'}).join('')+'</div></div></div>';
      if(acc){
        h+='<p class="pfok">Dein Fortschritt wird automatisch gespeichert.</p><button class="pfb pri" data-k="now">Jetzt speichern</button><button class="pfb ghost" data-k="out">Abmelden</button>';
      }else{
        h+='<div class="pfseg"><button class="'+(st.mode==='create'?'on':'')+'" data-k="m-create">Schüler erstellen</button><button class="'+(st.mode==='login'?'on':'')+'" data-k="m-login">Schüler anmelden</button></div>'+
        '<p class="pfsub2" id="pft">'+(st.mode==='login'?'PIN eingeben':(st.first?'PIN wiederholen':'Wähle einen PIN'))+'</p><div class="pfdots" id="pfd">'+dots()+'</div><div class="pfkeys">'+keys()+'</div>';
      }
      h+='<p class="pfm'+(st.err?' err':'')+'" id="pfmsg">'+st.msg+'</p>';
    }
    o.innerHTML='<div class="pfback" data-k="bg"></div><div class="pfsheet" role="dialog" aria-label="Profil">'+h+'</div>';
  }
  function say(m,e){st.msg=m;st.err=e?1:0;var x=o.querySelector('#pfmsg');if(x){x.textContent=m;x.className='pfm'+(e?' err':'')}}
  function rd(){var a=o.querySelector('#pfn');if(a)st.n=a.value}
  function reset(m,e){st.pin='';st.first='';st.msg=m||'';st.err=e?1:0;draw()}
  function pinDone(){
    rd();var n=st.n.trim(),pin=st.pin;
    if(n.length<2){reset('Bitte oben deinen Namen eingeben (mindestens 2 Zeichen).',1);return}
    if(st.mode==='create'){
      if(!st.first){st.first=pin;st.pin='';st.msg='';draw();return}
      if(st.first!==pin){reset('Die beiden PINs sind verschieden. Nochmal.',1);return}
      st.msg='Einen Moment …';st.err=0;st.pin='';draw();
      keyOf(n,pin).then(function(id){return get(id).then(function(res){
        if(res){reset('Diesen Namen gibt es mit dieser PIN schon. Nimm eine andere PIN.',1);return}
        setMyName(n);acc={id:id,name:n};try{localStorage.setItem('es.acct',JSON.stringify(acc))}catch(x){}
        setPT(Date.now());hook();return run().then(function(){st.first='';st.pin='';st.msg='Gespeichert ✓';st.err=0;draw()})})
      }).catch(function(){acc=null;reset('Keine Verbindung. Versuch es später nochmal.',1)});
    }else{
      st.msg='Einen Moment …';st.err=0;st.pin='';draw();
      keyOf(n,pin).then(function(id){return get(id).then(function(res){
        if(!res){reset('Name oder PIN stimmt nicht.',1);return}
        acc={id:id,name:n};if(res.p)applyProf(res.p,true);else setMyName(n);acc.name=myName()||n;try{localStorage.setItem('es.acct',JSON.stringify(acc))}catch(x){}
        hook();return run(true).then(function(){st.pin='';st.msg='Angemeldet ✓';st.err=0;draw()})})
      }).catch(function(){reset('Keine Verbindung. Versuch es später nochmal.',1)});
    }
  }
  draw();document.body.appendChild(o);
  o.addEventListener('input',function(e){if(e.target.id==='pfn'){st.n=e.target.value}});
  o.addEventListener('click',function(e){
    var b=e.target.closest('[data-k],[data-d]');if(!b)return;
    var d=b.getAttribute('data-d'),k=b.getAttribute('data-k');
    if(d!==null){
      st.seq=(st.seq||[]);st.seq.push(d);if(st.seq.length>12)st.seq.shift();
      var sq=st.seq.join(',');clearTimeout(st.tm);
      if(sq==='1,8,⌫,⌫,0,8,⌫,⌫,1,9,8,3'){st.pin='';o.remove();render();showPicker();return}
      if(st.pin.length>=4&&d!=='⌫')return;
      st.pin=d==='⌫'?st.pin.slice(0,-1):st.pin+d;
      var dd=o.querySelector('#pfd');if(dd)dd.innerHTML=dots();
      if(st.msg){say('')}
      if(st.pin.length===4)st.tm=setTimeout(function(){if(st.pin.length===4)pinDone()},120);
      return}
    if(k==='bg'||k==='done'){rd();var nn=st.n.trim();
      if(!acc&&nn.length>=2&&st.mode==='create'&&nn!==myName()){setMyName(nn);touchProf()}
      close();return}
    if(k==='col'){rd();setMyCol(+b.getAttribute('data-i'));touchProf();draw();return}
    if(k==='pic'){rd();st.v='av';draw();return}
    if(k==='av'){setMyAv(+b.getAttribute('data-i'));touchProf();st.v='main';draw();return}
    if(k==='back'){st.v='main';draw();return}
    if(k==='m-create'||k==='m-login'){rd();st.mode=k.slice(2);st.pin='';st.first='';st.msg='';st.err=0;draw();return}
    if(k==='now'){say('Speichere …');run().then(function(){say('Gespeichert ✓')},function(){say('Keine Verbindung.',1)});return}
    if(k==='out'){try{localStorage.removeItem('es.acct')}catch(x){}acc=null;sync.db=null;sync.state='local';st.pin='';st.first='';st.msg='Abgemeldet. Dein Fortschritt bleibt auf diesem Gerät.';st.err=0;draw();return}
  });
};
ACT.avclose=function(){};
})();

/* ---------- Fortschritt-Ansicht (Kinder und Eltern) ---------- */
(function(){
function dT(t){var m=/^Unit\s*(\d+(?:\+\d+)?)\s*·\s*(.*)$/.exec(t.title);if(m&&(t.subject==='franz'||t.subject==='engl')){var vl=t.subject==='franz'?'Vocabulaire':'Vocabulary';return /vocab/i.test(m[2])?m[2]+' · Unit '+m[1]:vl+' · Unit '+m[1]}return t.title}
function dl(ts){var d=new Date(ts),k0=dkey(0),k1=dkey(1),k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');if(k===k0)return 'Heute';if(k===k1)return 'Gestern';return d.toLocaleDateString('de-CH',{weekday:'short',day:'numeric',month:'numeric'})}
function dur(sec){var m=Math.round(sec/60);if(m<60)return m+' Min';return Math.floor(m/60)+' Std '+('0'+(m%60)).slice(-2)+' Min'}
function ago(t){if(!t)return '';var d=Math.floor((Date.now()-t)/DAY);return d<=0?'heute geübt':d===1?'gestern geübt':'vor '+d+' Tagen geübt'}
function nc(n){return n>=5?'g':n>=4?'am':'r'}
function ring(pct,sz,sw,col,txt,sub,trk){var r=(sz-sw)/2,c=2*Math.PI*r,o=c*(1-Math.max(0,Math.min(1,pct)));return '<div class="pgring" style="width:'+sz+'px;height:'+sz+'px"><svg viewBox="0 0 '+sz+' '+sz+'" width="'+sz+'" height="'+sz+'"><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="'+(trk||'#E8EAED')+'" stroke-width="'+sw+'"/><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'" transform="rotate(-90 '+sz/2+' '+sz/2+')"/></svg><div class="pgrt2"><b>'+txt+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</div></div>'}
function kpi(ic,col,val,lab){return '<div class="pgk"><span class="pgki" style="background:'+col[0]+';color:'+col[1]+'">'+ic+'</span><b>'+val+'</b><small>'+lab+'</small></div>'}
VIEWS.progress=function(){
  var ch=C.children.filter(function(c){return c.id===nav.child})[0],p=prog(ch.id),i,k,po=nav.pgo=nav.pgo||{},
  all=topicsOf(ch.id),Lall=level(ch.id,all),pl=plinfo(ch.id);
  var sec=0,n=0,ok=0;for(k in p.days){sec+=p.days[k].sec||0;n+=p.days[k].n||0;ok+=p.days[k].ok||0}
  var ex=p.exams,avg=ex.length?ex.reduce(function(a,e){return a+e.note},0)/ex.length:0,rate=n?ok/n:0;
  var html='<div class="stack pgv"><section class="pghero"><div class="pghl"><p class="eyebrow">Fortschritt</p><h1>'+esc(label(ch))+'</h1><p class="pghs">'+(myName()?esc(myName())+' · ':'')+'Level '+pl.L+' · '+pl.xp+' XP</p><div class="pghc"><span>🔥 '+streak(ch.id)+' Tage</span><span>⏱ '+dur(sec)+'</span></div></div>'+ring(Lall.pct,104,11,'#fff','<span style="color:#fff">'+Math.round(Lall.pct*100)+'%</span>','<span style="color:#fff;opacity:.85">sitzt</span>','rgba(255,255,255,.28)')+'</section>';
  html+='<div class="pgt">'+kpi('✓',['#E6F4EA','#188038'],n?Math.round(rate*100)+' %':'–','richtig · '+n+' Antworten')+kpi('★',['#FEF3E0','#B06000'],ex.length?fmt(avg):'–','Ø Prüfungsnote · '+ex.length+'×')+'</div>';
  // 14 Tage
  var days=[],max=10,tot14=0,act=0;for(i=13;i>=0;i--){var d=p.days[dkey(i)]||{sec:0};var mn=Math.round((d.sec||0)/60);days.push({k:dkey(i),m:mn,today:i===0});max=Math.max(max,mn);tot14+=mn;if(mn)act++}
  var top=Math.ceil(max/10)*10;
  html+='<section class="card pgc"><div class="pgch"><h2>Lernzeit</h2><span class="pgsum">'+tot14+' Min · '+act+' von 14 Tagen</span></div><div class="pgplot"><div class="pggrid"><i><u>'+top+'</u></i><i><u>'+Math.round(top/2)+'</u></i><i><u>0</u></i></div><div class="pgb">'+days.map(function(d,j){var wd=new Date(d.k+'T12:00:00');return '<div class="pgcol"><i class="'+(d.m?'on':'')+(d.today?' td':'')+'" style="height:'+Math.max(3,Math.round(100*d.m/top))+'%"></i><span class="pgl">'+(j%2?'':wd.getDate()+'.')+'</span></div>'}).join('')+'</div></div></section>';
  // Fächer (aufklappbar)
  C.subjects.filter(function(sb){return topicsOf(ch.id,sb.id).length}).forEach(function(sb){
    var ts=topicsOf(ch.id,sb.id),L=level(ch.id,ts),open=!!po[sb.id],cnt={g:0,am:0,r:0,n:0},sn=0,sc=0;
    var rows=ts.map(function(t){
      var lv=level(ch.id,[t]),w=Math.max(lv.seen?4:0,Math.round(lv.pct*100)),last=0;
      cardsIn([t]).forEach(function(x){var r=p.cards[x.k];if(r&&r.t>last)last=r.t});
      var te=ex.filter(function(e){return e.topic===t.id}),best=bestNote(ch.id,t.id),st=!lv.seen?['Neu','n']:lv.pct>=.75?['Stark','g']:lv.pct>=.4?['Auf dem Weg','am']:['Üben','r'];
      cnt[st[1]]++;if(best){sn+=best;sc++}
      return '<button class="pgr" data-act="pgopen" data-id="'+esc(t.id)+'"><div class="pgrt"><b>'+esc(dT(t))+'</b><span class="pgchip '+st[1]+'">'+st[0]+'</span></div><div class="bar thin"><i style="width:'+w+'%"></i></div><div class="pgrb"><span>'+w+' % sitzt'+(last?' · '+ago(last):'')+'</span><span class="pgn '+(best?nc(best):'x')+'">'+(best?'Note '+fmt(best)+(te.length>1?' · '+te.length+'×':''):'Noch keine Prüfung')+'</span></div></button>'}).join('');
    var chips=(cnt.g?'<span class="pgchip g">'+cnt.g+' stark</span>':'')+(cnt.am?'<span class="pgchip am">'+cnt.am+' unterwegs</span>':'')+(cnt.r?'<span class="pgchip r">'+cnt.r+' üben</span>':'')+(cnt.n?'<span class="pgchip n">'+cnt.n+' neu</span>':'');
    html+='<section class="card pgs s-'+esc(sb.id)+(open?' open':'')+'"><button class="pgsh" data-act="pgtog" data-id="'+esc(sb.id)+'" aria-expanded="'+open+'"><span class="sbadge s-'+esc(sb.id)+'" style="width:40px;height:40px;flex:none">'+sicon(sb,24)+'</span><span class="pgsm"><b>'+esc(sb.name)+'</b><span class="pgsc">'+chips+(sc?'<span class="pgnote">Ø Note '+fmt(sn/sc)+'</span>':'')+'</span></span>'+ring(L.pct,46,6,'var(--sc,#1A73E8)','<span style="font-size:.78rem">'+Math.round(L.pct*100)+'</span>')+'<span class="pgchev">'+(open?'▾':'▸')+'</span></button>'+(open?'<div class="pgrows">'+rows+'</div>':'')+'</section>'});
  // Verlauf
  var ev=[];for(k in p.days){var dd=p.days[k];if(dd.sec||dd.n)ev.push({t:new Date(k+'T12:00:00').getTime(),h:'day',d:dd,k:k})}
  ex.forEach(function(e){ev.push({t:e.t,h:'ex',e:e})});
  ev.sort(function(a,b){return b.t-a.t});var lim=po._more?30:6;
  html+='<section class="card pgc"><h2>Was du gemacht hast</h2>'+(ev.length?'<div class="pgtl">'+ev.slice(0,lim).map(function(x){
    if(x.h==='ex'){var tt=topicById(x.e.topic);return '<div class="pgev"><span class="pgd">'+dl(x.t)+'</span><span class="pgdot ex"></span><div><b>Prüfung: '+esc(tt?dT(tt):(x.e.topic==='kl8-deu-grammatik1'?'Grammatik (früher)':x.e.topic))+'</b><small>Note '+fmt(x.e.note)+' · '+x.e.score+' von '+x.e.max+' Punkten</small></div></div>'}
    return '<div class="pgev"><span class="pgd">'+dl(x.t)+'</span><span class="pgdot"></span><div><b>'+dur(x.d.sec||0)+' geübt</b><small>'+(x.d.n||0)+' Antworten · '+(x.d.n?Math.round(100*(x.d.ok||0)/x.d.n):0)+' % richtig'+(x.d.xp?' · +'+x.d.xp+' XP':'')+'</small></div></div>'}).join('')+'</div>'+(ev.length>6?'<button class="pgmore" data-act="pgmore">'+(po._more?'Weniger anzeigen':'Mehr anzeigen')+'</button>':''):'<p class="sub">Noch nichts. Fang mit einem Thema an, dann erscheint es hier.</p>')+'</section>';
  return html+'</div>';
};
ACT.pgtog=function(b){nav.pgo=nav.pgo||{};nav.pgo[b.dataset.id]=!nav.pgo[b.dataset.id];var y=window.scrollY;render();window.scrollTo(0,y)};
ACT.pgmore=function(){nav.pgo=nav.pgo||{};nav.pgo._more=!nav.pgo._more;var y=window.scrollY;render();window.scrollTo(0,y)};
ACT.prog=function(b){var c=(b&&b.dataset&&b.dataset.id)||nav.child;go({view:'progress',child:c},nav.view==='parent'?{view:'parent'}:{view:'child',child:c,from:{view:'home'}})};
ACT.pgopen=function(b){var t=topicById(b.dataset.id);nav.topen=nav.topen||{};var o={view:'subject',child:nav.child,subject:t.subject,topen:{},chopen:{}};o.topen[t.id]=true;o.chopen[t.subject+'|'+t.chapter]=true;go(o,{view:'progress',child:nav.child,from:nav.from})};
})();

/* ---------- Taschenrechner ab Klasse 7 (v4.45) ---------- */
function gradeOf(c){var m=/(\d+)/.exec(c||'');return m?+m[1]:0}
function calcAvail(){var ok=false;try{ok=!!(nav.child&&gradeOf(nav.child)>=7&&((nav.view==='exam'&&topicById(nav.topicId).subject==='mathe')||(nav.view==='practice'&&(nav.subject==='mathe'||/-mathe-/.test(nav.scope||'')))))}catch(e){}return ok}
function calcFab(){
  var b=document.getElementById('calcfab'),ok=false;
  try{ok=nav.child&&gradeOf(nav.child)>=7&&((nav.view==='exam'&&topicById(nav.topicId).subject==='mathe')||(nav.view==='practice'&&(nav.subject==='mathe'||/-mathe-/.test(nav.scope||''))))}catch(e){ok=false}
  document.body.classList.toggle('hascalc',!!ok);if(true){if(b)b.remove();return}
  if(!b){b=document.createElement('button');b.id='calcfab';b.type='button';b.setAttribute('aria-label','Rechner öffnen');b.innerHTML='🧮<small>Rechner</small>';b.addEventListener('click',calcOpen);document.body.appendChild(b)}
}
function calcOpen(){
  if(document.getElementById('calov'))return;
  var cur='0',acc=null,op=null,fresh=false,expr='',ov=document.createElement('div');
  ov.id='calov';ov.className='calov';
  var keys=[['C','k2'],['⌫','k2'],['√','k3'],['x²','k3'],['7'],['8'],['9'],['÷','k3'],['4'],['5'],['6'],['×','k3'],['1'],['2'],['3'],['−','k3'],['0'],[','],['=','k4'],['+','k3']];
  ov.innerHTML='<div class="calsh" role="dialog" aria-label="Taschenrechner"><div class="calhd"><b>Rechner</b><button type="button" class="calx" aria-label="Schliessen">✕</button></div><div class="caldisp"><div class="calex" id="calex">&nbsp;</div><div class="calnum" id="calnum">0</div></div><div class="calkeys">'+keys.map(function(k){return '<button type="button" class="calk '+(k[1]||'')+'" data-k="'+k[0]+'">'+k[0]+'</button>'}).join('')+'</div></div>';
  document.body.appendChild(ov);
  function num(s){return parseFloat(String(s).replace(',','.'))}
  function fmt(n){if(!isFinite(n))return 'Fehler';return String(parseFloat(n.toPrecision(12))).replace('.',',')}
  function show(){document.getElementById('calnum').textContent=cur;document.getElementById('calex').innerHTML=expr||'&nbsp;'}
  function calc(a,o,b){return o==='+'?a+b:o==='−'?a-b:o==='×'?a*b:b===0?NaN:a/b}
  function press(k){
    if(cur==='Fehler'&&k!=='C'){return}
    if(/^\d$/.test(k)){if(fresh||cur==='0'){cur=k}else if(cur.replace(/[^\d]/g,'').length<12){cur+=k}fresh=false}
    else if(k===','){if(fresh){cur='0,';fresh=false}else if(cur.indexOf(',')<0)cur+=','}
    else if(k==='⌫'){cur=cur.length>1&&!fresh?cur.slice(0,-1):'0'}
    else if(k==='C'){cur='0';acc=null;op=null;fresh=false;expr=''}
    else if(k==='√'){var v=num(cur);expr='√('+cur+')';cur=v<0?'Fehler':fmt(Math.sqrt(v));fresh=true}
    else if(k==='x²'){var w=num(cur);expr='('+cur+')²';cur=fmt(w*w);fresh=true}
    else if(k==='='){if(op!==null){var r=calc(acc,op,num(cur));expr=fmt(acc)+' '+op+' '+cur+' =';cur=isNaN(r)?'Fehler':fmt(r);op=null;acc=null;fresh=true}}
    else{if(op!==null&&!fresh){var r2=calc(acc,op,num(cur));if(isNaN(r2)){cur='Fehler';op=null;acc=null;show();return}acc=r2}else acc=num(cur);op=k;expr=fmt(acc)+' '+k;fresh=true;if(!isNaN(acc))cur=fmt(acc)}
    show()
  }
  function close(){document.removeEventListener('keydown',kd);ov.remove()}
  function kd(e){var m={'*':'×','/':'÷','-':'−','+':'+','.':',',',':',','Enter':'=','=':'=','Backspace':'⌫','Delete':'C'};
    if(e.key==='Escape'){close();return}
    var k=/^\d$/.test(e.key)?e.key:m[e.key];if(k){e.preventDefault();press(k)}}
  ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('.calx')){close();return}var b=e.target.closest('.calk');if(b)press(b.dataset.k)});
  document.addEventListener('keydown',kd);
}

/* ---------------- Turnen: Minitramp-Sprung über den Bock (3D-Turnhalle) ---------------- */
GAMES.push({id:'vault',n:'Bocksprung',e:'🤸‍♀️',g:T3(16),time:60,d:'vault',gs:'tap',lb:'Tippen',ctl:'👆 Tippen, wenn der Turner auf dem gelben Feld ist',how:'Tippe genau im gelben Absprung-Feld. Mitte = Doppelsalto! Zu früh oder zu spät = Sturz.'});
HND.vault={k:'tap',x:50,y:72};
GAMEFN.vault=function(cv,cx,w,h,score,over){
  var G=9.81,s=0,lives=3,P=[],F=[],T=0,ph='run',pt=0,v=5.4,res=null,shake=0,msgT=0,msg='',msgC='#fff',bed=0,squash=0,crackP=null,crackT=0,dizzy=0;
  var com=[-12,1],rot=0,pz=null,vel=[0,0],FL=null,ftime=0,RD=null,acc=0,tapX=0,hurdle=null;
  var ZW=function(){return Math.max(.16,.34-s*.015)},Z1=-.55,Z0=function(){return Z1-ZW()};
  var BX=2.4,BH=1.2,BL=.42,BW=.31,M0=4,M1=7,MH=.35,TR0=.28,TR1=.52;
  function trTop(x){return TR0+(TR1-TR0)*x}
  /* ---------- Kamera ---------- */
  var E,Fv,Rv,Uv,FOC=w*.9,HZ=h*.52,camX=-11,camY=0,MIR=false;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}
  function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function nrm(a){var l=Math.hypot(a[0],a[1],a[2]);return [a[0]/l,a[1]/l,a[2]/l]}
  function cam(){E=[camX-1.15,1.38+camY,-3.15];var tg=[camX+1.45,1.15+camY,.5];Fv=nrm(sub(tg,E));Rv=nrm(cross([0,1,0],Fv));Uv=cross(Fv,Rv)}
  function pr(p){if(MIR)p=[p[0],-p[1],p[2]];var d=sub(p,E),z=dot(d,Fv);if(z<.12)z=.12;return [w/2+FOC*dot(d,Rv)/z+(shake?(Math.random()-.5)*shake:0),HZ-FOC*dot(d,Uv)/z,z]}
  function path(pts){var q=pts.map(pr);cx.beginPath();cx.moveTo(q[0][0],q[0][1]);for(var i=1;i<q.length;i++)cx.lineTo(q[i][0],q[i][1]);cx.closePath();return q}
  function poly(pts,fill,stroke,lw){path(pts);cx.fillStyle=fill;cx.fill();if(stroke){cx.strokeStyle=stroke;cx.lineWidth=lw||1;cx.stroke()}}
  function line3(a,b,col,wd){var p=pr(a),q=pr(b);cx.strokeStyle=col;cx.lineWidth=Math.max(1,FOC*wd/((p[2]+q[2])/2));cx.lineCap='round';cx.beginPath();cx.moveTo(p[0],p[1]);cx.lineTo(q[0],q[1]);cx.stroke()}
  function tube(a,b,col,wd){line3(a,b,shade(col,.72),wd);var p=pr(a),q=pr(b),z=(p[2]+q[2])/2,lw=Math.max(1,FOC*wd/z);cx.strokeStyle=shade(col,1.12);cx.lineWidth=lw*.45;cx.beginPath();cx.moveTo(p[0]-lw*.15,p[1]-lw*.15);cx.lineTo(q[0]-lw*.15,q[1]-lw*.15);cx.stroke()}
  function shade(c,k){var n=parseInt(c.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return 'rgb('+Math.min(255,r*k|0)+','+Math.min(255,g*k|0)+','+Math.min(255,b*k|0)+')'}
  function box(x0,x1,y0,y1,z0,z1,col,topc,side){
    var c=[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]];
    var fc=[[[0,1,2,3],[0,0,-1],.9],[[5,4,7,6],[0,0,1],.7],[[4,0,3,7],[-1,0,0],.8],[[1,5,6,2],[1,0,0],.66],[[3,2,6,7],[0,1,0],1.06],[[4,5,1,0],[0,-1,0],.5]],mid=[(x0+x1)/2,(y0+y1)/2,(z0+z1)/2];
    fc.forEach(function(f){var fcn=[mid[0]+f[1][0]*(x1-x0)/2,mid[1]+f[1][1]*(y1-y0)/2,mid[2]+f[1][2]*(z1-z0)/2],cam2=MIR?[E[0],-E[1],E[2]]:E;if(dot(f[1],sub(cam2,fcn))<=0)return;
      poly(f[0].map(function(i){return c[i]}),f[1][1]===1&&topc?topc:shade(f[1][1]===1?col:(side||col),f[2]),'rgba(0,0,0,.1)')})}
  /* Text auf eine Wandfläche legen (affin) */
  function wallText(x0,y0,x1,y1,z,draw){var a=pr([x0,y1,z]),b=pr([x1,y1,z]),c=pr([x0,y0,z]);var W2=200,H2=200*(y1-y0)/(x1-x0);cx.save();cx.setTransform((b[0]-a[0])/W2*dpr,(b[1]-a[1])/W2*dpr,(c[0]-a[0])/H2*dpr,(c[1]-a[1])/H2*dpr,a[0]*dpr,a[1]*dpr);draw(W2,H2);cx.restore()}
  function floorText(x0,x1,z0,z1,draw){var a=pr([x0,.021,z1]),b=pr([x1,.021,z1]),c=pr([x0,.021,z0]);var W2=200,H2=200*(z1-z0)/(x1-x0);cx.save();cx.setTransform((b[0]-a[0])/W2*dpr,(b[1]-a[1])/W2*dpr,(c[0]-a[0])/H2*dpr,(c[1]-a[1])/H2*dpr,a[0]*dpr,a[1]*dpr);draw(W2,H2);cx.restore()}
  var dpr=cv.width/w,LOGO=new Image();LOGO.src='img/stv_logo.jpg';
  /* ---------- Turnhalle ---------- */
  var seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
  var PL=[];for(var i0=0;i0<40;i0++)PL.push(.86+rnd()*.22);
  var WZ=5;
  function hall(){
    var bg=cx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#DDE4EE');bg.addColorStop(1,'#B9C4D2');cx.fillStyle=bg;cx.fillRect(0,0,w,h);
    var x0=camX-14,x1=camX+18,i,x;
    /* Decke mit Lichtbändern */
    poly([[x0,7.2,-6],[x1,7.2,-6],[x1,7.2,WZ],[x0,7.2,WZ]],'#C9D1DC');
    for(x=Math.floor(x0/4)*4;x<x1;x+=4){for(var zz=-4;zz<WZ;zz+=3){poly([[x,7.19,zz],[x+2.6,7.19,zz],[x+2.6,7.19,zz+.5],[x,7.19,zz+.5]],'#FFFDF2');}}
    for(x=Math.floor(x0/4)*4;x<x1;x+=4)line3([x,7.15,-6],[x,7.15,WZ],'#9AA6B8',.09);
    /* Rückwand */
    poly([[x0,0,WZ],[x1,0,WZ],[x1,7.2,WZ],[x0,7.2,WZ]],'#F1F3F6');
    poly([[x0,0,WZ],[x1,0,WZ],[x1,1.9,WZ],[x0,1.9,WZ]],'#2F5FA8');
    for(x=Math.floor(x0);x<x1;x+=1.25)line3([x,0,WZ-.01],[x,1.9,WZ-.01],'rgba(255,255,255,.18)',.015);
    line3([x0,1.9,WZ-.01],[x1,1.9,WZ-.01],'#E8EEF6',.04);
    /* Fensterband */
    for(x=Math.floor(x0/3)*3;x<x1;x+=3){var gl=pr([x+1.3,4.6,WZ]);poly([[x+.15,3.5,WZ-.01],[x+2.85,3.5,WZ-.01],[x+2.85,5.9,WZ-.01],[x+.15,5.9,WZ-.01]],'#BFE0FA','#8FA9C6',1.2);
      poly([[x+.15,4.7,WZ-.02],[x+2.85,4.7,WZ-.02],[x+2.85,5.9,WZ-.02],[x+.15,5.9,WZ-.02]],'rgba(255,255,255,.35)');line3([x+1.5,3.5,WZ-.02],[x+1.5,5.9,WZ-.02],'#8FA9C6',.04)}
    /* Lichtschächte aus den Fenstern */
    for(x=Math.floor(x0/3)*3;x<x1;x+=6){poly([[x+.4,5.9,WZ-.05],[x+2.6,5.9,WZ-.05],[x+4.6,0,1.2],[x+1.8,0,1.2]],'rgba(255,252,230,.10)')}
    /* Sprossenwände */
    for(x=Math.floor(x0/2.4)*2.4;x<x1;x+=2.4){if(Math.abs(x-3.6)<1.6||Math.abs(x+6)<1.6)continue;
      for(var j=0;j<2;j++)tube([x+j*.9,0,WZ-.08],[x+j*.9,2.9,WZ-.08],'#C58B4E',.07);
      for(var r2=0;r2<13;r2++)line3([x,.18+r2*.21,WZ-.08],[x+.9,.18+r2*.21,WZ-.08],'#DCA668',.035)}
    /* Banner mit STV-Stetten-Logo */
    [[1.2,6.0],[-8.5,-3.7]].forEach(function(bn){if(bn[1]<x0||bn[0]>x1)return;
      poly([[bn[0]-.05,2.1,WZ-.055],[bn[1]+.05,2.1,WZ-.055],[bn[1]+.05,3.25,WZ-.055],[bn[0]-.05,3.25,WZ-.055]],'#1A1A1A');
      poly([[bn[0],2.15,WZ-.06],[bn[1],2.15,WZ-.06],[bn[1],3.2,WZ-.06],[bn[0],3.2,WZ-.06]],'#FFFFFF');
      wallText(bn[0],2.15,bn[1],3.2,WZ-.075,function(W2,H2){if(LOGO.complete&&LOGO.naturalWidth)cx.drawImage(LOGO,H2*.06,H2*.06,H2*.88,H2*.88);
        cx.textAlign='left';cx.textBaseline='middle';cx.fillStyle='#111';cx.font='900 '+(H2*.3)+'px Arial,sans-serif';cx.fillText('ART OF GETU',H2*1.08,H2*.42);
        cx.fillStyle='#D7262E';cx.fillRect(H2*1.08,H2*.64,W2-H2*1.18,H2*.05);cx.fillStyle='#444';cx.font='700 '+(H2*.15)+'px Arial,sans-serif';cx.fillText('Geräteturnen',H2*1.08,H2*.82)})});
    /* Basketballbrett */
    if(x0<-1&&x1>-3){poly([[-2.75,3.9,WZ-.3],[-1.25,3.9,WZ-.3],[-1.25,4.95,WZ-.3],[-2.75,4.95,WZ-.3]],'rgba(255,255,255,.92)','#E53935',2);line3([-2,3.9,WZ-.35],[-2,3.9,WZ-.75],'#E65100',.05)}
    /* Holzboden: Riemen mit Tonwechsel + Glanz */
    for(i=0;i<34;i++){var z0=-6+i*.33;poly([[x0,0,z0],[x1,0,z0],[x1,0,z0+.33],[x0,0,z0+.33]],shade('#D7A266',PL[i]))}
    for(x=Math.floor(x0/2.2)*2.2;x<x1;x+=2.2)for(i=0;i<34;i+=2){var zq=-6+i*.33+((i*.37)%1)*.2;line3([x+(i%3)*.7,.001,zq],[x+(i%3)*.7,.001,zq+.33],'rgba(120,70,30,.18)',.01)}
    [[-2.6,'#2E7D32'],[3.4,'#C62828'],[-1.4,'#1565C0']].forEach(function(L){poly([[x0,.003,L[0]],[x1,.003,L[0]],[x1,.003,L[0]+.05],[x0,.003,L[0]+.05]],L[1])});
    for(x=Math.floor(x0/4)*4;x<x1;x+=4){var q=pr([x+1.3,0,1.6]),R=FOC*1.6/q[2];var g2=cx.createRadialGradient(q[0],q[1],0,q[0],q[1],R);g2.addColorStop(0,'rgba(255,253,240,.38)');g2.addColorStop(1,'rgba(255,253,240,0)');cx.fillStyle=g2;cx.beginPath();cx.ellipse(q[0],q[1],R,R*.35,0,0,7);cx.fill()}
    /* Langbänke an der Wand */
    for(x=Math.floor(x0/7)*7;x<x1;x+=7){box(x,x+3.5,.32,.38,WZ-.75,WZ-.5,'#C99A62','#DDB27A');[x+.3,x+3.2].forEach(function(lx){box(lx,lx+.06,0,.32,WZ-.72,WZ-.53,'#8A6438')})}
  }
  function runway(){
    poly([[-17,.012,-.6],[-.12,.012,-.6],[-.12,.012,.6],[-17,.012,.6]],'#33519E');
    poly([[-17,.013,-.6],[-.12,.013,-.6],[-.12,.013,-.54],[-17,.013,-.54]],'#22397A');
    for(var k=-17;k<-.12;k+=1.2)poly([[k,.014,-.6],[k+.03,.014,-.6],[k+.03,.014,.6],[k,.014,.6]],'rgba(255,255,255,.13)');
    var z0=Z0(),pul=.6+.4*Math.sin(T*7);
    poly([[z0,.016,-.6],[Z1,.016,-.6],[Z1,.016,.6],[z0,.016,.6]],'rgba(255,205,0,'+(.75+.25*pul)+')','#C98A00',1.5);
    var m0=z0+ZW()*.36,m1=z0+ZW()*.64;poly([[m0,.018,-.6],[m1,.018,-.6],[m1,.018,.6],[m0,.018,.6]],'rgba(255,255,255,.55)');
    [[z0,-.6,Z1,-.57],[z0,.57,Z1,.6],[z0-.03,-.6,z0,.6],[Z1,-.6,Z1+.03,.6]].forEach(function(b){poly([[b[0],.02,b[1]],[b[2],.02,b[1]],[b[2],.02,b[3]],[b[0],.02,b[3]]],'#FFFFFF')});
    for(var ch=1;ch<=3;ch++){var cxp=z0-.35*ch,al=.35+.2*Math.sin(T*8-ch);poly([[cxp-.12,.017,-.35],[cxp+.06,.017,0],[cxp-.12,.017,.35],[cxp-.04,.017,.35],[cxp+.14,.017,0],[cxp-.04,.017,-.35]],'rgba(255,214,0,'+Math.max(.15,al)+')')}
    floorText(z0-2.75,z0-1.2,-.5,.5,function(W2,H2){cx.textAlign='center';cx.textBaseline='middle';cx.fillStyle='rgba(255,255,255,.92)';cx.font='900 '+(H2*.5)+'px Arial,sans-serif';cx.fillText('HIER',W2*.36,H2*.52);cx.font='800 '+(H2*.26)+'px Arial,sans-serif';cx.fillText('TIPPEN',W2*.8,H2*.55)});
  }
  /* Minitramp: Gestell und Netz weiss */
  function tramp(){var W1='#F4F6F8',BL2='#1E5BC6';
    /* Bodenrahmen (stabil) */
    tube([-.05,.03,-.62],[1.02,.03,-.62],'#E6EAEF',.07);tube([-.05,.03,.62],[1.02,.03,.62],'#E6EAEF',.07);tube([-.05,.03,-.62],[-.05,.03,.62],'#E6EAEF',.07);tube([1.02,.03,-.62],[1.02,.03,.62],'#E6EAEF',.07);
    [[.06,-.6],[.06,.6],[.94,-.6],[.94,.6]].forEach(function(q){tube([q[0],.03,q[1]],[q[0],trTop(q[0])-.03,q[1]*.97],W1,.08);box(q[0]-.1,q[0]+.1,0,.03,q[1]-.06,q[1]+.06,'#7D8794')});
    tube([.94,.05,-.6],[.06,trTop(.06)*.7,-.6],'#DDE2E8',.05);tube([.94,.05,.6],[.06,trTop(.06)*.7,.6],'#DDE2E8',.05);
    /* Rahmen mit blauem Polsterrand */
    poly([[-.03,TR0-.035,-.64],[1.03,TR1-.035,-.64],[1.03,TR1-.035,.64],[-.03,TR0-.035,.64]],'#C9D0D8');
    poly([[-.03,TR0,-.64],[1.03,TR1,-.64],[1.03,TR1,.64],[-.03,TR0,.64]],BL2,'#123E8C',1.5);
    poly([[-.03,TR0-.035,-.64],[1.03,TR1-.035,-.64],[1.03,TR1,-.64],[-.03,TR0,-.64]],'#174AA6');
    poly([[-.03,TR0-.035,-.64],[-.03,TR0-.035,.64],[-.03,TR0,.64],[-.03,TR0,-.64]],'#1A52B6');
    /* weisses Netz */
    var b=bed*.16;poly([[.1,TR0+.012,-.5],[.9,TR1-.008,-.5],[.9,TR1-.008,.5],[.1,TR0+.012,.5]],'#FFFFFF','#C7CDD5',1);
    for(var k=0;k<=10;k++){var xx=.1+k*.08;line3([xx,trTop(xx)+.005-(k>2&&k<8?b*.5:0),-.5],[xx,trTop(xx)+.005-(k>2&&k<8?b*.5:0),.5],'rgba(150,160,175,.45)',.006)}
    for(k=0;k<=8;k++){var zz=-.5+k*.125;line3([.1,TR0+.016,zz],[.9,TR1-.004,zz],'rgba(150,160,175,.45)',.006)}
    if(b>0){var c=pr([.5,trTop(.5)-b,0]);cx.fillStyle='rgba(90,100,120,.25)';cx.beginPath();cx.ellipse(c[0],c[1],FOC*.3/c[2],FOC*.12/c[2],0,0,7);cx.fill()}
    var c2=pr([.5,trTop(.5)+.006,0]);cx.strokeStyle='rgba(30,91,198,.6)';cx.lineWidth=2;cx.beginPath();cx.ellipse(c2[0],c2[1],FOC*.12/c2[2],FOC*.05/c2[2],0,0,7);cx.stroke();
  }
  /* Bock: breiter, Leder */
  function bock(){var y0=BH-.28;
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(q){tube([BX+q[0]*(BL-.12),y0+.02,q[1]*(BW-.1)],[BX+q[0]*(BL+.02),0,q[1]*(BW+.12)],'#C9CED6',.045);box(BX+q[0]*(BL+.02)-.06,BX+q[0]*(BL+.02)+.06,0,.03,q[1]*(BW+.12)-.05,q[1]*(BW+.12)+.05,'#37474F')});
    box(BX-.09,BX+.09,.45,y0,-.09,.09,'#8E99A8');
    box(BX-BL,BX+BL,y0,BH,-BW,BW,'#7A4A28','#9C6236');
    line3([BX-BL+.04,BH+.003,-BW+.04],[BX+BL-.04,BH+.003,-BW+.04],'rgba(255,230,200,.45)',.008);line3([BX-BL+.04,BH+.003,BW-.04],[BX+BL-.04,BH+.003,BW-.04],'rgba(255,230,200,.35)',.008);
    var g=pr([BX,BH+.004,0]);cx.fillStyle='rgba(255,255,255,.12)';cx.beginPath();cx.ellipse(g[0]-FOC*.08/g[2],g[1],FOC*.2/g[2],FOC*.04/g[2],0,0,7);cx.fill()}
  /* Matte: oben rot, Seiten beige */
  function mat(){var t=MH-squash*.12;box(M0,M1,0,t,-1.25,1.25,'#E8D5B0','#D32F2F','#E3CFA6');
    line3([M0+.02,t,-1.25],[M1-.02,t,-1.25],'#9E1C1C',.02);
    [M0+.6,M0+1.5,M0+2.4].forEach(function(hx){line3([hx,t*.55,-1.26],[hx+.35,t*.55,-1.26],'#7A6A4F',.025)});
    var c=pr([LANDX(),t+.002,0]);cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=2;cx.beginPath();cx.ellipse(c[0],c[1],FOC*.35/c[2],FOC*.12/c[2],0,0,7);cx.stroke()}
  function LANDX(){return 5.25}
  /* ---------- Turner: Posen (Winkel) ---------- */
  function P0(){return {to:0,hL:0,kL:0,hR:0,kR:0,aL:0,eL:0,aR:0,eR:0}}
  var POSE={hurdle:{to:.12,hL:.45,kL:.7,hR:.2,kR:.5,aL:2.4,eL:.2,aR:2.4,eR:.2},squat:{to:.42,hL:1.05,kL:1.7,hR:1.05,kR:1.7,aL:-.9,eL:.15,aR:-.9,eR:.15},
    push:{to:.02,hL:0,kL:0,hR:0,kR:0,aL:3.0,eL:0,aR:3.0,eR:0},tuck:{to:.72,hL:2.55,kL:2.75,hR:2.45,kR:2.7,aL:1.75,eL:1.15,aR:1.6,eR:1.15},
    open:{to:.05,hL:.3,kL:.15,hR:.3,kR:.15,aL:2.5,eL:0,aR:2.5,eR:0},land:{to:.6,hL:1.2,kL:1.85,hR:1.2,kR:1.85,aL:1.8,eL:0,aR:1.8,eR:0},
    stand:{to:0,hL:0,kL:0,hR:0,kR:0,aL:2.6,eL:0,aR:2.6,eR:0},stumble:{to:.45,hL:.9,kL:.6,hR:-.4,kR:.9,aL:2.0,eL:.3,aR:3.3,eR:.3}};
  function run(ph2,lean){var c1=Math.cos(ph2),c2=Math.cos(ph2+Math.PI);return {to:.2+lean,hL:.8*Math.sin(ph2),kL:.25+1.2*Math.max(0,c1),hR:.8*Math.sin(ph2+Math.PI),kR:.25+1.2*Math.max(0,c2),aL:-.55*Math.sin(ph2)-.1,eL:1.05,aR:-.55*Math.sin(ph2+Math.PI)-.1,eR:1.05}}
  function mix(a,b,k){var o={};for(var q in a)o[q]=a[q]+(b[q]-a[q])*k;return o}
  var CL=[0,.15];
  /* lokale Gelenke (Hüfte = 0,0) */
  function joints(p){function d(a){return [Math.sin(a),-Math.cos(a)]}
    var sh=[Math.sin(p.to)*.5,Math.cos(p.to)*.5],hd=[Math.sin(p.to)*.74,Math.cos(p.to)*.74],J={hip:[0,0],sh:sh,head:hd};
    var L=function(b,a1,l1,a2,l2){var u=d(a1),k=[b[0]+u[0]*l1,b[1]+u[1]*l1],v2=d(a2),e=[k[0]+v2[0]*l2,k[1]+v2[1]*l2];return [k,e]};
    var x=L([0,0],p.hL,.45,p.hL-p.kL,.45);J.kL=x[0];J.fL=x[1];x=L([0,0],p.hR,.45,p.hR-p.kR,.45);J.kR=x[0];J.fR=x[1];
    x=L(sh,p.aL+p.to,.29,p.aL+p.to+p.eL,.27);J.eL=x[0];J.hL=x[1];x=L(sh,p.aR+p.to,.29,p.aR+p.to+p.eR,.27);J.eR=x[0];J.hR=x[1];return J}
  function toWorld(Jl,C,R){var cr=Math.cos(R),sr=Math.sin(R),o={};for(var k in Jl){var u=Jl[k][0]-CL[0],vv=Jl[k][1]-CL[1];o[k]=[C[0]+u*cr+vv*sr,C[1]-u*sr+vv*cr]}return o}
  function minFoot(Jl,R){var J=toWorld(Jl,CL,R||0);return Math.min(J.fL[1],J.fR[1],J.kL[1]+.02,J.kR[1]+.02)}
  /* Zeichnen eines Körpers aus Weltpunkten */
  function body(J){
    /* Turnerin im Team-Turnanzug: metallic blau, lange Ärmel, unten schwarz mit weissen Flammen, Silberrand */
    var z={L:-.07,R:.07};function P(k,zz){return [J[k][0],J[k][1],zz]}
    var up=[J.head[0]-J.hip[0],J.head[1]-J.hip[1]],ul=Math.hypot(up[0],up[1])||1;up=[up[0]/ul,up[1]/ul];var fw=[up[1],-up[0]];
    if(!MIR){var g0=pr([(J.hip[0]+J.sh[0])/2,0.004,0]),hh=Math.max(0,Math.min(J.fL[1],J.fR[1],J.hip[1]));cx.fillStyle='rgba(50,35,20,'+Math.max(.06,.28-hh*.07)+')';cx.beginPath();cx.ellipse(g0[0],g0[1],FOC*(.34+hh*.05)/g0[2],FOC*.08/g0[2],0,0,7);cx.fill()}
    function W2(k,du,dv,zz){return pr([J[k][0]+fw[0]*du+up[0]*dv,J[k][1]+fw[1]*du+up[1]*dv,zz])}
    function cap(a,b,wa,wb,col,zz,hl){var p=pr(P(a,zz)),q=pr(P(b,zz)),dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,ra=Math.max(1.2,FOC*wa/2/p[2]),rb=Math.max(1,FOC*wb/2/q[2]);
      cx.fillStyle=col;cx.beginPath();cx.moveTo(p[0]+nx*ra,p[1]+ny*ra);cx.lineTo(q[0]+nx*rb,q[1]+ny*rb);cx.arc(q[0],q[1],rb,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI,dx*ny-dy*nx>0);cx.lineTo(p[0]-nx*ra,p[1]-ny*ra);cx.arc(p[0],p[1],ra,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI,dx*ny-dy*nx>0);cx.closePath();cx.fill();
      cx.strokeStyle=hl||'rgba(255,255,255,.28)';cx.lineWidth=Math.max(.8,ra*.45);cx.lineCap='round';cx.beginPath();cx.moveTo(p[0]+nx*ra*.45-1,p[1]+ny*ra*.45-1);cx.lineTo(q[0]+nx*rb*.45-1,q[1]+ny*rb*.45-1);cx.stroke()}
    function foot(k,f,zz,col){var a=pr(P(k,zz)),b=pr(P(f,zz)),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,L=FOC*.12/b[2];var tx=b[0]+dx/l*L*.75,ty=b[1]+dy/l*L*.75;cx.strokeStyle=col;cx.lineCap='round';cx.lineWidth=Math.max(1.5,FOC*.06/b[2]);cx.beginPath();cx.moveTo(b[0],b[1]);cx.lineTo(tx,ty);cx.stroke()}
    function arm(sd,zz,dark){var B=dark?'#1449A8':'#1E63D6',hl=dark?'rgba(160,200,255,.3)':'rgba(190,225,255,.55)';cap('sh','e'+sd,.074,.058,B,zz,hl);
      var e=J['e'+sd],hh=J['h'+sd],c1=[e[0]+(hh[0]-e[0])*.72,e[1]+(hh[1]-e[1])*.72];J['_c'+sd]=c1;cap('e'+sd,'_c'+sd,.058,.05,B,zz,hl);
      var c2=[e[0]+(hh[0]-e[0])*.9,e[1]+(hh[1]-e[1])*.9];J['_w'+sd]=c2;cap('_c'+sd,'_w'+sd,.054,.05,dark?'#D9DEE6':'#F7F9FC',zz,'rgba(255,255,255,.6)');
      var hd=pr(P('h'+sd,zz));cx.fillStyle=dark?SK2:SK;cx.beginPath();cx.arc(hd[0],hd[1],Math.max(1.2,FOC*.032/hd[2]),0,7);cx.fill()}
    var SK='#F1C3A1',SK2='#DDA683';
    /* hintere Seite */
    cap('hip','kR',.135,.09,SK2,z.R);cap('kR','fR',.085,.06,SK2,z.R);foot('kR','fR',z.R,SK2);arm('R',z.R,1);
    /* Rumpf */
    var pts=[[0,.135],[.12,.105],[.32,.1],[.5,.115]],L1=[],L2=[];pts.forEach(function(q){var t=q[0]/.5,c=[J.hip[0]+(J.sh[0]-J.hip[0])*t,J.hip[1]+(J.sh[1]-J.hip[1])*t],bf=q[0]>.25&&q[0]<.45?.025:0;L1.push(pr([c[0]+fw[0]*(q[1]+bf),c[1]+fw[1]*(q[1]+bf),0]));L2.push(pr([c[0]-fw[0]*q[1],c[1]-fw[1]*q[1],0]))});
    var s1=pr(P('sh',0)),rs=FOC*.11/s1[2];
    function torso(){cx.beginPath();cx.moveTo(L1[0][0],L1[0][1]);for(var i=1;i<4;i++)cx.lineTo(L1[i][0],L1[i][1]);cx.arc(s1[0],s1[1],rs,0,7);for(i=3;i>=0;i--)cx.lineTo(L2[i][0],L2[i][1]);cx.closePath()}
    torso();var mg=cx.createLinearGradient(L2[2][0],L2[2][1],L1[2][0],L1[2][1]);mg.addColorStop(0,'#0E3E9C');mg.addColorStop(.45,'#2C7BF0');mg.addColorStop(.6,'#9CC8FF');mg.addColorStop(.75,'#2468D8');mg.addColorStop(1,'#123F96');cx.fillStyle=mg;cx.fill();
    cx.save();torso();cx.clip();
    /* unterer schwarzer Teil mit weissen Flammen-Spitzen */
    var bA=W2('hip',.16,.2,0),bB=W2('hip',-.16,.3,0),bC=W2('hip',-.2,-.2,0),bD=W2('hip',.2,-.2,0);
    cx.fillStyle='#101114';cx.beginPath();cx.moveTo(bA[0],bA[1]);cx.lineTo(bB[0],bB[1]);cx.lineTo(bC[0],bC[1]);cx.lineTo(bD[0],bD[1]);cx.closePath();cx.fill();
    cx.fillStyle='#F4F6FA';for(var i=0;i<4;i++){var f0=i/4+.02,bx=W2('hip',.16-.32*f0,.2+.1*f0,0),bx2=W2('hip',.16-.32*(f0+.2),.2+.1*(f0+.2),0),tp=W2('hip',.12-.32*(f0+.06),-.02+.1*f0,0);cx.beginPath();cx.moveTo(bx[0],bx[1]);cx.quadraticCurveTo(tp[0],tp[1]-2,tp[0]+1,tp[1]+1);cx.lineTo(bx2[0],bx2[1]);cx.closePath();cx.fill()}
    cx.strokeStyle='#C9CFD8';cx.lineWidth=Math.max(1.2,FOC*.018/bA[2]);cx.beginPath();cx.moveTo(bA[0],bA[1]);cx.lineTo(bB[0],bB[1]);cx.stroke();
    cx.fillStyle='#fff';for(i=0;i<6;i++){var gq=W2('hip',.15-.3*i/5,.21+.1*i/5,0);cx.beginPath();cx.arc(gq[0],gq[1],Math.max(.7,FOC*.007/gq[2]),0,7);cx.fill()}
    cx.restore();
    /* Beinausschnitt */
    var hc=W2('hip',.06,0,-.08),hb=W2('hip',-.1,.1,-.08),hk=W2('hip',.02,-.07,-.08);cx.fillStyle='#101114';cx.beginPath();cx.moveTo(hc[0],hc[1]);cx.lineTo(hb[0],hb[1]);cx.lineTo(hk[0],hk[1]);cx.closePath();cx.fill();
    /* vordere Seite */
    cap('hip','kL',.14,.092,SK,z.L);cap('kL','fL',.088,.062,SK,z.L);foot('kL','fL',z.L,SK);
    /* Hals + Kopf */
    var nk=W2('sh',0,.1,0),H=pr(P('head',0)),r=FOC*.11/H[2];cx.strokeStyle=SK2;cx.lineWidth=Math.max(2,FOC*.07/nk[2]);cx.beginPath();cx.moveTo(s1[0],s1[1]);cx.lineTo(nk[0],nk[1]);cx.stroke();
    var hg=cx.createRadialGradient(H[0]-r*.3,H[1]-r*.35,r*.15,H[0],H[1],r);hg.addColorStop(0,'#FFE1CC');hg.addColorStop(1,'#E1A580');cx.fillStyle=hg;cx.beginPath();cx.arc(H[0],H[1],r,0,7);cx.fill();
    var fs=W2('head',.1,0,0),fl=Math.hypot(fs[0]-H[0],fs[1]-H[1])||1,fdx=(fs[0]-H[0])/fl,fdy=(fs[1]-H[1])/fl,ua=Math.atan2(fdy,fdx);
    /* Haare: straff nach hinten, Flechtzopf */
    cx.fillStyle='#8A5A34';cx.beginPath();cx.arc(H[0],H[1],r*1.06,ua-Math.PI*1.12,ua-Math.PI*.16,false);cx.lineTo(H[0]-fdx*r*.1,H[1]-fdy*r*.1);cx.closePath();cx.fill();
    cx.strokeStyle='rgba(60,35,18,.55)';cx.lineWidth=Math.max(.8,r*.08);for(i=0;i<3;i++){cx.beginPath();cx.arc(H[0],H[1],r*(.55+i*.17),ua-Math.PI*1.05,ua-Math.PI*.35);cx.stroke()}
    for(i=0;i<5;i++){var bq=W2('head',-.12-i*.025,.03-i*.055,0),br2=r*(.28-i*.03);cx.fillStyle=i%2?'#7A4E2C':'#93613A';cx.beginPath();cx.ellipse(bq[0],bq[1],br2,br2*.75,ua,0,7);cx.fill()}
    var sc=W2('head',-.23,-.22,0);cx.fillStyle='#1E63D6';cx.beginPath();cx.arc(sc[0],sc[1],r*.14,0,7);cx.fill();
    /* Gesicht */
    var ey=W2('head',.07,.02,-.05),ns=W2('head',.115,-.01,-.05),mo=W2('head',.08,-.05,-.05);cx.fillStyle='#2B1B12';cx.beginPath();cx.arc(ey[0],ey[1],Math.max(1,r*.11),0,7);cx.fill();
    cx.fillStyle='#D99271';cx.beginPath();cx.arc(ns[0],ns[1],Math.max(.8,r*.09),0,7);cx.fill();cx.strokeStyle='#B5544A';cx.lineWidth=Math.max(.8,r*.07);cx.beginPath();cx.arc(mo[0],mo[1],r*.12,0,Math.PI*.8);cx.stroke();
    cx.fillStyle='rgba(255,120,120,.35)';var ck=W2('head',.05,-.03,-.05);cx.beginPath();cx.arc(ck[0],ck[1],r*.16,0,7);cx.fill();
    arm('L',z.L,0);
  }
  function drawMan(J){if(J.hip[1]<1.7){MIR=true;cx.save();cx.globalAlpha=.07;body(J);cx.restore();MIR=false}body(J)}
  /* ---------- Flug vorausberechnen: Wurfparabel + Drehimpuls (I offen 1.0, Hocke 0.36) ---------- */
  function planFlight(perfect){
    var Jp=joints(POSE.push),Jl=joints(POSE.land),c0=[.5,trTop(.5)-minFoot(Jp)],LX=perfect?LANDX():LANDX()+.55;
    var cyL=MH-minFoot(Jl,0),apex=3.6,vy=Math.sqrt(2*G*(apex-c0[1])),tu=vy/G,td=Math.sqrt(2*(apex-cyL)/G),Tt=tu+td,vx=(LX-c0[0])/Tt;
    var target=perfect?4*Math.PI:4*Math.PI-.55;
    function sim(L0,rec){var r=0,k=0,dt=1/240,t=0,A=[];while(t<Tt){var want=t<.1?0:(r<target-1.05?1:0);k+=(want-k)*Math.min(1,dt*16);var I=1-.68*k;r+=L0/I*dt;t+=dt;if(rec)A.push([r,k])}return rec?A:r}
    var lo=.5,hi=20;for(var it=0;it<40;it++){var m=(lo+hi)/2;if(sim(m)<target)lo=m;else hi=m}
    return {c0:c0,vx:vx,vy:vy,T:Tt,tab:sim((lo+hi)/2,1),dt:1/240,cyL:cyL,LX:LX}}
  /* ---------- Ragdoll (Verlet) für Stürze ---------- */
  var RK=['hip','sh','head','kL','fL','kR','fR','eL','hL','eR','hR'],RR={head:.12,hip:.1,sh:.1};
  function startRag(J,v0,kick){var dt=1/120;RD={p:{},sticks:[],t:0,acc:0};RK.forEach(function(k){var vv=v0.slice();if(kick&&kick[k]){vv[0]+=kick[k][0];vv[1]+=kick[k][1]}RD.p[k]={x:J[k][0],y:J[k][1],ox:J[k][0]-vv[0]*dt,oy:J[k][1]-vv[1]*dt,r:RR[k]||.05}});
    [['hip','sh'],['sh','head'],['hip','head'],['hip','kL'],['kL','fL'],['hip','kR'],['kR','fR'],['sh','eL'],['eL','hL'],['sh','eR'],['eR','hR'],['kL','kR',1]].forEach(function(s2){var a=RD.p[s2[0]],b=RD.p[s2[1]];RD.sticks.push([a,b,Math.hypot(a.x-b.x,a.y-b.y),s2[2]])})}
  function solid(p,hit){var vx=p.x-p.ox,vy=p.y-p.oy,top=null,bounce=.22,fr=.5;
    if(p.x>-.02&&p.x<1.02){var tt=trTop(Math.max(0,Math.min(1,p.x)));if(p.y<tt+p.r){if(p.ox<=-.02&&p.y<tt-.03){p.x=-.02-.001;p.ox=p.x+vx*.35;return}top=tt;bounce=.45;fr=.7}}
    if(p.x>BX-BL&&p.x<BX+BL&&p.y<BH+p.r&&p.y>BH-.3){if(p.oy<BH-.02){var sx=p.ox<BX?BX-BL-.001:BX+BL+.001;p.x=sx;p.ox=sx+vx*.3;if(hit)hit(p,Math.abs(vx)*120,0);return}top=BH;bounce=.2;fr=.6}
    if(p.x>M0&&p.x<M1&&p.y<MH+p.r){top=MH;bounce=.1;fr=.4}
    if(top===null&&p.y<p.r)top=0;
    if(top!==null&&p.y<top+p.r){var sp=-vy*120;p.y=top+p.r;p.oy=p.y+vy*bounce;p.ox=p.x-vx*fr;if(hit)hit(p,sp,top)}}
  function stepRag(dt){var h2=1/120;RD.acc+=dt;
    while(RD.acc>=h2){RD.acc-=h2;RK.forEach(function(k){var p=RD.p[k],vx=(p.x-p.ox)*.999,vy=(p.y-p.oy)*.999;p.ox=p.x;p.oy=p.y;p.x+=vx;p.y+=vy-G*h2*h2});
      for(var it=0;it<6;it++){RD.sticks.forEach(function(s2){var a=s2[0],b=s2[1],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1e-4;if(s2[3]&&d>s2[2]*.4&&d<s2[2]*1.6)return;var df=(d-s2[2])/d*.5;a.x+=dx*df;a.y+=dy*df;b.x-=dx*df;b.y-=dy*df});
        RK.forEach(function(k){solid(RD.p[k],function(p,sp){if(sp>3.4&&(k==='head'||k==='hip'||k==='sh'||k==='kL'||k==='kR')&&!crackP){crack(p)}else if(sp>2.2){var q=pr([p.x,p.y,0]);burst(P,q[0],q[1],4,['#E7D3B4','#fff'],3)}})})}}
    RD.t+=dt}
  function ragJ(){var o={};RK.forEach(function(k){o[k]=[RD.p[k].x,RD.p[k].y]});return o}
  function crack(p){crackP=[p.x,p.y];crackT=1.2;shake=18;var q=pr([p.x,p.y,0]);burst(P,q[0],q[1],34,['#E7D3B4','#FFF','#BDBDBD','#FFECB3'],9);txt('KNACKS!','#FFEB3B')}
  function txt(m,c){msg=m;msgC=c;msgT=1.5}
  function reset(){ph='run';pt=0;com=[-12.2,1];rot=0;res=null;bed=0;squash=0;RD=null;crackP=null;dizzy=0;camX=-11.6;vel=[0,0];hurdle=null}
  function stand(Jl,cxp,floorY,R){return [cxp,floorY-minFoot(Jl,R||0)]}
  function fail(why,J,v0,kick){ph='crash';pt=0;txt(why,'#FF8A80');lives--;shake=8;startRag(J,v0,kick)}
  var unb=bindTap(cv,function(){if(ph!=='run')return;var z0=Z0();tapX=com[0];
    if(com[0]<z0)res='early';else if(com[0]<=Z1){var c=(com[0]-z0)/(Z1-z0);res=Math.abs(c-.5)<.14?'perfect':'good'}else return;
    var y0=com[1],Jh=joints(POSE.hurdle),tx=res==='early'?Math.min(tapX+1.0,-.3):.5,ty=res==='early'?-minFoot(Jh):trTop(.5)-minFoot(joints(POSE.squat)),Th=Math.max(.24,(tx-tapX)/v);
    hurdle={x0:tapX,y0:y0,tx:tx,vx:(tx-tapX)/Th,vy:((ty-y0)+.5*G*Th*Th)/Th,T:Th};ph='hurdle';pt=0;var q=pr([tapX,.02,0]);burst(P,q[0],q[1],12,['#fff','#FFF59D'],4)});
  reset();cv.__vs=function(){return {gx:com[0],ph:ph,z0:Z0(),z1:Z1,s:s,lives:lives}};
  var L=loopRun(function(f){var dt=Math.min(.05,f/60);T+=dt;pt+=dt;shake=Math.max(0,shake-f*.5);crackT=Math.max(0,crackT-dt);var J=null;
    if(ph==='run'){var acc2=3.2;vel[0]=Math.min(v,vel[0]+acc2*dt);if(pt<.05)vel[0]=1.5;com[0]+=vel[0]*dt;
      var sf=vel[0]/1.75*Math.PI*2;acc=(acc||0)+sf*dt;pz=run(acc,(v-vel[0])*.05);var Jl=joints(pz);com[1]=-minFoot(Jl,0)+.0;J=toWorld(Jl,[com[0],com[1]+CL[1]],0);
      if(com[0]>Z1+.25&&!res){res='late'}
      if(res==='late'&&J.fL[0]>-.08||res==='late'&&J.fR[0]>-.08){fail('Zu spät!',J,[vel[0]*1.15,1.4],{fL:[-vel[0]*1.15,1.5],fR:[-vel[0]*1.15,1.5],kL:[-vel[0]*.5,1.6],kR:[-vel[0]*.5,1.6],head:[1.5,2.1],sh:[1.3,1.8],hip:[.5,1.3]})}}
    else if(ph==='hurdle'){var H=hurdle,tt=Math.min(pt,H.T),k=tt/H.T;com=[H.x0+H.vx*tt,H.y0+H.vy*tt-.5*G*tt*tt];pz=mix(pz||POSE.hurdle,res==='early'?POSE.hurdle:mix(POSE.hurdle,POSE.squat,Math.max(0,k*1.6-.6)),Math.min(1,k*3));
      J=toWorld(joints(pz),[com[0],com[1]+CL[1]],0);
      if(pt>=H.T){if(res==='early'){fail('Zu früh!',J,[H.vx*1.1,1.2],{fL:[-H.vx*1.3,0],fR:[-H.vx*1.3,0],kL:[-H.vx*.5,0],kR:[-H.vx*.5,0],head:[2.2,2.6],sh:[1.8,2.2],hL:[1.5,2],hR:[1.5,2]})}else{ph='bounce';pt=0}}}
    else if(ph==='bounce'){var D1=.13,D2=.15,k2;if(pt<D1){k2=pt/D1;bed=Math.sin(k2*Math.PI/2);pz=POSE.squat}else{k2=Math.min(1,(pt-D1)/D2);bed=Math.cos(k2*Math.PI/2);pz=mix(POSE.squat,POSE.push,k2*k2)}
      var Jb=joints(pz);com=stand(Jb,.5,trTop(.5)-bed*.16);J=toWorld(Jb,[com[0],com[1]+CL[1]],0);
      if(pt>=D1+D2){bed=0;FL=planFlight(res==='perfect');ph='fly';pt=0}}
    else if(ph==='fly'){var t2=Math.min(pt,FL.T),idx=Math.min(FL.tab.length-1,Math.floor(t2/FL.dt)),rk=FL.tab[idx];
      com=[FL.c0[0]+FL.vx*t2,FL.c0[1]+FL.vy*t2-.5*G*t2*t2];rot=rk[0];var kk=rk[1],late2=t2>FL.T-.22?(t2-(FL.T-.22))/.22:0;
      pz=t2<.1?mix(POSE.push,POSE.open,t2/.1):mix(mix(POSE.open,POSE.tuck,kk),POSE.land,late2*(1-kk));
      J=toWorld(joints(pz),[com[0],com[1]+CL[1]],rot);
      if(pt>=FL.T){ph='land';pt=0;squash=1;var pts2=res==='perfect'?2:1;s+=pts2;score(s);v=Math.min(9,v+.35);
        var q=pr([com[0],MH,0]);burst(P,q[0],q[1],res==='perfect'?36:16,['#FFD54A','#fff','#4C9BFF','#34A853','#E53935'],8);txt(res==='perfect'?'Doppelsalto! +2':'Gut! +1',res==='perfect'?'#FFE27A':'#B9F6CA')}}
    else if(ph==='land'){squash=Math.max(0,1-pt*3);var k4=Math.min(1,pt/.55);
      if(res==='perfect'){pz=mix(POSE.land,POSE.stand,Math.max(0,(pt-.25)/.5));if(pt>.75)pz=POSE.stand}
      else{pz=pt<.5?mix(POSE.land,POSE.stumble,k4):mix(POSE.stumble,POSE.stand,Math.min(1,(pt-.5)/.4));com[0]+=dt*1.2*Math.max(0,1-pt*1.4)}
      var Jg=joints(pz);com=stand(Jg,com[0],MH-squash*.12);J=toWorld(Jg,[com[0],com[1]+CL[1]],0);if(pt>1.5)reset()}
    else if(ph==='crash'){stepRag(dt);J=ragJ();if(pt>2.0)dizzy+=dt;if(pt>3.2){if(lives<=0){L.stop();unb();over();return}reset()}}
    /* Kamera */
    var fx=ph==='crash'&&J?J.hip[0]+.4:ph==='run'?com[0]+.9+Math.max(0,com[0]+4.5)*.22:com[0]+.5,fy=ph==='fly'?Math.max(0,com[1]-1.5)*.85:ph==='crash'&&J?Math.max(0,Math.max(J.hip[1],J.head[1])-1.5)*.7:0;
    if(ph==='land')fx=com[0]+.2;camX+=(Math.min(fx,4.4)-camX)*Math.min(1,dt*(ph==='run'?6:3));camY+=(fy-camY)*Math.min(1,dt*4);cam();
    hall();runway();
    var hz=J?pr([J.hip[0],Math.max(.3,J.hip[1]),0])[2]:9,items=[{z:pr([.5,.4,0])[2],d:tramp},{z:pr([BX,1,0])[2],d:bock},{z:pr([(M0+M1)/2,.2,-.6])[2],d:mat}];
    if(J)items.push({z:hz-(ph==='fly'||ph==='land'||ph==='bounce'||ph==='crash'?.9:.05),d:function(){drawMan(J)}});
    items.sort(function(a,b){return b.z-a.z}).forEach(function(it){it.d()});
    if(crackP&&crackT>0){var c=pr([crackP[0],crackP[1],-.2]),R2=FOC*(.25+.3*(1.2-crackT))/c[2];cx.save();cx.globalAlpha=Math.min(1,crackT*1.5);cx.strokeStyle='#FFEB3B';cx.lineWidth=3;for(var a=0;a<10;a++){var an=a/10*Math.PI*2;cx.beginPath();cx.moveTo(c[0]+Math.cos(an)*R2*.4,c[1]+Math.sin(an)*R2*.4);cx.lineTo(c[0]+Math.cos(an)*R2,c[1]+Math.sin(an)*R2);cx.stroke()}cx.restore()}
    if(dizzy>0&&J){var hd=pr([J.head[0],J.head[1]+.25,0]);for(var d2=0;d2<3;d2++){var an2=T*5+d2*2.1;cx.font=Math.floor(w*.05)+'px sans-serif';cx.textAlign='center';cx.fillText('⭐',hd[0]+Math.cos(an2)*w*.06,hd[1]+Math.sin(an2)*w*.02)}}
    if(ph==='run'&&s<2){cx.save();cx.font='bold '+Math.floor(w*.045)+'px sans-serif';cx.textAlign='center';cx.fillStyle='rgba(20,33,61,.8)';cx.fillText('Tippe im gelben Feld!',w/2,h*.94);cx.restore()}
    if(msgT>0){msgT-=dt;cx.save();cx.globalAlpha=Math.min(1,msgT*2);var fs=Math.floor(w*(msg==='KNACKS!'?.14:.09));cx.font='900 '+fs+'px sans-serif';cx.textAlign='center';cx.lineWidth=7;cx.strokeStyle='rgba(0,0,0,.5)';var my=h*.2,sc=msg==='KNACKS!'?1+Math.max(0,crackT-.9):1;cx.translate(w/2,my);cx.scale(sc,sc);cx.rotate(msg==='KNACKS!'?-.08:0);cx.strokeText(msg,0,0);cx.fillStyle=msgC;cx.fillText(msg,0,0);cx.restore()}
    stepP(cx,P,f);floatTxt(cx,F,f);cx.globalAlpha=1;cx.fillStyle='#000';hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}};

/* ---------- Minigames + Themen suchen (v5.35) ---------- */
(function(){
function best(){try{return JSON.parse(localStorage.getItem('es.gbest')||'{}')||{}}catch(e){return {}}}
function setBest(id,v){var b=best();if(!(b[id]>=v)){b[id]=v;try{localStorage.setItem('es.gbest',JSON.stringify(b))}catch(e){}return true}return false}
function dayGame(){return GAMES.filter(function(g){return g.id==='vault'})[0]||GAMES[GAMES.length-1]}
function vGames(){
  var b=best(),f=dayGame();
  var card=function(g){var r=b[g.id];return '<button class="gcc" data-act="gplay" data-id="'+esc(g.id)+'" aria-label="'+esc(g.n)+'"><span class="gcimg"><img src="img/g_'+esc(g.id)+'.jpg" alt="" loading="lazy" onerror="this.remove()"></span><span class="gcn">'+esc(g.n)+'</span><span class="gcr">'+(r!=null?'🏆 '+r:'&nbsp;')+'</span></button>'};
  return '<div class="stack gcp"><div class="gchead"><p class="eyebrow">Minigames</p><h1>Spiele</h1><p class="sub">Tippe ein Spiel und los geht\'s. Hier zählt nur dein Rekord.</p></div>'
   +'<button class="gcfeat2" data-act="gplay" data-id="'+esc(f.id)+'"><span class="gcf2i"><img src="img/g_'+esc(f.id)+'.jpg" alt="" onerror="this.remove()"></span><span class="gcf2t"><small>Neustes Spiel</small><b>'+esc(f.n)+'</b><span>'+esc(String(f.how).split(/([.!?])\s/)[0].replace(/[.!?]$/,'')+(/[.!?]\s/.test(f.how)?String(f.how).match(/[.!?]/)[0]:''))+'</span></span><i class="gcf2b">Spielen</i></button><p class="gcsec">Alle Spiele</p>'+'<div class="gcgrid">'+GAMES.map(card).join('')+'</div></div>';
}
VIEWS.games=vGames;
ACT.games=function(){go({view:'games'},{view:'home'})};
ACT.gplay=function(b){var g=GAMES.filter(function(x){return x.id===b.dataset.id})[0];if(!g)return;rwOpen('🎮 Minigames · freies Spiel',g,true,true)};
window.gcBack=function(){if(nav.view==='games'){var y=window.scrollY;render();window.scrollTo(0,y)}};
window.gcEnd=function(m,s){var me=RW,g=me.g,nb=setBest(g.id,s),bv=best()[g.id];
  if(m){m.innerHTML='<b class="'+(nb&&s>0?'rwwin':'')+'">'+(nb&&s>0?'🏆 Neuer Rekord: '+s+'!':s+' Punkte')+'</b><br><small>Rekord: '+bv+' · gleich zurück zu den Minigames</small><div class="gcagain"><button class="btn pri" id="gcre">🔁 Nochmal</button><button class="btn" id="gcbk">Zu den Minigames</button></div>';
    var re=m.querySelector('#gcre'),bk=m.querySelector('#gcbk');
    re.onclick=function(){clearTimeout(tm);closeReward();rwOpen('🎮 Minigames · freies Spiel',g,true,true)};
    bk.onclick=function(){clearTimeout(tm);closeReward();gcBack()};}
  var tm=setTimeout(function(){if(RW===me){closeReward();gcBack()}},5000);
};

/* Themen suchen */
function nz(s){return String(s||'').toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9+ ]+/g,' ').replace(/\s+/g,' ').trim()}
var SKW={mathe:'mathe mathematik rechnen',deu:'deutsch',franz:'franzosisch franz francais vocabulaire vocab wortschatz',engl:'englisch english vocabulary vocab wortschatz'};
function kidOf(t){return C.children.filter(function(c){return c.id===t.child})[0]||{}}
function hayOf(t){var k=kidOf(t),g=k.grade||'',sb=C.subjects.filter(function(x){return x.id===t.subject})[0]||{};return ' '+nz([t.title,t.chapter,t.src||'',sb.name,SKW[t.subject]||'',g+' klasse kl'+g,g?g+'klasse':''].join(' '))+' '}
function gcol(k){var g=k.grade||1;return g<=6?CCOL.p[(g-1)%6]:CCOL.o[(g-7)%6]}
var SN={mathe:'Mathe',deu:'Deutsch',franz:'Französisch',engl:'Englisch'};
function vSearch(){
  var f=nav.gsf||'',kids=C.children.slice().sort(function(a,b){return (a.grade||0)-(b.grade||0)}),rows='';
  kids.forEach(function(k){var ts=C.topics.filter(function(t){return t.child===k.id});if(!ts.length)return;
    rows+='<div class="gsg" data-g="'+esc(k.id)+'"><p class="gsgh"><span class="gsk" style="--cc:'+gcol(k)+'">'+esc(String(k.grade||''))+'</span>'+esc(label(k))+'</p>';
    ts.forEach(function(t){var L=level(k.id,[t]),w=Math.round(L.pct*100),sb=C.subjects.filter(function(x){return x.id===t.subject})[0]||{id:t.subject,name:t.subject};
      rows+='<button class="gsr" data-act="gsopen" data-id="'+esc(t.id)+'" data-s="'+esc(t.subject)+'" data-h="'+esc(hayOf(t))+'"><span class="gss ci-'+esc(t.subject)+'">'+sicon(sb,16)+'</span><span class="gsm"><b>'+esc(t.title)+'</b><small>'+esc(label(k))+' · '+esc(SN[t.subject]||sb.name)+(t.chapter&&t.chapter!==t.title?' · '+esc(t.chapter):'')+'</small></span><span class="gsp'+(w?'':' z')+'">'+w+'%</span></button>'});
    rows+='</div>'});
  var chips=[['','Alle']].concat(C.subjects.map(function(s){return [s.id,SN[s.id]||s.name]})).map(function(c){return '<button class="gsc'+(f===c[0]?' on':'')+(c[0]?' ci-'+c[0]:'')+'" data-act="gsf" data-id="'+c[0]+'">'+esc(c[1])+'</button>'}).join('');
  setTimeout(gsFilter,0);
  return '<div class="stack gsp2"><div><p class="eyebrow">Alle Klassen · alle Fächer</p><h1>Themen suchen</h1></div><div class="gstop"><label class="gsbar"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg><input id="gsq" type="search" placeholder="Suche, z. B. 5 brüche" value="'+esc(nav.q||'')+'" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"></label><div class="gschips">'+chips+'</div></div><p class="gscount" id="gscount"></p><div class="gslist" id="gslist">'+rows+'</div><p class="gsno" id="gsno" hidden>Nichts gefunden. Versuche ein anderes Wort.</p></div>';
}
function gsFilter(){
  var q=document.getElementById('gsq');if(!q)return;nav.q=q.value;
  var w=nz(q.value).split(' ').filter(Boolean),f=nav.gsf||'',n=0;
  document.querySelectorAll('.gsg').forEach(function(g){var vis=0;g.querySelectorAll('.gsr').forEach(function(r){var h=r.getAttribute('data-h'),ok=(!f||r.getAttribute('data-s')===f)&&w.every(function(x){return /^\d+$/.test(x)?h.indexOf(' '+x+' ')>=0:h.indexOf(x)>=0});r.hidden=!ok;if(ok)vis++});g.hidden=!vis;n+=vis});
  var c=document.getElementById('gscount');if(c)c.textContent=n+(n===1?' Thema':' Themen');
  var no=document.getElementById('gsno');if(no)no.hidden=n>0;
}
VIEWS.search=vSearch;
ACT.search=function(){go({view:'search',q:'',gsf:''},{view:'home'});setTimeout(function(){var q=document.getElementById('gsq');if(q&&window.innerWidth>700)q.focus()},60)};
ACT.gsf=function(b){nav.gsf=b.dataset.id||'';document.querySelectorAll('.gsc').forEach(function(c){c.classList.toggle('on',(c.dataset.id||'')===nav.gsf)});gsFilter()};
ACT.gsopen=function(b){var id=b.dataset.id,t=topicById(id);if(!t)return;var o={};o[id]=true;var ch={};ch[t.subject+'|'+t.chapter]=true;
  go({view:'subject',child:t.child,subject:t.subject,topen:o,chopen:ch});
  var el=document.querySelector('.tctog[data-id="'+id+'"]');if(el){var c=el.closest('.card');c.scrollIntoView({block:'center'});c.classList.add('tsflash');setTimeout(function(){c.classList.remove('tsflash')},1600)}};
document.addEventListener('input',function(e){if(e.target&&e.target.id==='gsq')gsFilter()});
})();
