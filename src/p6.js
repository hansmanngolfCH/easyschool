
/* ---------- Extra-XP-Spezialspiel (pro Fach, schwieriger als Paare) ---------- */
var XGT=null;
var XG_PAL=[['#FF5F6D','#FFC371'],['#36D1DC','#5B86E5'],['#A770EF','#F953C6'],['#11998E','#38EF7D']];
function xgPie(n,k,sz,col){
  var R=sz/2-3,c=sz/2,s='<svg viewBox="0 0 '+sz+' '+sz+'" width="'+sz+'" height="'+sz+'" aria-hidden="true">',i;
  if(n===1)return s+'<circle cx="'+c+'" cy="'+c+'" r="'+R+'" fill="'+(k?col:'#F1ECFF')+'" stroke="#fff" stroke-width="3"/></svg>';
  for(i=0;i<n;i++){
    var a0=-Math.PI/2+i*2*Math.PI/n,a1=-Math.PI/2+(i+1)*2*Math.PI/n;
    s+='<path d="M'+c+' '+c+' L'+(c+R*Math.cos(a0)).toFixed(1)+' '+(c+R*Math.sin(a0)).toFixed(1)+' A'+R+' '+R+' 0 0 1 '+(c+R*Math.cos(a1)).toFixed(1)+' '+(c+R*Math.sin(a1)).toFixed(1)+' Z" fill="'+(i<k?col:'#F1ECFF')+'" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>';
  }
  return s+'</svg>';
}
function xgTri(a,b,qa,qb,qc){
  var s=Math.min(190/b,130/a),A=[30,168],B=[30+b*s,168],Cc=[30,168-a*s],W=Math.round(B[0]+30);
  function lab(x,y,t,q){return q?'<g><rect x="'+(x-18)+'" y="'+(y-16)+'" width="36" height="30" rx="10" fill="#FFD93D" stroke="#fff" stroke-width="2"/><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" font-size="20" font-weight="800" fill="#4a2a00">?</text></g>':'<g><rect x="'+(x-22)+'" y="'+(y-16)+'" width="44" height="30" rx="10" fill="#fff" fill-opacity=".95"/><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" font-size="19" font-weight="800" fill="#2b2f5e">'+t+'</text></g>'}
  return '<svg viewBox="0 0 '+W+' 200" width="100%" style="max-width:'+W+'px" aria-hidden="true"><defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD54F"/><stop offset="1" stop-color="#FFB300"/></linearGradient></defs>'
   +'<polygon points="'+A+' '+B+' '+Cc+'" fill="url(#tg)" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>'
   +'<path d="M'+A[0]+' '+(A[1]-16)+'h16v16" fill="none" stroke="#fff" stroke-width="3"/>'
   +lab(A[0]-2+0,(A[1]+Cc[1])/2,a,qa)
   +lab((A[0]+B[0])/2,A[1]+14,b,qb)
   +lab((B[0]+Cc[0])/2+16,(B[1]+Cc[1])/2-14,Math.round(Math.sqrt(a*a+b*b)),qc)+'</svg>';
}
function xgNums(ans,extra){
  var set=[ans],c=[ans+1,ans-1,ans+2,ans-2,ans+3,ans-3].concat(extra||[]),i;c=shuffle(c.filter(function(x){return x>0&&x!==ans}));
  for(i=0;i<c.length&&set.length<4;i++)if(set.indexOf(c[i])<0)set.push(c[i]);
  return shuffle(set).map(function(x){return {h:'<b>'+x+'</b>',ok:x===ans}});
}
function xgFrac(){
  var f=['frac','shade','bigger','frac','shade'][Math.floor(Math.random()*5)],ns=[3,4,5,6,8],n=ns[Math.floor(Math.random()*ns.length)],k,svg='',opts,i,col='#FFC107';
  if(f==='frac'){
    k=1+Math.floor(Math.random()*(n-1));
    var c=[k+'/'+n,(n-k)+'/'+n,(k+1)+'/'+n,(k-1)+'/'+n,k+'/'+(n+2),k+'/'+(n-1),n+'/'+k].filter(function(x,i,a){return a.indexOf(x)===i});
    var right=k+'/'+n,others=shuffle(c.filter(function(x){return x!==right&&x.split('/')[0]!=='0'&&+x.split('/')[0]<=+x.split('/')[1]&&x.split('/')[1]!=='0'&&(+x.split('/')[0]/+x.split('/')[1]!==k/n)})).slice(0,3);
    return {svg:'<div class="xg-pie">'+xgPie(n,k,150,col)+'</div>',opts:shuffle([right].concat(others)).map(function(x){return {h:'<b class="xg-fr">'+x+'</b>',ok:x===right}})};
  }
  if(f==='shade'){
    k=1+Math.floor(Math.random()*(n-1));var ks=[k],t;
    for(i=1;i<=n-1;i++)if(i!==k)ks.push(i);ks=[k].concat(shuffle(ks.filter(function(x){return x!==k})).slice(0,3));
    return {svg:'<div class="xg-big">'+k+'<i></i>'+n+'</div>',opts:shuffle(ks).map(function(x){return {h:xgPie(n,x,92,col),ok:x===k}})};
  }
  if(f==='bigger'){
    var ds=[2,3,4,5,6,8],d1,d2,n1,n2,tries=0;
    do{d1=ds[Math.floor(Math.random()*6)];d2=ds[Math.floor(Math.random()*6)];n1=1+Math.floor(Math.random()*(d1-1));n2=1+Math.floor(Math.random()*(d2-1));tries++}while(Math.abs(n1/d1-n2/d2)<.17&&tries<60);
    var big1=n1/d1>n2/d2;
    return {svg:'<div class="xg-ask">Welches Stück ist grösser?</div>',opts:[{h:xgPie(d1,n1,110,col)+'<span class="xg-sm">'+n1+'/'+d1+'</span>',ok:big1},{h:xgPie(d2,n2,110,'#4285F4')+'<span class="xg-sm">'+n2+'/'+d2+'</span>',ok:!big1}]};
  }
  n=[4,5,6,8,10][Math.floor(Math.random()*5)];var a=1+Math.floor(Math.random()*(n-2)),b=1+Math.floor(Math.random()*(n-a-1)||1);if(a+b>n)b=n-a;
  var sum=a+b,r=sum+'/'+n,cand=[(sum+1)+'/'+n,(sum-1)+'/'+n,sum+'/'+(2*n),(a*b)+'/'+n,(a+b)+'/'+(n+a)].filter(function(x){return x!==r&&+x.split('/')[0]>0&&(+x.split('/')[0]/+x.split('/')[1]!==sum/n)});
  cand=cand.filter(function(x,i,arr){return arr.indexOf(x)===i});
  return {svg:'<div class="xg-eq">'+xgPie(n,a,84,col)+'<b>+</b>'+xgPie(n,b,84,XG_PAL[1][0])+'<b>=</b><em>?</em></div>',opts:shuffle([r].concat(shuffle(cand).slice(0,3))).map(function(x){return {h:'<b class="xg-fr">'+x+'</b>',ok:x===r}})};
}
var XG_TR=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20]];
function xgPyth(){
  var t=XG_TR[Math.floor(Math.random()*XG_TR.length)],sw=Math.random()<.5,a=sw?t[1]:t[0],b=sw?t[0]:t[1],c=t[2],u=Math.random();
  if(u<.8)return {svg:'<div class="xg-tri">'+xgTri(a,b,0,0,1)+'</div>',opts:xgNums(c,[a+b])};
  if(u<.9)return {svg:'<div class="xg-tri">'+xgTri(a,b,1,0,0)+'</div>',opts:xgNums(a,[c-b,c+b>40?0:b])};
  return {svg:'<div class="xg-tri">'+xgTri(a,b,0,1,0)+'</div>',opts:xgNums(b,[c-a])};
}
function xgMult(){var a=6+Math.floor(Math.random()*8),b=6+Math.floor(Math.random()*8);return {svg:'<div class="xg-big">'+a+' × '+b+'</div>',opts:xgNums(a*b,[a*b+10,a*b-10])}}
function xgBuild(t){
  var n={kind:'',rounds:[]},ch=t.child,sub=t.subject,all=topicsOf(ch,sub),i;
  if(t.cards.some(isV)){
    n.kind='salat';
    var ok=function(c){var f=c.fw||'';return isV(c)&&wc(f)<=2&&!/[\/…(),.?!]/.test(f)&&f.replace(/[^a-zàâäçéèêëîïôöùûüÿœæß]/gi,'').length>=4&&f.replace(/[^a-zàâäçéèêëîïôöùûüÿœæß]/gi,'').length<=13};
    var own=shuffle(t.cards.filter(ok)),other=[];
    all.forEach(function(x){if(x.id!==t.id)x.cards.forEach(function(c){if(ok(c))other.push(c)})});
    var pick=own.slice(0,3);
    pick.slice(0,3).forEach(function(c){n.rounds.push({kind:'salat',c:c,fw:c.fw,clue:c.de[0],pos:0,wr:0,used:{}})});
    n.rounds=shuffle(n.rounds);
  }else if(sub==='mathe'){
    n.kind='math';
    var fam=[],own2=/bruch/.test(t.id)?'f':/pyth/.test(t.id)?'p':'m';
    all.forEach(function(x){fam.push(/bruch/.test(x.id)?'f':/pyth/.test(x.id)?'p':'m')});
    fam.push(own2,own2);
    var sh=t.cards.filter(function(c){return c.q&&c.a&&String(c.a).length<=14&&String(c.q).length<=120&&!/\n/.test(c.q)}),mine=own2==='m'&&sh.length>=4;
    if(mine){var ans2=sh.map(function(c){return String(c.a)});shuffle(sh).slice(0,3).forEach(function(c){var right=String(c.a),oth=shuffle(ans2.filter(function(x,k,aa){return x!==right&&aa.indexOf(x)===k})).slice(0,3);n.rounds.push({kind:'opt',svg:'<div class="xg-q">'+esc(c.q)+'</div>',opts:shuffle([right].concat(oth)).map(function(x){return {h:'<b>'+esc(x)+'</b>',ok:x===right}})})})}
    else for(i=0;i<3;i++){var r=own2==='f'?xgFrac():own2==='p'?xgPyth():xgMult();r.kind='opt';n.rounds.push(r)}
  }else{
    n.kind='quiz';var pool=[],ans=[];
    [t].forEach(function(x){x.exam.questions.forEach(function(q){if(q.type==='mc'&&q.options&&q.options.length>=3)pool.push({q:q.q,o:q.options,a:q.answer});else if(q.type==='input'&&q.answer&&q.answer[0]&&String(q.answer[0]).length<=24)ans.push(q)})});
    var made=shuffle(pool).slice(0,3).map(function(p){return {kind:'opt',svg:'<div class="xg-q">'+esc(p.q)+'</div>',opts:p.o.map(function(x,k){return {h:'<b>'+esc(x)+'</b>',ok:k===p.a}})}});
    if(made.length<3){
      var lib=ans.map(function(q){return String(q.answer[0])});
      shuffle(ans).slice(0,3-made.length).forEach(function(q){var right=String(q.answer[0]),others=shuffle(lib.filter(function(x,k,a){return x!==right&&a.indexOf(x)===k})).slice(0,3);if(others.length<2)return;made.push({kind:'opt',svg:'<div class="xg-q">'+esc(q.q)+'</div>',opts:shuffle([right].concat(others)).map(function(x){return {h:'<b>'+esc(x)+'</b>',ok:x===right}})})});
    }
    n.rounds=shuffle(made);
  }
  return n;
}
function xgSecs(r){return r.kind==='salat'?70:r.svg.indexOf('xg-q')>=0?35:30}
ACT.xgame=function(b){
  var t=topicById(b.dataset.id),g=xgBuild(t);
  if(!g.rounds.length){toast('Hier gibt es noch keine Aufgaben für das Spiel.');return}
  go({view:'xg',child:nav.child,topicId:t.id,kind:g.kind,rounds:g.rounds,i:0,lives:3,ok:0,miss:0,phase:'play',xp:0,tok:0,armed:-1},{view:'subject',child:nav.child,subject:t.subject,from:{view:'child',child:nav.child,from:{view:'home'}}});
};
ACT.xgquit=function(){clearTimeout(XGT);ACT.back()};
function xgHearts(n){var s='',i;for(i=0;i<3;i++)s+='<span class="'+(i<n.lives?'on':'')+'">❤</span>';return s}
function vXg(){
  var n=nav,t=topicById(n.topicId),NAME={salat:'Buchstaben-Salat',math:'Mathe-Knobler',quiz:'Blitz-Quiz'}[n.kind];
  if(n.phase==='end'){
    var tot=n.rounds.length;
    return '<div class="stack"><div class="xg xg-end xg-'+n.kind+' s-'+t.subject+'"><div class="xg-trophy">'+(n.ok===tot&&!n.miss?'🏆':n.ok>=4?'🥇':n.ok>=2?'🥈':'🎯')+'</div><h1>+'+n.xp+' XP</h1><p>'+n.ok+' von '+tot+' Aufgaben geschafft'+(n.ok===tot&&!n.miss?' · Perfekt, ohne Fehler!':'')+'</p></div><div class="row"><button class="btn pri big" data-act="xgquit">Fertig</button></div></div>';
  }
  var r=n.rounds[n.i],secs=xgSecs(r),h='<div class="stack"><div><p class="eyebrow">Extra-XP · '+esc(t.title)+'</p><h1>'+NAME+'</h1></div><div class="xg xg-'+n.kind+' s-'+t.subject+'" id="xg">'
   +'<div class="xg-top"><span class="xg-h" id="xgh">'+xgHearts(n)+'</span><span class="xg-dots">'+n.rounds.map(function(x,k){return '<i class="'+(k<n.i?'d':k===n.i?'c':'')+'"></i>'}).join('')+'</span><button class="xg-x" data-act="xgquit" aria-label="Beenden">×</button></div>'
   ;
  if(r.kind==='salat'){
    var letters=[],chars=r.fw.split(''),slots=chars.map(function(ch,k){var isL=/[a-zàâäçéèêëîïôöùûüÿœæß]/i.test(ch);if(isL)letters.push(ch.toLowerCase());return isL?'<span class="xs" id="xs'+(letters.length-1)+'"></span>':'<span class="xs fx">'+(ch===' '?'&nbsp;':esc(ch))+'</span>'}).join('');
    if(!r.tiles){var al='abcdefghilmnoprstuv'.split(''),dec=shuffle(al.filter(function(x){return letters.indexOf(x)<0})).slice(0,1);r.letters=letters;r.tiles=shuffle(letters.concat(dec)).map(function(ch,k){return {ch:ch,col:k%4}})}
    h+='<div class="xg-clue">'+esc(r.clue)+'</div><div class="xg-slots">'+slots+'</div><div class="xg-tiles">'+r.tiles.map(function(x,k){return '<button class="xt c'+x.col+'" id="xt'+k+'" data-act="xgt" data-i="'+k+'">'+x.ch+'</button>'}).join('')+'</div><p class="xg-hint">Tippe die Buchstaben in der richtigen Reihenfolge. Ein Buchstabe ist zu viel.</p>';
  }else{
    h+=r.svg+'<div class="xg-opts n'+r.opts.length+'">'+r.opts.map(function(o,k){return '<button class="xo c'+(k%4)+'" data-act="xgo" data-i="'+k+'">'+o.h+'</button>'}).join('')+'</div>';
  }
  h+='<div class="xg-msg" id="xgm"></div></div></div>';
  
  return h;
}
function xgSched(secs){clearTimeout(XGT);var n=nav,tok=++n.tok;XGT=setTimeout(function(){if(nav===n&&n.tok===tok&&n.phase==='play')xgFail(true)},secs*1000)}
function xgNext(){var n=nav;if(n.view!=='xg')return;if(n.lives<=0||n.i+1>=n.rounds.length){xgEnd();return}n.i++;n.phase='play';render()}
function xgEnd(){
  var n=nav;n.phase='end';clearTimeout(XGT);
  if(n.ok===n.rounds.length&&!n.miss){var b=addXp(n.child,20);n.xp+=b}
  if(n.ok>=2)ach(n.child,'pairs');
  checkPassive(n.child);save(n.child);render();
  if(n.ok>=2)setTimeout(function(){if(nav===n)showReward('Extra-Spiel geschafft!')},1500);
}
function xgDone(good,msg){
  var n=nav,m=document.getElementById('xgm');n.phase='fb';clearTimeout(XGT);n.tok++;
  if(good){n.ok++;n.xp+=addXp(n.child,12)}else{n.lives--;n.miss++}
  logAnswer(n.child,good);
  var hh=document.getElementById('xgh');if(hh)hh.innerHTML=xgHearts(n);
  if(m){m.className='xg-msg '+(good?'ok':'bad');m.textContent=msg}
  setTimeout(function(){if(nav===n)xgNext()},good?1000:1900);
}
function xgFail(timeout){
  var n=nav,r=n.rounds[n.i];if(n.phase!=='play')return;
  if(r.kind==='salat'){r.letters.forEach(function(ch,k){var s=document.getElementById('xs'+k);if(s){s.textContent=ch;s.classList.add(k<r.pos?'ok':'rev')}})}
  else document.querySelectorAll('.xo').forEach(function(b,k){b.disabled=true;if(r.opts[k].ok)b.classList.add('right')});
  xgDone(false,timeout?'Zeit abgelaufen!':'Leider falsch');
}
ACT.xgo=function(b){
  var n=nav,r=n.rounds[n.i];if(n.phase!=='play')return;
  var k=+b.dataset.i,good=r.opts[k].ok;
  document.querySelectorAll('.xo').forEach(function(x,j){x.disabled=true;if(r.opts[j].ok)x.classList.add('right')});
  if(!good)b.classList.add('wrong');
  xgDone(good,good?'Richtig! +12 XP':'Leider falsch');
};
ACT.xgt=function(b){
  var n=nav,r=n.rounds[n.i];if(n.phase!=='play'||b.disabled)return;
  var k=+b.dataset.i,ch=r.tiles[k].ch;
  if(ch===r.letters[r.pos]){
    var s=document.getElementById('xs'+r.pos);if(s){s.textContent=ch;s.classList.add('ok')}
    b.disabled=true;b.classList.add('used');r.pos++;
    if(r.pos>=r.letters.length)xgDone(true,r.wr?'Geschafft! +12 XP':'Perfekt! +12 XP');
  }else{
    r.wr++;n.miss+=0;b.classList.remove('shk');void b.offsetWidth;b.classList.add('shk');
    var hh=document.getElementById('xgm');if(hh){hh.className='xg-msg bad';hh.textContent='Falscher Buchstabe ('+r.wr+'/4)'}
    if(r.wr>=4)xgFail(false);
  }
};
