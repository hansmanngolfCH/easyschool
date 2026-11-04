
/* ---------- Ansichten: Start, Klasse, Fach, Verstehen ---------- */
function syncNote(){return ''}
function label(c){return c.name||(c.grade+'. Klasse')}
function coach(html,l){return ''}
var LVC=['#8FDB6B','#5CC96A','#2FB36B','#1BA38A','#1593B8','#1A73E8','#4B54D9','#7A3FD1','#A733BE','#D12E8A','#E0402F','#C42525','#8E1B1B'];
function lvColor(L){return LVC[Math.min(L,LVC.length)-1]}
function shield(L,size){var c=lvColor(L),h=Math.round(size*1.15),fs=L>=100?.34:L>=10?.46:.56;return '<span class="shield" style="--c:'+c+';width:'+size+'px;height:'+h+'px"><svg viewBox="0 0 60 68" width="'+size+'" height="'+h+'" aria-hidden="true"><path d="M30 3L55 14V38C55 52 44 62 30 66C16 62 5 52 5 38V14Z" fill="none" stroke="'+c+'" stroke-width="5" stroke-linejoin="round"/></svg><b style="color:'+c+';font-size:'+Math.round(size*fs)+'px">'+L+'</b></span>'}
function gbar(pl){return '<div class="gbar" role="img" aria-label="XP"><i style="width:'+Math.max(4,Math.round(pl.pct*100))+'%"></i></div><div class="gx"><b>'+fx(pl.xp)+' XP</b><span>noch '+fx(pl.next-pl.xp)+' bis Level '+(pl.L+1)+'</span></div>'}
function tierTrack(pl){
  var up=Math.max(10,pl.L+4),list=tiers(up);
  return '<div class="tiers" tabindex="0" aria-label="Belohnungen pro Rang">'+list.map(function(x){
    var cl=x.L<pl.L?' done':x.L===pl.L?' cur':'',rl=x.r.filter(function(q){return q.real})[0],rest=x.r.filter(function(q){return !q.real}).map(function(q){return q.t}).join(', ');
    return '<div class="tier'+cl+'"><span class="tl">RANG '+x.L+'</span>'+(rl?'<span class="ti">'+rl.ic+'</span><span class="tn"><b>'+esc(rl.t)+'</b></span>':'<span class="ti">★</span><span class="tn">Bonus</span>')+'</div>'}).join('')+'</div>';
}
function nextReward(pl){
  var all=tiers(Math.max(12,pl.L+4)).filter(function(x){return x.L>pl.L&&x.r.some(function(q){return q.real})})[0];
  if(!all)return '';
  var rl=all.r.filter(function(q){return q.real})[0],rest=all.r.filter(function(q){return !q.real}).map(function(q){return q.t});
  return rl?'Nächste Belohnung bei Rang '+all.L+': '+rl.t:'';
}
function banner(){
  if(!nav.child||(nav.view!=='child'&&nav.view!=='subject'))return '';
  var id=nav.child,pl=plinfo(id),L=level(id,topicsOf(id));
  return '<div class="banner">'+av(L.lvl,40)+'<div class="bn-m"><div class="bn-row"><span class="bn-lv">'+'<b style="color:'+(myCol()>=0?AVCOL[myCol()][1]:'inherit')+'">'+(esc(myName())||'NoName')+'</b> · '+'Level '+pl.L+'</span><span class="bn-xp">'+fx(pl.xp)+' XP</span></div><div class="xpg sm" role="img" aria-label="XP"><i style="width:'+Math.max(5,Math.round(pl.pct*100))+'%"></i><u></u></div></div>'+shield(pl.L,40)+'</div>';
}
function xpbar(pl){return '<div class="xpbar"><div class="bar" role="img" aria-label="XP"><i style="width:'+Math.max(3,Math.round(pl.pct*100))+'%"></i></div><span class="pct">'+pl.xp+' / '+pl.next+' XP</span></div>'}

function cclass(c){
  var subs=subjOf(c),n=subs.length;
  return '<button class="ccard simple sm2" data-act="child" data-id="'+esc(c.id)+'"><span class="cc-top"><span class="cnum">'+esc(String(c.grade||''))+'</span><span class="cc-t"><span class="cc-h">'+esc(label(c))+'</span><span class="sub'+(n?'':' noc')+'">'+(n?n+(n===1?' Fach':' Fächer'):'Kein Inhalt')+'</span></span></span></button>';
}
var STUFE_IC={p:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L17 4l3 3L8 19z"/><path d="M14 7l3 3"/></svg>',o:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>'};
function cloudAcct(){try{return JSON.parse(localStorage.getItem('es.acct')||'null')}catch(e){return null}}
function cloudBtn(){var a=cloudAcct();return '<button class="cloudbtn'+(a?' on':'')+'" data-act="cloud">'+(a?'☁ Angemeldet: '+esc(a.name):'☁ Auf allen Geräten speichern')+'</button>'}
function vHome(){
  var kids=C.children.filter(function(c){return topicsOf(c.id).length}).sort(function(a,b){return (a.grade||0)-(b.grade||0)});
  var prim=kids.filter(function(c){return (c.grade||0)<=6}),ober=kids.filter(function(c){return (c.grade||0)>=7});
  var cards=(prim.length?'<div class="clist cl-p">'+prim.map(cclass).join('')+'</div>':'')+(ober.length?'<div class="clist cl-o">'+ober.map(cclass).join('')+'</div>':'');
  var tot=0;C.children.forEach(function(c){tot+=xpTotal(c.id)});var HL=plv(tot),hp=(tot%1000)/1000;
  var hb='<div class="banner hbn"><span class="av" style="width:40px;height:40px">'+avPic(myAv(),40)+'</span><div class="bn-m"><div class="bn-row"><span class="bn-lv"><b style="color:'+AVCOL[myCol()][1]+'">'+(esc(myName())||'NoName')+'</b> · Level '+HL+'</span><span class="bn-xp">'+fx(tot)+' XP</span></div><div class="xpg sm" role="img" aria-label="XP"><i style="width:'+Math.max(5,Math.round(hp*100))+'%"></i><u></u></div></div>'+shield(HL,40)+'</div>';
  var picker='';
  if(nav.avpick){var cur=myAv(),cc=myCol();picker='<div class="avmodal"><div class="avback" data-act="avclose"></div><div class="avsheet" role="dialog" aria-label="Avatar aussuchen"><div class="avhead"><b>Dein Avatar</b><button class="btn sm" data-act="avclose">Fertig</button></div><label class="lab2" for="avname">Dein Name (freiwillig)</label><input class="inp avname" id="avname" maxlength="14" placeholder="Zum Beispiel Luca" value="'+esc(myName())+'" autocomplete="off"><p class="lab2" style="margin-top:12px">Farbe</p><div class="avcols">'+AVCOL.map(function(c,i){return '<button class="avcol'+(i===cc?' on':'')+'" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+')" data-act="avcol" data-id="'+i+'" aria-label="Farbe '+(i+1)+'"></button>'}).join('')+'</div><p class="lab2" style="margin-top:12px">Bild</p><div class="avgrid">'+Array.apply(null,{length:AV_N}).map(function(_,i){return '<button class="avopt'+(i===cur?' on':'')+'" data-act="avpick" data-id="'+i+'" aria-label="Avatar '+(i+1)+'">'+avPic(i,56)+'</button>'}).join('')+'</div></div></div>'}
  return '<div class="home"><button class="avbtn" data-act="avopen" aria-label="Avatar aussuchen"><span class="avdot">'+avPic(myAv(),34)+'</span><span class="avn">'+(esc(myName())||'NoName')+'</span></button><div class="brandrow">'+logoSvg(76)+'<h1>EasySchool</h1></div>'+hb+'<p class="ask">Wähle deine Klasse</p>'+cards+''+picker+'</div>';
}

function vChild(){
  var ch=C.children.filter(function(c){return c.id===nav.child})[0],all=topicsOf(ch.id),s=stats(ch.id,all),pl=plinfo(ch.id),p=prog(ch.id),st=streak(ch.id),dx=peekDay(ch.id).xp;
  var L=level(ch.id,all);
  var html='<div class="stack"><h1>'+esc(label(ch))+'</h1>';
  if(!all.length&&!subjOf(ch).length)return html+'<section class="card"><h2>Noch ist alles leer</h2><p class="sub" style="margin-top:6px">Sobald neue Aufgaben da sind, tauchen sie hier auf.</p></section>'+syncNote()+'</div>';
  var subs=subjOf(ch);
  html+='<section class="worlds-wrap"><h2 class="wtitle">Wähle dein Fach</h2><div class="worlds">'+subs.map(function(sb){
    var ts=topicsOf(ch.id,sb.id),Lw=level(ch.id,ts),w=Math.max(Lw.seen?4:0,Math.round(Lw.pct*100)),n=ts.length,pot=0;
    ts.forEach(function(t){pot+=t.cards.length*10+t.exam.questions.length*5+60});
    return '<button class="world w-'+esc(sb.id)+'" data-act="subject" data-id="'+esc(sb.id)+'"><span class="wi">'+sicon(sb,52)+'</span><span class="wn">'+esc(sb.name)+'</span><span class="wm">'+(n?n+(n===1?' Thema':' Themen'):'Bald mehr')+'</span><span class="wb"><i style="width:'+w+'%"></i></span><span class="wl">'+(n?w+'% geschafft':'noch leer')+'</span><span class="wgo">Los geht\'s ›</span></button>'}).join('')+'</div></section>';
  html+='<button class="progbtn" data-act="prog" data-id="'+ch.id+'"><span class="pbi">📈</span><span class="pbt"><b>Mein Fortschritt</b><small>Zeit, Stärken und Prüfungsnoten</small></span><i>›</i></button>';
  var left=s.due+s.fresh;

  var weak=all.map(function(t){return {t:t,w:stats(ch.id,[t]).weak}}).filter(function(x){return x.w>0}).sort(function(a,b){return b.w-a.w}).slice(0,2);
  if(weak.length){
    html+='<section class="list weak"><h2>Das üben wir noch</h2>'+weak.map(function(x){
      return '<div class="card row between"><div class="grow"><h3>'+esc(x.t.title)+'</h3><p class="sub">'+x.w+(x.w===1?' Aufgabe sitzt':' Aufgaben sitzen')+' noch nicht</p></div><button class="btn sm pri" data-act="practice" data-scope="topic:'+esc(x.t.id)+'" data-force="1">Üben</button></div>'}).join('')+'</section>';
  }

  return html+syncNote()+'</div>';
}

var B='#4285F4',R='#EA4335',Y='#FBBC04',G='#34A853';
var ART={
bruch:'<circle cx="32" cy="32" r="22" fill="#fff" stroke="#DADCE0" stroke-width="2"/><path d="M32 32V10A22 22 0 0 1 54 32z" fill="'+R+'"/><path d="M32 32H54A22 22 0 0 1 32 54z" fill="'+Y+'"/><path d="M32 32V54A22 22 0 0 1 10 32z" fill="'+G+'"/><path d="M32 32H10A22 22 0 0 1 32 10z" fill="'+B+'" opacity=".35"/><circle cx="32" cy="32" r="22" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M32 10V54M10 32H54" stroke="#fff" stroke-width="2.5"/>',
pyth:'<path d="M14 50V26L38 50z" fill="'+Y+'" opacity=".9"/><rect x="14" y="26" width="0" height="0"/><rect x="4" y="26" width="10" height="24" fill="'+B+'"/><rect x="14" y="50" width="24" height="10" fill="'+G+'"/><path d="M14 26L38 50 55 33 31 9z" fill="'+R+'"/><path d="M14 46v4h4" fill="none" stroke="#fff" stroke-width="2"/>',
ie:'<text x="6" y="40" font-family="Google Sans,Arial,sans-serif" font-weight="700" font-size="30" fill="'+B+'">ie</text><text x="34" y="56" font-family="Google Sans,Arial,sans-serif" font-weight="700" font-size="30" fill="'+R+'">h</text><path d="M8 48h22" stroke="'+Y+'" stroke-width="4" stroke-linecap="round"/><path d="M36 14h20" stroke="'+G+'" stroke-width="4" stroke-linecap="round"/>',
gram:'<rect x="6" y="10" width="22" height="12" rx="6" fill="'+B+'"/><rect x="32" y="10" width="26" height="12" rx="6" fill="'+R+'"/><rect x="6" y="26" width="30" height="12" rx="6" fill="'+Y+'"/><rect x="40" y="26" width="18" height="12" rx="6" fill="'+G+'"/><rect x="6" y="42" width="16" height="12" rx="6" fill="'+G+'"/><rect x="26" y="42" width="32" height="12" rx="6" fill="'+B+'" opacity=".55"/>',
travel:'<path d="M6 54C18 54 22 38 34 38S50 22 58 12" fill="none" stroke="#DADCE0" stroke-width="2.5" stroke-dasharray="3 5" stroke-linecap="round"/><path d="M30 24l22-10-4 8 8 4-4 4-10-2-12 12-3-1 4-12-8-1-2-4z" fill="'+B+'"/><rect x="8" y="40" width="18" height="14" rx="3" fill="'+R+'"/><path d="M13 40v-3h8v3" fill="none" stroke="'+R+'" stroke-width="2"/><rect x="8" y="45" width="18" height="2" fill="#fff" opacity=".8"/>',
family:'<circle cx="20" cy="22" r="8" fill="'+B+'"/><path d="M6 52c0-10 6-16 14-16s14 6 14 16z" fill="'+B+'"/><circle cx="44" cy="24" r="7" fill="'+R+'"/><path d="M31 52c0-9 6-14 13-14s13 5 13 14z" fill="'+R+'"/><circle cx="32" cy="38" r="5" fill="'+Y+'"/><path d="M24 54c0-6 3-9 8-9s8 3 8 9z" fill="'+Y+'"/>',
school:'<path d="M6 16c8-3 18-3 26 2v34c-8-5-18-5-26-2z" fill="'+B+'"/><path d="M58 16c-8-3-18-3-26 2v34c8-5 18-5 26-2z" fill="'+G+'"/><path d="M12 24c5-1 10-1 15 1M12 32c5-1 10-1 15 1M37 25c5-2 10-2 15-1" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M44 6l8 8-18 18-9 1 1-9z" fill="'+Y+'" transform="translate(4 -2) scale(.8)"/>',
music:'<path d="M24 14l26-6v34" fill="none" stroke="'+B+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 14v34" stroke="'+B+'" stroke-width="4" stroke-linecap="round"/><ellipse cx="17" cy="48" rx="9" ry="7" fill="'+R+'"/><ellipse cx="43" cy="42" rx="9" ry="7" fill="'+Y+'"/>',
laenge:'<rect x="5" y="20" width="54" height="24" rx="5" fill="'+Y+'"/><path d="M13 20v11M23 20v7M33 20v11M43 20v7M53 20v11" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
gewicht:'<path d="M22 24a10 10 0 0 1 20 0" fill="none" stroke="'+G+'" stroke-width="4"/><path d="M10 54L17 26h30l7 28z" fill="'+G+'"/><text x="32" y="47" text-anchor="middle" font-family="Arial" font-weight="700" font-size="16" fill="#fff">kg</text>',
mathe:'<rect x="8" y="8" width="20" height="20" rx="5" fill="'+B+'"/><rect x="36" y="8" width="20" height="20" rx="5" fill="'+R+'"/><rect x="8" y="36" width="20" height="20" rx="5" fill="'+Y+'"/><rect x="36" y="36" width="20" height="20" rx="5" fill="'+G+'"/><path d="M18 12v12M12 18h12M41 18h10M13 46h10M41 42l10 10M51 42L41 52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
franz:'<path d="M8 12h40a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H26l-10 10V44H8a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z" fill="'+B+'" transform="translate(4 0)"/><text x="14" y="38" font-family="Arial" font-weight="700" font-size="20" fill="#fff">Fr</text>',
engl:'<path d="M8 12h40a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H26l-10 10V44H8a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z" fill="'+R+'" transform="translate(4 0)"/><text x="12" y="38" font-family="Arial" font-weight="700" font-size="20" fill="#fff">En</text>',
deu:'<rect x="6" y="6" width="52" height="52" rx="12" fill="'+Y+'"/><text x="32" y="46" text-anchor="middle" font-family="Arial" font-weight="700" font-size="36" fill="#fff">A</text>'};
function artSvg(t){var k=t.art&&ART[t.art]?t.art:(ART[t.subject]?t.subject:'mathe');return '<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">'+ART[k]+'</svg>'}
function topicCard(ch,t){
  var L=level(ch.id,[t]),w=Math.max(L.seen?4:0,Math.round(L.pct*100)),id=esc(t.id);
  nav.topen=nav.topen||{};var open=!!nav.topen[t.id];
  var m=/^Unit\s*(\d+(?:\+\d+)?)\s*·\s*(.*)$/.exec(t.title),badge=m?'<span class="tcun"><small>UNIT</small><b'+(m[1].length>2?' style="font-size:1.8rem"':'')+'>'+esc(m[1])+'</b></span>':'<span class="tcart">'+artSvg(t)+'</span>',title=m?m[2]:t.title,lg=(t.subject==='franz'||t.subject==='engl'),usub='';
  if(m&&lg){var vl=t.subject==='franz'?'Vocabulaire':'Vocabulary';title=/vocab/i.test(m[2])?m[2]:vl;usub='Unit '+m[1]}
  return '<article class="card topic tc s-'+esc(t.subject)+(open?' open':'')+'"><button class="tchead tctog" data-act="ttog" data-id="'+id+'" aria-expanded="'+open+'">'+badge+'<div class="tcmain"><h3 class="tt">'+esc(title)+'</h3><p class="sub tcsub">'+(usub?'<span class="vtag">'+usub+'</span> · ':vocTag(t,1))+(t.src?'<span class="src">'+esc(t.src)+'</span>':'<span class="src orig o-'+(t.origin==='lehr'?'l':'k')+'">'+(t.origin==='lehr'?'Lehrmittel':'KI-Inhalt')+'</span>')+'</p></div><span class="tcpct">'+w+'%</span><span class="tcchev" aria-hidden="true">'+(open?'▲':'▼')+'</span></button>'
  +'<div class="bar thin" role="img" aria-label="'+w+' Prozent"><i style="width:'+w+'%"></i></div>'
  +(open?'<div class="tc4"><button class="tb4 m-v" data-act="learn" data-id="'+id+'">'+((t.subject==='franz'||t.subject==='engl')?'Wörterliste':'AI-Theorie')+'</button>'
  +'<button class="tb4 m-u" data-act="practice" data-scope="topic:'+id+'" data-force="1">AI-Lernen</button>'
  +'<button class="tb4 m-p" data-act="exam" data-id="'+id+'">Prüfung</button>'
  +'<button class="tb4 m-x" data-act="xgame" data-id="'+id+'">⚡ Extra XP</button></div>':'')+'</article>';
}
function vocTag(t){var l=t.subject==='franz'?'Vocabulaire':t.subject==='engl'?'Vocabulary':'';if(!l||/vocab/i.test(t.title))return '';return '<span class="vtag">'+l+'</span> · '}
function vSubject(){
  var ch=C.children.filter(function(c){return c.id===nav.child})[0],ts=topicsOf(ch.id,nav.subject),chapters=[],sb=C.subjects.filter(function(x){return x.id===nav.subject})[0];
  ts.forEach(function(t){if(chapters.indexOf(t.chapter)<0)chapters.push(t.chapter)});
  var html='<div class="stack"><div class="row"><span class="sbadge s-'+esc(sb.id)+'">'+sicon(sb,24)+'</span><div><p class="eyebrow">Fach · '+esc(label(ch))+'</p><h1>'+esc(sb.name)+'</h1></div><button class="tsb" data-act="tsearch" aria-label="Thema suchen"><svg viewBox="0 0 24 24" width="22" height="22"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></div>';
  html+='<section class="list tlist">';
  if(!ts.length)html+='<section class="card"><h2>Hier kommen bald Aufgaben</h2><p class="sub" style="margin-top:6px">Sobald die Unterlagen da sind, erscheinen sie hier.</p></section>';
  nav.chopen=nav.chopen||{};
  var many=ts.length>8;
  chapters.forEach(function(chp){
    var group=ts.filter(function(t){return t.chapter===chp});
    if(group.length<2){group.forEach(function(t){html+=topicCard(ch,t)});return}
    var key=nav.subject+'|'+chp,open=key in nav.chopen?nav.chopen[key]:!many,L=level(ch.id,group),w=Math.max(L.seen?4:0,Math.round(L.pct*100));
    html+='<div class="chgrp'+(open?' open':'')+'"><button class="chh" data-act="chtoggle" data-key="'+esc(key)+'" aria-expanded="'+(open?'true':'false')+'"><span class="chn">'+esc(chp)+'</span><span class="chm">'+group.length+' Themen · '+w+'%</span><span class="chc">'+(open?'▾':'▸')+'</span></button>';
    if(open)html+='<div class="chbody">'+group.map(function(t){return topicCard(ch,t)}).join('')+'</div>';
    html+='</div>';
  });
  html+='</section>';
  return html+'</div>';
}


var STG=['Verstanden','Kapiert','Gespeichert','Gecheckt','Sitzt','Alles klar'],STI=['👀','💡','💾','✅','🧠','🎯'];
function stg(i){return STG[i%STG.length]}
function thSplit(text){return String(text).replace(/([.!?])\s+(?=[A-ZÄÖÜ«])/g,'$1\u0001').split('\u0001').filter(Boolean)}
function vTheory(t){
  var n=t.explain.length,i=Math.min(nav.step,n),conf=nav.conf||(nav.conf={}),k;
  var path='<div class="thpath" role="img" aria-label="Schritt '+(i+1)+' von '+(n+1)+'">';
  for(k=0;k<=n;k++){path+=(k?'<b class="thln'+(i>=k?' on':'')+'"></b>':'')+'<i class="thn'+(i>k?' done':i===k?' cur':'')+'">'+(k===n?'🏁':(i>k?'✓':(k+1)))+'</i>'}
  path+='</div>';
  if(n>8)path='<div class="thbar"><div class="bar"><i style="width:'+Math.round(i/n*100)+'%;background:var(--sc)"></i></div><span>Block '+Math.min(i+1,n)+' von '+n+'</span></div>';
  var head='<div class="thtop"><p class="eyebrow">'+((t.subject==='franz'||t.subject==='engl')?'Wörterliste':'AI-Theorie')+' · '+esc(t.title)+'</p>'+path+'</div>';
  if(i>=n){
    return '<div class="stack explain thx s-'+t.subject+'">'+head+'<section class="thcard sum"><div class="thh"><span class="thnum">🏁</span><h1>Geschafft!</h1></div><p class="txt">Jetzt bist du bereit. Mach mit Lernen weiter oder geh zur Prüfung.</p></section>'
      +'<div class="row"><button class="btn" data-act="prev">Zurück</button><button class="btn pri big" data-act="practice" data-scope="topic:'+esc(t.id)+'" data-force="1">Lernen</button><button class="btn big" data-act="exam" data-id="'+esc(t.id)+'">Prüfung</button></div></div>';
  }
  var st=t.explain[i],lines=thSplit(st.text),body=lines.map(function(l){var mk=/^(Merke|Wichtig|Tipp)/.test(l);return '<p class="thl'+(mk?' thmk':'')+'"><span class="thd">'+(mk?'💡':'')+'</span><span>'+rt(l)+'</span></p>'}).join('');
  return '<div class="stack explain thx s-'+t.subject+'">'+head+'<section class="thcard"><div class="thh"><span class="thnum">'+(i+1)+'</span><h1>'+esc(st.h)+'</h1></div>'+((t.subject==='deu'||t.subject==='mathe')?(st.var?'<span class="dvar">'+esc(st.var)+'</span>':'')+'<p class="dtx">'+bd(st.text)+'</p>'+visuals(st.visuals):visuals(st.visuals)+'<div class="thtxt">'+body+'</div>')+'</section>'
    +'<div class="row">'+(i>0?'<button class="btn" data-act="prev">Zurück</button>':'')+'<button class="btn pri big thok" data-act="thnext">'+STI[i%6]+' '+stg(i)+'</button></div></div>';
}
function quizFor(step){
  var v=(step.visuals||[]).filter(function(x){return x.type==='flip'})[0];if(!v||!step.quiz)return [];
  var it=v.items,n=it.length,out=[],idx=[0,Math.floor(n/3),Math.floor(2*n/3)].filter(function(x,i,a){return a.indexOf(x)===i});
  idx.forEach(function(i,qi){
    var opts=[it[i][1]],j=1;
    while(opts.length<4&&j<n){var o=it[(i+j*2+qi)%n][1];if(opts.indexOf(o)<0)opts.push(o);j++}
    j=1;while(opts.length<4&&j<n){var o2=it[(i+j)%n][1];if(opts.indexOf(o2)<0)opts.push(o2);j++}
    var order=opts.map(function(o,k){return {t:o,ok:k===0}});
    order=order.slice(qi%order.length).concat(order.slice(0,qi%order.length));
    out.push({q:'Was heisst «'+it[i][0]+'»?',opts:order});
  });
  return out;
}
function tryHTML(st){
  var T=st.try,i=nav.step;nav.topt=nav.topt||{};nav.dr=nav.dr||{};
  if(T.opts){var ch=nav.topt[i]||{};return '<div class="try"><p class="q">'+rt(T.q)+'</p><div class="opts">'+T.opts.map(function(o,oi){var cl=ch.ok&&o===T.a[0]?' good':(ch.bad&&ch.bad.indexOf(o)>=0?' bad':'');return '<button class="o'+cl+'" data-act="topt" data-i="'+oi+'"'+(ch.ok||cl?' disabled':'')+'>'+rt(o)+'</button>'}).join('')+'</div><p class="fb '+(ch.ok?'ok':ch.bad?'no':'')+'" role="status">'+(ch.ok?'Richtig!':ch.bad?(ch.bad.length>=2?'Noch nicht. Tipp: '+esc(T.hint||''):'Noch nicht ganz. Probier eine andere.'):'')+'</p></div>'}
  if(T.drag){var pl=nav.dr[i]||(nav.dr[i]=T.drag.slots.map(function(){return null})),used=pl.filter(Boolean),ok=nav.dr[i+'ok'];
    return '<div class="try"><p class="q">'+esc(T.q)+'</p><div class="dslots">'+T.drag.slots.map(function(s,si){return '<div class="dslot'+(pl[si]?' full':'')+'" data-slot="'+si+'" data-act="dslot" data-si="'+si+'"><small>'+esc(s)+'</small><b>'+(pl[si]?esc(pl[si]):'&nbsp;')+'</b></div>'}).join('')+'</div><div class="dchips">'+T.drag.chips.filter(function(c){return used.indexOf(c)<0}).map(function(c){return '<button class="dchip'+(nav.dsel===c?' sel':'')+'" data-chip="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'</div><div class="row"><button class="btn pri" data-act="dcheck">Prüfen</button><button class="btn" data-act="dreset">Neu</button></div><p class="fb '+(ok===true?'ok':ok===false?'no':'')+'" role="status">'+(ok===true?'Richtig!':ok===false?'Noch nicht ganz. '+esc(T.hint||''):'Ziehe die Wörter in die Felder oder tippe Wort und Feld an.')+'</p></div>'}
  return '<div class="try"><p class="q">Probier es kurz: '+rt(T.q)+'</p><div class="row"><input class="inp" id="tryin" placeholder="'+ph(T.a[0])+'" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Deine Antwort"><button class="btn pri" data-act="try">Prüfen</button>'+(T.hint?'<button class="btn" data-act="tryhint">Tipp</button>':'')+'</div><p class="fb" id="tryfb" role="status"></p></div>'}
function vWordList(t){
  var L=nav.lst||(nav.lst={dir:'fw',open:{},mark:{}}),cs=t.cards.filter(function(c){return c.fw&&c.de}),nd=Object.keys(L.mark).filter(function(k){return L.mark[k]==='ok'}).length;
  var h='<div class="wl"><div class="row wl-top"><button class="btn sm seg'+(L.dir!=='de'?' on':'')+'" data-act="ldir" data-d="fw">Fremdsprache → Deutsch</button><button class="btn sm seg'+(L.dir==='de'?' on':'')+'" data-act="ldir" data-d="de">Deutsch → Fremdsprache</button></div><div class="row between"><span class="sub">'+nd+' von '+cs.length+' gewusst</span><button class="btn sm" data-act="lreset">Alle wieder zudecken</button></div><div class="wl-tab">';
  cs.forEach(function(c){
    var q=L.dir==='de'?c.de.join(' / '):c.fw,a=L.dir==='de'?c.fw:c.de.join(' / '),o=L.open[c.id],m=L.mark[c.id];
    h+='<div class="wl-row'+(m?' '+m:'')+'"><div class="wl-q">'+esc(q)+'</div><button class="wl-a'+(o?' open':'')+'" data-act="lopen" data-id="'+esc(c.id)+'" aria-label="Aufdecken">'+(o?esc(a):'Tippen zum Aufdecken')+'</button>'+(o?'<div class="wl-m"><button class="mk ok'+(m==='ok'?' on':'')+'" data-act="lmark" data-id="'+esc(c.id)+'" data-v="ok" aria-label="Gewusst">✓</button><button class="mk no'+(m==='no'?' on':'')+'" data-act="lmark" data-id="'+esc(c.id)+'" data-v="no" aria-label="Nicht gewusst">✗</button></div>':'')+'</div>';
  });
  return h+'</div></div>'}
function vLearn(){
  var t0=topicById(nav.topicId);if(t0.subject==='mathe'||t0.subject==='deu')return vTheory(t0);
  var t=topicById(nav.topicId),st=t.explain[nav.step],last=nav.step===t.explain.length-1,first=nav.step===0;
  var dots='<div class="dotsrow" aria-label="Schritt '+(nav.step+1)+' von '+t.explain.length+'">'+t.explain.map(function(_,i){return '<i class="'+(i<=nav.step?'on':'')+'"></i>'}).join('')+'</div>';
  var say=first?'Los geht\'s. Lies in Ruhe, dann probier es aus.':last?'Letzter Schritt. Danach darfst du üben.':pick(['Schau dir die Bilder genau an, sie verraten viel.','Kleine Schritte, grosse Wirkung.','Das merkst du dir schneller, als du denkst.'],nav.step);
  var html='<div class="stack explain"><div><p class="eyebrow">'+esc(t.title)+' · Schritt '+(nav.step+1)+' von '+t.explain.length+'</p><h1>'+esc(st.h)+'</h1></div>'+dots+coach(esc(say),first?1:last?3:2)+(st.list?'':'<p class="txt">'+rt(st.text)+'</p>')+visuals(st.visuals);
  if(st.list)html+=vWordList(t);
  var qz=quizFor(st);
  if(qz.length){
    nav.qz=nav.qz||{};
    html+='<div class="try"><p class="q">Jetzt du: Tippe die richtige Antwort.</p>'+qz.map(function(q,qi){
      var key=nav.step+'_'+qi,ch=nav.qz[key];
      return '<div class="qzq"><p><b>'+esc(q.q)+'</b></p><div class="opts">'+q.opts.map(function(o,oi){
        var cl=ch==null?'':(o.ok?' good':(oi===ch?' bad':''));
        return '<button class="o'+cl+'" data-act="qz" data-q="'+qi+'" data-i="'+oi+'"'+(ch!=null?' disabled':'')+'>'+esc(o.t)+'</button>'}).join('')+'</div></div>'}).join('')+'</div>';
  }
  if(st.try)html+=tryHTML(st);
  html+='<div class="row">'+(nav.step>0?'<button class="btn" data-act="prev">Zurück</button>':'')+(last?'<button class="btn pri big" data-act="practice" data-scope="topic:'+esc(t.id)+'" data-force="1">Jetzt üben</button>':'<button class="btn pri big" data-act="next">Weiter</button>')+'</div></div>';
  return html;
}
function ph(a){return /^\d+\/\d+$/.test(a)?'Bruch, zum Beispiel 3/4':''}
function scopeStr(s){return s.type==='child'?'child':s.type+':'+s.id}
function parseScope(str){if(str==='child')return {type:'child'};var p=str.split(':');return {type:p[0],id:p.slice(1).join(':')}}

/* ---------- Eltern-Übersicht ---------- */
function vParent(){
  var html='<div class="stack"><h1>Eltern-Übersicht</h1><p class="sub">Fortschritt, XP und Übungszeit pro Kind. Die Zeit zählt nur, solange aktiv gelernt wird.</p>';
  C.children.filter(function(c){return topicsOf(c.id).length}).forEach(function(c){
    var p=prog(c.id),pl=plinfo(c.id),ts=topicsOf(c.id),days=[],i,max=10,sec7=0,n7=0,ok7=0,nA=0,okA=0,k;
    for(i=6;i>=0;i--){var d=p.days[dkey(i)]||{sec:0,n:0,ok:0,xp:0};days.push({k:dkey(i),min:Math.round(d.sec/60),xp:d.xp||0});sec7+=d.sec||0;n7+=d.n||0;ok7+=d.ok||0;max=Math.max(max,Math.round((d.sec||0)/60))}
    for(k in p.days){nA+=p.days[k].n||0;okA+=p.days[k].ok||0}
    html+='<section class="card parent"><div class="row">'+av(level(c.id,ts).lvl,56,skinOf(c.id))+'<div class="grow"><h2>'+esc(label(c))+'</h2><p class="sub">Rang '+pl.L+' · '+esc(pl.rank)+' · '+pl.xp+' XP · Serie '+streak(c.id)+' Tage</p></div></div>';
    html+='<div class="days" role="img" aria-label="Übungsminuten der letzten 7 Tage">'+days.map(function(d){
      var wd=new Date(d.k+'T12:00:00').toLocaleDateString('de-CH',{weekday:'short'});
      return '<div class="dcol"><span class="dm">'+d.min+'</span><i style="height:'+Math.max(4,Math.round(60*d.min/max))+'px"></i><span class="dl">'+esc(wd)+'</span></div>'}).join('')+'</div>';
    html+='<p>Letzte 7 Tage: <b>'+Math.round(sec7/60)+' Min</b> · '+n7+' Antworten · '+(n7?Math.round(100*ok7/n7):0)+' % richtig<br><span class="sub">Gesamt: '+nA+' Antworten · '+(nA?Math.round(100*okA/nA):0)+' % richtig</span></p>';
    var subs=C.subjects.filter(function(sb){return topicsOf(c.id,sb.id).length});
    if(subs.length)html+='<div class="list">'+subs.map(function(sb){var t2=topicsOf(c.id,sb.id),s2=stats(c.id,t2);return '<div class="prow"><span>'+esc(sb.name)+'</span>'+lbar(level(c.id,t2),true)+'<span class="sub">'+s2.sits+'/'+s2.total+' sitzen</span></div>'}).join('')+'</div>';
    var ex=p.exams.slice().sort(function(a,b){return b.t-a.t}).slice(0,3);
    if(ex.length)html+='<p class="sub">Letzte Prüfungen: '+ex.map(function(e){var tt=topicById(e.topic);return esc(tt?tt.title:(e.topic==='kl8-deu-grammatik1'?'Grammatik (früher)':e.topic))+' (Note '+fmt(e.note)+')'}).join(' · ')+'</p>';
    html+='<button class="btn sm" data-act="prog" data-id="'+c.id+'" style="margin-top:10px">Fortschritt im Detail ›</button></section>';
  });
  return html+'<p class="sub">Jedes Kind hat seinen eigenen Fortschritt pro Klasse. Damit er auf allen Geräten gespeichert wird, braucht das Kind Zugriff mit Bearbeitungsrechten auf den Link.</p></div>';
}
