from th import *
from th_k5 import FB
# Zusätzliche Seiten (vor "Regeln und Wichtigstes") aus der Fach-Durchsicht. Text je nach Klasse.
def T_():
    D={}
    D['kl2-mathe-hunderterfeld']=[S("Das ganze Feld","Das ganze Feld ist 100.",FLD(10,10,100),BAR2([[10,'10']]*10,'10 Zehner = 100',1))]
    D['kl2-mathe-zahlenstrahl']=[S("Nur Anfang und Ende","Manchmal stehen nur wenige Zahlen. Zähle die Striche.",NL(0,100,10,5,pts=[60],lab='ends'),J(0,[[10,'+10']]*6,'6 Zehner = 60')),
        S("Die Mitte","Die Mitte liegt genau zwischen zwei Zahlen.",NL(0,100,10,pts=[50],lab='alt'),CHN((0,'',0),('50','Mitte',1),(100,'',0)))]
    D['kl2-mathe-plus100']=[S("Über den Zehner","Gehe zuerst zum vollen Zehner.",J(67,[[3,'+3'],[3,'+3']],'67 + 6 = 73'),CHN(('67 + 3','',0),(70,'voller Zehner',1),('+ 3','',2),(73,'',3)))]
    D['kl2-mathe-minus100']=[S("Über den Zehner","Gehe zuerst zum vollen Zehner zurück.",J(73,[[-3,'−3'],[-3,'−3']],'73 − 6 = 67'),CHN(('73 − 3','',0),(70,'voller Zehner',1),('− 3','',2),(67,'',3)))]
    D['kl2-mathe-mal-2-5-10']=[S("Muster erkennen","Die Reihen haben Muster.",CHN(('2er','gerade',0),('5er','endet auf 0 oder 5',1),('10er','endet auf 0',2)),NL(0,50,5,pts=[10,20,30,40,50],lab='ends'))]
    D['kl2-mathe-meter-cm']=[S("Schätzen","Wie lang ist das?",EMO([['✏️',1],['📏',1],['🚪',1]],grp=0),CHN(('Bleistift','ca. 15 cm',0),('Lineal','30 cm',1),('Tür','2 m',2)))]
    D['kl2-mathe-uhr-halb-viertel']=[S("Digital","Eine Digitaluhr zeigt zuerst die Stunden, dann die Minuten.",CLK(7,30),CHN(('7','Stunden',0),(':',' ',2),('30','Minuten',1)))]
    D['kl3-mathe-runden']=[S("Überschlagen","Mit gerundeten Zahlen rechnest du schnell ungefähr.",CHN(('38 + 41','',0),('≈','',2),('40 + 40','',1),('=','',2),(80,'',3)),NL(30,50,10,pts=[38,41]))]
    D['kl3-mathe-plus1000']=[S("Mit Übergang","Wird ein Zehner voll, gehst du zuerst dorthin.",J(358,[[200,'+200'],[40,'+40'],[7,'+7']],'358 + 247 = 605'),CHN((358,'',0),(558,'+ 200',1),(598,'+ 40',2),(605,'+ 7',3)))]
    D['kl3-mathe-minus1000']=[S("Mit Übergang","Du nimmst Schritt für Schritt weg, auch über einen vollen Hunderter.",J(605,[[-200,'−200'],[-40,'−40'],[-7,'−7']],'605 − 247 = 358'),CHN((605,'',0),(405,'− 200',1),(365,'− 40',2),(358,'− 7',3)))]
    D['kl4-mathe-schriftlich-plus']=[S("Fehler vermeiden","Schreibe die Zahlen gerade untereinander, sonst stimmen die Stellen nicht.",COL('+',47,35,carry=False),CHN(('Einer unter Einer','',1),('Zehner unter Zehner','',1)))]
    D['kl5-mathe-million']=[S("Eine Million im Alltag","Eine Million ist sehr viel.",CHN(('1\'000','mal',0),('1\'000','=',1),('1\'000\'000','',3)),BAR2([[500000,'500 000'],[500000,'500 000']],'2 × 500\'000 = 1\'000\'000',2))]
    D['kl5-mathe-teiler-vielfache']=[S("Gemeinsame Teiler","Manche Zahlen haben dieselben Teiler.",CHN(('12','1 2 3 4 6 12',0),('18','1 2 3 6 9 18',1),('gemeinsam','1 2 3 6',3)),ARR(2,6,cap='12'),ARR(3,6,col=1,cap='18'))]
    D['kl5-mathe-brueche']=[S("Brüche in einer Menge","Auch eine Menge kannst du teilen.",EMO([['🍕',1],['🍕',1],['🍕',1],['🍕',1]],grp=0),CHN(('1/4','von 4 Stück',0),('=','',2),('1 Stück','',1)))]
    D['kl5-mathe-schriftlich-mal']=[S("Wenn die Einer über 10 gehen","Das Teilprodukt der Einer kann gross werden.",BAR2([[80,'4 × 20 = 80'],[12,'4 × 3 = 12']],'80 + 12 = 92',0),CHN(('4 × 23','',0),(92,'',3)))]
    D['kl5-mathe-flaeche']=[S("Fläche oder Umfang?","Die Fläche ist innen, der Umfang geht ringsum.",{"type":"area","c":5,"r":3,"a":5,"b":3,"la":"5 cm","lb":"3 cm"},CHN(('Fläche','5 × 3 = 15 cm²',0),('Umfang','5 + 3 + 5 + 3 = 16 cm',1)))]
    D['kl5-mathe-volumen']=[S("cm² oder cm³?","Flächen messen wir in cm², Körper in cm³.",{"type":"area","c":3,"r":3,"a":3,"b":3,"la":"3 cm","lb":"3 cm"},{"type":"quader","l":"3 cm","b":"3 cm","h":"3 cm"},CHN(('9','cm²',0),(27,'cm³',1)))]
    D['kl6-mathe-erweitern-kuerzen']=[S("Wann bist du fertig?","Du kürzt, bis Zähler und Nenner keinen gemeinsamen Teiler mehr haben.",CHN(('6/12','',0),('3/6','',0),('1/2','nicht weiter',1)))]
    D['kl6-mathe-bruch-dezimal']=[S("Nicht jeder Bruch geht auf","Bei 1/3 hört die Dezimalzahl nie auf.",PIE(3,1,'1/3'),CHN(('1/3','',0),('=','',2),('0,333…','endet nie',3)))]
    D['kl6-mathe-winkel-messen']=[S("Winkel schätzen","Vergleiche mit 90° und 45°.",{"type":"angle","deg":45,"lbl":"ca. 45°"},{"type":"angle","deg":135,"lbl":"ca. 135°"},CHN(('Halber ∟','45°',0),('∟ + halber ∟','135°',1)))]
    D['kl6-mathe-bruch-dezimal-prozent']=[S("Prozent im Alltag","Rabatt: 10 % von 200 Fr. sind 20 Fr.",BAR2([[20,'10 %'],[180,'Rest']],'200 Fr. − 20 Fr. = 180 Fr.',2),CHN(('10 %','von 200',0),('=','',2),('20 Fr.','',1)))]
    return D
