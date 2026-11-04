from ar import *
T=[]
def mal():
    t=Topic('kl2-mathe-mal-2-5-10','kl2','Operationen','Malrechnen: 2er-, 5er- und 10er-Reihe','mathe',100,seed=41)
    t.th('basis','Gleiche Gruppen','Mal heisst: gleich viele, mehrmals. 3 Gruppen mit 5 sind 3 × 5 = 15.',[['3 × 5','= 15']])
    t.th('tausch','Tauschen','Du kannst tauschen. 3 × 5 ist gleich 5 × 3.',[['3 × 5','5 × 3']])
    for f,nm in [(2,'2er'),(5,'5er'),(10,'10er')]:
        for k in range(1,11):
            e=EM[(k+f)%len(EM)]
            rows=[[e,f]]*k if f<=5 and k<=5 else None
            vis=[EMO(rows,grp=f)] if rows else None
            r=f*k
            t.card(1 if k<=6 else 2,'%d × %d = ?'%(k,f),r,wr(r,0,100,t.rnd,deltas=(f,2*f,1)),hints=['%d Gruppen mit %d.'%(k,f)],steps=[['%d × %d = %d'%(k,f,r),'Mal-Aufgabe']],vis=vis,th='basis')
    for f in (2,5,10):
        for k in (3,6,8):
            r=f*k
            t.card(2,'%d × ? = %d'%(f,r),k,wr(k,0,10,t.rnd,deltas=(1,2)),hints=['Zähle in %der-Schritten.'%f],steps=[['%d × %d = %d'%(f,k,r),'Umkehren']],th='basis')
    for q,a,b in [('Ein Huhn hat 2 Beine. Wie viele Beine haben 6 Hühner?',12,2),('Eine Hand hat 5 Finger. Wie viele Finger haben 7 Hände?',35,5),('Ein Päckli hat 10 Karten. Wie viele Karten sind in 8 Päckli?',80,10),('Ein Kind hat 2 Schuhe. Wie viele Schuhe haben 9 Kinder?',18,2),('In einer Reihe stehen 5 Stühle. Es hat 4 Reihen. Wie viele Stühle?',20,5)]:
        t.card(3,q,a,wr(a,0,100,t.rnd,deltas=(b,2*b,1)),hints=['Gleiche Gruppen: Mal-Aufgabe.'],steps=[['%d × %d = %d'%(a//b,b,a),'Mal']])
    ex=[(4,2),(7,5),(9,10),(6,2),(3,5),(8,10),(5,2),(10,5),(2,10),(9,5),(6,10),(8,2),(4,5),(7,2),(5,10),(10,2)]
    for i,(k,f) in enumerate(ex):
        r=k*f
        if i%2==0:t.exam('%d × %d = ?'%(k,f),r,wr(r,0,100,t.rnd,deltas=(f,2*f,1)),expl='%d × %d = %d'%(k,f,r))
        else:t.exam('%d × %d = ?'%(k,f),None,ans=[str(r)],expl='%d × %d = %d'%(k,f,r))
    theory_steps(t,'Mal-Aufgaben sind gleiche Gruppen. Du zählst in 2er-, 5er- und 10er-Schritten.',[EMO([['🍎',5],['🍎',5],['🍎',5]],'3 Gruppen mit 5')],
        [['mal ×','gleiche Gruppen','3 × 5'],['Faktor','Zahl, die multipliziert wird','3 und 5'],['Produkt','das Ergebnis','15'],['Reihe','alle Ergebnisse einer Zahl','2, 4, 6, 8, ...']],
        'Jede Gruppe hat gleich viele.',[EMO([['⭐',2],['⭐',2],['⭐',2],['⭐',2]],'4 × 2 = 8'),FLD(10,2,10,10,0,1,'2 Zehner: 2 × 10 = 20')],
        'Die Reihen im Überblick.',['Reihe','Die ersten 5 Ergebnisse'],[['2er','2, 4, 6, 8, 10'],['5er','5, 10, 15, 20, 25'],['10er','10, 20, 30, 40, 50']],
        'So rechnest du Mal.',[['Gruppen zählen','Wie viele Gruppen?',0],['Grösse der Gruppe','Wie viele in einer Gruppe?',1],['Reihe aufsagen','Zähle in Schritten',2]],
        [[['4 × 5','Aufgabe',0],['5, 10, 15, 20','Reihe',1],['20','Produkt',2]],[['6 × 10','Aufgabe',0],['10, 20, ... 60','Reihe',1],['60','Produkt',2]]],
        'Merke: Mal sind gleiche Gruppen.',[['Gruppen','gleich gross','3 × 5',0],['Tauschen','geht bei Mal','3 × 5 = 5 × 3',1],['Reihen','in Schritten zählen','5, 10, 15',2]])
    return t
T.append(mal)
def spiegel():
    t=Topic('kl2-mathe-symmetrie','kl2','Form und Raum','Spiegeln und Symmetrie','mathe',100,seed=42)
    t.th('basis','Spiegelachse','Eine Spiegelachse teilt eine Figur in zwei gleiche Hälften. Beide Hälften sehen gleich aus.',[['Achse','teilt in 2 gleiche Teile']])
    sym=[('kreis','v',True),('kreis','h',True),('quadrat','v',True),('quadrat','h',True),('rechteck','v',True),('rechteck','h',True),('dreieck','v',True),('dreieck','h',False),('viereck','v',False),('viereck','h',False)]
    for k,ax,ok in sym:
        for ci in (0,1):
            t.card(1,'Ist die rote Linie eine Spiegelachse?','ja' if ok else 'nein',['nein' if ok else 'ja'],hints=['Sind beide Hälften gleich?'],steps=[['ja' if ok else 'nein','Spiegelachse']],vis=[SHP(k,ci,axis=ax)])
    L1=['A','H','M','O','T','W','X','I','U','V']
    L0=['F','G','J','L','P','R','Q','S','Z','K']
    for i in range(10):
        t.card(2,'Welcher Buchstabe hat eine Spiegelachse? (%d)'%(i+1) if False else 'Welcher Buchstabe hat eine senkrechte Spiegelachse: %s, %s, %s oder %s?'%(L0[i],L0[(i+3)%10],L1[i],L0[(i+6)%10]),L1[i],[L0[i],L0[(i+3)%10],L0[(i+6)%10]],hints=['Falte den Buchstaben in der Mitte.'],steps=[[L1[i],'symmetrisch']])
    for q,a in [('Ein Schmetterling hat zwei gleiche Flügel. Ist er symmetrisch?','ja'),('Ein Herz kann man in der Mitte falten. Ist es symmetrisch?','ja'),('Ein Stern mit gleichen Zacken: symmetrisch?','ja'),('Eine Hand mit 5 Fingern von vorne: symmetrisch?','nein'),('Ein Ball ist rund. Hat er viele Spiegelachsen?','ja'),('Ein Baum mit schiefen Ästen: symmetrisch?','nein')]:
        t.card(3,q,a,['nein' if a=='ja' else 'ja'],hints=['Sind beide Seiten gleich?'],steps=[[a,'Antwort']])
    for k,ax,ok in sym[:8]:
        t.exam('Ist die rote Linie eine Spiegelachse?','ja' if ok else 'nein',['nein' if ok else 'ja'],vis=[SHP(k,2,axis=ax)],expl='ja' if ok else 'nein')
    for i in range(4):
        t.exam('Welcher Buchstabe hat eine senkrechte Spiegelachse: %s, %s, %s oder %s?'%(L0[i+3],L1[i+3],L0[i+5],L0[i]),L1[i+3],[L0[i+3],L0[i+5],L0[i]],expl=L1[i+3])
    for q,a in [('Ein Schmetterling hat zwei gleiche Flügel. Ist er symmetrisch?','ja'),('Ein Baum mit schiefen Ästen: symmetrisch?','nein'),('Ein Herz kann man in der Mitte falten. Ist es symmetrisch?','ja'),('Eine Hand mit 5 Fingern von vorne: symmetrisch?','nein')]:
        t.exam(q,a,['nein' if a=='ja' else 'ja'],expl=a)
    theory_steps(t,'Symmetrisch heisst: Beide Hälften sind gleich. Die Spiegelachse trennt sie.',[SHP('quadrat',0,axis='v'),SHP('dreieck',1,axis='v')],
        [['symmetrisch','beide Hälften sind gleich','Schmetterling'],['Spiegelachse','Linie in der Mitte','rote Linie'],['Spiegelbild','gleiches Bild auf der anderen Seite','See und Berg'],['falten','an der Achse zusammenlegen','Papier']],
        'Falte die Figur an der roten Linie. Passt alles genau?',[SHP('kreis',2,axis='h'),SHP('viereck',3,axis='v')],
        'Nicht jede Linie ist eine Achse.',['Figur','Achse in der Mitte?'],[['Quadrat','ja'],['Kreis','ja'],['Rechteck','ja'],['schiefes Viereck','nein']],
        'So prüfst du die Symmetrie.',[['Linie suchen','Gibt es eine Mitte?',0],['Falten','Beide Seiten aufeinander',1],['Prüfen','Passen sie genau?',2]],
        [[['Quadrat','Figur',0],['falten','prüfen',1],['symmetrisch','Ergebnis',2]],[['schiefes Viereck','Figur',0],['falten','prüfen',1],['nicht symmetrisch','Ergebnis',2]]],
        'Merke: Gleiche Hälften heisst symmetrisch.',[['Achse','Linie in der Mitte','rote Linie',0],['Hälften','müssen gleich sein','links = rechts',1],['Buchstaben','A, H, M, O, T','symmetrisch',2]])
    return t
T.append(spiegel)
def koerper():
    t=Topic('kl2-mathe-koerper','kl2','Form und Raum','Würfel, Quader und Kugel','mathe',100,seed=43)
    t.th('basis','Körper','Körper kann man anfassen. Der Würfel hat 6 gleiche Flächen. Die Kugel ist ganz rund.',[['Würfel','6 Flächen'],['Kugel','keine Ecken']])
    K=[('🎲','Würfel'),('⚽','Kugel'),('📦','Quader'),('🥫','Zylinder'),('🏀','Kugel'),('🧊','Würfel'),('📚','Quader'),('🎱','Kugel'),('🧃','Quader'),('🪣','Zylinder'),('🎁','Quader'),('🌍','Kugel'),('🛢️','Zylinder')]
    names=['Würfel','Kugel','Quader','Zylinder']
    for e,n in K:
        t.card(1,'Welcher Körper ist das: %s?'%e,n,[x for x in names if x!=n],hints=['Denke an Flächen und Ecken.'],steps=[[n,'Körper']])
    for k,q,a,w in [('Würfel','Wie viele Flächen hat ein Würfel?',6,[4,8,12]),('Würfel','Wie viele Ecken hat ein Würfel?',8,[6,4,12]),('Würfel','Wie viele Kanten hat ein Würfel?',12,[6,8,10]),('Quader','Wie viele Flächen hat ein Quader?',6,[4,8,12]),('Quader','Wie viele Ecken hat ein Quader?',8,[6,4,12]),('Kugel','Wie viele Ecken hat eine Kugel?',0,[1,4,8]),('Kugel','Wie viele Kanten hat eine Kugel?',0,[1,6,12]),('Kugel','Wie viele ebene Flächen hat eine Kugel?',0,[1,2,6])]:
        t.card(2,q,a,w,hints=['Stell dir den Körper vor.'],steps=[[str(a),'Anzahl']])
    for q,a in [('Was rollt gut: Würfel oder Kugel?','Kugel'),('Was kannst du gut stapeln: Würfel oder Kugel?','Würfel'),('Ein Schuhkarton ist ein ...','Quader'),('Ein Spielwürfel ist ein ...','Würfel'),('Ein Fussball ist eine ...','Kugel'),('Eine Konservendose ist ein ...','Zylinder'),('Ein Zuckerwürfel ist ein ...','Würfel'),('Ein Globus ist eine ...','Kugel'),('Eine Milchpackung ist ein ...','Quader'),('Ein Holzklotz mit 6 gleichen Flächen ist ein ...','Würfel')]:
        w=[x for x in (['Würfel','Kugel'] if 'oder' in q else names) if x!=a]
        t.card(3,q,a,w,hints=['Denke an die Form.'],steps=[[a,'Antwort']])
    for e,n in [('🎲','Würfel'),('⚽','Kugel'),('📦','Quader'),('🥫','Zylinder'),('🧊','Würfel'),('🏀','Kugel')]:
        t.exam('Welcher Körper ist das: %s?'%e,n,[x for x in names if x!=n],expl=n)
    for q,a,w in [('Wie viele Flächen hat ein Würfel?',6,[4,8,12]),('Wie viele Ecken hat ein Würfel?',8,[6,4,12]),('Wie viele Kanten hat ein Würfel?',12,[6,8,10]),('Wie viele Ecken hat eine Kugel?',0,[1,4,8])]:
        t.exam(q,None,ans=[str(a)],expl=str(a))
    for q,a in [('Was rollt gut: Würfel oder Kugel?','Kugel'),('Ein Schuhkarton ist ein ...','Quader'),('Ein Fussball ist eine ...','Kugel'),('Eine Konservendose ist ein ...','Zylinder'),('Ein Spielwürfel ist ein ...','Würfel'),('Ein Globus ist eine ...','Kugel')]:
        t.exam(q,a,[x for x in (['Würfel','Kugel'] if 'oder' in q else names) if x!=a],expl=a)
    theory_steps(t,'Körper hast du in der Hand. Sie haben Flächen, Kanten und Ecken.',[EMO([['🎲',1],['⚽',1],['📦',1],['🥫',1]],'Würfel, Kugel, Quader, Zylinder',grp=0)],
        [['Würfel','6 gleiche Flächen','Spielwürfel'],['Quader','6 Flächen, wie ein Karton','Schuhkarton'],['Kugel','ganz rund','Ball'],['Zylinder','oben und unten rund','Dose'],['Fläche · Kante · Ecke','Seite · Linie · Spitze','Würfel: 6 · 12 · 8']],
        'Betrachte jeden Körper von allen Seiten.',[EMO([['🎲',1]],'Würfel',grp=0),EMO([['⚽',1]],'Kugel',grp=0)],
        'Anzahl von Flächen, Kanten und Ecken.',['Körper','Flächen','Kanten','Ecken'],[['Würfel','6','12','8'],['Quader','6','12','8'],['Kugel','0','0','0']],
        'So erkennst du einen Körper.',[['Rund?','Dann ist es eine Kugel',0],['Flächen zählen','Wie viele Seiten?',1],['Vergleichen','Alle gleich: Würfel',2]],
        [[['rollt gut','Merkmal',0],['Kugel','Körper',1]],[['6 gleiche Flächen','Merkmal',0],['Würfel','Körper',1]]],
        'Merke: Würfel hat 6 gleiche Flächen, Kugel hat keine Ecken.',[['Würfel','6 · 12 · 8','Fläche, Kante, Ecke',0],['Kugel','rollt','keine Ecken',1],['Quader','wie ein Karton','Schuhkarton',2]])
    return t
T.append(koerper)
def meter():
    t=Topic('kl2-mathe-meter-cm','kl2','Grössen','Meter und Zentimeter','mathe',100,seed=44)
    t.th('basis','Längen messen','Kurze Längen misst du in Zentimeter (cm). Lange Längen misst du in Meter (m).',[['1 m','= 100 cm']])
    for q,a in [('Ein Bleistift ist ungefähr 15 lang. Welche Einheit passt?','cm'),('Dein Pult ist ungefähr 1 lang. Welche Einheit passt?','m'),('Ein Radiergummi ist 4 lang. Welche Einheit passt?','cm'),('Ein Klassenzimmer ist 8 lang. Welche Einheit passt?','m'),('Ein Löffel ist 20 lang. Welche Einheit passt?','cm'),('Ein Auto ist 4 lang. Welche Einheit passt?','m'),('Ein Finger ist 6 lang. Welche Einheit passt?','cm'),('Ein Seil ist 10 lang. Welche Einheit passt?','m')]:
        t.card(1,q,a,['cm' if a=='m' else 'm','km'],hints=['Kurz: cm. Lang: m.'],steps=[[a,'Einheit']])
    for a in [3,5,7,9,12,14,16,18]:
        t.card(1,'Wie lang ist der Stift? Lies die Marke.',str(a)+' cm',[str(x)+' cm' for x in wr(a,0,20,t.rnd,deltas=(1,2))],hints=['Der Stift beginnt bei 0.'],steps=[[str(a)+' cm','Länge']],vis=[NL(0,20,1,pts=[a],cap='Lineal')])
    for a,b in [(40,1),(60,1),(100,1),(90,1),(30,1),(80,1)]:
        t.card(2,'Was ist länger: %d cm oder %d m?'%(a,b),'%d m'%b if a<100 else 'gleich lang',['%d cm'%a if a<100 else '%d cm'%a,'gleich lang'] if a<100 else ['%d cm'%a,'1 m ist kürzer'],hints=['1 m sind 100 cm.'],steps=[['1 m = 100 cm','Umrechnen']])
    for a in [50,25,75,10,20,40,60,80]:
        t.card(2,'%d cm plus %d cm: Wie viele cm sind das?'%(a,a//5 if a%5==0 else a),a+a//5,wr(a+a//5,0,100,t.rnd,deltas=(1,5,10)),hints=['Rechne Plus.'],steps=[['%d + %d = %d'%(a,a//5,a+a//5),'Plus']])
    for a,b in [(30,20),(45,35),(60,40),(25,25),(50,50),(70,10)]:
        t.card(3,'Ein Band ist %d cm lang. Ein zweites ist %d cm lang. Wie viele cm sind beide zusammen?'%(a,b),a+b,wr(a+b,0,100,t.rnd,deltas=(5,10,1)),hints=['Rechne Plus.'],steps=[['%d + %d = %d'%(a,b,a+b),'Plus']])
    for a,b in [(50,20),(80,35),(100,40),(90,45)]:
        t.card(3,'Ein Seil ist %d cm lang. %d cm werden abgeschnitten. Wie viele cm bleiben?'%(a,b),a-b,wr(a-b,0,100,t.rnd,deltas=(5,10,1)),hints=['Rechne Minus.'],steps=[['%d %s %d = %d'%(a,M,b,a-b),'Minus']])
    for a in [4,8,11,15]:
        t.exam('Wie lang ist der Stift? Lies die Marke.',str(a)+' cm',[str(x)+' cm' for x in wr(a,0,20,t.rnd,deltas=(1,2))],vis=[NL(0,20,1,pts=[a],cap='Lineal')],expl='%d cm'%a)
    for q,a in [('Ein Bleistift ist ungefähr 15 lang. Welche Einheit passt?','cm'),('Ein Klassenzimmer ist 8 lang. Welche Einheit passt?','m'),('Ein Auto ist 4 lang. Welche Einheit passt?','m'),('Ein Finger ist 6 lang. Welche Einheit passt?','cm')]:
        t.exam(q,a,['cm' if a=='m' else 'm','km'],expl=a)
    t.exam('1 m sind wie viele cm?',None,ans=['100'],expl='1 m = 100 cm')
    t.exam('Was ist länger: 60 cm oder 1 m?','1 m',['60 cm','gleich lang'],expl='1 m = 100 cm')
    t.exam('Ein Auto ist 4 lang. Welche Einheit passt?','m',['cm','km'],expl='m') if False else None
    t.exam('Eine Ameise ist 5 lang. Welche Einheit passt?','mm',['m','cm'],expl='mm') if False else None
    t.exam('Ein Fahrrad ist 2 lang. Welche Einheit passt?','m',['cm','km'],expl='m')
    t.exam('Was ist länger: 40 cm oder 1 m?','1 m',['40 cm','gleich lang'],expl='1 m = 100 cm')
    for a,b in [(30,20),(45,35),(60,40)]:
        t.exam('Zwei Bänder sind %d cm und %d cm lang. Wie viele cm sind beide zusammen?'%(a,b),None,ans=[str(a+b)],expl='%d + %d = %d'%(a,b,a+b))
    t.exam('Ein Seil ist 80 cm lang. 35 cm werden abgeschnitten. Wie viele cm bleiben?',None,ans=['45'],expl='80 − 35 = 45')
    theory_steps(t,'Mit dem Lineal misst du Längen. Kurz in Zentimeter, lang in Meter.',[NL(0,20,1,pts=[12],cap='12 cm auf dem Lineal')],
        [['Zentimeter cm','kleine Längen','Radiergummi: 4 cm'],['Meter m','grosse Längen','Pult: 1 m'],['Lineal','Messgerät','20 cm lang'],['Massband','langes Messgerät','1 m = 100 cm']],
        'Lege das Lineal an die 0. Lies die Marke ab.',[NL(0,10,1,pts=[7],cap='7 cm'),NL(0,100,10,5,pts=[100],cap='1 m = 100 cm')],
        'Die Einheiten im Überblick.',['Einheit','Beispiel'],[['cm','Bleistift: 15 cm'],['m','Zimmer: 5 m'],['1 m','100 cm']],
        'So misst du richtig.',[['Bei 0 anlegen','Das Lineal beginnt bei 0',0],['Marke ablesen','Wo endet der Gegenstand?',1],['Einheit dazu','cm oder m',2]],
        [[['Stift bis 9','ablesen',0],['9 cm','Länge',1]],[['40 cm + 30 cm','plus',0],['70 cm','Länge',1]]],
        'Merke: 1 m sind 100 cm.',[['cm','kurze Längen','Bleistift',0],['m','lange Längen','Zimmer',1],['1 m','= 100 cm','nie vergessen',2]])
    return t
T.append(meter)
def uhr2():
    t=Topic('kl2-mathe-uhr-halb-viertel','kl2','Zeit','Uhrzeiten: halbe und Viertelstunden','mathe',100,seed=45)
    t.th('basis','Halb und Viertel','Wenn der lange Zeiger unten steht, ist es halb. Steht er rechts, ist es Viertel nach.',[['halb 4','3:30'],['Viertel nach 3','3:15']])
    def txt(h,m):
        n=h%12+1 if h%12!=0 else 1
        if m==0:return '%d Uhr'%h
        if m==15:return 'Viertel nach %d'%h
        if m==30:return 'halb %d'%(h%12+1)
        return 'Viertel vor %d'%(h%12+1)
    def dg(h,m):return '%d:%02d'%(h,m)
    allh=[(h,m) for h in range(1,13) for m in (0,15,30,45)]
    t.rnd.shuffle(allh)
    for h,m in allh[:20]:
        a=txt(h,m);w=list({txt(h,x) for x in (0,15,30,45)}|{txt(h%12+1,m),txt(max(1,h-1),m)}-{a})
        t.rnd.shuffle(w)
        t.card(1,'Wie spät ist es?',a,w[:3],hints=['Wo steht der lange Zeiger?'],steps=[[a,'Uhrzeit'],[dg(h,m),'digital']],vis=[CLK(h,m)])
    for h,m in allh[20:30]:
        a=dg(h,m);w=[dg(h,x) for x in (0,15,30,45) if x!=m]
        t.card(2,'Welche Uhrzeit ist das? (digital)',a,w,hints=['Stunde und Minuten.'],steps=[[a,'digital']],vis=[CLK(h,m)])
    for q,a,w in [('Der lange Zeiger steht unten. Wie viele Minuten sind es nach der vollen Stunde?','30',['15','45','0']),('Der lange Zeiger steht rechts. Wie viele Minuten sind es nach der vollen Stunde?','15',['30','45','0']),('Der lange Zeiger steht links. Wie viele Minuten sind es nach der vollen Stunde?','45',['15','30','0']),('Der lange Zeiger steht oben. Wie viele Minuten?','0',['15','30','45']),('Wie viele Minuten hat eine halbe Stunde?','30',['15','45','60']),('Wie viele Minuten hat eine Viertelstunde?','15',['30','45','10']),('Wie viele Minuten hat eine Stunde?','60',['30','100','15']),('Wie viele Viertelstunden hat eine Stunde?','4',['2','3','6'])]:
        t.card(3,q,a,w,hints=['Denke an die Uhr.'],steps=[[a,'Antwort']])
    for h,m in allh[30:36]:
        a=txt(h,m);w=list({txt(h,x) for x in (0,15,30,45)}|{txt(h%12+1,m),txt(max(1,h-1),m)}-{a});t.rnd.shuffle(w)
        t.exam('Wie spät ist es?',a,w[:3],vis=[CLK(h,m)],expl=a)
    for h,m in allh[36:42]:
        t.exam('Welche Uhrzeit ist das? (digital)',dg(h,m),[dg(h,x) for x in (0,15,30,45) if x!=m],vis=[CLK(h,m)],expl=dg(h,m))
    for q,a in [('Wie viele Minuten hat eine halbe Stunde?','30'),('Wie viele Minuten hat eine Viertelstunde?','15'),('Wie viele Minuten hat eine Stunde?','60'),('Wie viele Viertelstunden hat eine Stunde?','4')]:
        t.exam(q,None,ans=[a],expl=a)
    theory_steps(t,'Die Uhr zeigt auch halbe und Viertelstunden. Der lange Zeiger sagt es.',[CLK(3,30,'halb 4 = 3:30'),CLK(3,15,'Viertel nach 3 = 3:15')],
        [['Viertel nach','langer Zeiger rechts (3)','15 Minuten'],['halb','langer Zeiger unten (6)','30 Minuten'],['Viertel vor','langer Zeiger links (9)','45 Minuten'],['Minute','kleine Zeit','60 in 1 Stunde']],
        'Lies zuerst den langen, dann den kurzen Zeiger.',[CLK(5,45,'Viertel vor 6 = 5:45'),CLK(8,0,'8 Uhr')],
        'Der lange Zeiger sagt die Minuten.',['Zeiger oben','Zeiger rechts','Zeiger unten','Zeiger links'],[['ganz','Viertel nach','halb','Viertel vor'],['0 Min.','15 Min.','30 Min.','45 Min.']],
        'So liest du die Uhrzeit.',[['Langer Zeiger','Oben, rechts, unten, links?',0],['Kurzer Zeiger','Welche Stunde?',1],['Sagen','halb, Viertel nach, Viertel vor',2]],
        [[['lang unten','30 Min.',0],['kurz bei 3 bis 4','Stunde',1],['halb 4','Uhrzeit',2]],[['lang rechts','15 Min.',0],['kurz bei 7','Stunde',1],['Viertel nach 7','Uhrzeit',2]]],
        'Merke: Halb ist 30, Viertel ist 15.',[['Viertel nach','15 Minuten','3:15',0],['halb','30 Minuten','3:30 = halb 4',1],['Viertel vor','45 Minuten','3:45',2]])
    return t
T.append(uhr2)
