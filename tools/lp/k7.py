"""Mathe Klasse 7-9: Generator mit Aufgabenfamilien (v4.75)"""
import sys,random
sys.path.insert(0,'.')
from core import *
from th import CHN
from math import gcd
from decimal import Decimal as D
MI='−'
T=[]
def z(n):return str(n).replace('-',MI)
def p(n):return '(%s)'%z(n) if n<0 else str(n)
def nz(n):return [z(n),str(n)] if n<0 else [str(n)]
def dc(x):
    x=D(x)
    if abs(x.as_tuple().exponent)>4:x=x.quantize(D('0.01'))
    x=x.normalize();s=format(x,'f');return s.replace('.',',')
def dz(x):
    s=dc(x);return [s,s.replace(',','.')] if ',' in s else [s]
def fr(a,b):
    g=gcd(a,b);a//=g;b//=g;return '%d/%d'%(a,b)
def wn(a,rnd,k=3,ext=()):
    c=[]
    for d in list(ext)+[1,-1,2,-2,10,-10,3,-3,5,-5]:
        x=a+d if not isinstance(d,str) else None
        if x is not None and x!=a and x not in c:c.append(x)
    if -a!=a and -a not in c:c.insert(1,-a)
    rnd.shuffle(c);c=c[:k+2]
    return c[:k]
def F(lvl,q,a,w=None,h='',s=None,ans=None):
    return dict(l=lvl,q=q,a=str(a),w=[str(x) for x in w] if w else None,h=h,s=s or [[str(a),'Ergebnis']],ans=ans)

def make(id,child,chapter,title,seed,fams,basis,ncards=36,nex=18):
    t=Topic(id,child,chapter,title,'mathe',10**9,seed=seed)
    t.th('basis',basis[0],basis[1],basis[2])
    rnd=random.Random(seed)
    tries=0
    while len(t.cards)<ncards and tries<4000:
        tries+=1
        f=fams[tries%len(fams)](rnd)
        if f['w']:
            t.card(f['l'],f['q'],f['a'],f['w'],hints=[f['h']] if f['h'] else [],steps=f['s'])
        else:
            t.card(f['l'],f['q'],f['a'],ans=f['ans'] or [f['a']],hints=[f['h']] if f['h'] else [],steps=f['s'])
    cq={c['q'] for c in t.cards}
    r2=random.Random(seed+99);tries=0
    while len(t.qs)<nex and tries<4000:
        tries+=1
        f=fams[(tries*7+3)%len(fams)](r2)
        if f['q'] in cq:continue
        inp=(len(t.qs)%2==1) and f['ans'] is not None
        if f['w'] and not inp:t.exam(f['q'],f['a'],f['w'],expl=f['a'])
        elif f['ans'] is not None:t.exam(f['q'],None,ans=f['ans'],expl=f['a'])
        elif f['w']:t.exam(f['q'],f['a'],f['w'],expl=f['a'])
    return t

def TH(t,worum,t1,t2,begr,bild_text,bild_vis,aufb,vorg_text,vorg,beisp,wicht_text,wicht):
    theory_steps(t,worum,[{"type":"scene","kind":"talk","t1":t1,"t2":t2}],begr,bild_text,bild_vis,'Das ist der Aufbau.',('Teil','Bedeutung'),aufb,vorg_text,vorg,beisp,wicht_text,wicht)

# ---------- Kl.7 Negative Zahlen ----------
def neg():
    def add(r):
        a,b=r.randint(-12,12),r.randint(-12,12);v=a+b
        return F(1,'%s + %s = ?'%(p(a),p(b)),z(v),[z(x) for x in wn(v,r)],'Starte bei %s und gehe %s %d Schritte.'%(z(a),'nach rechts' if b>=0 else 'nach links',abs(b)),[['%s + %s = %s'%(p(a),p(b),z(v)),'Zahlenstrahl']],nz(v))
    def sub(r):
        a,b=r.randint(-10,12),r.randint(-10,10);v=a-b
        return F(2,'%s − %s = ?'%(p(a),p(b)),z(v),[z(x) for x in wn(v,r)],'Minus eine negative Zahl ist Plus.' if b<0 else 'Gehe nach links.',[['%s − %s = %s'%(p(a),p(b),z(v)),'Subtrahieren']],nz(v))
    def cmp(r):
        a,b=r.sample(range(-15,0),2);m=min(a,b)
        return F(1,'Welche Zahl ist kleiner: %s oder %s?'%(z(a),z(b)),z(m),[z(max(a,b))],'Je weiter links, desto kleiner.',[[z(m),'liegt weiter links']])
    def bet(r):
        a=r.randint(2,30)*r.choice([-1,1])
        return F(1,'|%s| = ?'%z(a),abs(a),[z(-abs(a)),0,abs(a)+1],'Der Betrag ist der Abstand zur Null.',[[str(abs(a)),'Abstand']],[str(abs(a))])
    def geg(r):
        a=r.randint(2,40)*r.choice([-1,1])
        return F(1,'Wie heisst die Gegenzahl von %s?'%z(a),z(-a),[z(a),'0',z(a+1)],'Die Gegenzahl hat das andere Vorzeichen.',[[z(-a),'Gegenzahl']],nz(-a))
    def temp(r):
        a=r.randint(-12,-1);b=r.randint(3,15);v=a+b
        return F(3,'Am Morgen hat es %s °C. Bis am Mittag wird es %d Grad wärmer. Wie warm ist es am Mittag?'%(z(a),b),z(v),[z(x) for x in wn(v,r)],'Rechne %s + %d.'%(z(a),b),[['%s + %d = %s'%(p(a),b,z(v)),'Temperatur']],nz(v))
    def temp2(r):
        a=r.randint(-8,6);b=r.randint(4,14);v=a-b
        return F(3,'Es hat %s °C. In der Nacht sinkt die Temperatur um %d Grad. Wie kalt wird es?'%(z(a),b),z(v),[z(x) for x in wn(v,r)],'Rechne %s − %d.'%(p(a),b),[['%s − %d = %s'%(p(a),b,z(v)),'Temperatur']],nz(v))
    def var(r):
        a=r.randint(2,6);b=r.randint(-6,9);x=r.randint(-4,5);v=a*x+b
        return F(3,'Berechne %dx %s %d für x = %s.'%(a,'+' if b>=0 else '−',abs(b),z(x)),z(v),[z(w) for w in wn(v,r)],'Setze für x die Zahl %s ein.'%z(x),[['%d · %s %s %d = %s'%(a,p(x),'+' if b>=0 else '−',abs(b),z(v)),'Einsetzen']],nz(v))
    def var2(r):
        a=r.randint(-9,9);x=r.randint(-6,6);v=a-x
        return F(2,'Berechne %s − x für x = %s.'%(z(a) if a>=0 else z(a),z(x)),z(v),[z(w) for w in wn(v,r)],'Minus eine negative Zahl ist Plus.',[['%s − %s = %s'%(p(a),p(x),z(v)),'Einsetzen']],nz(v))
    return [add,sub,cmp,bet,geg,temp,temp2,var,var2,add,sub]
def t_neg():
    t=make('kl7-mathe-negativ','kl7','Zahlen und Terme','Negative Zahlen und Variablen',701,neg(),('Negative Zahlen','Negative Zahlen liegen links von der Null. Eine Variable ist ein Platzhalter für eine Zahl.',[['−5 + 8','= 3']]))
    TH(t,'Bei Frost zeigt das Thermometer Minusgrade. Wie warm ist es, wenn es 7 Grad wärmer wird? Das rechnest du mit negativen Zahlen. Eine Variable wie x steht für eine Zahl, die du einsetzen kannst.',
       'Es hat −3 °C!','Bis Mittag +7 Grad.',
       [['Negative Zahl','Zahl kleiner als 0','−4'],['Betrag','Abstand zur 0','|−4| = 4'],['Gegenzahl','Anderes Vorzeichen','−4 und 4'],['Variable','Platzhalter für eine Zahl','x']],
       'Auf dem Zahlenstrahl gehst du bei Plus nach rechts und bei Minus nach links.',[NL(-10,10,1,pts=[-3,4],cap='Von −3 nach 4 sind es 7 Schritte')],
       [['Plus','Nach rechts gehen'],['Minus','Nach links gehen'],['Minus minus','Wird zu Plus'],['Variable','Zahl einsetzen und rechnen']],
       'So rechnest du mit negativen Zahlen.',[['Startzahl finden','Auf dem Zahlenstrahl markieren',0],['Rechenzeichen lesen','Plus oder Minus?',1],['Schritte gehen','Nach rechts oder links',2],['Ergebnis prüfen','Liegt es sinnvoll?',3]],
       [[['−5','Start',7],['+','',2],[8,'nach rechts',0],['=','',2],[3,'Ziel',7]],[['4','Start',7],['−','',2],['−2','Gegenzahl',1],['=','',2],[6,'Ziel',7]]],
       'Merke diese Regeln.',[['Gegenzahl','Minus minus ergibt Plus','4 − (−2) = 6',0],['Betrag','Immer positiv oder 0','|−7| = 7',1],['Einsetzen','Klammern um negative Zahlen','3 · (−2)',2]])
    return t
T.append(t_neg)

# ---------- Kl.7 Wurzeln ----------
def wur():
    def sq(r):
        n=r.randint(2,20);return F(1,'%d² = ?'%n,n*n,[2*n,n*n+n,n*n-n],'Rechne %d · %d.'%(n,n),[['%d · %d = %d'%(n,n,n*n),'Quadrat']],[str(n*n)])
    def rt(r):
        n=r.randint(2,20);return F(1,'√%d = ?'%(n*n),n,[n+1,n-1,n*2],'Welche Zahl mal sich selbst gibt %d?'%(n*n),[['%d · %d = %d'%(n,n,n*n),'Probe']],[str(n)])
    def fl(r):
        a=r.randint(3,15);return F(2,'Ein Quadrat hat die Seitenlänge %d cm. Wie gross ist die Fläche in cm²?'%a,a*a,[a*4,a*2,a*a+a],'Fläche = Seite · Seite.',[['%d · %d = %d'%(a,a,a*a),'Fläche']],[str(a*a)])
    def se(r):
        a=r.randint(3,16);return F(2,'Ein Quadrat hat die Fläche %d cm². Wie lang ist eine Seite in cm?'%(a*a),a,[a+1,a-1,a*a//2],'Die Seite ist die Wurzel der Fläche.',[['√%d = %d'%(a*a,a),'Seite']],[str(a)])
    def sch(r):
        k=r.randint(3,12);n=r.randint(k*k+1,k*k+2*k);return F(3,'Zwischen welchen ganzen Zahlen liegt √%d?'%n,'%d und %d'%(k,k+1),['%d und %d'%(k-1,k),'%d und %d'%(k+1,k+2),'%d und %d'%(k-2,k-1)],'Suche die Quadratzahlen links und rechts von %d.'%n,[['%d² = %d, %d² = %d'%(k,k*k,k+1,(k+1)**2),'Nachbarquadrate']])
    def sm(r):
        a,b=r.randint(2,9),r.randint(2,9);return F(2,'√%d + √%d = ?'%(a*a,b*b),a+b,[a*b,a*a+b*b,a+b+1],'Rechne zuerst beide Wurzeln.',[['√%d = %d'%(a*a,a),'erste'],['√%d = %d'%(b*b,b),'zweite']],[str(a+b)])
    def ng(r):
        a=r.randint(2,12);return F(3,'(−%d)² = ?'%a,a*a,['−%d'%(a*a),'−%d'%(2*a),str(2*a)],'Minus mal Minus ist Plus.',[['(−%d) · (−%d) = %d'%(a,a,a*a),'Quadrat']],[str(a*a)])
    return [sq,rt,fl,se,sch,sm,ng,sq,rt]
def t_wur():
    t=make('kl7-mathe-wurzel','kl7','Zahlen und Terme','Quadratzahlen und Wurzeln',702,wur(),('Quadrat und Wurzel','Die Wurzel macht das Quadrieren rückgängig.',[['7² = 49','√49 = 7']]))
    TH(t,'Ein quadratischer Gartenplatz hat 49 m² Fläche. Wie lang ist eine Seite? Die Antwort ist die Wurzel aus 49. Quadrat und Wurzel gehören zusammen.',
       'Der Platz hat 49 m².','Eine Seite: √49 = 7 m.',
       [['Quadratzahl','Zahl mal sich selbst','7² = 49'],['Wurzel','Macht das Quadrat rückgängig','√49 = 7'],['Radikand','Zahl unter der Wurzel','49']],
       'Ein Quadrat mit Seite 7 hat die Fläche 7 · 7 = 49.',[CH([['7','Seite',0],['·','',2],['7','Seite',0],['=','',2],['49','Fläche',1]])],
       [['Quadrat','Seite · Seite'],['Wurzel','Seite aus der Fläche'],['Nachbarn','√50 liegt zwischen 7 und 8']],
       'So findest du eine Wurzel.',[['Zahl ansehen','Ist sie eine Quadratzahl?',0],['Zahl suchen','Welche Zahl mal sich selbst?',1],['Probe machen','Quadrieren',2],['Nicht genau','Zwischen zwei Quadraten schätzen',3]],
       [[['81','Fläche',1],['=','',2],['9','Seite',0],['·','',2],['9','Seite',0]],[['√50','Wurzel',7],['≈','',2],['7,07','ungefähr',1]]],
       'Merke diese Regeln.',[['Quadrat','n² = n · n','12² = 144',0],['Wurzel','√ ist die Umkehrung','√144 = 12',1],['Negativ','(−5)² = 25','Minus mal Minus',2]])
    return t
T.append(t_wur)

# ---------- Kl.7 Gleichungen ----------
def gl():
    def a1(r):
        x=r.randint(-9,15);b=r.randint(2,12);return F(1,'Löse: x + %d = %d. x = ?'%(b,x+b),z(x),[z(w) for w in wn(x,r)],'Rechne auf beiden Seiten − %d.'%b,[['x = %d − %d = %s'%(x+b,b,z(x)),'Gegenoperation']],nz(x))
    def a2(r):
        x=r.randint(2,15);a=r.randint(2,9);return F(1,'Löse: %dx = %d. x = ?'%(a,a*x),x,[x+1,x-1,a*x-a],'Teile beide Seiten durch %d.'%a,[['x = %d : %d = %d'%(a*x,a,x),'Teilen']],[str(x)])
    def a3(r):
        x=r.randint(2,12);a=r.randint(2,6);return F(2,'Löse: x : %d = %d. x = ?'%(a,x),a*x,[x,a+x,a*x+a],'Rechne auf beiden Seiten · %d.'%a,[['x = %d · %d = %d'%(x,a,a*x),'Malnehmen']],[str(a*x)])
    def a4(r):
        x=r.randint(-5,12);a=r.randint(2,7);b=r.randint(1,12);v=a*x+b
        return F(2,'Löse: %dx + %d = %s. x = ?'%(a,b,z(v)),z(x),[z(w) for w in wn(x,r)],'Zuerst − %d, dann : %d.'%(b,a),[['%dx = %d − %d = %d'%(a,v,b,a*x),'Zahl wegnehmen'],['x = %d : %d = %s'%(a*x,a,z(x)),'Teilen']],nz(x))
    def a5(r):
        x=r.randint(1,12);a=r.randint(2,7);b=r.randint(1,12);v=a*x-b
        return F(2,'Löse: %dx − %d = %d. x = ?'%(a,b,v),x,[x+1,x-1,x+b],'Zuerst + %d, dann : %d.'%(b,a),[['%dx = %d + %d = %d'%(a,v,b,a*x),'Zahl dazu'],['x = %d : %d = %d'%(a*x,a,x),'Teilen']],[str(x)])
    def a6(r):
        x=r.randint(1,9);a=r.randint(2,6);b=r.randint(1,7);v=a*(x+b)
        return F(3,'Löse: %d · (x + %d) = %d. x = ?'%(a,b,v),x,[x+b,x-1,x+1],'Teile zuerst durch %d.'%a,[['x + %d = %d : %d = %d'%(b,v,a,x+b),'Teilen'],['x = %d − %d = %d'%(x+b,b,x),'Zahl weg']],[str(x)])
    def a7(r):
        x=r.randint(2,12);a=r.randint(2,5);b=r.randint(1,9);v=a*x+b
        return F(3,'Ich denke mir eine Zahl, nehme sie mal %d und zähle %d dazu. Ergebnis: %d. Welche Zahl habe ich gedacht?'%(a,b,v),x,[x+1,x-1,v-b],'Stelle die Gleichung %dx + %d = %d auf.'%(a,b,v),[['%dx = %d'%(a,v-b),'Zahl wegnehmen'],['x = %d'%x,'Teilen']],[str(x)])
    def a8(r):
        x=r.randint(1,9);a=r.randint(2,6);b=r.randint(1,10);v=a*x+b;t=r.choice([x,x+1,x-1]);ok=a*t+b==v
        return F(3,'Ist x = %d eine Lösung von %dx + %d = %d?'%(t,a,b,v),'ja' if ok else 'nein',['nein' if ok else 'ja'],'Setze %d ein und rechne.'%t,[['%d · %d + %d = %d'%(a,t,b,a*t+b),'Probe']])
    return [a1,a2,a3,a4,a5,a6,a7,a8,a4,a5,a1]
def t_gl():
    t=make('kl7-mathe-gleichungen','kl7','Gleichungen und Terme','Lineare Gleichungen',703,gl(),('Gleichung lösen','Eine Gleichung ist wie eine Waage. Was du links machst, machst du auch rechts.',[['2x + 3 = 11','x = 4']]))
    TH(t,'Du denkst dir eine Zahl, nimmst sie mal 2 und zählst 3 dazu. Das Ergebnis ist 11. Welche Zahl war es? Mit einer Gleichung findest du sie.',
       'Ich denke mir x. 2x + 3 = 11.','Dann ist x = 4!',
       [['Gleichung','Zwei Terme mit = dazwischen','2x + 3 = 11'],['Unbekannte','Gesuchte Zahl','x'],['Lösung','Zahl, die passt','x = 4'],['Probe','Zahl einsetzen','2 · 4 + 3 = 11']],
       'Die Gleichung ist im Gleichgewicht. Du nimmst auf beiden Seiten dasselbe weg.',[CH([['2x + 3','links',0],['=','',2],['11','rechts',1]]),CH([['2x','links',0],['=','',2],['8','rechts',1]])],
       [['Links','Alles mit x'],['Rechts','Das Ergebnis'],['Gegenoperation','Plus ↔ Minus, Mal ↔ Geteilt']],
       'So löst du eine Gleichung.',[['Zahl ohne x wegnehmen','Mit der Gegenoperation',0],['x allein stellen','Durch die Zahl vor x teilen',1],['Lösung aufschreiben','x = …',2],['Probe machen','Einsetzen und vergleichen',3]],
       [[['2x + 3','Gleichung',0],['=','',2],['11','',1],['→','',2],['2x = 8','−3',2]],[['2x = 8','',0],['→','',2],['x = 4',':2',1]]],
       'Merke diese Regeln.',[['Waage','Links und rechts dasselbe tun','−3 auf beiden Seiten',0],['Gegenoperation','Plus ↔ Minus','+3 ↔ −3',1],['Probe','Lösung einsetzen','2 · 4 + 3 = 11',2]])
    return t
T.append(t_gl)

# ---------- Kl.7 Prozent ----------
def pz():
    Gs=[40,60,80,120,200,240,300,400,500,600,800,1000,50,150,250,350]
    ps=[5,10,15,20,25,30,40,50,60,75]
    def pairs(r):
        while True:
            G=r.choice(Gs);q=r.choice(ps)
            if G*q%100==0:return G,q,G*q//100
    def w(r):
        G,q,W=pairs(r);return F(1,'Wie viel sind %d %% von %d?'%(q,G),W,[W+q,W*2,G-W],'Rechne %d : 100 · %d.'%(G,q),[['%d : 100 = %s'%(G,dc(D(G)/100)),'1 %'],['%s · %d = %d'%(dc(D(G)/100),q,W),'%d %%'%q]],[str(W)])
    def pr(r):
        G,q,W=pairs(r);return F(2,'Von %d Schülern fehlen %d. Wie viel Prozent fehlen?'%(G,W),'%d %%'%q,['%d %%'%(q+5),'%d %%'%max(q-5,1),'%d %%'%(q*2)],'Prozentsatz = Teil : Ganzes · 100.',[['%d : %d = %s'%(W,G,dc(D(W)/G)),'Anteil'],['%s · 100 = %d %%'%(dc(D(W)/G),q),'Prozent']],[str(q),'%d %%'%q,'%d%%'%q])
    def gr(r):
        G,q,W=pairs(r);return F(2,'%d %% eines Betrags sind %d Fr. Wie viel Franken sind 100 %%?'%(q,W),G,[W*2,G+q,G-q],'Teile durch %d und rechne mal 100.'%q,[['%d : %d = %s'%(W,q,dc(D(W)/q)),'1 %'],['%s · 100 = %d'%(dc(D(W)/q),G),'100 %']],[str(G)])
    def rb(r):
        G,q,W=pairs(r);return F(3,'Ein Pulli kostet %d Fr. Es gibt %d %% Rabatt. Wie viel kostet er jetzt?'%(G,q),G-W,[W,G+W,G-W+q],'Rechne zuerst den Rabatt aus.',[['%d %% von %d = %d'%(q,G,W),'Rabatt'],['%d − %d = %d'%(G,W,G-W),'neuer Preis']],[str(G-W)])
    def au(r):
        G,q,W=pairs(r);return F(3,'Ein Velo kostet %d Fr. Der Preis steigt um %d %%. Wie viel kostet es danach?'%(G,q),G+W,[W,G-W,G+W+q],'Rechne zuerst den Aufschlag aus.',[['%d %% von %d = %d'%(q,G,W),'Aufschlag'],['%d + %d = %d'%(G,W,G+W),'neuer Preis']],[str(G+W)])
    def br(r):
        a,b,c=r.choice([('50 %','1/2','0,5'),('25 %','1/4','0,25'),('75 %','3/4','0,75'),('10 %','1/10','0,1'),('20 %','1/5','0,2'),('5 %','1/20','0,05')])
        return F(1,'Wie heisst %s als Bruch?'%a,b,[x for x in['1/2','1/4','3/4','1/10','1/5','1/20'] if x!=b][:3],'Prozent heisst „von hundert“.',[[b,'gekürzter Bruch']])
    def dz_(r):
        a,b=r.choice([('0,3','30'),('0,45','45'),('0,6','60'),('0,08','8'),('0,15','15'),('0,9','90')])
        return F(1,'%s als Prozent: wie viel %%?'%a,b+' %',[x+' %' for x in['3','30','300','0,3','45','6','60'] if x!=b][:3],'Multipliziere mit 100.',[[b+' %','Prozent']],[b,b+' %',b+'%'])
    return [w,pr,gr,rb,au,br,dz_,w,pr,rb,gr]
def t_pz():
    t=make('kl7-mathe-prozent','kl7','Prozent und Verhältnisse','Prozentrechnen',704,pz(),('Prozent','Prozent heisst „von hundert“. 1 % ist der hundertste Teil.',[['50 %','= 1/2']]))
    TH(t,'Im Laden steht: 25 % Rabatt auf einen Pulli für 80 Fr. Wie viel sparst du? Dafür rechnest du mit Prozent.',
       'Der Pulli: 25 % Rabatt!','Das sind 20 Fr. gespart.',
       [['Grundwert','Das Ganze (100 %)','80 Fr.'],['Prozentsatz','Der Anteil in %','25 %'],['Prozentwert','Der Teil vom Ganzen','20 Fr.']],
       'Das Ganze ist 100 %. Der Prozentwert ist ein Teil davon.',[{"type":"bar","segs":[[25,'25 %'],[75,'75 %']],"cap":"25 % von 80 Fr. sind 20 Fr.","col":0}],
       [['100 %','Grundwert'],['1 %','Grundwert : 100'],['p %','1 % · p']],
       'So rechnest du Prozent.',[['Grundwert finden','Das ist 100 %',0],['1 % ausrechnen','Durch 100 teilen',1],['Mit p malnehmen','Prozentwert',2],['Antwort schreiben','Mit Einheit',3]],
       [[['80','Grundwert',7],['÷','',2],['100','',2],['=','',2],['0,8','1 %',0]],[['0,8','1 %',0],['·','',2],['25','',1],['=','',2],['20','Wert',1]]],
       'Merke diese Regeln.',[['1 %','Grundwert : 100','80 : 100 = 0,8',0],['Rabatt','Preis − Prozentwert','80 − 20 = 60',1],['Aufschlag','Preis + Prozentwert','80 + 20 = 100',2]])
    return t
T.append(t_pz)

# ---------- Kl.7 Dreisatz ----------
def ds():
    def pr(r):
        k=r.randint(2,9);a=r.randint(2,8);b=r.choice([x for x in range(3,14) if x!=a]);it=r.choice(['kg Äpfel','kg Kartoffeln','m Stoff','kg Reis'])
        return F(1,'%d %s kosten %d Fr. Wie viel kosten %d %s?'%(a,it,a*k,b,it.split(' ')[0]),'%d'%(b*k),[b*k+k,b*k-k,a*b],'Rechne zuerst den Preis für 1.',[['%d : %d = %d'%(a*k,a,k),'Preis für 1'],['%d · %d = %d'%(k,b,b*k),'Preis für %d'%b]],[str(b*k)])
    def sp(r):
        v=r.randint(40,90);h1=r.randint(2,4);h2=r.choice([x for x in range(5,9)]);return F(2,'Ein Zug fährt in %d Stunden %d km. Wie weit kommt er in %d Stunden?'%(h1,v*h1,h2),v*h2,[v*h2+v,v*h2-v,v*(h1+h2)],'Rechne zuerst die km für 1 Stunde.',[['%d : %d = %d'%(v*h1,h1,v),'km pro Stunde'],['%d · %d = %d'%(v,h2,v*h2),'km in %d h'%h2]],[str(v*h2)])
    def an(r):
        a,t_=r.choice([(6,8),(4,12),(3,10),(8,6),(5,12),(6,10)]);b=r.choice([x for x in (2,3,4,5,6,10,12,15,20) if (a*t_)%x==0 and x!=a])
        return F(3,'%d Arbeiter brauchen %d Tage für eine Arbeit. Wie viele Tage brauchen %d Arbeiter?'%(a,t_,b),a*t_//b,[a*t_//b+2,a*t_//b-1,t_*b//a if (t_*b)%a==0 else t_+b],'Mehr Arbeiter brauchen weniger Tage. Rechne zuerst die Arbeitstage insgesamt.',[['%d · %d = %d'%(a,t_,a*t_),'Arbeitstage'],['%d : %d = %d'%(a*t_,b,a*t_//b),'Tage']],[str(a*t_//b)])
    def rz(r):
        n=r.choice([2,4,5]);g=r.choice([50,75,100]);m=r.choice([x for x in (3,6,8,10) if x!=n]);return F(2,'Für %d Personen braucht man %d g Reis. Wie viele Gramm braucht man für %d Personen?'%(n,n*g,m),m*g,[m*g+g,m*g-g,n*m],'Rechne zuerst für 1 Person.',[['%d : %d = %d'%(n*g,n,g),'für 1 Person'],['%d · %d = %d'%(g,m,m*g),'für %d'%m]],[str(m*g)])
    def ty(r):
        q,kind=r.choice([('Je mehr Äpfel, desto mehr kosten sie.','proportional'),('Je mehr Arbeiter, desto weniger Tage.','umgekehrt proportional'),('Je schneller das Auto, desto kürzer die Fahrzeit.','umgekehrt proportional'),('Je mehr Liter Benzin, desto höher der Preis.','proportional')])
        return F(2,'%s Welche Zuordnung ist das?'%q,kind,['proportional' if kind!='proportional' else 'umgekehrt proportional'],'Wird der eine Wert grösser: wird der andere auch grösser?',[[kind,'Zuordnung']])
    return [pr,sp,an,rz,ty,pr,sp,rz,an,pr]
def t_ds():
    t=make('kl7-mathe-dreisatz','kl7','Prozent und Verhältnisse','Dreisatz',705,ds(),('Dreisatz','Beim Dreisatz rechnest du zuerst auf 1 und dann auf die gesuchte Menge.',[['3 kg = 12 Fr.','1 kg = 4 Fr.']]))
    TH(t,'3 kg Äpfel kosten 12 Fr. Wie viel kosten 5 kg? Du rechnest zuerst den Preis für 1 kg aus. Dann nimmst du ihn mal 5.',
       '3 kg kosten 12 Fr.','Dann kosten 5 kg 20 Fr.',
       [['Proportional','Doppelt so viel, doppelt so teuer','kg und Preis'],['Umgekehrt proportional','Doppelt so viele, halb so lange','Arbeiter und Tage'],['Dreisatz','Auf 1 zurückrechnen','Preis für 1']],
       'Drei Sätze: gegeben, auf 1, gesucht.',[CH([['3 kg','gegeben',0],['→','',2],['12 Fr.','',1]]),CH([['1 kg','auf 1',0],['→','',2],['4 Fr.','',1]]),CH([['5 kg','gesucht',0],['→','',2],['20 Fr.','',1]])],
       [['Satz 1','Gegebene Werte'],['Satz 2','Wert für 1'],['Satz 3','Gesuchter Wert']],
       'So löst du einen Dreisatz.',[['Zuordnung erkennen','Proportional oder umgekehrt?',0],['Auf 1 zurückrechnen','Teilen oder malnehmen',1],['Auf gesuchte Menge rechnen','Mit der neuen Zahl',2],['Antwort schreiben','Mit Einheit',3]],
       [[['12 Fr. : 3','',7],['=','',2],['4 Fr.','für 1 kg',0]],[['4 Fr. · 5','',7],['=','',2],['20 Fr.','für 5 kg',1]]],
       'Merke diese Regeln.',[['Proportional','Beide Werte steigen','mehr kg, mehr Fr.',0],['Umgekehrt','Einer steigt, einer sinkt','mehr Leute, weniger Tage',1],['Einheit','Immer mitschreiben','Fr., kg, Tage',2]])
    return t
T.append(t_ds)

# ---------- Kl.7 Winkel und Dreiecke ----------
def wk():
    def d3(r):
        a=r.randint(30,80);b=r.randint(30,80)
        while a+b>=170:b=r.randint(30,70)
        return F(1,'Ein Dreieck hat die Winkel %d° und %d°. Wie gross ist der dritte Winkel?'%(a,b),180-a-b,[180-a,a+b,90-a-b+10],'Die Winkelsumme ist 180°.',[['%d + %d = %d'%(a,b,a+b),'zwei Winkel'],['180 − %d = %d'%(a+b,180-a-b),'dritter Winkel']],[str(180-a-b),'%d°'%(180-a-b)])
    def nb(r):
        a=r.randint(20,160);return F(1,'Der Winkel α misst %d°. Wie gross ist sein Nebenwinkel β?'%a,180-a,[90-a if a<90 else a-90,360-a,a],'Nebenwinkel ergeben zusammen 180°.',[['180 − %d = %d'%(a,180-a),'Nebenwinkel']],[str(180-a),'%d°'%(180-a)])
    def sw(r):
        a=r.randint(20,160);return F(1,'Der Winkel α misst %d°. Wie gross ist der Scheitelwinkel?'%a,a,[180-a,360-a,a+10],'Scheitelwinkel sind gleich gross.',[['Scheitelwinkel = %d°'%a,'gleich gross']],[str(a),'%d°'%a])
    def gs(r):
        s=r.choice([20,30,40,50,60,80,100]);b=(180-s)//2;return F(2,'Ein gleichschenkliges Dreieck hat an der Spitze %d°. Wie gross ist ein Basiswinkel?'%s,b,[180-s,s,b+10],'Die beiden Basiswinkel sind gleich gross.',[['180 − %d = %d'%(s,180-s),'beide Basiswinkel'],['%d : 2 = %d'%(180-s,b),'ein Basiswinkel']],[str(b),'%d°'%b])
    def gs2(r):
        b=r.choice([35,40,45,50,55,65,70]);return F(2,'Ein gleichschenkliges Dreieck hat Basiswinkel von je %d°. Wie gross ist der Winkel an der Spitze?'%b,180-2*b,[180-b,2*b,90-b],'Zähle beide Basiswinkel zusammen.',[['2 · %d = %d'%(b,2*b),'beide Basiswinkel'],['180 − %d = %d'%(2*b,180-2*b),'Spitze']],[str(180-2*b),'%d°'%(180-2*b)])
    def vi(r):
        a,b,c=r.sample(range(60,130,5),3);v=360-a-b-c
        if v<=0 or v>=180:return d3(r)
        return F(2,'Ein Viereck hat die Winkel %d°, %d° und %d°. Wie gross ist der vierte Winkel?'%(a,b,c),v,[180-a-b-c if 180-a-b-c>0 else 90,v+10,v-10],'Die Winkelsumme im Viereck ist 360°.',[['360 − %d = %d'%(a+b+c,v),'vierter Winkel']],[str(v),'%d°'%v])
    def rw(r):
        a=r.randint(20,70);return F(1,'Ein rechtwinkliges Dreieck hat einen Winkel von %d°. Wie gross ist der dritte Winkel?'%a,90-a,[180-a,a,90+a],'Ein Winkel ist 90°. Alle zusammen sind 180°.',[['180 − 90 − %d = %d'%(a,90-a),'dritter Winkel']],[str(90-a),'%d°'%(90-a)])
    def ar(r):
        a,n=r.choice([(120,'stumpf'),(45,'spitz'),(90,'rechtwinklig'),(150,'stumpf'),(30,'spitz'),(135,'stumpf'),(60,'spitz')])
        return F(1,'Ein Winkel von %d° ist …'%a,n,[x for x in['spitzer Winkel','rechter Winkel','stumpfer Winkel'] if x.startswith(n[:3]) is False][:2] and [{'spitz':'stumpf','stumpf':'spitz','rechtwinklig':'spitz'}[n],'gestreckt'],'Spitz < 90°, rechtwinklig = 90°, stumpf > 90°.',[[n,'Art']])
    return [d3,nb,sw,gs,gs2,vi,rw,ar,d3,nb,sw]
def t_wk():
    t=make('kl7-mathe-winkel-dreiecke','kl7','Geometrie','Winkel und Dreiecke',706,wk(),('Winkelsumme','Im Dreieck ergeben alle Winkel zusammen 180°.',[['50° + 60° + 70°','= 180°']]))
    TH(t,'Du schneidest eine Pizza in drei Stücke. Die Winkel in der Mitte ergeben zusammen einen ganzen Kreis. Bei Dreiecken ergeben alle Winkel zusammen 180°.',
       'Zwei Winkel: 50° und 60°.','Der dritte ist 70°!',
       [['Winkelsumme','Alle Winkel zusammen','Dreieck: 180°'],['Nebenwinkel','Ergeben zusammen 180°','65° und 115°'],['Scheitelwinkel','Gleich gross','48° und 48°'],['Basiswinkel','Beide gleich im gleichschenkligen Dreieck','70° und 70°']],
       'Im Dreieck passen drei Winkel zu einer Geraden zusammen: 180°.',[CH([['50°','α',0],['+','',2],['60°','β',1],['+','',2],['70°','γ',2],['=','',2],['180°','Summe',7]])],
       [['Dreieck','180°'],['Viereck','360°'],['Gerade (Nebenwinkel)','180°']],
       'So findest du einen Winkel.',[['Figur erkennen','Dreieck oder Viereck?',0],['Winkelsumme wählen','180° oder 360°',1],['Bekannte Winkel addieren','Zusammenzählen',2],['Vom Total abziehen','Gesuchter Winkel',3]],
       [[['180°','Summe',7],['−','',2],['110°','50° + 60°',0],['=','',2],['70°','γ',1]],[['180°','Gerade',7],['−','',2],['65°','α',0],['=','',2],['115°','β',1]]],
       'Merke diese Regeln.',[['Dreieck','α + β + γ = 180°','50° + 60° + 70°',0],['Nebenwinkel','Zusammen 180°','65° + 115°',1],['Scheitelwinkel','Gleich gross','48° = 48°',2]])
    return t
T.append(t_wk)

# ---------- Kl.7 Zinsrechnen ----------
def zi():
    Ks=[500,800,1000,1500,2000,2500,4000,5000]
    def pr(r):
        while True:
            K=r.choice(Ks);q=r.choice([1,2,3,4,5,6])
            if K*q%100==0:return K,q,K*q//100
    def z1(r):
        K,q,Z=pr(r);return F(1,'Du legst %d Fr. für 1 Jahr zu %d %% Zins an. Wie viel Zins bekommst du?'%(K,q),Z,[Z*2,Z+q,K+Z],'Zins = Kapital · Zinssatz : 100.',[['%d : 100 = %s'%(K,dc(D(K)/100)),'1 %'],['%s · %d = %d'%(dc(D(K)/100),q,Z),'Zins']],[str(Z)])
    def z2(r):
        K,q,Z=pr(r);return F(2,'Auf %d Fr. gibt es in einem Jahr %d Fr. Zins. Wie hoch ist der Zinssatz in Prozent?'%(K,Z),'%d %%'%q,['%d %%'%(q+1),'%d %%'%max(q-1,1),'%d %%'%(q*2)],'Zinssatz = Zins : Kapital · 100.',[['%d : %d = %s'%(Z,K,dc(D(Z)/K)),'Anteil'],['· 100 = %d %%'%q,'Zinssatz']],[str(q),'%d %%'%q,'%d%%'%q])
    def z3(r):
        K,q,Z=pr(r);return F(3,'Bei %d %% Zins gibt es im Jahr %d Fr. Zins. Wie gross ist das Kapital?'%(q,Z),K,[K//2,K+Z,Z*q],'Rechne zuerst 1 % aus.',[['%d : %d = %s'%(Z,q,dc(D(Z)/q)),'1 %'],['· 100 = %d'%K,'Kapital']],[str(K)])
    def z4(r):
        K,q,Z=pr(r);return F(2,'Du legst %d Fr. zu %d %% an. Wie viel Geld hast du nach einem Jahr?'%(K,q),K+Z,[Z,K+2*Z,K-Z],'Kapital plus Zins.',[['Zins: %d'%Z,'1 Jahr'],['%d + %d = %d'%(K,Z,K+Z),'Endbetrag']],[str(K+Z)])
    def z5(r):
        while True:
            K=r.choice(Ks);q=r.choice([2,4,6]);
            if K*q%200==0:break
        Z=K*q//200;return F(3,'Du legst %d Fr. zu %d %% für 6 Monate an. Wie viel Zins bekommst du?'%(K,q),Z,[Z*2,Z+q,Z//2 if Z%2==0 else Z+1],'6 Monate sind ein halbes Jahr.',[['Jahreszins: %d'%(K*q//100),'ein Jahr'],['%d : 2 = %d'%(K*q//100,Z),'halbes Jahr']],[str(Z)])
    return [z1,z2,z3,z4,z5,z1,z2,z4]
def t_zi():
    t=make('kl7-mathe-zins','kl7','Prozent und Verhältnisse','Zinsrechnen',707,zi(),('Zins','Zins ist der Preis für geliehenes Geld. Er wird in Prozent pro Jahr angegeben.',[['1000 Fr. zu 2 %','= 20 Fr. Zins']]))
    TH(t,'Du bringst 1000 Fr. auf die Bank. Dafür bekommst du nach einem Jahr Zins. Bei 2 % sind das 20 Fr. Zins ist Prozentrechnen mit Geld.',
       'Ich lege 1000 Fr. an.','Bei 2 % gibt es 20 Fr. Zins.',
       [['Kapital','Das angelegte Geld','1000 Fr.'],['Zinssatz','Prozent pro Jahr','2 %'],['Zins','Geld für ein Jahr','20 Fr.']],
       'Der Zins ist ein Prozentwert vom Kapital.',[{"type":"bar","segs":[[2,'2 %'],[98,'98 %']],"cap":"2 % von 1000 Fr.","col":0}],
       [['Kapital','Grundwert'],['Zinssatz','Prozentsatz'],['Zins','Prozentwert']],
       'So rechnest du Zinsen.',[['Kapital lesen','Das ist 100 %',0],['1 % ausrechnen','Kapital : 100',1],['Mit Zinssatz malnehmen','Zins',2],['Endbetrag','Kapital + Zins',3]],
       [[['1000','Kapital',7],['÷','',2],['100','',2],['=','',2],['10','1 %',0]],[['10','1 %',0],['·','',2],['2','Zinssatz',1],['=','',2],['20','Zins',2]]],
       'Merke diese Regeln.',[['Zins','K · p : 100','1000 · 2 : 100 = 20',0],['Halbes Jahr','Zins durch 2','20 : 2 = 10',1],['Endbetrag','Kapital + Zins','1000 + 20 = 1020',2]])
    return t
T.append(t_zi)

# ---------- Kl.8 Terme ----------
def tm():
    def v1(r):
        a,b=r.randint(2,9),r.randint(2,9);x=r.choice('xyab');return F(1,'Vereinfache: %d%s + %d%s'%(a,x,b,x),'%d%s'%(a+b,x),['%d%s'%(a*b,x),'%d%s²'%(a+b,x),'%d%s'%(a+b+1,x)],'Gleiche Variablen zusammenzählen.',[['%d + %d = %d'%(a,b,a+b),'Zahlen vor %s'%x]],['%d%s'%(a+b,x)])
    def v2(r):
        a,b=r.randint(2,6),r.randint(7,12);x=r.choice('xyab');return F(1,'Vereinfache: %d%s − %d%s'%(b,x,a,x),'%d%s'%(b-a,x),['%d%s'%(b+a,x),'%d%s'%(b*a,x),'%d%s'%(b-a+1,x)],'Gleiche Variablen abziehen.',[['%d − %d = %d'%(b,a,b-a),'Zahlen vor %s'%x]],['%d%s'%(b-a,x)])
    def am(r):
        a,b=r.randint(2,7),r.randint(2,9);return F(2,'Multipliziere aus: %d · (x + %d)'%(a,b),'%dx + %d'%(a,a*b),['%dx + %d'%(a,b),'x + %d'%(a*b),'%dx + %d'%(a+b,a*b)],'Mal jeden Summanden nehmen.',[['%d · x = %dx'%(a,a),'erster'],['%d · %d = %d'%(a,b,a*b),'zweiter']])
    def am2(r):
        a,b=r.randint(2,7),r.randint(2,9);return F(2,'Multipliziere aus: %d · (x − %d)'%(a,b),'%dx − %d'%(a,a*b),['%dx − %d'%(a,b),'x − %d'%(a*b),'%dx + %d'%(a,a*b)],'Mal jeden Summanden nehmen.',[['%d · x = %dx'%(a,a),'erster'],['%d · %d = %d'%(a,b,a*b),'zweiter']])
    def b1(r):
        a=r.randint(2,9);return F(3,'(x + %d)² = ?'%a,'x² + %dx + %d'%(2*a,a*a),['x² + %d'%(a*a),'x² + %dx + %d'%(a,a*a),'x² + %dx + %d'%(2*a,2*a)],'Erste binomische Formel: (a + b)² = a² + 2ab + b².',[['x²','a²'],['2 · x · %d = %dx'%(a,2*a),'2ab'],['%d² = %d'%(a,a*a),'b²']])
    def b2(r):
        a=r.randint(2,9);return F(3,'(x − %d)² = ?'%a,'x² − %dx + %d'%(2*a,a*a),['x² − %d'%(a*a),'x² − %dx − %d'%(2*a,a*a),'x² + %dx + %d'%(2*a,a*a)],'Zweite binomische Formel: (a − b)² = a² − 2ab + b².',[['x²','a²'],['2 · x · %d = %dx'%(a,2*a),'−2ab'],['%d² = %d'%(a,a*a),'+b²']])
    def b3(r):
        a=r.randint(2,12);return F(3,'(x + %d)(x − %d) = ?'%(a,a),'x² − %d'%(a*a),['x² + %d'%(a*a),'x² − %dx'%(2*a),'x² − %dx + %d'%(2*a,a*a)],'Dritte binomische Formel: (a + b)(a − b) = a² − b².',[['x²','a²'],['%d² = %d'%(a,a*a),'−b²']])
    def zh(r):
        a=r.randint(2,12);return F(3,'Faktorisiere: x² − %d = (x + %d)(?)'%(a*a,a),'x − %d'%a,['x + %d'%a,'x − %d'%(a*a),'%d − x'%a],'Das ist die dritte binomische Formel rückwärts.',[['x² − %d² = (x + %d)(x − %d)'%(a,a,a),'Formel']])
    def zl(r):
        a=r.choice([11,12,13,14,15,19,21,22,31]);return F(3,'Berechne %d² mit der ersten binomischen Formel.'%a,a*a,[a*a-a,a*a+a,2*a],'Zerlege %d in %d + %d.'%(a,(a//10)*10,a%10),[['(%d + %d)² = %d² + 2·%d·%d + %d²'%((a//10)*10,a%10,(a//10)*10,(a//10)*10,a%10,a%10),'Formel'],['%d'%(a*a),'Ergebnis']],[str(a*a)])
    return [v1,v2,am,am2,b1,b2,b3,zh,zl,am,am2]
def t_tm():
    t=make('kl8-mathe-terme','kl8','Terme und Gleichungen','Terme und binomische Formeln',801,tm(),('Binomische Formeln','Mit den binomischen Formeln multiplizierst du Klammern schnell aus.',[['(a+b)²','a² + 2ab + b²']]))
    TH(t,'Ein quadratischer Garten hat die Seite x + 3. Seine Fläche ist (x + 3)². Mit den binomischen Formeln rechnest du diese Fläche ohne Klammer aus.',
       'Seite: x + 3. Fläche?','(x + 3)² = x² + 6x + 9',
       [['Term','Rechenausdruck mit Variablen','3x + 5'],['Ausmultiplizieren','Klammer auflösen','2(x + 3) = 2x + 6'],['Binom','Summe oder Differenz in der Klammer','(x + 3)'],['Faktorisieren','Als Produkt schreiben','x² − 9 = (x+3)(x−3)']],
       'Das Quadrat mit Seite x + 3 besteht aus vier Teilen: x², zweimal 3x und 9.',[CH([['x²','Quadrat',0],['+','',2],['3x','Streifen',1],['+','',2],['3x','Streifen',1],['+','',2],['9','Eckstück',2]])],
       [['1. Formel','(a + b)² = a² + 2ab + b²'],['2. Formel','(a − b)² = a² − 2ab + b²'],['3. Formel','(a + b)(a − b) = a² − b²']],
       'So wendest du eine Formel an.',[['Form erkennen','Plus, Minus oder gemischt?',0],['a und b bestimmen','Was ist a, was b?',1],['Formel einsetzen','a², 2ab, b²',2],['Zusammenfassen','Ergebnis schreiben',3]],
       [[['(x + 5)²','Aufgabe',7],['=','',2],['x²','a²',0],['+','',2],['10x','2ab',1],['+','',2],['25','b²',2]],[['(x + 4)(x − 4)','Aufgabe',7],['=','',2],['x²','a²',0],['−','',2],['16','b²',2]]],
       'Merke diese Regeln.',[['Mittelterm','Der Mittelterm heisst 2ab','2 · x · 5 = 10x',0],['Vorzeichen','Minus gibt Minus im Mittelterm','(x − 5)² = x² − 10x + 25',1],['Dritte Formel','Kein Mittelterm','(x+5)(x−5) = x² − 25',2]])
    return t
T.append(t_tm)

# ---------- Kl.8 Kreis und Prisma ----------
def kp():
    PI=D('3.14')
    def um(r):
        rr=r.choice([5,10,15,20,25,30,50]);U=2*rr*PI;return F(1,'Ein Kreis hat den Radius %d cm. Wie gross ist der Umfang in cm? (π ≈ 3,14)'%rr,dc(U),[dc(U/2),dc(PI*rr*rr),dc(U+rr)],'Umfang = 2 · r · π.',[['2 · %d = %d'%(rr,2*rr),'Durchmesser'],['%d · 3,14 = %s'%(2*rr,dc(U)),'Umfang']],dz(U))
    def fl(r):
        rr=r.choice([2,3,4,5,10,20]);A=PI*rr*rr;return F(2,'Ein Kreis hat den Radius %d cm. Wie gross ist die Fläche in cm²? (π ≈ 3,14)'%rr,dc(A),[dc(2*rr*PI),dc(PI*rr),dc(A*2)],'Fläche = r · r · π.',[['%d · %d = %d'%(rr,rr,rr*rr),'r · r'],['%d · 3,14 = %s'%(rr*rr,dc(A)),'Fläche']],dz(A))
    def dr(r):
        d=r.choice([8,12,16,24,30,40,50]);U=d*PI;return F(2,'Ein Kreis hat den Durchmesser %d cm. Wie gross ist der Umfang in cm? (π ≈ 3,14)'%d,dc(U),[dc(U*2),dc(PI*d*d/4),dc(U/2)],'Umfang = d · π.',[['%d · 3,14 = %s'%(d,dc(U)),'Umfang']],dz(U))
    def qu(r):
        a,b,c=r.randint(2,9),r.randint(2,9),r.randint(2,9);return F(1,'Ein Prisma hat die rechteckige Grundfläche %d cm × %d cm und die Höhe %d cm. Wie gross ist das Volumen in cm³?'%(a,b,c),a*b*c,[a*b+c,a+b+c,2*(a*b+b*c+a*c)],'Volumen = Grundfläche · Höhe.',[['%d · %d = %d'%(a,b,a*b),'Grundfläche'],['%d · %d = %d'%(a*b,c,a*b*c),'Volumen']],[str(a*b*c)])
    def tr(r):
        g,h,k=r.choice([4,6,8,10,12]),r.randint(2,9),r.randint(3,12);G=g*h//2;return F(3,'Ein Prisma hat ein Dreieck als Grundfläche (Grundseite %d cm, Höhe %d cm). Das Prisma ist %d cm hoch. Wie gross ist das Volumen in cm³?'%(g,h,k),G*k,[g*h*k,G+k,g*h+k],'Grundfläche des Dreiecks = g · h : 2.',[['%d · %d : 2 = %d'%(g,h,G),'Grundfläche'],['%d · %d = %d'%(G,k,G*k),'Volumen']],[str(G*k)])
    def mt(r):
        a,b,c=r.randint(2,8),r.randint(2,8),r.randint(3,10);U=2*(a+b);return F(3,'Ein Prisma hat die rechteckige Grundfläche %d cm × %d cm und die Höhe %d cm. Wie gross ist die Mantelfläche in cm²?'%(a,b,c),U*c,[a*b*c,U*c+2*a*b,U+c],'Mantel = Umfang der Grundfläche · Höhe.',[['2 · (%d + %d) = %d'%(a,b,U),'Umfang'],['%d · %d = %d'%(U,c,U*c),'Mantel']],[str(U*c)])
    def hv(r):
        G,h=r.choice([12,15,20,24,30,40]),r.randint(2,9);return F(3,'Ein Prisma hat das Volumen %d cm³ und die Grundfläche %d cm². Wie hoch ist es in cm?'%(G*h,G),h,[h+1,h-1,G],'Höhe = Volumen : Grundfläche.',[['%d : %d = %d'%(G*h,G,h),'Höhe']],[str(h)])
    return [um,fl,dr,qu,tr,mt,hv,um,fl,qu,tr]
def t_kp():
    t=make('kl8-mathe-kreis-prisma','kl8','Geometrie','Kreis und Prisma',802,kp(),('Kreis und Prisma','Kreis: U = 2·r·π und A = r·r·π. Prisma: V = Grundfläche · Höhe.',[['r = 5 cm','U = 31,4 cm']]),ncards=34)
    TH(t,'Ein Velorad hat 50 cm Radius. Wie weit rollt es bei einer Umdrehung? Das ist der Umfang des Kreises. Bei einem Prisma rechnest du das Volumen aus Grundfläche mal Höhe.',
       'Das Rad hat r = 50 cm.','Eine Runde: 314 cm.',
       [['Radius r','Mitte bis Rand','50 cm'],['Umfang U','Länge um den Kreis','2 · r · π'],['Fläche A','Inhalt des Kreises','r · r · π'],['Prisma','Grundfläche mal Höhe','V = G · h']],
       'Der Umfang ist etwas mehr als dreimal der Durchmesser.',[{"type":"circle","show":"both","lr":"r","ld":"d"},CH([['d','Durchmesser',0],['·','',2],['π','3,14',1],['=','',2],['U','Umfang',2]])],
       [['Umfang','U = 2 · r · π'],['Fläche','A = r · r · π'],['Prisma','V = G · h']],
       'So rechnest du mit dem Kreis.',[['Radius oder Durchmesser?','Aufgabe lesen',0],['Formel wählen','Umfang oder Fläche',1],['π einsetzen','3,14 nehmen',2],['Einheit setzen','cm oder cm²',3]],
       [[['2 · 5','Durchmesser',0],['=','',2],['10','cm',0],['·','',2],['3,14','π',1],['=','',2],['31,4','U',2]],[['5 · 5','r · r',0],['=','',2],['25','',0],['·','',2],['3,14','π',1],['=','',2],['78,5','A',2]]],
       'Merke diese Regeln.',[['Umfang','Länge in cm','U = 2 · r · π',0],['Fläche','Inhalt in cm²','A = r · r · π',1],['Prisma','Volumen in cm³','V = G · h',2]])
    return t
T.append(t_kp)

# ---------- Kl.8 Lineare Funktionen ----------
def lf():
    def w(r):
        m=r.randint(-4,5) or 2;q=r.randint(-6,8);x=r.randint(-4,6);v=m*x+q
        return F(1,'f(x) = %s. Berechne f(%s).'%(fs(m,q),z(x)),z(v),[z(u) for u in wn(v,r)],'Setze x = %s ein.'%z(x),[['%d · %s %s %d = %s'%(m,p(x),'+' if q>=0 else '−',abs(q),z(v)),'Einsetzen']],nz(v))
    def st(r):
        m=r.randint(-3,4) or 3;x1,y1=r.randint(-2,3),r.randint(-3,4);dx=r.randint(1,3);x2=x1+dx;y2=y1+m*dx
        return F(2,'Eine Gerade geht durch P(%s|%s) und Q(%s|%s). Wie gross ist die Steigung m?'%(z(x1),z(y1),z(x2),z(y2)),z(m),[z(u) for u in wn(m,r)],'m = Höhenunterschied : Breitenunterschied.',[['%s − %s = %s'%(p(y2),p(y1),z(y2-y1)),'nach oben'],['%s − %s = %d'%(p(x2),p(x1),dx),'nach rechts'],['%s : %d = %s'%(z(y2-y1),dx,z(m)),'Steigung']],nz(m))
    def ya(r):
        m=r.randint(-5,5) or 2;q=r.randint(-7,9);return F(1,'Eine Gerade hat die Gleichung y = %s. Bei welchem y-Wert schneidet sie die y-Achse?'%(('%dx %s %d'%(m,'+' if q>=0 else '−',abs(q))) if q!=0 else '%dx'%m),z(q),[z(u) for u in wn(q,r)] ,'Der y-Achsenabschnitt ist die Zahl ohne x.',[[z(q),'y-Achsenabschnitt']],nz(q))
    def nu(r):
        m=r.choice([1,2,3,4,-2,-3]);x=r.randint(-4,6);q=-m*x;return F(3,'Wo schneidet die Gerade y = %s die x-Achse (Nullstelle)?'%fs(m,q),z(x),[z(u) for u in wn(x,r)],'Setze y = 0 und löse die Gleichung.',[['0 = %s'%fs(m,q).replace('y',''),'y = 0'],['x = %s'%z(x),'Nullstelle']],nz(x))
    def pp(r):
        m=r.randint(1,4);q=r.randint(-4,6);x=r.randint(-3,5);y=m*x+q;ok=r.random()<.5
        if not ok:y+=r.choice([-2,-1,1,2])
        return F(2,'Liegt der Punkt P(%s|%s) auf der Geraden y = %s?'%(z(x),z(y),fs(m,q)),'ja' if ok else 'nein',['nein' if ok else 'ja'],'Setze x ein und vergleiche mit y.',[['%d · %s %s %d = %s'%(m,p(x),'+' if q>=0 else '−',abs(q),z(m*x+q)),'f(%s)'%z(x)]])
    def tx(r):
        g=r.choice([3,4,5,6]);k=r.choice([2,3,4]);n=r.randint(3,9);return F(3,'Ein Taxi kostet %d Fr. Grundpreis und %d Fr. pro km. Wie viel kostet eine Fahrt von %d km?'%(g,k,n),g+k*n,[g*n+k,g+n,(g+k)*n],'Preis = Grundpreis + Preis pro km · km.',[['%d · %d = %d'%(k,n,k*n),'Kilometer'],['%d + %d = %d'%(g,k*n,g+k*n),'Preis']],[str(g+k*n)])
    def sg(r):
        m=r.choice([-4,-3,-2,-1,1,2,3,4]);q=r.randint(-5,5);ok='steigt' if m>0 else 'fällt'
        return F(1,'Die Gerade y = %s …'%fs(m,q),ok,['fällt' if m>0 else 'steigt','ist waagrecht'],'Ist m positiv, steigt die Gerade.',[[z(m),'Steigung']])
    return [w,st,ya,nu,pp,tx,sg,w,st,pp,nu]
def fs(m,q):
    a=('x' if m==1 else '%sx'%z(m) if m!=-1 else '−x')
    return a if q==0 else '%s %s %d'%(a,'+' if q>0 else '−',abs(q))
def t_lf():
    t=make('kl8-mathe-lineare-funktionen','kl8','Funktionen','Lineare Funktionen',803,lf(),('Gerade y = mx + q','m ist die Steigung, q der Schnittpunkt mit der y-Achse.',[['y = 2x + 1','m = 2, q = 1']]))
    TH(t,'Ein Taxi kostet 5 Fr. Grundpreis und 3 Fr. pro Kilometer. Der Preis wächst gleichmässig. Das zeichnest du als Gerade: y = 3x + 5.',
       'Grundpreis 5 Fr., dazu 3 Fr. pro km.','4 km kosten 17 Fr.!',
       [['Funktion','Jedem x gehört ein y','f(x) = 3x + 5'],['Steigung m','Wie steil die Gerade ist','m = 3'],['y-Achsenabschnitt q','Startwert bei x = 0','q = 5'],['Nullstelle','Wo y = 0 ist','x = −5/3']],
       'Pro Schritt nach rechts geht die Gerade um m nach oben.',[CH([['y','Preis',0],['=','',2],['3','m',1],['x','km',0],['+','',2],['5','q',2]])],
       [['m > 0','Gerade steigt'],['m < 0','Gerade fällt'],['q','Schnittpunkt mit der y-Achse']],
       'So arbeitest du mit y = mx + q.',[['m und q ablesen','Zahl vor x und Zahl ohne x',0],['x einsetzen','Wert für x wählen',1],['y ausrechnen','Punkt P(x|y)',2],['Punkte verbinden','Gerade zeichnen',3]],
       [[['y = 3x + 5','Gleichung',7],['x = 4','',0],['→','',2],['3 · 4 + 5','',1],['=','',2],['17','y',2]],[['P(1|2)','',7],['Q(3|6)','',7],['m = (6−2) : (3−1)','',0],['=','',2],['2','Steigung',1]]],
       'Merke diese Regeln.',[['Steigung','m = Δy : Δx','(6−2) : (3−1) = 2',0],['Startwert','q ist der y-Wert bei x = 0','y = 3x + 5 → 5',1],['Punktprobe','Punkt einsetzen','P(2|11) auf y = 3x+5',2]])
    return t
T.append(t_lf)

# ---------- Kl.9 Gleichungssysteme ----------
def gs():
    def s1(r):
        x,y=r.randint(2,12),r.randint(1,10);x,y=max(x,y+1),y;return F(1,'Es gilt x + y = %d und x − y = %d. Wie gross ist x?'%(x+y,x-y),x,[y,x+1,x-1],'Addiere beide Gleichungen: 2x = Summe.',[['2x = %d + %d = %d'%(x+y,x-y,2*x),'addieren'],['x = %d : 2 = %d'%(2*x,x),'teilen']],[str(x)])
    def s2(r):
        x,y=r.randint(2,12),r.randint(1,10);x,y=max(x,y+1),y;return F(1,'Es gilt x + y = %d und x − y = %d. Wie gross ist y?'%(x+y,x-y),y,[x,y+1,y-1 if y>1 else y+2],'Berechne zuerst x, dann y = Summe − x.',[['x = %d'%x,'zuerst'],['y = %d − %d = %d'%(x+y,x,y),'dann']],[str(y)])
    def s3(r):
        x,y=r.randint(1,9),r.randint(1,9);return F(2,'Es gilt 2x + y = %d und x + y = %d. Wie gross ist x?'%(2*x+y,x+y),x,[y,x+1,2*x],'Ziehe die zweite von der ersten Gleichung ab.',[['(2x + y) − (x + y) = x','abziehen'],['x = %d − %d = %d'%(2*x+y,x+y,x),'x']],[str(x)])
    def s4(r):
        x,y=r.randint(1,9),r.randint(1,9);return F(2,'Es gilt 2x + y = %d und x + y = %d. Wie gross ist y?'%(2*x+y,x+y),y,[x,y+1,x+y],'Berechne zuerst x. Dann y = (x + y) − x.',[['x = %d'%x,'zuerst'],['y = %d − %d = %d'%(x+y,x,y),'dann']],[str(y)])
    def s5(r):
        a,b=r.randint(6,12),r.randint(1,5);g=(2*a+b)//2 if (a+b)%2==0 else a
        a=r.randint(4,9)*2;b=r.choice([2,4,6]);
        return F(3,'Die Summe zweier Zahlen ist %d, die Differenz ist %d. Wie heisst die grössere Zahl?'%(a,b),(a+b)//2,[(a-b)//2,a//2,(a+b)//2+1],'Grössere Zahl = (Summe + Differenz) : 2.',[['%d + %d = %d'%(a,b,a+b),'addieren'],['%d : 2 = %d'%(a+b,(a+b)//2),'grössere Zahl']],[str((a+b)//2)])
    def s6(r):
        a=r.randint(4,9)*2;b=r.choice([2,4,6]);return F(3,'Die Summe zweier Zahlen ist %d, die Differenz ist %d. Wie heisst die kleinere Zahl?'%(a,b),(a-b)//2,[(a+b)//2,a//2,(a-b)//2+1],'Kleinere Zahl = (Summe − Differenz) : 2.',[['%d − %d = %d'%(a,b,a-b),'subtrahieren'],['%d : 2 = %d'%(a-b,(a-b)//2),'kleinere Zahl']],[str((a-b)//2)])
    def s7(r):
        e,k=r.randint(8,15),r.randint(3,7);return F(3,'2 Erwachsene und 1 Kind zahlen %d Fr. 1 Erwachsener und 1 Kind zahlen %d Fr. Wie viel kostet ein Erwachsenenticket?'%(2*e+k,e+k),e,[k,e+1,e+k],'Ziehe die zweite von der ersten Rechnung ab.',[['%d − %d = %d'%(2*e+k,e+k,e),'ein Erwachsener']],[str(e)])
    def s8(r):
        x=r.randint(2,9);k=r.choice([2,3,4]);return F(2,'Es gilt y = %dx und x + y = %d. Wie gross ist x?'%(k,x*(k+1)),x,[k*x,x+1,x*(k+1)],'Setze y = %dx in die zweite Gleichung ein.'%k,[['x + %dx = %dx'%(k,k+1),'einsetzen'],['x = %d : %d = %d'%(x*(k+1),k+1,x),'teilen']],[str(x)])
    def s9(r):
        x,y=r.randint(1,8),r.randint(1,8);ok=r.random()<.5;xx,yy=(x,y) if ok else (x+1,y)
        return F(2,'Gilt x = %d und y = %d für beide Gleichungen x + y = %d und x − y = %s?'%(xx,yy,x+y,z(x-y)),'ja' if ok else 'nein',['nein' if ok else 'ja'],'Setze beide Zahlen in beide Gleichungen ein.',[['%d + %d = %d'%(xx,yy,xx+yy),'erste Gleichung']])
    return [s1,s2,s3,s4,s5,s6,s7,s8,s9,s1,s3]
def t_gs():
    t=make('kl9-mathe-gleichungssysteme','kl9','Gleichungen','Gleichungssysteme',901,gs(),('Zwei Gleichungen','Bei zwei Unbekannten brauchst du zwei Gleichungen.',[['x + y = 10','x − y = 2']]))
    TH(t,'Zwei Zahlen haben die Summe 10 und die Differenz 2. Welche Zahlen sind es? Mit einer Gleichung allein geht das nicht. Du brauchst ein Gleichungssystem mit zwei Gleichungen.',
       'Summe 10, Differenz 2.','Das sind 6 und 4!',
       [['Gleichungssystem','Zwei Gleichungen, zwei Unbekannte','x + y = 10, x − y = 2'],['Addieren','Gleichungen untereinander addieren','2x = 12'],['Einsetzen','Ergebnis in die andere Gleichung','6 + y = 10'],['Lösung','Zahlenpaar (x|y)','(6|4)']],
       'Beim Addieren fällt y weg.',[CH([['x + y','I',0],['=','',2],['10','',7]]),CH([['x − y','II',1],['=','',2],['2','',7]]),CH([['2x','I + II',2],['=','',2],['12','',7]])],
       [['Gleichung I','Erste Gleichung'],['Gleichung II','Zweite Gleichung'],['Lösung','x und y zusammen']],
       'So löst du ein Gleichungssystem.',[['Gleichungen untereinander schreiben','Mit I und II',0],['Addieren oder abziehen','Eine Unbekannte fällt weg',1],['Erste Unbekannte berechnen','x ausrechnen',2],['Zweite Unbekannte berechnen','In I einsetzen und Probe',3]],
       [[['2x = 12','',0],['→','',2],['x = 6','',1]],[['6 + y = 10','',0],['→','',2],['y = 4','',1]]],
       'Merke diese Regeln.',[['Addition','Wenn y und −y vorkommen','x+y und x−y',0],['Subtraktion','Wenn gleiche Terme vorkommen','2x+y und x+y',1],['Probe','In beide Gleichungen einsetzen','6+4=10, 6−4=2',2]])
    return t
T.append(t_gs)

# ---------- Kl.9 Trigonometrie ----------
def tr():
    tri=[(3,4,5),(6,8,10),(9,12,15),(12,16,20)]
    def sf(r):
        k=r.choice([2,3,4,5]);a=r.randint(2,6);return F(1,'Ein Dreieck wird vergrössert. Aus der Seite %d cm wird %d cm. Wie gross ist der Streckfaktor?'%(a,a*k),k,[k+1,k-1,a],'Streckfaktor = neue Länge : alte Länge.',[['%d : %d = %d'%(a*k,a,k),'Faktor']],[str(k)])
    def ah(r):
        k=r.choice([2,3,4,5]);a=r.randint(2,6);b=r.randint(3,9);return F(2,'Zwei Dreiecke sind ähnlich. Aus der Seite %d cm wird %d cm. Wie lang wird die Seite %d cm?'%(a,a*k,b),b*k,[b+k,b*k+k,a*b],'Rechne zuerst den Streckfaktor.',[['%d : %d = %d'%(a*k,a,k),'Faktor'],['%d · %d = %d'%(b,k,b*k),'neue Seite']],[str(b*k)])
    def sn(r):
        a,b,c=r.choice(tri);return F(2,'Im rechtwinkligen Dreieck ist die Gegenkathete von α %d cm, die Ankathete %d cm und die Hypotenuse %d cm. Wie gross ist sin α?'%(a,b,c),dc(D(a)/c),[dc(D(b)/c),dc(D(a)/b),dc(D(c)/a)],'sin α = Gegenkathete : Hypotenuse.',[['%d : %d = %s'%(a,c,dc(D(a)/c)),'sin α']],dz(D(a)/c))
    def cs(r):
        a,b,c=r.choice(tri);return F(2,'Im rechtwinkligen Dreieck ist die Gegenkathete von α %d cm, die Ankathete %d cm und die Hypotenuse %d cm. Wie gross ist cos α?'%(a,b,c),dc(D(b)/c),[dc(D(a)/c),dc(D(a)/b),dc(D(c)/b)],'cos α = Ankathete : Hypotenuse.',[['%d : %d = %s'%(b,c,dc(D(b)/c)),'cos α']],dz(D(b)/c))
    def tn(r):
        a,b,c=r.choice(tri);return F(3,'Im rechtwinkligen Dreieck ist die Gegenkathete von α %d cm, die Ankathete %d cm und die Hypotenuse %d cm. Wie gross ist tan α?'%(a,b,c),dc(D(a)/b),[dc(D(b)/a),dc(D(a)/c),dc(D(b)/c)],'tan α = Gegenkathete : Ankathete.',[['%d : %d = %s'%(a,b,dc(D(a)/b)),'tan α']],dz(D(a)/b))
    def sw(r):
        w,f_,v=r.choice([('sin 30°','0,5','5/10'),('cos 60°','0,5',''),('tan 45°','1',''),('sin 90°','1',''),('cos 0°','1',''),('sin 0°','0','')])
        return F(1,'Welchen Wert hat %s?'%w,f_,[x for x in ['0','0,5','1','0,87'] if x!=f_][:3],'Das ist ein Standardwert, den du dir merken kannst.',[[f_,w]],dz(D(f_.replace(',','.'))))
    def wi(r):
        a,w=r.choice([('sin α = 0,5','30°'),('cos α = 0,5','60°'),('tan α = 1','45°')]);return F(2,'Welcher Winkel α (zwischen 0° und 90°) passt zu %s?'%a,w,[x for x in['30°','45°','60°','90°'] if x!=w][:3],'Denke an die Standardwerte.',[[w,a]])
    def gk(r):
        c=r.choice([10,14,20,24,30]);return F(3,'Im rechtwinkligen Dreieck ist α = 30° und die Hypotenuse %d cm. Wie lang ist die Gegenkathete?'%c,c//2,[c,c*2,c//2+2],'Gegenkathete = Hypotenuse · sin 30° = Hypotenuse · 0,5.',[['%d · 0,5 = %d'%(c,c//2),'Gegenkathete']],[str(c//2)])
    def sh(r):
        a=r.choice([1,2,3]);b=r.choice([2,3,4]);k=r.choice([4,5,6]);return F(3,'Ein %d m langer Stab wirft einen Schatten von %d m. Gleichzeitig wirft ein Baum %d m Schatten. Wie hoch ist der Baum in m?'%(a*2,b,b*k),a*2*k,[a*2+k,b*k,a*k],'Die Dreiecke sind ähnlich. Rechne den Streckfaktor.',[['%d : %d = %d'%(b*k,b,k),'Faktor'],['%d · %d = %d'%(a*2,k,a*2*k),'Höhe']],[str(a*2*k)])
    return [sf,ah,sn,cs,tn,sw,wi,gk,sh,sn,cs,ah]
def t_tr():
    t=make('kl9-mathe-trigonometrie','kl9','Geometrie','Ähnlichkeit und Trigonometrie',902,tr(),('Sinus, Cosinus, Tangens','Im rechtwinkligen Dreieck sind die Seitenverhältnisse nur vom Winkel abhängig.',[['sin α','Gegenkathete : Hypotenuse']]),ncards=32)
    TH(t,'Wie hoch ist ein Baum? Du misst seinen Schatten und vergleichst mit einem Stab. Ähnliche Dreiecke haben dieselben Verhältnisse. Mit Sinus, Cosinus und Tangens rechnest du Seiten und Winkel im rechtwinkligen Dreieck aus.',
       'Stab 2 m, Schatten 3 m.','Baum: Schatten 15 m, Höhe 10 m!',
       [['Streckfaktor','Wie stark vergrössert wird','3'],['Hypotenuse','Längste Seite, gegenüber 90°','c'],['Gegenkathete','Seite gegenüber von α','a'],['Ankathete','Seite neben α','b']],
       'Im Dreieck 3-4-5 gilt: sin α = 3 : 5, cos α = 4 : 5 und tan α = 3 : 4.',[CH([['sin α','',0],['=','',2],['3 : 5','Gegen : Hyp.',1],['=','',2],['0,6','',2]]),CH([['tan α','',0],['=','',2],['3 : 4','Gegen : An',1],['=','',2],['0,75','',2]])],
       [['sin α','Gegenkathete : Hypotenuse'],['cos α','Ankathete : Hypotenuse'],['tan α','Gegenkathete : Ankathete']],
       'So rechnest du mit Sinus, Cosinus und Tangens.',[['Seiten benennen','Gegen-, Ankathete, Hypotenuse',0],['Verhältnis wählen','sin, cos oder tan',1],['Gleichung aufstellen','Mit den bekannten Zahlen',2],['Ausrechnen','Mit dem Taschenrechner',3]],
       [[['sin α','',7],['=','',2],['3','Gegenkathete',0],[':','',2],['5','Hypotenuse',1],['=','',2],['0,6','',2]],[['Streckfaktor','',7],['=','',2],['15 : 3','Schatten',0],['=','',2],['5','',1]]],
       'Merke diese Regeln.',[['Standardwerte','sin 30° = 0,5','cos 60° = 0,5',0],['tan 45°','Gegen- gleich Ankathete','tan 45° = 1',1],['Ähnlich','Alle Seiten mit demselben Faktor','2 cm → 6 cm',2]])
    return t
T.append(t_tr)

# ---------- Kl.9 Körper ----------
def ko():
    PI=D('3.14')
    def zy(r):
        rr=r.choice([1,2,3,5,10]);h=r.randint(2,10);V=PI*rr*rr*h;return F(2,'Ein Zylinder hat den Radius %d cm und die Höhe %d cm. Wie gross ist das Volumen in cm³? (π ≈ 3,14)'%(rr,h),dc(V),[dc(V/rr),dc(V*2),dc(PI*rr*h)],'V = r · r · π · h.',[['%d · %d · 3,14 = %s'%(rr,rr,dc(PI*rr*rr)),'Grundfläche'],['%s · %d = %s'%(dc(PI*rr*rr),h,dc(V)),'Volumen']],dz(V))
    def py(r):
        a=r.choice([3,6,9]);h=r.randint(2,9)*3 if False else r.choice([3,6,9,12]);V=a*a*h//3;return F(2,'Eine Pyramide hat die quadratische Grundfläche %d cm × %d cm und die Höhe %d cm. Wie gross ist das Volumen in cm³?'%(a,a,h),V,[a*a*h,V+a,a*a*h//2],'V = Grundfläche · Höhe : 3.',[['%d · %d = %d'%(a,a,a*a),'Grundfläche'],['%d · %d : 3 = %d'%(a*a,h,V),'Volumen']],[str(V)])
    def ke(r):
        rr=r.choice([3,6,9]);h=r.randint(2,8);V=PI*rr*rr*h/3;return F(3,'Ein Kegel hat den Radius %d cm und die Höhe %d cm. Wie gross ist das Volumen in cm³? (π ≈ 3,14)'%(rr,h),dc(V),[dc(V*3),dc(PI*rr*rr*h),dc(V/2)],'V = r · r · π · h : 3.',[['%d · %d · 3,14 · %d = %s'%(rr,rr,h,dc(PI*rr*rr*h)),'wie Zylinder'],['%s : 3 = %s'%(dc(PI*rr*rr*h),dc(V)),'Kegel']],dz(V))
    def mz(r):
        rr=r.choice([1,5,10,20]);h=r.randint(2,10);M=2*PI*rr*h;return F(3,'Ein Zylinder hat den Radius %d cm und die Höhe %d cm. Wie gross ist die Mantelfläche in cm²? (π ≈ 3,14)'%(rr,h),dc(M),[dc(M/2),dc(PI*rr*rr*h),dc(M*rr)],'Mantel = Umfang · Höhe = 2 · r · π · h.',[['2 · %d · 3,14 = %s'%(rr,dc(2*PI*rr)),'Umfang'],['%s · %d = %s'%(dc(2*PI*rr),h,dc(M)),'Mantel']],dz(M))
    def hz(r):
        G,h=r.choice([10,12,15,20,25]),r.randint(2,9);return F(2,'Ein Zylinder hat das Volumen %d cm³ und die Grundfläche %d cm². Wie hoch ist er in cm?'%(G*h,G),h,[h+1,h-1,G],'Höhe = Volumen : Grundfläche.',[['%d : %d = %d'%(G*h,G,h),'Höhe']],[str(h)])
    def zs(r):
        a,b,c=r.randint(2,6),r.randint(2,6),r.randint(2,6);k=r.randint(2,4);return F(3,'Ein Quader %d cm × %d cm × %d cm wird mit einem Würfel der Kantenlänge %d cm verbunden. Wie gross ist das Gesamtvolumen in cm³?'%(a,b,c,k),a*b*c+k**3,[a*b*c,k**3,a*b*c*k**3],'Rechne beide Körper einzeln und addiere.',[['%d · %d · %d = %d'%(a,b,c,a*b*c),'Quader'],['%d · %d · %d = %d'%(k,k,k,k**3),'Würfel'],['%d + %d = %d'%(a*b*c,k**3,a*b*c+k**3),'zusammen']],[str(a*b*c+k**3)])
    def lt(r):
        V=r.choice([1000,2500,4000,500,2000]);return F(1,'Ein Behälter fasst %d cm³. Wie viele Milliliter sind das?'%V,V,[V//10,V*10,V//100],'1 cm³ ist 1 ml.',[['%d cm³ = %d ml'%(V,V),'Umrechnen']],[str(V)])
    return [zy,py,ke,mz,hz,zs,lt,zy,py,ke,hz]
def t_ko():
    t=make('kl9-mathe-koerper','kl9','Geometrie','Zylinder, Pyramide und Kegel',903,ko(),('Körper','Zylinder: V = r · r · π · h. Pyramide und Kegel: V = Grundfläche · Höhe : 3.',[['Pyramide','G · h : 3']]),ncards=34)
    TH(t,'Eine Konservendose ist ein Zylinder. Wie viel passt hinein? Dafür rechnest du das Volumen. Auch Pyramiden und Kegel kannst du so berechnen.',
       'Die Dose hat r = 5 cm.','Höhe 10 cm: 785 cm³.',
       [['Zylinder','Kreis als Grundfläche','Dose'],['Pyramide','Spitze über der Grundfläche','Zelt'],['Kegel','Kreis mit Spitze','Eistüte'],['Volumen','Wie viel hineinpasst','in cm³']],
       'Ein Kegel hat genau ein Drittel des Volumens eines Zylinders gleicher Grösse.',[CH([['Zylinder','G · h',0],['÷','',2],['3','',2],['=','',2],['Kegel','',1]])],
       [['Zylinder','V = G · h'],['Pyramide','V = G · h : 3'],['Kegel','V = G · h : 3']],
       'So berechnest du ein Volumen.',[['Körper erkennen','Zylinder, Pyramide oder Kegel?',0],['Grundfläche berechnen','Kreis oder Quadrat',1],['Mal Höhe nehmen','G · h',2],['Bei Spitze durch 3','Pyramide und Kegel',3]],
       [[['5 · 5 · 3,14','',0],['=','',2],['78,5','G',1],['·','',2],['10','h',2],['=','',2],['785','V',7]],[['4 · 4','',0],['=','',2],['16','G',1],['·','',2],['6 : 3','',2],['=','',2],['32','V',7]]],
       'Merke diese Regeln.',[['Zylinder','V = r · r · π · h','5 · 5 · 3,14 · 10',0],['Spitze','Durch 3 teilen','Pyramide, Kegel',1],['Liter','1 cm³ = 1 ml','1000 cm³ = 1 l',2]])
    return t
T.append(t_ko)

# ---------- Kl.9 Stochastik ----------
def st():
    def ur(r):
        a,b,c=r.randint(1,6),r.randint(1,6),r.randint(1,5);n=a+b+c;col=r.choice([('rot',a),('blau',b),('grün',c)])
        return F(2,'In einer Urne liegen %d rote, %d blaue und %d grüne Kugeln. Wie gross ist die Wahrscheinlichkeit für „%s“?'%(a,b,c,col[0]),fr(col[1],n),[w_ for w_ in {fr(col[1],n-col[1]),fr(1,n),fr(col[1]+1,n+1),fr(n-col[1],n)} if w_!=fr(col[1],n)],'P = günstige Fälle : alle Fälle.',[['günstig: %d, alle: %d'%(col[1],n),'zählen'],['P = %s'%fr(col[1],n),'gekürzt']],[fr(col[1],n),'%d/%d'%(col[1],n)])
    def wf(r):
        q,a,w=r.choice([('eine gerade Zahl','1/2',['1/3','1/6','2/3']),('eine 6','1/6',['1/3','1/2','6/6']),('eine Zahl grösser als 4','1/3',['1/2','1/6','2/3']),('keine 6','5/6',['1/6','1/2','4/6']),('eine Zahl kleiner als 3','1/3',['1/6','1/2','2/3']),('eine Primzahl','1/2',['1/3','1/6','2/3'])])
        return F(1,'Du würfelst einmal. Wie gross ist die Wahrscheinlichkeit für %s?'%q,a,w,'Zähle die günstigen Zahlen von 1 bis 6.',[[a,'Wahrscheinlichkeit']],[a])
    def bm(r):
        a,b=r.randint(2,6),r.randint(2,6);return F(1,'Du hast %d Hosen und %d T-Shirts. Wie viele Kombinationen gibt es?'%(a,b),a*b,[a+b,a*b+a,a*b-1],'Mal nehmen: jede Hose mit jedem Shirt.',[['%d · %d = %d'%(a,b,a*b),'Kombinationen']],[str(a*b)])
    def md(r):
        n=r.choice([5,7]);L=sorted(r.sample(range(1,20),n));rr=list(L);r.shuffle(rr);m=L[n//2]
        return F(2,'Bestimme den Median: %s'%', '.join(map(str,rr)),m,[L[n//2-1],L[n//2+1],sum(L)//n],'Ordne zuerst der Grösse nach. Der Median steht in der Mitte.',[[', '.join(map(str,L)),'geordnet'],[str(m),'Median']],[str(m)])
    def mw(r):
        n=r.choice([4,5]);m=r.randint(4,12);L=[m]*n;
        for i in range(0,n-1,2):d=r.randint(1,3);L[i]+=d;L[i+1]-=d
        rr=list(L);r.shuffle(rr);return F(2,'Berechne den Mittelwert: %s'%', '.join(map(str,rr)),m,[m+1,m-1,max(L)],'Zähle alle Zahlen zusammen und teile durch die Anzahl.',[['Summe = %d'%sum(L),'zusammenzählen'],['%d : %d = %d'%(sum(L),n,m),'Mittelwert']],[str(m)])
    def sp(r):
        L=r.sample(range(1,40),5);rr=list(L);return F(1,'Wie gross ist die Spannweite? %s'%', '.join(map(str,rr)),max(L)-min(L),[max(L),max(L)+min(L),max(L)-min(L)+1],'Spannweite = grösster Wert − kleinster Wert.',[['%d − %d = %d'%(max(L),min(L),max(L)-min(L)),'Spannweite']],[str(max(L)-min(L))])
    def pc(r):
        a,b=r.choice([('1/2','50'),('1/4','25'),('1/5','20'),('1/10','10'),('3/4','75'),('1/20','5')]);return F(2,'Die Wahrscheinlichkeit ist %s. Wie viel Prozent sind das?'%a,b+' %',[x+' %' for x in ['10','20','25','50','75','5','1'] if x!=b][:3],'Teile Zähler durch Nenner und rechne mal 100.',[[b+' %','Prozent']],[b,b+' %',b+'%'])
    def mz(r):
        n=r.choice([2,3]);return F(3,'Du wirfst eine Münze %d-mal. Wie gross ist die Wahrscheinlichkeit, dass immer Kopf kommt?'%n,'1/%d'%(2**n),['1/%d'%(2*n),'1/2','1/%d'%(2**n+1)],'Multipliziere 1/2 mit sich selbst.',[['(1/2)^%d = 1/%d'%(n,2**n),'Münzwürfe']])
    def mo(r):
        L=r.sample(range(1,10),3);m=L[0];seq=[m,m,L[1],m,L[2],L[1]];r.shuffle(seq);return F(1,'Welcher Wert kommt am häufigsten vor (Modus)? %s'%', '.join(map(str,seq)),m,[x for x in L[1:]]+[L[1]+L[2]],'Zähle, wie oft jede Zahl vorkommt.',[[str(m),'häufigster Wert']],[str(m)])
    return [ur,wf,bm,md,mw,sp,pc,mz,mo,ur,md,mw,wf]
def t_st():
    t=make('kl9-mathe-stochastik','kl9','Daten und Zufall','Wahrscheinlichkeit und Datenanalyse',904,st(),('Wahrscheinlichkeit','P = günstige Fälle : alle Fälle. Median und Mittelwert beschreiben Daten.',[['Würfel: gerade Zahl','P = 1/2']]),ncards=32)
    TH(t,'Du würfelst und hoffst auf eine 6. Wie wahrscheinlich ist das? Die Wahrscheinlichkeit sagt es dir in einer Zahl. Mit Mittelwert und Median beschreibst du Daten.',
       'Würfelst du eine 6?','Die Chance ist 1 von 6.',
       [['Wahrscheinlichkeit','Chance zwischen 0 und 1','1/6'],['Median','Mittlerer Wert der geordneten Liste','3, 5, 8 → 5'],['Mittelwert','Summe : Anzahl','(3+5+8):3'],['Spannweite','Grösster − kleinster Wert','8 − 3 = 5']],
       'Bei einem Würfel gibt es sechs gleich wahrscheinliche Ergebnisse.',[CH([['1','',0],['2','',0],['3','',0],['4','',0],['5','',0],['6','günstig',1]])],
       [['Günstig','Treffer zählen'],['Alle','Alle Möglichkeiten zählen'],['P','günstig : alle']],
       'So berechnest du eine Wahrscheinlichkeit.',[['Alle Fälle zählen','Wie viele Möglichkeiten?',0],['Günstige Fälle zählen','Wie viele Treffer?',1],['Bruch bilden','günstig durch alle',2],['Kürzen','Bruch vereinfachen',3]],
       [[['3 rote','günstig',0],[':','',2],['10 Kugeln','alle',1],['=','',2],['3/10','P',2]],[['3, 5, 8, 9, 12','geordnet',7],['→','',2],['8','Median',1]]],
       'Merke diese Regeln.',[['P','günstig : alle','1/6',0],['Mittelwert','Summe : Anzahl','(3+5+8):3',1],['Median','Mitte der geordneten Liste','3, 5, 8 → 5',2]])
    return t
T.append(t_st)
