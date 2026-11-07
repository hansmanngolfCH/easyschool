
/* ---------- Bilder in den Aufgaben ---------- */
function capt(s){return /\{[0-7]\|/.test(String(s))?rt(s):esc(s)}
function vDots(v){var g='';for(var i=0;i<v.groups;i++)g+='<span class="grp">'+'<i class="dot"></i>'.repeat(v.size)+'</span>';
  return '<figure class="vis"><div class="dots">'+g+'</div><figcaption>'+v.groups+' Gruppen mit je '+v.size+': '+v.groups+' · '+v.size+' = '+(v.groups*v.size)+'</figcaption></figure>'}
function vPie(v){var r=46,cx=50,cy=50,p=v.parts,s='';
  for(var i=0;i<p;i++){var a0=-Math.PI/2+i*2*Math.PI/p,a1=-Math.PI/2+(i+1)*2*Math.PI/p;
    var d=p===1?'M'+(cx-r)+' '+cy+'a'+r+' '+r+' 0 1 0 '+(2*r)+' 0a'+r+' '+r+' 0 1 0 '+(-2*r)+' 0z':'M'+cx+' '+cy+'L'+(cx+r*Math.cos(a0)).toFixed(2)+' '+(cy+r*Math.sin(a0)).toFixed(2)+'A'+r+' '+r+' 0 0 1 '+(cx+r*Math.cos(a1)).toFixed(2)+' '+(cy+r*Math.sin(a1)).toFixed(2)+'Z';
    s+='<path d="'+d+'" class="'+(i<v.filled?'pf':'pe')+'"/>'}
  return '<figure class="vis pie"><svg viewBox="0 0 100 100" role="img" aria-label="'+v.filled+' von '+p+' Teilen gefärbt">'+s+'</svg>'+(v.nocap?'':'<figcaption>'+(/\{[0-7]\|/.test(v.cap||'')?rt(v.cap):rt(v.filled+'/'+p))+'</figcaption>')+'</figure>'}
function vLine(v){var x0=24,x1=576,y=58,n=Math.round((v.max-v.min)/v.step);
  function X(i){return x0+(x1-x0)*i/n}
  var s='<line x1="'+(x0-8)+'" x2="'+(x1+8)+'" y1="'+y+'" y2="'+y+'" class="nl"/>';
  for(var i=0;i<=n;i++){s+='<line x1="'+X(i)+'" x2="'+X(i)+'" y1="'+(y-9)+'" y2="'+(y+9)+'" class="nl" stroke-width="3.2"/><text x="'+X(i)+'" y="'+(y+36)+'" text-anchor="middle" class="nt" style="font-size:'+Math.max(18,Math.min(30,(x1-x0)/n/(String(v.max).length*.62+.25)))+'px;font-weight:800;fill:#1F2937">'+(v.min+i*v.step)+'</text>';
    if(i<n){var xm=(X(i)+X(i+1))/2;s+='<path d="M'+X(i)+' '+(y-8)+'Q'+xm+' '+(y-40)+' '+X(i+1)+' '+(y-8)+'" class="hop"/>'}}
  return '<figure class="vis" style="width:100%"><div class="scroll" style="width:100%"><svg viewBox="0 0 600 104" class="nlsvg" role="img" aria-label="Zahlenstrahl in '+v.step+'er-Schritten">'+s+'</svg></div><figcaption>Immer '+v.step+' weiter</figcaption></figure>'}
function vPairs(v){return '<div class="pairs">'+v.items.map(function(p){return '<div>'+(p[2]?'<span class="em" aria-hidden="true">'+p[2]+'</span>':'')+'<span class="tx"><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></span></div>'}).join('')+'</div>'}
function curLang(){var t=nav.topicId&&topicById(nav.topicId);return t?(LANG[t.subject]||'en-GB'):'en-GB'}
function vFlip(v){
  var lg=curLang();
  return '<div class="flipgrid">'+v.items.map(function(p){
    return '<div class="flipc" data-act="flip" role="button" tabindex="0">'+(v.nospk?'':'<button class="spk" data-act="speak" data-t="'+esc(p[0])+'" data-lang="'+lg+'" aria-label="Anhören">&#128266;</button>')+(p[2]?'<span class="em" aria-hidden="true">'+p[2]+'</span>':'')+'<b>'+esc(p[0])+'</b>'+(p[3]?'<span class="pr">['+esc(p[3])+']</span>':'')+'<span class="hintline">'+(v.nospk?'Tippen zum Drehen':'Tippen zum Aufdecken')+'</span><span class="back">'+esc(p[1])+'</span></div>'}).join('')+'</div>';
}
function vLines(v){return '<div class="lines'+(v.num?' num':'')+'">'+v.items.map(function(p){return '<div class="ln">'+(function(l){return l?'<em>'+rt(l)+'</em>':''})(p[1]&&v.num?String(p[1]).replace(/^Schritt \d+:?\s*/,''):p[1])+'<code>'+rt(p[0])+'</code>'+(p[2]?'<span class="lex"><b>'+esc(p[3]||'Beispiel')+'</b> '+rt(p[2])+'</span>':'')+'</div>'}).join('')+'</div>'}
function vImg(v){return '<figure class="vis"><img class="pic" src="'+esc(v.src)+'" alt="'+esc(v.alt||'')+'"></figure>'}
/* ---------- Grössen-Visualisierungen (Länge, Gewicht, Diagramme) ---------- */
var VC=['#34A853','#4285F4','#FBBC04','#EA4335'];
function vBar(v){
  var tot=0,x=8,W=584,g=4,s='',n=v.segs.length,id='br'+(++_guid),pct=false;v.segs.forEach(function(q){tot+=q[0];if(/%/.test(q[1]||''))pct=true});
  s+='<defs><clipPath id="'+id+'"><rect x="8" y="12" width="584" height="46" rx="15"/></clipPath></defs><rect x="8" y="12" width="584" height="46" rx="15" fill="#EEF1F6"/><g clip-path="url(#'+id+')">';
  v.segs.forEach(function(q,k){
    var w=(W-g*(n-1))*q[0]/tot,col=q[2]===-1?'#D5DAE3':(typeof q[2]==='number'&&q[2]>=0)?DC[q[2]%8]:VC[((v.col||0)+k%2)%4];
    s+='<rect x="'+x.toFixed(1)+'" y="12" width="'+w.toFixed(1)+'" height="46" fill="'+col+'"/><rect x="'+x.toFixed(1)+'" y="12" width="'+w.toFixed(1)+'" height="17" fill="#fff" opacity=".16"/>';
    if(q[1]&&w>24)s+='<text x="'+(x+w/2).toFixed(1)+'" y="42" text-anchor="middle" font-size="'+Math.max(10,Math.min(25,Math.floor((w-8)/(String(q[1]).length*.62))))+'" font-weight="800" fill="#fff" '+'font-family="Arial,Helvetica,sans-serif"'+'>'+esc(q[1])+'</text>';
    x+=w+g;
  });
  s+='</g>';
  var y2=70;
  if(pct&&Math.abs(tot-100)<.01){[0,25,50,75,100].forEach(function(p){var px=8+W*p/100;s+='<line x1="'+px+'" y1="64" x2="'+px+'" y2="72" stroke="#9AA3B2" stroke-width="2" stroke-linecap="round"/><text x="'+(p===0?px+2:p===100?px-2:px)+'" y="90" text-anchor="'+(p===0?'start':p===100?'end':'middle')+'" font-size="19" font-weight="700" fill="#6B7385" '+'font-family="Arial,Helvetica,sans-serif"'+'>'+p+' %</text>'});y2=100}
  else{s+='<path d="M9 66v8h582v-8" fill="none" stroke="#9AA3B2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';y2=88}
  var H=y2+(v.cap?50:10);
  if(v.cap){var cw=Math.min(580,Math.max(120,String(v.cap).length*13.5+34));s+='<rect x="'+(300-cw/2)+'" y="'+(y2+4)+'" width="'+cw+'" height="38" rx="19" fill="#F1F3F8"/><text x="300" y="'+(y2+31)+'" text-anchor="middle" font-size="23" font-weight="800" fill="#2B3350" '+'font-family="Arial,Helvetica,sans-serif"'+'>'+esc(v.cap)+'</text>'}
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+H+'" width="100%" style="display:block;max-width:600px;margin:0 auto" role="img" aria-label="'+esc(v.cap||'Balken')+'">'+s+'</svg></figure>';
}
function vConv(v){
  var s='<rect x="14" y="40" width="170" height="70" rx="18" fill="'+VC[1]+'"/><text x="99" y="87" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(v.from)+'</text>'
   +'<rect x="416" y="40" width="170" height="70" rx="18" fill="'+VC[0]+'"/><text x="501" y="87" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(v.to)+'</text>';
  s+='<path d="M190 58h200" stroke="#EA4335" stroke-width="6" stroke-linecap="round"/><path d="M376 44l16 14-16 14" fill="none" stroke="#EA4335" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><text x="300" y="46" text-anchor="middle" font-size="26" font-weight="800" fill="#EA4335" font-family="Arial,sans-serif">'+esc(v.up)+'</text>';
  s+='<path d="M410 94H210" stroke="#F9AB00" stroke-width="6" stroke-linecap="round"/><path d="M224 80l-16 14 16 14" fill="none" stroke="#F9AB00" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><text x="300" y="130" text-anchor="middle" font-size="26" font-weight="800" fill="#B06000" font-family="Arial,sans-serif">'+esc(v.down)+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 146" width="100%" role="img" aria-label="'+esc(v.from)+' mal '+esc(v.up)+' zu '+esc(v.to)+'">'+s+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vBars(v){
  var max=0,n=v.items.length,bw=100,gap=(600-n*bw)/(n+1),s='',top=Math.ceil(Math.max.apply(null,v.items.map(function(q){return q[1]}))/2)*2,k;
  for(k=0;k<=top;k+=2)s+='<line x1="34" x2="590" y1="'+(170-k*140/top)+'" y2="'+(170-k*140/top)+'" stroke="#E8EAED" stroke-width="2"/>';
  v.items.forEach(function(q,i){
    var h=q[1]*140/top,x=30+gap*(i+1)+bw*i-20+10;x=gap*(i+1)+bw*i+20;
    s+='<rect x="'+x.toFixed(1)+'" y="'+(170-h).toFixed(1)+'" width="'+bw+'" height="'+h.toFixed(1)+'" rx="8" fill="'+['#34A853','#4285F4','#F29900','#9334E6'][i%4]+'"/><text x="'+(x+bw/2).toFixed(1)+'" y="'+(160-h).toFixed(1)+'" text-anchor="middle" font-size="30" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+q[1]+'</text>';
    var w=String(q[0]).split(' '),l1=w.slice(0,Math.ceil(w.length/2)).join(' '),l2=w.slice(Math.ceil(w.length/2)).join(' ');
    s+='<text x="'+(x+bw/2).toFixed(1)+'" y="194" text-anchor="middle" font-size="18" font-weight="700" fill="#3c4043" font-family="Arial,sans-serif">'+esc(l1)+'</text><text x="'+(x+bw/2).toFixed(1)+'" y="214" text-anchor="middle" font-size="18" font-weight="700" fill="#3c4043" font-family="Arial,sans-serif">'+esc(l2)+'</text>';
  });
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 640 224" width="100%" role="img" aria-label="Säulendiagramm">'+s+'</svg>'+(v.unit?'<figcaption>Anzahl '+esc(v.unit)+'</figcaption>':'')+'</figure>';
}
function vScale(v){
  var t=v.tilt||0,dy=t*14,s='<path d="M300 150v-96" stroke="#5f6368" stroke-width="8" stroke-linecap="round"/><path d="M250 156h100" stroke="#5f6368" stroke-width="10" stroke-linecap="round"/><circle cx="300" cy="50" r="10" fill="#EA4335"/>'
   +'<path d="M130 '+(50-dy)+'L470 '+(50+dy)+'" stroke="#202124" stroke-width="7" stroke-linecap="round"/>';
  function pan(x,y,txt,em,col){return '<path d="M'+x+' '+y+'l-48 78h96z" fill="none" stroke="#9aa0a6" stroke-width="3"/><path d="M'+(x-62)+' '+(y+78)+'h124a62 30 0 0 1-124 0z" fill="'+col+'"/><text x="'+x+'" y="'+(y+68)+'" text-anchor="middle" font-size="40" font-family="Arial,sans-serif">'+(em||'')+'</text><text x="'+x+'" y="'+(y+140)+'" text-anchor="middle" font-size="24" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+esc(txt)+'</text>'}
  s+=pan(130,50-dy,v.l,v.le,VC[1])+pan(470,50+dy,v.r,v.re,VC[0]);
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 250" width="100%" role="img" aria-label="Waage: '+esc(v.l)+' und '+esc(v.r)+'">'+s+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vPill(x,y,t,col){var w=Math.max(34,String(t).length*10.5+16),q=String(t).indexOf('?')>=0;return '<g><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-15)+'" width="'+w.toFixed(1)+'" height="28" rx="10" fill="'+(q?'#FFD93D':'#fff')+'" stroke="'+(q?'#fff':col)+'" stroke-width="2.5"/><text x="'+x.toFixed(1)+'" y="'+(y+5)+'" text-anchor="middle" font-size="16" font-weight="800" fill="'+(q?'#4a2a00':col)+'" font-family="Arial,sans-serif">'+esc(t)+'</text></g>'}
function vTri(v){
  var na=v.na,nb=v.nb,pw=function(t){return Math.max(34,String(t).length*10.5+16)},la=v.la||'a',lb=v.lb||'b',lc=v.lc||'c',
  s=Math.min(190/nb,130/na),A=[pw(la)+22,168],B=[A[0]+nb*s,168],C=[A[0],168-na*s],W=Math.round(Math.max(B[0]+pw(lc)/2+10,B[0]+16)),
  cA='#4285F4',cB='#34A853',cC='#9334E6';
  var o='<polygon points="'+A+' '+B+' '+C+'" fill="#FFF8E1"/><path d="M'+A+'L'+C+'" stroke="'+cA+'" stroke-width="6" stroke-linecap="round"/><path d="M'+A+'L'+B+'" stroke="'+cB+'" stroke-width="6" stroke-linecap="round"/><path d="M'+C+'L'+B+'" stroke="'+cC+'" stroke-width="6" stroke-linecap="round"/><path d="M'+A[0]+' '+(A[1]-16)+'h16v16" fill="none" stroke="#5f6368" stroke-width="3"/>';
  o+=vPill(A[0]-pw(la)/2-10,(A[1]+C[1])/2,la,cA)+vPill((A[0]+B[0])/2,A[1]+22,lb,cB)+vPill((B[0]+C[0])/2+pw(lc)/2*.7,(B[1]+C[1])/2-14,lc,cC);
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' 205" width="100%" style="max-width:'+W+'px" role="img" aria-label="Rechtwinkliges Dreieck">'+o+'</svg></figure>';
}
function vPyth(v){
  var na=v.na,nb=v.nb,s=100/Math.max(na,nb),ax=0,ay=0,Bx=nb*s,Cy=-na*s,nx=na*s,ny=-nb*s,pts=[[0,0],[Bx,0],[0,Cy],[Bx,Bx],[0,Bx],[-na*s,Cy],[-na*s,0],[Bx+nx,ny],[nx,Cy+ny]],
  x0=Math.min.apply(null,pts.map(function(p){return p[0]}))-8,x1=Math.max.apply(null,pts.map(function(p){return p[0]}))+8,y0=Math.min.apply(null,pts.map(function(p){return p[1]}))-8,y1=Math.max.apply(null,pts.map(function(p){return p[1]}))+8;
  function P(a){return a.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')}
  function cen(a){var x=0,y=0;a.forEach(function(p){x+=p[0];y+=p[1]});return [x/a.length,y/a.length]}
  var sa=[[0,Cy],[-na*s,Cy],[-na*s,0],[0,0]],sb=[[0,0],[Bx,0],[Bx,nb*s],[0,nb*s]],sc=[[0,Cy],[Bx,0],[Bx+nx,ny],[nx,Cy+ny]],o='';
  o+='<polygon points="'+P(sa)+'" fill="#4285F4" fill-opacity=".85" stroke="#fff" stroke-width="2"/><polygon points="'+P(sb)+'" fill="#34A853" fill-opacity=".85" stroke="#fff" stroke-width="2"/><polygon points="'+P(sc)+'" fill="#EA4335" fill-opacity=".85" stroke="#fff" stroke-width="2"/><polygon points="0,0 '+Bx+',0 0,'+Cy+'" fill="#FFF8E1" stroke="#3c4043" stroke-width="2.5" stroke-linejoin="round"/>';
  [[sa,v.fa||('a² = '+na*na)],[sb,v.fb||('b² = '+nb*nb)],[sc,v.fc||('c² = '+(na*na+nb*nb))]].forEach(function(q){var c=cen(q[0]);o+='<text x="'+c[0].toFixed(1)+'" y="'+(c[1]+6).toFixed(1)+'" text-anchor="middle" font-size="'+Math.max(14,Math.min(20,s*4))+'" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(q[1])+'</text>'});
  return '<figure class="vis" style="width:100%"><svg viewBox="'+x0.toFixed(0)+' '+y0.toFixed(0)+' '+(x1-x0).toFixed(0)+' '+(y1-y0).toFixed(0)+'" width="100%" style="max-width:340px" role="img" aria-label="Quadrate auf den Seiten des Dreiecks">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vRect(v){
  var s=Math.min(220/v.w,120/v.h),W=v.w*s,H=v.h*s,x=40,y=24,o='<rect x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'" rx="4" fill="#E8F0FE" stroke="#4285F4" stroke-width="5"/><path d="M'+x+' '+(y+H)+'L'+(x+W)+' '+y+'" stroke="#9334E6" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round"/>';
  o+=vPill(x+W/2,y+H+22,v.lw,'#34A853')+vPill(x-6,y+H/2,v.lh,'#4285F4')+vPill(x+W/2+10,y+H/2-10,v.ld||'d','#9334E6');
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+Math.round(W+90)+' '+Math.round(H+68)+'" width="100%" style="max-width:'+Math.round(W+90)+'px" role="img" aria-label="Rechteck mit Diagonale">'+o+'</svg></figure>';
}
function vFbar(v){
  var s='',y=6;
  v.rows.forEach(function(r){
    var n=r[0],k=r[1],w=440/n,i;
    s+='<text x="8" y="'+(y+27)+'" font-size="19" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+esc(r[2]||(k+'/'+n))+'</text>';
    for(i=0;i<n;i++)s+='<rect x="'+(152+i*w).toFixed(1)+'" y="'+y+'" width="'+(w-3).toFixed(1)+'" height="38" rx="7" fill="'+(i<k?['#34A853','#4285F4','#FBBC04','#9334E6'][(r[3]||0)%4]:'#EEF1F7')+'"/>';
    y+=50;
  });
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+y+'" width="100%" role="img" aria-label="Bruchstreifen">'+s+'</svg></figure>';
}

/* ---------- Deutsch-Theorie: Tabellen und Grafiken (v4.42) ---------- */
var DC=['#4285F4','#EA4335','#34A853','#F29900','#9334E6','#00A5BF','#D93F8E','#6B7280','#8D5A2B','#D9A400','#E8710A'];
var DE=false,DM=[8,0,9,2,10,5,6,7];
function isDeu(){try{var q=nav.queue&&nav.queue[nav.idx]||'';return nav.subject==='deu'||/-deu-/.test((nav.topicId||'')+' '+(nav.scope||'')+' '+q)}catch(e){return false}}
function dcol(i){if(typeof i==='string'&&i.charAt(0)==='#')return i;i=(i|0)%8;return DC[DE?DM[i]:i]}
function bd(s){return rt(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}
function vTbl(v){
  var h=v.head?'<thead><tr>'+v.head.map(function(x,k){var c=(k>0&&v.hc)?' style="--c:'+dcol(v.hc[k-1])+'" class="hc"':'';return '<th'+c+'>'+bd(x)+'</th>'}).join('')+'</tr></thead>':'';
  var b='<tbody>'+v.rows.map(function(r,i){var mk=/^\{(\d)\|/.exec(String(r[0])),c=dcol(v.c?v.c[i]:(mk?+mk[1]:(DE?7:i)));return '<tr style="--c:'+c+'">'+r.map(function(x,k){return k===0?'<th scope="row"><span>'+bd(x)+'</span></th>':'<td data-l="'+esc(v.head&&v.head[k]||'')+'">'+bd(x)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>';
  return '<div class="dtb"><table class="'+(v.hc?'nh':'')+'">'+h+b+'</table></div>'+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'');
}
function vChips(v){
  return '<div class="dchw"><div class="dch">'+v.parts.map(function(p){return '<div class="dc'+(/^[+−×:=<>➜→≈\-]$/.test(String(p[0]).trim())?' op':'')+(p[2]===7?' neu':'')+'" style="--c:'+dcol(p[2])+'"><b>'+bd(p[0])+'</b>'+(p[1]?'<i>'+bd(p[1])+'</i>':'')+'</div>'}).join('')+'</div>'+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'')+'</div>';
}
function vTline(v){
  return '<ol class="dtl">'+v.items.map(function(p,i){return '<li class="'+(i===v.now?'now':'')+'" style="--c:'+dcol(p[3])+'"><span class="dot"></span><div><b>'+bd(p[0])+'</b><span>'+bd(p[1])+'</span>'+(p[2]?'<em>'+bd(p[2])+'</em>':'')+'</div></li>'}).join('')+'</ol>';
}
function vAnno(v){
  return '<div class="anno">'+v.groups.map(function(g){var c=g[2]===''||g[2]===undefined?null:dcol(g[2]);
    return '<div class="ag"'+(c?' style="--c:'+c+'"':'')+'><b class="at">'+bd(g[0])+'</b>'+(g[1]?'<svg class="aa" viewBox="0 0 16 34" aria-hidden="true"><path d="M8 33V5M2 11L8 3l6 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><b class="al">'+bd(g[1])+'</b>':'')+(g[3]?'<span class="as">'+bd(g[3])+'</span>':'')+'</div>'}).join('')+'</div>'+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'');
}
function vFlow(v){
  return '<ol class="dfl">'+v.steps.map(function(p,i){if(typeof p==='string')p=[p,''];return '<li style="--c:'+dcol(p[2]===undefined?i:p[2])+'"><span class="n">'+(i+1)+'</span><div><b>'+bd(p[0])+'</b><span>'+bd(p[1])+'</span></div></li>'}).join('')+'</ol>';
}
/* ---------- Fokus-Grafik «hl» (v5.x): markiert genau den Teil, um den es im Schritt geht ----------
   {"type":"hl","rows":["[D|Satzanfang]ie kleine [E|Nomen]nte schwimmt."],"cap":"…","c":1,"align":"l","size":"m"}
   Markierung: [Text] · [Text|Label] · [Text|Farbe 0–7] · [Text|Label|Farbe 0–7] · [~Text~|Label] = durchgestrichen. Zeile auch als [Text, Notiz]. */
function vHl(v){
  var DEF=v.c!==undefined?v.c:(DE?1:0),rows=(v.rows||[]).map(function(r){return typeof r==='string'?[r,'']:r});
  var RX=/\[([^\]|]+)(?:\|([^\]|]*))?(?:\|(\d))?\]/g;
  function plain(t){return String(t).replace(RX,function(m,a){return a.replace(/^~|~$/g,'')})}
  var ml=Math.max.apply(null,rows.map(function(r){return plain(r[0]).length+(r[1]?String(r[1]).length*.6+2:0)}).concat([1])),sz=v.size||(ml>34?'s':ml>20?'m':'l');
  function row(r){
    var src=String(r[0]),toks=[],last=0,m;RX.lastIndex=0;
    while((m=RX.exec(src))){if(m.index>last)toks.push({t:src.slice(last,m.index)});var l2=m[2]||'',c2=m[3];if(c2===undefined&&/^\d$/.test(l2)){c2=l2;l2=''}toks.push({t:m[1],m:1,l:l2,c:c2!==undefined?+c2:DEF});last=RX.lastIndex}
    if(last<src.length)toks.push({t:src.slice(last)});
    var words=[[]];
    toks.forEach(function(k){if(k.m){words[words.length-1].push(k);return}
      k.t.split(/(\s+)/).forEach(function(p,i){if(!p)return;if(/^\s+$/.test(p)){words.push([]);return}words[words.length-1].push({t:p})})});
    var h=words.filter(function(w){return w.length}).map(function(w){
      var labs=[],seg=w.map(function(k){if(!k.m)return '<span class="hlx-n">'+esc(k.t)+'</span>';
        var col=dcol(k.c),st=/^~.*~$/.test(k.t),tx=st?k.t.slice(1,-1):k.t;if(k.l)labs.push('<i style="--c:'+col+'">'+esc(k.l)+'</i>');
        return '<b class="hlx-m'+(st?' st':'')+(/^[,.;:!?]$/.test(tx)?' pu':'')+'" style="--c:'+col+'">'+esc(tx)+'</b>'}).join('');
      return '<span class="hlx-w"><span class="hlx-s">'+seg+'</span>'+(labs.length?'<span class="hlx-lb">'+labs.join('')+'</span>':'')+'</span>'}).join('');
    return r[1]?'<div class="hlx-r hn"><span class="hlx-note">'+bd(r[1])+'</span><span class="hlx-c">'+h+'</span></div>':'<div class="hlx-r">'+h+'</div>'}
  return '<div class="hlv sz-'+sz+(v.align==='l'?' al':'')+(v.dim?' dim':'')+'">'+rows.map(row).join('')+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'')+'</div>';
}
function vCards(v){
  return '<div class="dcd">'+v.items.map(function(p){return '<div class="dk" style="--c:'+dcol(p[3])+'"><h4>'+bd(p[0])+'</h4><p class="q">'+bd(p[1])+'</p><p class="e">'+bd(p[2])+'</p></div>'}).join('')+'</div>';
}

function vAreaOld(v){
  var W=200,H=150,x0=66,y0=34,cw=W/v.c,chh=H/v.r,o='',i,j;
  for(i=0;i<v.c;i++)for(j=0;j<v.r;j++){var a=i<v.a,b=j<v.b,f=a&&b?'#9334E6':a?'#8AB4F8':b?'#81C995':'#EEF1F7';o+='<rect x="'+(x0+i*cw).toFixed(1)+'" y="'+(y0+j*chh).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="'+chh.toFixed(1)+'" fill="'+f+'" stroke="#fff" stroke-width="2"/>'}
  o+='<text x="'+(x0+v.a*cw/2)+'" y="22" text-anchor="middle" font-size="17" font-weight="800" fill="#1A56C8" font-family="Arial,sans-serif">'+esc(v.la)+'</text>';
  o+='<text x="'+(x0-8)+'" y="'+(y0+v.b*chh/2+6)+'" text-anchor="end" font-size="17" font-weight="800" fill="#188038" font-family="Arial,sans-serif">'+esc(v.lb)+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 292 200" width="100%" style="max-width:300px" role="img" aria-label="Flächenmodell fürs Malnehmen">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* ---------- Primar-Visuals (v4.47) ---------- */
function vEmo(v){
  var g=v.grp||5;
  return '<figure class="vis emo"><div class="emorows">'+v.rows.map(function(r,ri){var o='',i,grp='';
    for(i=0;i<r[1];i++){grp+='<span class="e1'+(v.x&&i>=r[1]-v.x?' xd':'')+'" aria-hidden="true">'+r[0]+'</span>';
      if(!g||(i+1)%g===0||i===r[1]-1){o+='<span class="eb c'+(ri%4)+(g?'':' nb')+'">'+grp+'</span>';grp=''}}
    return '<div class="emorow" role="img" aria-label="'+r[1]+' Stück">'+o+'</div>'}).join('')+'</div>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vField(v){
  var P=30,G=10,cols=v.cols,rows=v.rows,W=cols*P+Math.floor((cols-1)/5)*G+16,H=rows*P+16,k=0,o='',i,j,
  gx=function(c){return 8+c*P+Math.floor(c/5)*G+P/2},
  FV=VC.concat(['#5B6270']),fi=function(c){return c===4||c===7?4:(c||0)%4};
  o+='<defs>'+FV.map(function(c,n){return '<radialGradient id="fg'+n+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="'+c+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".78"/></radialGradient>'}).join('')+'<filter id="fsh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-opacity=".35"/></filter></defs>';
  o+='<rect x="1.5" y="1.5" width="'+(W-3)+'" height="'+(H-3)+'" rx="12" fill="#F4F7FB" stroke="#5F6B7A" stroke-width="3"/>';
  for(j=0;j<rows;j++)for(i=0;i<cols;i++){var cx=gx(i),cy=8+j*P+P/2,f=null;
    o+='<rect x="'+(cx-P/2+2)+'" y="'+(cy-P/2+2)+'" width="'+(P-4)+'" height="'+(P-4)+'" rx="6" fill="#fff" stroke="#C5CCD6" stroke-width="1.5"/>';
    if(k<v.filled)f=fi(v.col);else if(v.filled2&&k<v.filled+v.filled2)f=fi(v.col2===undefined?1:v.col2);
    if(f!==null)o+='<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="url(#fg'+f+')" stroke="'+FV[f]+'" stroke-width="1.5" filter="url(#fsh)"/><ellipse cx="'+(cx-3.5)+'" cy="'+(cy-4)+'" rx="3.6" ry="2.2" fill="#fff" fill-opacity=".55"/>';
    k++}
  for(i=5;i<cols;i+=5)o+='<line x1="'+(gx(i)-P/2-G/2)+'" x2="'+(gx(i)-P/2-G/2)+'" y1="6" y2="'+(H-6)+'" stroke="#5F6B7A" stroke-width="2.5" stroke-dasharray="3 4"/>';
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(520,W*1.9)+'px" role="img" aria-label="Punktefeld">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vClock(v){
  /* klare Schuluhr: dunkle Ziffern, kurzer dicker Stundenzeiger (dunkel), langer dünner Minutenzeiger (blau) */
  var o='<defs><radialGradient id="ckb" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#5E97F6"/><stop offset="1" stop-color="#1A56C4"/></radialGradient><filter id="cks" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1.5" dy="2.5" stdDeviation="1.6" flood-opacity=".35"/></filter></defs>';
  o+='<circle cx="110" cy="110" r="106" fill="url(#ckb)"/><circle cx="110" cy="110" r="91" fill="#FFFFFF"/><circle cx="110" cy="110" r="91" fill="none" stroke="#DCE3EE" stroke-width="2"/>';
  var i,a;
  for(i=0;i<60;i++){a=i*Math.PI/30;var big=i%5===0,r1=big?76:82;o+='<line x1="'+(110+r1*Math.sin(a)).toFixed(1)+'" y1="'+(110-r1*Math.cos(a)).toFixed(1)+'" x2="'+(110+88*Math.sin(a)).toFixed(1)+'" y2="'+(110-88*Math.cos(a)).toFixed(1)+'" stroke="'+(big?'#1F2937':'#B4BCC8')+'" stroke-width="'+(big?3.4:1.4)+'" stroke-linecap="round"/>'}
  for(i=1;i<=12;i++){a=i*Math.PI/6;
    o+='<text x="'+(110+62*Math.sin(a)).toFixed(1)+'" y="'+(110-62*Math.cos(a)+8).toFixed(1)+'" text-anchor="middle" font-size="22" font-weight="800" fill="#1F2937" font-family="Arial,sans-serif">'+i+'</text>';
    if(!v.nomin)o+='<text x="'+(110+98.5*Math.sin(a)).toFixed(1)+'" y="'+(110-98.5*Math.cos(a)+3.5).toFixed(1)+'" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+(i*5)+'</text>'}
  var m=v.m||0,ha=((v.h%12)+m/60)*Math.PI/6,ma=m*Math.PI/30;
  function hand(ang,len,w,tail,col,tip){var s=Math.sin(ang),c=Math.cos(ang),px=c*w,py=s*w;
    return '<path d="M'+(110-s*tail+px*.7).toFixed(1)+','+(110+c*tail+py*.7).toFixed(1)+' L'+(110+s*(len-tip)+px).toFixed(1)+','+(110-c*(len-tip)+py).toFixed(1)+' L'+(110+s*len).toFixed(1)+','+(110-c*len).toFixed(1)+' L'+(110+s*(len-tip)-px).toFixed(1)+','+(110-c*(len-tip)-py).toFixed(1)+' L'+(110-s*tail-px*.7).toFixed(1)+','+(110+c*tail-py*.7).toFixed(1)+'Z" fill="'+col+'" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>'}
  o+='<g filter="url(#cks)">'+hand(ha,46,7,12,'#1F2937',12)+hand(ma,80,4,16,'#1A73E8',10)+'</g><circle cx="110" cy="110" r="8" fill="#1F2937" stroke="#fff" stroke-width="2.5"/><circle cx="110" cy="110" r="2.5" fill="#1A73E8"/>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 220 220" width="230" height="230" style="display:block;margin:0 auto;max-width:100%" role="img" aria-label="Uhr">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

var NOTEC={10:['#FFF3B0','#F2CB2E','#7A5C00'],20:['#FFD0D0','#EA5A5A','#7A1212'],50:['#D5F0D0','#4DB45A','#14532D'],100:['#D2E3FC','#4285F4','#0B3A8A']};
function vCoins(v){
  return '<figure class="vis"><div class="coins">'+v.items.map(function(r){var o='',i,fr=r[1]==='Fr',note=fr&&r[0]>=10;
    for(i=0;i<r[2];i++){
      if(note){var c=NOTEC[r[0]]||NOTEC[10];o+='<span class="note" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+');border-color:'+c[1]+';color:'+c[2]+'"><em>'+r[0]+'</em><b>'+r[0]+'</b><small>Franken</small><em class="r">'+r[0]+'</em></span>'}
      else{var sz=fr?(r[0]>=5?60:r[0]>=2?54:48):(r[0]>=20?50:r[0]>=10?44:40);o+='<span class="coin'+(fr?' fr':(r[0]===5?' br':''))+'" style="width:'+sz+'px;height:'+sz+'px"><span class="ci"><b>'+r[0]+'</b><small>'+(fr?'Franken':'Rappen')+'</small></span></span>'}}
    return o}).join('')+'</div>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vShapeOld(v){
  var c=VC[(v.col||0)%4],k=v.kind,o='<defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="'+c+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient><filter id="ssh" x="-20%" y="-20%" width="150%" height="150%"><feDropShadow dx="2" dy="3" stdDeviation="2.2" flood-opacity=".3"/></filter></defs>',
  fl='fill="url(#sg)" stroke="#2f3a4a" stroke-width="3.5" stroke-linejoin="round" filter="url(#ssh)"',
  ln='stroke="#2f3a4a" stroke-width="6" stroke-linecap="round" fill="none"';
  if(k==='kreis')o+='<circle cx="60" cy="60" r="46" '+fl+'/>';
  else if(k==='dreieck')o+='<polygon points="60,12 108,104 12,104" '+fl+'/>';
  else if(k==='quadrat')o+='<rect x="18" y="18" width="84" height="84" '+fl+'/>';
  else if(k==='rechteck')o+='<rect x="8" y="30" width="104" height="60" '+fl+'/>';
  else if(k==='viereck')o+='<polygon points="20,26 104,16 112,96 14,88" '+fl+'/>';
  else if(k==='rw')o+='<path d="M20 100V24M20 100H100" '+ln+'/><path d="M20 76h24v24H20z" fill="#EA4335" fill-opacity=".25"/><path d="M20 76h24v24" fill="none" stroke="#EA4335" stroke-width="4" stroke-linejoin="round"/><circle cx="29" cy="91" r="2.6" fill="#EA4335"/>';
  else if(k==='spitz')o+='<path d="M16 100L104 100L16 100L96 40Z" fill="#4285F4" fill-opacity=".18"/><path d="M52 100A36 36 0 0 0 44 76L16 100Z" fill="#FBBC04" fill-opacity=".5" stroke="#E37400" stroke-width="3"/><path d="M16 100H104M16 100L96 40" '+ln+'/>';
  else if(k==='stumpf')o+='<path d="M34 100A38 38 0 0 0 10 66L34 100Z" fill="#FBBC04" fill-opacity=".5" stroke="#E37400" stroke-width="3"/><path d="M34 100H106M34 100L-4 36" '+ln+'/>';
  if(v.axis==='v')o+='<line x1="60" y1="4" x2="60" y2="116" stroke="#EA4335" stroke-width="3" stroke-dasharray="7 5"/>';
  if(v.axis==='h')o+='<line x1="4" y1="60" x2="116" y2="60" stroke="#EA4335" stroke-width="3" stroke-dasharray="7 5"/>';
  return '<figure class="vis shp"><svg viewBox="0 0 120 120" width="100%" style="max-width:112px;overflow:visible" role="img" aria-label="'+esc(v.alt||k)+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
/* ---------- Geometrie-Grafiken (v4.98): genau gezeichnet ---------- */
var _guid=0;
function _t(x,y,s,txt,c,anc,w){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anc||'middle')+'" font-size="'+s+'" font-weight="'+(w||800)+'" fill="'+c+'" font-family="Arial,Helvetica,sans-serif">'+esc(txt)+'</text>'}
function _dim(x1,y1,x2,y2,lab,c,off,side){ // Masslinie mit Pfeilen und Beschriftung
  var id='dm'+(++_guid),dx=x2-x1,dy=y2-y1,L=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/L,ny=dx/L,s='';
  s+='<defs><marker id="'+id+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="'+c+'"/></marker></defs>';
  s+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+c+'" stroke-width="2" marker-start="url(#'+id+')" marker-end="url(#'+id+')"/>';
  var mx=(x1+x2)/2+nx*(off||0),my=(y1+y2)/2+ny*(off||0),w=Math.max(34,lab.length*8.5+14);
  s+='<rect x="'+(mx-w/2).toFixed(1)+'" y="'+(my-11).toFixed(1)+'" width="'+w.toFixed(1)+'" height="22" rx="11" fill="#fff" stroke="'+c+'" stroke-width="2"/>'+_t(mx.toFixed(1),(my+5).toFixed(1),13,lab,c);
  return s}
function _num(s){var m=String(s||'').match(/[\d.,]+/);return m?parseFloat(m[0].replace(',','.')):1}

/* Flächenmodell auf Häuschenpapier */
function vArea(v){
  if(v.a<v.c||v.b<v.r)return vAreaOld(v);
  var c=v.c,r=v.r,u=Math.min(38,200/c,128/r),w=c*u,h=r*u,x0=70,y0=44,o='',i,j;
  o+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+h+'" fill="#EFE3FC"/>';
  for(i=0;i<=c;i++)o+='<line x1="'+(x0+i*u)+'" y1="'+y0+'" x2="'+(x0+i*u)+'" y2="'+(y0+h)+'" stroke="#9334E6" stroke-opacity=".55" stroke-width="1.4"/>';
  for(j=0;j<=r;j++)o+='<line x1="'+x0+'" y1="'+(y0+j*u)+'" x2="'+(x0+w)+'" y2="'+(y0+j*u)+'" stroke="#9334E6" stroke-opacity=".55" stroke-width="1.4"/>';
  o+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+h+'" fill="none" stroke="'+(v.umf?'#E37400':'#5B21B6')+'" stroke-width="'+(v.umf?5:3)+'" stroke-linejoin="round"/>';
  o+=_dim(x0,y0-16,x0+w,y0-16,v.la,'#1A56C4',-2);
  o+=_dim(x0-16,y0,x0-16,y0+h,v.lb,'#188038',0);
  o+='<rect x="'+x0+'" y="'+(y0+h+14)+'" width="'+u*.55+'" height="'+u*.55+'" fill="#EFE3FC" stroke="#5B21B6" stroke-width="1.6"/>'+_t(x0+u*.55+8,y0+h+14+u*.55-2,12,'= 1 Kästchen = 1 cm²','#5B21B6','start',700);
  var W=x0+w+24,H=y0+h+14+u*.55+8;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+Math.max(W,292)+' '+H+'" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="Rechteck auf Häuschenpapier, '+esc(v.la)+' mal '+esc(v.lb)+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* Quader im Schrägbild mit Einheitswürfeln */
function vQuader(v){
  var L=Math.max(1,Math.round(_num(v.l))),B=Math.max(1,Math.round(_num(v.b))),H=Math.max(1,Math.round(_num(v.h))),
  k=.42,u=Math.min(36,190/(L+B*k),120/(H+B*k)),dx=u*k,dy=-u*k,m=44,x=m,y=m+B*dy*-1+H*u-H*u+0,o='';
  var ox=36,oy=24+B*u*k+H*u; // vorne unten links
  function fx(i,j){return ox+i*u+j*dx}
  function fy(i,j){return oy-i*0-j*u*k}
  var col=['#C9DBFB','#E8F0FE','#9FBFF5'];
  // Vorderseite l x h
  o+='<polygon points="'+ox+','+oy+' '+(ox+L*u)+','+oy+' '+(ox+L*u)+','+(oy-H*u)+' '+ox+','+(oy-H*u)+'" fill="'+col[0]+'"/>';
  // Oberseite l x b
  o+='<polygon points="'+ox+','+(oy-H*u)+' '+(ox+L*u)+','+(oy-H*u)+' '+(ox+L*u+B*dx)+','+(oy-H*u+B*dy)+' '+(ox+B*dx)+','+(oy-H*u+B*dy)+'" fill="'+col[1]+'"/>';
  // Seite b x h
  o+='<polygon points="'+(ox+L*u)+','+oy+' '+(ox+L*u+B*dx)+','+(oy+B*dy)+' '+(ox+L*u+B*dx)+','+(oy+B*dy-H*u)+' '+(ox+L*u)+','+(oy-H*u)+'" fill="'+col[2]+'"/>';
  var g='stroke="#1A56C4" stroke-opacity=".5" stroke-width="1.2"',i,j,kk;
  for(i=1;i<L;i++)o+='<line x1="'+(ox+i*u)+'" y1="'+oy+'" x2="'+(ox+i*u)+'" y2="'+(oy-H*u)+'" '+g+'/><line x1="'+(ox+i*u)+'" y1="'+(oy-H*u)+'" x2="'+(ox+i*u+B*dx)+'" y2="'+(oy-H*u+B*dy)+'" '+g+'/>';
  for(j=1;j<H;j++)o+='<line x1="'+ox+'" y1="'+(oy-j*u)+'" x2="'+(ox+L*u)+'" y2="'+(oy-j*u)+'" '+g+'/><line x1="'+(ox+L*u)+'" y1="'+(oy-j*u)+'" x2="'+(ox+L*u+B*dx)+'" y2="'+(oy-j*u+B*dy)+'" '+g+'/>';
  for(kk=1;kk<B;kk++)o+='<line x1="'+(ox+kk*dx)+'" y1="'+(oy-H*u+kk*dy)+'" x2="'+(ox+L*u+kk*dx)+'" y2="'+(oy-H*u+kk*dy)+'" '+g+'/><line x1="'+(ox+L*u+kk*dx)+'" y1="'+(oy+kk*dy)+'" x2="'+(ox+L*u+kk*dx)+'" y2="'+(oy-H*u+kk*dy)+'" '+g+'/>';
  // Schicht hervorheben (unterste v.layer Schichten) auf Vorder- und Seitenflaeche
  if(v.layer){var n=Math.min(v.layer,H);
    o+='<polygon points="'+ox+','+oy+' '+(ox+L*u)+','+oy+' '+(ox+L*u)+','+(oy-n*u)+' '+ox+','+(oy-n*u)+'" fill="#9334E6" fill-opacity=".38"/>';
    o+='<polygon points="'+(ox+L*u)+','+oy+' '+(ox+L*u+B*dx)+','+(oy+B*dy)+' '+(ox+L*u+B*dx)+','+(oy+B*dy-n*u)+' '+(ox+L*u)+','+(oy-n*u)+'" fill="#9334E6" fill-opacity=".38"/>';
    if(n>=H)o+='<polygon points="'+ox+','+(oy-H*u)+' '+(ox+L*u)+','+(oy-H*u)+' '+(ox+L*u+B*dx)+','+(oy-H*u+B*dy)+' '+(ox+B*dx)+','+(oy-H*u+B*dy)+'" fill="#9334E6" fill-opacity=".38"/>'}
  var E='stroke="#1A3FA0" stroke-width="2.6" stroke-linejoin="round" fill="none"';
  o+='<polygon points="'+ox+','+oy+' '+(ox+L*u)+','+oy+' '+(ox+L*u)+','+(oy-H*u)+' '+ox+','+(oy-H*u)+'" '+E+'/>';
  o+='<polygon points="'+ox+','+(oy-H*u)+' '+(ox+L*u)+','+(oy-H*u)+' '+(ox+L*u+B*dx)+','+(oy-H*u+B*dy)+' '+(ox+B*dx)+','+(oy-H*u+B*dy)+'" '+E+'/>';
  o+='<polygon points="'+(ox+L*u)+','+oy+' '+(ox+L*u+B*dx)+','+(oy+B*dy)+' '+(ox+L*u+B*dx)+','+(oy+B*dy-H*u)+' '+(ox+L*u)+','+(oy-H*u)+'" '+E+'/>';
  o+=_dim(ox,oy+16,ox+L*u,oy+16,v.l,'#137333',0);
  o+=_dim(ox+L*u+B*dx+14,oy+B*dy,ox+L*u+14,oy,v.b||'','#B06000',0);
  o+=_dim(ox-16,oy,ox-16,oy-H*u,v.h,'#E8710A',0);
  var W=ox+L*u+B*dx+62,Hh=oy+36;
  return '<figure class="vis"><svg viewBox="0 0 '+Math.max(W,300)+' '+Hh+'" width="100%" style="max-width:340px;display:block;margin:0 auto" role="img" aria-label="Quader '+esc(v.l)+' mal '+esc(v.b||'')+' mal '+esc(v.h)+' aus Einheitswürfeln">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* Ebene Figuren mit Spiegelachsen */
function vShape(v){
  var k=v.kind;
  if(k==='rw'||k==='spitz'||k==='stumpf')return vShapeOld(v);
  var c=VC[(v.col||0)%4],o='<defs><linearGradient id="sg'+(++_guid)+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".6" stop-color="'+c+'" stop-opacity=".55"/><stop offset="1" stop-color="'+c+'" stop-opacity=".8"/></linearGradient></defs>',gid='sg'+_guid,
  fl='fill="url(#'+gid+')" stroke="#2F3A4A" stroke-width="3.5" stroke-linejoin="round"',tk='stroke="#2F3A4A" stroke-width="2.6" stroke-linecap="round"',ax='stroke="#9334E6" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"';
  function tick(x,y,ang){return '<line x1="'+(x-5)+'" y1="'+y+'" x2="'+(x+5)+'" y2="'+y+'" '+tk+' transform="rotate('+ang+' '+x+' '+y+')"/>'}
  if(k==='kreis')o+='<circle cx="60" cy="60" r="46" '+fl+'/><circle cx="60" cy="60" r="2.8" fill="#2F3A4A"/>';
  else if(k==='dreieck'){o+='<polygon points="60,12 108,104 12,104" '+fl+'/>';o+=tick(84,58,-27)+tick(36,58,27)}
  else if(k==='dreieck_u')o+='<polygon points="22,100 104,86 40,18" '+fl+'/>';
  else if(k==='quadrat'){o+='<rect x="18" y="18" width="84" height="84" '+fl+'/>';o+=tick(60,18,0)+tick(60,102,0)+tick(18,60,90)+tick(102,60,90);
    o+='<path d="M18 30h12v-12M102 30h-12v-12M18 90h12v12M102 90h-12v12" fill="none" stroke="#2F3A4A" stroke-width="1.8"/>'}
  else if(k==='rechteck'){o+='<rect x="8" y="30" width="104" height="60" '+fl+'/>';o+=tick(60,30,0)+tick(60,90,0)+'<path d="M8 42h12V30M112 42h-12V30M8 78h12v12M112 78h-12v12" fill="none" stroke="#2F3A4A" stroke-width="1.8"/>'}
  else if(k==='viereck')o+='<polygon points="20,26 104,16 112,96 14,88" '+fl+'/>';
  var ex=1;
  function A(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" '+ax+'/><circle cx="'+x1+'" cy="'+y1+'" r="3" fill="#9334E6"/><circle cx="'+x2+'" cy="'+y2+'" r="3" fill="#9334E6"/>'}
  var axes=v.axes||(v.axis?[v.axis]:[]);
  if(axes==='many')axes=['v','h','d1','d2','e1','e2'];
  if(axes==='four')axes=['v','h','d1','d2'];
  if(axes.length&&axes.length>0)axes.forEach(function(a){
    if(a==='v')o+=A(60,5,60,115);else if(a==='h')o+=A(5,60,115,60);
    else if(a==='d1')o+=A(10,10,110,110);else if(a==='d2')o+=A(110,10,10,110);
    else if(a==='e1')o+=A(60-55*Math.cos(Math.PI/6),60-55*Math.sin(Math.PI/6),60+55*Math.cos(Math.PI/6),60+55*Math.sin(Math.PI/6));
    else if(a==='e2')o+=A(60-55*Math.cos(Math.PI/6),60+55*Math.sin(Math.PI/6),60+55*Math.cos(Math.PI/6),60-55*Math.sin(Math.PI/6))});
  return '<figure class="vis shp"><svg viewBox="0 0 120 120" width="100%" style="max-width:'+(v.big?150:112)+'px;overflow:visible" role="img" aria-label="'+esc(v.alt||k)+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* Symmetrie: Schmetterling, Buchstaben, Falten, Karopapier */
function vSymm(v){
  var k=v.kind,o='',vb='0 0 300 130',AX='stroke="#9334E6" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"',i,j;
  if(k==='butterfly'){
    vb='0 0 160 124';
    var wing='<path d="M80 58C94 22 140 6 151 32C158 50 126 64 80 62Z" fill="#4285F4" fill-opacity=".85" stroke="#1A3FA0" stroke-width="2.4"/><path d="M80 66C110 66 138 76 132 100C126 116 94 102 80 78Z" fill="#FBBC04" fill-opacity=".9" stroke="#B06000" stroke-width="2.4"/><circle cx="118" cy="36" r="9" fill="#fff" fill-opacity=".8"/><circle cx="114" cy="92" r="6" fill="#EA4335" fill-opacity=".85"/>';
    o+='<g>'+wing+'</g><g transform="translate(160 0) scale(-1 1)">'+wing+'</g><ellipse cx="80" cy="64" rx="4.6" ry="28" fill="#2F3A4A"/><path d="M80 38C76 24 68 16 62 12M80 38C84 24 92 16 98 12" stroke="#2F3A4A" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="62" cy="12" r="2.6" fill="#2F3A4A"/><circle cx="98" cy="12" r="2.6" fill="#2F3A4A"/>';
    o+='<line x1="80" y1="2" x2="80" y2="122" '+AX+'/>';
    o+=_t(30,118,12,'links','#1A3FA0','middle',700)+_t(130,118,12,'rechts','#1A3FA0','middle',700);
  }else if(k==='letters'){
    var rows=v.rows,n=rows.length,pw=54;vb='0 0 '+(n*pw+8)+' 100';
    rows.forEach(function(r,idx){var x=4+idx*pw,sym=r[1];
      o+='<rect x="'+(x+2)+'" y="4" width="'+(pw-6)+'" height="68" rx="10" fill="'+(sym?'#E6F4EA':'#FCE8E6')+'" stroke="'+(sym?'#188038':'#B3261E')+'" stroke-width="2"/>';
      o+=_t(x+pw/2-1,58,50,r[0],'#2F3A4A','middle',700);
      if(sym)o+='<line x1="'+(x+pw/2-1)+'" y1="6" x2="'+(x+pw/2-1)+'" y2="70" '+AX+'/>';
      o+=_t(x+pw/2-1,92,22,sym?'✓':'✗',sym?'#188038':'#B3261E','middle',900)});
  }else if(k==='fold'){
    vb='0 0 300 140';
    var heart='M60 112C20 84 8 58 20 40C32 22 54 26 60 44C66 26 88 22 100 40C112 58 100 84 60 112Z';
    o+='<g transform="translate(10 12)"><path d="'+heart+'" fill="#EA4335" fill-opacity=".8" stroke="#8C1D18" stroke-width="2.6"/><line x1="60" y1="6" x2="60" y2="120" '+AX+'/>';
    o+='<path d="M96 22C86 4 72 4 64 14" fill="none" stroke="#1A56C4" stroke-width="3" stroke-linecap="round"/><path d="M60 8l10 2-6 9z" fill="#1A56C4" transform="rotate(-20 62 12)"/>'+_t(60,136,13,'falten','#1A56C4')+'</g>';
    o+=_t(150,76,34,'→','#5F6368','middle',700);
    o+='<g transform="translate(176 12)"><clipPath id="hc'+(++_guid)+'"><rect x="0" y="0" width="60" height="140"/></clipPath><g clip-path="url(#hc'+_guid+')"><path d="'+heart+'" fill="#EA4335" fill-opacity=".8" stroke="#8C1D18" stroke-width="2.6"/></g><path d="M60 26V112" stroke="#9334E6" stroke-width="3"/><path d="'+heart+'" fill="none" stroke="#188038" stroke-width="2.4" stroke-dasharray="3 5" stroke-linecap="round"/>'+_t(60,136,13,'Hälften passen genau ✓','#188038')+'</g>';
  }else if(k==='grid'){
    var s=20,gx=14,gy=10,W=10*s;vb='0 0 '+(W+2*gx)+' '+(7*s+gy+34);
    for(i=0;i<=10;i++)o+='<line x1="'+(gx+i*s)+'" y1="'+gy+'" x2="'+(gx+i*s)+'" y2="'+(gy+7*s)+'" stroke="#B9C7DE" stroke-width="1"/>';
    for(j=0;j<=7;j++)o+='<line x1="'+gx+'" y1="'+(gy+j*s)+'" x2="'+(gx+W)+'" y2="'+(gy+j*s)+'" stroke="#B9C7DE" stroke-width="1"/>';
    function P(x,y){return (gx+x*s)+','+(gy+y*s)}
    var left=[[5,0],[1,4],[1,7],[5,7]],right=[[5,0],[9,4],[9,7],[5,7]];
    o+='<polygon points="'+left.map(function(p){return P(p[0],p[1])}).join(' ')+'" fill="#4285F4" fill-opacity=".75" stroke="#1A3FA0" stroke-width="2.6" stroke-linejoin="round"/>';
    o+='<rect x="'+(gx+2*s)+'" y="'+(gy+5*s)+'" width="'+s+'" height="'+s+'" fill="#FDE9A6" stroke="#B06000" stroke-width="2"/>';
    o+='<polygon points="'+right.map(function(p){return P(p[0],p[1])}).join(' ')+'" fill="none" stroke="#1A3FA0" stroke-width="2.6" stroke-dasharray="4 5" stroke-linejoin="round" stroke-linecap="round"/>';
    o+='<rect x="'+(gx+7*s)+'" y="'+(gy+5*s)+'" width="'+s+'" height="'+s+'" fill="none" stroke="#B06000" stroke-width="2" stroke-dasharray="4 4"/>';
    [[1,4],[1,7],[2,5]].forEach(function(p){var mx=10-p[0];o+='<line x1="'+(gx+p[0]*s)+'" y1="'+(gy+p[1]*s)+'" x2="'+(gx+mx*s)+'" y2="'+(gy+p[1]*s)+'" stroke="#188038" stroke-width="1.8" stroke-dasharray="2 3"/><circle cx="'+(gx+p[0]*s)+'" cy="'+(gy+p[1]*s)+'" r="3.4" fill="#188038"/><circle cx="'+(gx+mx*s)+'" cy="'+(gy+p[1]*s)+'" r="3.4" fill="#fff" stroke="#188038" stroke-width="2"/>'});
    o+='<line x1="'+P(5,-0.4).split(',')[0]+'" y1="'+(gy-4)+'" x2="'+P(5,7).split(',')[0]+'" y2="'+(gy+7*s+4)+'" '+AX+'/>';
    o+=_t(gx+W/2,gy+7*s+24,13,'Jeder Punkt hat auf der anderen Seite gleich weit weg sein Spiegelpunkt','#188038','middle',700);
  }
  return '<figure class="vis" style="width:100%"><svg viewBox="'+vb+'" width="100%" style="max-width:'+(v.max||340)+'px;display:block;margin:0 auto" role="img" aria-label="'+esc(v.alt||'Symmetrie')+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* Körper: Würfel, Quader, Kugel, Zylinder (Schrägbild, verdeckte Kanten gestrichelt) */
function _isoBox(ox,oy,lx,ly,lz,a,mode){
  var X=[.866*a,-.5*a],Y=[-.866*a,-.5*a],Z=[0,-a],s='';
  function P(i,j,k){return [ox+i*lx*X[0]+j*ly*Y[0]+k*lz*Z[0],oy+i*lx*X[1]+j*ly*Y[1]+k*lz*Z[1]]}
  function pt(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}
  function poly(a,f,st){return '<polygon points="'+a.map(pt).join(' ')+'" fill="'+f+'" stroke="'+st+'" stroke-width="2.6" stroke-linejoin="round"/>'}
  function ln(p,q,c,w,d){return '<line x1="'+p[0].toFixed(1)+'" y1="'+p[1].toFixed(1)+'" x2="'+q[0].toFixed(1)+'" y2="'+q[1].toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'"'+(d?' stroke-dasharray="'+d+'"':'')+' stroke-linecap="round"/>'}
  var F=P(0,0,0),R=P(1,0,0),Lb=P(0,1,0),B=P(1,1,0),F1=P(0,0,1),R1=P(1,0,1),L1=P(0,1,1),B1=P(1,1,1);
  var left=[F,Lb,L1,F1],right=[F,R,R1,F1],top=[F1,R1,B1,L1];
  var fills=mode==='faces'?['#8AB4F8','#81C995','#FDD663']:['#CDDFFC','#A9C7FA','#E8F0FE'],st=mode==='edges'?'#8AA4D6':'#1A3FA0';
  s+=poly(left,fills[0],st)+poly(right,fills[1]==='#81C995'?'#81C995':fills[1],st)+poly(top,fills[2],st);
  if(mode==='faces'){[[left,'1'],[right,'2'],[top,'3']].forEach(function(f){var cx=0,cy=0;f[0].forEach(function(p){cx+=p[0]/4;cy+=p[1]/4});s+='<circle cx="'+cx.toFixed(1)+'" cy="'+(cy-1).toFixed(1)+'" r="9" fill="#fff" stroke="#2F3A4A" stroke-width="1.8"/>'+_t(cx.toFixed(1),(cy+4).toFixed(1),12,f[1],'#2F3A4A')})}
  var hid=mode==='edges'?['#E8710A',2.6,'5 4']:['#5F6B7A',1.8,'4 4'];
  s+=ln(B,R,hid[0],hid[1],hid[2])+ln(B,Lb,hid[0],hid[1],hid[2])+ln(B,B1,hid[0],hid[1],hid[2]);
  if(mode==='edges'){[[F,Lb],[F,R],[F,F1],[Lb,L1],[R,R1],[F1,R1],[F1,L1],[R1,B1],[L1,B1]].forEach(function(e){s+=ln(e[0],e[1],'#E8710A',4)})}
  if(mode==='corners'){[F,R,Lb,F1,R1,L1,B1].forEach(function(p){s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="5.4" fill="#188038" stroke="#fff" stroke-width="1.6"/>'});s+='<circle cx="'+B[0].toFixed(1)+'" cy="'+B[1].toFixed(1)+'" r="5.4" fill="#fff" stroke="#188038" stroke-width="2.2" stroke-dasharray="2 2"/>'}
  return s;
}
function _sphere(cx,cy,r,mode){var id='sp'+(++_guid);
  var s='<defs><radialGradient id="'+id+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#FDD663"/><stop offset="1" stop-color="#E37400"/></radialGradient></defs>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+id+')" stroke="#8A4B00" stroke-width="2.6"/>';
  s+='<path d="M'+(cx-r)+' '+cy+'A'+r+' '+r*.3+' 0 0 0 '+(cx+r)+' '+cy+'" fill="none" stroke="#8A4B00" stroke-opacity=".55" stroke-width="1.8"/><path d="M'+(cx-r)+' '+cy+'A'+r+' '+r*.3+' 0 0 1 '+(cx+r)+' '+cy+'" fill="none" stroke="#8A4B00" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="4 4"/>';
  return s}
function _cyl(cx,cy,rx,h,mode){var id='cy'+(++_guid),ry=rx*.34,top=cy-h/2,bot=cy+h/2;
  var s='<defs><linearGradient id="'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#7FB5F6"/><stop offset=".4" stop-color="#D6E7FD"/><stop offset="1" stop-color="#5F95E0"/></linearGradient></defs>';
  s+='<path d="M'+(cx-rx)+' '+top+'V'+bot+'A'+rx+' '+ry+' 0 0 0 '+(cx+rx)+' '+bot+'V'+top+'" fill="url(#'+id+')" stroke="#1A3FA0" stroke-width="2.6"/>';
  s+='<path d="M'+(cx-rx)+' '+bot+'A'+rx+' '+ry+' 0 0 1 '+(cx+rx)+' '+bot+'" fill="none" stroke="#1A3FA0" stroke-opacity=".5" stroke-width="1.6" stroke-dasharray="4 4"/>';
  s+='<ellipse cx="'+cx+'" cy="'+top+'" rx="'+rx+'" ry="'+ry+'" fill="'+(mode==='faces'?'#FDD663':'#EAF2FE')+'" stroke="#1A3FA0" stroke-width="2.6"/>';
  if(mode==='faces')s+='<path d="M'+(cx-rx)+' '+bot+'A'+rx+' '+ry+' 0 0 0 '+(cx+rx)+' '+bot+'A'+rx+' '+ry+' 0 0 0 '+(cx-rx)+' '+bot+'Z" fill="#FDD663" fill-opacity=".9" stroke="#1A3FA0" stroke-width="2.2"/>';
  return s}
function vSolid(v){
  var items=v.items,n=items.length,pw=Math.min(150,300/n),o='',W=pw*n;
  items.forEach(function(it,idx){var cx=pw*idx+pw/2,k=it.k,mode=it.mode||'plain',ph=96,lab=it.cap||'',base=112;
    if(k==='cube'||k==='box'){var lx=k==='cube'?1:1.7,ly=1,lz=k==='cube'?1:.8;
      var a=Math.min(pw*.86/((lx+ly)*.866),ph/((lx+ly)*.5+lz)),ox=cx+(lx-ly)*.866*a/2,oy=base-(lx+ly)*.25*a*0-6;
      // Mitte der Zeichnung auf cx: Zeichnung spannt von ox-ly*.866a bis ox+lx*.866a
      ox=cx-(lx*.866*a-ly*.866*a)/2;oy=108;o+=_isoBox(ox,oy,lx,ly,lz,a,mode)}
    else if(k==='sphere'){o+=_sphere(cx,60,Math.min(40,pw*.4),mode)}
    else if(k==='cyl'){o+=_cyl(cx,60,Math.min(30,pw*.32),64,mode)}
    else if(k==='ball'){o+=_sphere(cx-8,58,Math.min(30,pw*.3),'plain')+'<path d="M'+(cx-pw*.42)+' 46h18M'+(cx-pw*.42)+' 58h26M'+(cx-pw*.42)+' 70h18" stroke="#5F6B7A" stroke-width="3" stroke-linecap="round"/><path d="M'+(cx+22)+' 58h16" stroke="#188038" stroke-width="4" stroke-linecap="round"/><path d="M'+(cx+36)+' 50l10 8-10 8z" fill="#188038"/><line x1="'+(cx-pw*.45)+'" y1="94" x2="'+(cx+pw*.45)+'" y2="94" stroke="#5F6B7A" stroke-width="3"/>'}
    else if(k==='tower'){var a=24;[0,1,2].forEach(function(t){o+=_isoBox(cx,108-t*a,1,1,1,a,'plain')})}
    o+=_t(cx,132,13,lab,it.c||'#1A3FA0');
  });
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' 142" width="100%" style="max-width:'+(v.max||340)+'px;display:block;margin:0 auto" role="img" aria-label="'+esc(v.alt||'Körper')+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}

/* ---------- Allgemeiner Geometrie-Renderer (v4.99): Koordinaten in Einheiten, Masse in px ---------- */
var GCOL={k:'#2F3A4A',b:'#1A56C4',g:'#188038',r:'#B3261E',o:'#B06000',p:'#5B21B6',gr:'#8A94A6',t:'#0B7285',w:'#fff'};
var GFIL={fb:'#DCE8FD',fg:'#DDF1E3',fr:'#FADAD7',fo:'#FDEBC8',fp:'#EADCFB',fy:'#FFF3C4',fk:'#EEF1F7',ft:'#D3F0F4',fw:'#fff'};
function vGeo(v){
  var vw=v.vw,dx=vw[2]-vw[0],dy=vw[3]-vw[1],sc=(v.W||320)/dx,ys=v.ys||1;
  if(v.maxH&&dy*sc*ys>v.maxH)sc=v.maxH/(dy*ys);
  var scy=sc*ys,Wp=dx*sc,Hp=dy*scy,uid=++_guid,defs='',o='',t='',mk={};
  function X(x){return +((x-vw[0])*sc).toFixed(2)}
  function Y(y){return +((vw[3]-y)*scy).toFixed(2)}
  function C(c,d){return GCOL[c]||c||d||'#2F3A4A'}
  function F(c){return c?(GFIL[c]||GCOL[c]||c):'none'}
  function marker(c){var k=C(c);if(!mk[k]){mk[k]='gm'+uid+'_'+Object.keys(mk).length;defs+='<marker id="'+mk[k]+'" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="'+k+'"/></marker>'}return mk[k]}
  var DIR={e:0,ne:45,n:90,nw:135,w:180,sw:225,s:270,se:315};
  function lab(px,py,txt,pos,d,s,c,w,anc){ // px,py in Pixel; pos Richtung (Grad/Kompass) oder 'c' (zentriert); Text mit weissem Rand
    if(txt===undefined||txt===null||txt==='')return;
    s=s||13;var tx,ty,an,by;
    if(pos==='c'){tx=px;ty=py;an='middle';by=ty+s*.35}
    else{var a=(typeof pos==='string'?DIR[pos]:pos);if(a===undefined)a=90;d=d===undefined?10:d;
      var r=a*Math.PI/180,cx=Math.cos(r),sy=Math.sin(r);tx=px+cx*d;ty=py-sy*d;an=cx>.35?'start':cx<-.35?'end':'middle';by=sy>.35?ty-2:sy<-.35?ty+s*.8:ty+s*.35}
    t+='<text x="'+tx.toFixed(1)+'" y="'+by.toFixed(1)+'" text-anchor="'+(anc||an)+'" font-size="'+s+'" font-weight="'+(w||800)+'" fill="'+C(c)+'" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="'+(C(c)==='#fff'?'rgba(0,0,0,.6)':'#fff')+'" stroke-width="3.6" stroke-linejoin="round">'+esc(txt)+'</text>'}
  function dash(d){return d?' stroke-dasharray="'+(d===true?'6 5':d)+'"':''}
  function pts(a){return a.map(function(p){return X(p[0])+','+Y(p[1])}).join(' ')}
  // Gitter und Achsen
  if(v.grid){var gsx=v.grid===true?1:(v.grid.x||v.grid),gsy=v.grid===true?1:(v.grid.y||v.grid),x,y;
    for(x=Math.ceil(vw[0]/gsx-1e-9)*gsx;x<=vw[2]+1e-9;x+=gsx)o+='<line x1="'+X(x)+'" y1="0" x2="'+X(x)+'" y2="'+Hp+'" stroke="#D5DCE8" stroke-width="1"/>';
    for(y=Math.ceil(vw[1]/gsy-1e-9)*gsy;y<=vw[3]+1e-9;y+=gsy)o+='<line x1="0" y1="'+Y(y)+'" x2="'+Wp+'" y2="'+Y(y)+'" stroke="#D5DCE8" stroke-width="1"/>'}
  if(v.ax){var A=v.ax,tx_=A.tx||1,ty_=A.ty||1,ax0=(0>=vw[0]&&0<=vw[2])?0:vw[0],ay0=(0>=vw[1]&&0<=vw[3])?0:vw[1],q,fm=function(n){return String(Math.round(n*100)/100).replace('-','−').replace('.',',')};
    o+='<line x1="'+(X(vw[0])+2)+'" y1="'+Y(ay0)+'" x2="'+(X(vw[2])-1)+'" y2="'+Y(ay0)+'" stroke="#2F3A4A" stroke-width="2"/><polygon points="'+(X(vw[2])+2)+','+Y(ay0)+' '+(X(vw[2])-8)+','+(Y(ay0)-4.5)+' '+(X(vw[2])-8)+','+(Y(ay0)+4.5)+'" fill="#2F3A4A"/>';
    o+='<line x1="'+X(ax0)+'" y1="'+(Y(vw[1])-2)+'" x2="'+X(ax0)+'" y2="'+(Y(vw[3])+1)+'" stroke="#2F3A4A" stroke-width="2"/><polygon points="'+X(ax0)+','+(Y(vw[3])-2)+' '+(X(ax0)-4.5)+','+(Y(vw[3])+8)+' '+(X(ax0)+4.5)+','+(Y(vw[3])+8)+'" fill="#2F3A4A"/>';
    for(q=Math.ceil(vw[0]/tx_-1e-9)*tx_;q<=vw[2]-0.3*tx_;q+=tx_){if(Math.abs(q)<1e-9)continue;o+='<line x1="'+X(q)+'" y1="'+(Y(ay0)-4)+'" x2="'+X(q)+'" y2="'+(Y(ay0)+4)+'" stroke="#2F3A4A" stroke-width="1.6"/>';
      if(!A.nolab)t+='<text x="'+X(q)+'" y="'+(Y(ay0)+17)+'" text-anchor="middle" font-size="11.5" font-weight="700" fill="#4A5568" font-family="Arial,sans-serif" paint-order="stroke" stroke="#fff" stroke-width="3">'+fm(q)+'</text>'}
    for(q=Math.ceil(vw[1]/ty_-1e-9)*ty_;q<=vw[3]-0.3*ty_;q+=ty_){if(Math.abs(q)<1e-9)continue;o+='<line x1="'+(X(ax0)-4)+'" y1="'+Y(q)+'" x2="'+(X(ax0)+4)+'" y2="'+Y(q)+'" stroke="#2F3A4A" stroke-width="1.6"/>';
      if(!A.nolab)t+='<text x="'+(X(ax0)-8)+'" y="'+(Y(q)+4)+'" text-anchor="end" font-size="11.5" font-weight="700" fill="#4A5568" font-family="Arial,sans-serif" paint-order="stroke" stroke="#fff" stroke-width="3">'+fm(q)+'</text>'}
    if(!A.no0&&ax0===0&&ay0===0)t+='<text x="'+(X(0)-7)+'" y="'+(Y(0)+15)+'" text-anchor="end" font-size="11.5" font-weight="700" fill="#4A5568" font-family="Arial,sans-serif">0</text>';
    t+='<text x="'+(X(vw[2])-4)+'" y="'+(Y(ay0)-9)+'" text-anchor="end" font-size="14" font-weight="800" font-style="italic" fill="#2F3A4A" font-family="Georgia,serif">'+esc(A.x||'x')+'</text><text x="'+(X(ax0)+10)+'" y="'+(Y(vw[3])+12)+'" text-anchor="start" font-size="14" font-weight="800" font-style="italic" fill="#2F3A4A" font-family="Georgia,serif">'+esc(A.y||'y')+'</text>'}
  var clipId='gc'+uid,clipOpen='<g clip-path="url(#'+clipId+')">';
  defs+='<clipPath id="'+clipId+'"><rect x="0" y="0" width="'+Wp+'" height="'+Hp+'"/></clipPath>';
  (v.items||[]).forEach(function(it){
    var k=it.k,s=C(it.s),w=it.w||2.4;
    if(k==='poly'){o+='<polygon points="'+pts(it.pts)+'" fill="'+F(it.f)+'"'+(it.o?' fill-opacity="'+it.o+'"':'')+' stroke="'+(it.s===0?'none':s)+'" stroke-width="'+w+'" stroke-linejoin="round"'+dash(it.d)+'/>';
      if(it.lab){var cx=0,cy=0;it.pts.forEach(function(p){cx+=p[0]/it.pts.length;cy+=p[1]/it.pts.length});if(it.lp){cx=it.lp[0];cy=it.lp[1]}lab(X(cx),Y(cy),it.lab,'c',0,it.ls||14,it.lc||'k')}}
    else if(k==='line'){var a=it.a,b=it.b,x1=a[0],y1=a[1],x2=b[0],y2=b[1];
      if(it.ext){var ddx=x2-x1,ddy=y2-y1,L=Math.sqrt(ddx*ddx+ddy*ddy),e=(dx+dy)*2/L;x1=a[0]-ddx*e;y1=a[1]-ddy*e;x2=b[0]+ddx*e;y2=b[1]+ddy*e}
      var ln='<line x1="'+X(x1)+'" y1="'+Y(y1)+'" x2="'+X(x2)+'" y2="'+Y(y2)+'" stroke="'+s+'" stroke-width="'+w+'" stroke-linecap="round"'+dash(it.d)+(it.arr?(' marker-end="url(#'+marker(it.s)+')"'+(it.arr==='both'?' marker-start="url(#'+marker(it.s)+')"':'')):'')+'/>';
      o+=it.ext?clipOpen+ln+'</g>':ln;
      if(it.lab){var f=it.lp===undefined?.5:it.lp,mx=X(a[0]+(b[0]-a[0])*f),my=Y(a[1]+(b[1]-a[1])*f),ex=X(b[0])-X(a[0]),ey=Y(b[1])-Y(a[1]),L2=Math.sqrt(ex*ex+ey*ey)||1,off=it.ld===undefined?12:it.ld,nx=ey/L2,ny=-ex/L2; // links der Richtung a->b (Bildschirm)
        lab(mx+nx*off,my+ny*off,it.lab,'c',0,it.ls||13,it.lc||it.s||'k')}}
    else if(k==='circ'){o+='<circle cx="'+X(it.c[0])+'" cy="'+Y(it.c[1])+'" r="'+(it.r*sc).toFixed(2)+'" fill="'+F(it.f)+'"'+(it.o?' fill-opacity="'+it.o+'"':'')+' stroke="'+(it.s===0?'none':s)+'" stroke-width="'+w+'"'+dash(it.d)+'/>'}
    else if(k==='ell'){o+='<ellipse cx="'+X(it.c[0])+'" cy="'+Y(it.c[1])+'" rx="'+(it.rx*sc).toFixed(2)+'" ry="'+(it.ry*sc).toFixed(2)+'" fill="'+F(it.f)+'" stroke="'+(it.s===0?'none':s)+'" stroke-width="'+w+'"'+dash(it.d)+'/>'}
    else if(k==='arc'){var r_=it.r*sc,cx0=X(it.c[0]),cy0=Y(it.c[1]),a0=it.a0*Math.PI/180,a1=it.a1*Math.PI/180,sw=((it.a1-it.a0)%360+360)%360||360;
      var P0=[cx0+r_*Math.cos(a0),cy0-r_*Math.sin(a0)],P1=[cx0+r_*Math.cos(a1),cy0-r_*Math.sin(a1)];
      o+='<path d="'+(it.f?'M'+cx0+' '+cy0+'L':'M')+P0[0].toFixed(2)+' '+P0[1].toFixed(2)+'A'+r_.toFixed(2)+' '+r_.toFixed(2)+' 0 '+(sw>180?1:0)+' 0 '+P1[0].toFixed(2)+' '+P1[1].toFixed(2)+(it.f?'Z':'')+'" fill="'+F(it.f)+'"'+(it.o?' fill-opacity="'+it.o+'"':'')+' stroke="'+s+'" stroke-width="'+w+'" stroke-linejoin="round"'+dash(it.d)+'/>'}
    else if(k==='ang'){ // Winkel bei v zwischen Strahl a0 und a1 (Grad, gegen den Uhrzeigersinn), r in px
      var V=it.v,a0d=it.a0,a1d=it.a1;
      if(it.p){a0d=Math.atan2(it.p[1]-V[1],it.p[0]-V[0])*180/Math.PI;a1d=Math.atan2(it.q[1]-V[1],it.q[0]-V[0])*180/Math.PI}
      var swp=((a1d-a0d)%360+360)%360,r2=it.r||22,vx=X(V[0]),vy=Y(V[1]),A0=a0d*Math.PI/180,A1=a1d*Math.PI/180,col=C(it.s,'#B06000'),mid=(a0d+swp/2)*Math.PI/180,nn=it.n||1,i3;
      if(Math.abs(swp-90)<.6&&!it.arc){var q1=[vx+r2*.62*Math.cos(A0),vy-r2*.62*Math.sin(A0)],q3=[vx+r2*.62*Math.cos(A1),vy-r2*.62*Math.sin(A1)],q2=[q1[0]+q3[0]-vx,q1[1]+q3[1]-vy];
        o+='<path d="M'+q1+'L'+q2+'L'+q3+'" fill="'+(it.f===0?'none':F(it.f||'fo'))+'" fill-opacity=".8" stroke="'+col+'" stroke-width="2"/><path d="M'+vx+' '+vy+'L'+q1+'L'+q2+'L'+q3+'Z" fill="'+(it.f===0?'none':F(it.f||'fo'))+'" fill-opacity=".55" stroke="none"/>';
        if(it.dot!==false)o+='<circle cx="'+((vx+q2[0])/2).toFixed(1)+'" cy="'+((vy+q2[1])/2).toFixed(1)+'" r="1.7" fill="'+col+'"/>';
        if(it.lab)lab(vx+(r2*.62*1.7+8)*Math.cos(mid),vy-(r2*.62*1.7+8)*Math.sin(mid),it.lab,'c',0,it.ls||13,it.lc||col)}
      else{o+='<path d="M'+vx+' '+vy+'L'+(vx+r2*Math.cos(A0)).toFixed(2)+' '+(vy-r2*Math.sin(A0)).toFixed(2)+'A'+r2+' '+r2+' 0 '+(swp>180?1:0)+' 0 '+(vx+r2*Math.cos(A0+swp*Math.PI/180)).toFixed(2)+' '+(vy-r2*Math.sin(A0+swp*Math.PI/180)).toFixed(2)+'Z" fill="'+F(it.f||'fo')+'" fill-opacity=".65" stroke="none"/>';
        for(i3=0;i3<nn;i3++){var rr=r2-i3*4;o+='<path d="M'+(vx+rr*Math.cos(A0)).toFixed(2)+' '+(vy-rr*Math.sin(A0)).toFixed(2)+'A'+rr+' '+rr+' 0 '+(swp>180?1:0)+' 0 '+(vx+rr*Math.cos(A0+swp*Math.PI/180)).toFixed(2)+' '+(vy-rr*Math.sin(A0+swp*Math.PI/180)).toFixed(2)+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round"/>'}
        if(it.lab){var lr=it.lr||(r2+(swp<45?20:swp<70?15:11));lab(vx+lr*Math.cos(mid),vy-lr*Math.sin(mid),it.lab,'c',0,it.ls||13,it.lc||col)}}}
    else if(k==='pt'){var rad=it.r||4;o+='<circle cx="'+X(it.p[0])+'" cy="'+Y(it.p[1])+'" r="'+rad+'" fill="'+(it.h?'#fff':s)+'" stroke="'+s+'" stroke-width="2"/>';lab(X(it.p[0]),Y(it.p[1]),it.lab,it.pos===undefined?45:it.pos,it.d===undefined?8:it.d,it.ls||13,it.lc||it.s||'k')}
    else if(k==='txt'){lab(X(it.p[0]),Y(it.p[1]),it.t,it.pos===undefined?'c':it.pos,it.d||0,it.s||13,it.c||'k',it.fw,it.anc)}
    else if(k==='dim'){o+=_dim(X(it.a[0]),Y(it.a[1]),X(it.b[0]),Y(it.b[1]),it.lab,C(it.s,'#1A56C4'),it.off||0)}
    else if(k==='tick'){var mx2=(X(it.a[0])+X(it.b[0]))/2,my2=(Y(it.a[1])+Y(it.b[1]))/2,ux=X(it.b[0])-X(it.a[0]),uy=Y(it.b[1])-Y(it.a[1]),LL=Math.sqrt(ux*ux+uy*uy)||1;ux/=LL;uy/=LL;var n2=it.n||1,i4;
      for(i4=0;i4<n2;i4++){var sh=(i4-(n2-1)/2)*5;o+='<line x1="'+(mx2+ux*sh-uy*6).toFixed(1)+'" y1="'+(my2+uy*sh+ux*6).toFixed(1)+'" x2="'+(mx2+ux*sh+uy*6).toFixed(1)+'" y2="'+(my2+uy*sh-ux*6).toFixed(1)+'" stroke="'+s+'" stroke-width="2"/>'}}
    else if(k==='par'){var mx3=(X(it.a[0])+X(it.b[0]))/2,my3=(Y(it.a[1])+Y(it.b[1]))/2,ux3=X(it.b[0])-X(it.a[0]),uy3=Y(it.b[1])-Y(it.a[1]),L3=Math.sqrt(ux3*ux3+uy3*uy3)||1;ux3/=L3;uy3/=L3;var n3=it.n||1,i5;
      for(i5=0;i5<n3;i5++){var sh3=(i5-(n3-1)/2)*7,bx=mx3+ux3*sh3,by_=my3+uy3*sh3;o+='<path d="M'+(bx-ux3*4-uy3*5).toFixed(1)+' '+(by_-uy3*4+ux3*5).toFixed(1)+'L'+(bx+ux3*3).toFixed(1)+' '+(by_+uy3*3).toFixed(1)+'L'+(bx-ux3*4+uy3*5).toFixed(1)+' '+(by_-uy3*4-ux3*5).toFixed(1)+'" fill="none" stroke="'+s+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}}
    else if(k==='fn'){var fx=new Function('x','with(Math){return '+it.f+'}'),x0=it.x0===undefined?vw[0]:it.x0,x1=it.x1===undefined?vw[2]:it.x1,N=it.n||160,d_='',i6,pen=false;
      for(i6=0;i6<=N;i6++){var xx=x0+(x1-x0)*i6/N,yy=fx(xx);if(!isFinite(yy)||Math.abs(yy)>1e4){pen=false;continue}d_+=(pen?'L':'M')+X(xx)+' '+Y(yy);pen=true}
      o+=clipOpen+'<path d="'+d_+'" fill="none" stroke="'+s+'" stroke-width="'+(it.w||3)+'" stroke-linecap="round" stroke-linejoin="round"'+dash(it.d)+'/></g>'}
    else if(k==='curve'){o+='<path d="M'+it.pts.map(function(p){return X(p[0])+' '+Y(p[1])}).join('L')+'" fill="none" stroke="'+s+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"'+dash(it.d)+'/>'}
    else if(k==='raw'){o+=it.svg}
  });
  var cap=v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+Wp.toFixed(1)+' '+Hp.toFixed(1)+'" width="100%" style="max-width:'+Math.round(Wp*(v.zoom||1.12))+'px;max-height:none;display:block;margin:0 auto;overflow:visible" role="img" aria-label="'+esc(v.alt||'Geometrie-Zeichnung')+'"><defs>'+defs+'</defs>'+o+t+'</svg>'+cap+'</figure>';
}


/* Einmaleins-Tafel (alle Aufgaben auf einen Blick) */
function vMtab(v){
  var m=v.max||10,u=m>10?31:36,o='',F='font-family="Arial,Helvetica,sans-serif"',hr=v.hr||[],hc=v.hc||[],cells=v.cells||[],hide=v.hide||[],r,c,W=(m+1)*u+4;
  var rowTint=['#FDE7E4','#FFF1D6','#FFF8CC','#E4F4E8','#DDF1F4','#E3EEFD','#ECE5FB','#F9E3F2','#E8EDF2','#EDEDE0','#E0F0E8','#F5E6D8'];
  o+='<rect x="2" y="2" width="'+u+'" height="'+u+'" rx="8" fill="#2B3350"/>'+_t(2+u/2,2+u/2+6,16,'×','#fff','middle',800);
  for(c=1;c<=m;c++){var hh=hc.indexOf(c)>=0;o+='<rect x="'+(2+c*u)+'" y="2" width="'+u+'" height="'+u+'" fill="'+(hh?'#1A56C4':'#E8EEFA')+'"/>'+_t(2+c*u+u/2,2+u/2+6,17,c,hh?'#fff':'#1A3FA0','middle',800)}
  for(r=1;r<=m;r++){var hr2=hr.indexOf(r)>=0;o+='<rect x="2" y="'+(2+r*u)+'" width="'+u+'" height="'+u+'" fill="'+(hr2?'#1A56C4':'#E8EEFA')+'"/>'+_t(2+u/2,2+r*u+u/2+6,17,r,hr2?'#fff':'#1A3FA0','middle',800)}
  for(r=1;r<=m;r++)for(c=1;c<=m;c++){
    var inR=hr.indexOf(r)>=0,inC=hc.indexOf(c)>=0,cell=cells.some(function(q){return q[0]===r&&q[1]===c}),sq=v.sq&&r===c,hd=hide.some(function(q){return q[0]===r&&q[1]===c});
    var bg=cell?'#FBBC04':hd?'#FFF3C4':sq?'#CDEBD3':(inR||inC)?'#D6E6FC':(v.tint?rowTint[(r-1)%12]:(r+c)%2?'#FFFFFF':'#F6F8FC');
    o+='<rect x="'+(2+c*u)+'" y="'+(2+r*u)+'" width="'+u+'" height="'+u+'" fill="'+bg+'" stroke="#fff" stroke-width="1.5"/>'+_t(2+c*u+u/2,2+r*u+u/2+5,m>10?14.5:16.5,hd?'?':r*c,cell?'#4A2A00':hd?'#B06000':'#2B3350','middle',cell||sq||inR&&inC?800:600)}
  hr.forEach(function(r){o+='<rect x="'+(2+u)+'" y="'+(2+r*u)+'" width="'+(m*u)+'" height="'+u+'" fill="none" stroke="#1A56C4" stroke-width="2.4" rx="3"/>'});
  hc.forEach(function(c){o+='<rect x="'+(2+c*u)+'" y="'+(2+u)+'" width="'+u+'" height="'+(m*u)+'" fill="none" stroke="#1A56C4" stroke-width="2.4" rx="3"/>'});
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+W+'" width="100%" style="display:block;max-width:'+(m>10?420:400)+'px;margin:0 auto" role="img" aria-label="Einmaleins-Tafel">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
/* Eine Reihe als zwei Spalten mit Kernaufgaben */
function vMreihe(v){
  var n=v.n,up=v.upto||10,core=v.core||[],o='',F='font-family="Arial,Helvetica,sans-serif"',col=v.c!==undefined?dcol(v.c):DC[[0,2,3,4,5,6,8,10][n%8]],half=Math.ceil(up/2),i;
  for(i=1;i<=up;i++){var cI=i>half?1:0,rI=cI?i-half-1:i-1,x=6+cI*296,y=6+rI*54,k=core.indexOf(i)>=0;
    o+='<rect x="'+x+'" y="'+y+'" width="288" height="46" rx="14" fill="'+(k?'#EAF6EC':'#F5F7FB')+'" stroke="'+(k?'#34A853':'#E0E5EF')+'" stroke-width="'+(k?2.4:1.5)+'"/>'+
     '<circle cx="'+(x+25)+'" cy="'+(y+23)+'" r="14" fill="'+col+'"/>'+_t(x+25,y+29,15,i,'#fff','middle',800)+
     _t(x+52,y+31,23,'× '+n,'#2B3350','start',700)+_t(x+150,y+31,23,'=','#9AA3B2','middle',700)+_t(x+272,y+31,28,n*i,col,'end',800)}
  var H=6+half*54;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+H+'" width="100%" style="display:block;max-width:600px;margin:0 auto" role="img" aria-label="'+n+'er-Reihe">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vNline(v){
  var fmt=function(n){n=Math.round(n*1000)/1000;return String(n).replace('.',',').replace('-','−')},cnt=function(a,b,st){var r=[],k;for(k=0;a+k*st<=b+1e-9;k++)r.push(Math.round((a+k*st)*1000)/1000);return r};
  var x0=30,x1=570,ty=86,span=v.max-v.min,F='font-family="Arial,Helvetica,sans-serif"',id='nl'+(++_guid);function X(n){return x0+(x1-x0)*(n-v.min)/span}
  var ticks=cnt(v.min,v.max,v.step),shown=ticks.filter(function(n,i){return !v.lab||v.lab==='all'||(v.lab==='alt'&&i%2===0)||(v.lab==='ends'&&(i===0||i===ticks.length-1))}),
    gap=(x1-x0)/Math.max(1,(v.lab==='alt'?ticks.length/2:v.lab==='ends'?2:ticks.length-1)),ml=Math.max.apply(null,shown.map(function(n){return fmt(n).length}).concat([1])),
    fs=Math.max(18,Math.min(34,gap/(ml*.62+.25)));
  var o='<defs><filter id="'+id+'" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#1c2a4a" flood-opacity=".28"/></filter></defs>';
  var zx=v.min<0&&v.max>0?X(0):null;
  o+='<rect x="'+(x0-12)+'" y="'+(ty-7)+'" width="'+(x1-x0+24)+'" height="14" rx="7" fill="#C9D3E3"/>';
  if(zx!==null)o+='<rect x="'+(x0-12)+'" y="'+(ty-7)+'" width="'+(zx-x0+12)+'" height="14" rx="7" fill="#F4B9B3"/><rect x="'+zx+'" y="'+(ty-7)+'" width="'+(x1+12-zx)+'" height="14" rx="7" fill="#AECBFA"/>';
  if(v.pts&&v.pts.length>=2){var pa=Math.min.apply(null,v.pts),pb=Math.max.apply(null,v.pts);o+='<rect x="'+X(pa)+'" y="'+(ty-7)+'" width="'+(X(pb)-X(pa))+'" height="14" fill="#34A853" fill-opacity=".6"/>'}
  if(v.minor)cnt(v.min,v.max,v.minor).forEach(function(n){o+='<line x1="'+X(n)+'" x2="'+X(n)+'" y1="'+(ty+9)+'" y2="'+(ty+17)+'" stroke="#9AA6B8" stroke-width="2.4" stroke-linecap="round"/>'});
  ticks.forEach(function(n,i){
    var z=Math.abs(n)<1e-9,show=shown.indexOf(n)>=0;
    o+='<line x1="'+X(n)+'" x2="'+X(n)+'" y1="'+(ty+9)+'" y2="'+(ty+(z?30:24))+'" stroke="'+(z?'#1F2937':'#4A5468')+'" stroke-width="'+(z?4:3.2)+'" stroke-linecap="round"/>'+(show||z?'<text x="'+X(n)+'" y="'+(ty+28+fs)+'" text-anchor="middle" font-size="'+fs.toFixed(1)+'" font-weight="'+(z?900:800)+'" fill="#1F2937" '+F+'>'+fmt(n)+'</text>':'')});
  (v.pts||[]).forEach(function(p,i){var c=v._cm&&v._cm[p]!=null?dcol(v._cm[p]):VC[i%4],px=X(p),txt=fmt(p),w=Math.max(48,txt.length*18+24);
    o+='<line x1="'+px+'" y1="'+(ty-16)+'" x2="'+px+'" y2="'+(ty-32)+'" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/><rect x="'+(px-w/2)+'" y="'+(ty-68)+'" width="'+w+'" height="36" rx="18" fill="'+c+'" filter="url(#'+id+')"/><text x="'+px+'" y="'+(ty-42)+'" text-anchor="middle" font-size="25" font-weight="800" fill="#fff" '+F+'>'+txt+'</text><circle cx="'+px+'" cy="'+ty+'" r="13" fill="#fff" stroke="'+c+'" stroke-width="6" filter="url(#'+id+')"/>'});
  if(v.q!==undefined&&v.q!==null){var qx=X(v.q);o+='<path d="M'+(qx-16)+' '+(ty-50)+'h32l-16 22z" fill="#F9AB00" filter="url(#'+id+')"/><circle cx="'+qx+'" cy="'+ty+'" r="13" fill="#FFF3C4" stroke="#F9AB00" stroke-width="6" filter="url(#'+id+')"/>'}
  var H=ty+36+fs;
  return '<figure class="vis nlv" style="width:100%"><svg viewBox="0 '+(v.q!=null||(v.pts&&v.pts.length)?10:52)+' 600 '+(H-(v.q!=null||(v.pts&&v.pts.length)?10:52))+'" width="100%" style="display:block;margin:0 auto" role="img" aria-label="Zahlenstrahl">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vWall(v){
  var R=v.rows,n=R.length,bw=96,bh=46,g=6,W=n*bw+(n-1)*g+20,o='',i,j,cols=['#8AB4F8','#81C995','#FDD663'];
  for(i=0;i<n;i++){var cnt=R[i].length,x0=(W-(cnt*bw+(cnt-1)*g))/2,y=8+i*(bh+g);
    for(j=0;j<cnt;j++){var t=String(R[i][j]),q=t==='?',x=x0+j*(bw+g);
      o+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="9" fill="'+(q?'#FFF3C4':cols[i%3])+'" stroke="'+(q?'#E37400':'rgba(0,0,0,.18)')+'" stroke-width="'+(q?3:1.5)+'" '+(q?'stroke-dasharray="6 4"':'')+'/><text x="'+(x+bw/2)+'" y="'+(y+31)+'" text-anchor="middle" font-size="'+(q?26:24)+'" font-weight="900" fill="'+(q?'#B06000':'#1b2433')+'" font-family="Arial,sans-serif">'+esc(t)+'</text>'}}
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+(n*(bh+g)+10)+'" width="100%" style="max-width:'+Math.min(420,W*1.4)+'px;display:block;margin:0 auto" role="img" aria-label="Zahlenmauer">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vAngle(v){
  var cx=120,cy=122,R=100,o='<defs><radialGradient id="pg" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#E8F0FE"/><stop offset="1" stop-color="#C6DAFC"/></radialGradient></defs>',i,a;
  o+='<path d="M'+(cx-R)+' '+cy+'A'+R+' '+R+' 0 0 1 '+(cx+R)+' '+cy+'Z" fill="url(#pg)" stroke="#1A56C4" stroke-width="3"/><path d="M'+(cx-60)+' '+cy+'A60 60 0 0 1 '+(cx+60)+' '+cy+'Z" fill="#fff" fill-opacity=".55" stroke="#8AB4F8" stroke-width="1.5"/>';
  for(i=0;i<=180;i+=5){a=i*Math.PI/180;var big=i%10===0,r1=big?R-12:R-7;o+='<line x1="'+(cx+r1*Math.cos(a)).toFixed(1)+'" y1="'+(cy-r1*Math.sin(a)).toFixed(1)+'" x2="'+(cx+R*Math.cos(a)).toFixed(1)+'" y2="'+(cy-R*Math.sin(a)).toFixed(1)+'" stroke="#1A56C4" stroke-width="'+(i%30===0?2:1)+'"/>';
    if(i%30===0)o+='<text x="'+(cx+(i%180===0?R-8:R-22)*Math.cos(a)).toFixed(1)+'" y="'+(i%180===0?cy+15:cy-(R-22)*Math.sin(a)+4).toFixed(1)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#1A56C4" font-family="Arial,sans-serif">'+i+'</text>';
    if(i%30===0)o+='<text x="'+(cx+(R-36)*Math.cos(a)).toFixed(1)+'" y="'+(cy-(R-36)*Math.sin(a)+3).toFixed(1)+'" text-anchor="middle" font-size="8" fill="#5F6B7A" font-family="Arial,sans-serif">'+(180-i)+'</text>'}
  var d=v.deg,ra=d*Math.PI/180;
  o+='<path d="M'+cx+' '+cy+'L'+(cx+44)+' '+cy+'A44 44 0 0 0 '+(cx+44*Math.cos(ra)).toFixed(1)+' '+(cy-44*Math.sin(ra)).toFixed(1)+'Z" fill="#FBBC04" fill-opacity=".55" stroke="#E37400" stroke-width="2"/>';
  o+='<line x1="'+(cx-R-12)+'" y1="'+cy+'" x2="'+(cx+R+12)+'" y2="'+cy+'" stroke="#202124" stroke-width="4" stroke-linecap="round"/><line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+(R+14)*Math.cos(ra)).toFixed(1)+'" y2="'+(cy-(R+14)*Math.sin(ra)).toFixed(1)+'" stroke="#9334E6" stroke-width="4" stroke-linecap="round"/><circle cx="'+cx+'" cy="'+cy+'" r="5" fill="#202124"/>';
  if(v.lbl)o+='<text x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle" font-size="13" font-weight="900" fill="#6B21A8" font-family="Arial,sans-serif">'+esc(v.lbl)+'</text>';
  return '<figure class="vis"><svg viewBox="0 0 240 146" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="Winkel mit Geodreieck">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vCircle(v){
  var o='<defs><radialGradient id="cg" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#E8F0FE"/><stop offset="1" stop-color="#AECBFA"/></radialGradient></defs><circle cx="100" cy="80" r="64" fill="url(#cg)" stroke="#1A56C4" stroke-width="4"/>';
  if(v.show!=='d')o+='<line x1="100" y1="80" x2="164" y2="80" stroke="#9334E6" stroke-width="4" stroke-linecap="round"/>'+(v.lr?'<text x="132" y="72" text-anchor="middle" font-size="14" font-weight="900" fill="#6B21A8" font-family="Arial,sans-serif">'+esc(v.lr)+'</text>':'');
  if(v.show==='d'||v.show==='both')o+='<line x1="36" y1="80" x2="164" y2="80" stroke="#34A853" stroke-width="4" stroke-linecap="round"/>'+(v.ld?'<text x="68" y="98" text-anchor="middle" font-size="14" font-weight="900" fill="#137333" font-family="Arial,sans-serif">'+esc(v.ld)+'</text>':'');
  o+='<circle cx="100" cy="80" r="5" fill="#202124"/><text x="100" y="64" text-anchor="middle" font-size="13" font-weight="800" fill="#202124" font-family="Arial,sans-serif">M</text>';
  return '<figure class="vis"><svg viewBox="0 0 200 160" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="Kreis">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vJug(v){
  var W=120,H=170,x0=30,y0=10,h=H-20,lv=Math.max(0,Math.min(1,v.level/v.max)),o='<defs><linearGradient id="jg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8AB4F8"/><stop offset="1" stop-color="#1A73E8"/></linearGradient></defs>';
  o+='<rect x="'+x0+'" y="'+(y0+h*(1-lv))+'" width="60" height="'+(h*lv)+'" fill="url(#jg)"/><rect x="'+x0+'" y="'+y0+'" width="60" height="'+h+'" rx="6" fill="none" stroke="#5F6B7A" stroke-width="4"/>';
  var st=v.step||1,i;for(i=0;i<=v.max;i+=st){var y=y0+h*(1-i/v.max);o+='<line x1="'+(x0+60)+'" y1="'+y+'" x2="'+(x0+(i%(v.lab||st)===0?46:52)+14)+'" y2="'+y+'" stroke="#5F6B7A" stroke-width="2"/>';if(i%(v.lab||st)===0)o+='<text x="'+(x0+78)+'" y="'+(y+4)+'" font-size="11" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+i+'</text>'}
  o+='<text x="'+(x0+30)+'" y="'+(H+10)+'" text-anchor="middle" font-size="12" font-weight="800" fill="#5F6B7A" font-family="Arial,sans-serif">'+esc(v.unit||'')+'</text>';
  return '<figure class="vis"><svg viewBox="0 0 '+W+' '+(H+16)+'" width="100%" style="max-width:150px;display:block;margin:0 auto" role="img" aria-label="Messbecher">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vQuaderOld(v){
  var l=150,b=70,h=70,dx=44,dy=-30,x=44,y=62,o='';
  o+='<polygon points="'+x+','+y+' '+(x+l)+','+y+' '+(x+l)+','+(y+h)+' '+x+','+(y+h)+'" fill="#CFE0FC" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  o+='<polygon points="'+x+','+y+' '+(x+dx)+','+(y+dy)+' '+(x+l+dx)+','+(y+dy)+' '+(x+l)+','+y+'" fill="#E8F0FE" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  o+='<polygon points="'+(x+l)+','+y+' '+(x+l+dx)+','+(y+dy)+' '+(x+l+dx)+','+(y+h+dy)+' '+(x+l)+','+(y+h)+'" fill="#A9C7FA" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  function pill(px,py,t,c){return '<rect x="'+(px-24)+'" y="'+(py-11)+'" width="48" height="22" rx="11" fill="#fff" stroke="'+c+'" stroke-width="2.5"/><text x="'+px+'" y="'+(py+5)+'" text-anchor="middle" font-size="13" font-weight="900" fill="'+c+'" font-family="Arial,sans-serif">'+esc(t)+'</text>'}
  o+=pill(x+l/2,y+h+16,v.l,'#137333')+pill(x+l+dx+14,y+dy+h/2+4,v.b||'',"#B06000")+pill(x-14,y+h/2,v.h,'#B3261E');
  return '<figure class="vis"><svg viewBox="0 0 300 160" width="100%" style="max-width:310px;display:block;margin:0 auto" role="img" aria-label="Quader">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vPar(v){
  var k=v.kind,o='<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1A56C4"/></marker></defs>',st='stroke="#1A56C4" stroke-width="5" stroke-linecap="round"';
  if(k==='par')o+='<line x1="20" y1="45" x2="180" y2="45" '+st+'/><line x1="20" y1="95" x2="180" y2="95" '+st+'/><path d="M100 50v40" stroke="#9334E6" stroke-width="3" stroke-dasharray="5 4"/>';
  else if(k==='perp')o+='<line x1="30" y1="95" x2="170" y2="95" '+st+'/><line x1="100" y1="95" x2="100" y2="15" '+st+'/><path d="M100 77h18v18" fill="#FBBC04" fill-opacity=".5" stroke="#E37400" stroke-width="3"/>';
  else if(k==='cross')o+='<line x1="30" y1="100" x2="170" y2="30" '+st+'/><line x1="30" y1="30" x2="170" y2="100" '+st+'/>';
  else if(k==='tilt')o+='<line x1="20" y1="100" x2="180" y2="40" '+st+'/><line x1="20" y1="50" x2="180" y2="90" '+st+'/>';
  return '<figure class="vis"><svg viewBox="0 0 200 120" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="Geraden">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vBlocks(v){
  var h=v.h||0,z=v.z||0,e=v.e||0,id='pb'+(++_guid),o='',cols=[],x=0,H=190;
  var fs=h<=3?64:h<=6?46:34;
  if(h>0)cols.push({k:'H',n:h,lab:'Hunderter',c:'#7B3FC4',bg:'#F5EEFD',w:Math.max(104,h*(fs+10)+14)});
  if(h>0||z>0)cols.push({k:'Z',n:z,lab:'Zehner',c:'#1A56C4',bg:'#EAF1FE',w:Math.max(104,z*21+16)});
  cols.push({k:'E',n:e,lab:'Einer',c:'#B06000',bg:'#FFF6DD',w:Math.max(104,Math.min(e,5)*21+16)});
  o+='<defs>'+
   '<linearGradient id="'+id+'h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1E6FC"/><stop offset="1" stop-color="#C9A8F0"/></linearGradient>'+
   '<linearGradient id="'+id+'z" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DCE9FE"/><stop offset=".5" stop-color="#9FC0F8"/><stop offset="1" stop-color="#6FA0EE"/></linearGradient>'+
   '<linearGradient id="'+id+'e" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1BF"/><stop offset="1" stop-color="#F7C948"/></linearGradient></defs>';
  function cube(px,py,w,g,st,dk,dp){ // Würfel/Quader mit Front, Oberseite, Seite
    var t=dp||4;
    return '<polygon points="'+px+','+py+' '+(px+t)+','+(py-t)+' '+(px+w+t)+','+(py-t)+' '+(px+w)+','+py+'" fill="#fff" fill-opacity=".55" stroke="'+st+'" stroke-width="1.4" stroke-linejoin="round"/>'+
      '<polygon points="'+(px+w)+','+py+' '+(px+w+t)+','+(py-t)+' '+(px+w+t)+','+(py-t+w)+' '+(px+w)+','+(py+w)+'" fill="'+dk+'" stroke="'+st+'" stroke-width="1.4" stroke-linejoin="round"/>'+
      '<rect x="'+px+'" y="'+py+'" width="'+w+'" height="'+w+'" rx="2.5" fill="url(#'+g+')" stroke="'+st+'" stroke-width="1.8"/>'}
  cols.forEach(function(c,ci){
    var cx=x,top=8,bodyT=44,bodyB=H-34,mid=cx+c.w/2,i,j;
    o+='<rect x="'+cx+'" y="'+top+'" width="'+c.w+'" height="'+(H-top-6)+'" rx="16" fill="'+c.bg+'" stroke="'+c.c+'" stroke-opacity=".35" stroke-width="1.5"/>';
    o+='<rect x="'+(mid-47)+'" y="'+(top+8)+'" width="94" height="24" rx="12" fill="'+c.c+'"/>'+_t(mid,top+25,12.5,c.k+' · '+c.lab.replace('Hunderter','Hunderter'),'#fff','middle',800).replace('font-size="12.5"','font-size="11"');
    if(c.k==='H'){
      var n=c.n,gx=cx+(c.w-(n*(fs+10)-10))/2;
      for(i=0;i<n;i++){var px=gx+i*(fs+10),py=bodyB-fs;
        o+=cube(px,py,fs,id+'h','#6B2FB8','#B58DE3',5);
        for(j=1;j<10;j++)o+='<line x1="'+(px+j*fs/10)+'" y1="'+(py+1)+'" x2="'+(px+j*fs/10)+'" y2="'+(py+fs-1)+'" stroke="#6B2FB8" stroke-opacity=".28" stroke-width=".8"/><line x1="'+(px+1)+'" y1="'+(py+j*fs/10)+'" x2="'+(px+fs-1)+'" y2="'+(py+j*fs/10)+'" stroke="#6B2FB8" stroke-opacity=".28" stroke-width=".8"/>'}
    }else if(c.k==='Z'){
      var n2=c.n,gx2=cx+(c.w-(n2*21-7))/2;
      for(i=0;i<n2;i++){var px2=gx2+i*21,py2=bodyB-100;
        o+='<polygon points="'+px2+','+py2+' 4,0" fill="none"/>'+
          '<polygon points="'+px2+','+py2+' '+(px2+4)+','+(py2-4)+' '+(px2+18)+','+(py2-4)+' '+(px2+14)+','+py2+'" fill="#fff" fill-opacity=".6" stroke="#1A3FA0" stroke-width="1.4" stroke-linejoin="round"/>'+
          '<polygon points="'+(px2+14)+','+py2+' '+(px2+18)+','+(py2-4)+' '+(px2+18)+','+(py2+96)+' '+(px2+14)+','+(py2+100)+'" fill="#4F83DD" stroke="#1A3FA0" stroke-width="1.4" stroke-linejoin="round"/>'+
          '<rect x="'+px2+'" y="'+py2+'" width="14" height="100" rx="2.5" fill="url(#'+id+'z)" stroke="#1A3FA0" stroke-width="1.8"/>';
        for(j=1;j<10;j++)o+='<line x1="'+px2+'" y1="'+(py2+j*10)+'" x2="'+(px2+14)+'" y2="'+(py2+j*10)+'" stroke="#1A3FA0" stroke-opacity=".5" stroke-width="1"/><line x1="'+(px2+14)+'" y1="'+(py2+j*10)+'" x2="'+(px2+18)+'" y2="'+(py2+j*10-4)+'" stroke="#1A3FA0" stroke-opacity=".5" stroke-width="1"/>'}
    }else{
      var n3=c.n,per=Math.min(n3,5),gx3=cx+(c.w-(per*21-7))/2;
      for(i=0;i<n3;i++){var r=Math.floor(i/5),cc=i%5;o+=cube(gx3+cc*21,bodyB-14-r*21,14,id+'e','#9A5200','#E0A526',4)}
    }
    var val=c.n*(c.k==='H'?100:c.k==='Z'?10:1);
    o+='<line x1="'+(cx+14)+'" y1="'+(H-30)+'" x2="'+(cx+c.w-14)+'" y2="'+(H-30)+'" stroke="'+c.c+'" stroke-opacity=".3" stroke-width="1.2"/>';
    o+=_t(mid,H-12,15,c.n+' '+(c.k==='H'?'H':c.k==='Z'?'Z':'E'),c.c,'middle',800);
    x+=c.w+10;
  });
  var W=x-10;
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="-4 0 '+(W+8)+' '+H+'" width="100%" style="max-width:'+Math.min(400,(W+8)*1.5)+'px;display:block;margin:0 auto" role="img" aria-label="Stellenwert-Material: '+h+' Hunderter, '+z+' Zehner, '+e+' Einer">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function jumpIdx(js){var seen=[];return (js||[]).map(function(j){if(typeof j[2]==='number')return j[2]===99?99:j[2]%8;var a=Math.abs(j[0]),d=seen.indexOf(a);if(d<0){seen.push(a);d=seen.length-1}return [4,5,6][d%3]})}
function jIdxCol(m){return m===99?'#EA4335':DC[m]}
function vJumps(v){
  var JI=jumpIdx(v.jumps),pts=[v.from],i,F='font-family="Arial,Helvetica,sans-serif"',id='jp'+(++_guid);(v.jumps||[]).forEach(function(j){pts.push(pts[pts.length-1]+j[0])});
  var mn=Math.min.apply(null,pts),mx=Math.max.apply(null,pts),pad=(mx-mn)*.06||1,lo=mn-pad,hi=mx+pad,x0=26,x1=574,y=146;
  function X(n){return x0+(x1-x0)*(n-lo)/(hi-lo)}
  var o='<defs>'+[0,1,2,3,4,5,6,7,99].map(function(ci){var cc=ci===99?'#EA4335':DC[ci];return '<marker id="'+id+ci+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 1L9 5L0 9z" fill="'+cc+'"/></marker>'}).join('')+'<filter id="'+id+'s" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#1c2a4a" flood-opacity=".28"/></filter></defs>';
  o+='<rect x="'+(x0-10)+'" y="'+(y-4)+'" width="'+(x1-x0+20)+'" height="8" rx="4" fill="#DDE3EE"/>';
  if(hi-lo<=34&&hi-lo>=3){for(i=Math.ceil(lo);i<=Math.floor(hi);i++){o+='<line x1="'+X(i)+'" y1="'+(y+7)+'" x2="'+X(i)+'" y2="'+(y+13)+'" stroke="#B7C0CF" stroke-width="1.8" stroke-linecap="round"/>'}}
  pts.forEach(function(p,k){var c=k===0?'#34A853':k===pts.length-1?'#4285F4':'#F29900';o+='<circle cx="'+X(p)+'" cy="'+y+'" r="10.5" fill="#fff" stroke="'+c+'" stroke-width="5" filter="url(#'+id+'s)"/><text x="'+X(p)+'" y="'+(y+42)+'" text-anchor="middle" font-size="'+Math.min(v.fs||28,28)+'" font-weight="800" fill="#2B3350" '+F+'>'+(k===pts.length-1&&v.hideEnd?'?':String(v.fmt?v.fmt[k]:p).replace('-','−'))+'</text>'});
  (v.jumps||[]).forEach(function(j,k){var a=X(pts[k]),b=X(pts[k+1]),m=(a+b)/2,r=Math.abs(b-a)/2,h=Math.min(46,Math.max(22,10+r*.55))+((k%2&&(v.jumps.some(function(q,qi){return Math.abs(X(pts[qi+1])-X(pts[qi]))<120})))?34:0),jm=JI[k],jc=jm===99?'#EA4335':DC[jm],lab=String(j[1]),pw=Math.max(58,lab.length*17+24);
    o+='<path d="M'+a+' '+(y-14)+'Q'+m+' '+(y-14-2*h)+' '+b+' '+(y-14)+'" fill="none" stroke="'+jc+'" stroke-width="3.4" stroke-linecap="round" marker-end="url(#'+id+jm+')"/><rect x="'+(m-pw/2)+'" y="'+(y-h-56)+'" width="'+pw+'" height="34" rx="17" fill="#fff" stroke="'+jc+'" stroke-width="2.4" filter="url(#'+id+'s)"/><text x="'+m+'" y="'+(y-h-33)+'" text-anchor="middle" font-size="24" font-weight="800" fill="'+jc+'" '+F+'>'+esc(lab)+'</text>'});
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 204" width="100%" style="display:block;max-width:600px;margin:0 auto" role="img" aria-label="Rechenstrich">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vScene(v){
  var o='',i,k=v.kind,F='font-family="Arial,sans-serif" font-weight="800"';
  if(k==='shop'){
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="188" width="600" height="42" fill="#CFE8C8"/>';
    for(i=0;i<6;i++)o+='<path d="M'+(40+i*52)+' 38h52l-4 34a26 26 0 0 1-44 0z" fill="'+(i%2?'#fff':'#EA4335')+'" stroke="#B3261E" stroke-width="2"/>';
    o+='<rect x="44" y="70" width="8" height="118" fill="#8D6E63"/><rect x="340" y="70" width="8" height="118" fill="#8D6E63"/><rect x="36" y="140" width="320" height="16" rx="5" fill="#A1764A"/><rect x="48" y="156" width="296" height="32" fill="#8D6E63"/>';
    o+='<rect x="70" y="112" width="110" height="34" rx="6" fill="#C69C6D" stroke="#8D6E63" stroke-width="3"/>';
    [[88,112],[110,106],[132,112],[154,106],[99,100],[143,100]].forEach(function(a){o+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="12" fill="#E53935" stroke="#B3261E" stroke-width="2"/><path d="M'+a[0]+' '+(a[1]-12)+'q3-8 8-9" stroke="#2E7D32" stroke-width="3" fill="none"/>'});
    o+='<g class="sc-tag"><rect x="206" y="104" width="86" height="34" rx="8" fill="#FFF3C4" stroke="#F29900" stroke-width="2.5"/><text x="249" y="127" text-anchor="middle" font-size="18" fill="#7A4A00" '+F+'>Äpfel</text></g>';
    for(i=0;i<3;i++)o+='<g class="sc-hop" style="animation-delay:'+(i*.9)+'s"><circle cx="150" cy="104" r="12" fill="#E53935" stroke="#B3261E" stroke-width="2"/><path d="M150 92q3-8 8-9" stroke="#2E7D32" stroke-width="3" fill="none"/></g>';
    o+='<path d="M410 150h120l-14 38h-92z" fill="#C69C6D" stroke="#8D6E63" stroke-width="3"/><path d="M420 150q50-70 100 0" fill="none" stroke="#8D6E63" stroke-width="5"/>';
    o+='<g class="sc-pop"><rect x="392" y="22" width="150" height="46" rx="23" fill="#fff" stroke="#4285F4" stroke-width="3"/><text x="467" y="53" text-anchor="middle" font-size="24" fill="#1A56C8" '+F+'>34 + 25 = ?</text></g>';
  }else if(k==='plates'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="170" width="600" height="60" fill="#E8C99B"/>';
    for(i=0;i<3;i++){var cx=130+i*170;
      o+='<ellipse cx="'+cx+'" cy="168" rx="70" ry="22" fill="#fff" stroke="#9AA3B5" stroke-width="3"/><ellipse cx="'+cx+'" cy="165" rx="52" ry="14" fill="#F1F3F8"/>';
      [[-30,160],[-10,168],[10,160],[30,168]].forEach(function(c,j){o+='<g class="sc-cookie" style="animation-delay:'+(i*.5+j*.18)+'s"><circle cx="'+(cx+c[0])+'" cy="'+(c[1]-10)+'" r="13" fill="#D9A25B" stroke="#A8702E" stroke-width="2"/><circle cx="'+(cx+c[0]-4)+'" cy="'+(c[1]-14)+'" r="2.5" fill="#5D3A1A"/><circle cx="'+(cx+c[0]+5)+'" cy="'+(c[1]-8)+'" r="2.5" fill="#5D3A1A"/></g>'});
    }
    o+='<g class="sc-pop"><rect x="150" y="14" width="300" height="48" rx="24" fill="#fff" stroke="#34A853" stroke-width="3"/><text x="300" y="47" text-anchor="middle" font-size="24" fill="#188038" '+F+'>3 Teller · je 4 Kekse</text></g>';
  }
  else if(k==='talk'){
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="190" width="600" height="40" fill="#CFE8C8"/>';
    [[110,'#FBBC04'],[490,'#34A853']].forEach(function(p,j){o+='<circle cx="'+p[0]+'" cy="150" r="38" fill="'+p[1]+'"/><circle cx="'+(p[0]-13)+'" cy="144" r="5" fill="#202124"/><circle cx="'+(p[0]+13)+'" cy="144" r="5" fill="#202124"/><path d="M'+(p[0]-14)+' 162q14 12 28 0" stroke="#202124" stroke-width="4" fill="none" stroke-linecap="round"/>'});
    var tx=[v.t1||'Hallo!',v.t2||'Hallo!'];
    o+='<g class="sc-pop"><rect x="30" y="24" width="250" height="62" rx="22" fill="#fff" stroke="#F29900" stroke-width="3"/><path d="M90 86l12 26 16-26z" fill="#fff" stroke="#F29900" stroke-width="3"/><text x="155" y="64" text-anchor="middle" font-size="22" fill="#7A4A00" '+F+'>'+esc(tx[0])+'</text></g>';
    o+='<g class="sc-pop" style="animation-delay:1.4s"><rect x="320" y="24" width="250" height="62" rx="22" fill="#fff" stroke="#34A853" stroke-width="3"/><path d="M480 86l12 26 16-26z" fill="#fff" stroke="#34A853" stroke-width="3"/><text x="445" y="64" text-anchor="middle" font-size="22" fill="#188038" '+F+'>'+esc(tx[1])+'</text></g>';
  }else if(k==='letters'){
    var w=String(v.word||'Katze').split(''),cl=['#4285F4','#EA4335','#34A853','#F29900','#A142F4','#12A4AF'],tw=70,x0=(600-w.length*tw)/2;
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="170" width="600" height="60" fill="#E8C99B"/>';
    w.forEach(function(ch,i){o+='<g class="sc-cookie" style="animation-delay:'+(i*.35)+'s"><rect x="'+(x0+i*tw+4)+'" y="96" width="'+(tw-8)+'" height="'+(tw-8)+'" rx="12" fill="#fff" stroke="'+cl[i%6]+'" stroke-width="4"/><text x="'+(x0+i*tw+tw/2)+'" y="'+(96+(tw-8)/2+11)+'" text-anchor="middle" font-size="34" fill="'+cl[i%6]+'" '+F+'>'+esc(ch)+'</text></g>'});
    if(v.say)o+='<g class="sc-pop"><rect x="150" y="16" width="300" height="46" rx="23" fill="#fff" stroke="#4285F4" stroke-width="3"/><text x="300" y="47" text-anchor="middle" font-size="22" fill="#1A56C8" '+F+'>'+esc(v.say)+'</text></g>';
  }else if(k==='words'){
    var dh=function(h){var k=DC.indexOf(h);return(DE&&k>=0&&k<7)?dcol(k):h},ws=(v.words||[['Die','#9AA0A6'],['Katze','#4285F4'],['schläft','#EA4335']]).map(function(w){return[w[0],dh(w[1])]}),n=ws.length,cw=Math.min(150,560/n),xs=(600-n*cw)/2;
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="176" width="600" height="54" fill="#E3E9F5"/>';
    ws.forEach(function(p,i){o+='<g class="sc-cookie" style="animation-delay:'+(i*.5)+'s"><rect x="'+(xs+i*cw+4)+'" y="92" width="'+(cw-8)+'" height="62" rx="14" fill="#fff" stroke="'+p[1]+'" stroke-width="4"/><text x="'+(xs+i*cw+cw/2)+'" y="132" text-anchor="middle" font-size="'+(cw<110?20:26)+'" fill="'+p[1]+'" '+F+'>'+esc(p[0])+'</text></g>'});
    if(v.say)o+='<g class="sc-pop"><rect x="120" y="16" width="360" height="46" rx="23" fill="#fff" stroke="#4285F4" stroke-width="3"/><text x="300" y="47" text-anchor="middle" font-size="22" fill="#1A56C8" '+F+'>'+esc(v.say)+'</text></g>';
  }
  return '<figure class="vis scn" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||'Bild zum Thema')+'" style="border-radius:16px">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vArr(v){
  var P=24,r=v.r,c=v.c,sp=v.split||0,W=c*P+10,H=r*P+10,o='',i,j;
  for(j=0;j<r;j++)for(i=0;i<c;i++){var inA=(v.splitRows?j<sp:i<sp),f=inA?VC[1]:(v.dim?'#D9DDE5':VC[v.col===undefined?0:v.col]);if(!sp)f=VC[v.col===undefined?0:v.col];
    o+='<circle cx="'+(5+i*P+P/2)+'" cy="'+(5+j*P+P/2)+'" r="9" fill="'+f+'" stroke="#fff" stroke-width="1.5"/><ellipse cx="'+(5+i*P+P/2-3)+'" cy="'+(5+j*P+P/2-3.5)+'" rx="3" ry="2" fill="#fff" fill-opacity=".5"/>'}
  if(sp)o+=(v.splitRows?'<line x1="2" x2="'+(W-2)+'" y1="'+(5+sp*P)+'" y2="'+(5+sp*P)+'"':'<line y1="2" y2="'+(H-2)+'" x1="'+(5+sp*P)+'" x2="'+(5+sp*P)+'"')+' stroke="#5f6368" stroke-width="3" stroke-dasharray="6 4"/>';
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(420,Math.round(W*Math.min(1.3,260/H)))+'px;max-height:none;display:block;margin:0 auto" role="img" aria-label="Malfeld">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function vCol(v){
  var a=v.a,b=v.b,plus=v.op!=='-',da=String(a).split('').map(Number),db=String(b).split('').map(Number),n=Math.max(da.length,db.length);
  while(da.length<n)da.unshift(null);while(db.length<n)db.unshift(null);
  var res=plus?a+b:a-b,dr=String(res).split('').map(Number);while(dr.length<n)dr.unshift(null);
  var ca=[],i,c=0,carry=new Array(n).fill(0),dd=da.map(function(x){return x||0}),de=db.map(function(x){return x||0});
  if(plus){for(i=n-1;i>=0;i--){var s=dd[i]+de[i]+c;c=s>=10?1:0;if(i>0&&c)carry[i-1]=1}}
  else{var top=dd.slice();for(i=n-1;i>=0;i--){if(top[i]<de[i]){top[i]+=10;if(i>0){top[i-1]-=1;carry[i-1]=1}}}}
  var cw=44,W=n*cw+70,H=170,o='',x=function(k){return 58+k*cw+cw/2};
  o+='<text x="18" y="86" font-size="30" font-weight="900" fill="#EA4335" font-family="Arial,sans-serif">'+(plus?'+':'−')+'</text>';
  o+='<line x1="10" x2="'+(W-8)+'" y1="98" y2="98" stroke="#2f3a4a" stroke-width="4" stroke-linecap="round"/>';
  var hl=v.hl;
  for(i=0;i<n;i++){
    var tl=['T','H','Z','E'].slice(-n)[i]||'';
    o+='<text x="'+x(i)+'" y="22" text-anchor="middle" font-size="13" font-weight="800" fill="#5F6B7A" font-family="Arial,sans-serif">'+tl+'</text>';
    var colr={T:'#0B7285',H:'#7B3FC4',Z:'#1A56C4',E:'#4B5260'}[tl]||'#1A56C4';
    if(da[i]!==null)o+='<text x="'+x(i)+'" y="'+(plus?58:64)+'" text-anchor="middle" font-size="34" font-weight="900" fill="'+colr+'" font-family="Arial,sans-serif">'+da[i]+'</text>';
    if(db[i]!==null)o+='<text x="'+x(i)+'" y="'+(plus?88:92)+'" text-anchor="middle" font-size="34" font-weight="900" fill="'+colr+'" font-family="Arial,sans-serif">'+db[i]+'</text>';
    if(dr[i]!==null&&v.show!==false)o+='<text x="'+x(i)+'" y="136" text-anchor="middle" font-size="34" font-weight="900" fill="#137333" font-family="Arial,sans-serif">'+(v.hideRes?'?':dr[i])+'</text>';
    if(carry[i]&&v.carry!==false)o+='<circle cx="'+(x(i)+0)+'" cy="'+(plus?112:34)+'" r="0"/>';
  }
  for(i=0;i<n;i++)if(carry[i]&&v.carry!==false){
    // Übertrag steht links der Spalte i+1 -> über Spalte i
    if(plus)o+='<g><circle cx="'+x(i)+'" cy="152" r="11" fill="#FDE9A6" stroke="#B06000" stroke-width="2"/><text x="'+x(i)+'" y="157" text-anchor="middle" font-size="14" font-weight="900" fill="#7A4A00" font-family="Arial,sans-serif">1</text></g>';
    else o+='<g><circle cx="'+(x(i+1)-24)+'" cy="52" r="9.5" fill="#FDE9A6" stroke="#B06000" stroke-width="2"/><text x="'+(x(i+1)-24)+'" y="56" text-anchor="middle" font-size="10" font-weight="900" fill="#7A4A00" font-family="Arial,sans-serif">10</text></g>';
  }
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.max(220,W*2.2)+'px;display:block;margin:0 auto" role="img" aria-label="Schriftliche Rechnung">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
/* ---------- Messstab «ruler» (v5.57): Längen immer auf einem echten Massstab zeigen ----------
   {"type":"ruler","from":0,"to":100,"unit":"cm","lab":10,"tick":1,
    "segs":[[0,30,"30 cm",2],[30,50,"20 cm",0]],   // gemessene Strecken: [von,bis,Text,Farbe 0–7,Spur 0/1/2]
    "pts":[[60,"60 cm",1]],                           // Markierung auf dem Stab: [Wert,Text,Farbe]
    "obj":"✏️","cap":"…"}                               // obj: Gegenstand liegt über der ersten Strecke */
function vRuler(v){
  var a=v.from||0,b=v.to===undefined?100:v.to,R=b-a,x0=30,x1=532,F='font-family="Arial,Helvetica,sans-serif"',id='ru'+(++_guid),o='',i;
  var tick=v.tick||(R<=30?1:R<=200?1:R<=600?5:10),lab=v.lab||(R<=12?1:R<=30?(R<=20?2:5):R<=120?10:R<=300?20:R<=600?50:100),half=lab%2===0?lab/2:0;
  if((x1-x0)/(R/tick)<3.2)tick=lab/ (lab%5===0?5:2);
  function X(n){return x0+(x1-x0)*(n-a)/R}
  var segs=v.segs||[],lanes=0;segs.forEach(function(q){lanes=Math.max(lanes,(q[4]||0)+1)});
  var LH=52,top=(v.obj?58:10)+lanes*LH,ry=top+10,rh=76,H=ry+rh+12;
  o+='<defs><linearGradient id="'+id+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3B8"/><stop offset=".55" stop-color="#FFDF6B"/><stop offset="1" stop-color="#F2C53D"/></linearGradient>'+
     '<filter id="'+id+'s" x="-5%" y="-30%" width="110%" height="170%"><feDropShadow dx="0" dy="2.5" stdDeviation="2.2" flood-color="#7A5A00" flood-opacity=".25"/></filter></defs>';
  /* Stab */
  o+='<rect x="'+(x0-16)+'" y="'+ry+'" width="'+(x1-x0+70)+'" height="'+rh+'" rx="7" fill="url(#'+id+'g)" stroke="#C99A1E" stroke-width="2" filter="url(#'+id+'s)"/>';
  o+='<rect x="'+(x0-14)+'" y="'+(ry+2)+'" width="'+(x1-x0+66)+'" height="11" rx="4" fill="#fff" opacity=".35"/>';
  /* Teilung */
  var n0=Math.ceil(a/tick-1e-9)*tick;
  for(var n=n0;n<=b+1e-9;n+=tick){var nn=Math.round(n*1000)/1000,px=X(nn),isL=Math.abs(nn/lab-Math.round(nn/lab))<1e-6,isH=half&&Math.abs(nn/half-Math.round(nn/half))<1e-6;
    var L=isL?30:isH?21:12;o+='<line x1="'+px.toFixed(1)+'" y1="'+ry+'" x2="'+px.toFixed(1)+'" y2="'+(ry+L)+'" stroke="#3A2E0A" stroke-width="'+(isL?3:1.6)+'" stroke-linecap="round"/>';
    if(isL)o+='<text x="'+px.toFixed(1)+'" y="'+(ry+62)+'" text-anchor="middle" font-size="'+(R/lab>12?20:26)+'" font-weight="800" fill="#2B2208" '+F+'>'+String(nn).replace('.',',')+'</text>'}
  if(v.unit)o+='<text x="'+(x1+38)+'" y="'+(ry+30)+'" text-anchor="middle" font-size="21" font-weight="800" fill="#7A5A00" '+F+'>'+esc(v.unit)+'</text>';
  /* Strecken über dem Stab */
  segs.forEach(function(q){var A=X(q[0]),B=X(q[1]),c=dcol(q[3]===undefined?0:q[3]),ln=q[4]||0,y=ry-14-(lanes-1-ln)*LH-38,w=B-A,t=String(q[2]||'');
    o+='<line x1="'+A.toFixed(1)+'" y1="'+(y+38)+'" x2="'+A.toFixed(1)+'" y2="'+(ry+30)+'" stroke="'+c+'" stroke-width="2" stroke-dasharray="3 3"/><line x1="'+B.toFixed(1)+'" y1="'+(y+38)+'" x2="'+B.toFixed(1)+'" y2="'+(ry+30)+'" stroke="'+c+'" stroke-width="2" stroke-dasharray="3 3"/>';
    o+='<rect x="'+(A+1).toFixed(1)+'" y="'+y+'" width="'+Math.max(4,w-2).toFixed(1)+'" height="38" rx="12" fill="'+c+'"/><rect x="'+(A+1).toFixed(1)+'" y="'+y+'" width="'+Math.max(4,w-2).toFixed(1)+'" height="13" rx="6" fill="#fff" opacity=".18"/>';
    o+='<rect x="'+A.toFixed(1)+'" y="'+(ry-3)+'" width="'+w.toFixed(1)+'" height="6" rx="3" fill="'+c+'" opacity=".85"/>';
    if(t){var fs=Math.min(26,Math.max(14,(w-12)/(t.length*.6)));
      if(t.length*fs*.6<w-8)o+='<text x="'+((A+B)/2).toFixed(1)+'" y="'+(y+19+fs*.36)+'" text-anchor="middle" font-size="'+fs.toFixed(1)+'" font-weight="800" fill="#fff" '+F+'>'+esc(t)+'</text>';
      else o+='<text x="'+((A+B)/2).toFixed(1)+'" y="'+(y-7)+'" text-anchor="middle" font-size="22" font-weight="800" fill="'+c+'" '+F+'>'+esc(t)+'</text>'}});
  /* Gegenstand */
  if(v.obj&&segs.length){var q0=segs[0],A0=X(q0[0]),B0=X(q0[1]),yo=ry-14-lanes*LH-6;
    o+='<text x="'+((A0+B0)/2).toFixed(1)+'" y="'+(yo+4)+'" text-anchor="middle" font-size="44">'+esc(v.obj)+'</text>'}
  /* Punkte */
  (v.pts||[]).forEach(function(p){var px=X(p[0]),c=dcol(p[2]===undefined?1:p[2]);
    o+='<path d="M'+(px-8).toFixed(1)+' '+(ry-14)+'h16l-8 13z" fill="'+c+'"/><line x1="'+px.toFixed(1)+'" y1="'+(ry-1)+'" x2="'+px.toFixed(1)+'" y2="'+(ry+34)+'" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/>';
    if(p[1]){var pw=Math.max(70,String(p[1]).length*15+30);o+='<line x1="'+px.toFixed(1)+'" y1="'+(ry+rh)+'" x2="'+px.toFixed(1)+'" y2="'+(ry+rh+8)+'" stroke="'+c+'" stroke-width="3"/><rect x="'+(Math.min(588-pw,Math.max(12,px-pw/2))).toFixed(1)+'" y="'+(ry+rh+8)+'" width="'+pw+'" height="38" rx="19" fill="#fff" stroke="'+c+'" stroke-width="2.4"/><text x="'+(Math.min(588-pw/2,Math.max(12+pw/2,px))).toFixed(1)+'" y="'+(ry+rh+35)+'" text-anchor="middle" font-size="24" font-weight="800" fill="'+c+'" '+F+'>'+esc(p[1])+'</text>'}});
  if((v.pts||[]).some(function(p){return p[1]}))H+=52;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+H+'" width="100%" style="display:block;max-width:600px;margin:0 auto" role="img" aria-label="'+esc(v.cap||'Messstab')+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
/* ---------- Stellenwert «place» (v5.58): Einer = Punkte, Zehner = Schachtel mit 10 Punkten, Hunderter = Box mit 10 Schachteln ----------
   {"type":"place","h":4,"z":5,"e":6,"sty":1}   sty 1 = Zehner senkrecht, 2 = Zehner waagrecht (Streifen), 3 = Zehner als 2×5-Feld */
function vPlace(v){
  var h=v.h||0,z=v.z||0,e=v.e||0,sty=v.sty||2,d=14,r=5.3,p=3.5,g=3.5,id='pl'+(++_guid),o='';
  var CH='#7B3FC4',CZ='#1A56C4',CE='#4B5260';
  var tc=sty===1?1:sty===2?10:5,tr=sty===1?10:sty===2?1:2,tw=tc*d+2*p,th=tr*d+2*p;            // Zehner-Schachtel
  var hc=sty===1?10:sty===2?1:2,hr=sty===1?1:sty===2?10:5,P2=6,hw=hc*tw+(hc-1)*g+2*P2,hh=hr*th+(hr-1)*g+2*P2+(sty===2?6:0); // Hunderter-Box
  function dot(x,y,k){return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" fill="url(#'+id+'d)" stroke="#2F3542" stroke-width=".9"/>'}
  function ten(x,y){var s='<rect x="'+x+'" y="'+y+'" width="'+tw+'" height="'+th+'" rx="5" fill="#F3F7FE" stroke="'+CZ+'" stroke-width="3.2"/>',i,j;
    for(j=0;j<tr;j++)for(i=0;i<tc;i++)s+=dot(x+p+d/2+i*d,y+p+d/2+j*d,'z');return s}
  /* kompakter Hunderter (Variante 2): 10 schmale Streifen mit kleinen, flachen Punkten */
  var cd=8.4,cr=2.8,cP=6,csh=cd+1.6,csg=1.3,cw=10*cd+4,chw=cw+2*cP,chh=10*csh+9*csg+3+2*cP;
  function hunC(x,y){var s='<rect x="'+x+'" y="'+y+'" width="'+chw+'" height="'+chh+'" rx="7" fill="#F8F3FE" stroke="'+CH+'" stroke-width="4"/>',i,j,yy;
    for(j=0;j<10;j++){yy=y+cP+j*(csh+csg)+(j>=5?3:0);s+='<rect x="'+(x+cP)+'" y="'+yy.toFixed(1)+'" width="'+cw+'" height="'+csh.toFixed(1)+'" rx="2.5" fill="#F3F7FE" stroke="'+CZ+'" stroke-width="1.6"/>';
      if(v.hs==='bars'){s+='<rect x="'+(x+cP+1.5)+'" y="'+(yy+1.5).toFixed(1)+'" width="'+(cw-3)+'" height="'+(csh-3).toFixed(1)+'" rx="1.5" fill="#4F86EC"/>';for(i=1;i<10;i++)s+='<line x1="'+(x+cP+2+i*cd).toFixed(1)+'" x2="'+(x+cP+2+i*cd).toFixed(1)+'" y1="'+(yy+1.5).toFixed(1)+'" y2="'+(yy+csh-1.5).toFixed(1)+'" stroke="#fff" stroke-width=".9" opacity=".8"/>'}
      else for(i=0;i<10;i++)s+='<circle cx="'+(x+cP+2+cd/2+i*cd).toFixed(1)+'" cy="'+(yy+csh/2).toFixed(1)+'" r="'+cr+'" fill="#4B5260"/>'}return s}
  if(sty===2&&v.full!==true){hw=chw;hh=chh}
  function hun(x,y){if(sty===2&&v.full!==true)return hunC(x,y);var s='<rect x="'+x+'" y="'+y+'" width="'+hw+'" height="'+hh+'" rx="9" fill="#F8F3FE" stroke="'+CH+'" stroke-width="4.5"/>',i,j,k=0;
    for(j=0;j<hr;j++)for(i=0;i<hc;i++){s+=ten(x+P2+i*(tw+g),y+P2+j*(th+g)+(sty===2&&j>=5?6:0))}return s}
  /* Anordnung je Spalte */
  var cols=[],G=12;
  if(h){var gc=sty===2&&v.full!==true?(h<=2?h:h<=4?2:3):(h<=1?1:h<=4?2:3),grs=Math.ceil(h/gc);cols.push({k:'H',lab:'Hunderter',c:CH,n:h,w:gc*hw+(gc-1)*G,h:grs*hh+(grs-1)*G,draw:function(x,y){var s='';for(var q=0;q<h;q++)s+=hun(x+(q%gc)*(hw+G),y+Math.floor(q/gc)*(hh+G));return s}})}
  if(h||z){var zc,zr;if(sty===1){zc=Math.max(z,1);zr=1}else if(sty===2){zc=1;zr=Math.max(z,1)}else{zc=z>5?2:1;zr=Math.max(1,Math.ceil(z/zc))}
    var ZG=sty===1?7:6;cols.push({k:'Z',lab:'Zehner',c:CZ,n:z,w:zc*tw+(zc-1)*ZG,h:zr*th+(zr-1)*ZG,draw:function(x,y){var s='';for(var q=0;q<z;q++)s+=ten(x+(q%zc)*(tw+ZG),y+Math.floor(q/zc)*(th+ZG));return s}})}
  var ec=sty===1?1:sty===2?9:5,er=sty===1?9:sty===2?1:2;if(sty===1&&e>5){ec=1}
  cols.push({k:'E',lab:'Einer',c:CE,n:e,w:(sty===2?Math.min(Math.max(e,1),5)*d:ec*d)+2*p,h:(sty===2?(e>5?2:1)*d:sty===1?Math.max(e,1)*d+(e>5?6:0):2*d)+2*p,draw:function(x,y){var s='';
    for(var q=0;q<e;q++){var cx,cy;if(sty===1){cx=x+p+d/2;cy=y+p+d/2+q*d+(q>=5?6:0)}else if(sty===2){cx=x+p+d/2+(q%5)*d;cy=y+p+d/2+Math.floor(q/5)*d}else{cx=x+p+d/2+(q%5)*d;cy=y+p+d/2+Math.floor(q/5)*d}s+=dot(cx,cy,'e')}return s}});
  /* Masse, Schrift relativ zur Gesamtbreite */
  var raw=cols.reduce(function(a,c){return a+c.w},0),fs=Math.max(14,raw*.036),pillH=fs*1.9,pad=fs*.9;
  cols.forEach(function(c){c.pw=c.lab.length*fs*.6+fs*1.4;c.cw=Math.max(c.w+2*pad,c.pw+pad)});
  var W=cols.reduce(function(a,c){return a+c.cw},0)+(cols.length-1)*fs*.6,bodyH=Math.max.apply(null,cols.map(function(c){return c.h})),top=pillH+fs*1.2,H=top+bodyH+fs*3.4,x=0;
  o+='<defs><radialGradient id="'+id+'z" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#C9DCFD"/><stop offset=".5" stop-color="#6FA0EE"/><stop offset="1" stop-color="#3B78E7"/></radialGradient>'+
     '<radialGradient id="'+id+'d" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9AA1AD"/><stop offset=".55" stop-color="#5B6270"/><stop offset="1" stop-color="#3A404C"/></radialGradient></defs>';
  cols.forEach(function(c){var mid=x+c.cw/2;
    o+='<rect x="'+x+'" y="0" width="'+c.cw+'" height="'+H+'" rx="'+fs+'" fill="#fff" stroke="'+c.c+'" stroke-opacity=".35" stroke-width="2"/>';
    o+='<rect x="'+(mid-c.pw/2)+'" y="'+(fs*.6)+'" width="'+c.pw+'" height="'+pillH+'" rx="'+(pillH/2)+'" fill="'+c.c+'"/>'+_t(mid,fs*.6+pillH*.68,fs,c.lab,'#fff','middle',800);
    o+=c.draw(mid-c.w/2,top+(bodyH-c.h));
    o+='<line x1="'+(x+pad)+'" x2="'+(x+c.cw-pad)+'" y1="'+(top+bodyH+fs*.7)+'" y2="'+(top+bodyH+fs*.7)+'" stroke="'+c.c+'" stroke-opacity=".3" stroke-width="2"/>';
    o+=_t(mid,top+bodyH+fs*2.5,fs*1.45,c.n+' '+c.k,c.c,'middle',800);
    x+=c.cw+fs*.6});
  return '<figure class="vis vplace" style="width:100%"><svg viewBox="-2 -2 '+(W+4)+' '+(H+4)+'" width="100%" style="display:block;max-width:'+Math.round(W*1.15)+'px;margin:0 auto" role="img" aria-label="'+(h*100+z*10+e)+' als Hunderter, Zehner und Einer">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
window.VEXT=window.VEXT||{}; /* Erweiterungen: VEXT.typ=function(v){return html} am Ende von p2.js anhängen */
function visuals(list){
  if(!list||!list.length)return '';
  var map={hl:vHl,pic:vPic,symfig:vSymfig,symgrid:vSymgrid,wcol:vWcol,dots:vDots,pie:vPie,numberline:vLine,pairs:vPairs,flip:vFlip,lines:vLines,img:vImg,bar:vBar,conv:vConv,bars:vBars,scale:vScale,tri:vTri,pyth:vPyth,rect:vRect,fbar:vFbar,tbl:vTbl,chips:vChips,tline:vTline,flow:vFlow,anno:vAnno,cards:vCards,area:vArea,emo:vEmo,field:vField,clock:vClock,coins:vCoins,shape:vShape,mtab:vMtab,mreihe:vMreihe,symm:vSymm,solid:vSolid,nline:vNline,angle:vAngle,circle:vCircle,jug:vJug,quader:vQuader,par:vPar,blocks:vPlace,jumps:vJumps,ruler:vRuler,place:vPlace,arr:vArr,col:vCol,wall:vWall,scene:vScene,geo:vGeo};
  /* Farben abgleichen II: Rechenkette (Chips) übernimmt die Farben der Grafik (Punktefeld, Zehner/Einer, Sprünge).
     Gleiche Zahl = gleiche Farbe; Zahlen, die in der Grafik nicht farbig sind (Ergebnis, Summe), neutral (7). */
  var grs=list.filter(function(v){return v.type==='field'||v.type==='blocks'||v.type==='place'||v.type==='jumps'});
  if(grs.length&&list.some(function(v){return v.type==='chips'&&v.parts})){var cmp={},lc=null,set=function(n,c){if(cmp[n]===undefined)cmp[n]=c};
    grs.forEach(function(gr){
      if(gr.type==='field'){var FVc=function(c){return c===4||c===7?'#5B6270':VC[(c||0)%4]};set(gr.filled,FVc(gr.col));if(gr.filled2){set(gr.filled2,FVc(gr.col2===undefined?1:gr.col2));set(gr.filled+gr.filled2,7)}}
      else if(gr.type==='blocks'||gr.type==='place'){lc={H:'#7B3FC4',Z:'#1A56C4',E:'#4B5260'};if(gr.h)set(gr.h*100,lc.H);if(gr.z)set(gr.z*10,lc.Z);if(gr.e)set(gr.e,lc.E)}
      else{var jp=[gr.from],JI=jumpIdx(gr.jumps);(gr.jumps||[]).forEach(function(j){jp.push(jp[jp.length-1]+j[0])});
        cmp[gr.from]='#34A853';if(jp.length>1)cmp[jp[jp.length-1]]='#4285F4';
        (gr.jumps||[]).forEach(function(j,k){set(Math.abs(j[0]),jIdxCol(JI[k]))});jp.slice(1,-1).forEach(function(n){set(n,'#F29900')})}});
    list=list.map(function(v){if(v.type!=='chips'||!v.parts)return v;var o={},np=[],k;for(k in v)o[k]=v[k];
      v.parts.forEach(function(p,pi){var txt=String(p[0]).trim(),split=/\s[+−\-×·:]\s/.test(txt)&&!/[=<>]/.test(txt)&&!/[A-Za-zÄÖÜäöü]/.test(txt),toks=split?txt.split(/\s+/):[txt];
        toks.forEach(function(tk,ti){var m=tk.match(/^(\d+)\s*([HZE])$/),lab=String(p[1]||''),col=p[2],nm=tk.replace('−','-').match(/^[+\-]?(\d+)$/);
          if(/^[+−\-×·:=<>]$/.test(tk))col=p[2];else if(tk==='_')col=7;else if(lc&&m)col=lc[m[2]];
          else if(nm){var n=+nm[1];col=cmp[n]!==undefined?cmp[n]:lc&&/Hunderter/.test(lab)?lc.H:lc&&/Zehner/.test(lab)?lc.Z:lc&&/Einer/.test(lab)?lc.E:7}
          np.push([split?tk:p[0],ti===toks.length-1?p[1]:'',col])});
        var nx=v.parts[pi+1];if(split&&nx&&/^\d+$/.test(String(nx[0]).trim()))np.push(['=',' ',2])});
      o.parts=np;return o})}
  /* Farben abgleichen: Zahlen, die in den Chips farbig sind, bekommen auf dem Zahlenstrahl dieselbe Farbe */
  var ch=list.filter(function(v){return v.type==='chips'&&v.parts}),cm=null,cl={};
  if(ch.length&&list.some(function(v){return v.type==='nline'})){cm={};ch.forEach(function(c){c.parts.forEach(function(p){var n=String(p[0]).trim().replace(',','.');if(/^-?\d+(\.\d+)?$/.test(n)&&p[2]!=null){cm[+n]=p[2];if(p[1])cl[+n]=String(p[1])}})})}
  list=list.map(function(v){if(cm&&v.type==='nline'){var o={};for(var k in v)o[k]=v[k];var pts=(v.pts||[]).slice();Object.keys(cl).forEach(function(n){n=+n;if(n>=v.min&&n<=v.max&&pts.indexOf(n)<0)pts.push(n)});pts.sort(function(a,b){return a-b});o.pts=pts;o._cm=cm;o._cl=cl;return o}return v});
  return '<div class="visrow">'+list.map(function(v){var fn=map[v.type]||(window.VEXT&&window.VEXT[v.type]);return fn?fn(v):''}).join('')+'</div>';
}

/* ---------- Anime-Figur mit Styles ---------- */
var HAIR=['#3B3A4F','#2F7F86','#C2506E','#6D4FD6','#E38B1B'], IRIS=['#6B7BB8','#2FA39B','#D4608A','#8E6BE0','#E3A02F'], LN='#2B2B3A';
function eye(cx,m,iris,gid){
  var sx=cx<50?-1:1;
  if(m===0)return '<path d="M'+(cx-8)+' 57Q'+cx+' 64 '+(cx+8)+' 57" fill="none" stroke="'+LN+'" stroke-width="2.6" stroke-linecap="round"/>';
  if(m===4)return '<path d="M'+(cx-8)+' 60Q'+cx+' 49 '+(cx+8)+' 60" fill="none" stroke="'+LN+'" stroke-width="3" stroke-linecap="round"/>';
  return '<ellipse cx="'+cx+'" cy="57" rx="8.6" ry="11.5" fill="#fff"/><ellipse cx="'+cx+'" cy="58" rx="6.8" ry="9.6" fill="url(#'+gid+')"/><ellipse cx="'+cx+'" cy="59" rx="3" ry="5.2" fill="'+LN+'"/><circle cx="'+(cx-2.6)+'" cy="53" r="'+(m===3?3.4:2.8)+'" fill="#fff"/><circle cx="'+(cx+2.4)+'" cy="63" r="1.5" fill="#fff"/><path d="M'+(cx-9.5)+' 52Q'+cx+' 43 '+(cx+9.5)+' 52" fill="none" stroke="'+LN+'" stroke-width="3" stroke-linecap="round"/><path d="M'+(cx+sx*9)+' 52l'+(sx*3.5)+' -3.5" stroke="'+LN+'" stroke-width="2.2" stroke-linecap="round"/>';
}
function accessory(a,h){
  if(a==='phones')return '<path d="M15 56C12 12 88 12 85 56" fill="none" stroke="#3A3F55" stroke-width="5" stroke-linecap="round"/><rect x="9" y="50" width="10" height="20" rx="5" fill="#3A3F55"/><rect x="81" y="50" width="10" height="20" rx="5" fill="#3A3F55"/>';
  if(a==='glasses')return '<g fill="rgba(255,255,255,.25)" stroke="#2B2B3A" stroke-width="2.6"><rect x="26" y="46" width="23" height="22" rx="8"/><rect x="51" y="46" width="23" height="22" rx="8"/></g><path d="M49 56h2" stroke="#2B2B3A" stroke-width="2.6"/>';
  if(a==='cap')return '<path d="M21 36Q50 2 79 36Z" fill="#E04F4F"/><path d="M14 36H62Q60 43 54 43H16Z" fill="#B83A3A"/>';
  if(a==='cat')return '<path d="M20 30L22 4L42 16Z" fill="'+h+'"/><path d="M80 30L78 4L58 16Z" fill="'+h+'"/><path d="M24 22L25 11L34 17Z" fill="#FF9DB0"/><path d="M76 22L75 11L66 17Z" fill="#FF9DB0"/>';
  if(a==='horns')return '<path d="M26 22L18 4L38 14Z" fill="#F6C945"/><path d="M74 22L82 4L62 14Z" fill="#F6C945"/>';
  if(a==='crown')return '<path d="M30 20L35 4L43 14L50 2L57 14L65 4L70 20Z" fill="#F6C945" stroke="#C9971C" stroke-width="1.5"/>';
  return '';
}
function anime(l,size,skin){
  l=Math.max(0,Math.min(4,l|0));skin=skin===undefined?SKIN:skin;
  var h=(skin&&skin.hair)||HAIR[l],iris=(skin&&skin.iris)||IRIS[l],acc=skin&&skin.acc,gid='ig'+iris.slice(1);
  var s='<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" role="img" aria-label="Anime-Figur"><defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D2147"/><stop offset=".45" stop-color="'+iris+'"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient></defs>';
  s+='<path d="M14 62C6 22 34 4 50 4S94 22 86 62C86 78 80 88 74 94L26 94C20 88 14 78 14 62Z" fill="'+h+'"/>';
  s+='<path d="M20 100C24 90 36 86 50 86S76 90 80 100Z" fill="'+iris+'"/><path d="M42 86L50 96L58 86Z" fill="#fff" opacity=".85"/>';
  s+='<path d="M44 78H56V90H44Z" fill="#F4CDB6"/>';
  s+='<path d="M21 52C21 30 35 21 50 21S79 30 79 52C79 68 71 83 50 87C29 83 21 68 21 52Z" fill="#FFE3D1"/>';
  s+=eye(36,l,iris,gid)+eye(64,l,iris,gid);
  s+=(l===1?'<path d="M26 42L44 47M74 42L56 47" stroke="'+LN+'" stroke-width="2.6" stroke-linecap="round"/>':'<path d="M27 43Q36 39 44 43M56 43Q64 39 73 43" fill="none" stroke="'+h+'" stroke-width="2.4" stroke-linecap="round"/>');
  s+='<path d="M50 63l-1.5 4.5h3" fill="none" stroke="#D9A98C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<path d="M17 56C14 24 34 6 50 6S86 24 83 56C80 44 76 38 72 34C70 44 64 46 60 34C58 44 52 46 48 34C44 44 36 46 33 34C28 38 20 46 17 56Z" fill="'+h+'"/>';
  s+='<path d="M47 8C42 -2 56 -3 54 7" fill="none" stroke="'+h+'" stroke-width="3" stroke-linecap="round"/>';
  s+='<path d="M24 66l5 0M26 69l5 0M70 66l5 0M69 69l5 0" stroke="#FF8FA3" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>';
  s+=['<path d="M46 76Q50 78 54 76" fill="none" stroke="'+LN+'" stroke-width="2.2" stroke-linecap="round"/>',
    '<path d="M45 77Q50 79 56 74" fill="none" stroke="'+LN+'" stroke-width="2.2" stroke-linecap="round"/>',
    '<path d="M43 75Q50 82 57 75" fill="none" stroke="'+LN+'" stroke-width="2.4" stroke-linecap="round"/>',
    '<path d="M43 74Q50 90 57 74Z" fill="#7A2D3D"/><path d="M46 81Q50 78 54 81Q50 84 46 81Z" fill="#E56A7E"/>',
    '<path d="M42 74Q50 92 58 74Z" fill="#7A2D3D"/><path d="M46 82Q50 78 54 82Q50 86 46 82Z" fill="#E56A7E"/>'][l];
  if(l===0)s+='<text x="74" y="26" font-size="15" font-weight="700" fill="#8A8FA8" font-family="sans-serif">z</text><text x="84" y="16" font-size="11" font-weight="700" fill="#8A8FA8" font-family="sans-serif">z</text>';
  if(l===3)s+='<path d="M86 24l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F6C945"/>';
  if(l===4&&!acc)s+='<path d="M86 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F6C945"/><path d="M12 30l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#fff"/>';
  if(acc)s+=accessory(acc,h);
  return s+'</svg>';
}
function av(l,size,skin){
  var cls='av';
  return '<span class="'+cls+'" style="width:'+size+'px;height:'+size+'px">'+avPic(myAv(),size)+'</span>';
}
var SI={
 mathe:'<path d="M9 14h14M16 7v14"/><path d="M27 14h12"/><path d="M10 32l12 12M22 32L10 44"/><path d="M28 35h12M28 41h12"/>',
 franz:'<path d="M24 5L14 46M24 5l10 41M17.5 31h13M11 46h26M20.5 18h7"/>',
 engl:'<path d="M8 6h32a4 4 0 014 4v20a4 4 0 01-4 4H24l-11 9v-9H8a4 4 0 01-4-4V10a4 4 0 014-4z"/><path d="M15 15v11M15 20.5h9M24 15v11M32 19v7M32 14.5v.5"/>',
 deu:'<path d="M10 44L24 8L38 44M15 31h18"/>'
};
function sicon(sb,size){var q=SI[sb.id];return q?'<svg viewBox="0 0 48 52" width="'+(size||26)+'" height="'+(size||26)+'" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+q+'</svg>':esc(sb.name.charAt(0))}

/* ---------- Stufen pro Fach ---------- */
var RND=Math.floor(Math.random()*100000);
function pick(a,k){return a[(RND+(k||0))%a.length]}
var LV=[
 {n:'Frischling',t:'Alle Profis haben mal bei null angefangen.'},
 {n:'Am Grinden',t:'Du bist dran. Jede Runde gibt dir XP.'},
 {n:'Läuft bei dir',t:'Das sitzt schon ziemlich gut.'},
 {n:'Kurz vor Endboss',t:'Nur noch ein paar Aufgaben, dann ist es durch.'},
 {n:'Test-ready',t:'Bereit. Der Test kann kommen.'}
];
var JOKES=['Was sagt die Null zur Acht? Schicker Gürtel.','Bruchrechnen ist wie Pizza teilen, nur ohne Pizza.','Mathe ist wie WLAN: Wenn es läuft, merkt es keiner.','Fehler sind einfach Beta-Versionen von richtigen Antworten.','Dein Gehirn ist ein Muskel. Leider gibt es dafür keinen Proteinshake.'];
var TIPS=['Lieber jeden Tag 10 Minuten als einmal zwei Stunden.','Nach 25 Minuten eine kurze Pause. Dann sitzt mehr.','Schreib dir Merksätze auf Zettel und häng sie auf.','Erkläre jemandem das Gelernte. Wer erklärt, versteht.','Lerne zur gleichen Zeit, dann wird es zur Gewohnheit.'];
var CHEER={
 good:['Sitzt.','Clean.','Läuft.','Easy. Wie der Name sagt.'],
 hard:['Fast. Beim nächsten Mal sitzt es.','Knapp. Dein Hirn merkt sich das trotzdem.','Da fehlt nur ein Hauch.'],
 again:['Kein Drama, kommt gleich nochmal.','Fehler sind Updates für dein Gehirn.','Jetzt weisst du, wo du suchen musst.']
};
function progress(child,topics){var p=prog(child),sum=0,n=0,seen=0;cardsIn(topics).forEach(function(x){n++;var r=p.cards[x.k];if(r){seen++;sum+=Math.min(r.b,capOf(x.c))/capOf(x.c)}});return {pct:n?sum/n:0,seen:seen,total:n}}
function level(child,topics){
  var g=progress(child,topics),l,t;
  if(!g.seen)l=0;else if(g.pct<.4)l=1;else if(g.pct<.75)l=2;else if(g.pct<.95)l=3;else l=4;
  t=LV[l].t;
  if(l===4&&!topics.every(function(tp){return bestNote(child,tp.id)>=5})){l=3;t='Fast alles sitzt. Mach noch die Musterprüfung, dann bist du bereit.'}
  return {lvl:l,pct:g.pct,seen:g.seen,n:LV[l].n,t:t};
}
function lbar(L,mini,skin){
  var w=Math.max(L.seen?4:0,Math.round(L.pct*100)),b='<div class="bar" role="img" aria-label="'+esc(L.n)+', '+w+' Prozent"><i style="width:'+w+'%"></i></div>';
  if(mini)return '<div class="mini"><span class="nm">'+esc(L.n)+'</span>'+b+'</div>';
  return '<div class="lvlfull">'+av(L.lvl,72,skin)+'<div class="lvlmain"><div class="lvlhead"><b>'+esc(L.n)+'</b><span class="pct">'+w+'%</span></div><p class="lvltxt">'+esc(L.t)+'</p>'+b+'</div></div>';
}

/* ---------- Notizfeld ---------- */
function padDefault(key){if(key.indexOf('p:')===0){var x=cardIdx[key.slice(2)];return false}return false}
function padOpen(key){return nav.padOpen&&nav.padOpen[key]!==undefined?nav.padOpen[key]:padDefault(key)}
function padHTML(key,qtext){
  var open=padOpen(key),btn='<button class="btn sm padb" data-act="pad" data-key="'+esc(key)+'" aria-label="Notiz">'+(open?'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16z"/></svg>')+'<span style="margin-left:6px">Notiz'+(open?' schliessen':'')+'</span></button>'+(calcAvail()?'<button class="btn sm padb" data-act="calc" aria-label="Taschenrechner">🧮<span style="margin-left:6px">Rechner</span></button>':'');
  if(!open)return {btn:btn,box:''};
  var tl=[['ink','Stift'],['erase','Radierer']].map(function(t){return '<button class="tool'+(penTool===t[0]?' on':'')+'" data-act="tool" data-tool="'+t[0]+'"><i class="sw '+t[0]+'"></i>'+t[1]+'</button>'}).join('');
  var box='<div class="pad"><div class="padbar">'+tl+'<button class="tool" data-act="padclear" data-key="'+esc(key)+'">Leeren</button></div><div class="padwrap"><canvas class="padcv" data-key="'+esc(key)+'" data-q="" aria-label="Zeichenfläche für die Notiz"></canvas></div></div>';
  return {btn:btn,box:box};
}
function colorOf(cv,t){var cs=getComputedStyle(cv),v=cs.getPropertyValue({ink:'--ink',accent:'--accent',bad:'--bad'}[t]||'--ink').trim();return v||'#888'}
function redraw(cv){
  var strokes=PADS[cv.dataset.key]||[],ctx=cv.getContext('2d'),w=cv.width,h=cv.height,k=cv.clientWidth?cv.width/cv.clientWidth:1;
  ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';
  strokes.forEach(function(s){
    if(!s.p.length)return;ctx.save();
    ctx.globalCompositeOperation=s.t==='erase'?'destination-out':'source-over';
    ctx.strokeStyle=s.t==='erase'?'#000':colorOf(cv,s.t);ctx.lineWidth=(s.t==='erase'?22:3.4)*k;
    ctx.beginPath();s.p.forEach(function(pt,i){var x=pt[0]*w,y=pt[1]*h;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});
    if(s.p.length===1)ctx.lineTo(s.p[0][0]*w+.1,s.p[0][1]*h);
    ctx.stroke();ctx.restore();
  });
  var qt=cv.dataset.q;
  if(qt){ctx.save();ctx.globalCompositeOperation='destination-over';ctx.fillStyle=colorOf(cv,'ink');ctx.globalAlpha=.6;ctx.font='700 '+(46*k)+'px ui-monospace,Menlo,Consolas,monospace';ctx.textBaseline='top';
    var words=qt.split(' '),line='',y=10*k,maxW=w-24*k;
    words.forEach(function(wd){var t=line?line+' '+wd:wd;if(ctx.measureText(t).width>maxW&&line){ctx.fillText(line,12*k,y);y+=58*k;line=wd}else line=t});
    if(line)ctx.fillText(line,12*k,y);ctx.restore()}
}
function initPads(){
  if(!document.querySelectorAll)return;
  Array.prototype.forEach.call(document.querySelectorAll('.padcv'),function(cv){
    if(!cv.getContext)return;
    var dpr=window.devicePixelRatio||1,cw=cv.clientWidth||600,ch=cv.clientHeight||250;
    cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr);
    var key=cv.dataset.key;PADS[key]=PADS[key]||[];redraw(cv);
    if(cv._bound)return;cv._bound=true;
    var cur=null;
    function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]}
    cv.addEventListener('pointerdown',function(e){e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}cur={t:penTool,p:[pt(e)]};PADS[key].push(cur);redraw(cv)});
    cv.addEventListener('pointermove',function(e){if(!cur)return;e.preventDefault();cur.p.push(pt(e));redraw(cv)});
    function end(){cur=null}
    cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('pointerleave',end);
  });
}

/* ---------- Schriftlich rechnen: Untereinander-Raster (kl4–kl6, Oberstufe nutzt den Rechner) ---------- */
var WC_T={'kl4-mathe-schriftlich-plus':1,'kl4-mathe-schriftlich-minus':1,'kl5-mathe-schriftlich-mal':1,'kl5-mathe-schriftlich-durch':1};
var WCS={},WCSPEC={};
var WC_PL=['Einer','Zehner','Hunderter','Tausender','Zehntausender'];
function wcD(n){return String(n).split('').map(Number)}
/* Löst die Aufgabe so, wie sie auf Papier steht. Übertrag = kleine Zahl über dem Strich (+1). */
function wcSolve(op,a,b){
  var s={op:op,a:a,b:b},i,k;
  if(op==='+'||op==='−'||op==='×'){
    var res=op==='+'?a+b:op==='−'?a-b:a*b;if(res<0)return null;
    var da=wcD(a),db=wcD(b),dr=wcD(res),N=op==='−'?da.length:Math.max(da.length,dr.length,op==='+'?db.length:0);
    if(op==='×'&&db.length>1)return null;
    s.res=res;s.N=N;s.top=[];s.bot=[];s.out=[];s.car=[];s.guide=[];
    for(i=0;i<N;i++){s.top.push(null);s.bot.push(null);s.out.push(null);s.car.push(0)}
    da.forEach(function(d,j){s.top[N-da.length+j]=d});
    if(op!=='×')db.forEach(function(d,j){s.bot[N-db.length+j]=d});
    dr.forEach(function(d,j){s.out[N-dr.length+j]=d});
    var c=0;
    for(k=0;k<N;k++){i=N-1-k;var t=s.top[i],u=s.bot[i],pl=WC_PL[k]||'Stelle',g;
      if(op==='+'){if(t==null&&u==null&&!c){g='';}else{var sum=(t||0)+(u||0)+c,parts=[t,u].filter(function(x){return x!=null});g=pl+': '+parts.join(' + ')+(c?' + '+c+' (Übertrag)':'')+' = _';c=sum>=10?1:0}}
      else if(op==='−'){if(t==null){g=''}else{var uu=(u||0)+c;g=pl+': '+t+' − '+(c?'('+(u||0)+' + '+c+')':(u||0))+(t<uu?' geht nicht. Rechne mit 10 mehr: '+(t+10)+' − '+uu+' = _':' = _');c=t<uu?1:0}}
      else{if(t==null){g=c?pl+': nur noch der Übertrag '+c:'';c=0}else{var p=t*b+c;g=pl+': '+t+' × '+b+(c?' + '+c+' (Übertrag)':'')+' = _';c=Math.floor(p/10)}}
      s.guide[i]=g;if(i>0&&c)s.car[i-1]=c}
    return s}
  if(op===':'){
    if(b<1||b>9)return null;
    var D=wcD(a),n=D.length,pos=0,cur=0,qd=[],rows=[];
    while(pos<n&&cur<b&&pos<n){cur=cur*10+D[pos];pos++;if(cur>=b)break}
    var first=true;
    while(true){var x=Math.floor(cur/b),pr=x*b,rm=cur-pr;qd.push(x);
      s.guide=s.guide||[];s.guide.push('Wie oft passt '+b+' in '+cur+'? Dann mal '+b+' und abziehen.');
      rows.push({v:pr,end:pos-1,minus:1});
      if(pos<n){rm=rm*10+D[pos];rows.push({v:rm,end:pos,dig:String(rm).length<2&&rm<10?1:0});pos++;cur=rm}
      else{rows.push({v:rm,end:pos-1,last:1});break}
      first=false}
    var q=Math.floor(a/b);if(Number(qd.join(''))!==q)return null;
    s.res=q;s.rest=a%b;s.N=n;s.qd=wcD(q);s.rows=rows;s.D=D;return s}
  return null;
}
/* Welche Aufgabe steckt in Karte/Prüfungsfrage? Nur bei den schriftlichen Themen. */
function wcFor(tid,it){
  if(!it||!WC_T[tid])return null;
  var q=String(it.q||''),m,o=null,ans=it.a!=null?String(it.a):(it.type==='mc'&&it.options?String(it.options[it.answer]):String((it.answer||[''])[0]));
  if(m=/^(\d+) ([+−×:]) (\d+) =( _ \(mit Rest\))?$/.exec(q))o={op:m[2],a:+m[1],b:+m[3],pure:1};
  else if(m=/^Rechne (\d+) : (\d+)\.$/.exec(q))o={op:':',a:+m[1],b:+m[2],pure:1};
  else if(m=/(\d+) Packungen mit je (\d+)/.exec(q))o={op:'×',a:+m[2],b:+m[1]};
  else if(!/Übertrag|Einer|Rest gibt|Probe|_/.test(q)&&it.steps&&it.steps.length){var st=String(it.steps[it.steps.length-1][0]);if(m=/^(\d+) ([+−×:]) (\d+) = (\d+)( Rest \d+)?$/.exec(st))o={op:m[2],a:+m[1],b:+m[3]}}
  if(!o)return null;
  var s=wcSolve(o.op,o.a,o.b);if(!s)return null;
  var mr=/^(\d+)(?: Rest (\d+))?$/.exec(ans.trim());if(!mr||+mr[1]!==s.res)return null;
  if(mr[2]!=null&&+mr[2]!==s.rest)return null;
  s.pure=o.pure;s.withRest=mr[2]!=null;return s;
}
var WC_ACT=null;
function wcCell(col,row,cls,html,span){if(WC_ACT!=null&&col===WC_ACT&&/wc-dg|wc-rs|wc-cr/.test(cls))cls+=' wc-on';return '<span class="wc-c '+cls+'" data-col="'+col+'" style="grid-column:'+col+(span?' / span '+span:'')+';grid-row:'+row+'">'+html+'</span>'}
function wcIn(key,r,i,val,cls,col){return '<input class="wcin '+cls+'" data-k="'+esc(key)+'" data-r="'+r+'" data-i="'+i+'" data-col="'+col+'" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="off" aria-label="'+(r==='c'?'Übertrag':r==='s'?'Notiz':'Ziffer')+'" value="'+esc(val||'')+'">'}
/* v: {type:'wcol',s|op,a,b, mode:'show'|'blank'|'live', upto, hideRes, key} – Häuschenpapier wie im Heft */
function vWcol(v){
  var s=v.s||wcSolve(v.op,v.a,v.b);if(!s)return '';
  var mode=v.mode||'show',key=v.key||'',st=mode==='live'?(WCS[key]||(WCS[key]={r:{},c:{},s:{},x:{}})):null,o='',i;
  if(mode==='live')WCSPEC[key]=s;
  WC_ACT=null;if(mode==='live'&&v.guide&&s.op!==':'){for(var a0=s.N-1;a0>=0;a0--)if(!st.r[a0]&&(s.guide[a0]||s.out[a0]!=null)){WC_ACT=a0+2;break}}
  var up=v.upto==null?99:v.upto,shown=function(i){return s.N-1-i<up},hide=mode==='blank'||v.hideRes,cols,rows;
  var box=function(r,i,val,col){return mode==='live'?wcIn(key,r,i,val,r==='c'?'wc-cbox':'wc-box',col):'<i class="'+(r==='c'?'wc-cbox':'wc-box')+'"></i>'};
  if(s.op!==':'){
    var N=s.N,mal=s.op==='×',db=mal?wcD(s.b):[],R1=1,R2=mal?1:2,RC=R2+1,RR=RC+1;
    cols=N+1+(mal?1+db.length:0);rows=RR;
    for(i=0;i<N;i++){var col=i+2;
      if(s.top[i]!=null)o+=wcCell(col,R1,'wc-dg',s.top[i]);
      if(!mal&&s.bot[i]!=null)o+=wcCell(col,R2,'wc-dg',s.bot[i]);
      var cv=s.car[i];
      if(i<N-1){
        if(mode==='live')o+=wcCell(col,RC,'wc-cr',box('c',i,st.c[i],col));
        else if(mode==='blank'&&cv&&v.cslot)o+=wcCell(col,RC,'wc-cr',box('c',i,'',col));
        else if(mode==='show'&&cv&&shown(i+1)&&!v.hideRes)o+=wcCell(col,RC,'wc-cr wc-cy','<b>'+cv+'</b>');
        else o+=wcCell(col,RC,'wc-cr','');
      }else o+=wcCell(col,RC,'wc-cr','');
      if(mode==='live')o+=wcCell(col,RR,'wc-rs',box('r',i,st.r[i],col));
      else if(hide)o+=wcCell(col,RR,'wc-rs',box('r',i,'',col));
      else if(s.out[i]!=null&&shown(i))o+=wcCell(col,RR,'wc-rs wc-ok',s.out[i]);
      else o+=wcCell(col,RR,'wc-rs','');
    }
    if(mal){o+=wcCell(N+2,R1,'wc-op','×');db.forEach(function(d,j){o+=wcCell(N+3+j,R1,'wc-dg wc-b',d)})}
    else o+=wcCell(1,R2,'wc-op',s.op==='−'?'−':'+');
    o+='<span class="wc-ln" style="grid-column:1 / span '+(mal?N+1:N+1)+';grid-row:'+RC+'"></span>';
    if(!hide&&mode!=='live'&&up>=N)o+='<span class="wc-dl" style="grid-column:2 / span '+N+';grid-row:'+RR+'"></span>';
    if(mode==='live'||hide)o+='<span class="wc-dl wc-dl0" style="grid-column:2 / span '+N+';grid-row:'+RR+'"></span>';
  }else{
    var n=s.N,dvs=wcD(s.b),q=s.qd,cq=n+2,cb=cq+1,ce=cb+dvs.length,cr=ce+1,rc=cr+q.length;
    cols=s.withRest?rc+1:rc-1;rows=1+s.rows.length;
    s.D.forEach(function(d,j){o+=wcCell(j+2,1,'wc-dg',d)});
    o+=wcCell(cq,1,'wc-op',':');dvs.forEach(function(d,j){o+=wcCell(cb+j,1,'wc-dg wc-b',d)});o+=wcCell(ce,1,'wc-op','=');
    var qShow=function(j){return j<(v.upto==null?99:v.upto)};
    q.forEach(function(d,j){var c=cr+j;
      if(mode==='live')o+=wcCell(c,1,'wc-rs',box('r',j,st.r[j],c));
      else if(hide||!qShow(j))o+=wcCell(c,1,'wc-rs',box('r',j,'',c));
      else o+=wcCell(c,1,'wc-rs wc-ok',d)});
    if(s.withRest){o+=wcCell(rc,1,'wc-op wc-sm','R');
      if(mode==='live')o+=wcCell(rc+1,1,'wc-rs',box('x',0,st.x[0],rc+1));
      else if(hide)o+=wcCell(rc+1,1,'wc-rs',box('x',0,'',rc+1));
      else o+=wcCell(rc+1,1,'wc-rs wc-ok',s.rest)}
    o+='<span class="wc-dl'+(mode==='live'||hide?' wc-dl0':'')+'" style="grid-column:'+cr+' / span '+q.length+';grid-row:1"></span>';
    var rowN=2,si=0;
    s.rows.forEach(function(r,ri){var ds=wcD(r.v),st0=r.end-ds.length+1,vis=!(v.upto!=null&&Math.floor(ri/2)>=v.upto);
      if(r.minus)o+=wcCell(st0+1,rowN,'wc-op wc-mn','−');
      ds.forEach(function(d,j){var c=st0+j+2,cls='wc-wk'+(r.last?' wc-last':'')+(!r.minus&&!r.last&&j===ds.length-1?' wc-down':'');
        if(mode==='live')o+=wcCell(c,rowN,cls,wcIn(key,'s',si,st.s[si],'wc-sbox',c));
        else if(hide||!vis)o+=wcCell(c,rowN,cls,'<i class="wc-sbox"></i>');
        else o+=wcCell(c,rowN,cls,d);
        si++});
      if(r.minus)o+='<span class="wc-ul2" style="grid-column:'+(st0+2)+' / span '+ds.length+';grid-row:'+rowN+'"></span>';
      rowN++});
  }
  var g='<div class="wcg'+(s.op===':'?' wcdv':'')+'" style="--wcn:'+cols+';grid-template-columns:repeat('+cols+',var(--wcw));grid-template-rows:repeat('+rows+',var(--wcw))">'+o+'</div>';
  return wcWrap(v,s,key,g,mode);
}
function wcWrap(v,s,key,g,mode){WC_ACT=null;
  var guide=mode==='live'&&v.guide?'<p class="wc-guide" data-k="'+esc(key)+'">'+esc(wcGuide(s,WCS[key]))+'</p><p class="wc-rule">'+wcRule(s)+'</p>':'';
  return '<figure class="vis wcf'+(mode==='live'?' wclive':'')+'" data-k="'+esc(key)+'">'+(v.lab?'<p class="wc-lab">'+esc(v.lab)+'</p>':'')+g+guide+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
}
function wcRule(s){
  if(s.op==='+')return 'Von rechts nach links. Gibt es 10 oder mehr: Einerziffer unten hinschreiben, die <b>1</b> klein über den Strich bei der nächsten Stelle.';
  if(s.op==='−')return 'Von rechts nach links. Oben zu klein? Rechne mit 10 mehr und schreibe eine kleine <b>1</b> über den Strich bei der nächsten Stelle. Diese 1 zählst du unten dazu.';
  if(s.op==='×')return 'Von rechts nach links. Einerziffer unten hinschreiben, die Zehner als kleine <b>Zahl</b> über den Strich bei der nächsten Stelle.';
  return 'Von links nach rechts. Teilen, mal rechnen, abziehen, nächste Ziffer herunterholen.'+(s.withRest?' Was am Schluss übrig bleibt, kommt hinter R.':'');
}
function wcGuide(s,st){
  st=st||{r:{},c:{},s:{},x:{}};var i;
  if(s.op===':'){for(i=0;i<s.qd.length;i++)if(!st.r[i])return s.guide[i]||'';if(s.withRest&&!st.x[0])return 'Was bleibt am Schluss übrig? Schreibe es hinter R.';return 'Alles ausgefüllt? Dann prüfe dein Ergebnis.'}
  for(i=s.N-1;i>=0;i--){if(!st.r[i]&&(s.guide[i]||s.out[i]!=null))return (s.guide[i]||WC_PL[s.N-1-i]+': _')}
  return 'Alles ausgefüllt? Dann prüfe dein Ergebnis.'
}
function wcValue(key){
  var s=WCSPEC[key],st=WCS[key];if(!s||!st)return '';
  var n=s.op===':'?s.qd.length:s.N,d=[],i,started=false,gap=false;
  for(i=0;i<n;i++){var x=st.r[i]||'';if(x)started=true;if(started){if(!x)gap=true;d.push(x)}}
  if(gap||!d.length)return '';
  var v=String(Number(d.join('')));
  if(s.op===':'&&s.withRest){if(!st.x[0])return '';v+=' Rest '+st.x[0]}
  return v;
}
function wcHl(fig,s,st){
  if(!fig)return;var col=null,i;
  if(s.op!==':'){for(i=s.N-1;i>=0;i--)if(!st.r[i]&&(s.guide[i]||s.out[i]!=null)){col=i+2;break}}
  fig.querySelectorAll('span[data-col]').forEach(function(e){e.classList.toggle('wc-on',col!=null&&+e.getAttribute('data-col')===col&&/wc-dg|wc-rs|wc-cr/.test(e.className))});
}
function wcBind(root){
  (root||document).querySelectorAll('figure.wclive').forEach(function(f){var k=f.getAttribute('data-k');if(WCSPEC[k])wcHl(f,WCSPEC[k],WCS[k]||{r:{}})});
}
document.addEventListener('input',function(e){
  var t=e.target;if(!t||!t.classList||!t.classList.contains('wcin'))return;
  var v=String(t.value||'').replace(/\D/g,'').slice(-1);t.value=v;
  var k=t.getAttribute('data-k'),r=t.getAttribute('data-r'),i=+t.getAttribute('data-i'),st=WCS[k]||(WCS[k]={r:{},c:{},s:{},x:{}}),s=WCSPEC[k];
  st[r][i]=v;
  var val=wcValue(k);
  if(k.indexOf('e:')===0){var qid=k.split(':').pop();nav.answers=nav.answers||{};nav.answers[qid]=val}
  else{nav.typed=val;var a=document.getElementById('ans');if(a)a.value=val}
  var fig=t.closest('figure'),gp=fig&&fig.querySelector('.wc-guide');if(gp&&s)gp.textContent=wcGuide(s,st);
  if(s&&gp)wcHl(fig,s,st);
  if(v&&fig){var nx=null;
    if(r==='r'&&s&&s.op!==':')nx=fig.querySelector('input[data-r="r"][data-i="'+(i-1)+'"]');
    else if(r==='r')nx=fig.querySelector('input[data-r="r"][data-i="'+(i+1)+'"]')||fig.querySelector('input[data-r="x"]');
    else if(r==='c')nx=fig.querySelector('input[data-r="r"][data-i="'+i+'"]');
    else if(r==='s')nx=fig.querySelector('input[data-r="s"][data-i="'+(i+1)+'"]');
    if(nx&&!nx.value)try{nx.focus()}catch(x){}}
});
document.addEventListener('keydown',function(e){
  var t=e.target;if(!t||!t.classList||!t.classList.contains('wcin'))return;
  if(e.key==='Enter'){e.preventDefault();if(nav.view==='practice'&&typeof ACT!=='undefined'&&ACT.check)ACT.check()}
  if(e.key==='Backspace'&&!t.value){var f=t.closest('figure'),r=t.getAttribute('data-r'),i=+t.getAttribute('data-i'),s=WCSPEC[t.getAttribute('data-k')],p=null;
    if(r==='r'&&f&&s)p=f.querySelector('input[data-r="r"][data-i="'+(s.op===':'?i-1:i+1)+'"]');if(p){e.preventDefault();try{p.focus()}catch(x){}}}
});

/* ---------- Aufgaben: Hauptfrage gross, Zusatz/Anleitung klein darunter ---------- */
var Q_INS=/^(Schreibe|Runde|Gib|Antworte|Kürze|Achte|Tipp|Hinweis|Benutze|Verwende|Kreuze|Nur|Mit|In|Ganze|Ohne|Rechne im Kopf|Rechne mit)\b/;
function qSplit(t){
  t=String(t==null?'':t).trim();var sub=[],m,g=0;
  if(t.indexOf('\n')>=0)return {main:t,sub:''};
  while(g++<4&&(m=/\s*\(([^()]{2,80})\)\s*\.?$/.exec(t))&&(Q_INS.test(m[1].trim())||/^(in|auf) [a-zäöüA-Z²³ ]{1,14}$/.test(m[1].trim()))&&m.index>0){
    var x=m[1].trim();if(/\?/.test(x))break;sub.unshift(/^in [a-zäöüA-Z²³ ]{1,14}$/i.test(x)?'Antwort '+x.toLowerCase().replace(/^in /,'in ')+'.':/[.!?]$/.test(x)?x:x.charAt(0).toUpperCase()+x.slice(1)+'.');t=t.slice(0,m.index).trim()}
  var parts=t.split(/(?<=[.!?:])\s+(?=[A-ZÄÖÜ])/);
  if(parts.length>1){var keep=[parts[0]],mv=[];for(var i=1;i<parts.length;i++){if(/^(Schreibe|Runde|Gib|Antworte|Kürze|Achte|Tipp|Hinweis|Benutze|Verwende|Kreuze)\b/.test(parts[i])&&!/[?_]/.test(parts[i]))mv.push(parts[i]);else keep.push(parts[i])}
    if(mv.length&&/[?_=]|:$/.test(keep.join(' '))){sub=sub.concat(mv);t=keep.join(' ')}}
  return {main:t,sub:sub.join(' ')};
}

/* ---------- Grafiken in Aufgaben: Hilfe ja, Lösung nein ---------- */
var VT_SKIP={coins:1,bars:1,tbl:1,wcol:1,clock:1,symgrid:1,symfig:1,pic:1,solid:1};
var VT_ABBR={kilogramm:'kg',gramm:'g',meter:'m',zentimeter:'cm',millimeter:'mm',kilometer:'km',liter:'l',milliliter:'ml',dezimeter:'dm',minuten:'min',stunden:'h',sekunden:'s'};
function vtRe(s){return s.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&')}
function vtTxt(h){return String(h).replace(/<style[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ')}
/* Zeigt die Grafik einer Aufgabe ohne Lösung: Bildunterschriften mit der Lösung fallen weg, Lösungszahlen/-wörter werden zu «_». */
function visT(list,ans,q,opts){
  if(!list||!list.length)return '';
  var A=String(ans==null?'':ans).replace(/\s+/g,' ').trim(),Q=' '+String(q||'').toLowerCase()+' ';
  if(!A)return visuals(list);
  var nums=(A.match(/\d+(?:[.,]\d+)?/g)||[]).filter(function(n){return !new RegExp('(^|[^\\d.,\\/])'+vtRe(n.toLowerCase())+'(?!\\d|[.,]\\d|\\/)').test(Q)});
  var words=[];
  if(!/\d/.test(A)){var w=A.toLowerCase().replace(/[.!?]$/,'');if(w.length>=3&&Q.indexOf(w)<0)words.push(w);if(VT_ABBR[w]&&!new RegExp('[^a-zäöü]'+VT_ABBR[w]+'[^a-zäöü]').test(Q))words.push(VT_ABBR[w])}
  if(!nums.length&&!words.length)return visuals(list);
  var reN=nums.map(function(n){return new RegExp('(^|[^\\d.,\\/])'+vtRe(n)+'(?!\\d|[.,]\\d)','g')});
  var reW=words.map(function(w){return new RegExp('(^|[^a-zäöüß])'+vtRe(w)+'(?![a-zäöüß])','gi')});
  var has=function(s){s=' '+s+' ';return reN.some(function(r){r.lastIndex=0;return r.test(s)})||reW.some(function(r){r.lastIndex=0;return r.test(s)})};
  var fix=function(s){reN.concat(reW).forEach(function(r){s=s.replace(r,'$1_')});return s};
  return '<div class="visrow">'+list.map(function(v){
    var h=visuals([v]).replace(/^<div class="visrow">/,'').replace(/<\/div>$/,'');
    if(VT_SKIP[v.type]||!h||(v.type==='nline'&&v.q==null))return h;
    h=h.replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g,function(m,inner){return has(vtTxt(inner))?'':m});
    var vt=' '+vtTxt(h).toLowerCase()+' ',choice=opts&&opts.length>1&&opts.filter(function(o){var s=String(o).toLowerCase().trim();return s&&!/^\d+$/.test(s)&&new RegExp('(^|[^a-zäöüß0-9])'+vtRe(s)+'(?![a-zäöüß0-9])').test(vt)}).length>=2;
    if(choice)return h;
    var out='',inStyle=false;
    h.split(/(<[^>]+>)/).forEach(function(seg){
      if(seg.charAt(0)==='<'){if(/^<style/i.test(seg))inStyle=true;if(/^<\/style/i.test(seg))inStyle=false;
        out+=seg.replace(/(aria-label|title)="([^"]*)"/g,function(m,k,val){return k+'="'+fix(' '+val).slice(1)+'"'});return}
      out+=inStyle?seg:fix(seg)});
    return out}).join('')+'</div>';
}

/* ---------- Form und Raum: Bilder statt Text ---------- */
function vPic(v){return '<figure class="vis picv"><div class="picbig" aria-hidden="true">'+v.e+'</div>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>'}
var SYMF={
 butterfly:'<path d="M100 60C70 20 22 26 30 70c6 30 40 34 66 18" fill="#F9AB00"/><path d="M100 60c30-40 78-34 70 10-6 30-40 34-66 18" fill="#F9AB00"/><path d="M98 92C70 100 44 120 58 140c12 16 34 2 42-22" fill="#EA4335"/><path d="M102 92c28 8 54 28 40 48-12 16-34 2-42-22" fill="#EA4335"/><circle cx="64" cy="62" r="9" fill="#fff" opacity=".7"/><circle cx="136" cy="62" r="9" fill="#fff" opacity=".7"/><rect x="95" y="48" width="10" height="92" rx="5" fill="#3C4043"/><path d="M98 50l-12-22M102 50l12-22" stroke="#3C4043" stroke-width="3" stroke-linecap="round"/>',
 heart:'<path d="M100 150C40 108 26 78 42 54c14-20 44-18 58 6 14-24 44-26 58-6 16 24 2 54-58 96z" fill="#EA4335"/><ellipse cx="66" cy="66" rx="10" ry="6" fill="#fff" opacity=".5" transform="rotate(-30 66 66)"/>',
 star:'<path d="M100 22l20 46 50 4-38 32 12 49-44-27-44 27 12-49-38-32 50-4z" fill="#FBBC04" stroke="#E37400" stroke-width="3" stroke-linejoin="round"/>',
 house:'<rect x="50" y="80" width="100" height="72" fill="#F6E3C6" stroke="#8D6E63" stroke-width="3"/><path d="M40 84l60-52 60 52z" fill="#EA4335"/><rect x="88" y="112" width="24" height="40" fill="#8D6E63"/><rect x="58" y="96" width="20" height="18" fill="#AECBFA"/><rect x="122" y="96" width="20" height="18" fill="#AECBFA"/>',
 tree:'<rect x="94" y="100" width="14" height="54" fill="#8D6E63"/><path d="M102 112l-36-34M104 92l30-40" stroke="#8D6E63" stroke-width="7" stroke-linecap="round"/><circle cx="62" cy="72" r="20" fill="#34A853"/><circle cx="138" cy="48" r="26" fill="#34A853"/><circle cx="104" cy="70" r="14" fill="#5BB974"/>',
 hand:'<path d="M70 150c-8-20-12-40-12-60V64c0-8 12-8 12 0v26V44c0-8 12-8 12 0v44V36c0-8 12-8 12 0v52V44c0-8 12-8 12 0v50l10-16c6-8 16-2 12 6l-18 34c-6 14-14 26-14 32z" fill="#F2BC96" stroke="#C98A66" stroke-width="2.5" stroke-linejoin="round"/>',
 ball:'<circle cx="100" cy="92" r="58" fill="#fff" stroke="#3C4043" stroke-width="3"/><path d="M100 64l20 14-8 24h-24l-8-24z" fill="#3C4043"/><path d="M100 34v30M120 78l30-8M112 102l18 26M88 102l-18 26M80 78l-30-8" stroke="#3C4043" stroke-width="3"/>',
 flag:'<rect x="56" y="30" width="7" height="124" fill="#5F6368"/><path d="M63 34h86l-20 26 20 26H63z" fill="#EA4335"/>',
 arrow:'<path d="M100 26l46 50h-26v74H80V76H54z" fill="#4285F4"/>',
 boot:'<path d="M70 30h40v80l40 14c10 4 10 26-6 26H70z" fill="#8D6E63" stroke="#5D4037" stroke-width="3" stroke-linejoin="round"/>',
 flower:'<circle cx="100" cy="60" r="20" fill="#F48FB1"/><circle cx="76" cy="80" r="20" fill="#F48FB1"/><circle cx="124" cy="80" r="20" fill="#F48FB1"/><circle cx="86" cy="104" r="20" fill="#F48FB1"/><circle cx="114" cy="104" r="20" fill="#F48FB1"/><circle cx="100" cy="84" r="14" fill="#FBBC04"/><rect x="97" y="118" width="6" height="38" fill="#34A853"/>',
 moon:'<path d="M120 30a62 62 0 1 0 0 124a48 48 0 1 1 0-124z" fill="#FBBC04"/>',
 snail:'<circle cx="112" cy="92" r="34" fill="#F9AB00"/><path d="M112 92m-20 0a20 20 0 1 1 20 20" fill="none" stroke="#B06000" stroke-width="5"/><path d="M40 136h110c6 0 6-10 0-10H70c-10 0-14-20-24-30" fill="#9CCC65" stroke="#689F38" stroke-width="3"/>',
 kite:'<path d="M100 22l40 54-40 76-40-76z" fill="#4285F4"/><path d="M100 22v130M60 76h80" stroke="#fff" stroke-width="3"/>'
};
function vSymfig(v){var o=SYMF[v.fig]||'';
  if(v.axis==='v')o+='<line x1="100" y1="10" x2="100" y2="172" stroke="#D93025" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round"/>';
  if(v.axis==='h')o+='<line x1="16" y1="90" x2="184" y2="90" stroke="#D93025" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round"/>';
  return '<figure class="vis"><svg viewBox="0 0 200 180" width="200" height="180" style="display:block;margin:0 auto;max-width:100%" role="img" aria-label="Bild">'+o+'</svg></figure>'}
/* Karopapier: links die Vorlage, rechts das Spiegelbild – drei Bilder A, B, C */
function vSymgrid(v){
  var W=6,H=5,c=20,pan=function(cells,lab,y0){var o='<g transform="translate(46 '+y0+')">';
      o+='<rect x="-4" y="-4" width="'+(W*2*c+8)+'" height="'+(H*c+8)+'" rx="8" fill="#fff" stroke="#C9D3E3" stroke-width="2"/>';
      for(var i=0;i<=W*2;i++)o+='<line x1="'+(i*c)+'" y1="0" x2="'+(i*c)+'" y2="'+(H*c)+'" stroke="#DCE3EE" stroke-width="1.2"/>';
      for(var j=0;j<=H;j++)o+='<line x1="0" y1="'+(j*c)+'" x2="'+(W*2*c)+'" y2="'+(j*c)+'" stroke="#DCE3EE" stroke-width="1.2"/>';
      cells.forEach(function(q){o+='<rect x="'+(q[0]*c+1.5)+'" y="'+(q[1]*c+1.5)+'" width="'+(c-3)+'" height="'+(c-3)+'" rx="3" fill="'+(q[0]<W?'#4285F4':'#34A853')+'"/>'});
      o+='<line x1="'+(W*c)+'" y1="-8" x2="'+(W*c)+'" y2="'+(H*c+8)+'" stroke="#D93025" stroke-width="3.5" stroke-dasharray="7 5"/>';
      return o+'</g><circle cx="20" cy="'+(y0+H*c/2)+'" r="16" fill="#1F2937"/><text x="20" y="'+(y0+H*c/2+7)+'" text-anchor="middle" font-size="20" font-weight="900" fill="#fff" font-family="Arial,sans-serif">'+lab+'</text>'};
  var L=v.cells,mir=L.map(function(q){return [2*W-1-q[0],q[1]]}),shift=L.map(function(q){return [q[0]+W,q[1]]}),flipv=L.map(function(q){return [2*W-1-q[0],H-1-q[1]]});
  var opts={ok:mir,shift:shift,flip:flipv},order=v.order||['ok','shift','flip'],o='',ph=H*c+22;
  order.forEach(function(k,i){o+=pan(L.concat(opts[k]),'ABC'[i],10+i*ph)});
  var tw=46+W*2*c+10,th=10+3*ph-8;
  return '<figure class="vis nlv" style="width:100%"><svg viewBox="0 0 '+tw+' '+th+'" width="100%" style="display:block;max-width:340px;margin:0 auto" role="img" aria-label="Drei Spiegelbilder A, B, C">'+o+'</svg></figure>'}

/* ===== Erweiterung vis_a.js (v5.59, gekapselt) ===== */
(function(){
/* ---------- Agent A (v5.57): Silben-Grafik «syl» und Einführungsszenen «scx» ----------
   syl: {"type":"syl","items":[{"w":"Ba-na-ne","e":"🍌","l":"3 Silben"}],"mark":"num|clap","arcs":true,"ac":1,"hc":1,"sz":"l|m|s","cap":"…"}
     w: «-» = Silbengrenze (Bogen) · [x] = farbig markiert ([x|Farbe 0–7]) · _a = langer Selbstlaut (Strich darunter) · *a = kurzer Selbstlaut (Punkt darunter)
     e: Bild (Emoji) über dem Wort · b: n leere Bögen (ohne Wort) · l: kleine Beschriftung unter dem Wort
   scx: {"type":"scx","kind":"clap|swing|bee|paper|stretch|join","cap":"…"} – bewegte Einführungsszenen */
function sylW(w,o){
  var syls=String(w).split('-'),h='';
  syls.forEach(function(s,si){
    var out='',i=0,ch,m;
    while(i<s.length){
      ch=s.charAt(i);
      if(ch==='['){var j=s.indexOf(']',i);var inner=s.slice(i+1,j),pp=inner.split('|'),c=pp[1]!==undefined&&/^\d$/.test(pp[1])?+pp[1]:o.hc;
        out+='<b class="syh" style="--c:'+dcol(c)+'">'+esc(pp[0])+'</b>';i=j+1;continue}
      if((ch==='_'||ch==='*')&&i+1<s.length){
        m=/^(ie|aa|ee|oo|ei|au|eu|äu|[aeiouäöüAEIOUÄÖÜ])/.exec(s.slice(i+1));
        if(m){var lg=ch==='_';out+='<span class="syv'+(lg?' lg':' kz')+'" style="--m:'+dcol(lg?o.lc:o.kc)+'">'+esc(m[1])+'</span>';i+=1+m[1].length;continue}
      }
      out+=esc(ch);i++;
    }
    var num=o.mark==='num'?'<i class="syn">'+(si+1)+'</i>':o.mark==='clap'?'<i class="syc" aria-hidden="true">👏</i>':'';
    h+='<span class="sys">'+out+num+'</span>';
  });
  return h;
}
VEXT.syl=function(v){
  var o={hc:v.hc!==undefined?v.hc:1,lc:v.lc!==undefined?v.lc:3,kc:v.kc!==undefined?v.kc:4,mark:v.mark||''},items=v.items||[];
  var arcs=v.arcs!==false,mk=items.some(function(it){return /[_*][aeiouäöüAEIOUÄÖÜ]/.test(it.w||'')});
  var pl=function(w){return String(w||'').replace(/\|\d\]/g,']').replace(/[\[\]_*\-]/g,'')},ml=Math.max.apply(null,items.map(function(it){return pl(it.w).length}).concat([1])),tot=items.reduce(function(a,it){return a+pl(it.w).length+2},0);
  var sz=v.sz||(ml>11||tot>28?'s':ml>7||tot>16?'m':'l');
  var h=items.map(function(it){
    var w='';
    if(it.b){w='<span class="syw blank">'+new Array(it.b+1).join('<span class="sys">&nbsp;</span>')+'</span>'}
    else if(it.w)w='<span class="syw">'+sylW(it.w,o)+'</span>';
    return '<div class="syi">'+(it.e?'<span class="sye'+(it.w||it.b?'':' solo')+'" aria-hidden="true">'+it.e+'</span>':'')+w+(it.l?'<span class="syl">'+bd(it.l)+'</span>':'')+'</div>';
  }).join('');
  return '<figure class="vis syfig"><div class="syb sz-'+sz+(arcs?' sy-arc':'')+(mk?' sy-mk':'')+(o.mark?' sy-wn':'')+'" style="--ac:'+dcol(v.ac!==undefined?v.ac:1)+'">'+h+'</div>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};
VEXT.scx=function(v){
  var o='',k=v.kind,F='font-family="Arial,Helvetica,sans-serif" font-weight="800"',B=dcol(1),G=dcol(3),O=dcol(4),K='#3C4043',GR='#9AA0A6';
  function t(x,y,s,txt,c,cls,anc){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anc||'middle')+'" font-size="'+s+'" fill="'+c+'" '+F+(cls?' class="'+cls+'"':'')+'>'+esc(txt)+'</text>'}
  function arc(x1,x2,y,c,cls,st){var mx=(x1+x2)/2,d=Math.max(12,(x2-x1)*.32);return '<path d="M'+x1+' '+y+'Q'+mx+' '+(y+d*1.6)+' '+x2+' '+y+'" fill="none" stroke="'+c+'" stroke-width="4" stroke-linecap="round"'+(cls?' class="'+cls+'"':'')+(st?' style="'+st+'"':'')+'/>'}
  if(k==='clap'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="196" width="600" height="34" fill="#F3DFC1"/>';
    o+='<circle cx="105" cy="122" r="46" fill="#FBBC04"/><circle cx="90" cy="112" r="5.5" fill="#202124"/><circle cx="120" cy="112" r="5.5" fill="#202124"/><ellipse cx="105" cy="136" rx="13" ry="10" fill="#7A2E0E"/><circle cx="78" cy="128" r="6" fill="#F28B82" opacity=".6"/><circle cx="132" cy="128" r="6" fill="#F28B82" opacity=".6"/>';
    o+='<g class="sxa-hl"><ellipse cx="58" cy="182" rx="15" ry="20" fill="#F2BC96" stroke="#C98A66" stroke-width="2.5"/></g><g class="sxa-hr"><ellipse cx="152" cy="182" rx="15" ry="20" fill="#F2BC96" stroke="#C98A66" stroke-width="2.5"/></g>';
    o+='<path d="M268 52c40 34 120 34 156 -6c4 -4 10 0 7 5c-38 56 -140 56 -170 8c-3 -5 3 -10 7 -7z" fill="#FBD34D" stroke="#D9A400" stroke-width="3" stroke-linejoin="round"/><path d="M262 48l-8 -8" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>';
    [['Ba',300],['na',384],['ne',468]].forEach(function(p,i){var d='animation-delay:'+(i*.7)+'s';
      o+='<g class="sxa-in" style="'+d+'">'+t(p[1],140,40,p[0],K)+arc(p[1]-34,p[1]+34,152,B)+'<circle cx="'+p[1]+'" cy="196" r="15" fill="#fff" stroke="'+B+'" stroke-width="3"/>'+t(p[1],203,18,String(i+1),B)+'</g>'});
  }else if(k==='swing'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/>';
    o+='<rect x="30" y="18" width="255" height="196" rx="18" fill="#fff" stroke="#DADCE0" stroke-width="2"/><rect x="315" y="18" width="255" height="196" rx="18" fill="#fff" stroke="#DADCE0" stroke-width="2"/>';
    o+='<rect x="122" y="30" width="72" height="62" rx="8" fill="#ECEFF4" stroke="#5F6368" stroke-width="3"/><rect x="134" y="50" width="48" height="32" rx="5" fill="#FFE0B2" stroke="#5F6368" stroke-width="2.5"/><circle cx="140" cy="40" r="3.5" fill="#5F6368"/><circle cx="158" cy="40" r="3.5" fill="#5F6368"/><circle cx="176" cy="40" r="3.5" fill="#5F6368"/><path d="M146 64q6-8 12 0t12 0" stroke="#F29900" stroke-width="3" fill="none" class="sxa-flame"/>';
    o+='<rect x="408" y="30" width="70" height="62" rx="4" fill="#ECEFF4" stroke="#5F6368" stroke-width="3"/><path d="M412 34l40 8v46l-40 4z" fill="#A1764A" stroke="#6D4C2F" stroke-width="2.5" class="sxa-door"/><circle cx="444" cy="66" r="3" fill="#FBBC04"/>';
    o+=t(124,146,38,'O',K)+t(184,146,38,'fen',K)+arc(102,148,158,GR,'sxa-draw')+arc(156,214,158,GR,'sxa-draw','animation-delay:.5s');
    o+='<rect x="111" y="152" width="26" height="5" rx="2.5" fill="'+G+'" class="sxa-in" style="animation-delay:1.1s"/>';
    o+=t(410,146,38,'of',K)+t(478,146,38,'fen',K)+arc(384,436,158,GR,'sxa-draw')+arc(448,508,158,GR,'sxa-draw','animation-delay:.5s');
    o+='<circle cx="400" cy="156" r="5" fill="'+O+'" class="sxa-in" style="animation-delay:1.1s"/>';
    o+=t(157,200,18,'lang',G)+t(442,200,18,'kurz',O);
  }else if(k==='bee'){
    o+='<rect width="600" height="230" fill="#EAF6FF"/><path d="M0 200q150 -22 300 0t300 0v30H0z" fill="#CDEBC4"/>';
    [[40,206],[96,212],[504,208],[566,213]].forEach(function(f){o+='<circle cx="'+f[0]+'" cy="'+f[1]+'" r="7" fill="#F48FB1"/><circle cx="'+f[0]+'" cy="'+f[1]+'" r="3" fill="#FBBC04"/>'});
    o+='<rect x="146" y="128" width="8" height="76" rx="3" fill="#A1764A"/><rect x="446" y="128" width="8" height="76" rx="3" fill="#A1764A"/>';
    o+='<rect x="50" y="66" width="200" height="66" rx="16" fill="#fff" stroke="'+G+'" stroke-width="3.5"/><rect x="350" y="66" width="200" height="66" rx="16" fill="#fff" stroke="'+B+'" stroke-width="3.5"/>';
    o+='<text x="150" y="112" text-anchor="middle" font-size="36" fill="'+K+'" '+F+'>B<tspan fill="'+G+'">ie</tspan>ne</text><text x="450" y="112" text-anchor="middle" font-size="36" fill="'+K+'" '+F+'>B<tspan fill="'+B+'">ei</tspan>ne</text>';
    o+='<g class="sxa-in" style="animation-delay:.6s"><rect x="92" y="148" width="116" height="32" rx="16" fill="#fff" stroke="'+G+'" stroke-width="2.5"/>'+t(150,170,17,'langes i',G)+'</g>';
    o+='<g class="sxa-in" style="animation-delay:1.2s"><rect x="378" y="148" width="144" height="32" rx="16" fill="#fff" stroke="'+B+'" stroke-width="2.5"/>'+t(450,170,17,'klingt wie «ai»',B)+'</g>';
    o+='<g class="sxa-fly"><g transform="scale(1.5)"><ellipse cx="0" cy="0" rx="18" ry="12" fill="#FBBC04" stroke="#3C4043" stroke-width="2.5"/><path d="M-5 -11v22M5 -11v22" stroke="#3C4043" stroke-width="4"/><ellipse cx="-4" cy="-17" rx="9" ry="7" fill="#fff" stroke="#9AA0A6" stroke-width="2" opacity=".9"/><ellipse cx="8" cy="-16" rx="8" ry="6" fill="#fff" stroke="#9AA0A6" stroke-width="2" opacity=".9"/><circle cx="13" cy="-2" r="2.2" fill="#3C4043"/></g></g>';
  }else if(k==='paper'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect x="40" y="12" width="520" height="206" rx="10" fill="#fff" stroke="#DADCE0" stroke-width="2"/>';
    for(var i=0;i<4;i++)o+='<line x1="58" y1="'+(64+i*44)+'" x2="542" y2="'+(64+i*44)+'" stroke="#C8D7EE" stroke-width="2"/>';
    o+='<line x1="430" y1="22" x2="430" y2="208" stroke="#9AA0A6" stroke-width="2.5" stroke-dasharray="7 6"/>'+t(486,40,15,'Rand',GR);
    o+='<text x="70" y="57" font-size="24" fill="'+K+'" '+F+'>Lina schaut aus dem</text>';
    o+='<text x="70" y="101" font-size="24" fill="'+K+'" '+F+'>grossen Fens<tspan fill="'+B+'">-</tspan></text>';
    o+='<g class="sxa-move"><text x="70" y="145" font-size="24" fill="'+B+'" '+F+'>ter</text></g>';
    o+='<text x="112" y="145" font-size="24" fill="'+K+'" '+F+'>in den Garten.</text>';
    o+='<g class="sxa-in" style="animation-delay:1.4s"><rect x="318" y="160" width="100" height="34" rx="17" fill="#fff" stroke="'+B+'" stroke-width="2.5"/>'+t(368,183,18,'Fens-ter',B)+'</g>';
  }else if(k==='stretch'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="196" width="600" height="34" fill="#F3DFC1"/>';
    o+='<rect x="34" y="60" width="200" height="92" rx="16" fill="#fff" stroke="#DADCE0" stroke-width="2.5"/><text x="134" y="122" text-anchor="middle" font-size="44" fill="'+K+'" '+F+'>Hun<tspan fill="'+GR+'">_</tspan></text>';
    o+='<g class="sxa-pulse"><rect x="76" y="14" width="116" height="36" rx="18" fill="#fff" stroke="'+GR+'" stroke-width="2.5"/>'+t(134,38,18,'d oder t?',K)+'</g>';
    o+='<path d="M252 106h76" stroke="'+K+'" stroke-width="4" stroke-linecap="round"/><path d="M318 94l14 12-14 12" fill="none" stroke="'+K+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+t(290,92,15,'verlängern',K);
    o+='<rect x="346" y="60" width="220" height="92" rx="16" fill="#fff" stroke="'+B+'" stroke-width="3"/>';
    o+='<text x="394" y="118" text-anchor="middle" font-size="40" fill="'+K+'" '+F+'>Hun</text><text x="494" y="118" text-anchor="middle" font-size="40" fill="'+K+'" '+F+'><tspan fill="'+B+'">d</tspan><tspan class="sxa-in" style="animation-delay:.6s">e</tspan></text>';
    o+=arc(362,428,130,GR)+arc(466,524,130,GR);
    for(var p=0;p<5;p++)o+='<g class="sxa-in" style="animation-delay:'+(p*.35)+'s"><ellipse cx="'+(60+p*110)+'" cy="'+(p%2?206:216)+'" rx="7" ry="5" fill="#A1764A"/><circle cx="'+(53+p*110)+'" cy="'+(p%2?199:209)+'" r="2.5" fill="#A1764A"/><circle cx="'+(60+p*110)+'" cy="'+(p%2?197:207)+'" r="2.5" fill="#A1764A"/><circle cx="'+(67+p*110)+'" cy="'+(p%2?199:209)+'" r="2.5" fill="#A1764A"/></g>';
  }else if(k==='join'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/>';
    o+='<g class="sxa-jl"><path d="M120 34h120v26a14 14 0 0 1 0 28v26H120z" fill="#fff" stroke="'+G+'" stroke-width="3.5"/>'+t(178,84,30,'Haus',G)+'</g>';
    o+='<g class="sxa-jr"><path d="M240 34h110v80H240v-26a14 14 0 0 0 0-28z" fill="#fff" stroke="'+B+'" stroke-width="3.5"/>'+t(302,84,30,'Tür',B)+'</g>';
    o+='<path d="M440 70l26-24 26 24v40h-52z" fill="#F6E3C6" stroke="#8D6E63" stroke-width="3" stroke-linejoin="round"/><rect x="458" y="82" width="16" height="28" rx="2" fill="#A1764A"/>';
    o+='<g class="sxa-in" style="animation-delay:1.3s"><text x="240" y="176" text-anchor="middle" font-size="36" fill="'+K+'" '+F+'><tspan fill="'+B+'">die</tspan> <tspan fill="'+G+'">Haus</tspan><tspan fill="'+B+'">tür</tspan></text></g>';
  }
  return '<figure class="vis scn scx" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||'Bild zum Thema')+'" style="border-radius:16px">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};
/* Bild-Antworten (nur Emoji, z. B. Kl. 1 «Welches Bild passt?») gross darstellen – nur in Deutsch, damit bestehende Mathe-Themen unverändert bleiben */
(function(){var app=document.getElementById('app');if(!app||!window.MutationObserver)return;var RX;try{RX=new RegExp('^(?:\\p{Extended_Pictographic}|\\uFE0F|\\u200D|\\p{Emoji_Modifier}|\\s)+$','u')}catch(e){return}
  function fix(){var de=false;try{de=isDeu()}catch(e){}if(!de)return;app.querySelectorAll('.opts .o:not([data-em]),.mco>span:last-child:not([data-em]),.xo:not([data-em])').forEach(function(e){e.setAttribute('data-em','1');var t=e.textContent.trim();if(t&&RX.test(t))e.classList.add('emoopt')})}
  new MutationObserver(fix).observe(app,{childList:true,subtree:true});})();
})();

/* ===== Erweiterung vis_d.js (v5.59, gekapselt) ===== */
(function(){
/* ---------- Grafiken von Bau-Agent D (v5.57): Zahlenhaus, Schüttelbox, Muster, Teilen, Geld-Gruppen, Uhr mit Zeitspanne, Szenen ---------- */
(function(){
var FD='font-family="Arial,Helvetica,sans-serif"';
function T(x,y,s,t,c,a,w){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(a||'middle')+'" font-size="'+s+'" font-weight="'+(w||800)+'" fill="'+c+'" '+FD+'>'+esc(String(t))+'</text>'}
function ball(cx,cy,r,ci,id){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+id+ci+')" stroke="'+VC[ci]+'" stroke-width="1.5" filter="url(#'+id+'s)"/><ellipse cx="'+(cx-r*.32)+'" cy="'+(cy-r*.36)+'" rx="'+(r*.33)+'" ry="'+(r*.2)+'" fill="#fff" fill-opacity=".55"/>'}
function ballDefs(id){return VC.map(function(c,n){return '<radialGradient id="'+id+n+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="'+c+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".8"/></radialGradient>'}).join('')+'<filter id="'+id+'s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-opacity=".3"/></filter>'}
function fig(svg,cap,cls){return '<figure class="vis '+(cls||'')+'" style="align-items:center;width:100%">'+svg+(cap?'<figcaption>'+capt(cap)+'</figcaption>':'')+'</figure>'}

/* Zahlenhaus: {"type":"zhaus","n":7,"rows":[[3,4],[2,"_"]],"mark":[0],"arrows":true,"cap":"…"}
   Dach = die Zahl (neutral), links Teil 1 (grün), rechts Teil 2 (blau). mark: nur diese Stockwerke farbig, Rest grau. */
VEXT.zhaus=function(v){
  var rows=v.rows||[],n=rows.length,W=300,bx=62,bw=176,fh=n>5?34:40,rb=84,H=rb+n*fh+8,o='',i,fs=n>5?24:27,cw=bw/2,mk=v.mark;
  o+='<path d="M'+(bx-22)+' '+(rb+2)+'L150 10L'+(bx+bw+22)+' '+(rb+2)+'Z" fill="#FFF4E0" stroke="#5F6B7A" stroke-width="3" stroke-linejoin="round"/>';
  o+='<circle cx="150" cy="56" r="25" fill="#fff" stroke="#C5CCD6" stroke-width="2"/>'+T(150,67,30,v.n,String(v.n)==='_'?'#B4BCC8':'#1F2937');
  o+='<rect x="'+bx+'" y="'+rb+'" width="'+bw+'" height="'+(n*fh)+'" fill="#fff" stroke="#5F6B7A" stroke-width="3"/>';
  rows.forEach(function(r,k){var y=rb+k*fh,on=!mk||mk.indexOf(k)>=0;
    if(on&&mk)o+='<rect x="'+(bx+1.5)+'" y="'+(y+1.5)+'" width="'+(cw-3)+'" height="'+(fh-3)+'" fill="#EAF6EC"/><rect x="'+(bx+cw+1.5)+'" y="'+(y+1.5)+'" width="'+(cw-3)+'" height="'+(fh-3)+'" fill="#EAF1FE"/>';
    if(k>0)o+='<line x1="'+bx+'" x2="'+(bx+bw)+'" y1="'+y+'" y2="'+y+'" stroke="#C5CCD6" stroke-width="1.5"/>';
    [0,1].forEach(function(j){var t=r[j],gap=String(t)==='_',c=gap?'#B4BCC8':on?(j?DC[0]:DC[2]):'#A3ABB8';o+=T(bx+cw*j+cw/2,y+fh/2+fs*.36,fs,t,c)})});
  o+='<line x1="'+(bx+cw)+'" x2="'+(bx+cw)+'" y1="'+rb+'" y2="'+(rb+n*fh)+'" stroke="#5F6B7A" stroke-width="2.5"/>';
  if(v.arrows&&n>2){var y0=rb+fh*.35,y1=rb+n*fh-fh*.35,ar=function(x,c,lab,tx){return '<path d="M'+x+' '+y0+'V'+(y1-6)+'" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/><path d="M'+(x-6)+' '+(y1-10)+'L'+x+' '+(y1)+'L'+(x+6)+' '+(y1-10)+'" fill="none" stroke="'+c+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'+T(tx,(y0+y1)/2+7,18,lab,c)};
    o+=ar(bx-14,DC[2],'+1',bx-36)+ar(bx+bw+14,DC[0],'−1',bx+bw+37)}
  return fig('<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+(n>5?250:270)+'px;max-height:none;display:block;margin:0 auto" role="img" aria-label="Zahlenhaus '+v.n+'">'+o+'</svg>',v.cap);
};

/* Schüttelbox: {"type":"shake","l":3,"r":4,"lid":"r","open":false,"cap":"…"} – links grün, rechts blau (wie Punktefeld). lid: Seite mit Deckel. */
VEXT.shake=function(v){
  var id='sk'+(++_guid),L=v.l||0,R=v.r||0,top=v.open&&v.lid?64:14,W=330,bx=16,bw=298,by=top,bh=104,H=by+bh+12,o='<defs>'+ballDefs(id)+'</defs>',mid=bx+bw/2;
  o+='<rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="16" fill="#F4F7FB" stroke="#5F6B7A" stroke-width="3"/>';
  o+='<line x1="'+mid+'" x2="'+mid+'" y1="'+(by+2)+'" y2="'+(by+bh-2)+'" stroke="#5F6B7A" stroke-width="3"/>';
  function side(cnt,x0,ci){var per=cnt>5?Math.ceil(cnt/2):cnt,rowsN=cnt>5?2:1,sp=27,r=11.5,i;
    for(i=0;i<cnt;i++){var rI=Math.floor(i/per),cI=i%per,inRow=rI===rowsN-1?cnt-per*(rowsN-1):per,x=x0+bw/4-(inRow-1)*sp/2+cI*sp,y=by+bh/2+(rowsN===2?(rI?15:-15):0);o+=ball(x,y,r,ci,id)}}
  side(L,bx,0);side(R,mid,1);
  if(v.lid){var lx=v.lid==='l'?bx-4:mid-1,lw=bw/2+5;
    if(v.open)o+='<g transform="rotate('+(v.lid==='l'?8:-8)+' '+(lx+lw/2)+' 40)"><rect x="'+lx+'" y="18" width="'+lw+'" height="34" rx="12" fill="#C9D3E3" stroke="#5F6B7A" stroke-width="2.5"/><rect x="'+(lx+lw/2-18)+'" y="12" width="36" height="10" rx="5" fill="#8A96A8"/></g>';
    else o+='<rect x="'+lx+'" y="'+(by-6)+'" width="'+lw+'" height="'+(bh+12)+'" rx="16" fill="#C9D3E3" stroke="#5F6B7A" stroke-width="2.5"/><rect x="'+(lx+8)+'" y="'+(by+2)+'" width="'+(lw-16)+'" height="14" rx="7" fill="#fff" opacity=".35"/><rect x="'+(lx+lw/2-20)+'" y="'+(by+bh/2-7)+'" width="40" height="14" rx="7" fill="#8A96A8"/>'}
  return fig('<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:340px;display:block;margin:0 auto" role="img" aria-label="Schüttelbox">'+o+'</svg>',v.cap);
};

/* Muster: {"type":"pat","items":["🔵","🟡","🔵","🟡","🔵","_"],"unit":2,"kern":true,"next":5,"small":[1,2],"cap":"…"}
   unit: Kern-Gruppen hell hinterlegt (Fokus auf die Wiederholung); next: dieses Feld orange markiert. */
VEXT.pat=function(v){
  var it=v.items||[],u=v.unit||0,TS=52,G=6,GG=u?16:G,P=u?7:0,o='',x=4,pos=[],i,lab=v.kern&&u?30:0,y0=4+lab;
  for(i=0;i<it.length;i++){if(u&&i%u===0&&i>0)x+=GG-G+2*P;if(u&&i%u===0)x+=P;pos.push(x);x+=TS+G}
  var W=x-G+(u?P:0)+4,H=y0+TS+2*P+6;
  if(u)for(i=0;i<it.length;i+=u){var gn=Math.min(u,it.length-i),gx=pos[i]-P,gw=gn*TS+(gn-1)*G+2*P,first=i===0;
    o+='<rect x="'+gx+'" y="'+y0+'" width="'+gw+'" height="'+(TS+2*P)+'" rx="14" fill="'+((i/u)%2?'#EEF4FE':'#EAF6EC')+'" stroke="'+((i/u)%2?'#AECBFA':'#A8DAB5')+'" stroke-width="1.5"/>';
    if(first&&v.kern)o+=T(gx+gw/2,24,21,'Kern','#188038')}
  it.forEach(function(e,k){var px=pos[k],py=y0+P,gap=String(e)==='_',nx=v.next===k,sm=(v.small||[]).indexOf(k)>=0;
    o+='<rect x="'+px+'" y="'+py+'" width="'+TS+'" height="'+TS+'" rx="11" fill="'+(nx?'#FFF6E5':'#fff')+'" stroke="'+(nx?'#F29900':gap?'#B4BCC8':'#DCE3EE')+'" stroke-width="'+(nx?3:gap?2:1.5)+'"'+(gap?' stroke-dasharray="5 4"':'')+'/>';
    o+=gap?T(px+TS/2,py+TS/2+9,26,'_','#B4BCC8'):'<text x="'+(px+TS/2)+'" y="'+(py+TS/2+(sm?8:12))+'" text-anchor="middle" font-size="'+(sm?22:35)+'">'+esc(e)+'</text>'});
  return fig('<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(560,W*1.05)+'px;display:block;margin:0 auto" role="img" aria-label="Muster">'+o+'</svg>',v.cap);
};

/* Teilen: {"type":"share","n":3,"k":4,"e":"🍪","mode":"plates"|"bags","pile":12,"badge":true,"cnt":"3 Teller","cap":"…"}
   plates: n Teller mit je k Dingen. bags: n Gruppen (Tüten) zu je k. pile: Haufen, der noch verteilt wird (Teller dann leer). badge: grüne Zahl je Teller, cnt: blaue Anzahl-Beschriftung. */
VEXT.share=function(v){
  var n=v.n===undefined?3:v.n,PR=v.row||6,k=v.pile?0:(v.k||0),e=v.e||'🍪',bags=v.mode==='bags',o='',i,j,sp=118,W=Math.max(n*sp,1,v.pile?Math.min(v.pile,PR)*38+30:0)+8,py=v.pile?(Math.ceil(v.pile/PR)*36+18):0,cy=py+62,H=n?cy+62+(v.badge?14:0)+(v.cnt?30:0):py-4,x0=(W-n*sp)/2+sp/2;
  if(v.pile){var per=Math.min(v.pile,PR),rowsN=Math.ceil(v.pile/PR);for(i=0;i<v.pile;i++){var r=Math.floor(i/PR),c=i%PR,inRow=r===rowsN-1?v.pile-PR*(rowsN-1):per;o+='<text x="'+(W/2-(inRow-1)*19+c*38)+'" y="'+(30+r*36)+'" text-anchor="middle" font-size="28">'+esc(e)+'</text>'}
    if(n)o+='<path d="M'+(W/2-8)+' '+(py-6)+'h16l-8 10z" fill="#9AA3B2"/>'}
  for(i=0;i<n;i++){var cx=x0+i*sp;
    if(bags)o+='<rect x="'+(cx-52)+'" y="'+(cy-50)+'" width="104" height="100" rx="22" fill="#fff" stroke="#9AA3B2" stroke-width="2.5" stroke-dasharray="7 5"/>';
    else o+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="54" ry="50" fill="#fff" stroke="#B9C2CF" stroke-width="2.5"/><ellipse cx="'+cx+'" cy="'+cy+'" rx="38" ry="35" fill="#F4F7FB" stroke="#DCE3EE" stroke-width="1.5"/>';
    var cols=k<=4?2:k<=6?3:k<=9?3:4,rowsK=Math.ceil(k/cols),s=k>6?19:24,dx=k>6?24:28,dy=k>6?24:28;
    for(j=0;j<k;j++){var rr=Math.floor(j/cols),cc=j%cols,inR=rr===rowsK-1?k-cols*(rowsK-1):cols;o+='<text x="'+(cx-(inR-1)*dx/2+cc*dx)+'" y="'+(cy-(rowsK-1)*dy/2+rr*dy+s*.36)+'" text-anchor="middle" font-size="'+s+'">'+esc(e)+'</text>'}
    if(v.badge&&k){o+='<rect x="'+(cx-18)+'" y="'+(cy+40)+'" width="36" height="26" rx="13" fill="#fff" stroke="'+DC[2]+'" stroke-width="2.5"/>'+T(cx,cy+59,18,k,'#188038')}}
  if(v.cnt){var yb=H-12;o+='<path d="M'+(x0-40)+' '+(yb-22)+'v8h'+((n-1)*sp+80)+'v-8" fill="none" stroke="'+DC[0]+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+T(W/2,yb+4,18,v.cnt,'#1A56C4')}
  return fig('<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(560,W*.95)+'px;max-height:none;display:block;margin:0 auto" role="img" aria-label="Teilen">'+o+'</svg>',v.cap);
};

/* Geld in Gruppen: {"type":"money","groups":[{"items":[[20,"Fr",2],[10,"Fr",1]],"lab":"50 Fr.","c":0},{"items":[[5,"Fr",1]],"lab":"5 Fr.","c":2}],"ops":["+"],"cap":"…"}
   Echte Münzen/Noten (wie «coins»), jede Gruppe mit Beschriftung in ihrer Farbe (gleiche Farbe wie in der Rechnung). c:7 = neutral. */
VEXT.money=function(v){
  var gs=v.groups||[],ops=v.ops||[];
  var h=gs.map(function(g,i){var c=g.c===undefined?7:g.c,col=c===7?'#5F6B7A':dcol(c),inner=vCoins({items:g.items}).replace(/^<figure class="vis">/,'').replace(/<\/figure>$/,'');
    return '<div class="dmon-g'+(c===7?' n':'')+(g.x?' xd':'')+'" style="--c:'+col+'">'+inner+(g.lab?'<b class="dmon-l">'+bd(g.lab)+'</b>':'')+'</div>'+(i<gs.length-1&&ops[i]?'<span class="dmon-op">'+esc(ops[i])+'</span>':'')}).join('');
  return '<figure class="vis dmon" style="width:100%;align-items:center"><div class="dmon-r">'+h+'</div>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};

/* Uhr mit Fokus: wie «clock» plus {"arcs":[[40,60,3],[60,75,4]],"gh":8,"gm":40,"mk":[5,10,15],"mc":0}
   arcs: Minuten-Spannen farbig (Minuten ab 12, über 60 hinaus = nächste Runde), gh/gm: Startzeit als helle Zeiger, mk: Minutenzahlen markieren. */
function cxy(m,r){var a=m*Math.PI/30;return [(110+r*Math.sin(a)).toFixed(1),(110-r*Math.cos(a)).toFixed(1)]}
VEXT.clockx=function(v){
  var h=vClock(v),add='';
  (v.arcs||[]).forEach(function(a){var m0=a[0],m1=a[1],c=dcol(a[2]===undefined?3:a[2]),d=m1-m0,p0=cxy(m0,89),p1=cxy(m1,89),q0=cxy(m0,84),q1=cxy(m1,84),big=d>30?1:0;
    if(d>=60)add+='<circle cx="110" cy="110" r="89" fill="'+c+'" fill-opacity=".16"/><circle cx="110" cy="110" r="84" fill="none" stroke="'+c+'" stroke-width="8"/>';
    else add+='<path d="M110 110L'+p0[0]+' '+p0[1]+'A89 89 0 '+big+' 1 '+p1[0]+' '+p1[1]+'Z" fill="'+c+'" fill-opacity=".18"/><path d="M'+q0[0]+' '+q0[1]+'A84 84 0 '+big+' 1 '+q1[0]+' '+q1[1]+'" fill="none" stroke="'+c+'" stroke-width="8" stroke-linecap="butt"/>'});
  if(v.gh!==undefined){var gm=v.gm||0,ha=((v.gh%12)+gm/60)*Math.PI/6,ma=gm*Math.PI/30,ln=function(a,l,w){return '<line x1="110" y1="110" x2="'+(110+l*Math.sin(a)).toFixed(1)+'" y2="'+(110-l*Math.cos(a)).toFixed(1)+'" stroke="#9AA3B2" stroke-width="'+w+'" stroke-linecap="round" stroke-dasharray="'+(w>6?'0':'5 5')+'" opacity=".75"/>'};add+=ln(ha,44,8)+ln(ma,78,4)}
  (v.mk||[]).forEach(function(m){var p=cxy(m,98.5),c=dcol(v.mc===undefined?3:v.mc);add+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="9.5" fill="#fff" stroke="'+c+'" stroke-width="2"/><text x="'+p[0]+'" y="'+(+p[1]+3.6)+'" text-anchor="middle" font-size="10" font-weight="900" fill="'+c+'" '+FD+'>'+(m%60||60)+'</text>'});
  return h.replace('<g filter="url(#cks)">',add+'<g filter="url(#cks)">').replace('<figure class="vis"','<figure class="vis ckx"');
};

/* Szenen für die Einführung: {"type":"dscene","kind":"shake|beads|share|market|station|bakery","say":"…"} */
VEXT.dscene=function(v){
  var k=v.kind,o='',i,F2=FD+' font-weight="800"',id='ds'+(++_guid);
  function bubble(t,x,w,c){c=c||'#4285F4';return '<g class="sc-pop"><rect x="'+(x-w/2)+'" y="14" width="'+w+'" height="46" rx="23" fill="#fff" stroke="'+c+'" stroke-width="3"/><text x="'+x+'" y="45" text-anchor="middle" font-size="23" fill="#1F2937" '+F2+'>'+esc(t)+'</text></g>'}
  if(k==='shake'){
    o+='<defs>'+ballDefs(id)+'</defs><rect width="600" height="230" fill="#EEF4FE"/><rect y="186" width="600" height="44" fill="#DCE6F5"/>';
    o+='<g class="dsc-shake"><rect x="170" y="84" width="260" height="96" rx="18" fill="#F4F7FB" stroke="#5F6B7A" stroke-width="3.5"/><line x1="300" x2="300" y1="86" y2="178" stroke="#5F6B7A" stroke-width="3.5"/>';
    [[205,132],[235,118],[262,140]].forEach(function(p){o+=ball(p[0],p[1],12,0,id)});
    [[330,120],[358,142],[386,118],[404,146]].forEach(function(p,j){o+='<g class="dsc-hop" style="animation-delay:'+(j*.35)+'s">'+ball(p[0],p[1],12,1,id)+'</g>'});
    o+='</g>'+bubble('7 = 3 + 4',300,190);
  }else if(k==='beads'){
    var bc=['#4285F4','#FBBC04'];o+='<rect width="600" height="230" fill="#FFF8EC"/><rect y="190" width="600" height="40" fill="#F1E3C8"/>';
    o+='<path d="M40 120Q300 196 560 120" fill="none" stroke="#8A6D3B" stroke-width="3"/>';
    for(i=0;i<9;i++){var t=i/9,x=40+520*(t+.055),y=120+76*4*(t+.055)*(1-(t+.055))*.5;o+='<g'+(i===8?' class="dsc-drop"':'')+'><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="17" fill="'+bc[i%2]+'" stroke="#fff" stroke-width="3"/><ellipse cx="'+(x-5).toFixed(1)+'" cy="'+(y-6).toFixed(1)+'" rx="5" ry="3" fill="#fff" opacity=".55"/></g>'}
    o+=bubble('🔵 🟡 🔵 🟡 …',300,230,'#F29900');
  }else if(k==='share'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="172" width="600" height="58" fill="#E8C99B"/>';
    for(i=0;i<3;i++){var cx=150+i*150;o+='<ellipse cx="'+cx+'" cy="172" rx="62" ry="20" fill="#fff" stroke="#9AA3B5" stroke-width="3"/><ellipse cx="'+cx+'" cy="169" rx="44" ry="12" fill="#F1F3F8"/>';
      for(var j=0;j<4;j++)o+='<text class="dsc-fly" style="animation-delay:'+(j*.75+i*.25)+'s" x="'+(cx-27+j*18)+'" y="'+(170-(j%2)*9)+'" text-anchor="middle" font-size="24">🍪</text>'}
    o+=bubble('12 Kekse für 3 Kinder',300,300,'#34A853');
  }else if(k==='market'){
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="196" width="600" height="34" fill="#CFE8C8"/>';
    o+='<rect x="66" y="72" width="8" height="124" fill="#8D6E63"/><rect x="526" y="72" width="8" height="124" fill="#8D6E63"/>';
    for(i=0;i<7;i++)o+='<path d="M'+(56+i*70)+' 70h70l-5 22a30 30 0 0 1-60 0z" fill="'+(i%2?'#fff':'#34A853')+'" stroke="#1E7E34" stroke-width="2"/>';
    o+='<rect x="56" y="160" width="488" height="14" rx="5" fill="#A1764A"/><rect x="68" y="174" width="464" height="22" fill="#8D6E63"/>';
    [[150,'⚽','25 Fr.'],[300,'📕','18 Fr.'],[450,'🧸','34 Fr.']].forEach(function(p,j){o+='<text x="'+p[0]+'" y="156" text-anchor="middle" font-size="46">'+p[1]+'</text><g class="dsc-tag" style="animation-delay:'+(j*.5)+'s"><rect x="'+(p[0]-40)+'" y="171" width="80" height="26" rx="8" fill="#FFF3C4" stroke="#F29900" stroke-width="2.5"/><text x="'+p[0]+'" y="190" text-anchor="middle" font-size="17" fill="#7A4A00" '+F2+'>'+p[2]+'</text></g>'});
    o+=bubble('25 Fr. + 18 Fr. = 43 Fr.',300,300);
  }else if(k==='station'){
    o+='<rect width="600" height="230" fill="#EEF2F7"/><rect y="182" width="600" height="48" fill="#C9D1DC"/><rect y="176" width="600" height="8" fill="#9AA3B2"/>';
    o+='<rect x="146" y="36" width="8" height="70" fill="#5F6B7A"/><circle cx="150" cy="96" r="62" fill="#fff" stroke="#2B3350" stroke-width="7"/>';
    for(i=0;i<60;i++){var a=i*Math.PI/30,b=i%5===0,r1=b?44:50;o+='<line x1="'+(150+r1*Math.sin(a)).toFixed(1)+'" y1="'+(96-r1*Math.cos(a)).toFixed(1)+'" x2="'+(150+54*Math.sin(a)).toFixed(1)+'" y2="'+(96-54*Math.cos(a)).toFixed(1)+'" stroke="#1F2937" stroke-width="'+(b?4:1.5)+'"/>'}
    o+='<line x1="150" y1="96" x2="'+(150+30*Math.sin((8+35/60)*Math.PI/6)).toFixed(1)+'" y2="'+(96-30*Math.cos((8+35/60)*Math.PI/6)).toFixed(1)+'" stroke="#1F2937" stroke-width="7" stroke-linecap="round"/>';
    o+='<g class="dsc-min" style="transform-origin:150px 96px"><line x1="150" y1="104" x2="150" y2="50" stroke="#1A73E8" stroke-width="4.5" stroke-linecap="round"/></g><circle cx="150" cy="96" r="5" fill="#1F2937"/>';
    o+='<rect x="300" y="44" width="250" height="104" rx="12" fill="#1F2A44"/>'+T(318,78,20,'Zug nach Bern','#FFFFFF','start',800)+T(318,112,30,'8:47','#FBBC04','start',900)+T(420,112,18,'Gleis 3','#C9D3E3','start',700)+T(318,136,14,'pünktlich','#8FD19E','start',700);
    o+='<g class="sc-pop"><rect x="300" y="160" width="250" height="40" rx="20" fill="#fff" stroke="#4285F4" stroke-width="3"/><text x="425" y="187" text-anchor="middle" font-size="19" fill="#1F2937" '+F2+'>Wie lange noch warten?</text></g>';
  }else if(k==='bakery'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="150" width="600" height="80" fill="#D9B48A"/><rect y="150" width="600" height="10" fill="#B58A5A"/>';
    o+='<rect x="40" y="60" width="520" height="92" rx="12" fill="#fff" fill-opacity=".7" stroke="#E3C9A0" stroke-width="2"/>';
    [[120,'🥐','Fr. 1.20'],[300,'🍞','Fr. 3.50'],[480,'🥨','Fr. 0.90']].forEach(function(p,j){o+='<text x="'+p[0]+'" y="128" text-anchor="middle" font-size="50">'+p[1]+'</text><g class="dsc-tag" style="animation-delay:'+(j*.5)+'s"><rect x="'+(p[0]-46)+'" y="164" width="92" height="30" rx="8" fill="#FFF3C4" stroke="#F29900" stroke-width="2.5"/><text x="'+p[0]+'" y="185" text-anchor="middle" font-size="18" fill="#7A4A00" '+F2+'>'+p[2]+'</text></g>'});
    o+=bubble('Fr. 3.50 = 350 Rp.',300,250,'#F29900');
  }
  return '<figure class="vis scn" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||'Bild zum Thema')+'" style="border-radius:16px;max-height:none">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};
/* Diese Grafiken enthalten bewusst nur Hilfe (keine Lösung): Zahlen darin nicht durch «_» ersetzen */
['zhaus','shake','pat','share','money','clockx','dscene'].forEach(function(k){VT_SKIP[k]=1});
})();
})();

/* ===== Erweiterung vis_e.js (v5.59, gekapselt) ===== */
(function(){
/* ---------- Erweiterungen Agent E (v5.57): Umfang, Strichliste, Diagramm, Plan/Massstab, Würfelnetz, Baumdiagramm, Szenen ---------- */
(function(){
var F='font-family="Arial,Helvetica,sans-serif"';
function C(i,d){return i===undefined||i===null?(d||'#2F3A4A'):(typeof i==='string'?i:dcol(i))}
function fig(o,W,H,mw,cap,aria,cls){return '<figure class="vis'+(cls?' '+cls:'')+'" style="width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block;max-width:'+mw+'px;margin:0 auto" role="img" aria-label="'+esc(aria||'Grafik')+'">'+o+'</svg>'+(cap?'<figcaption>'+capt(cap)+'</figcaption>':'')+'</figure>'}
function tx(x,y,s,t,c,anc,w){return '<text x="'+(+x).toFixed(1)+'" y="'+(+y).toFixed(1)+'" text-anchor="'+(anc||'middle')+'" font-size="'+s+'" font-weight="'+(w||800)+'" fill="'+c+'" '+F+'>'+esc(t)+'</text>'}
function pill(x,y,t,c,fs){fs=fs||17;var s=String(t),gap=s==='_'||/_/.test(s),w=Math.max(40,s.length*fs*.58+18),h=fs+13;
  return '<g><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-h/2).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h+'" rx="'+(h/2)+'" fill="#fff" stroke="'+(gap?'#B7C0CF':c)+'" stroke-width="2.4"/>'+tx(x,y+fs*.36,fs,s,gap?'#9AA3B2':c)+'</g>'}

/* Umfang: Rechteck/Quadrat mit farbigen Seiten
   {type:'umf',a:6,b:4,la:'6 cm',lb:'4 cm',all:true,mode:'sides'|'u'|'walk'|'sq',grid:true,fill:true,cap}
   sides: a-Seiten blau (0), b-Seiten grün (2); u/walk: ganzer Rand orange (3); sq: alle Seiten blau; fill: Fläche violett (4) */
VEXT.umf=function(v){
  var a=+v.a||4,b=+v.b||3,mode=v.mode||'sides',u=Math.min(250/a,140/b,46),w=a*u,h=b*u,x0=74,y0=40,o='',i,j;
  var ca=C(v.ca===undefined?0:v.ca),cb=C(v.cb===undefined?2:v.cb),cu=C(3);
  if(mode==='sq'){cb=ca}
  if(mode==='u'||mode==='walk'){ca=cb=cu}
  var la=v.la===undefined?a+' cm':v.la,lb=v.lb===undefined?b+' cm':v.lb;
  o+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+h+'" fill="'+(v.fill?'#EFE3FC':'#F4F7FC')+'"/>';
  if(v.grid){for(i=1;i<a;i++)o+='<line x1="'+(x0+i*u)+'" y1="'+y0+'" x2="'+(x0+i*u)+'" y2="'+(y0+h)+'" stroke="'+(v.fill?'#9334E6':'#9AA6B8')+'" stroke-opacity="'+(v.fill?.45:.5)+'" stroke-width="1.3"/>';
    for(j=1;j<b;j++)o+='<line x1="'+x0+'" y1="'+(y0+j*u)+'" x2="'+(x0+w)+'" y2="'+(y0+j*u)+'" stroke="'+(v.fill?'#9334E6':'#9AA6B8')+'" stroke-opacity="'+(v.fill?.45:.5)+'" stroke-width="1.3"/>'}
  var sw=6;
  o+='<line x1="'+x0+'" y1="'+y0+'" x2="'+(x0+w)+'" y2="'+y0+'" stroke="'+ca+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
  o+='<line x1="'+x0+'" y1="'+(y0+h)+'" x2="'+(x0+w)+'" y2="'+(y0+h)+'" stroke="'+ca+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
  o+='<line x1="'+x0+'" y1="'+y0+'" x2="'+x0+'" y2="'+(y0+h)+'" stroke="'+cb+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
  o+='<line x1="'+(x0+w)+'" y1="'+y0+'" x2="'+(x0+w)+'" y2="'+(y0+h)+'" stroke="'+cb+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
  /* rechte Winkel */
  if(!v.grid)[[x0,y0,1,1],[x0+w,y0,-1,1],[x0,y0+h,1,-1],[x0+w,y0+h,-1,-1]].forEach(function(p){var s=Math.min(14,u*.45);o+='<path d="M'+(p[0]+p[2]*s)+' '+(p[1])+'v'+(p[3]*s)+'h'+(-p[2]*s)+'" fill="none" stroke="#5F6B7A" stroke-width="1.6" transform="translate('+(p[2]*3)+' '+(p[3]*3)+')"/>'});
  if(mode==='walk'){var id='uw'+(++_guid);
    o+='<defs><marker id="'+id+'" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+cu+'"/></marker></defs>';
    [[x0+w*.42,y0,x0+w*.58,y0],[x0+w,y0+h*.4,x0+w,y0+h*.6],[x0+w*.58,y0+h,x0+w*.42,y0+h],[x0,y0+h*.6,x0,y0+h*.4]].forEach(function(q){o+='<line x1="'+q[0]+'" y1="'+q[1]+'" x2="'+q[2]+'" y2="'+q[3]+'" stroke="'+cu+'" stroke-width="'+sw+'" marker-end="url(#'+id+')"/>'});
    o+='<circle cx="'+x0+'" cy="'+y0+'" r="8" fill="#fff" stroke="#2F3A4A" stroke-width="3"/>'+tx(x0-12,y0-12,13,'Start','#2F3A4A','end')}
  /* Beschriftung */
  var sh=v.show||(v.all?'tblr':'tl');
  if(sh.indexOf('t')>=0&&la!=='')o+=pill(x0+w/2,y0-22,la,ca);
  if(sh.indexOf('b')>=0&&la!=='')o+=pill(x0+w/2,y0+h+22,la,ca);
  if(sh.indexOf('l')>=0&&lb!=='')o+=pill(x0-12-Math.max(40,String(lb).length*17*.58+18)/2+8,y0+h/2,lb,cb);
  if(sh.indexOf('r')>=0&&lb!=='')o+=pill(x0+w+4+Math.max(40,String(lb).length*17*.58+18)/2,y0+h/2,lb,cb);
  if(v.mid)o+=tx(x0+w/2,y0+h/2+7,18,v.mid,v.fill?'#6B2FB8':'#5F6B7A');
  var W=x0+w+80,H=y0+h+(sh.indexOf('b')>=0?48:24);
  if(v.unit){o+='<rect x="'+x0+'" y="'+(H-2)+'" width="'+(u*.6)+'" height="'+(u*.6)+'" fill="'+(v.fill?'#EFE3FC':'#F4F7FC')+'" stroke="'+(v.fill?'#9334E6':'#9AA6B8')+'" stroke-width="1.4"/>'+tx(x0+u*.6+8,H-2+u*.6-3,13,v.unit,v.fill?'#6B2FB8':'#5F6B7A','start',700);H+=u*.6+6}
  return fig(o,Math.max(W,280),H,Math.min(360,Math.max(W,280)*1.05),v.cap,'Rechteck '+la+' und '+lb,'ve-umf');
};

/* Strichliste (mit Tabelle): {type:'tally',head:['Obst','Striche','Anzahl'],rows:[['Apfel',7,col]],num:true,mark5:true,hl:1} */
VEXT.tally=function(v){
  var rows=v.rows||[],num=!!v.num,RH=44,y0=v.head?34:4,o='',lw=v.lw||118,x1=lw+12,W=num?420:400,cx=W-44,i;
  if(v.head){o+=tx(10,22,14,v.head[0],'#5F6B7A','start')+tx(x1,22,14,v.head[1]||'Striche','#5F6B7A','start');if(num)o+=tx(cx,22,14,v.head[2]||'Anzahl','#5F6B7A');
    o+='<line x1="4" y1="'+(y0-3)+'" x2="'+(W-4)+'" y2="'+(y0-3)+'" stroke="#2F3A4A" stroke-width="2"/>'}
  rows.forEach(function(r,k){var y=y0+k*RH,n=+r[1],c=C(r[2]===undefined?7:r[2]),hl=v.hl===k;
    if(hl)o+='<rect x="2" y="'+(y+2)+'" width="'+(W-4)+'" height="'+(RH-4)+'" rx="9" fill="#FFF6DD"/>';
    o+=tx(10,y+RH/2+6.5,18,r[0],'#2B3350','start');
    for(i=0;i<n;i++){var g=Math.floor(i/5),p=i%5,bx=x1+g*58;
      if(p<4)o+='<line x1="'+(bx+p*10+4)+'" y1="'+(y+10)+'" x2="'+(bx+p*10+4)+'" y2="'+(y+RH-10)+'" stroke="#2F3A4A" stroke-width="3" stroke-linecap="round"/>';
      else o+='<line x1="'+(bx-3)+'" y1="'+(y+RH-13)+'" x2="'+(bx+40)+'" y2="'+(y+13)+'" stroke="'+(v.mark5?C(3):'#2F3A4A')+'" stroke-width="3" stroke-linecap="round"/>'}
    if(num)o+=tx(cx,y+RH/2+8,23,r[3]===undefined?String(n):r[3],r[3]==='_'?'#9AA3B2':c);
    o+='<line x1="4" y1="'+(y+RH)+'" x2="'+(W-4)+'" y2="'+(y+RH)+'" stroke="#E3E8F0" stroke-width="1.5"/>'});
  o+='<line x1="'+lw+'" y1="'+(v.head?6:y0)+'" x2="'+lw+'" y2="'+(y0+rows.length*RH)+'" stroke="#C9D1DE" stroke-width="1.5"/>';
  if(num)o+='<line x1="'+(cx-38)+'" y1="'+(v.head?6:y0)+'" x2="'+(cx-38)+'" y2="'+(y0+rows.length*RH)+'" stroke="#C9D1DE" stroke-width="1.5"/>';
  return fig(o,W,y0+rows.length*RH+4,460,v.cap,'Strichliste','ve-tally');
};

/* Diagramm mit Achse und Skala: {type:'chart',dir:'v'|'h',items:[['Apfel',8,col]],step:2,lab:1,max:10,vals:false,unit:'Kinder',title:'…',guide:[0]} */
VEXT.chart=function(v){
  var it=v.items||[],n=it.length,st=v.step||1,mx=v.max||Math.ceil(Math.max.apply(null,it.map(function(q){return q[1]}))/st)*st,lab=v.lab||1,o='',k,hz=v.dir==='h';
  var dc=v.col===undefined?0:v.col,gl=function(q){return q[2]===undefined||q[2]===null?C(dc):C(q[2])},guide=v.guide||[],W=420,fm=function(x){return String(Math.round(x*100)/100).replace('.',',')};
  var ttl=v.title?26:0;
  if(v.title)o+=tx(W/2,19,17,v.title,'#2B3350');
  if(!hz){
    var x0=46,x1=W-8,y0=16+ttl+(v.unit?10:0),y1=y0+(v.h||170),Y=function(val){return y1-(y1-y0)*val/mx},slot=(x1-x0)/n,bw=Math.min(54,slot*.62);
    for(k=0;k<=mx+1e-9;k+=st){var yy=Y(k),li=Math.round(k/st)%lab===0;o+='<line x1="'+x0+'" y1="'+yy.toFixed(1)+'" x2="'+x1+'" y2="'+yy.toFixed(1)+'" stroke="'+(k===0?'#2F3A4A':'#DDE3EC')+'" stroke-width="'+(k===0?2.4:1.4)+'"/>';
      o+='<line x1="'+(x0-5)+'" y1="'+yy.toFixed(1)+'" x2="'+x0+'" y2="'+yy.toFixed(1)+'" stroke="#2F3A4A" stroke-width="2"/>';
      if(li)o+=tx(x0-9,yy+6,16,fm(k),'#2B3350','end',700)}
    o+='<line x1="'+x0+'" y1="'+(y0-8)+'" x2="'+x0+'" y2="'+y1+'" stroke="#2F3A4A" stroke-width="2.4"/>';
    if(v.unit)o+=tx(x0-40,y0-12,14,v.unit,'#5F6B7A','start',700);
    it.forEach(function(q,i){var cx=x0+slot*(i+.5),yv=Y(q[1]),c=gl(q);
      o+='<rect x="'+(cx-bw/2).toFixed(1)+'" y="'+yv.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(0,y1-yv).toFixed(1)+'" rx="4" fill="'+c+'"/>';
      if(guide.indexOf(i)>=0)o+='<line x1="'+x0+'" y1="'+yv.toFixed(1)+'" x2="'+(cx-bw/2).toFixed(1)+'" y2="'+yv.toFixed(1)+'" stroke="'+c+'" stroke-width="2.2" stroke-dasharray="5 4"/><circle cx="'+x0+'" cy="'+yv.toFixed(1)+'" r="4.5" fill="'+c+'"/>';
      if(v.vals)o+=tx(cx,yv-7,17,fm(q[1]),'#2B3350');
      var w=String(q[0]).split(' '),fs=Math.min(16,Math.max(11,(slot-4)/(Math.max.apply(null,w.map(function(s){return s.length}))*.56)));
      w.forEach(function(s,j){o+=tx(cx,y1+19+j*(fs+2),fs,s,'#2B3350','middle',700)})});
    var lines=Math.max.apply(null,it.map(function(q){return String(q[0]).split(' ').length}));
    return fig(o,W,y1+10+lines*18,440,v.cap,v.title||'Säulendiagramm','ve-chart');
  }
  var lw=v.lw||92,xa=lw+8,xb=W-14,yt=8+ttl,RH=Math.min(40,190/n),X=function(val){return xa+(xb-xa)*val/mx},bh=RH*.64,yb=yt+n*RH;
  for(k=0;k<=mx+1e-9;k+=st){var xx=X(k),l2=Math.round(k/st)%lab===0;o+='<line x1="'+xx.toFixed(1)+'" y1="'+yt+'" x2="'+xx.toFixed(1)+'" y2="'+yb+'" stroke="'+(k===0?'#2F3A4A':'#DDE3EC')+'" stroke-width="'+(k===0?2.4:1.4)+'"/>';
    o+='<line x1="'+xx.toFixed(1)+'" y1="'+yb+'" x2="'+xx.toFixed(1)+'" y2="'+(yb+5)+'" stroke="#2F3A4A" stroke-width="2"/>';
    if(l2)o+=tx(xx,yb+21,16,fm(k),'#2B3350','middle',700)}
  o+='<line x1="'+xa+'" y1="'+yb+'" x2="'+(xb+6)+'" y2="'+yb+'" stroke="#2F3A4A" stroke-width="2.4"/>';
  it.forEach(function(q,i){var cy=yt+RH*(i+.5),xv=X(q[1]),c=gl(q);
    o+='<rect x="'+xa+'" y="'+(cy-bh/2).toFixed(1)+'" width="'+Math.max(0,xv-xa).toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="4" fill="'+c+'"/>';
    if(guide.indexOf(i)>=0)o+='<line x1="'+xv.toFixed(1)+'" y1="'+(cy+bh/2).toFixed(1)+'" x2="'+xv.toFixed(1)+'" y2="'+yb+'" stroke="'+c+'" stroke-width="2.2" stroke-dasharray="5 4"/><circle cx="'+xv.toFixed(1)+'" cy="'+yb+'" r="4.5" fill="'+c+'"/>';
    if(v.vals)o+=tx(xv+6,cy+6,16,fm(q[1]),'#2B3350','start');
    o+=tx(lw,cy+6,Math.min(16,(lw-4)/(String(q[0]).length*.55)),q[0],'#2B3350','end',700)});
  if(v.unit)o+=tx(xb+6,yb+40,14,v.unit,'#5F6B7A','end',700);
  return fig(o,W,yb+(v.unit?48:30),440,v.cap,v.title||'Balkendiagramm','ve-chart');
};

/* Plan / Karte / Vergrösserung mit Messstab darunter
   {type:'plan',kind:'room'|'map'|'enl',m:'1 : 100',len:4,h:3,lab:'4 cm',real:'4 m',to:8,col:0,rcol:2} – alles massstabsgetreu (1 cm = cm px) */
VEXT.plan=function(v){
  var k=v.kind||'room',len=+v.len||4,to=v.to||Math.max(6,Math.ceil(len+1)),W=440,x0=30,x1=404,cm=(x1-x0)/to,X=function(n){return x0+n*cm},o='',c=C(v.col===undefined?0:v.col),rc=C(v.rcol===undefined?2:v.rcol),i;
  var hh=k==='room'?(+v.h||2)*cm:0,ph=k==='room'?hh+20:k==='map'?120:Math.max(70,len*cm*.36+30),py=40,ry=py+ph+14;
  o+='<rect x="6" y="6" width="'+(W-12)+'" height="'+(ph+40)+'" rx="12" fill="'+(k==='map'?'#F6F1E3':'#FBFCFE')+'" stroke="#C9D1DE" stroke-width="1.6"/>';
  if(v.m){var tt=(k==='enl'?'Bild ':k==='map'?'Karte ':'Plan ')+v.m;o+='<rect x="14" y="13" width="'+(tt.length*9.6+22)+'" height="24" rx="12" fill="#2F3A4A"/>'+tx(25,30,15,tt,'#fff','start')}
  if(k==='room'){
    o+='<rect x="'+X(0)+'" y="'+(py+8)+'" width="'+(len*cm)+'" height="'+hh+'" fill="#EAF1FE" stroke="#2F3A4A" stroke-width="4"/>';
    if(v.inner)o+=tx(X(len/2),py+8+hh/2+6,16,v.inner,'#5F6B7A');
    o+='<line x1="'+X(0)+'" y1="'+(py+8+hh)+'" x2="'+X(len)+'" y2="'+(py+8+hh)+'" stroke="'+c+'" stroke-width="6" stroke-linecap="round"/>'}
  else if(k==='map'){var yb=py+ph-20;
    if(X(len)+110<W)o+='<path d="M'+(X(len)+34)+' '+(py+6)+'q58 -6 64 28q-8 34 -64 26q-26 -26 0 -54z" fill="#BFE1F5" stroke="#7FB6D8" stroke-width="1.5"/>';
    [[.25,22],[.55,40],[.8,16]].forEach(function(t){var px=X(len*t[0]),pyy=py+t[1];o+='<circle cx="'+px+'" cy="'+pyy+'" r="8" fill="#81C995"/><circle cx="'+(px+8)+'" cy="'+(pyy+3)+'" r="6" fill="#5DB37E"/>'});
    o+='<path d="M'+X(0)+' '+yb+'Q'+X(len*.3)+' '+(yb-44)+' '+X(len*.55)+' '+(yb-18)+'T'+X(len)+' '+yb+'" fill="none" stroke="#B9A57A" stroke-width="4" stroke-dasharray="1 8" stroke-linecap="round"/>';
    o+='<line x1="'+X(0)+'" y1="'+yb+'" x2="'+X(len)+'" y2="'+yb+'" stroke="'+c+'" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round"/>';
    o+='<path d="M'+(X(0)-11)+' '+(yb-2)+'l11 -11l11 11v12h-22z" fill="#F29900" stroke="#B06000" stroke-width="2"/>'+tx(X(0)+(v.p1&&v.p1.length>4?14:0),yb-18,14,v.p1||'A','#2F3A4A');
    o+='<rect x="'+(X(len)-10)+'" y="'+(yb-8)+'" width="20" height="16" fill="#8AB4F8" stroke="#1A56C4" stroke-width="2"/><path d="M'+(X(len)-13)+' '+(yb-8)+'l13 -9l13 9z" fill="#1A56C4"/>'+tx(X(len)-(v.p2&&v.p2.length>4?10:0),yb-22,14,v.p2||'B','#2F3A4A')}
  else{ /* Vergrösserung: Ameise im Bild, Länge = len cm */
    var L=len*cm,cy=py+ph/2+4,ax=X(0),hb=L*.1;
    o+='<g stroke="#2F3A4A" stroke-width="2.4" stroke-linecap="round" fill="none">';
    [[.38,-1],[.47,-1],[.56,-1],[.38,1],[.47,1],[.56,1]].forEach(function(p,j){var bx=ax+L*p[0],d=(j%3-1)*L*.09;o+='<path d="M'+bx+' '+cy+'l'+(d-L*.02)+' '+(p[1]*hb*1.5)+'l'+(d*.6)+' '+(p[1]*hb*.9)+'"/>'});
    o+='<path d="M'+(ax+L*.9)+' '+(cy-hb*.4)+'q'+(L*.06)+' '+(-hb*1.2)+' '+(L*.1)+' '+(-hb*1.4)+'M'+(ax+L*.9)+' '+(cy-hb*.2)+'q'+(L*.09)+' '+(-hb*.6)+' '+(L*.1)+' '+(-hb*.9)+'"/></g>';
    o+='<ellipse cx="'+(ax+L*.2)+'" cy="'+cy+'" rx="'+(L*.2)+'" ry="'+(hb*1.05)+'" fill="#8D5A2B" stroke="#2F3A4A" stroke-width="2.4"/>';
    o+='<ellipse cx="'+(ax+L*.53)+'" cy="'+cy+'" rx="'+(L*.15)+'" ry="'+(hb*.62)+'" fill="#A86B3C" stroke="#2F3A4A" stroke-width="2.4"/>';
    o+='<circle cx="'+(ax+L*.81)+'" cy="'+cy+'" r="'+(hb*.85)+'" fill="#8D5A2B" stroke="#2F3A4A" stroke-width="2.4"/><circle cx="'+(ax+L*.86)+'" cy="'+(cy-hb*.25)+'" r="'+(hb*.16)+'" fill="#fff"/>';
    o+='<line x1="'+ax+'" y1="'+(cy-hb*1.6)+'" x2="'+ax+'" y2="'+(ry-2)+'" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="4 4"/><line x1="'+X(len)+'" y1="'+(cy-hb*1.6)+'" x2="'+X(len)+'" y2="'+(ry-2)+'" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="4 4"/>'}
  /* Messstab (Lineal in cm, mm-Striche) */
  var rh=46,mm=cm>=34;
  o+='<rect x="'+(x0-12)+'" y="'+ry+'" width="'+(x1-x0+36)+'" height="'+rh+'" rx="6" fill="#FFE27A" stroke="#C99A1E" stroke-width="2"/>';
  for(i=0;i<=to*(mm?10:2);i++){var val=i/(mm?10:2),px=X(val),full=Math.abs(val-Math.round(val))<1e-9,half=!full&&Math.abs(val*2-Math.round(val*2))<1e-9;
    o+='<line x1="'+px.toFixed(1)+'" y1="'+ry+'" x2="'+px.toFixed(1)+'" y2="'+(ry+(full?18:half?12:7))+'" stroke="#3A2E0A" stroke-width="'+(full?2.2:1)+'"/>';
    if(full)o+=tx(px,ry+38,17,String(Math.round(val)),'#2B2208','middle',800)}
  o+=tx(x1+13,ry+17,13,'cm','#7A5A00','middle',800);
  o+='<rect x="'+X(0)+'" y="'+(ry-4)+'" width="'+(len*cm)+'" height="7" rx="3" fill="'+c+'"/>';
  var lab=v.lab===undefined?String(len).replace('.',',')+' cm':v.lab,real=v.real||'',H=ry+rh+6;
  if(lab||real){var L1=lab.length*10+26,L2=real?String(real).length*10+26:0,tw=L1+(real?34+L2:0),sx=Math.max(8,Math.min(W-8-tw,X(len/2)-tw/2)),g1=/_/.test(lab),g2=/_/.test(real);
    o+='<rect x="'+sx+'" y="'+(H+2)+'" width="'+L1+'" height="32" rx="16" fill="#fff" stroke="'+(g1?'#B7C0CF':c)+'" stroke-width="2.4"/>'+tx(sx+L1/2,H+24,18,lab,g1?'#9AA3B2':c);
    if(real){o+=tx(sx+L1+17,H+25,20,'≙','#5F6B7A');o+='<rect x="'+(sx+L1+34)+'" y="'+(H+2)+'" width="'+L2+'" height="32" rx="16" fill="#fff" stroke="'+(g2?'#B7C0CF':rc)+'" stroke-width="2.4"/>'+tx(sx+L1+34+L2/2,H+24,18,real,g2?'#9AA3B2':rc)}
    H+=42}
  return fig(o,W,H,470,v.cap,(k==='enl'?'Vergrösserung ':k==='map'?'Karte ':'Plan ')+(v.m||''),'ve-plan');
};

/* Würfelnetz: {type:'wnet',cells:[[x,y],…],lab:['A',…],pips:[1,…],col:[0,null,…],bad:[i],gap:i,s:52}
   mehrere kleine Netze: {type:'wnet',nets:[[[x,y],…],…],s:16} */
function pipXY(n){var P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1]]};return P[n]||[]}
function netSvg(cells,ox,oy,s,v){var o='',lab=v.lab||[],pips=v.pips||[],col=v.col||[],bad=v.bad||[];
  cells.forEach(function(p,i){var x=ox+p[0]*s,y=oy+p[1]*s,ci=col[i],isB=bad.indexOf(i)>=0,isG=v.gap===i,f=isB?'#FADAD7':isG?'#FFF3C4':(ci===undefined||ci===null)?'#F1F4F9':null,st=isB?'#B3261E':isG?'#E37400':'#2F3A4A';
    var fc=f||C(ci);
    o+='<rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" fill="'+fc+'"'+(f?'':' fill-opacity=".28"')+' stroke="'+st+'" stroke-width="'+(s>30?2.6:1.8)+'"'+(isG?' stroke-dasharray="6 4"':'')+' stroke-linejoin="round"/>';
    if(!f)o+='<rect x="'+(x+3)+'" y="'+(y+3)+'" width="'+(s-6)+'" height="'+(s-6)+'" fill="none" stroke="'+C(ci)+'" stroke-width="2.5" rx="3"/>';
    if(pips[i]){var r=s*.085;pipXY(pips[i]).forEach(function(q){o+='<circle cx="'+(x+s/2+q[0]*s*.27).toFixed(1)+'" cy="'+(y+s/2+q[1]*s*.27).toFixed(1)+'" r="'+r.toFixed(1)+'" fill="#2F3A4A"/>'})}
    if(lab[i]!==undefined&&lab[i]!=='')o+=tx(x+s/2,y+s/2+(v.fs||s*.42)*.4,v.fs||Math.round(s*.42),lab[i],(ci===undefined||ci===null)?(isG?'#9AA3B2':'#2F3A4A'):C(ci))});
  return o}
VEXT.wnet=function(v){
  if(v.nets){var s=v.s||20,per=v.per||3,o='',lb=v.labs?30:0,mw=Math.max.apply(null,v.nets.map(function(c){return Math.max.apply(null,c.map(function(p){return p[0]}))+1})),cw=s*(v.cw||Math.max(5,mw))+16,ch=s*4+16+lb,i,W,H;
    v.nets.forEach(function(cells,k){var mx=Math.max.apply(null,cells.map(function(p){return p[0]})),my=Math.max.apply(null,cells.map(function(p){return p[1]})),gx=(k%per)*cw+(cw-(mx+1)*s)/2,gy=Math.floor(k/per)*ch+(ch-lb-(my+1)*s)/2;
      o+=netSvg(cells,gx,gy,s,{col:(v.cols&&v.cols[k])||[],bad:(v.bads&&v.bads[k])||[]});if(v.num)o+=tx(gx-5,gy+12,13,String(k+1),'#8A94A6','end',700);
      if(v.labs){var cx=(k%per)*cw+cw/2,yb=Math.floor(k/per)*ch+ch-8;o+='<circle cx="'+cx+'" cy="'+(yb-9)+'" r="13" fill="#fff" stroke="#2F3A4A" stroke-width="2"/>'+tx(cx,yb-3.5,16,v.labs[k],'#2F3A4A')}
      if(k%per)o+='<line x1="'+((k%per)*cw)+'" y1="'+(Math.floor(k/per)*ch+6)+'" x2="'+((k%per)*cw)+'" y2="'+(Math.floor(k/per)*ch+ch-6)+'" stroke="#E3E8F0" stroke-width="1.5"/>'});
    W=per*cw;H=Math.ceil(v.nets.length/per)*ch;
    return fig(o,W,H,Math.min(420,W*1.3),v.cap,'Würfelnetze','ve-wnets')}
  var cells=v.cells||[],s=v.s||52,mx=Math.max.apply(null,cells.map(function(p){return p[0]})),my=Math.max.apply(null,cells.map(function(p){return p[1]})),pad=10;
  var o=netSvg(cells,pad,pad,s,v);
  return fig(o,(mx+1)*s+2*pad,(my+1)*s+2*pad,Math.min(340,((mx+1)*s+2*pad)*1.35),v.cap,'Würfelnetz','ve-wnet');
};

/* Baumdiagramm (waagrecht): {type:'tree',prod:[['blau','grün','gelb'],['Jeans','Shorts']],col:[[0,2,3],[7,7]]} oder {perm:['A','B','C'],col:{A:0,B:2,C:3},sep:''}
   brace:true = Klammer mit Anzahl je Hauptast; nonum:true = ohne Nummern; leaf:false = ohne Ergebnisliste */
VEXT.tree=function(v){
  var root={t:'',k:[],path:[]},levels=0,fs=v.fs||16;
  function mk(t,c,node,d){if(v.lvc)c=v.lvc[d];var n={t:t,c:c,k:[],path:node.path.concat([{t:t,c:c}])};build(n,d+1);return n}
  function build(node,d){if(v.prod){if(d>=v.prod.length)return;node.k=v.prod[d].map(function(t,i){return mk(t,v.col&&v.col[d]?v.col[d][i]:7,node,d)})}
    else{var used=node.path.map(function(p){return p.t}),rest=v.perm.filter(function(t){return used.indexOf(t)<0});node.k=rest.map(function(t){return mk(t,v.col?v.col[t]:7,node,d)})}}
  build(root,0);
  var leaves=[];(function walk(n,d){levels=Math.max(levels,d);if(!n.k.length){leaves.push(n);return}n.k.forEach(function(c){walk(c,d+1)})})(root,0);
  var maxw=[0];for(var d=1;d<=levels;d++)maxw[d]=0;
  (function walk(n,d){if(d)maxw[d]=Math.max(maxw[d],String(n.t).length*fs*.6+16);n.k.forEach(function(c){walk(c,d+1)})})(root,0);
  var L=leaves.length,RH=v.rh||(L>8?28:34),y0=8,xs=[12],o='',idx=0,gap=v.gap||34;
  for(d=1;d<=levels;d++)xs[d]=xs[d-1]+(d===1?18:maxw[d-1]/2)+gap+maxw[d]/2;
  var H=y0*2+L*RH;
  function place(n,d){n.x=xs[d];if(!n.k.length){n.y=y0+RH*(idx++ +.5);return n.y}var ys=n.k.map(function(c){return place(c,d+1)});n.y=(ys[0]+ys[ys.length-1])/2;return n.y}
  place(root,0);
  var nodes=[];(function walk(n,d){n.k.forEach(function(c){var xa=n.x+(d?maxw[d]/2:5),xb=c.x-maxw[d+1]/2;o+='<path d="M'+xa.toFixed(1)+' '+n.y.toFixed(1)+'C'+((xa+xb)/2).toFixed(1)+' '+n.y.toFixed(1)+' '+((xa+xb)/2).toFixed(1)+' '+c.y.toFixed(1)+' '+xb.toFixed(1)+' '+c.y.toFixed(1)+'" fill="none" stroke="#B7C0CF" stroke-width="2"/>';nodes.push([c,d+1]);walk(c,d+1)})})(root,0);
  o+='<circle cx="'+root.x+'" cy="'+root.y.toFixed(1)+'" r="5.5" fill="#2F3A4A"/>';
  nodes.forEach(function(q){var n=q[0],c=C(n.c),w=String(n.t).length*fs*.6+16;o+='<rect x="'+(n.x-w/2).toFixed(1)+'" y="'+(n.y-fs*.78).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+(fs*1.56).toFixed(1)+'" rx="'+(fs*.78).toFixed(1)+'" fill="#fff" stroke="'+c+'" stroke-width="2.2"/>'+tx(n.x,n.y+fs*.36,fs,n.t,c)});
  var ex=xs[levels]+maxw[levels]/2+(v.nonum?14:34),W=ex;
  if(v.leaf!==false)leaves.forEach(function(n,i){if(!v.nonum)o+=tx(ex-8,n.y+5,13,String(i+1)+'.','#8A94A6','end',700);
    var sp=v.sep===undefined?'-':v.sep,str=n.path.map(function(p){return p.t}).join(sp);
    o+='<text x="'+ex.toFixed(1)+'" y="'+(n.y+fs*.36).toFixed(1)+'" font-size="'+fs+'" font-weight="800" '+F+'>'+n.path.map(function(p,j){return '<tspan fill="'+C(p.c)+'">'+esc(p.t)+'</tspan>'+(j<n.path.length-1&&sp?'<tspan fill="#8A94A6">'+esc(sp)+'</tspan>':'')}).join('')+'</text>';W=Math.max(W,ex+str.length*fs*.6+6)});
  if(v.brace&&root.k.length>1){var bx=W+4;root.k.forEach(function(c){var ls=[];(function w(n){if(!n.k.length)ls.push(n);n.k.forEach(w)})(c);var ya=ls[0].y-RH*.4,yb=ls[ls.length-1].y+RH*.4,col=C(c.c),hm=Math.max(0,(yb-ya)/2-12);
    o+='<path d="M'+bx+' '+ya.toFixed(1)+'q6 0 6 6v'+hm.toFixed(1)+'l5 6l-5 6v'+hm.toFixed(1)+'q0 6 -6 6" fill="none" stroke="'+col+'" stroke-width="2.2"/>'+tx(bx+24,(ya+yb)/2+6,17,String(ls.length),col)});W=bx+36}
  return fig(o,Math.max(W,200),H,Math.min(470,Math.max(W,200)*1.25),v.cap,'Baumdiagramm','ve-tree');
};

/* Kreuztabelle mit Outfit-Bildchen: {type:'kgrid',rows:[['blau',0],…],cols:[['Jeans','#2F5597'],…],num:true} */
function shirt(x,y,s,c){return '<path d="M'+(x-s*.5)+' '+(y-s*.32)+'l'+(s*.26)+' '+(-s*.2)+'h'+(s*.48)+'l'+(s*.26)+' '+(s*.2)+'l'+(-s*.14)+' '+(s*.2)+'l'+(-s*.12)+' '+(-s*.07)+'v'+(s*.62)+'h'+(-s*.48)+'v'+(-s*.62)+'l'+(-s*.12)+' '+(s*.07)+'z" fill="'+c+'" stroke="#2F3A4A" stroke-width="1.6" stroke-linejoin="round"/>'}
function pants(x,y,s,c){return '<path d="M'+(x-s*.3)+' '+y+'h'+(s*.6)+'l'+(s*.04)+' '+(s*.62)+'h'+(-s*.26)+'l'+(-s*.08)+' '+(-s*.4)+'l'+(-s*.08)+' '+(s*.4)+'h'+(-s*.26)+'z" fill="'+c+'" stroke="#2F3A4A" stroke-width="1.6" stroke-linejoin="round"/>'}
VEXT.kgrid=function(v){
  var R=v.rows||[],K=v.cols||[],lw=112,cw=Math.min(120,(400-lw)/K.length),rh=74,hh=40,o='',W=lw+cw*K.length+6,H=hh+rh*R.length+6,n=0;
  K.forEach(function(k,j){var cx=lw+cw*(j+.5);o+=pants(cx-30,10,26,k[1])+tx(cx+8,30,16,k[0],'#2B3350','middle')});
  R.forEach(function(r,i){var y=hh+rh*i,c=C(r[1]);o+='<line x1="4" y1="'+y+'" x2="'+(W-2)+'" y2="'+y+'" stroke="#DDE3EC" stroke-width="1.5"/>';
    o+=shirt(22,y+rh/2,28,c)+tx(44,y+rh/2+6,16,r[0],c,'start');
    K.forEach(function(k,j){var cx=lw+cw*(j+.5);n++;o+='<rect x="'+(cx-cw/2+6)+'" y="'+(y+6)+'" width="'+(cw-12)+'" height="'+(rh-12)+'" rx="10" fill="#F6F8FC" stroke="#E3E8F0"/>';
      o+=shirt(cx,y+rh*.36,30,c)+pants(cx,y+rh*.5,30,k[1]);if(v.num)o+=tx(cx-cw/2+18,y+24,13,String(n)+'.','#8A94A6','middle',700)})});
  o+='<line x1="'+lw+'" y1="6" x2="'+lw+'" y2="'+(H-4)+'" stroke="#DDE3EC" stroke-width="1.5"/>';
  return fig(o,W,H,Math.min(420,W*1.1),v.cap,'Kreuztabelle','ve-kgrid');
};

/* Einführungs-Szenen: {type:'scn_e',kind:'garden'|'survey'|'map'|'box'|'muffins'|'outfit',say:'…'} */
VEXT.scn_e=function(v){
  var k=v.kind,o='',i,FB='font-family="Arial,sans-serif" font-weight="800"';
  function bub(t,col,x,w){x=x===undefined?300:x;w=w||Math.min(560,String(t).length*12.5+40);return '<g class="sc-pop"><rect x="'+(x-w/2)+'" y="14" width="'+w+'" height="44" rx="22" fill="#fff" stroke="'+col+'" stroke-width="3"/><text x="'+x+'" y="44" text-anchor="middle" font-size="22" fill="'+col+'" '+FB+'>'+esc(t)+'</text></g>'}
  if(k==='garden'){
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="150" width="600" height="80" fill="#D7EDCF"/>';
    o+='<polygon points="140,92 470,92 540,198 70,198" fill="#A8D99A"/>';
    var path='M140 92L470 92L540 198L70 198Z';
    o+='<path d="'+path+'" fill="none" stroke="#8D6E63" stroke-width="5" stroke-linejoin="round"/><path d="'+path+'" fill="none" stroke="#8D6E63" stroke-width="2.5" transform="translate(0 -12)" stroke-linejoin="round" opacity=".7"/>';
    [[140,92],[250,92],[360,92],[470,92],[505,145],[540,198],[383,198],[226,198],[70,198],[105,145]].forEach(function(p){o+='<rect x="'+(p[0]-4)+'" y="'+(p[1]-22)+'" width="8" height="26" rx="2" fill="#6D4C41"/>'});
    o+='<g><circle r="11" fill="#F29900" stroke="#B06000" stroke-width="2.5"/><circle cx="-3.5" cy="-2" r="1.8" fill="#2F3A4A"/><circle cx="3.5" cy="-2" r="1.8" fill="#2F3A4A"/><animateMotion dur="8s" repeatCount="indefinite" path="'+path+'"/></g>';
    o+='<circle cx="300" cy="150" r="14" fill="#F6C945"/><circle cx="276" cy="160" r="9" fill="#EA8FB1"/><circle cx="325" cy="162" r="9" fill="#C58AF0"/>';
    o+=bub(v.say||'Wie lang wird der Zaun rundherum?','#B06000');
  }else if(k==='survey'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect x="110" y="70" width="380" height="150" rx="10" fill="#fff" stroke="#9AA6B8" stroke-width="3"/>';
    var fr=[['#34A853','Apfel'],['#F6C945','Banane'],['#9334E6','Traube']];
    fr.forEach(function(f,r){var y=104+r*40;o+='<circle cx="146" cy="'+y+'" r="12" fill="'+f[0]+'"/>'+'<text x="168" y="'+(y+7)+'" font-size="18" fill="#2B3350" '+FB+'>'+f[1]+'</text>';
      var n=[7,4,5][r];for(i=0;i<n;i++){var g=Math.floor(i/5),p=i%5,bx=270+g*70,d=(r*7+i)*.32;
        o+=p<4?'<line class="sc-cookie" style="animation-delay:'+d.toFixed(2)+'s" x1="'+(bx+p*11)+'" y1="'+(y-12)+'" x2="'+(bx+p*11)+'" y2="'+(y+12)+'" stroke="#2F3A4A" stroke-width="3.4" stroke-linecap="round"/>':'<line class="sc-cookie" style="animation-delay:'+d.toFixed(2)+'s" x1="'+(bx-6)+'" y1="'+(y+10)+'" x2="'+(bx+40)+'" y2="'+(y-10)+'" stroke="#F29900" stroke-width="3.4" stroke-linecap="round"/>'}});
    o+=bub(v.say||'Welches Obst mag die Klasse am liebsten?','#1A56C4');
  }else if(k==='map'){
    o+='<rect width="600" height="230" fill="#F6F1E3"/>';
    for(i=0;i<12;i++)o+='<line x1="'+(i*50)+'" y1="60" x2="'+(i*50)+'" y2="230" stroke="#E6DCC3" stroke-width="1.2"/>';
    for(i=0;i<4;i++)o+='<line x1="0" y1="'+(60+i*50)+'" x2="600" y2="'+(60+i*50)+'" stroke="#E6DCC3" stroke-width="1.2"/>';
    o+='<path d="M430 80q90 -10 110 40q-10 50 -100 40q-40 -40 -10 -80z" fill="#BFE1F5" stroke="#7FB6D8" stroke-width="2"/>';
    [[200,90],[260,110],[330,86],[150,190]].forEach(function(t){o+='<circle cx="'+t[0]+'" cy="'+t[1]+'" r="11" fill="#81C995"/><circle cx="'+(t[0]+10)+'" cy="'+(t[1]+4)+'" r="8" fill="#5DB37E"/>'});
    o+='<path d="M90 160Q220 110 300 150T470 168" fill="none" stroke="#B06000" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>';
    o+='<path d="M76 156l14 -14l14 14v18h-28z" fill="#F29900" stroke="#B06000" stroke-width="2"/><rect x="458" y="152" width="26" height="20" fill="#8AB4F8" stroke="#1A56C4" stroke-width="2"/><path d="M455 152l16 -12l16 12z" fill="#1A56C4"/>';
    o+='<g class="sc-cookie" style="animation-delay:.6s"><rect x="90" y="196" width="380" height="24" rx="4" fill="#FFE27A" stroke="#C99A1E" stroke-width="2"/>';
    for(i=0;i<=8;i++)o+='<line x1="'+(90+i*47.5)+'" y1="196" x2="'+(90+i*47.5)+'" y2="'+(i%2?206:212)+'" stroke="#3A2E0A" stroke-width="2"/>';
    o+='</g><rect x="500" y="196" width="88" height="24" rx="12" fill="#2F3A4A"/><text x="544" y="213" text-anchor="middle" font-size="13" fill="#fff" '+FB+'>1 : 25 000</text>';
    o+=bub(v.say||'Wie weit ist es in Wirklichkeit?','#1A56C4');
  }else if(k==='box'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="190" width="600" height="40" fill="#E3E9F5"/>';
    var a=58,bx2=70,by=180;
    o+='<polygon points="'+bx2+','+by+' '+(bx2+a)+','+by+' '+(bx2+a)+','+(by-a)+' '+bx2+','+(by-a)+'" fill="#C9DBFB" stroke="#1A3FA0" stroke-width="2.6"/><polygon points="'+bx2+','+(by-a)+' '+(bx2+a)+','+(by-a)+' '+(bx2+a+28)+','+(by-a-22)+' '+(bx2+28)+','+(by-a-22)+'" fill="#E8F0FE" stroke="#1A3FA0" stroke-width="2.6"/><polygon points="'+(bx2+a)+','+by+' '+(bx2+a+28)+','+(by-22)+' '+(bx2+a+28)+','+(by-a-22)+' '+(bx2+a)+','+(by-a)+'" fill="#9FBFF5" stroke="#1A3FA0" stroke-width="2.6"/>';
    o+='<path d="M190 140h70" stroke="#5F6B7A" stroke-width="5" stroke-linecap="round"/><path d="M252 128l14 12l-14 12" fill="none" stroke="#5F6B7A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    var s=38,nx=300,ny=70,cells=[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]],cc=['#4285F4','#34A853','#F29900','#34A853','#4285F4','#F29900'];
    cells.forEach(function(p,j){o+='<rect class="sc-cookie" style="animation-delay:'+(j*.35).toFixed(2)+'s" x="'+(nx+p[0]*s)+'" y="'+(ny+p[1]*s)+'" width="'+s+'" height="'+s+'" fill="'+cc[j]+'" fill-opacity=".3" stroke="#2F3A4A" stroke-width="2.4"/>'});
    o+=bub(v.say||'Aus 6 Quadraten wird ein Würfel','#1A56C4');
  }else if(k==='muffins'){
    o+='<rect width="600" height="230" fill="#FFF6E5"/><rect y="176" width="600" height="54" fill="#E8C99B"/>';
    for(i=0;i<3;i++){var cx=130+i*170;o+='<ellipse cx="'+cx+'" cy="176" rx="72" ry="20" fill="#fff" stroke="#9AA3B5" stroke-width="3"/>';
      [[-36,0],[-12,6],[12,0],[36,6]].forEach(function(m,j){var mx=cx+m[0],my=166+m[1];o+='<g class="sc-cookie" style="animation-delay:'+(i*.45+j*.15).toFixed(2)+'s"><path d="M'+(mx-11)+' '+(my-12)+'h22l-4 16h-14z" fill="#E8A35B" stroke="#A8702E" stroke-width="1.6"/><path d="M'+(mx-13)+' '+(my-12)+'a13 11 0 0 1 26 0z" fill="#8D5A2B"/><circle cx="'+mx+'" cy="'+(my-24)+'" r="3" fill="#E85D75"/></g>'})}
    o+=bub(v.say||'12 Muffins auf 3 Teller: 12 : 3 = 4, kein Rest','#188038');
  }else if(k==='outfit'){
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="200" width="600" height="30" fill="#E3E9F5"/><line x1="40" y1="78" x2="250" y2="78" stroke="#8A94A6" stroke-width="4" stroke-linecap="round"/>';
    var sc=['#4285F4','#34A853','#F29900'];
    sc.forEach(function(c,j){var x=70+j*68;o+='<path d="M'+x+' 78v8M'+(x-24)+' 98l12-10h24l12 10l-8 10l-6-4v34h-20v-34l-6 4z" fill="'+c+'" stroke="#2F3A4A" stroke-width="2" stroke-linejoin="round"/>'});
    o+='<line x1="40" y1="160" x2="250" y2="160" stroke="#8A94A6" stroke-width="4" stroke-linecap="round"/>';
    [['#2F5597',90],['#8D6E63',180]].forEach(function(p){var x=p[1];o+='<path d="M'+(x-18)+' 166h36l2 34h-14l-6-24l-6 24h-14z" fill="'+p[0]+'" stroke="#2F3A4A" stroke-width="2" stroke-linejoin="round"/>'});
    var fx=440;
    o+='<circle cx="'+fx+'" cy="92" r="20" fill="#F4CDB6" stroke="#2F3A4A" stroke-width="2"/><path d="M'+(fx-20)+' 86q20 -26 40 0" fill="#6D4C41"/>';
    o+='<path d="M'+(fx-30)+' 124l14-10h32l14 10l-8 12l-8-5v35h-28v-35l-8 5z" stroke="#2F3A4A" stroke-width="2" stroke-linejoin="round" fill="#4285F4"><animate attributeName="fill" values="#4285F4;#4285F4;#34A853;#34A853;#F29900;#F29900;#4285F4" dur="6s" repeatCount="indefinite"/></path>';
    o+='<path d="M'+(fx-15)+' 166h30l2 34h-12l-5-22l-5 22h-12z" stroke="#2F3A4A" stroke-width="2" stroke-linejoin="round" fill="#2F5597"><animate attributeName="fill" values="#2F5597;#8D6E63;#2F5597;#8D6E63;#2F5597;#8D6E63;#2F5597" dur="6s" repeatCount="indefinite" calcMode="discrete"/></path>';
    o+=bub(v.say||'3 T-Shirts und 2 Hosen: Wie viele Outfits?','#1A56C4');
  }
  return '<figure class="vis scn" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||v.say||'Bild zum Thema')+'" style="border-radius:16px">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};
/* Diagramme und Strichlisten: Das Ablesen ist die Aufgabe, darum keine Lösungs-Ausblendung */
VT_SKIP.chart=1;VT_SKIP.tally=1;VT_SKIP.scn_e=1;VT_SKIP.plan=1;
})();
})();

/* ===== Erweiterung vis_f.js (v5.59, gekapselt) ===== */
(function(){

/* ---------- Agent F (v5.57): «fgraph» = Funktionsgraph zum Ablesen ----------
   Zeichnet genau wie «geo» (gleiche Felder), steht aber in VT_SKIP: In Aufgaben ist das Ablesen
   am Graphen die Aufgabe, darum ersetzt visT die Achsen-Beschriftung nicht durch «_».
   Der Graph selbst trägt keine Lösung (keine Beschriftung des gesuchten Punkts). */
VEXT.fgraph=function(v){return vGeo(v)};
VT_SKIP.fgraph=1;
/* ---------- Agent F (v5.57): «fwtab» = Wertetabelle (waagrecht, wie im Schulbuch) ----------
   {"type":"fwtab","rows":[["x","2","3","5"],["y","7","10,5","_"]],"hl":{"1,3":0},"cap":"…"}
   Erste Spalte = Grössen (x, y, Jahr …), "_" = Lücke (hellgrau). hl: "Zeile,Spalte" → Farbe 0–7.
   Zeigt nur gegebene Werte, darum in VT_SKIP (wie tbl). */
VEXT.fwtab=function(v){
  var hl=v.hl||{},h='<table class="fwt">'+(v.rows||[]).map(function(r,i){return '<tr>'+r.map(function(x,j){
    var s=String(x),c=hl[i+','+j],t=j===0?'th':'td',cl=(j===0&&s.length===1?'v':'')+(c!==undefined?' hc':'');
    return '<'+t+(cl?' class="'+cl.trim()+'"':'')+(c!==undefined?' style="--c:'+dcol(c)+'"':'')+'>'+(s==='_'?'<span class="gap">_</span>':rt(s))+'</'+t+'>'}).join('')+'</tr>'}).join('')+'</table>';
  return '<figure class="vis fwv">'+h+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>'};
VT_SKIP.fwtab=1;
})();

/* ===== Erweiterung vis_g1.js (v5.59, gekapselt) ===== */
(function(){
/* ---------- G1 (v5.57): Mengen 1:1 vergleichen «cmp», Uhr mit Markierungen «clk», Uhren-Reihe «clkrow», Malfeld tauschen «arr2» ----------
   cmp:    {"type":"cmp","rows":[{"e":"🍎","n":6,"c":0},{"e":"🍐","n":4,"c":2}],"more":true,"less":false,"pair":true,"badge":true,"slots":0,"cap":"…"}
           Zeile auch mit Teilen: {"segs":[["dot",2,2],["dot",5,0]],"lab":"7","bc":7}. "e":"dot" = Plättchen in Farbe c.
           more: Überschuss der längeren Reihe orange markiert (+k); less: fehlende Partner der kürzeren Reihe als leere Plätze.
           slots: N Felder pro Reihe (wie Zwanzigerfeld, Reihen einzeln gefüllt). croc:true = zwei Türme, Krokodil-Maul öffnet zur grösseren Menge.
   clk:    {"type":"clk","h":3,"m":15,"sec":[[0,15,0]],"mark":[[3,0]],"from":{"h":4,"m":0},"arc":3,"nohands":false,"cap":"…"}
           sec = Minuten-Sektor [von,bis,Farbe]; mark = Ring um Ziffer [Ziffer,Farbe]; from = blasse Start-Zeiger, arc = Bogen des Stundenzeigers (Farbe).
   clkrow: {"type":"clkrow","items":[{"h":8,"m":30,"t":"8:30","s":"halb 9","ok":true}]}
   arr2:   {"type":"arr2","a":[3,5],"b":[5,3],"col":{"3":0,"5":2}} */
(function(){
var FF='font-family="Arial,Helvetica,sans-serif"';
function T(x,y,s,t,c,a,w){return '<text x="'+(+x).toFixed(1)+'" y="'+(+y).toFixed(1)+'" text-anchor="'+(a||'middle')+'" font-size="'+s+'" font-weight="'+(w||800)+'" fill="'+c+'" '+FF+'>'+esc(t)+'</text>'}
function rgb(h){var n=parseInt(String(h).slice(1),16);return [n>>16,n>>8&255,n&255]}
function tint(h,a){var c=rgb(h);return 'rgb('+c.map(function(x){return Math.round(x+(255-x)*a)}).join(',')+')'}
function dark(h,a){var c=rgb(h);return 'rgb('+c.map(function(x){return Math.round(x*(1-a))}).join(',')+')'}
function grad(id,col){return '<radialGradient id="'+id+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="'+col+'"/><stop offset="1" stop-color="'+col+'" stop-opacity=".82"/></radialGradient>'}
function counter(cx,cy,r,col,gid){return '<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="url(#'+gid+')" stroke="'+dark(col,.18)+'" stroke-width="1.5"/><ellipse cx="'+(cx-r*.32).toFixed(1)+'" cy="'+(cy-r*.36).toFixed(1)+'" rx="'+(r*.33).toFixed(1)+'" ry="'+(r*.2).toFixed(1)+'" fill="#fff" fill-opacity=".55"/>'}
var OR='#F29900',LINK='#A9B3C4';
function norm(r){var segs=r.segs||[[r.e||'dot',r.n||0,r.c===undefined?0:r.c]],n=0;segs.forEach(function(s){n+=s[1]});
  return {segs:segs,n:n,lab:r.lab!==undefined?String(r.lab):String(n),bc:r.bc!==undefined?r.bc:(segs.length>1?7:segs[0][2])}}
function itemAt(r,i){var k=i;for(var j=0;j<r.segs.length;j++){if(k<r.segs[j][1])return r.segs[j];k-=r.segs[j][1]}return null}
function capt2(v){return v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':''}

/* ---- Krokodil-Maul: Kopf hinten rechts, Maul offen nach links (">"); dir "<" = gespiegelt ---- */
function croc(cx,cy,s,dir){
  var B='#00A5BF',D='#00708A',L='#7FD6E3',o='',i;
  /* Rachen */
  o+='<path d="M34,-6 L-74,-44 Q-70,0 -70,42 L34,8 Z" fill="#F9C9D8"/><ellipse cx="-14" cy="12" rx="34" ry="9" fill="#EF8FB0" transform="rotate(12 -14 12)"/>';
  /* Zähne */
  function teeth(x0,y0,x1,y1,sg){var t='',n=6,k;for(k=0;k<n;k++){var f=(k+.6)/(n+.4),px=x0+(x1-x0)*f,py=y0+(y1-y0)*f,dx=(x1-x0),dy=(y1-y0),l=Math.sqrt(dx*dx+dy*dy);dx/=l;dy/=l;var nx=-dy*sg,ny=dx*sg,w=5.5,h=10;
    t+='<path d="M'+(px-dx*w).toFixed(1)+','+(py-dy*w).toFixed(1)+' L'+(px+nx*h).toFixed(1)+','+(py+ny*h).toFixed(1)+' L'+(px+dx*w).toFixed(1)+','+(py+dy*w).toFixed(1)+' Z" fill="#fff" stroke="#AFC0CF" stroke-width="1.1" stroke-linejoin="round"/>'}return t}
  o+=teeth(-70,-42,26,-8,1)+teeth(-66,40,26,8,-1);
  /* Unterkiefer */
  o+='<path d="M48,14 L-64,56 Q-78,56 -72,42 L30,6 Z" fill="'+B+'" stroke="'+D+'" stroke-width="3" stroke-linejoin="round"/>';
  /* Oberkiefer mit Höckern */
  o+='<path d="M52,-26 L-66,-64 Q-82,-62 -76,-44 L28,-6 Z" fill="'+B+'" stroke="'+D+'" stroke-width="3" stroke-linejoin="round"/>';
  for(i=0;i<4;i++){var bx=-44+i*24,by=-55+i*7.8;o+='<path d="M'+(bx-7)+','+(by+1)+' q7,-10 14,0" fill="'+B+'" stroke="'+D+'" stroke-width="2.4"/>'}
  o+='<circle cx="-68" cy="-60" r="6" fill="'+B+'" stroke="'+D+'" stroke-width="2.4"/><circle cx="-69" cy="-61" r="1.8" fill="'+D+'"/>';
  /* Kopf und Hals */
  o+='<path d="M30,-34 C60,-44 98,-30 104,-6 C108,12 92,30 60,32 C44,33 34,24 30,14 Z" fill="'+B+'" stroke="'+D+'" stroke-width="3" stroke-linejoin="round"/>';
  o+='<path d="M60,4 C74,8 86,6 96,0" fill="none" stroke="'+L+'" stroke-width="3" stroke-linecap="round"/>';
  for(i=0;i<3;i++)o+='<circle cx="'+(70+i*11)+'" cy="'+(16-i*3)+'" r="2.6" fill="'+D+'" opacity=".5"/>';
  /* Auge */
  o+='<circle cx="44" cy="-38" r="17" fill="'+B+'" stroke="'+D+'" stroke-width="3"/><circle cx="43" cy="-39" r="11.5" fill="#fff"/><ellipse cx="40" cy="-39" rx="4" ry="8" fill="#1F2937"/><circle cx="38.5" cy="-43" r="2" fill="#fff"/>';
  return '<g transform="translate('+cx.toFixed(1)+' '+cy.toFixed(1)+') scale('+(dir==='<'?-s:s)+' '+s+')">'+o+'</g>';
}

/* ---- Türme mit Krokodil ---- */
function tower(v){
  var R=(v.rows||[]).map(norm),L=R[0],Q=R[1],uid='cmt'+(++_guid),W=440,xl=110,xr=330,cx=220,q=46,top=14,o='',defs='',i;
  var nM=Math.max(L.n,Q.n),nm=Math.min(L.n,Q.n),yb=top+nM*q,cL=dcol(L.bc),cR=dcol(Q.bc);
  function Y(k){return yb-q*(k+.5)}
  [L,Q].forEach(function(r,ri){r.segs.forEach(function(s,si){defs+=grad(uid+ri+'_'+si,dcol(s[2]))})});
  [[L,xl,cL],[Q,xr,cR]].forEach(function(a){o+='<rect x="'+(a[1]-34)+'" y="'+(top-6)+'" width="68" height="'+(nM*q+12)+'" rx="18" fill="'+tint(a[2],.93)+'" stroke="'+tint(a[2],.65)+'" stroke-width="1.6"/>'});
  if(L.n!==Q.n){var bx=L.n>Q.n?xl:xr;o+='<rect x="'+(bx-30)+'" y="'+(Y(nM-1)-q/2+3)+'" width="60" height="'+((nM-nm)*q-6)+'" rx="14" fill="#FFF4DC" stroke="'+OR+'" stroke-width="2.6" stroke-dasharray="7 5"/>';
    var lx=L.n>Q.n?xl+70:xr-70,ly=(Y(nM-1)+Y(nm))/2;o+='<rect x="'+(lx-28)+'" y="'+(ly-16)+'" width="56" height="32" rx="16" fill="'+OR+'"/>'+T(lx,ly+7,20,'+'+(nM-nm),'#fff')}
  for(i=0;i<nm;i++)o+='<line x1="'+(xl+26)+'" y1="'+Y(i)+'" x2="'+(xr-26)+'" y2="'+Y(i)+'" stroke="'+LINK+'" stroke-width="3" stroke-linecap="round"/><circle cx="'+(xl+26)+'" cy="'+Y(i)+'" r="3.6" fill="'+LINK+'"/><circle cx="'+(xr-26)+'" cy="'+Y(i)+'" r="3.6" fill="'+LINK+'"/>';
  [[L,xl,0],[Q,xr,1]].forEach(function(a){for(i=0;i<a[0].n;i++){var s=itemAt(a[0],i),si=a[0].segs.indexOf(s);
    o+=s[0]==='dot'?counter(a[1],Y(i),16,dcol(s[2]),uid+a[2]+'_'+si):'<text x="'+a[1]+'" y="'+(Y(i)+13)+'" text-anchor="middle" font-size="38">'+s[0]+'</text>'}});
  var yn=yb+82;
  o+=T(xl-22,yn+20,58,L.lab,cL)+T(xr+22,yn+20,58,Q.lab,cR);
  if(L.n===Q.n)o+=T(cx,yn+18,56,'=','#6B7280');else o+=croc(cx,yn,.9,L.n>Q.n?'>':'<');
  var H=yn+64;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block;margin:0 auto;max-width:380px" role="img" aria-label="'+esc(L.lab+' gegen '+Q.lab)+'"><defs>'+defs+'</defs>'+o+'</svg>'+capt2(v)+'</figure>';
}

VEXT.cmp=function(v){
  if(v.croc)return tower(v);
  if(v.multi)return '<figure class="vis" style="width:100%"><div class="g1mul">'+v.multi.map(function(m){var h=VEXT.cmp(m),a=h.indexOf('<svg'),b=h.lastIndexOf('</svg>')+6;return '<div class="g1mi">'+h.slice(a,b)+(m.t?'<b>'+esc(m.t)+'</b>':'')+'</div>'}).join('')+'</div>'+capt2(v)+'</figure>';
  var R=(v.rows||[]).map(norm),uid='cm'+(++_guid),N=Math.max.apply(null,R.map(function(r){return r.n}).concat([1])),S=v.slots||0,M=Math.max(N,S);
  var badge=v.badge!==false,x0=badge?84:14,GG=14,grp=M>5,gw=grp?Math.floor((M-1)/5):0,p=Math.min(62,(586-x0-gw*GG)/M);
  function X(i){return x0+p*(i+.5)+(grp?Math.floor(i/5)*GG:0)}
  var two=R.length===2,pair=two&&!S&&v.pair!==false,RH=S?p:Math.max(54,p+6),gap=S?4:(pair?42:16),top=S?14:8,o='',defs='',i;
  function Yc(ri){return top+RH/2+ri*(RH+gap)}
  var xe=X(M-1)+p/2,W=Math.round(xe+(S?14:8)),H=Yc(R.length-1)+RH/2+(S?14:8);
  R.forEach(function(r,ri){r.segs.forEach(function(s,si){defs+=grad(uid+ri+'_'+si,dcol(s[2]))})});
  if(S){o+='<rect x="'+(x0-9)+'" y="'+(top-8)+'" width="'+(xe-x0+18)+'" height="'+(R.length*RH+(R.length-1)*gap+16)+'" rx="13" fill="#F4F7FB" stroke="#5F6B7A" stroke-width="3"/>';
    R.forEach(function(r,ri){for(i=0;i<S;i++)o+='<rect x="'+(X(i)-p/2+2.5).toFixed(1)+'" y="'+(Yc(ri)-p/2+2.5).toFixed(1)+'" width="'+(p-5).toFixed(1)+'" height="'+(p-5).toFixed(1)+'" rx="6" fill="#fff" stroke="#C5CCD6" stroke-width="1.5"/>'});
    for(i=5;i<S;i+=5){var gx=(X(i-1)+X(i))/2;o+='<line x1="'+gx.toFixed(1)+'" x2="'+gx.toFixed(1)+'" y1="'+(top-5)+'" y2="'+(H-9)+'" stroke="#5F6B7A" stroke-width="2.5" stroke-dasharray="3 4"/>'}}
  else R.forEach(function(r,ri){o+='<rect x="'+(x0-8)+'" y="'+(Yc(ri)-RH/2)+'" width="'+(X(Math.max(r.n,1)-1)+p/2-x0+16).toFixed(1)+'" height="'+RH+'" rx="16" fill="'+tint(dcol(r.bc),.93)+'" stroke="'+tint(dcol(r.bc),.62)+'" stroke-width="1.6"/>'});
  if(two&&!S&&R[0].n!==R[1].n){var Lg=R[0].n>R[1].n?0:1,Sh=1-Lg,nS=R[Sh].n,nL=R[Lg].n;
    if(v.more!==false){o+='<rect x="'+(X(nS)-p/2+3).toFixed(1)+'" y="'+(Yc(Lg)-RH/2+3)+'" width="'+(X(nL-1)-X(nS)+p-6).toFixed(1)+'" height="'+(RH-6)+'" rx="14" fill="#FFF4DC" stroke="'+OR+'" stroke-width="2.6" stroke-dasharray="7 5"/>';
      var mx=(X(nS)+X(nL-1))/2,my=Lg===0?Yc(0)+RH/2+gap/2:Yc(1)-RH/2-gap/2;if(!pair)my=Lg===0?Yc(0)+RH/2-2:Yc(1)-RH/2+2;
      o+='<rect x="'+(mx-28).toFixed(1)+'" y="'+(my-15)+'" width="56" height="30" rx="15" fill="'+OR+'"/>'+T(mx,my+7,20,'+'+(nL-nS),'#fff')}
    if(v.less)for(i=nS;i<nL;i++)o+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Yc(Sh)+'" r="'+(p*.33).toFixed(1)+'" fill="#fff" stroke="'+OR+'" stroke-width="2.6" stroke-dasharray="5 4"/>'}
  if(pair){var nm=Math.min(R[0].n,R[1].n);for(i=0;i<nm;i++){var ya=Yc(0)+RH/2-3,yb2=Yc(1)-RH/2+3;o+='<line x1="'+X(i).toFixed(1)+'" y1="'+ya+'" x2="'+X(i).toFixed(1)+'" y2="'+yb2+'" stroke="'+LINK+'" stroke-width="3" stroke-linecap="round"/><circle cx="'+X(i).toFixed(1)+'" cy="'+ya+'" r="3.6" fill="'+LINK+'"/><circle cx="'+X(i).toFixed(1)+'" cy="'+yb2+'" r="3.6" fill="'+LINK+'"/>'}}
  R.forEach(function(r,ri){for(i=0;i<r.n;i++){var s=itemAt(r,i),si=r.segs.indexOf(s);
    o+=s[0]==='dot'?counter(X(i),Yc(ri),Math.min(19,p*.37),dcol(s[2]),uid+ri+'_'+si):'<text x="'+X(i).toFixed(1)+'" y="'+(Yc(ri)+Math.min(44,p*.72)*.36).toFixed(1)+'" text-anchor="middle" font-size="'+Math.min(44,p*.72).toFixed(1)+'">'+s[0]+'</text>'}
    if(badge){var bc=dcol(r.bc);o+='<circle cx="40" cy="'+Yc(ri)+'" r="25" fill="'+bc+'"/>'+T(40,Yc(ri)+9,r.lab.length>2?18:26,r.lab,'#fff')}});
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+Math.round(H)+'" width="100%" style="display:block;margin:0 auto;max-width:'+Math.round(Math.min(600,W*(S?1:.92)))+'px" role="img" aria-label="'+esc(R.map(function(r){return r.lab}).join(' und '))+'"><defs>'+defs+'</defs>'+o+'</svg>'+capt2(v)+'</figure>';
};

/* ---- Uhr mit Sektor, Ziffer-Ring, Start-Zeigern und Bogen ---- */
function clkSvg(v,px){
  var u='ck'+(++_guid),o='<defs><radialGradient id="'+u+'b" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#5E97F6"/><stop offset="1" stop-color="#1A56C4"/></radialGradient><filter id="'+u+'s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1.5" dy="2.5" stdDeviation="1.6" flood-opacity=".35"/></filter></defs>',i,a;
  o+='<circle cx="110" cy="110" r="106" fill="url(#'+u+'b)"/><circle cx="110" cy="110" r="91" fill="#FFFFFF"/>';
  function P(m,r){var an=m*Math.PI/30;return [(110+r*Math.sin(an)).toFixed(1),(110-r*Math.cos(an)).toFixed(1)]}
  (v.sec||[]).forEach(function(s){var c=dcol(s[2]===undefined?0:s[2]),a0=P(s[0],90),a1=P(s[1],90),big=(s[1]-s[0])>30?1:0;
    o+='<path d="M110,110 L'+a0+' A90 90 0 '+big+' 1 '+a1+' Z" fill="'+tint(c,.78)+'" stroke="'+c+'" stroke-width="2"/>'});
  function ha0(t){return ((t.h%12)+(t.m||0)/60)*Math.PI/6}
  if(v.from&&v.arc!==undefined){var wc=dcol(v.arc),w0=ha0(v.from),w1=ha0(v);if(w1<=w0)w1+=2*Math.PI;
    o+='<path d="M110,110 L'+(110+88*Math.sin(w0)).toFixed(1)+','+(110-88*Math.cos(w0)).toFixed(1)+' A88 88 0 '+(w1-w0>Math.PI?1:0)+' 1 '+(110+88*Math.sin(w1)).toFixed(1)+','+(110-88*Math.cos(w1)).toFixed(1)+' Z" fill="'+tint(wc,.78)+'" stroke="'+wc+'" stroke-width="2"/>'}
  if(v.quarters)[0,15,30,45].forEach(function(m){var e=P(m,90);o+='<line x1="110" y1="110" x2="'+e[0]+'" y2="'+e[1]+'" stroke="#5F6B7A" stroke-width="2" stroke-dasharray="4 4"/>'});
  o+='<circle cx="110" cy="110" r="91" fill="none" stroke="#DCE3EE" stroke-width="2"/>';
  for(i=0;i<60;i++){a=i*Math.PI/30;var big=i%5===0,r1=big?76:82;o+='<line x1="'+(110+r1*Math.sin(a)).toFixed(1)+'" y1="'+(110-r1*Math.cos(a)).toFixed(1)+'" x2="'+(110+88*Math.sin(a)).toFixed(1)+'" y2="'+(110-88*Math.cos(a)).toFixed(1)+'" stroke="'+(big?'#1F2937':'#B4BCC8')+'" stroke-width="'+(big?3.4:1.4)+'" stroke-linecap="round"/>'}
  (v.mark||[]).forEach(function(mk){var an=mk[0]*Math.PI/6,c=dcol(mk[1]===undefined?0:mk[1]);o+='<circle cx="'+(110+62*Math.sin(an)).toFixed(1)+'" cy="'+(110-62*Math.cos(an)).toFixed(1)+'" r="15" fill="'+tint(c,.8)+'" stroke="'+c+'" stroke-width="3.5"/>'});
  for(i=1;i<=12;i++){a=i*Math.PI/6;
    o+='<text x="'+(110+62*Math.sin(a)).toFixed(1)+'" y="'+(110-62*Math.cos(a)+8).toFixed(1)+'" text-anchor="middle" font-size="22" font-weight="800" fill="#1F2937" '+FF+'>'+i+'</text>';
    if(!v.nomin)o+='<text x="'+(110+98.5*Math.sin(a)).toFixed(1)+'" y="'+(110-98.5*Math.cos(a)+3.5).toFixed(1)+'" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" '+FF+'>'+(i*5)+'</text>'}
  function hand(ang,len,w,tail,col,tip,op){var s=Math.sin(ang),c=Math.cos(ang),px=c*w,py=s*w;
    return '<path d="M'+(110-s*tail+px*.7).toFixed(1)+','+(110+c*tail+py*.7).toFixed(1)+' L'+(110+s*(len-tip)+px).toFixed(1)+','+(110-c*(len-tip)+py).toFixed(1)+' L'+(110+s*len).toFixed(1)+','+(110-c*len).toFixed(1)+' L'+(110+s*(len-tip)-px).toFixed(1)+','+(110-c*(len-tip)-py).toFixed(1)+' L'+(110-s*tail-px*.7).toFixed(1)+','+(110+c*tail-py*.7).toFixed(1)+'Z" fill="'+col+'" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"'+(op?' opacity="'+op+'"':'')+'/>'}
  function ha(t){return ((t.h%12)+(t.m||0)/60)*Math.PI/6}
  if(v.from){var fh=ha(v.from),th=ha(v);o+=hand(fh,46,7,12,'#1F2937',12,.22)+hand((v.from.m||0)*Math.PI/30,80,4,16,'#1A73E8',10,.22);}
  if(!v.nohands)o+='<g filter="url(#'+u+'s)">'+hand(ha(v),46,7,12,'#1F2937',12)+hand((v.m||0)*Math.PI/30,80,4,16,'#1A73E8',10)+'</g>';
  if(v.from&&v.arc!==undefined){var fh=ha(v.from),th=ha(v);var ac=dcol(v.arc),r=56,d=th-fh;if(d<=0)d+=2*Math.PI;var a0=fh+.08,a1=fh+d-.1,x0=110+r*Math.sin(a0),y0=110-r*Math.cos(a0),x1=110+r*Math.sin(a1),y1=110-r*Math.cos(a1),am='ar'+u;
      o+='<defs><marker id="'+am+'" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+ac+'"/></marker></defs><path d="M'+x0.toFixed(1)+','+y0.toFixed(1)+' A'+r+' '+r+' 0 '+(d>Math.PI?1:0)+' 1 '+x1.toFixed(1)+','+y1.toFixed(1)+'" fill="none" stroke="'+ac+'" stroke-width="5" stroke-linecap="round" marker-end="url(#'+am+')"/>'}
  o+='<circle cx="110" cy="110" r="8" fill="#1F2937" stroke="#fff" stroke-width="2.5"/><circle cx="110" cy="110" r="2.5" fill="#1A73E8"/>';
  return '<svg viewBox="0 0 220 220"'+(px?' width="'+px+'" height="'+px+'" style="display:block;margin:0 auto;max-width:100%"':' width="100%" style="display:block"')+' role="img" aria-label="Uhr">'+o+'</svg>';
}
VEXT.clk=function(v){return '<figure class="vis" style="width:100%">'+clkSvg(v,v.px||230)+capt2(v)+'</figure>'};
VEXT.clkrow=function(v){
  return '<figure class="vis" style="width:100%"><div class="g1ckr">'+(v.items||[]).map(function(it){
    return '<div class="g1ck'+(it.ok?' ok':'')+'">'+clkSvg({h:it.h,m:it.m,nomin:true,mark:it.mark,sec:it.sec},0)+(it.t?'<b>'+esc(it.t)+'</b>':'')+(it.s?'<small>'+esc(it.s)+'</small>':'')+'</div>'}).join('')+'</div>'+capt2(v)+'</figure>'};

/* ---- zwei Malfelder nebeneinander: r × c = c × r ---- */
VEXT.arr2=function(v){
  var P=28,r9=11,uid='a2'+(++_guid),col=v.col||{},o='<defs>'+grad(uid,'#7D8DA6')+'</defs>',x=8,H0=0;
  function C(n){return col[n]!==undefined?dcol(col[n]):'#1F2937'}
  var A=[v.a,v.b],dims=A.map(function(d){return {w:34+d[1]*P,h:34+d[0]*P}}),Hm=Math.max(dims[0].h,dims[1].h)+8;
  A.forEach(function(d,k){var w=dims[k].w,h=dims[k].h,y0=(Hm-h)/2,gx=x+34,gy=y0+34,i,j;
    o+='<rect x="'+(gx-6)+'" y="'+(gy-6)+'" width="'+(d[1]*P+12)+'" height="'+(d[0]*P+12)+'" rx="12" fill="#fff" stroke="#D5DCE8" stroke-width="1.6"/>';
    for(j=0;j<d[0];j++)for(i=0;i<d[1];i++)o+=counter(gx+i*P+P/2,gy+j*P+P/2,r9,'#7D8DA6',uid);
    o+='<path d="M'+(gx-14)+','+(gy+3)+' v'+(d[0]*P-6)+'" stroke="'+C(d[0])+'" stroke-width="3" stroke-linecap="round"/>'+T(gx-24,gy+d[0]*P/2+8,22,d[0],C(d[0]),'end');
    o+='<path d="M'+(gx+3)+','+(gy-14)+' h'+(d[1]*P-6)+'" stroke="'+C(d[1])+'" stroke-width="3" stroke-linecap="round"/>'+T(gx+d[1]*P/2,gy-21,22,d[1],C(d[1]));
    x+=w+(k===0?54:0);if(k===0)o+=T(x-27,Hm/2+12,36,'=','#9AA3B2')});
  var W=x+10;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+Hm+'" width="100%" style="display:block;margin:0 auto;max-width:'+Math.round(W*1.05)+'px" role="img" aria-label="'+esc(v.a.join(' mal ')+' gleich '+v.b.join(' mal '))+'">'+o+'</svg>'+capt2(v)+'</figure>'};
})();
/* G1: Symmetrie-Grafik ohne abgeschnittene Beschriftung (Falten: Höhe; Karopapier: Satz als Bildunterschrift statt im Bild) */
VEXT.symmx=function(v){var h=vSymm(v);
  if(v.kind==='fold')h=h.replace('viewBox="0 0 300 140"','viewBox="-12 0 330 156"');
  if(v.kind==='grid')h=h.replace(/<text[^>]*>Jeder Punkt hat[^<]*<\/text>/,'').replace(/viewBox="0 0 228 184"/,'viewBox="0 0 228 158"');
  return h};
})();

/* ===== Erweiterung vis_g2.js (v5.59, gekapselt) ===== */
(function(){

/* ---------- Grafiken G2 (v5.57, Prüf-Agent G2): Messbecher, Balkenwaage, Plattformwaage, Bruchstreifen, Säulen, Reihe mit Farbe ----------
   Farben immer als Farbindex 0–7 (DC): 0 blau, 1 rot, 2 grün, 3 orange, 4 violett, 5 türkis, 6 pink, 7 neutral.
   Texte in den Grafiken dürfen {Farbe|Text} enthalten (wird als farbiger Text gezeichnet). */
function g2tx(s){s=String(s===undefined||s===null?'':s);var re=/\{([0-7])\|([^{}]*)\}/g,o='',l=0,m;while((m=re.exec(s))){o+=esc(s.slice(l,m.index))+'<tspan fill="'+(m[1]==='7'?'#1F2937':DC[+m[1]])+'">'+esc(m[2])+'</tspan>';l=re.lastIndex}return o+esc(s.slice(l))}
function g2len(s){return String(s===undefined||s===null?'':s).replace(/\{[0-7]\|([^{}]*)\}/g,'$1').length}
function g2c(i,d){return (i===undefined||i===null)?(d||'#1F2937'):(typeof i==='string'&&i.charAt(0)==='#')?i:(i|0)%8===7?'#1F2937':DC[(i|0)%8]}
function g2lite(hex,a){var n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;a=a===undefined?.82:a;return 'rgb('+Math.round(r+(255-r)*a)+','+Math.round(g+(255-g)*a)+','+Math.round(b+(255-b)*a)+')'}
var G2F='font-family="Arial,Helvetica,sans-serif"';
function g2fig(W,H,o,v,lab,maxw){return '<figure class="vis g2v" style="width:100%"><svg viewBox="0 0 '+Math.round(W)+' '+Math.round(H)+'" width="100%" style="display:block;margin:0 auto;max-width:'+(maxw||600)+'px" role="img" aria-label="'+esc(lab)+'">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>'}

/* Messbecher / Gefässe: {"type":"mbecher","items":[{k:"jug"|"glass"|"can",max,lv,step,lab,u,c,segs:[[von,bis,Farbe,"Text"]],marks:[[Wert,"Text",Farbe]],s2:{f,u,lab,c},t:"Etikett",n:Anzahl,h:Höhe},"+",{…}],"cap":"…"} */
VEXT.mbecher=function(v){
  var items=v.items||[v],uid='mb'+(++_guid),o='',defs='',ws=[],maxBH=0,x=0,i;
  function geo(it){var k=it.k||'jug',h=it.h||(k==='glass'?.42:k==='can'?.8:1),bw=it.bw||(k==='glass'?70:k==='can'?150:118),bh=Math.round(250*h),n=it.n||1,
      num=(it.lab!==0&&it.max&&k!=='glass')||(k==='glass'&&it.lab),sw=num?Math.max(46,String(it.max).length*16+20):10,
      mk=(it.marks||[]).length&&!it.s2,lw=it.s2?Math.max(50,String(it.max*it.s2.f).length*16+22):mk?Math.max.apply(null,it.marks.map(function(q){return g2len(q[1])*14+34})):10,
      cw=n>1?bw:lw+bw+sw,gap=n>1?12:0,w=n>1?n*bw+(n-1)*gap+8:cw,tw=it.t?g2len(it.t)*15+20:0;
    return {k:k,bw:bw,bh:bh,n:n,num:num,sw:sw,lw:lw,w:Math.max(w,tw),inner:w,gap:gap}}
  items.forEach(function(it){if(typeof it==='string'){ws.push({op:it,w:Math.max(56,it.length*22+18)})}else{var g=geo(it);ws.push(g);maxBH=Math.max(maxBH,g.bh)}});
  var topPad=30;
  var B=topPad+maxBH,H=B+(items.some(function(it){return it&&it.t})?62:22);
  defs+='<linearGradient id="'+uid+'gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".18" stop-color="#fff" stop-opacity=".55"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/></linearGradient>';
  ws.forEach(function(g,idx){var it=items[idx];
    if(g.op){o+='<text x="'+(x+g.w/2)+'" y="'+(B-Math.min(70,maxBH*.32))+'" text-anchor="middle" font-size="40" font-weight="700" fill="#9aa1ad" '+G2F+'>'+esc(g.op)+'</text>';x+=g.w;return}
    var cnt=g.n,bx0=x+(g.w-g.inner)/2;
    for(var r=0;r<cnt;r++){
      var bx=(cnt>1?bx0+4+r*(g.bw+g.gap):bx0+g.lw),bw=g.bw,bh=g.bh,top=B-bh,k=g.k,mx=it.max||10,fr=.86,cid=uid+'c'+idx+'_'+r;
      var Y=function(val){return B-6-(bh-6)*fr*val/mx};
      var body;
      if(k==='glass')body='M'+bx+' '+top+'L'+(bx+bw*.08)+' '+B+'H'+(bx+bw*.92)+'L'+(bx+bw)+' '+top;
      else if(k==='can')body='M'+bx+' '+(top+30)+'Q'+bx+' '+(top+14)+' '+(bx+16)+' '+(top+14)+'H'+(bx+bw-40)+'V'+top+'H'+(bx+bw-10)+'V'+(top+14)+'Q'+(bx+bw)+' '+(top+14)+' '+(bx+bw)+' '+(top+30)+'V'+(B-10)+'Q'+(bx+bw)+' '+B+' '+(bx+bw-10)+' '+B+'H'+(bx+10)+'Q'+bx+' '+B+' '+bx+' '+(B-10)+'Z';
      else body='M'+(bx-12)+' '+(top-10)+'Q'+(bx-2)+' '+(top-6)+' '+bx+' '+(top+10)+'V'+(B-12)+'Q'+bx+' '+B+' '+(bx+12)+' '+B+'H'+(bx+bw-12)+'Q'+(bx+bw)+' '+B+' '+(bx+bw)+' '+(B-12)+'V'+top;
      var clip=k==='jug'?'M'+bx+' '+(top+10)+'V'+(B-12)+'Q'+bx+' '+B+' '+(bx+12)+' '+B+'H'+(bx+bw-12)+'Q'+(bx+bw)+' '+B+' '+(bx+bw)+' '+(B-12)+'V'+top+'H'+bx+'Z':k==='glass'?body+'Z':body;
      defs+='<clipPath id="'+cid+'"><path d="'+clip+'"/></clipPath>';
      o+='<path d="'+(k==='jug'?clip:k==='glass'?body+'Z':body)+'" fill="#F6F9FE"/>';
      /* Füllung */
      var segs=it.segs||(it.lv?[[0,it.lv,it.c===undefined?0:it.c]]:[]);
      o+='<g clip-path="url(#'+cid+')">';
      segs.forEach(function(s,si){var y1=Y(s[1]),y0=s[0]<=0?B+2:Y(s[0]),col=g2c(s[2],DC[0]);
        o+='<rect x="'+(bx-14)+'" y="'+y1.toFixed(1)+'" width="'+(bw+28)+'" height="'+(y0-y1).toFixed(1)+'" fill="'+g2lite(col,.35)+'"/><rect x="'+(bx-14)+'" y="'+y1.toFixed(1)+'" width="'+(bw+28)+'" height="5" fill="'+col+'" opacity=".55"/>';
        if(si>0&&segs[si-1][1]===s[0])o+='<line x1="'+(bx-14)+'" x2="'+(bx+bw+14)+'" y1="'+y0.toFixed(1)+'" y2="'+y0.toFixed(1)+'" stroke="#fff" stroke-width="3"/>';
        if(s[3]&&y0-y1>=30)o+='<text x="'+(bx+bw*.42)+'" y="'+((y0+y1)/2+9).toFixed(1)+'" text-anchor="middle" font-size="'+Math.min(26,(y0-y1)*.7).toFixed(0)+'" font-weight="800" fill="'+(s[2]===7?'#374151':'#fff')+'" '+G2F+' paint-order="stroke" stroke="'+col+'" stroke-width="'+(s[2]===7?0:3)+'">'+esc(s[3])+'</text>'});
      o+='<rect x="'+(bx-14)+'" y="'+(top-12)+'" width="'+(bw+28)+'" height="'+(bh+14)+'" fill="url(#'+uid+'gl)"/></g>';
      /* Skala */
      if(it.max&&it.lab!==0&&(k!=='glass'||it.lab)){var st=it.step||1,lb=it.lab||st,lbs=Math.min(24,(bh-6)*fr*lb/mx*.92);
        for(var q=0;q<=mx+1e-9;q+=st){var qq=Math.round(q*1000)/1000,yy=Y(qq),big=Math.abs(qq/lb-Math.round(qq/lb))<1e-6;if(qq===0)continue;
          o+='<line x1="'+(bx+bw-(big?30:18))+'" x2="'+(bx+bw-2)+'" y1="'+yy.toFixed(1)+'" y2="'+yy.toFixed(1)+'" stroke="#3B4556" stroke-width="'+(big?3:1.8)+'" stroke-linecap="round"/>';
          if(big&&g.num)o+='<text x="'+(bx+bw+8)+'" y="'+(yy+Math.min(8,lbs*.36)).toFixed(1)+'" font-size="'+lbs.toFixed(0)+'" font-weight="800" fill="'+g2c(it.sc,'#1F2937')+'" '+G2F+'>'+String(qq).replace('.',',')+'</text>';
          if(it.s2&&big){var v2=Math.round(qq*it.s2.f*100)/100;o+='<line x1="'+(bx+2)+'" x2="'+(bx+(big?30:18))+'" y1="'+yy.toFixed(1)+'" y2="'+yy.toFixed(1)+'" stroke="#3B4556" stroke-width="3" stroke-linecap="round"/><text x="'+(bx-8)+'" y="'+(yy+8).toFixed(1)+'" text-anchor="end" font-size="24" font-weight="800" fill="'+g2c(it.s2.c,'#1F2937')+'" '+G2F+'>'+String(v2).replace('.',',')+'</text>'}}
        if(it.u&&g.num)o+='<text x="'+(bx+bw+8)+'" y="'+(Y(mx)-26).toFixed(1)+'" font-size="22" font-weight="800" fill="'+g2c(it.sc,'#6B7280')+'" '+G2F+'>'+esc(it.u)+'</text>';
        if(it.s2&&it.s2.u)o+='<text x="'+(bx-8)+'" y="'+(Y(mx)-26).toFixed(1)+'" text-anchor="end" font-size="22" font-weight="800" fill="'+g2c(it.s2.c,'#6B7280')+'" '+G2F+'>'+esc(it.s2.u)+'</text>'}
      /* Marken links */
      if(!it.s2)(it.marks||[]).forEach(function(m){var yy=Y(m[0]),col=g2c(m[2],'#1F2937');o+='<path d="M'+(bx-4)+' '+yy.toFixed(1)+'l-14 -9v18z" fill="'+col+'"/><line x1="'+bx+'" x2="'+(bx+bw*.55)+'" y1="'+yy.toFixed(1)+'" y2="'+yy.toFixed(1)+'" stroke="'+col+'" stroke-width="3" stroke-dasharray="6 5"/><text x="'+(bx-22)+'" y="'+(yy+8).toFixed(1)+'" text-anchor="end" font-size="24" font-weight="800" fill="'+col+'" '+G2F+'>'+g2tx(m[1])+'</text>'});
      /* Umriss */
      o+='<path d="'+body+'" fill="none" stroke="#5F6B7A" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>';
      if(k==='can')o+='<rect x="'+(bx+bw-40)+'" y="'+(top-8)+'" width="30" height="10" rx="3" fill="#5F6B7A"/><path d="M'+(bx+24)+' '+(top+14)+'V'+(top-4)+'H'+(bx+bw-58)+'V'+(top+14)+'" fill="none" stroke="#5F6B7A" stroke-width="7" stroke-linejoin="round"/>';
    }
    if(it.t)o+='<text x="'+(x+g.w/2)+'" y="'+(B+44)+'" text-anchor="middle" font-size="28" font-weight="800" fill="'+g2c(it.tc,'#1F2937')+'" '+G2F+'>'+g2tx(it.t)+'</text>';
    x+=g.w+14;
  });
  var W=Math.max(120,x-14);
  return g2fig(W,H,'<defs>'+defs+'</defs>'+o,v,v.cap||'Messbecher',Math.min(600,W*(ws.length===1?.8:.62)));
};

/* Balkenwaage: {"type":"balwaage","l":[["1 kg",2]],"r":[["100 g",0,10]],"tilt":0,"cap":"…"}
   Stück: [Text, Farbe, Anzahl, Art]  Art: "e" = Gegenstand (Text ist ein Emoji), "q" = fehlt noch (gestrichelt). Unter jeder Schale steht die Beschriftung. */
VEXT.balwaage=function(v){
  var t=v.tilt||0,dy=t*16,o='',W=600,PX=[150,450],BY=70,PY=[BY+118-dy,BY+118+dy];
  o+='<rect x="262" y="276" width="76" height="12" rx="6" fill="#9AA3B2"/><path d="M300 278V'+(BY+4)+'" stroke="#7B8494" stroke-width="10" stroke-linecap="round"/>';
  o+='<path d="M'+(PX[0])+' '+(BY-dy)+'L'+(PX[1])+' '+(BY+dy)+'" stroke="#3B4556" stroke-width="9" stroke-linecap="round"/><circle cx="300" cy="'+BY+'" r="10" fill="#3B4556"/><path d="M291 '+(BY-30)+'h18l-9 22z" fill="'+(t?'#F29900':'#34A853')+'"/>';
  function pan(side,list){var px=PX[side],py=PY[side],by=BY+(side?dy:-dy),s='',lab=[],n=0;
    s+='<path d="M'+px+' '+by+'L'+(px-104)+' '+py+'M'+px+' '+by+'L'+(px+104)+' '+py+'" stroke="#9AA3B2" stroke-width="2.5"/><circle cx="'+px+'" cy="'+by+'" r="5" fill="#3B4556"/>';
    list.forEach(function(q){n+=(q[3]==='e'?1:(q[2]||1))});
    var pieces=[];list.forEach(function(q){var c=q[2]||1;for(var i=0;i<(q[3]==='e'?1:c);i++)pieces.push(q)});
    var rows=pieces.length>4?2:1,per=Math.ceil(pieces.length/rows),pw=Math.min(pieces.length<=2?98:76,Math.floor(196/per)-4),ph=rows>1?Math.min(40,pw*.7):Math.min(pieces.length<=2?62:54,pw*.8),k=0;
    for(var rr=0;rr<rows;rr++){var rowP=pieces.slice(rr*per,(rr+1)*per),tw=rowP.reduce(function(a,q){return a+(q[3]==='e'?62:pw)+4},-4),xx=px-tw/2,yb=py-4-rr*(ph+6);
      rowP.forEach(function(q){var col=g2c(q[1],DC[7]);
        if(q[3]==='e'){s+='<text x="'+(xx+31)+'" y="'+(yb-4)+'" text-anchor="middle" font-size="66">'+esc(q[0])+'</text>';xx+=66;return}
        var big=pieces.length<=2&&pw>=60,fill=q[3]==='q'?'#fff':col;
        s+='<path d="M'+(xx+pw*.12)+' '+(yb-ph)+'H'+(xx+pw*.88)+'L'+(xx+pw)+' '+yb+'H'+xx+'Z" fill="'+fill+'" stroke="'+(q[3]==='q'?col:'rgba(0,0,0,.25)')+'" stroke-width="'+(q[3]==='q'?3:1.5)+'" stroke-linejoin="round"'+(q[3]==='q'?' stroke-dasharray="7 5"':'')+'/>';
        if(q[3]!=='q')s+='<rect x="'+(xx+pw*.36)+'" y="'+(yb-ph-7)+'" width="'+(pw*.28)+'" height="9" rx="4" fill="'+col+'"/><path d="M'+(xx+pw*.16)+' '+(yb-ph+4)+'H'+(xx+pw*.84)+'" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>';
        if(big&&String(q[0]).length<=5)s+='<text x="'+(xx+pw/2)+'" y="'+(yb-ph/2+8)+'" text-anchor="middle" font-size="'+Math.min(26,(pw*.8)/(String(q[0]).length*.6)).toFixed(0)+'" font-weight="800" fill="'+(q[3]==='q'?col:'#fff')+'" '+G2F+'>'+esc(q[0])+'</text>';
        xx+=pw+4})}
    s+='<path d="M'+(px-108)+' '+py+'H'+(px+108)+'Q'+(px+100)+' '+(py+18)+' '+(px+80)+' '+(py+20)+'H'+(px-80)+'Q'+(px-100)+' '+(py+18)+' '+(px-108)+' '+py+'Z" fill="#CBD3DF" stroke="#7B8494" stroke-width="2.5"/>';
    /* Beschriftung */
    var parts=list.filter(function(q){return q[3]!=='e'||q[4]}).map(function(q){var c=q[2]||1,tx=q[3]==='e'?q[4]:((c>1?c+' × ':'')+q[0]);return [tx,q[1]]});
    var line=parts.map(function(p){return '{'+((p[1]===undefined?7:p[1])|0)+'|'+p[0]+'}'}).join(' + ');
    if(parts.length)s+='<text x="'+px+'" y="'+(BY+188)+'" text-anchor="middle" font-size="'+(g2len(line)>16?24:27)+'" font-weight="800" fill="#1F2937" '+G2F+'>'+g2tx(line.replace(/\{7\|/g,'{7|'))+'</text>';
    return s}
  o+=pan(0,v.l||[])+pan(1,v.r||[]);
  return g2fig(W,296,o,v,v.cap||'Balkenwaage',600);
};

/* Plattformwaage mit Anzeige: {"type":"pwaage","items":[{"o":"🍫","d":"100 g","c":0,"t":"Schokolade","tc":7}],"cap":"…"}
   o: Emoji-Text oder Liste [[Emoji, Etikett, Farbe], …] (Etikett klein über dem Gegenstand). */
VEXT.pwaage=function(v){
  var it=v.items||[v],n=it.length,need=function(q){var ob=Array.isArray(q.o)?q.o:[[q.o]],tw=Math.max.apply(null,ob.map(function(e){return e[1]?g2len(e[1])*13+24:0}).concat([0]));return Math.max(260,ob.length*Math.max(62,tw)+40)},uw=n===1?need(it[0]):Math.min(300,600/n),W=uw*n,o='',hasTag=it.some(function(q){return Array.isArray(q.o)}),hasT=it.some(function(q){return q.t}),top=hasTag?42:8,PY=top+78,H=PY+112+(hasT?40:6);
  it.forEach(function(q,i){var cx=uw*i+uw/2,w=uw-(n>2?12:28),col=g2c(q.c,'#1F2937'),ob=Array.isArray(q.o)?q.o:[[q.o]],es=ob.length>2?44:ob.length>1?50:(n>2?54:60),tgw=Math.max.apply(null,ob.map(function(e){return e[1]?g2len(e[1])*13+24:0}).concat([0])),gap=Math.max(es*1.08,tgw),x0=cx-gap*(ob.length-1)/2;
    ob.forEach(function(e,k){var ex=x0+k*gap;o+='<text x="'+ex.toFixed(1)+'" y="'+(PY-8)+'" text-anchor="middle" font-size="'+es+'">'+esc(e[0])+'</text>';
      if(e[1]){var tw=g2len(e[1])*13+18;o+='<rect x="'+(ex-tw/2).toFixed(1)+'" y="'+(top-34)+'" width="'+tw+'" height="30" rx="15" fill="#fff" stroke="'+g2c(e[2])+'" stroke-width="2.5"/><text x="'+ex.toFixed(1)+'" y="'+(top-12)+'" text-anchor="middle" font-size="20" font-weight="800" fill="'+g2c(e[2])+'" '+G2F+'>'+esc(e[1])+'</text>'}});
    o+='<rect x="'+(cx-w/2)+'" y="'+PY+'" width="'+w+'" height="14" rx="7" fill="#C4CDDA" stroke="#8E98A8" stroke-width="2"/><rect x="'+(cx-14)+'" y="'+(PY+14)+'" width="28" height="12" fill="#8E98A8"/>';
    o+='<rect x="'+(cx-w/2+8)+'" y="'+(PY+26)+'" width="'+(w-16)+'" height="78" rx="16" fill="#EEF2F7" stroke="#8E98A8" stroke-width="2.5"/>';
    var dw=Math.min(w-(n>2?16:44),Math.max(110,g2len(q.d)*19+30));o+='<rect x="'+(cx-dw/2)+'" y="'+(PY+40)+'" width="'+dw+'" height="50" rx="10" fill="#fff" stroke="'+col+'" stroke-width="3.5"/><text x="'+cx+'" y="'+(PY+76)+'" text-anchor="middle" font-size="'+Math.min(34,(dw-10)/(g2len(q.d)*.6)).toFixed(0)+'" font-weight="900" fill="'+col+'" '+G2F+'>'+g2tx(q.d)+'</text>';
    if(q.t)o+='<text x="'+cx+'" y="'+(PY+138)+'" text-anchor="middle" font-size="'+(g2len(q.t)*15>uw?22:26)+'" font-weight="800" fill="'+g2c(q.tc,'#1F2937')+'" '+G2F+'>'+g2tx(q.t)+'</text>'});
  return g2fig(W,H,o,v,v.cap||'Waage',Math.min(600,W*(n===1?.8:1)));
};

/* Bruchstreifen: {"type":"bstr","top":"20","rows":[{"n":4,"k":3,"c":0,"t":"{0|3}/{3|4}","in":"5"}],"cap":"…"}
   n Teile, k gefärbt (Farbe c), t = Bruch links, in = Text in jedem Teil (oder Liste), top = Klammer mit dem Ganzen über dem ersten Streifen. */
VEXT.bstr=function(v){
  var rows=v.rows||[],hasT=rows.some(function(r){return r.t}),x0=hasT?118:8,x1=592,y=v.top?62:14,o='',RH=v.rh||56;
  function frac(cx,cy,s){var m=/^(\{([0-7])\|([^{}]+)\}|[^\/{}]+)\/(\{([0-7])\|([^{}]+)\}|[^\/{} ]+)(.*)$/.exec(s);if(!m)return '<text x="'+cx+'" y="'+(cy+9)+'" text-anchor="middle" font-size="28" font-weight="800" fill="#1F2937" '+G2F+'>'+g2tx(s)+'</text>';
    var zc=m[2]!==undefined?DC[+m[2]]:'#1F2937',z=m[3]!==undefined?m[3]:m[1],nc=m[5]!==undefined?DC[+m[5]]:'#1F2937',nn=m[6]!==undefined?m[6]:m[4],w=Math.max(String(z).length,String(nn).length)*21+12,rest=m[7]||'';
    var ox=rest?cx-g2len(rest)*7:cx;
    return '<text x="'+ox+'" y="'+(cy-7)+'" text-anchor="middle" font-size="34" font-weight="900" fill="'+zc+'" '+G2F+'>'+esc(z)+'</text><line x1="'+(ox-w/2)+'" x2="'+(ox+w/2)+'" y1="'+cy+'" y2="'+cy+'" stroke="#1F2937" stroke-width="3.5" stroke-linecap="round"/><text x="'+ox+'" y="'+(cy+33)+'" text-anchor="middle" font-size="34" font-weight="900" fill="'+nc+'" '+G2F+'>'+esc(nn)+'</text>'+(rest?'<text x="'+(ox+w/2+6)+'" y="'+(cy+9)+'" font-size="24" font-weight="800" fill="#1F2937" '+G2F+'>'+g2tx(rest)+'</text>':'')}
  if(v.top){o+='<path d="M'+(x0+2)+' 52Q'+(x0+2)+' 36 '+(x0+18)+' 36H'+((x0+x1)/2-14)+'Q'+((x0+x1)/2)+' 36 '+((x0+x1)/2)+' 22Q'+((x0+x1)/2)+' 36 '+((x0+x1)/2+14)+' 36H'+(x1-18)+'Q'+(x1-2)+' 36 '+(x1-2)+' 52" fill="none" stroke="'+g2c(v.topc,'#4B5563')+'" stroke-width="3" stroke-linecap="round"/><text x="'+((x0+x1)/2)+'" y="16" text-anchor="middle" font-size="26" font-weight="900" fill="'+g2c(v.topc,'#1F2937')+'" '+G2F+'>'+g2tx(v.top)+'</text>';y=62}
  rows.forEach(function(r){var n=r.n,k=r.k||0,w=(x1-x0)/n,col=g2c(r.c,DC[0]),i;
    if(r.t)o+=frac(x0/2,y+RH/2,r.t);
    for(i=0;i<n;i++){var f=i<k,xx=x0+i*w;o+='<rect x="'+(xx+1.5).toFixed(1)+'" y="'+y+'" width="'+(w-3).toFixed(1)+'" height="'+RH+'" rx="'+Math.min(10,w/4).toFixed(1)+'" fill="'+(f?col:'#EEF1F6')+'" stroke="'+(f?col:'#C9D1DD')+'" stroke-width="2"/>';
      if(f)o+='<rect x="'+(xx+1.5).toFixed(1)+'" y="'+y+'" width="'+(w-3).toFixed(1)+'" height="'+(RH*.32).toFixed(1)+'" rx="'+Math.min(10,w/4).toFixed(1)+'" fill="#fff" opacity=".16"/>';
      var tx=Array.isArray(r['in'])?r['in'][i]:r['in'];if(tx!==undefined&&tx!==''&&w>18){var fs=Math.min(26,(w-6)/(String(tx).length*.62+.2));o+='<text x="'+(xx+w/2).toFixed(1)+'" y="'+(y+RH/2+fs*.36).toFixed(1)+'" text-anchor="middle" font-size="'+fs.toFixed(1)+'" font-weight="800" fill="'+(f?'#fff':'#4B5563')+'" '+G2F+'>'+esc(tx)+'</text>'}}
    y+=RH+(r.t?34:16)});
  return g2fig(600,y-8,o,v,v.cap||'Bruchstreifen',600);
};

/* Säulendiagramm mit festen Farben: {"type":"saeulen","items":[["unter 500 m",4,2],…],"unit":"Kinder"} */
VEXT.saeulen=function(v){
  var n=v.items.length,bw=Math.min(100,480/n),gap=(600-n*bw)/(n+1),s='',top=Math.ceil(Math.max.apply(null,v.items.map(function(q){return q[1]}))/2)*2,k;
  for(k=0;k<=top;k+=2)s+='<line x1="20" x2="590" y1="'+(170-k*140/top)+'" y2="'+(170-k*140/top)+'" stroke="#E8EAED" stroke-width="2"/>';
  v.items.forEach(function(q,i){var h=q[1]*140/top,x=gap*(i+1)+bw*i+5,col=g2c(q[2],DC[i%8]);
    s+='<rect x="'+x.toFixed(1)+'" y="'+(170-h).toFixed(1)+'" width="'+bw+'" height="'+h.toFixed(1)+'" rx="8" fill="'+col+'"/><text x="'+(x+bw/2).toFixed(1)+'" y="'+(160-h).toFixed(1)+'" text-anchor="middle" font-size="30" font-weight="800" fill="'+col+'" '+G2F+'>'+q[1]+'</text>';
    var w=String(q[0]).split(' '),l1=w.slice(0,Math.ceil(w.length/2)).join(' '),l2=w.slice(Math.ceil(w.length/2)).join(' ');
    s+='<text x="'+(x+bw/2).toFixed(1)+'" y="198" text-anchor="middle" font-size="22" font-weight="700" fill="#3c4043" '+G2F+'>'+esc(l1)+'</text><text x="'+(x+bw/2).toFixed(1)+'" y="222" text-anchor="middle" font-size="22" font-weight="700" fill="#3c4043" '+G2F+'>'+esc(l2)+'</text>'});
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 610 230" width="100%" role="img" aria-label="Säulendiagramm">'+s+'</svg>'+(v.unit?'<figcaption>Anzahl '+esc(v.unit)+'</figcaption>':'')+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};

/* Malreihe wie «mreihe», aber mit fester Farbe c (vermeidet Rot bei 9er- und 25er-Reihe) */
VEXT.mreihe2=function(v){
  var n=v.n,up=v.upto||10,core=v.core||[],o='',col=g2c(v.c===undefined?0:v.c),half=Math.ceil(up/2),i;
  for(i=1;i<=up;i++){var cI=i>half?1:0,rI=cI?i-half-1:i-1,x=6+cI*296,y=6+rI*54,k=core.indexOf(i)>=0;
    o+='<rect x="'+x+'" y="'+y+'" width="288" height="46" rx="14" fill="'+(k?'#EAF6EC':'#F5F7FB')+'" stroke="'+(k?'#34A853':'#E0E5EF')+'" stroke-width="'+(k?2.4:1.5)+'"/>'+
     '<circle cx="'+(x+25)+'" cy="'+(y+23)+'" r="14" fill="'+col+'"/>'+_t(x+25,y+29,15,i,'#fff','middle',800)+
     _t(x+52,y+31,23,'× '+n,'#2B3350','start',700)+_t(x+150,y+31,23,'=','#9AA3B2','middle',700)+_t(x+272,y+31,28,n*i,col,'end',800)}
  var H=6+half*54;
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+H+'" width="100%" style="display:block;max-width:600px;margin:0 auto" role="img" aria-label="'+n+'er-Reihe">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};

/* Stellenwerttafel: {"type":"stafel","cols":["HT","ZT","T","H","Z","E"],"cc":[6,5,2,4,0,7],"rows":[["3","4","5","6","7","8"]],"lab":["345'678"],"cap":"…"}
   Ziffer "" = leeres Feld; Ziffer als {Farbe|x} möglich. Kopf in der Farbe der Stelle, Ziffern in derselben Farbe. */
VEXT.stafel=function(v){
  var cols=v.cols||['HT','ZT','T','H','Z','E'],cc=v.cc||[6,5,2,4,0,7],n=cols.length,rows=v.rows||[],hasL=(v.lab||[]).length,x0=hasL?150:8,cw=(592-x0)/n,o='',y=8,RH=84;
  cols.forEach(function(c,i){var col=g2c(cc[i]),x=x0+i*cw;o+='<rect x="'+(x+3).toFixed(1)+'" y="'+y+'" width="'+(cw-6).toFixed(1)+'" height="52" rx="12" fill="'+col+'"/><text x="'+(x+cw/2).toFixed(1)+'" y="'+(y+36)+'" text-anchor="middle" font-size="'+(c.length>2?26:30)+'" font-weight="900" fill="#fff" '+G2F+'>'+esc(c)+'</text>'});
  y+=60;
  rows.forEach(function(r,ri){
    if(hasL&&v.lab[ri])o+='<text x="'+(x0-14)+'" y="'+(y+RH/2+10)+'" text-anchor="end" font-size="28" font-weight="800" fill="#1F2937" '+G2F+'>'+g2tx(v.lab[ri])+'</text>';
    r.forEach(function(d,i){var col=g2c(cc[i]),x=x0+i*cw,m=/^\{([0-7])\|(.*)\}$/.exec(String(d)),tx=m?m[2]:String(d),tc=m?g2c(+m[1]):col;
      o+='<rect x="'+(x+3).toFixed(1)+'" y="'+y+'" width="'+(cw-6).toFixed(1)+'" height="'+RH+'" rx="12" fill="'+g2lite(col,.9)+'" stroke="'+g2lite(col,.55)+'" stroke-width="2"/>';
      if(tx!=='')o+='<text x="'+(x+cw/2).toFixed(1)+'" y="'+(y+RH/2+19)+'" text-anchor="middle" font-size="'+Math.min(56,(cw-10)/(tx.length*.62)).toFixed(0)+'" font-weight="900" fill="'+tc+'" '+G2F+'>'+esc(tx)+'</text>'});
    y+=RH+8});
  return g2fig(600,y,o,v,v.cap||'Stellenwerttafel',600);
};

/* Quader wie «quader», aber Massfarben wählbar (lc, bc, hc als Farbindex; Standard: Länge blau 0, Breite grün 2, Höhe orange 3 – kein Rot) */
VEXT.quader2=function(v){
  var s=vQuader(v);
  return s.split('#137333').join(g2c(v.lc===undefined?0:v.lc)).split('#B06000').join(g2c(v.bc===undefined?2:v.bc)).split('#B3261E').join(g2c(v.hc===undefined?3:v.hc));
};
})();

/* ===== Erweiterung vis_b.js (v5.60, gekapselt) ===== */
(function(){
/* ---------- Agent b: Einführungsszenen für Deutsch-Themen (VEXT.bscene) ----------
   {"type":"bscene","kind":"line|train|podium|roof|build|probe", ...}
   Farben über dcol(0–7), damit Text, Grafik und Deutsch-Farbmodus übereinstimmen. */
VEXT.bscene=function(v){
  var k=v.kind,o='',F='font-family="Arial,Helvetica,sans-serif" font-weight="800"',i;
  function tw(s,fs){return String(s).length*fs*.58}
  function tile(x,y,w,h,txt,c,fs){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="12" fill="#fff" stroke="'+c+'" stroke-width="3.5"/><text x="'+(x+w/2)+'" y="'+(y+h/2+fs*.36)+'" text-anchor="middle" font-size="'+fs+'" fill="'+c+'" '+F+'>'+esc(txt)+'</text>'}
  function face(cx,cy,r,col){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/><circle cx="'+(cx-r*.34)+'" cy="'+(cy-r*.15)+'" r="'+(r*.13)+'" fill="#202124"/><circle cx="'+(cx+r*.34)+'" cy="'+(cy-r*.15)+'" r="'+(r*.13)+'" fill="#202124"/><path d="M'+(cx-r*.36)+' '+(cy+r*.28)+'q'+(r*.36)+' '+(r*.32)+' '+(r*.72)+' 0" stroke="#202124" stroke-width="'+(r*.11)+'" fill="none" stroke-linecap="round"/>'}
  function tag(cx,y,txt,c,fs){var w=tw(txt,fs)+26;return '<rect x="'+(cx-w/2)+'" y="'+y+'" width="'+w+'" height="'+(fs+16)+'" rx="'+((fs+16)/2)+'" fill="#fff" stroke="'+c+'" stroke-width="2.5"/><text x="'+cx+'" y="'+(y+fs+4)+'" text-anchor="middle" font-size="'+fs+'" fill="'+c+'" '+F+'>'+esc(txt)+'</text>'}
  if(k==='line'){ /* Heftzeile: Wort am Zeilenende getrennt */
    var L=v.l1||'Die Katze schläft auf dem Fens',L2=v.l2||'terbrett in der Sonne.',c1=dcol(v.c===undefined?1:v.c);
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect x="34" y="16" width="532" height="200" rx="10" fill="#fff" stroke="#D5DCE8" stroke-width="2"/>';
    [78,132,186].forEach(function(y){o+='<line x1="50" x2="550" y1="'+y+'" y2="'+y+'" stroke="#CFE0FA" stroke-width="2"/>'});
    o+='<line x1="488" x2="488" y1="26" y2="206" stroke="#9AA3B5" stroke-width="2" stroke-dasharray="6 5"/><text x="524" y="40" text-anchor="middle" font-size="12" fill="#6B7280" '+F+'>Rand</text>';
    o+='<text x="462" y="70" text-anchor="end" font-size="24" fill="#2B3350" '+F+'>'+esc(L)+'</text>';
    o+='<g class="sc-pop"><rect x="463" y="49" width="20" height="28" rx="5" fill="'+c1+'" fill-opacity=".14"/><text x="473" y="70" text-anchor="middle" font-size="26" fill="'+c1+'" '+F+'>-</text></g>';
    o+='<text x="62" y="124" font-size="24" fill="#2B3350" '+F+'>'+esc(L2)+'</text>';
    o+='<g class="bsc-pen"><path d="M330 168l92-58 12 18-92 58-18 4z" fill="#FBBC04" stroke="#B06000" stroke-width="2" stroke-linejoin="round"/><path d="M330 168l-6 4 2-12z" fill="#3C4043"/><path d="M422 110l12 18 8-5-12-18z" fill="#F28B82" stroke="#B06000" stroke-width="2"/></g>';
    if(v.say)o+=tag(190,160,v.say,c1,17);
  }else if(k==='train'){ /* Zug: Wagen 1 und 3 tauschen, Wagen 2 (Verb) bleibt */
    var w=v.wagons||[['der Hund',0],['bellt',1],['im Garten',5]],X=[112,272,432],WW=152,Y=144,H=64;
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="220" width="600" height="10" fill="#CFE8C8"/><line x1="0" x2="600" y1="220" y2="220" stroke="#8D6E63" stroke-width="4"/>';
    o+='<g><rect x="10" y="138" width="90" height="70" rx="10" fill="#5F6B7A"/><rect x="18" y="106" width="42" height="36" rx="6" fill="#5F6B7A"/><rect x="25" y="113" width="28" height="18" rx="3" fill="#D2E3FC"/><rect x="72" y="114" width="16" height="26" rx="3" fill="#3C4043"/><circle cx="32" cy="212" r="8" fill="#3C4043"/><circle cx="80" cy="212" r="8" fill="#3C4043"/></g>';
    o+='<g class="bsc-steam"><circle cx="80" cy="100" r="8" fill="#fff" stroke="#C5CCD6" stroke-width="2"/><circle cx="92" cy="84" r="11" fill="#fff" stroke="#C5CCD6" stroke-width="2"/></g>';
    o+='<line x1="100" x2="'+(X[2]+WW)+'" y1="196" y2="196" stroke="#5F6B7A" stroke-width="4"/>';
    w.forEach(function(p,j){var c=dcol(p[1]),cl=j===0?'bsc-swA':j===2?'bsc-swC':'';
      o+='<g'+(cl?' class="'+cl+'"':'')+'>'+tile(X[j],Y,WW,H,p[0],c,25)+'<circle cx="'+(X[j]+32)+'" cy="'+(Y+H+4)+'" r="8" fill="#3C4043"/><circle cx="'+(X[j]+WW-32)+'" cy="'+(Y+H+4)+'" r="8" fill="#3C4043"/></g>'});
  }else if(k==='podium'){ /* Treppchen: Grundform, Vergleichsform, Höchstform */
    var s=v.steps||[['schnell',5],['schneller',1],['am schnellsten',4]],hs=[56,96,136],x0=[48,218,388],SW=164;
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="214" width="600" height="16" fill="#E3E9F5"/>';
    s.forEach(function(p,j){var c=dcol(p[1]),top=214-hs[j],fs=String(p[0]).length>11?19:22;
      o+='<rect x="'+x0[j]+'" y="'+top+'" width="'+SW+'" height="'+hs[j]+'" rx="10" fill="#fff" stroke="'+c+'" stroke-width="3.5"/>';
      o+='<text x="'+(x0[j]+SW/2)+'" y="'+(top+Math.min(hs[j]/2,40)+fs*.36)+'" text-anchor="middle" font-size="'+fs+'" fill="'+c+'" '+F+'>'+esc(p[0])+'</text>';
      o+='<g class="bsc-bob" style="animation-delay:'+(j*.45)+'s">'+face(x0[j]+SW/2,top-30,25,'#FBBC04')+'</g>'});
    o+='<g class="sc-pop"><path d="M'+(x0[2]+SW-26)+' 40l5 10 11 1.6-8 7.8 1.9 11-9.9-5.2-9.9 5.2 1.9-11-8-7.8 11-1.6z" fill="#FBBC04" stroke="#E37400" stroke-width="2" stroke-linejoin="round"/></g>';
  }else if(k==='roof'){ /* Katze: auf dem Dach (Wo?) → auf den Baum (Wohin?) */
    var cD=dcol(v.c1===undefined?1:v.c1),cA=dcol(v.c2===undefined?4:v.c2);
    o+='<rect width="600" height="230" fill="#EAF3FF"/><rect y="200" width="600" height="30" fill="#CFE8C8"/>';
    o+='<rect x="64" y="120" width="164" height="84" fill="#F6E3C6" stroke="#8D6E63" stroke-width="3"/><path d="M48 122L146 58L244 122Z" fill="#E8A87C" stroke="#8D6E63" stroke-width="3" stroke-linejoin="round"/><rect x="132" y="156" width="28" height="48" fill="#8D6E63"/><rect x="82" y="138" width="30" height="24" fill="#D2E3FC" stroke="#8D6E63" stroke-width="2"/><rect x="180" y="138" width="30" height="24" fill="#D2E3FC" stroke="#8D6E63" stroke-width="2"/>';
    o+='<rect x="482" y="128" width="20" height="76" fill="#8D6E63"/><circle cx="492" cy="104" r="50" fill="#81C995"/><circle cx="462" cy="122" r="26" fill="#6CBF84"/><circle cx="522" cy="120" r="24" fill="#6CBF84"/>';
    o+='<path d="M168 52Q320 10 470 58" fill="none" stroke="'+cA+'" stroke-width="3" stroke-dasharray="8 7"/><path d="M470 58l-15-2 8-10z" fill="'+cA+'"/>';
    o+='<g class="bsc-cat"><ellipse cx="146" cy="46" rx="18" ry="13" fill="#5F6B7A"/><circle cx="133" cy="32" r="10" fill="#5F6B7A"/><path d="M125 26l1-11 7 7zM136 22l5-9 3 10z" fill="#5F6B7A"/><path d="M162 44q16-4 12-20" stroke="#5F6B7A" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="130" cy="31" r="1.8" fill="#fff"/><circle cx="136" cy="31" r="1.8" fill="#fff"/></g>';
    o+=tag(146,166,'Wo? auf dem Dach',cD,15)+tag(338,160,'Wohin? auf den Baum',cA,15);
  }else if(k==='build'){ /* Wortbausteine: Stamm oben, Ableitungen unten */
    var top=v.top||[['Freund',6]],rows=v.rows||[[['freund',6],['lich',2]],[['Freund',6],['schaft',0]],[['un',3],['freund',6],['lich',2]]],FS=22;
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="206" width="600" height="24" fill="#E3E9F5"/>';
    var tt=top.map(function(p){return p[0]}).join(''),tw0=tw(tt,26)+40;
    o+='<rect x="'+(300-tw0/2)+'" y="18" width="'+tw0+'" height="52" rx="12" fill="#fff" stroke="'+dcol(top[0][1])+'" stroke-width="3.5"/><text x="300" y="53" text-anchor="middle" font-size="26" fill="'+dcol(top[0][1])+'" '+F+'>'+esc(tt)+'</text>';
    var n=rows.length,cw=Math.min(180,540/n),xs=(600-n*cw)/2;
    rows.forEach(function(r,j){var cx=xs+j*cw+cw/2,word=r.map(function(p){return p[0]}).join(''),ww=Math.min(cw-12,tw(word,FS)+28);
      o+='<path d="M300 72L'+cx+' 128" stroke="#9AA3B5" stroke-width="2.5" fill="none"/><path d="M'+cx+' 132l-6-10h12z" fill="#9AA3B5"/>';
      o+='<g class="sc-cookie" style="animation-delay:'+(j*.5)+'s"><rect x="'+(cx-ww/2)+'" y="140" width="'+ww+'" height="52" rx="12" fill="#fff" stroke="#C5CCD6" stroke-width="2.5"/><text x="'+cx+'" y="175" text-anchor="middle" font-size="'+FS+'" '+F+'>'+r.map(function(p){return '<tspan fill="'+dcol(p[1])+'">'+esc(p[0])+'</tspan>'}).join('')+'</text></g>'});
  }else if(k==='probe'){ /* Satz mit das und dass, darunter die Ersatzprobe */
    var ws=v.words||[['Ich weiss,',7],['dass',4,'passt nichts'],['das',1,'dieses'],['Buch spannend ist.',7]],FS2=22,G=10,wd=ws.map(function(p){return tw(p[0],FS2)+22}),tot=wd.reduce(function(a,b){return a+b},0)+G*(ws.length-1),x=(600-tot)/2,nt=0;
    o+='<rect width="600" height="230" fill="#F3F6FC"/><rect y="214" width="600" height="16" fill="#E3E9F5"/>';
    ws.forEach(function(p,j){var c=dcol(p[1]);o+=tile(x,60,wd[j],52,p[0],c,FS2);
      if(p[2]){var ty=nt%2?170:130;nt++;o+='<g class="sc-cookie" style="animation-delay:'+(j*.6)+'s"><path d="M'+(x+wd[j]/2)+' 114V'+ty+'" stroke="'+c+'" stroke-width="2.5"/>'+tag(x+wd[j]/2,ty,p[2],c,16)+'</g>'}
      x+=wd[j]+G});
    if(v.say)o+=tag(300,8,v.say,dcol(7),17);
  }
  return '<figure class="vis scn" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||'Bild zum Thema')+'" style="border-radius:16px">'+o+'</svg>'+(v.cap?'<figcaption>'+capt(v.cap)+'</figcaption>':'')+'</figure>';
};
})();
