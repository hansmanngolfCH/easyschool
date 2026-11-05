(function(){
'use strict';
var DAY=86400000, INT=[0,1,3,7,14,30], LS='lernwerkstatt.v1', DG=50;
var APP_VERSION="v5.13";
var C=null, P={}, nav={view:'home'}, timer=null, cardIdx={}, PADS={}, penTool='ink', lastAct=0, lastSave=0, SKIN=null, TQ=[];
var LANG={engl:'en-GB',franz:'fr-FR'};
var sync={db:null,state:'local',noWrite:false,timers:{},busy:{},last:{}};
var app=document.getElementById('app');

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function rt(s){return esc(s).replace(/(\d+)\/(\d+)/g,'<span class="frac"><span>$1</span><span>$2</span></span>').replace(/\{([0-7])\|([^{}]*)\}/g,'<span class="cw c$1">$2</span>')}
function stable(o){return JSON.stringify(o,function(k,v){return v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).sort().reduce(function(a,x){a[x]=v[x];return a},{}):v})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

/* ---------- Fortschritt ---------- */
function migDeu(p){try{if(!C||!C.topics)return;var pre='kl8-deu-grammatik1_',k,idx=null;for(k in p.cards){if(k.indexOf(pre)!==0)continue;if(!idx){idx={};C.topics.forEach(function(t){if(t.id.indexOf('kl8-deu-')===0&&t.id!=='kl8-deu-grammatik1')t.cards.forEach(function(c){idx[c.id]=t.id})})}var cid=k.slice(pre.length),to=idx[cid];if(to&&!p.cards[to+'_'+cid])p.cards[to+'_'+cid]=p.cards[k]}}catch(e){}}
function prog(id){var p=P[id]||(P[id]={});p.cards=p.cards||{};p.exams=p.exams||[];p.seen=p.seen||{};p.days=p.days||{};p.ach=p.ach||{};p.skin=p.skin||'classic';p.skinT=p.skinT||0;p.pw=p.pw||{};p.aura=p.aura||'none';p.auraT=p.auraT||0;p.arm=p.arm||[];p.vis=p.vis||{};if(id==='kl8'&&!p._m1&&C&&C.topics){p._m1=1;migDeu(p)}return p}
function loadLocal(){try{var r=localStorage.getItem(LS);if(r)P=JSON.parse(r)||{}}catch(e){}}
function saveLocal(){try{localStorage.setItem(LS,JSON.stringify(P))}catch(e){}}
function sortEx(a){return a.slice().sort(function(x,y){return x.t-y.t||(x.topic<y.topic?-1:1)})}
function shape(o){return {cards:o.cards||{},seen:o.seen||{},exams:sortEx(o.exams||[]),days:o.days||{},ach:o.ach||{},skin:o.skin||'classic',skinT:o.skinT||0,pw:o.pw||{},aura:o.aura||'none',auraT:o.auraT||0,v:3}}
function prepared(id){return shape(prog(id))}
function save(id){saveLocal();scheduleWrite(id)}
function updateSync(){var el=document.getElementById('sync');if(el)el.textContent=sync.state==='synced'?'Fortschritt: auf allen Geräten gespeichert.':'Fortschritt: nur auf diesem Gerät gespeichert.'}
function scheduleWrite(id){if(!sync.db||sync.noWrite)return;clearTimeout(sync.timers[id]);sync.timers[id]=setTimeout(function(){flush(id)},1500)}
function flush(id){
  if(sync.busy[id]){scheduleWrite(id);return}
  var body=prepared(id);if(stable(body)===sync.last[id])return;
  sync.busy[id]=true;
  sync.db.doc('progress/'+id).set(body).then(function(){sync.last[id]=stable(body);sync.state='synced';updateSync()})
  .catch(function(e){if(e&&e.code==='invalid_argument')sync.noWrite=true;sync.state='local';updateSync()})
  .then(function(){sync.busy[id]=false});
}
function mergeRemote(id,r){
  var p=prog(id),ch=false,rc=r.cards||{},k;
  for(k in rc){var a=p.cards[k],b=rc[k];if(!a||(b.t||0)>(a.t||0)){p.cards[k]=b;ch=true}}
  var have={};p.exams.forEach(function(x){have[x.topic+'@'+x.t]=1});
  (r.exams||[]).forEach(function(x){if(!have[x.topic+'@'+x.t]){p.exams.push(x);ch=true}});
  var rs=r.seen||{};for(k in rs){if((rs[k]||0)>(p.seen[k]||0)){p.seen[k]=rs[k];ch=true}}
  var rd=r.days||{};
  for(k in rd){var da=p.days[k],db_=rd[k];
    if(!da){p.days[k]=db_;ch=true}
    else{['sec','n','ok','xp'].forEach(function(f){if((db_[f]||0)>(da[f]||0)){da[f]=db_[f];ch=true}});if(db_.goal&&!da.goal){da.goal=1;ch=true}}}
  var ra=r.ach||{};for(k in ra){if(!p.ach[k]){p.ach[k]=ra[k];ch=true}}
  if((r.skinT||0)>(p.skinT||0)){p.skin=r.skin||'classic';p.skinT=r.skinT;ch=true}
  var rp=r.pw||{};for(k in rp){if(!p.pw[k]||rp[k]>p.pw[k]){p.pw[k]=rp[k];ch=true}}
  if((r.auraT||0)>(p.auraT||0)){p.aura=r.aura||'none';p.auraT=r.auraT;ch=true}
  if(id==='kl8'){var _b=Object.keys(p.cards).length;migDeu(p);if(Object.keys(p.cards).length!==_b)ch=true}
  sync.last[id]=stable(shape(r));
  if(ch){saveLocal();if(nav.view==='home'||nav.view==='child'||nav.view==='subject'||nav.view==='parent')render()}
  if(stable(prepared(id))!==sync.last[id])scheduleWrite(id);
}
function initDb(){
  try{
    if(!(window.claude&&window.claude.use))return;
    window.claude.use('db').then(function(db){
      if(!db)return;sync.db=db;
      C.children.forEach(function(c){
        try{db.doc('progress/'+c.id).onSnapshot(function(s){if(s.exists)mergeRemote(c.id,s.data())},function(){})}catch(e){}
        scheduleWrite(c.id);
      });
    }).catch(function(){});
  }catch(e){}
}

/* ---------- Tage, Zeit, XP ---------- */
function dkey(off){var d=new Date();d.setDate(d.getDate()-off);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function day(id){var p=prog(id),k=dkey(0);return p.days[k]||(p.days[k]={sec:0,n:0,ok:0,xp:0})}
function peekDay(id,off){return prog(id).days[dkey(off||0)]||{sec:0,n:0,ok:0,xp:0}}
function touch(id){var now=Date.now();if(lastAct&&now-lastAct<90000)day(id).sec+=Math.round((now-lastAct)/1000);lastAct=now;if(now-lastSave>20000){lastSave=now;save(id)}}
function logAnswer(id,ok){var d=day(id);d.n++;if(ok)d.ok++;if(typeof rewardAfter==='function')rewardAfter(ok)}
function xpTotal(id){var s=0,d=prog(id).days,k;for(k in d)s+=d[k].xp||0;return s}
function plv(xp){return Math.floor(xp/1000)+1}
function fx(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,"'")}
function logoSvg(s){return '<svg class="logo" viewBox="0 0 120 76" width="'+Math.round(s*1.58)+'" height="'+s+'" aria-hidden="true"><rect x="32" y="3" width="62" height="44" rx="6" fill="#FBBC05"/><rect x="37" y="8" width="52" height="34" rx="2.5" fill="#fff"/><path d="M42 36l11-13 8 9 9-12 13 16z" fill="#34A853"/><circle cx="76" cy="18" r="4" fill="#EA4335"/><path d="M57 47h12l3 8H54z" fill="#E0A100"/><rect x="45" y="54" width="36" height="5" rx="2.5" fill="#E0A100"/><path d="M4 30c11-4 22-3 31 4v36c-9-6-20-7-31-4z" fill="#4285F4"/><path d="M35 34c9-7 20-8 31-4v36c-11-3-22-2-31 4z" fill="#34A853"/><path d="M42 42c6-2 13-2 19 1M42 50c6-2 13-2 19 1M42 58c6-2 13-2 19 1" stroke="#fff" stroke-opacity=".7" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M35 34v36" stroke="#fff" stroke-width="2.5"/><path d="M10 42c6-2 13-2 19 1M10 50c6-2 13-2 19 1M10 58c6-2 13-2 19 1" stroke="#fff" stroke-opacity=".7" stroke-width="2.2" fill="none" stroke-linecap="round"/><rect x="84" y="26" width="31" height="46" rx="6" fill="#EA4335"/><rect x="88" y="31" width="23" height="33" rx="2" fill="#fff"/><path d="M92 40h15M92 47h15M92 54h9" stroke="#4285F4" stroke-width="2.6" stroke-linecap="round"/><circle cx="99.5" cy="68" r="1.8" fill="#fff"/></svg>'}
var RANK=['Neuling','Rookie','Checker','Durchstarter','Hustler','Mastermind','Brain-Boss','Legende','Endgegner','GOAT'];
function rankName(L){return L<=10?RANK[L-1]:'GOAT +'+(L-10)}
function plinfo(id){var t=xpTotal(id),L=plv(t),x=t%1000;return {xp:t,total:t,L:L,rank:'Level '+L,base:0,next:L*1000,pct:x/1000}}
function streak(id){var d=prog(id).days,s=0,off=0;if(!(d[dkey(0)]&&d[dkey(0)].xp>0))off=1;while(d[dkey(off)]&&d[dkey(off)].xp>0){s++;off++}return s}

var SK=[
 {id:'classic',n:'Classic',lvl:1,r:'common'},
 {id:'phones',n:'Kopfhörer',lvl:2,r:'rare',acc:'phones',hair:'#2F7F86',iris:'#2FA39B'},
 {id:'glasses',n:'Nerd-Brille',lvl:3,r:'rare',acc:'glasses',hair:'#3B3A4F',iris:'#6B7BB8'},
 {id:'cap',n:'Cap',lvl:4,r:'epic',acc:'cap',hair:'#C2506E',iris:'#D4608A'},
 {id:'cat',n:'Katzenohren',lvl:5,r:'epic',acc:'cat',hair:'#6D4FD6',iris:'#8E6BE0'},
 {id:'dragon',n:'Drache',lvl:6,r:'epic',acc:'horns',hair:'#D6452F',iris:'#F6A623'},
 {id:'crown',n:'Krone',lvl:8,r:'legendary',acc:'crown',hair:'#E38B1B',iris:'#E3A02F'},
 {id:'gold',n:'Gold',lvl:10,r:'legendary',acc:'crown',hair:'#D9B13B',iris:'#C98F00'}
];
function skinById(id){return SK.filter(function(s){return s.id===id})[0]||SK[0]}
var POW=[
 {id:'x2',n:'Doppel-XP',ic:'⚡',lvl:2,d:'Die nächste Runde gibt doppelt so viele XP.'},
 {id:'shield',n:'Combo-Schild',ic:'🛡️',lvl:3,d:'Ein Fehler zerstört deine Combo nicht.'},
 {id:'free',n:'Gratis-Tipps',ic:'💡',lvl:5,d:'Tipps kosten in der nächsten Runde nichts.'},
 {id:'skip',n:'Joker',ic:'⏩',lvl:7,d:'Überspringe eine Aufgabe ohne Strafe.'}
];
var AUR=[
 {id:'neon',n:'Neon',ic:'✨',lvl:4},
 {id:'fire',n:'Feuer',ic:'🔥',lvl:6},
 {id:'galaxy',n:'Galaxie',ic:'🌌',lvl:9}
];
var SKIC={classic:'🙂',phones:'🎧',glasses:'🤓',cap:'🧢',cat:'🐱',dragon:'🐲',crown:'👑',gold:'🏆'};
function auraOf(id){var a=AUR.filter(function(x){return x.id===prog(id).aura})[0];return a&&a.lvl<=plinfo(id).L?a.id:'none'}
function skinOf(childId){var s=skinById(prog(childId).skin);if(s.lvl>plinfo(childId).L)s=SK[0];var o={};for(var k in s)o[k]=s[k];o.aura=auraOf(childId);var cc=C&&C.children.filter(function(x){return x.id===childId})[0];if(cc&&cc.img)o.img=cc.img;return o}
function powReady(id,pw){var p=prog(id);return pw.lvl<=plinfo(id).L&&p.pw[pw.id]!==dkey(0)}
var REAL={2:['🍬','Extra Süsses'],3:['🎮','30 Min extra Games'],4:['🍦','Glace nach Wahl'],5:['🛌','Einmal ausschlafen'],6:['🎬','Filmabend aussuchen'],7:['🍔','Burgerkind-Menü'],8:['🍟','McDonald\'s-Besuch'],9:['🎮','1 Std extra Games'],10:['🎡','Ausflug nach Wahl'],11:['🍕','Pizza-Abend'],12:['🎁','Kleines Wunschgeschenk']};
function tiers(upto){
  var out=[],L;
  for(L=1;L<=upto;L++){
    var r=[];if(REAL[L])r.push({ic:REAL[L][0],t:REAL[L][1],real:1});SK.forEach(function(x){if(x.lvl===L&&L>1)r.push({ic:SKIC[x.id],t:x.n})});
    POW.forEach(function(x){if(x.lvl===L)r.push({ic:x.ic,t:x.n})});
    AUR.forEach(function(x){if(x.lvl===L)r.push({ic:x.ic,t:'Aura '+x.n})});
    if(!r.length)r.push({ic:'⭐',t:'Bonus-Rang'});
    out.push({L:L,r:r});
  }
  return out;
}

var ACH={
 first:['Erster Schritt','Die erste Runde geschafft'],
 combo5:['Combo x5','5 richtige in Folge'],
 perfect:['Perfekte Runde','Alles direkt richtig'],
 streak3:['3 Tage am Stück','3 Tage hintereinander geübt'],
 streak7:['Wochen-Serie','7 Tage hintereinander geübt'],
 lv3:['Rang 3','Rang 3 erreicht'],
 lv5:['Rang 5','Rang 5 erreicht'],
 master10:['10 Aufgaben sitzen','10 Aufgaben komplett gelernt'],
 exam5:['Prüfungs-Ass','Note 5 oder besser'],
 pairs:['Memory-Profi','Paare-Spiel geschafft'],
 learn:['Theorie-Fuchs','Ein Thema bis zum Ende angeschaut']
};
function toast(m,k){if(/^Erfolg:|^Neuer Style|^Tagesziel|^Kraft/.test(m))return;var o={m:m,k:k||''};TQ.push(o);drawToasts();setTimeout(function(){TQ=TQ.filter(function(x){return x!==o});drawToasts()},2800)}
function drawToasts(){var el=document.getElementById('toasts');if(el)el.innerHTML=TQ.map(function(t){return '<div class="toast '+t.k+'">'+esc(t.m)+'</div>'}).join('')}
function ach(id,key){var p=prog(id);if(p.ach[key])return;p.ach[key]=Date.now();toast('Erfolg: '+ACH[key][0],'gold');save(id)}
function addXp(id,n){
  var before=plv(xpTotal(id)),d=day(id);d.xp+=n;
  if(!d.goal&&d.xp>=DG){d.goal=1;d.xp+=25;toast('Tagesziel geschafft! +25 XP','gold')}
  var after=plv(xpTotal(id));
  if(after>before){toast('Level '+after+' erreicht!','gold');var sk=SK.filter(function(s){return s.lvl>before&&s.lvl<=after});if(sk.length)toast('Neuer Style: '+sk[0].n,'gold')}
  return n;
}
function capOf(c){return isV(c)?4:3}
function checkPassive(id){
  var s=streak(id);if(s>=3)ach(id,'streak3');if(s>=7)ach(id,'streak7');
  var L=plinfo(id).L;if(L>=3)ach(id,'lv3');if(L>=5)ach(id,'lv5');
  var m=0,p=prog(id);Object.keys(p.cards).forEach(function(k){var x=cardIdx[k];if(x&&p.cards[k].b>=capOf(x.c))m++});
  if(m>=10)ach(id,'master10');
}

/* ---------- Inhalte ---------- */
function topicById(id){return C.topics.filter(function(t){return t.id===id})[0]}
function subjOf(c){return C.subjects.filter(function(sb){return c.subjects?c.subjects.indexOf(sb.id)>=0:topicsOf(c.id,sb.id).length})}
function topicsOf(child,subject){return C.topics.filter(function(t){return t.child===child&&(!subject||t.subject===subject)})}
function subjName(id){var s=C.subjects.filter(function(x){return x.id===id})[0];return s?s.name:id}
function cardsIn(topics){var out=[];topics.forEach(function(t){t.cards.forEach(function(c){out.push({k:t.id+'_'+c.id,c:c,t:t})})});return out}
function stats(child,topics){
  var p=prog(child),now=Date.now(),s={total:0,sits:0,due:0,fresh:0,weak:0};
  cardsIn(topics).forEach(function(x){s.total++;var r=p.cards[x.k];if(!r){s.fresh++;return}if(r.b>=capOf(x.c))s.sits++;if(r.d<=now)s.due++;if(r.b<=1)s.weak++});
  return s;
}
function scopeTopics(child,scope){
  if(scope.type==='topic')return [topicById(scope.id)];
  if(scope.type==='subject')return topicsOf(child,scope.id);
  return topicsOf(child);
}
function sigWords(c){var t=((c.pre||'')+' '+(c.a||'')+' '+String(c.q||'').split('\n')[0]).toLowerCase().match(/[a-zäöüß]{4,}/g)||[];return t}
function pickDiverse(list,n,used,df,lim){
  var out=[],rest=[],u=Object.assign({},used);
  list.forEach(function(x){
    if(out.length>=n){rest.push(x);return}
    var sw=sigWords(x.c).filter(function(w){return (df[w]||0)<=lim}),clash=sw.some(function(w){return u[w]});
    if(clash){rest.push(x);return}
    sw.forEach(function(w){u[w]=1});out.push(x)});
  for(var i=0;i<rest.length&&out.length<n;i++)out.push(rest[i]);
  return out;
}
function buildQueue(child,topics,force){
  var p=prog(child),now=Date.now(),all=cardsIn(topics),MAX=10,fv=0;
  var due=all.filter(function(x){return p.cards[x.k]&&p.cards[x.k].d<=now}).sort(function(a,b){return p.cards[a.k].b-p.cards[b.k].b||p.cards[a.k].d-p.cards[b.k].d});
  var fresh=shuffle(all.filter(function(x){return !p.cards[x.k]})).filter(function(x){if(isV(x.c)){fv++;return fv<=5}return true});
  var q=shuffle(due.slice(0,12)).slice(0,5);
  if(q.length<MAX){var room=MAX-q.length,df={},used={};
    all.forEach(function(x){var seen={};sigWords(x.c).forEach(function(w){if(!seen[w]){seen[w]=1;df[w]=(df[w]||0)+1}})});
    var lim=Math.max(6,Math.round(all.length*.06));
    q.forEach(function(x){sigWords(x.c).forEach(function(w){used[w]=1})});
    q=q.concat(pickDiverse(fresh,room,used,df,lim));
    if(q.length<MAX){due.forEach(function(x){if(q.length<MAX&&q.indexOf(x)<0)q.push(x)})}}
  if(!q.length&&force){q=shuffle(all.filter(function(x){return p.cards[x.k]})).sort(function(a,b){return p.cards[a.k].b-p.cards[b.k].b||p.cards[a.k].t-p.cards[b.k].t}).slice(0,8)}
  return q.map(function(x){return x.k});
}
function bestNote(child,topicId){var best=0;prog(child).exams.forEach(function(e){if(e.topic===topicId&&e.note>best)best=e.note});return best}
function fmt(n){return (Math.round(n*10)/10).toFixed(1)}
function grade(score,max){return Math.round((1+5*score/max)*10)/10}

/* ---------- Prüfen ---------- */
function norm(s){return String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/[−–]/g,'-').replace(/\s+/g,' ').replace(/\s*([\/=:+\-·*])\s*/g,'$1').replace(/[.!?\s]+$/,'').trim()}
function plain(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'')}
function loose(s){return plain(norm(s)).replace(/[,;:!?"]/g,'').replace(/\s+/g,' ')}
function checkAns(inp,answers){
  if(answers.length&&answers.every(function(x){return /^[\u2212\-]?[\d'.,]+$/.test(String(x).trim())}))inp=String(inp||'').replace(/\s*(cm²|cm³|m²|m³|cm|mm|km|kg|ml|dl|cl|fr\.?|rp\.?|°c|°|%|g|l|m|t)\s*$/i,'');
  var n=norm(inp||'');if(!n)return {ok:false,empty:true};
  for(var i=0;i<answers.length;i++){if(norm(answers[i])===n)return {ok:true}}
  for(var j=0;j<answers.length;j++){if(plain(norm(answers[j]))===plain(n))return {ok:true,accent:answers[j]}}
  for(var m=0;m<answers.length;m++){if(loose(answers[m])===loose(inp))return {ok:true}}
  return {ok:false};
}
function checkStrict(inp,answers){var n=String(inp||'').replace(/\s+/g,' ').trim();if(!n)return {ok:false,empty:true};for(var i=0;i<answers.length;i++){if(String(answers[i]).replace(/\s+/g,' ').trim()===n)return {ok:true}}return {ok:false}}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++){d[i]=[i]}for(j=0;j<=n;j++)d[0][j]=j;
  for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function nearMiss(inp,answers){var a=loose(inp);return answers.some(function(x){var b=loose(x);return b.length>=5&&lev(a,b)<=1})}
function derive(a){return String(a).replace(/\s*\(.*?\)\s*/g,' ').replace(/\s+/g,' ').replace(/[.]+$/,'').trim()}
function wc(s){return s.split(/\s+/).length}
function cardAns(c){return c.ans||[derive(c.a)]}
function checkable(c){return !!c.ans||wc(derive(c.a))<=4}
function isSoft(c){return wc(derive(c.ans?c.ans[0]:c.a))>4}
function isV(c){return c.fw!==undefined}
function textHints(t){
  var w=wc(t);
  if(w>2)return ['Der Satz hat '+w+' Wörter.','Er beginnt mit «'+t.split(' ').slice(0,2).join(' ')+'…»','Die ersten Wörter: «'+t.split(' ').slice(0,Math.ceil(w*0.6)).join(' ')+'…»'];
  return ['Die Lösung hat '+t.length+' Buchstaben.','Sie beginnt mit «'+t.charAt(0)+'».','Die ersten Buchstaben: «'+t.slice(0,Math.max(2,Math.ceil(t.length*0.5)))+'…»'];
}

/* ---------- Mathe-Generator ---------- */
function gcd(a,b){return b?gcd(b,a%b):Math.abs(a)}
function lcm(a,b){return a*b/gcd(a,b)}
function red(f){var g=gcd(f[0],f[1])||1;return [f[0]/g,f[1]/g]}
function Fs(f){return f[1]===1?String(f[0]):f[0]+'/'+f[1]}
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function rf(){var D=[2,3,4,5,6,8,10,12];for(var t=0;t<50;t++){var d=D[ri(0,D.length-1)],n=ri(1,d-1);if(gcd(n,d)===1)return [n,d]}return [1,2]}
function pies(L,x,y){return L<=12?[{type:'pie',parts:L,filled:x},{type:'pie',parts:L,filled:y}]:null}
function genA(){
  for(var t=0;t<300;t++){
    var a=rf(),c=rf(),e=rf(),raw=[c[0]*e[1],c[1]*e[0]],q=red(raw);
    if(q[1]===1||q[1]>12)continue;
    var L=lcm(a[1],q[1]);if(L>24)continue;
    var x=a[0]*L/a[1],y=q[0]*L/q[1];if(x<=y)continue;
    var res=red([x-y,L]);if(res[1]===1||res[1]>12)continue;
    var s3='= '+(x-y)+'/'+L+(res[0]!==x-y||res[1]!==L?' = '+Fs(res):'');
    return {q:Fs(a)+' − '+Fs(c)+' : '+Fs(e)+' =',a:Fs(res),
      steps:[[Fs(c)+' : '+Fs(e)+' = '+Fs(c)+' · '+e[1]+'/'+e[0]+' = '+raw[0]+'/'+raw[1]+(raw[0]!==q[0]?' = '+Fs(q):''),'Geteilt zuerst: Kehrbruch, dann kürzen'],
             [Fs(a)+' − '+Fs(q)+' = '+x+'/'+L+' − '+y+'/'+L,'Hauptnenner '+L],
             [s3,'Zähler abziehen']],
      hints:['Geteilt kommt vor Minus. Rechne zuerst '+Fs(c)+' : '+Fs(e)+'.','Nimm den Kehrbruch von '+Fs(e)+' und rechne mal.','Das Zwischenergebnis ist '+Fs(q)+'. Suche nun den Hauptnenner von '+a[1]+' und '+q[1]+'.'],
      solvis:pies(L,x,y)};
  }
  return null;
}
function genB(){
  for(var t=0;t<300;t++){
    var a=rf(),c=rf(),e=rf(),L=lcm(c[1],e[1]);
    if(L>24)continue;
    var x=c[0]*L/c[1],y=e[0]*L/e[1];if(x<=y)continue;
    var diff=red([x-y,L]);if(diff[1]===1)continue;
    var raw=[a[0]*diff[0],a[1]*diff[1]],prod=red(raw);if(prod[1]>40||prod[1]===1)continue;
    return {q:Fs(a)+' · ('+Fs(c)+' − '+Fs(e)+') =',a:Fs(prod),
      steps:[[Fs(c)+' − '+Fs(e)+' = '+x+'/'+L+' − '+y+'/'+L+' = '+(x-y)+'/'+L+(diff[1]!==L?' = '+Fs(diff):''),'Klammer zuerst, Hauptnenner '+L],
             [Fs(a)+' · '+Fs(diff)+' = '+raw[0]+'/'+raw[1]+(raw[0]!==prod[0]?' = '+Fs(prod):''),'Malnehmen, dann kürzen']],
      hints:['Zuerst die Klammer.','Hauptnenner von '+c[1]+' und '+e[1]+' ist '+L+'.','Die Klammer ergibt '+Fs(diff)+'. Jetzt malnehmen und kürzen.'],
      solvis:pies(L,x,y)};
  }
  return null;
}
function genCard(kind){return (kind==='A'?genA():genB())}
