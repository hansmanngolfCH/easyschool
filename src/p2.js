
/* ---------- Bilder in den Aufgaben ---------- */
function vDots(v){var g='';for(var i=0;i<v.groups;i++)g+='<span class="grp">'+'<i class="dot"></i>'.repeat(v.size)+'</span>';
  return '<figure class="vis"><div class="dots">'+g+'</div><figcaption>'+v.groups+' Gruppen mit je '+v.size+': '+v.groups+' · '+v.size+' = '+(v.groups*v.size)+'</figcaption></figure>'}
function vPie(v){var r=46,cx=50,cy=50,p=v.parts,s='';
  for(var i=0;i<p;i++){var a0=-Math.PI/2+i*2*Math.PI/p,a1=-Math.PI/2+(i+1)*2*Math.PI/p;
    var d=p===1?'M'+(cx-r)+' '+cy+'a'+r+' '+r+' 0 1 0 '+(2*r)+' 0a'+r+' '+r+' 0 1 0 '+(-2*r)+' 0z':'M'+cx+' '+cy+'L'+(cx+r*Math.cos(a0)).toFixed(2)+' '+(cy+r*Math.sin(a0)).toFixed(2)+'A'+r+' '+r+' 0 0 1 '+(cx+r*Math.cos(a1)).toFixed(2)+' '+(cy+r*Math.sin(a1)).toFixed(2)+'Z';
    s+='<path d="'+d+'" class="'+(i<v.filled?'pf':'pe')+'"/>'}
  return '<figure class="vis pie"><svg viewBox="0 0 100 100" role="img" aria-label="'+v.filled+' von '+p+' Teilen gefärbt">'+s+'</svg>'+(v.nocap?'':'<figcaption>'+rt(v.filled+'/'+p)+'</figcaption>')+'</figure>'}
function vLine(v){var x0=24,x1=576,y=58,n=Math.round((v.max-v.min)/v.step);
  function X(i){return x0+(x1-x0)*i/n}
  var s='<line x1="'+(x0-8)+'" x2="'+(x1+8)+'" y1="'+y+'" y2="'+y+'" class="nl"/>';
  for(var i=0;i<=n;i++){s+='<line x1="'+X(i)+'" x2="'+X(i)+'" y1="'+(y-6)+'" y2="'+(y+6)+'" class="nl"/><text x="'+X(i)+'" y="'+(y+26)+'" text-anchor="middle" class="nt">'+(v.min+i*v.step)+'</text>';
    if(i<n){var xm=(X(i)+X(i+1))/2;s+='<path d="M'+X(i)+' '+(y-8)+'Q'+xm+' '+(y-40)+' '+X(i+1)+' '+(y-8)+'" class="hop"/>'}}
  return '<figure class="vis" style="width:100%"><div class="scroll" style="width:100%"><svg viewBox="0 0 600 90" class="nlsvg" role="img" aria-label="Zahlenstrahl in '+v.step+'er-Schritten">'+s+'</svg></div><figcaption>Immer '+v.step+' weiter</figcaption></figure>'}
function vPairs(v){return '<div class="pairs">'+v.items.map(function(p){return '<div>'+(p[2]?'<span class="em" aria-hidden="true">'+p[2]+'</span>':'')+'<span class="tx"><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></span></div>'}).join('')+'</div>'}
function curLang(){var t=nav.topicId&&topicById(nav.topicId);return t?(LANG[t.subject]||'en-GB'):'en-GB'}
function vFlip(v){
  var lg=curLang();
  return '<div class="flipgrid">'+v.items.map(function(p){
    return '<div class="flipc" data-act="flip" role="button" tabindex="0">'+(v.nospk?'':'<button class="spk" data-act="speak" data-t="'+esc(p[0])+'" data-lang="'+lg+'" aria-label="Anhören">&#128266;</button>')+(p[2]?'<span class="em" aria-hidden="true">'+p[2]+'</span>':'')+'<b>'+esc(p[0])+'</b>'+(p[3]?'<span class="pr">['+esc(p[3])+']</span>':'')+'<span class="hintline">'+(v.nospk?'Tippen zum Drehen':'Tippen zum Aufdecken')+'</span><span class="back">'+esc(p[1])+'</span></div>'}).join('')+'</div>';
}
function vLines(v){return '<div class="lines'+(v.num?' num':'')+'">'+v.items.map(function(p){return '<div class="ln">'+(function(l){return l?'<em>'+rt(l)+'</em>':''})(p[1]&&v.num?String(p[1]).replace(/^Schritt \d+:?\s*/,''):p[1])+'<code>'+rt(p[0])+'</code>'+(p[2]?'<span class="lex"><b>Beispiel</b> '+rt(p[2])+'</span>':'')+'</div>'}).join('')+'</div>'}
function vImg(v){return '<figure class="vis"><img class="pic" src="'+esc(v.src)+'" alt="'+esc(v.alt||'')+'"></figure>'}
/* ---------- Grössen-Visualisierungen (Länge, Gewicht, Diagramme) ---------- */
var VC=['#34A853','#4285F4','#FBBC04','#EA4335'];
function vBar(v){
  var tot=0,i,x=10,W=580,g=3,s='';v.segs.forEach(function(q){tot+=q[0]});
  v.segs.forEach(function(q,k){
    var w=Math.max(6,(W-g*(v.segs.length-1))*q[0]/tot),col=q[2]===-1?'#CFD3DA':(typeof q[2]==='number'&&q[2]>=0)?DC[q[2]%8]:VC[((v.col||0)+k%2)%4];
    s+='<rect x="'+x.toFixed(1)+'" y="17" width="'+w.toFixed(1)+'" height="54" rx="10" fill="rgba(40,60,100,.18)"/><rect x="'+x.toFixed(1)+'" y="14" width="'+w.toFixed(1)+'" height="54" rx="10" fill="'+col+'" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/><rect x="'+(x+3).toFixed(1)+'" y="17" width="'+Math.max(0,w-6).toFixed(1)+'" height="16" rx="7" fill="#fff" opacity=".28"/>';
    if(q[1]&&w>26)s+='<text x="'+(x+w/2).toFixed(1)+'" y="49" text-anchor="middle" font-size="'+(w<46?17:w<80?21:27)+'" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(q[1])+'</text>';
    x+=w+g;
  });
  s+='<path d="M10 78q0 10 10 10h550q10 0 10-10" fill="none" stroke="#5f6368" stroke-width="3" stroke-linecap="round"/>';
  s+='<text x="300" y="116" text-anchor="middle" font-size="22" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+esc(v.cap||'')+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+(v.cap?126:98)+'" width="100%" role="img" aria-label="'+esc(v.cap||'Balken')+'">'+s+'</svg></figure>';
}
function vConv(v){
  var s='<rect x="14" y="40" width="170" height="70" rx="18" fill="'+VC[1]+'"/><text x="99" y="87" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(v.from)+'</text>'
   +'<rect x="416" y="40" width="170" height="70" rx="18" fill="'+VC[0]+'"/><text x="501" y="87" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(v.to)+'</text>';
  s+='<path d="M190 58h200" stroke="#EA4335" stroke-width="6" stroke-linecap="round"/><path d="M376 44l16 14-16 14" fill="none" stroke="#EA4335" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><text x="300" y="46" text-anchor="middle" font-size="26" font-weight="800" fill="#EA4335" font-family="Arial,sans-serif">'+esc(v.up)+'</text>';
  s+='<path d="M410 94H210" stroke="#F9AB00" stroke-width="6" stroke-linecap="round"/><path d="M224 80l-16 14 16 14" fill="none" stroke="#F9AB00" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><text x="300" y="130" text-anchor="middle" font-size="26" font-weight="800" fill="#B06000" font-family="Arial,sans-serif">'+esc(v.down)+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 146" width="100%" role="img" aria-label="'+esc(v.from)+' mal '+esc(v.up)+' zu '+esc(v.to)+'">'+s+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vBars(v){
  var max=0,n=v.items.length,bw=100,gap=(600-n*bw)/(n+1),s='',top=Math.ceil(Math.max.apply(null,v.items.map(function(q){return q[1]}))/2)*2,k;
  for(k=0;k<=top;k+=2)s+='<line x1="34" x2="590" y1="'+(170-k*140/top)+'" y2="'+(170-k*140/top)+'" stroke="#E8EAED" stroke-width="2"/>';
  v.items.forEach(function(q,i){
    var h=q[1]*140/top,x=30+gap*(i+1)+bw*i-20+10;x=gap*(i+1)+bw*i+20;
    s+='<rect x="'+x.toFixed(1)+'" y="'+(170-h).toFixed(1)+'" width="'+bw+'" height="'+h.toFixed(1)+'" rx="8" fill="'+VC[i%4]+'"/><text x="'+(x+bw/2).toFixed(1)+'" y="'+(160-h).toFixed(1)+'" text-anchor="middle" font-size="30" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+q[1]+'</text>';
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
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 250" width="100%" role="img" aria-label="Waage: '+esc(v.l)+' und '+esc(v.r)+'">'+s+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vPill(x,y,t,col){var w=Math.max(34,String(t).length*10.5+16),q=String(t).indexOf('?')>=0;return '<g><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-15)+'" width="'+w.toFixed(1)+'" height="28" rx="10" fill="'+(q?'#FFD93D':'#fff')+'" stroke="'+(q?'#fff':col)+'" stroke-width="2.5"/><text x="'+x.toFixed(1)+'" y="'+(y+5)+'" text-anchor="middle" font-size="16" font-weight="800" fill="'+(q?'#4a2a00':col)+'" font-family="Arial,sans-serif">'+esc(t)+'</text></g>'}
function vTri(v){
  var na=v.na,nb=v.nb,pw=function(t){return Math.max(34,String(t).length*10.5+16)},la=v.la||'a',lb=v.lb||'b',lc=v.lc||'c',
  s=Math.min(190/nb,130/na),A=[pw(la)+22,168],B=[A[0]+nb*s,168],C=[A[0],168-na*s],W=Math.round(Math.max(B[0]+pw(lc)/2+10,B[0]+16)),
  cA='#4285F4',cB='#34A853',cC='#EA4335';
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
  return '<figure class="vis" style="width:100%"><svg viewBox="'+x0.toFixed(0)+' '+y0.toFixed(0)+' '+(x1-x0).toFixed(0)+' '+(y1-y0).toFixed(0)+'" width="100%" style="max-width:340px" role="img" aria-label="Quadrate auf den Seiten des Dreiecks">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vRect(v){
  var s=Math.min(220/v.w,120/v.h),W=v.w*s,H=v.h*s,x=40,y=24,o='<rect x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'" rx="4" fill="#E8F0FE" stroke="#4285F4" stroke-width="5"/><path d="M'+x+' '+(y+H)+'L'+(x+W)+' '+y+'" stroke="#EA4335" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round"/>';
  o+=vPill(x+W/2,y+H+22,v.lw,'#34A853')+vPill(x-6,y+H/2,v.lh,'#4285F4')+vPill(x+W/2+10,y+H/2-10,v.ld||'d','#EA4335');
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+Math.round(W+90)+' '+Math.round(H+68)+'" width="100%" style="max-width:'+Math.round(W+90)+'px" role="img" aria-label="Rechteck mit Diagonale">'+o+'</svg></figure>';
}
function vFbar(v){
  var s='',y=6;
  v.rows.forEach(function(r){
    var n=r[0],k=r[1],w=440/n,i;
    s+='<text x="8" y="'+(y+27)+'" font-size="19" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+esc(r[2]||(k+'/'+n))+'</text>';
    for(i=0;i<n;i++)s+='<rect x="'+(152+i*w).toFixed(1)+'" y="'+y+'" width="'+(w-3).toFixed(1)+'" height="38" rx="7" fill="'+(i<k?VC[(r[3]||0)%4]:'#EEF1F7')+'"/>';
    y+=50;
  });
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 '+y+'" width="100%" role="img" aria-label="Bruchstreifen">'+s+'</svg></figure>';
}

/* ---------- Deutsch-Theorie: Tabellen und Grafiken (v4.42) ---------- */
var DC=['#4285F4','#EA4335','#34A853','#F29900','#9334E6','#00A5BF','#D93F8E','#6B7280','#8D5A2B','#D9A400','#E8710A'];
var DE=false,DM=[8,0,9,2,10,5,6,7];
function isDeu(){try{var q=nav.queue&&nav.queue[nav.idx]||'';return nav.subject==='deu'||/-deu-/.test((nav.topicId||'')+' '+(nav.scope||'')+' '+q)}catch(e){return false}}
function dcol(i){i=(i|0)%8;return DC[DE?DM[i]:i]}
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
function vFlow(v){
  return '<ol class="dfl">'+v.steps.map(function(p,i){return '<li style="--c:'+dcol(p[2]===undefined?i:p[2])+'"><span class="n">'+(i+1)+'</span><div><b>'+bd(p[0])+'</b><span>'+bd(p[1])+'</span></div></li>'}).join('')+'</ol>';
}
function vCards(v){
  return '<div class="dcd">'+v.items.map(function(p){return '<div class="dk" style="--c:'+dcol(p[3])+'"><h4>'+bd(p[0])+'</h4><p class="q">'+bd(p[1])+'</p><p class="e">'+bd(p[2])+'</p></div>'}).join('')+'</div>';
}

function vArea(v){
  var W=200,H=150,x0=66,y0=34,cw=W/v.c,chh=H/v.r,o='',i,j;
  for(i=0;i<v.c;i++)for(j=0;j<v.r;j++){var a=i<v.a,b=j<v.b,f=a&&b?'#9334E6':a?'#8AB4F8':b?'#81C995':'#EEF1F7';o+='<rect x="'+(x0+i*cw).toFixed(1)+'" y="'+(y0+j*chh).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="'+chh.toFixed(1)+'" fill="'+f+'" stroke="#fff" stroke-width="2"/>'}
  o+='<text x="'+(x0+v.a*cw/2)+'" y="22" text-anchor="middle" font-size="17" font-weight="800" fill="#1A56C8" font-family="Arial,sans-serif">'+esc(v.la)+'</text>';
  o+='<text x="'+(x0-8)+'" y="'+(y0+v.b*chh/2+6)+'" text-anchor="end" font-size="17" font-weight="800" fill="#188038" font-family="Arial,sans-serif">'+esc(v.lb)+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 292 200" width="100%" style="max-width:300px" role="img" aria-label="Flächenmodell fürs Malnehmen">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}

/* ---------- Primar-Visuals (v4.47) ---------- */
function vEmo(v){
  var g=v.grp||5;
  return '<figure class="vis emo"><div class="emorows">'+v.rows.map(function(r,ri){var o='',i,grp='';
    for(i=0;i<r[1];i++){grp+='<span class="e1'+(v.x&&i>=r[1]-v.x?' xd':'')+'" aria-hidden="true">'+r[0]+'</span>';
      if(!g||(i+1)%g===0||i===r[1]-1){o+='<span class="eb c'+(ri%4)+(g?'':' nb')+'">'+grp+'</span>';grp=''}}
    return '<div class="emorow" role="img" aria-label="'+r[1]+' Stück">'+o+'</div>'}).join('')+'</div>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vField(v){
  var P=30,G=10,cols=v.cols,rows=v.rows,W=cols*P+Math.floor((cols-1)/5)*G+16,H=rows*P+16,k=0,o='',i,j,
  gx=function(c){return 8+c*P+Math.floor(c/5)*G+P/2},
  cs=[VC[(v.col||0)%4],VC[(v.col2===undefined?1:v.col2)%4]];
  o+='<defs>'+VC.map(function(c,n){return '<radialGradient id="fg'+n+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="'+c+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".78"/></radialGradient>'}).join('')+'<filter id="fsh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-opacity=".35"/></filter></defs>';
  o+='<rect x="1.5" y="1.5" width="'+(W-3)+'" height="'+(H-3)+'" rx="12" fill="#F4F7FB" stroke="#5F6B7A" stroke-width="3"/>';
  for(j=0;j<rows;j++)for(i=0;i<cols;i++){var cx=gx(i),cy=8+j*P+P/2,f=null;
    o+='<rect x="'+(cx-P/2+2)+'" y="'+(cy-P/2+2)+'" width="'+(P-4)+'" height="'+(P-4)+'" rx="6" fill="#fff" stroke="#C5CCD6" stroke-width="1.5"/>';
    if(k<v.filled)f=(v.col||0)%4;else if(v.filled2&&k<v.filled+v.filled2)f=(v.col2===undefined?1:v.col2)%4;
    if(f!==null)o+='<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="url(#fg'+f+')" stroke="'+VC[f]+'" stroke-width="1.5" filter="url(#fsh)"/><ellipse cx="'+(cx-3.5)+'" cy="'+(cy-4)+'" rx="3.6" ry="2.2" fill="#fff" fill-opacity=".55"/>';
    k++}
  for(i=5;i<cols;i+=5)o+='<line x1="'+(gx(i)-P/2-G/2)+'" x2="'+(gx(i)-P/2-G/2)+'" y1="6" y2="'+(H-6)+'" stroke="#5F6B7A" stroke-width="2.5" stroke-dasharray="3 4"/>';
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(520,W*1.9)+'px" role="img" aria-label="Punktefeld">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vClock(v){
  var o='<defs><radialGradient id="ckb" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#8AB4F8"/><stop offset="1" stop-color="#1A56C4"/></radialGradient><radialGradient id="ckf" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#EEF2F8"/></radialGradient><filter id="cks" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="1.5" dy="2.5" stdDeviation="1.8" flood-opacity=".35"/></filter></defs>';
  o+='<circle cx="110" cy="110" r="104" fill="url(#ckb)"/><circle cx="110" cy="110" r="90" fill="url(#ckf)" stroke="#fff" stroke-width="3"/>';
  var i,a;
  for(i=0;i<12;i++){a=i*Math.PI/6;if(i%3===0)continue;}
  for(i=0;i<60;i++){a=i*Math.PI/30;var big=i%5===0,r1=big?74:80;o+='<line x1="'+(110+r1*Math.sin(a)).toFixed(1)+'" y1="'+(110-r1*Math.cos(a)).toFixed(1)+'" x2="'+(110+86*Math.sin(a)).toFixed(1)+'" y2="'+(110-86*Math.cos(a)).toFixed(1)+'" stroke="'+(big?'#3c4043':'#9aa0a6')+'" stroke-width="'+(big?3:1.3)+'" stroke-linecap="round"/>'}
  for(i=1;i<=12;i++){a=i*Math.PI/6;
    o+='<text x="'+(110+55*Math.sin(a)).toFixed(1)+'" y="'+(110-55*Math.cos(a)+7).toFixed(1)+'" text-anchor="middle" font-size="20" font-weight="900" fill="#EA4335" font-family="Arial,sans-serif">'+i+'</text>';
    o+='<text x="'+(110+97*Math.sin(a)).toFixed(1)+'" y="'+(110-97*Math.cos(a)+3.5).toFixed(1)+'" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+(i*5)+'</text>'}
  var m=v.m||0,ha=((v.h%12)+m/60)*Math.PI/6,ma=m*Math.PI/30;
  function hand(ang,len,w,col){var s=Math.sin(ang),c=Math.cos(ang),px=c*w,py=s*w;
    return '<polygon points="'+(110+px-s*-14*0).toFixed(1)+','+(110+py).toFixed(1)+' '+(110+len*s).toFixed(1)+','+(110-len*c).toFixed(1)+' '+(110-px).toFixed(1)+','+(110-py).toFixed(1)+' '+(110-s*14).toFixed(1)+','+(110+c*14).toFixed(1)+'" fill="'+col+'" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>'}
  o+='<g filter="url(#cks)">'+hand(ha,40,5.5,'#EA4335')+hand(ma,68,3.6,'#1A56C4')+'</g><circle cx="110" cy="110" r="7.5" fill="#202124" stroke="#fff" stroke-width="2"/>';
  return '<figure class="vis"><svg viewBox="0 0 220 220" width="100%" style="max-width:240px;display:block;margin:0 auto" role="img" aria-label="Uhr">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
var NOTEC={10:['#FFF3B0','#F2CB2E','#7A5C00'],20:['#FFD0D0','#EA5A5A','#7A1212'],50:['#D5F0D0','#4DB45A','#14532D'],100:['#D2E3FC','#4285F4','#0B3A8A']};
function vCoins(v){
  return '<figure class="vis"><div class="coins">'+v.items.map(function(r){var o='',i,fr=r[1]==='Fr',note=fr&&r[0]>=10;
    for(i=0;i<r[2];i++){
      if(note){var c=NOTEC[r[0]]||NOTEC[10];o+='<span class="note" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+');border-color:'+c[1]+';color:'+c[2]+'"><em>'+r[0]+'</em><b>'+r[0]+'</b><small>Franken</small><em class="r">'+r[0]+'</em></span>'}
      else{var sz=fr?(r[0]>=5?60:r[0]>=2?54:48):(r[0]>=20?50:r[0]>=10?44:40);o+='<span class="coin'+(fr?' fr':(r[0]===5?' br':''))+'" style="width:'+sz+'px;height:'+sz+'px"><span class="ci"><b>'+r[0]+'</b><small>'+(fr?'Franken':'Rappen')+'</small></span></span>'}}
    return o}).join('')+'</div>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vShape(v){
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
  return '<figure class="vis shp"><svg viewBox="0 0 120 120" width="100%" style="max-width:112px;overflow:visible" role="img" aria-label="'+esc(v.alt||k)+'">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vNline(v){var dec=(v.step%1!==0)||(v.min%1!==0),fmt=function(n){n=Math.round(n*1000)/1000;return String(n).replace('.',',')},cnt=function(a,b,st){var r=[],k;for(k=0;a+k*st<=b+1e-9;k++)r.push(Math.round((a+k*st)*1000)/1000);return r};
  var x0=26,x1=574,y=48,span=v.max-v.min;function X(n){return x0+(x1-x0)*(n-v.min)/span}
  var o='<defs><linearGradient id="nlg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DDE5F0"/></linearGradient><filter id="nsh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-opacity=".35"/></filter></defs>',n;
  o+='<rect x="'+(x0-16)+'" y="'+(y-14)+'" width="'+(x1-x0+32)+'" height="28" rx="9" fill="url(#nlg)" stroke="#5F6B7A" stroke-width="2.5"/>';
  if(v.minor)cnt(v.min,v.max,v.minor).forEach(function(n){o+='<line x1="'+X(n)+'" x2="'+X(n)+'" y1="'+(y-14)+'" y2="'+(y-5)+'" class="nl"/>'});
  cnt(v.min,v.max,v.step).forEach(function(n){o+='<line x1="'+X(n)+'" x2="'+X(n)+'" y1="'+(y-14)+'" y2="'+(y+4)+'" stroke="#2f3a4a" stroke-width="3" stroke-linecap="round"/>'+((!v.lab||v.lab==='all'||(v.lab==='alt'&&Math.round((n-v.min)/v.step)%2===0)||(v.lab==='ends'&&(n===v.min||n+v.step>v.max)))?'<text x="'+X(n)+'" y="'+(y+34)+'" text-anchor="middle" class="nt">'+fmt(n)+'</text>':'')});
  (v.pts||[]).forEach(function(p,i){o+='<path d="M'+X(p)+' '+(y+13)+'l-9 -17a10 10 0 1 1 18 0z" fill="'+VC[i%4]+'" stroke="#fff" stroke-width="2.5" filter="url(#nsh)"/><circle cx="'+X(p)+'" cy="'+(y-6)+'" r="3.2" fill="#fff"/>'});
  if(v.q!==undefined&&v.q!==null)o+='<g filter="url(#nsh)"><circle cx="'+X(v.q)+'" cy="'+y+'" r="15" fill="#FFD93D" stroke="#fff" stroke-width="3"/></g><text x="'+X(v.q)+'" y="'+(y+7)+'" text-anchor="middle" font-size="21" font-weight="900" fill="#4a2a00" font-family="Arial,sans-serif">?</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 100" width="100%" role="img" aria-label="Zahlenstrahl">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vWall(v){
  var R=v.rows,n=R.length,bw=96,bh=46,g=6,W=n*bw+(n-1)*g+20,o='',i,j,cols=['#8AB4F8','#81C995','#FDD663'];
  for(i=0;i<n;i++){var cnt=R[i].length,x0=(W-(cnt*bw+(cnt-1)*g))/2,y=8+i*(bh+g);
    for(j=0;j<cnt;j++){var t=String(R[i][j]),q=t==='?',x=x0+j*(bw+g);
      o+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="9" fill="'+(q?'#FFF3C4':cols[i%3])+'" stroke="'+(q?'#E37400':'rgba(0,0,0,.18)')+'" stroke-width="'+(q?3:1.5)+'" '+(q?'stroke-dasharray="6 4"':'')+'/><text x="'+(x+bw/2)+'" y="'+(y+31)+'" text-anchor="middle" font-size="'+(q?26:24)+'" font-weight="900" fill="'+(q?'#B06000':'#1b2433')+'" font-family="Arial,sans-serif">'+esc(t)+'</text>'}}
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 '+W+' '+(n*(bh+g)+10)+'" width="100%" style="max-width:'+Math.min(420,W*1.4)+'px;display:block;margin:0 auto" role="img" aria-label="Zahlenmauer">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vAngle(v){
  var cx=120,cy=122,R=100,o='<defs><radialGradient id="pg" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#E8F0FE"/><stop offset="1" stop-color="#C6DAFC"/></radialGradient></defs>',i,a;
  o+='<path d="M'+(cx-R)+' '+cy+'A'+R+' '+R+' 0 0 1 '+(cx+R)+' '+cy+'Z" fill="url(#pg)" stroke="#1A56C4" stroke-width="3"/><path d="M'+(cx-60)+' '+cy+'A60 60 0 0 1 '+(cx+60)+' '+cy+'Z" fill="#fff" fill-opacity=".55" stroke="#8AB4F8" stroke-width="1.5"/>';
  for(i=0;i<=180;i+=5){a=i*Math.PI/180;var big=i%10===0,r1=big?R-12:R-7;o+='<line x1="'+(cx+r1*Math.cos(a)).toFixed(1)+'" y1="'+(cy-r1*Math.sin(a)).toFixed(1)+'" x2="'+(cx+R*Math.cos(a)).toFixed(1)+'" y2="'+(cy-R*Math.sin(a)).toFixed(1)+'" stroke="#1A56C4" stroke-width="'+(i%30===0?2:1)+'"/>';
    if(i%30===0)o+='<text x="'+(cx+(i%180===0?R-8:R-22)*Math.cos(a)).toFixed(1)+'" y="'+(i%180===0?cy+15:cy-(R-22)*Math.sin(a)+4).toFixed(1)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#1A56C4" font-family="Arial,sans-serif">'+i+'</text>';
    if(i%30===0)o+='<text x="'+(cx+(R-36)*Math.cos(a)).toFixed(1)+'" y="'+(cy-(R-36)*Math.sin(a)+3).toFixed(1)+'" text-anchor="middle" font-size="8" fill="#5F6B7A" font-family="Arial,sans-serif">'+(180-i)+'</text>'}
  var d=v.deg,ra=d*Math.PI/180;
  o+='<path d="M'+cx+' '+cy+'L'+(cx+44)+' '+cy+'A44 44 0 0 0 '+(cx+44*Math.cos(ra)).toFixed(1)+' '+(cy-44*Math.sin(ra)).toFixed(1)+'Z" fill="#FBBC04" fill-opacity=".55" stroke="#E37400" stroke-width="2"/>';
  o+='<line x1="'+(cx-R-12)+'" y1="'+cy+'" x2="'+(cx+R+12)+'" y2="'+cy+'" stroke="#202124" stroke-width="4" stroke-linecap="round"/><line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+(R+14)*Math.cos(ra)).toFixed(1)+'" y2="'+(cy-(R+14)*Math.sin(ra)).toFixed(1)+'" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/><circle cx="'+cx+'" cy="'+cy+'" r="5" fill="#202124"/>';
  if(v.lbl)o+='<text x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle" font-size="13" font-weight="900" fill="#B3261E" font-family="Arial,sans-serif">'+esc(v.lbl)+'</text>';
  return '<figure class="vis"><svg viewBox="0 0 240 146" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="Winkel mit Geodreieck">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vCircle(v){
  var o='<defs><radialGradient id="cg" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#E8F0FE"/><stop offset="1" stop-color="#AECBFA"/></radialGradient></defs><circle cx="100" cy="80" r="64" fill="url(#cg)" stroke="#1A56C4" stroke-width="4"/>';
  if(v.show!=='d')o+='<line x1="100" y1="80" x2="164" y2="80" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/>'+(v.lr?'<text x="132" y="72" text-anchor="middle" font-size="14" font-weight="900" fill="#B3261E" font-family="Arial,sans-serif">'+esc(v.lr)+'</text>':'');
  if(v.show==='d'||v.show==='both')o+='<line x1="36" y1="80" x2="164" y2="80" stroke="#34A853" stroke-width="4" stroke-linecap="round"/>'+(v.ld?'<text x="68" y="98" text-anchor="middle" font-size="14" font-weight="900" fill="#137333" font-family="Arial,sans-serif">'+esc(v.ld)+'</text>':'');
  o+='<circle cx="100" cy="80" r="5" fill="#202124"/><text x="100" y="64" text-anchor="middle" font-size="13" font-weight="800" fill="#202124" font-family="Arial,sans-serif">M</text>';
  return '<figure class="vis"><svg viewBox="0 0 200 160" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="Kreis">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vJug(v){
  var W=120,H=170,x0=30,y0=10,h=H-20,lv=Math.max(0,Math.min(1,v.level/v.max)),o='<defs><linearGradient id="jg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8AB4F8"/><stop offset="1" stop-color="#1A73E8"/></linearGradient></defs>';
  o+='<rect x="'+x0+'" y="'+(y0+h*(1-lv))+'" width="60" height="'+(h*lv)+'" fill="url(#jg)"/><rect x="'+x0+'" y="'+y0+'" width="60" height="'+h+'" rx="6" fill="none" stroke="#5F6B7A" stroke-width="4"/>';
  var st=v.step||1,i;for(i=0;i<=v.max;i+=st){var y=y0+h*(1-i/v.max);o+='<line x1="'+(x0+60)+'" y1="'+y+'" x2="'+(x0+(i%(v.lab||st)===0?46:52)+14)+'" y2="'+y+'" stroke="#5F6B7A" stroke-width="2"/>';if(i%(v.lab||st)===0)o+='<text x="'+(x0+78)+'" y="'+(y+4)+'" font-size="11" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+i+'</text>'}
  o+='<text x="'+(x0+30)+'" y="'+(H+10)+'" text-anchor="middle" font-size="12" font-weight="800" fill="#5F6B7A" font-family="Arial,sans-serif">'+esc(v.unit||'')+'</text>';
  return '<figure class="vis"><svg viewBox="0 0 '+W+' '+(H+16)+'" width="100%" style="max-width:150px;display:block;margin:0 auto" role="img" aria-label="Messbecher">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vQuader(v){
  var l=150,b=70,h=70,dx=44,dy=-30,x=44,y=62,o='';
  o+='<polygon points="'+x+','+y+' '+(x+l)+','+y+' '+(x+l)+','+(y+h)+' '+x+','+(y+h)+'" fill="#CFE0FC" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  o+='<polygon points="'+x+','+y+' '+(x+dx)+','+(y+dy)+' '+(x+l+dx)+','+(y+dy)+' '+(x+l)+','+y+'" fill="#E8F0FE" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  o+='<polygon points="'+(x+l)+','+y+' '+(x+l+dx)+','+(y+dy)+' '+(x+l+dx)+','+(y+h+dy)+' '+(x+l)+','+(y+h)+'" fill="#A9C7FA" stroke="#1A56C4" stroke-width="3" stroke-linejoin="round"/>';
  function pill(px,py,t,c){return '<rect x="'+(px-24)+'" y="'+(py-11)+'" width="48" height="22" rx="11" fill="#fff" stroke="'+c+'" stroke-width="2.5"/><text x="'+px+'" y="'+(py+5)+'" text-anchor="middle" font-size="13" font-weight="900" fill="'+c+'" font-family="Arial,sans-serif">'+esc(t)+'</text>'}
  o+=pill(x+l/2,y+h+16,v.l,'#137333')+pill(x+l+dx+14,y+dy+h/2+4,v.b||'',"#B06000")+pill(x-14,y+h/2,v.h,'#B3261E');
  return '<figure class="vis"><svg viewBox="0 0 300 160" width="100%" style="max-width:310px;display:block;margin:0 auto" role="img" aria-label="Quader">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vPar(v){
  var k=v.kind,o='<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1A56C4"/></marker></defs>',st='stroke="#1A56C4" stroke-width="5" stroke-linecap="round"';
  if(k==='par')o+='<line x1="20" y1="45" x2="180" y2="45" '+st+'/><line x1="20" y1="95" x2="180" y2="95" '+st+'/><path d="M100 50v40" stroke="#EA4335" stroke-width="3" stroke-dasharray="5 4"/>';
  else if(k==='perp')o+='<line x1="30" y1="95" x2="170" y2="95" '+st+'/><line x1="100" y1="95" x2="100" y2="15" '+st+'/><path d="M100 77h18v18" fill="#FBBC04" fill-opacity=".5" stroke="#E37400" stroke-width="3"/>';
  else if(k==='cross')o+='<line x1="30" y1="100" x2="170" y2="30" '+st+'/><line x1="30" y1="30" x2="170" y2="100" '+st+'/>';
  else if(k==='tilt')o+='<line x1="20" y1="100" x2="180" y2="40" '+st+'/><line x1="20" y1="50" x2="180" y2="90" '+st+'/>';
  return '<figure class="vis"><svg viewBox="0 0 200 120" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="Geraden">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vBlocks(v){
  var h=v.h||0,z=v.z||0,e=v.e||0,o='',x=6,i,j,k;
  for(k=0;k<h;k++){o+='<rect x="'+x+'" y="8" width="64" height="64" rx="6" fill="#E9DCFA" stroke="#7B3FC4" stroke-width="2.5"/>';for(i=1;i<10;i++)o+='<line x1="'+(x+i*6.4)+'" y1="10" x2="'+(x+i*6.4)+'" y2="70" stroke="#7B3FC4" stroke-opacity=".35" stroke-width="1"/><line x1="'+(x+2)+'" y1="'+(8+i*6.4)+'" x2="'+(x+62)+'" y2="'+(8+i*6.4)+'" stroke="#7B3FC4" stroke-opacity=".35" stroke-width="1"/>';x+=72}
  for(k=0;k<z;k++){o+='<rect x="'+x+'" y="8" width="12" height="64" rx="4" fill="#CFE0FC" stroke="#1A56C4" stroke-width="2.5"/>';for(j=1;j<10;j++)o+='<line x1="'+(x+1)+'" y1="'+(8+j*6.4)+'" x2="'+(x+11)+'" y2="'+(8+j*6.4)+'" stroke="#1A56C4" stroke-opacity=".45" stroke-width="1"/>';x+=18}
  x+=(z?8:0);
  for(k=0;k<e;k++){o+='<rect x="'+x+'" y="60" width="12" height="12" rx="3" fill="#FDE9A6" stroke="#B06000" stroke-width="2.2"/>';x+=17}
  var W=Math.max(60,x+4);
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' 80" width="100%" style="max-width:'+Math.min(380,W*1.9)+'px;display:block;margin:0 auto" role="img" aria-label="Stellenwert-Material">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vJumps(v){
  var pts=[v.from],i;(v.jumps||[]).forEach(function(j){pts.push(pts[pts.length-1]+j[0])});
  var mn=Math.min.apply(null,pts),mx=Math.max.apply(null,pts),pad=(mx-mn)*.06||1,lo=mn-pad,hi=mx+pad,x0=24,x1=576,y=142;
  function X(n){return x0+(x1-x0)*(n-lo)/(hi-lo)}
  var o='<defs>'+[0,1,2,3,4,5,6,7,99].map(function(ci){var cc=ci===99?'#EA4335':DC[ci];return '<marker id="jh'+ci+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+cc+'"/></marker>'}).join('')+'</defs><line x1="'+(x0-8)+'" y1="'+y+'" x2="'+(x1+8)+'" y2="'+y+'" stroke="#2f3a4a" stroke-width="3" stroke-linecap="round"/>';
  pts.forEach(function(p,k){o+='<line x1="'+X(p)+'" y1="'+(y-8)+'" x2="'+X(p)+'" y2="'+(y+8)+'" stroke="#2f3a4a" stroke-width="3"/><circle cx="'+X(p)+'" cy="'+y+'" r="10" fill="'+(k===0?'#34A853':k===pts.length-1?'#4285F4':'#FBBC04')+'" stroke="#fff" stroke-width="2"/><text x="'+X(p)+'" y="'+(y+36)+'" text-anchor="middle" font-size="'+(v.fs||30)+'" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+(k===pts.length-1&&v.hideEnd?'?':(v.fmt?v.fmt[k]:p))+'</text>'});
  (v.jumps||[]).forEach(function(j,k){var a=X(pts[k]),b=X(pts[k+1]),m=(a+b)/2,r=Math.abs(b-a)/2,h=Math.min(46,Math.max(22,10+r*.55))+((k%2&&(v.jumps.some(function(q,qi){return Math.abs(X(pts[qi+1])-X(pts[qi]))<120})))?34:0),dir=b>=a?1:-1,jm=(typeof j[2]==='number')?(j[2]===99?99:j[2]%8):7,jc=jm===99?'#EA4335':DC[jm];
    o+='<path d="M'+a+' '+(y-6)+'Q'+m+' '+(y-6-2*h)+' '+b+' '+(y-6)+'" fill="none" stroke="'+jc+'" stroke-width="4" stroke-linecap="round" marker-end="url(#jh'+jm+')"/><rect x="'+(m-Math.max(38,String(j[1]).length*11))+'" y="'+(y-h-48)+'" width="'+Math.max(76,String(j[1]).length*22)+'" height="38" rx="19" fill="#fff" stroke="'+jc+'" stroke-width="2"/><text x="'+m+'" y="'+(y-h-21)+'" text-anchor="middle" font-size="30" font-weight="900" fill="'+jc+'" font-family="Arial,sans-serif">'+esc(j[1])+'</text>'});
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 204" width="100%" style="max-width:600px;margin:0 auto" role="img" aria-label="Rechenstrich">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
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
  return '<figure class="vis scn" style="width:100%"><svg viewBox="0 0 600 230" width="100%" role="img" aria-label="'+esc(v.cap||'Bild zum Thema')+'" style="border-radius:16px">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function vArr(v){
  var P=24,r=v.r,c=v.c,sp=v.split||0,W=c*P+10,H=r*P+10,o='',i,j;
  for(j=0;j<r;j++)for(i=0;i<c;i++){var inA=(v.splitRows?j<sp:i<sp),f=inA?VC[1]:(v.dim?'#D9DDE5':VC[v.col===undefined?0:v.col]);if(!sp)f=VC[v.col===undefined?0:v.col];
    o+='<circle cx="'+(5+i*P+P/2)+'" cy="'+(5+j*P+P/2)+'" r="9" fill="'+f+'" stroke="#fff" stroke-width="1.5"/><ellipse cx="'+(5+i*P+P/2-3)+'" cy="'+(5+j*P+P/2-3.5)+'" rx="3" ry="2" fill="#fff" fill-opacity=".5"/>'}
  if(sp)o+=(v.splitRows?'<line x1="2" x2="'+(W-2)+'" y1="'+(5+sp*P)+'" y2="'+(5+sp*P)+'"':'<line y1="2" y2="'+(H-2)+'" x1="'+(5+sp*P)+'" x2="'+(5+sp*P)+'"')+' stroke="#5f6368" stroke-width="3" stroke-dasharray="6 4"/>';
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(420,Math.round(W*Math.min(1.3,260/H)))+'px;max-height:none;display:block;margin:0 auto" role="img" aria-label="Malfeld">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
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
    var colr=i===n-1?'#B06000':'#1A56C4';
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
  return '<figure class="vis" style="align-items:center;width:100%"><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.max(220,W*2.2)+'px;display:block;margin:0 auto" role="img" aria-label="Schriftliche Rechnung">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function visuals(list){
  if(!list||!list.length)return '';
  var map={dots:vDots,pie:vPie,numberline:vLine,pairs:vPairs,flip:vFlip,lines:vLines,img:vImg,bar:vBar,conv:vConv,bars:vBars,scale:vScale,tri:vTri,pyth:vPyth,rect:vRect,fbar:vFbar,tbl:vTbl,chips:vChips,tline:vTline,flow:vFlow,cards:vCards,area:vArea,emo:vEmo,field:vField,clock:vClock,coins:vCoins,shape:vShape,nline:vNline,angle:vAngle,circle:vCircle,jug:vJug,quader:vQuader,par:vPar,blocks:vBlocks,jumps:vJumps,arr:vArr,col:vCol,wall:vWall,scene:vScene};
  return '<div class="visrow">'+list.map(function(v){return map[v.type]?map[v.type](v):''}).join('')+'</div>';
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
