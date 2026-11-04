from ar import *
T=[]
def hze(n):return n//100,n%100//10,n%10
def zahlen1000():
    t=Topic('kl3-mathe-zahlen1000','kl3','Zahlen und Mengen','Zahlen bis 1000','mathe',1000,seed=51)
    t.th('basis','Hunderter, Zehner, Einer','Eine Zahl bis 1000 hat Hunderter, Zehner und Einer. Jede Ziffer hat ihren Platz.',[['347','3 H, 4 Z, 7 E']])
    t.th('nach','Vorgänger und Nachfolger','Der Vorgänger ist eins weniger, der Nachfolger eins mehr. Bei den Zehnern und Hundertern geht es in 10er- und 100er-Schritten.',[['346','347','348']])
    ns=[347,582,perm:=129,806,455,718,263,904,570,631,198,420]
    for n in ns:
        h,z,e=hze(n)
        t.card(1,'%d: Wie viele Hunderter hat die Zahl?'%n,h,wr(h,0,9,t.rnd,deltas=(1,2,3)),hints=['Die erste Ziffer.'],steps=[['%d = %d H + %d Z + %d E'%(n,h,z,e),'Zerlegen']],th='basis')
        t.card(1,'%d: Wie viele Zehner hat die Zahl?'%n,z,wr(z,0,9,t.rnd,deltas=(1,2,3)),hints=['Die mittlere Ziffer.'],steps=[['%d = %d H + %d Z + %d E'%(n,h,z,e),'Zerlegen']],th='basis')
    for h,z,e in [(4,5,2),(7,0,8),(3,6,9),(9,1,4),(2,8,0),(6,3,5),(1,9,7),(8,4,1)]:
        n=h*100+z*10+e
        t.card(2,'Welche Zahl ist %d H, %d Z und %d E?'%(h,z,e),n,wr(n,0,1000,t.rnd,deltas=(1,10,100)),hints=['Hunderter, Zehner, Einer der Reihe nach.'],steps=[['%d + %d + %d = %d'%(h*100,z*10,e,n),'Zusammensetzen']],th='basis')
    for n in [299,540,809,650,399,720]:
        t.card(2,'Welche Zahl kommt nach der %d?'%n,n+1,wr(n+1,0,1000,t.rnd,deltas=(1,10,100)),hints=['Eins mehr.'],steps=[['%d + 1 = %d'%(n,n+1),'Nachfolger']],th='nach')
    for a,b in [(347,374),(805,508),(612,621),(999,990),(450,405),(238,283)]:
        s='<' if a<b else '>'
        t.card(3,'Setze das Zeichen: %d ○ %d'%(a,b),s,['<' if s=='>' else '>','='],hints=['Vergleiche zuerst die Hunderter.'],steps=[['%d %s %d'%(a,s,b),'Vergleichen']],th='basis')
    for n in [356,709,845,123,690,478]:
        h,z,e=hze(n)
        t.exam('%d: Wie viele Hunderter hat die Zahl?'%n,h,wr(h,0,9,t.rnd,deltas=(1,2,3)),expl='%d Hunderter'%h)
    for n in [356,709,845,123]:
        h,z,e=hze(n);t.exam('%d: Wie viele Zehner hat die Zahl?'%n,None,ans=[str(z)],expl='%d Zehner'%z)
    for h,z,e in [(5,2,7),(9,0,3),(2,6,8)]:
        n=h*100+z*10+e;t.exam('Welche Zahl ist %d H, %d Z und %d E?'%(h,z,e),None,ans=[str(n)],expl='%d'%n)
    for n in [499,780,999]:
        t.exam('Welche Zahl kommt nach der %d?'%n,None,ans=[str(n+1)],expl=str(n+1))
    for a,b in [(512,521),(740,704),(899,989),(303,330)]:
        s='<' if a<b else '>';t.exam('Setze das Zeichen: %d ○ %d'%(a,b),s,['<' if s=='>' else '>','='],expl='%d %s %d'%(a,s,b))
    theory_steps(t,'Zahlen bis 1000 bestehen aus Hundertern, Zehnern und Einern.',[TBL(['H','Z','E'],[['3','4','7']],None)],
        [['Hunderter H','100er-Päckchen','3 in 347 = 300'],['Zehner Z','10er-Päckchen','4 in 347 = 40'],['Einer E','einzelne Stück','7 in 347'],['Stellenwert','Platz der Ziffer','H, Z, E'],['Nachfolger','eins mehr','347, dann 348']],
        'Jede Ziffer steht an ihrem Platz.',[TBL(['Zahl','H','Z','E'],[['347','3','4','7'],['905','9','0','5'],['280','2','8','0']],None),NL(0,1000,100,minor=50,pts=[300],cap='300 am Zahlenstrahl')],
        'Zahlen zerlegen und zusammensetzen.',['Zahl','Zerlegung'],[['347','300 + 40 + 7'],['905','900 + 0 + 5'],['280','200 + 80']],
        'So liest und baust du eine Zahl.',[['Hunderter','Erste Ziffer: mal 100',0],['Zehner','Mittlere Ziffer: mal 10',1],['Einer','Letzte Ziffer',2],['Zusammen','Alles addieren',3]],
        [[['3 H = 300','Hunderter',0],['4 Z = 40','Zehner',1],['7 E = 7','Einer',2],['347','Zahl',3]],[['9 H = 900','Hunderter',0],['0 Z = 0','Zehner',1],['5 E = 5','Einer',2],['905','Zahl',3]]],
        'Merke: Jede Ziffer hat ihren Wert.',[['H','mal 100','3 H = 300',0],['Z','mal 10','4 Z = 40',1],['E','mal 1','7 E = 7',2]])
    return t
T.append(zahlen1000)
def runden():
    t=Topic('kl3-mathe-runden','kl3','Zahlen und Mengen','Runden auf Zehner und Hunderter','mathe',1000,seed=52)
    t.th('basis','Die Rundungsregel','Schau auf die Ziffer rechts vom Runden. 0 bis 4: abrunden. 5 bis 9: aufrunden.',[['347','auf 10: 350']])
    def r10(n):return (n+5)//10*10
    def r100(n):return (n+50)//100*100
    ns=[347,582,129,806,455,718,263,904,570,631,198,424,675,833,299]
    for n in ns:
        t.card(1,'%d auf Zehner runden:'%n,r10(n),wr(r10(n),0,1000,t.rnd,deltas=(10,20)),hints=['Schau auf die Einer.'],steps=[['Einer: %d'%(n%10),'Ziffer rechts'],['%d'%r10(n),'gerundet']],th='basis')
    for n in ns:
        t.card(2,'%d auf Hunderter runden:'%n,r100(n),wr(r100(n),0,1000,t.rnd,deltas=(100,200)),hints=['Schau auf die Zehner.'],steps=[['Zehner: %d'%(n%100//10),'Ziffer rechts'],['%d'%r100(n),'gerundet']],th='basis')
    for n in [345,650,95,250,705,999]:
        t.card(3,'Wird %d beim Runden auf Zehner auf- oder abgerundet?'%n,'aufgerundet' if n%10>=5 else 'abgerundet',['abgerundet' if n%10>=5 else 'aufgerundet'],hints=['Die Einer: 0–4 ab, 5–9 auf.'],steps=[['Einer: %d'%(n%10),'Ziffer rechts']],th='basis')
    for n in [236,574,891,342,617,460]:
        t.exam('%d auf Zehner runden:'%n,r10(n),wr(r10(n),0,1000,t.rnd,deltas=(10,20)),expl='%d'%r10(n))
    for n in [236,574,891,342,617,460]:
        t.exam('%d auf Hunderter runden:'%n,None,ans=[str(r100(n))],expl='%d'%r100(n))
    for n in [652,248,375,903]:
        t.exam('Wird %d beim Runden auf Hunderter auf- oder abgerundet?'%n,'aufgerundet' if n%100>=50 else 'abgerundet',['abgerundet' if n%100>=50 else 'aufgerundet'],expl='Zehner: %d'%(n%100//10))
    theory_steps(t,'Runden macht eine Zahl einfacher. Du findest die nächste Zehner- oder Hunderterzahl.',[NL(340,350,1,pts=[347],cap='347 liegt näher bei 350')],
        [['runden','auf eine einfache Zahl ändern','347 ≈ 350'],['abrunden','Ziffer 0 bis 4','342 → 340'],['aufrunden','Ziffer 5 bis 9','347 → 350'],['Zehner','auf 10 genau','350'],['Hunderter','auf 100 genau','300']],
        'Die Zahl liegt näher bei der einen oder der anderen Zehnerzahl.',[NL(340,350,1,pts=[342],cap='342 → 340'),NL(300,400,10,pts=[360],cap='360 → 400, wenn auf 100')],
        'Die Rundungsregel in der Tabelle.',['Ziffer rechts','Was du tust'],[['0 1 2 3 4','abrunden'],['5 6 7 8 9','aufrunden']],
        'So rundest du.',[['Stelle finden','Zehner oder Hunderter?',0],['Ziffer rechts ansehen','0–4 oder 5–9?',1],['Ab oder auf','Stelle behalten oder +1',2],['Hinten Nullen','Rest wird 0',3]],
        [[['347','auf Zehner',0],['Einer 7','5–9',1],['aufrunden','+1 Zehner',2],['350','Ergebnis',3]],[['347','auf Hunderter',0],['Zehner 4','0–4',1],['abrunden','Hunderter bleiben',2],['300','Ergebnis',3]]],
        'Merke: 0–4 ab, 5–9 auf.',[['ab','0 1 2 3 4','342 → 340',0],['auf','5 6 7 8 9','347 → 350',1],['Nullen','hinten Nullen setzen','289 → 300',2]])
    return t
T.append(runden)
def add1000():
    t=Topic('kl3-mathe-plus1000','kl3','Operationen','Halbschriftlich addieren bis 1000','mathe',1000,seed=53)
    t.th('basis','Hunderter, Zehner, Einer einzeln','Zerlege beide Zahlen. Rechne Hunderter, Zehner und Einer einzeln. Dann zählst du alles zusammen.',[['346 + 215','500 + 50 + 11 = 561']])
    addsub(t,'k3','+',1000,n1=18,n2=8,n3=6,nex=16)
    theory_steps(t,'Grosse Zahlen rechnest du in Schritten. Hunderter, Zehner und Einer einzeln.',[TBL(['','H','Z','E'],[['346','3','4','6'],['215','2','1','5']],None)],
        [['Summand','Zahl, die du addierst','346 und 215'],['Summe','Ergebnis','561'],['Teilsumme','Ergebnis eines Schritts','500, 50, 11'],['halbschriftlich','Schritt für Schritt notieren','mit Zwischenschritten']],
        'Rechne jede Stelle einzeln.',[BAR([['300','200'],['40','10'],['6','5']],'346 + 215',0) if False else TBL(['Stelle','Rechnung','Teilsumme'],[['Hunderter','300 + 200','500'],['Zehner','40 + 10','50'],['Einer','6 + 5','11']],None)],
        'Vier Schritte führen zur Summe.',['Schritt','346 + 215'],[['Hunderter','300 + 200 = 500'],['Zehner','40 + 10 = 50'],['Einer','6 + 5 = 11'],['Zusammen','500 + 50 + 11 = 561']],
        'So rechnest du halbschriftlich.',[['Zerlegen','Beide Zahlen in H, Z, E',0],['Hunderter','Hunderter addieren',1],['Zehner','Zehner addieren',2],['Einer','Einer addieren',3],['Zusammen','Teilsummen addieren',4]],
        [[['346 + 215','Aufgabe',0],['500 + 50 + 11','Teilsummen',1],['561','Summe',2]],[['428 + 357','Aufgabe',0],['700 + 70 + 15','Teilsummen',1],['785','Summe',2]]],
        'Merke: Stelle für Stelle, dann zusammen.',[['H, Z, E','einzeln addieren','300 + 200',0],['Teilsummen','am Schluss addieren','500 + 50 + 11',1],['Prüfen','mit Minus','561 − 215 = 346',2]])
    return t
T.append(add1000)
def sub1000():
    t=Topic('kl3-mathe-minus1000','kl3','Operationen','Halbschriftlich subtrahieren bis 1000','mathe',1000,seed=54)
    t.th('basis','Schrittweise wegnehmen','Nimm zuerst die Hunderter weg, dann die Zehner, dann die Einer.',[['524 − 237','324, 294, 287']])
    addsub(t,'k3','-',1000,n1=18,n2=8,n3=6,nex=16)
    theory_steps(t,'Grosse Zahlen ziehst du in Schritten ab. Hunderter, Zehner, Einer nacheinander.',[TBL(['','H','Z','E'],[['524','5','2','4'],['237','2','3','7']],None)],
        [['Minuend','Zahl, von der du wegnimmst','524'],['Subtrahend','Zahl, die du wegnimmst','237'],['Differenz','Ergebnis','287'],['Zwischenergebnis','nach jedem Schritt','324, 294']],
        'Nimm in drei Schritten weg.',[TBL(['Schritt','Rechnung','Ergebnis'],[['Hunderter weg','524 − 200','324'],['Zehner weg','324 − 30','294'],['Einer weg','294 − 7','287']],None)],
        'Drei Schritte, dann die Probe.',['Schritt','524 − 237'],[['Hunderter','524 − 200 = 324'],['Zehner','324 − 30 = 294'],['Einer','294 − 7 = 287'],['Probe','287 + 237 = 524']],
        'So rechnest du halbschriftlich Minus.',[['Zerlegen','Zweite Zahl in H, Z, E',0],['Hunderter weg','Von der ersten Zahl',1],['Zehner weg','Vom Zwischenergebnis',2],['Einer weg','Noch einmal',3],['Probe','Mit Plus prüfen',4]],
        [[['524 − 237','Aufgabe',0],['524 − 200 = 324','Hunderter',1],['324 − 30 = 294','Zehner',2],['294 − 7 = 287','Einer',3]],[['803 − 456','Aufgabe',0],['803 − 400 = 403','Hunderter',1],['403 − 50 = 353','Zehner',2],['353 − 6 = 347','Einer',3]]],
        'Merke: Erst Hunderter, dann Zehner, dann Einer.',[['Weg','Stelle für Stelle','524 − 200',0],['Zwischenergebnis','merken','324, 294',1],['Probe','mit Plus','287 + 237 = 524',2]])
    return t
T.append(sub1000)
def einmaleins():
    t=Topic('kl3-mathe-einmaleins','kl3','Operationen','Das kleine Einmaleins','mathe',100,seed=55)
    t.th('basis','Die Reihen','Das Einmaleins sind die Malreihen von 1 bis 10. Jede Aufgabe ist eine Gruppe mal Anzahl.',[['6 × 7','= 42']])
    t.th('tausch','Tauschen und Zerlegen','Du kannst tauschen: 6 × 7 ist 7 × 6. Du kannst zerlegen: 6 × 7 = 5 × 7 + 1 × 7.',[['6 × 7','35 + 7 = 42']])
    P=[(a,b) for a in range(2,10) for b in range(2,10)]
    t.rnd.shuffle(P)
    for a,b in P[:20]:
        r=a*b
        t.card(1,'%d × %d = ?'%(a,b),r,wr(r,0,100,t.rnd,deltas=(a,b,1,10)),hints=['Tauschen oder zerlegen.'],steps=[['%d × %d = %d'%(a,b,r),'Mal-Aufgabe']],th='basis')
    for a,b in P[20:30]:
        r=a*b
        t.card(2,'%d × ? = %d'%(a,r),b,wr(b,0,10,t.rnd,deltas=(1,2)),hints=['Rechne zurück: Welche Zahl mal %d?'%a],steps=[['%d × %d = %d'%(a,b,r),'Umkehren']],th='basis')
    for a,b in P[30:36]:
        r=a*b;k=a-a%5 if a>5 else a
        t.card(2,'Zerlege: %d × %d = 5 × %d + ? × %d'%(a,b,b,b) if a>5 else '%d × %d = ?'%(a,b),a-5 if a>5 else r,wr(a-5 if a>5 else r,0,100,t.rnd,deltas=(1,2)) ,hints=['Zerlege die erste Zahl in 5 und den Rest.'],steps=[['%d × %d = %d'%(a,b,r),'Zerlegen']],th='tausch')
    for q,a in [('Ein Päckli hat 6 Karten. Wie viele Karten sind in 7 Päckli?',42),('Eine Spinne hat 8 Beine. Wie viele Beine haben 9 Spinnen?',72),('In einer Schachtel sind 9 Kugeln. Wie viele sind in 6 Schachteln?',54),('Ein Tisch hat 4 Beine. Wie viele Beine haben 8 Tische?',32),('7 Kinder haben je 7 Murmeln. Wie viele Murmeln sind es?',49),('Ein Blumenstrauss hat 8 Blumen. Wie viele Blumen sind es bei 8 Sträussen?',64)]:
        t.card(3,q,a,wr(a,0,100,t.rnd,deltas=(6,7,8,1,10)),hints=['Gleiche Gruppen: Mal-Aufgabe.'],steps=[['%d'%a,'Ergebnis']],th='basis')
    for a,b in P[36:52]:
        r=a*b
        if len(t.qs)%2==0:t.exam('%d × %d = ?'%(a,b),r,wr(r,0,100,t.rnd,deltas=(a,b,1,10)),expl='%d × %d = %d'%(a,b,r))
        else:t.exam('%d × %d = ?'%(a,b),None,ans=[str(r)],expl='%d × %d = %d'%(a,b,r))
    theory_steps(t,'Das kleine Einmaleins hilft dir beim Rechnen im Alltag. Mit Tricks lernst du es leichter.',[TBL(['×','2','3','4','5'],[['2','4','6','8','10'],['3','6','9','12','15'],['4','8','12','16','20'],['5','10','15','20','25']],None)],
        [['Faktor','Zahl, die du malnimmst','6 und 7'],['Produkt','das Ergebnis','42'],['Reihe','alle Aufgaben einer Zahl','7, 14, 21, ...'],['Tauschaufgabe','Faktoren vertauschen','6 × 7 = 7 × 6'],['Kernaufgabe','leichte Aufgabe zum Ableiten','5 × 7 = 35']],
        'Die Tabelle zeigt viele Aufgaben auf einen Blick.',[TBL(['×','6','7','8','9'],[['6','36','42','48','54'],['7','42','49','56','63'],['8','48','56','64','72'],['9','54','63','72','81']],None)],
        'Tauschen und zerlegen helfen.',['Trick','Beispiel'],[['Tauschen','6 × 7 = 7 × 6'],['Zerlegen','6 × 7 = 5 × 7 + 1 × 7'],['Doppelte','4 × 6 = 2 × 12']],
        'So rechnest du eine schwere Aufgabe.',[['Kernaufgabe suchen','5er oder 10er',0],['Ableiten','Eine Gruppe mehr oder weniger',1],['Zusammen','Teilergebnisse addieren',2]],
        [[['6 × 7','Aufgabe',0],['5 × 7 = 35','Kern',1],['35 + 7 = 42','Ergebnis',2]],[['9 × 8','Aufgabe',0],['10 × 8 = 80','Kern',1],['80 − 8 = 72','Ergebnis',2]]],
        'Merke: Tauschen, zerlegen und ableiten.',[['Tauschen','Faktoren vertauschen','6 × 7 = 7 × 6',0],['5er-Kern','5 × 7 = 35','35 + 7 = 42',1],['10er-Kern','10 × 8 = 80','80 − 8 = 72',2]])
    return t
T.append(einmaleins)
def div10():
    t=Topic('kl3-mathe-division-10er','kl3','Operationen','Teilen mit der 10er-Reihe','mathe',100,seed=56)
    t.th('basis','Teilen und Mal gehören zusammen','Beim Teilen fragst du: Wie oft passt die Zahl hinein? Mit der 10er-Reihe geht das leicht.',[['60 : 10','= 6 weil 6 × 10 = 60']])
    for k in range(1,11):
        n=k*10
        t.card(1,'%d : 10 = ?'%n,k,wr(k,0,10,t.rnd,deltas=(1,2,3)),hints=['Wie oft passt 10 in %d?'%n],steps=[['%d × 10 = %d'%(k,n),'Umkehren'],['%d : 10 = %d'%(n,k),'Teilen']],th='basis')
    for k in range(1,11):
        n=k*10
        t.card(2,'10 × ? = %d'%n,k,wr(k,0,10,t.rnd,deltas=(1,2,3)),hints=['Zähle in 10er-Schritten.'],steps=[['%d × 10 = %d'%(k,n),'Mal']],th='basis')
    for k in (2,4,5,8):
        n=k*10
        t.card(2,'%d : ? = 10'%n,k,wr(k,0,10,t.rnd,deltas=(1,2,3)),hints=['Wie viele Zehner?'],steps=[['%d × 10 = %d'%(k,n),'Umkehren']],th='basis')
    for q,k in [('60 Franken werden auf 10 Kinder verteilt. Wie viel bekommt jedes Kind?',6),('80 Karten werden in 10er-Päckli gepackt. Wie viele Päckli?',8),('90 Stifte sind in 10er-Schachteln. Wie viele Schachteln?',9),('Ein Seil von 70 cm wird in 10 gleiche Stücke geschnitten. Wie lang ist ein Stück?',7),('50 Äpfel werden in 10er-Körbe gelegt. Wie viele Körbe?',5),('100 Murmeln werden auf 10 Kinder verteilt. Wie viele bekommt jedes?',10)]:
        t.card(3,q,k,wr(k,0,10,t.rnd,deltas=(1,2,3)),hints=['Teile durch 10.'],steps=[['%d : 10 = %d'%(k*10,k),'Teilen']],th='basis')
    for k in [3,7,9,4,6,2,8,5]:
        t.exam('%d : 10 = ?'%(k*10),k,wr(k,0,10,t.rnd,deltas=(1,2,3)),expl='%d × 10 = %d'%(k,k*10))
    for k in [4,6,8,3]:
        t.exam('10 × ? = %d'%(k*10),None,ans=[str(k)],expl='%d × 10 = %d'%(k,k*10))
    for q,k in [('40 Karten werden in 10er-Päckli gepackt. Wie viele Päckli?',4),('90 Franken werden auf 10 Kinder verteilt. Wie viel bekommt jedes?',9),('70 Äpfel sind in 10er-Körben. Wie viele Körbe?',7),('Ein Seil von 100 cm wird in 10 Stücke geschnitten. Wie lang ist ein Stück?',10)]:
        t.exam(q,None,ans=[str(k)],expl='%d : 10 = %d'%(k*10,k))
    theory_steps(t,'Teilen heisst: Wie oft passt eine Zahl hinein? Mit der 10er-Reihe findest du die Antwort schnell.',[TBL(['Mal','Teilen'],[['3 × 10 = 30','30 : 10 = 3'],['6 × 10 = 60','60 : 10 = 6'],['9 × 10 = 90','90 : 10 = 9']],None)],
        [['teilen :','verteilen, wie oft passt es','60 : 10'],['Quotient','das Ergebnis vom Teilen','6'],['Umkehraufgabe','Mal-Aufgabe zum Teilen','6 × 10 = 60'],['Zehnerreihe','10, 20, 30, ...','10 bis 100']],
        'Die Zehnerreihe zeigt, wie oft 10 hineinpasst.',[NL(0,100,10,pts=[60],cap='6 Zehnerschritte bis 60')],
        'Jede Mal-Aufgabe gibt zwei Teil-Aufgaben.',['Mal','Teilen'],[['4 × 10 = 40','40 : 10 = 4'],['7 × 10 = 70','70 : 10 = 7']],
        'So teilst du mit 10.',[['Zehner zählen','Wie viele Zehner?',0],['Umkehren','Welche Zahl mal 10?',1],['Prüfen','Mal rechnen',2]],
        [[['80 : 10','Aufgabe',0],['? × 10 = 80','umkehren',1],['8','Ergebnis',2]],[['50 : 10','Aufgabe',0],['? × 10 = 50','umkehren',1],['5','Ergebnis',2]]],
        'Merke: Teilen ist Mal rückwärts.',[['Teilen','wie oft passt es','60 : 10 = 6',0],['Umkehren','Mal prüft Teilen','6 × 10 = 60',1],['10er-Reihe','Zehner zählen','10, 20, 30',2]])
    return t
T.append(div10)
def winkel():
    t=Topic('kl3-mathe-rechte-winkel','kl3','Form und Raum','Rechte Winkel','mathe',20,seed=57)
    t.th('basis','Winkel','Ein Winkel entsteht, wenn zwei Linien sich in einem Punkt treffen. Ein rechter Winkel ist eine Ecke wie beim Heft.',[['rechter Winkel','Ecke wie beim Heft']])
    def kind(h):return 'recht' if h in (3,9) else ('spitz' if h in (1,2,10,11) else 'stumpf')
    # Uhr-Winkel (Zeiger auf 12 und h)
    for h in [3,9,1,2,10,11,4,5,7,8]:
        a=kind(h)
        t.card(2,'Der Winkel zwischen den Zeigern: recht, spitz oder stumpf?',a,[x for x in ['recht','spitz','stumpf'] if x!=a],hints=['Ein rechter Winkel ist wie die Ecke eines Hefts.'],steps=[[a,'Winkelart']],vis=[CLK(h,0)],th='basis')
    for k,col,alt in [('rw',0,'Winkel 1'),('rw',1,'Winkel 2'),('spitz',0,'Winkel 3'),('spitz',1,'Winkel 4'),('stumpf',0,'Winkel 5'),('stumpf',1,'Winkel 6')]:
        a={'rw':'recht','spitz':'spitz','stumpf':'stumpf'}[k]
        t.card(1,'Welcher Winkel ist das: recht, spitz oder stumpf?',a,[x for x in ['recht','spitz','stumpf'] if x!=a],hints=['Vergleiche mit der Ecke eines Hefts.'],steps=[[a,'Winkelart']],vis=[SHP(k,col,alt)],th='basis')
    for h in [6,12]:
        pass
    for h in [1,2,3,4,5,7,8,9,10,11]:
        a=kind(h)
        t.card(1,'Wie sieht der Winkel bei %d Uhr aus: recht, spitz oder stumpf?'%h,a,[x for x in ['recht','spitz','stumpf'] if x!=a],hints=['Zeiger auf 12 und auf %d.'%h],steps=[[a,'Winkelart']],th='basis')
    for q,a,w in [('Wie viele rechte Winkel hat ein Quadrat?','4',['2','3','0']),('Wie viele rechte Winkel hat ein Rechteck?','4',['2','3','0']),('Wie viele rechte Winkel hat ein Kreis?','0',['1','2','4']),('Wie viele rechte Winkel hat ein Dreieck mit einer Heft-Ecke?','1',['0','2','3']),('Eine Heft-Ecke ist ein ...','rechter Winkel',['spitzer Winkel','stumpfer Winkel']),('Ein spitzer Winkel ist ... als ein rechter Winkel.','kleiner',['grösser','gleich gross']),('Ein stumpfer Winkel ist ... als ein rechter Winkel.','grösser',['kleiner','gleich gross']),('Eine Tür hat Ecken. Welche Winkel sind es?','rechte Winkel',['spitze Winkel','stumpfe Winkel']),('Ein Blatt Papier hat wie viele rechte Winkel?','4',['2','3','0']),('Eine Pizzaschnitte hat vorne einen ...','spitzen Winkel',['rechten Winkel','stumpfen Winkel'])]:
        t.card(3 if len(a)>2 else 2,q,a,w,hints=['Denke an die Heft-Ecke.'],steps=[[a,'Antwort']],th='basis')
    for q,a,w in [('Wie viele rechte Winkel hat ein Quadrat?','4',['2','3','0']),('Wie viele rechte Winkel hat ein Kreis?','0',['1','2','4']),('Eine Heft-Ecke ist ein ...','rechter Winkel',['spitzer Winkel','stumpfer Winkel']),('Ein spitzer Winkel ist ... als ein rechter Winkel.','kleiner',['grösser','gleich gross']),('Ein stumpfer Winkel ist ... als ein rechter Winkel.','grösser',['kleiner','gleich gross'])]:
        t.exam(q,a,w,expl=a)
    for h in [3,1,4,9,10,5,2,8]:
        a=kind(h);t.exam('Der Winkel zwischen den Zeigern: recht, spitz oder stumpf?',a,[x for x in ['recht','spitz','stumpf'] if x!=a],vis=[CLK(h,0)],expl=a)
    for k in ['rw','spitz','stumpf']:
        a={'rw':'recht','spitz':'spitz','stumpf':'stumpf'}[k]
        t.exam('Welcher Winkel ist das: recht, spitz oder stumpf?',a,[x for x in ['recht','spitz','stumpf'] if x!=a],vis=[SHP(k,0,'Winkel')],expl=a)
    theory_steps(t,'Ein Winkel entsteht, wenn sich zwei Linien treffen. Es gibt drei Arten.',[SHP('rw',0,'rechter Winkel'),SHP('spitz',1,'spitzer Winkel'),SHP('stumpf',2,'stumpfer Winkel')],
        [['Winkel','zwei Linien treffen sich','Heft-Ecke'],['rechter Winkel','wie die Ecke eines Hefts','Quadrat-Ecke'],['spitzer Winkel','kleiner als rechter','Pizzastück'],['stumpfer Winkel','grösser als rechter','offene Tür']],
        'Vergleiche den Winkel mit einer Heft-Ecke.',[CLK(3,0,'3 Uhr: rechter Winkel'),CLK(5,0,'5 Uhr: stumpfer Winkel')],
        'Die drei Winkelarten.',['Art','Vergleich mit der Heft-Ecke'],[['rechter Winkel','genau gleich'],['spitzer Winkel','kleiner'],['stumpfer Winkel','grösser']],
        'So bestimmst du den Winkel.',[['Heft-Ecke anlegen','Passt sie genau?',0],['Kleiner?','Dann spitz',1],['Grösser?','Dann stumpf',2]],
        [[['Ecke passt','prüfen',0],['recht','Winkelart',1]],[['Winkel kleiner','prüfen',0],['spitz','Winkelart',1]]],
        'Merke: Die Heft-Ecke ist der Massstab.',[['recht','wie die Heft-Ecke','Quadrat: 4',0],['spitz','kleiner','Pizzastück',1],['stumpf','grösser','offene Tür',2]])
    return t
T.append(winkel)
