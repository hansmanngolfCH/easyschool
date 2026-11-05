
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
  var set=[ans],c=[ans+1,ans-1,ans+2,ans-2,ans+3,ans-3,ans+10,ans-10,ans+4].concat(extra||[]),i;c=shuffle(c.filter(function(x){return x>0&&x!==ans}));
  for(i=0;i<c.length&&set.length<5;i++)if(set.indexOf(c[i])<0)set.push(c[i]);
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
function xgDis(right,pool,k){
  k=k||3;right=String(right).trim();var m,out=[],i,fm=right.match(/^(\d+)\/(\d+)$/),nm=right.match(/^(-?\d+(?:[.,]\d+)?)\s*([^\d\s][^\d]{0,6})?$/);
  function add(x){x=String(x);if(x!==right&&out.indexOf(x)<0)out.push(x)}
  if(fm){var a=+fm[1],b=+fm[2];[[a+1,b],[a-1,b],[a,b+1],[a,b-1],[b,a],[a*2,b*2+1],[a+1,b+1]].forEach(function(p){if(p[0]>0&&p[1]>0&&p[0]/p[1]!==a/b)add(p[0]+'/'+p[1])})}
  else if(nm){var dec=/[.,]/.test(nm[1]),v=parseFloat(nm[1].replace(',','.')),u=nm[2]?(right.indexOf(nm[2])>nm[1].length?' ':'')+nm[2]:'',st=dec?[.1,.5,1,2]:[1,2,5,10],c=[];
    st.forEach(function(d){c.push(v+d);c.push(v-d)});c.push(v*2,v/2,v*10,v/10);
    var sw=String(Math.abs(Math.round(v)));if(sw.length>1)c.push(+(sw.charAt(1)+sw.charAt(0)+sw.slice(2)));
    c.filter(function(x){return isFinite(x)&&x!==v&&(v<0||x>=0)&&(dec||Math.round(x)===x)}).forEach(function(x){add((dec?String(Math.round(x*100)/100).replace('.',right.indexOf(',')>=0?',':'.'):x)+u)});
    out=shuffle(out);var near=out.filter(function(x){var y=parseFloat(x);return Math.abs(y-v)<=Math.max(2,Math.abs(v)*.5)});out=near.concat(out.filter(function(x){return near.indexOf(x)<0}))}
  else{var wc2=right.split(/\s+/).length,cand=pool.filter(function(x,j,aa){x=String(x);return x!==right&&aa.indexOf(x)===j&&!/^[-\d.,\s\/%°]+/.test(x)});
    var good=cand.filter(function(x){return String(x).split(/\s+/).length===wc2&&Math.abs(String(x).length-right.length)<=7});
    shuffle(good).concat(shuffle(cand.filter(function(x){return good.indexOf(x)<0}))).forEach(add)}
  return out.slice(0,k)
}
function xgWhy(c){var s=(c.steps||[]).map(function(x){return x[0]}).join(' · ');return s.length>2&&s.length<140?s:(c.why&&String(c.why).length<140?String(c.why):'')}
function xgSeenGet(k){try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}}
function xgSeenSet(k,o){try{var ks=Object.keys(o);if(ks.length>400){var n2={};ks.slice(-300).forEach(function(x){n2[x]=1});o=n2}localStorage.setItem(k,JSON.stringify(o))}catch(e){}}
function xgOptRound(q,right,others,key,vis,why){
  var all=[right].concat(others),long=all.some(function(x){return String(x).length>26});
  var mx=Math.max.apply(null,all.map(function(x){return String(x).length})),vk=vis?JSON.stringify(vis):'';return {why:why||'',cols1:mx>26,key:key||q+'|'+right+vk,ans:right+vk,kind:'opt',svg:(vis?'<div class="xg-vis">'+visuals(vis)+'</div>':'')+'<div class="xg-q">'+mqFix(esc(q).replace(/\n/g,'<br>'))+'</div>',opts:shuffle(all.map(function(x){return {h:'<b'+(mx>45?' class="xl xl2"':long?' class="xl"':'')+'>'+esc(x)+'</b>',ok:x===right}}))}
}
function xgCommaVar(sent){
  var out=[],nc=sent.replace(/,/g,'');if(nc!==sent)out.push(nc);
  var i=sent.indexOf(',');if(i>0){var w=sent.slice(0,i).lastIndexOf(' ');if(w>0)out.push(sent.slice(0,w)+', '+sent.slice(w+1,i)+sent.slice(i+1))}
  var sp=sent.indexOf(' ');if(sp>0&&sent.charAt(sp-1)!==','){out.push(sent.slice(0,sp)+','+sent.slice(sp))}
  return out
}
function xgCardPool(t,all){
  var items=[],BAD=/\b(Bild|Grafik|Zeichnung|siehe|abgebildet|rote Linie|Tabelle|oben|unten)\b/i,textOnly=function(c){return c.q&&c.q.length<=140&&(c.visuals||!BAD.test(c.q))};
  var shortA=[];all.forEach(function(x){x.cards.forEach(function(c){if(!isV(c)&&textOnly(c)&&c.a&&String(c.a).length<=30)shortA.push(String(c.a))})});
  t.cards.forEach(function(c){
    if(isV(c)||!textOnly(c)||c.a==null)return;
    var right=String(c.a);
    if(Array.isArray(c.opts)&&c.opts.length>=3&&c.opts.map(String).indexOf(right)>=0){
      var oth=c.opts.map(String).filter(function(x,i,aa){return x!==right&&aa.indexOf(x)===i&&x.length<=60});
      if(right.length<=60&&oth.length>=2)items.push(xgOptRound(c.q,right,shuffle(oth).slice(0,3),null,c.visuals,xgWhy(c)));
    }else if(c.pre&&Array.isArray(c.ans)&&c.ans[0]&&String(c.ans[0]).length<=60&&String(c.pre).length<=60){
      var r2=String(c.ans[0]),ot=[String(c.pre)].concat(xgCommaVar(r2)).filter(function(x,i,aa){return x!==r2&&aa.indexOf(x)===i});
      if(ot.length>=2&&/,/.test(r2+c.pre))items.push(xgOptRound('Welcher Satz ist richtig?',r2,ot.slice(0,3)));
    }else if(right.length<=30&&!/\n/.test(right)){
      var d=xgDis(right,shortA,3);if(d.length>=2)items.push(xgOptRound(c.q,right,d,null,c.visuals,xgWhy(c)));
    }
  });
  var lib=[];
  t.exam.questions.forEach(function(q){
    if(q.type==='mc'&&Array.isArray(q.options)&&q.options.length>=3&&typeof q.answer==='number'&&q.q.length<=140&&!BAD.test(q.q)&&q.options.every(function(o){return String(o).length<=60})){
      var rt=String(q.options[q.answer]);items.push(xgOptRound(q.q,rt,q.options.map(String).filter(function(x,i){return i!==q.answer}).slice(0,3),null,q.visuals,String(q.explain||'')))
    }else if(q.type==='input'&&q.answer&&q.answer[0]&&String(q.answer[0]).length<=24&&!BAD.test(q.q))lib.push(q)
  });
  var libA=lib.map(function(q){return String(q.answer[0])}).concat(shortA);
  lib.forEach(function(q){var rt=String(q.answer[0]),d=xgDis(rt,libA,3);if(d.length>=2)items.push(xgOptRound(q.q,rt,d,null,q.visuals,String(q.explain||'')))});
  return items
}
function xgVocabPool(t,all){
  var items=[],lang=t.subject==='franz'?'Französisch':'Englisch',cs=t.cards.filter(function(c){return isV(c)&&c.de&&c.de[0]&&String(c.fw).length<=34&&String(c.de[0]).length<=34});
  var fws=cs.map(function(c){return String(c.fw)}),des=cs.map(function(c){return String(c.de[0])});
  all.forEach(function(x){if(x.id!==t.id)x.cards.forEach(function(c){if(isV(c)&&c.de&&c.de[0]&&String(c.fw).length<=34&&String(c.de[0]).length<=34){fws.push(String(c.fw));des.push(String(c.de[0]))}})});
  cs.forEach(function(c){
    var fw=String(c.fw),de=String(c.de[0]),d1=xgDis(fw,fws,3),d2=xgDis(de,des,3);
    if(d1.length>=2)items.push(xgOptRound('Wie heisst «'+de+'» auf '+lang+'?',fw,d1));
    if(d2.length>=2)items.push(xgOptRound('Was bedeutet «'+fw+'»?',de,d2));
  });
  return items
}
function xgSalatPool(t){
  var ok=function(c){var f=c.fw||'';return isV(c)&&wc(f)<=2&&!/[\/…(),.?!]/.test(f)&&f.replace(/[^a-zàâäçéèêëîïôöùûüÿœæß]/gi,'').length>=4&&f.replace(/[^a-zàâäçéèêëîïôöùûüÿœæß]/gi,'').length<=13};
  return t.cards.filter(ok).map(function(c){return {key:'S|'+c.fw,ans:c.fw,salat:1,round:{kind:'salat',c:c,fw:c.fw,clue:c.de[0],pos:0,wr:0,used:{}}}})
}
function xgPick(t,items,N,maxSalat){
  var sk='xgs_'+(nav.child||'')+'_'+t.id,seen=xgSeenGet(sk),fresh=[],stale=[],out=[],ra={},rq={},ns=0;
  items.forEach(function(x){(seen[x.key]?stale:fresh).push(x)});
  if(fresh.length<N){seen={};fresh=items.slice();stale=[]}
  var order=shuffle(fresh).concat(shuffle(stale));
  function take(strict){order.forEach(function(x){
    if(out.length>=N||out.indexOf(x)>=0)return;
    if(x.salat&&ns>=maxSalat)return;
    if(strict&&(ra[x.ans]||rq[x.svg||x.key]))return;
    out.push(x);ra[x.ans]=1;rq[x.svg||x.key]=1;if(x.salat)ns++})}
  take(true);take(false);
  out=shuffle(out);
  out.forEach(function(x){seen[x.key]=1});xgSeenSet(sk,seen);
  return out.map(function(x){return x.salat?x.round:x})
}
function xgBuild(t){
  var n={kind:'',rounds:[]},ch=t.child,sub=t.subject,all=topicsOf(ch,sub),i,N=10;
  if(t.cards.some(isV)){
    n.kind='vocab';
    n.rounds=xgPick(t,xgVocabPool(t,all).concat(xgSalatPool(t)),N,3);
  }else if(sub==='mathe'&&(/bruch|pyth/.test(t.id))){
    n.kind='math';var seenS={},tries=0,fr=/bruch/.test(t.id);
    while(n.rounds.length<N&&tries++<80){var r=fr?xgFrac():xgPyth(),sg=r.svg+r.opts.map(function(o){return o.h}).join('');if(seenS[sg])continue;seenS[sg]=1;r.kind='opt';n.rounds.push(r)}
  }else{
    n.kind=sub==='mathe'?'math':'quiz';
    var pl=xgCardPool(t,all);
    if(pl.length<30){var base=t.id.replace(/^kl\d+-/,''),cl=+t.id.match(/^kl(\d+)/)[1],sib=all.filter(function(x){return x.id!==t.id&&x.id.replace(/^kl\d+-/,'')===base&&Math.abs(+x.id.match(/^kl(\d+)/)[1]-cl)<=3});
      sib.forEach(function(x){pl=pl.concat(xgCardPool(x,all))});
      if(pl.length<30){all.filter(function(x){return x.id!==t.id&&x.chapter&&x.chapter===t.chapter&&sib.indexOf(x)<0}).forEach(function(x){pl=pl.concat(xgCardPool(x,all))})}
      var sg={};pl=pl.filter(function(x){if(sg[x.key])return false;sg[x.key]=1;return true})}
    if(sub==='mathe'&&/plus|minus/.test(t.id)){var big=/20/.test(t.id)?20:10,pm=/plus/.test(t.id),k2=0,sx={};pl.forEach(function(x){sx[x.key]=1});
      while(pl.length<40&&k2++<400){var a2=1+Math.floor(Math.random()*(big-1)),b2=1+Math.floor(Math.random()*(big-1));if(pm&&a2+b2>big)continue;if(!pm&&b2>a2)continue;var q2=a2+(pm?' + ':' − ')+b2+' =',r2=pm?a2+b2:a2-b2;if(sx[q2+r2])continue;sx[q2+r2]=1;var o2=[r2+1,r2-1,r2+2,r2-2,r2+10,r2-10].filter(function(v){return v>=0&&v!==r2});pl.push(xgOptRound(q2,String(r2),shuffle(o2).slice(0,3).map(String),q2+r2))}}
    n.rounds=xgPick(t,pl,N,0);
    if(sub==='mathe'&&n.rounds.length<N){var tr=0,seenM={};n.rounds.forEach(function(r){seenM[r.svg]=1});while(n.rounds.length<N&&tr++<60){var rr=xgMult();if(seenM[rr.svg])continue;seenM[rr.svg]=1;rr.kind='opt';n.rounds.push(rr)}}
  }
  return n;
}
function xgSecs(r){return r.kind==='salat'?70:r.svg.indexOf('xg-q')>=0?35:30}
ACT.xgame=function(b){
  var t=topicById(b.dataset.id),g=xgBuild(t);
  if(!g.rounds.length){toast('Hier gibt es noch keine Aufgaben für das Spiel.');return}
  go({view:'xg',child:nav.child,topicId:t.id,kind:g.kind,rounds:g.rounds,i:0,lives:5,ok:0,miss:0,phase:'play',xp:0,tok:0,armed:-1},{view:'subject',child:nav.child,subject:t.subject,from:{view:'child',child:nav.child,from:{view:'home'}}});
};
ACT.xgquit=function(){clearTimeout(XGT);ACT.back()};
function xgHearts(n){return ''}
function xgCalcBtn(n){var ok=false;try{ok=gradeOf(n.child)>=7&&topicById(n.topicId).subject==='mathe'}catch(e){}return ok?'<button class="xg-x xg-calc" data-act="calc" aria-label="Taschenrechner">🧮</button>':''}
function vXg(){
  var n=nav,t=topicById(n.topicId),NAME={salat:'Buchstaben-Salat',vocab:'Vokabel-Mix',math:'Mathe-Knobler',quiz:'Quiz'}[n.kind];
  if(n.phase==='end'){
    var tot=n.rounds.length;
    return '<div class="stack"><div class="xg xg-end xg-'+n.kind+' s-'+t.subject+'"><div class="xg-trophy">'+(n.ok===tot&&!n.miss?'🏆':n.ok>=7?'🥇':n.ok>=4?'🥈':'🎯')+'</div><h1>'+n.ok+' / '+tot+'</h1><p>'+n.ok+' von '+tot+' Aufgaben geschafft'+(n.ok===tot&&!n.miss?' · Perfekt, ohne Fehler!':'')+'</p></div><div class="row"><button class="btn pri big" data-act="xgquit">Fertig</button></div></div>';
  }
  var r=n.rounds[n.i],secs=xgSecs(r),h='<div class="stack"><div><p class="eyebrow">Easy lernen · '+esc(t.title)+'</p><h1>'+NAME+'</h1></div><div class="xg xg-'+n.kind+' s-'+t.subject+'" id="xg">'
   +'<div class="xg-top"><span class="xg-h" id="xgh">'+xgCalcBtn(n)+'</span><span class="xg-dots">'+n.rounds.map(function(x,k){return '<i class="'+(k<n.i?'d':k===n.i?'c':'')+'"></i>'}).join('')+'</span><button class="xg-x" data-act="xgquit" aria-label="Beenden">×</button></div>'
   ;
  if(r.kind==='salat'){
    var letters=[],chars=r.fw.split(''),slots=chars.map(function(ch,k){var isL=/[a-zàâäçéèêëîïôöùûüÿœæß]/i.test(ch);if(isL)letters.push(ch.toLowerCase());return isL?'<span class="xs" id="xs'+(letters.length-1)+'"></span>':'<span class="xs fx">'+(ch===' '?'&nbsp;':esc(ch))+'</span>'}).join('');
    if(!r.tiles){var al='abcdefghilmnoprstuv'.split(''),dec=shuffle(al.filter(function(x){return letters.indexOf(x)<0})).slice(0,2);r.letters=letters;r.tiles=shuffle(letters.concat(dec)).map(function(ch,k){return {ch:ch,col:k%4}})}
    h+='<div class="xg-clue">'+esc(r.clue)+'</div><div class="xg-slots">'+slots+'</div><div class="xg-tiles">'+r.tiles.map(function(x,k){return '<button class="xt c'+x.col+'" id="xt'+k+'" data-act="xgt" data-i="'+k+'">'+x.ch+'</button>'}).join('')+'</div><p class="xg-hint">Tippe die Buchstaben in der richtigen Reihenfolge. Zwei Buchstaben sind zu viel.</p>';
  }else{
    h+=r.svg+'<div class="xg-opts n'+r.opts.length+(r.cols1?' col1':'')+'">'+r.opts.map(function(o,k){return '<button class="xo c'+(k%4)+'" data-act="xgo" data-i="'+k+'">'+o.h+'</button>'}).join('')+'</div>';
  }
  h+='<div class="xg-msg" id="xgm"></div></div></div>';
  
  return h;
}
function xgSched(secs){clearTimeout(XGT);var n=nav,tok=++n.tok;XGT=setTimeout(function wait(){if(nav!==n||n.tok!==tok||n.phase!=='play')return;if(document.getElementById('rwd')||document.getElementById('calov')){XGT=setTimeout(wait,3000);return}xgFail(true)},secs*1000)}
function xgNext(){var n=nav;if(n.view!=='xg')return;if(n.i+1>=n.rounds.length){xgEnd();return}n.i++;n.phase='play';render()}
function xgEnd(){
  var n=nav;n.phase='end';clearTimeout(XGT);rewardEnd('Easy lernen geschafft!');
    if(n.ok>=2)ach(n.child,'pairs');
  checkPassive(n.child);save(n.child);render();
}
function xgDone(good,msg){
  var n=nav,m=document.getElementById('xgm');n.phase='fb';clearTimeout(XGT);n.tok++;
  if(good){n.ok++}else{n.miss++}
  logAnswer(n.child,good);
  var hh=document.getElementById('xgh');if(hh)hh.innerHTML=xgHearts(n);
  if(m){m.className='xg-msg '+(good?'ok':'bad');m.textContent=msg}
  setTimeout(function(){if(nav===n)xgNext()},(good?1000:1900)+(msg.length>16?msg.length*45:0));
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
  xgDone(good,(good?'Richtig!':'Leider falsch.')+(r.why&&r.why.length>2&&r.why!==r.ans?' '+r.why:''));
};
ACT.xgt=function(b){
  var n=nav,r=n.rounds[n.i];if(n.phase!=='play'||b.disabled)return;
  var k=+b.dataset.i,ch=r.tiles[k].ch;
  if(ch===r.letters[r.pos]){
    var s=document.getElementById('xs'+r.pos);if(s){s.textContent=ch;s.classList.add('ok')}
    b.disabled=true;b.classList.add('used');r.pos++;
    if(r.pos>=r.letters.length)xgDone(true,r.wr?'Geschafft!':'Perfekt!');
  }else{
    r.wr++;n.miss+=0;b.classList.remove('shk');void b.offsetWidth;b.classList.add('shk');
    var hh=document.getElementById('xgm');if(hh){hh.className='xg-msg bad';hh.textContent='Falscher Buchstabe ('+r.wr+'/4)'}
    if(r.wr>=4)xgFail(false);
  }
};
