from th import *
def T_():
    D={}
    D['kl3-mathe-zahlen1000']=[
        S("Worum geht es?","Zahlen bis 1000 aus H, Z und E.",BLK(2,3,4,cap='234')),
        BEG([['Hunderter H','grosse Platte','300'],['Zehner Z','Stange','50'],['Einer E','Würfel','7'],['Tausender','10 Hunderter','1000']]),
        S("Hunderter","",BLK(3,0,0,cap='3 H'),CHN(('3 H','',0),(300,'',1))),
        S("Zehner","",BLK(0,5,0,cap='5 Z'),CHN(('5 Z','',0),(50,'',1))),
        S("Einer","",BLK(0,0,7,cap='7 E'),CHN(('7 E','',0),(7,'',1))),
        S("Zusammen","",BAR2([[300,'300'],[50,'50'],[7,'7']],'357',0),CHN(('3 H','',0),('5 Z','',2),('7 E','',3),(357,'',1))),
        S("Zahl mit 0","",BLK(4,0,6,cap='406'),CHN(('4 H','',0),('0 Z','',2),('6 E','',3),(406,'',1))),
        S("Zahlenstrahl","",NL(0,1000,100,50,pts=[600])),
        S("Hundertersprünge","",J(200,[[100,'+100']]*3,'200 → 500')),
        S("Vergleichen","Erst H, dann Z, dann E.",CHN((345,'',0),('<','',2),(354,'',1))),
        S("Nachbarn","",CHN((499,'davor',0),(500,'Zahl',2),(501,'danach',1))),
        MERKE([['H Z E','Stellenwerte','357 = 300 + 50 + 7',0],['0','hält die Stelle','406',1],['Vergleichen','von links beginnen','345 < 354',2]])]
    D['kl3-mathe-runden']=[
        S("Worum geht es?","Zu einer runden Zahl wechseln.",NL(30,40,1,pts=[34])),
        BEG([['runden','auf nahe runde Zahl','34 → 30'],['abrunden','Einer 0 bis 4','32 → 30'],['aufrunden','Einer 5 bis 9','36 → 40'],['Zehner','runde Zahl','30, 40']]),
        S("Auf Zehner","",NL(30,40,1,pts=[34]),CHN((34,'',0),('➜','',2),(30,'ab',1))),
        S("Aufrunden","",NL(30,40,1,pts=[36]),CHN((36,'',0),('➜','',2),(40,'auf',1))),
        S("Die 5","Bei 5 wird aufgerundet.",NL(30,40,1,pts=[35]),CHN((35,'',0),('➜','',2),(40,'auf',1))),
        S("Ziffer ansehen","",EMO([['0️⃣',1],['1️⃣',1],['2️⃣',1],['3️⃣',1],['4️⃣',1]],grp=0),EMO([['5️⃣',1],['6️⃣',1],['7️⃣',1],['8️⃣',1],['9️⃣',1]],grp=0),CHN(('0–4','ab',3),('5–9','auf',1))),
        S("Auf Hunderter","",NL(300,400,10,pts=[360]),CHN((360,'',0),('➜','',2),(400,'auf',1))),
        S("Beispiel: 249","",NL(200,300,10,pts=[249]),CHN((249,'',0),('➜','',2),(250,'Z',1),('➜','',2),(200,'H',1))),
        MERKE([['0 bis 4','abrunden','32 → 30',3],['5 bis 9','aufrunden','36 → 40',1],['Ziffer rechts','entscheidet','Einer',0]])]
    D['kl3-mathe-plus1000']=split_blocks('+',True,[(234,152),(345,223),(458,321)],[['Summand','Zahl, die du addierst','234 und 152'],['Summe','Ergebnis','386'],['H Z E','Stellenwerte','100, 10, 1'],['Probe','mit Minus','386 − 152']],"Hunderter, Zehner und Einer einzeln.",[['H','zuerst','200 + 100',0],['Z','dann','30 + 50',1],['E','zuletzt','4 + 2',2]])
    D['kl3-mathe-minus1000']=split_blocks('-',True,[(786,254),(659,324),(875,431)],[['Minuend','Zahl, von der du wegnimmst','786'],['Subtrahend','Zahl, die du wegnimmst','254'],['Differenz','Ergebnis','532'],['Probe','mit Plus','532 + 254']],"Erst H, dann Z, dann E weg.",[['H weg','zuerst','786 − 200',0],['Z weg','dann','586 − 50',1],['E weg','zuletzt','536 − 4',2]])
    D['kl3-mathe-einmaleins']=[
        S("Worum geht es?","Gleiche Gruppen rechnen.",ARR(4,6,cap='4 × 6 = 24')),
        BEG([['Faktor','malgenommene Zahl','4 und 6'],['Produkt','Ergebnis','24'],['Reihe','alle Ergebnisse','6, 12, 18'],['Tauschaufgabe','Faktoren tauschen','4 × 6 = 6 × 4']]),
        S("Die 3er-Reihe","",J(0,[[3,'+3']]*6,'3, 6, 9, 12, 15, 18')),
        S("Die 4er-Reihe","",ARR(4,4,cap='4 × 4 = 16'),J(0,[[4,'+4']]*5,'4, 8, 12, 16, 20')),
        S("Die 6er-Reihe","",ARR(6,6,split=5,cap='6 × 6 = 5 × 6 + 6'),CHN(('5 × 6','',0),(30,'',1),('+ 6','',2),(36,'',1))),
        S("Tauschen","",ARR(3,7,cap='3 × 7'),ARR(7,3,col=2,cap='7 × 3'),CHN((21,'',1))),
        S("Verdoppeln","",BAR2([[16,'8'],[16,'8']],'8 × 4 = 2 × 16'.replace('16','16'),0),CHN(('4 × 4','',0),(16,'',1),('verdoppeln','',2),(32,'8 × 4',1))),
        S("Trick: 9er","",ARR(9,4,split=0,cap='9 × 4'),CHN(('10 × 4','',0),(40,'',1),('− 4','',2),(36,'',1))),
        S("Beispiel: 7 × 8","",ARR(7,8,split=5,cap='7 × 8'),CHN(('5 × 8','',0),(40,'',1),('+ 2 × 8','',2),(56,'',1))),
        MERKE([['Tauschen','a × b = b × a','3 × 7 = 7 × 3',0],['Zerlegen','5er + Rest','6 × 6',1],['Verdoppeln','2 × 4er = 8er','4 × 8',2]])]
    D['kl3-mathe-division-10er']=[
        S("Worum geht es?","Teilen in gleiche Gruppen.",BAR2([[10,'10']]*3,'30 : 10 = 3',0)),
        BEG([['Teilen :','gleich verteilen','30 : 10'],['Dividend','Zahl, die geteilt wird','30'],['Divisor','Zahl, durch die geteilt wird','10'],['Quotient','Ergebnis','3']]),
        S("Gruppen bilden","",EMO([['🍎',10],['🍎',10],['🍎',10]],grp=5),CHN((30,'',0),(':',' ',2),(10,'',0),(3,'Gruppen',1))),
        S("Rechenstrich","",J(30,[[-10,'−10']]*3,'30 → 0: 3 Schritte')),
        S("Umkehren","",ARR(3,10,cap='3 × 10 = 30'),CHN(('30 : 10','',0),(3,'',1))),
        S("Die 10er-Reihe","",NL(0,100,10,pts=[10,20,30,40,50,60,70,80,90])),
        S("Beispiel: 70 : 10","",BAR2([[10,'10']]*7,'7 Gruppen',0),CHN((70,'',0),(':',' ',2),(10,'',0),(7,'',1))),
        S("Beispiel: 90 : 10","",J(90,[[-10,'−10']]*9,'9 Schritte')),
        MERKE([['Teilen','Umkehr von Mal','30 : 10 = 3',0],['Probe','mit Mal','3 × 10',1],['Zehner','durch 10 gibt Z','70 : 10',2]])]
    D['kl3-mathe-rechte-winkel']=[
        S("Worum geht es?","Der rechte Winkel ist eine Ecke wie am Blatt.",{"type":"angle","deg":90,"lbl":"∟","cap":""}),
        BEG([['Winkel','Ecke von zwei Linien','Papierecke'],['rechter Winkel','genau wie ∟','Heft-Ecke'],['Schenkel','die zwei Linien','Seiten'],['Scheitel','der Eckpunkt','Ecke']]),
        S("∟ erkennen","",SHP('quadrat',0),CHN(('4 ∟','',1))),
        S("Rechteck","",SHP('rechteck',0),CHN(('4 ∟','',1),('✔️','',2))),
        S("Dreieck","",SHP('dreieck',2),CHN(('kein ∟','',3),('❌','',3))),
        S("Prüfen","Lege die Papierecke an.",{"type":"par","kind":"perp"},CHN(('passt','',1),('∟','',0))),
        S("Im Alltag","",EMO([['📕',1],['🪟',1],['🚪',1],['📺',1]],grp=0),CHN(('4 ∟','',1))),
        S("Schief","",{"type":"par","kind":"tilt"},CHN(('kein ∟','',3))),
        MERKE([['∟','wie Papierecke','Heft',0],['Quadrat','4 ∟','4 Ecken',1],['Prüfen','Ecke anlegen','passt genau',2]])]
    return D
