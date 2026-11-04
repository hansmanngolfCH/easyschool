from th import *
from th_k5 import FB
def T_():
    D={}
    D['kl6-mathe-dezimal-vertiefung']=[
        S("Worum geht es?","Dezimalzahlen mit Stellen.",BAR2([[300,'3'],[40,'0,4'],[5,'0,05']],'3,45',0)),
        BEG([['Einer','links vom Komma','3'],['Zehntel','1. Stelle','0,4'],['Hundertstel','2. Stelle','0,05'],['Tausendstel','3. Stelle','0,005']]),
        S("Stellenwerte","",CHN(('E','3',0),(',',' ',2),('z','4',1),('h','5',3))),
        S("Zehntel","",FB((10,4,'0,4',0))),
        S("Hundertstel","",FLD(10,10,45,cap='0,45')),
        S("Vergleichen","Stelle für Stelle.",CHN(('0,45','',0),('<','',2),('0,5','',1)),FB((10,5,'0,5',1))),
        S("Addieren","Komma unter Komma.",BAR2([[250,'2,5'],[130,'1,3']],'2,5 + 1,3 = 3,8',1)),
        S("Subtrahieren","",J(80,[[-30,'−3,0']],'8,0 − 3,0 = 5,0')),
        S("Nullen","",CHN(('0,5','',0),('=','',2),('0,50','',1))),
        MERKE([['Komma','unter Komma','2,5 + 1,3',0],['Nullen','hinten ändern nichts','0,5 = 0,50',1],['Vergleichen','von links','0,45 < 0,5',2]])]
    D['kl6-mathe-erweitern-kuerzen']=[
        S("Worum geht es?","Gleicher Wert, andere Zahlen.",FB((2,1,'1/2',0),(4,2,'2/4',1),(8,4,'4/8',2))),
        BEG([['erweitern','Zähler und Nenner mal gleich','1/2 → 2/4'],['kürzen','Zähler und Nenner durch gleich','4/8 → 1/2'],['gleichwertig','gleich viel','1/2 = 2/4'],['Teiler','für das Kürzen','4']]),
        S("Erweitern ×2","",PIE(2,1,'1/2'),PIE(4,2,'2/4',),CHN(('1 × 2','',0),('2 × 2','',1),('=','',2),('2/4','',3))),
        S("Erweitern ×3","",PIE(3,1,'1/3'),PIE(6,2,'2/6'),CHN(('1 × 2','',0),('3 × 2','',1),('=','',2),('2/6','',3))),
        S("Kürzen ÷2","",PIE(8,4,'4/8'),PIE(4,2,'2/4'),CHN(('4 : 4','',0),('8 : 4','',1),('=','',2),('1/2','',3))),
        S("Kürzen ÷3","",FB((9,3,'3/9',0),(3,1,'1/3',1)),CHN(('3 : 3','',0),('9 : 3','',1),('1/3','',3))),
        S("Gleichnamig machen","",FB((2,1,'1/2',0),(4,1,'1/4',1)),CHN(('1/2','=',0),('2/4','',3))),
        S("Vergleichen","",FB((3,1,'1/3',0),(6,3,'3/6',1)),CHN(('1/3','',0),('<','',2),('3/6','',1))),
        MERKE([['Erweitern','mal gleich','1/2 = 2/4',0],['Kürzen','durch gleich','4/8 = 1/2',1],['Wert','bleibt gleich','nur anders geschrieben',2]])]
    D['kl6-mathe-bruch-dezimal']=[
        S("Worum geht es?","Bruch und Komma sind dasselbe.",FB((10,3,'3/10',0)),CHN(('3/10','',0),('=','',2),('0,3','',1))),
        BEG([['Zehntel','Nenner 10','3/10 = 0,3'],['Hundertstel','Nenner 100','7/100 = 0,07'],['Dezimalzahl','Zahl mit Komma','0,25'],['Umwandeln','erweitern auf 10 oder 100','1/4 = 25/100']]),
        S("Zehntel","",FB((10,7,'7/10',0)),CHN(('7/10','',0),('0,7','',1))),
        S("Hundertstel","",FLD(10,10,25),CHN(('25/100','',0),('0,25','',1))),
        S("Halbe","",FB((2,1,'1/2',0),(10,5,'5/10',1)),CHN(('1/2','',0),('5/10','',2),('0,5','',1))),
        S("Viertel","",FB((4,1,'1/4',0),(100,25,'',1) if False else (4,1,'1/4',2)),CHN(('1/4','',0),('25/100','',2),('0,25','',1))),
        S("Fünftel","",FB((5,1,'1/5',0),(10,2,'2/10',1)),CHN(('1/5','',0),('2/10','',2),('0,2','',1))),
        S("Drei Viertel","",PIE(4,3,'3/4'),CHN(('3/4','',0),('75/100','',2),('0,75','',1))),
        MERKE([['Zehntel','1 Stelle','3/10 = 0,3',0],['Hundertstel','2 Stellen','25/100 = 0,25',1],['Erweitern','auf 10 oder 100','1/4 = 25/100',2]])]
    D['kl6-mathe-kreis']=[
        S("Worum geht es?","Alle Punkte gleich weit vom Mittelpunkt.",{"type":"circle","show":"both","lr":"r","ld":"d"}),
        BEG([['Mittelpunkt M','Mitte','Zirkelspitze'],['Radius r','Mitte bis Rand','3 cm'],['Durchmesser d','Rand bis Rand durch M','6 cm'],['Zirkel','Zeichengerät','Kreis']]),
        S("Radius","",{"type":"circle","show":"r","lr":"r = 3 cm"},CHN(('M','→ Rand',0),('r',' ',1))),
        S("Durchmesser","",{"type":"circle","show":"d","ld":"d = 6 cm"},CHN(('d','durch M',0))),
        S("d und r","",{"type":"circle","show":"both","lr":"r = 3","ld":"d = 6"},CHN(('d','',0),('=','',2),('2 × r','',1))),
        S("Rechnen","",BAR2([[3,'r = 3'],[3,'r = 3']],'d = 6',0),CHN((3,'r',0),('× 2','',2),(6,'d',1))),
        S("Zeichnen","",FL(["Radius einstellen","Spitze in M","Drehen"])),
        S("Beispiel","",BAR2([[4,'r = 4'],[4,'r = 4']],'d = 8',2),CHN(('d = 8','r = ?',0),(':',' ',2),(2,'',0),(4,'r',1))),
        MERKE([['d = 2 × r','doppelt so lang','r = 3, d = 6',0],['r = d : 2','halb','d = 8, r = 4',1],['Zirkel','Spitze in M','Radius einstellen',2]])]
    D['kl6-mathe-parallel-senkrecht']=[
        S("Worum geht es?","Linien, die sich nie treffen oder rechtwinklig kreuzen.",{"type":"par","kind":"par"}),
        BEG([['parallel ∥','gleicher Abstand, treffen sich nie','Schienen'],['senkrecht ⊥','kreuzen im rechten Winkel','Kreuz'],['Geodreieck','Hilfsmittel','Mittellinie'],['Abstand','kürzeste Strecke','∟']]),
        S("Parallel","",{"type":"par","kind":"par"},CHN(('∥','überall gleicher Abstand',1))),
        S("Senkrecht","",{"type":"par","kind":"perp"},CHN(('⊥','∟',1))),
        S("Schräg","",{"type":"par","kind":"cross"},CHN(('weder ∥ noch ⊥','',3))),
        S("Nicht parallel","",{"type":"par","kind":"tilt"},CHN(('Abstand wird kleiner','',3))),
        S("Parallele zeichnen","",FL(["Linie legen","Geodreieck anlegen","verschieben","Linie ziehen"])),
        S("Im Alltag","",EMO([['🚂',1],['🪟',1],['🚦',1]],grp=0),CHN(('∥ Schienen','',0),('⊥ Fenster','',1))),
        MERKE([['∥','gleicher Abstand','Schienen',0],['⊥','∟','Fensterkreuz',1],['Geodreieck','zum Zeichnen','Mittellinie',2]])]
    D['kl6-mathe-winkel-messen']=[
        S("Worum geht es?","Winkel misst du in Grad.",{"type":"angle","deg":60,"lbl":"60°"}),
        BEG([['Winkel','zwei Schenkel','Ecke'],['Grad °','Einheit','60°'],['spitz','kleiner als ∟','45°'],['stumpf','grösser als ∟','120°']]),
        S("Geodreieck","",FL(["Nullpunkt auf Scheitel","0° auf Schenkel","Zahl ablesen"])),
        S("Spitz","",{"type":"angle","deg":45,"lbl":"45°"},CHN(('< 90°','spitz',1))),
        S("Rechter Winkel","",{"type":"angle","deg":90,"lbl":"90° ∟"},CHN(('90°','recht',1))),
        S("Stumpf","",{"type":"angle","deg":120,"lbl":"120°"},CHN(('> 90°','stumpf',1))),
        S("Gestreckt","",{"type":"angle","deg":180,"lbl":"180°"},CHN(('180°','gerade Linie',1))),
        S("Zusammen","",BAR2([[60,'60°'],[120,'120°']],'60° + 120° = 180°',0)),
        MERKE([['spitz','kleiner 90°','45°',0],['recht','genau 90°','∟',1],['stumpf','90° bis 180°','120°',2]])]
    D['kl6-mathe-bruch-dezimal-prozent']=[
        S("Worum geht es?","Drei Schreibweisen für denselben Teil.",FLD(10,10,50),CHN(('1/2','',0),('0,5','',1),('50 %','',2))),
        BEG([['Prozent %','von 100','50 %'],['Bruch','Teil vom Ganzen','1/2'],['Dezimalzahl','Zahl mit Komma','0,5'],['Hundertstel','Basis','50/100']]),
        S("Hundertfeld","",FLD(10,10,25),CHN(('25 %','',0),('25/100','',1),('0,25','',2))),
        S("Prozent","1 % ist 1 von 100.",FLD(10,10,1),CHN(('1 %','',0),('1/100','',1),('0,01','',2))),
        S("Die Hälfte","",FLD(10,10,50),CHN(('1/2','',0),('50 %','',1))),
        S("Dreiviertel","",PIE(4,3,'3/4'),CHN(('3/4','',0),('75 %','',1),('0,75','',2))),
        S("Fünftel","",FB((5,1,'1/5',0),(10,2,'2/10',1)),CHN(('1/5','',0),('20 %','',1),('0,2','',2))),
        S("Prozent von","",BAR2([[10,'10']]*10,'10 % von 100 = 10',3)),
        MERKE([['1/2','50 % = 0,5','Hälfte',0],['1/4','25 % = 0,25','Viertel',1],['Prozent','Hundertstel','7 % = 7/100',2]])]
    D['kl6-mathe-mittelwert']=[
        S("Worum geht es?","Der Durchschnitt gleicht aus.",{"type":"bars","items":[["Mo",4],["Di",6],["Mi",8]]}),
        BEG([['Mittelwert','Durchschnitt','6'],['Summe','alle Werte zusammen','18'],['Anzahl','wie viele Werte','3'],['Rechnung','Summe durch Anzahl','18 : 3']]),
        S("1. Addieren","",BAR2([[4,'4'],[6,'6'],[8,'8']],'4 + 6 + 8 = 18',0)),
        S("2. Zählen","",EMO([['📊',3]],grp=0),CHN((3,'Werte',0))),
        S("3. Teilen","",CHN((18,'',0),(':',' ',2),(3,'',0),(6,'',1))),
        S("Ausgleichen","",BAR2([[6,'6'],[6,'6'],[6,'6']],'je 6',2)),
        S("Beispiel","",{"type":"bars","items":[["A",5],["B",7],["C",9],["D",7]]},CHN(('5+7+9+7','',0),(28,'',1),(':',' ',2),(4,'',0),(7,'',3))),
        S("Probe","",CHN((7,'',0),('× 4','',2),(28,'',1))),
        MERKE([['Mittelwert','Summe : Anzahl','18 : 3',0],['Ausgleichen','alle gleich','je 6',1],['Probe','Mittelwert × Anzahl','6 × 3',2]])]
    return D
