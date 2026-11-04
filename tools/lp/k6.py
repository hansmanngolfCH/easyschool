from ar import *
from decimal import Decimal as D
from math import gcd
T=[]
def c(x):
    x=D(x).normalize();s=format(x,'f')
    return s.replace('.',',')
def fr(a,b):return '%d/%d'%(a,b)
def dezv():
    t=Topic('kl6-mathe-dezimal-vertiefung','kl6','Rationale Zahlen','Dezimalzahlen vertiefen','mathe',1000,seed=81)
    t.th('basis','Stellenwerte nach dem Komma','Nach dem Komma folgen Zehntel, Hundertstel und Tausendstel. Jede Stelle ist 10-mal kleiner.',[['0,125','1 Zehntel, 2 Hundertstel, 5 Tausendstel']])
    t.th('mal','Mal 10, mal 100','Beim Malnehmen mit 10 oder 100 wandert das Komma nach rechts. Beim Teilen wandert es nach links.',[['3,45 × 10','= 34,5']])
    R=t.rnd
    names=['Zehntel','Hundertstel','Tausendstel']
    for x in ['0,125','4,73','12,609','0,058','7,304','9,86','25,041','0,7']:
        s=x.split(',')[1]
        for i,nm in enumerate(names):
            if i<len(s) and len(t.cards)<10+3*len([1]) and R.random()<.5:
                t.card(1,'%s: Welche Ziffer steht bei den %s?'%(x,nm),s[i],[d for d in '0123456789' if d!=s[i]][:3],hints=['Von links nach dem Komma zählen.'],steps=[[s[i],nm]],th='basis')
    for x in ['3,45','0,6','12,07','5,8','0,33','8,125']:
        for f_,lab in [(10,'10'),(100,'100')]:
            r=D(x.replace(',','.'))*f_
            if r<=1000:t.card(2,'%s × %s = ?'%(x,lab),c(r),[c(r/10),c(r+1),c(r-1)],hints=['Komma wandert nach rechts.'],steps=[['%s × %s = %s'%(x,lab,c(r)),'Komma verschieben']],th='mal')
    for x in ['340','25','8','4,5','70','126']:
        for f_,lab in [(10,'10'),(100,'100')]:
            r=D(x.replace(',','.'))/f_
            t.card(2,'%s : %s = ?'%(x,lab),c(r),[c(r*10),c(r/10),c(r+1)],hints=['Komma wandert nach links.'],steps=[['%s : %s = %s'%(x,lab,c(r)),'Komma verschieben']],th='mal')
    for a,b in [('0,305','0,35'),('2,7','2,07'),('1,25','1,250'),('0,9','0,89'),('3,01','3,1')]:
        fa,fb=D(a.replace(',','.')),D(b.replace(',','.'));s='>' if fa>fb else '<' if fa<fb else '='
        t.card(2,'Setze das Zeichen: %s ○ %s'%(a,b),s,[x for x in '<>=' if x!=s],hints=['Gleich viele Stellen schreiben.'],steps=[['%s %s %s'%(a,s,b),'Vergleichen']],th='basis')
    for a,b in [('4,85','2,7'),('12,5','3,75'),('0,6','0,45'),('8,2','6,45')]:
        r=D(a.replace(',','.'))+D(b.replace(',','.'));t.card(3,'%s + %s = ?'%(a,b),c(r),[c(r+D('0.1')),c(r-D('0.1')),c(r+1)],hints=['Komma unter Komma.'],steps=[['%s + %s = %s'%(a,b,c(r)),'Plus']],th='basis')
    for a,b in [('9,5','2,75'),('15,2','8,45'),('6,0','3,6'),('20,5','7,25')]:
        r=D(a.replace(',','.'))-D(b.replace(',','.'));t.card(3,'%s %s %s = ?'%(a,M,b),c(r),[c(r+D('0.1')),c(r-D('0.1')),c(r+1)],hints=['Komma unter Komma.'],steps=[['%s %s %s = %s'%(a,M,b,c(r)),'Minus']],th='basis')
    for x in ['4,07','2,356','0,98','15,4']:
        pass
    ex=[]
    for x,nm in [('6,284','Hundertstel'),('0,509','Tausendstel'),('13,72','Zehntel'),('4,055','Hundertstel')]:
        s=x.split(',')[1];i=names.index(nm);t.exam('%s: Welche Ziffer steht bei den %s?'%(x,nm),None,ans=[s[i]],expl=s[i])
    for x,f_ in [('4,35',10),('0,86',100),('12,5',10),('7,04',100)]:
        r=D(x.replace(',','.'))*f_;t.exam('%s × %d = ?'%(x,f_),c(r),[c(r/10),c(r+1),c(r-1)],expl=c(r))
    for x,f_ in [('450',10),('37',100),('9',10),('280',100)]:
        r=D(x)/f_;t.exam('%s : %d = ?'%(x,f_),None,ans=[c(r),c(r).replace(',','.')],expl=c(r))
    for a,b in [('0,45','0,405'),('3,2','3,19')]:
        fa,fb=D(a.replace(',','.')),D(b.replace(',','.'));s='>' if fa>fb else '<';t.exam('Setze das Zeichen: %s ○ %s'%(a,b),s,[x for x in '<>=' if x!=s],expl='%s %s %s'%(a,s,b))
    for a,b in [('6,45','3,8'),('11,2','4,75')]:
        r=D(a.replace(',','.'))+D(b.replace(',','.'));t.exam('%s + %s = ?'%(a,b),None,ans=[c(r),c(r).replace(',','.')],expl=c(r))
    theory_steps(t,'Dezimalzahlen haben Stellen nach dem Komma. Du vergleichst, rechnest und verschiebst das Komma.',[TBL(['Ganze','Z\'tel','H\'tel','T\'tel'],[['3',',4','5','0'],['0',',1','2','5']],None)],
        [['Zehntel','1. Stelle nach dem Komma','0,1'],['Hundertstel','2. Stelle','0,01'],['Tausendstel','3. Stelle','0,001'],['Komma verschieben','mal 10: nach rechts','3,45 × 10 = 34,5']],
        'Jede Stelle nach dem Komma ist 10-mal kleiner.',[TBL(['Zahl','Ganze','Zehntel','Hundertstel','Tausendstel'],[['0,125','0','1','2','5'],['4,73','4','7','3','0']],None)],
        'Das Komma wandert mit.',['Rechnung','Komma'],[['× 10','1 Stelle nach rechts'],['× 100','2 Stellen nach rechts'],[': 10','1 Stelle nach links'],[': 100','2 Stellen nach links']],
        'So vergleichst und rechnest du.',[['Stellen angleichen','Mit Nullen auffüllen',0],['Komma unter Komma','Beim Plus und Minus',1],['Rechnen','Wie ohne Komma',2],['Komma setzen','An gleicher Stelle',3]],
        [[['0,305 oder 0,35','vergleichen',0],['0,305 und 0,350','auffüllen',1],['0,305 < 0,350','Ergebnis',2]],[['4,85 + 2,7','Aufgabe',0],['4,85 + 2,70','auffüllen',1],['7,55','Summe',2]]],
        'Merke: Komma verschieben, Stellen auffüllen.',[['mal 10','Komma nach rechts','3,45 → 34,5',0],['durch 10','Komma nach links','34,5 → 3,45',1],['Auffüllen','Nullen anhängen','0,5 = 0,50',2]])
    return t
T.append(dezv)
def erw():
    t=Topic('kl6-mathe-erweitern-kuerzen','kl6','Rationale Zahlen','Brüche erweitern und kürzen','mathe',1000,seed=82)
    t.th('basis','Erweitern','Beim Erweitern multiplizierst du Zähler und Nenner mit derselben Zahl. Der Wert bleibt gleich.',[['1/2 mit 3','= 3/6']])
    t.th('kuerz','Kürzen','Beim Kürzen teilst du Zähler und Nenner durch dieselbe Zahl. Der Wert bleibt gleich.',[['6/8 durch 2','= 3/4']])
    R=t.rnd
    for a,b,k in [(1,2,3),(1,3,2),(2,3,4),(3,4,2),(1,4,5),(2,5,3),(3,5,4),(5,6,2),(1,5,6),(3,8,3)]:
        r=fr(a*k,b*k);t.card(1,'Erweitere %s mit %d.'%(fr(a,b),k),r,[fr(a+k,b+k),fr(a*k,b),fr(a,b*k)],hints=['Zähler und Nenner mal %d.'%k],steps=[['%d × %d = %d'%(a,k,a*k),'Zähler'],['%d × %d = %d'%(b,k,b*k),'Nenner']],vis=[{"type":"pie","parts":b,"filled":a},{"type":"pie","parts":b*k,"filled":a*k}] if b*k<=12 else None,th='basis')
    for a,b,k in [(2,4,2),(3,6,3),(4,8,4),(6,9,3),(10,15,5),(8,12,4),(9,12,3),(12,16,4),(15,20,5),(6,10,2)]:
        r=fr(a//k,b//k);t.card(1,'Kürze %s mit %d.'%(fr(a,b),k),r,[fr(a-k,b-k) if a-k>0 else fr(a,b//k),fr(a//k,b),fr(a,b//k)],hints=['Zähler und Nenner durch %d.'%k],steps=[['%d : %d = %d'%(a,k,a//k),'Zähler'],['%d : %d = %d'%(b,k,b//k),'Nenner']],th='kuerz')
    for a,b in [(12,18),(8,12),(15,25),(20,30),(18,24),(16,20),(14,21),(24,36),(30,45),(45,60)]:
        g=gcd(a,b);r=fr(a//g,b//g);t.card(2,'Kürze %s so weit wie möglich.'%fr(a,b),r,[fr(a//g*2,b//g*2) if g>1 else fr(a,b),fr(a//g,b),fr(a,b//g)],hints=['Suche den grössten gemeinsamen Teiler.'],steps=[['ggT von %d und %d ist %d'%(a,b,g),'grösster Teiler'],['%s = %s'%(fr(a,b),r),'gekürzt']],th='kuerz')
    for a,b,tg in [(1,2,6),(2,3,9),(3,4,12),(1,5,10),(2,5,20),(3,8,16)]:
        k=tg//b;t.card(2,'Erweitere %s auf den Nenner %d.'%(fr(a,b),tg),fr(a*k,tg),[fr(a+k,tg),fr(a,tg),fr(a*k,b)],hints=['Mit welcher Zahl wird der Nenner %d zu %d?'%(b,tg)],steps=[['%d × %d = %d'%(b,k,tg),'Faktor'],['%d × %d = %d'%(a,k,a*k),'Zähler']],th='basis')
    for q,a,w in [('Sind 1/2 und 4/8 gleich gross?','ja',['nein']),('Sind 2/3 und 3/4 gleich gross?','nein',['ja']),('Sind 3/5 und 9/15 gleich gross?','ja',['nein']),('Sind 2/6 und 1/3 gleich gross?','ja',['nein']),('Sind 5/10 und 2/5 gleich gross?','nein',['ja'])]:
        t.card(3,q,a,w,hints=['Kürze oder erweitere.'],steps=[[a,'Antwort']],th='basis')
    for a,b,k in [(2,3,5),(3,7,2),(4,5,3),(1,8,4)]:
        t.exam('Erweitere %s mit %d.'%(fr(a,b),k),fr(a*k,b*k),[fr(a+k,b+k),fr(a*k,b),fr(a,b*k)],expl=fr(a*k,b*k))
    for a,b,k in [(6,8,2),(9,15,3),(12,20,4),(10,25,5)]:
        t.exam('Kürze %s mit %d.'%(fr(a,b),k),fr(a//k,b//k),[fr(a//k,b),fr(a,b//k),fr(a-k,b-k)],expl=fr(a//k,b//k))
    for a,b in [(12,16),(18,30),(14,35),(24,32)]:
        g=gcd(a,b);t.exam('Kürze %s so weit wie möglich.'%fr(a,b),None,ans=[fr(a//g,b//g)],expl=fr(a//g,b//g))
    for a,b,tg in [(1,3,12),(3,5,15),(2,7,21),(5,6,18)]:
        k=tg//b;t.exam('Erweitere %s auf den Nenner %d.'%(fr(a,b),tg),None,ans=[fr(a*k,tg)],expl=fr(a*k,tg))
    theory_steps(t,'Brüche können anders aussehen und gleich viel sein. Du erweiterst und kürzt.',[{"type":"pie","parts":2,"filled":1,"cap":"1/2"},{"type":"pie","parts":6,"filled":3,"cap":"3/6"}],
        [['erweitern','Zähler und Nenner mal dieselbe Zahl','1/2 = 3/6'],['kürzen','Zähler und Nenner durch dieselbe Zahl','6/8 = 3/4'],['gleichwertig','gleicher Wert, anderer Bruch','1/2 = 2/4'],['ggT','grösster gemeinsamer Teiler','von 12 und 18: 6']],
        'Die gefärbte Fläche bleibt gleich gross.',[{"type":"pie","parts":4,"filled":3,"cap":"3/4"},{"type":"pie","parts":8,"filled":6,"cap":"6/8"}],
        'Erweitern und Kürzen sind Umkehrungen.',['Erweitern (mal)','Kürzen (durch)'],[['1/2 → 2/4 → 3/6','3/6 → 2/4 → 1/2'],['2/3 → 4/6 → 6/9','6/9 → 4/6 → 2/3']],
        'So kürzt du ganz.',[['Teiler suchen','Welche Zahl teilt beide?',0],['Durch den ggT','Zähler und Nenner teilen',1],['Prüfen','Geht noch ein Teiler?',2]],
        [[['12/18','Bruch',0],['ggT = 6','Teiler',1],['2/3','gekürzt',2]],[['2/5','Bruch',0],['mal 4','erweitern',1],['8/20','erweitert',2]]],
        'Merke: Erweitern mal, Kürzen durch.',[['erweitern','mal dieselbe Zahl','1/2 = 3/6',0],['kürzen','durch dieselbe Zahl','6/8 = 3/4',1],['Wert','bleibt gleich','nur die Teile ändern sich',2]])
    return t
T.append(erw)
def bruchdez():
    t=Topic('kl6-mathe-bruch-dezimal','kl6','Rationale Zahlen','Brüche in Dezimalzahlen umwandeln','mathe',1000,seed=83)
    t.th('basis','Bruch ist Teilen','Ein Bruch ist eine Divisionsaufgabe. Zähler durch Nenner ergibt die Dezimalzahl.',[['3/4','3 : 4 = 0,75']])
    R=t.rnd
    L=[(1,2),(1,4),(3,4),(1,5),(2,5),(3,5),(4,5),(1,8),(3,8),(5,8),(7,8),(1,10),(3,10),(7,10),(1,20),(3,20),(1,25),(1,50),(9,10),(2,4)]
    for a,b in L:
        d=D(a)/D(b);r=c(d)
        w=[c(D(b)/D(a)) if a!=b and (D(b)/D(a)).as_tuple().exponent>-4 else c(d*10),c(d*10),c(d/10)]
        t.card(1 if b in(2,4,5,10) else 2,'%s als Dezimalzahl:'%fr(a,b),r,w,hints=['%d : %d rechnen.'%(a,b)],steps=[['%d : %d = %s'%(a,b,r),'Zähler durch Nenner']],th='basis')
    for x,(a,b) in [('0,5',(1,2)),('0,25',(1,4)),('0,75',(3,4)),('0,2',(1,5)),('0,4',(2,5)),('0,1',(1,10)),('0,3',(3,10)),('0,125',(1,8)),('0,6',(3,5)),('0,05',(1,20))]:
        t.card(2,'Welcher gekürzte Bruch ist %s?'%x,fr(a,b),[fr(a+1,b),fr(b,a) if a!=b else '2/1',fr(a,b+1)],hints=['Schreibe als Zehntel oder Hundertstel und kürze.'],steps=[[fr(a,b),'gekürzt']],th='basis')
    for q,a,w in [('Welche Zahl ist grösser: 3/4 oder 0,7?','3/4',['0,7','gleich']),('Welche Zahl ist grösser: 1/5 oder 0,25?','0,25',['1/5','gleich']),('Welche Zahl ist grösser: 0,5 oder 3/5?','3/5',['0,5','gleich']),('Welche Zahl ist kleiner: 1/8 oder 0,2?','1/8',['0,2','gleich']),('Sind 1/2 und 0,5 gleich gross?','ja',['nein'])]:
        t.card(3,q,a,w,hints=['Wandle den Bruch in eine Dezimalzahl um.'],steps=[[a,'Antwort']],th='basis')
    for a,b in [(1,2),(1,4),(3,4),(1,5),(2,5),(3,8),(7,10),(9,20)][:8]:
        d=D(a)/D(b);r=c(d);t.exam('%s als Dezimalzahl:'%fr(a,b),r,[c(d*10),c(d/10),c(d+D('0.1'))],expl='%d : %d = %s'%(a,b,r))
    for a,b in [(1,8),(3,10),(4,5),(1,20)]:
        d=D(a)/D(b);t.exam('%s als Dezimalzahl:'%fr(a,b),None,ans=[c(d),c(d).replace(',','.')],expl=c(d))
    for x,(a,b) in [('0,5',(1,2)),('0,75',(3,4)),('0,2',(1,5)),('0,6',(3,5))]:
        t.exam('Welcher gekürzte Bruch ist %s?'%x,fr(a,b),[fr(a+1,b),fr(b,a) if a!=b else '2/1',fr(a,b+1)],expl=fr(a,b))
    for q,a,w in [('Welche Zahl ist grösser: 3/4 oder 0,7?','3/4',['0,7','gleich']),('Sind 1/2 und 0,5 gleich gross?','ja',['nein'])]:
        t.exam(q,a,w,expl=a)
    theory_steps(t,'Jeder Bruch lässt sich als Dezimalzahl schreiben. Du teilst Zähler durch Nenner.',[TBL(['Bruch','Rechnung','Dezimalzahl'],[['1/2','1 : 2','0,5'],['1/4','1 : 4','0,25'],['3/4','3 : 4','0,75']],None)],
        [['Bruch','Zähler durch Nenner','3/4'],['Dezimalzahl','Zahl mit Komma','0,75'],['Zehntelbruch','Nenner 10','3/10 = 0,3'],['Hundertstelbruch','Nenner 100','25/100 = 0,25']],
        'Brüche, die du auswendig kennen solltest.',[TBL(['Bruch','Dezimalzahl'],[['1/2','0,5'],['1/4','0,25'],['3/4','0,75'],['1/5','0,2'],['1/10','0,1'],['1/8','0,125']],None)],
        'Zwei Wege führen zur Dezimalzahl.',['Weg','Beispiel 3/5'],[['Teilen','3 : 5 = 0,6'],['Erweitern auf 10','3/5 = 6/10 = 0,6']],
        'So wandelst du um.',[['Nenner prüfen','Geht er in 10 oder 100?',0],['Erweitern','Oder Zähler durch Nenner',1],['Komma setzen','Zehntel oder Hundertstel',2]],
        [[['3/4','Bruch',0],['3 : 4','teilen',1],['0,75','Dezimalzahl',2]],[['2/5','Bruch',0],['4/10','erweitern',1],['0,4','Dezimalzahl',2]]],
        'Merke: Bruch heisst Zähler durch Nenner.',[['Teilen','3/4 = 3 : 4','0,75',0],['Erweitern','auf 10 oder 100','2/5 = 4/10',1],['Merken','1/2, 1/4, 1/5, 1/10','0,5; 0,25; 0,2; 0,1',2]])
    return t
T.append(bruchdez)
def kreis():
    t=Topic('kl6-mathe-kreis','kl6','Geometrische Konstruktionen','Kreise konstruieren','mathe',1000,seed=84)
    t.th('basis','Teile des Kreises','Der Mittelpunkt M liegt in der Mitte. Der Radius geht vom Mittelpunkt zum Rand. Der Durchmesser geht durch den Mittelpunkt von Rand zu Rand.',[['Durchmesser','d = 2 × r']])
    R=t.rnd
    for r in [2,3,4,5,6,7,8,9,10,12]:
        t.card(1,'Der Radius ist %d cm. Wie gross ist der Durchmesser? (in cm)'%r,2*r,wr(2*r,0,1000,R,deltas=(r,1,2)),hints=['Durchmesser = 2 × Radius'],steps=[['2 × %d = %d'%(r,2*r),'d = 2 × r']],vis=[{"type":"circle","show":"both","lr":'r = %d'%r,"ld":'d = %d'%(2*r)}] if r<=8 else None,th='basis')
    for d in [4,6,8,10,14,16,20,30,50,100]:
        t.card(1,'Der Durchmesser ist %d cm. Wie gross ist der Radius? (in cm)'%d,d//2,wr(d//2,0,1000,R,deltas=(1,2,d//2)),hints=['Radius = Durchmesser : 2'],steps=[['%d : 2 = %d'%(d,d//2),'r = d : 2']],th='basis')
    for q,a,w in [('Welche Strecke ist rot gezeichnet?','Radius',['Durchmesser','Mittelpunkt','Umfang']),('Wie heisst der Punkt in der Mitte des Kreises?','Mittelpunkt',['Radius','Durchmesser','Rand'])]:
        pass
    t.card(1,'Welche Strecke ist rot gezeichnet?','Radius',['Durchmesser','Mittelpunkt','Rand'],hints=['Sie geht von der Mitte zum Rand.'],steps=[['Radius','Strecke']],vis=[{"type":"circle","show":"r","lr":"r"}],th='basis')
    t.card(1,'Welche Strecke ist grün gezeichnet?','Durchmesser',['Radius','Mittelpunkt','Rand'],hints=['Sie geht durch die Mitte von Rand zu Rand.'],steps=[['Durchmesser','Strecke']],vis=[{"type":"circle","show":"d","ld":"d"}],th='basis')
    for q,a,w in [('Wie heisst der Punkt in der Mitte des Kreises?','Mittelpunkt',['Radius','Durchmesser','Rand']),('Welches Werkzeug zeichnet einen Kreis?','Zirkel',['Lineal','Geodreieck','Winkelmesser']),('Wohin stichst du die Zirkelspitze?','in den Mittelpunkt',['an den Rand','neben den Kreis','auf den Durchmesser']),('Was stellst du am Zirkel ein?','den Radius',['den Durchmesser','den Winkel','den Mittelpunkt']),('Wie viele Radien hat ein Kreis?','unendlich viele',['einen','zwei','vier']),('Alle Punkte auf dem Kreis haben vom Mittelpunkt den ...','gleichen Abstand',['kleinsten Abstand','grössten Abstand','Abstand null'])]:
        t.card(2,q,a,w,hints=['Denke an den Zirkel.'],steps=[[a,'Antwort']],th='basis')
    for r in [3,4,5,6,7,8]:
        t.card(2,'Du öffnest den Zirkel auf %d cm. Wie breit ist der Kreis? (in cm)'%r,2*r,wr(2*r,0,1000,R,deltas=(r,1,2)),hints=['Zirkelöffnung = Radius. Breite = Durchmesser.'],steps=[['2 × %d = %d'%(r,2*r),'Durchmesser']],th='basis')
    for r in [25,40,60,75]:
        t.card(3,'Der Radius ist %d mm. Wie gross ist der Durchmesser? (in mm)'%r,2*r,wr(2*r,0,1000,R,deltas=(r,10,5)),hints=['Durchmesser = 2 × Radius'],steps=[['2 × %d = %d'%(r,2*r),'d = 2 × r']],th='basis')
    for d in [18,26,34,48]:
        t.card(3,'Ein Kreis soll %d cm breit sein. Auf wie viele cm öffnest du den Zirkel?'%d,d//2,wr(d//2,0,1000,R,deltas=(1,2,d//2)),hints=['Zirkelöffnung = Radius.'],steps=[['%d : 2 = %d'%(d,d//2),'Radius']],th='basis')
    for r in [3,5,7,9]:
        t.exam('Der Radius ist %d cm. Wie gross ist der Durchmesser? (in cm)'%r,2*r,wr(2*r,0,1000,R,deltas=(r,1,2)),expl='2 × %d = %d'%(r,2*r))
    for d in [8,12,20,36]:
        t.exam('Der Durchmesser ist %d cm. Wie gross ist der Radius? (in cm)'%d,None,ans=[str(d//2)],expl='%d : 2 = %d'%(d,d//2))
    t.exam('Welche Strecke ist rot gezeichnet?','Radius',['Durchmesser','Mittelpunkt','Rand'],vis=[{"type":"circle","show":"r"}],expl='Radius')
    t.exam('Welche Strecke ist grün gezeichnet?','Durchmesser',['Radius','Mittelpunkt','Rand'],vis=[{"type":"circle","show":"d"}],expl='Durchmesser')
    for q,a,w in [('Welches Werkzeug zeichnet einen Kreis?','Zirkel',['Lineal','Geodreieck','Winkelmesser']),('Wohin stichst du die Zirkelspitze?','in den Mittelpunkt',['an den Rand','neben den Kreis','auf den Durchmesser']),('Was stellst du am Zirkel ein?','den Radius',['den Durchmesser','den Winkel','den Mittelpunkt'])]:
        t.exam(q,a,w,expl=a)
    for r in [4,6,10]:
        t.exam('Du öffnest den Zirkel auf %d cm. Wie breit ist der Kreis? (in cm)'%r,None,ans=[str(2*r)],expl=str(2*r))
    theory_steps(t,'Einen Kreis zeichnest du mit dem Zirkel. Radius und Durchmesser beschreiben seine Grösse.',[{"type":"circle","show":"both","lr":"r","ld":"d"}],
        [['Mittelpunkt M','Punkt in der Mitte','Zirkelspitze'],['Radius r','Mitte bis Rand','r = 4 cm'],['Durchmesser d','Rand bis Rand durch die Mitte','d = 8 cm'],['Zirkel','Werkzeug für Kreise','Spitze und Mine']],
        'Der Durchmesser ist doppelt so lang wie der Radius.',[{"type":"circle","show":"both","lr":"r = 3","ld":"d = 6"}],
        'Radius und Durchmesser hängen zusammen.',['Radius r','Durchmesser d'],[['2 cm','4 cm'],['5 cm','10 cm'],['10 cm','20 cm']],
        'So zeichnest du einen Kreis.',[['Radius wählen','Wie gross soll der Kreis sein?',0],['Zirkel einstellen','Spitze und Mine so weit auseinander',1],['Spitze einstechen','In den Mittelpunkt M',2],['Drehen','Einmal rundherum',3]],
        [[['r = 4 cm','gegeben',0],['2 × 4','Durchmesser',1],['d = 8 cm','Ergebnis',2]],[['d = 10 cm','gegeben',0],['10 : 2','Radius',1],['r = 5 cm','Ergebnis',2]]],
        'Merke: Durchmesser gleich doppelter Radius.',[['d = 2 × r','Durchmesser','r = 4, d = 8',0],['r = d : 2','Radius','d = 10, r = 5',1],['Zirkel','Radius einstellen','Spitze in M',2]])
    return t
T.append(kreis)
def par():
    t=Topic('kl6-mathe-parallel-senkrecht','kl6','Geometrische Konstruktionen','Parallele und senkrechte Linien','mathe',1000,seed=85)
    t.th('basis','Parallel und senkrecht','Parallele Linien haben überall denselben Abstand und treffen sich nie. Senkrechte Linien bilden einen rechten Winkel.',[['parallel','∥'],['senkrecht','⊥']])
    A=['parallel','senkrecht','weder noch']
    for k,a in [('par','parallel'),('perp','senkrecht'),('cross','weder noch'),('tilt','weder noch')]:
        t.card(1,'Wie liegen die beiden Linien?',a,[x for x in A if x!=a],hints=['Treffen sie sich? Gibt es einen rechten Winkel?'],steps=[[a,'Lage']],vis=[{"type":"par","kind":k}],th='basis')
    S=[('Die Schienen eines Zuges sind ...','parallel'),('Die gegenüberliegenden Seiten eines Rechtecks sind ...','parallel'),('Zwei benachbarte Seiten eines Quadrats sind ...','senkrecht'),('Die Wand und der Boden eines Zimmers sind ...','senkrecht'),('Die Linien eines Hefts (liniert) sind ...','parallel'),('Eine Tür und der Boden sind ...','senkrecht'),('Die Sprossen einer Leiter sind ...','parallel'),('Zwei Kanten am Heft-Eck sind ...','senkrecht'),('Die Zeiger der Uhr bei 3 Uhr sind ...','senkrecht'),('Zwei Strassen kreuzen sich im rechten Winkel: sie sind ...','senkrecht'),('Die Streifen auf einem Zebrastreifen sind ...','parallel'),('Die Seiten eines Dreiecks sind ...','weder noch'),('Die Kanten einer Tischplatte (gegenüber) sind ...','parallel'),('Der Mast und der Boden einer Fahne sind ...','senkrecht')]
    for q,a in S:
        t.card(1,q,a,[x for x in A if x!=a],hints=['Denke an Abstand und rechten Winkel.'],steps=[[a,'Lage']],th='basis')
    for q,a,w in [('Wie viele Schnittpunkte haben parallele Linien?','0',['1','2','unendlich viele']),('Wie viele Schnittpunkte haben senkrechte Linien?','1',['0','2','unendlich viele']),('Wie gross ist der Winkel zwischen senkrechten Linien?','90 Grad',['45 Grad','180 Grad','60 Grad']),('Mit welchem Zeichen schreibst du „parallel“?','∥',['⊥','=','<']),('Mit welchem Zeichen schreibst du „senkrecht“?','⊥',['∥','=','>']),('Was hilft dir, eine Senkrechte zu zeichnen?','die rechte Ecke des Geodreiecks',['den Zirkel','den Radiergummi','das Massband']),('Was hilft dir, eine Parallele zu zeichnen?','die Mittellinie des Geodreiecks',['den Zirkel','die Spitze des Bleistifts','den Radiergummi']),('Zwei Linien sind parallel zu einer dritten. Wie liegen die zwei zueinander?','parallel',['senkrecht','weder noch'])]:
        t.card(2,q,a,w,hints=['Denke an die Regel.'],steps=[[a,'Antwort']],th='basis')
    for q,a in [('Ein Rechteck hat wie viele Paare paralleler Seiten?','2'),('Ein Quadrat hat wie viele rechte Winkel?','4'),('Ein Rechteck hat wie viele rechte Winkel?','4'),('Wie viele Paare paralleler Seiten hat ein Trapez?','1')]:
        t.card(3,q,a,[x for x in ['1','2','3','4','0'] if x!=a][:3],hints=['Zeichne die Figur.'],steps=[[a,'Antwort']],th='basis')
    for k,a in [('par','parallel'),('perp','senkrecht'),('cross','weder noch'),('tilt','weder noch')]:
        t.exam('Wie liegen die beiden Linien?',a,[x for x in A if x!=a],vis=[{"type":"par","kind":k}],expl=a)
    for q,a in S[:8]:
        pass
    for q,a in [S[0],S[2],S[3],S[5],S[8],S[11],S[12]]:
        t.exam(q,a,[x for x in A if x!=a],expl=a)
    for q,a,w in [('Wie viele Schnittpunkte haben parallele Linien?','0',['1','2','unendlich viele']),('Wie gross ist der Winkel zwischen senkrechten Linien?','90 Grad',['45 Grad','180 Grad','60 Grad']),('Mit welchem Zeichen schreibst du „senkrecht“?','⊥',['∥','=','>']),('Was hilft dir, eine Senkrechte zu zeichnen?','die rechte Ecke des Geodreiecks',['den Zirkel','den Radiergummi','das Massband']),('Ein Rechteck hat wie viele rechte Winkel?','4',['1','2','3'])]:
        t.exam(q,a,w,expl=a)
    theory_steps(t,'Zwei Linien können parallel oder senkrecht zueinander liegen. Du zeichnest beide mit dem Geodreieck.',[{"type":"par","kind":"par","cap":"parallel"},{"type":"par","kind":"perp","cap":"senkrecht"}],
        [['parallel ∥','immer gleicher Abstand','Schienen'],['senkrecht ⊥','bilden einen rechten Winkel','Heft-Ecke'],['Schnittpunkt','Punkt, wo sich Linien treffen','bei senkrecht: 1'],['Geodreieck','Werkzeug zum Zeichnen','Mittellinie, rechte Ecke']],
        'Parallele treffen sich nie. Senkrechte treffen sich im rechten Winkel.',[{"type":"par","kind":"cross","cap":"schräg: weder parallel noch senkrecht"}],
        'Die Eigenschaften im Überblick.',['Lage','Schnittpunkte','Winkel'],[['parallel','keine','—'],['senkrecht','einer','90 Grad'],['schräg','einer','anders']],
        'So zeichnest du eine Parallele.',[['Linie legen','Geodreieck an die Linie',0],['Verschieben','Entlang der Mittellinie',1],['Neue Linie','Im gewünschten Abstand',2],['Prüfen','Abstand überall gleich?',3]],
        [[['Gerade g','gegeben',0],['Geodreieck anlegen','Parallele zeichnen',1],['Linie p ∥ g','Ergebnis',2]],[['Gerade g','gegeben',0],['rechte Ecke anlegen','Senkrechte zeichnen',1],['Linie s ⊥ g','Ergebnis',2]]],
        'Merke: Parallel bleibt im Abstand, senkrecht ergibt 90 Grad.',[['parallel','nie ein Schnittpunkt','Schienen',0],['senkrecht','90 Grad','Heft-Ecke',1],['Geodreieck','Mittellinie, rechte Ecke','zum Zeichnen',2]])
    return t
T.append(par)
def winkel6():
    t=Topic('kl6-mathe-winkel-messen','kl6','Geometrische Konstruktionen','Winkel messen','mathe',1000,seed=86)
    t.th('basis','Winkel messen','Winkel misst du in Grad. Lege die Mitte des Geodreiecks an den Scheitelpunkt und lies die Skala ab.',[['rechter Winkel','90 Grad']])
    R=t.rnd
    def typ(d):return 'spitz' if d<90 else 'rechter' if d==90 else 'stumpf' if d<180 else 'gestreckt'
    TY=['spitz','rechter','stumpf','gestreckt']
    for d in [30,45,60,75,100,120,135,150,50,80,110,160]:
        t.card(1,'Wie gross ist der Winkel? (in Grad)',d,wr(d,0,180,R,deltas=(10,5,20)),hints=['Lies die Skala ab, die bei 0 beginnt.'],steps=[['%d Grad'%d,'Ablesen']],vis=[{"type":"angle","deg":d}],th='basis')
    for d in [20,70,90,115,140,170,15,55]:
        a=typ(d)
        t.card(2,'Welche Art von Winkel ist das? (%d Grad)'%d,a,[x for x in TY if x!=a],hints=['Kleiner als 90, genau 90, grösser als 90 oder 180?'],steps=[[a,'Winkelart']],vis=[{"type":"angle","deg":d}],th='basis')
    for q,a,w in [('Wie viel Grad hat ein rechter Winkel?',90,[45,100,180]),('Wie viel Grad hat ein gestreckter Winkel?',180,[90,360,100]),('Wie viel Grad hat ein Vollwinkel?',360,[180,90,270]),('Ein Winkel ist kleiner als 90 Grad. Er ist ...','spitz',['stumpf','recht','gestreckt']),('Ein Winkel ist grösser als 90 Grad und kleiner als 180 Grad. Er ist ...','stumpf',['spitz','recht','gestreckt'])]:
        t.card(2,q,a,w,hints=['Merke die wichtigen Winkel.'],steps=[[str(a),'Antwort']],th='basis')
    for a,b in [(50,60),(30,90),(45,45),(70,70),(100,30),(25,65)]:
        t.card(3,'Ein Dreieck hat die Winkel %d Grad und %d Grad. Wie gross ist der dritte Winkel? (in Grad)'%(a,b),180-a-b,wr(180-a-b,0,180,R,deltas=(10,5,20)),hints=['Die drei Winkel ergeben 180 Grad.'],steps=[['%d + %d = %d'%(a,b,a+b),'zwei Winkel'],['180 %s %d = %d'%(M,a+b,180-a-b),'dritter Winkel']],th='basis')
    for a,b in [(40,60),(120,30),(35,45),(90,25)][:0]:
        pass
    for d in [35,65,85,105,125,145]:
        t.exam('Wie gross ist der Winkel? (in Grad)',d,wr(d,0,180,R,deltas=(10,5,20)),vis=[{"type":"angle","deg":d}],expl='%d Grad'%d)
    for d in [40,70,130,155]:
        t.exam('Wie gross ist der Winkel? (in Grad)',None,ans=[str(d)],vis=[{"type":"angle","deg":d}],expl='%d Grad'%d)
    for d in [25,90,150]:
        a=typ(d);t.exam('Welche Art von Winkel ist das?',a,[x for x in TY if x!=a],vis=[{"type":"angle","deg":d}],expl=a)
    for q,a,w in [('Wie viel Grad hat ein gestreckter Winkel?',180,[90,360,100]),('Wie viel Grad hat ein Vollwinkel?',360,[180,90,270])]:
        t.exam(q,a,w,expl=str(a))
    for a,b in [(40,70),(60,60)]:
        t.exam('Ein Dreieck hat die Winkel %d Grad und %d Grad. Wie gross ist der dritte Winkel? (in Grad)'%(a,b),None,ans=[str(180-a-b)],expl=str(180-a-b))
    theory_steps(t,'Winkel misst du mit dem Geodreieck in Grad.',[{"type":"angle","deg":60,"lbl":"60 Grad"}],
        [['Winkel','zwei Strahlen, ein Scheitelpunkt','Heft-Ecke'],['Grad °','Einheit für Winkel','90 Grad'],['Scheitelpunkt','Punkt, wo die Strahlen starten','Spitze'],['Winkelarten','spitz, recht, stumpf, gestreckt','30, 90, 120, 180']],
        'Lege die Mitte an den Scheitelpunkt und die 0 an einen Schenkel.',[{"type":"angle","deg":135,"lbl":"135 Grad"}],
        'Die Winkelarten im Überblick.',['Art','Grösse'],[['spitz','kleiner als 90 Grad'],['recht','genau 90 Grad'],['stumpf','90 bis 180 Grad'],['gestreckt','180 Grad']],
        'So misst du einen Winkel.',[['Anlegen','Mitte am Scheitelpunkt',0],['Null suchen','0 am ersten Schenkel',1],['Ablesen','Zweiter Schenkel auf der Skala',2],['Prüfen','Spitz oder stumpf?',3]],
        [[['Schenkel bei 70','Skala',0],['spitz','Art',1],['70 Grad','Ergebnis',2]],[['Schenkel bei 120','Skala',0],['stumpf','Art',1],['120 Grad','Ergebnis',2]]],
        'Merke: Mit der Skala ablesen, die bei 0 beginnt.',[['rechter Winkel','90 Grad','Heft-Ecke',0],['gestreckt','180 Grad','gerade Linie',1],['Dreieck','Summe 180 Grad','50 + 60 + 70',2]])
    return t
T.append(winkel6)
def prozent():
    t=Topic('kl6-mathe-bruch-dezimal-prozent','kl6','Prozentrechnen & Statistik','Bruch, Dezimalzahl und Prozent','mathe',1000,seed=87)
    t.th('basis','Prozent heisst Hundertstel','1 Prozent ist 1 Hundertstel. 100 Prozent ist das Ganze.',[['50%','= 1/2 = 0,5']])
    R=t.rnd
    L=[(1,2,'0,5',50),(1,4,'0,25',25),(3,4,'0,75',75),(1,10,'0,1',10),(1,5,'0,2',20),(2,5,'0,4',40),(3,10,'0,3',30),(9,10,'0,9',90),(1,20,'0,05',5),(1,100,'0,01',1),(3,5,'0,6',60),(7,10,'0,7',70)]
    for a,b,d,p in L:
        t.card(1,'%s als Prozent:'%fr(a,b),'%d%%'%p,['%d%%'%x for x in (100-p if 100-p!=p else p+10,p+10,p*2 if p<50 else p-10) if x!=p][:3],hints=['Erweitere auf 100.'],steps=[['%s = %d/100'%(fr(a,b),p),'auf 100'],['%d%%'%p,'Prozent']],th='basis')
    for n in [10,25,50,75,20,40,60,90]:
        t.card(1,'Wie viel Prozent sind gefärbt?','%d%%'%n,['%d%%'%x for x in (100-n if 100-n!=n else n+10,n+10,n-5) if x!=n][:3],hints=['100 Felder sind das Ganze.'],steps=[['%d von 100'%n,'Hundertstel']],vis=[FLD(10,10,n)],th='basis')
    for a,b,d,p in L[:10]:
        t.card(2,'%d%% als Dezimalzahl:'%p,d,[c(D(d.replace(',','.'))*10) if p<=50 else c(D(d.replace(',','.'))/10),c(D(d.replace(',','.'))/10),c(D(d.replace(',','.'))+D('0.1'))],hints=['Prozent durch 100.'],steps=[['%d : 100 = %s'%(p,d),'durch 100']],th='basis')
    for p,w in [(50,80),(25,200),(10,350),(20,150),(75,40),(50,120),(10,90),(25,60)]:
        r=w*p//100;t.card(3,'%d%% von %d = ?'%(p,w),r,wr(r,0,1000,R,deltas=(r//2 or 1,10,5)),hints=['Bruch von der Zahl: %s'%{50:'1/2',25:'1/4',10:'1/10',20:'1/5',75:'3/4'}[p]],steps=[['%d%% = %s'%(p,{50:'1/2',25:'1/4',10:'1/10',20:'1/5',75:'3/4'}[p]),'Bruch'],['%d von %d = %d'%(p,w,r) if False else 'Ergebnis: %d'%r,'Rechnen']],th='basis')
    for a,b,d,p in [L[0],L[1],L[2],L[4],L[6],L[9]]:
        t.exam('%s als Prozent:'%fr(a,b),'%d%%'%p,['%d%%'%x for x in (100-p if 100-p!=p else p+10,p+10,p*2 if p<50 else p-10) if x!=p][:3],expl='%d%%'%p)
    for n in [30,60,80]:
        t.exam('Wie viel Prozent sind gefärbt?','%d%%'%n,['%d%%'%x for x in (100-n if 100-n!=n else n+10,n+10,n-5) if x!=n][:3],vis=[FLD(10,10,n)],expl='%d%%'%n)
    for a,b,d,p in [L[3],L[5],L[7],L[10]]:
        t.exam('%d%% als Dezimalzahl:'%p,None,ans=[d,d.replace(',','.')],expl=d)
    for p,w in [(50,60),(25,80),(10,250),(20,45)]:
        t.exam('%d%% von %d = ?'%(p,w),None,ans=[str(w*p//100)],expl=str(w*p//100))
    theory_steps(t,'Prozent sind Hundertstel. Bruch, Dezimalzahl und Prozent beschreiben denselben Teil.',[FLD(10,10,25,0,0,None,'25 von 100 sind 25%')],
        [['Prozent %','Hundertstel','25% = 25/100'],['Bruch','Teil vom Ganzen','1/4'],['Dezimalzahl','Zahl mit Komma','0,25'],['100%','das Ganze','alle 100 Felder']],
        'Im Hunderterfeld siehst du Prozent direkt.',[FLD(10,10,50,0,0,None,'50% = 1/2'),FLD(10,10,10,0,0,None,'10% = 1/10')],
        'Drei Schreibweisen für denselben Teil.',['Bruch','Dezimalzahl','Prozent'],[['1/2','0,5','50%'],['1/4','0,25','25%'],['3/4','0,75','75%'],['1/10','0,1','10%'],['1/5','0,2','20%']],
        'So wandelst du um.',[['Bruch auf 100','Erweitern auf Hundertstel',0],['Zähler ablesen','Das sind die Prozent',1],['Dezimalzahl','Prozent durch 100',2]],
        [[['3/4','Bruch',0],['75/100','erweitern',1],['75%','Prozent',2],['0,75','Dezimalzahl',3]],[['1/5','Bruch',0],['20/100','erweitern',1],['20%','Prozent',2],['0,2','Dezimalzahl',3]]],
        'Merke: Prozent heisst „von Hundert“.',[['50%','= 1/2 = 0,5','die Hälfte',0],['25%','= 1/4 = 0,25','ein Viertel',1],['10%','= 1/10 = 0,1','ein Zehntel',2]])
    return t
T.append(prozent)
def mittel():
    t=Topic('kl6-mathe-mittelwert','kl6','Prozentrechnen & Statistik','Mittelwert (Durchschnitt)','mathe',1000,seed=88)
    t.th('basis','Mittelwert','Der Mittelwert ist der Durchschnitt. Du addierst alle Werte und teilst durch die Anzahl.',[['4, 6, 8','(4 + 6 + 8) : 3 = 6']])
    R=t.rnd
    S=[]
    while len(S)<26:
        n=R.choice([3,4,5]);m=R.randint(3,40);vals=[m+R.randint(-3,3) for _ in range(n-1)];last=m*n-sum(vals)
        if last<=0 or last>1000:continue
        vals.append(last);S.append(vals)
    for vals in S[:10]:
        m=sum(vals)//len(vals);t.card(1,'Mittelwert von %s:'%', '.join(map(str,vals)),m,wr(m,0,1000,R,deltas=(1,2,3)),hints=['Alles addieren, dann durch die Anzahl teilen.'],steps=[['%s = %d'%(' + '.join(map(str,vals)),sum(vals)),'Summe'],['%d : %d = %d'%(sum(vals),len(vals),m),'Durchschnitt']],th='basis')
    for vals in S[22:26]:
        m=sum(vals)//len(vals);t.card(1,'Mittelwert von %s:'%', '.join(map(str,vals)),m,wr(m,0,1000,R,deltas=(1,2,3)),hints=['Alles addieren, dann durch die Anzahl teilen.'],steps=[['%s = %d'%(' + '.join(map(str,vals)),sum(vals)),'Summe'],['%d : %d = %d'%(sum(vals),len(vals),m),'Durchschnitt']],th='basis')
    for vals in S[10:16]:
        m=sum(vals)//len(vals);k=len(vals)
        t.card(2,'Der Mittelwert von %d Zahlen ist %d. Die Summe der Zahlen ist ...'%(k,m),sum(vals),wr(sum(vals),0,1000,R,deltas=(m,k,1,10)),hints=['Mittelwert mal Anzahl.'],steps=[['%d × %d = %d'%(m,k,sum(vals)),'Summe']],th='basis')
    for vals in S[16:22]:
        m=sum(vals)//len(vals);k=len(vals);r=vals[-1];rest=vals[:-1]
        t.card(3,'Der Mittelwert von %d Zahlen ist %d. Die ersten sind %s. Wie heisst die letzte Zahl?'%(k,m,', '.join(map(str,rest))),r,wr(r,0,1000,R,deltas=(1,2,3,m)),hints=['Gesamtsumme minus die anderen Zahlen.'],steps=[['%d × %d = %d'%(m,k,m*k),'Gesamtsumme'],['%d %s %d = %d'%(m*k,M,sum(rest),r),'Fehlende Zahl']],th='basis')
    for grades in [[4,5,6,5],[3,4,5],[5,6,6,5],[4,4,5,5,6],[6,5,4]]:
        m=D(sum(grades))/len(grades)
        t.card(2,'Noten: %s. Wie gross ist der Durchschnitt?'%', '.join(map(str,grades)),c(m),[c(m+D('0.5')),c(m-D('0.5')),c(m+1)],hints=['Summe durch Anzahl.'],steps=[['%s = %d'%(' + '.join(map(str,grades)),sum(grades)),'Summe'],['%d : %d = %s'%(sum(grades),len(grades),c(m)),'Durchschnitt']],th='basis')
    for vals in S[22:26]+S[:2]:
        m=sum(vals)//len(vals);t.exam('Mittelwert von %s:'%', '.join(map(str,vals)),m,wr(m,0,1000,R,deltas=(1,2,3)),expl=str(m))
    for vals in S[2:8]:
        m=sum(vals)//len(vals);t.exam('Mittelwert von %s:'%', '.join(map(str,vals)),None,ans=[str(m)],expl=str(m))
    for vals in S[10:13]:
        m=sum(vals)//len(vals);k=len(vals);t.exam('Der Mittelwert von %d Zahlen ist %d. Die Summe der Zahlen ist ...'%(k,m),None,ans=[str(sum(vals))],expl=str(sum(vals)))
    for vals in S[16:19]:
        m=sum(vals)//len(vals);k=len(vals);t.exam('Der Mittelwert von %d Zahlen ist %d. Die ersten sind %s. Wie heisst die letzte Zahl?'%(k,m,', '.join(map(str,vals[:-1]))),None,ans=[str(vals[-1])],expl=str(vals[-1]))
    theory_steps(t,'Der Mittelwert zeigt, was ein typischer Wert einer Reihe ist.',[{"type":"bars","items":[["Mo",4],["Di",6],["Mi",8]]}],
        [['Mittelwert','Durchschnitt','6'],['Summe','alle Werte zusammen','4 + 6 + 8 = 18'],['Anzahl','wie viele Werte','3'],['Durchschnitt','Summe durch Anzahl','18 : 3 = 6']],
        'Der Mittelwert liegt zwischen dem kleinsten und dem grössten Wert.',[{"type":"bars","items":[["Mo",5],["Di",7],["Mi",9],["Do",7]]}],
        'Zwei Schritte führen zum Mittelwert.',['Schritt','Beispiel 4, 6, 8'],[['Summe','4 + 6 + 8 = 18'],['Durch Anzahl','18 : 3 = 6']],
        'So berechnest du den Mittelwert.',[['Addieren','Alle Werte zusammen',0],['Zählen','Wie viele Werte?',1],['Teilen','Summe durch Anzahl',2],['Prüfen','Liegt er in der Mitte?',3]],
        [[['3, 5, 7','Werte',0],['15','Summe',1],['15 : 3','teilen',2],['5','Mittelwert',3]],[['10, 12, 14, 16','Werte',0],['52','Summe',1],['52 : 4','teilen',2],['13','Mittelwert',3]]],
        'Merke: Summe durch Anzahl.',[['Mittelwert','Summe : Anzahl','(4 + 6 + 8) : 3',0],['Summe','Mittelwert mal Anzahl','6 × 3 = 18',1],['Prüfen','zwischen klein und gross','6 liegt zwischen 4 und 8',2]])
    return t
T.append(mittel)
