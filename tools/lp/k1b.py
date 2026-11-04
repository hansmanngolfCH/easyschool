from ar import *
T=[]
def plus10():
    t=Topic('kl1-mathe-plus10','kl1','Operationen','Plusrechnen bis 10','mathe',10,seed=21)
    t.th('basis','Plus heisst dazu','Bei Plus kommt etwas dazu. 3 und 2 sind zusammen 5.',[['3 + 2','= 5']])
    t.th('tausch','Tauschen','Du kannst die Zahlen tauschen. 2 + 3 ist auch 5.',[['2 + 3','= 5']])
    addsub(t,'k1a','+',10,n1=16,n2=8,n3=6,nex=16)
    # Zahlenhaus: Zerlegen
    for a in [6,7,8,9,10,5]:
        t.card(2,'Welche Zahl ergibt mit %d zusammen 10?'%a,10-a,wr(10-a,0,10,t.rnd),hints=['Wie viel fehlt bis 10?'],steps=[['%d + %d = 10'%(a,10-a),'Bis zur 10']],vis=[FLD(5,2,a,10-a,0,1)],th='basis')
    theory_steps(t,'Bei Plus kommt etwas dazu. Du zählst weiter.',[EMO([['🍎',3],['🍓',2]],'3 und 2 kommen zusammen')],
        [['Plus +','es kommt dazu','3 + 2'],['Summe','das Ergebnis von Plus','3 + 2 = 5'],['Gleichung','Rechnung mit =','4 + 4 = 8'],['Tauschen','Zahlen vertauschen','2 + 3 = 3 + 2']],
        'Zähle beide Gruppen zusammen.',[EMO([['⭐',4],['🌸',3]],'4 und 3 sind 7'),FLD(5,2,4,3)],
        'So sieht eine Plus-Rechnung aus.',['Rechnung','Summe'],[['2 + 2','4'],['3 + 4','7'],['5 + 5','10'],['6 + 3','9']],
        'So rechnest du Plus.',[['Erste Zahl','Starte bei der ersten',0],['Dazuzählen','Zähle die zweite dazu',1],['Summe sagen','Das ist das Ergebnis',2]],
        [[['4','erste Zahl',0],['+ 3','dazu',1],['7','Summe',2]],[['6','erste Zahl',0],['+ 4','dazu',1],['10','Summe',2]]],
        'Merke: Plus heisst dazu.',[['Plus','es kommt dazu','3 + 2 = 5',0],['Tauschen','geht bei Plus','2 + 3 = 3 + 2',1],['Zehn','5 + 5 = 10','Doppelte von 5',2]])
    return t
T.append(plus10)
def minus10():
    t=Topic('kl1-mathe-minus10','kl1','Operationen','Minusrechnen bis 10','mathe',10,seed=22)
    t.th('basis','Minus heisst weg','Bei Minus nimmst du etwas weg. 5 weg 2 bleiben 3.',[['5 − 2','= 3']])
    t.th('umk','Plus und Minus','Minus ist das Gegenteil von Plus. 3 + 2 = 5, darum 5 − 2 = 3.',[['3 + 2 = 5','5 − 2 = 3']])
    addsub(t,'k1a','-',10,n1=16,n2=8,n3=6,nex=16)
    for a in [4,6,8,10,7,9]:
        t.card(2,'%d − %d = ?  (Rechne zurück: Welche Zahl plus %d ist %d?)'%(a,a,a,a),0,wr(0,0,10,t.rnd),hints=['Alles weg: nichts bleibt.'],steps=[['%d %s %d = 0'%(a,M,a),'Alles weg']],th='basis')
    theory_steps(t,'Bei Minus nimmst du etwas weg. Das Übrige bleibt.',[EMO([['🍎',5]],'5 Äpfel, 2 sind weg',x=2)],
        [['Minus −','es geht weg','5 − 2'],['Differenz','das Ergebnis von Minus','5 − 2 = 3'],['Rest','was übrig bleibt','3 bleiben'],['Umkehren','Plus macht Minus rückwärts','3 + 2 = 5']],
        'Streiche durch, was weg ist. Zähle den Rest.',[EMO([['🐟',7]],'7 Fische, 3 sind weg',x=3),FLD(5,2,4,3,0,3)],
        'Minus und Plus gehören zusammen.',['Plus','Minus'],[['3 + 2 = 5','5 − 2 = 3'],['4 + 4 = 8','8 − 4 = 4'],['6 + 3 = 9','9 − 3 = 6']],
        'So rechnest du Minus.',[['Erste Zahl','Starte mit allen',0],['Wegnehmen','Streiche die zweite Zahl durch',1],['Rest zählen','Das ist das Ergebnis',2]],
        [[['8','alle',0],['− 3','weg',1],['5','Rest',2]],[['10','alle',0],['− 6','weg',1],['4','Rest',2]]],
        'Merke: Minus heisst weg.',[['Minus','es geht weg','5 − 2 = 3',0],['Umkehren','Plus prüft Minus','3 + 2 = 5',1],['Tauschen','geht bei Minus nicht','5 − 2 ist nicht 2 − 5',2]])
    return t
T.append(minus10)
def plus20():
    t=Topic('kl1-mathe-plus20','kl1','Operationen','Plusrechnen bis 20','mathe',20,seed=23)
    t.th('basis','Über die 10','Erst füllst du bis 10 auf. Dann rechnest du den Rest dazu.',[['8 + 5','8 + 2 = 10, dann 10 + 3 = 13']])
    t.th('dopp','Verdoppeln hilft','Mit dem Doppelten rechnest du schnell. 7 + 7 = 14, darum 7 + 8 = 15.',[['7 + 7','= 14']])
    addsub(t,'k1b','+',20,n1=16,n2=6,n3=6,nex=16)
    for a in range(5,10):
        t.card(2,'%d + %d = ?'%(a,a),2*a,wr(2*a,0,20,t.rnd),hints=['Das ist das Doppelte.'],steps=[['%d + %d = %d'%(a,a,2*a),'Doppelte']],vis=[FLD(10,2,a,a,0,1)],th='dopp')
    for a in range(6,10):
        t.card(3,'%d + %d = ?  Tipp: %d + %d = %d'%(a,a+1,a,a,2*a),2*a+1,wr(2*a+1,0,20,t.rnd),hints=['Eins mehr als das Doppelte.'],steps=[['%d + 1 = %d'%(2*a,2*a+1),'Eins mehr']],th='dopp')
    theory_steps(t,'Plus mit Zahlen über 10. Du rechnest erst bis 10, dann weiter.',[FLD(10,2,8,5,0,1,'8 und 5')],
        [['Zehnerfeld','zeigt 10 in einer Reihe','2 Reihen'],['Ergänzen','bis zur 10 auffüllen','8 + 2 = 10'],['Rest','was noch übrig ist','5 − 2 = 3'],['Doppelte','Zahl + dieselbe Zahl','7 + 7 = 14']],
        'Fülle die erste Reihe auf. Der Rest kommt in die zweite.',[FLD(10,2,9,6,0,1,'9 + 6: erst 1 zur 10'),FLD(10,2,7,7,0,1,'7 + 7')],
        'Der Weg über die 10 hat zwei Schritte.',['Schritt','Rechnung'],[['Bis zur 10','8 + 2 = 10'],['Rest zerlegen','5 = 2 + 3'],['Dazu','10 + 3 = 13']],
        'So rechnest du über die 10.',[['Auffüllen','Wie viel fehlt bis 10?',0],['Rest','Was bleibt von der zweiten Zahl?',1],['Zusammen','10 und den Rest',2]],
        [[['9 + 4','Aufgabe',0],['9 + 1 = 10','auffüllen',1],['10 + 3 = 13','Rest',2]],[['7 + 6','Aufgabe',0],['7 + 3 = 10','auffüllen',1],['10 + 3 = 13','Rest',2]]],
        'Merke: Erst bis 10, dann weiter.',[['Auffüllen','bis zur 10','8 + 2 = 10',0],['Rest','zweite Zahl teilen','5 = 2 + 3',1],['Doppelte','helfen beim Rechnen','7 + 7 = 14',2]])
    return t
T.append(plus20)
def minus20():
    t=Topic('kl1-mathe-minus20','kl1','Operationen','Minusrechnen bis 20','mathe',20,seed=24)
    t.th('basis','Über die 10','Erst gehst du bis 10 zurück. Dann nimmst du den Rest weg.',[['15 − 8','15 − 5 = 10, dann 10 − 3 = 7']])
    t.th('umk','Plus prüft Minus','Mit Plus kannst du die Lösung prüfen. 7 + 8 = 15, darum 15 − 8 = 7.',[['7 + 8 = 15','15 − 8 = 7']])
    addsub(t,'k1b','-',20,n1=16,n2=6,n3=6,nex=16)
    for a in [12,14,16,18,20]:
        t.card(2,'Halbiere %d. Rechne %d − ? = ?'%(a,a),a//2,wr(a//2,0,20,t.rnd),hints=['Zwei gleiche Teile.'],steps=[['%d = %d + %d'%(a,a//2,a//2),'Hälfte']],th='basis')
    theory_steps(t,'Minus mit Zahlen über 10. Du gehst erst zur 10 zurück.',[FLD(10,2,7,8,0,3,'15 − 8: 8 sind weg')],
        [['Zurückgehen','bis zur 10 abziehen','15 − 5 = 10'],['Rest','was noch weg muss','8 − 5 = 3'],['Prüfen','mit Plus','7 + 8 = 15'],['Zehnerfeld','hilft beim Sehen','2 Reihen']],
        'Streiche zuerst die Punkte der zweiten Reihe. Dann den Rest.',[FLD(10,2,6,9,0,3,'15 − 9 = 6'),FLD(10,2,8,6,0,3,'14 − 6 = 8')],
        'Der Weg über die 10 hat zwei Schritte.',['Schritt','Rechnung'],[['Bis zur 10','15 − 5 = 10'],['Rest zerlegen','8 = 5 + 3'],['Weg','10 − 3 = 7']],
        'So rechnest du Minus über die 10.',[['Bis 10','Wie viel bis zur 10?',0],['Rest','Was muss noch weg?',1],['Von 10','Rest von der 10 wegnehmen',2]],
        [[['13 − 5','Aufgabe',0],['13 − 3 = 10','bis zur 10',1],['10 − 2 = 8','Rest',2]],[['16 − 9','Aufgabe',0],['16 − 6 = 10','bis zur 10',1],['10 − 3 = 7','Rest',2]]],
        'Merke: Erst zur 10, dann weiter.',[['Zur 10','erst bis 10 zurück','15 − 5 = 10',0],['Rest','dann den Rest weg','10 − 3 = 7',1],['Prüfen','mit Plus','7 + 8 = 15',2]])
    return t
T.append(minus20)
def formen():
    t=Topic('kl1-mathe-formen','kl1','Formen','Kreis, Dreieck und Viereck','mathe',20,seed=25)
    t.th('basis','Formen erkennen','Ein Kreis ist rund. Ein Dreieck hat 3 Ecken. Ein Viereck hat 4 Ecken.',[['Kreis','0 Ecken'],['Dreieck','3 Ecken'],['Viereck','4 Ecken']])
    kinds=[('kreis','Kreis',0),('dreieck','Dreieck',3),('quadrat','Quadrat',4),('rechteck','Rechteck',4),('viereck','Viereck',4)]
    cn=['grün','blau','gelb','rot']
    allnames=[k[1] for k in kinds]
    for ci in range(4):
        for k,nm,e in kinds:
            t.card(1,'Die %s Form: Wie heisst sie?'%cn[ci],nm,[x for x in allnames if x!=nm],hints=['Schau die Ecken an.'],steps=[[nm,'Name']],vis=[SHP(k,ci)])
    for k,nm,e in kinds:
        t.card(2,'Wie viele Ecken hat diese Form?',e,wr(e,0,20,t.rnd) if e else [3,4,5],hints=['Zähle jede Ecke.'],steps=[[str(e),'Ecken']],vis=[SHP(k,1)])
    for q,a in [('Ein Teller ist rund. Welche Form ist das?','Kreis'),('Ein Fenster hat 4 Ecken und lange Seiten. Welche Form?','Rechteck'),('Ein Dach sieht oft aus wie 3 Ecken. Welche Form?','Dreieck'),('Ein Spielfeld-Kästchen hat 4 gleich lange Seiten. Welche Form?','Quadrat'),('Eine Uhr ist rund. Welche Form?','Kreis'),('Eine Pizza-Schachtel ist ein Quadrat. Wie viele Ecken hat sie?','4'),('Ein Verkehrsschild kann ein Dreieck sein. Wie viele Ecken hat es?','3'),('Ein Ball von oben gesehen. Welche Form?','Kreis'),('Eine Tür ist lang und schmal. Welche Form?','Rechteck'),('Ein Zelt von der Seite. Welche Form?','Dreieck')]:
        w=[x for x in allnames if x!=a] if not a.isdigit() else ['0','3','5']
        t.card(3,q,a,w,hints=['Denke an die Ecken.'],steps=[[a,'Antwort']])
    for q,a,w in [('Welche Form hat keine Ecken?','Kreis',['Dreieck','Quadrat','Rechteck']),('Welche Form hat genau 3 Ecken?','Dreieck',['Kreis','Quadrat','Rechteck']),('Welche Form hat 4 gleich lange Seiten?','Quadrat',['Dreieck','Kreis','Rechteck'])]:
        t.card(2,q,a,w,hints=['Denke an Ecken und Seiten.'],steps=[[a,'Antwort']])
    for k,nm,e in kinds:
        t.exam('Wie heisst die Form?',nm,[x for x in allnames if x!=nm],vis=[SHP(k,(kinds.index((k,nm,e))+2)%4)],expl=nm)
    for k,nm,e in kinds[:3]:
        t.exam('Wie heisst die Form?',nm,[x for x in allnames if x!=nm],vis=[SHP(k,(kinds.index((k,nm,e))+1)%4)],expl=nm)
    for k,nm,e in kinds:
        t.exam('Wie viele Ecken hat diese Form?',None,ans=[str(e)],vis=[SHP(k,0)],expl='%d Ecken'%e)
    for q,a,w in [('Welche Form hat keine Ecken?','Kreis',['Dreieck','Quadrat','Rechteck']),('Welche Form hat genau 3 Ecken?','Dreieck',['Kreis','Quadrat','Rechteck']),('Ein Teller ist rund. Welche Form?','Kreis',['Dreieck','Quadrat','Rechteck']),('Ein Fenster hat 4 Ecken und lange Seiten. Welche Form?','Rechteck',['Dreieck','Kreis','Quadrat']),('Welche Form hat 4 gleich lange Seiten?','Quadrat',['Dreieck','Kreis','Rechteck']),('Ein Dach sieht oft aus wie 3 Ecken. Welche Form?','Dreieck',['Kreis','Quadrat','Rechteck'])]:
        t.exam(q,a,w,expl=a)
    theory_steps(t,'Formen sind überall. Schau auf die Ecken.',[SHP('kreis',0),SHP('dreieck',1),SHP('quadrat',2)],
        [['Kreis','rund, keine Ecken','Teller'],['Dreieck','3 Ecken','Dach'],['Quadrat','4 gleich lange Seiten','Spielkarte'],['Rechteck','4 Ecken, 2 lange Seiten','Tür'],['Viereck','alle mit 4 Ecken','Drachen']],
        'Zähle die Ecken der Formen.',[SHP('rechteck',3),SHP('viereck',1)],
        'Mit den Ecken erkennst du jede Form.',['Form','Ecken'],[['Kreis','0'],['Dreieck','3'],['Quadrat','4'],['Rechteck','4'],['Viereck','4']],
        'So erkennst du eine Form.',[['Rund?','Dann ist es ein Kreis',0],['Ecken zählen','3 oder 4 Ecken?',1],['Seiten ansehen','Sind alle gleich lang?',2]],
        [[['3 Ecken','zählen',0],['Dreieck','Name',1]],[['4 gleiche Seiten','schauen',0],['Quadrat','Name',1]]],
        'Merke: Die Ecken verraten die Form.',[['Kreis','keine Ecken','Teller',0],['Dreieck','3 Ecken','Dach',1],['Viereck','4 Ecken','Fenster',2]])
    return t
T.append(formen)
def franken():
    t=Topic('kl1-mathe-franken','kl1','Geld','Franken und Rappen','mathe',20,seed=26)
    t.th('basis','Münzen und Noten','Wir bezahlen mit Franken und Rappen. Eine Münze hat einen Wert.',[['1 Franken','Münze'],['10 Rappen','Münze']])
    sets=[([[1,'Fr',3]],3),([[2,'Fr',2]],4),([[5,'Fr',2]],10),([[5,'Fr',1],[1,'Fr',2]],7),([[2,'Fr',1],[1,'Fr',1]],3),([[10,'Fr',1],[5,'Fr',1]],15),([[10,'Fr',1],[2,'Fr',2]],14),([[20,'Fr',1]],20),([[5,'Fr',3]],15),([[10,'Fr',1],[1,'Fr',3]],13),([[5,'Fr',1],[2,'Fr',2],[1,'Fr',1]],10),([[10,'Fr',1],[5,'Fr',1],[2,'Fr',1]],17)]
    for i,(it,tot) in enumerate(sets):
        t.card(1,'Wie viele Franken sind das?',tot,wr(tot,1,20,t.rnd),hints=['Zähle den Wert jeder Münze zusammen.'],steps=[[str(tot),'Franken']],vis=[COINS(it)])
    rsets=[([[5,'Rp',2]],10),([[10,'Rp',1],[5,'Rp',1]],15),([[10,'Rp',2]],20),([[20,'Rp',1]],20),([[5,'Rp',3]],15),([[10,'Rp',1],[5,'Rp',2]],20),([[5,'Rp',1]],5),([[10,'Rp',1]],10)]
    for it,tot in rsets:
        t.card(1,'Wie viele Rappen sind das?',tot,[x for x in [5,10,15,20,25,0] if x!=tot and x<=20][:3],hints=['Zähle den Wert jeder Münze zusammen.'],steps=[[str(tot),'Rappen']],vis=[COINS(it)])
    for a,b in [(5,10),(2,5),(1,2),(10,5),(20,10)]:
        u='Rappen' if a in(20,10) and b in(10,5) and False else 'Franken'
        t.card(2,'Was ist mehr: %d Franken oder %d Franken?'%(a,b),str(max(a,b))+' Franken',[str(min(a,b))+' Franken','gleich viel'],hints=['Die grössere Zahl ist mehr.'],steps=[[str(max(a,b)),'mehr']])
    for pr,pay in [(3,5),(6,10),(8,10),(4,5),(12,20),(15,20),(9,10),(7,10)]:
        t.card(3,'Ein Heft kostet %d Franken. Du zahlst %d Franken. Wie viel bekommst du zurück?'%(pr,pay),pay-pr,wr(pay-pr,0,20,t.rnd),hints=['Rechne Minus.'],steps=[['%d %s %d = %d'%(pay,M,pr,pay-pr),'Rückgeld']])
    for a,b in [(5,3),(8,4),(10,6),(7,7)]:
        t.card(3,'Du hast %d Franken und bekommst %d Franken dazu. Wie viel hast du?'%(a,b),a+b,wr(a+b,0,20,t.rnd),hints=['Rechne Plus.'],steps=[['%d + %d = %d'%(a,b,a+b),'Zusammen']])
    for it,tot in sets[:5]+sets[5:8]:
        t.exam('Wie viele Franken sind das?',tot,wr(tot,1,20,t.rnd),vis=[COINS(it)],expl='%d Franken'%tot)
    for it,tot in rsets[:3]:
        t.exam('Wie viele Rappen sind das?',None,ans=[str(tot)],vis=[COINS(it)],expl='%d Rappen'%tot)
    for pr,pay in [(3,5),(6,10),(12,20),(8,10),(4,5)]:
        t.exam('Ein Heft kostet %d Franken. Du zahlst %d Franken. Wie viel bekommst du zurück?'%(pr,pay),None,ans=[str(pay-pr)],expl='%d %s %d = %d'%(pay,M,pr,pay-pr))
    theory_steps(t,'Mit Münzen und Noten bezahlst du. Jede hat einen Wert.',[COINS([[1,'Fr',1],[2,'Fr',1],[5,'Fr',1],[10,'Fr',1]],'Münzen und Note')],
        [['Franken','das Schweizer Geld','1 Franken'],['Rappen','kleine Münzen','10 Rappen'],['Münze','rundes Geld','2 Franken'],['Note','Papiergeld','10 Franken'],['Rückgeld','das Geld, das du zurückbekommst','10 − 7 = 3']],
        'Zähle das Geld zusammen.',[COINS([[5,'Fr',1],[2,'Fr',2],[1,'Fr',1]],'5 + 2 + 2 + 1 = 10'),COINS([[10,'Rp',1],[5,'Rp',1]],'10 Rp + 5 Rp = 15 Rp')],
        'Jede Münze hat ihren Wert.',['Geld','Wert'],[['Münze 1','1 Franken'],['Münze 2','2 Franken'],['Münze 5','5 Franken'],['Note 10','10 Franken'],['Note 20','20 Franken']],
        'So zählst du Geld.',[['Gross zuerst','Beginne mit dem grössten Wert',0],['Weiter zählen','Zähle die anderen dazu',1],['Summe','Das ist das Geld',2]],
        [[['5 Fr','Münze',0],['+ 2 Fr + 2 Fr','dazu',1],['9 Fr','zusammen',2]],[['10 Fr','Note',0],['− 7 Fr','Heft',1],['3 Fr','Rückgeld',2]]],
        'Merke: Geld zählst du von gross nach klein.',[['Gross zuerst','dann klein','10, 5, 2, 1',0],['Rückgeld','Minus rechnen','10 − 7 = 3',1],['Franken','nicht mit Rappen mischen','Franken zu Franken',2]])
    return t
T.append(franken)
def uhr1():
    t=Topic('kl1-mathe-uhr-stunden','kl1','Zeit','Uhrzeiten: ganze Stunden','mathe',20,seed=27)
    t.th('basis','Die Uhr lesen','Der kurze Zeiger zeigt die Stunde. Der lange Zeiger zeigt auf die 12.',[['3 Uhr','kurzer Zeiger auf 3']])
    for h in range(1,13):
        t.card(1,'Wie viel Uhr ist es?',str(h)+' Uhr',[str(x)+' Uhr' for x in wr(h,1,12,t.rnd)],hints=['Der kurze Zeiger zeigt die Stunde.'],steps=[[str(h)+' Uhr','Stunde']],vis=[CLK(h,0)])
    for h in range(1,12):
        t.card(2,'Es ist %d Uhr. Wie viel Uhr ist es in einer Stunde?'%h,str(h+1)+' Uhr',[str(x)+' Uhr' for x in wr(h+1,1,12,t.rnd)],hints=['Eine Stunde später: eins mehr.'],steps=[[str(h+1)+' Uhr','eine Stunde später']])
    for h in range(2,13):
        t.card(2,'Es ist %d Uhr. Wie viel Uhr war es vor einer Stunde?'%h,str(h-1)+' Uhr',[str(x)+' Uhr' for x in wr(h-1,1,12,t.rnd)],hints=['Eine Stunde früher: eins weniger.'],steps=[[str(h-1)+' Uhr','eine Stunde früher']])
    for h in [3,6,9,12]:
        t.card(3,'Der lange Zeiger zeigt auf die 12. Der kurze zeigt auf die %d. Wie viel Uhr?'%h,str(h)+' Uhr',[str(x)+' Uhr' for x in wr(h,1,12,t.rnd)],hints=['Lies den kurzen Zeiger.'],steps=[[str(h)+' Uhr','Stunde']],vis=[CLK(h,0)])
    for h in [2,5,7,10,4,8,11,1]:
        t.exam('Wie viel Uhr ist es?',str(h)+' Uhr',[str(x)+' Uhr' for x in wr(h,1,12,t.rnd)],vis=[CLK(h,0)],expl='%d Uhr'%h)
    for h in [3,6,9,11]:
        t.exam('Es ist %d Uhr. Wie viel Uhr ist es in einer Stunde?'%h,None,ans=[str(h+1),str(h+1)+' Uhr'],expl='%d Uhr'%(h+1))
    for h in [4,8,10,12]:
        t.exam('Es ist %d Uhr. Wie viel Uhr war es vor einer Stunde?'%h,None,ans=[str(h-1),str(h-1)+' Uhr'],expl='%d Uhr'%(h-1))
    theory_steps(t,'Die Uhr zeigt, wie spät es ist. Heute lernst du die ganzen Stunden.',[CLK(3,0,'3 Uhr')],
        [['Zifferblatt','die Uhr mit den Zahlen 1 bis 12','Wanduhr'],['kurzer Zeiger','zeigt die Stunde','auf der 3'],['langer Zeiger','zeigt die Minuten','auf der 12'],['ganze Stunde','langer Zeiger auf 12','5 Uhr']],
        'Lies die Stunde am kurzen Zeiger.',[CLK(6,0,'6 Uhr'),CLK(9,0,'9 Uhr')],
        'Bei einer ganzen Stunde zeigt der lange Zeiger auf die 12.',['Zeiger','Er zeigt'],[['kurz','die Stunde'],['lang','auf die 12']],
        'So liest du die Uhr.',[['Langer Zeiger','Er steht auf der 12',0],['Kurzer Zeiger','Welche Zahl?',1],['Uhr sagen','So viel Uhr ist es',2]],
        [[['kurz auf 4','Stunde',0],['4 Uhr','Uhrzeit',1]],[['kurz auf 11','Stunde',0],['11 Uhr','Uhrzeit',1]]],
        'Merke: Kurzer Zeiger zeigt die Stunde.',[['Kurz','Stunde','auf der 3: 3 Uhr',0],['Lang auf 12','ganze Stunde','5 Uhr',1],['Eine Stunde','später: eins mehr','3 Uhr, dann 4 Uhr',2]])
    return t
T.append(uhr1)
