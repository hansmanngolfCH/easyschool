
/* ---------- Variation: neue Zahlen bei Mathe-Aufgaben (gleiche Aufgabe, gleiches Niveau) ---------- */
function vri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function vpick(a){return a[Math.floor(Math.random()*a.length)]}
function vnot(gen,orig,tries){var x,i=0;do{x=gen();i++}while(String(x)===String(orig)&&i<(tries||40));return x}
function vth(n){return n>=10000?String(n).replace(/\B(?=(\d{3})+$)/g,' '):String(n)}
function vfmt(x){return String(Number(x))}
function vdis(correct,cands,k){var out=[],seen={};seen[correct]=1;shuffle(cands).forEach(function(c){c=String(c);if(!seen[c]&&out.length<k){seen[c]=1;out.push(c)}});return out}
function vFr(p,q){var g=gcd(p,q)||1;return [p/g,q/g]}
function vFs(f){return f[1]===1?String(f[0]):f[0]+'/'+f[1]}
function vFalt(f){return f[0]>f[1]&&f[1]>1?[vFs(f),Math.floor(f[0]/f[1])+(f[0]%f[1]?' '+(f[0]%f[1])+'/'+f[1]:'')]:[vFs(f)]}
function vFdist(f){var p=f[0],q=f[1],c=[(p+1)+'/'+q,Math.max(1,p-1)+'/'+q,p+'/'+(q+1),(q>1?p+'/'+(q-1):''),q+'/'+p,(p*2)+'/'+q,p+'/'+(q*2),(p+q)+'/'+q].filter(function(s){var m=s.split('/');return s&&m[1]!=='0'&&m[0]*f[1]!==f[0]*m[1]&&s!==vFs(f)});return c}
var VTR=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20],[7,24,25],[15,20,25],[20,21,29],[9,40,41],[10,24,26],[18,24,30],[12,35,37],[16,30,34]];
function vtri(hard){var t=vpick(hard?VTR:VTR.slice(0,8)).slice();if(Math.random()<.5){var x=t[0];t[0]=t[1];t[1]=x}return t}
function vTriVis(a,b,la,lb,lc){return {type:'tri',na:a,nb:b,la:la,lb:lb,lc:lc}}
function vBarKm(a,b,U,u){var segs=[],i;for(i=0;i<a;i++)segs.push([1000,'1 '+U]);if(b)segs.push([b,b+' '+u]);return {type:'bar',segs:segs,cap:a+' '+U+(b?' '+b+' '+u:''),col:1}}
function vNum(s){return Number(String(s).replace(/ /g,'').replace(',','.'))}
var VLAB=['kürzer als 500 m','500 m bis 1 km','1 km bis 3 km','länger als 3 km'];
function vDiag(v){return {type:'bars',items:VLAB.map(function(l,i){return [l,v[i]]}),unit:'Kinder'}}
function vData(){var v;do{v=[vri(2,9),vri(2,9),vri(3,9),vri(2,8)]}while(new Set(v).size<4||(v.indexOf(Math.max.apply(null,v))!==v.lastIndexOf(Math.max.apply(null,v))));return v}
var VFRUIT=['Tomate','Banane','Apfel','Orange'],VEM={Tomate:'🍅',Banane:'🍌',Apfel:'🍎',Orange:'🍊',Joghurt:'🥛'};
function vWeights(){var v=[],w;while(v.length<4){w=vri(6,25)*10;if(v.every(function(x){return Math.abs(x-w)>=20}))v.push(w)}return v}
function vSumBar(items){var tot=0;items.forEach(function(x){tot+=x[1]});return {type:'bar',segs:items.map(function(x){return [x[1],x[0]+' '+x[1]+' g']}),cap:items.map(function(x){return x[1]+' g'}).join(' + ')+' = '+tot+' g',col:0}}
function vGapBar(x){return {type:'bar',segs:[[x,x+' g'],[1000-x,'?',-1]],cap:x+' g + ___ = 1000 g',col:1}}

/* Rueckgabe: {q, a, ans, dist, steps, vis, expl} oder null */
function vGen(it){
  var q=it.q,m,r;
  /* --- Längen/Gewichte: Umrechnen --- */
  if(m=/^(.*?)(\d[\d ]*) (km|kg) = ___ (m|g)(.*)$/.exec(q)){var N=vNum(m[2]),big=N>10;N=vnot(function(){return big?vri(11,25):vri(2,9)},N);return {q:m[1]+vth(N)+' '+m[3]+' = ___ '+m[4]+m[5],a:vth(N*1000),ans:[String(N*1000),vth(N*1000),N*1000+' '+m[4],vth(N*1000)+' '+m[4]],aU:vth(N*1000)+' '+m[4],dist:[vth(N*100)+' '+m[4],vth(N*10)+' '+m[4],vth(N)+' '+m[4]],steps:[[N+' · 1000 = '+vth(N*1000),'mal 1000']]}}
  if(m=/^Wie viele (Meter|Gramm) sind (\d[\d ]*) (km|kg)\?$/.exec(q)){var u=m[1]==='Meter'?'m':'g',N=vnot(function(){return vri(2,9)},vNum(m[2]));return {q:'Wie viele '+m[1]+' sind '+N+' '+m[3]+'?',a:vth(N*1000)+' '+u,aU:vth(N*1000)+' '+u,dist:[vth(N*100)+' '+u,vth(N*10)+' '+u,N+' '+u],steps:[[N+' · 1000 = '+vth(N*1000),'mal 1000']]}}
  if(m=/^Wie viele (km|kg) sind (\d[\d ]*) (m|g)\?$/.exec(q)){var K=vnot(function(){return vNum(m[2])>9000?vri(11,30):vri(2,9)},vNum(m[2])/1000);return {q:'Wie viele '+m[1]+' sind '+vth(K*1000)+' '+m[3]+'?',a:K+' '+m[1],aU:K+' '+m[1],dist:[K*10+' '+m[1],K*100+' '+m[1],vth(K*1000)+' '+m[1]],steps:[[vth(K*1000)+' : 1000 = '+K,'geteilt durch 1000']]}}
  if(m=/^(.*?)(\d[\d ]*) (m|g) = ___ (km|kg)(.*)$/.exec(q)){if(/___ (m|g)/.test(q))return null;var K=vnot(function(){return vNum(m[2])>9000?vri(11,30):vri(2,9)},vNum(m[2])/1000);return {q:m[1]+vth(K*1000)+' '+m[3]+' = ___ '+m[4]+m[5],a:String(K),ans:[String(K),K+' '+m[4]],aU:K+' '+m[4],dist:[K*10+' '+m[4],K*100+' '+m[4],vth(K*1000)+' '+m[4]],steps:[[vth(K*1000)+' : 1000 = '+K,'geteilt durch 1000']]}}
  if(m=/^(\d+) (km|kg) (\d+) (m|g) = ___ (m|g)$/.exec(q)){var a=vri(1,5),b0=+m[3],b=b0<100?vnot(function(){return vpick([5,15,25,50,60,75])},b0):vnot(function(){return vri(2,19)*50},b0),t=a*1000+b;return {q:a+' '+m[2]+' '+b+' '+m[4]+' = ___ '+m[5],a:vth(t)+' '+m[5],aU:vth(t)+' '+m[5],dist:[a*100+b+' '+m[5],a*1000+b*10+' '+m[5],a*1000+b+100+' '+m[5],a*10+b+' '+m[5]],steps:[[a*1000+' + '+b+' = '+t,'zusammenzählen']],vis:[vBarKm(a,b,m[2],m[4])]}}
  if(m=/^(\d+) (km|kg) (\d+) (m|g) = ___ (m|g) \(Schreibe nur die Zahl\.\)$/.exec(q)){var a=vri(1,5),b0=+m[3],b=b0<100?vnot(function(){return vpick([5,15,25,50,60,75])},b0):vnot(function(){return vri(2,19)*50},b0),t=a*1000+b;return {q:a+' '+m[2]+' '+b+' '+m[4]+' = ___ '+m[5]+' (Schreibe nur die Zahl.)',a:String(t),ans:[String(t),t+' '+m[5],a+' '+String(b).padStart(3,'0')],steps:[[a*1000+' + '+b+' = '+t,'zusammenzählen']],vis:[vBarKm(a,b,m[2],m[4])]}}
  if(m=/^(\d+) (m|g) = ___ (km|kg) ___ (m|g)$/.exec(q)){var k=vri(1,4),r0=vnot(function(){return vri(2,19)*50},+m[1]%1000),n=k*1000+r0;return {q:n+' '+m[2]+' = ___ '+m[3]+' ___ '+m[4],a:k+' '+m[3]+' '+r0+' '+m[4],aU:k+' '+m[3]+' '+r0+' '+m[4],dist:[n/100+' '+m[3],k+' '+m[3]+' '+r0/10+' '+m[4],(n/10)+' '+m[3]],steps:[[n+' = '+k*1000+' + '+r0,k+' '+m[3]+' und '+r0+' '+m[4]]],vis:[vBarKm(k,r0,m[3],m[4])]}}
  /* --- Ergaenzen auf 1000 --- */
  if(m=/^Wie viele Gramm fehlen\? (\d+) g \+ ___ g = 1000 g(.*)$/.exec(q)){var x0=+m[1],x;
    if(x0%250===0)x=vnot(function(){return vpick([250,500,750])},x0);else if(x0%50===0)x=vnot(function(){return vpick([100,150,200,300,350,400,450,550,600,650,700,800,850,900])},x0);else if(x0%10===0)x=vnot(function(){return vri(10,98)*10+(Math.random()<.5?0:0)},x0);else x=vnot(function(){return vri(10,198)*5+ (vri(0,1)?0:0)},x0);
    if(x0%50!==0&&x0%10===0){do{x=vri(10,98)*10}while(x%50===0||x===x0)}
    if(x0%10!==0){do{x=vri(21,198)*5}while(x%10===0||x===x0||x>995)}
    var y=1000-x;return {q:'Wie viele Gramm fehlen? '+x+' g + ___ g = 1000 g'+m[2],a:y+' g',ans:[String(y),y+' g'],aU:y+' g',dist:[y+100+' g',(y>100?y-100:y+200)+' g',y+50+' g'],steps:[['1000 − '+x+' = '+y,'ergänzen auf 1 kg']],vis:[vGapBar(x)]}}
  if(m=/^Ein Weg ist 1 km lang\. Du bist (\d+) m gegangen\. Wie viele Meter fehlen noch\?(.*)$/.exec(q)){var x=vnot(function(){return vri(2,19)*50},+m[1]),y=1000-x;return {q:'Ein Weg ist 1 km lang. Du bist '+x+' m gegangen. Wie viele Meter fehlen noch?'+m[2],a:String(y),ans:[String(y),y+' m'],aU:y+' m',dist:[y+100+' m',y-100+' m',y+50+' m'],steps:[['1000 − '+x+' = '+y,'ergänzen auf 1000 m']]}}
  /* --- Gewichte zusammenzaehlen --- */
  if(/wiegen zusammen: ___ g/.test(q)){var items=[],re=/(Tomate|Banane|Apfel|Orange|Joghurt) (\d+) g/g,mm;while(mm=re.exec(q))items.push([mm[1],vnot(function(){return vri(6,26)*10},mm[2])]);if(items.length<2)return null;var tot=0;items.forEach(function(x){tot+=x[1]});
    var head=items.map(function(x){return x[0]+' '+x[1]+' g'}).join(' + '),tail=/\(Schreibe nur die Zahl\.\)$/.test(q)?' (Schreibe nur die Zahl.)':'';
    var st=items.length===3?[[items[0][1]+' + '+items[1][1]+' = '+(items[0][1]+items[1][1]),'zwei zusammen'],[(items[0][1]+items[1][1])+' + '+items[2][1]+' = '+tot+' g','dritte dazu']]:[[items.map(function(x){return x[1]}).join(' + ')+' = '+tot,'zusammenzählen']];
    return {q:head+' wiegen zusammen: ___ g'+tail,a:String(tot),ans:[String(tot),tot+' g'],aU:tot+' g',dist:[tot-20+' g',tot+20+' g',tot+100+' g'],steps:st,vis:[vSumBar(items)]}}
  if(m=/^(Apfel|Banane|Orange|Tomate|Joghurt) (\d+) g \+ (Apfel|Banane|Orange|Tomate|Joghurt) (\d+) g wiegen zusammen ?: ?___ g/.exec(q))return null;
  /* --- Obst vergleichen --- */
  if(/^Welches Obst ist am (schwersten|leichtesten)\?$/.test(q)||/^Welche Reihenfolge ist richtig \(leicht → schwer\)\?$/.test(q)){
    var W=vWeights(),obj=VFRUIT.map(function(n,i){return [n,W[i]]}),sorted=obj.slice().sort(function(a,b){return a[1]-b[1]}),withNum=(it.opts||[]).some(function(o){return /\(/.test(o)})||false,vis=[{type:'bars',items:sorted.map(function(x){return [x[0],x[1]]}),unit:'Gramm (g)'}];
    if(/schwersten|leichtesten/.test(q)){var tgt=/schwersten/.test(q)?sorted[3]:sorted[0],lab=function(x){return withNum?x[0]+' ('+x[1]+' g)':x[0]};return {q:q,a:lab(tgt),dist:obj.filter(function(x){return x!==tgt}).map(lab),steps:[[tgt[1]+' g ist die '+(/schwersten/.test(q)?'grösste':'kleinste')+' Zahl',tgt[0]]],vis:vis,fixedDist:true}}
    var ord=sorted.map(function(x){return x[0]}),d=[ord.slice().reverse().join(', '),[ord[1],ord[0],ord[2],ord[3]].join(', '),[ord[0],ord[2],ord[1],ord[3]].join(', '),[ord[3],ord[0],ord[1],ord[2]].join(', ')];
    return {q:q,a:ord.join(', '),dist:d,hints:['Beginne mit der kleinsten Zahl: '+sorted.map(function(x){return x[1]}).join(', ')+'.'],steps:[[sorted.map(function(x){return x[1]}).join(' < '),'von leicht nach schwer']],vis:vis}}
  /* --- Buch und Scheren --- */
  if(m=/^Ein Buch wiegt (\d+) g[.,] (\d+) Scheren wiegen je (\d+) g\. Wie viel wiegen sie zusammen\?(.*)$/.exec(q)){var B,n,s,t;do{B=vpick([500,600,650,700,750,800]);n=vri(2,4);s=vpick([50,60,80,100]);t=B+n*s}while(t>=1000);return {q:'Ein Buch wiegt '+B+' g. '+n+' Scheren wiegen je '+s+' g. Wie viel wiegen sie zusammen?'+m[4],a:String(t),ans:[String(t),t+' g'],steps:[[n+' · '+s+' = '+n*s,n+' Scheren'],[B+' + '+n*s+' = '+t+' g','mit dem Buch']],vis:[{type:'bar',segs:[[B,'Buch '+B+' g']].concat(Array.apply(null,Array(n)).map(function(){return [s,'']})),cap:B+' g + '+n+' · '+s+' g',col:0}]}}
  if(m=/^Ein Buch wiegt (\d+) g, (\d+) Scheren wiegen je (\d+) g\. Wie viel wiegen sie zusammen\?(.*)$/.exec(q)){var B,n,s,t;do{B=vpick([500,600,650,700,750,800]);n=vri(2,4);s=vpick([50,60,80,100]);t=B+n*s}while(t>=1000);return {q:'Ein Buch wiegt '+B+' g, '+n+' Scheren wiegen je '+s+' g. Wie viel wiegen sie zusammen?'+m[4],a:String(t),ans:[String(t),t+' g'],steps:[[B+' + '+n+' · '+s+' = '+t,'zusammen']],vis:[{type:'bar',segs:[[B,'Buch '+B+' g']].concat(Array.apply(null,Array(n)).map(function(){return [s,'']})),cap:B+' g + '+n+' · '+s+' g',col:0}]}}
  if(m=/^Ein Buch und (\d+) Scheren wiegen (\d+) g\. Das ist ___ 1 kg\.$/.exec(q)){var B=vpick([500,600,650,700,750,800]),n=vri(2,4),s=vpick([50,60,80,100,120,150]),t=B+n*s;if(t===1000)t+=0;var ans=t<1000?'etwas weniger als':t>1000?'etwas mehr als':'genau';return {q:'Ein Buch und '+n+' Scheren wiegen '+t+' g. Das ist ___ 1 kg.',a:ans,dist:['genau','etwas mehr als','etwas weniger als','viel mehr als'].filter(function(x){return x!==ans}),steps:[[t+(t<1000?' < ':t>1000?' > ':' = ')+'1000',t<1000?'es fehlen noch '+(1000-t)+' g':t>1000?'es sind '+(t-1000)+' g zu viel':'genau 1 kg']],vis:[{type:'bar',segs:t<1000?[[t,t+' g'],[1000-t,'?',-1]]:[[1000,'1 kg'],[t-1000,'+ '+(t-1000)+' g',-1]],cap:'Ein Buch und '+n+' Scheren',col:0}]}}
  /* --- Zeit --- */
  if(m=/^(Ein Kind geht 1 km in etwa 20 Minuten\. Wie lange braucht es für )(\d+) km\?(.*)$/.exec(q)){var N=vnot(function(){return vri(2,6)},+m[2]),T=N*20,inMin=/in Minuten/.test(m[3]);return {q:m[1]+N+' km?'+m[3],a:inMin?String(T):T+' min',ans:[String(T),T+' min'],aU:T+' min',dist:[T-20+' min',T+20+' min',N*10+' min',T+40+' min'],steps:[[N+' · 20 = '+T,'Minuten']]}}
  if(m=/^Ein Kind braucht (\d+) Minuten zu Fuss\./.exec(q)){var N=vnot(function(){return vri(2,6)},+m[1]/20);return {q:'Ein Kind braucht '+N*20+' Minuten zu Fuss. Wie lang ist die Strecke ungefähr? (1 km = 20 min)',a:N+' km',dist:[N*2+' km',N+2+' km',N*20+' km',Math.max(1,N-1)+' km'],steps:[[N*20+' : 20 = '+N,N+' km']]}}
  /* --- Diagramm --- */
  if(/Schulweg|Klasse/.test(q)&&it.visuals&&it.visuals.some(function(v){return v.type==='bars'})){
    var v=vData(),vis=[vDiag(v)],tot=v[0]+v[1]+v[2]+v[3];
    if(/insgesamt in der Klasse/.test(q))return {q:q,a:String(tot),ans:[String(tot)],dist:[tot-1,tot+1,tot-3,v[2]],steps:[[v.join(' + ')+' = '+tot,'alle Säulen zusammenzählen']],vis:vis};
    if(/am häufigsten/.test(q)){var mx=v.indexOf(Math.max.apply(null,v));return {q:q,a:VLAB[mx],dist:VLAB.filter(function(x,i){return i!==mx}),steps:[['höchste Säule',VLAB[mx]]],vis:vis}}
    if(/länger als 1 km\?/.test(q)){var s2=v[2]+v[3];return {q:q,a:String(s2),dist:[v[2],v[3],s2+3,tot-v[0]+1],steps:[[v[2]+' + '+v[3]+' = '+s2,'1 km bis 3 km und länger als 3 km']],vis:vis}}
    if(/unter 1 km/.test(q)){var s3=v[0]+v[1];return {q:q,a:String(s3),dist:[v[0],v[1],s3+2,s3-1],steps:[[v[0]+' + '+v[1]+' = '+s3,'zwei Säulen']],vis:vis}}
    if(/zwischen 1 km und 3 km\?/.test(q))return {q:q,a:String(v[2]),dist:[v[1],v[3],tot,v[0]],steps:[['dritte Säule = '+v[2],'ablesen']],vis:vis};
    if(m=/^Stimmt das\? (\d+) Kinder haben einen Schulweg, der kürzer ist als 500 m\.$/.exec(q)){var yes=Math.random()<.5,sh=yes?v[0]:v[0]+vpick([-1,1,2]);if(sh<1)sh=v[0]+1;return {q:'Stimmt das? '+sh+' Kinder haben einen Schulweg, der kürzer ist als 500 m.',a:sh===v[0]?'Ja':'Nein',dist:[sh===v[0]?'Nein':'Ja'],steps:[['erste Säule = '+v[0],sh===v[0]?'stimmt':'stimmt nicht']],vis:vis}}
  }
  /* --- Pythagoras --- */
  if(m=/^(Berechne c: |)a = (\d+) cm, b = (\d+) cm\.?(.*)$/.exec(q)){if(/\./.test(m[2]+m[3]))return null;var t=vtri(it.lvl>=3);return {q:m[1]+'a = '+t[0]+' cm, b = '+t[1]+' cm'+(m[1]?'.':'.')+m[4],a:String(t[2]),ans:[String(t[2]),t[2]+' cm'],aU:t[2]+' cm',dist:[t[0]+t[1]+' cm',t[2]+1+' cm',t[2]-1+' cm',Math.abs(t[0]-t[1])+' cm'],steps:[[t[0]+'² + '+t[1]+'² = '+t[0]*t[0]+' + '+t[1]*t[1]+' = '+t[2]*t[2],'Quadrate addieren'],['c = √'+t[2]*t[2]+' = '+t[2]+' cm','Wurzel ziehen']],vis:[vTriVis(t[0],t[1],'a = '+t[0]+' cm','b = '+t[1]+' cm','c = ?')],keepDot:true}}
  if(m=/^(Berechne b: |)a = (\d+) cm, c = (\d+) cm\.?(.*)$/.exec(q)){if(/\./.test(m[2]+m[3]))return null;var t=vtri(it.lvl>=3);return {q:m[1]+'a = '+t[0]+' cm, c = '+t[2]+' cm.'+m[4].replace(/^\s*Berechne c\./,''),a:String(t[1]),ans:[String(t[1]),t[1]+' cm'],aU:t[1]+' cm',dist:[t[2]-t[0]+' cm',t[2]+t[0]+' cm',t[1]+1+' cm',t[1]-1+' cm'],steps:[[t[2]+'² − '+t[0]+'² = '+t[2]*t[2]+' − '+t[0]*t[0]+' = '+t[1]*t[1],'Quadrate subtrahieren'],['b = √'+t[1]*t[1]+' = '+t[1]+' cm','Wurzel ziehen']],vis:[vTriVis(t[0],t[1],'a = '+t[0]+' cm','b = ?','c = '+t[2]+' cm')]}}
  if(m=/^(Berechne das Quadrat: )([\d.]+)² =$/.exec(q)){var dec=/\./.test(m[2]),n=dec?vnot(function(){return vpick([0.7,1.2,1.4,1.5,1.7,2.5,3.5,4.5,6.5,7.5,8.5,9.5,2.3,3.2])},+m[2]):vnot(function(){return vri(6,30)},+m[2]),sq=Number((n*n).toFixed(2));return {q:m[1]+n+'² =',a:String(sq),ans:[String(sq),String(sq).replace('.',',')],steps:[[n+' · '+n+' = '+sq,'Zahl mal sich selbst']]}}
  if(m=/^(Ziehe die Wurzel: )√([\d.]+) =$/.exec(q)){var dec=/\./.test(m[2]),n=dec?vnot(function(){return vpick([1.2,1.4,1.5,2.5,3.5,4.5,6.5,7.5,8.5,9.5,2.3,3.2,0.8,1.6])},Math.sqrt(+m[2])):vnot(function(){return vri(11,32)},Math.sqrt(+m[2])),sq=Number((n*n).toFixed(2));return {q:m[1]+'√'+sq+' =',a:String(n),ans:[String(n),String(n).replace('.',',')],steps:[[n+' · '+n+' = '+sq,'Probe: '+n+'²']]}}
  if(m=/^(Ein Rechteck hat die Seiten |Rechteck mit den Seiten |Ein Fernseher hat die Breite |Fernseher: Breite )(\d+) cm( und die Höhe |, Höhe | und )(\d+) cm(\.|)(.*)$/.exec(q)){var t=vtri(it.lvl>=3),k=1,a=t[0],b=t[1],c=t[2];if(/Fernseher/.test(q)){k=vri(10,20);a=4*k;b=3*k;c=5*k}
    var txt=/Fernseher/.test(q)?m[1]+a+' cm'+m[3]+b+' cm'+m[5]+m[6]:m[1]+a+' cm'+m[3]+b+' cm'+m[5]+m[6];return {q:txt,a:String(c),ans:[String(c),c+' cm'],aU:c+' cm',dist:[a+b+' cm',c+1+' cm',c-1+' cm',Math.abs(a-b)+' cm'],steps:[[a+'² + '+b+'² = '+(a*a+b*b),'Quadrate addieren'],['d = √'+(a*a+b*b)+' = '+c+' cm','Wurzel ziehen']],vis:[{type:'rect',w:Math.max(a,b),h:Math.min(a,b),lw:Math.max(a,b)+' cm',lh:Math.min(a,b)+' cm',ld:/Fernseher/.test(q)?'Diagonale = ?':'d = ?'}]}}
  if(m=/^Eine Leiter ist (\d+) m lang(\.| und) ?(Sie steht|steht) ([\d.]+) m von der Wand( entfernt)?\. Wie hoch reicht sie\?(.*)$/.exec(q)){var L=vnot(function(){return vpick([4,5,6,7,8])},+m[1]),x=vri(8,Math.min(26,Math.floor(L*4.4)))/10,hh=Math.round(Math.sqrt(L*L-x*x)*10)/10;return {q:'Eine Leiter ist '+L+' m lang'+m[2]+(m[2]==='.'?' Sie steht ':' steht ')+x+' m von der Wand'+(m[5]||'')+'. Wie hoch reicht sie?'+m[6],a:hh.toFixed(1),ans:[hh.toFixed(1),hh.toFixed(1).replace('.',','),hh.toFixed(1)+' m',hh.toFixed(1).replace('.',',')+' m'],steps:[[L+'² − '+x+'² = '+(L*L)+' − '+(x*x).toFixed(2)+' = '+(L*L-x*x).toFixed(2),'Quadrate subtrahieren'],['h = √'+(L*L-x*x).toFixed(2)+' ≈ '+hh.toFixed(1)+' m','Wurzel ziehen, runden']],vis:[vTriVis(Math.sqrt(L*L-x*x),x,'Wand = ?','Boden = '+x+' m','Leiter = '+L+' m')]}}
  if(m=/^Ein Quadrat hat die Seite (\d+) cm\. Wie lang ist die Diagonale\?(.*)$/.exec(q)){var s=vnot(function(){return vri(6,15)},+m[1]),dg=Math.round(s*Math.SQRT2*10)/10;return {q:'Ein Quadrat hat die Seite '+s+' cm. Wie lang ist die Diagonale?'+m[2],a:dg.toFixed(1),ans:[dg.toFixed(1),dg.toFixed(1).replace('.',','),dg.toFixed(1)+' cm',dg.toFixed(1).replace('.',',')+' cm'],steps:[[s+'² + '+s+'² = '+2*s*s,'Quadrate addieren'],['d = √'+2*s*s+' ≈ '+dg.toFixed(1)+' cm','Wurzel ziehen, runden']],vis:[{type:'rect',w:s,h:s,lw:s+' cm',lh:s+' cm',ld:'d = ?'}]}}
  if(m=/^Ein Baum ist bei einem Sturm (\d+) m über dem Boden abgeknickt(\.|,) (?:Seine Spitze berührt|die Spitze berührt) (\d+) m (?:in )?(?:Entfernung|entfernt)/.exec(q)){}
  if(m=/^Ein Dreieck hat die Seiten (\d+) cm, (\d+) cm und (\d+) cm\. Ist es rechtwinklig\?(.*)$/.exec(q)){var t=vtri(true).sort(function(a,b){return a-b}),ok=Math.random()<.5,c=ok?t[2]:t[2]+vpick([1,2]);return {q:'Ein Dreieck hat die Seiten '+t[0]+' cm, '+t[1]+' cm und '+c+' cm. Ist es rechtwinklig?'+m[4],a:ok?'ja':'nein',ans:[ok?'ja':'nein'],dist:[ok?'nein':'ja'],steps:[[t[0]+'² + '+t[1]+'² = '+(t[0]*t[0]+t[1]*t[1])+(ok?' = ':' ≠ ')+c+'² = '+c*c,ok?'stimmt, rechtwinklig':'stimmt nicht']]}}
  /* --- Brueche --- */
  if(m=/^Kürze so weit wie möglich: (\d+)\/(\d+) =$/.exec(q)){var f,p,qq,k;do{qq=vri(2,9);p=vri(1,qq-1);k=vri(2,5)}while(gcd(p,qq)!==1||qq*k>30||(p*k===+m[1]&&qq*k===+m[2]));return {q:'Kürze so weit wie möglich: '+p*k+'/'+qq*k+' =',a:p+'/'+qq,steps:[[p*k+'/'+qq*k+' = '+p+'/'+qq,'Zähler und Nenner durch '+k+']'.replace(']','')]],vis:qq*k<=12?[{type:'pie',parts:qq*k,filled:p*k}]:null}}
  if(m=/^Erweitere (\d+)\/(\d+) mit (\d+):$/.exec(q)){var qq,p,k;do{qq=vri(2,8);p=vri(1,qq-1);k=vri(2,5)}while(gcd(p,qq)!==1||(p===+m[1]&&qq===+m[2]&&k===+m[3]));var a=p*k+'/'+qq*k;return {q:'Erweitere '+p+'/'+qq+' mit '+k+':',a:a,steps:[[p+'/'+qq+' = '+a,'beide mal '+k]],vis:qq*k<=24?[{type:'fbar',rows:[[qq,p,p+'/'+qq],[qq*k,p*k,'= ?']]}]:null}}
  if(m=/^Wandle (um in einen unechten Bruch: |in einen unechten Bruch um: )(\d+) (\d+)\/(\d+)( =|)$/.exec(q)){var w,z,n;do{w=vri(1,4);n=vri(2,9);z=vri(1,n-1)}while(gcd(z,n)!==1||(w===+m[2]&&z===+m[3]&&n===+m[4]));var a=(w*n+z)+'/'+n;return {q:'Wandle '+m[1]+w+' '+z+'/'+n+m[5],a:a,steps:[[w+' · '+n+' + '+z+' = '+(w*n+z),'Zähler berechnen'],[a,'Nenner bleibt']],vis:n<=8&&w<=3?Array.apply(null,Array(w)).map(function(){return {type:'pie',parts:n,filled:n}}).concat([{type:'pie',parts:n,filled:z}]):null}}
  if((m=/^(Rechne: |)(\d+)\/(\d+) ([+−]) (\d+)\/(\d+)( =)(.*)$/.exec(q))&&m[3]===m[6]){
    var n=vri(5,12),plus=m[4]==='+',z1,z2,tr=0;do{z1=vri(1,n-2);z2=vri(1,n-1);tr++}while(tr<200&&(plus?(z1+z2>=n):(z1<=z2)));
    if(tr>=200)return null;var sm=plus?z1+z2:z1-z2,res=vFr(sm,n);return {q:m[1]+z1+'/'+n+' '+m[4]+' '+z2+'/'+n+m[7]+m[8],a:vFs(res),ans:vFalt(res),steps:[[z1+'/'+n+' '+m[4]+' '+z2+'/'+n+' = '+sm+'/'+n+(res[0]!==sm?' = '+vFs(res):''),'Zähler '+(plus?'zusammenzählen':'abziehen')]],vis:[{type:'fbar',rows:[[n,z1,z1+'/'+n],[n,z2,z2+'/'+n,1]]}]}}
  if(m=/^(\d+)\/(\d+) · (\d+)\/(\d+) =(.*)$/.exec(q)){var a,b,c,d,res;do{a=vri(1,5);b=vri(a+1,9);c=vri(1,5);d=vri(c+1,9);res=vFr(a*c,b*d)}while(gcd(a,b)!==1||gcd(c,d)!==1||res[1]>40);return {q:a+'/'+b+' · '+c+'/'+d+' ='+m[5],a:vFs(res),ans:vFalt(res),steps:[[a+'/'+b+' · '+c+'/'+d+' = '+a*c+'/'+b*d+(res[0]!==a*c?' = '+vFs(res):''),'oben mal oben, unten mal unten']]}}
  if(m=/^(\d+)\/(\d+) : (\d+)\/(\d+) =(.*)$/.exec(q)){var a,b,c,d,res;do{a=vri(1,5);b=vri(a+1,9);c=vri(1,5);d=vri(c+1,9);res=vFr(a*d,b*c)}while(gcd(a,b)!==1||gcd(c,d)!==1||res[1]>40||res[0]>40);return {q:a+'/'+b+' : '+c+'/'+d+' ='+m[5],a:vFs(res),ans:vFalt(res),steps:[[a+'/'+b+' : '+c+'/'+d+' = '+a+'/'+b+' · '+d+'/'+c+' = '+a*d+'/'+b*c+(res[0]!==a*d?' = '+vFs(res):''),'Kehrbruch nehmen']]}}
  if((m=/^(\d+)\/(\d+) ([+−]) (\d+)\/(\d+) =(.*)$/.exec(q))&&m[2]===m[5]){return vGen({q:'Rechne: '+m[1]+'/'+m[2]+' '+m[3]+' '+m[4]+'/'+m[5]+' ='+m[6],lvl:it.lvl})&&(function(){var r=vGen({q:'Rechne: '+m[1]+'/'+m[2]+' '+m[3]+' '+m[4]+'/'+m[5]+' =',lvl:it.lvl});if(r)r.q=r.q.replace(/^Rechne: /,'')+m[6];return r})()}
  if((m=/^(\d+)\/(\d+) ([+−]) (\d+)\/(\d+) =(.*)$/.exec(q))&&m[2]!==m[5]){var D=[2,3,4,5,6,8,10,12],d1,d2,z1,z2,L,plus=m[3]==='+',res;var tries=0;do{d1=vpick(D);d2=vpick(D);L=lcm(d1,d2);z1=vri(1,d1-1);z2=vri(1,d2-1);tries++;if(tries>400)return null}while(d1===d2||L>24||gcd(z1,d1)!==1||gcd(z2,d2)!==1||(!plus&&z1*L/d1<=z2*L/d2)||(plus&&L===Math.max(d1,d2)&&false));
    var x=z1*L/d1,y=z2*L/d2,s=plus?x+y:x-y;res=vFr(s,L);return {q:z1+'/'+d1+' '+m[3]+' '+z2+'/'+d2+' ='+m[6],a:vFs(res),ans:vFalt(res),steps:[[z1+'/'+d1+' '+m[3]+' '+z2+'/'+d2+' = '+x+'/'+L+' '+m[3]+' '+y+'/'+L,'Hauptnenner '+L],['= '+s+'/'+L+(res[0]!==s?' = '+vFs(res):''),'Zähler '+(plus?'zusammenzählen':'abziehen')]],vis:L<=12?[{type:'pie',parts:d1,filled:z1},{type:'pie',parts:d2,filled:z2}]:null}}
  if(m=/^(\d+) (\d+)\/(\d+) : (\d+)( =|)(.*)$/.exec(q)){var w,z,n,k,res;do{w=vri(1,4);n=vri(2,9);z=vri(1,n-1);k=vri(2,9);res=vFr(w*n+z,n*k)}while(gcd(z,n)!==1||res[1]>40);return {q:w+' '+z+'/'+n+' : '+k+m[5]+m[6],a:vFs(res),ans:vFalt(res),steps:[[w+' '+z+'/'+n+' = '+(w*n+z)+'/'+n,'gemischte Zahl umwandeln'],[(w*n+z)+'/'+n+' : '+k+' = '+(w*n+z)+'/'+n*k+(res[0]!==w*n+z?' = '+vFs(res):''),'durch '+k+' = mal 1/'+k]]}}
  if(m=/^Wie lautet der Kehrbruch von (\d+)\/(\d+)\?$/.exec(q)){var a=vri(1,9),b=vri(2,9);while(a===b||(a===+m[1]&&b===+m[2]))b=vri(2,9);return {q:'Wie lautet der Kehrbruch von '+a+'/'+b+'?',a:b+'/'+a,dist:[a+'/'+b,'−'+a+'/'+b,(a+b)+'/'+b],steps:[[b+'/'+a,'Tausche oben und unten.']]}}
  if(m=/^Wie lautet der Hauptnenner von (\d+) und (\d+)\?$/.exec(q)){var D=[2,3,4,5,6,8,9,10,12],a,b;do{a=vpick(D);b=vpick(D)}while(a===b||(a===+m[1]&&b===+m[2])||gcd(a,b)===1&&false);var L=lcm(a,b);return {q:'Wie lautet der Hauptnenner von '+a+' und '+b+'?',a:String(L),dist:[a*b===L?a+b:a*b,Math.max(a,b),a+b,L*2],steps:[[String(L),'kleinste gemeinsame Zahl in beiden Einmaleins-Reihen']]}}
  if(m=/^Bei (\d+)\/(\d+): Welche Zahl ist der Nenner\?$/.exec(q)){var a=vri(1,9),b=vri(2,9);while(a===b)b=vri(2,9);return {q:'Bei '+a+'/'+b+': Welche Zahl ist der Nenner?',a:String(b),dist:[a,a+b,Math.abs(b-a)||1],steps:[[String(b),'Zähler oben, Nenner unten.']]}}
  if(m=/^Welcher Bruch zeigt (\d+) von (\d+) Stücken\?$/.exec(q)){var n=vri(3,10),z=vri(1,n-1);return {q:'Welcher Bruch zeigt '+z+' von '+n+' Stücken?',a:z+'/'+n,dist:[n+'/'+z,(z+1)+'/'+n,z+'/'+(n+1)],steps:[[z+'/'+n,'Zähler oben, Nenner unten.']],vis:[{type:'pie',parts:n,filled:z,nocap:true}]}}
  return null;
}
function varyItem(it,isExam){
  var g=null;try{g=vGen(it)}catch(e){g=null}
  if(!g||!g.q||g.a==null)return it;
  var o={},k;for(k in it)o[k]=it[k];
  o.q=g.q;
  if(g.vis!==undefined){if(g.vis)o.visuals=g.vis;else delete o.visuals}
  else if(!(g.keepVis))delete o.visuals&&0;
  if(isExam){
    o.explain=g.steps?g.steps.map(function(x){return x[0]}).join(' → '):'';
    if(it.type==='mc'){
      var corr=g.aU||g.a,suf=(it.options||[]).some(function(x){return /\s(cm|m|g|kg|km|min)$/.test(x)})?'':'';
      var dist=(g.dist||[]).map(String);dist=vdis(corr,dist,3);
      if(dist.length<(/^(Ja|Nein|ja|nein)$/.test(corr)?1:2)){return it}
      var opts=shuffle([corr].concat(dist));o.options=opts;o.answer=opts.indexOf(corr);
    }else{o.answer=g.ans||[g.a]}
  }else{
    o.a=g.aU&&it.opts?g.aU:g.a;
    if(it.opts){var corr=g.aU||g.a,dist=vdis(corr,(g.dist||[]).map(String),3);if(dist.length<(/^(Ja|Nein|ja|nein)$/.test(corr)?1:2))return it;var opts=shuffle([corr].concat(dist));o.opts=opts;o.a=corr}
    else if(it.ans||!it.opts){o.ans=g.ans||[g.a]}
    if(g.steps)o.steps=g.steps;
    if(g.hints)o.hints=g.hints;else delete o.hints;
    o.vary=1;
  }
  return o;
}
