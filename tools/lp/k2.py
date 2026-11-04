from ar import *
T=[]
def tbl2(): pass
def hunderter():
    t=Topic('kl2-mathe-hunderterfeld','kl2','Zahlen und Mengen','Das Hunderterfeld','mathe',100,seed=31)
    t.th('basis','Zehner und Einer','Im Hunderterfeld hat jede Reihe 10 Punkte. Eine volle Reihe ist 1 Zehner.',[['47','= 4 Zehner und 7 Einer']])
    t.th('nach','Zehner und Einer erkennen','Die vollen Reihen sind die Zehner. Die Punkte in der letzten Reihe sind die Einer.',[['63','6 Reihen und 3 Punkte']])
    ns=[23,47,56,34,71,18,82,65,39,90,14,58,76,42,29,95]
    for n in ns:
        t.card(1,'Wie viele Punkte sind gefärbt?',n,wr(n,0,100,t.rnd),hints=['Zähle die vollen Reihen. Dann den Rest.'],steps=[['%d0 + %d'%(n//10,n%10) if False else '%d Zehner und %d Einer'%(n//10,n%10),'Reihen und Rest'],[str(n),'Anzahl']],vis=[FLD(10,10,n)],th='basis')
    for n in [34,57,72,86,49,63,28,91,15,68]:
        t.card(2,'%d: Wie viele Zehner hat die Zahl?'%n,n//10,wr(n//10,0,10,t.rnd,deltas=(1,2,3)),hints=['Die erste Ziffer sind die Zehner.'],steps=[['%d = %d Zehner und %d Einer'%(n,n//10,n%10),'Zerlegen']],th='nach')
        t.card(2,'%d: Wie viele Einer hat die Zahl?'%n,n%10,wr(n%10,0,9,t.rnd,deltas=(1,2,3)),hints=['Die zweite Ziffer sind die Einer.'],steps=[['%d = %d Zehner und %d Einer'%(n,n//10,n%10),'Zerlegen']],th='nach')
    for z,e in [(3,4),(5,2),(7,8),(2,9),(6,1),(8,5),(4,6),(9,3)]:
        t.card(3,'Welche Zahl ist %d Zehner und %d Einer?'%(z,e),z*10+e,wr(z*10+e,0,100,t.rnd),hints=['Zehner vorn, Einer hinten.'],steps=[['%d Zehner = %d'%(z,z*10),'Zehner'],['%d + %d = %d'%(z*10,e,z*10+e),'Dazu die Einer']],vis=[FLD(10,10,z*10,e,0,1)],th='basis')
    for n in [25,48,73,56,31,87]:
        t.exam('Wie viele Punkte sind gefärbt?',n,wr(n,0,100,t.rnd),vis=[FLD(10,10,n)],expl='%d Zehner und %d Einer = %d'%(n//10,n%10,n))
    for n in [64,37,82,19]:
        t.exam('%d: Wie viele Zehner hat die Zahl?'%n,None,ans=[str(n//10)],expl='%d Zehner'%(n//10))
    for n in [64,37,82,19]:
        t.exam('%d: Wie viele Einer hat die Zahl?'%n,None,ans=[str(n%10)],expl='%d Einer'%(n%10))
    for z,e in [(5,6),(8,2)]:
        t.exam('Welche Zahl ist %d Zehner und %d Einer?'%(z,e),z*10+e,wr(z*10+e,0,100,t.rnd),expl='%d + %d'%(z*10,e))
    theory_steps(t,'Im Hunderterfeld siehst du Zehner und Einer.',[FLD(10,10,100,0,0,None,'100 Punkte')],
        [['Hunderterfeld','100 Punkte in 10 Reihen','10 × 10'],['Zehner','eine volle Reihe','10'],['Einer','Punkte in der letzten Reihe','7 in 47'],['Stellenwert','Zehner und Einer haben einen Platz','4 | 7']],
        'Zähle die vollen Reihen. Dann die einzelnen Punkte.',[FLD(10,10,47,0,0,None,'47 = 4 Reihen und 7 Punkte')],
        'Jede Zahl hat Zehner und Einer.',['Zahl','Zehner','Einer'],[['23','2','3'],['47','4','7'],['65','6','5'],['90','9','0']],
        'So findest du die Zahl.',[['Reihen zählen','Das sind die Zehner',0],['Rest zählen','Das sind die Einer',1],['Zusammen','Zehner und Einer',2]],
        [[['3 Reihen','Zehner',0],['30','Wert',1],['+ 5 Punkte','Einer',2],['35','Zahl',3]],[['6 Reihen','Zehner',0],['60','Wert',1],['+ 8 Punkte','Einer',2],['68','Zahl',3]]],
        'Merke: Zehner sind Reihen, Einer sind Punkte.',[['Zehner','volle Reihe','10',0],['Einer','Rest-Punkte','7 in 47',1],['Zusammen','Z + E','40 + 7 = 47',2]])
    return t
T.append(hunderter)
def strahl():
    t=Topic('kl2-mathe-zahlenstrahl','kl2','Zahlen und Mengen','Der Zahlenstrahl bis 100','mathe',100,seed=32)
    t.th('basis','Zahlen am Strahl','Am Zahlenstrahl liegen die Zahlen der Reihe nach. Rechts sind die grösseren Zahlen.',[['0 ... 100','von links nach rechts']])
    for n in [5,15,25,35,45,55,65,75,85,95,10,30,50,70,90,20,40,60,80]:
        t.card(1,'Welche Zahl liegt beim ?',n,wr(n,0,100,t.rnd,deltas=(5,10)),hints=['Die Zahlen gehen in Zehnerschritten.'],steps=[[str(n),'Zahl am Strahl']],vis=[NL(0,100,10,5,q=n)],th='basis')
    for a in [20,30,40,50,60,70,80]:
        for n in [a+3,a+7]:
            t.card(2,'Welche Zahl liegt beim ?',n,wr(n,a,a+10,t.rnd,deltas=(1,2,3)),hints=['Hier geht es in Einerschritten.'],steps=[[str(n),'Zahl am Strahl']],vis=[NL(a,a+10,1,q=n)],th='basis')
    for a,b in [(35,50),(60,45),(20,80),(95,15)]:
        t.card(3,'Welche Zahl liegt weiter rechts: %d oder %d?'%(a,b),max(a,b),[min(a,b)],hints=['Rechts sind die grösseren Zahlen.'],steps=[[str(max(a,b)),'weiter rechts']],th='basis')
    for n in [15,45,75,30,60,85,25,55,90,40,35,65]:
        t.exam('Welche Zahl liegt beim ?',n,wr(n,0,100,t.rnd,deltas=(5,10)),vis=[NL(0,100,10,5,q=n)],expl=str(n))
    for a,n in [(30,34),(60,68),(10,15),(40,47),(80,83)]:
        t.exam('Welche Zahl liegt beim ?',None,ans=[str(n)],vis=[NL(a,a+10,1,q=n)],expl=str(n))
    for a,b in [(55,28),(41,14),(90,89),(67,76),(33,38)]:
        t.exam('Welche Zahl liegt weiter links: %d oder %d?'%(a,b),min(a,b),[max(a,b)],expl=str(min(a,b)))
    theory_steps(t,'Der Zahlenstrahl ordnet die Zahlen der Reihe nach.',[NL(0,100,10,5,pts=[30],cap='Ein Pin zeigt eine Zahl')],
        [['Zahlenstrahl','Linie mit Zahlen','0 bis 100'],['Zehnerschritt','von 10 zu 10','30, 40, 50'],['Einerschritt','von 1 zu 1','34, 35, 36'],['links','kleinere Zahlen','20 < 70'],['rechts','grössere Zahlen','70 > 20']],
        'Lies die nächste beschriftete Zahl. Gehe dann Schritt für Schritt.',[NL(0,100,10,5,pts=[20,70],cap='20 links, 70 rechts'),NL(30,40,1,pts=[34],cap='34 auf dem Strahl')],
        'Die Striche zeigen die Schritte.',['Schritt','Beispiel'],[['Zehner','30, 40, 50'],['Fünfer','25, 30, 35'],['Einer','31, 32, 33']],
        'So findest du die Zahl.',[['Strahl lesen','Welche Zahlen stehen da?',0],['Schritt erkennen','1er, 5er oder 10er?',1],['Zahl zählen','Vom nächsten Strich',2]],
        [[['30','Strich',0],['+ 4 Schritte','Einer',1],['34','Zahl',2]],[['60','Strich',0],['+ 5','Fünfer',1],['65','Zahl',2]]],
        'Merke: Rechts ist grösser, links ist kleiner.',[['rechts','grösser','70 > 20',0],['links','kleiner','20 < 70',1],['Schritte','erst Strich, dann zählen','30, dann 34',2]])
    return t
T.append(strahl)
def nachbarn():
    t=Topic('kl2-mathe-nachbarzahlen','kl2','Zahlen und Mengen','Nachbarzahlen und Nachbarzehner','mathe',100,seed=33)
    t.th('basis','Nachbarzahlen','Der Nachbar davor ist eins weniger. Der Nachbar danach ist eins mehr.',[['39','40','41']])
    t.th('zehn','Nachbarzehner','Die Nachbarzehner sind die vollen Zehner links und rechts. Bei 47 sind es 40 und 50.',[['40','47','50']])
    for n in [24,37,58,63,79,45,91,16,82,39,59,70]:
        t.card(1,'Welche Zahl kommt nach der %d?'%n,n+1,wr(n+1,1,100,t.rnd,deltas=(1,2,10)),hints=['Eins mehr.'],steps=[['%d + 1 = %d'%(n,n+1),'Nachfolger']],th='basis')
        t.card(1,'Welche Zahl kommt vor der %d?'%(n+1),n,wr(n,0,100,t.rnd,deltas=(1,2,10)),hints=['Eins weniger.'],steps=[['%d %s 1 = %d'%(n+1,M,n),'Vorgänger']],th='basis')
    for n in [23,47,68,35,81,54,76,19]:
        t.card(2,'Welcher Zehner liegt vor der %d?'%n,n//10*10,wr(n//10*10,0,100,t.rnd,deltas=(10,)),hints=['Die Einer weg.'],steps=[[str(n//10*10),'Zehner davor']],th='zehn')
        t.card(2,'Welcher Zehner liegt nach der %d?'%n,n//10*10+10,wr(n//10*10+10,0,100,t.rnd,deltas=(10,)),hints=['Der nächste Zehner.'],steps=[[str(n//10*10+10),'Zehner danach']],th='zehn')
    for a,b in [(29,31),(49,51),(59,61),(69,71)]:
        t.card(3,'Welche Zahl liegt zwischen %d und %d?'%(a,b),a+1,wr(a+1,0,100,t.rnd,deltas=(1,2,10)),hints=['In der Mitte.'],steps=[[str(a+1),'dazwischen']],th='basis')
    for n in [32,59,76,48,83,67]:
        t.exam('Welche Zahl kommt nach der %d?'%n,n+1,wr(n+1,1,100,t.rnd,deltas=(1,2,10)),expl='%d'%(n+1))
    for n in [41,70,86,23,95]:
        t.exam('Welche Zahl kommt vor der %d?'%n,None,ans=[str(n-1)],expl='%d'%(n-1))
    for n in [37,62,84,15,59]:
        t.exam('Welcher Zehner liegt nach der %d?'%n,None,ans=[str(n//10*10+10)],expl='%d'%(n//10*10+10))
    theory_steps(t,'Jede Zahl hat Nachbarn. Das sind die Zahlen davor und danach.',[NL(30,50,1,pts=[39],cap='39 und seine Nachbarn')],
        [['Vorgänger','Zahl davor','vor 40: 39'],['Nachfolger','Zahl danach','nach 40: 41'],['Nachbarzahlen','Vorgänger und Nachfolger','39 und 41'],['Nachbarzehner','volle Zehner davor und danach','40 und 50'],['Zehner','Zahl mit 0 hinten','40']],
        'Die Nachbarn stehen direkt links und rechts.',[NL(20,30,1,pts=[24],cap='24: Nachbarn 23 und 25'),NL(0,100,10,5,pts=[40,50],cap='Nachbarzehner von 47')],
        'Vorgänger, Zahl und Nachfolger.',['Vorgänger','Zahl','Nachfolger'],[['39','40','41'],['58','59','60'],['69','70','71']],
        'So findest du die Nachbarn.',[['Zahl ansehen','Welche Zahl ist es?',0],['Eins weniger','Das ist der Vorgänger',1],['Eins mehr','Das ist der Nachfolger',2]],
        [[['47','Zahl',0],['46','Vorgänger',1],['48','Nachfolger',2]],[['47','Zahl',0],['40','Zehner davor',1],['50','Zehner danach',2]]],
        'Merke: Davor eins weniger, danach eins mehr.',[['Vorgänger','eins weniger','46 vor 47',0],['Nachfolger','eins mehr','48 nach 47',1],['Nachbarzehner','volle Zehner','40 und 50',2]])
    return t
T.append(nachbarn)
def add100():
    t=Topic('kl2-mathe-plus100','kl2','Operationen','Plusrechnen bis 100','mathe',100,seed=34)
    t.th('basis','Zehner und Einer trennen','Rechne zuerst die Zehner. Dann die Einer. Am Schluss zählst du beides zusammen.',[['34 + 25','30 + 20 = 50, 4 + 5 = 9, 59']])
    t.th('uber','Wenn die Einer über 10 gehen','Auch dann rechnest du Zehner und Einer getrennt. Die Summe der Einer kann mehr als 10 sein.',[['47 + 26','60 + 13 = 73']])
    addsub(t,'k2','+',100,n1=14,n2=6,n3=6,nex=16)
    P=pairs_for('k2x','+',t.rnd)
    for i,(a,b) in enumerate(P[:8]):
        r=a+b
        t.card(2,'%d + %d = ?'%(a,b),r,wr(r,0,100,t.rnd),hints=['Zehner und Einer getrennt.'],steps=steps_for('k2x','+',a,b),th='uber')
    theory_steps(t,'Plusrechnen mit grösseren Zahlen. Du trennst Zehner und Einer.',[FLD(10,10,34,25,0,1,'34 und 25')],
        [['Summand','Zahl, die du addierst','34 und 25'],['Summe','das Ergebnis','59'],['Zehner','Reihen im Hunderterfeld','30 und 20'],['Einer','einzelne Punkte','4 und 5'],['Zwischenergebnis','Ergebnis eines Schritts','50']],
        'Die Zehner und die Einer addierst du einzeln.',[FLD(10,10,40,20,0,1,'40 + 20 = 60'),FLD(10,2,7,6,0,1,'7 + 6 = 13')],
        'Drei Schritte führen zur Summe.',['Schritt','Beispiel 34 + 25'],[['Zehner','30 + 20 = 50'],['Einer','4 + 5 = 9'],['Zusammen','50 + 9 = 59']],
        'So rechnest du Plus bis 100.',[['Zerlegen','Beide Zahlen in Z und E',0],['Zehner plus','Zehner zusammen',1],['Einer plus','Einer zusammen',2],['Zusammen','Beide Ergebnisse addieren',3]],
        [[['34 + 25','Aufgabe',0],['30 + 20 = 50','Zehner',1],['4 + 5 = 9','Einer',2],['59','Summe',3]],[['47 + 26','Aufgabe',0],['40 + 20 = 60','Zehner',1],['7 + 6 = 13','Einer',2],['73','Summe',3]]],
        'Merke: Zehner zu Zehner, Einer zu Einer.',[['Zehner','getrennt rechnen','30 + 20 = 50',0],['Einer','getrennt rechnen','4 + 5 = 9',1],['Zusammen','Teilsummen addieren','50 + 9 = 59',2]])
    return t
T.append(add100)
def sub100():
    t=Topic('kl2-mathe-minus100','kl2','Operationen','Minusrechnen bis 100','mathe',100,seed=35)
    t.th('basis','Schritt für Schritt wegnehmen','Nimm zuerst die Zehner weg. Dann die Einer.',[['68 − 35','68 − 30 = 38, dann 38 − 5 = 33']])
    t.th('uber','Wenn die Einer nicht reichen','Nimm die Zehner weg. Bei den Einern gehst du über den vollen Zehner zurück.',[['62 − 27','62 − 20 = 42, 42 − 7 = 35']])
    addsub(t,'k2','-',100,n1=14,n2=6,n3=6,nex=16)
    P=pairs_for('k2x','-',t.rnd)
    for i,(a,b) in enumerate(P[:8]):
        r=a-b
        t.card(2,'%d %s %d = ?'%(a,M,b),r,wr(r,0,100,t.rnd),hints=['Erst Zehner, dann Einer weg.'],steps=steps_for('k2x','-',a,b),th='uber')
    theory_steps(t,'Minusrechnen mit grösseren Zahlen. Du nimmst Zehner und Einer einzeln weg.',[FLD(10,10,35,33,0,3,'68 − 35')],
        [['Minuend','Zahl, von der du wegnimmst','68'],['Subtrahend','Zahl, die du wegnimmst','35'],['Differenz','das Ergebnis','33'],['Zwischenergebnis','Ergebnis nach dem ersten Schritt','38'],['Umkehren','Plus prüft Minus','33 + 35 = 68']],
        'Streiche zuerst die Zehner, dann die Einer.',[FLD(10,10,38,30,0,3,'68 − 30 = 38'),FLD(10,10,33,5,0,3,'38 − 5 = 33')],
        'Zwei Schritte führen zum Ergebnis.',['Schritt','Beispiel 68 − 35'],[['Zehner weg','68 − 30 = 38'],['Einer weg','38 − 5 = 33'],['Prüfen','33 + 35 = 68']],
        'So rechnest du Minus bis 100.',[['Zerlegen','Zweite Zahl in Z und E',0],['Zehner weg','Von der ersten Zahl',1],['Einer weg','Vom Zwischenergebnis',2],['Prüfen','Mit Plus',3]],
        [[['68 − 35','Aufgabe',0],['68 − 30 = 38','Zehner',1],['38 − 5 = 33','Einer',2],['33','Differenz',3]],[['62 − 27','Aufgabe',0],['62 − 20 = 42','Zehner',1],['42 − 7 = 35','Einer',2],['35','Differenz',3]]],
        'Merke: Erst Zehner, dann Einer weg.',[['Zehner weg','zuerst','68 − 30 = 38',0],['Einer weg','danach','38 − 5 = 33',1],['Prüfen','mit Plus','33 + 35 = 68',2]])
    return t
T.append(sub100)
