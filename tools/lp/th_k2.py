from th import *
def T_():
    D={}
    D['kl2-mathe-hunderterfeld']=[
        S("Worum geht es?","Hundert Punkte in 10 Reihen.",FLD(10,10,100)),
        BEG([['Hunderterfeld','100 Punkte','10 × 10'],['Zehner','eine volle Reihe','10'],['Einer','einzelne Punkte','7 in 47'],['Zahl','Zehner und Einer','47']]),
        S("1 Reihe = 1 Zehner","",FLD(10,10,10),CHN(('1 Reihe','',0),(10,'1 Zehner',1))),
        S("Zehner zählen","",FLD(10,10,30),BAR2([[10,'10'],[10,'10'],[10,'10']],'3 Zehner = 30',0)),
        S("Einer dazu","",FLD(10,10,30,4,0,1),CHN((30,'Zehner',0),(4,'Einer',2),(34,'Zahl',1))),
        S("Die Zahl 47","",FLD(10,10,40,7,0,1),BLK(0,4,7),CHN(('4 Z','',0),('7 E','',2),(47,'Zahl',1))),
        S("Die Zahl 63","",FLD(10,10,60,3,0,1),BLK(0,6,3),CHN(('6 Z','',0),('3 E','',2),(63,'Zahl',1))),
        S("Zahlen mit 0","",FLD(10,10,50),BLK(0,5,0),CHN(('5 Z','',0),('0 E','',2),(50,'Zahl',1))),
        S("Vergleichen","Mehr Reihen sind mehr.",FLD(10,10,35),FLD(10,10,53),CHN((35,'',0),('<','',2),(53,'',1))),
        MERKE([['Zehner','volle Reihe','10',0],['Einer','Rest-Punkte','7 in 47',1],['Zahl','Z und E','40 + 7',2]])]
    D['kl2-mathe-zahlenstrahl']=[
        S("Worum geht es?","Zahlen der Reihe nach.",NL(0,100,10,5,pts=[40])),
        BEG([['Zahlenstrahl','Linie mit Zahlen','0 bis 100'],['Schritt','Abstand der Striche','10, 5 oder 1'],['links','kleiner','20 < 70'],['rechts','grösser','70 > 20']]),
        S("Zehnerschritte","",J(0,[[10,'+10']]*4,'0, 10, 20, 30, 40')),
        S("Fünferschritte","",NL(0,50,5,pts=[25]),CHN((5,'',0),(10,'',0),(15,'',0),(20,'',0),(25,'',1))),
        S("Einerschritte","",NL(30,40,1,pts=[34]),J(30,[[4,'+4']],'30 + 4 = 34')),
        S("Wo liegt 70?","",NL(0,100,10,5,pts=[70]),CHN(('7 Zehner','',0),(70,'',1))),
        S("Links und rechts","Rechts ist grösser.",NL(0,100,10,pts=[20,70]),CHN((20,'links',0),('<','',2),(70,'rechts',1))),
        S("Zahl suchen","",NL(20,30,1,q=27),J(20,[[7,'+7']],hide=True)),
        S("Beispiel: 65","",NL(0,100,10,5,pts=[65]),J(60,[[5,'+5']],'60 + 5 = 65')),
        MERKE([['rechts','grösser','70 > 20',0],['links','kleiner','20 < 70',1],['Schritt','erst Strich, dann zählen','30 + 4',2]])]
    D['kl2-mathe-nachbarzahlen']=[
        S("Worum geht es?","Jede Zahl hat Nachbarn.",NL(30,50,1,pts=[39])),
        BEG([['Vorgänger','Zahl davor','vor 40: 39'],['Nachfolger','Zahl danach','nach 40: 41'],['Nachbarzehner','volle Zehner davor und danach','40 und 50']]),
        S("Eins weniger","",J(40,[[-1,'−1']],'Vorgänger von 40 ist 39'),CHN((40,'',0),(39,'davor',1))),
        S("Eins mehr","",J(40,[[1,'+1']],'Nachfolger von 40 ist 41'),CHN((40,'',0),(41,'danach',1))),
        S("Beide Nachbarn","",NL(45,55,1,pts=[49]),CHN((48,'davor',0),(49,'Zahl',2),(50,'danach',1))),
        S("Nachbarzehner","",NL(0,100,10,pts=[40,50]),CHN((40,'davor',0),(47,'Zahl',2),(50,'danach',1))),
        S("Beispiel: 63","",NL(60,70,1,pts=[62,64]),CHN((62,'davor',0),(63,'Zahl',2),(64,'danach',1))),
        S("Beispiel: 70","",J(70,[[-1,'−1']]),J(70,[[1,'+1']]),CHN((69,'davor',0),(70,'Zahl',2),(71,'danach',1))),
        MERKE([['Vorgänger','eins weniger','46 vor 47',0],['Nachfolger','eins mehr','48 nach 47',1],['Nachbarzehner','volle Zehner','40 und 50',2]])]
    D['kl2-mathe-plus100']=split_blocks('+',False,[(34,25),(47,26),(58,31)],[['Summand','Zahl, die du addierst','34 und 25'],['Summe','das Ergebnis','59'],['Zehner','Reihen im Hunderterfeld','30 und 20'],['Einer','einzelne Punkte','4 und 5']],"Zehner und Einer einzeln.",[['Zehner','zuerst','30 + 20',0],['Einer','dann','4 + 5',1],['Probe','mit Minus','59 − 25',2]])
    D['kl2-mathe-minus100']=split_blocks('-',False,[(68,35),(79,24),(86,52)],[['Minuend','Zahl, von der du wegnimmst','68'],['Subtrahend','Zahl, die du wegnimmst','35'],['Differenz','das Ergebnis','33'],['Probe','mit Plus','33 + 35 = 68']],"Erst Zehner, dann Einer weg.",[['Zehner weg','zuerst','68 − 30',0],['Einer weg','dann','38 − 5',1],['Probe','mit Plus','33 + 35',2]])
    D['kl2-mathe-mal-2-5-10']=[
        S("Worum geht es?","Gleiche Gruppen.",ARR(3,5,cap='3 × 5')),
        BEG([['mal ×','gleiche Gruppen','3 × 5'],['Faktor','Zahl, die malgenommen wird','3 und 5'],['Produkt','das Ergebnis','15'],['Reihe','alle Ergebnisse','5, 10, 15']]),
        S("Gruppen zählen","",EMO([['🍎',2],['🍎',2],['🍎',2]],grp=0),CHN(('3 Gruppen','',0),('je 2','',2),('3 × 2 = 6','',1))),
        S("2er-Reihe","",J(0,[[2,'+2']]*5,'2, 4, 6, 8, 10'),ARR(2,5,cap='5 × 2 = 10',rows=True)),
        S("5er-Reihe","",J(0,[[5,'+5']]*4,'5, 10, 15, 20'),ARR(4,5,cap='4 × 5 = 20')),
        S("10er-Reihe","",BAR2([[10,'10']]*5,'5 × 10 = 50',0)),
        S("Tauschen","Es geht in beide Richtungen.",ARR(3,5,cap='3 × 5'),ARR(5,3,cap='5 × 3',col=2)),
        S("Beispiel: 6 × 5","",ARR(6,5,split=5,rows=True),CHN(('5 × 5','',0),(25,'',1),('+ 5','',2),(30,'',1))),
        S("Beispiel: 7 × 2","",J(0,[[2,'+2']]*7,'7 × 2 = 14'),CHN(('7 × 2','',0),(14,'',1))),
        MERKE([['Gruppen','gleich gross','3 × 5',0],['Tauschen','geht bei Mal','3 × 5 = 5 × 3',1],['Reihen','in Schritten zählen','5, 10, 15',2]])]
    D['kl2-mathe-symmetrie']=[
        S("Worum geht es?","Beide Hälften sind gleich.",SHP('quadrat',0,axis='v')),
        BEG([['symmetrisch','beide Hälften gleich','Schmetterling'],['Spiegelachse','Linie in der Mitte','rote Linie'],['Spiegelbild','gleiches Bild gegenüber','See und Berg']]),
        S("Quadrat","",SHP('quadrat',1,axis='v'),SHP('quadrat',1,axis='h'),CHN(('2 Achsen','',0),('✔️','',1))),
        S("Kreis","",SHP('kreis',0,axis='v'),SHP('kreis',0,axis='h'),CHN(('viele Achsen','',0),('✔️','',1))),
        S("Dreieck","",SHP('dreieck',2,axis='v'),SHP('dreieck',2,axis='h'),CHN(('1 Achse','',0),('✔️ ❌','',1))),
        S("Schiefes Viereck","",SHP('viereck',3,axis='v'),CHN(('keine Achse','',0),('❌','',3))),
        S("Buchstaben","",EMO([['A',1],['H',1],['M',1],['O',1],['T',1]],grp=0),CHN(('A H M O T','symmetrisch',1),('F G J R','nicht',3))),
        S("Falten","Passt alles genau?",EMO([['🦋',1],['❤️',1],['⭐',1]],grp=0),CHN(('falten','',0),('passt','',1),('symmetrisch','',2))),
        MERKE([['Achse','Linie in der Mitte','rote Linie',0],['Hälften','müssen gleich sein','links = rechts',1],['Falten','zum Prüfen','passt genau',2]])]
    D['kl2-mathe-koerper']=[
        S("Worum geht es?","Körper kann man anfassen.",EMO([['🎲',1],['⚽',1],['📦',1],['🥫',1]],grp=0)),
        BEG([['Würfel','6 gleiche Flächen','Spielwürfel'],['Quader','6 Flächen','Schuhkarton'],['Kugel','ganz rund','Ball'],['Zylinder','oben und unten rund','Dose']]),
        S("Würfel","",EMO([['🎲',1],['🧊',1]],grp=0),CHN((6,'Flächen',0),(12,'Kanten',2),(8,'Ecken',1))),
        S("Quader","",EMO([['📦',1],['📚',1],['🧃',1]],grp=0),CHN((6,'Flächen',0),(12,'Kanten',2),(8,'Ecken',1))),
        S("Kugel","",EMO([['⚽',1],['🏀',1],['🌍',1]],grp=0),CHN((0,'Ecken',1),(0,'Kanten',2),('rollt','',0))),
        S("Zylinder","",EMO([['🥫',1],['🛢️',1],['🪣',1]],grp=0),CHN((2,'runde Flächen',0),('rollt','',2))),
        S("Rollen und Stapeln","",EMO([['⚽',1],['🎲',1]],grp=0),CHN(('⚽','rollt',0),('🎲','stapeln',1))),
        MERKE([['Würfel','6 · 12 · 8','Fläche, Kante, Ecke',0],['Kugel','rollt','keine Ecken',1],['Quader','wie ein Karton','Schuhkarton',2]])]
    D['kl2-mathe-meter-cm']=[
        S("Worum geht es?","Längen messen.",NL(0,20,1,pts=[12],cap='12 cm')),
        BEG([['Zentimeter cm','kleine Längen','Radiergummi'],['Meter m','grosse Längen','Pult'],['Lineal','Messgerät','20 cm'],['1 m','100 cm','10 × 10 cm']]),
        S("Lineal","",NL(0,10,1,pts=[7]),CHN(('von 0','',0),('bis 7','',2),('7 cm','',1))),
        S("1 Meter","",BAR2([[10,'10 cm']]*10,'1 m = 100 cm',0)),
        S("Meter in cm","",CV('m','cm'),CHN(('1 m','',0),(100,'cm',1))),
        S("Halber Meter","",BAR2([[50,'50 cm'],[50,'50 cm']],'1 m = 50 + 50',0),CHN(('halber m','',0),(50,'cm',1))),
        S("Plus rechnen","",BAR2([[30,'30 cm'],[20,'20 cm']],'30 + 20 = 50 cm',0),CHN((30,'',0),('+',' ',2),(20,'',1),(50,'cm',2))),
        S("Minus rechnen","",BAR2([[50,'50 cm']],'',0),J(80,[[-30,'−30']],'80 − 30 = 50')),
        MERKE([['cm','kurze Längen','Bleistift',0],['m','lange Längen','Zimmer',1],['1 m','= 100 cm','nie vergessen',2]])]
    D['kl2-mathe-uhr-halb-viertel']=[
        S("Worum geht es?","Die Uhr zeigt Viertel und halb.",CLK(3,30)),
        BEG([['Viertel nach','langer Zeiger rechts','15 Minuten'],['halb','langer Zeiger unten','30 Minuten'],['Viertel vor','langer Zeiger links','45 Minuten'],['Minute','kleine Zeit','60 in 1 Stunde']]),
        S("Ganze Stunde","",CLK(3,0),CHN(('3:00','',1),('3 Uhr','',0))),
        S("Viertel nach","",CLK(3,15),CHN(('3:15','',1),('Viertel nach 3','',0))),
        S("Halb","",CLK(3,30),CHN(('3:30','',1),('halb 4','',0))),
        S("Viertel vor","",CLK(3,45),CHN(('3:45','',1),('Viertel vor 4','',0))),
        S("Ein Kreis","",BAR2([[15,'15'],[15,'15'],[15,'15'],[15,'15']],'4 Viertel = 60 Minuten',0)),
        S("Beispiel","",CLK(8,30),CLK(5,15),CLK(10,45)),
        MERKE([['Viertel nach','15 Minuten','3:15',0],['halb','30 Minuten','halb 4 = 3:30',1],['Viertel vor','45 Minuten','3:45',2]])]
    return D
