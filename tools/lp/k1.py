from core import *
EM=['🍎','🐟','⭐','🎈','🍓','🐞','🍪','🌸','🐥','🚗']
def near(a,lo,hi,rnd,k=3):
    c=[x for x in range(max(lo,a-3),min(hi,a+3)+1) if x!=a]
    rnd.shuffle(c);return c[:k]
def FAR(a,lo,hi,rnd,k=3):
    c=[x for x in range(lo,hi+1) if x!=a];rnd.shuffle(c);return c[:k]
def ok_wrong(t,a,lo=0):
    return near(a,lo,t.hi,t.rnd)
T=[]
# ---------------- Zahlen 1 bis 10 ----------------
def k1_zahlen10():
    t=Topic('kl1-mathe-zahlen10','kl1','Zahlen und Mengen','Zahlen von 1 bis 10','mathe',10,seed=11)
    t.th('basis','Zahlen bis 10','Jede Zahl zeigt, wie viele es sind. Die Zahlen gehen immer eins weiter.',[['3','= 3 Punkte'],['7','= 7 Punkte']])
    t.th('nach','Vorher und nachher','Nach der 4 kommt die 5. Vor der 4 kommt die 3.',[['3','4','5']])
    t.th('zerl','Zahlen zerlegen','Eine Zahl kann in zwei Teile zerlegt werden. 7 ist 3 und 4.',[['7','= 3 + 4']])
    for i,n in enumerate(range(1,11)):
        e=EM[i%len(EM)]
        t.card(1,'Wie viele %s siehst du?'%e,n,near(n,1,10,t.rnd),hints=['Zähle jedes Bild einmal.'],steps=[[str(n),'Anzahl'] ],vis=[EMO([[e,n]])],th='basis')
    for n in range(1,10):
        t.card(1,'Welche Zahl kommt nach der %d?'%n,n+1,[x for x in near(n+1,1,10,t.rnd)],hints=['Zähle weiter: %d, ...'%n],steps=[[str(n+1),'eins mehr']],th='nach')
    for n in range(2,11):
        t.card(1,'Welche Zahl kommt vor der %d?'%n,n-1,near(n-1,1,10,t.rnd),hints=['Zähle zurück.'],steps=[[str(n-1),'eins weniger']],th='nach')
    for a in range(1,9):
        t.card(2,'Welche Zahl fehlt? %d, ___, %d'%(a,a+2),a+1,near(a+1,1,10,t.rnd),hints=['Die Zahl liegt in der Mitte.'],steps=[[str(a+1),'dazwischen']],th='nach')
    for n,a in [(5,2),(6,4),(7,3),(8,5),(9,6),(10,4),(4,1),(10,7),(9,2),(8,3)]:
        t.card(3,'%d Punkte sind es. %d Punkte sind rot, der Rest ist blau. Wie viele sind blau?'%(n,a),n-a,near(n-a,0,10,t.rnd),hints=['Zerlege die Zahl.'],steps=[['%d = %d + %d'%(n,a,n-a),'Zerlegen']],vis=[FLD(5,2,a,n-a,0,1)],th='zerl')
    ex=lambda *a,**k:t.exam(*a,**k)
    for i,n in enumerate([3,5,7,9,4,8]):
        e=EM[(i+2)%len(EM)]
        ex('Wie viele %s siehst du?'%e,n,near(n,1,10,t.rnd),vis=[EMO([[e,n]])],expl='Zählen: %d'%n)
    for n in [4,7,2,9]:
        ex('Welche Zahl kommt nach der %d?'%n,n+1,near(n+1,1,10,t.rnd),expl='%d kommt nach %d'%(n+1,n))
    for n in [6,3,10]:
        ex('Welche Zahl kommt vor der %d?'%n,n-1,near(n-1,1,10,t.rnd),expl='%d kommt vor %d'%(n-1,n))
    for a in [3,6,1]:
        ex('Welche Zahl fehlt? %d, ___, %d'%(a,a+2),None,ans=[str(a+1)],expl='%d liegt in der Mitte'%(a+1))
    theory_steps(t,'Zahlen zeigen dir, wie viele es sind.',[EMO([['🍎',3]],'3 Äpfel')],
        [['Zahl','sagt, wie viele es sind','5'],['Menge','viele Dinge zusammen','5 Sterne'],['Vorgänger','die Zahl davor','vor 5: 4'],['Nachfolger','die Zahl danach','nach 5: 6'],['Zerlegen','eine Zahl in zwei Teile teilen','7 = 3 + 4']],
        'Schau genau hin und zähle.',[EMO([['⭐',6]],'6 Sterne'),FLD(5,2,6,0,0,None,'Zehnerfeld')],
        'Die Zahlen gehen der Reihe nach.',['Zahl','Punkte','Nachbarn'],[['1','1 Punkt','0 und 2'],['5','5 Punkte','4 und 6'],['10','10 Punkte','9 und 11']] if False else [['1','1 Punkt'],['2','2 Punkte'],['5','5 Punkte'],['10','10 Punkte']],
        'So findest du die Antwort.',[['Hinschauen','Was siehst du?',0],['Zählen','Jedes Ding einmal',1],['Zahl sagen','So viele sind es',2]],
        [[['4','Zahl',0],['4 Bilder','Menge',1]],[['5','Zahl',0],['6','Nachfolger',2]]],
        'Merke: Eine Zahl sagt, wie viele es sind.',[['Zählen','jedes Ding einmal','4 Äpfel',0],['Nachfolger','eins mehr','5, dann 6',1],['Vorgänger','eins weniger','5, davor 4',2],['Zerlegen','in zwei Teile','7 = 3 + 4',3]])
    return t
T.append(k1_zahlen10)
# ---------------- Zahlen 1 bis 20 ----------------
def k1_zahlen20():
    t=Topic('kl1-mathe-zahlen20','kl1','Zahlen und Mengen','Zahlen von 1 bis 20','mathe',20,seed=12)
    t.th('basis','Zahlen bis 20','Zehn Punkte sind ein Zehner. Dazu kommen die Einer.',[['13','= 1 Zehner und 3 Einer']])
    t.th('nach','Vorher und nachher','Nach der 15 kommt die 16. Vor der 15 kommt die 14.',[['14','15','16']])
    for n in range(11,21):
        t.card(1,'Wie viele Punkte sind gefärbt?',n,near(n,1,20,t.rnd),hints=['Ein Zehner sind zehn Punkte. Zähle den Rest.'],steps=[['%d'%n,'Anzahl']],vis=[FLD(10,2,n)],th='basis')
    for n in range(11,20):
        t.card(1,'Welche Zahl kommt nach der %d?'%n,n+1,near(n+1,1,20,t.rnd),hints=['Zähle weiter.'],steps=[[str(n+1),'eins mehr']],th='nach')
    for n in range(12,20):
        t.card(1,'Welche Zahl kommt vor der %d?'%n,n-1,near(n-1,1,20,t.rnd),hints=['Zähle zurück.'],steps=[[str(n-1),'eins weniger']],th='nach')
    for n in range(11,20):
        t.card(2,'%d ist 1 Zehner und wie viele Einer?'%n,n-10,near(n-10,0,9,t.rnd),hints=['Nimm den Zehner weg.'],steps=[['%d = 10 + %d'%(n,n-10),'Zehner und Einer']],vis=[FLD(10,2,10,n-10,0,1)],th='basis')
    for e in range(1,10):
        t.card(2,'Welche Zahl ist 1 Zehner und %d Einer?'%e,10+e,near(10+e,10,20,t.rnd),hints=['Zehn und noch mehr.'],steps=[['10 + %d = %d'%(e,10+e),'Zehner und Einer']],th='basis')
    for a in [11,12,13,14,15,16,17]:
        t.card(3,'Welche Zahl fehlt? %d, ___, %d, %d'%(a,a+2,a+3),a+1,near(a+1,10,20,t.rnd),hints=['Zähle der Reihe nach.'],steps=[[str(a+1),'dazwischen']],th='nach')
    ex=lambda *a,**k:t.exam(*a,**k)
    for n in [12,15,17,19,13,20]:
        ex('Wie viele Punkte sind gefärbt?',n,near(n,1,20,t.rnd),vis=[FLD(10,2,n)],expl='%d Punkte'%n)
    for n in [13,17,19,11,15]:ex('Welche Zahl kommt nach der %d?'%n,n+1,near(n+1,10,20,t.rnd),expl='%d'%(n+1))
    for n in [12,16,20,14,18]:ex('Welche Zahl kommt vor der %d?'%n,n-1,near(n-1,10,20,t.rnd),expl='%d'%(n-1))
    for n in [14,18]:ex('%d ist 1 Zehner und wie viele Einer?'%n,None,ans=[str(n-10)],expl='%d = 10 + %d'%(n,n-10))
    ex('Welche Zahl ist 1 Zehner und 6 Einer?',16,near(16,10,20,t.rnd),expl='10 + 6 = 16')
    ex('Welche Zahl fehlt? 15, ___, 17',None,ans=['16'],expl='16')
    ex('Welche Zahl ist 1 Zehner und 9 Einer?',19,near(19,10,20,t.rnd),expl='10 + 9 = 19')
    theory_steps(t,'Nach der 10 geht es weiter bis 20. Ein Zehner und dazu Einer.',[FLD(10,2,13,0,0,None,'13 Punkte')],
        [['Zehner','zehn Punkte zusammen','10'],['Einer','die Punkte, die übrig sind','3 in 13'],['Zehnerfeld','zeigt die Punkte in Reihen','2 Reihen'],['Nachfolger','die Zahl danach','nach 15: 16']],
        'Eine volle Reihe sind zehn. Der Rest sind Einer.',[FLD(10,2,16,0,0,None,'16 = 1 Zehner und 6 Einer')],
        'Jede Zahl von 11 bis 19 hat 1 Zehner und Einer.',['Zahl','Zehner und Einer'],[['11','10 + 1'],['14','10 + 4'],['17','10 + 7'],['20','2 Zehner']],
        'So findest du die Zahl.',[['Volle Reihe zählen','Das ist 1 Zehner',0],['Rest zählen','Das sind die Einer',1],['Zusammen sagen','Zehner und Einer',2]],
        [[['12','Zahl',0],['10 + 2','Zehner und Einer',1]],[['18','Zahl',0],['10 + 8','Zehner und Einer',1]]],
        'Merke: 1 Zehner sind zehn Einer.',[['Zehner','zehn Punkte','10',0],['Einer','der Rest','3 in 13',1],['Nachfolger','eins mehr','15, dann 16',2],['Vorgänger','eins weniger','15, davor 14',3]])
    return t
T.append(k1_zahlen20)
# ---------------- Mengen vergleichen ----------------
def k1_vergleichen():
    t=Topic('kl1-mathe-vergleichen','kl1','Zahlen und Mengen','Mengen vergleichen','mathe',10,seed=13)
    t.th('basis','Mengen vergleichen','Wo sind mehr? Wo sind weniger? Oder gleich viele?',[['7 > 5','7 ist mehr als 5'],['3 < 6','3 ist weniger als 6'],['4 = 4','gleich viele']])
    pairs=[(7,4),(3,8),(5,5),(9,6),(2,6),(6,6),(8,3),(4,9),(10,7),(1,5),(7,7),(5,9),(8,8),(3,2),(6,10),(4,1),(9,9),(2,8),(7,10),(5,2),(1,1),(6,3),(10,4)]
    for i,(a,b) in enumerate(pairs):
        e1,e2=EM[i%len(EM)],EM[(i+3+i//len(EM))%len(EM)]
        ans='oben' if a>b else 'unten' if b>a else 'gleich viele'
        t.card(1,'Wo hat es mehr: %s oder %s?'%(e1,e2),ans,['oben','unten','gleich viele'],hints=['Zähle oben und unten. Vergleiche.'],steps=[['%d und %d'%(a,b),'oben und unten']],vis=[EMO([[e1,a],[e2,b]])],th='basis')
        ans2='unten' if a>b else 'oben' if b>a else 'gleich viele'
        if True:t.card(2,'Wo hat es weniger: %s oder %s?'%(e1,e2),ans2,['oben','unten','gleich viele'],hints=['Wo ist die Reihe kürzer?'],steps=[['%d und %d'%(a,b),'oben und unten']],vis=[EMO([[e1,a],[e2,b]])],th='basis')
    for a,b in [(7,5),(3,6),(4,4),(9,2),(1,8),(6,6),(10,9),(2,7),(5,3),(8,8),(3,9),(7,6)]:
        s='>' if a>b else '<' if a<b else '='
        t.card(2,'Setze das Zeichen: %d ○ %d'%(a,b),s,['<','>','='],hints=['Die Spitze zeigt zur kleinen Zahl.'],steps=[['%d %s %d'%(a,s,b),'Zeichen']],th='basis')
    for a,b in [(6,9),(4,2),(8,5),(3,7),(10,6),(1,4)]:
        t.card(3,'Welche Zahl ist grösser: %d oder %d?'%(a,b),max(a,b),[min(a,b)],hints=['Die grössere Zahl kommt später beim Zählen.'],steps=[[str(max(a,b)),'grösser']],th='basis')
    ex=lambda *a,**k:t.exam(*a,**k)
    for i,(a,b) in enumerate([(6,3),(4,8),(5,5),(9,7),(2,5),(8,8),(3,9),(10,6)]):
        e1,e2=EM[(i+1)%len(EM)],EM[(i+5)%len(EM)]
        ex('Wo hat es mehr: %s oder %s?'%(e1,e2),'oben' if a>b else 'unten' if b>a else 'gleich viele',['oben','unten','gleich viele'],vis=[EMO([[e1,a],[e2,b]])],expl='%d und %d'%(a,b))
    for a,b in [(7,3),(2,9),(6,6),(8,4),(1,5),(10,10),(9,3),(4,7)]:
        s='>' if a>b else '<' if a<b else '='
        ex('Setze das Zeichen: %d ○ %d'%(a,b),s,['<','>','='],expl='%d %s %d'%(a,s,b))
    for a,b in [(5,8),(9,4),(3,6),(7,2)]:
        ex('Welche Zahl ist kleiner: %d oder %d?'%(a,b),min(a,b),[max(a,b)],expl=str(min(a,b)))
    theory_steps(t,'Wir schauen: Wo hat es mehr, weniger oder gleich viele?',[EMO([['🍎',5],['🍎',3]],'oben mehr, unten weniger')],
        [['mehr','die längere Reihe','5 ist mehr als 3'],['weniger','die kürzere Reihe','3 ist weniger als 5'],['gleich viele','beide Reihen sind gleich lang','4 und 4'],['>','links ist mehr','7 > 5'],['<','links ist weniger','3 < 6'],['=','gleich viele','4 = 4']],
        'Lege die Dinge Paar für Paar nebeneinander.',[EMO([['🐟',6],['⭐',4]],'oben sind mehr')],
        'Das Zeichen zeigt mit der Spitze zur kleinen Zahl.',['Zeichen','Bedeutung'],[['7 > 5','7 ist mehr'],['3 < 6','3 ist weniger'],['4 = 4','gleich viele']],
        'So vergleichst du.',[['Oben zählen','Wie viele?',0],['Unten zählen','Wie viele?',1],['Vergleichen','Welche Zahl ist grösser?',2]],
        [[['7','oben',0],['4','unten',1],['7 > 4','oben mehr',2]],[['3','oben',0],['8','unten',1],['3 < 8','oben weniger',2]]],
        'Merke: Die Spitze zeigt zur kleinen Zahl.',[['mehr','>','7 > 5',0],['weniger','<','3 < 6',1],['gleich','=','4 = 4',2]])
    return t
T.append(k1_vergleichen)
# ---------------- Verdoppeln und Halbieren ----------------
def k1_doppelt():
    t=Topic('kl1-mathe-doppelt-halb','kl1','Zahlen und Mengen','Verdoppeln und Halbieren','mathe',10,seed=14)
    t.th('basis','Verdoppeln','Verdoppeln heisst: zweimal gleich viele. 3 und 3 sind 6.',[['3 + 3','= 6']])
    t.th('halb','Halbieren','Halbieren heisst: in zwei gleiche Teile teilen. Die Hälfte von 8 ist 4.',[['8','4 und 4']])
    for i,n in enumerate(range(1,6)):
        e=EM[i]
        t.card(1,'Verdopple die Zahl %d.'%n,2*n,near(2*n,1,10,t.rnd),hints=['Zweimal gleich viele.'],steps=[['%d + %d = %d'%(n,n,2*n),'Doppelte']],vis=[EMO([[e,n],[e,n]])],th='basis')
        t.card(1,'%d + %d = ?'%(n,n),2*n,near(2*n,1,10,t.rnd),hints=['Das ist das Doppelte.'],steps=[['%d + %d = %d'%(n,n,2*n),'Doppelte']],th='basis')
        t.card(2,'Das Doppelte von %d ist ?'%n,2*n,near(2*n,1,10,t.rnd),hints=['Zweimal %d.'%n],steps=[['%d'%(2*n),'Doppelte']],th='basis')
        t.card(2,'Das Doppelte von ? ist %d.'%(2*n),n,near(n,1,5,t.rnd),hints=['Welche Zahl und die gleiche Zahl ergeben %d?'%(2*n)],steps=[['%d + %d = %d'%(n,n,2*n),'Umkehren']],th='basis')
    for i,n in enumerate(range(2,11,2)):
        e=EM[i+3]
        t.card(1,'Halbiere die Zahl %d.'%n,n//2,near(n//2,1,5,t.rnd),hints=['Teile in zwei gleiche Teile.'],steps=[['%d = %d + %d'%(n,n//2,n//2),'Hälfte']],vis=[EMO([[e,n//2],[e,n//2]],grp=0)],th='halb')
        t.card(2,'Die Hälfte von %d ist ?'%n,n//2,near(n//2,1,5,t.rnd),hints=['Zwei gleiche Teile.'],steps=[[str(n//2),'Hälfte']],th='halb')
        t.card(2,'%d + ? = %d. Welche Zahl fehlt?'%(n//2,n),n//2,near(n//2,1,5,t.rnd),hints=['Gleich viele.'],steps=[['%d + %d = %d'%(n//2,n//2,n),'Hälfte']],th='halb')
        t.card(3,'Stimmt das? Die Hälfte von %d ist %d.'%(n,n//2),'ja',['nein'],hints=['Rechne zurück: %d + %d.'%(n//2,n//2)],steps=[['ja','richtig']],th='halb')
        w=n//2+1
        t.card(3,'Stimmt das? Die Hälfte von %d ist %d.'%(n,w),'nein',['ja'],hints=['Rechne zurück: %d + %d.'%(w,w)],steps=[['nein','falsch']],th='halb')
    ex=lambda *a,**k:t.exam(*a,**k)
    for n in [2,4,3,5]:ex('Verdopple die Zahl %d.'%n,2*n,near(2*n,1,10,t.rnd),expl='%d + %d = %d'%(n,n,2*n))
    for n in [1,3,5,4]:ex('%d + %d = ?'%(n,n),None,ans=[str(2*n)],expl='Doppelte')
    for n in [4,8,10,6]:ex('Halbiere die Zahl %d.'%n,n//2,near(n//2,1,5,t.rnd),expl='Hälfte von %d ist %d'%(n,n//2))
    for n in [6,10]:ex('Das Doppelte von ? ist %d.'%n,None,ans=[str(n//2)],expl='%d + %d = %d'%(n//2,n//2,n))
    for n in [2,8]:ex('Die Hälfte von %d ist ?'%n,None,ans=[str(n//2)],expl='Hälfte')
    theory_steps(t,'Verdoppeln: zweimal gleich viele. Halbieren: zwei gleiche Teile.',[EMO([['🍎',3],['🍎',3]],'3 und 3'),],
        [['verdoppeln','zweimal gleich viele','3 + 3 = 6'],['das Doppelte','das Ergebnis vom Verdoppeln','Doppelte von 4: 8'],['halbieren','in zwei gleiche Teile teilen','8: 4 und 4'],['die Hälfte','ein gleicher Teil','Hälfte von 10: 5']],
        'Oben verdoppelst du, unten halbierst du.',[EMO([['⭐',4],['⭐',4]],'4 + 4 = 8'),EMO([['🐟',5],['🐟',5]],'Hälfte von 10 ist 5',grp=0)],
        'Verdoppeln und Halbieren gehören zusammen.',['Zahl','Doppelte'],[['1','2'],['2','4'],['3','6'],['4','8'],['5','10']],
        'So rechnest du.',[['Verdoppeln','Zahl + dieselbe Zahl',0],['Halbieren','Welche Zahl + dieselbe Zahl gibt es?',1],['Prüfen','Rechne zurück',2]],
        [[['4','Zahl',0],['4 + 4','verdoppeln',1],['8','Ergebnis',2]],[['10','Zahl',0],['5 + 5','halbieren',1],['5','Hälfte',2]]],
        'Merke: Verdoppeln ist Plus mit sich selbst.',[['Doppelte','Zahl + Zahl','3 + 3 = 6',0],['Hälfte','zwei gleiche Teile','8: 4 und 4',1]])
    return t
T.append(k1_doppelt)
