
/* ---------- Üben ---------- */
function qHtml(q){
  if(q.indexOf('\n')<0)return '<p class="fq">'+rt(q)+'</p>';
  var ls=q.split('\n'),sent=ls[0],rest=ls.slice(1).join(' '),m=/«([^»]+)»/.exec(rest),h='',i=m?sent.toLowerCase().indexOf(m[1].toLowerCase()):-1;
  h=i>=0?esc(sent.slice(0,i))+'<mark>'+esc(sent.slice(i,i+m[1].length))+'</mark>'+esc(sent.slice(i+m[1].length)):esc(sent);
  return '<div class="dsent"><p>'+h+'</p></div><p class="dqq">'+esc(rest).replace(/«([^»]+)»/g,'<b class="dtg">$1</b>')+'</p>';
}
function qParts(q){
  if(q.say)return {main:String(q.q),ctx:'',inst:''};
  var t=String(q.q).replace(/\s+/g,' ').trim(),ins=[],m;
  [[/\s*\(Schreibe nur die Zahl\.\)/,'Schreibe nur die Zahl.'],[/\s*\(so weit wie möglich kürzen\)/,'Kürze so weit wie möglich.'],[/\s*Runde auf eine Stelle nach dem Komma\./,'Runde auf eine Stelle nach dem Komma.'],[/\s*\(in (cm|m|km|g|kg|min)\)\.?/,null],[/\s*Schreibe den ganzen Satz\./,'Schreibe den ganzen Satz.']].forEach(function(r){var x=r[0].exec(t);if(x){t=t.replace(r[0],'');ins.push(r[1]||('Antwort in '+x[1]+', nur die Zahl.'))}});
  var main=t,ctx='',mm=/^(.*?[?:])\s+(\S.*)$/.exec(t);
  if(mm&&/^(Welch|Bestimme|Berechne|Ins |Setze|Nenne|Schreibe|Bilde|Wandle|Kürze|Was für)/.test(mm[1])){main=mm[1];ctx=mm[2]}
  var tg=/\s*\(«([^»]+)»\)\s*$/.exec(ctx);
  if(tg){ctx=ctx.replace(tg[0],'');main=main.replace(/^(Welcher Fall|Welche Zeitform|Welches Satzglied)\?$/,function(a,b){return b+' ist «'+tg[1]+'»?'})}
  if(q.type==='mc'){ins.unshift('Kreuze eine Antwort an.')}
  else if(!ins.some(function(x){return /Zahl|Satz|Bruch/.test(x)})){
    var a=String((q.answer||[''])[0]),words=a.split(/\s+/).length;
    if(/^[\d\s.,]+(\s?[a-z]+)?$/i.test(a))ins.push(/\./.test(a+'')||/,/.test(a)?'Schreibe nur die Zahl.':'Schreibe nur die Zahl (ganze Zahl).');
    else if(/\d\s?\/\s?\d/.test(a))ins.push('Schreibe den Bruch, zum Beispiel 3/5.');
    else ins.push(words>1?'Schreibe die Antwort in Worten.':'Schreibe die Antwort in einem Wort.')
  }
  return {main:main,ctx:ctx,inst:ins.join(' ')};
}
function sayBtn(t){return t?'<button class="say" data-act="say" data-t="'+esc(t)+'" aria-label="Vorlesen">🔊</button>':''}
function examInfo(N){
  var cols=['#EA4335','#F29900','#FBBC04','#8BC34A','#34A853','#188038'],i,seg='',lab='',ok=function(g){return Math.ceil((g-1)/5*N-1e-9)};
  for(i=0;i<6;i++){seg+='<div class="exc"><div class="exn" style="background:'+cols[i]+'"><b>'+(i+1)+'</b></div><span>'+(i===0?'ab 0':i===5?'alle':'ab '+i*20+' %')+'</span></div>'}
  return '<section class="card examinfo"><h2>Jetzt zählt es ernst!</h2><div class="exstat"><div><b>'+N+'</b><span>Fragen</span></div><div><b>1–6</b><span>Note</span></div><div><b>'+ok(4)+'</b><span>richtig für Note 4</span></div></div><p class="sub">Je mehr richtig, desto besser die Note:</p><div class="exbar">'+seg+'</div><div class="exbon"><span>⭐ Note 5 oder besser: +30 XP</span><span>🏆 Note 5.75 oder besser: +20 XP</span></div></section>';
}
function examArt(){
  var l='',i;for(i=0;i<6;i++)l+='<rect x="74" y="'+(66+i*17)+'" width="'+(i%3===2?70:104)+'" height="5" rx="2.5" fill="#CBD2DE"/><rect x="58" y="'+(63+i*17)+'" width="9" height="9" rx="2" fill="#fff" stroke="#8A94A6" stroke-width="1.5"/>'+(i<4?'<path d="M60 '+(68+i*17)+'l3 3.5 5-7" fill="none" stroke="#34A853" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>':'');
  var ruler='';for(i=0;i<=12;i++)ruler+='<line x1="'+(206+i*9)+'" y1="168" x2="'+(206+i*9)+'" y2="'+(i%5===0?150:158)+'" stroke="#8A6D00" stroke-width="1.4"/>';
  return '<svg class="examart" viewBox="0 0 340 200" role="img" aria-label="Prüfungsblatt mit Bleistift und Lineal"><defs><linearGradient id="exs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#EEF2FA"/></linearGradient><filter id="exf" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".25"/></filter></defs>'
  +'<ellipse cx="170" cy="188" rx="140" ry="8" fill="#000" opacity=".08"/>'
  +'<g transform="rotate(-3 120 100)" filter="url(#exf)"><rect x="34" y="14" width="170" height="168" rx="8" fill="url(#exs)" stroke="#B7C0D0" stroke-width="2"/><rect x="34" y="14" width="170" height="26" rx="8" fill="#4285F4"/><rect x="34" y="30" width="170" height="10" fill="#4285F4"/><text x="48" y="33" font-size="14" font-weight="900" fill="#fff" font-family="Arial,sans-serif">Prüfung</text><text x="170" y="33" font-size="11" font-weight="800" fill="#DCE8FD" font-family="Arial,sans-serif">Name ____</text>'+l+'<g transform="translate(150 150)"><circle r="21" fill="#FFF3C4" stroke="#F29900" stroke-width="3"/><text y="7" text-anchor="middle" font-size="22" font-weight="900" fill="#B06000" font-family="Arial,sans-serif">6</text></g></g>'
  +'<g transform="rotate(-16 270 90)"><rect x="236" y="30" width="16" height="120" rx="2" fill="#FBBC04" stroke="#C88C00" stroke-width="2"/><rect x="236" y="30" width="16" height="12" rx="2" fill="#EA8B8B" stroke="#C06060" stroke-width="2"/><rect x="236" y="42" width="16" height="6" fill="#C9CED6"/><path d="M236 150 l8 22 l8 -22z" fill="#F2D3A1" stroke="#C8A36A" stroke-width="1.5"/><path d="M241 164 l3 8 l3 -8z" fill="#3C4043"/></g>'
  +'<g transform="rotate(-4 260 160)"><rect x="200" y="148" width="124" height="24" rx="4" fill="#FDE18A" stroke="#C88C00" stroke-width="2"/>'+ruler+'</g>'
  +'<g transform="translate(300 40)"><path d="M0 -18l5.4 11 12 1.7-8.7 8.5 2 12L0 8.2-10.7 15.2l2-12L-17.4 -5.3l12-1.7z" fill="#FBBC04" stroke="#E37400" stroke-width="2"/></g></svg>';
}
function qBlock(q){
  var p=qParts(q);
  return '<div class="mqx"><span class="qm">'+rt(p.main)+sayBtn(q.say)+'</span>'+(p.ctx?'<span class="qc">'+rt(p.ctx)+'</span>':'')+'<span class="qi">'+esc(p.inst)+'</span></div>';
}
function curCard(n){
  var k=n.queue[n.idx],x=cardIdx[k];
  if(!n.cur){
    var g=x.c.gen?genCard(x.c.gen):null;
    n.cur=g?{id:x.c.id,q:g.q,a:g.a,steps:g.steps,hints:g.hints,solvis:g.solvis,gen:x.c.gen,th:x.c.th}:(x.t&&x.t.subject==='mathe'?varyItem(x.c,false):x.c);
    n.qs=n.qs||{};n.qs[k]=n.cur;
  }
  return n.cur;
}
function stageOf(n,k){
  if(n.ls[k]==null){var b=(prog(n.child).cards[k]||{b:0}).b,s=b<1?0:b<2?1:b<3?2:3;n.start[k]=s;n.fin[k]=Math.max(2,s);n.ls[k]=s}
  return n.ls[k];
}
function groupKey(c){return c.grp||(wc(c.fw)>3?'sent':'misc')}
function makeOpts(n,k,c){
  if(n.opts)return n.opts;
  var x=cardIdx[k],g=groupKey(c),seen={},out=[];seen[c.de[0]]=1;
  function add(list){shuffle(list).forEach(function(o){if(out.length<5&&!seen[o.de[0]]){seen[o.de[0]]=1;out.push(o)}})}
  var inQ=n.queue.map(function(q){return cardIdx[q].c}).filter(function(o){return isV(o)&&o.id!==c.id});
  var inT=x.t.cards.filter(function(o){return isV(o)&&o.id!==c.id});
  add(inQ.filter(function(o){return groupKey(o)===g}));
  add(inT.filter(function(o){return groupKey(o)===g}));
  add(inQ);add(inT);
  n.opts=shuffle(out.map(function(o){return {t:o.de[0],ok:false}}).concat([{t:c.de[0],ok:true}]));n.gone=[];
  return n.opts;
}
function qa(c){return isV(c)?[c.fw,c.de.join(' / ')]:[c.q,c.a]}
function theoryOf(k,c){
  var x=cardIdx[k],key=isV(c)?c.grp:(x.c.th||c.th);
  return key&&x.t.theory&&x.t.theory[key]?x.t.theory[key]:null;
}
function hintList(n,k,c,stg){
  var out=[],th=theoryOf(k,c),i;
  if(th&&!isV(c))out.push({k:'theory',th:th});
  if(isV(c)){
    if(stg===0){out.push({k:'elim'});out.push({k:'elim'})}
    else if(stg===2){for(i=0;i<3;i++)out.push({k:'tile'})}
    else textHints(stg===3?c.fw:c.de[0]).forEach(function(t){out.push({k:'text',t:t})});
    return out;
  }
  var base=c.hints&&c.hints.length?c.hints:(checkable(c)||wc(derive(c.a))>4?textHints(derive(c.ans?c.ans[0]:c.a)):[]);
  base.forEach(function(t){out.push({k:'text',t:t})});
  return out;
}
function hintBoxes(n,hs){
  var h='',i,tcount=0;
  for(i=0;i<n.hintN&&i<hs.length;i++){
    var it=hs[i];
    if(it.k==='theory')h+='<div class="hint theory"><b>Theorie · '+esc(it.th.h)+'</b>'+rt(it.th.text)+(it.th.lines?visuals([{type:'lines',items:it.th.lines}]):'')+'</div>';
    else if(it.k==='elim'){tcount++}
    else{tcount++;h+='<div class="hint"><b>'+(it.k==='elim'?'Joker '+tcount:(it.k==='tile'?'Joker '+tcount:'Tipp '+tcount))+'</b>'+(it.k==='elim'?'Joker: '+(hs.slice(0,i).filter(function(z){return z.k==='elim'}).length?'Noch mehr':'Drei')+' falsche Antworten sind weg.':it.k==='tile'?'Ein Baustein wurde für dich gesetzt.':rt(it.t))+'</div>'}
  }
  return h;
}
function dispU(u){return u===' '?'␣':esc(u)}
function pzInit(n,c){
  if(n.pz)return n.pz;
  var u=wc(c.fw)>3?c.fw.split(' '):c.fw.split(''),t=shuffle(u),tries=0;
  while(u.length>1&&t.join('|')===u.join('|')&&tries++<10)t=shuffle(u);
  n.pz={u:u,tiles:t,sel:[]};return n.pz;
}
function pzBuilt(n,c){var p=n.pz,arr=p.sel.map(function(i){return p.tiles[i]});return wc(c.fw)>3?arr.join(' '):arr.join('')}
function spkBtn(text,lang){return '<button class="btn sm" data-act="speak" data-t="'+esc(text)+'" data-lang="'+lang+'">&#128266; Anhören</button>'}

function vVocab(n,k,c,stg){
  var x=cardIdx[k],sn=subjName(x.t.subject),lang=LANG[x.t.subject]||'en-GB',hs=hintList(n,k,c,stg),html='';
  var names=['Wählen','→ Deutsch','Bauen','→ '+sn];
  html+='<div class="stages">'+names.map(function(s,i){return '<span class="'+(i===stg?'on':i<stg?'done':'')+'">'+esc(s)+'</span>'}).join('')+'</div>';
  var prompt=stg<2?'Was heisst das auf Deutsch?':stg===2?'Baue es auf '+sn+' zusammen':'Schreibe es auf '+sn;
  html+='<section class="card flash"><p class="lab2">'+prompt+'</p>'+((stg===0||n.revealed)&&c.emo?'<div class="big-emo" aria-hidden="true">'+c.emo+'</div>':'')+'<p class="fq">'+esc(stg<2?c.fw:c.de.join(' / '))+'</p>'+(stg<2?spkBtn(c.fw,lang):'')+'</section>';
  var right=stg>=2?c.fw:c.de.join(' / ');
  if(!n.revealed){
    html+='<div class="tools"><button class="btn sm joker" data-act="hint"'+(n.hintN>=hs.length?' disabled':'')+'>Joker ziehen'+(hs.length?(n.hintN<hs.length?' ('+(n.hintN+1)+'/'+hs.length+')':''):'')+'</button></div>'+hintBoxes(n,hs);
    if(stg===0){
      var o=makeOpts(n,k,c);
      html+='<div class="opts mill">'+o.map(function(op,i){return n.gone.indexOf(i)>=0?'<span class="o mo gone" aria-hidden="true"></span>':'<button class="o mo" data-act="pick" data-i="'+i+'"><span class="ml">'+String.fromCharCode(65+i)+'</span><span class="mt">'+esc(op.t)+'</span></button>'}).join('')+'</div>';
    }else if(stg===2){
      var pz=pzInit(n,c),full=pz.sel.length===pz.tiles.length;
      html+='<div class="slots" aria-label="Dein Wort">'+(pz.sel.length?pz.sel.map(function(i){return '<span class="slot">'+dispU(pz.tiles[i])+'</span>'}).join(''):'<span class="sub">Tippe die Bausteine in der richtigen Reihenfolge.</span>')+'</div>'
        +'<div class="tiles">'+pz.tiles.map(function(u,i){return '<button class="tile" data-act="tile" data-i="'+i+'"'+(pz.sel.indexOf(i)>=0?' disabled':'')+'>'+dispU(u)+'</button>'}).join('')+'</div>'
        +'<div class="row"><button class="btn sm" data-act="untile">Zurück</button><button class="btn sm" data-act="pzclear">Leeren</button><button class="btn pri" data-act="pzcheck"'+(full?'':' disabled')+'>Prüfen</button></div>';
    }else{
      html+='<div class="row"><input class="inp" id="ans" value="'+esc(n.typed||'')+'" placeholder="'+(stg===3?'Auf '+esc(sn)+' schreiben':'Auf Deutsch schreiben')+'" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Deine Antwort"><button class="btn pri" data-act="check">Prüfen</button></div>'+(n.err?'<p class="fb no">'+esc(n.err)+'</p>':'');
    }
    return html+'<button class="btn ghost" data-act="reveal">Weiss ich nicht</button>';
  }
  if(stg===0){
    var o2=makeOpts(n,k,c);
    html+='<div class="opts mill">'+o2.map(function(op,i){if(n.gone.indexOf(i)>=0)return '<span class="o mo gone" aria-hidden="true"></span>';var cl=op.ok?' good':(i===n.chosen?' bad':'');return '<button class="o mo'+cl+'" disabled><span class="ml">'+String.fromCharCode(65+i)+'</span><span class="mt">'+esc(op.t)+'</span></button>'}).join('')+'</div>';
  }
  var vd=n.verdict;
  if(vd==='ok')html+='<div class="verdict ok">Richtig!'+(n.accentNote?' Achte auf die Schreibweise: '+esc(n.accentNote):'')+'</div>';
  else if(vd==='near')html+='<div class="verdict near">Fast! Ein kleiner Tippfehler. Richtig ist: '+esc(right)+'</div>';
  else html+='<div class="verdict no">'+((stg===1||stg===3)&&n.typed?'Nicht ganz ('+esc(n.typed)+'). ':'Nicht ganz. ')+'Richtig ist: '+esc(right)+'</div>';
  html+='<p class="fa">'+esc(c.fw)+' = '+esc(c.de.join(' / '))+'</p><div class="tools">'+spkBtn(c.fw,lang)+'</div><button class="btn pri big" data-act="next2">Weiter</button>';
  return html;
}

function vPractice(){
  var n=nav,q=n.queue;
  if(!q.length)return '<div class="stack"><h1>Gerade nichts dran</h1><p class="sub">Hier gibt es noch keine Aufgaben zum Üben.</p><div><button class="btn pri big" data-act="back">Zurück</button></div></div>';
  if(n.idx>=q.length){
    var keys=Object.keys(n.res),g=keys.filter(function(k){return n.res[k]==='good'}).length,work=keys.filter(function(k){return n.res[k]!=='good'});
    var topics=scopeTopics(n.child,n.scope),L=level(n.child,topics),fr=keys.length?g/keys.length:0,pl=plinfo(n.child);
    var html='<div class="stack"><div class="row">'+av(fr>.8?4:fr>.5?3:2,92)+'<div><p class="eyebrow">Runde fertig</p><h1>'+g+' von '+keys.length+' <mark>sitzen</mark></h1></div></div>'
      +'<section class="gp"><div class="gp-top"><div class="gp-m"><span class="gp-big">+'+n.xp+' XP</span><span class="gp-sub">Rang '+pl.L+' · '+esc(pl.rank)+'</span></div>'+shield(pl.L,56)+'</div>'+gbar(pl)+(n.bonus.length?'<ul class="gp-bonus">'+n.bonus.map(function(b){return '<li>⭐ '+esc(b)+'</li>'}).join('')+'</ul>':'')+'</section>'
      +'<section class="card">'+lbar(L,false,skinOf(n.child))+'</section>';
    if(work.length)html+='<section class="card"><h2>Das kommt bald wieder</h2><ul style="margin:8px 0 0;padding-left:20px">'+work.map(function(k){var c=(n.qs&&n.qs[k])||cardIdx[k].c,p=qa(c);return '<li>'+rt(p[0])+' <span class="sub">→ '+rt(p[1])+'</span></li>'}).join('')+'</ul></section>';
    html+='<section class="card joke"><p class="eyebrow">Zum Abschluss</p><p>'+esc(pick(JOKES,keys.length))+'</p></section>';
    html+='<div class="row"><button class="btn pri big" data-act="practice" data-scope="'+esc(scopeStr(n.scope))+'" data-force="1">Noch eine Runde</button><button class="btn big" data-act="back">Fertig</button></div></div>';
    return html;
  }
  var k=q[n.idx],x=cardIdx[k],c=curCard(n);
  var head='<div class="stack"><div class="row between"><p class="eyebrow">Aufgabe '+(n.idx+1)+' von '+q.length+'</p><span class="chips">'+(n.pw.length?n.pw.map(function(id){var w=POW.filter(function(x){return x.id===id})[0];return '<span class="chp pw">'+w.ic+' '+esc(w.n)+'</span>'}).join(''):'')+(n.combo>=2?'<span class="chp fire">🔥 Combo x'+n.combo+'</span>':'')+'</span></div><div class="bar" role="img" aria-label="Fortschritt"><i style="width:'+Math.round(100*n.idx/q.length)+'%"></i></div>'+(n.msg&&!n.revealed?'<p class="cheer">'+esc(n.msg)+'</p>':'')+(n.pw.indexOf('skip')>=0&&!n.skipUsed&&!n.revealed?'<button class="btn sm" data-act="skip">⏩ Joker: Aufgabe überspringen</button>':'');
  if(isV(c))return head+vVocab(n,k,c,stageOf(n,k))+'</div>';
  var pkey='p:'+k,pd=padHTML(pkey,c.q),hs=hintList(n,k,c,0),chk=!c.opts&&checkable(c);
  if(c.opts&&!n.opts)n.opts=shuffle(c.opts.map(function(t){return {t:t,ok:t===c.a}}));
  var h2=head+'<section class="card flash">'+qHtml(c.q)+sayBtn(c.say)+visuals(c.visuals)+'</section>';
  if(!n.revealed){
    h2+='<div class="tools">'+(hs.length?'<button class="btn sm" data-act="hint"'+(n.hintN>=hs.length?' disabled':'')+'>Tipp'+(n.hintN<hs.length?' ('+(n.hintN+1)+'/'+hs.length+')':'')+'</button>':'')+pd.btn+'</div>'+hintBoxes(n,hs);
    h2+=pd.box;
    if(c.opts)h2+='<div class="opts">'+n.opts.map(function(op,i){return '<button class="o" data-act="mpick" data-i="'+i+'">'+rt(op.t)+'</button>'}).join('')+'</div>';
    if(chk)h2+='<div class="stack" style="padding:0;gap:8px"><label class="lab2" for="ans">Dein Ergebnis</label><div class="row"><input class="inp" id="ans" value="'+esc(n.typed||'')+'" placeholder="'+ph(cardAns(c)[0])+'" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn pri" data-act="check">Prüfen</button></div>'+(n.err?'<p class="fb no">'+esc(n.err)+'</p>':'')+'</div>';
    h2+=(c.opts?'':'<button class="btn'+(chk?' ghost':' pri big')+'" data-act="reveal">'+(chk?'Ich komme nicht drauf, Lösung zeigen':'Antwort zeigen')+'</button>');
  }else{
    var vd=n.verdict;
    if(vd==='ok')h2+='<div class="verdict ok">Richtig!'+(n.accentNote?' Achte noch auf die Schreibweise: '+esc(n.accentNote):'')+'</div>';
    else if(vd==='no'){var mine=n.typed||(n.opts&&n.chosen!=null&&n.opts[n.chosen]?n.opts[n.chosen].t:'');h2+='<div class="verdict no">Nicht ganz. Deine Antwort: '+(mine?rt(mine):'–')+'</div><div class="verdict ok" style="margin-top:6px">Richtig ist: '+rt(c.a)+'</div>'}
    else if(vd==='near')h2+='<div class="verdict near">Dein Satz weicht von der Lösung ab. Vergleiche selbst, ob er trotzdem stimmt.</div>';
    h2+=(vd==='no'?'':'<p class="fa" style="align-self:flex-start">'+rt(c.a)+'</p>')+(c.steps?'<div class="steps"><p class="lab2">Rechenweg in Schritten</p>'+vLines({items:c.steps,num:true})+'</div>':'')+(c.solvis?visuals(c.solvis):'');
    if(pd.box)h2+=pd.box;else h2+='<div class="tools">'+pd.btn+'</div>';
    h2+='<button class="btn pri big" data-act="rate" data-r="'+(vd==='ok'?(n.hintN>0?'hard':'good'):'again')+'">Weiter</button>';
  }
  return h2+'</div>';
}

/* ---------- Spiel: Paare finden ---------- */
function vGame(){
  var n=nav,t=topicById(n.topicId);
  if(n.finished){
    return '<div class="stack"><div class="row">'+av(n.miss===0?4:3,92)+'<div><p class="eyebrow">Paare gefunden</p><h1>+'+n.xp+' XP</h1></div></div><section class="card"><p>'+n.items.length+' Paare in '+n.secs+' Sekunden, '+n.miss+(n.miss===1?' Fehler':' Fehler')+'.'+(n.miss===0?' Perfekt, ohne Fehler!':'')+'</p></section><div class="row"><button class="btn pri big" data-act="pairs" data-id="'+esc(t.id)+'">Nochmal</button><button class="btn big" data-act="back">Fertig</button></div></div>';
  }
  var byId={};n.items.forEach(function(c){byId[c.id]=c});
  return '<div class="stack"><div><p class="eyebrow">Spiel · '+esc(t.title)+'</p><h1>Paare finden</h1></div>'+coach('Tippe links ein Wort und rechts die passende Übersetzung.',2)
    +'<div class="pairgrid"><div class="pcol">'+n.items.map(function(c){return '<button class="pbtn'+(n.done[c.id]?' done':'')+(n.sel===c.id?' sel':'')+'" data-act="pl" data-id="'+c.id+'"'+(n.done[c.id]?' disabled':'')+'>'+(c.emo?c.emo+' ':'')+esc(c.fw)+'</button>'}).join('')+'</div>'
    +'<div class="pcol">'+n.right.map(function(id){return '<button class="pbtn'+(n.done[id]?' done':'')+(n.bad===id?' bad':'')+'" data-act="pr" data-id="'+id+'"'+(n.done[id]?' disabled':'')+'>'+esc(byId[id].de[0])+'</button>'}).join('')+'</div></div>'
    +'<p class="sub">Fehler: '+n.miss+'</p></div>';
}

/* ---------- Prüfung ---------- */
function mmss(sec){var s=Math.abs(sec);return (sec<0?'−':'')+Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function examQs(n,t){if(n.qlist)return n.qlist;return mkQs(n,t)}
function isLangT(t){return t.subject==='franz'||t.subject==='engl'}
function mkQs(n,t){if(!isLangT(t)){var qq=t.exam.questions;qq=shuffle(t.subject==='mathe'?qq.map(function(q){return varyItem(q,true)}):qq.slice());return qq.slice(0,Math.max(Math.min(qq.length,10),Math.round(qq.length*.75)))}
  var cs=t.cards.filter(function(c){return c.fw&&c.de});cs=shuffle(cs);cs=n.mode==='kurz'?cs.slice(0,7):cs.slice(0,cs.length>14?Math.round(cs.length*.75):cs.length);
  return cs.map(function(c){return {id:c.id,q:c.de.join(' / '),type:'input',answer:[c.fw],ref:c.id,explain:''}})}
function langHead(n,t){return 'Übersetze ins '+(t.subject==='engl'?'Englische':'Französische')}
var FUNNY={franz:['Franz Franzose','Pierre Baguette','Marie Croissant','Jean Fromage','Louis Käsli','Brigitte Bonjour','Claude Crêpe','Amélie Merci'],engl:['Tom Teabag','Lady Biscuit','Sir Toastbrot','Bob Bigben','Molly Muffin','Harry Hotdog','Tina Teatime','Jack Fish&Chips'],deu:['Hans Wurst','Berta Brezel','Fritz Müesli','Heidi Alpenblick','Sepp Rösti','Lisa Zopf'],mathe:['Prof. Pi Pfiffig','Zora Zähler','Nick Nenner','Bruno Bruch','Mia Mal-Zwei','Kurt Kehrbruch']};
function funnyName(t){var l=FUNNY[t.subject]||FUNNY.deu;return l[Math.floor(Math.random()*l.length)]}
function paperLeft(q){return esc(q.q)}
function vPaper(n,t,qs){
  var dt=new Date(),ds=dt.getDate()+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear(),lg=t.subject==='engl'?'Englische':'Französische';
  var h='<div class="paperpage"><p class="ptitle">Prüfung · '+esc(t.title)+'</p><div class="sheet"><div class="shead"><span>Name: <b>'+esc(n.pname||'')+'</b></span><span>Datum: <b>'+ds+'</b></span></div><table class="ptab"><thead><tr><th class="pn">Nr.</th><th>'+langHead(n,t)+'</th><th>Antwort</th></tr></thead><tbody>';
  qs.forEach(function(q,i){
    var cell;
    if(q.type==='mc')cell='<select class="pin" data-q="'+q.id+'"><option value="">–</option>'+q.options.map(function(o,j){return '<option value="'+j+'"'+(n.answers[q.id]===j?' selected':'')+'>'+esc(o.replace(/<[^>]+>/g,''))+'</option>'}).join('')+'</select>';
    else cell='<input class="pin" data-q="'+q.id+'" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="'+esc(n.answers[q.id]||'')+'">';
    h+='<tr><td class="pn"><span class="nc">'+(i+1)+'</span></td><td class="pq">'+paperLeft(q)+'</td><td>'+cell+'</td></tr>';
  });
  return h+'</tbody></table></div><button class="btn pri big" data-act="finish">Abgeben</button></div>'}
function vExam(){
  var n=nav,t=topicById(n.topicId),mathe=!isLangT(t),qs=examQs(n,t);
  if(n.phase==='intro')return '<div class="stack"><div><p class="eyebrow">Musterprüfung</p><h1>'+esc(t.title)+'</h1></div>'+coach('Jetzt zählt es ernst! Zeig, was du gelernt hast. Es ist aber nur eine Musterprüfung: Fehler sind erlaubt.',1)+examArt()+examInfo(qs.length)+'<section class="card"><p>'+qs.length+' Fragen · Note von 1 bis 6</p><p class="sub" style="margin-top:8px">Antworte so, wie du es in der Schule tun würdest. Ohne Tipps, ohne Nachschauen.'+(mathe?' Für Zwischenschritte kannst du bei jeder Frage «Notizen machen» öffnen.':'')+' Es gibt keinen Zeitdruck. Für jede richtige Antwort gibt es XP, für gute Noten einen Bonus.</p></section>'+(mathe?'':'<div class="modes"><button class="btn seg'+(n.mode!=='kurz'?' on':'')+'" data-act="emode" data-m="alles">Alles</button><button class="btn seg'+(n.mode==='kurz'?' on':'')+'" data-act="emode" data-m="kurz">Kurztext</button></div>')+'<div class="row"><button class="btn pri big" data-act="start">Los geht\'s</button><button class="btn big" data-act="back">Zurück</button></div></div>';
  if(n.phase==='run'&&!mathe)return vPaper(n,t,qs);
  if(n.phase==='run'){
    var dt=new Date(),ds=dt.getDate()+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear();
    var html='<div class="paperpage"><p class="ptitle">Prüfung · '+esc(t.title)+'</p><div class="sheet"><div class="shead"><span>Name: <b>'+esc(n.pname||'')+'</b></span><span>Datum: <b>'+ds+'</b></span></div>'+(t.id.indexOf('bruch')>=0?'<p class="sub" style="margin:0 0 4px">Alle Brüche so weit wie möglich kürzen.</p>':'')+'<ol class="mq">';
    qs.forEach(function(q,i){
      var key='e:'+t.id+':'+q.id,pd=padHTML(key,q.q);
      html+='<li><div class="mqt"><span class="nc">'+(i+1)+'</span>'+qBlock(q)+'</div>'+visuals(q.visuals)+(q.type==='mc'?'<div class="mcopts">'+q.options.map(function(o,j){return '<label class="mco"><input type="radio" name="r-'+q.id+'" data-q="'+q.id+'" value="'+j+'"'+(n.answers[q.id]===j?' checked':'')+'><span class="mcl">'+String.fromCharCode(65+j)+'</span><span>'+rt(o)+'</span></label>'}).join('')+'</div>':'<input class="pin" id="in-'+q.id+'" data-q="'+q.id+'" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="'+esc(n.answers[q.id]||'')+'"><div class="tools">'+pd.btn+'</div>'+pd.box)+'</li>';
    });
    html+='</ol></div>';
    return html+'<button class="btn pri big" data-act="finish">Abgeben</button></div>';
  }
  var r=n.result,msg=r.note>=5.5?'Wow! Das war fast zu einfach.':r.note>=4.5?'Stark gemacht. Noch ein bisschen Feinschliff.':r.note>=4?'Bestanden! Übe noch die Aufgaben, die nicht geklappt haben.':'Das war ein Aufwärmen. Die Aufgaben, die nicht geklappt haben, üben wir jetzt zusammen.';
  var dt2=new Date(),ds2=dt2.getDate()+'.'+(dt2.getMonth()+1)+'.'+dt2.getFullYear();
  var TK='<svg class="mkk ok" viewBox="0 0 32 28" aria-label="richtig"><path d="M3 15l8 9L29 3"/></svg>',XX='<svg class="mkk no" viewBox="0 0 28 28" aria-label="falsch"><path d="M4 5l20 18M24 4L5 24"/></svg>';
  var html3='<div class="paperpage"><p class="ptitle">Prüfung · '+esc(t.title)+'</p><div class="sheet corr"><div class="gmark"><span class="gnote">'+fmt(r.note)+'</span><span class="gpts">'+r.score+' / '+r.max+'</span></div><div class="shead"><span>Name: <b>'+esc(n.pname||'')+'</b></span><span>Datum: <b>'+ds2+'</b></span></div>';
  var rowAns=function(it,i){
    var L=function(j){return String.fromCharCode(65+j)+') '},ans=it.q.type==='mc'?L(it.q.answer)+it.q.options[it.q.answer]:it.q.answer[0],given=it.q.type==='mc'?(it.g==null?'':L(it.g)+it.q.options[it.g]):(it.g||'');
    var tilt=((i*37)%7)-3;
    return '<div class="pin cl">'+(given?'<span class="hw'+(it.ok?'':' strike')+'">'+esc(given)+'</span>':'')+(it.ok?'':'<span class="hw red">'+rt(ans)+'</span>')+'<span class="mkw" style="transform:rotate('+tilt+'deg)">'+(it.ok?TK:XX)+'</span></div>';
  };
  if(isLangT(t)){
    html3+='<table class="ptab"><thead><tr><th class="pn">Nr.</th><th>'+langHead(n,t)+'</th><th>Antwort</th></tr></thead><tbody>';
    r.items.forEach(function(it,i){html3+='<tr><td class="pn"><span class="nc">'+(i+1)+'</span></td><td class="pq">'+paperLeft(it.q)+'</td><td>'+rowAns(it,i)+'</td></tr>'});
    html3+='</tbody></table>';
  }else{
    html3+=(t.subject==='mathe'&&t.id.indexOf('bruch')>=0?'<p class="sub" style="margin:0 0 4px">Alle Brüche so weit wie möglich kürzen.</p>':'')+'<ol class="mq">';
    r.items.forEach(function(it,i){html3+='<li><div class="mqt"><span class="nc">'+(i+1)+'</span>'+qBlock(it.q)+'</div>'+visuals(it.q.visuals)+rowAns(it,i)+'</li>'});
    html3+='</ol>';
  }
  html3+='</div><p class="sub" style="margin:10px 2px">'+esc(msg)+' · +'+r.xp+' XP</p>';
  return html3+'<div class="row"><button class="btn pri big" data-act="retake">Noch einmal</button><button class="btn big" data-act="practice" data-scope="topic:'+esc(t.id)+'" data-force="1">Falsche Aufgaben üben</button><button class="btn ghost" data-act="back">Fertig</button></div></div>';
}
