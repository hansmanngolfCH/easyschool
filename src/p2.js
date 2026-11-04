
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
function vLines(v){return '<div class="lines'+(v.num?' num':'')+'">'+v.items.map(function(p){return '<div class="ln">'+(p[1]?'<em>'+rt(p[1])+'</em>':'')+'<code>'+rt(p[0])+'</code></div>'}).join('')+'</div>'}
function vImg(v){return '<figure class="vis"><img class="pic" src="'+esc(v.src)+'" alt="'+esc(v.alt||'')+'"></figure>'}
/* ---------- Grössen-Visualisierungen (Länge, Gewicht, Diagramme) ---------- */
var VC=['#34A853','#4285F4','#FBBC04','#EA4335'];
function vBar(v){
  var tot=0,i,x=10,W=580,g=3,s='';v.segs.forEach(function(q){tot+=q[0]});
  v.segs.forEach(function(q,k){
    var w=Math.max(6,(W-g*(v.segs.length-1))*q[0]/tot),col=q[2]===-1?'#CFD3DA':VC[((v.col||0)+k%2)%4];
    s+='<rect x="'+x.toFixed(1)+'" y="14" width="'+w.toFixed(1)+'" height="54" rx="8" fill="'+col+'"/>';
    if(q[1]&&w>46)s+='<text x="'+(x+w/2).toFixed(1)+'" y="47" text-anchor="middle" font-size="'+(w<80?15:19)+'" font-weight="800" fill="#fff" font-family="Arial,sans-serif">'+esc(q[1])+'</text>';
    x+=w+g;
  });
  s+='<path d="M10 78q0 10 10 10h550q10 0 10-10" fill="none" stroke="#5f6368" stroke-width="3" stroke-linecap="round"/>';
  s+='<text x="300" y="116" text-anchor="middle" font-size="22" font-weight="800" fill="#202124" font-family="Arial,sans-serif">'+esc(v.cap||'')+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 600 126" width="100%" role="img" aria-label="'+esc(v.cap||'Balken')+'">'+s+'</svg></figure>';
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
var DC=['#4285F4','#EA4335','#34A853','#F29900','#9334E6','#00A5BF','#D93F8E','#6B7280'];
function dcol(i){return DC[(i|0)%DC.length]}
function bd(s){return rt(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}
function vTbl(v){
  var h=v.head?'<thead><tr>'+v.head.map(function(x,k){var c=(k>0&&v.hc)?' style="--c:'+dcol(v.hc[k-1])+'" class="hc"':'';return '<th'+c+'>'+bd(x)+'</th>'}).join('')+'</tr></thead>':'';
  var b='<tbody>'+v.rows.map(function(r,i){var c=dcol(v.c?v.c[i]:i);return '<tr style="--c:'+c+'">'+r.map(function(x,k){return k===0?'<th scope="row"><span>'+bd(x)+'</span></th>':'<td>'+bd(x)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>';
  return '<div class="dtb"><table class="'+(v.hc?'nh':'')+'">'+h+b+'</table></div>'+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'');
}
function vChips(v){
  return '<div class="dchw"><div class="dch">'+v.parts.map(function(p){return '<div class="dc" style="--c:'+dcol(p[2])+'"><b>'+bd(p[0])+'</b>'+(p[1]?'<i>'+bd(p[1])+'</i>':'')+'</div>'}).join('')+'</div>'+(v.cap?'<p class="dcap">'+bd(v.cap)+'</p>':'')+'</div>';
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
  var W=200,H=150,x0=44,y0=34,cw=W/v.c,chh=H/v.r,o='',i,j;
  for(i=0;i<v.c;i++)for(j=0;j<v.r;j++){var a=i<v.a,b=j<v.b,f=a&&b?'#9334E6':a?'#8AB4F8':b?'#81C995':'#EEF1F7';o+='<rect x="'+(x0+i*cw).toFixed(1)+'" y="'+(y0+j*chh).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="'+chh.toFixed(1)+'" fill="'+f+'" stroke="#fff" stroke-width="2"/>'}
  o+='<text x="'+(x0+v.a*cw/2)+'" y="22" text-anchor="middle" font-size="17" font-weight="800" fill="#1A56C8" font-family="Arial,sans-serif">'+esc(v.la)+'</text>';
  o+='<text x="'+(x0-8)+'" y="'+(y0+v.b*chh/2+6)+'" text-anchor="end" font-size="17" font-weight="800" fill="#188038" font-family="Arial,sans-serif">'+esc(v.lb)+'</text>';
  return '<figure class="vis" style="width:100%"><svg viewBox="0 0 270 200" width="100%" style="max-width:300px" role="img" aria-label="Flächenmodell fürs Malnehmen">'+o+'</svg>'+(v.cap?'<figcaption>'+esc(v.cap)+'</figcaption>':'')+'</figure>';
}
function visuals(list){
  if(!list||!list.length)return '';
  var map={dots:vDots,pie:vPie,numberline:vLine,pairs:vPairs,flip:vFlip,lines:vLines,img:vImg,bar:vBar,conv:vConv,bars:vBars,scale:vScale,tri:vTri,pyth:vPyth,rect:vRect,fbar:vFbar,tbl:vTbl,chips:vChips,tline:vTline,flow:vFlow,cards:vCards,area:vArea};
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
  var open=padOpen(key),btn='<button class="btn sm" data-act="pad" data-key="'+esc(key)+'" aria-label="Notizen">'+(open?'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16z"/></svg>')+'</button>';
  if(!open)return {btn:btn,box:''};
  var tl=[['ink','Stift'],['erase','Radierer']].map(function(t){return '<button class="tool'+(penTool===t[0]?' on':'')+'" data-act="tool" data-tool="'+t[0]+'"><i class="sw '+t[0]+'"></i>'+t[1]+'</button>'}).join('');
  var box='<div class="pad"><div class="padbar">'+tl+'<button class="tool" data-act="padclear" data-key="'+esc(key)+'">Leeren</button></div><div class="padwrap"><canvas class="padcv" data-key="'+esc(key)+'" data-q="" aria-label="Zeichenfläche für Notizen"></canvas></div></div>';
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
