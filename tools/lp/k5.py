from ar import *
T=[]
R0=None
def million():
    t=Topic('kl5-mathe-million','kl5','Beliebig grosse Zahlen','Die Million','mathe',1000000,seed=71)
    t.th('basis','Die Million','Eine Million sind 1\'000 Tausender. Sie hat 7 Stellen: 1\'000\'000.',[['1\'000\'000','= 1\'000 × 1\'000']])
    R=t.rnd
    for q,a,w in [('Wie viele Tausender sind eine Million?',1000,[100,10000,10]),('Wie viele Hunderttausender sind eine Million?',10,[100,1000,1]),('Wie viele Zehntausender sind eine Million?',100,[10,1000,10000]),('Wie viele Nullen hat eine Million?',6,[5,7,3]),('Welche Zahl kommt nach 999\'999?','1\'000\'000',['100\'000','1\'999\'999','999\'990']),('Welche Zahl kommt vor 1\'000\'000?','999\'999',['990\'000','1\'000\'001','999\'000']),('Wie viele Stellen hat eine Million?',7,[6,8,5]),('Wie viele Hunderter sind eine Million?',10000,[1000,100000,100]),('Wie viele Zehner sind eine Million?',100000,[10000,1000000,1000]),('Wie viele Einer sind eine Million?',1000000,[100000,10000,1000])]:
        t.card(1 if len(str(a))<6 else 2,q,f(a) if isinstance(a,int) else a,[f(x) if isinstance(x,int) else x for x in w],hints=['Eine Million = 1\'000\'000.'],steps=[[f(a) if isinstance(a,int) else a,'Antwort']],th='basis')
    for n in [900000,990000,999000,999900,999990,999999,500000,750000]:
        t.card(2,'Wie viel fehlt von %s bis zur Million?'%f(n),f(1000000-n),[f(1000000-n+10**k) for k in (1,2,3)] if n%10==0 else [f(1000000-n+1),f(1000000-n+10),f(1000000-n+100)],hints=['Eine Million minus die Zahl.'],steps=[['1\'000\'000 %s %s = %s'%(M,f(n),f(1000000-n)),'Minus']],th='basis')
    for n in [100000,250000,400000,50000,10000,20000]:
        t.card(2,'%s mal 10 = ?'%f(n),f(n*10),[f(n*100),f(n),f(n*10+10)],hints=['Hänge eine Null an.'],steps=[['%s × 10 = %s'%(f(n),f(n*10)),'Mal 10']],th='basis') if n*10<=1000000 else None
    for n in [200000,350000,480000,620000,750000,890000]:
        t.card(2,'Welche Zahl ist 100\'000 mehr als %s?'%f(n),f(n+100000),[f(n+10000),f(n+1000000),f(n+1000)],hints=['Der Hunderttausender wird um 1 grösser.'],steps=[['%s + 100\'000 = %s'%(f(n),f(n+100000)),'Plus']],th='basis')
    for q,a,w in [('Ein Stadion hat 50\'000 Plätze. Wie viele Stadien braucht man für eine Million Plätze?',20,[10,50,200]),('In einer Stadt leben 100\'000 Menschen. Wie viele solche Städte sind eine Million?',10,[100,1000,5]),('Ein Haus kostet 500\'000 Franken. Wie viele Häuser kosten zusammen eine Million?',2,[5,10,20]),('Ein Zug fährt 100\'000 km. Wie oft fährt er für eine Million km?',10,[100,5,1000])]:
        t.card(3,q,a,w,hints=['Teile 1\'000\'000 durch die Zahl.'],steps=[[str(a),'Ergebnis']],th='basis')
    for q,a,w in [('Wie viele Tausender sind eine Million?',1000,[100,10000,10]),('Wie viele Hunderttausender sind eine Million?',10,[100,1000,1]),('Wie viele Nullen hat eine Million?',6,[5,7,3]),('Welche Zahl kommt nach 999\'999?','1\'000\'000',['100\'000','1\'999\'999','999\'990']),('Welche Zahl kommt vor 1\'000\'000?','999\'999',['990\'000','1\'000\'001','999\'000']),('Wie viele Zehntausender sind eine Million?',100,[10,1000,10000])]:
        t.exam(q,f(a) if isinstance(a,int) else a,[f(x) if isinstance(x,int) else x for x in w],expl=f(a) if isinstance(a,int) else a)
    for n in [900000,990000,750000,999000]:
        t.exam('Wie viel fehlt von %s bis zur Million?'%f(n),None,ans=fv(1000000-n),expl=f(1000000-n))
    for q,a in [('Wie viele Stellen hat eine Million?',7),('Wie viele Hunderter sind eine Million?',10000),('Wie viele Zehner sind eine Million?',100000)]:
        t.exam(q,None,ans=fv(a),expl=f(a))
    for q,a,w in [('Ein Stadion hat 50\'000 Plätze. Wie viele Stadien braucht man für eine Million Plätze?',20,[10,50,200]),('In einer Stadt leben 100\'000 Menschen. Wie viele solche Städte sind eine Million?',10,[100,1000,5]),('Ein Haus kostet 500\'000 Franken. Wie viele Häuser kosten zusammen eine Million?',2,[5,10,20])]:
        t.exam(q,a,w,expl=str(a))
    theory_steps(t,'Die Million ist eine sehr grosse Zahl. Du zählst sie in Tausendern.',[TBL(['M','HT','ZT','T','H','Z','E'],[['1','0','0','0','0','0','0']],None)],
        [['Million M','1\'000 Tausender','1\'000\'000'],['Hunderttausender','10 davon sind eine Million','100\'000'],['Zehntausender','100 davon sind eine Million','10\'000'],['Tausender','1\'000 davon sind eine Million','1\'000'],['Stellen','Eine Million hat 7 Stellen','6 Nullen']],
        'Von 999\'999 geht es mit +1 zur Million.',[TBL(['Zahl','Nachfolger'],[['9\'999','10\'000'],['99\'999','100\'000'],['999\'999','1\'000\'000']],None)],
        'Jede Stufe ist 10-mal grösser.',['Stufe','Wert'],[['Tausend','1\'000'],['Zehntausend','10\'000'],['Hunderttausend','100\'000'],['Million','1\'000\'000']],
        'So arbeitest du mit der Million.',[['Nullen zählen','Eine Million hat 6',0],['Stufen','Je Stufe mal 10',1],['Teilen','Million durch Zahl',2]],
        [[['1\'000\'000 : 100\'000','Aufgabe',0],['Nullen kürzen','5 Nullen',1],['10','Ergebnis',2]],[['1\'000\'000 − 250\'000','Aufgabe',0],['750\'000','Ergebnis',1]]],
        'Merke: Eine Million hat sechs Nullen.',[['Million','1\'000 Tausender','1\'000\'000',0],['Stellen','sieben','6 Nullen',1],['Stufen','mal 10','T, ZT, HT, M',2]])
    return t
T.append(million)
def teiler():
    t=Topic('kl5-mathe-teiler-vielfache','kl5','Beliebig grosse Zahlen','Teiler und Vielfache','mathe',100,seed=72)
    t.th('basis','Teiler und Vielfache','Ein Teiler geht ohne Rest in die Zahl. Ein Vielfaches steht in der Malreihe der Zahl.',[['Teiler von 12','1, 2, 3, 4, 6, 12'],['Vielfache von 3','3, 6, 9, 12, ...']])
    R=t.rnd
    div=lambda n:[d for d in range(1,n+1) if n%d==0]
    for n in [12,18,20,24,30,36,40,45,48,60]:
        d=div(n);a=', '.join(map(str,d))
        w=[', '.join(map(str,[x for x in d if x!=d[len(d)//2]])),', '.join(map(str,sorted(d+[d[-1]+1]))) if True else '',', '.join(map(str,d[:-1]))]
        t.card(1,'Welche Zahlen sind alle Teiler von %d?'%n,a,[x for x in w if x!=a],hints=['Welche Zahlen gehen ohne Rest in %d?'%n],steps=[[a,'Teiler von %d'%n]],th='basis')
    for n,k in [(24,4),(30,7),(45,9),(50,8),(56,7),(63,5),(72,9),(81,6),(36,5),(28,3),(64,5),(40,6)]:
        ok=n%k==0;t.card(1,'Ist %d ein Teiler von %d?'%(k,n),'ja' if ok else 'nein',['nein' if ok else 'ja'],hints=['Teile %d durch %d. Bleibt ein Rest?'%(n,k)],steps=[['%d : %d = %s'%(n,k,str(n//k) if ok else '%d Rest %d'%(n//k,n%k)),'Teilen']],th='basis')
    for k in [3,4,5,6,7,8,9,11]:
        v=[k*m for m in range(1,6)]
        a=', '.join(map(str,v));w=[', '.join(map(str,[k*m+1 for m in range(1,6)])),', '.join(map(str,[k+m for m in range(1,6)])),', '.join(map(str,[k*m for m in range(2,7)]))]
        t.card(2,'Welche Zahlen sind die ersten 5 Vielfachen von %d?'%k,a,w,hints=['Die Malreihe von %d.'%k],steps=[[a,'Vielfache']],th='basis')
    for k,n in [(6,42),(7,35),(9,54),(8,64),(4,36),(5,45),(12,60),(11,66)]:
        t.card(2,'Ist %d ein Vielfaches von %d?'%(n,k),'ja',['nein'],hints=['Steht %d in der %der-Reihe?'%(n,k)],steps=[['%d × %d = %d'%(k,n//k,n),'Mal']],th='basis')
    for a,b,r in [(4,6,12),(3,5,15),(6,8,24),(4,10,20),(6,9,18),(5,6,30)]:
        t.card(3,'Das kleinste gemeinsame Vielfache von %d und %d ist ...'%(a,b),r,wr(r,1,100,R,deltas=(a,b,1,2)),hints=['Schreibe beide Reihen auf.'],steps=[['Reihe %d und %d'%(a,b),'Reihen'],[str(r),'erstes gemeinsames Vielfaches']],th='basis')
    for a,b,g in [(12,18,6),(8,12,4),(20,30,10),(15,25,5),(16,24,8),(18,27,9)]:
        t.card(3,'Der grösste gemeinsame Teiler von %d und %d ist ...'%(a,b),g,wr(g,1,100,R,deltas=(1,2,3)),hints=['Schreibe die Teiler beider Zahlen auf.'],steps=[['Teiler von %d und %d'%(a,b),'Teiler'],[str(g),'grösster gemeinsamer']],th='basis')
    for n in [16,28,32,42]:
        d=div(n);a=', '.join(map(str,d));t.exam('Welche Zahlen sind alle Teiler von %d?'%n,a,[', '.join(map(str,[x for x in d if x!=d[len(d)//2]])),', '.join(map(str,sorted(d+[d[-1]+1]))),', '.join(map(str,d[:-1]))],expl=a)
    for n,k in [(48,6),(35,4),(72,8),(54,7),(63,9)]:
        ok=n%k==0;t.exam('Ist %d ein Teiler von %d?'%(k,n),'ja' if ok else 'nein',['nein' if ok else 'ja'],expl='%d : %d'%(n,k))
    for k in [4,6,9]:
        a=', '.join(str(k*m) for m in range(1,6));t.exam('Welche Zahlen sind die ersten 5 Vielfachen von %d?'%k,a,[', '.join(str(k*m+1) for m in range(1,6)),', '.join(str(k+m) for m in range(1,6)),', '.join(str(k*m) for m in range(2,7))],expl=a)
    for a,b,r in [(4,6,12),(3,4,12)]:
        t.exam('Das kleinste gemeinsame Vielfache von %d und %d ist ...'%(a,b),None,ans=[str(r)],expl=str(r))
    for a,b,g in [(12,18,6),(16,24,8)]:
        t.exam('Der grösste gemeinsame Teiler von %d und %d ist ...'%(a,b),None,ans=[str(g)],expl=str(g))
    theory_steps(t,'Teiler und Vielfache gehören zusammen. Beide kommen aus dem Einmaleins.',[TBL(['','Beispiel mit 12'],[['Teiler','1, 2, 3, 4, 6, 12'],['Vielfache von 3','3, 6, 9, 12, 15, ...']],None)],
        [['Teiler','geht ohne Rest hinein','4 teilt 12'],['Vielfaches','Zahl in der Malreihe','12 ist Vielfaches von 4'],['gemeinsamer Teiler','Teiler von zwei Zahlen','Teiler von 12 und 18: 6'],['gemeinsames Vielfaches','in beiden Reihen','12 bei 4 und 6']],
        'Alle Teiler findest du in Paaren.',[TBL(['Paar','Rechnung'],[['1 und 12','1 × 12'],['2 und 6','2 × 6'],['3 und 4','3 × 4']],None)],
        'Die Reihen von 4 und 6 treffen sich bei 12.',['Zahl','Reihe'],[['4','4, 8, 12, 16, 20'],['6','6, 12, 18, 24']],
        'So findest du Teiler.',[['Mit 1 beginnen','1 ist immer Teiler',0],['Der Reihe nach','2, 3, 4, ... prüfen',1],['Paare notieren','Mal-Aufgaben',2],['Stoppen','Wenn sich die Paare treffen',3]],
        [[['Teiler von 24','Aufgabe',0],['1×24, 2×12, 3×8, 4×6','Paare',1],['1, 2, 3, 4, 6, 8, 12, 24','Ergebnis',2]],[['Vielfache von 7','Aufgabe',0],['7, 14, 21, 28, 35','Malreihe',1]]],
        'Merke: Teiler teilen, Vielfache wachsen.',[['Teiler','ohne Rest','4 teilt 12',0],['Vielfaches','Malreihe','7, 14, 21',1],['Paare','Teiler in Paaren','3 × 4 = 12',2]])
    return t
T.append(teiler)
def brueche():
    t=Topic('kl5-mathe-brueche','kl5','Einführung Brüche','Brüche verstehen','mathe',50,seed=73)
    t.th('basis','Zähler und Nenner','Der Nenner sagt, in wie viele gleiche Teile das Ganze geteilt ist. Der Zähler sagt, wie viele Teile gemeint sind.',[['3/8','Zähler 3, Nenner 8']])
    R=t.rnd
    fr=lambda a,b:'%d/%d'%(a,b)
    ps=[(1,2),(1,3),(2,3),(1,4),(3,4),(2,5),(3,5),(1,6),(5,6),(3,8),(5,8),(7,8),(1,10),(3,10),(7,10),(4,5)]
    for a,b in ps:
        w=[fr(b-a if b-a!=a else a+1,b),fr(a,b+1),fr(a+1 if a+1<b else a-1 if a>1 else 2,b)]
        t.card(1,'Welcher Bruch ist gefärbt?',fr(a,b),w,hints=['Gefärbte Teile durch alle Teile.'],steps=[['gefärbt: %d'%a,'Zähler'],['alle Teile: %d'%b,'Nenner']],vis=[{"type":"pie","parts":b,"filled":a}],th='basis')
    for a,b in [(3,8),(5,6),(2,9),(7,10),(4,5),(1,12)]:
        t.card(1,'Wie heisst der Nenner von %s?'%fr(a,b),b,[a,b+1,a+b],hints=['Der Nenner steht unten.'],steps=[[str(b),'Nenner']],th='basis')
        t.card(1,'Wie heisst der Zähler von %s?'%fr(a,b),a,[b,a+1,a+b],hints=['Der Zähler steht oben.'],steps=[[str(a),'Zähler']],th='basis')
    for a,b,c in [(3,5,8),(2,7,8),(1,6,8),(4,3,8),(5,9,12),(7,2,12)]:
        s='<' if a<b else '>'
        t.card(2,'Setze das Zeichen: %s ○ %s'%(fr(a,c),fr(b,c)),s,['<' if s=='>' else '>','='],hints=['Gleicher Nenner: der grössere Zähler gewinnt.'],steps=[['%s %s %s'%(fr(a,c),s,fr(b,c)),'Vergleichen']],th='basis')
    for b in [4,6,8,10]:
        t.card(2,'Wie viele %sel ergeben ein Ganzes?'%{4:'Vier',6:'Sechs',8:'Acht',10:'Zehn'}[b] if False else 'Wie viele Teile mit Nenner %d ergeben ein Ganzes?'%b,b,[b-1,b+1,2*b],hints=['Das Ganze ist Nenner durch Nenner.'],steps=[['%d/%d = 1'%(b,b),'Ganzes']],th='basis')
    for a,b in [(3,4),(5,8),(2,6),(7,10),(4,12),(3,9)]:
        t.exam('Welcher Bruch ist gefärbt?',fr(a,b),[fr(b-a if b-a!=a else a+1,b),fr(a,b+1),fr(a+1 if a+1<b else a-1,b)],vis=[{"type":"pie","parts":b,"filled":a}],expl=fr(a,b))
    for a,b in [(3,8),(5,6),(2,9),(7,10)]:
        t.exam('Wie heisst der Nenner von %s?'%fr(a,b),None,ans=[str(b)],expl=str(b))
        t.exam('Wie heisst der Zähler von %s?'%fr(a,b),None,ans=[str(a)],expl=str(a))
    for a,b,c in [(3,5,8),(6,2,8),(1,4,12),(9,7,10)]:
        s='<' if a<b else '>';t.exam('Setze das Zeichen: %s ○ %s'%(fr(a,c),fr(b,c)),s,['<' if s=='>' else '>','='],expl='%s %s %s'%(fr(a,c),s,fr(b,c)))
    theory_steps(t,'Brüche beschreiben Teile von einem Ganzen. Der Nenner teilt, der Zähler zählt.',[{"type":"pie","parts":4,"filled":3}],
        [['Bruch','Teil vom Ganzen','3/4'],['Zähler','gefärbte Teile (oben)','3'],['Nenner','alle gleichen Teile (unten)','4'],['Bruchstrich','trennt Zähler und Nenner','—'],['Ganzes','alle Teile','4/4 = 1']],
        'Die Kreisstücke zeigen den Bruch.',[{"type":"pie","parts":8,"filled":3},{"type":"pie","parts":5,"filled":2}],
        'Zähler und Nenner im Überblick.',['Bruch','Zähler','Nenner','gelesen'],[['1/2','1','2','ein Halb'],['3/4','3','4','drei Viertel'],['5/8','5','8','fünf Achtel']],
        'So liest du einen Bruch.',[['Teile zählen','Alle gleichen Teile: Nenner',0],['Gefärbte zählen','Das ist der Zähler',1],['Bruch schreiben','Zähler über Nenner',2]],
        [[['8 Teile','Nenner',0],['3 gefärbt','Zähler',1],['3/8','Bruch',2]],[['5 Teile','Nenner',0],['2 gefärbt','Zähler',1],['2/5','Bruch',2]]],
        'Merke: Unten teilt, oben zählt.',[['Nenner','unten: gleiche Teile','3/8: 8 Teile',0],['Zähler','oben: gezählte Teile','3/8: 3 Teile',1],['Vergleichen','gleicher Nenner','5/8 > 3/8',2]])
    return t
T.append(brueche)
def bruchteile():
    t=Topic('kl5-mathe-bruchteile','kl5','Einführung Brüche','Einfache Bruchteile','mathe',50,seed=74)
    t.th('basis','Bruchteil berechnen','Teile das Ganze durch den Nenner. Multipliziere dann mit dem Zähler.',[['3/4 von 20','20 : 4 = 5, 5 × 3 = 15']])
    R=t.rnd
    def one(n,d):return n//d
    L1=[(20,2),(30,2),(24,4),(36,4),(27,3),(45,5),(50,10),(40,5),(48,6),(32,4),(18,3),(14,2),(44,4),(36,6),(42,7),(16,8)]
    for n,d in L1:
        r=n//d;t.card(1,'1/%d von %d = ?'%(d,n),r,wr(r,0,50,R,deltas=(1,2,d)),hints=['Teile durch %d.'%d],steps=[['%d : %d = %d'%(n,d,r),'Teilen']],th='basis')
    L2=[(20,3,4),(12,2,3),(24,3,4),(30,2,5),(18,5,6),(40,3,5),(36,3,4),(48,5,6),(45,4,5),(16,3,4)]
    for n,z,d in L2:
        e=n//d;r=e*z;t.card(2,'%d/%d von %d = ?'%(z,d,n),r,wr(r,0,50,R,deltas=(e,1,2)),hints=['Erst durch den Nenner, dann mal Zähler.'],steps=[['%d : %d = %d'%(n,d,e),'Ein Teil'],['%d × %d = %d'%(e,z,r),'Zähler mal Teil']],th='basis')
    for q,a,w in [('Eine Pizza hat 8 Stücke. Du isst 1/4 davon. Wie viele Stücke sind das?',2,[4,1,8]),('Eine Klasse hat 24 Kinder. 1/3 spielt Fussball. Wie viele Kinder sind das?',8,[3,12,6]),('Ein Heft hat 40 Seiten. Du hast 3/4 gelesen. Wie viele Seiten sind das?',30,[10,20,25]),('Eine Tafel Schokolade hat 20 Stücke. 2/5 sind weg. Wie viele Stücke sind das?',8,[4,10,5]),('Ein Weg ist 48 m lang. Du bist 5/6 gegangen. Wie viele m sind das?',40,[8,24,36]),('Ein Korb hat 30 Äpfel. 1/5 sind faul. Wie viele Äpfel sind faul?',6,[5,10,3])]:
        t.card(3,q,a,w,hints=['Bruchteil berechnen.'],steps=[[str(a),'Ergebnis']],th='basis')
    for n,d in [(16,2),(28,4),(21,3),(35,5),(40,10),(42,6)]:
        r=n//d;t.exam('1/%d von %d = ?'%(d,n),r,wr(r,0,50,R,deltas=(1,2,d)),expl='%d : %d = %d'%(n,d,r))
    for n,z,d in [(20,3,4),(18,2,3),(40,4,5),(30,5,6),(32,3,4),(45,2,5)]:
        e=n//d;r=e*z;t.exam('%d/%d von %d = ?'%(z,d,n),None,ans=[str(r)],expl='%d : %d = %d, %d × %d = %d'%(n,d,e,e,z,r))
    for q,a,w in [('Eine Pizza hat 8 Stücke. Du isst 1/4 davon. Wie viele Stücke sind das?',2,[4,1,8]),('Eine Klasse hat 24 Kinder. 1/3 spielt Fussball. Wie viele Kinder sind das?',8,[3,12,6]),('Ein Heft hat 40 Seiten. Du hast 3/4 gelesen. Wie viele Seiten sind das?',30,[10,20,25]),('Ein Korb hat 30 Äpfel. 1/5 sind faul. Wie viele Äpfel sind faul?',6,[5,10,3])]:
        t.exam(q,a,w,expl=str(a))
    theory_steps(t,'Einen Bruchteil von einer Zahl berechnest du in zwei Schritten.',[{"type":"pie","parts":4,"filled":3,"cap":"3/4 von 20"}],
        [['Bruchteil','Teil von einer Zahl','1/4 von 20'],['Ein Teil','Ganzes durch Nenner','20 : 4 = 5'],['Mehrere Teile','Ein Teil mal Zähler','5 × 3 = 15'],['Ganzes','die ganze Zahl','20']],
        'Erst teilen, dann mal Zähler.',[TBL(['Schritt','3/4 von 20'],[['Teilen (Nenner)','20 : 4 = 5'],['Mal (Zähler)','5 × 3 = 15']],None)],
        'Einige Bruchteile von 24.',['Bruch','Rechnung','Ergebnis'],[['1/2','24 : 2','12'],['1/4','24 : 4','6'],['3/4','6 × 3','18'],['1/3','24 : 3','8']],
        'So berechnest du den Bruchteil.',[['Nenner lesen','In wie viele Teile?',0],['Teilen','Ganzes durch Nenner',1],['Zähler lesen','Wie viele Teile?',2],['Malnehmen','Ein Teil mal Zähler',3]],
        [[['1/4 von 20','Aufgabe',0],['20 : 4 = 5','ein Teil',1],['5','Ergebnis',2]],[['2/3 von 18','Aufgabe',0],['18 : 3 = 6','ein Teil',1],['6 × 2 = 12','Ergebnis',2]]],
        'Merke: Erst durch den Nenner, dann mal Zähler.',[['Teilen','durch den Nenner','20 : 4 = 5',0],['Mal','mit dem Zähler','5 × 3 = 15',1],['Ganzes','Zähler = Nenner','4/4 von 20 = 20',2]])
    return t
T.append(bruchteile)
