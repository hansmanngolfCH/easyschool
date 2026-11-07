
var VIEWS={home:vHome,child:vChild,subject:vSubject,learn:vLearn,practice:vPractice,exam:vExam,game:vGame,xg:vXg,parent:vParent};

function top(){if(nav.view==='home')return '<header class="top" style="min-height:8px"></header>';return '<header class="top"><button class="brand" data-act="home" aria-label="Zur Startseite"><img class="logo" src="img/hero.webp" alt="" width="53" height="34" style="height:34px;width:auto"><span class="wm">EasySchool</span></button><button class="btn back" data-act="back">← Zurück</button></header>'}
var TR=null;
function traceDraw(cv){var x=cv.getContext('2d'),t=cv.getAttribute('data-t');x.clearRect(0,0,600,600);x.fillStyle='#fff';x.fillRect(0,0,600,600);
  x.font='bold 440px Arial,Helvetica,sans-serif';x.textAlign='center';x.textBaseline='alphabetic';
  x.fillStyle='#EEF2FB';x.fillText(t,300,470);x.setLineDash([14,12]);x.lineWidth=4;x.strokeStyle='#9AA7C4';x.strokeText(t,300,470);x.setLineDash([]);
  if(TR&&TR.uc)x.drawImage(TR.uc,0,0)}
function initTrace(){var cv=document.getElementById('trc');if(!cv){TR=null;return}
  var uc=document.createElement('canvas');uc.width=600;uc.height=600;TR={cv:cv,uc:uc,drawing:false,last:null,moved:0};traceDraw(cv);
  function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)*600/r.width,(e.clientY-r.top)*600/r.height]}
  function seg(a,b){var u=uc.getContext('2d');u.lineCap='round';u.lineJoin='round';u.lineWidth=26;u.strokeStyle='#1a73e8';u.beginPath();u.moveTo(a[0],a[1]);u.lineTo(b[0],b[1]);u.stroke();TR.moved++;traceDraw(cv)}
  cv.addEventListener('pointerdown',function(e){e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}TR.drawing=true;TR.last=pt(e);seg(TR.last,TR.last)});
  cv.addEventListener('pointermove',function(e){if(!TR.drawing)return;e.preventDefault();var p=pt(e);seg(TR.last,p);TR.last=p});
  var up=function(){TR.drawing=false};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  cv.style.touchAction='none'}
function traceScore(){
  if(!TR)return {ok:false,msg:'Fahre zuerst die Linie nach.'};
  var G=30,C=20,m=document.createElement('canvas');m.width=600;m.height=600;var mx=m.getContext('2d');mx.font='bold 440px Arial,Helvetica,sans-serif';mx.textAlign='center';mx.fillStyle='#000';mx.fillText(TR.cv.getAttribute('data-t'),300,470);
  var md=mx.getImageData(0,0,600,600).data,ud=TR.uc.getContext('2d').getImageData(0,0,600,600).data,i,j,x,y,mc=[],uc=[],mn=0,un=0;
  for(j=0;j<G;j++){mc[j]=[];uc[j]=[];for(i=0;i<G;i++){var ma=0,ua=0;for(y=j*C;y<j*C+C;y+=4)for(x=i*C;x<i*C+C;x+=4){var p=(y*600+x)*4+3;if(md[p]>100)ma++;if(ud[p]>100)ua++}
    mc[j][i]=ma>=6;uc[j][i]=ua>=2;if(mc[j][i])mn++;if(uc[j][i])un++}}
  if(!un)return {ok:false,msg:'Fahre zuerst die Linie nach.'};
  var cov=0,inside=0;
  for(j=0;j<G;j++)for(i=0;i<G;i++){
    if(mc[j][i]&&uc[j][i])cov++;
    if(uc[j][i]){var nb=false;for(var dj=-1;dj<=1;dj++)for(var di=-1;di<=1;di++){var a=j+dj,b=i+di;if(a>=0&&b>=0&&a<G&&b<G&&mc[a][b])nb=true}if(nb)inside++}}
  if(cov/mn<.55)return {ok:false,msg:'Fahre die ganze Form nach.'};
  if(inside/un<.8)return {ok:false,msg:'Bleib auf der gestrichelten Linie.'};
  return {ok:true}}
function render(){
  clearInterval(timer);timer=null;
  SKIN=nav.child?skinOf(nav.child):null;
  DE=isDeu();app.setAttribute('data-de',DE?'1':'');
  app.innerHTML=top()+banner()+VIEWS[nav.view]()+'<p class="ver">Version '+APP_VERSION+' · <a class="imp" href="impressum.html">Impressum</a></p>'+(nav.view==='home'?'<p class="disc">Lernen leicht gemacht · Inhalte mit KI erstellt</p>':'');
  updateSync();
  calcFab();
  initPads();
  initTrace();
  document.querySelectorAll('textarea.fixin').forEach(fixGrow);
  if(nav.view==='practice'&&nav.queue&&nav.idx<nav.queue.length&&!nav.revealed){
    var cc=curCard(nav);
    if(isV(cc)){var sg=stageOf(nav,nav.queue[nav.idx]);if(sg===1||sg===3){var ai=document.getElementById('ans');if(ai&&ai.focus)try{ai.focus()}catch(e){}}}
  }
  if(nav.view==='learn'){
    var t=topicById(nav.topicId);
    if(nav.step>=t.explain.length-1){var p=prog(nav.child);if(!p.seen[t.id]){p.seen[t.id]=Date.now();addXp(nav.child,10);toast('+10 XP fürs Anschauen','');ach(nav.child,'learn');save(nav.child)}}
  }
  if(nav.view==='exam'&&nav.phase==='run'){
    var tick=function(){var el=document.getElementById('timer');if(!el)return;var rem=Math.round(topicById(nav.topicId).exam.minutes*60-(Date.now()-nav.started)/1000);el.textContent=mmss(rem);el.classList.toggle('late',rem<0)};
    tick();timer=setInterval(tick,1000);
  }
}
function go(n,from){
  n.from=from===undefined?nav:from;nav=n;
  try{var h=n.child||'';if(location.hash.slice(1)!==h)history.replaceState(null,'',location.pathname+location.search+(h?'#'+h:''))}catch(e){}
  render();window.scrollTo(0,0);
}
function resetCard(n){n.jk=false;n.hintN=0;n.pen=0;n.typed='';n.verdict=null;n.err='';n.accentNote='';n.revealed=false;n.cur=null;n.opts=null;n.mset=null;n.mm=null;n.gone=[];n.chosen=null;n.pz=null}
function clearPads(prefix){Object.keys(PADS).forEach(function(k){if(k.indexOf(prefix)===0)delete PADS[k]})}
function requeue(n,k,off){n.queue.splice(Math.min(n.idx+off,n.queue.length),0,k)}

/* ---------- Bewertung, XP, Runde ---------- */
function applyRate(r){
  var n=nav,k=n.queue[n.idx],p=prog(n.child),prev=p.cards[k]||{b:0,n:0,k:0,d:0,t:0},now=Date.now(),b,d,v=isV(cardIdx[k].c),base,bonus=0;
  if(r==='again'){b=v?Math.max(0,prev.b-1):0;d=now}
  else if(r==='hard'){b=Math.max(1,prev.b);d=now+INT[b]*DAY}
  else{b=Math.min(5,prev.b+1);d=now+INT[b]*DAY}
  p.cards[k]={b:b,d:d,n:prev.n+1,k:prev.k+(r==='again'?1:0),t:now};
  n.res[k]=r;n.lastR=r;
  if(r==='again'&&(n.again[k]||0)<3){n.again[k]=(n.again[k]||0)+1;requeue(n,k,4)}
  base={good:10,hard:6,again:2}[r];
  if(r==='again'&&n.pw.indexOf('shield')>=0&&!n.shieldUsed){n.shieldUsed=true;n.perfect=false;toast('🛡️ Schild: Deine Combo ist gerettet','gold')}
  else if(r==='good'){
    n.combo++;
    if(n.combo%5===0){bonus=n.combo===5?20:n.combo===10?40:60;n.bonus.push('Combo x'+n.combo+' +'+bonus);toast('Combo x'+n.combo+'! +'+bonus+' XP','gold')}
    if(n.combo>=5)ach(n.child,'combo5');
  }else{n.perfect=false;if(r==='again')n.combo=0}
  n.lastXp=addXp(n.child,(base+bonus)*(n.pw.indexOf('x2')>=0?2:1));n.xp+=n.lastXp;
  save(n.child);
}
function advance(){
  var n=nav;n.msg=(n.lastXp?'+'+n.lastXp+' XP · ':'')+pick(CHEER[n.lastR||'good'],n.idx+n.queue.length);n.lastXp=0;
  n.idx++;resetCard(n);
  if(n.idx>=n.queue.length)finishRound(n);
  render();window.scrollTo(0,0);
}
function finishRound(n){
  if(n.done)return;n.done=true;
  var keys=Object.keys(n.res);if(!keys.length)return;
  rewardEnd('Alle Karten geschafft!');var t=15;n.bonus.push('Runde geschafft +15');
  if(n.perfect&&keys.length>=3){t+=25;n.bonus.push('Perfekte Runde +25');ach(n.child,'perfect');toast('Perfekte Runde! +25 XP','gold')}
  n.xp+=addXp(n.child,t);ach(n.child,'first');checkPassive(n.child);save(n.child);
}
function doRate(r){logAnswer(nav.child,r!=='again');applyRate(r);advance()}
function vocabOutcome(r){
  var n=nav,k=n.queue[n.idx],s=stageOf(n,k),fin=n.fin[k];
  logAnswer(n.child,r!=='again');
  if(r==='again'){n.ls[k]=Math.max(0,s-1);applyRate('again');return}
  if(r==='hard')n.worst[k]='hard';
  if(s<fin){n.ls[k]=s+1;n.lastR='good';n.lastXp=addXp(n.child,4*(n.pw.indexOf('x2')>=0?2:1));n.xp+=n.lastXp;requeue(n,k,4);save(n.child);return}
  applyRate(n.worst[k]==='hard'&&r==='good'?'hard':r);
}

/* ---------- Aktionen ---------- */
var ACT={
  home:function(){go({view:'home'},null)},
  parent:function(){go({view:'parent'},{view:'home'})},
  back:function(){
    var f=nav.from;
    while(f&&(f.view==='practice'||f.view==='exam'||f.view==='learn'||f.view==='game'||f.view==='xg'))f=f.from;
    if(!f)f=nav.child&&nav.view!=='child'?{view:'child',child:nav.child,from:{view:'home'}}:{view:'home'};
    go(f,f.from||null);
  },
  child:function(b){go({view:'child',child:b.dataset.id},{view:'home'})},
  subject:function(b){go({view:'subject',child:nav.child,subject:b.dataset.id})},
  learn:function(b){go({view:'learn',child:nav.child,topicId:b.dataset.id,step:0,qz:{}})},
  next:function(){nav.step++;nav.fails=0;render();window.scrollTo(0,0)},
  thnext:function(){nav.conf=nav.conf||{};nav.conf[nav.step]=stg(nav.step);nav.step++;nav.fails=0;render();window.scrollTo(0,0)},
  prev:function(){nav.step--;nav.fails=0;render();window.scrollTo(0,0)},
  ttog:function(b){nav.topen=nav.topen||{};nav.topen[b.dataset.id]=!nav.topen[b.dataset.id];var y=window.scrollY;render();window.scrollTo(0,y)},
  chtoggle:function(el){var k=el.getAttribute('data-key');nav.chopen=nav.chopen||{};var def=!(topicsOf(nav.child,nav.subject).length>8);nav.chopen[k]=!((k in nav.chopen)?nav.chopen[k]:def);render()},
  avopen:function(){nav.avpick=true;render()},
  avclose:function(){nav.avpick=false;render();if(String(myName()).trim().toLowerCase()==='spielplatz'){setMyName('');render();showPicker();return}if(nav.view!=='home')return},
  avcol:function(b){setMyCol(parseInt(b.dataset.id,10));render()},
  avpick:function(b){setMyAv(parseInt(b.dataset.id,10));render()},
  power:function(b){var p=prog(nav.child),id=b.dataset.id,i=p.arm.indexOf(id);if(i>=0)p.arm.splice(i,1);else{var w=POW.filter(function(x){return x.id===id})[0];if(!powReady(nav.child,w))return;p.arm.push(id)}saveLocal();render()},
  powinfo:function(b){var w=POW.filter(function(x){return x.id===b.dataset.id})[0],p=prog(nav.child);toast(w.ic+' '+w.n+': '+(w.lvl>plinfo(nav.child).L?'ab Rang '+w.lvl:p.pw[w.id]===dkey(0)?'heute schon genutzt':w.d),'')},
  aura:function(b){var p=prog(nav.child);p.aura=b.dataset.id;p.auraT=Date.now();save(nav.child);render()},
  skip:function(){var n=nav;if(n.skipUsed)return;n.skipUsed=true;var k=n.queue[n.idx];n.lastXp=0;n.lastR='good';n.queue.push(k);toast('⏩ Joker benutzt','gold');advance()},
  skin:function(b){var p=prog(nav.child);p.skin=b.dataset.id;p.skinT=Date.now();save(nav.child);render()},
  flip:function(b){if(b.classList)b.classList.toggle('on')},
  speak:function(b){try{var u=new SpeechSynthesisUtterance(b.dataset.t);u.lang=b.dataset.lang||'en-GB';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}},
  qz:function(b){nav.qz=nav.qz||{};var key=nav.step+'_'+b.dataset.q;if(nav.qz[key]!=null)return;nav.qz[key]=+b.dataset.i;theoryTask();render()},
  ldir:function(b){nav.lst=nav.lst||{open:{},mark:{}};nav.lst.mark=nav.lst.mark||{};nav.lst.dir=b.dataset.d;nav.lst.open={};render()},
  lopen:function(b){var L=nav.lst||(nav.lst={dir:'fw',open:{},mark:{}});L.open[b.dataset.id]=!L.open[b.dataset.id];render()},
  lmark:function(b){var L=nav.lst;L.mark[b.dataset.id]=b.dataset.v;render()},
  lreset:function(){var L=nav.lst;if(L){L.open={};L.mark={}}render()},
  topt:function(b){theoryTask();var T=topicById(nav.topicId).explain[nav.step].try,o=T.opts[+b.dataset.i],i=nav.step;nav.topt=nav.topt||{};var ch=nav.topt[i]||(nav.topt[i]={});if(o===T.a[0])ch.ok=true;else{ch.bad=(ch.bad||[]).concat([o])}render()},
  dslot:function(b){var i=nav.step,si=+b.dataset.si,pl=nav.dr[i];if(pl[si]){pl[si]=null;nav.dr[i+'ok']=undefined}else if(nav.dsel){pl[si]=nav.dsel;nav.dsel=null}render()},
  dcheck:function(){theoryTask();var T=topicById(nav.topicId).explain[nav.step].try,i=nav.step,pl=nav.dr[i];nav.dr[i+'ok']=pl.every(function(x,k){return x===T.a[k]});render()},
  dreset:function(){var T=topicById(nav.topicId).explain[nav.step].try,i=nav.step;nav.dr[i]=T.drag.slots.map(function(){return null});nav.dr[i+'ok']=undefined;nav.dsel=null;render()},
  trclear:function(){nav.err='';render()},
  trcheck:function(){var n=nav,r=traceScore();if(r.ok){n.revealed=true;n.verdict='ok';n.err='';render()}else{n.err=r.msg;render()}},
  mtog:function(b){var n=nav,i=+b.dataset.i,s=n.mset||(n.mset=[]),p=s.indexOf(i);if(p>=0)s.splice(p,1);else s.push(i);render()},
  mcheck:function(){var n=nav,s=n.mset||[],ok=n.opts.every(function(o,i){return (s.indexOf(i)>=0)===!!o.ok});n.typed=s.map(function(i){return n.opts[i].t}).join(', ');n.revealed=true;n.verdict=ok?'ok':'no';render()},
  mset:function(b){var n=nav,c=curCard(n);n.mm=n.mm||c.match.items.map(function(){return -1});n.mm[+b.dataset.i]=+b.dataset.j;render()},
  mmcheck:function(){var n=nav,c=curCard(n),m=c.match,ok=m.items.every(function(it,i){return n.mm[i]===it[1]});n.typed=m.items.map(function(it,i){return it[0].replace(/<[^>]+>/g,'')+' → '+m.cats[n.mm[i]]}).join('; ');n.revealed=true;n.verdict=ok?'ok':'no';render()},
  mpick:function(b){var n=nav,o=n.opts[+b.dataset.i];n.typed=o.t;n.chosen=+b.dataset.i;n.revealed=true;n.verdict=o.ok?'ok':'no';render()},
  try:function(){theoryTask();
    var st=topicById(nav.topicId).explain[nav.step].try,inp=document.getElementById('tryin'),fb=document.getElementById('tryfb'),r=checkAns(inp.value,st.a);
    if(r.empty){fb.className='fb no';fb.textContent='Schreibe zuerst deine Antwort auf.';return}
    if(r.ok){fb.className='fb ok';fb.textContent='Richtig!'+(r.accent?' Achte auf die Schreibweise: '+r.accent:'')}
    else{nav.fails=(nav.fails||0)+1;fb.className='fb no';fb.textContent=nav.fails>=2?'Noch nicht. Die Lösung ist: '+st.a[0]:'Noch nicht ganz. Schau nochmal ins Bild und probiere es nochmal.'}
  },
  tryhint:function(){var st=topicById(nav.topicId).explain[nav.step].try,fb=document.getElementById('tryfb');fb.className='fb no';fb.textContent='Tipp: '+st.hint},
  practice:function(b){
    var child=nav.child,scope=parseScope(b.dataset.scope),force=!!b.dataset.force,topics=scopeTopics(child,scope),from=nav;
    while(from&&(from.view==='practice'||from.view==='exam'||from.view==='learn'||from.view==='game'||from.view==='xg'))from=from.from;
    var n={view:'practice',child:child,subject:nav.subject,scope:scope,queue:buildQueue(child,topics,force),idx:0,res:{},again:{},padOpen:{},qs:{},ls:{},fin:{},start:{},worst:{},xp:0,combo:0,bonus:[],perfect:true,lastXp:0,pw:[],skipUsed:false,shieldUsed:false};
    var pp=prog(child);
    if(n.queue.length&&pp.arm.length){n.pw=pp.arm.slice();n.pw.forEach(function(id){pp.pw[id]=dkey(0)});pp.arm=[];save(child);toast('Kraft aktiv: '+n.pw.map(function(id){return POW.filter(function(x){return x.id===id})[0].ic}).join(' '),'gold')}
    resetCard(n);
    go(n,from||{view:'child',child:child,from:{view:'home'}});
  },
  hint:function(){
    var n=nav,k=n.queue[n.idx],c=curCard(n),stg=isV(c)?stageOf(n,k):0,hs=hintList(n,k,c,stg),it=hs[n.hintN];
    if(!it)return;
    n.hintN++;if(it.k!=='theory'&&n.pw.indexOf('free')<0)n.pen++;
    if(it.k==='elim'){
      var o=makeOpts(n,k,c),cand=[];o.forEach(function(op,i){if(!op.ok&&n.gone.indexOf(i)<0)cand.push(i)});
      var first=!n.jk;n.jk=true;var rm=first?Math.min(3,Math.max(1,cand.length-1)):Math.max(0,cand.length-1);
      shuffle(cand).slice(0,rm).forEach(function(i){n.gone.push(i)});
    }
    if(it.k==='tile'){
      var pz=pzInit(n,c),i;
      for(i=0;i<pz.sel.length;i++){if(pz.tiles[pz.sel[i]]!==pz.u[i]){pz.sel=pz.sel.slice(0,i);break}}
      var want=pz.u[pz.sel.length];
      for(i=0;i<pz.tiles.length;i++){if(pz.sel.indexOf(i)<0&&pz.tiles[i]===want){pz.sel.push(i);break}}
    }
    render();
  },
  pick:function(b){
    var n=nav;if(n.revealed)return;var i=+b.dataset.i,ok=n.opts[i].ok;
    n.chosen=i;n.revealed=true;n.verdict=ok?'ok':'no';
    vocabOutcome(ok?(n.pen>=2?'hard':'good'):'again');render();
  },
  tile:function(b){var n=nav;if(n.revealed||!n.pz)return;var i=+b.dataset.i;if(n.pz.sel.indexOf(i)<0)n.pz.sel.push(i);render()},
  untile:function(){var n=nav;if(n.pz)n.pz.sel.pop();render()},
  pzclear:function(){var n=nav;if(n.pz)n.pz.sel=[];render()},
  pzcheck:function(){
    var n=nav,c=curCard(n),built=pzBuilt(n,c),r=checkAns(built,[c.fw]);
    n.typed=built;n.revealed=true;n.verdict=r.ok?'ok':'no';
    vocabOutcome(r.ok?(n.pen>=2?'hard':'good'):'again');render();
  },
  check:function(){
    var n=nav,c=curCard(n),inp=document.getElementById('ans'),val=inp?inp.value:(n.typed||'');
    n.typed=val;
    if(!val.trim()){n.err='Schreib zuerst dein Ergebnis hin.';render();return}
    if(isV(c)){
      var stg=stageOf(n,n.queue[n.idx]),list=stg===3?[c.fw].concat(c.fw.indexOf(' / ')>0?c.fw.split(' / '):[]):c.de,r=checkAns(val,list);
      n.revealed=true;n.err='';n.accentNote=r.accent||'';
      if(r.ok){n.verdict='ok';vocabOutcome(n.pen>=2?'hard':'good')}
      else if(nearMiss(val,list)){n.verdict='near';vocabOutcome('hard')}
      else{n.verdict='no';vocabOutcome('again')}
      render();return;
    }
    var r2=(c.pre!=null||c.cs)?checkStrict(val,cardAns(c)):checkAns(val,cardAns(c));
    n.revealed=true;n.err='';n.verdict=r2.ok?'ok':isSoft(c)?'near':'no';n.accentNote=r2.accent||'';render();
  },
  reveal:function(){
    var n=nav;n.revealed=true;
    if(isV(curCard(n))){n.verdict='no';vocabOutcome('again')}else n.verdict=null;
    render();
  },
  next2:function(){advance()},
  rate:function(b){doRate(b.dataset.r)},
  calc:function(){calcOpen()},
  pad:function(b){var key=b.dataset.key;nav.padOpen=nav.padOpen||{};nav.padOpen[key]=!padOpen(key);render()},
  tool:function(b){penTool=b.dataset.tool;Array.prototype.forEach.call(document.querySelectorAll('.tool[data-tool]'),function(el){el.classList.toggle('on',el.dataset.tool===penTool)})},
  padundo:function(b){var s=PADS[b.dataset.key];if(s){s.pop();Array.prototype.forEach.call(document.querySelectorAll('.padcv'),function(cv){if(cv.dataset.key===b.dataset.key)redraw(cv)})}},
  padclear:function(b){PADS[b.dataset.key]=[];Array.prototype.forEach.call(document.querySelectorAll('.padcv'),function(cv){if(cv.dataset.key===b.dataset.key)redraw(cv)})},
  pairs:function(b){
    var t=topicById(b.dataset.id),words=t.cards.filter(function(c){return isV(c)&&wc(c.fw)<=2}),items=shuffle(words).slice(0,6);
    go({view:'game',child:nav.child,topicId:t.id,items:items,right:shuffle(items.map(function(c){return c.id})),sel:null,done:{},miss:0,bad:null,started:Date.now(),finished:false,xp:0},{view:'subject',child:nav.child,subject:t.subject,from:{view:'child',child:nav.child,from:{view:'home'}}});
  },
  pl:function(b){var n=nav;if(n.done[b.dataset.id])return;n.sel=b.dataset.id;n.bad=null;render()},
  pr:function(b){
    var n=nav;if(n.sel==null||n.done[b.dataset.id])return;
    if(n.sel===b.dataset.id){
      n.done[n.sel]=1;n.sel=null;n.bad=null;
      if(Object.keys(n.done).length===n.items.length){
        n.finished=true;n.secs=Math.round((Date.now()-n.started)/1000);
        var x=Math.max(6,24-2*n.miss)+(n.miss===0?15:0);n.xp=addXp(n.child,x);
        logAnswer(n.child,true);ach(n.child,'pairs');checkPassive(n.child);save(n.child);setTimeout(function(){showReward('Alle Paare gefunden!')},700);
      }
    }else{n.miss++;n.bad=b.dataset.id;n.sel=null;logAnswer(n.child,false)}
    render();
  },
  say:function(b){try{var u=new SpeechSynthesisUtterance(b.dataset.t);u.lang='de-CH';u.rate=.85;window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}catch(e){}},
  exam:function(b){go({view:'exam',child:nav.child,subject:nav.subject,topicId:b.dataset.id,phase:'intro',answers:{},padOpen:{}})},
  emode:function(b){nav.mode=b.dataset.m;nav.qlist=null;render()},
  edir:function(b){nav.edir=b.dataset.d;nav.qlist=null;render()},
  start:function(){for(var wk1 in WCS)if(wk1.indexOf('e:')===0)delete WCS[wk1];nav.pname=funnyName(topicById(nav.topicId));nav.qlist=mkQs(nav,topicById(nav.topicId));clearPads('e:'+nav.topicId+':');nav.phase='run';nav.started=Date.now();nav.answers={};nav.padOpen={};render();window.scrollTo(0,0)},
  retake:function(){clearPads('e:'+nav.topicId+':');nav.phase='intro';nav.answers={};nav.result=null;nav.qlist=null;render();window.scrollTo(0,0)},
  finish:function(){finishExam()}
};
function finishExam(){
  var n=nav,t=topicById(n.topicId),p=prog(n.child),now=Date.now(),score=0;
  var qsx=examQs(n,t);var items=qsx.map(function(q){
    var g=n.answers[q.id],ok=false,note='';
    if(g==null&&q.pre!=null)g=q.pre;
    if(q.type==='mc')ok=g===q.answer;else{var r=(q.pre!=null||q.cs)?checkStrict(g||'',q.answer):checkAns(g||'',q.answer);ok=r.ok;if(r.accent)note=r.accent}
    if(ok)score++;
    else if(q.ref){var k=t.id+'_'+q.ref,prev=p.cards[k]||{b:0,n:0,k:0,d:0,t:0};p.cards[k]={b:0,d:now,n:prev.n,k:prev.k+1,t:now}}
    logAnswer(n.child,ok);
    return {q:q,g:g,ok:ok,note:note};
  });
  var max=qsx.length,note=grade(score,max),xp=5*score+(note>=5?30:0)+(note>=5.75?20:0);
  p.exams.push({topic:t.id,score:score,max:max,note:note,t:now});setTimeout(function(){showReward('Prüfung fertig: Note '+fmt(note)+'!')},900);
  addXp(n.child,xp);if(note>=5)ach(n.child,'exam5');checkPassive(n.child);
  save(n.child);n.phase='result';n.result={items:items,score:score,max:max,note:note,xp:xp};render();window.scrollTo(0,0);
}

app.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;if(nav.child)touch(nav.child);var ac=b.dataset.act,tid=(ac==='learn'||ac==='exam'||ac==='pairs'||ac==='xgame')?b.dataset.id:((ac==='practice'&&/^topic:/.test(b.dataset.scope||''))?b.dataset.scope.slice(6):null);if(tid&&nav.child){var pv=prog(nav.child);pv.vis[tid]=(pv.vis[tid]||0)+1;saveLocal()}var f=ACT[ac];if(f)f(b)});
app.addEventListener('change',function(e){var t=e.target,q=t&&t.dataset&&t.dataset.q;if(q&&nav.view==='exam'&&t.tagName==='SELECT')nav.answers[q]=t.value===''?null:Number(t.value)});
app.addEventListener('input',function(e){
  var t=e.target;if(!t)return;
  if(t.id==='avname'){setMyName(t.value);return}
  if(t.id==='ans'&&nav.view==='practice'){nav.typed=t.value;return}
  var q=t.dataset&&t.dataset.q;if(!q||nav.view!=='exam')return;nav.answers[q]=t.type==='radio'?Number(t.value):t.value;
});
app.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&e.target.id==='tryin'){e.preventDefault();ACT.try()}
  if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('fixin')&&e.target.id.indexOf('in-')===0){e.preventDefault();return}
  if(e.key==='Enter'&&e.target.id==='ans'){e.preventDefault();ACT.check()}
  if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('flipc')){e.preventDefault();ACT.flip(e.target)}
});
document.addEventListener('keydown',function(e){
  if(nav.view!=='practice'||nav.idx>=nav.queue.length||document.activeElement!==document.body)return;
  if(nav.revealed){
    if(isV(curCard(nav))){if(e.key==='Enter')advance();return}
    var m={'1':'again','2':'hard','3':'good'}[e.key];if(m)doRate(m);
  }
});
var rz=null;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(initPads,200)});
function route(){
  var h=location.hash.slice(1),ch=C.children.filter(function(c){return c.id===h})[0];
  if(ch&&!(nav.child===ch.id&&nav.view!=='home')){nav={view:'child',child:ch.id,from:{view:'home'}};render()}
  else if(!h&&nav.view!=='home'&&nav.view!=='parent'&&nav.view!=='learn'&&nav.view!=='practice'&&nav.view!=='exam'&&nav.view!=='game'&&nav.view!=='xg'){nav={view:'home'};render()}
}
window.addEventListener('hashchange',function(){if(C)route()});

fetch('content.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){
  C=j;C.topics.forEach(function(t){t.cards.forEach(function(c){cardIdx[t.id+'_'+c.id]={c:c,t:t}})});
  loadLocal();
  var h=location.hash.slice(1),ch=C.children.filter(function(c){return c.id===h})[0];
  nav=ch?{view:'child',child:ch.id,from:{view:'home'}}:{view:'home'};
  render();initDb();
}).catch(function(){app.innerHTML='<div class="card err"><h2>Die Lerninhalte konnten nicht geladen werden</h2><p class="sub">Lade die Seite neu. Wenn es weiter nicht klappt, melde dich bei Papa oder Mama.</p></div>'});
/* Ziehen (Pointer) für Theorie-Aufgaben */
(function(){var drag=null;
 app.addEventListener('pointerdown',function(e){var c=e.target.closest&&e.target.closest('.dchip');if(!c)return;e.preventDefault();
  drag={chip:c.dataset.chip,x:e.clientX,y:e.clientY,moved:false,ghost:null,el:c}});
 window.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.moved&&Math.abs(dx)+Math.abs(dy)>8){drag.moved=true;var g=drag.el.cloneNode(true);g.className='dchip ghost';document.body.appendChild(g);drag.ghost=g}
  if(drag.ghost){drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';var t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest&&t.closest('.dslot');Array.prototype.forEach.call(document.querySelectorAll('.dslot'),function(x){x.classList.toggle('hot',x===s)})}});
 window.addEventListener('pointerup',function(e){if(!drag)return;var d=drag;drag=null;
  if(d.ghost){d.ghost.style.display='none';var t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest&&t.closest('.dslot');d.ghost.remove();
   if(s&&nav.view==='learn'){var si=+s.dataset.slot,pl=nav.dr[nav.step];if(!pl[si]){pl[si]=d.chip;nav.dr[nav.step+'ok']=undefined}nav.dsel=null}render()}
  else{nav.dsel=nav.dsel===d.chip?null:d.chip;render()}});
 window.addEventListener('pointercancel',function(){if(drag&&drag.ghost)drag.ghost.remove();drag=null});
})();
/* ---------- Belohnung: Extra-XP-Runde ---------- */
var STREAK=0,QN=0,TT=0,LT=0,RW=null,RWN=4+Math.floor(Math.random()*6);
function rwReset(){STREAK=0;QN=0;TT=0;LT=0;RWN=4+Math.floor(Math.random()*6)}
function rewardEnd(why){setTimeout(function(){if(!document.getElementById('rwd')&&!RW)showReward(why)},900)}
function rewardAfter(ok){
  if(!nav||(nav.view!=='practice'&&nav.view!=='xg'))return;
  QN++;if(ok)STREAK++;else STREAK=0;
  if(STREAK>=5){rwReset();showReward('5 richtige Antworten in Folge!')}
  else if(QN>=RWN){var q=QN;rwReset();showReward(q+' Fragen geschafft!')}
}
function theoryTask(){if(!nav||nav.view!=='learn')return;TT++;if(TT>=3){rwReset();setTimeout(function(){showReward('3 Aufgaben gelöst!')},600)}}
function T3(f){f=Math.ceil(f*.8);return [Math.ceil(f*.5),Math.ceil(f*.8),f]}
var GAMES=[
 {id:'flappy',n:'Vogelflucht',e:'🕊️',g:T3(14),time:60,d:'cave',gs:'tap',lb:'Tippen',ctl:'👆 Tippen = flattern',how:'Flieg durch den Gang!'},
 {id:'tetris',n:'Tetris',e:'🧱',g:T3(400),time:60,d:'tet',gs:'tet',lb:'Wischen · Tippen',ctl:'👆 Tippen = drehen · ↔ wischen = bewegen · ↓ lang wischen = fallen',how:'Volle Reihen geben Punkte!'},
 {id:'cannon',n:'Taubenjagd',e:'🔫',g:[5,8,10],time:60,d:'shoot',gs:'tap',lb:'Tippen',ctl:'👆 Tippen = schiessen',how:'10 Patronen. Triff die schwarzen Tauben, nicht die bunten!'},
 {id:'runner',n:'Tsunami-Flucht',e:'🌊',g:T3(14),time:60,d:'run',gs:'tap',lb:'Tippen',ctl:'👆 Tippen = springen',how:'Spring über Hindernisse. Krabben darfst du anspringen.'},
 {id:'stack',n:'Burger-Turm',e:'🍔',g:T3(28),time:60,d:'drop',gs:'tap',lb:'Tippen',ctl:'👆 Tippen = Zutat fallen lassen',how:'Triff genau, sonst wird die Lage schmaler.'},
 {id:'moto',n:'Dirtbike',e:'🏍️',g:T3(14),time:60,d:'moto',gs:'lr',lb:'Wischen',ctl:'👈 👉 Wischen oder links/rechts tippen',how:'Weiche den Hindernissen aus.'},
 {id:'pong',n:'Fallrückzieher',e:'⚽',g:T3(16),time:60,d:'sam',gs:'drag',lb:'Ziehen',ctl:'☝️ Finger ziehen = unter den Ball laufen',how:'Lauf unter den Einwurf. Stehst du richtig, gibt es einen Fallrückzieher. Daneben = harte Landung!'},
 {id:'roulette',n:'Roulette',e:'🎰',g:[1,2,3],time:60,d:'roul',gs:'tap',lb:'Tippen',ctl:'👆 Feld antippen, dann DREHEN',how:'Du hast 2 Versuche. Die grüne 0 verliert immer!'},
 {id:'snake',n:'Snake',e:'🐍',g:T3(12),time:60,d:'train',gs:'s4',lb:'Wischen',ctl:'☝️ Wische ⬅ ➡ ⬆ ⬇',how:'Sammle die Münzen. Wand und eigener Körper sind tödlich.'},
 {id:'basket',n:'Basketball',e:'🏀',g:T3(13),time:60,d:'bball',gs:'tap',lb:'Tippen',ctl:'👆 Tippen im grünen Bereich',how:'Du darfst 3 Mal danebenwerfen.'},
 {id:'round',n:'Kreisverkehr',e:'🚗',g:T3(10),time:60,d:'round',gs:'tap',lb:'Tippen',ctl:'👆 Tippen = Auto fährt los',how:'Fahr in eine Lücke. Crash = Herz weg.'},
 {id:'base',n:'Baseball',e:'⚾',g:T3(11),time:60,d:'bat',gs:'tap',lb:'Tippen',ctl:'👆 Tippen, wenn der Ball in der Box ist',how:'3 Fehler und du bist raus.'},
 {id:'arch',n:'Bogenschiessen',e:'🏹',g:T3(32),time:60,d:'arch',gs:'tap',lb:'Tippen',ctl:'👆 Tippen, wenn es in der Mitte ist',how:'Du hast 19 Bolzen.'},
];
function demoHTML(g){var d=g.d,sp=g.e;
  if(d==='cave')return '<div class="dm dm-cave2"><span class="ct"></span><span class="cb"></span><span class="dpl"></span><span class="dpl b"></span><span class="dbd">🕊️</span><span class="dfin">👆</span></div>';
  if(d==='mouth')return '<div class="dm dm-mouth"><div class="dh l">◀</div><div class="dh r">▶</div><span class="dc c1">🍬</span><span class="dc c2">🍭</span><span class="dc c3">🥦</span><span class="dkid">😋</span></div>';
  if(d==='train')return '<div class="dm dm-snk"><span class="sd s0"></span><span class="sd s1"></span><span class="sd s2"></span><span class="sd s3"></span><span class="sd s4"></span><span class="sd s5"></span><span class="sd hd"></span><span class="dit">🪙</span><div class="swk"><b>⬅</b><b>⬆</b><b>⬇</b><b>➡</b></div><span class="swf">👆</span></div>';
  if(d==='sam')return '<div class="dm dm-sam"><span class="dpm">🌴</span><span class="dmk">🐒</span><span class="dcc">🥥</span><span class="dsl">ZACK!</span><span class="dnj">🥷</span><span class="dfin">👆</span></div>';
  if(d==='moto')return '<div class="dm dm-moto2"><span class="dr1"></span><span class="dr2"></span><span class="dob">🛢️</span><span class="dsp">🏍️</span><div class="swk"><b>⬅</b><b>➡</b></div><span class="swf">👆</span></div>';
  if(d==='bball')return '<div class="dm dm-bball"><span class="dhp"></span><span class="dbl">🏀</span><div class="dbar"><i></i></div><span class="dfin">👆</span></div>';
  if(d==='round')return '<div class="dm dm-round"><span class="drg"></span><span class="dcr"><b>🚙</b><b style="left:-6px;top:34px;transform:rotate(90deg)">🚕</b><b style="left:34px;top:74px;transform:rotate(90deg)">🚓</b></span><span class="dqc">🚗</span><span class="dfin">👆</span></div>';
  if(d==='bat')return '<div class="dm dm-bat"><span class="dring"></span><span class="dbb">⚾</span><span class="dfin">👆</span></div>';
  if(d==='arch')return '<div class="dm dm-arch"><span class="dtg"></span><span class="dxh"></span><span class="dfin">👆</span></div>';
  if(d==='run')return '<div class="dm dm-run"><span class="dwv"></span><span class="dgy">🏃</span><span class="dob2">⛱️</span><span class="dfin">👆</span></div>';
  if(d==='jump')return '<div class="dm dm-jump"><span class="dsp">'+sp+'</span><span class="dpipe t"></span><span class="dpipe b"></span><span class="dfin">👆</span></div>';
  if(d==='lr')return '<div class="dm dm-lr"><div class="dh l"><b>◀</b>tippen</div><div class="dh r">tippen<b>▶</b></div><span class="dsp">'+sp+'</span></div>';
  if(d==='shoot')return '<div class="dm dm-shoot"><span class="dbal">🐦</span><span class="dbal b2">🦜</span><span class="dshot"></span><span class="dcan"></span><div class="dam">'+'<i></i>'.repeat(10)+'</div><span class="dfin">👆</span></div>';
  if(d==='drop')return '<div class="dm dm-bg"><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><i class="mv"></i><span class="dfin">👆</span></div>';
  if(d==='slide')return '<div class="dm dm-slide"><span class="dnet"></span><span class="dball"></span><span class="dpad"></span><span class="dfin">👆</span></div>';
  if(d==='tet')return '<div class="dm dm-tet"><span class="dtp">🟪</span><div class="swk"><b>⬅</b><b>👆</b><b>⬇</b><b>➡</b></div><span class="swf">👆</span></div>';
  return '<div class="dm dm-roul"><span class="dwh"></span><span class="dchip"></span><div class="drb"><i class="r">ROT 50</i><i class="g">1–4 150</i><i class="b">7 · 300</i></div><span class="dfin">👆</span></div>';}
function showPicker(){
  var o=document.createElement('div');o.id='rwd';o.className='rwd';
  o.innerHTML='<div class="rwbox"><div class="rwtop"><b>🎮 Spielplatz (Testmodus)</b><button class="rwx" aria-label="Schliessen">×</button></div><p class="sub" style="margin:0">Hier kannst du alle Spiele testen. Es gibt keine XP.</p><div class="rwgrid">'+GAMES.map(function(g,i){return '<button class="rwg" data-g="'+g.id+'" style="background:linear-gradient(160deg,hsl('+Math.round(i*360/GAMES.length)+',85%,62%),hsl('+(Math.round(i*360/GAMES.length)+35)+',80%,42%));color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.45)"><span>'+g.e+'</span><b>'+g.n+'</b></button>'}).join('')+'</div></div>';
  document.body.appendChild(o);document.body.classList.add('rwopen');
  o.querySelector('.rwx').onclick=closeReward;
  o.querySelectorAll('.rwg').forEach(function(b){b.onclick=function(){o.remove();showReward('Testmodus.',b.dataset.g)}});
}
function showReward(why,force){
  if(document.getElementById('rwd'))return;rwReset();
  var pool=GAMES.filter(function(g){return g.id!==(RW_LAST||'')}),g=force?GAMES.filter(function(x){return x.id===force})[0]:pool[Math.floor(Math.random()*pool.length)];RW_LAST=g.id;
  if(force)rwOpen(why,g,force);else rwWheel(why,g);
}
function rwWheel(why,g){
  var gi=GAMES.indexOf(g),N=GAMES.length,seg=360/N,sz=Math.floor(Math.min(window.innerWidth-56,330)),R=sz/2,cols=[],i;
  RW={child:nav.child,g:g,stop:null,score:0,done:false,why:why,test:false,wheel:true};
  for(i=0;i<N;i++){var hu=Math.round(i*360/N);cols.push('hsl('+hu+',88%,'+(i%2?52:60)+'%) '+(i*seg)+'deg '+((i+1)*seg)+'deg')}
  var em=GAMES.map(function(x,k){var a=(k+.5)*seg;return '<span class="whe" style="transform:rotate('+a+'deg) translateY(-'+Math.round(R*.72)+'px) rotate(-'+a+'deg)">'+x.e+'</span>'}).join('');
  var lines=GAMES.map(function(x,k){return '<i class="whln" style="transform:rotate('+(k*seg)+'deg)"></i>'}).join('');
  var bulbs='';for(i=0;i<24;i++)bulbs+='<b class="whb" style="transform:rotate('+(i*15)+'deg) translateY(-'+Math.round(R+9)+'px);animation-delay:'+(i%2?0:.25)+'s"></b>';
  var o=document.createElement('div');o.id='rwd';o.className='rwd';
  o.innerHTML='<div class="rwbox whbox" role="dialog" aria-modal="true"><div class="rwtop"><b>🎡 Glücksrad</b><button class="rwx" aria-label="Schliessen">×</button></div><div class="whwin"><span class="whstar">🏆</span><b>Du hast dir ein Mini-Game verdient!</b></div><p class="rwwhy">'+why+'</p><p class="whsub" id="whsub">Wische das Rad an! Schneller wischen = stärker drehen.</p>'
   +'<div class="whw" id="whw" style="width:'+(sz+40)+'px;height:'+(sz+60)+'px"><span class="whp" id="whp">▼</span><div class="whring" style="width:'+sz+'px;height:'+sz+'px;top:34px;left:20px">'+bulbs+'</div><div class="wheel" id="wheel" style="width:'+sz+'px;height:'+sz+'px;top:34px;left:20px;background:conic-gradient('+cols.join(',')+')">'+lines+em+'<span class="whc">🎮</span></div><div class="whgloss" style="width:'+sz+'px;height:'+sz+'px;top:34px;left:20px"></div><div class="whhand" id="whhand">👆</div></div>'
   +'<div class="whpw"><i id="whpwf"></i></div><p class="whpwt" id="whpwt">Kraft</p></div>';
  document.body.appendChild(o);document.body.classList.add('rwopen');o.classList.add('whin');
  o.querySelector('.rwx').onclick=closeReward;
  var me=RW,spun=false,wh=document.getElementById('wheel'),box=document.getElementById('whw'),ang=0,dragging=false,lastA=0,samples=[];
  function pa(e){var r=wh.getBoundingClientRect(),cx0=r.left+r.width/2,cy0=r.top+r.height/2;return Math.atan2(e.clientY-cy0,e.clientX-cx0)*180/Math.PI}
  function setRot(a){wh.style.transform='rotate('+a+'deg)'}
  function launch(power){
    if(spun)return;spun=true;var hh=document.getElementById('whhand');if(hh)hh.remove();
    power=Math.max(.15,Math.min(1,power));var dir=1,turns=3+Math.round(power*5),dur=2.8+power*3.6;
    var target=(360-(gi+.5)*seg)+(Math.random()-.5)*seg*.6;var cur=((ang%360)+360)%360,base=ang-cur;var rot=base+360*turns+target;if(rot<ang+360*2)rot+=360;
    wh.style.transition='transform '+dur+'s cubic-bezier(.1,.55,.05,1)';void wh.offsetWidth;setRot(rot);o.classList.add('whspin');
    var pf=document.getElementById('whpwf');if(pf)pf.style.width=(power*100)+'%';var pt=document.getElementById('whpwt');if(pt)pt.textContent=power>.75?'🔥 Mega-Schwung!':power>.4?'💪 Guter Schwung!':'👌 Sanft gedreht';
    var tk=setInterval(function(){var p=document.getElementById('whp');if(!p){clearInterval(tk);return}p.classList.remove('tick');void p.offsetWidth;p.classList.add('tick')},170+ (1-power)*90);
    setTimeout(function(){clearInterval(tk)},dur*1000-400);
    setTimeout(function(){if(RW!==me||!document.getElementById('whsub'))return;o.classList.remove('whspin');var t=document.getElementById('whsub');t.innerHTML='<b class="whpeng">'+g.e+' '+g.n+'!</b>';o.classList.add('whflash');
      for(var k=0;k<36;k++){var c=document.createElement('i');c.className='whcf';c.style.cssText='--dx:'+(Math.random()*360-180)+'px;--dy:'+(-Math.random()*300-40)+'px;--r:'+(Math.random()*720)+'deg;background:hsl('+(Math.random()*360)+',90%,60%);left:50%;top:45%;animation-delay:'+(Math.random()*.15)+'s';box.appendChild(c)}
      setTimeout(function(){if(RW!==me||!document.getElementById('rwd'))return;o.classList.add('whzoom');
        setTimeout(function(){if(RW!==me||!document.getElementById('rwd'))return;o.remove();document.body.classList.remove('rwopen');RW=null;rwOpen(why,g,false);var nb=document.querySelector('#rwd .rwbox');if(nb)nb.classList.add('rwin')},650)},1100)},dur*1000+150)}
  function down(e){if(spun)return;dragging=true;samples=[];lastA=pa(e);var hh=document.getElementById('whhand');if(hh)hh.style.display='none';wh.style.transition='none';try{box.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()}
  function move(e){if(!dragging||spun)return;var a=pa(e),d=a-lastA;if(d>180)d-=360;if(d<-180)d+=360;lastA=a;ang+=d;setRot(ang);samples.push({t:performance.now(),d:d});var tn=performance.now();samples=samples.filter(function(q){return tn-q.t<140});var v=samples.reduce(function(a2,q){return a2+Math.abs(q.d)},0)/Math.max(30,samples.length?140:140);var pf=document.getElementById('whpwf');if(pf)pf.style.width=Math.min(100,v*16)+'%';e.preventDefault()}
  function up(e){if(!dragging||spun)return;dragging=false;var tn=performance.now();var tot=samples.filter(function(q){return tn-q.t<160}).reduce(function(a2,q){return a2+q.d},0);var v=Math.abs(tot)/160;
    if(v<.05&&!samples.length){launch(.3)}else if(v<.04){var pf=document.getElementById('whpwf');if(pf)pf.style.width='0%';var t=document.getElementById('whsub');if(t)t.textContent='Etwas schneller wischen!';wh.style.transition='transform .3s';}else launch(v/.9)}
  box.addEventListener('pointerdown',down);box.addEventListener('pointermove',move);box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
  box.style.touchAction='none';
}
function xpPos(g){var p=[g.g[0]/g.g[2],g.g[1]/g.g[2],1];if(p[2]-p[1]<.2)p[1]=p[2]-.2;if(p[1]-p[0]<.2)p[0]=p[1]-.2;if(p[0]<.12)p[0]=.12;return p}
function xpFrac(g,v){var p=xpPos(g),T=[0,g.g[0],g.g[1],g.g[2]],P=[0,p[0],p[1],1];for(var i=1;i<4;i++)if(v<=T[i])return P[i-1]+(P[i]-P[i-1])*(v-T[i-1])/(T[i]-T[i-1]);return 1}
function rwOpen(why,g,force,gc){
  RW={child:nav.child,g:g,stop:null,score:0,done:false,why:why,test:!!force,gc:!!gc};
  var o=document.createElement('div');o.id='rwd';o.className='rwd';
  o.innerHTML='<div class="rwbox" role="dialog" aria-modal="true"><div class="rwtop"><b>'+g.e+' '+g.n+'</b><span id="rwt" class="rwtime">'+fmtT(g.time)+'</span><button class="rwx" aria-label="Schliessen">×</button></div>'
   +'<div class="xp2"><div class="xp2t"><i id="rwf"></i></div>'+xpPos(g).map(function(p,i){return '<b class="xp2c" data-t="'+g.g[i]+'" style="--p:'+p+'">'+['50','150','300'][i]+'</b>'}).join('')+'</div>'
   +'<div class="rwcvw"><canvas id="rwc" class="rwcv"></canvas><div id="rwst" class="rwstart"><p class="rwwhy">'+why+'</p>'+demoHTML(g)+''+gzHTML(g)+'<p class="rwhow">'+g.how+'</p><button class="btn pri big" id="rwgo">Los!</button></div></div><div id="rwctl"></div><div id="rwmsg" class="rwmsg"></div></div>';
  document.body.appendChild(o);document.body.classList.add('rwopen');
  o.querySelector('.rwx').onclick=function(){var t=RW&&RW.test,gc=RW&&RW.gc;closeReward();if(gc)gcBack();else if(t)showPicker()};
  var W=Math.floor(Math.min(window.innerWidth-48,440)),H=Math.floor(Math.min(W*1.1,window.innerHeight-270));if(H<200)H=200;
  var cv=document.getElementById('rwc'),dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';var cx=cv.getContext('2d');cx.scale(dpr,dpr);
  RW.cv=cv;RW.cx=cx;RW.W=W;RW.H=H;
  document.getElementById('rwgo').onclick=rwCount;
  cx.fillStyle='#2b2f5e';cx.fillRect(0,0,W,H);
}
var RW_LAST='';
function fmtT(s){return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2)}
function rwCount(){var st=document.getElementById('rwst');st.innerHTML='<div class="rwcdw"><i class="cdr r1"></i><i class="cdr r2"></i><div class="rwcd c3" id="rwcd">3</div></div>';var n=3,me=RW,iv=setInterval(function(){var e=document.getElementById('rwcd');if(RW!==me||!e){clearInterval(iv);return}n--;if(n>0){e.textContent=n;e.className='rwcd c'+n;e.style.animation='none';void e.offsetWidth;e.style.animation=''}else if(n===0){e.textContent='LOS!';e.className='rwcd go'}else{clearInterval(iv);st.remove();rwBegin()}},800)}
function rwBegin(){
  var g=RW.g;
  var left=g.time,tick=setInterval(function(){left--;var t=document.getElementById('rwt');if(t)t.textContent=fmtT(Math.max(0,left));if(left<=0&&RW&&!RW.dying)rwEnd()},1000);
  var score=function(v){RW.score=v;var f=document.getElementById('rwf');if(f)f.style.width=(xpFrac(g,v)*100)+'%';document.querySelectorAll('.xp2c').forEach(function(c){if(v>=+c.dataset.t&&!c.classList.contains('on')){c.classList.add('on');c.classList.add('pop')}});if(f&&v>=g.g[0])f.classList.add('hi');if(f&&v>=g.g[1])f.classList.add('top');if(v>=g.g[2]&&!RW.fin){RW.fin=1;setTimeout(rwEnd,500)}};
  var stop=GAMEFN[g.id](RW.cv,RW.cx,RW.W,RW.H,score,function(){rwDrama()},document.getElementById('rwctl'));
  RW.stop=function(){clearInterval(tick);stop()};
}
function rwDrama(){var me=RW;if(!me||me.done||me.dying)return;me.dying=true;var cv=me.cv,cx=me.cx,W=me.W,H=me.H,dpr=cv.width/W,oc=document.createElement('canvas');oc.width=cv.width;oc.height=cv.height;oc.getContext('2d').drawImage(cv,0,0);shakeBox();
  var N=5,M=7,tw=W/N,th=H/M,tiles=[],i,j,fr=0,last=performance.now();for(j=0;j<M;j++)for(i=0;i<N;i++)tiles.push({x:i*tw,y:j*th,vx:(Math.random()-.5)*4+(i-N/2)*.9,vy:-Math.random()*4-1,dx:0,dy:0,rot:0,vr:(Math.random()-.5)*.2,d:Math.random()*10});
  function step(now){if(RW!==me||me.done)return;fr+=Math.min(3,(now-last)/16.667);last=now;cx.setTransform(dpr,0,0,dpr,0,0);
    cx.fillStyle='#14091F';cx.fillRect(0,0,W,H);var g=cx.createRadialGradient(W/2,H/2,5,W/2,H/2,W*.8);g.addColorStop(0,'rgba(255,40,60,'+Math.min(.5,fr*.02)+')');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.fillRect(0,0,W,H);
    if(fr<24){var sh=(24-fr)/24*12,z=1+fr*.005;cx.save();cx.translate(W/2+(Math.random()-.5)*sh,H/2+(Math.random()-.5)*sh);cx.scale(z,z);cx.translate(-W/2,-H/2);cx.drawImage(oc,0,0,W,H);cx.fillStyle='rgba(255,0,0,'+Math.min(.4,fr*.025)+')';cx.fillRect(0,0,W,H);if(fr<4){cx.fillStyle='rgba(255,255,255,'+(.9-fr*.22)+')';cx.fillRect(0,0,W,H)}cx.restore()}
    else tiles.forEach(function(t){var q=fr-24-t.d;if(q<0)q=0;else{t.vy+=.55;t.dy+=t.vy;t.dx+=t.vx;t.rot+=t.vr}cx.save();cx.translate(t.x+tw/2+t.dx,t.y+th/2+t.dy);cx.rotate(t.rot);cx.drawImage(oc,t.x*dpr,t.y*dpr,tw*dpr,th*dpr,-tw/2,-th/2,tw+.6,th+.6);cx.fillStyle='rgba(255,0,0,.3)';cx.fillRect(-tw/2,-th/2,tw+.6,th+.6);cx.restore()});
    if(fr>20){var k=Math.min(1,(fr-20)/12),sc=1+Math.sin(k*Math.PI)*.35;cx.save();cx.translate(W/2,H*.48);cx.scale(sc*k,sc*k);cx.rotate(-.06);cx.font='bold '+Math.floor(W*.15)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=8;cx.strokeStyle='#B71C1C';cx.strokeText('GAME OVER',0,0);cx.fillStyle='#fff';cx.fillText('GAME OVER',0,0);cx.font=Math.floor(W*.14)+'px sans-serif';cx.fillText('💥',0,W*.17);cx.restore()}
    if(fr>96){rwEnd();return}requestAnimationFrame(step)}
  requestAnimationFrame(step)}
function rwEnd(){
  if(!RW||RW.done)return;RW.done=true;RW.stop();
  var s=RW.score,g=RW.g,xp=s>=g.g[2]?300:s>=g.g[1]?150:s>=g.g[0]?50:0;
  if(xp>0&&!RW.test){addXp(RW.child,xp);toast('+'+xp+' Extra-XP')}
  var m=document.getElementById('rwmsg');
  if(RW.gc){gcEnd(m,s);return}
  if(m)m.innerHTML=(xp?'<b class="rwwin">🎉 +'+xp+' XP!</b>':'<b>Knapp! Beim nächsten Mal klappt es.</b>')+'<br><small>'+s+' Punkte · weiter geht\'s mit Lernen</small>';
  var me=RW;setTimeout(function(){if(RW===me){var tst=me.test;closeReward();if(tst)showPicker()}},2600);
}
function closeReward(){if(RW&&!RW.done&&RW.stop)RW.stop();RW=null;var o=document.getElementById('rwd');if(o)o.remove();document.body.classList.remove('rwopen')}
function rr(cx,x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath()}
function grad(cx,x0,y0,x1,y1,a,b){var g=cx.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function glossBlock(cx,x,y,s,c1,c2,r){cx.save();cx.shadowColor='rgba(0,0,0,.25)';cx.shadowBlur=s*.12;cx.shadowOffsetY=s*.06;rr(cx,x,y,s,s,r||s*.25);cx.fillStyle=grad(cx,x,y,x,y+s,c1,c2);cx.fill();cx.restore();cx.save();rr(cx,x+s*.12,y+s*.1,s*.76,s*.28,s*.14);cx.fillStyle='rgba(255,255,255,.35)';cx.fill();cx.restore()}
var GSLOW=.72;
function loopRun(step){var alive=true,last=performance.now(),raf;function t(now){if(!alive)return;var f=Math.min(3,(now-last)/16.667)*GSLOW;last=now;step(f);if(alive)raf=requestAnimationFrame(t)}raf=requestAnimationFrame(t);return {stop:function(){alive=false;cancelAnimationFrame(raf)}}}

function gzHTML(g){var a=g.gs,h='';
  if(a==='tap')h='<div class="gz gz-tap"><i class="gzr"></i><b class="gzf">👆</b></div>';
  else if(a==='lr')h='<div class="gz gz-lr"><b class="ga l">◀</b><b class="gzf">👆</b><b class="ga r">▶</b></div>';
  else if(a==='drag')h='<div class="gz gz-lr gz-drag"><b class="ga l">◀</b><b class="gzf">☝️</b><b class="ga r">▶</b></div>';
  else if(a==='s4')h='<div class="gz gz-s4"><b class="ga u">▲</b><b class="ga l">◀</b><b class="gzc">👆</b><b class="ga r">▶</b><b class="ga d">▼</b></div>';
  else if(a==='tet')h='<div class="gz gz-s4"><b class="ga u">⟳</b><b class="ga l">◀</b><b class="gzc">👆</b><b class="ga r">▶</b><b class="ga d">⤓</b></div>';
  else if(a==='flick')h='<div class="gz gz-flick"><b class="ga u">⬆</b><b class="gzf">☝️</b></div>';
  return h+'<p class="gzl">'+(g.lb||'')+'</p>'}
function gpad(ctl,keys){if(!ctl)return;var M={U:['ArrowUp','▲'],D:['ArrowDown','▼'],L:['ArrowLeft','◀'],R:['ArrowRight','▶']};
  ctl.innerHTML='<div class="gpad gp'+keys.length+'">'+keys.map(function(k){return '<button class="gp-'+k+'" data-k="'+k+'">'+M[k][1]+'</button>'}).join('')+'</div>';
  ctl.querySelectorAll('button').forEach(function(b){var f=function(e){e.preventDefault();e.stopPropagation();document.dispatchEvent(new KeyboardEvent('keydown',{key:M[b.dataset.k][0],bubbles:true}));b.classList.add('on');setTimeout(function(){b.classList.remove('on')},120)};b.addEventListener('touchstart',f,{passive:false});b.addEventListener('mousedown',f)})}
function bindTap(cv,fn){var d=function(e){var t=e.touches?e.touches[0]:e,r=cv.getBoundingClientRect();if(e.cancelable)e.preventDefault();fn(t.clientX-r.left,t.clientY-r.top)};var k=function(e){if(e.key===' '||e.key==='ArrowUp'){e.preventDefault();fn(null)}};cv.addEventListener('touchstart',d,{passive:false});cv.addEventListener('mousedown',d);document.addEventListener('keydown',k);return function(){cv.removeEventListener('touchstart',d);cv.removeEventListener('mousedown',d);document.removeEventListener('keydown',k)}}

function bindSwipe(cv,fn,steps,opt){var st=null;
  function pt(e){var t=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0])||e;return {x:t.clientX,y:t.clientY}}
  function dn(e){if(e.cancelable)e.preventDefault();var p=pt(e),r=cv.getBoundingClientRect();st={x:p.x,y:p.y,ox:p.x,oy:p.y,rx:p.x-r.left,ry:p.y-r.top,mv:false,fired:false,rx0:p.x,ry0:p.y}}
  function mv(e){if(!st)return;if(e.cancelable)e.preventDefault();var p=pt(e),dx=p.x-st.ox,dy=p.y-st.oy,T=14;
    if(opt){var ax=Math.abs(p.x-st.rx0),ay=Math.abs(p.y-st.ry0);
      if(!st.axis){if(Math.max(ax,ay)<12)return;st.axis=(ay>ax*2)?'y':(ax>=ay?'x':null);st.mv=true;if(!st.axis)return}
      if(st.axis==='x'){var Tx=opt.tx||26;while(Math.abs(dx)>=Tx){st.mv=true;st.fired=true;fn(dx<0?'L':'R');var sg=dx<0?-1:1;st.ox+=sg*Tx;dx=p.x-st.ox}}
      else if(!st.done){var dyt=p.y-st.ry0;if(Math.abs(dyt)>=(opt.ty||60)){st.mv=true;st.fired=true;st.done=true;fn(dyt<0?'U':'D')}}
      return}
    if(Math.abs(dx)>=T&&Math.abs(dx)>=Math.abs(dy)*.8){st.mv=true;st.fired=true;fn(dx<0?'L':'R');st.ox=p.x;st.oy=p.y;if(!steps)st.ox=1e9*(dx<0?-1:1)}
    else if(Math.abs(dy)>=T&&Math.abs(dy)>Math.abs(dx)){st.mv=true;st.fired=true;fn(dy<0?'U':'D');st.oy=p.y;st.ox=p.x;if(!steps)st.oy=1e9*(dy<0?-1:1)}}
  function up(e){if(!st)return;var s0=st;st=null;if(!s0.fired&&!s0.mv)fn('tap',s0.rx,s0.ry)}
  cv.addEventListener('touchstart',dn,{passive:false});cv.addEventListener('touchmove',mv,{passive:false});cv.addEventListener('touchend',up);cv.addEventListener('touchcancel',function(){st=null});
  cv.addEventListener('mousedown',dn);window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);
  var k=function(e){var m={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D'}[e.key];if(m){e.preventDefault();fn(m)}else if(e.key===' '){e.preventDefault();fn('tap',null,null)}};document.addEventListener('keydown',k);
  return function(){cv.removeEventListener('touchstart',dn);cv.removeEventListener('touchmove',mv);cv.removeEventListener('touchend',up);cv.removeEventListener('mousedown',dn);window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);document.removeEventListener('keydown',k)}}
function shakeBox(){var b=document.querySelector('.rwbox'),c=document.querySelector('.rwcvw');if(b){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}if(c){c.classList.add('hurt');setTimeout(function(){c.classList.remove('hurt')},450)}}
function hearts(cx,n,w,mx){if(RW){if(RW.hl!=null&&n<RW.hl)shakeBox();RW.hl=n}cx.font=Math.floor(w*.06)+'px sans-serif';cx.textBaseline='top';cx.textAlign='left';for(var i=0;i<(mx||3);i++)cx.fillText(i<n?'❤️':'🖤',w*.025+i*w*.075,w*.02)}
function bigScore(cx,w,s){cx.save();cx.font='bold '+Math.floor(w*.11)+'px sans-serif';cx.textAlign='right';cx.textBaseline='top';cx.lineWidth=5;cx.strokeStyle='rgba(0,0,0,.35)';cx.strokeText(s,w-w*.04,w*.02);cx.fillStyle='#fff';cx.fillText(s,w-w*.04,w*.02);cx.restore()}
function cloud(cx,x,y,r){cx.beginPath();cx.arc(x,y,r,0,7);cx.arc(x+r*.9,y+r*.15,r*.8,0,7);cx.arc(x-r*.9,y+r*.2,r*.7,0,7);cx.fill()}
function burst(P,x,y,n,cols,sp){for(var i=0;i<n;i++)P.push({x:x,y:y,vx:(Math.random()-.5)*sp,vy:(Math.random()-.8)*sp,l:38+Math.random()*22,c:cols[Math.floor(Math.random()*cols.length)],s:2+Math.random()*3})}
function stepP(cx,P,f){for(var i=P.length-1;i>=0;i--){var p=P[i];p.x+=p.vx*f;p.y+=p.vy*f;p.vy+=.16*f;p.l-=f;if(p.l<=0){P.splice(i,1);continue}cx.globalAlpha=Math.min(1,p.l/25);cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s)}cx.globalAlpha=1}
function hills(cx,w,h,y,amp,off,freq,c1,c2){cx.fillStyle=grad(cx,0,y-amp,0,y+amp*2,c1,c2);cx.beginPath();cx.moveTo(0,h);for(var x=0;x<=w+6;x+=6)cx.lineTo(x,y-amp*(.5+.5*Math.sin((x+off)*freq)+.25*Math.sin((x+off)*freq*2.3+1)));cx.lineTo(w,h);cx.fill()}
function twinkle(cx,w,maxY,t,n){for(var i=0;i<n;i++){cx.globalAlpha=.3+.7*Math.abs(Math.sin(t*.05+i*1.7));cx.fillStyle='#fff';var r=1+(i%3)*.8;cx.fillRect((i*137.5)%w,(i*89.3)%maxY,r,r)}cx.globalAlpha=1}
function glow(cx,x,y,r,c){var g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()}
function floatTxt(cx,F,f){for(var i=F.length-1;i>=0;i--){var o=F[i];o.y-=.8*f;o.l-=f;if(o.l<=0){F.splice(i,1);continue}cx.globalAlpha=Math.min(1,o.l/20);cx.font='bold 22px sans-serif';cx.textAlign='center';cx.lineWidth=4;cx.strokeStyle='rgba(0,0,0,.4)';cx.strokeText(o.t,o.x,o.y);cx.fillStyle=o.c||'#fff';cx.fillText(o.t,o.x,o.y)}cx.globalAlpha=1}
var GAMEFN={
flappy:function(cv,cx,w,h,score,over){
  var y=h/2,v=0,s=0,lives=3,inv=0,bx=w*.25,r=w*.045,fr=0,P=[],G=RW.g.g,dx=w*.035,cols=[],cc=h*.5,cvv=0,gap0=h*.58,pil=[],nextP=w*1.3,scrolled=0,nextS=w*.9,i;
  var unb=bindTap(cv,function(){v=-h*.0125});
  function addCol(x){var wd=scrolled+x,calm=wd<w*1.2,g=gap0*(calm?1.1:(1+.12*Math.sin(wd*.011)))*Math.max(.6,1-s*.012);
    if(!calm){cvv+=(Math.random()-.5)*h*.0065;cvv*=.97}cc+=cvv;var lo=g/2+h*.07,hi=h*.93-g/2-h*.03;if(cc<lo){cc=lo;cvv=Math.abs(cvv)}if(cc>hi){cc=hi;cvv=-Math.abs(cvv)}
    cols.push({x:x,t:cc-g/2+(calm?0:Math.random()*h*.035),b:cc+g/2-(calm?0:Math.random()*h*.035)})}
  for(i=-1;i<=w/dx+2;i++)addCol(i*dx);
  function colAt(x){var k2=0;while(k2<cols.length-2&&cols[k2+1].x<=x)k2++;var a=cols[k2],b=cols[k2+1],u=Math.max(0,Math.min(1,(x-a.x)/dx));return {t:a.t+(b.t-a.t)*u,b:a.b+(b.b-a.b)*u}}
  function rockPath(top){cx.beginPath();cx.moveTo(cols[0].x,top?0:h);for(var k=0;k<cols.length;k++)cx.lineTo(cols[k].x,top?cols[k].t:cols[k].b);cx.lineTo(cols[cols.length-1].x,top?0:h);cx.closePath()}
  function rock(top){var y0=top?0:h*.35,y1=top?h*.65:h;rockPath(top);cx.fillStyle=grad(cx,0,y0,0,y1,top?'#4A2C17':'#7A4B27',top?'#8A5A32':'#3A2210');cx.fill();cx.save();rockPath(top);cx.clip();cx.strokeStyle='rgba(30,15,5,.28)';cx.lineWidth=3;for(var k=0;k<7;k++){cx.beginPath();for(var x=0;x<=w;x+=18){var yy=(top?h*.04:h*.5)+k*h*.075+Math.sin((x+scrolled)*.02+k*1.7)*h*.012;x?cx.lineTo(x,yy):cx.moveTo(x,yy)}cx.stroke()}cx.fillStyle='rgba(255,220,170,.07)';for(k=0;k<26;k++){cx.beginPath();cx.ellipse(((k*83-scrolled)%(w+60)+w+60)%(w+60)-20,(top?h*.06:h*.6)+((k*47)%(h*.3)),9+(k%4)*3,5,0,0,7);cx.fill()}cx.restore();
    cx.strokeStyle='#2A1608';cx.lineWidth=4;cx.lineJoin='round';cx.beginPath();for(var k2=0;k2<cols.length;k2++){var yy2=top?cols[k2].t:cols[k2].b;k2?cx.lineTo(cols[k2].x,yy2):cx.moveTo(cols[k2].x,yy2)}cx.stroke();cx.strokeStyle='rgba(255,210,150,.5)';cx.lineWidth=2;cx.beginPath();for(k2=0;k2<cols.length;k2++){var yy3=(top?cols[k2].t:cols[k2].b)+(top?-4:4);k2?cx.lineTo(cols[k2].x,yy3):cx.moveTo(cols[k2].x,yy3)}cx.stroke()}
  function jag(base,dir,amp,off,fq,c){cx.fillStyle=c;cx.beginPath();cx.moveTo(0,dir>0?0:h);for(var x=0;x<=w+14;x+=14)cx.lineTo(x,base+dir*amp*(1-Math.abs(Math.sin((x+off)*fq))));cx.lineTo(w+14,dir>0?0:h);cx.fill()}
  var L=loopRun(function(f){fr+=f;v+=h*.00072*f;y+=v*f;inv-=f;var sp=w*.0085*f;scrolled+=sp;cols.forEach(function(c){c.x-=sp});while(cols[1].x<-dx)cols.shift();while(cols[cols.length-1].x<w+dx)addCol(cols[cols.length-1].x+dx);
    nextS-=sp;if(nextS<=0){nextS=w*.9;s++;score(s);burst(P,bx,y,16,['#fff','#FFE0B2','#FFF59D'],7)}
    nextP-=sp;if(nextP<=0){nextP=w*(.8+Math.random()*.45);pil.push({x:w+dx*2,ty:['both','top','bottom'][Math.floor(Math.random()*3)],hw:w*.07})}
    pil.forEach(function(p){p.x-=sp});pil=pil.filter(function(p){return p.x>-w*.15});
    var k=0;while(k<cols.length-2&&cols[k+1].x<=bx)k++;var c0=cols[k],c1=cols[k+1],u=(bx-c0.x)/dx,ct=c0.t+(c1.t-c0.t)*u,cb=c0.b+(c1.b-c0.b)*u;
    pil.forEach(function(p){var dd=Math.abs(p.x-bx);if(dd<p.hw){var pc=colAt(p.x),dp=(pc.b-pc.t)*(p.ty==='both'?.2:.3)*(1-dd/p.hw);if(p.ty!=='bottom')ct+=dp;if(p.ty!=='top')cb-=dp}});
    if((y-r*.75<ct||y+r*.75>cb)&&inv<=0){lives--;inv=70;y=(ct+cb)/2;v=0;burst(P,bx,y,22,['#f44','#fff','#8D6E63'],9);if(lives<=0){L.stop();unb();over();return}}
    var G2=Math.min(1,s/G[2]),ex=w*1.0,ey=h*.5,er=w*(.13+.28*G2);
    cx.fillStyle=grad(cx,0,0,0,h,'#4A2E1A','#25150B');cx.fillRect(0,0,w,h);
    glow(cx,ex,ey,er*2.6,'rgba(255,225,150,'+(.35+.3*G2)+')');cx.fillStyle=grad(cx,ex-er,ey-er,ex,ey+er,'#FFF6D0','#9ED8FF');cx.beginPath();cx.arc(ex,ey,er,0,7);cx.fill();
    cx.fillStyle='rgba(255,235,170,'+(.05+.08*G2)+')';for(i=0;i<5;i++){cx.beginPath();cx.moveTo(ex,ey);cx.lineTo(ex-w*1.4,ey-h*.1+(i-2)*h*.24);cx.lineTo(ex-w*1.4,ey+h*.03+(i-2)*h*.24);cx.fill()}
    jag(0,1,h*.3,scrolled*.35,.009,'#5B391F');jag(h,-1,h*.28,scrolled*.35+60,.01,'#5B391F');jag(0,1,h*.22,scrolled*.6,.013,'#3F2615');jag(h,-1,h*.2,scrolled*.6+40,.014,'#3F2615');
    for(i=0;i<5;i++){var tx=((i*170-scrolled*.5)%(w+120)+w+120)%(w+120)-40,ty=h*(.3+(i%3)*.17);glow(cx,tx,ty,w*.13,'rgba(255,150,40,'+(.45+.2*Math.sin(fr*.2+i))+')');cx.fillStyle='#4E2F16';cx.fillRect(tx-2,ty,4,h*.05);cx.fillStyle='#FFB300';cx.beginPath();cx.ellipse(tx,ty-3,5,9+Math.sin(fr*.3+i)*2,0,0,7);cx.fill()}
    cx.fillStyle='rgba(255,220,160,.35)';for(i=0;i<14;i++)cx.fillRect(((i*91-scrolled*.8)%(w+30)+w+30)%(w+30),(i*57+fr*.3)%h,2,2);
    rock(true);rock(false);
    pil.forEach(function(p){var pc=colAt(p.x),d=(pc.b-pc.t)*(p.ty==='both'?.2:.3);function cone(y0,dir){cx.fillStyle=grad(cx,p.x-p.hw,0,p.x+p.hw,0,'#7A4B27','#3A2210');cx.beginPath();cx.moveTo(p.x-p.hw,y0);cx.lineTo(p.x+p.hw,y0);cx.lineTo(p.x+p.hw*.12,y0+dir*d);cx.lineTo(p.x-p.hw*.1,y0+dir*d);cx.closePath();cx.fill();cx.strokeStyle='#2A1608';cx.lineWidth=3.5;cx.lineJoin='round';cx.stroke();cx.strokeStyle='rgba(255,210,150,.5)';cx.lineWidth=2;cx.beginPath();cx.moveTo(p.x-p.hw*.55,y0+dir*4);cx.lineTo(p.x-p.hw*.05,y0+dir*(d-3));cx.stroke()}
      if(p.ty!=='bottom')cone(pc.t-2,1);if(p.ty!=='top')cone(pc.b+2,-1)});
    if(inv<=0||Math.floor(inv/6)%2){cx.save();cx.translate(bx,y);cx.rotate(Math.max(-.5,Math.min(1,v/(h*.02))));glow(cx,0,0,r*2.6,'rgba(255,255,255,.35)');cx.shadowColor='rgba(255,255,255,.7)';cx.shadowBlur=10;cx.fillStyle=grad(cx,0,-r,0,r,'#FFFFFF','#CFD8E8');cx.beginPath();cx.ellipse(0,0,r*1.25,r,0,0,7);cx.fill();cx.shadowBlur=0;cx.fillStyle='#fff';cx.beginPath();cx.ellipse(r*.1,r*.35,r*.75,r*.45,.1,0,7);cx.fill();cx.fillStyle='#B3C9EA';cx.save();cx.translate(-r*.3,0);cx.rotate(Math.sin(fr*.45)*.7);cx.beginPath();cx.ellipse(0,0,r*.8,r*.38,-.4,0,7);cx.fill();cx.strokeStyle='rgba(120,150,200,.6)';cx.lineWidth=1.5;cx.stroke();cx.restore();cx.fillStyle='#fff';cx.beginPath();cx.arc(r*.55,-r*.3,r*.4,0,7);cx.fill();cx.strokeStyle='#CFD8E8';cx.lineWidth=1;cx.stroke();cx.fillStyle='#111';cx.beginPath();cx.arc(r*.65,-r*.3,r*.17,0,7);cx.fill();cx.fillStyle='#FF9800';cx.beginPath();cx.moveTo(r*1.1,-r*.1);cx.lineTo(r*1.75,r*.08);cx.lineTo(r*1.1,r*.3);cx.fill();cx.restore()}
    stepP(cx,P,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
runner:function(cv,cx,w,h,score,over){
  var gy=h*.8,P0=h*.1,px=w*.34,y=0,vy=0,s=0,lives=3,inv=0,off=0,fr=0,P=[],F=[],G=h*.0008,items=[],next=w*.55,GG=RW.g.g,i,wx=w*.02,dying=false,kd=0;
  var unb=bindTap(cv,function(){if(y<=1&&!dying){vy=h*.0245;burst(P,px,gy,8,['#F3DFA8','#fff'],3)}});
  function obj(it){var x=it.x,wd=it.wd,ht=it.ht||0;cx.save();cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(x+wd/2,gy+3,wd*.7,h*.012,0,0,7);cx.fill();cx.shadowColor='#fff';cx.shadowBlur=18;
    if(it.k==='chair'){cx.strokeStyle='#5D4037';cx.lineWidth=4;cx.beginPath();cx.moveTo(x+wd*.1,gy);cx.lineTo(x+wd*.35,gy-ht*.4);cx.moveTo(x+wd*.9,gy);cx.lineTo(x+wd*.65,gy-ht*.4);cx.stroke();cx.fillStyle='#E53935';cx.beginPath();cx.moveTo(x,gy-ht*.3);cx.lineTo(x+wd*.2,gy-ht);cx.lineTo(x+wd*.42,gy-ht);cx.lineTo(x+wd*.34,gy-ht*.34);cx.fill();cx.shadowBlur=0;cx.fillStyle='#fff';cx.beginPath();cx.moveTo(x+wd*.08,gy-ht*.55);cx.lineTo(x+wd*.12,gy-ht*.7);cx.lineTo(x+wd*.3,gy-ht*.7);cx.lineTo(x+wd*.27,gy-ht*.5);cx.fill();cx.fillStyle='#E53935';rr(cx,x,gy-ht*.38,wd,ht*.14,4);cx.fill();cx.fillStyle='#fff';cx.fillRect(x+wd*.3,gy-ht*.38,wd*.14,ht*.14);cx.fillRect(x+wd*.62,gy-ht*.38,wd*.14,ht*.14)}
    else if(it.k==='castle'){cx.fillStyle=grad(cx,0,gy-ht,0,gy,'#F6D58A','#CFA24F');rr(cx,x,gy-ht*.6,wd,ht*.6,5);cx.fill();rr(cx,x+wd*.05,gy-ht*.9,wd*.28,ht*.5,3);cx.fill();rr(cx,x+wd*.67,gy-ht*.9,wd*.28,ht*.5,3);cx.fill();cx.shadowBlur=0;for(var q=0;q<3;q++){cx.fillRect(x+wd*.05+q*wd*.1,gy-ht*1.0,wd*.08,ht*.12);cx.fillRect(x+wd*.67+q*wd*.1,gy-ht*1.0,wd*.08,ht*.12)}cx.fillStyle='#8D6E63';cx.fillRect(x+wd*.45,gy-ht*.35,wd*.1,ht*.35);cx.strokeStyle='#5D4037';cx.lineWidth=2;cx.beginPath();cx.moveTo(x+wd*.5,gy-ht*.6);cx.lineTo(x+wd*.5,gy-ht*1.25);cx.stroke();cx.fillStyle='#E53935';cx.beginPath();cx.moveTo(x+wd*.5,gy-ht*1.25);cx.lineTo(x+wd*.8,gy-ht*1.1);cx.lineTo(x+wd*.5,gy-ht*.95);cx.fill()}
    else if(it.k==='log'){cx.fillStyle=grad(cx,x,0,x+wd,0,'#8D6E63','#4E342E');cx.beginPath();cx.moveTo(x+wd*.2,gy);cx.lineTo(x+wd*.35,gy-ht);cx.lineTo(x+wd*.65,gy-ht);cx.lineTo(x+wd*.8,gy);cx.fill();cx.shadowBlur=0;cx.strokeStyle='rgba(0,0,0,.25)';cx.lineWidth=2;for(var r2=1;r2<5;r2++){cx.beginPath();cx.moveTo(x+wd*.28,gy-ht*r2/5);cx.lineTo(x+wd*.72,gy-ht*r2/5);cx.stroke()}cx.fillStyle='#43A047';[[-.9,-.25],[0,-.55],[.9,-.25],[-.5,-.45],[.5,-.45]].forEach(function(l){cx.beginPath();cx.moveTo(x+wd*.5,gy-ht);cx.quadraticCurveTo(x+wd*(.5+l[0]*.6),gy-ht*(1+l[1]*1.5),x+wd*(.5+l[0]*1.2),gy-ht*(1+l[1]*.2));cx.quadraticCurveTo(x+wd*(.5+l[0]*.6),gy-ht*(1+l[1]*.8),x+wd*.5,gy-ht);cx.fill()});cx.fillStyle='#5D4037';cx.beginPath();cx.arc(x+wd*.4,gy-ht*.97,wd*.07,0,7);cx.arc(x+wd*.6,gy-ht*.97,wd*.07,0,7);cx.fill()}
    else if(it.k==='crab'){var cxe=x+wd/2,cye=gy-ht*.5,cl=Math.sin(fr*.3)*ht*.15;cx.fillStyle='#E53935';cx.beginPath();cx.ellipse(cxe,cye,wd*.5,ht*.42,0,0,7);cx.fill();cx.shadowBlur=0;cx.fillStyle='#C62828';cx.beginPath();cx.arc(x+wd*.05,cye-ht*.35-cl,ht*.24,0,7);cx.arc(x+wd*.95,cye-ht*.35+cl,ht*.24,0,7);cx.fill();cx.strokeStyle='#C62828';cx.lineWidth=2.5;for(var lg=0;lg<3;lg++){cx.beginPath();cx.moveTo(cxe-wd*.3,cye+ht*.1);cx.lineTo(cxe-wd*.55,gy-lg*ht*.1);cx.moveTo(cxe+wd*.3,cye+ht*.1);cx.lineTo(cxe+wd*.55,gy-lg*ht*.1);cx.stroke()}cx.fillStyle='#fff';cx.beginPath();cx.arc(cxe-wd*.15,cye-ht*.42,ht*.12,0,7);cx.arc(cxe+wd*.15,cye-ht*.42,ht*.12,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(cxe-wd*.15,cye-ht*.42,ht*.06,0,7);cx.arc(cxe+wd*.15,cye-ht*.42,ht*.06,0,7);cx.fill()}
    else{var gyy=gy-it.yb-ht*.5,fl=Math.sin(fr*.3)*ht*.5,cxe2=x+wd/2;cx.fillStyle='#fff';cx.beginPath();cx.ellipse(cxe2,gyy,wd*.4,ht*.28,0,0,7);cx.fill();cx.beginPath();cx.moveTo(cxe2-wd*.1,gyy);cx.lineTo(cxe2-wd*.3,gyy-ht*.6-fl);cx.lineTo(cxe2+wd*.15,gyy);cx.lineTo(cxe2+wd*.3,gyy-ht*.6+fl);cx.fill();cx.shadowBlur=0;cx.fillStyle='#B0BEC5';cx.beginPath();cx.moveTo(cxe2-wd*.1,gyy);cx.lineTo(cxe2-wd*.3,gyy-ht*.6-fl);cx.lineTo(cxe2-wd*.15,gyy-ht*.1);cx.fill();cx.fillStyle='#FFB300';cx.beginPath();cx.moveTo(cxe2-wd*.38,gyy-ht*.05);cx.lineTo(cxe2-wd*.6,gyy+ht*.05);cx.lineTo(cxe2-wd*.38,gyy+ht*.12);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(cxe2-wd*.26,gyy-ht*.08,2.2,0,7);cx.fill()}
    cx.restore()}
  function guy(){cx.save();cx.translate(px,gy-y);cx.scale(.88,.88);var run=y>2?0:Math.sin(fr*.55),air=y>2;cx.lineCap='round';
    cx.strokeStyle='#F2B98F';cx.lineWidth=P0*.14;cx.beginPath();cx.moveTo(-P0*.08,-P0*.42);cx.lineTo(air?-P0*.2:run*P0*.26,air?-P0*.2:-Math.max(0,-run)*P0*.14);cx.moveTo(P0*.08,-P0*.42);cx.lineTo(air?P0*.22:-run*P0*.26,air?-P0*.12:-Math.max(0,run)*P0*.14);cx.stroke();
    cx.fillStyle='#fff';cx.beginPath();cx.ellipse(air?-P0*.2:run*P0*.26,air?-P0*.2:-Math.max(0,-run)*P0*.14,P0*.1,P0*.05,0,0,7);cx.ellipse(air?P0*.22:-run*P0*.26,air?-P0*.12:-Math.max(0,run)*P0*.14,P0*.1,P0*.05,0,0,7);cx.fill();
    cx.fillStyle='#F2B98F';rr(cx,-P0*.22,-P0*.98,P0*.44,P0*.5,P0*.14);cx.fill();
    cx.fillStyle='#E53935';rr(cx,-P0*.24,-P0*.58,P0*.48,P0*.24,P0*.08);cx.fill();cx.fillStyle='#fff';cx.fillRect(-P0*.12,-P0*.58,P0*.07,P0*.24);cx.fillRect(P0*.07,-P0*.58,P0*.07,P0*.24);
    var aw=Math.sin(fr*.6)*P0*.14;cx.strokeStyle='#F2B98F';cx.lineWidth=P0*.11;cx.beginPath();cx.moveTo(-P0*.2,-P0*.88);cx.lineTo(-P0*.4,-P0*(1.12)-aw);cx.moveTo(P0*.2,-P0*.88);cx.lineTo(P0*.4,-P0*1.12+aw);cx.stroke();
    cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(0,-P0*1.15,P0*.24,0,7);cx.fill();cx.fillStyle='#6D4C41';cx.beginPath();cx.arc(0,-P0*1.2,P0*.25,Math.PI*1.05,Math.PI*1.95);cx.fill();
    cx.fillStyle='#fff';cx.beginPath();cx.arc(P0*.08,-P0*1.17,P0*.1,0,7);cx.arc(P0*.2,-P0*1.15,P0*.08,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(P0*.11,-P0*1.17,P0*.045,0,7);cx.arc(P0*.22,-P0*1.15,P0*.04,0,7);cx.fill();cx.fillStyle='#4A1010';cx.beginPath();cx.ellipse(P0*.16,-P0*1.03,P0*.06,P0*.09,0,0,7);cx.fill();
    cx.fillStyle='#4FC3F7';cx.beginPath();cx.arc(-P0*.3,-P0*1.3+Math.sin(fr*.2)*3,P0*.04,0,7);cx.fill();cx.restore()}
  var L=loopRun(function(f){fr+=f;inv-=f;var k=(s>=GG[0]?1:0)+(s>=GG[1]?1:0),sp=w*.0068*Math.pow(1.25,k);vy-=G*f;y+=vy*f;if(y<=0){y=0;vy=0}off+=sp*f;next-=sp*f;
    var wt=dying?px+w*.3:w*(.02+(3-lives)*.08)+Math.sin(fr*.04)*w*.012;wx+=(wt-wx)*Math.min(1,(dying?.08:.05)*f);
    if(dying){kd+=f;if(wx>px-P0*.1||kd>80){L.stop();unb();over();return}}
    if(!dying&&next<=0){var r=Math.random(),sz=h*.118;if(r<.24)items.push({k:'chair',x:w+10,wd:sz*1.1,ht:sz*.85,ok:false});else if(r<.48)items.push({k:'castle',x:w+10,wd:sz*1.1,ht:sz*.75,ok:false});else if(r<.64)items.push({k:'log',x:w+10,wd:sz*.8,ht:sz*1.5,ok:false});else if(r<.82)items.push({k:'crab',x:w+10,wd:sz*.9,ht:sz*.6,ok:false});else items.push({k:'gull',x:w+10,wd:sz*1.0,ht:sz*.6,yb:sz*1.15,ok:false});next=w*(.5+Math.random()*.45)}
    items.forEach(function(it){it.x-=sp*f+(it.k==='crab'?w*.0028*f:it.k==='gull'?w*.002*f:0);if(!it.ok&&it.x+it.wd<px-P0*.3){it.ok=true;s++;score(s);burst(P,px,gy-y-P0,10,['#FFD54F','#fff','#80D8FF'],5)}});
    items=items.filter(function(it){if(it.x<-w*.3)return false;if(dying)return true;var ox=px+P0*.3>it.x+it.wd*.1&&px-P0*.3<it.x+it.wd*.9,hit=false;
      if(it.k==='gull')hit=ox&&y+P0*1.2>it.yb&&y<it.yb+it.ht;else hit=ox&&y<it.ht*.9;
      if(hit){if(it.k==='crab'&&vy<0&&y>it.ht*.35){vy=h*.016;if(!it.ok){it.ok=true;s++;score(s)}burst(P,it.x+it.wd/2,gy-it.ht/2,16,['#EF5350','#fff','#FFEB3B'],8);F.push({x:it.x+it.wd/2,y:gy-it.ht,t:'+1',l:34,c:'#FFEB3B'});return false}
        if(inv<=0){lives--;inv=70;vy=h*.01;burst(P,px,gy-y-P0/2,18,['#FF5252','#fff','#4FC3F7'],9);F.push({x:px,y:gy-y-P0*1.4,t:'AAAH!',l:50,c:'#FF8A80'});if(lives<=0)dying=true;return false}}return true});
    var sk=cx.createLinearGradient(0,0,0,gy);sk.addColorStop(0,'#2B3F73');sk.addColorStop(.55,'#FF8E5E');sk.addColorStop(1,'#FFD9A6');cx.fillStyle=sk;cx.fillRect(0,0,w,gy);
    glow(cx,w*.72,gy-h*.2,w*.3,'rgba(255,200,120,.8)');cx.fillStyle='#FFE9A8';cx.beginPath();cx.arc(w*.72,gy-h*.2,w*.06,0,7);cx.fill();
    cx.fillStyle='rgba(60,40,80,.55)';[[.1,.1,.09,.2],[.5,.06,.08,.14],[.85,.18,.07,.24]].forEach(function(c){cloud(cx,((c[0]*w-fr*c[3])%(w+140)+w+140)%(w+140)-70,c[1]*h,w*c[2])});
    cx.fillStyle=grad(cx,0,gy-h*.17,0,gy-h*.04,'#1E88E5','#0D47A1');cx.fillRect(0,gy-h*.17,w,h*.13);cx.fillStyle='rgba(255,255,255,.5)';for(i=0;i<16;i++)cx.fillRect(((i*67-off*.1)%w+w)%w,gy-h*.16+((i*13)%(h*.1)),w*.04,2);
    cx.fillStyle='#F2D391';cx.fillRect(0,gy-h*.05,w,h*.06);
    for(i=0;i<3;i++){var ux=((i*190-off*.3)%(w+160)+w+160)%(w+160)-80;cx.strokeStyle='#8D6E63';cx.lineWidth=3;cx.beginPath();cx.moveTo(ux,gy-h*.01);cx.lineTo(ux,gy-h*.15);cx.stroke();cx.fillStyle=i%2?'#FF7043':'#29B6F6';cx.beginPath();cx.arc(ux,gy-h*.15,w*.07,Math.PI,0);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(ux,gy-h*.15,w*.07,Math.PI*1.25,Math.PI*1.4);cx.lineTo(ux,gy-h*.15);cx.fill()}
    for(i=0;i<4;i++){var tx=((i*130-off*.45)%(w+140)+w+140)%(w+140)-70,sw=Math.sin(fr*.04+i)*4;cx.strokeStyle='#6D4C41';cx.lineWidth=8;cx.beginPath();cx.moveTo(tx,gy);cx.quadraticCurveTo(tx+14,gy-h*.15,tx+10+sw,gy-h*.3);cx.stroke();cx.strokeStyle='#2E7D32';cx.lineWidth=5;for(var a=0;a<6;a++){var an=-Math.PI*.95+a*.37;cx.beginPath();cx.moveTo(tx+10+sw,gy-h*.3);cx.quadraticCurveTo(tx+10+sw+Math.cos(an)*30,gy-h*.3+Math.sin(an)*30-8,tx+10+sw+Math.cos(an)*52,gy-h*.3+Math.sin(an)*40+14);cx.stroke()}}
    cx.fillStyle=grad(cx,0,gy,0,h,'#F6DFA2','#D6AD64');cx.fillRect(0,gy,w,h-gy);cx.fillStyle='rgba(120,80,20,.2)';for(i=0;i<50;i++)cx.fillRect(((i*53-off)%w+w)%w,gy+h*.03+((i*29)%(h*.17)),3,2);cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=2;cx.beginPath();cx.moveTo(0,gy);cx.lineTo(w,gy);cx.stroke();
    for(i=0;i<4;i++){var shx=((i*113-off)%(w+40)+w+40)%(w+40)-20;cx.fillStyle=i%2?'#F8BBD0':'#fff';cx.beginPath();cx.arc(shx,gy+h*.1+(i%3)*h*.03,5,Math.PI,0);cx.fill()}
    cx.fillStyle='rgba(255,240,215,.3)';cx.fillRect(0,0,w,gy);items.forEach(obj);
    if(inv<=0||Math.floor(inv/5)%2)guy();
    var wy=gy-h*(.4+.045*(3-lives)),n=20,pts=[];for(var j=0;j<=n;j++){var t=j/n,cu=Math.sin(Math.min(1,t)*Math.PI*.92);pts.push([wx+w*.09*cu+Math.sin(fr*.1+t*7)*w*.008+w*.2*Math.pow(Math.max(0,(t-.68)/.32),1.7),gy-(gy-wy)*t])}
    for(var ly=1;ly>=0;ly--){var ox=ly?-w*.08:0;cx.fillStyle=ly?'#073763':grad(cx,wx-w*.3,0,wx+w*.25,0,'#0B4F8F','#3DB5E6');cx.beginPath();cx.moveTo(-30,h+10);cx.lineTo(wx+ox-w*.02,h+10);cx.quadraticCurveTo(wx+ox+w*.1,gy+(h-gy)*.55,wx+ox+4,gy);pts.forEach(function(p){cx.lineTo(p[0]+ox,p[1]+(ly?h*.03:0))});cx.lineTo(-30,wy);cx.fill()}
    cx.strokeStyle='rgba(255,255,255,.95)';cx.lineWidth=8;cx.lineJoin='round';cx.beginPath();pts.forEach(function(p,j){j?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1])});cx.stroke();cx.strokeStyle='rgba(180,230,255,.7)';cx.lineWidth=14;cx.globalAlpha=.4;cx.stroke();cx.globalAlpha=1;cx.fillStyle='#fff';for(j=10;j<=n;j+=2){cx.beginPath();cx.arc(pts[j][0]+4,pts[j][1],6+(j%3)*3,0,7);cx.fill()}
    cx.fillStyle='rgba(255,255,255,.55)';cx.beginPath();cx.moveTo(wx+4,gy);cx.quadraticCurveTo(wx+w*.1,gy+(h-gy)*.55,wx-w*.02,h+10);cx.lineTo(wx-w*.06,h+10);cx.quadraticCurveTo(wx+w*.04,gy+(h-gy)*.55,wx-w*.02,gy);cx.fill();
    if(fr%2<f){var q=pts[10+Math.floor(Math.random()*10)];P.push({x:q[0]+10,y:q[1],vx:2+Math.random()*3,vy:-Math.random()*2,l:30,c:'#fff',s:3+Math.random()*3})}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
cannon:function(cv,cx,w,h,score,over){
  var s=0,t=0,shots=[],bal=[],P=[],F=[],cool=0,cy=h*.9,R=w*.038,rec=0,flash=0,ammo=10,endT=0,i;
  var LY=[.17,.31,.45],LD=[1,-1,1],RG=[];
  function spawn(li){var nb=bal.filter(function(b){return b.bomb}).length,q=Math.random(),bomb=nb<1&&q<.3,gold=false,d=LD[li],r=gold?R*1.3:R;return{li:li,x:d>0?-r*2:w+r*2,y:h*LY[li],vx:d*w*(bomb?.0042:.0030+Math.random()*.0022),dt:20+Math.random()*40,sp:1,r:r,hue:Math.floor(Math.random()*360),gold:gold,bomb:bomb,ph:Math.random()*6}}
  [0,1,2].forEach(function(li,k){var b=spawn(li);b.x=(k*w*.4+w*.1)%w;bal.push(b)});
  function cxp(){return w/2+Math.sin(t*.02)*w*.36}
  var unb=bindTap(cv,function(){if(cool<=0&&ammo>0){ammo--;shots.push({x:cxp(),y:cy-h*.12,vy:-h*.028,tr:[]});cool=14;rec=8;flash=5;burst(P,cxp(),cy-h*.13,8,['#FFEB3B','#fff','#FF9800'],4)}});
  function bird(b){var d=b.vx>0?1:-1,fl=Math.sin(t*.35+b.ph)*b.r*.6,r=b.r;cx.save();cx.translate(b.x,b.y);cx.scale(d,1);
    var c1,c2,c3;if(b.bomb){c1='hsl('+b.hue+',85%,60%)';c2='hsl('+(b.hue+40)+',80%,45%)';c3='#FFD54F'}else{c1='#33333D';c2='#0C0C10';c3='#6A4C93'}
    if(b.gold)glow(cx,0,0,r*2,'rgba(255,120,0,.45)');
    cx.fillStyle=c2;cx.beginPath();cx.moveTo(-r*.7,0);cx.lineTo(-r*1.4,-r*.3);cx.lineTo(-r*1.3,r*.3);cx.fill();if(b.bomb){cx.fillStyle='#00BFA5';cx.beginPath();cx.moveTo(-r*.8,0);cx.lineTo(-r*1.5,-r*.05);cx.lineTo(-r*1.2,r*.2);cx.fill()}
    cx.fillStyle=grad(cx,0,-r*.6,0,r*.6,c1,c2);cx.beginPath();cx.ellipse(0,0,r*.85,r*.6,0,0,7);cx.fill();cx.fillStyle=b.bomb?'#FFE082':'rgba(255,255,255,.12)';cx.beginPath();cx.ellipse(r*.05,r*.22,r*.5,r*.28,0,0,7);cx.fill();
    cx.fillStyle=b.bomb?'#E53935':'#1A1A22';cx.beginPath();cx.moveTo(-r*.15,-r*.1);cx.quadraticCurveTo(-r*.5,-r*.75-fl,-r*1.0,-r*.5-fl);cx.quadraticCurveTo(-r*.5,-r*.1,-r*.1,r*.1);cx.fill();
    cx.fillStyle=c1;cx.beginPath();cx.arc(r*.6,-r*.25,r*.4,0,7);cx.fill();if(!b.bomb){cx.fillStyle=c3;cx.beginPath();cx.ellipse(r*.38,-r*.02,r*.18,r*.12,.4,0,7);cx.fill()}else{cx.fillStyle='#E53935';cx.beginPath();cx.moveTo(r*.45,-r*.6);cx.lineTo(r*.55,-r*1.0);cx.lineTo(r*.65,-r*.6);cx.moveTo(r*.6,-r*.6);cx.lineTo(r*.75,-r*.95);cx.lineTo(r*.8,-r*.55);cx.fill()}
    cx.fillStyle=b.gold?'#FF1744':'#FFB300';cx.beginPath();cx.arc(r*.72,-r*.3,r*.15,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(r*.76,-r*.3,r*.07,0,7);cx.fill();cx.fillStyle=b.bomb?'#FF9800':'#9E9E9E';cx.beginPath();cx.moveTo(r*.95,-r*.25);cx.lineTo(r*1.35,-r*.12);cx.lineTo(r*.95,r*.0);cx.fill();
    if(b.gold){cx.fillStyle='#FFD54F';cx.font='bold '+r*.55+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.scale(d,1);cx.fillText('×3',-r*.1*d,r*.05)}cx.restore()}
  var L=loopRun(function(f){t+=f;cool-=f;rec=Math.max(0,rec-f);flash-=f;if(ammo<=0&&!shots.length){endT+=f;if(endT>30){L.stop();unb();over();return}}
    bal.forEach(function(b,j){b.dt-=f;if(b.dt<=0){b.dt=25+Math.random()*55;b.sp=Math.random()<.45?2.6:.35;b.ph+=Math.random()*3}b.x+=b.vx*b.sp*f;b.ph+=.09*f;b.y=h*LY[b.li]+Math.sin(b.ph)*h*.05;if(b.vx>0&&b.x>w+b.r*2||b.vx<0&&b.x<-b.r*2)bal[j]=spawn(b.li)});
    shots.forEach(function(sh){sh.tr.push(sh.y);if(sh.tr.length>10)sh.tr.shift();sh.y+=sh.vy*f});
    shots=shots.filter(function(sh){if(sh.y<-10)return false;for(var j=0;j<bal.length;j++){var b=bal[j];if(Math.hypot(sh.x-b.x,sh.y-b.y)<b.r+w*.004){
      if(b.bomb){RG.push({x:b.x,y:b.y,l:0,c:'#FF1744'});burst(P,b.x,b.y,30,['hsl('+b.hue+',90%,60%)','#FFEB3B','#fff','#FF80AB'],11);F.push({x:b.x,y:b.y,t:'Schöner Vogel! -1 Patrone',l:50,c:'#FF5252'});ammo=Math.max(0,ammo-1);bal[j]=spawn(b.li);return false}
      RG.push({x:b.x,y:b.y,l:0,c:'#FFEA00'});burst(P,b.x,b.y,24,['#222','#444','#666','#fff'],9);for(var k=0;k<6;k++)P.push({x:b.x,y:b.y,vx:(Math.random()-.5)*5,vy:-Math.random()*3,l:50,c:'#fff',s:5});F.push({x:b.x,y:b.y,t:'TREFFER!',l:40,c:'#fff'});s+=1;score(s);bal[j]=spawn(b.li);return false}}return true});
    var sk=cx.createLinearGradient(0,0,0,h);sk.addColorStop(0,'#3FA9F5');sk.addColorStop(.65,'#BFE6FF');sk.addColorStop(1,'#E8F7FF');cx.fillStyle=sk;cx.fillRect(0,0,w,h);
    cx.save();cx.translate(w*.82,h*.14);cx.rotate(t*.003);for(i=0;i<12;i++){cx.rotate(Math.PI/6);cx.fillStyle='rgba(255,255,200,.2)';cx.beginPath();cx.moveTo(0,0);cx.lineTo(w*.5,-w*.03);cx.lineTo(w*.5,w*.03);cx.fill()}cx.restore();glow(cx,w*.82,h*.14,w*.2,'rgba(255,255,170,.9)');cx.fillStyle='#FFE45C';cx.beginPath();cx.arc(w*.82,h*.14,w*.06,0,7);cx.fill();
    cx.fillStyle='rgba(255,255,255,.95)';[[.15,.12,.07,.12],[.5,.2,.06,.08],[.78,.3,.05,.15]].forEach(function(c2){cloud(cx,((c2[0]*w+t*c2[3])%(w+140))-70,c2[1]*h,w*c2[2])});
    hills(cx,w,h,h*.62,h*.1,0,.009,'#9ED36A','#6BB04A');hills(cx,w,h,h*.7,h*.08,60,.013,'#6DC24B','#3E9A34');
    cx.fillStyle='#C62828';cx.fillRect(w*.08,h*.54,w*.16,h*.12);cx.fillStyle='#8E0000';cx.beginPath();cx.moveTo(w*.06,h*.54);cx.lineTo(w*.16,h*.46);cx.lineTo(w*.26,h*.54);cx.fill();cx.fillStyle='#fff';cx.fillRect(w*.13,h*.58,w*.06,h*.08);cx.strokeStyle='#8E0000';cx.lineWidth=2;cx.strokeRect(w*.13,h*.58,w*.06,h*.08);
    cx.fillStyle=grad(cx,0,h*.72,0,h,'#7CC24A','#3E8E2A');cx.fillRect(0,h*.72,w,h*.28);
    cx.strokeStyle='#8D6E63';cx.lineWidth=3;for(i=0;i<9;i++){var fx=w*.55+i*w*.055;cx.beginPath();cx.moveTo(fx,h*.75);cx.lineTo(fx,h*.69);cx.stroke()}cx.beginPath();cx.moveTo(w*.55,h*.71);cx.lineTo(w*1.05,h*.71);cx.moveTo(w*.55,h*.735);cx.lineTo(w*1.05,h*.735);cx.stroke();
    for(i=0;i<46;i++){var sx=(i*37)%w,sy=h*.78+((i*53)%(h*.2)),sw2=Math.sin(t*.06+i)*3,hh2=h*.05+((i*7)%10);cx.strokeStyle=i%3?'#E9C85A':'#C9A93B';cx.lineWidth=2.5;cx.beginPath();cx.moveTo(sx,sy);cx.quadraticCurveTo(sx+sw2,sy-hh2*.6,sx+sw2*1.6,sy-hh2);cx.stroke();cx.fillStyle=i%3?'#F4D774':'#DDB93E';cx.beginPath();cx.ellipse(sx+sw2*1.6,sy-hh2,2.5,6,sw2*.1,0,7);cx.fill()}
    for(i=0;i<14;i++){var fx2=(i*71)%w,fy=h*.9+((i*29)%(h*.08));cx.fillStyle=['#FF5252','#FFEB3B','#fff','#E040FB'][i%4];cx.beginPath();cx.arc(fx2,fy,3,0,7);cx.fill();cx.fillStyle='#FFEB3B';cx.beginPath();cx.arc(fx2,fy,1.2,0,7);cx.fill()}
    bal.forEach(bird);
    RG=RG.filter(function(g){g.l+=f;if(g.l>20)return false;var k=g.l/20;cx.globalAlpha=1-k;cx.strokeStyle=g.c;cx.lineWidth=6*(1-k)+1;cx.beginPath();cx.arc(g.x,g.y,R*(.5+k*2.4),0,7);cx.stroke();cx.strokeStyle='#fff';cx.lineWidth=3;for(var a=0;a<8;a++){cx.beginPath();cx.moveTo(g.x+Math.cos(a*.785)*R*(.6+k*1.6),g.y+Math.sin(a*.785)*R*(.6+k*1.6));cx.lineTo(g.x+Math.cos(a*.785)*R*(1.1+k*2.2),g.y+Math.sin(a*.785)*R*(1.1+k*2.2));cx.stroke()}cx.globalAlpha=1;return true});
    shots.forEach(function(sh){for(var q=0;q<sh.tr.length;q++){cx.globalAlpha=q/sh.tr.length*.7;cx.strokeStyle='#FF6D00';cx.lineWidth=w*.02*q/sh.tr.length+2;cx.beginPath();cx.moveTo(sh.x,sh.tr[q]);cx.lineTo(sh.x,q<sh.tr.length-1?sh.tr[q+1]:sh.y);cx.stroke()}cx.globalAlpha=1;glow(cx,sh.x,sh.y,w*.08,'rgba(255,200,0,.9)');cx.fillStyle='#FFFDE7';cx.shadowColor='#FF9100';cx.shadowBlur=16;cx.beginPath();cx.arc(sh.x,sh.y,w*.017,0,7);cx.fill();cx.shadowBlur=0});
    var X=cxp(),ry2=rec*1.2;cx.save();cx.translate(X,cy+ry2);cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=8;cx.fillStyle=grad(cx,-w*.045,0,w*.045,0,'#CFD8DC','#455A64');rr(cx,-w*.045,-h*.1,w*.09,h*.12,6);cx.fill();cx.fillStyle='#263238';rr(cx,-w*.02,-h*.115,w*.04,h*.03,4);cx.fill();cx.fillStyle='#FF1744';cx.fillRect(-w*.006,-h*.125,w*.012,h*.015);
    cx.fillStyle=grad(cx,-w*.05,0,w*.05,0,'#6D4C41','#3E2723');cx.beginPath();cx.moveTo(-w*.035,0);cx.lineTo(w*.035,0);cx.lineTo(w*.05,h*.1);cx.lineTo(-w*.03,h*.1);cx.fill();cx.shadowBlur=0;cx.fillStyle='#FFCCA8';cx.beginPath();cx.ellipse(0,h*.08,w*.07,h*.05,0,0,7);cx.fill();cx.strokeStyle='#E0A87F';cx.lineWidth=2;for(var fg=-2;fg<=2;fg++){cx.beginPath();cx.moveTo(fg*w*.02,h*.06);cx.lineTo(fg*w*.02,h*.1);cx.stroke()}cx.restore();
    if(flash>0){glow(cx,X,cy-h*.13,w*.2,'rgba(255,235,59,.95)');cx.fillStyle='#FFF59D';cx.beginPath();for(i=0;i<16;i++){var ra=i%2?w*.04:w*.11;cx.lineTo(X+Math.cos(i*Math.PI/8)*ra,cy-h*.13+Math.sin(i*Math.PI/8)*ra)}cx.fill()}
    stepP(cx,P,f);floatTxt(cx,F,f);
    for(i=0;i<10;i++){var bxx=w*.5-4.5*w*.062+i*w*.062,on=i<ammo;cx.save();cx.translate(bxx,h*.965);cx.globalAlpha=on?1:.35;cx.fillStyle=on?'#FFD54F':'#78909C';cx.strokeStyle=on?'#E65100':'#455A64';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(-w*.014,w*.03);cx.lineTo(-w*.014,-w*.005);cx.quadraticCurveTo(0,-w*.035,w*.014,-w*.005);cx.lineTo(w*.014,w*.03);cx.closePath();cx.fill();cx.stroke();cx.fillStyle=on?'#B71C1C':'#546E7A';cx.fillRect(-w*.014,w*.018,w*.028,w*.012);cx.restore()}
    cx.fillStyle='#fff';cx.strokeStyle='rgba(0,0,0,.5)';cx.lineWidth=3;cx.font='bold '+Math.floor(w*.04)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.strokeText('Patronen: '+ammo+' · Treffer: '+s+'/10',w/2,h*.925);cx.fillText('Patronen: '+ammo+' · Treffer: '+s+'/10',w/2,h*.925);
    bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
stack:function(cv,cx,w,h,score,over){
  var bh=h*.1,base=h*.9,W0=w*.5,blocks=[{x:(w-W0)/2,w:W0}],cur={x:0,w:W0},dir=1,s=0,cam=0,flash=0,done=false,P=[],fr=0,DB=[],KIND=['patty','cheese','lettuce','sauce','bun','patty','cheese','pickle','onion','tomato'];
  var unb=bindTap(cv,function(){if(done)return;var top=blocks[blocks.length-1],lo=Math.max(cur.x,top.x),hi=Math.min(cur.x+cur.w,top.x+top.w),ov=hi-lo;
    if(ov<=3){done=true;L.stop();unb();over();return}
    var nx=lo,nw=ov,per=false,idx=blocks.length;
    if(Math.abs(cur.x-top.x)<w*.045){per=true;flash=40;nw=Math.min(W0,top.w+w*.03);nx=top.x-(nw-top.w)/2}
    else{if(cur.x<top.x)DB.push({x:cur.x,w:top.x-cur.x,i:idx,dy:0,vy:0,vx:-1});if(cur.x+cur.w>top.x+top.w)DB.push({x:top.x+top.w,w:cur.x+cur.w-top.x-top.w,i:idx,dy:0,vy:0,vx:1})}
    burst(P,nx+nw/2,base-(idx+1)*bh+cam,per?34:12,per?['#FFD54F','#fff','#FF80AB','#80D8FF']:['#FFE0B2','#fff'],per?9:4);
    blocks.push({x:nx,w:nw});s++;score(s);cur={x:s%2?0:w-nw,w:nw};dir=s%2?1:-1});
  function layer(x,wd,y,i,dy){var k=i===0?'bunb':KIND[(i-1)%KIND.length],t=bh,q;cx.save();cx.translate(0,dy||0);cx.shadowColor='rgba(0,0,0,.3)';cx.shadowBlur=4;cx.shadowOffsetY=2;
    if(k==='bunb'||k==='bun'){cx.fillStyle=grad(cx,0,y,0,y+t,'#F6C06A','#C9812F');rr(cx,x-2,y+t*.1,wd+4,t*.85,t*.38);cx.fill();cx.shadowBlur=0;cx.fillStyle='rgba(255,255,255,.28)';rr(cx,x+6,y+t*.18,wd-12,t*.2,t*.1);cx.fill();if(k==='bun'||i>0){cx.fillStyle='#FFF3D6';for(q=x+14;q<x+wd-8;q+=17){cx.beginPath();cx.ellipse(q,y+t*(.3+((q|0)%3)*.08),3,1.7,.5,0,7);cx.fill()}}cx.strokeStyle='rgba(90,45,10,.5)';cx.lineWidth=2;rr(cx,x-2,y+t*.1,wd+4,t*.85,t*.38);cx.stroke()}
    else if(k==='patty'){cx.fillStyle=grad(cx,0,y,0,y+t,'#8A4F29','#3F200D');rr(cx,x-4,y+t*.1,wd+8,t*.8,t*.36);cx.fill();cx.shadowBlur=0;cx.fillStyle='rgba(255,255,255,.14)';for(q=x+8;q<x+wd-6;q+=14)cx.fillRect(q,y+t*.32,6,3);cx.fillStyle='rgba(0,0,0,.25)';for(q=x+14;q<x+wd-6;q+=17)cx.fillRect(q,y+t*.58,7,3)}
    else if(k==='cheese'){cx.fillStyle='#FFC400';cx.fillRect(x-5,y+t*.28,wd+10,t*.34);cx.beginPath();[.14,.62].forEach(function(a){cx.moveTo(x+wd*a,y+t*.6);cx.lineTo(x+wd*a+t*.34,y+t*.6);cx.lineTo(x+wd*a+t*.17,y+t*.98)});cx.fill();cx.shadowBlur=0;cx.fillStyle='rgba(255,255,255,.4)';cx.fillRect(x-3,y+t*.3,wd+6,3)}
    else if(k==='lettuce'){cx.fillStyle=grad(cx,0,y,0,y+t,'#B6E86C','#43A047');cx.beginPath();cx.moveTo(x-8,y+t*.5);for(q=0;q<=wd+16;q+=7)cx.lineTo(x-8+q,y+t*.34+Math.sin(q*.45)*t*.15);for(q=wd+16;q>=0;q-=7)cx.lineTo(x-8+q,y+t*.78+Math.sin(q*.45+1.5)*t*.14);cx.closePath();cx.fill();cx.shadowBlur=0;cx.strokeStyle='#2E7D32';cx.lineWidth=1.5;cx.stroke()}
    else if(k==='tomato'){cx.fillStyle=grad(cx,0,y,0,y+t,'#FF6F5E','#C62828');rr(cx,x-3,y+t*.2,wd+6,t*.55,t*.25);cx.fill();cx.shadowBlur=0;cx.fillStyle='#FFE0B2';for(q=x+10;q<x+wd-6;q+=15){cx.beginPath();cx.ellipse(q,y+t*.48,3,2,0,0,7);cx.fill()}cx.fillStyle='rgba(255,255,255,.3)';cx.fillRect(x+4,y+t*.25,wd-8,3)}
    else if(k==='pickle'){for(q=x+t*.35;q<x+wd-t*.2;q+=t*.62){cx.fillStyle='#3E7B2A';cx.beginPath();cx.ellipse(q,y+t*.5,t*.3,t*.24,0,0,7);cx.fill();cx.shadowBlur=0;cx.fillStyle='#B5DD7C';cx.beginPath();cx.ellipse(q,y+t*.5,t*.22,t*.16,0,0,7);cx.fill();cx.fillStyle='#7FB347';cx.fillRect(q-1,y+t*.42,2,t*.16)}}
    else if(k==='onion'){cx.shadowBlur=0;cx.strokeStyle='#F3E5F5';cx.lineWidth=3.5;for(q=x+t*.3;q<x+wd-t*.15;q+=t*.58){cx.beginPath();cx.ellipse(q,y+t*.5,t*.27,t*.2,0,0,7);cx.stroke();cx.strokeStyle='#CE93D8';cx.lineWidth=2;cx.beginPath();cx.ellipse(q,y+t*.5,t*.15,t*.1,0,0,7);cx.stroke();cx.strokeStyle='#F3E5F5';cx.lineWidth=3.5}}
    else{cx.fillStyle=grad(cx,0,y,0,y+t,'#FFAB91','#F4511E');cx.beginPath();cx.moveTo(x-4,y+t*.3);for(q=0;q<=wd+8;q+=9)cx.lineTo(x-4+q,y+t*.28+Math.sin(q*.3)*t*.06);cx.lineTo(x+wd+4,y+t*.62);cx.lineTo(x-4,y+t*.62);cx.fill();cx.beginPath();[.2,.5,.8].forEach(function(a){cx.arc(x+wd*a,y+t*.66,t*.13,0,7)});cx.fill()}
    cx.restore()}
  var L=loopRun(function(f){fr+=f;var sp=w*Math.min(.0135,.0055+s*.0004);cur.x+=dir*sp*f;if(cur.x<0){cur.x=0;dir=1}if(cur.x+cur.w>w){cur.x=w-cur.w;dir=-1}flash-=f;
    var tcam=Math.max(0,(blocks.length+2)*bh-h*.55);cam+=(tcam-cam)*.12*f;var i;
    cx.fillStyle=grad(cx,0,0,0,h,'#C62828','#8E1B1B');cx.fillRect(0,0,w,h);cx.fillStyle='rgba(255,214,0,.13)';for(i=0;i<12;i++)cx.fillRect(i*w/6,0,w/12,h);
    for(i=0;i<3;i++){var lx=w*(.2+i*.3);cx.strokeStyle='#333';cx.lineWidth=2;cx.beginPath();cx.moveTo(lx,0);cx.lineTo(lx,h*.06);cx.stroke();glow(cx,lx,h*.1,w*.16,'rgba(255,230,150,.6)');cx.fillStyle='#FFD54F';cx.beginPath();cx.moveTo(lx-w*.05,h*.11);cx.lineTo(lx-w*.025,h*.06);cx.lineTo(lx+w*.025,h*.06);cx.lineTo(lx+w*.05,h*.11);cx.fill()}
    var wy=h*.16+cam*.1;cx.fillStyle='#fff';rr(cx,w*.05,wy,w*.3,h*.2,8);cx.fill();cx.fillStyle=grad(cx,0,wy,0,wy+h*.2,'#7FD0FF','#E3F5FF');rr(cx,w*.065,wy+6,w*.27,h*.2-12,6);cx.fill();cx.fillStyle='rgba(255,255,255,.9)';cloud(cx,w*.13+((fr*.1)%(w*.12)),wy+h*.07,w*.025);cx.fillStyle='#fff';cx.fillRect(w*.2-1.5,wy,3,h*.2);
    var my=h*.14+cam*.12;cx.fillStyle='#212121';rr(cx,w*.55,my,w*.4,h*.22,6);cx.fill();cx.strokeStyle='#FFD54F';cx.lineWidth=3;rr(cx,w*.55,my,w*.4,h*.22,6);cx.stroke();cx.font=Math.floor(w*.07)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';['🍔','🍟','🥤'].forEach(function(e,j){cx.fillText(e,w*.63+j*w*.12,my+h*.065)});cx.fillStyle='#FFD54F';cx.font='bold '+Math.floor(w*.04)+'px sans-serif';cx.fillText('MENÜ',w*.75,my+h*.16);
    var cy0=base+cam*.35-h*.2;cx.fillStyle=grad(cx,0,cy0,0,cy0+h*.12,'#8D6E63','#5D4037');cx.fillRect(0,cy0,w,h*.12);cx.fillStyle='#FFD54F';cx.fillRect(0,cy0,w,4);for(i=0;i<5;i++){cx.fillStyle='#E53935';cx.beginPath();cx.ellipse(w*(.1+i*.2),cy0+h*.15,w*.035,h*.012,0,0,7);cx.fill();cx.fillStyle='#37474F';cx.fillRect(w*(.1+i*.2)-2,cy0+h*.15,4,h*.1)}
    var fy=base+cam;cx.fillStyle='#ECEFF1';cx.fillRect(0,fy,w,h);for(var tx=0;tx<w+40;tx+=40)for(var ty=0;ty<h;ty+=22)if(((tx/40|0)+(ty/22|0))%2){cx.fillStyle='#D32F2F';cx.fillRect(tx-10,fy+ty,40,22)}
    cx.fillStyle='#F44336';rr(cx,w*.08,fy-6,w*.84,16,7);cx.fill();cx.fillStyle='#fff';cx.fillRect(w*.1,fy-4,w*.8,5);cx.shadowColor='rgba(0,0,0,.3)';cx.shadowBlur=8;cx.fillStyle='#FFEB3B';cx.fillRect(w*.08,fy+10,w*.84,6);cx.shadowBlur=0;
    blocks.forEach(function(b,i){layer(b.x,b.w,base-(i+1)*bh+cam,i)});
    var cy=base-(blocks.length+1)*bh+cam;layer(cur.x,cur.w,cy,blocks.length);
    for(i=DB.length-1;i>=0;i--){var d=DB[i];d.vy+=.5*f;d.dy+=d.vy*f;d.x+=d.vx*1.5*f;layer(d.x,d.w,base-(d.i+1)*bh+cam,d.i,d.dy);if(d.dy>h)DB.splice(i,1)}
    cx.fillStyle='rgba(255,236,179,.8)';for(i=0;i<22;i++){var px=((i*53+fr*(.3+i%3*.2)+Math.sin(fr*.03+i)*18)%(w+20)),py=((i*97+fr*(.55+i%4*.22))%(h+20));cx.save();cx.translate(px,py);cx.rotate(fr*.05+i);cx.beginPath();cx.ellipse(0,0,3.5,1.8,0,0,7);cx.fill();cx.restore()}
    stepP(cx,P,f);
    if(flash>0){cx.save();cx.globalAlpha=Math.min(1,flash/20);cx.fillStyle='#FFEB3B';cx.strokeStyle='rgba(0,0,0,.4)';cx.lineWidth=5;cx.font='bold '+Math.floor(w*.1)+'px sans-serif';cx.textAlign='center';cx.strokeText('PERFEKT!',w/2,h*.32);cx.fillText('PERFEKT!',w/2,h*.32);cx.restore()}
    bigScore(cx,w,s)});
  return function(){done=true;L.stop();unb()}},
catch:function(cv,cx,w,h,score,over){
  var N=5,lw=w/N,lane=2,bxp=lw*2.5,s=0,lives=3,items=[],nxt=0,by=h*.77,inv=0,fr=0,P=[],F=[],chew=0,sick=0,R=lw*.62,look=0;
  var unb=bindTap(cv,function(x){if(x!=null)lane=Math.max(0,Math.min(N-1,Math.floor(x/lw)))});
  var CH=['#FF4081','#FFEA00','#00E5FF','#76FF03','#FF9100'],VEG=['🥦','🥕','🍆','🥒','🌽','🍄'],SW=['🍩','🧁','🍦','🍪','🍰'];
  function draw(it,r){var x=it.x,y=it.y;cx.save();cx.translate(x,y);cx.fillStyle='rgba(255,255,255,.9)';cx.beginPath();cx.arc(0,0,r*1.32,0,7);cx.fill();cx.strokeStyle=it.t==='veg'?'#6BAA2E':it.t==='gold'?'#FFB300':'#EC407A';cx.lineWidth=3.5;cx.stroke();cx.rotate(Math.sin(it.a)*.3);
    if(it.t==='candy'||it.t==='gold'){var c=it.t==='gold'?'#FFC400':CH[it.c];glow(cx,0,0,r*(it.t==='gold'?2.4:1.8),it.t==='gold'?'rgba(255,214,0,.7)':'rgba(255,255,255,.25)');cx.fillStyle=c;cx.beginPath();cx.moveTo(-r*1.1,-r*.45);cx.lineTo(-r*.55,0);cx.lineTo(-r*1.1,r*.45);cx.fill();cx.beginPath();cx.moveTo(r*1.1,-r*.45);cx.lineTo(r*.55,0);cx.lineTo(r*1.1,r*.45);cx.fill();cx.fillStyle=grad(cx,0,-r*.6,0,r*.6,c,'#fff');cx.beginPath();cx.ellipse(0,0,r*.7,r*.55,0,0,7);cx.fill();cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=3;cx.beginPath();cx.moveTo(-r*.3,-r*.5);cx.lineTo(r*.15,r*.5);cx.stroke();if(it.t==='gold'){cx.fillStyle='#8A5A00';cx.font='bold '+r*.6+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('×3',0,1)}}
    else if(it.t==='choc'){glow(cx,0,0,r*1.8,'rgba(255,200,120,.25)');cx.fillStyle=grad(cx,0,-r,0,r,'#8D5A3C','#3E2316');rr(cx,-r*.55,-r*.9,r*1.1,r*1.8,6);cx.fill();cx.strokeStyle='rgba(0,0,0,.35)';cx.lineWidth=2;for(var q=1;q<3;q++){cx.beginPath();cx.moveTo(-r*.55,-r*.9+q*r*.6);cx.lineTo(r*.55,-r*.9+q*r*.6);cx.stroke()}cx.beginPath();cx.moveTo(0,-r*.9);cx.lineTo(0,r*.9);cx.stroke();cx.fillStyle='#E91E63';rr(cx,-r*.6,r*.1,r*1.2,r*.8,5);cx.fill();cx.fillStyle='#FFD54F';cx.font='bold '+r*.45+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('CHOC',0,r*.5);cx.fillStyle='rgba(255,255,255,.3)';cx.fillRect(-r*.45,-r*.8,r*.15,r*.8)}
    else if(it.t==='lolli'){var c2=CH[it.c];glow(cx,0,-r*.3,r*1.8,'rgba(255,255,255,.2)');cx.strokeStyle='#ECEFF1';cx.lineWidth=4;cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,r*1.1);cx.stroke();cx.fillStyle=c2;cx.beginPath();cx.arc(0,-r*.35,r*.75,0,7);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=3;cx.beginPath();for(var a=0;a<12;a+=.3){var rr2=a*r*.06;cx.lineTo(Math.cos(a)*rr2,-r*.35+Math.sin(a)*rr2)}cx.stroke()}
    else{if(it.t==='veg')glow(cx,0,0,r*1.7,'rgba(100,200,60,.35)');cx.font=Math.floor(r*1.9)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(it.t==='veg'?VEG[it.c%VEG.length]:SW[it.c%SW.length],0,0)}
    cx.restore()}
  var L=loopRun(function(f){fr+=f;inv-=f;chew-=f;sick-=f;bxp+=(lane*lw+lw/2-bxp)*Math.min(.9,.3*f);nxt-=f;var tier=(s>=RW.g.g[0]?1:0)+(s>=RW.g.g[1]?1:0),i;
    if(nxt<=0){var q=Math.random(),t=q<.32?'veg':q<.38?'gold':q<.52?'choc':q<.68?'candy':q<.82?'lolli':'sw';items.push({x:Math.floor(Math.random()*N)*lw+lw/2,y:-20,t:t,c:Math.floor(Math.random()*6),a:Math.random()*6});nxt=40/[1,1.6,2.3][tier]}
    var sp=h*.0058*[1,1.6,2.3][tier],near=null;
    items=items.filter(function(it){it.y+=sp*f;it.a+=.08*f;if(!near||(it.y>near.y&&it.y<by))near=it;if(it.y>by-R*.4&&it.y<by+R*.6&&Math.abs(it.x-bxp)<lw*.5){if(it.t==='veg'){if(inv<=0){lives--;inv=40;sick=45;burst(P,bxp,by,22,['#8BC34A','#558B2F','#C5E1A5'],9);F.push({x:bxp,y:by-R,t:'Bäh! Gemüse!',l:50,c:'#B2FF59'});if(lives<=0){L.stop();unb();over()}}}else{var pts=it.t==='gold'?3:1;s+=pts;score(s);chew=22;burst(P,it.x,it.y,14,it.t==='gold'?['#FFD54F','#fff','#FF8F00']:CH,6);F.push({x:it.x,y:it.y-R*.6,t:it.t==='gold'?'+3 Mmmh!':'+1',l:34,c:it.t==='gold'?'#FFD54F':'#fff'})}return false}return it.y<h+20});
    if(near)look+=((near.x-bxp)/lw-look)*.2*f;
    var sk=cx.createLinearGradient(0,0,0,h);sk.addColorStop(0,'#7FDBFF');sk.addColorStop(.7,'#FFD6EC');sk.addColorStop(1,'#FFF3C4');cx.fillStyle=sk;cx.fillRect(0,0,w,h);
    var cols=['#FF5252','#FF9800','#FFEB3B','#66BB6A','#29B6F6','#5C6BC0','#AB47BC'];cx.lineWidth=w*.022;for(i=0;i<7;i++){cx.strokeStyle=cols[i];cx.globalAlpha=.75;cx.beginPath();cx.arc(w*.5,h*.62,w*(.56-i*.021),Math.PI,0);cx.stroke()}cx.globalAlpha=1;
    cx.fillStyle='rgba(255,255,255,.95)';[[.12,.1,.07,.1],[.58,.06,.06,.07],[.82,.2,.05,.12]].forEach(function(c2){cloud(cx,((c2[0]*w+fr*c2[3])%(w+140))-70,c2[1]*h,w*c2[2])});
    hills(cx,w,h,h*.7,h*.08,0,.011,'#FFB3D9','#FF80BF');hills(cx,w,h,h*.78,h*.07,80,.016,'#B9F6CA','#69F0AE');
    [[.1,.54,'#FF4081'],[.88,.56,'#00BCD4'],[.5,.6,'#FFB300']].forEach(function(l,j){var lx=w*l[0],ly=h*l[1],lr=w*.07;cx.strokeStyle='#ECEFF1';cx.lineWidth=5;cx.beginPath();cx.moveTo(lx,ly);cx.lineTo(lx,ly+h*.2);cx.stroke();cx.fillStyle=l[2];cx.beginPath();cx.arc(lx,ly,lr,0,7);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=3;cx.beginPath();for(var a=0;a<14;a+=.3){var r3=a*lr*.07;cx.lineTo(lx+Math.cos(a+j)*r3,ly+Math.sin(a+j)*r3)}cx.stroke()});
    [[.25,.74],[.72,.77]].forEach(function(c3){var cxx=w*c3[0],cyy=h*c3[1];cx.strokeStyle='#fff';cx.lineWidth=7;cx.lineCap='round';cx.beginPath();cx.moveTo(cxx,cyy+h*.15);cx.lineTo(cxx,cyy);cx.arc(cxx+w*.03,cyy,w*.03,Math.PI,0);cx.stroke();cx.strokeStyle='#FF1744';cx.lineWidth=7;cx.setLineDash([6,10]);cx.beginPath();cx.moveTo(cxx,cyy+h*.15);cx.lineTo(cxx,cyy);cx.arc(cxx+w*.03,cyy,w*.03,Math.PI,0);cx.stroke();cx.setLineDash([]);cx.lineCap='butt'});
    cx.fillStyle=grad(cx,0,h*.9,0,h,'#FFC1E3','#FF8FC8');cx.fillRect(0,h*.92,w,h*.08);cx.fillStyle='#fff';for(i=0;i<w;i+=22){cx.beginPath();cx.arc(i+((i/22)%2?6:0),h*.92,11,0,Math.PI);cx.fill()}for(i=0;i<30;i++){cx.fillStyle=CH[i%5];cx.save();cx.translate((i*47)%w,h*.94+((i*13)%(h*.05)));cx.rotate(i);cx.fillRect(-4,-1.5,8,3);cx.restore()}
    for(i=0;i<N;i+=2){cx.fillStyle='rgba(255,255,255,.12)';cx.fillRect(i*lw,0,lw,h)}
    cx.fillStyle='rgba(255,255,255,.3)';cx.fillRect(0,0,w,h*.92);
    var op=chew>0?.1+.6*Math.abs(Math.sin(chew*.45)):.9;
    cx.save();cx.translate(bxp,by);cx.fillStyle='rgba(0,0,0,.18)';cx.beginPath();cx.ellipse(0,R*2.0,R*1.3,R*.22,0,0,7);cx.fill();
    if(inv<=0||Math.floor(inv/4)%2){cx.fillStyle=grad(cx,0,R*.6,0,R*1.9,'#FF4081','#C2185B');cx.beginPath();cx.ellipse(0,R*1.2,R*1.32,R*.8,0,0,7);cx.fill();cx.fillStyle='rgba(255,255,255,.22)';cx.beginPath();cx.ellipse(-R*.3,R*1.05,R*.5,R*.28,-.3,0,7);cx.fill();cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=4;cx.beginPath();cx.moveTo(-R*1.2,R*1.05);cx.lineTo(R*1.2,R*1.05);cx.stroke();cx.fillStyle='#FFB74D';cx.beginPath();cx.arc(-R*1.28,R*1.0,R*.26,0,7);cx.arc(R*1.28,R*1.0,R*.26,0,7);cx.fill();cx.beginPath();cx.ellipse(0,R*.92,R*.78,R*.32,0,0,7);cx.fill();
    cx.fillStyle=grad(cx,0,-R,0,R,sick>0?'#DCEDC8':'#FFE0B2',sick>0?'#9CCC65':'#FFB74D');cx.beginPath();cx.arc(0,0,R,0,7);cx.fill();
    cx.fillStyle='#5D4037';cx.beginPath();cx.arc(0,-R*.12,R*1.02,Math.PI*1.07,Math.PI*1.93);cx.fill();cx.beginPath();cx.arc(-R*.1,-R*1.0,R*.2,0,7);cx.arc(R*.15,-R*1.05,R*.17,0,7);cx.fill();
    cx.fillStyle='rgba(255,64,129,.35)';cx.beginPath();cx.arc(-R*.66,R*.12,R*.16,0,7);cx.arc(R*.66,R*.12,R*.16,0,7);cx.fill();
    if(sick>0){cx.strokeStyle='#33691E';cx.lineWidth=3;[-1,1].forEach(function(sg){cx.beginPath();cx.moveTo(sg*R*.5,-R*.5);cx.lineTo(sg*R*.2,-R*.28);cx.moveTo(sg*R*.5,-R*.28);cx.lineTo(sg*R*.2,-R*.5);cx.stroke()})}
    else{[-1,1].forEach(function(sg){cx.fillStyle='#fff';cx.beginPath();cx.arc(sg*R*.34,-R*.4,R*.23,0,7);cx.fill();cx.fillStyle='#222';cx.beginPath();cx.arc(sg*R*.34+look*R*.1,-R*.38,R*.11,0,7);cx.fill()})}
    var my=R*.36,mx=R*.7,my2=R*.62*op;cx.save();cx.beginPath();cx.ellipse(0,my,mx,Math.max(2,my2),0,0,7);cx.clip();cx.fillStyle='#6A1B2A';cx.fillRect(-mx,my-my2-2,mx*2,my2*2+4);cx.fillStyle='#fff';cx.fillRect(-mx,my-my2-2,mx*2,my2*.38+2);cx.fillStyle='#FF7A8A';cx.beginPath();cx.ellipse(0,my+my2*.85,mx*.7,my2*.55,0,0,7);cx.fill();cx.restore();cx.strokeStyle='#8D3B2E';cx.lineWidth=2.5;cx.beginPath();cx.ellipse(0,my,mx,Math.max(2,my2),0,0,7);cx.stroke()}
    cx.restore();
    items.forEach(function(it){draw(it,lw*.27)});
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
snake:function(cv,cx,w,h,score,over){
  var N=13,S=Math.floor(Math.min(w,h-6)/N),W=N*S,ox=Math.floor((w-W)/2),oy=Math.floor((h-W)/2),sn=[{x:6,y:6},{x:5,y:6},{x:4,y:6},{x:3,y:6}],pv=sn.map(function(c){return {x:c.x,y:c.y}}),d={x:1,y:0},q=[],f0,s=0,acc=0,dead=false,fr=0,P=[],F=[],lastD=d,i,IV=9;
  function food(){do{f0={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)}}while(sn.some(function(c){return c.x===f0.x&&c.y===f0.y}))}food();
  var qd=d;function pushT(m){if(m==='L')qd={x:qd.y,y:-qd.x};else qd={x:-qd.y,y:qd.x};q.push(m);if(q.length>2)q.shift()}
  var unb=bindSwipe(cv,function(k,x){var V={U:{x:0,y:-1},D:{x:0,y:1},L:{x:-1,y:0},R:{x:1,y:0}};if(k==='tap'){if(x!=null)pushT(x<w/2?'L':'R');return}var n=V[k];if(!n)return;if(n.x===qd.y&&n.y===-qd.x)pushT('L');else if(n.x===-qd.y&&n.y===qd.x)pushT('R')});
  function step(){var m=q.shift();if(m==='L')d={x:d.y,y:-d.x};else if(m==='R')d={x:-d.y,y:d.x};
    var h0={x:sn[0].x+d.x,y:sn[0].y+d.y},eat=h0.x===f0.x&&h0.y===f0.y;
    if(h0.x<0||h0.y<0||h0.x>=N||h0.y>=N||sn.slice(0,eat?sn.length:sn.length-1).some(function(c){return c.x===h0.x&&c.y===h0.y})){dead=true;burst(P,ox+sn[0].x*S+S/2,oy+sn[0].y*S+S/2,30,['#69F0AE','#00E676','#fff'],10);L.stop();unb();over();return}
    pv=sn.map(function(c){return {x:c.x,y:c.y}});sn.unshift(h0);lastD=d;
    if(eat){s++;score(s);var ex=ox+h0.x*S+S/2,ey=oy+h0.y*S+S/2;burst(P,ex,ey,26,['#FFD54F','#fff','#FFF59D','#FF80AB'],9);F.push({x:ex,y:ey-S,t:'+1',l:40,c:'#FFF59D'});food()}else sn.pop()}
  function vis(k,t){var a=pv[Math.min(k,pv.length-1)],b=sn[k];if(!a)a=b;return {x:ox+(a.x+(b.x-a.x)*t)*S+S/2,y:oy+(a.y+(b.y-a.y)*t)*S+S/2}}
  var L=loopRun(function(f){fr+=f;acc+=f;var iv=Math.max(6,IV-s*.1);while(acc>=iv&&!dead){acc-=iv;step()}if(dead)return;var t=Math.min(1,acc/iv);
    var bg=cx.createRadialGradient(w/2,h/2,10,w/2,h/2,w*.8);bg.addColorStop(0,'#143A2E');bg.addColorStop(1,'#050F0C');cx.fillStyle=bg;cx.fillRect(0,0,w,h);
    for(var yy=0;yy<N;yy++)for(var xx=0;xx<N;xx++){cx.fillStyle=(xx+yy)%2?'rgba(120,255,200,.05)':'rgba(0,0,0,.12)';cx.fillRect(ox+xx*S,oy+yy*S,S,S)}
    cx.save();cx.shadowColor='#00E5A0';cx.shadowBlur=14+4*Math.sin(fr*.08);cx.strokeStyle='#26D9A0';cx.lineWidth=3;cx.strokeRect(ox,oy,W,W);cx.restore();
    var fx=ox+f0.x*S+S/2,fy=oy+f0.y*S+S/2,pu=1+.08*Math.sin(fr*.15);glow(cx,fx,fy,S*1.6,'rgba(255,214,79,.55)');
    cx.save();cx.translate(fx,fy);cx.scale(Math.abs(Math.cos(fr*.06))*.7+.3,1);cx.scale(pu,pu);cx.fillStyle=grad(cx,0,-S*.45,0,S*.45,'#FFF59D','#F9A825');cx.beginPath();cx.arc(0,0,S*.42,0,7);cx.fill();cx.strokeStyle='#E65100';cx.lineWidth=2.5;cx.stroke();cx.strokeStyle='rgba(230,81,0,.6)';cx.lineWidth=1.5;cx.beginPath();cx.arc(0,0,S*.27,0,7);cx.stroke();cx.fillStyle='#E65100';cx.font='bold '+S*.38+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('₿',0,1);cx.restore();
    for(i=0;i<4;i++){var sa=fr*.05+i*1.57;cx.fillStyle='rgba(255,255,255,'+(.4+.4*Math.sin(fr*.2+i))+')';cx.beginPath();cx.arc(fx+Math.cos(sa)*S*.62,fy+Math.sin(sa)*S*.62,1.8,0,7);cx.fill()}
    var pts=[];for(i=0;i<sn.length;i++)pts.push(vis(i,t));
    cx.lineCap='round';cx.lineJoin='round';
    cx.strokeStyle='rgba(0,0,0,.35)';cx.lineWidth=S*.86;cx.beginPath();pts.forEach(function(p,k){k?cx.lineTo(p.x+2,p.y+4):cx.moveTo(p.x+2,p.y+4)});cx.stroke();
    for(i=pts.length-1;i>0;i--){var a=pts[i],b=pts[i-1],k2=i/pts.length,wd=S*(.84-.34*k2*k2);cx.strokeStyle='hsl('+(150-k2*40)+',80%,'+(40+(i%2)*4)+'%)';cx.lineWidth=wd;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke();cx.strokeStyle='rgba(255,255,255,.28)';cx.lineWidth=wd*.3;cx.beginPath();cx.moveTo(a.x-wd*.12,a.y-wd*.12);cx.lineTo(b.x-wd*.12,b.y-wd*.12);cx.stroke();if(i%2===0){cx.fillStyle='rgba(255,235,59,.85)';cx.beginPath();cx.moveTo(a.x,a.y-wd*.18);cx.lineTo(a.x+wd*.16,a.y);cx.lineTo(a.x,a.y+wd*.18);cx.lineTo(a.x-wd*.16,a.y);cx.fill()}}
    var H=pts[0],ang=Math.atan2(lastD.y,lastD.x);cx.save();cx.translate(H.x,H.y);cx.rotate(ang);
    var tg=Math.sin(fr*.4)>.2?1:0;if(tg){cx.strokeStyle='#FF1744';cx.lineWidth=2;cx.beginPath();cx.moveTo(S*.4,0);cx.lineTo(S*.7,0);cx.lineTo(S*.85,-S*.1);cx.moveTo(S*.7,0);cx.lineTo(S*.85,S*.1);cx.stroke()}
    cx.shadowColor='#00E676';cx.shadowBlur=10;cx.fillStyle=grad(cx,-S*.4,0,S*.5,0,'#00C853','#69F0AE');cx.beginPath();cx.ellipse(0,0,S*.55,S*.46,0,0,7);cx.fill();cx.shadowBlur=0;cx.fillStyle='#FFEB3B';cx.beginPath();cx.moveTo(-S*.3,0);cx.lineTo(-S*.1,-S*.14);cx.lineTo(S*.1,0);cx.lineTo(-S*.1,S*.14);cx.fill();
    [-1,1].forEach(function(sg){cx.fillStyle='#fff';cx.beginPath();cx.arc(S*.18,sg*S*.24,S*.15,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.ellipse(S*.23,sg*S*.24,S*.07,S*.1,0,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(S*.26,sg*S*.21,S*.025,0,7);cx.fill()});cx.restore();
    stepP(cx,P,f);floatTxt(cx,F,f);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
moto:function(cv,cx,w,h,score,over){
  var LW=w*.235,RX=w/2-1.5*LW,by=h*.78,lane=1,mx=1,s=0,lives=3,rows=[],sc=0,nxt=h*.55,inv=0,fr=0,P=[],GG=RW.g.g,i,spT=0,ls=LW*1.0;
  function lx(l){return w/2+(l-1)*LW}
  var unb=bindSwipe(cv,function(k,x){if(k==='L')lane=Math.max(0,lane-1);else if(k==='R')lane=Math.min(2,lane+1);else if(k==='tap'&&x!=null){if(x<w/2)lane=Math.max(0,lane-1);else lane=Math.min(2,lane+1)}},true)
  function obst(k,x,y,seed){var ow=LW*.8;cx.save();cx.translate(x,y);cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(ow*.12,ow*.14,ow*.46,ow*.4,0,0,7);cx.fill();
    cx.shadowColor='rgba(255,235,59,.9)';cx.shadowBlur=14;
    if(k==='barrel'){cx.fillStyle=grad(cx,-ow*.4,-ow*.4,ow*.4,ow*.4,'#EF5350','#8E1B1B');cx.beginPath();cx.arc(0,0,ow*.4,0,7);cx.fill();cx.shadowBlur=0;cx.strokeStyle='#FFEB3B';cx.lineWidth=ow*.09;cx.beginPath();cx.arc(0,0,ow*.3,0,7);cx.stroke();cx.strokeStyle='#212121';cx.lineWidth=ow*.04;cx.beginPath();cx.arc(0,0,ow*.4,0,7);cx.stroke();cx.fillStyle='#B71C1C';cx.beginPath();cx.arc(0,0,ow*.18,0,7);cx.fill();cx.fillStyle='rgba(255,255,255,.4)';cx.beginPath();cx.ellipse(-ow*.12,-ow*.14,ow*.1,ow*.05,-.6,0,7);cx.fill();cx.fillStyle='#fff';cx.font='bold '+ow*.2+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('!',0,1)}
    else if(k==='tires'){[[-.2,-.14],[.2,-.1],[0,.2]].forEach(function(p){cx.fillStyle='#1A1A1A';cx.beginPath();cx.arc(p[0]*ow*1.2,p[1]*ow*1.2,ow*.26,0,7);cx.fill();cx.shadowBlur=0;cx.strokeStyle='#555';cx.lineWidth=ow*.03;cx.beginPath();cx.arc(p[0]*ow*1.2,p[1]*ow*1.2,ow*.2,0,7);cx.stroke();cx.fillStyle='#8A8A8A';cx.beginPath();cx.arc(p[0]*ow*1.2,p[1]*ow*1.2,ow*.1,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(p[0]*ow*1.2,p[1]*ow*1.2,ow*.05,0,7);cx.fill()});cx.fillStyle='#FFEB3B';cx.fillRect(-ow*.1,-ow*.45,ow*.2,ow*.06)}
    else if(k==='hay'){cx.fillStyle=grad(cx,0,-ow*.35,0,ow*.35,'#FFE082','#E0A020');rr(cx,-ow*.44,-ow*.34,ow*.88,ow*.68,ow*.08);cx.fill();cx.shadowBlur=0;cx.strokeStyle='#B87800';cx.lineWidth=1.5;for(var q=-ow*.4;q<ow*.4;q+=ow*.07){cx.beginPath();cx.moveTo(q,-ow*.3);cx.lineTo(q+ow*.02,ow*.3);cx.stroke()}cx.fillStyle='#5D4037';cx.fillRect(-ow*.2,-ow*.34,ow*.05,ow*.68);cx.fillRect(ow*.15,-ow*.34,ow*.05,ow*.68);cx.strokeStyle='rgba(60,30,0,.5)';cx.lineWidth=2;rr(cx,-ow*.44,-ow*.34,ow*.88,ow*.68,ow*.08);cx.stroke()}
    else if(k==='rock'){cx.fillStyle=grad(cx,-ow*.4,-ow*.4,ow*.4,ow*.4,'#CFD8DC','#37474F');cx.beginPath();for(var a=0;a<9;a++){var rr2=ow*(.34+.1*Math.sin(a*2.3+seed));cx.lineTo(Math.cos(a*.698)*rr2,Math.sin(a*.698)*rr2)}cx.closePath();cx.fill();cx.shadowBlur=0;cx.strokeStyle='#263238';cx.lineWidth=2;cx.stroke();cx.fillStyle='rgba(255,255,255,.35)';cx.beginPath();cx.moveTo(-ow*.2,-ow*.1);cx.lineTo(-ow*.02,-ow*.28);cx.lineTo(ow*.1,-ow*.1);cx.fill();cx.strokeStyle='rgba(0,0,0,.35)';cx.beginPath();cx.moveTo(ow*.05,ow*.05);cx.lineTo(ow*.2,ow*.22);cx.stroke()}
    else{cx.fillStyle=grad(cx,0,-ow*.3,0,ow*.3,'#6D4C41','#3E2723');cx.beginPath();cx.ellipse(0,0,ow*.46,ow*.34,0,0,7);cx.fill();cx.shadowBlur=0;cx.strokeStyle='rgba(120,200,255,.8)';cx.lineWidth=2;for(var z=0;z<3;z++){cx.beginPath();cx.ellipse(0,0,ow*(.18+z*.1)+Math.sin(fr*.1+z)*2,ow*(.12+z*.07),0,0,7);cx.stroke()}cx.fillStyle='rgba(255,255,255,.35)';cx.beginPath();cx.ellipse(-ow*.15,-ow*.1,ow*.1,ow*.05,-.4,0,7);cx.fill()}
    cx.restore()}
  function bike(){var bx=lx(mx),tilt=(lane-mx)*.55;cx.save();cx.translate(bx,by);cx.rotate(tilt);
    cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.ellipse(ls*.1,ls*.08,ls*.3,ls*.55,0,0,7);cx.fill();
    cx.fillStyle='#111';rr(cx,-ls*.075,ls*.18,ls*.15,ls*.34,ls*.06);cx.fill();rr(cx,-ls*.07,-ls*.5,ls*.14,ls*.32,ls*.06);cx.fill();cx.fillStyle='#555';for(var k=0;k<6;k++){cx.fillRect(-ls*.075,ls*.2+k*ls*.055,ls*.15,ls*.018);if(k<5)cx.fillRect(-ls*.07,-ls*.48+k*ls*.055,ls*.14,ls*.018)}
    cx.fillStyle='#FF9800';rr(cx,-ls*.1,-ls*.46,ls*.2,ls*.1,ls*.05);cx.fill();
    cx.strokeStyle='#90A4AE';cx.lineWidth=ls*.04;cx.beginPath();cx.moveTo(-ls*.05,-ls*.2);cx.lineTo(-ls*.05,-ls*.4);cx.moveTo(ls*.05,-ls*.2);cx.lineTo(ls*.05,-ls*.4);cx.stroke();
    cx.strokeStyle='#212121';cx.lineWidth=ls*.05;cx.lineCap='round';cx.beginPath();cx.moveTo(-ls*.3,-ls*.2);cx.lineTo(ls*.3,-ls*.2);cx.stroke();cx.fillStyle='#FF5722';cx.beginPath();cx.arc(-ls*.31,-ls*.2,ls*.04,0,7);cx.arc(ls*.31,-ls*.2,ls*.04,0,7);cx.fill();
    cx.fillStyle=grad(cx,-ls*.16,0,ls*.16,0,'#FFB74D','#E65100');rr(cx,-ls*.15,-ls*.25,ls*.3,ls*.5,ls*.1);cx.fill();cx.fillStyle='rgba(255,255,255,.3)';rr(cx,-ls*.1,-ls*.22,ls*.07,ls*.4,ls*.03);cx.fill();
    cx.fillStyle='#1A237E';rr(cx,-ls*.27,ls*.0,ls*.14,ls*.3,ls*.06);cx.fill();rr(cx,ls*.13,ls*.0,ls*.14,ls*.3,ls*.06);cx.fill();cx.fillStyle='#111';rr(cx,-ls*.28,ls*.22,ls*.16,ls*.1,ls*.04);cx.fill();rr(cx,ls*.12,ls*.22,ls*.16,ls*.1,ls*.04);cx.fill();
    cx.fillStyle='#212121';rr(cx,-ls*.11,ls*.05,ls*.22,ls*.3,ls*.08);cx.fill();
    cx.strokeStyle='#E65100';cx.lineWidth=ls*.09;cx.beginPath();cx.moveTo(-ls*.18,-ls*.1);cx.lineTo(-ls*.3,-ls*.2);cx.moveTo(ls*.18,-ls*.1);cx.lineTo(ls*.3,-ls*.2);cx.stroke();
    cx.fillStyle=grad(cx,-ls*.25,0,ls*.25,0,'#FF9800','#BF360C');cx.beginPath();cx.ellipse(0,-ls*.04,ls*.26,ls*.15,0,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(0,-ls*.04,ls*.075,0,7);cx.fill();cx.fillStyle='#111';cx.font='bold '+ls*.12+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('7',0,-ls*.035);
    cx.fillStyle='#ECEFF1';cx.beginPath();cx.arc(0,ls*.04,ls*.13,0,7);cx.fill();cx.fillStyle='#FF6F00';cx.fillRect(-ls*.025,-ls*.09,ls*.05,ls*.26);cx.fillStyle='#263238';rr(cx,-ls*.1,-ls*.07,ls*.2,ls*.07,ls*.03);cx.fill();cx.fillStyle='rgba(255,255,255,.5)';cx.fillRect(-ls*.07,-ls*.055,ls*.05,ls*.015);
    cx.restore()}
  var L=loopRun(function(f){fr+=f;inv-=f;spT-=f;var t=(s>=GG[0]?1:0)+(s>=GG[1]?1:0),v=h*.0072*(1+.14*t)*f;sc+=v;mx+=(lane-mx)*Math.min(1,.25*f);
    nxt-=v;if(nxt<=0){var ks=['barrel','tires','hay','rock','pud'],fl=Math.floor(Math.random()*3),o=[null,null,null],dbl=Math.random()<.5+t*.1;for(i=0;i<3;i++)if(i!==fl&&(dbl||Math.random()<.4))o[i]=ks[Math.floor(Math.random()*5)];if(!o[0]&&!o[1]&&!o[2])o[(fl+1)%3]=ks[Math.floor(Math.random()*5)];rows.push({y:-h*.12,o:o,sd:Math.random()*6,pass:false});nxt=h*(.46-.03*t)}
    rows.forEach(function(r){r.y+=v;if(!r.pass&&r.y>by+ls*.6){r.pass=true;s++;score(s)}if(inv<=0&&Math.abs(r.y-by)<LW*.33+ls*.3)for(i=0;i<3;i++)if(r.o[i]&&Math.abs(i-mx)<.6){lives--;inv=70;burst(P,lx(mx),by,28,['#E0A020','#8D6E63','#FF5252','#fff'],11);shakeBox();r.o[i]=null;if(lives<=0){L.stop();unb();over();return}}});
    if(!lives)return;rows=rows.filter(function(r){return r.y<h+LW});
    if(spT<=0){spT=2;P.push({x:lx(mx)+(Math.random()-.5)*ls*.2,y:by+ls*.5,vx:(Math.random()-.5)*3,vy:Math.random()*2+1,l:26,c:Math.random()<.5?'#D7B98E':'#B8895A',s:3+Math.random()*4})}
    cx.fillStyle=grad(cx,0,0,0,h,'#F0C46E','#D79A45');cx.fillRect(0,0,w,h);
    cx.fillStyle='rgba(150,90,30,.18)';for(i=0;i<40;i++){var yy=((i*83+sc*.9)%(h+40))-20;cx.beginPath();cx.ellipse((i*61)%w,yy,6+(i%4)*3,2.5,0,0,7);cx.fill()}
    cx.fillStyle='#7B5333';cx.fillRect(RX,0,3*LW,h);cx.fillStyle='rgba(40,22,10,.35)';for(var tl=0;tl<3;tl++){cx.fillRect(RX+tl*LW+LW*.28,0,LW*.06,h);cx.fillRect(RX+tl*LW+LW*.66,0,LW*.06,h)}
    cx.fillStyle='rgba(255,255,255,.1)';for(i=0;i<50;i++){cx.fillRect(RX+((i*47)%(3*LW)),((i*71+sc)%(h+20))-10,3,2)}
    cx.fillStyle='rgba(255,255,255,.65)';for(var dl=1;dl<3;dl++)for(var yd=-h*.2+(sc%(h*.1));yd<h;yd+=h*.1)cx.fillRect(RX+dl*LW-2,yd,4,h*.05);
    for(var side=-1;side<=1;side+=2){var ex=side<0?RX-w*.045:RX+3*LW;for(var kb=-2;kb<h/(h*.05)+2;kb++){var ky=kb*h*.05+(sc%(h*.1));cx.fillStyle=((kb+Math.floor(sc/(h*.1)))%2)?'#F5F5F5':'#D32F2F';rr(cx,ex,ky,w*.045,h*.05,3);cx.fill();cx.fillStyle='rgba(0,0,0,.2)';cx.fillRect(ex+(side<0?w*.04:0),ky,w*.005,h*.05)}}
    for(i=0;i<16;i++){var side2=i%2?1:-1,dy=((i*h*.19+sc*1.0)%(h*1.4))-h*.2,dxx=side2<0?RX-w*.075-((i*29)%11)*w*.004:RX+3*LW+w*.075+((i*29)%11)*w*.004,ty=i%4;cx.save();cx.translate(dxx,dy);cx.fillStyle='rgba(0,0,0,.2)';cx.beginPath();cx.ellipse(5,6,w*.03,w*.02,0,0,7);cx.fill();
      if(ty===0){cx.fillStyle='#2E7D32';rr(cx,-w*.012,-w*.04,w*.024,w*.08,w*.012);cx.fill();cx.fillStyle='#43A047';cx.beginPath();cx.arc(0,0,w*.016,0,7);cx.fill();cx.strokeStyle='#2E7D32';cx.lineWidth=w*.014;cx.lineCap='round';cx.beginPath();cx.moveTo(-w*.03,-w*.01);cx.lineTo(0,-w*.01);cx.moveTo(w*.03,w*.01);cx.lineTo(0,w*.01);cx.stroke();cx.fillStyle='#FF80AB';cx.beginPath();cx.arc(0,0,w*.006,0,7);cx.fill()}
      else if(ty===1){cx.fillStyle='#9E9E9E';cx.beginPath();for(var a2=0;a2<7;a2++)cx.lineTo(Math.cos(a2*.9)*w*(.022+.008*Math.sin(a2*3+i)),Math.sin(a2*.9)*w*(.02+.008*Math.sin(a2*2+i)));cx.fill();cx.fillStyle='rgba(255,255,255,.3)';cx.fillRect(-w*.01,-w*.012,w*.01,w*.006)}
      else if(ty===2){cx.fillStyle='#FFD54F';rr(cx,-w*.026,-w*.018,w*.052,w*.036,3);cx.fill();cx.strokeStyle='#B87800';cx.lineWidth=1.2;cx.strokeRect(-w*.026,-w*.018,w*.052,w*.036)}
      else{cx.strokeStyle='#ECEFF1';cx.lineWidth=2;cx.beginPath();cx.moveTo(0,w*.02);cx.lineTo(0,-w*.05);cx.stroke();var fc=['#E53935','#FFEB3B','#1E88E5'];for(var fi=0;fi<3;fi++){cx.fillStyle=fc[fi];cx.beginPath();cx.moveTo(0,-w*.05+fi*w*.02);cx.lineTo(-side2*w*.04,-w*.045+fi*w*.02+Math.sin(fr*.2+fi)*2);cx.lineTo(0,-w*.035+fi*w*.02);cx.fill()}}cx.restore()}
    rows.forEach(function(r){for(var l=0;l<3;l++)if(r.o[l])obst(r.o[l],lx(l),r.y,r.sd)});
    if(inv<=0||Math.floor(inv/5)%2)bike();
    stepP(cx,P,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
pong:function(cv,cx,w,h,score,over){
  var yF=h*.3,yN=h*.87,hwF=w*.17,hwN=w*.44;
  var BGS=(function(){var d=cv.width/w,c=document.createElement('canvas');c.width=w*d;c.height=h*d;var x=c.getContext('2d');x.scale(d,d);var i,k;
    var sk=x.createLinearGradient(0,0,0,yF);sk.addColorStop(0,'#E85D75');sk.addColorStop(.45,'#FF9A6B');sk.addColorStop(1,'#FFE3A8');x.fillStyle=sk;x.fillRect(0,0,w,yF+2);
    glow(x,w*.5,yF-h*.04,w*.55,'rgba(255,240,170,.85)');x.fillStyle='#FFF3C0';x.beginPath();x.arc(w*.5,yF-h*.03,w*.1,0,7);x.fill();
    x.fillStyle='rgba(255,255,255,.35)';[[.15,.05,.06],[.7,.08,.05],[.4,.14,.04]].forEach(function(q){cloud(x,q[0]*w,q[1]*h,w*q[2])});
    /* Fuji */
    x.fillStyle='#8E6FA6';x.beginPath();x.moveTo(w*.18,yF);x.lineTo(w*.44,yF-h*.17);x.lineTo(w*.5,yF-h*.18);x.lineTo(w*.58,yF-h*.17);x.lineTo(w*.86,yF);x.fill();
    x.fillStyle='#FFFFFF';x.beginPath();x.moveTo(w*.42,yF-h*.155);x.lineTo(w*.5,yF-h*.182);x.lineTo(w*.6,yF-h*.155);x.lineTo(w*.56,yF-h*.135);x.lineTo(w*.52,yF-h*.15);x.lineTo(w*.48,yF-h*.13);x.lineTo(w*.45,yF-h*.14);x.fill();
    x.fillStyle='#6A4E86';x.beginPath();x.moveTo(0,yF);x.lineTo(w*.12,yF-h*.08);x.lineTo(w*.3,yF);x.fill();x.beginPath();x.moveTo(w*.7,yF);x.lineTo(w*.88,yF-h*.1);x.lineTo(w,yF-h*.03);x.lineTo(w,yF);x.fill();
    /* Pagode */
    var pgx=w*.82,pgy=yF-h*.01;x.fillStyle='#4E342E';x.fillRect(pgx-w*.03,pgy-h*.06,w*.06,h*.06);for(k=0;k<4;k++){var py2=pgy-h*.055-k*h*.04,pw=w*(.11-k*.02);x.fillStyle='#B71C1C';x.beginPath();x.moveTo(pgx-pw,py2+h*.012);x.quadraticCurveTo(pgx-pw*.5,py2+h*.002,pgx,py2-h*.02);x.quadraticCurveTo(pgx+pw*.5,py2+h*.002,pgx+pw,py2+h*.012);x.closePath();x.fill();x.fillStyle='#3E2723';x.fillRect(pgx-pw*.55,py2+h*.012,pw*1.1,h*.012);x.fillStyle='#FFD54F';x.fillRect(pgx-pw*.1,py2+h*.013,pw*.2,h*.01)}x.fillStyle='#FFD54F';x.fillRect(pgx-1,pgy-h*.2,2,h*.04);
    /* Torii */
    var tgx=w*.14,tgy=yF+h*.02;x.fillStyle='#D32F2F';x.fillRect(tgx-w*.07,tgy-h*.17,w*.025,h*.17);x.fillRect(tgx+w*.045,tgy-h*.17,w*.025,h*.17);x.beginPath();x.moveTo(tgx-w*.1,tgy-h*.18);x.quadraticCurveTo(tgx,tgy-h*.2,tgx+w*.1,tgy-h*.18);x.lineTo(tgx+w*.09,tgy-h*.15);x.quadraticCurveTo(tgx,tgy-h*.17,tgx-w*.09,tgy-h*.15);x.fill();x.fillRect(tgx-w*.075,tgy-h*.13,w*.15,h*.015);x.fillStyle='#212121';x.fillRect(tgx-w*.1,tgy-h*.185,w*.2,h*.008);
    /* Sandgarten */
    x.fillStyle='#E8DDBB';x.fillRect(0,yF,w,h-yF);x.strokeStyle='rgba(150,130,90,.4)';x.lineWidth=1.5;for(i=0;i<16;i++){var gy=yF+Math.pow(i/16,1.6)*(h-yF);x.beginPath();x.moveTo(0,gy);x.lineTo(w,gy);x.stroke()}
    x.fillStyle='#9B9078';for(i=0;i<22;i++){var sx=gHash(i)*w,sy=yF+h*.05+gHash(i+4)*(h-yF-h*.08);x.beginPath();x.ellipse(sx,sy,3+gHash(i+8)*5,2+gHash(i+9)*3,0,0,7);x.fill()}
    /* Bambus links/rechts */
    [[.03,.5],[.07,.4],[.94,.5],[.97,.38],[.9,.3]].forEach(function(q,n){var bx=w*q[0],by=yF+h*.5;for(k=0;k<3;k++){var bxx=bx+k*7;x.strokeStyle=n%2?'#7CB342':'#9CCC65';x.lineWidth=5;x.beginPath();x.moveTo(bxx,by+h*.12);x.lineTo(bxx+1,by-h*q[1]*.6);x.stroke();x.strokeStyle='#33691E';x.lineWidth=1.3;for(var j=0;j<6;j++){x.beginPath();x.moveTo(bxx-3,by+h*.12-j*h*.07);x.lineTo(bxx+4,by+h*.12-j*h*.07);x.stroke()}x.fillStyle='#689F38';x.beginPath();x.ellipse(bxx+9,by-h*q[1]*.55,10,3,.5,0,7);x.ellipse(bxx-9,by-h*q[1]*.5,10,3,-.5,0,7);x.fill()}});
    /* Kirschbaum */
    function sak(sx,sy,r){x.fillStyle='#5D4037';x.beginPath();x.moveTo(sx-6,sy);x.quadraticCurveTo(sx-2,sy-r*.7,sx-14,sy-r*1.2);x.lineTo(sx-8,sy-r*1.2);x.quadraticCurveTo(sx+4,sy-r*.7,sx+6,sy);x.fill();[[0,-1.5,1],[-.9,-1.2,.8],[.9,-1.2,.8],[-.4,-1.8,.7],[.5,-1.8,.7]].forEach(function(q,n){x.fillStyle=['#F8BBD0','#F48FB1','#FCE4EC'][n%3];x.beginPath();x.arc(sx+q[0]*r,sy+q[1]*r,q[2]*r,0,7);x.fill()});x.fillStyle='rgba(255,255,255,.6)';for(i=0;i<20;i++)x.fillRect(sx+(gHash(i+sx)-.5)*r*3,sy-r*(.6+gHash(i+3)*1.5),2,2)}
    sak(w*.1,h*.74,h*.07);sak(w*.92,h*.62,h*.06);
    /* Steinlaternen */
    [[.04,.86],[.96,.82]].forEach(function(q){var lx=w*q[0],ly=h*q[1];x.fillStyle='#78909C';x.fillRect(lx-3,ly-h*.04,6,h*.04);x.fillRect(lx-8,ly,16,5);x.fillStyle='#90A4AE';x.fillRect(lx-9,ly-h*.075,18,h*.035);x.fillStyle='#FFE082';x.fillRect(lx-4,ly-h*.068,8,h*.02);x.fillStyle='#607D8B';x.beginPath();x.moveTo(lx-12,ly-h*.075);x.lineTo(lx,ly-h*.1);x.lineTo(lx+12,ly-h*.075);x.fill();glow(x,lx,ly-h*.058,18,'rgba(255,224,130,.5)')});
    return c})();
  function pj(u,v){var hw=hwF+(hwN-hwF)*v;return {x:w/2+(u-.5)*2*hw,y:yF+(yN-yF)*v,k:.55+.5*v}}
  var ru=.5,tu=.5,s=0,lives=3,cmb=0,flashT=0,fr=0,P=[],F=[],swing=0,oswing=0,pause=35,B=null,hv=null,slash=null,i;
  var unb=bindTap(cv,function(x){if(x!=null)tu=Math.max(0,Math.min(1,(x-w/2)/(2*hwN)+.5))});
  function mv(e){var t=e.touches?e.touches[0]:e,rc=cv.getBoundingClientRect();if(e.touches||e.buttons){tu=Math.max(0,Math.min(1,(t.clientX-rc.left-w/2)/(2*hwN)+.5));if(e.cancelable)e.preventDefault()}}
  cv.addEventListener('touchmove',mv,{passive:false});cv.addEventListener('mousemove',mv);
  function pickU(){return Math.random()<.7?(ru>.5?.08+Math.random()*.35:.57+Math.random()*.35):.08+Math.random()*.84}
  function dur(){return Math.max(34,78-s*1.5)}
  function serve(){B={t:0,u0:.5,v0:.04,u1:pickU(),v1:.93,T:dur()};oswing=1}
  function zz(t){return .28*t+.45*Math.sin(Math.PI*t)+1.7*(1-t)*(1-t)}
  function coco(x,y,r,rot){cx.save();cx.translate(x,y);cx.rotate(rot||0);cx.fillStyle=grad(cx,-r,-r,r,r,'#8D6E63','#4E342E');cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();cx.strokeStyle='rgba(30,15,5,.5)';cx.lineWidth=Math.max(1,r*.1);for(var k=0;k<5;k++){cx.beginPath();cx.arc(0,0,r*(.3+k*.14),k,k+1.3);cx.stroke()}cx.fillStyle='#2A1608';cx.beginPath();cx.arc(-r*.3,-r*.15,r*.13,0,7);cx.arc(r*.1,-r*.3,r*.13,0,7);cx.arc(-r*.05,r*.1,r*.13,0,7);cx.fill();cx.fillStyle='rgba(255,255,255,.25)';cx.beginPath();cx.ellipse(-r*.4,-r*.5,r*.25,r*.12,-.6,0,7);cx.fill();cx.restore()}
  var coco0=coco;coco=function(x,y,r,rot){coco0(x,y,r,rot);if(r>w*.012){cx.save();cx.translate(x,y);cx.fillStyle='#fff';cx.beginPath();cx.ellipse(-r*.32,-r*.1,r*.22,r*.18,0,0,7);cx.ellipse(r*.32,-r*.1,r*.22,r*.18,0,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(-r*.28,-r*.08,r*.09,0,7);cx.arc(r*.36,-r*.08,r*.09,0,7);cx.fill();cx.strokeStyle='#111';cx.lineWidth=Math.max(1.5,r*.12);cx.beginPath();cx.moveTo(-r*.6,-r*.45);cx.lineTo(-r*.1,-r*.25);cx.moveTo(r*.6,-r*.45);cx.lineTo(r*.1,-r*.25);cx.stroke();cx.fillStyle='#B71C1C';cx.beginPath();cx.moveTo(-r*.35,r*.35);cx.quadraticCurveTo(0,r*.1,r*.35,r*.35);cx.quadraticCurveTo(0,r*.6,-r*.35,r*.35);cx.fill();cx.fillStyle='#fff';cx.fillRect(-r*.12,r*.28,r*.08,r*.1);cx.fillRect(r*.05,r*.28,r*.08,r*.1);cx.restore()}};
  function half(x,y,r,rot,side){cx.save();cx.translate(x,y);cx.rotate(rot);cx.fillStyle=grad(cx,-r,-r,r,r,'#8D6E63','#4E342E');cx.beginPath();cx.arc(0,0,r,side>0?-Math.PI/2:Math.PI/2,side>0?Math.PI/2:Math.PI*1.5);cx.fill();cx.fillStyle='#FFF8E1';cx.fillRect(-1.5,-r,3,r*2);cx.fillStyle='#fff';cx.beginPath();cx.ellipse(0,0,r*.2,r,0,side>0?-Math.PI/2:Math.PI/2,side>0?Math.PI/2:Math.PI*1.5);cx.fill();cx.restore()}
  function sam(x,y,sc,sw){cx.save();cx.translate(x,y);cx.scale(sc,sc);cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(0,0,20,5,0,0,7);cx.fill();cx.fillStyle='#283593';cx.beginPath();cx.moveTo(-9,-42);cx.lineTo(9,-42);cx.lineTo(16,-2);cx.lineTo(-16,-2);cx.fill();cx.fillStyle='#1A237E';cx.beginPath();cx.moveTo(0,-42);cx.lineTo(0,-2);cx.lineTo(4,-2);cx.lineTo(3,-42);cx.fill();
    cx.fillStyle='#37474F';rr(cx,-13,-72,26,34,9);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(0,-56,4.5,0,7);cx.fill();cx.fillStyle='#B71C1C';cx.fillRect(-13,-42,26,4);
    cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(0,-80,9,0,7);cx.fill();cx.fillStyle='#212121';cx.beginPath();cx.arc(0,-82,9.5,Math.PI,0);cx.fill();cx.fillStyle='#C9A66B';cx.beginPath();cx.moveTo(-18,-84);cx.lineTo(0,-102);cx.lineTo(18,-84);cx.closePath();cx.fill();cx.strokeStyle='#8D6E3F';cx.lineWidth=1.5;cx.stroke();
    var a=-1.3+sw*2.6;cx.strokeStyle='#37474F';cx.lineWidth=6;cx.lineCap='round';cx.beginPath();cx.moveTo(10,-64);cx.lineTo(20,-52);cx.stroke();
    cx.save();cx.translate(20,-52);cx.rotate(a);cx.fillStyle='#8D1B1B';cx.fillRect(-2.5,0,5,12);cx.fillStyle='#FFD54F';cx.fillRect(-6,-2,12,3);cx.fillStyle=grad(cx,-3,0,3,0,'#ECEFF1','#90A4AE');cx.beginPath();cx.moveTo(-2.5,-3);cx.lineTo(2.5,-3);cx.lineTo(1.5,-80);cx.lineTo(-1.5,-80);cx.fill();cx.strokeStyle='rgba(255,255,255,.8)';cx.lineWidth=1;cx.beginPath();cx.moveTo(0,-6);cx.lineTo(0,-76);cx.stroke();cx.restore();
    cx.strokeStyle='#D32F2F';cx.lineWidth=6;cx.lineCap='round';cx.beginPath();cx.moveTo(-8,-62);cx.quadraticCurveTo(-24,-60+Math.sin(fr*.3)*5,-34,-52+Math.sin(fr*.3+1)*7);cx.stroke();
    if(sw>.1&&sw<.95){var al2=.9*(1-sw);cx.shadowColor='#FFF59D';cx.shadowBlur=18;cx.strokeStyle='rgba(255,255,255,'+al2+')';cx.lineWidth=11;cx.beginPath();cx.arc(20,-52,74,-1.3-1.57+sw*2.6-1.1,-1.3-1.57+sw*2.6);cx.stroke();cx.strokeStyle='rgba(255,213,79,'+al2+')';cx.lineWidth=4;cx.beginPath();cx.arc(20,-52,66,-1.3-1.57+sw*2.6-.8,-1.3-1.57+sw*2.6);cx.stroke();cx.shadowBlur=0}cx.restore()}
  function monkey(x,y,sc,ow){cx.save();cx.translate(x,y);cx.scale(sc,sc);var th=ow>0?ow:0;cx.strokeStyle='#5D4037';cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.moveTo(-8,-12);cx.quadraticCurveTo(-30,-10,-26,-34);cx.stroke();
    cx.fillStyle='#6D4C41';cx.beginPath();cx.ellipse(0,-18,14,18,0,0,7);cx.fill();cx.fillStyle='#D7B98E';cx.beginPath();cx.ellipse(0,-14,8,11,0,0,7);cx.fill();
    cx.strokeStyle='#6D4C41';cx.lineWidth=6;cx.beginPath();cx.moveTo(-10,-26);cx.lineTo(-18,-8);cx.moveTo(8,-26);cx.lineTo(14+th*10,-48-th*14+th*th*30);cx.stroke();
    cx.fillStyle='#6D4C41';cx.beginPath();cx.arc(0,-42,13,0,7);cx.arc(-13,-44,5.5,0,7);cx.arc(13,-44,5.5,0,7);cx.fill();cx.fillStyle='#E0C29A';cx.beginPath();cx.ellipse(0,-39,9,8,0,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(-4,-44,3,0,7);cx.arc(4,-44,3,0,7);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.arc(-4,-44,1.5,0,7);cx.arc(4,-44,1.5,0,7);cx.fill();cx.strokeStyle='#5D3A1F';cx.lineWidth=1.8;cx.beginPath();cx.arc(0,-37,3.5,.2,Math.PI-.2);cx.stroke();
    if(!th){coco(18,-52,7,0)}cx.restore()}
  var L=loopRun(function(f){fr+=f;swing=Math.max(0,swing-.07*f);oswing=Math.max(0,oswing-.07*f);var ms=.03*f,dd=tu-ru;ru+=Math.max(-ms,Math.min(ms,dd));
    if(pause>0){pause-=f;if(pause<=0)serve()}
    else if(B){B.t+=f/B.T;var u=B.u0+(B.u1-B.u0)*B.t,v=B.v0+(B.v1-B.v0)*B.t;
      if(B.t>=.86&&B.t<1.2&&!B.hit&&Math.abs(u-ru)<.12){B.hit=true;var pb=pj(u,v),lift=zz(Math.min(1,B.t))*h*.2*(.45+.55*v);swing=1;s++;score(s);hv={x:pb.x,y:pb.y-lift,r:w*.05*(.6+.9*v),l:0};slash=14;cmb++;flashT=7;shakeBox();burst(P,pb.x,pb.y-lift,36,['#fff','#FFF8E1','#8D6E63','#FFD54F','#E0E0E0'],12);for(var jp=0;jp<14;jp++)P.push({x:pb.x,y:pb.y-lift,vx:(Math.random()-.5)*9,vy:-Math.random()*6,l:40,c:'#F5F5F5',s:5});F.push({x:pb.x,y:pb.y-lift-20,t:cmb>1?'ZACK! x'+cmb:'ZACK! +1',l:46,c:cmb>2?'#FF5252':'#FFEB3B'});B=null;pause=28}
      else if(B.t>=1.12){lives--;cmb=0;var pm=pj(B.u1,.95);burst(P,pm.x,pm.y-h*.06,18,['#FF5252','#8D6E63'],8);F.push({x:w/2,y:h*.55,t:'BONK!',l:50,c:'#FF8A80'});B=null;pause=55;if(lives<=0){L.stop();unb();over();return}}}
    if(slash!==null){slash-=f;if(slash<=0)slash=null}
    cx.drawImage(BGS,0,0,w,h);for(i=0;i<14;i++){var px=((i*61+fr*(.35+i%3*.12))%(w+40))-20,py=((i*47+fr*(.7+i%4*.15))%(h*.9));cx.fillStyle='rgba(255,183,197,'+(.5+.3*Math.sin(fr*.1+i))+')';cx.save();cx.translate(px,py);cx.rotate(fr*.05+i);cx.beginPath();cx.ellipse(0,0,4,2.2,0,0,7);cx.fill();cx.restore()}
    var c1=pj(-.12,0),c2=pj(1.12,0),c3=pj(1.12,1.1),c4=pj(-.12,1.1);cx.fillStyle=grad(cx,0,yF,0,yN,'#9E9484','#6F665A');cx.beginPath();cx.moveTo(c1.x,c1.y);cx.lineTo(c2.x,c2.y);cx.lineTo(c3.x,c3.y);cx.lineTo(c4.x,c4.y);cx.fill();
    cx.strokeStyle='rgba(40,35,30,.4)';cx.lineWidth=1.5;for(i=0;i<=8;i++){var a2=pj(-.12+i*1.24/8,0),b2=pj(-.12+i*1.24/8,1.1);cx.beginPath();cx.moveTo(a2.x,a2.y);cx.lineTo(b2.x,b2.y);cx.stroke()}for(i=1;i<10;i++){var vv=Math.pow(i/10,1.4)*1.1,a3=pj(-.12,vv),b3=pj(1.12,vv);cx.beginPath();cx.moveTo(a3.x,a3.y);cx.lineTo(b3.x,b3.y);cx.stroke()}
    [-.12,1.12].forEach(function(uu){var t1=pj(uu,.02),t2=pj(uu,.95);cx.strokeStyle='#7CB342';cx.lineWidth=5;for(var k=0;k<7;k++){var vv2=k/6,pp=pj(uu,vv2*.95+.02);cx.beginPath();cx.moveTo(pp.x,pp.y);cx.lineTo(pp.x,pp.y-h*.12*pp.k);cx.stroke();cx.strokeStyle=k%2?'#9CCC65':'#689F38'}});
    var tp=pj(.5,0);cx.strokeStyle='#6D4C41';cx.lineWidth=11;cx.lineCap='round';cx.beginPath();cx.moveTo(tp.x,tp.y+4);cx.quadraticCurveTo(tp.x-10,tp.y-h*.1,tp.x,tp.y-h*.17);cx.stroke();cx.strokeStyle='#388E3C';cx.lineWidth=6;for(i=0;i<7;i++){var an=-Math.PI*.95+i*.33;cx.beginPath();cx.moveTo(tp.x,tp.y-h*.17);cx.quadraticCurveTo(tp.x+Math.cos(an)*w*.1,tp.y-h*.17+Math.sin(an)*w*.06-6,tp.x+Math.cos(an)*w*.17,tp.y-h*.17+Math.sin(an)*w*.1+14);cx.stroke()}
    monkey(tp.x+w*.02,tp.y-h*.15+Math.sin(fr*.12)*3,.9+Math.sin(fr*.12)*.03,B&&B.t<.12?B.t/.12:0);
    if(B){var tg=pj(B.u1,.93);cx.strokeStyle='rgba(255,235,59,'+(.4+.3*Math.sin(fr*.3))+')';cx.lineWidth=3;cx.beginPath();cx.ellipse(tg.x,tg.y,w*.075,w*.026,0,0,7);cx.stroke()}
    var py=pj(ru,.96);sam(py.x,py.y+Math.sin(fr*.15)*2,py.k*1.4*w/330,swing);
    if(B){var u2=B.u0+(B.u1-B.u0)*B.t,v2=B.v0+(B.v1-B.v0)*B.t,pb2=pj(u2,v2),z=zz(Math.min(1.3,B.t)),lift2=z*h*.2*(.45+.55*v2),br=w*.05*(.6+.9*v2);cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(pb2.x,pb2.y,br*1.2,br*.5,0,0,7);cx.fill();coco(pb2.x,pb2.y-lift2,br,fr*.2)}
    if(hv){hv.l+=f;var l=hv.l;half(hv.x-l*1.8,hv.y+l*l*.04-l*.8,hv.r,-l*.12,-1);half(hv.x+l*1.8,hv.y+l*l*.04-l*.8,hv.r,l*.12,1);if(l>45)hv=null}
    if(slash!==null){cx.strokeStyle='rgba(255,255,255,'+slash/14+')';cx.lineWidth=5;cx.lineCap='round';var sp=hv?hv:{x:w/2,y:h*.6};cx.beginPath();cx.moveTo(sp.x-w*.12,sp.y-w*.12);cx.lineTo(sp.x+w*.12,sp.y+w*.12);cx.stroke()}
    if(flashT>0){cx.fillStyle='rgba(255,255,255,'+flashT/10+')';cx.fillRect(0,0,w,h);flashT-=f}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb();cv.removeEventListener('touchmove',mv);cv.removeEventListener('mousemove',mv)}},
roulette:function(cv,cx,w,h,score,over){
  var fr=0,SEG=13,A=Math.PI*2/SEG,rot=0,state='pick',s=0,tm=0,rot0=0,rotD=0,idx=0,msg='Versuch 1 von 2: Wähle ein Feld',mcol='#fff',P=[],F=[],ccx=w/2,ccy=h*.19,R=Math.min(w*.31,h*.158),ba=0,Af=0,rb=R*.93,sel=null,tries=2,res='',RED=[1,3,6,8,10,11],FD=[],i;
  function col(n){return n===0?'#00A650':RED.indexOf(n)>=0?'#D32F2F':'#212121'}
  var gx=w*.04,gw=w*.92;
  FD.push({k:'r',t:'ROT',x:gx,y:h*.455,w:gw/2-4,h:h*.115,c:['#E53935','#8E0E0E'],pts:1,sub:'50 XP'},{k:'b',t:'SCHWARZ',x:gx+gw/2+4,y:h*.455,w:gw/2-4,h:h*.115,c:['#3A3A3A','#0C0C0C'],pts:1,sub:'50 XP'});
  [['r1','1–4',1,4],['r2','5–8',5,8],['r3','9–12',9,12]].forEach(function(a,j){FD.push({k:a[0],t:a[1],lo:a[2],hi:a[3],x:gx+j*(gw/3),y:h*.585,w:gw/3-5,h:h*.115,c:['#1E6BD6','#0D3C8A'],pts:2,sub:'150 XP'})});
  [3,7,11].forEach(function(n,j){FD.push({k:'n',n:n,t:''+n,x:gx+j*(gw/3),y:h*.715,w:gw/3-5,h:h*.115,c:RED.indexOf(n)>=0?['#E53935','#8E0E0E']:['#3A3A3A','#0C0C0C'],pts:3,sub:'300 XP'})});
  function win(f,n){if(n===0)return false;if(f.k==='r')return RED.indexOf(n)>=0;if(f.k==='b')return RED.indexOf(n)<0;if(f.k==='n')return n===f.n;return n>=f.lo&&n<=f.hi}
  var BTN={x:w*.15,y:h*.855,w:w*.7,h:h*.115};
  var unb=bindTap(cv,function(x,y){if(state!=='pick'||x==null)return;
    if(x>BTN.x&&x<BTN.x+BTN.w&&y>BTN.y&&y<BTN.y+BTN.h){if(!sel){msg='Setze zuerst deinen Jeton!';mcol='#FFD54F';return}state='spin';idx=Math.floor(Math.random()*SEG);rot0=rot;rotD=Math.PI*2*(3+Math.random()*2)+Math.random()*Math.PI*2;Af=-Math.PI/2+(idx+.5)*A+rot0+rotD;tm=0;msg='Rien ne va plus …';mcol='#FFD54F';return}
    FD.forEach(function(f){if(x>f.x&&x<f.x+f.w&&y>f.y&&y<f.y+f.h){sel=f;msg=f.t+' gewählt: '+f.sub+' bei Treffer';mcol='#fff'}})});
  function chip(x,y,r,c){cx.save();cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=5;cx.shadowOffsetY=2;cx.fillStyle=c;cx.beginPath();cx.ellipse(x,y,r,r*.78,0,0,7);cx.fill();cx.restore();cx.strokeStyle='#fff';cx.lineWidth=r*.2;cx.setLineDash([r*.38,r*.38]);cx.beginPath();cx.ellipse(x,y,r*.88,r*.69,0,0,7);cx.stroke();cx.setLineDash([])}
  var L=loopRun(function(f){fr+=f;
    if(state==='spin'){tm+=f;var k=Math.min(1,tm/170),e=1-Math.pow(1-k,3),e2=1-Math.pow(1-k,2);rot=rot0+rotD*e;ba=Af-Math.PI*2*5*Math.pow(1-e2,2);rb=k<.72?R*.93:R*.93-R*.2*Math.min(1,(k-.72)/.2)+Math.sin(tm*.9)*R*.015*(1-k);
      if(k>=1){tm=0;state='wait';if(win(sel,idx)){res='win';s=sel.pts;msg='Gewonnen! '+sel.sub;mcol='#FFD54F';burst(P,w/2,h*.21,50,['#FFD54F','#fff','#FF80AB','#80D8FF'],13)}else{res='lose';tries--;msg=idx===0?'Grün! Leider verloren.':'Leider verloren!';mcol='#FF8A80'}}}
    else if(state==='wait'){tm+=f;if(tm>(res==='win'?80:70)){if(res==='lose'&&tries>0){state='pick';sel=null;res='';rb=R*.93;msg='Noch 1 Versuch! Wähle ein Feld';mcol='#FFD54F';FD.forEach(function(q){q.pt=0});return}state='end';L.stop();unb();if(res==='win'){score(s);if(RW&&!RW.done)rwEnd()}else over();return}}
    var bg=cx.createRadialGradient(w/2,h*.65,10,w/2,h*.65,w*.8);bg.addColorStop(0,'#1E9A55');bg.addColorStop(1,'#07391F');cx.fillStyle=bg;cx.fillRect(0,0,w,h);
    cx.fillStyle=grad(cx,0,0,0,h*.445,'#4E2A10','#2A1406');cx.fillRect(0,0,w,h*.445);cx.strokeStyle='rgba(0,0,0,.25)';cx.lineWidth=1;for(i=0;i<11;i++){cx.beginPath();cx.moveTo(0,i*h*.035);cx.quadraticCurveTo(w/2,i*h*.035+6*Math.sin(i),w,i*h*.035);cx.stroke()}
    glow(cx,w/2,ccy,w*.5,'rgba(255,215,120,.35)');cx.fillStyle='#D4AF37';cx.fillRect(0,h*.443,w,4);
    cx.save();cx.translate(ccx,ccy);cx.shadowColor='rgba(0,0,0,.6)';cx.shadowBlur=14;cx.fillStyle=grad(cx,-R,-R,R,R,'#B87333','#4E2C0E');cx.beginPath();cx.arc(0,0,R*1.16,0,7);cx.fill();cx.shadowBlur=0;cx.strokeStyle='#E7C766';cx.lineWidth=3;cx.beginPath();cx.arc(0,0,R*1.1,0,7);cx.stroke();
    cx.rotate(rot);for(i=0;i<SEG;i++){cx.fillStyle=col(i);cx.beginPath();cx.moveTo(0,0);cx.arc(0,0,R,-Math.PI/2+i*A,-Math.PI/2+(i+1)*A);cx.fill();cx.strokeStyle='#D4AF37';cx.lineWidth=1.5;cx.stroke();cx.save();cx.rotate(-Math.PI/2+(i+.5)*A+Math.PI/2);cx.fillStyle='#fff';cx.font='bold '+R*.17+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(i,0,-R*.84);cx.restore()}
    cx.fillStyle=grad(cx,0,-R*.6,0,R*.6,'#3A2412','#1A0F07');cx.beginPath();cx.arc(0,0,R*.6,0,7);cx.fill();cx.strokeStyle='#D4AF37';cx.lineWidth=2;cx.stroke();cx.fillStyle=grad(cx,-R*.4,-R*.4,R*.4,R*.4,'#FFE082','#B8860B');cx.beginPath();cx.arc(0,0,R*.34,0,7);cx.fill();cx.restore();
    if(state==='spin'||state==='wait'){if(state==='wait')ba=Af;var bxx=ccx+Math.cos(ba)*rb,byy=ccy+Math.sin(ba)*rb;glow(cx,bxx,byy,R*.18,'rgba(255,255,255,.7)');cx.fillStyle='#fff';cx.beginPath();cx.arc(bxx,byy,R*.07,0,7);cx.fill()}
    cx.font='bold '+Math.floor(w*.046)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=4;cx.strokeStyle='rgba(0,0,0,.55)';cx.strokeText(msg,w/2,h*.425);cx.fillStyle=mcol;cx.fillText(msg,w/2,h*.425);
    FD.forEach(function(f){var on=sel===f,wn=state==='wait'&&on&&res==='win';cx.save();cx.shadowColor=on?'#FFD54F':'rgba(0,0,0,.4)';cx.shadowBlur=wn?24:on?12:4;cx.fillStyle=grad(cx,0,f.y,0,f.y+f.h,f.c[0],f.c[1]);rr(cx,f.x,f.y,f.w,f.h,9);cx.fill();cx.restore();cx.strokeStyle=on?'#FFD54F':'#D4AF37';cx.lineWidth=on?4:1.5;rr(cx,f.x+2,f.y+2,f.w-4,f.h-4,7);cx.stroke();
      cx.fillStyle='#fff';cx.textAlign='center';cx.textBaseline='middle';cx.font='bold '+Math.floor(w*(f.k==='n'?.065:.048))+'px sans-serif';cx.fillText(f.t,f.x+f.w/2,f.y+f.h*(f.k==='n'?.38:.34));cx.font='bold '+Math.floor(w*.026)+'px sans-serif';cx.fillStyle='#FFE082';cx.fillText(f.sub,f.x+f.w/2,f.y+f.h*(f.k==='n'?.78:.75));
      if(on){var pop=Math.min(1,(fr-(f.pt||(f.pt=fr)))/8);chip(f.x+f.w*.82,f.y+f.h*.5,Math.min(w*.04,f.h*.32)*(.6+.4*pop),'#1E88E5')}});
    var can=state==='pick'&&sel;cx.save();cx.shadowColor=can?'#FFD54F':'transparent';cx.shadowBlur=can?16+4*Math.sin(fr*.2):0;cx.fillStyle=grad(cx,0,BTN.y,0,BTN.y+BTN.h,can?'#FFD54F':'#8A8A8A',can?'#F57F17':'#555');rr(cx,BTN.x,BTN.y,BTN.w,BTN.h,16);cx.fill();cx.restore();cx.fillStyle=can?'#4A2C00':'#ddd';cx.font='bold '+Math.floor(w*.06)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('DREHEN',BTN.x+BTN.w/2,BTN.y+BTN.h/2);
    stepP(cx,P,f);floatTxt(cx,F,f)});
  return function(){L.stop();unb()}},
basket:function(cv,cx,w,h,score,over){
  var s=0,lives=3,fr=0,P=[],F=[],bx0=w/2,by0=h*.8,br=w*.058,HX=w*.5,HY=h*.3,rx=w*.085,m=.5,state='aim',sh=null,rt=0,res='',G=RW.g.g,bpos={x:bx0,y:by0,sc:1},mt=0,dead=0,zk=0,i;
  function tier(){return (s>=G[0]?1:0)+(s>=G[1]?1:0)}
  var unb=bindTap(cv,function(){if(state!=='aim')return;var t=tier(),e=m-.5,zs=[.045,.035,.026][t],zr=[.13,.1,.075][t],kind=Math.abs(e)<zs?'swish':Math.abs(e)<zr?'rim':'miss',tx=HX,ty=HY+rx*.05;
    if(kind==='rim'){tx=HX+(e>0?1:-1)*rx*.62}else if(kind==='miss'){if(e>0){tx=HX+(Math.random()-.5)*rx;ty=HY-h*.07}else{tx=HX+(Math.random()-.5)*rx*1.4;ty=HY+rx*.95}}
    sh={u:0,x0:bx0,y0:by0,tx:tx,ty:ty,kind:kind};state='fly';bpos={x:bx0,y:by0,sc:1}});
  function ball(x,y,r){cx.save();cx.translate(x,y);cx.rotate(fr*.08);cx.shadowColor='rgba(0,0,0,.35)';cx.shadowBlur=6;cx.fillStyle=grad(cx,-r,-r,r,r,'#FF9A3D','#D8530A');cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();cx.shadowBlur=0;cx.strokeStyle='#4A1F05';cx.lineWidth=Math.max(1.5,r*.08);cx.beginPath();cx.arc(0,0,r,0,7);cx.moveTo(-r,0);cx.lineTo(r,0);cx.moveTo(0,-r);cx.lineTo(0,r);cx.stroke();cx.beginPath();cx.arc(-r*1.15,0,r*.8,-.9,.9);cx.stroke();cx.beginPath();cx.arc(r*1.15,0,r*.8,Math.PI-.9,Math.PI+.9);cx.stroke();cx.restore()}
  var L=loopRun(function(f){fr+=f;mt+=f;zk+=((state==='aim'?0:1)-zk)*.1*f;var t=tier();m=.5+.5*Math.sin(mt*[.054,.066,.081][t]);
    if(state==='fly'){sh.u+=f/50;var u=Math.min(1,sh.u);bpos.x=sh.x0+(sh.tx-sh.x0)*u;bpos.y=sh.y0+(sh.ty-sh.y0)*u-4*h*.2*u*(1-u);bpos.sc=1-.45*u;
      if(sh.u>=1){state='res';rt=0;res=sh.kind;sh.bx=bpos.x;sh.by=bpos.y;sh.vx=0;sh.vy=0;
        if(res==='swish'){s+=2;score(s);F.push({x:HX,y:HY-rx*1.2,t:'SWISH! +2',l:50,c:'#FFEB3B'});burst(P,HX,HY,24,['#FFD54F','#fff','#FF9800'],9)}
        else if(res==='rim'){s+=1;score(s);F.push({x:HX,y:HY-rx*1.2,t:'Drin! +1',l:45,c:'#fff'})}
        else{lives--;F.push({x:HX,y:HY-rx*1.3,t:'Daneben!',l:50,c:'#FF8A80'});sh.vx=(Math.random()-.5)*5;sh.vy=-3-Math.random()*2;if(lives<=0)dead=1}}}
    else if(state==='res'){rt+=f;if(res==='swish'){bpos.x=HX;bpos.y=HY+Math.min(h*.2,rt*3.5);bpos.sc=.55}
      else if(res==='rim'){var q=Math.min(1,rt/22);bpos.x=sh.bx+(HX-sh.bx)*q+Math.sin(rt*.7)*rx*.2*(1-q);bpos.y=rt<22?HY-rx*.05:HY+Math.min(h*.2,(rt-22)*3.5);bpos.sc=.55}
      else{sh.vy+=.25*f;sh.bx+=sh.vx*f;sh.by+=sh.vy*f;bpos.x=sh.bx;bpos.y=sh.by;bpos.sc=.55;if(sh.by>h*.7){sh.by=h*.7;sh.vy*=-.5}}
      if(rt>(res==='miss'?50:55)){if(dead){L.stop();unb();over();return}state='aim';HX=w*(.3+Math.random()*.4);bpos={x:bx0,y:by0,sc:1}}}
    cx.save();var zz=1+.8*zk,fx2=HX+(bpos.x-HX)*.25,fy2=HY+(bpos.y-HY)*.3+h*.03,fcx=Math.max(w/(2*zz),Math.min(w-w/(2*zz),fx2)),fcy=Math.max(h/(2*zz),Math.min(h-h/(2*zz),fy2));cx.translate(w/2,h/2);cx.scale(zz,zz);cx.translate(-fcx,-fcy);
    var wl=cx.createLinearGradient(0,0,0,h*.56);wl.addColorStop(0,'#0E1238');wl.addColorStop(1,'#27327E');cx.fillStyle=wl;cx.fillRect(0,0,w,h*.56);
    for(i=0;i<8;i++){cx.fillStyle=i%2?'#1B2466':'#222E7C';cx.fillRect(i*w/8,h*.17,w/8,h*.39);cx.fillStyle='rgba(255,255,255,.07)';cx.fillRect(i*w/8+2,h*.17,3,h*.39);cx.fillStyle='rgba(0,0,0,.25)';cx.fillRect(i*w/8+w/8-4,h*.17,4,h*.39)}
    cx.fillStyle='#0A0D2C';cx.fillRect(0,0,w,h*.13);cx.strokeStyle='#37474F';cx.lineWidth=2;for(i=0;i<=14;i++){cx.beginPath();cx.moveTo(i*w/14,0);cx.lineTo(i*w/14+w/28,h*.13);cx.moveTo(i*w/14+w/14,0);cx.lineTo(i*w/14+w/28,h*.13);cx.stroke()}cx.fillStyle='#546E7A';cx.fillRect(0,h*.125,w,5);
    [.14,.38,.62,.86].forEach(function(lx,j){var ly=h*.13;cx.fillStyle='rgba(255,250,200,.07)';cx.beginPath();cx.moveTo(w*lx-8,ly);cx.lineTo(w*lx+8,ly);cx.lineTo(w*lx+w*.2,h*.58);cx.lineTo(w*lx-w*.2,h*.58);cx.fill();glow(cx,w*lx,ly,w*.14,'rgba(255,250,200,.7)');cx.fillStyle='#FFF8D0';rr(cx,w*lx-w*.04,ly-4,w*.08,8,4);cx.fill()});
    var bn=[['EASY','#E53935'],['SCHOOL','#FDD835'],['HOOPS','#43A047'],['SWISH','#1E88E5']];bn.forEach(function(b2,j){var bx3=w*(.03+j*.245);cx.fillStyle=b2[1];rr(cx,bx3,h*.4,w*.22,h*.075,6);cx.fill();cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=2;rr(cx,bx3+3,h*.4+3,w*.22-6,h*.075-6,4);cx.stroke();cx.fillStyle=j===1?'#222':'#fff';cx.font='bold '+Math.floor(w*.04)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(b2[0],bx3+w*.11,h*.4+h*.0375)});
    cx.fillStyle='#111';rr(cx,w*.38,h*.15,w*.24,h*.09,6);cx.fill();cx.strokeStyle='#78909C';cx.lineWidth=2;rr(cx,w*.38,h*.15,w*.24,h*.09,6);cx.stroke();cx.fillStyle='#FF3D00';cx.font='bold '+Math.floor(w*.07)+'px monospace';cx.fillText((s<10?'0':'')+s,w*.5,h*.197);
    var fl2=cx.createLinearGradient(0,h*.56,0,h);fl2.addColorStop(0,'#E5AE6E');fl2.addColorStop(1,'#9C5E28');cx.fillStyle=fl2;cx.fillRect(0,h*.56,w,h*.44);cx.fillStyle='#4E2C0E';cx.fillRect(0,h*.555,w,5);
    cx.strokeStyle='rgba(90,50,15,.38)';cx.lineWidth=1.2;for(i=0;i<14;i++){cx.beginPath();cx.moveTo(w/2+(i-6.5)*w*.035,h*.56);cx.lineTo(w/2+(i-6.5)*w*.3,h);cx.stroke()}for(i=1;i<9;i++){var py=h*.56+Math.pow(i/9,1.5)*h*.44;cx.beginPath();cx.moveTo(0,py);cx.lineTo(w,py);cx.stroke()}
    cx.fillStyle='rgba(192,57,43,.38)';cx.beginPath();cx.moveTo(w*.36,h*.6);cx.lineTo(w*.64,h*.6);cx.lineTo(w*.74,h*.86);cx.lineTo(w*.26,h*.86);cx.fill();
    cx.strokeStyle='rgba(255,255,255,.9)';cx.lineWidth=3;cx.beginPath();cx.moveTo(w*.03,h*.6);cx.lineTo(w*.97,h*.6);cx.moveTo(w*.36,h*.6);cx.lineTo(w*.26,h*.86);cx.lineTo(w*.74,h*.86);cx.lineTo(w*.64,h*.6);cx.stroke();cx.beginPath();cx.ellipse(w/2,h*.86,w*.13,h*.04,0,0,Math.PI*2);cx.stroke();cx.beginPath();cx.ellipse(w/2,h*.6,w*.45,h*.28,0,0,Math.PI);cx.stroke();
    glow(cx,HX,h*.7,w*.25,'rgba(255,240,200,.25)');
    var bbw=rx*3.6,bby=HY-h*.2;cx.strokeStyle='#90A4AE';cx.lineWidth=7;cx.beginPath();cx.moveTo(HX-bbw*.2,bby);cx.lineTo(HX-bbw*.2,h*.1);cx.moveTo(HX+bbw*.2,bby);cx.lineTo(HX+bbw*.2,h*.1);cx.stroke();
    cx.save();cx.shadowColor='rgba(0,0,0,.45)';cx.shadowBlur=12;cx.shadowOffsetY=5;cx.fillStyle=grad(cx,HX-bbw/2,bby,HX+bbw/2,bby+h*.18,'rgba(235,248,255,.92)','rgba(190,220,245,.8)');rr(cx,HX-bbw/2,bby,bbw,h*.18,6);cx.fill();cx.restore();
    cx.strokeStyle='#ECEFF1';cx.lineWidth=6;rr(cx,HX-bbw/2,bby,bbw,h*.18,6);cx.stroke();cx.strokeStyle='rgba(120,144,156,.8)';cx.lineWidth=1.5;rr(cx,HX-bbw/2+5,bby+5,bbw-10,h*.18-10,4);cx.stroke();cx.fillStyle='rgba(255,255,255,.35)';cx.beginPath();cx.moveTo(HX-bbw/2+8,bby+8);cx.lineTo(HX-bbw/2+bbw*.28,bby+8);cx.lineTo(HX-bbw/2+8,bby+h*.12);cx.fill();
    cx.strokeStyle='#E53935';cx.lineWidth=4;cx.strokeRect(HX-rx*.75,HY-h*.085,rx*1.5,h*.07);cx.fillStyle='#546E7A';rr(cx,HX-rx*.14,HY-h*.018,rx*.28,h*.026,3);cx.fill();cx.strokeStyle='#37474F';cx.lineWidth=2;cx.stroke();
    cx.strokeStyle='#BF360C';cx.lineWidth=8;cx.beginPath();cx.ellipse(HX,HY,rx,rx*.28,0,Math.PI,Math.PI*2);cx.stroke();cx.strokeStyle='#FF8A50';cx.lineWidth=3;cx.beginPath();cx.ellipse(HX,HY-1,rx,rx*.28,0,Math.PI*1.1,Math.PI*1.9);cx.stroke();
    var showBall=true;if(state==='res'&&res==='rim'&&rt>=22||state==='res'&&res==='swish'){}
    ball(bpos.x,bpos.y,br*bpos.sc);
    var sw=state==='res'&&res!=='miss'?Math.sin(rt*.5)*3*Math.max(0,1-rt/40):0;cx.strokeStyle='rgba(255,255,255,.92)';cx.lineWidth=1.5;var nt=h*.1;function nx(k2,u){return HX+(-rx+k2*rx/3)*(1-.42*u)+sw*u}for(i=0;i<=6;i++){if(i<6){cx.beginPath();cx.moveTo(nx(i,0),HY+rx*.05);cx.lineTo(nx(i+1,1),HY+nt);cx.stroke()}if(i>0){cx.beginPath();cx.moveTo(nx(i,0),HY+rx*.05);cx.lineTo(nx(i-1,1),HY+nt);cx.stroke()}}for(i=1;i<4;i++){var yy=HY+nt*i/4,ww=rx*(1-.42*i/4);cx.beginPath();cx.moveTo(HX-ww+sw*i/4,yy);cx.lineTo(HX+ww+sw*i/4,yy);cx.stroke()}
    cx.strokeStyle='#BF360C';cx.lineWidth=8;cx.beginPath();cx.ellipse(HX,HY,rx,rx*.28,0,0,Math.PI);cx.stroke();cx.strokeStyle='#FF8A50';cx.lineWidth=3;cx.beginPath();cx.ellipse(HX,HY+1,rx,rx*.28,0,.15,Math.PI-.15);cx.stroke();
    if(state==='aim'){ball(bx0,by0,br)}
    var bxL=w*.12,bww=w*.76,byy=h*.925,bhh=h*.04;cx.fillStyle='#111';rr(cx,bxL-3,byy-3,bww+6,bhh+6,8);cx.fill();var zs2=[.045,.035,.026][t],zr2=[.13,.1,.075][t];
    cx.fillStyle='#E53935';cx.fillRect(bxL,byy,bww,bhh);cx.fillStyle='#FDD835';cx.fillRect(bxL+bww*(.5-zr2),byy,bww*zr2*2,bhh);cx.fillStyle='#43A047';cx.fillRect(bxL+bww*(.5-zs2),byy,bww*zs2*2,bhh);
    var mx=bxL+bww*m;cx.fillStyle='#fff';cx.shadowColor='#000';cx.shadowBlur=5;cx.beginPath();cx.moveTo(mx,byy-6);cx.lineTo(mx+9,byy-18);cx.lineTo(mx-9,byy-18);cx.fill();cx.fillRect(mx-2,byy-4,4,bhh+8);cx.shadowBlur=0;
    stepP(cx,P,f);floatTxt(cx,F,f);cx.restore();hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
round:function(cv,cx,w,h,score,over){
  var C={x:w/2,y:h/2+h*.01},Rc=Math.min(w,h)*.285,cs=Rc*.4,cw=cs*.56,L0=cw*.78,al=Math.atan2(L0,Rc),rw=L0+cw*.8,s=0,lives=3,cars=[],q=[[],[],[],[]],cd=[40,110,190,260],P=[],F=[],fr=0,G=RW.g.g,gapQ=cs*1.3,uLine=cs*.85,seeded=0,i,r;
  var COLS=['#E53935','#1E88E5','#FDD835','#43A047','#8E24AA','#FF7043','#ECEFF1','#26C6DA'],DM=[0,1,2,3].map(function(r){return (r%2?h:w)/2-Rc+cs*.5});
  function D(r){var t=r*Math.PI/2;return {x:Math.cos(t),y:Math.sin(t),rx:Math.sin(t),ry:-Math.cos(t),t:t}}
  var dirs=[D(0),D(1),D(2),D(3)];
  function tier(){return (s>=G[0]?1:0)+(s>=G[1]?1:0)}
  function vs(){return Rc*.026*(1+.13*tier())}
  var unb=bindTap(cv,function(x,y){if(x==null)return;var f=q[1][0];if(f&&f.phase==='q'&&f.u<=uLine+cs*1.5){f.phase='in';q[1].shift()}});
  function pos(c){var d,k;if(c.phase==='q'||c.phase==='in'){d=dirs[c.r];return {x:C.x+d.x*(Rc+c.u)+d.rx*L0,y:C.y+d.y*(Rc+c.u)+d.ry*L0,a:d.t+Math.PI}}
    if(c.phase==='circ'){var rr2=Rc*(1+.044*Math.max(0,1-c.p/.5));return {x:C.x+rr2*Math.cos(c.a),y:C.y+rr2*Math.sin(c.a),a:Math.atan2(-Math.cos(c.a),Math.sin(c.a))}}
    d=dirs[c.re];return {x:C.x+d.x*(Rc+c.u)-d.rx*L0,y:C.y+d.y*(Rc+c.u)-d.ry*L0,a:d.t}}
  function car(c){var p=pos(c);c.px=p.x;c.py=p.y;var L2=cs,W2=cw;
    cx.save();cx.translate(p.x+3,p.y+6);cx.rotate(p.a);cx.fillStyle='rgba(0,0,0,.32)';rr(cx,-L2/2,-W2/2,L2,W2,W2*.3);cx.fill();cx.restore();
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);
    cx.fillStyle='#111';[[-.3,-.52],[.3,-.52],[-.3,.52],[.3,.52]].forEach(function(q){rr(cx,L2*q[0]-L2*.11,W2*q[1]-W2*.12,L2*.22,W2*.2,2);cx.fill()});
    var g2=cx.createLinearGradient(0,-W2/2,0,W2/2);g2.addColorStop(0,c.col);g2.addColorStop(.5,c.col);g2.addColorStop(1,'rgba(0,0,0,.45)');cx.fillStyle=c.col;rr(cx,-L2/2,-W2/2,L2,W2,W2*.3);cx.fill();cx.fillStyle=g2;rr(cx,-L2/2,-W2/2,L2,W2,W2*.3);cx.fill();
    cx.strokeStyle='rgba(0,0,0,.35)';cx.lineWidth=1.2;rr(cx,-L2/2,-W2/2,L2,W2,W2*.3);cx.stroke();
    cx.fillStyle='rgba(255,255,255,.28)';rr(cx,-L2*.45,-W2*.46,L2*.9,W2*.2,W2*.1);cx.fill();
    cx.fillStyle='#263238';rr(cx,-L2*.2,-W2*.36,L2*.42,W2*.72,W2*.18);cx.fill();cx.fillStyle=c.col;rr(cx,-L2*.12,-W2*.3,L2*.26,W2*.6,W2*.12);cx.fill();cx.fillStyle='rgba(255,255,255,.35)';rr(cx,-L2*.1,-W2*.28,L2*.1,W2*.5,3);cx.fill();
    cx.fillStyle='#81D4FA';cx.beginPath();cx.moveTo(L2*.22,-W2*.34);cx.lineTo(L2*.36,-W2*.28);cx.lineTo(L2*.36,W2*.28);cx.lineTo(L2*.22,W2*.34);cx.closePath();cx.fill();
    cx.fillStyle='#FFF59D';cx.beginPath();cx.arc(L2*.47,-W2*.3,W2*.09,0,7);cx.arc(L2*.47,W2*.3,W2*.09,0,7);cx.fill();cx.fillStyle='#E53935';cx.fillRect(-L2*.5,-W2*.36,L2*.04,W2*.16);cx.fillRect(-L2*.5,W2*.2,L2*.04,W2*.16);
    cx.restore()}
  function crash(a,b){lives--;var x=(a.px+b.px)/2,y=(a.py+b.py)/2;burst(P,x,y,40,['#FF5252','#FFEB3B','#FF9800','#333','#fff'],13);F.push({x:x,y:y-cs,t:'CRASH!',l:55,c:'#FF5252'});a.dead=b.dead=true}
  var L=loopRun(function(f){fr+=f;var t=tier(),v=vs(),k;
    r=1;cd[1]-=f;if(cd[1]<=0){cd[1]=[80,66,54][t]*(.8+Math.random()*.4);var last=q[1][q[1].length-1];if(q[1].length<4&&!(last&&last.u>DM[1]-gapQ)){var nc={r:1,phase:'q',u:DM[1],col:COLS[Math.floor(Math.random()*COLS.length)]};q[1].push(nc);cars.push(nc)}}
    var circN=cars.filter(function(c){return c.phase==='circ'&&!c.dead}).length;if(circN>9){var old=null;cars.forEach(function(c){if(c.phase==='circ'&&c.da>1e8&&(!old||c.p>old.p))old=c});if(old&&old.p>.3){var kk=Math.ceil((old.p+2*al+.5)/(Math.PI/2));old.k=kk;old.da=kk*Math.PI/2-2*al}}
    for(r=0;r<4;r++)q[r].forEach(function(c,idx){var uT=uLine+idx*gapQ;if(c.u>uT)c.u=Math.max(uT,c.u-v*1.15*f)});
    cars.forEach(function(c){if(c.dead)return;if(c.phase==='in'){c.u-=v*1.25*f;if(c.u<=0){c.phase='circ';var d=dirs[c.r];c.k=1;c.a=d.t-al;c.p=0;c.da=1e9;s++;score(s);F.push({x:c.px,y:c.py-cs*.6,t:'+1',l:34,c:'#fff'})}}
      else if(c.phase==='circ'){var dp=v/Rc*f;c.a-=dp;c.p+=dp;if(c.p>=c.da){c.phase='out';c.re=((c.r-c.k)%4+4)%4;c.u=0}}
      else if(c.phase==='out'){c.u+=v*1.25*f;if(c.u>DM[c.re]+cs*2)c.dead=true}});
    cars.forEach(function(c){if(c.px===undefined)return;c.phase!=='q'&&c.phase!=='out'&&cars.forEach(function(d){if(c===d||c.dead||d.dead||d.px===undefined)return;if((d.phase==='in'||d.phase==='circ')&&Math.hypot(c.px-d.px,c.py-d.py)<cs*.9)crash(c,d)})});
    cars=cars.filter(function(c){return !c.dead});if(!seeded){seeded=1;for(i=0;i<3;i++)cars.push({r:1,phase:'circ',col:COLS[i*2],a:i*2.1+1,p:.6,da:1e9,k:1})}if(lives<=0){L.stop();unb();over();return}
    cx.fillStyle='#6DBE5A';cx.fillRect(0,0,w,h);cx.fillStyle='rgba(255,255,255,.07)';for(i=0;i<40;i++)cx.fillRect((i*53)%w,(i*37)%h,6,2);
    var hc=[['#E57373','#B71C1C'],['#FFB74D','#E65100'],['#64B5F6','#0D47A1'],['#BA68C8','#6A1B9A']];[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(sg,j){var qx=sg[0]<0?6:C.x+rw+8,qy=sg[1]<0?6:C.y+rw+8,qw=sg[0]<0?C.x-rw-14:w-C.x-rw-14,qh=sg[1]<0?C.y-rw-14:h-C.y-rw-14;if(qw<20||qh<20)return;cx.fillStyle=grad(cx,0,qy,0,qy+qh,'#9BDB82','#74BE5E');rr(cx,qx,qy,qw,qh,10);cx.fill();cx.strokeStyle='#CFD3D8';cx.lineWidth=3;rr(cx,qx,qy,qw,qh,10);cx.stroke();
      var hx=qx+qw*.2,hw=qw*.54,hh=qh*.3,hy=qy+qh*.42,dp=Math.min(qw,qh)*.17,sx=sg[0]<0?1:-1;
      /* Garten: Rasenstreifen, Zaun, Weg, Beete */
      cx.fillStyle='rgba(255,255,255,.07)';for(var gs=0;gs<qh;gs+=14)cx.fillRect(qx,qy+gs,qw,7);
      cx.strokeStyle='#F5F5F5';cx.lineWidth=2;rr(cx,qx+5,qy+5,qw-10,qh-10,8);cx.stroke();cx.fillStyle='#E0E0E0';for(var fp=0;fp<qw-10;fp+=9)cx.fillRect(qx+5+fp,qy+3,2,5);
      cx.fillStyle='#CFC3AE';cx.fillRect(hx+hw*.42,hy+hh,hw*.16,(sg[1]<0?qy+qh-hy-hh:hy+hh-qy)*0+qh*.25);cx.fillStyle='rgba(0,0,0,.08)';for(var pp=0;pp<qh*.25;pp+=7)cx.fillRect(hx+hw*.42,hy+hh+pp,hw*.16,1.5);
      [[.05,.82],[.78,.82]].forEach(function(f2,k2){for(var fl=0;fl<5;fl++){cx.fillStyle=['#FF5252','#FFEB3B','#FF80AB','#fff','#B388FF'][(fl+k2)%5];cx.beginPath();cx.arc(hx+hw*f2[0]+fl*5,hy+hh+qh*.06+(fl%2)*3,2.4,0,7);cx.fill()}});
      /* Schatten */
      cx.fillStyle='rgba(0,0,0,.28)';cx.beginPath();cx.moveTo(hx+hw,hy+hh);cx.lineTo(hx+hw+dp*1.5,hy+hh-dp*.2+dp*1.0);cx.lineTo(hx+dp*1.5,hy+hh+dp*1.0);cx.lineTo(hx,hy+hh);cx.fill();
      /* Hauswand (Fassade) */
      var wallc=hc[j][0];cx.fillStyle=wallc;cx.fillRect(hx,hy,hw,hh);cx.fillStyle='rgba(255,255,255,.18)';cx.fillRect(hx,hy,hw,hh*.12);cx.fillStyle='rgba(0,0,0,.14)';for(var br=0;br<hh;br+=6)cx.fillRect(hx,hy+br,hw,1);
      cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.moveTo(hx+hw,hy);cx.lineTo(hx+hw+dp*.7,hy-dp*.45);cx.lineTo(hx+hw+dp*.7,hy+hh-dp*.45);cx.lineTo(hx+hw,hy+hh);cx.fill();
      [.14,.64].forEach(function(a2){var wx2=hx+hw*a2,wy2=hy+hh*.2,ww2=hw*.22,wh2=hh*.34;cx.fillStyle='#fff';cx.fillRect(wx2-2,wy2-2,ww2+4,wh2+4);cx.fillStyle=grad(cx,0,wy2,0,wy2+wh2,'#B3E5FC','#4FC3F7');cx.fillRect(wx2,wy2,ww2,wh2);cx.fillStyle='#fff';cx.fillRect(wx2+ww2/2-1,wy2,2,wh2);cx.fillRect(wx2,wy2+wh2/2-1,ww2,2);cx.fillStyle='rgba(255,255,255,.4)';cx.beginPath();cx.moveTo(wx2,wy2+wh2);cx.lineTo(wx2+ww2*.5,wy2);cx.lineTo(wx2+ww2*.75,wy2);cx.lineTo(wx2+ww2*.25,wy2+wh2);cx.fill();cx.fillStyle='#8D6E63';cx.fillRect(wx2-3,wy2+wh2+2,ww2+6,3);cx.fillStyle='#43A047';for(var bl=0;bl<4;bl++){cx.beginPath();cx.arc(wx2+ww2*(.1+bl*.27),wy2+wh2+1.5,2.2,0,7);cx.fill()}});
      cx.fillStyle='#5D4037';rr(cx,hx+hw*.42,hy+hh*.5,hw*.16,hh*.5,3);cx.fill();cx.fillStyle='#FFD54F';cx.beginPath();cx.arc(hx+hw*.55,hy+hh*.78,1.8,0,7);cx.fill();cx.fillStyle='#fff';cx.fillRect(hx+hw*.38,hy+hh*.47,hw*.24,3);
      /* Dach von oben mit Ziegeln, First, Kamin, Dachfenster */
      var rc=hc[j][1],rh=hh*.62;cx.fillStyle=rc;cx.beginPath();cx.moveTo(hx-hw*.07,hy+2);cx.lineTo(hx+hw*.5,hy-rh);cx.lineTo(hx+hw+hw*.07,hy+2);cx.closePath();cx.fill();
      cx.fillStyle='rgba(255,255,255,.14)';cx.beginPath();cx.moveTo(hx-hw*.07,hy+2);cx.lineTo(hx+hw*.5,hy-rh);cx.lineTo(hx+hw*.5,hy+2);cx.closePath();cx.fill();
      cx.strokeStyle='rgba(0,0,0,.22)';cx.lineWidth=1;for(var rl=1;rl<7;rl++){var ry=hy+2-rh*rl/7,rwd=(hw*.57)*(1-rl/7);cx.beginPath();cx.moveTo(hx+hw*.5-rwd,ry);cx.lineTo(hx+hw*.5+rwd,ry);cx.stroke();for(var rt=-rwd;rt<rwd;rt+=7){cx.beginPath();cx.moveTo(hx+hw*.5+rt,ry);cx.lineTo(hx+hw*.5+rt,ry+rh/7);cx.stroke()}}
      cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.moveTo(hx+hw*.5,hy-rh);cx.lineTo(hx+hw+hw*.07,hy+2);cx.lineTo(hx+hw+dp*.7+hw*.07,hy-dp*.45);cx.lineTo(hx+hw*.5+dp*.5,hy-rh-dp*.3);cx.fill();
      cx.fillStyle='#8D6E63';cx.fillRect(hx+hw*.72,hy-rh*.7,hw*.1,rh*.5);cx.fillStyle='#5D4037';cx.fillRect(hx+hw*.7,hy-rh*.72,hw*.14,4);cx.fillStyle='rgba(200,200,200,.5)';cx.beginPath();cx.arc(hx+hw*.78+Math.sin(fr*.05+j)*3,hy-rh*.9-fr%40*.2,4+((fr%40)/10),0,7);cx.fill();
      cx.fillStyle='#B3E5FC';cx.fillRect(hx+hw*.34,hy-rh*.42,hw*.14,rh*.2);cx.strokeStyle='#fff';cx.lineWidth=1.5;cx.strokeRect(hx+hw*.34,hy-rh*.42,hw*.14,rh*.2);
      /* geparktes Auto in der Einfahrt */
      cx.save();cx.translate(hx+hw*.5+(j%2?1:-1)*hw*.62,hy+hh+qh*.12);cx.fillStyle='rgba(0,0,0,.25)';cx.fillRect(-9,-4,20,12);cx.fillStyle=['#E53935','#1E88E5','#FDD835','#43A047'][j];rr(cx,-10,-6,20,12,3);cx.fill();cx.fillStyle='#263238';rr(cx,-4,-5,9,10,2);cx.fill();cx.fillStyle='#81D4FA';cx.fillRect(4,-4,3,8);cx.restore();
      [[.85,.2],[.12,.88],[.88,.9]].forEach(function(t2,k3){var tx2=qx+qw*t2[0],ty2=qy+qh*t2[1],tr=Math.min(qw,qh)*(.07-k3*.01);cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.ellipse(tx2+tr*.5,ty2+tr*1.1,tr*1.1,tr*.45,0,0,7);cx.fill();cx.fillStyle='#5D4037';cx.fillRect(tx2-tr*.12,ty2,tr*.24,tr*.9);cx.fillStyle='#2E7D32';cx.beginPath();cx.arc(tx2,ty2-tr*.1,tr,0,7);cx.fill();cx.fillStyle='#43A047';cx.beginPath();cx.arc(tx2-tr*.15,ty2-tr*.3,tr*.7,0,7);cx.fill();cx.fillStyle='rgba(200,255,150,.45)';cx.beginPath();cx.arc(tx2-tr*.3,ty2-tr*.5,tr*.3,0,7);cx.fill()})});
    dirs.forEach(function(d){cx.save();cx.translate(C.x,C.y);cx.rotate(d.t);cx.fillStyle='#C9CCD1';cx.fillRect(Rc*.4,-rw-4,w,2*rw+8);cx.fillStyle='#3F434B';cx.fillRect(Rc*.4,-rw,w,2*rw);cx.strokeStyle='#fff';cx.lineWidth=2;cx.setLineDash([10,10]);cx.beginPath();cx.moveTo(Rc+cs*1.6,0);cx.lineTo(w,0);cx.stroke();cx.setLineDash([]);cx.fillStyle='rgba(255,255,255,.85)';for(var z=-rw+3;z<rw-4;z+=7)cx.fillRect(Rc+cs*.5,z,cs*.4,4);cx.fillStyle='#fff';cx.fillRect(Rc+uLine+cs*.55,0,3,rw);cx.restore()});
    cx.fillStyle='#C9CCD1';cx.beginPath();cx.arc(C.x,C.y,Rc+cw*.8+4,0,7);cx.fill();cx.fillStyle='#3F434B';cx.beginPath();cx.arc(C.x,C.y,Rc+cw*.8,0,7);cx.fill();
    cx.strokeStyle='rgba(255,255,255,.4)';cx.lineWidth=2;cx.setLineDash([8,10]);cx.beginPath();cx.arc(C.x,C.y,Rc,0,7);cx.stroke();cx.setLineDash([]);
    var IR=Rc-cw*.8;cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.ellipse(C.x+4,C.y+12,IR,IR,0,0,7);cx.fill();cx.fillStyle='#9E9E9E';cx.beginPath();cx.arc(C.x,C.y+8,IR,0,7);cx.fill();cx.fillRect(C.x-IR,C.y,IR*2,8);cx.fillStyle='#757575';cx.beginPath();cx.arc(C.x,C.y+8,IR,0,Math.PI);cx.lineTo(C.x-IR,C.y);cx.fill();cx.fillStyle='#D8DBE0';cx.beginPath();cx.arc(C.x,C.y,IR,0,7);cx.fill();cx.fillStyle=grad(cx,C.x-IR*.5,C.y-IR,C.x+IR*.5,C.y+IR,'#8BDB6B','#3E8E2E');cx.beginPath();cx.arc(C.x,C.y,IR-4,0,7);cx.fill();
    for(i=0;i<10;i++){cx.fillStyle=['#FF5252','#FFEB3B','#fff','#FF80AB'][i%4];cx.beginPath();cx.arc(C.x+Math.cos(i*.63+1)*IR*.62,C.y+Math.sin(i*.63+1)*IR*.55+4,2.6,0,7);cx.fill()}
    cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(C.x+IR*.22,C.y+IR*.25,IR*.55,IR*.22,0,0,7);cx.fill();cx.fillStyle='#5D4037';cx.fillRect(C.x-IR*.07,C.y-IR*.25,IR*.14,IR*.42);cx.fillStyle='#1B5E20';cx.beginPath();cx.arc(C.x,C.y-IR*.35,IR*.46,0,7);cx.fill();cx.fillStyle='#2E7D32';cx.beginPath();cx.arc(C.x-IR*.08,C.y-IR*.48,IR*.38,0,7);cx.fill();cx.fillStyle='#43A047';cx.beginPath();cx.arc(C.x-IR*.15,C.y-IR*.6,IR*.26,0,7);cx.fill();cx.fillStyle='rgba(220,255,160,.5)';cx.beginPath();cx.arc(C.x-IR*.22,C.y-IR*.68,IR*.1,0,7);cx.fill();
    cars.forEach(car);
    for(r=0;r<4;r++){var tl=q[r][q[r].length-1];if(tl&&tl.u>DM[r]-gapQ*2.2&&Math.floor(fr/10)%2){var d=dirs[r],ex=C.x+d.x*(Rc+DM[r]-cs*.5)+d.rx*L0,ey=C.y+d.y*(Rc+DM[r]-cs*.5)+d.ry*L0;cx.fillStyle='#FF1744';cx.beginPath();cx.arc(Math.max(12,Math.min(w-12,ex)),Math.max(12,Math.min(h-12,ey)),9,0,7);cx.fill();cx.fillStyle='#fff';cx.font='bold 13px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('!',Math.max(12,Math.min(w-12,ex)),Math.max(12,Math.min(h-12,ey))+1)}}
    q.forEach(function(qq){var c=qq[0];if(c&&c.phase==='q'&&c.u<=uLine+3){cx.strokeStyle='rgba(255,255,255,'+(.4+.4*Math.sin(fr*.2))+')';cx.lineWidth=3;cx.beginPath();cx.arc(c.px,c.py,cs*.75,0,7);cx.stroke()}});
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
base:function(cv,cx,w,h,score,over){
  var s=0,lives=3,fr=0,P=[],F=[],G=RW.g.g,st='wait',wt=50,b=null,hit=null,sw=0,pz=h*.78,py0=h*.4,i;
  var BGB=(function(){var d=cv.width/w,c=document.createElement('canvas');c.width=w*d;c.height=h*d;var x=c.getContext('2d');x.scale(d,d);var i,j;
    var sk=x.createLinearGradient(0,0,0,h*.3);sk.addColorStop(0,'#1F3F85');sk.addColorStop(.6,'#6FA8EE');sk.addColorStop(1,'#CFE6FF');x.fillStyle=sk;x.fillRect(0,0,w,h*.3);
    x.fillStyle='rgba(255,255,255,.85)';[[.12,.04,.07],[.5,.07,.06],[.82,.03,.05]].forEach(function(q){cloud(x,q[0]*w,q[1]*h,w*q[2])});
    x.fillStyle='#78909C';x.fillRect(0,h*.075,w,h*.15);
    for(i=0;i<3;i++){x.fillStyle=['#546E7A','#607D8B','#546E7A'][i];x.fillRect(0,h*.075+i*h*.05,w,h*.05)}
    for(j=0;j<6;j++)for(i=0;i<70;i++){var hx=i*w/68+(j%2?3:0),hy=h*.092+j*h*.024+(i%3)*.8;x.fillStyle=['#EF5350','#FFEE58','#42A5F5','#FFFFFF','#F48FB1','#66BB6A','#FFA726'][(i*7+j*3+(i>>3))%7];x.beginPath();x.arc(hx,hy,h*.0072,0,7);x.fill();x.fillStyle='#F2B98F';x.beginPath();x.arc(hx,hy-h*.009,h*.0035,0,7);x.fill()}
    x.fillStyle='rgba(0,0,0,.28)';x.fillRect(0,h*.225,w,h*.008);
    /* Flutlicht */
    [.06,.94].forEach(function(px2){x.fillStyle='#455A64';x.fillRect(w*px2-3,h*.0,6,h*.2);x.fillStyle='#263238';rr(x,w*px2-w*.055,h*.0,w*.11,h*.05,4);x.fill();for(i=0;i<8;i++){x.fillStyle='#FFFDE7';x.beginPath();x.arc(w*px2-w*.045+(i%4)*w*.03,h*.012+(i>>2)*h*.02,h*.008,0,7);x.fill()}glow(x,w*px2,h*.025,w*.12,'rgba(255,250,200,.4)')});
    /* Anzeigetafel */
    x.fillStyle='#1B2A33';rr(x,w*.36,h*.028,w*.28,h*.075,6);x.fill();x.strokeStyle='#90A4AE';x.lineWidth=2;rr(x,w*.36,h*.028,w*.28,h*.075,6);x.stroke();x.fillStyle='#FFD54F';x.font='bold '+Math.floor(h*.026)+'px monospace';x.textAlign='center';x.textBaseline='middle';x.fillText('GAST 0 : HEIM 0',w*.5,h*.052);x.fillStyle='#69F0AE';x.font='bold '+Math.floor(h*.018)+'px monospace';x.fillText('INNING 1',w*.5,h*.085);
    /* Aussenzaun mit Werbung */
    x.fillStyle='#0D47A1';x.fillRect(0,h*.235,w,h*.05);var ads=['SCHULE','XP','LERNEN','⚾ HIT!','EASY','BRAVO'];ads.forEach(function(t,k){x.fillStyle=['#E53935','#FDD835','#43A047','#FB8C00','#8E24AA','#00ACC1'][k];x.fillRect(w*k/6+2,h*.239,w/6-4,h*.042);x.fillStyle=k===1?'#212121':'#fff';x.font='bold '+Math.floor(h*.022)+'px sans-serif';x.fillText(t,w*(k+.5)/6,h*.261)});
    x.fillStyle='#FFEB3B';x.fillRect(0,h*.232,w,3);
    /* Rasen */
    for(i=0;i<16;i++){x.fillStyle=i%2?'#4CAF50':'#43A047';x.fillRect(0,h*.285+i*h*.046,w,h*.047)}
    x.fillStyle='rgba(255,255,255,.1)';for(i=0;i<260;i++)x.fillRect(gHash(i)*w,h*.29+gHash(i+3)*h*.7,2,4);
    /* Aussenfeld-Linien */
    x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=3;x.beginPath();x.moveTo(w*.5,h*.9);x.lineTo(-w*.1,h*.29);x.moveTo(w*.5,h*.9);x.lineTo(w*1.1,h*.29);x.stroke();
    /* Infield */
    x.fillStyle='#C98F57';x.beginPath();x.moveTo(w*.5,h*.34);x.quadraticCurveTo(w*.95,h*.5,w*.97,h*.64);x.lineTo(w*.5,h*.95);x.lineTo(w*.03,h*.64);x.quadraticCurveTo(w*.05,h*.5,w*.5,h*.34);x.fill();
    x.fillStyle='rgba(120,70,30,.25)';for(i=0;i<200;i++)x.fillRect(w*.1+gHash(i+9)*w*.8,h*.4+gHash(i+11)*h*.5,2,2);
    x.fillStyle='#5BC25A';x.beginPath();x.moveTo(w*.5,h*.41);x.lineTo(w*.8,h*.64);x.lineTo(w*.5,h*.88);x.lineTo(w*.2,h*.64);x.fill();
    x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.moveTo(w*.5,h*.41);x.lineTo(w*.8,h*.64);x.lineTo(w*.5,h*.88);x.lineTo(w*.2,h*.64);x.closePath();x.stroke();
    [[.5,.41],[.8,.64],[.2,.64]].forEach(function(q){x.fillStyle='rgba(0,0,0,.25)';x.fillRect(w*q[0]-8,h*q[1]-4,18,13);x.fillStyle='#fff';x.fillRect(w*q[0]-9,h*q[1]-7,18,13);x.strokeStyle='#bbb';x.lineWidth=1;x.strokeRect(w*q[0]-9,h*q[1]-7,18,13)});
    x.fillStyle='#C98F57';x.beginPath();x.ellipse(w*.5,h*.88,w*.14,h*.045,0,0,7);x.fill();
    x.fillStyle='#C98F57';x.beginPath();x.ellipse(w/2,py0,w*.07,h*.025,0,0,7);x.fill();x.fillStyle='#fff';x.fillRect(w/2-w*.025,py0-3,w*.05,3);
    x.fillStyle='#fff';x.beginPath();x.moveTo(w/2-w*.04,h*.9);x.lineTo(w/2+w*.04,h*.9);x.lineTo(w/2+w*.04,h*.915);x.lineTo(w/2,h*.935);x.lineTo(w/2-w*.04,h*.915);x.fill();
    /* Spielerboxen, Bank */
    x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=2;x.strokeRect(w*.06,h*.72,w*.12,h*.2);x.strokeRect(w*.82,h*.72,w*.12,h*.2);
    x.fillStyle='#1565C0';rr(x,w*.82,h*.58,w*.16,h*.05,5);x.fill();x.fillStyle='#fff';[0,1,2].forEach(function(k){x.beginPath();x.arc(w*.85+k*w*.05,h*.6,5,0,7);x.fill()});
    /* Bäume, Büsche hinter dem Zaun */
    return c})();
  function tier(){return (s>=G[0]?1:0)+(s>=G[1]?1:0)}
  function pitch(){var t=tier(),cu=Math.random()<.5+t*.15?(Math.random()<.5?-1:1)*w*(.1+Math.random()*.1):0;b={t:0,T:Math.max(34,76-s*1.8-t*6),cu:cu,off:(Math.random()-.5)*w*.04,swung:false};st='pitch'}
  function bpos(t){return {x:w/2+b.cu*Math.sin(Math.PI*Math.min(1,t))*.9+b.off*t,y:py0+(pz-py0)*Math.pow(t,1.7),r:w*(.014+.078*Math.pow(t,1.7))}}
  var unb=bindTap(cv,function(){if(st!=='pitch'||b.swung)return;b.swung=true;sw=.01;var d=b.t-.95,a=Math.abs(d);
    if(a<.055){var perfect=a<.022,p=bpos(b.t);hit={t:0,x0:p.x,y0:p.y,r0:p.r,tx:w/2+(-d)*w*5+(perfect?(Math.random()-.5)*w*.3:0),ty:perfect?h*.1:h*.27+Math.random()*h*.06,H:perfect?h*.3:h*.2,perfect:perfect,T:perfect?95:65};st='hit';
      s+=perfect?2:1;score(s);F.push({x:w/2,y:h*.5,t:perfect?'HOME RUN! +2':'Treffer! +1',l:60,c:perfect?'#FFEB3B':'#fff'});burst(P,p.x,p.y,perfect?36:16,perfect?['#FFD54F','#fff','#FF5252','#4FC3F7']:['#fff','#FFD54F'],perfect?12:7);wt=0}
    else{lives--;F.push({x:w/2,y:h*.5,t:d<0?'Zu früh!':'Zu spät!',l:50,c:'#FF8A80'});st='after';wt=0}});
  function drawBall(x,y,r,rot,al){cx.save();cx.translate(x,y);cx.globalAlpha=al==null?1:al;cx.shadowColor='rgba(0,0,0,.4)';cx.shadowBlur=r*.5;cx.shadowOffsetY=r*.15;var g2=cx.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);g2.addColorStop(0,'#FFFFFF');g2.addColorStop(.6,'#F1ECE4');g2.addColorStop(1,'#B9B2A6');cx.fillStyle=g2;cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();cx.shadowBlur=0;cx.shadowOffsetY=0;cx.save();cx.beginPath();cx.arc(0,0,r,0,7);cx.clip();cx.rotate(rot);cx.strokeStyle='#C62828';cx.lineWidth=Math.max(1,r*.09);[[-1,0],[1,Math.PI]].forEach(function(sd){var ax=sd[0]*r*1.18,a0=sd[1]-.95,a1=sd[1]+.95;cx.beginPath();cx.arc(ax,0,r*.98,a0,a1);cx.stroke();for(var a=-.8;a<=.81;a+=.2){var ang=sd[1]+a,px=ax+Math.cos(ang)*r*.98,py=Math.sin(ang)*r*.98,nx=Math.cos(ang),ny=Math.sin(ang);cx.beginPath();cx.moveTo(px-nx*r*.12-ny*r*.06,py-ny*r*.12+nx*r*.06);cx.lineTo(px+nx*r*.12+ny*r*.06,py+ny*r*.12-nx*r*.06);cx.stroke()}});cx.restore();var g3=cx.createRadialGradient(0,0,r*.6,0,0,r);g3.addColorStop(0,'rgba(0,0,0,0)');g3.addColorStop(1,'rgba(60,40,20,.35)');cx.fillStyle=g3;cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();cx.fillStyle='rgba(255,255,255,.85)';cx.beginPath();cx.ellipse(-r*.35,-r*.4,r*.2,r*.11,-.6,0,7);cx.fill();cx.restore()}
  function drawBat(len,wd){cx.save();cx.shadowColor='rgba(0,0,0,.4)';cx.shadowBlur=8;cx.shadowOffsetX=3;cx.shadowOffsetY=4;var gg=cx.createLinearGradient(-wd*.5,0,wd*.5,0);gg.addColorStop(0,'#F0C27A');gg.addColorStop(.35,'#C98A3C');gg.addColorStop(1,'#6E3F14');cx.fillStyle=gg;cx.beginPath();cx.moveTo(-wd*.2,len*.06);cx.lineTo(-wd*.2,-len*.28);cx.bezierCurveTo(-wd*.22,-len*.45,-wd*.5,-len*.52,-wd*.5,-len*.72);cx.lineTo(-wd*.5,-len*.92);cx.quadraticCurveTo(-wd*.5,-len,0,-len);cx.quadraticCurveTo(wd*.5,-len,wd*.5,-len*.92);cx.lineTo(wd*.5,-len*.72);cx.bezierCurveTo(wd*.5,-len*.52,wd*.22,-len*.45,wd*.2,-len*.28);cx.lineTo(wd*.2,len*.06);cx.closePath();cx.fill();cx.shadowBlur=0;cx.shadowOffsetX=0;cx.shadowOffsetY=0;
    cx.save();cx.clip();cx.strokeStyle='rgba(90,50,15,.35)';cx.lineWidth=1.2;for(var k=-5;k<=5;k++){cx.beginPath();cx.moveTo(k*wd*.09,len*.05);cx.bezierCurveTo(k*wd*.12,-len*.3,k*wd*.07,-len*.6,k*wd*.1,-len);cx.stroke()}cx.fillStyle='rgba(255,255,255,.28)';cx.fillRect(-wd*.38,-len*.95,wd*.1,len*.6);cx.fillStyle='#262626';cx.fillRect(-wd,-len*.02,wd*2,len*.3);cx.strokeStyle='rgba(255,255,255,.3)';cx.lineWidth=2;for(var g4=-len*.02;g4<len*.28;g4+=len*.045){cx.beginPath();cx.moveTo(-wd*.3,g4);cx.lineTo(wd*.3,g4+len*.03);cx.stroke()}cx.fillStyle='#FFD54F';cx.fillRect(-wd,-len*.02,wd*2,len*.015);cx.fillStyle='#7A1E1E';cx.font='bold '+wd*.28+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.save();cx.translate(0,-len*.7);cx.rotate(-Math.PI/2);cx.fillText('EASY',0,0);cx.restore();cx.restore();
    cx.strokeStyle='#4A2A0A';cx.lineWidth=1.5;cx.stroke();cx.fillStyle='#1B1B1B';cx.beginPath();cx.ellipse(0,len*.07,wd*.3,wd*.14,0,0,7);cx.fill();cx.restore()}
  function person(x,y,sc,shirt,back){cx.save();cx.translate(x,y);cx.scale(sc,sc);cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(0,0,16,5,0,0,7);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=7;cx.lineCap='round';cx.beginPath();cx.moveTo(-6,-26);cx.lineTo(-8,-2);cx.moveTo(6,-26);cx.lineTo(8,-2);cx.stroke();cx.fillStyle=shirt;rr(cx,-12,-60,24,36,9);cx.fill();cx.fillStyle='#F2B98F';cx.beginPath();cx.arc(0,-70,10,0,7);cx.fill();cx.fillStyle=back?'#1565C0':'#E53935';cx.beginPath();cx.arc(0,-72,10.5,Math.PI,0);cx.fill();if(!back)cx.fillRect(-3,-73,16,3);cx.restore()}
  var L=loopRun(function(f){fr+=f;if(sw>0){sw+=f*.09;if(sw>1.7)sw=0}
    if(st==='wait'){wt-=f;if(wt<=0)pitch()}
    else if(st==='pitch'){b.t+=f/b.T;if(b.t>1.06&&!b.swung){lives--;F.push({x:w/2,y:h*.5,t:'Strike!',l:50,c:'#FF8A80'});st='after';wt=0}}
    else if(st==='hit'){hit.t+=f/hit.T;if(hit.t>=1){st='after';wt=0}}
    else if(st==='after'){wt+=f;if(wt>45){if(lives<=0){L.stop();unb();over();return}st='wait';wt=25;hit=null;b=null}}
    cx.drawImage(BGB,0,0,w,h);
    var wind=st==='pitch'&&b.t<.15;person(w/2,py0+h*.02,.5+(wind?.05:0),'#fff',false);
    var inz=st==='pitch'&&Math.abs(b.t-.95)<.055,bw=w*.2,bh=h*.17,bxx=w/2-bw/2,byy=pz-bh*.55;cx.save();cx.fillStyle=inz?'rgba(255,235,59,.28)':'rgba(255,255,255,.12)';cx.fillRect(bxx,byy,bw,bh);cx.strokeStyle=inz?'#FFEB3B':'rgba(255,255,255,.9)';cx.lineWidth=inz?5:3.5;cx.shadowColor='#FFEB3B';cx.shadowBlur=inz?20:4;cx.strokeRect(bxx,byy,bw,bh);cx.restore();
    person(w*.25,pz+h*.1,1.25,'#1E88E5',true);var ang=sw>0?-.35+Math.min(1,sw)*2.6:-.35+Math.sin(fr*.1)*.04,BL=w*.5;cx.save();cx.translate(w*.27,pz+h*.07);
    if(sw>.05&&sw<1.1){for(var tk=1;tk<=7;tk++){var ta=-.35+Math.max(0,Math.min(1,sw)-tk*.045)*2.6;cx.save();cx.rotate(ta);cx.globalAlpha=.16*(1-tk/8);cx.fillStyle='#FFE0A0';cx.fillRect(-w*.03,-BL,w*.06,BL*.5);cx.restore()}}
    cx.rotate(ang);drawBat(BL,w*.075);cx.fillStyle='#1E88E5';cx.beginPath();cx.arc(0,-BL*.06,w*.026,0,7);cx.arc(0,-BL*.15,w*.026,0,7);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=2;cx.beginPath();cx.arc(0,-BL*.06,w*.026,0,7);cx.arc(0,-BL*.15,w*.026,0,7);cx.stroke();cx.fillStyle='#F2B98F';cx.fillRect(-w*.03,-BL*.12,w*.06,w*.012);cx.restore();
    if(b&&!hit&&(st==='pitch'||st==='after')){var t=Math.min(1.12,b.t),p=bpos(t);if(st==='after'&&b.t>1)p.y+=(b.t-1)*h*.2;cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(p.x,Math.min(h*.9,p.y+p.r*1.6),p.r*.9,p.r*.28,0,0,7);cx.fill();for(var tr=3;tr>=1;tr--){var pp=bpos(Math.max(0,t-tr*.018));drawBall(pp.x,pp.y,pp.r,fr*.5,.12*(4-tr))}glow(cx,p.x,p.y,p.r*2.6,'rgba(255,255,255,.35)');drawBall(p.x,p.y,p.r,fr*.5+b.t*8);if(inz){cx.strokeStyle='rgba(255,235,59,.7)';cx.lineWidth=3;cx.beginPath();cx.arc(p.x,p.y,p.r*1.4,0,7);cx.stroke()}}
    if(hit){var u=Math.min(1,hit.t),hx=hit.x0+(hit.tx-hit.x0)*u,hy=hit.y0+(hit.ty-hit.y0)*u-4*hit.H*u*(1-u),hr=hit.r0*(1-.75*u);for(i=1;i<6;i++){var uu=Math.max(0,u-i*.02);cx.globalAlpha=.4-i*.06;cx.fillStyle='#fff';cx.beginPath();cx.arc(hit.x0+(hit.tx-hit.x0)*uu,hit.y0+(hit.ty-hit.y0)*uu-4*hit.H*uu*(1-uu),hr*(1-i*.06),0,7);cx.fill()}cx.globalAlpha=1;glow(cx,hx,hy,hr*3,'rgba(255,255,255,.6)');drawBall(hx,hy,Math.max(2,hr),fr*.6);if(u<.12){cx.strokeStyle='rgba(255,255,255,'+(1-u*8)+')';cx.lineWidth=4;cx.beginPath();cx.arc(hit.x0,hit.y0,hit.r0*(1.5+u*30),0,7);cx.stroke()}if(hit.perfect&&u>.9&&!hit.fw){hit.fw=1;burst(P,hx,hy,50,['#FFD54F','#FF5252','#4FC3F7','#fff','#81C784'],14)}}
    stepP(cx,P,f);floatTxt(cx,F,f);hearts(cx,lives,w);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
arch:function(cv,cx,w,h,score,over){
  var s=0,fr=0,P=[],F=[],ar=19,tx0=w/2,ty0=h*.4,TR=w*.26,G=RW.g.g,stuck=[],fl=null,af=0,zk=0,lh={x:w/2,y:h*.4},rec=0,wait=0,cur={x:tx0,y:ty0},tr=[],i,finished=false;
  function tier(){return (s>=G[0]?1:0)+(s>=G[1]?1:0)}
  var unb=bindTap(cv,function(){if(fl||ar<=0||wait>0)return;ar--;rec=14;fl={t:0,x:cur.x+(Math.random()-.5)*TR*.07,y:cur.y+(Math.random()-.5)*TR*.07}});
  function nock(x,y,a){cx.save();cx.translate(x,y);cx.rotate(a);cx.fillStyle='rgba(0,0,0,.28)';cx.beginPath();cx.ellipse(1.5,2,9,8,0,0,7);cx.fill();for(var k=0;k<3;k++){cx.save();cx.rotate(k*2.094);cx.fillStyle=k===0?'#E53935':'#F5F5F5';cx.strokeStyle='rgba(60,20,10,.7)';cx.lineWidth=.8;cx.beginPath();cx.moveTo(0,0);cx.quadraticCurveTo(-5,-5,-3,-12);cx.lineTo(3,-11);cx.quadraticCurveTo(4,-4,0,0);cx.fill();cx.stroke();cx.restore()}cx.fillStyle='#212121';cx.beginPath();cx.arc(0,0,3,0,7);cx.fill();cx.fillStyle='#8D6E63';cx.beginPath();cx.arc(0,0,1.6,0,7);cx.fill();cx.restore()}
  function arrow(x,y,len,ang,sc){cx.save();cx.translate(x,y);cx.rotate(ang);cx.scale(sc,sc);cx.strokeStyle='#8D6E63';cx.lineWidth=3;cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,len);cx.stroke();cx.fillStyle='#CFD8DC';cx.beginPath();cx.moveTo(0,-4);cx.lineTo(-4,6);cx.lineTo(4,6);cx.fill();cx.fillStyle='#E53935';cx.beginPath();cx.moveTo(-5,len);cx.lineTo(0,len*.8);cx.lineTo(5,len);cx.moveTo(-5,len*.9);cx.lineTo(0,len*.72);cx.lineTo(5,len*.9);cx.fill();cx.restore()}
  var L=loopRun(function(f){fr+=f;rec=Math.max(0,rec-f);var zt=(fl||wait>0)?1:0;zk+=(zt-zk)*.1*f;if(!fl&&wait<=0&&zk<.04)af+=f;var k=[1.25,1.75,2.3][tier()];cur.x=tx0+TR*1.1*Math.sin(af*.03*k)+TR*.25*Math.sin(af*.09*k+.7);cur.y=ty0+TR*.95*Math.sin(af*.047*k+1.2);tr.push({x:cur.x,y:cur.y});if(tr.length>10)tr.shift();
    if(fl){fl.t+=f/30;if(fl.t>=1){var d=Math.hypot(fl.x-tx0,fl.y-ty0)/TR,pts=d<.22?5:d<.42?4:d<.62?3:d<.82?2:d<1?1:0;stuck.push({x:fl.x,y:fl.y,a:Math.random()*6.28});if(pts>0){s+=pts;score(s)}F.push({x:fl.x,y:fl.y-10,t:pts===5?'ZEHN! +5':pts?'+'+pts:'Daneben',l:45,c:pts===5?'#FFEB3B':pts?'#fff':'#FF8A80'});burst(P,fl.x,fl.y,pts===5?30:10,pts===5?['#FFD54F','#fff','#FF5252']:['#fff','#d7ccc8'],pts===5?10:5);lh={x:fl.x,y:fl.y};fl=null;wait=75;if(ar<=0)finished=true}}
    if(wait>0){wait-=f;if(wait<=0&&finished){L.stop();unb();over();return}}
    cx.save();var zz=1+1.05*zk,fx2=fl?w/2+(fl.x-w/2)*fl.t:lh.x,fy2=fl?h*.65+(fl.y-h*.65)*fl.t:lh.y,fcx=Math.max(w/(2*zz),Math.min(w-w/(2*zz),fx2)),fcy=Math.max(h/(2*zz),Math.min(h-h/(2*zz),fy2));cx.translate(w/2,h/2);cx.scale(zz,zz);cx.translate(-fcx,-fcy);
    var sk=cx.createLinearGradient(0,0,0,h*.6);sk.addColorStop(0,'#4FA9F0');sk.addColorStop(1,'#CDEBFF');cx.fillStyle=sk;cx.fillRect(0,0,w,h);glow(cx,w*.85,h*.12,w*.2,'rgba(255,255,180,.8)');cx.fillStyle='#FFE45C';cx.beginPath();cx.arc(w*.85,h*.12,w*.05,0,7);cx.fill();
    cx.fillStyle='rgba(255,255,255,.95)';cloud(cx,((w*.2+fr*.12)%(w+140))-60,h*.12,w*.06);cloud(cx,((w*.62+fr*.08)%(w+140))-60,h*.2,w*.05);
    hills(cx,w,h,h*.55,h*.1,0,.008,'#9DB6D6','#7C97BC');hills(cx,w,h,h*.62,h*.07,40,.012,'#7EC262','#4C9A3A');for(i=0;i<6;i++){var tx=w*(.05+i*.19),ty=h*.6;cx.fillStyle='#5D4037';cx.fillRect(tx-3,ty-h*.04,6,h*.06);cx.fillStyle=i%2?'#2E7D32':'#43A047';cx.beginPath();cx.arc(tx,ty-h*.07,w*.045,0,7);cx.fill()}
    cx.fillStyle=grad(cx,0,h*.62,0,h,'#6CC24A','#3C8E2C');cx.fillRect(0,h*.62,w,h*.38);cx.strokeStyle='rgba(255,255,255,.1)';cx.lineWidth=2;for(i=-5;i<=5;i++){cx.beginPath();cx.moveTo(w/2+i*w*.03,h*.62);cx.lineTo(w/2+i*w*.3,h);cx.stroke()}
    cx.strokeStyle='#6D4C41';cx.lineWidth=6;cx.beginPath();cx.moveTo(tx0-TR*.5,ty0+TR*1.0);cx.lineTo(tx0-TR*.05,ty0+TR*.2);cx.moveTo(tx0+TR*.5,ty0+TR*1.0);cx.lineTo(tx0+TR*.05,ty0+TR*.2);cx.stroke();
    cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.ellipse(tx0+TR*.15,ty0+TR*1.12,TR*1.1,TR*.18,0,0,7);cx.fill();
    cx.save();cx.shadowColor='rgba(0,0,0,.4)';cx.shadowBlur=12;cx.shadowOffsetY=5;cx.fillStyle=grad(cx,0,ty0-TR*1.2,0,ty0+TR*1.2,'#E9C766','#B8892F');rr(cx,tx0-TR*1.2,ty0-TR*1.2,TR*2.4,TR*2.4,TR*.22);cx.fill();cx.restore();
    cx.strokeStyle='rgba(120,80,10,.4)';cx.lineWidth=1.5;for(i=0;i<46;i++){var sy2=ty0-TR*1.15+i*TR*.05;cx.beginPath();cx.moveTo(tx0-TR*1.15,sy2);cx.lineTo(tx0+TR*1.15,sy2+Math.sin(i)*3);cx.stroke()}
    cx.strokeStyle='#5D3A1A';cx.lineWidth=6;rr(cx,tx0-TR*1.2,ty0-TR*1.2,TR*2.4,TR*2.4,TR*.22);cx.stroke();cx.fillStyle='#8D6E63';[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(c9){cx.beginPath();cx.arc(tx0+c9[0]*TR*1.08,ty0+c9[1]*TR*1.08,4,0,7);cx.fill()});
    cx.save();cx.shadowColor='rgba(0,0,0,.4)';cx.shadowBlur=8;cx.fillStyle='#F5F5F5';cx.beginPath();cx.arc(tx0,ty0,TR*1.06,0,7);cx.fill();cx.restore();
    [['#fff','#222',1,'1-2'],['#222','#fff',.82,''],['#1E88E5','#fff',.62,''],['#E53935','#fff',.42,''],['#FFD600','#222',.22,'']].forEach(function(r){cx.fillStyle=r[0];cx.beginPath();cx.arc(tx0,ty0,TR*r[2],0,7);cx.fill()});cx.strokeStyle='rgba(120,120,120,.6)';cx.lineWidth=1;[1,.91,.82,.72,.62,.52,.42,.32,.22,.11].forEach(function(r){cx.beginPath();cx.arc(tx0,ty0,TR*r,0,7);cx.stroke()});
    cx.fillStyle='rgba(255,255,255,.75)';cx.font='bold '+Math.floor(TR*.08)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';for(i=1;i<=9;i++){var rr3=TR*(1.05-i*.091);if(i<9)cx.fillText(i+'',tx0+rr3,ty0)}cx.fillStyle='#222';cx.beginPath();cx.moveTo(tx0-TR*.07,ty0);cx.lineTo(tx0+TR*.07,ty0);cx.moveTo(tx0,ty0-TR*.07);cx.lineTo(tx0,ty0+TR*.07);cx.stroke();
    cx.fillStyle=grad(cx,tx0-TR*.4,ty0-TR,tx0+TR*.4,ty0+TR,'rgba(255,255,255,.18)','rgba(255,255,255,0)');cx.beginPath();cx.arc(tx0,ty0,TR*1.06,0,7);cx.fill();
    stuck.forEach(function(a){cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.arc(a.x+2,a.y+2,3,0,7);cx.fill();nock(a.x,a.y,a.a)});
    if(fl){var u=fl.t,ax=w/2+(fl.x-w/2)*u,ay=h*.9+(fl.y-h*.9)*u,sc=1-.7*u;arrow(ax,ay,w*.14*(1-.7*u*u),Math.atan2(-(w/2-ax),(h*.9-ay)),sc)}
    var bx=w/2,by=h*1.04,aim=Math.max(-.4,Math.min(.4,Math.atan2(cur.x-bx,by-cur.y))*.8),ready=!fl&&ar>0&&rec<=0,SY=h*.3,NY=ready?-h*.14:-h*.285,rk=rec>0?Math.sin(rec*1.4)*2:0;
    cx.save();cx.translate(bx,by+rk);cx.rotate(aim);cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=14;cx.shadowOffsetY=6;
    var ws=cx.createLinearGradient(-w*.12,0,w*.12,0);ws.addColorStop(0,'#8D5A2B');ws.addColorStop(.45,'#C98A4B');ws.addColorStop(1,'#5A3516');cx.fillStyle=ws;cx.beginPath();cx.moveTo(-w*.13,0);cx.lineTo(-w*.045,-h*.34);cx.lineTo(w*.045,-h*.34);cx.lineTo(w*.13,0);cx.closePath();cx.fill();cx.shadowBlur=0;cx.shadowOffsetY=0;
    cx.save();cx.clip();cx.strokeStyle='rgba(60,30,8,.35)';cx.lineWidth=1.3;for(i=-6;i<=6;i++){cx.beginPath();cx.moveTo(i*w*.02,0);cx.bezierCurveTo(i*w*.017,-h*.12,i*w*.008,-h*.24,i*w*.006,-h*.34);cx.stroke()}cx.fillStyle='rgba(255,255,255,.18)';cx.beginPath();cx.moveTo(-w*.1,0);cx.lineTo(-w*.04,-h*.34);cx.lineTo(-w*.025,-h*.34);cx.lineTo(-w*.07,0);cx.fill();cx.restore();
    cx.fillStyle='#2B2B2B';rr(cx,-w*.026,-h*.355,w*.052,h*.35,5);cx.fill();cx.fillStyle='#6B6B6B';cx.fillRect(-w*.006,-h*.355,w*.012,h*.35);
    cx.strokeStyle='#4E2C0E';cx.lineWidth=2;cx.beginPath();cx.moveTo(-w*.13,0);cx.lineTo(-w*.045,-h*.34);cx.moveTo(w*.13,0);cx.lineTo(w*.045,-h*.34);cx.stroke();
    function limb2(lw,c,o){cx.strokeStyle=c;cx.lineWidth=lw;cx.lineCap='round';cx.beginPath();cx.moveTo(-w*.47,-SY+h*.045+o);cx.quadraticCurveTo(-w*.2,-SY-h*.045+o,0,-SY-h*.04+o);cx.quadraticCurveTo(w*.2,-SY-h*.045+o,w*.47,-SY+h*.045+o);cx.stroke()}
    cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=10;cx.shadowOffsetY=5;limb2(17,'#1B232A',0);cx.shadowBlur=0;cx.shadowOffsetY=0;limb2(12,'#546E7A',0);limb2(4,'#CFD8DC',-3);
    cx.fillStyle='#37474F';cx.fillRect(-w*.05,-SY-h*.075,w*.1,h*.07);cx.strokeStyle='#90A4AE';cx.lineWidth=3;cx.beginPath();cx.arc(0,-SY-h*.09,w*.032,0,7);cx.stroke();[-1,1].forEach(function(sg){cx.fillStyle='#FFD54F';cx.beginPath();cx.arc(sg*w*.47,-SY+h*.045,7,0,7);cx.fill();cx.strokeStyle='#8E6B14';cx.lineWidth=1.5;cx.stroke()});
    cx.strokeStyle='#F5F5F5';cx.lineWidth=2.4;cx.beginPath();cx.moveTo(-w*.47,-SY+h*.045);cx.lineTo(0,NY);cx.lineTo(w*.47,-SY+h*.045);cx.stroke();
    if(ready){var bl=h*.3;cx.strokeStyle='#D7B98E';cx.lineWidth=5;cx.beginPath();cx.moveTo(0,NY);cx.lineTo(0,NY-bl);cx.stroke();cx.fillStyle='#CFD8DC';cx.strokeStyle='#546E7A';cx.lineWidth=1.3;cx.beginPath();cx.moveTo(0,NY-bl-h*.05);cx.lineTo(-9,NY-bl+4);cx.lineTo(9,NY-bl+4);cx.closePath();cx.fill();cx.stroke();[['#E53935',-1],['#fff',1]].forEach(function(fe){cx.fillStyle=fe[0];cx.beginPath();cx.moveTo(0,NY-4);cx.lineTo(fe[1]*12,NY-18);cx.lineTo(fe[1]*12,NY-44);cx.lineTo(0,NY-34);cx.fill()})}
    cx.fillStyle='#212121';rr(cx,-w*.022,-h*.2,w*.044,h*.12,6);cx.fill();cx.fillStyle='#455A64';cx.beginPath();cx.ellipse(0,-h*.2,w*.022,h*.014,0,0,7);cx.fill();cx.fillStyle='#4FC3F7';cx.beginPath();cx.ellipse(0,-h*.2,w*.014,h*.008,0,0,7);cx.fill();cx.fillStyle='#212121';cx.beginPath();cx.moveTo(-5,-SY-h*.02);cx.lineTo(5,-SY-h*.02);cx.lineTo(0,-SY-h*.06);cx.fill();
    cx.fillStyle='#1E3A8A';cx.beginPath();cx.moveTo(-w*.2,h*.02);cx.lineTo(-w*.12,-h*.06);cx.lineTo(-w*.03,-h*.05);cx.lineTo(-w*.07,h*.02);cx.fill();cx.beginPath();cx.moveTo(w*.2,h*.02);cx.lineTo(w*.1,-h*.17);cx.lineTo(w*.02,-h*.15);cx.lineTo(w*.07,h*.02);cx.fill();
    cx.fillStyle='#F2B98F';cx.strokeStyle='#C98E63';cx.lineWidth=1.5;cx.beginPath();cx.ellipse(w*.055,-h*.16,w*.055,h*.038,-.3,0,7);cx.fill();cx.stroke();cx.beginPath();cx.ellipse(-w*.06,-h*.045,w*.055,h*.04,.2,0,7);cx.fill();cx.stroke();for(i=0;i<3;i++){cx.beginPath();cx.moveTo(w*.018+i*7,-h*.17);cx.lineTo(w*.012+i*7,-h*.195);cx.stroke()}cx.fillStyle='#B3E5FC';cx.fillRect(w*.0,-h*.1,w*.03,h*.012);
    cx.restore();
    cx.restore();if(zk<.33){cx.globalAlpha=1;tr.forEach(function(p,j){cx.globalAlpha=j/tr.length*.35;cx.fillStyle='#FF1744';cx.beginPath();cx.arc(p.x,p.y,w*.012*(j/tr.length+.3),0,7);cx.fill()});cx.globalAlpha=1;
    cx.strokeStyle='#FF1744';cx.lineWidth=3;cx.shadowColor='#fff';cx.shadowBlur=6;cx.beginPath();cx.arc(cur.x,cur.y,w*.05,0,7);cx.moveTo(cur.x-w*.075,cur.y);cx.lineTo(cur.x-w*.02,cur.y);cx.moveTo(cur.x+w*.02,cur.y);cx.lineTo(cur.x+w*.075,cur.y);cx.moveTo(cur.x,cur.y-w*.075);cx.lineTo(cur.x,cur.y-w*.02);cx.moveTo(cur.x,cur.y+w*.02);cx.lineTo(cur.x,cur.y+w*.075);cx.stroke();cx.shadowBlur=0;cx.fillStyle='#FF1744';cx.beginPath();cx.arc(cur.x,cur.y,3,0,7);cx.fill();}
    cx.font='bold '+Math.floor(w*.055)+'px sans-serif';cx.textAlign='left';cx.textBaseline='top';cx.lineWidth=4;cx.strokeStyle='rgba(0,0,0,.4)';cx.strokeText('🏹 '+ar,w*.03,w*.02);cx.fillStyle='#fff';cx.fillText('🏹 '+ar,w*.03,w*.02);
    stepP(cx,P,f);floatTxt(cx,F,f);bigScore(cx,w,s)});
  return function(){L.stop();unb()}},
tetris:function(cv,cx0,w,h,score,over){
  var C=10,R=15,S=Math.floor(Math.min(30,w/C,(window.innerHeight-300)/R));if(S<12)S=12;var dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=C*S*dpr;cv.height=R*S*dpr;cv.style.width=C*S+'px';cv.style.height=R*S+'px';var cx=cv.getContext('2d');cx.setTransform(dpr,0,0,dpr,0,0);
  var SH=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]],COL=['#4FC3F7','#FFD54F','#BA68C8','#FF6B6B','#FFA040','#66E08A','#4DD0E1'];
  function shade(hx){var n=parseInt(hx.slice(1),16);return 'rgb('+(((n>>16)*.68)|0)+','+((((n>>8)&255)*.68)|0)+','+(((n&255)*.68)|0)+')'}
  var g=[],s=0,p,dead=false,i;for(i=0;i<R;i++)g.push(new Array(C).fill(0));
  function nw(){var k=Math.floor(Math.random()*7);p={m:SH[k].map(function(r){return r.slice()}),c:k+1,x:3,y:0};if(hit(p.m,p.x,p.y)){dead=true;stop();over()}}
  function hit(m,x,y){for(var r=0;r<m.length;r++)for(var c=0;c<m[r].length;c++)if(m[r][c]){var gx=x+c,gy=y+r;if(gx<0||gx>=C||gy>=R||(gy>=0&&g[gy][gx]))return true}return false}
  function rot(){var m=p.m,n=m[0].map(function(_,c){return m.map(function(r){return r[c]}).reverse()});if(!hit(n,p.x,p.y))p.m=n;else if(!hit(n,p.x-1,p.y)){p.m=n;p.x--}else if(!hit(n,p.x+1,p.y)){p.m=n;p.x++}}
  function lock(){p.m.forEach(function(r,y){r.forEach(function(v,x){if(v&&p.y+y>=0)g[p.y+y][p.x+x]=p.c})});var n=0;for(var y=R-1;y>=0;y--)if(g[y].every(Boolean)){g.splice(y,1);g.unshift(new Array(C).fill(0));n++;y++}if(n){s+=[0,100,300,500,800][n];score(s)}nw()}
  function down(){if(dead)return;if(!hit(p.m,p.x,p.y+1))p.y++;else lock();draw()}
  function act(k){if(dead)return;if(k==='L'&&!hit(p.m,p.x-1,p.y))p.x--;else if(k==='R'&&!hit(p.m,p.x+1,p.y))p.x++;else if(k==='U')rot();else if(k==='D')down();else if(k==='drop'){while(!hit(p.m,p.x,p.y+1))p.y++;lock()}draw()}
  function draw(){cx.fillStyle=grad(cx,0,0,0,R*S,'#1B1F4B','#3A1C71');cx.fillRect(0,0,C*S,R*S);cx.strokeStyle='rgba(255,255,255,.07)';for(var gx=1;gx<C;gx++){cx.beginPath();cx.moveTo(gx*S,0);cx.lineTo(gx*S,R*S);cx.stroke()}for(var gy=1;gy<R;gy++){cx.beginPath();cx.moveTo(0,gy*S);cx.lineTo(C*S,gy*S);cx.stroke()}var tms=Date.now()*.02;twinkle(cx,C*S,R*S,tms,40);for(var bi=0;bi<8;bi++)glow(cx,(bi*61+tms*(1+bi%3)*.3)%(C*S),((bi*97)+Math.sin(tms*.05+bi)*30+R*S)%(R*S),S*2.4,'rgba('+(bi%2?'255,64,129':'64,196,255')+',.12)');function cell(x,y,c){var k=COL[c-1];glossBlock(cx,x*S+1,y*S+1,S-2,k,shade(k),S*.2)}if(p){var gyy=p.y;while(!hit(p.m,p.x,gyy+1))gyy++;p.m.forEach(function(r,y){r.forEach(function(v,x){if(v){cx.fillStyle='rgba(255,255,255,.14)';rr(cx,(p.x+x)*S+2,(gyy+y)*S+2,S-4,S-4,S*.2);cx.fill()}})})}g.forEach(function(r,y){r.forEach(function(v,x){if(v)cell(x,y,v)})});if(p)p.m.forEach(function(r,y){r.forEach(function(v,x){if(v)cell(p.x+x,p.y+y,p.c)})})}
  var t=setInterval(down,640),an=setInterval(function(){if(!dead)draw()},60);function stop(){clearInterval(t);clearInterval(an);document.removeEventListener('keydown',kd)}
  var kd=function(e){var m={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R',' ':'drop'}[e.key];if(m){e.preventDefault();act(m)}};document.addEventListener('keydown',kd);
  var ub=bindSwipe(cv,function(k){if(k==='L')act('L');else if(k==='R')act('R');else if(k==='D')act('drop');else if(k==='U'||k==='tap')act('U')},true,{tx:26,ty:70});
  nw();draw();return function(){stop();ub()}}
};

document.addEventListener('input',function(e){if(e.target&&e.target.classList&&e.target.classList.contains('fixin'))fixGrow(e.target)});
window.addEventListener('resize',function(){document.querySelectorAll('textarea.fixin').forEach(fixGrow)});
