"""Mathe: Lücken aus dem Lehrplan (Kl. 4, 7, 8, 9) v4.77"""
import sys
sys.path.insert(0,'.')
from k7 import *
from cm import f as fmt, fv
T=[]
SUP='⁰¹²³⁴⁵⁶⁷⁸⁹'
def sup(n):return ''.join(SUP[int(c)] for c in str(n))
def lin(m,c):
    a='x' if m==1 else '%dx'%m
    return a if c==0 else '%s + %d'%(a,c) if c>0 else '%s − %d'%(a,-c)
def pt(x,y):return '(%s|%s)'%(z(x),z(y))
def ptw(x,y,r,k=3):
    c=[(-x,y),(x,-y),(-x,-y),(y,x),(x+1,y),(x,y+1),(x-1,y),(x,y-1)]
    c=[q for q in c if q!=(x,y)];r.shuffle(c);o=[]
    for q in c:
        if pt(*q) not in o:o.append(pt(*q))
    return o[:k]

# ---------- Kl.4 Stellenwerttabelle ----------
def sw():
    names=['Hunderttausender','Zehntausender','Tausender','Hunderter','Zehner','Einer']
    short=['HT','ZT','T','H','Z','E']
    def rn(r):
        while True:
            d=[r.randint(1,9)]+[r.randint(0,9) for _ in range(5)]
            if len(set(d))>=4:return d
    def zf(r):
        d=rn(r);n=int(''.join(map(str,d)));i=r.randint(0,5);return F(1,'%s: Welche Ziffer steht bei den %s?'%(fmt(n),names[i]),d[i],[x for x in range(10) if x!=d[i]][:0] or [(d[i]+k)%10 for k in (1,2,5)],'Lies von links: HT, ZT, T, H, Z, E.',[[str(d[i]),names[i]]],[str(d[i])])
    def wv(r):
        d=rn(r);n=int(''.join(map(str,d)));i=r.randint(0,5);v=d[i]*10**(5-i)
        if d[i]==0:return zf(r)
        return F(2,'Welchen Wert hat die Ziffer %d in %s?'%(d[i],fmt(n)) if d.count(d[i])==1 else 'Welchen Wert hat die %d. Ziffer von links in %s?'%(i+1,fmt(n)),fmt(v),[fmt(v*10),fmt(max(v//10,1)),fmt(d[i]*10**((5-i+1)%6))],'Zähle die Stellen von rechts.',[[fmt(v),'Stellenwert']],fv(v))
    def zs(r):
        d=rn(r);n=int(''.join(map(str,d)));return F(2,'%d HT + %d ZT + %d T + %d H + %d Z + %d E = ?'%tuple(d),fmt(n),[fmt(n+1000),fmt(n-100),fmt(int(''.join(map(str,d[::-1]))))],'Schreibe die Ziffern der Reihe nach.',[[fmt(n),'Zahl']],fv(n))
    def pl(r):
        n=r.randint(10,900)*1000+r.randint(0,9)*100;s,nm=r.choice([(1000,'1000'),(10000,'10\'000'),(100000,'100\'000')]);up=r.random()<.5
        v=n+s if up else n-s
        return F(2,'Welche Zahl ist %s %s als %s?'%(nm,'mehr' if up else 'weniger',fmt(n)),fmt(v),[fmt(n+s*10 if up else n-s*10) if (n+s*10 if up else n-s*10)>0 else fmt(n+1),fmt(n+s if not up else n-s),fmt(v+100)],'Nur eine Stelle ändert sich.',[[fmt(v),'neue Zahl']],fv(v))
    def vg(r):
        a=r.randint(100000,999000);b=a+r.choice([-100,100,1000,-1000,10000,-10000]);m=max(a,b)
        return F(1,'Welche Zahl ist grösser: %s oder %s?'%(fmt(a),fmt(b)),fmt(m),[fmt(min(a,b))],'Vergleiche von links die erste Stelle, die verschieden ist.',[[fmt(m),'grössere Zahl']])
    def ab(r):
        n=r.randint(2,9)*100000+r.randint(1,9)*1000;return F(2,'Wie viele Tausender hat %s insgesamt?'%fmt(n),n//1000,[n//100,n//10000,n//1000+1],'Streiche die letzten drei Ziffern.',[['%s : 1000 = %d'%(fmt(n),n//1000),'Tausender']],[str(n//1000)])
    return [zf,wv,zs,pl,vg,ab,zf,wv,zs,pl]
def t_sw():
    t=make('kl4-mathe-stellenwert','kl4','Zahlen','Stellenwerttabelle',411,sw(),('Stellenwerte','Jede Ziffer hat einen Platz: Einer, Zehner, Hunderter, Tausender, Zehntausender, Hunderttausender.',[['345\'210','3 HT, 4 ZT, 5 T, 2 H, 1 Z, 0 E']]),ncards=34)
    TH(t,'Auf der Anzeigetafel eines Stadions steht die Zahl 345\'210. Du liest sie Stelle für Stelle. Die Stellenwerttabelle zeigt, wie viel jede Ziffer wert ist.',
       'Wie viele Zuschauer?','345\'210 – Stelle für Stelle!',
       [['Einer (E)','Die letzte Stelle','0'],['Tausender (T)','Dritte Stelle von rechts','5 T = 5000'],['Hunderttausender (HT)','Sechste Stelle von rechts','3 HT = 300\'000']],
       'Jede Stelle ist zehnmal mehr wert als die rechts von ihr.',[TBL(['HT','ZT','T','H','Z','E'],[['3','4','5','2','1','0']],None)],
       [['Rechts nach links','E, Z, H, T, ZT, HT'],['Zehnmal mehr','Jede Stelle links'],['Null','Hält den Platz frei']],
       'So liest du eine grosse Zahl.',[['Zahl in die Tabelle schreiben','Eine Ziffer pro Feld',0],['Stellen benennen','Von rechts: E, Z, H …',1],['Werte bestimmen','Ziffer mal Stellenwert',2],['Zahl lesen','Von links nach rechts',3]],
       [[['300\'000','3 HT',0],['+','',2],['40\'000','4 ZT',1],['+','',2],['5000','5 T',2],['=','',2],['345\'000','',7]],[['200','2 H',0],['+','',2],['10','1 Z',1],['+','',2],['0','0 E',2],['=','',2],['210','',7]]],
       'Merke diese Regeln.',[['Stellenwert','Jede Stelle 10-mal mehr','5 T = 5000',0],['Null','Hält den Platz frei','305\'000',1],['Vergleichen','Zuerst die linke Stelle','345\'000 > 342\'000',2]])
    return t
T.append(t_sw)

# ---------- Kl.7 Terme aufstellen ----------
def ta():
    def a1(r):
        w=r.randint(3,9);o=r.choice([('Heft','Hefte'),('Stift','Stifte'),('Ball','Bälle'),('Buch','Bücher')]);return F(1,'Ein %s kostet x Fr. Wie heisst der Term für %d %s?'%(o[0],w,o[1]),'%dx'%w,['x + %d'%w,'x : %d'%w,'%d : x'%w],'%d mal den Preis.'%w,[['%d · x = %dx'%(w,w),'Term']],['%dx'%w,'%d·x'%w])
    def a2(r):
        k=r.randint(2,12);return F(1,'Die Zahl x ist gegeben. Wie heisst der Term für eine Zahl, die um %d grösser ist als x?'%k,'x + %d'%k,['x − %d'%k,'%dx'%k,'x : %d'%k],'„grösser um“ heisst plus.',[['x + %d'%k,'Term']],['x + %d'%k,'x+%d'%k])
    def a3(r):
        k=r.randint(2,12);return F(1,'Wie heisst der Term für „x vermindert um %d“?'%k,'x − %d'%k,['x + %d'%k,'%d − x'%k,'%dx'%k],'„vermindert um“ heisst minus.',[['x − %d'%k,'Term']],['x − %d'%k,'x-%d'%k])
    def a4(r):
        return F(1,r.choice(['Wie heisst der Term für das Doppelte von x?','Wie heisst der Term für „x verdoppelt“?']),'2x',['x + 2','x²','x : 2'],'Doppelt heisst mal 2.',[['2 · x = 2x','Term']],['2x','2·x'])
    def a5(r):
        return F(1,'Wie heisst der Term für die Hälfte von x?','x : 2',['2x','x − 2','x + 2'],'Hälfte heisst durch 2.',[['x : 2','Term']],['x : 2','x:2','x/2'])
    def a6(r):
        a,b=r.randint(2,7),r.randint(1,9);return F(2,'Wie heisst der Term für „%d mal x, dann %d dazu“?'%(a,b),'%dx + %d'%(a,b),['%d(x + %d)'%(a,b),'%dx − %d'%(a,b),'x + %d'%(a+b)],'Zuerst mal, dann plus.',[['%dx + %d'%(a,b),'Term']],['%dx + %d'%(a,b),'%dx+%d'%(a,b)])
    def a7(r):
        a,b=r.randint(2,7),r.randint(1,9);return F(2,'Wie heisst der Term für „%d mal die Summe aus x und %d“?'%(a,b),'%d(x + %d)'%(a,b),['%dx + %d'%(a,b),'%dx + %dx'%(a,b),'x + %d'%(a*b)],'Die Summe kommt in eine Klammer.',[['%d(x + %d)'%(a,b),'Term']],['%d(x + %d)'%(a,b),'%d(x+%d)'%(a,b)])
    def a8(r):
        h,s=r.randint(2,6),r.randint(2,5);n=r.randint(2,5);return F(3,'Ein Heft kostet x Fr., ein Stift kostet %d Fr. Wie heisst der Term für %d Hefte und einen Stift?'%(s,n),'%dx + %d'%(n,s),['%d(x + %d)'%(n,s),'x + %d'%(n+s),'%dx + %dx'%(n,s)],'Hefte: n · x, dazu der Stift.',[['%d · x = %dx'%(n,n),'Hefte'],['%dx + %d'%(n,s),'zusammen']],['%dx + %d'%(n,s),'%dx+%d'%(n,s)])
    def a9(r):
        a=r.randint(2,9);return F(2,'Ein Quadrat hat die Seitenlänge a. Wie heisst der Term für den Umfang?','4a',['a²','a + 4','2a'],'Vier gleiche Seiten.',[['a + a + a + a = 4a','Umfang']],['4a','4·a'])
    def a10(r):
        b=r.randint(2,9);return F(2,'Ein Rechteck ist a cm lang und %d cm breit. Wie heisst der Term für den Umfang?'%b,'2a + %d'%(2*b),['a + %d'%b,'2a + %d'%b,'%da'%b],'Zwei Längen und zwei Breiten.',[['2 · a + 2 · %d = 2a + %d'%(b,2*b),'Umfang']],['2a + %d'%(2*b),'2a+%d'%(2*b)])
    def a11(r):
        a,b,x=r.randint(2,7),r.randint(1,9),r.randint(1,9);return F(2,'Berechne %dx + %d für x = %d.'%(a,b,x),a*x+b,[(a+b)*x,a*(x+b),a*x-b],'Setze x ein: erst mal, dann plus.',[['%d · %d + %d = %d'%(a,x,b,a*x+b),'Einsetzen']],[str(a*x+b)])
    def a12(r):
        a=r.randint(3,9);n=r.randint(3,9);return F(3,'Ein Taxi kostet %d Fr. Grundpreis plus x Fr. pro km. Wie heisst der Term für eine Fahrt von %d km?'%(a,n),'%d + %dx'%(a,n),['%dx'%(a+n),'%d(%d + x)'%(n,a),'%dx + %d'%(a,n)],'Grundpreis plus km mal Preis.',[['%d · x = %dx'%(n,n),'Fahrt'],['%d + %dx'%(a,n),'zusammen']],['%d + %dx'%(a,n),'%dx + %d'%(n,a),'%dx+%d'%(n,a)])
    return [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a1,a6,a11]
def t_ta():
    t=make('kl7-mathe-terme-aufstellen','kl7','Gleichungen und Terme','Einfache Terme aufstellen',711,ta(),('Terme','Ein Term ist ein Rechenausdruck mit Zahlen und Variablen.',[['3x + 2','3 mal x plus 2']]),nex=16)
    TH(t,'Ein Heft kostet x Franken. Wie viel kosten 3 Hefte und ein Stift für 2 Fr.? Das schreibst du als Term: 3x + 2. So beschreibst du viele Fälle mit einer Formel.',
       'Ein Heft kostet x Fr.','3 Hefte und ein Stift: 3x + 2!',
       [['Variable','Platzhalter','x'],['Term','Rechenausdruck','3x + 2'],['Faktor','Zahl vor der Variablen','3'],['Einsetzen','Zahl für x','x = 4']],
       'Der Term besteht aus einem Mal-Teil und einem Plus-Teil.',[CH([['3x','3 Hefte',0],['+','',2],['2','Stift',1]])],
       [['mehr','+'],['weniger','−'],['doppelt','2 · x'],['Hälfte','x : 2']],
       'So stellst du einen Term auf.',[['Text lesen','Was ist gesucht?',0],['Variable wählen','x für das Unbekannte',1],['Rechenzeichen finden','Wörter übersetzen',2],['Term aufschreiben','Mit Probe',3]],
       [[['3 Hefte','3x',0],['+','',2],['Stift','2',1],['=','',2],['3x + 2','Term',7]],[['x = 4','',0],['→','',2],['3 · 4 + 2','',1],['=','',2],['14','Preis',2]]],
       'Merke diese Regeln.',[['Wörter','mehr = +, weniger = −','x + 5',0],['Mal vor Plus','Punkt vor Strich','3x + 2',1],['Klammer','Summe zuerst','3(x + 2)',2]])
    return t
T.append(t_ta)

# ---------- Kl.7 Winkel an Parallelen, Vierecke ----------
def wp():
    def st(r):
        a=r.randint(30,150);return F(1,'Zwei Parallelen werden von einer Geraden geschnitten. Ein Winkel misst %d°. Wie gross ist der Stufenwinkel?'%a,a,[180-a,360-a,a+10],'Stufenwinkel an Parallelen sind gleich gross.',[['Stufenwinkel = %d°'%a,'gleich']],[str(a),'%d°'%a])
    def we(r):
        a=r.randint(30,150);return F(1,'Zwei Parallelen werden von einer Geraden geschnitten. Ein Winkel misst %d°. Wie gross ist der Wechselwinkel?'%a,a,[180-a,360-a,a-10],'Wechselwinkel an Parallelen sind gleich gross.',[['Wechselwinkel = %d°'%a,'gleich']],[str(a),'%d°'%a])
    def nb(r):
        a=r.randint(30,150);return F(2,'Zwei Parallelen werden von einer Geraden geschnitten. Ein Winkel misst %d°. Wie gross ist der Nebenwinkel seines Stufenwinkels?'%a,180-a,[a,360-a,90],'Der Stufenwinkel ist %d°. Sein Nebenwinkel ergänzt auf 180°.'%a,[['Stufenwinkel: %d°'%a,'gleich'],['180 − %d = %d'%(a,180-a),'Nebenwinkel']],[str(180-a),'%d°'%(180-a)])
    def sw(r):
        a=r.randint(30,150);return F(1,'Zwei Geraden schneiden sich. Ein Winkel misst %d°. Wie gross ist der Scheitelwinkel?'%a,a,[180-a,360-a,90],'Scheitelwinkel sind gleich gross.',[['Scheitelwinkel = %d°'%a,'gleich']],[str(a),'%d°'%a])
    def pg(r):
        a=r.choice([50,60,70,80,65,75,110]);return F(2,'Ein Parallelogramm hat einen Winkel von %d°. Wie gross ist der benachbarte Winkel?'%a,180-a,[a,360-a,90],'Benachbarte Winkel im Parallelogramm ergeben 180°.',[['180 − %d = %d'%(a,180-a),'Nachbarwinkel']],[str(180-a),'%d°'%(180-a)])
    def pg2(r):
        a=r.choice([50,60,70,80,65,75,110]);return F(2,'Ein Parallelogramm hat einen Winkel von %d°. Wie gross ist der gegenüberliegende Winkel?'%a,a,[180-a,360-a,90],'Gegenüberliegende Winkel im Parallelogramm sind gleich.',[['Gegenüber = %d°'%a,'gleich']],[str(a),'%d°'%a])
    def tz(r):
        a=r.choice([55,65,75,85,95,105]);return F(2,'In einem Trapez ist AB parallel zu CD. Der Winkel α bei A misst %d°. Wie gross ist der Winkel δ bei D?'%a,180-a,[a,360-a,90],'Die Winkel zwischen den Parallelen ergeben 180°.',[['180 − %d = %d'%(a,180-a),'δ']],[str(180-a),'%d°'%(180-a)])
    def nm(r):
        q,a=r.choice([('Welches Viereck hat zwei Paare paralleler Seiten?','Parallelogramm'),('Welches Viereck hat genau ein Paar paralleler Seiten?','Trapez')])
        return F(1,q,a,['Trapez' if a!='Trapez' else 'Parallelogramm','allgemeines Viereck','Drachen'],'Zähle die parallelen Seitenpaare.',[[a,'Name']])
    def pf(r):
        g,h=r.randint(4,12),r.randint(3,9);return F(2,'Ein Parallelogramm hat die Grundseite %d cm und die Höhe %d cm. Wie gross ist die Fläche in cm²?'%(g,h),g*h,[g+h,2*(g+h),g*h//2],'Fläche = Grundseite · Höhe.',[['%d · %d = %d'%(g,h,g*h),'Fläche']],[str(g*h)])
    def tf(r):
        a,c,h=r.choice([(8,4,5),(10,6,4),(12,8,3),(9,5,6),(7,3,4),(10,4,5)]);A=(a+c)*h//2;return F(3,'Ein Trapez hat die parallelen Seiten %d cm und %d cm und die Höhe %d cm. Wie gross ist die Fläche in cm²?'%(a,c,h),A,[(a+c)*h,a*h,A+h],'Fläche = (a + c) : 2 · h.',[['%d + %d = %d'%(a,c,a+c),'Summe'],['%d : 2 · %d = %d'%(a+c,h,A),'Fläche']],[str(A)])
    return [st,we,nb,sw,pg,pg2,tz,nm,pf,tf,st,we,pf,tf]
def t_wp():
    t=make('kl7-mathe-winkel-parallelen','kl7','Geometrie','Winkelsätze, Parallelogramm und Trapez',712,wp(),('Winkel an Parallelen','Stufenwinkel und Wechselwinkel sind gleich gross. Scheitelwinkel sind auch gleich.',[['Stufenwinkel 70°','Wechselwinkel 70°']]))
    TH(t,'Eine Strasse kreuzt zwei parallele Schienen. An jeder Kreuzung entstehen gleiche Winkel. Mit den Winkelsätzen findest du fehlende Winkel, auch in Parallelogramm und Trapez.',
       'Zwei Parallelen, eine Strasse.','Stufenwinkel sind gleich!',
       [['Stufenwinkel','Gleiche Lage an Parallelen','gleich gross'],['Wechselwinkel','Gegenüber an Parallelen','gleich gross'],['Scheitelwinkel','Gegenüber am Schnittpunkt','gleich gross'],['Parallelogramm','Zwei Paare Parallelen','α + β = 180°']],
       'Beim Parallelogramm ergeben benachbarte Winkel 180°.',[CH([['70°','α',0],['+','',2],['110°','β',1],['=','',2],['180°','Summe',7]])],
       [['Parallelogramm','A = g · h'],['Trapez','A = (a + c) : 2 · h'],['Winkel','Nachbarwinkel 180°']],
       'So findest du einen Winkel an Parallelen.',[['Parallelen erkennen','Welche Geraden?',0],['Winkelpaar benennen','Stufen-, Wechsel-, Scheitelwinkel',1],['Regel anwenden','Gleich oder 180°',2],['Probe machen','Summe prüfen',3]],
       [[['α = 70°','',0],['→','',2],['Stufenwinkel','',1],['=','',2],['70°','',2]],[['α = 70°','',0],['→','',2],['180° − 70°','',1],['=','',2],['110°','Nebenwinkel',2]]],
       'Merke diese Regeln.',[['Gleich gross','Stufen-, Wechsel-, Scheitelwinkel','70° = 70°',0],['Ergänzen','Nebenwinkel zusammen 180°','70° + 110°',1],['Trapez','Fläche (a + c) : 2 · h','(8 + 4) : 2 · 5',2]])
    return t
T.append(t_wp)

# ---------- Kl.8 Potenzen ----------
def po():
    def p1(r):
        b,e=r.choice([(2,3),(2,4),(2,5),(2,6),(3,2),(3,3),(3,4),(4,2),(4,3),(5,2),(5,3),(6,2),(7,2),(10,3),(10,4),(9,2)]);v=b**e;return F(1,'%d%s = ?'%(b,sup(e)),fmt(v),[fmt(b*e),fmt(v+b),fmt(b**(e-1))],'%d mal sich selbst, %d Faktoren.'%(b,e),[[' · '.join([str(b)]*e)+' = %s'%fmt(v),'Potenz']],fv(v))
    def p2(r):
        a,b=r.randint(2,6),r.randint(2,6);return F(2,'x%s · x%s = ?'%(sup(a),sup(b)),'x%s'%sup(a+b),['x%s'%sup(a*b),'2x%s'%sup(a+b),'x%s'%sup(a+b+1)],'Gleiche Basis: Exponenten addieren.',[['%d + %d = %d'%(a,b,a+b),'Exponent']],['x^%d'%(a+b),'x%s'%sup(a+b)])
    def p3(r):
        a=r.randint(4,9);b=r.randint(2,a-1);return F(2,'x%s : x%s = ?'%(sup(a),sup(b)),'x%s'%sup(a-b),['x%s'%sup(a+b),'x%s'%sup(max(a//b,1)),'1'],'Gleiche Basis: Exponenten subtrahieren.',[['%d − %d = %d'%(a,b,a-b),'Exponent']],['x^%d'%(a-b),'x%s'%sup(a-b)])
    def p4(r):
        b=r.randint(2,12);return F(2,'%d⁰ = ?'%b,1,[0,b,b*0+2],'Jede Zahl hoch 0 ist 1.',[['%d⁰ = 1'%b,'Regel']],['1'])
    def p5(r):
        b,e=r.choice([(2,3),(3,3),(2,5),(5,3),(4,3),(3,2),(5,2),(6,2)]);v=(-b)**e;return F(3,'(−%d)%s = ?'%(b,sup(e)),z(v),[z(-v),z(b*e),z(-b*e)],'Ungerader Exponent: das Ergebnis ist negativ. Gerader: positiv.',[['(−%d)%s = %s'%(b,sup(e),z(v)),'Potenz']],nz(v))
    def p6(r):
        a=r.randint(2,9);e=r.choice([2,3,4,5]);v=a*10**e;return F(2,'%d · 10%s = ?'%(a,sup(e)),fmt(v),[fmt(a*e*10),fmt(v*10),fmt(v//10)],'Hänge %d Nullen an.'%e,[['%d und %d Nullen'%(a,e),fmt(v)]],fv(v))
    def p7(r):
        a,b=r.choice([(2,5),(3,4),(2,6),(5,3),(3,5),(4,3),(2,7),(6,2)]);A,B=a**b,b**a
        if A==B:return p1(r)
        w='%d%s'%(a,sup(b)) if A>B else '%d%s'%(b,sup(a))
        return F(3,'Was ist grösser: %d%s oder %d%s?'%(a,sup(b),b,sup(a)),w,['%d%s'%(b,sup(a)) if A>B else '%d%s'%(a,sup(b))],'Rechne beide Potenzen aus.',[['%d%s = %d'%(a,sup(b),A),'erste'],['%d%s = %d'%(b,sup(a),B),'zweite']])
    def p8(r):
        a=r.randint(2,9);return F(1,'%d² + %d² = ?'%(a,a),2*a*a,[a**4,4*a,(2*a)**2],'Rechne beide Quadrate einzeln und addiere.',[['%d + %d = %d'%(a*a,a*a,2*a*a),'Summe']],[str(2*a*a)])
    return [p1,p2,p3,p4,p5,p6,p7,p8,p1,p2,p3,p5]
def t_po():
    t=make('kl8-mathe-potenzen','kl8','Terme und Gleichungen','Potenzen',811,po(),('Potenz','Eine Potenz ist ein kurzes Malnehmen: 2⁵ = 2 · 2 · 2 · 2 · 2.',[['2⁵','= 32']]))
    TH(t,'Ein Schachbrett hat 64 Felder. Legst du auf das erste Feld 1 Reiskorn und verdoppelst jedes Mal, wächst es schnell. Mit Potenzen schreibst du das kurz auf.',
       '1, 2, 4, 8, 16 …','2 mal 2 mal 2 … = 2⁵',
       [['Basis','Die Zahl, die vervielfacht wird','2'],['Exponent','Wie oft die Basis vorkommt','5'],['Potenz','Das Ergebnis','2⁵ = 32'],['Zehnerpotenz','Basis 10','10³ = 1000']],
       'Der Exponent zählt die Faktoren.',[CH([['2','Basis',0],['5','Exponent',1],['=','',2],['32','Potenz',2]]),CH([['2','',0],['·','',2],['2','',0],['·','',2],['2','',0],['·','',2],['2','',0],['·','',2],['2','',0]])],
       [['a ⁿ · a ᵐ','Exponenten addieren'],['a ⁿ : a ᵐ','Exponenten subtrahieren'],['a⁰','ist immer 1']],
       'So rechnest du mit Potenzen.',[['Basis und Exponent erkennen','Was wird wie oft multipliziert?',0],['Gleiche Basis prüfen','Dann Regeln anwenden',1],['Exponenten verrechnen','Plus beim Malnehmen',2],['Ausrechnen','Als Zahl schreiben',3]],
       [[['x³ · x²','',0],['=','',2],['x',''  ,7],['3 + 2','',1],['=','',2],['x⁵','',2]],[['2⁵','',0],['=','',2],['2·2·2·2·2','',1],['=','',2],['32','',2]]],
       'Merke diese Regeln.',[['Malnehmen','Exponenten addieren','x³ · x² = x⁵',0],['Teilen','Exponenten subtrahieren','x⁵ : x² = x³',1],['Hoch null','Immer 1','7⁰ = 1',2]])
    return t
T.append(t_po)

# ---------- Kl.8 Oberfläche ----------
def ob():
    PI=D('3.14')
    def w(r):
        a=r.randint(2,12);return F(1,'Ein Würfel hat die Kantenlänge %d cm. Wie gross ist die Oberfläche in cm²?'%a,6*a*a,[a**3,4*a*a,6*a],'Ein Würfel hat 6 gleiche Quadrate.',[['%d · %d = %d'%(a,a,a*a),'ein Quadrat'],['6 · %d = %d'%(a*a,6*a*a),'Oberfläche']],[str(6*a*a)])
    def q(r):
        a,b,c=r.randint(2,9),r.randint(2,9),r.randint(2,9);O=2*(a*b+b*c+a*c);return F(2,'Ein Quader ist %d cm lang, %d cm breit und %d cm hoch. Wie gross ist die Oberfläche in cm²?'%(a,b,c),O,[a*b*c,a*b+b*c+a*c,2*a*b*c],'Rechne drei verschiedene Flächen und nimm alles mal 2.',[['%d + %d + %d = %d'%(a*b,b*c,a*c,a*b+b*c+a*c),'drei Flächen'],['2 · %d = %d'%(a*b+b*c+a*c,O),'Oberfläche']],[str(O)])
    def pq(r):
        a,h=r.randint(2,9),r.randint(3,10);O=2*a*a+4*a*h;return F(2,'Ein Prisma hat eine quadratische Grundfläche mit der Seite %d cm und ist %d cm hoch. Wie gross ist die Oberfläche in cm²?'%(a,h),O,[a*a*h,4*a*h,2*a*a+a*h],'Oberfläche = 2 · Grundfläche + Mantel.',[['2 · %d = %d'%(a*a,2*a*a),'Boden und Deckel'],['4 · %d · %d = %d'%(a,h,4*a*h),'Mantel'],['%d + %d = %d'%(2*a*a,4*a*h,O),'Oberfläche']],[str(O)])
    def pd(r):
        a,b,c,k=r.choice([(3,4,5,1),(6,8,10,1),(3,4,5,2)]);h=r.randint(3,9);G=a*b//2;O=2*G+(a+b+c)*h
        return F(3,'Ein Prisma hat als Grundfläche ein rechtwinkliges Dreieck mit den Seiten %d cm, %d cm und %d cm. Es ist %d cm hoch. Wie gross ist die Oberfläche in cm²?'%(a,b,c,h),O,[G*h,G+(a+b+c)*h,2*G+h],'Oberfläche = 2 · Grundfläche + Umfang · Höhe.',[['Grundfläche: %d · %d : 2 = %d'%(a,b,G),'Dreieck'],['Mantel: %d · %d = %d'%(a+b+c,h,(a+b+c)*h),'Umfang · Höhe'],['2 · %d + %d = %d'%(G,(a+b+c)*h,O),'Oberfläche']],[str(O)])
    def zy(r):
        rr=r.choice([1,2,5,10]);h=r.randint(2,10);O=2*PI*rr*rr+2*PI*rr*h;return F(3,'Ein Zylinder hat den Radius %d cm und die Höhe %d cm. Wie gross ist die Oberfläche in cm²? (π ≈ 3,14)'%(rr,h),dc(O),[dc(2*PI*rr*h),dc(PI*rr*rr*h),dc(PI*rr*rr+2*PI*rr*h)],'Oberfläche = 2 · Kreis + Mantel.',[['2 · %d · %d · 3,14 = %s'%(rr,rr,dc(2*PI*rr*rr)),'Boden und Deckel'],['2 · %d · 3,14 · %d = %s'%(rr,h,dc(2*PI*rr*h)),'Mantel'],['%s + %s = %s'%(dc(2*PI*rr*rr),dc(2*PI*rr*h),dc(O)),'Oberfläche']],dz(O))
    def zm(r):
        rr=r.choice([1,2,5,10]);h=r.randint(2,10);M=2*PI*rr*h;return F(2,'Ein Zylinder hat den Radius %d cm und die Höhe %d cm. Wie gross ist nur der Mantel in cm²? (π ≈ 3,14)'%(rr,h),dc(M),[dc(M+2*PI*rr*rr),dc(M/2),dc(PI*rr*rr)],'Mantel = Umfang · Höhe.',[['2 · %d · 3,14 = %s'%(rr,dc(2*PI*rr)),'Umfang'],['%s · %d = %s'%(dc(2*PI*rr),h,dc(M)),'Mantel']],dz(M))
    def an(r):
        a=r.randint(2,6);return F(1,'Ein Würfel hat die Kantenlänge %d cm. Aus wie vielen gleich grossen Quadraten besteht seine Oberfläche?'%a,6,[4,8,12],'Ein Würfel hat 6 Seiten.',[['6 Quadrate','Seiten']],['6'])
    return [w,q,pq,pd,zy,zm,an,w,q,pq,pd,zy,zm]
def t_ob():
    t=make('kl8-mathe-oberflaeche','kl8','Geometrie','Oberfläche von Prismen und Zylindern',812,ob(),('Oberfläche','Oberfläche = 2 · Grundfläche + Mantel.',[['Würfel a = 3 cm','O = 54 cm²']]),ncards=34)
    TH(t,'Du willst einen Karton mit Papier einpacken. Wie viel Papier brauchst du? Das ist die Oberfläche. Sie besteht aus Boden, Deckel und Mantel.',
       'Wie viel Papier brauche ich?','Alle Flächen zusammen!',
       [['Oberfläche','Alle Flächen zusammen','O'],['Mantel','Seitenflächen','M'],['Grundfläche','Boden und Deckel','G'],['Netz','Aufgeklappter Körper','Zeichnung']],
       'Aus dem Netz siehst du alle Flächen: zweimal die Grundfläche und den Mantel.',[CH([['2 · G','Boden, Deckel',0],['+','',2],['M','Mantel',1],['=','',2],['O','Oberfläche',2]])],
       [['Prisma','O = 2 · G + U · h'],['Zylinder','O = 2 · r · r · π + 2 · r · π · h'],['Würfel','O = 6 · a · a']],
       'So rechnest du die Oberfläche.',[['Körper erkennen','Prisma oder Zylinder?',0],['Grundfläche rechnen','Mal 2',1],['Mantel rechnen','Umfang mal Höhe',2],['Addieren','Oberfläche',3]],
       [[['2 · 25','Boden, Deckel',0],['+','',2],['4 · 5 · 10','Mantel',1],['=','',2],['250','cm²',2]],[['2 · 78,5','Kreise',0],['+','',2],['314','Mantel',1],['=','',2],['471','cm²',2]]],
       'Merke diese Regeln.',[['Mantel','Umfang · Höhe','U · h',0],['Zylinder','Mantel ist ein Rechteck','2 · r · π · h',1],['Einheit','Immer cm²','Fläche',2]])
    return t
T.append(t_ob)

# ---------- Kl.8 Koordinatensystem ----------
def kd():
    def qd(r):
        x,y=r.choice([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]),r.choice([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);qn='I' if x>0 and y>0 else 'II' if x<0 and y>0 else 'III' if x<0 else 'IV'
        return F(1,'In welchem Quadranten liegt P%s?'%pt(x,y),qn,[a for a in['I','II','III','IV'] if a!=qn],'x ist die Waagrechte, y die Senkrechte.',[['x %s 0, y %s 0'%('>' if x>0 else '<','>' if y>0 else '<'),qn]])
    def ab(r):
        x,y=r.randint(1,9),r.randint(1,9);return F(1,'Gehe vom Nullpunkt %d nach rechts und %d nach oben. Wie heisst der Punkt?'%(x,y),pt(x,y),ptw(x,y,r),'Zuerst x (rechts), dann y (oben).',[[pt(x,y),'Punkt']],[pt(x,y),'(%d|%d)'%(x,y),'(%d/%d)'%(x,y)])
    def sx(r):
        x,y=r.randint(-6,6) or 3,r.randint(-6,6) or 2;return F(2,'Spiegle P%s an der x-Achse. Wie heisst der Bildpunkt?'%pt(x,y),pt(x,-y),ptw(x,-y,r),'Bei der Spiegelung an der x-Achse wechselt y das Vorzeichen.',[[pt(x,-y),'Bildpunkt']],[pt(x,-y),'(%d|%d)'%(x,-y)])
    def sy(r):
        x,y=r.randint(-6,6) or 3,r.randint(-6,6) or 2;return F(2,'Spiegle P%s an der y-Achse. Wie heisst der Bildpunkt?'%pt(x,y),pt(-x,y),ptw(-x,y,r),'Bei der Spiegelung an der y-Achse wechselt x das Vorzeichen.',[[pt(-x,y),'Bildpunkt']],[pt(-x,y),'(%d|%d)'%(-x,y)])
    def ur(r):
        x,y=r.randint(-6,6) or 3,r.randint(-6,6) or 2;return F(3,'Spiegle P%s am Nullpunkt. Wie heisst der Bildpunkt?'%pt(x,y),pt(-x,-y),ptw(-x,-y,r),'Beide Koordinaten wechseln das Vorzeichen.',[[pt(-x,-y),'Bildpunkt']],[pt(-x,-y),'(%d|%d)'%(-x,-y)])
    def ds(r):
        x1,y=r.randint(-5,3),r.randint(-5,5);d=r.randint(2,8);return F(2,'Wie weit sind A%s und B%s voneinander entfernt?'%(pt(x1,y),pt(x1+d,y)),d,[d+1,d-1,2*d],'Beide Punkte haben dasselbe y. Zähle die Schritte nach rechts.',[['%s − %s = %d'%(p(x1+d),p(x1),d),'Abstand']],[str(d)])
    def mp(r):
        x1,y1=r.randint(-4,4),r.randint(-4,4);dx,dy=r.randint(1,4)*2,r.randint(1,4)*2;x2,y2=x1+dx,y1+dy;mx,my=x1+dx//2,y1+dy//2
        return F(3,'Wie heisst die Mitte der Strecke zwischen A%s und B%s?'%(pt(x1,y1),pt(x2,y2)),pt(mx,my),ptw(mx,my,r),'Berechne die Mitte der x-Werte und die Mitte der y-Werte.',[['(%s + %s) : 2 = %s'%(p(x1),p(x2),z(mx)),'x'],['(%s + %s) : 2 = %s'%(p(y1),p(y2),z(my)),'y']],[pt(mx,my),'(%d|%d)'%(mx,my)])
    def rc(r):
        x,y=r.randint(-3,2),r.randint(-3,2);a,b=r.randint(3,6),r.randint(2,5);return F(3,'Ein Rechteck hat die Ecken A%s, B%s und C%s. Wie heisst die vierte Ecke D?'%(pt(x,y),pt(x+a,y),pt(x+a,y+b)),pt(x,y+b),ptw(x,y+b,r),'D liegt über A und neben C.',[['x von A: %s'%z(x),'D hat dasselbe x'],['y von C: %s'%z(y+b),'D hat dasselbe y']],[pt(x,y+b),'(%d|%d)'%(x,y+b)])
    return [qd,ab,sx,sy,ur,ds,mp,rc,qd,ab,sx,sy,ds,mp]
def t_kd():
    t=make('kl8-mathe-koordinaten','kl8','Funktionen','Koordinatensystem',813,kd(),('Koordinaten','Ein Punkt hat zwei Koordinaten: zuerst x (rechts), dann y (oben).',[['P(3|2)','3 rechts, 2 oben']]))
    TH(t,'Im Spiel Schiffe versenken nennst du Felder mit Buchstabe und Zahl. Im Koordinatensystem machst du das mit zwei Zahlen. So findest du jeden Punkt in der Ebene.',
       'Wo ist das Schiff?','P(3|2): 3 rechts, 2 oben!',
       [['x-Achse','Waagrechte Achse','→'],['y-Achse','Senkrechte Achse','↑'],['Koordinaten','Zwei Zahlen für einen Punkt','(3|2)'],['Quadrant','Eines der vier Viertel','I bis IV']],
       'Die Achsen teilen die Ebene in vier Quadranten.',[TBL(['Quadrant','x','y'],[['I','+','+'],['II','−','+'],['III','−','−'],['IV','+','−']],None)],
       [['x zuerst','Dann y'],['Spiegeln an x-Achse','y wechselt das Vorzeichen'],['Spiegeln an y-Achse','x wechselt das Vorzeichen']],
       'So setzt du einen Punkt.',[['Koordinaten lesen','(x|y)',0],['x abtragen','Rechts oder links',1],['y abtragen','Oben oder unten',2],['Punkt markieren','Beschriften',3]],
       [[['P(3|2)','',7],['→','',2],['3','rechts',0],['2','oben',1]],[['P(3|4)','',7],['→','',2],['x-Achse','',0],['(3|−4)','',2]]],
       'Merke diese Regeln.',[['Reihenfolge','Erst x, dann y','(3|2)',0],['x-Achse','y wechselt das Vorzeichen','(3|4) → (3|−4)',1],['Nullpunkt','Beide wechseln','(3|4) → (−3|−4)',2]])
    return t
T.append(t_kd)

# ---------- Kl.9 Einsetzungs- und Gleichsetzungsverfahren ----------
def ei():
    def e1(r):
        x=r.randint(1,9);m=r.randint(2,4);c=r.randint(0,5);S=(1+m)*x+c;lab='y = '+lin(m,c)
        return F(2,'Es gilt %s und x + y = %d. Wie gross ist x?'%(lab,S),x,[x+1,x-1,S-c],'Setze y in die zweite Gleichung ein.',[['x + (%s) = %d'%(lin(m,c),S),'Einsetzen'],['%s = %d'%(lin(1+m,c),S),'zusammenfassen'],['x = %d'%x,'lösen']],[str(x)])
    def e2(r):
        x=r.randint(1,9);m=r.randint(2,4);c=r.randint(0,5);S=(1+m)*x+c;y=m*x+c;lab='y = '+lin(m,c)
        return F(2,'Es gilt %s und x + y = %d. Wie gross ist y?'%(lab,S),y,[x,y+1,S],'Berechne zuerst x, dann y.',[['x = %d'%x,'zuerst'],['y = %d · %d + %d = %d'%(m,x,c,y) if c else 'y = %d · %d = %d'%(m,x,y),'dann y']],[str(y)])
    def g1(r):
        x=r.randint(1,8);m1,m2=r.sample(range(1,6),2);c1=r.randint(0,6);c2=(m1-m2)*x+c1
        if c2<0:return e1(r)
        return F(2,'Es gilt y = %s und y = %s. Wie gross ist x?'%(lin(m1,c1),lin(m2,c2)),x,[x+1,x-1,c2],'Setze die beiden rechten Seiten gleich.',[['%s = %s'%(lin(m1,c1),lin(m2,c2)),'gleichsetzen'],['x = %d'%x,'lösen']],[str(x)])
    def g2(r):
        x=r.randint(1,8);m1,m2=r.sample(range(1,6),2);c1=r.randint(0,6);c2=(m1-m2)*x+c1;y=m1*x+c1
        if c2<0:return e2(r)
        return F(3,'Es gilt y = %s und y = %s. Wie gross ist y?'%(lin(m1,c1),lin(m2,c2)),y,[x,y+1,y-1],'Berechne zuerst x. Setze x in eine Gleichung ein.',[['x = %d'%x,'zuerst'],['y = %d · %d + %d = %d'%(m1,x,c1,y) if c1 else 'y = %d · %d = %d'%(m1,x,y),'dann y']],[str(y)])
    def t1(r):
        s=r.randint(1,5);d=r.randint(1,4);return F(3,'Ein Heft und ein Stift kosten zusammen %d Fr. Das Heft kostet %d Fr. mehr als der Stift. Wie viel kostet der Stift?'%(2*s+d,d),s,[s+1,s+d,(2*s+d)//2],'Heft = Stift + %d. Setze in „Heft + Stift“ ein.'%d,[['(s + %d) + s = %d'%(d,2*s+d),'Gleichung'],['2s = %d'%(2*s),'zusammenfassen'],['s = %d'%s,'lösen']],[str(s)])
    def p1(r):
        x,y=r.randint(1,8),r.randint(1,8);ok=r.random()<.5;xx=x if ok else x+1
        return F(2,'Ist x = %d, y = %d eine Lösung von y = %s und x + y = %d?'%(xx,y,lin(1,y-x),x+y),'ja' if ok else 'nein',['nein' if ok else 'ja'],'Setze beide Zahlen in beide Gleichungen ein.',[['%d + %d = %d'%(xx,y,xx+y),'zweite Gleichung']])
    def v1(r):
        return F(1,r.choice(['Wann verwendest du das Gleichsetzungsverfahren?','Wann ist das Gleichsetzen besonders einfach?']),'Wenn beide Gleichungen nach y aufgelöst sind',['Wenn nur eine Unbekannte vorkommt','Wenn x gleich y ist','Nie'],'Zwei gleiche Terme für y lassen sich gleichsetzen.',[['y = … und y = …','gleichsetzen']])
    def v2(r):
        return F(1,'Wann verwendest du das Einsetzungsverfahren?','Wenn eine Gleichung nach einer Unbekannten aufgelöst ist',['Wenn beide Gleichungen gleich sind','Wenn es keine Lösung gibt','Nur bei Dreiecken'],'Du setzt den Term in die andere Gleichung ein.',[['y = … in x + y = …','einsetzen']])
    return [e1,e2,g1,g2,t1,p1,v1,v2,e1,e2,g1,g2,t1]
def t_ei():
    t=make('kl9-mathe-einsetzung','kl9','Gleichungen','Einsetzungs- und Gleichsetzungsverfahren',911,ei(),('Verfahren','Beim Einsetzen ersetzt du eine Unbekannte durch einen Term. Beim Gleichsetzen setzt du zwei gleiche Terme gleich.',[['y = 2x + 1','x + y = 10']]),nex=16)
    TH(t,'Zwei Handyabos haben einen Grundpreis und einen Preis pro Gigabyte. Bei wie vielen Gigabyte kosten beide gleich viel? Das findest du, wenn du die beiden Preisterme gleichsetzt.',
       'Abo A: 2x + 1, Abo B: x + 4.','Gleich bei x = 3!',
       [['Einsetzen','Term in die andere Gleichung','y = 2x + 1'],['Gleichsetzen','Zwei Terme für y gleichsetzen','2x + 1 = x + 4'],['Lösung','x und y zusammen','(3|7)'],['Probe','In beide Gleichungen','7 = 2·3+1']],
       'Beim Gleichsetzen entsteht eine einfache Gleichung mit nur einer Unbekannten.',[CH([['2x + 1','Abo A',0],['=','',2],['x + 4','Abo B',1]]),CH([['x','',0],['=','',2],['3','Lösung',2]])],
       [['Einsetzen','y ersetzen'],['Gleichsetzen','Zwei Terme gleichsetzen'],['Danach','Andere Unbekannte berechnen']],
       'So löst du ein Gleichungssystem.',[['Verfahren wählen','Einsetzen oder Gleichsetzen',0],['Eine Gleichung bilden','Nur noch x übrig',1],['x ausrechnen','Wie eine einfache Gleichung',2],['y berechnen und Probe','In beide Gleichungen',3]],
       [[['2x + 1','',0],['=','',2],['x + 4','',1],['→','',2],['x = 3','',2]],[['y = 2 · 3 + 1','',0],['=','',2],['7','y',2]]],
       'Merke diese Regeln.',[['Einsetzen','Wenn y = … schon dasteht','y = 2x + 1',0],['Gleichsetzen','Wenn zweimal y = … dasteht','2x + 1 = x + 4',1],['Probe','In beide Gleichungen','7 = 3 + 4',2]])
    return t
T.append(t_ei)
