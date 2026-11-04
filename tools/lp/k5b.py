from ar import *
T=[]
def mulw():
    t=Topic('kl5-mathe-schriftlich-mal','kl5','Schriftliche Multiplikation/Division','Schriftlich multiplizieren','mathe',100,seed=75)
    t.th('basis','Zerlegen und malnehmen','Zerlege die grosse Zahl in Zehner und Einer. Multipliziere beide Teile einzeln. Dann addierst du.',[['23 × 4','20 × 4 = 80, 3 × 4 = 12, 80 + 12 = 92']])
    R=t.rnd
    P=[(a,b) for a in range(11,50) for b in range(2,10) if a*b<=100];R.shuffle(P)
    def st(a,b):
        z,e=a//10*10,a%10
        return [['Z: %d × %d = %d'%(z,b,z*b),'Zehner'],['E: %d × %d = %d'%(e,b,e*b),'Einer'],['%d + %d = %d'%(z*b,e*b,a*b),'Zusammen']]
    for a,b in P[:12]:
        t.card(1,'%d × %d = ?'%(a,b),a*b,wr(a*b,0,100,R,deltas=(b,10,1)),hints=['Zehner und Einer einzeln.'],steps=st(a,b),th='basis')
    for a,b in P[12:24]:
        t.card(2,'%d × %d = ?'%(a,b),a*b,wr(a*b,0,100,R,deltas=(b,10,1)),hints=['Zerlegen und addieren.'],steps=st(a,b),th='basis')
    for a,b in P[24:30]:
        r=a*b;t.card(2,'Wie viel ist der Einer-Teil bei %d × %d? (Einer mal %d)'%(a,b,b),(a%10)*b,wr((a%10)*b,0,100,R,deltas=(1,2,b)),hints=['Nur die Einer-Ziffer malnehmen.'],steps=[['%d × %d = %d'%(a%10,b,(a%10)*b),'Einer-Teil']],th='basis')
    for (a,b),i in zip(P[30:36],range(6)):
        n=NAMES[i];t.card(3,'%s kauft %d Packungen mit je %d Karten. Wie viele Karten sind das?'%(n,b,a),a*b,wr(a*b,0,100,R,deltas=(b,10,1)),hints=['Mal-Aufgabe.'],steps=st(a,b),th='basis')
    for a,b in P[36:52]:
        if len(t.qs)>=16:break
        if len(t.qs)%2==0:t.exam('%d × %d = ?'%(a,b),a*b,wr(a*b,0,100,R,deltas=(b,10,1)),expl='%d × %d = %d'%(a,b,a*b))
        else:t.exam('%d × %d = ?'%(a,b),None,ans=[str(a*b)],expl='%d × %d = %d'%(a,b,a*b))
    theory_steps(t,'Beim schriftlichen Multiplizieren teilst du die Aufgabe in kleine Schritte.',[TBL(['','Z','E'],[['23 × 4','20 × 4 = 80','3 × 4 = 12']],None)],
        [['Faktor','Zahl, die du malnimmst','23 und 4'],['Produkt','Ergebnis','92'],['Teilprodukt','Ergebnis eines Schritts','80 und 12'],['zerlegen','in Zehner und Einer','23 = 20 + 3']],
        'Jeder Teil wird einzeln mit dem Faktor multipliziert.',[TBL(['Teil','Rechnung','Teilprodukt'],[['Zehner','20 × 4','80'],['Einer','3 × 4','12']],None)],
        'Danach addierst du die Teilprodukte.',['Schritt','23 × 4'],[['Zehner','20 × 4 = 80'],['Einer','3 × 4 = 12'],['Summe','80 + 12 = 92']],
        'So multiplizierst du schriftlich.',[['Zerlegen','Grosse Zahl in Z und E',0],['Zehner mal','Zehner mal Faktor',1],['Einer mal','Einer mal Faktor',2],['Addieren','Teilprodukte zusammen',3]],
        [[['34 × 2','Aufgabe',0],['30 × 2 = 60','Zehner',1],['4 × 2 = 8','Einer',2],['68','Produkt',3]],[['16 × 5','Aufgabe',0],['10 × 5 = 50','Zehner',1],['6 × 5 = 30','Einer',2],['80','Produkt',3]]],
        'Merke: Zerlegen, malnehmen, addieren.',[['Zerlegen','Z und E trennen','23 = 20 + 3',0],['Teilprodukte','einzeln rechnen','80 und 12',1],['Addieren','am Schluss','80 + 12 = 92',2]])
    return t
T.append(mulw)
def divw():
    t=Topic('kl5-mathe-schriftlich-durch','kl5','Schriftliche Multiplikation/Division','Schriftlich dividieren','mathe',100,seed=76)
    t.th('basis','Stellenweise teilen','Teile zuerst die Zehner, dann die Einer. Der Rest wandert zu den Einern.',[['84 : 4','8 : 4 = 2, 4 : 4 = 1, also 21']])
    R=t.rnd
    P=[];Q=[]
    for d in range(2,10):
        for a in range(10*d,100):
            (P if a%d==0 else Q).append((a,d))
    R.shuffle(P);R.shuffle(Q)
    def st(a,d):
        x,y=a//10,a%10;q1,r1=divmod(x,d);z=10*r1+y;q2,r2=divmod(z,d)
        s=[['Z: %d : %d = %d, Rest %d'%(x,d,q1,r1),'Zehner'],['E: %d : %d = %d%s'%(z,d,q2,' Rest %d'%r2 if r2 else ''),'Einer'],['%d : %d = %d%s'%(a,d,q1*10+q2,' Rest %d'%r2 if r2 else ''),'Ergebnis']]
        return s
    def ans(a,d):
        q,r=divmod(a,d);return str(q) if r==0 else '%d Rest %d'%(q,r)
    for a,d in P[:12]:
        t.card(1,'%d : %d = ?'%(a,d),ans(a,d),[str(a//d+k) for k in (1,2,-1) if a//d+k>0],hints=['Zehner, dann Einer.'],steps=st(a,d),th='basis')
    for a,d in Q[:12]:
        r=ans(a,d);q=a//d;rr=a%d
        t.card(2,'%d : %d = ?'%(a,d),r,['%d Rest %d'%(q,(rr+1)%d or 1),'%d Rest %d'%(q+1,rr),str(q)],hints=['Es bleibt ein Rest.'],steps=st(a,d),th='basis')
    for a,d in P[12:18]:
        t.card(2,'%d × ? = %d'%(d,a),a//d,wr(a//d,0,100,R,deltas=(1,2,10)),hints=['Teilen ist Mal rückwärts.'],steps=[['%d : %d = %d'%(a,d,a//d),'Umkehren']],th='basis')
    for (a,d),i in zip(P[18:24],range(6)):
        t.card(3,'%d Karten werden gerecht auf %d Kinder verteilt. Wie viele Karten bekommt jedes?'%(a,d),a//d,wr(a//d,0,100,R,deltas=(1,2,10)),hints=['Durch die Anzahl teilen.'],steps=st(a,d),th='basis')
    for a,d in Q[12:16]:
        t.card(3,'%d Stifte kommen in Schachteln zu je %d. Wie viele volle Schachteln gibt es?'%(a,d),a//d,wr(a//d,0,100,R,deltas=(1,2,10)),hints=['Der Rest ist keine volle Schachtel.'],steps=st(a,d),th='basis')
    for a,d in P[24:34]:
        if len(t.qs)>=9:break
        t.exam('%d : %d = ?'%(a,d),a//d,[str(a//d+k) for k in (1,2,-1) if a//d+k>0],expl='%d : %d = %d'%(a,d,a//d))
    for a,d in P[34:40]:
        if len(t.qs)>=13:break
        t.exam('%d : %d = ?'%(a,d),None,ans=[str(a//d)],expl='%d : %d = %d'%(a,d,a//d))
    for a,d in Q[16:24]:
        if len(t.qs)>=16:break
        q=a//d;rr=a%d
        t.exam('%d : %d = ? (mit Rest)'%(a,d),ans(a,d),['%d Rest %d'%(q,(rr+1)%d or 1),'%d Rest %d'%(q+1,rr),str(q)],expl=ans(a,d))
    theory_steps(t,'Beim schriftlichen Dividieren teilst du Stelle für Stelle von links nach rechts.',[TBL(['Schritt','84 : 4'],[['Zehner','8 : 4 = 2'],['Einer','4 : 4 = 1'],['Ergebnis','21']],None)],
        [['Dividend','Zahl, die geteilt wird','84'],['Divisor','Zahl, durch die geteilt wird','4'],['Quotient','Ergebnis','21'],['Rest','was übrig bleibt','85 : 4 = 21 Rest 1']],
        'Teile erst die Zehner. Den Rest nimmst du zu den Einern.',[TBL(['Schritt','85 : 4'],[['Z: 8 : 4','2, Rest 0'],['E: 5 : 4','1, Rest 1'],['Ergebnis','21 Rest 1']],None)],
        'Die Probe prüft das Ergebnis.',['Probe','Rechnung'],[['mal','21 × 4 = 84'],['plus Rest','84 + 1 = 85']],
        'So dividierst du schriftlich.',[['Zehner teilen','Zehner-Ziffer durch Divisor',0],['Rest notieren','Was bleibt übrig?',1],['Einer dazu','Rest und Einer zusammen',2],['Probe','Mal und Rest',3]],
        [[['96 : 4','Aufgabe',0],['9 : 4 = 2, Rest 1','Zehner',1],['16 : 4 = 4','Einer',2],['24','Ergebnis',3]],[['75 : 6','Aufgabe',0],['7 : 6 = 1, Rest 1','Zehner',1],['15 : 6 = 2, Rest 3','Einer',2],['12 Rest 3','Ergebnis',3]]],
        'Merke: Zehner teilen, Rest mitnehmen, Einer teilen.',[['Rest','zu den Einern','Rest 1, 5 → 15',0],['Probe','Mal und Plus Rest','21 × 4 + 1 = 85',1],['Umkehren','Teilen ist Mal rückwärts','84 : 4, 21 × 4',2]])
    return t
T.append(divw)
def dez():
    t=Topic('kl5-mathe-dezimalzahlen','kl5','Schriftliche Multiplikation/Division','Einführung Dezimalzahlen','mathe',100,seed=77)
    t.th('basis','Kommazahlen','Eine Kommazahl hat ein Komma. Links stehen die Ganzen, rechts die Zehntel und Hundertstel.',[['3,5','3 Ganze und 5 Zehntel']])
    t.th('geld','Franken und Rappen','Franken und Rappen sind Kommazahlen. 3 Franken 50 sind 3,50 Franken.',[['3,50 Fr.','3 Franken, 50 Rappen']])
    R=t.rnd
    c=lambda x:str(x).replace('.',',')
    def fz(g,z):return '%d,%d'%(g,z)
    for g,z in [(3,5),(7,2),(12,8),(4,1),(9,6),(15,3),(2,9),(20,4)]:
        t.card(1,'%d Ganze und %d Zehntel: Wie schreibst du das als Kommazahl?'%(g,z),fz(g,z),[fz(z,g),'%d,%02d'%(g,z),fz(g,z+1)],hints=['Ganze vor, Zehntel nach dem Komma.'],steps=[[fz(g,z),'Kommazahl']],th='basis')
    for g,r in [(3,50),(5,20),(2,75),(8,5),(12,40),(1,25),(6,90),(4,10)]:
        a='%d,%02d'%(g,r);t.card(1,'%d Franken %d Rappen: Wie schreibst du das als Kommazahl?'%(g,r),a,['%d,%02d'%(g+1,r),'%d,%d'%(g,r%10 if r>=10 else r*10+1),'%d,%02d'%(g,(r+10)%100)],hints=['Rappen haben zwei Stellen nach dem Komma.'],steps=[[a,'Kommazahl']],th='geld')
    for x in ['4,73','8,25','12,9','0,6','17,48','5,01']:
        i=x.index(',')
        zt=x[i+1]
        t.card(2,'%s: Welche Ziffer steht bei den Zehnteln?'%x,zt,[d for d in '0123456789' if d!=zt][:3],hints=['Die erste Ziffer nach dem Komma.'],steps=[[zt,'Zehntel']],th='basis')
    for a,b in [('0,7','0,65'),('2,5','2,35'),('3,04','3,4'),('1,9','1,89'),('0,3','0,30'),('6,5','6,05')]:
        fa,fb=float(a.replace(',','.')),float(b.replace(',','.'))
        s='>' if fa>fb else '<' if fa<fb else '='
        t.card(2,'Setze das Zeichen: %s ○ %s'%(a,b),s,[x for x in '<>=' if x!=s],hints=['Fülle mit Nullen auf: gleich viele Stellen.'],steps=[['%s %s %s'%(a,s,b),'Vergleichen']],th='basis')
    for a,b in [(2.5,1.3),(4.2,3.6),(1.75,2.25),(5.5,0.5),(3.4,2.8),(6.25,1.5)]:
        r=round(a+b,2);t.card(3,'%s + %s = ?'%(c(a),c(b)),c(r),[c(round(r+0.1,2)),c(round(r-0.1,2)),c(round(r+1,2))],hints=['Komma unter Komma.'],steps=[['%s + %s = %s'%(c(a),c(b),c(r)),'Plus']],th='basis')
    for a,b in [(5.5,2.3),(8.4,3.9),(7.25,2.5),(9.0,4.5)]:
        r=round(a-b,2);t.card(3,'%s %s %s = ?'%(c(a),M,c(b)),c(r),[c(round(r+0.1,2)),c(round(r-0.1,2)),c(round(r+1,2))],hints=['Komma unter Komma.'],steps=[['%s %s %s = %s'%(c(a),M,c(b),c(r)),'Minus']],th='basis')
    for g,z in [(6,4),(11,7),(3,8),(9,2)]:
        t.exam('%d Ganze und %d Zehntel: Wie schreibst du das als Kommazahl?'%(g,z),fz(g,z),[fz(z,g),'%d,%02d'%(g,z),fz(g,z+1)],expl=fz(g,z))
    for g,r in [(4,60),(7,25),(2,5),(9,80)]:
        a='%d,%02d'%(g,r);t.exam('%d Franken %d Rappen: Wie schreibst du das als Kommazahl?'%(g,r),None,ans=[a,a.replace(',','.')],expl=a)
    for x in ['6,28','14,9','3,45','8,07']:
        zt=x[x.index(',')+1];t.exam('%s: Welche Ziffer steht bei den Zehnteln?'%x,None,ans=[zt],expl=zt)
    for a,b in [('0,8','0,75'),('3,2','3,25'),('1,05','1,5'),('2,4','2,04')]:
        fa,fb=float(a.replace(',','.')),float(b.replace(',','.'));s='>' if fa>fb else '<';t.exam('Setze das Zeichen: %s ○ %s'%(a,b),s,[x for x in '<>=' if x!=s],expl='%s %s %s'%(a,s,b))
    theory_steps(t,'Kommazahlen zeigen Teile von einem Ganzen. Du kennst sie vom Geld.',[TBL(['Ganze','Zehntel','Hundertstel'],[['3',',5','0']],None)],
        [['Komma','trennt Ganze und Teile','3,5'],['Zehntel','1. Stelle nach dem Komma','0,1'],['Hundertstel','2. Stelle nach dem Komma','0,01'],['Dezimalzahl','Zahl mit Komma','3,50 Fr.']],
        'Die Stellen nach dem Komma werden immer kleiner.',[TBL(['Zahl','Ganze','Zehntel','Hundertstel'],[['3,5','3','5','0'],['0,25','0','2','5'],['12,07','12','0','7']],None)],
        'Franken und Rappen als Kommazahl.',['Geld','Kommazahl'],[['3 Fr. 50 Rp.','3,50'],['7 Fr. 5 Rp.','7,05'],['0 Fr. 90 Rp.','0,90']],
        'So rechnest du mit Kommazahlen.',[['Komma untereinander','Immer Komma unter Komma',0],['Stellen auffüllen','Mit Nullen',1],['Wie ohne Komma','Plus oder Minus rechnen',2],['Komma setzen','Im Ergebnis an der gleichen Stelle',3]],
        [[['2,5 + 1,3','Aufgabe',0],['25 + 13 = 38','ohne Komma',1],['3,8','Ergebnis',2]],[['5,5 − 2,3','Aufgabe',0],['55 − 23 = 32','ohne Komma',1],['3,2','Ergebnis',2]]],
        'Merke: Komma unter Komma.',[['Zehntel','1. Stelle','0,1',0],['Hundertstel','2. Stelle','0,01',1],['Rechnen','Komma untereinander','2,5 + 1,3',2]])
    return t
T.append(dez)
def flaeche():
    t=Topic('kl5-mathe-flaeche','kl5','Flächen- und Rauminhalte','Flächeninhalt','mathe',100,seed=78)
    t.th('basis','Fläche messen','Der Flächeninhalt zeigt, wie viele Quadrate in eine Fläche passen. Wir messen in Quadratzentimeter (cm²).',[['Rechteck','A = Länge × Breite']])
    R=t.rnd
    vis=lambda l,b:[{"type":"area","c":l,"r":b,"a":l,"b":b,"la":'%d cm'%l,"lb":'%d cm'%b}]
    for l,b in [(4,3),(5,2),(6,3),(3,3),(7,2),(5,4),(8,2),(4,4),(6,5),(9,3),(3,2),(5,5)]:
        r=l*b;t.card(1,'Wie gross ist der Flächeninhalt? (in cm²)',r,wr(r,0,100,R,deltas=(l,b,1,2)),hints=['Länge mal Breite.'],steps=[['%d × %d = %d'%(l,b,r),'A = l × b']],vis=vis(l,b) if l<=9 and b<=6 else None,th='basis')
    for l,b in [(10,5),(12,6),(9,8),(15,4),(20,3),(7,7),(11,9),(8,6)]:
        r=l*b;t.card(2,'Ein Rechteck ist %d cm lang und %d cm breit. Wie gross ist die Fläche? (in cm²)'%(l,b),r,wr(r,0,100,R,deltas=(l,b,1,10)),hints=['A = l × b'],steps=[['%d × %d = %d'%(l,b,r),'A = l × b']],th='basis')
    for a,l in [(24,6),(36,9),(40,8),(18,3),(45,5),(56,7),(72,9),(30,5)]:
        t.card(2,'Ein Rechteck hat die Fläche %d cm² und ist %d cm lang. Wie breit ist es? (in cm)'%(a,l),a//l,wr(a//l,0,100,R,deltas=(1,2,3)),hints=['Fläche durch Länge.'],steps=[['%d : %d = %d'%(a,l,a//l),'b = A : l']],th='basis')
    for s in [3,4,5,6,7,8,9,10]:
        t.card(2,'Ein Quadrat hat die Seite %d cm. Wie gross ist die Fläche? (in cm²)'%s,s*s,wr(s*s,0,100,R,deltas=(s,1,2)),hints=['Seite mal Seite.'],steps=[['%d × %d = %d'%(s,s,s*s),'A = s × s']],th='basis')
    for (l1,b1),(l2,b2) in [((4,3),(2,3)),((5,2),(5,4)),((6,2),(3,3)),((8,2),(4,4))]:
        r=l1*b1+l2*b2;t.card(3,'Ein Teil ist %d cm mal %d cm gross, ein anderer %d cm mal %d cm. Wie gross sind beide Flächen zusammen? (in cm²)'%(l1,b1,l2,b2),r,wr(r,0,100,R,deltas=(1,2,4,10)),hints=['Beide Flächen einzeln, dann plus.'],steps=[['%d × %d = %d'%(l1,b1,l1*b1),'Teil 1'],['%d × %d = %d'%(l2,b2,l2*b2),'Teil 2'],['%d + %d = %d'%(l1*b1,l2*b2,r),'Zusammen']],th='basis')
    for l,b in [(6,4),(5,3),(7,3),(8,5),(4,9)]:
        r=l*b;t.exam('Wie gross ist der Flächeninhalt? (in cm²)',r,wr(r,0,100,R,deltas=(l,b,1,2)),vis=vis(l,b) if l<=9 else None,expl='%d × %d = %d'%(l,b,r))
    for l,b in [(10,7),(12,5),(9,6),(15,5),(8,8)]:
        r=l*b;t.exam('Ein Rechteck ist %d cm lang und %d cm breit. Wie gross ist die Fläche? (in cm²)'%(l,b),None,ans=[str(r)],expl='%d × %d = %d'%(l,b,r))
    for a,l in [(48,8),(63,9),(35,5)]:
        t.exam('Ein Rechteck hat die Fläche %d cm² und ist %d cm lang. Wie breit ist es? (in cm)'%(a,l),None,ans=[str(a//l)],expl='%d : %d = %d'%(a,l,a//l))
    for s in [6,9,4]:
        t.exam('Ein Quadrat hat die Seite %d cm. Wie gross ist die Fläche? (in cm²)'%s,s*s,wr(s*s,0,100,R,deltas=(s,1,2)),expl='%d × %d = %d'%(s,s,s*s))
    theory_steps(t,'Der Flächeninhalt sagt dir, wie viel Platz eine Fläche braucht.',[{"type":"area","c":5,"r":3,"a":5,"b":3,"la":"5 cm","lb":"3 cm"}],
        [['Fläche','der Platz innerhalb','Heftseite'],['Flächeninhalt A','wie viele Quadrate passen','15 Quadrate'],['Quadratzentimeter cm²','Quadrat mit 1 cm Seite','1 cm × 1 cm'],['Länge l, Breite b','die zwei Seiten','5 cm und 3 cm']],
        'Zähle die Quadrate: 3 Reihen mit je 5.',[{"type":"area","c":6,"r":2,"a":6,"b":2,"la":"6 cm","lb":"2 cm"}],
        'Die Formel für Rechtecke und Quadrate.',['Figur','Formel','Beispiel'],[['Rechteck','A = l × b','5 × 3 = 15'],['Quadrat','A = s × s','4 × 4 = 16']],
        'So berechnest du die Fläche.',[['Seiten ablesen','Länge und Breite',0],['Mal rechnen','l mal b',1],['Einheit','cm²',2]],
        [[['l = 7 cm, b = 4 cm','gegeben',0],['7 × 4 = 28','rechnen',1],['28 cm²','Ergebnis',2]],[['s = 6 cm','gegeben',0],['6 × 6 = 36','rechnen',1],['36 cm²','Ergebnis',2]]],
        'Merke: Fläche gleich Länge mal Breite.',[['Rechteck','A = l × b','5 × 3',0],['Quadrat','A = s × s','4 × 4',1],['Einheit','cm²','nicht cm',2]])
    return t
T.append(flaeche)
def vol():
    t=Topic('kl5-mathe-volumen','kl5','Flächen- und Rauminhalte','Rauminhalt und Quader','mathe',100,seed=79)
    t.th('basis','Volumen','Das Volumen sagt, wie viel Platz ein Körper braucht. Wir messen in Kubikzentimeter (cm³).',[['Quader','V = l × b × h']])
    R=t.rnd
    vq=lambda l,b,h:[{"type":"quader","l":'%d cm'%l,"b":'%d cm'%b,"h":'%d cm'%h}]
    Q=[(2,3,4),(5,2,3),(4,3,2),(3,3,3),(5,4,2),(2,2,5),(6,2,4),(4,5,3),(3,4,5),(2,5,6),(5,5,4),(4,4,6)]
    Q=[q for q in Q if q[0]*q[1]*q[2]<=100]
    for l,b,h in Q[:10]:
        r=l*b*h;t.card(1,'Wie gross ist das Volumen? (in cm³)',r,wr(r,0,100,R,deltas=(l,b,h,1,10)),hints=['Länge mal Breite mal Höhe.'],steps=[['%d × %d = %d'%(l,b,l*b),'Grundfläche'],['%d × %d = %d'%(l*b,h,r),'mal Höhe']],vis=vq(l,b,h),th='basis')
    for l,b,h in [(10,5,2),(5,4,5),(6,3,4),(8,2,5),(7,2,5),(9,2,4),(4,4,5),(10,2,5)]:
        r=l*b*h;t.card(2,'Ein Quader ist %d cm lang, %d cm breit und %d cm hoch. Wie gross ist das Volumen? (in cm³)'%(l,b,h),r,wr(r,0,100,R,deltas=(l,b,h,10)),hints=['V = l × b × h'],steps=[['%d × %d = %d'%(l,b,l*b),'Grundfläche'],['%d × %d = %d'%(l*b,h,r),'mal Höhe']],th='basis')
    for s in [2,3,4]:
        t.card(2,'Ein Würfel hat die Kante %d cm. Wie gross ist das Volumen? (in cm³)'%s,s**3,wr(s**3,0,100,R,deltas=(s,1,2,s*s)),hints=['Kante mal Kante mal Kante.'],steps=[['%d × %d × %d = %d'%(s,s,s,s**3),'V = s × s × s']],th='basis')
    for g,h in [(12,3),(15,4),(20,5),(10,6),(16,5),(25,4),(9,8),(24,4)]:
        t.card(2,'Eine Schicht hat %d Würfel. Der Körper hat %d Schichten. Wie viele Würfel sind es?'%(g,h),g*h,wr(g*h,0,100,R,deltas=(g,h,10,1)),hints=['Schichten mal Würfel pro Schicht.'],steps=[['%d × %d = %d'%(g,h,g*h),'Schichten mal Grundfläche']],th='basis')
    for v,g in [(24,6),(60,12),(48,8),(36,9)]:
        t.card(3,'Ein Quader hat das Volumen %d cm³. Die Grundfläche ist %d cm². Wie hoch ist er? (in cm)'%(v,g),v//g,wr(v//g,0,100,R,deltas=(1,2,3)),hints=['Volumen durch Grundfläche.'],steps=[['%d : %d = %d'%(v,g,v//g),'h = V : G']],th='basis')
    for l,b,h in [(3,2,5),(4,2,6),(5,3,4),(2,4,5),(6,3,3),(4,4,4)][:6]:
        r=l*b*h;t.exam('Wie gross ist das Volumen? (in cm³)',r,wr(r,0,100,R,deltas=(l,b,h,1,10)),vis=vq(l,b,h),expl='%d × %d × %d = %d'%(l,b,h,r))
    for l,b,h in [(10,5,2),(5,4,5),(6,3,4),(8,2,5)]:
        r=l*b*h;t.exam('Ein Quader ist %d cm lang, %d cm breit und %d cm hoch. Wie gross ist das Volumen? (in cm³)'%(l,b,h),None,ans=[str(r)],expl=str(r))
    for s in [3,4,2]:
        t.exam('Ein Würfel hat die Kante %d cm. Wie gross ist das Volumen? (in cm³)'%s,s**3,wr(s**3,0,100,R,deltas=(s,1,2,s*s)),expl=str(s**3))
    for g,h in [(12,5),(15,6),(10,9)]:
        t.exam('Eine Schicht hat %d Würfel. Der Körper hat %d Schichten. Wie viele Würfel sind es?'%(g,h),None,ans=[str(g*h)],expl=str(g*h))
    theory_steps(t,'Das Volumen zeigt, wie viele Würfel in einen Körper passen.',[{"type":"quader","l":"4 cm","b":"3 cm","h":"2 cm"}],
        [['Volumen V','Platz im Körper','24 cm³'],['Kubikzentimeter cm³','Würfel mit 1 cm Kante','1 × 1 × 1'],['Quader','Körper mit 6 Rechtecken','Schuhkarton'],['Grundfläche','Länge mal Breite','4 × 3 = 12']],
        'Eine Schicht mal die Anzahl der Schichten.',[{"type":"quader","l":"5 cm","b":"2 cm","h":"3 cm"}],
        'Die Formeln für Quader und Würfel.',['Körper','Formel','Beispiel'],[['Quader','V = l × b × h','4 × 3 × 2 = 24'],['Würfel','V = s × s × s','3 × 3 × 3 = 27']],
        'So berechnest du das Volumen.',[['Masse ablesen','l, b und h',0],['Grundfläche','l mal b',1],['Mal Höhe','Grundfläche mal h',2],['Einheit','cm³',3]],
        [[['l=5, b=2, h=3','gegeben',0],['5 × 2 = 10','Grundfläche',1],['10 × 3 = 30','mal Höhe',2],['30 cm³','Ergebnis',3]],[['s = 4','Würfel',0],['4 × 4 = 16','Grundfläche',1],['16 × 4 = 64','mal Höhe',2],['64 cm³','Ergebnis',3]]],
        'Merke: Grundfläche mal Höhe.',[['Quader','V = l × b × h','4 × 3 × 2',0],['Würfel','V = s × s × s','3 × 3 × 3',1],['Einheit','cm³','nicht cm²',2]])
    return t
T.append(vol)
def tonnen():
    t=Topic('kl5-mathe-tonnen','kl5','Proportionalität','Rechnen mit Tonnen','mathe',1000,seed=80)
    t.th('basis','Tonne und Kilogramm','Eine Tonne (t) sind 1\'000 Kilogramm. Mit Tonnen misst du sehr schwere Dinge.',[['1 t','= 1\'000 kg']])
    R=t.rnd
    for q,a,w in [('Wie viele kg sind 1 t?',1000,[100,10,10000]),('Wie viele t sind 1\'000 kg?',1,[10,100,1000]),('Was ist schwerer: 1 t oder 900 kg?','1 t',['900 kg','gleich schwer']),('Was ist schwerer: 1 t oder 999 kg?','1 t',['999 kg','gleich schwer']),('Wie viele kg sind eine halbe Tonne?',500,[50,250,100]),('Wie viele kg sind eine Viertel-Tonne?',250,[25,500,100])]:
        t.card(1,q,f(a) if isinstance(a,int) else a,[f(x) if isinstance(x,int) else x for x in w],hints=['1 t = 1\'000 kg'],steps=[[f(a) if isinstance(a,int) else a,'Antwort']],th='basis')
    for q,a,w in [('Ein Elefant wiegt etwa 5 t. Ein Auto wiegt etwa 1 t. Wie viel wiegen sie zusammen? (in t)',6,[4,5,10]),('Ein Lastwagen lädt 8 t. Er lädt 3 t ab. Wie viele t sind noch drauf?',5,[3,8,11]),('Eine Brücke trägt 40 t. Ein Lastwagen wiegt 12 t. Wie viele t können noch dazukommen?',28,[12,40,52]),('Ein Kran hebt 20 t. Er hebt 4 Mal gleich viel. Wie viele t sind es insgesamt? (jedes Mal 2 t)',8,[2,4,16])]:
        t.card(2,q,a,w,hints=['Rechne in t.'],steps=[[str(a),'Ergebnis']],th='basis')
    for k,r in [(400,600),(250,750),(300,700),(500,500),(100,900),(350,650)]:
        t.card(2,'%d kg und %d kg sind zusammen wie viele t?'%(k,r),1,[10,2,100],hints=['Zusammen 1\'000 kg.'],steps=[['%d + %d = %s'%(k,r,f(k+r)),'Plus'],['1\'000 kg = 1 t','Umrechnen']],th='basis')
    for n,per in [(2,5),(3,4),(4,6),(5,8),(6,7),(8,9),(3,12),(10,5),(7,8),(9,6)]:
        t.card(3,'1 Lastwagen lädt %d t. Wie viele t laden %d Lastwagen?'%(per,n),per*n,wr(per*n,0,1000,R,deltas=(per,n,1,10)),hints=['Gleiche Gruppen: mal.'],steps=[['%d × %d = %d'%(n,per,per*n),'Mal']],th='basis')
    for n,t_ in [(4,12),(5,35),(6,24),(8,48),(3,27),(7,56)]:
        t.card(3,'%d gleiche Lastwagen laden zusammen %d t. Wie viele t lädt einer?'%(n,t_),t_//n,wr(t_//n,0,1000,R,deltas=(1,2,3)),hints=['Durch die Anzahl teilen.'],steps=[['%d : %d = %d'%(t_,n,t_//n),'Teilen']],th='basis')
    for q,a,w in [('Wie viele kg sind 1 t?',1000,[100,10,10000]),('Was ist schwerer: 1 t oder 900 kg?','1 t',['900 kg','gleich schwer']),('Wie viele kg sind eine halbe Tonne?',500,[50,250,100]),('Wie viele t sind 1\'000 kg?',1,[10,100,1000])]:
        t.exam(q,f(a) if isinstance(a,int) else a,[f(x) if isinstance(x,int) else x for x in w],expl=f(a) if isinstance(a,int) else a)
    for k,r in [(400,600),(250,750),(100,900)]:
        t.exam('%d kg und %d kg sind zusammen wie viele t?'%(k,r),None,ans=['1'],expl='1\'000 kg = 1 t')
    for n,per in [(3,6),(4,5),(7,4),(5,9),(8,6),(6,8),(9,5)]:
        t.exam('1 Lastwagen lädt %d t. Wie viele t laden %d Lastwagen?'%(per,n),None,ans=[str(per*n)],expl='%d × %d = %d'%(n,per,per*n))
    for q,a,w in [('Ein Lastwagen lädt 8 t. Er lädt 3 t ab. Wie viele t sind noch drauf?',5,[3,8,11]),('Eine Brücke trägt 40 t. Ein Lastwagen wiegt 12 t. Wie viele t können noch dazukommen?',28,[12,40,52])]:
        t.exam(q,a,w,expl=str(a))
    theory_steps(t,'Mit Tonnen misst du sehr schwere Dinge, wie Lastwagen oder Elefanten.',[TBL(['Einheit','Wert'],[['1 t','1\'000 kg'],['halbe t','500 kg']],None)],
        [['Tonne t','sehr grosses Gewicht','Lastwagen: 8 t'],['Kilogramm kg','Gewicht im Alltag','Kind: 30 kg'],['Umrechnen','1 t = 1\'000 kg','2 t = 2\'000 kg'],['proportional','doppelt so viele, doppelt so schwer','2 Lastwagen: 16 t']],
        'Je mehr Lastwagen, desto mehr Tonnen. Das Verhältnis bleibt gleich.',[TBL(['Lastwagen','Gewicht'],[['1','6 t'],['2','12 t'],['3','18 t'],['4','24 t']],None)],
        'Das Gewicht wächst gleichmässig.',['Anzahl','Rechnung','Tonnen'],[['1','1 × 6','6'],['2','2 × 6','12'],['5','5 × 6','30']],
        'So rechnest du mit Tonnen.',[['Einheit prüfen','t oder kg?',0],['Umrechnen','1 t = 1\'000 kg',1],['Rechnen','Mal, geteilt, plus, minus',2],['Antwort','Mit Einheit t',3]],
        [[['4 Lastwagen je 7 t','Aufgabe',0],['4 × 7','Rechnung',1],['28 t','Ergebnis',2]],[['600 kg + 400 kg','Aufgabe',0],['1\'000 kg','Summe',1],['1 t','Ergebnis',2]]],
        'Merke: 1 t sind 1\'000 kg.',[['t → kg','mal 1\'000','1 t = 1\'000 kg',0],['proportional','doppelt, doppelt','2 mal 6 t = 12 t',1],['Einheit','nie vergessen','t oder kg',2]])
    return t
T.append(tonnen)
