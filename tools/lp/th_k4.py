from th import *
def T_():
    D={}
    D['kl4-mathe-zahlen-million']=[
        S("Worum geht es?","Grosse Zahlen mit Stellenwerten.",BAR2([[300000,'300 000'],[40000,'40 000'],[5000,'5 000'],[600,'600'],[70,'70'],[8,'8']],'345\'678',0)),
        BEG([['Einer E','1','8'],['Zehner Z','10','70'],['Hunderter H','100','600'],['Tausender T','1\'000','5\'000'],['Zehntausender ZT','10\'000','40\'000'],['Hunderttausender HT','100\'000','300\'000']]),
        S("Tausender","",BAR2([[1000,'1\'000']]*3,'3 × 1\'000 = 3\'000',0)),
        S("10 mal mehr","Jede Stelle ist 10 mal mehr.",CHN((1,'E',0),(10,'Z',1),(100,'H',2),('1\'000','T',3),('10\'000','ZT',0),('100\'000','HT',1))),
        S("Zahl zerlegen","",BAR2([[300000,'3 HT'],[40000,'4 ZT'],[5000,'5 T']],'345\'000',1)),
        S("Zahl lesen","",CHN(('345','tausend',0),('678','',1)),CHN(('dreihundertfünfundvierzig','',2))),
        S("Zahlenstrahl","",NL(0,1000000,100000,pts=[300000]),),
        S("Schritte","",J(100000,[[100000,'+100\'000']]*3,'100\'000 → 400\'000')),
        S("Vergleichen","Länge zuerst, dann Ziffern.",CHN(('45\'000','',0),('<','',2),('450\'000','',1))),
        MERKE([['Tausender','Dreiergruppen','345\'678',0],['Stellen','10 mal mehr','T → ZT',1],['Vergleichen','von links','45\'000 < 450\'000',2]])]
    D['kl4-mathe-schriftlich-plus']=[
        S("Worum geht es?","Zahlen untereinander addieren.",COL('+',47,35)),
        BEG([['Summand','Zahl, die addiert wird','47 und 35'],['Summe','Ergebnis','82'],['Übertrag','Zehner nach links','1 Z'],['Stelle','E, Z','von rechts']]),
        S("Untereinander","Einer unter Einer.",COL('+',47,35,hideRes=True,carry=False)),
        S("Einer","",COL('+',47,35,hideRes=True),CHN((7,'',0),('+',' ',2),(5,'',0),(12,'2 schreiben, 1 merken',1))),
        S("Zehner","",COL('+',47,35),CHN((4,'',0),('+',' ',2),(3,'',0),('+ 1','Übertrag',2),(8,'',1))),
        S("Ohne Übertrag","",COL('+',32,45),CHN((2,'+ 5',0),(7,'',1),(3,'+ 4',0),(7,'',1))),
        S("Beispiel 2","",COL('+',58,26),CHN((8,'+ 6',0),('14','',1),(5,'+ 2 + 1',0),(8,'',1))),
        S("Probe","",J(82,[[-35,'−35']],'82 − 35 = 47')),
        MERKE([['Übertrag','über 9 → nach links','12 → 2, merke 1',2],['Rechts beginnen','Einer zuerst','7 + 5',0],['Probe','mit Minus','82 − 35',1]])]
    D['kl4-mathe-schriftlich-minus']=[
        S("Worum geht es?","Zahlen untereinander subtrahieren.",COL('-',82,35)),
        BEG([['Minuend','Zahl, von der du wegnimmst','82'],['Subtrahend','Zahl, die weggenommen wird','35'],['Differenz','Ergebnis','47'],['Entbündeln','1 Z wird zu 10 E','10 dazu']]),
        S("Untereinander","",COL('-',82,35,hideRes=True,carry=False)),
        S("Einer","2 − 5 geht nicht. 10 dazu.",COL('-',82,35,hideRes=True),CHN((12,'',0),('−',' ',2),(5,'',0),(7,'',1))),
        S("Zehner","",COL('-',82,35),CHN(('7 Z','1 abgegeben',2),('−',' ',2),(3,'',0),(4,'',1))),
        S("Ohne Entbündeln","",COL('-',68,25),CHN((8,'− 5',0),(3,'',1),(6,'− 2',0),(4,'',1))),
        S("Beispiel 2","",COL('-',71,48),CHN((11,'− 8',0),(3,'',1),(6,'− 4',0),(2,'',1))),
        S("Probe","",J(47,[[35,'+35']],'47 + 35 = 82')),
        MERKE([['Entbündeln','kleiner? 10 dazu','12 − 5',2],['Rechts beginnen','Einer zuerst','2 − 5 ?',0],['Probe','mit Plus','47 + 35',1]])]
    D['kl4-mathe-liter-dl']=[
        S("Worum geht es?","Hohlmasse: wie viel passt hinein.",{"type":"jug","max":10,"level":10,"step":1,"unit":"dl","lab":"1 l"}),
        BEG([['Liter l','grosses Mass','Milchpack'],['Deziliter dl','kleines Mass','Glas'],['1 l','10 dl','10 Gläser'],['Hohlmass','Mass für Flüssigkeit','Wasser']]),
        S("1 Liter","",BAR2([[1,'1 dl']]*10,'1 l = 10 dl',0)),
        S("Umrechnen","",CV('l','dl'),CHN(('1 l','',0),(10,'dl',1))),
        S("Halber Liter","",{"type":"jug","max":10,"level":5,"step":1,"unit":"dl","lab":"½ l"},CHN(('½ l','',0),(5,'dl',1))),
        S("Viertel","",{"type":"jug","max":10,"level":3,"step":1,"unit":"dl","lab":"3 dl"},CHN(('3 dl','',1))),
        S("Mehrere Liter","",BAR2([[10,'10 dl']]*3,'3 l = 30 dl',0)),
        S("Zusammen","",BAR2([[10,'1 l'],[5,'5 dl']],'1 l 5 dl = 15 dl',1),CHN((15,'dl',1))),
        MERKE([['l → dl','mal 10','2 l = 20 dl',0],['dl → l','durch 10','30 dl = 3 l',1],['dl','Glas','2 dl',2]])]
    D['kl4-mathe-zentiliter']=[
        S("Worum geht es?","Noch kleiner als Deziliter.",BAR2([[10,'1 cl']]*10,'1 dl = 10 cl',0)),
        BEG([['Zentiliter cl','kleines Mass','Schnapsglas'],['1 dl','10 cl','kleines Glas'],['1 l','100 cl','10 dl'],['Liter l','grosses Mass','Flasche']]),
        S("1 dl in cl","",CV('dl','cl'),CHN(('1 dl','',0),(10,'cl',1))),
        S("1 l in cl","",BAR2([[10,'10 cl']]*10,'1 l = 100 cl',0),CHN(('1 l','',0),(100,'cl',1))),
        S("Ketten","",CHN(('1 l','',0),('10 dl','',1),('100 cl','',2))),
        S("Halber Liter","",BAR2([[50,'50 cl']],'½ l = 50 cl',1),CHN(('½ l','',0),(50,'cl',1))),
        S("Rechnen","",BAR2([[25,'25 cl'],[25,'25 cl']],'2 × 25 cl = 50 cl',2)),
        S("Beispiel","",BAR2([[10,'3 dl'],[5,'5 cl']],'3 dl 5 cl = 35 cl',3)),
        MERKE([['dl → cl','mal 10','3 dl = 30 cl',0],['l → cl','mal 100','2 l = 200 cl',1],['Grösse','l > dl > cl','1 l = 10 dl',2]])]
    D['kl4-mathe-sachaufgaben']=[
        S("Worum geht es?","Aufgaben mit Geschichte lösen.",FL(["Lesen","Zahlen finden","Rechnen","Antwort"])),
        BEG([['Gegeben','Zahlen aus der Aufgabe','2 l, 3 dl'],['Gesucht','Frage','wie viel?'],['Rechnung','Plus, Minus, Mal','2 × 3'],['Antwort','ein Satz mit Einheit','6 l']]),
        S("1. Lesen","",EMO([['🥛',3]],grp=0),CHN(('3 Gläser','',0),('je 2 dl','',2),('wie viel?','',3))),
        S("2. Rechnung wählen","",CHN(('gleiche Gruppen','',0),('➜','',2),('mal','',1))),
        S("3. Rechnen","",BAR2([[2,'2 dl'],[2,'2 dl'],[2,'2 dl']],'3 × 2 dl = 6 dl',0)),
        S("4. Antwort","",CHN((6,'dl',1),('= 6 dl','Antwort',2))),
        S("Umrechnen nötig","",CV('l','dl'),BAR2([[10,'10 dl'],[4,'4 dl']],'1 l + 4 dl = 14 dl',2)),
        S("Rest","",J(10,[[-3,'−3 dl']],'10 − 3 = 7')),
        MERKE([['Mehr dazu','plus','3 + 4',0],['Gleiche Gruppen','mal','3 × 2',1],['Einheit','umrechnen','l → dl',2]])]
    return D
