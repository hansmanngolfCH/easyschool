/* ---------------- Ski-Lawine & Feuerwehr (Varianten der Flucht-Spiele) ---------------- */
GAMES.push(
 {id:'ski',n:'Lawinen-Flucht',e:'⛷️',g:T3(14),time:60,d:'ski',gs:'tap',lb:'Tippen',ctl:'',how:'Spring über Schneekugeln und Absperrungen. Die Lawine kommt!'}
);
(function(){var od=demoHTML;demoHTML=function(g){
  if(g.d==='ski')return '<div class="dm dm-ski"><span class="dwv"></span><span class="dgy">⛷️</span><span class="dob2">⚪</span><span class="dfin">👆</span></div>';
  return od(g)}})();
function runLike(T,cv,cx,w,h,score,over){
  var gy=h*(T.gy||.8),P0=h*.1,px=w*.34,y=0,vy=0,s=0,lives=3,inv=0,off=0,fr=0,P=[],F=[],items=[],next=w*.55,GG=RW.g.g,i,wx=-w*.02,dying=false,kd=0,nsp=0,fly=!!T.fly,ceil=h*.1;
  var unb=bindTap(cv,function(){if(dying)return;if(fly){vy=h*.0125;burst(P,px-P0*.3,gy-y-P0*.5,6,T.jet,3)}else if(y<=1){vy=h*.0285;burst(P,px,gy,10,T.dust,3)}});
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
    cx.drawImage(BG,0,0,w,h);T.layer(cx,w,h,gy,off,fr);
    items.forEach(function(it){T.obj(cx,it,gy,h,w,fr)});
    T.hero(cx,px,gy-y,P0,fr,y,vy,inv>0&&Math.floor(fr/5)%2&&false);
    T.wall(cx,wx,w,h,gy,fr);
    if(inv>0){cx.strokeStyle='rgba(255,255,255,'+(.2+.2*Math.sin(fr*.5))+')';cx.lineWidth=3;cx.beginPath();cx.arc(px,gy-y-P0*.55,P0*.8,0,7);cx.stroke()}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}}
/* ----- Ski ----- */
GAMEFN.ski=function(cv,cx,w,h,score,over){return runLike({gy:.8,sp:.0072,ramp:1,gap:function(s){return 1.05-.55*Math.min(1,s/14)},G:.0017,ouch:'AUA!',dust:['#fff','#CFE8FF'],jet:['#fff'],pass:['#fff','#B3E5FC','#FFD54F'],hitc:['#fff','#90CAF9','#CFD8DC'],
  spawn:function(h,w,s,n){var dd=Math.min(1,s/14),sz=h*.1;if(n<1)return {k:'ball',wd:sz*.62,ht:sz*.62,mv:0};if(Math.random()<.5)return {k:'ball',wd:sz*(.65+dd*.6+Math.random()*.25),ht:sz*(.65+dd*.7+Math.random()*.25),mv:.0006+dd*.0034};return {k:'fence',wd:sz*(1.1+dd*.6),ht:sz*(.6+dd*.3)}},
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
    return put(acc.id,out,pr).then(function(){sync.state='synced';updateSync()})
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
