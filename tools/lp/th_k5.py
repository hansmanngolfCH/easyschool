from th import *
def FB(*rows):return {"type":"fbar","rows":[list(r) for r in rows]}
def T_():
    D={}
    D['kl5-mathe-million']=[
        S("Worum geht es?","Die Million: 1'000'000.",BAR2([[100000,'100 000']]*10,'10 × 100\'000 = 1\'000\'000',0)),
        BEG([['Tausender','1\'000','1 T'],['Zehntausender','10\'000','10 T'],['Hunderttausender','100\'000','100 T'],['Million','1\'000\'000','1000 T']]),
        S("Stufen","Jede Stufe ist 10 mal mehr.",CHN(('1\'000','',0),('10\'000','',1),('100\'000','',2),('1\'000\'000','',3))),
        S("Zahlenstrahl","",NL(0,1000000,100000,pts=[1000000])),
        S("Sprünge","",J(0,[[250000,'+250\'000']]*4,'4 × 250\'000 = 1\'000\'000')),
        S("Zahl zerlegen","",BAR2([[400000,'400 000'],[50000,'50 000'],[3000,'3 000']],'453\'000',1)),
        S("Lesen","",CHN(('1','Million',3),('000','tausend',0),('000','',1))),
        S("Vergleichen","",CHN(('999\'999','',0),('<','',2),('1\'000\'000','',1))),
        MERKE([['1 Million','1000 Tausender','1\'000\'000',3],['Stufen','mal 10','T → ZT → HT',0],['Vorgänger','eins weniger','999\'999',2]])]
    D['kl5-mathe-teiler-vielfache']=[
        S("Worum geht es?","Teiler gehen auf, Vielfache wachsen.",ARR(3,4,cap='12 = 3 × 4')),
        BEG([['Teiler','teilt ohne Rest','3 teilt 12'],['Vielfache','Reihe von Malzahlen','3, 6, 9, 12'],['Teilermenge','alle Teiler','1, 2, 3, 4, 6, 12'],['Rest','bleibt beim Teilen','13 : 4']]),
        S("Vielfache","",J(0,[[4,'+4']]*5,'4, 8, 12, 16, 20')),
        S("Teiler finden","",ARR(2,6,cap='2 × 6'),ARR(3,4,cap='3 × 4',col=2),ARR(1,12,cap='1 × 12',col=1)),
        S("Alle Teiler von 12","",CHN((1,'',0),(2,'',1),(3,'',2),(4,'',3),(6,'',0),(12,'',1))),
        S("Teilbar durch 2","Einer ist 0, 2, 4, 6, 8.",CHN((12,'✔️',1),(14,'✔️',1),(15,'❌',3))),
        S("Teilbar durch 5","Einer ist 0 oder 5.",CHN((15,'✔️',1),(20,'✔️',1),(22,'❌',3))),
        S("Teilbar durch 10","Einer ist 0.",CHN((30,'✔️',1),(35,'❌',3))),
        MERKE([['Teiler','geht ohne Rest','4 teilt 12',0],['Vielfache','Malreihe','4, 8, 12',1],['1','teilt jede Zahl','1 × 12',2]])]
    D['kl5-mathe-brueche']=[
        S("Worum geht es?","Teile von einem Ganzen.",PIE(4,3,'3/4')),
        BEG([['Bruch','Teil vom Ganzen','3/4'],['Zähler','oben: wie viele Teile','3'],['Nenner','unten: in wie viele Teile','4'],['Bruchstrich','Teilen','–']]),
        S("Ganzes teilen","",PIE(4,0,'4 gleiche Teile'),CHN(('Nenner','',0),(4,'',1))),
        S("Teile zählen","",PIE(4,3,'3 von 4'),CHN(('Zähler','',0),(3,'',1))),
        S("Halbe","",PIE(2,1,'1/2'),FB((2,1,'1/2'))),
        S("Viertel","",PIE(4,1,'1/4'),FB((4,1,'1/4',1))),
        S("Achtel","",PIE(8,3,'3/8'),FB((8,3,'3/8',2))),
        S("Vergleichen","Mehr Teile heisst kleinere Stücke.",FB((2,1,'1/2'),(4,1,'1/4',1),(8,1,'1/8',2))),
        S("Das Ganze","",PIE(5,5,'5/5 = 1'),CHN(('5/5','',0),('=','',2),(1,'',1))),
        MERKE([['Zähler','Teile gefärbt','3',0],['Nenner','alle Teile','4',1],['Ganzes','Zähler = Nenner','4/4 = 1',2]])]
    D['kl5-mathe-bruchteile']=[
        S("Worum geht es?","Ein Teil von einer Menge.",EMO([['🍎',4],['🍎',4],['🍎',4],['🍎',4]],grp=0),CHN(('1/4 von 16','',0))),
        BEG([['Bruchteil','Teil einer Zahl','1/4 von 20'],['Nenner','Gruppen bilden','4'],['Zähler','Gruppen nehmen','3'],['Rechnung','durch, dann mal','20 : 4 × 3']]),
        S("1. Teilen","",BAR2([[5,'5'],[5,'5'],[5,'5'],[5,'5']],'20 : 4 = 5',0)),
        S("2. Nehmen","",BAR2([[5,'5'],[5,'5'],[5,'5'],[5,'']],'3 von 4 Teilen',1),CHN((5,'',0),('× 3','',2),(15,'',1))),
        S("Ein Halb","",BAR2([[10,'10'],[10,'10']],'1/2 von 20 = 10',0)),
        S("Ein Viertel","",BAR2([[5,'5']]*4,'1/4 von 20 = 5',2)),
        S("Ein Fünftel","",BAR2([[4,'4']]*5,'1/5 von 20 = 4',3)),
        S("Beispiel: 3/4 von 24","",PIE(4,3,'3/4'),CHN((24,'',0),(':',' ',2),(4,'',0),(6,'',1),('× 3','',2),(18,'',1))),
        MERKE([['Zuerst','durch den Nenner','20 : 4',0],['Dann','mal den Zähler','5 × 3',1],['Probe','Teile zählen','4 × 5',2]])]
    D['kl5-mathe-schriftlich-mal']=[
        S("Worum geht es?","Grosse Malaufgaben in Teilen rechnen.",ARR(4,12,split=10,cap='4 × 12 = 4 × 10 + 4 × 2')),
        BEG([['Faktor','malgenommene Zahl','4 und 12'],['Produkt','Ergebnis','48'],['Teilprodukt','Z-Teil, E-Teil','40 und 8'],['Zerlegen','12 = 10 + 2','Z und E']]),
        S("Zerlegen","",BAR2([[10,'10'],[2,'2']],'12 = 10 + 2',0)),
        S("Zehner mal","",BAR2([[10,'10']]*4,'4 × 10 = 40',0)),
        S("Einer mal","",BAR2([[2,'2']]*4,'4 × 2 = 8',1)),
        S("Zusammen","",BAR2([[40,'40'],[8,'8']],'40 + 8 = 48',2),CHN((40,'',0),('+',' ',2),(8,'',1),(48,'',3))),
        S("Beispiel: 3 × 23","",BAR2([[60,'3 × 20 = 60'],[9,'3 × 3 = 9']],'60 + 9 = 69',3)),
        S("Beispiel: 5 × 14","",CHN(('5 × 10','',0),(50,'',1),('5 × 4','',2),(20,'',1),(70,'',3))),
        MERKE([['Zerlegen','Z und E','12 = 10 + 2',0],['Teilprodukte','einzeln rechnen','40 und 8',1],['Addieren','am Schluss','48',2]])]
    D['kl5-mathe-schriftlich-durch']=[
        S("Worum geht es?","Grosse Zahlen in Teilen teilen.",BAR2([[40,'40'],[8,'8']],'48 : 4 = 12',0)),
        BEG([['Dividend','wird geteilt','48'],['Divisor','Teiler','4'],['Quotient','Ergebnis','12'],['Rest','bleibt übrig','1']]),
        S("Zerlegen","",BAR2([[40,'40'],[8,'8']],'48 = 40 + 8',0)),
        S("Zehner teilen","",CHN((40,'',0),(':',' ',2),(4,'',0),(10,'',1))),
        S("Einer teilen","",CHN((8,'',0),(':',' ',2),(4,'',0),(2,'',1))),
        S("Zusammen","",CHN((10,'',0),('+',' ',2),(2,'',1),(12,'',3))),
        S("Mit Rest","",EMO([['🍬',5],['🍬',5],['🍬',5],['🍬',1]],grp=0),CHN((16,'',0),(':',' ',2),(5,'',0),('3 Rest 1','',3))),
        S("Probe","",ARR(4,12,split=10,cap='4 × 12 = 48')),
        MERKE([['Zerlegen','in Teile, die aufgehen','48 = 40 + 8',0],['Rest','kleiner als Divisor','Rest < 4',3],['Probe','mit Mal','4 × 12',1]])]
    D['kl5-mathe-dezimalzahlen']=[
        S("Worum geht es?","Zahlen mit Komma.",FLD(10,10,50,cap='0,5 = 5 Zehntel')),
        BEG([['Komma','trennt Ganze und Teile','2,5'],['Zehntel','Stelle rechts vom Komma','0,3'],['Hundertstel','zweite Stelle','0,07'],['Ganze','links vom Komma','2']]),
        S("Zehntel","",FB((10,3,'0,3',0)),CHN(('3/10','',0),('=','',2),('0,3','',1))),
        S("Hundertstel","",FLD(10,10,7,cap='7 Hundertstel'),CHN(('7/100','',0),('=','',2),('0,07','',1))),
        S("Ganze und Teile","",FB((10,10,'1',0),(10,5,'1,5',1)),CHN((1,'Ganzes',0),('0,5','Teil',2),('1,5','',1))),
        S("Zahlenstrahl","",NL(0,2,1,pts=[1])),
        S("Vergleichen","",CHN(('0,4','',0),('<','',2),('0,7','',1))),
        S("Geld","",CHN(('1 Fr.','',0),('= 100 Rp.','',1),('0,50 Fr.','50 Rp.',2))),
        MERKE([['Zehntel','1. Stelle','0,3',0],['Hundertstel','2. Stelle','0,07',1],['Komma','trennt Ganze','2,5',2]])]
    D['kl5-mathe-flaeche']=[
        S("Worum geht es?","Wie viel Platz eine Fläche braucht.",{"type":"area","c":5,"r":3,"a":5,"b":3,"la":"5 cm","lb":"3 cm"}),
        BEG([['Fläche','Platz im Rechteck','15 cm²'],['Länge','lange Seite','5 cm'],['Breite','kurze Seite','3 cm'],['cm²','Quadratzentimeter','1 Kästchen']]),
        S("Quadrate zählen","",{"type":"area","c":4,"r":2,"a":4,"b":2,"la":"4 cm","lb":"2 cm"},CHN(('4 × 2','',0),(8,'cm²',1))),
        S("Reihen","",ARR(3,5,cap='3 Reihen mit je 5'),CHN((5,'+',0),(5,'+',0),(5,'',0),(15,'',1))),
        S("Regel","",CHN(('Länge','',0),('×','',2),('Breite','',1),('Fläche','',3))),
        S("Beispiel 1","",{"type":"area","c":6,"r":3,"a":6,"b":3,"la":"6 cm","lb":"3 cm"},CHN(('6 × 3','',0),(18,'cm²',1))),
        S("Beispiel 2","",{"type":"area","c":7,"r":2,"a":7,"b":2,"la":"7 cm","lb":"2 cm"},CHN(('7 × 2','',0),(14,'cm²',1))),
        S("Quadrat","",{"type":"area","c":4,"r":4,"a":4,"b":4,"la":"4 cm","lb":"4 cm"},CHN(('4 × 4','',0),(16,'cm²',1))),
        MERKE([['Fläche','Länge × Breite','5 × 3',0],['Einheit','cm²','15 cm²',1],['Quadrat','Seite × Seite','4 × 4',2]])]
    D['kl5-mathe-volumen']=[
        S("Worum geht es?","Wie viele Würfel passen hinein.",{"type":"quader","l":"4 cm","b":"3 cm","h":"2 cm"}),
        BEG([['Volumen','Platz im Körper','24 cm³'],['Quader','Körper mit 6 Rechtecken','Schachtel'],['Länge Breite Höhe','drei Masse','4, 3, 2'],['cm³','Würfel 1 cm','1 Würfel']]),
        S("Eine Schicht","",ARR(3,4,cap='3 × 4 = 12 Würfel'),CHN(('4 × 3','',0),(12,'Würfel',1))),
        S("Schichten","",BAR2([[12,'12'],[12,'12']],'2 Schichten',0)),
        S("Zusammen","",CHN((12,'',0),('× 2','',2),(24,'cm³',1))),
        S("Regel","",CHN(('Länge','',0),('×','',2),('Breite','',1),('×','',2),('Höhe','',3))),
        S("Beispiel","",{"type":"quader","l":"5 cm","b":"2 cm","h":"3 cm"},CHN(('5 × 2','',0),(10,'',1),('× 3','',2),(30,'cm³',3))),
        S("Würfel","",{"type":"quader","l":"3 cm","b":"3 cm","h":"3 cm"},CHN(('3 × 3 × 3','',0),(27,'cm³',1))),
        MERKE([['Volumen','L × B × H','4 × 3 × 2',0],['Einheit','cm³','24 cm³',1],['Schicht','L × B','12',2]])]
    D['kl5-mathe-tonnen']=[
        S("Worum geht es?","Tonnen für ganz schwere Dinge.",EMO([['🚛',1],['🐘',1]],grp=0),CHN(('1 t','',0),('=','',2),('1\'000 kg','',1))),
        BEG([['Tonne t','sehr schwer','Elefant'],['Kilogramm kg','Alltag','Mehl'],['1 t','1\'000 kg','1000 Packungen'],['Gramm g','leicht','Brief']]),
        S("1 Tonne","",BAR2([[100,'100 kg']]*10,'1 t = 1\'000 kg',0)),
        S("Umrechnen","",CV('t','kg'),CHN(('1 t','',0),('1\'000','kg',1))),
        S("Halbe Tonne","",BAR2([[500,'500 kg'],[500,'500 kg']],'1 t = 500 + 500',1),CHN(('½ t','',0),(500,'kg',1))),
        S("Mehrere Tonnen","",BAR2([[1000,'1 t']]*3,'3 t',2)),
        S("Zusammen","",BAR2([[600,'600 kg'],[400,'400 kg']],'600 + 400 = 1 t',3)),
        S("Lastwagen","",J(0,[[250,'+250 kg']]*4,'4 × 250 kg = 1 t')),
        MERKE([['t → kg','mal 1\'000','2 t = 2\'000 kg',0],['kg → t','durch 1\'000','3\'000 kg = 3 t',1],['½ t','500 kg','halbe Tonne',2]])]
    return D
