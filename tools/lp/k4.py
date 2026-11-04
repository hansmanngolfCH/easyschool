from ar import *
T=[]
NM=['HT','ZT','T','H','Z','E']
NF=['Hunderttausender','Zehntausender','Tausender','Hunderter','Zehner','Einer']
def digs(n):
    s=str(n).zfill(6);return [int(c) for c in s]
def zahlen1m():
    t=Topic('kl4-mathe-zahlen-million','kl4','Zahlenraum','Zahlen bis 1\'000\'000','mathe',1000000,seed=61)
    t.th('basis','Stellenwerte','Jede Ziffer hat einen Platz in der Stellenwerttabelle. Der Platz bestimmt den Wert.',[['345\'678','3 HT, 4 ZT, 5 T, 6 H, 7 Z, 8 E']])
    t.th('wert','Wert einer Ziffer','Die Ziffer mal ihr Stellenwert ergibt den Wert. Die 4 bei den ZT ist 40\'000 wert.',[['4 ZT','= 40\'000']])
    R=t.rnd
    ns=[R.randint(100000,999999) for _ in range(14)]
    for n in ns[:8]:
        d=digs(n);i=R.randint(0,5)
        t.card(1,'%s: Welche Ziffer steht bei den %s?'%(f(n),NF[i]),d[i],[x for x in wr(d[i],0,9,R,deltas=(1,2,3))],hints=['Lies die Stellenwerttabelle von links.'],steps=[['%s = %s'%(f(n),' '.join('%d %s'%(d[j],NM[j]) for j in range(6))),'Zerlegen'],[str(d[i]),NM[i]]],th='basis')
    for n in ns[8:14]:
        d=digs(n);i=R.randint(0,4)
        if d[i]==0:continue
        v=d[i]*10**(5-i)
        t.card(2,'%s: Wie viel ist die Ziffer %d wert?'%(f(n),d[i]),f(v),[f(d[i]*10**k) for k in range(6) if k!=5-i][:3],hints=['Ziffer mal Stellenwert.'],steps=[['%d %s = %s'%(d[i],NM[i],f(v)),'Wert']],th='wert')
    for _ in range(8):
        d=[R.randint(1,9) for _ in range(6)];n=int(''.join(map(str,d)))
        t.card(2,'Schreibe als Zahl: %s'%' '.join('%d %s'%(d[j],NM[j]) for j in range(6)),f(n),[f(n+10**k) for k in (0,1,2)],hints=['Von links nach rechts schreiben.'],steps=[[f(n),'Zahl']],th='basis')
    for n in [R.randint(100000,990000) for _ in range(6)]:
        t.card(2,'Welche Zahl ist 1 Tausender mehr als %s?'%f(n),f(n+1000),[f(n+100),f(n+10000),f(n+1)],hints=['Tausender ändern sich um 1.'],steps=[['%s + 1\'000 = %s'%(f(n),f(n+1000)),'Plus']],th='basis')
    for n in [R.randint(100000,980000) for _ in range(5)]:
        t.card(3,'Welche Zahl ist 10 Tausender weniger als %s?'%f(n+10000),f(n),[f(n+10000-1000),f(n+10000-100000),f(n+1000)],hints=['10 Tausender sind ein Zehntausender.'],steps=[['%s %s 10\'000 = %s'%(f(n+10000),M,f(n)),'Minus']],th='basis')
    for a,b in [(345678,354678),(802150,802510),(999999,990999),(450000,45000),(123456,123465),(700001,699999)]:
        s='<' if a<b else '>'
        t.card(3,'Setze das Zeichen: %s ○ %s'%(f(a),f(b)),s,['<' if s=='>' else '>','='],hints=['Vergleiche von links die erste verschiedene Ziffer.'],steps=[['%s %s %s'%(f(a),s,f(b)),'Vergleichen']],th='basis')
    for n in [R.randint(100000,999999) for _ in range(5)]:
        d=digs(n);i=R.randint(0,5)
        t.exam('%s: Welche Ziffer steht bei den %s?'%(f(n),NF[i]),d[i],wr(d[i],0,9,R,deltas=(1,2,3)),expl='%s: %d'%(NM[i],d[i]))
    for n in [R.randint(100000,999999) for _ in range(3)]:
        d=digs(n);i=R.randint(0,5)
        t.exam('%s: Welche Ziffer steht bei den %s?'%(f(n),NF[i]),None,ans=[str(d[i])],expl='%s: %d'%(NM[i],d[i]))
    for _ in range(4):
        d=[R.randint(1,9) for _ in range(6)];n=int(''.join(map(str,d)))
        t.exam('Schreibe als Zahl: %s'%' '.join('%d %s'%(d[j],NM[j]) for j in range(6)),None,ans=fv(n),expl=f(n))
    for n in [345600,820300,501000]:
        t.exam('Welche Zahl ist 1 Tausender mehr als %s?'%f(n),f(n+1000),[f(n+100),f(n+10000),f(n+1)],expl=f(n+1000))
    for a,b in [(512345,521345),(740000,704000)]:
        s='<' if a<b else '>';t.exam('Setze das Zeichen: %s ○ %s'%(f(a),f(b)),s,['<' if s=='>' else '>','='],expl='%s %s %s'%(f(a),s,f(b)))
    theory_steps(t,'Grosse Zahlen liest du mit der Stellenwerttabelle. Jede Ziffer hat einen Platz.',[TBL(['HT','ZT','T','H','Z','E'],[['3','4','5','6','7','8']],None)],
        [['Hunderttausender HT','100\'000 pro Stück','3 HT = 300\'000'],['Zehntausender ZT','10\'000 pro Stück','4 ZT = 40\'000'],['Tausender T','1\'000 pro Stück','5 T = 5\'000'],['Hunderter H','100 pro Stück','6 H = 600'],['Zehner Z','10 pro Stück','7 Z = 70'],['Einer E','1 pro Stück','8 E = 8']],
        'Die Stellenwerttabelle zeigt jede Ziffer an ihrem Platz.',[TBL(['Zahl','HT','ZT','T','H','Z','E'],[['345\'678','3','4','5','6','7','8'],['802\'150','8','0','2','1','5','0']],None)],
        'Der Wert der Ziffer ist Ziffer mal Platz.',['Ziffer','Platz','Wert'],[['3','HT','300\'000'],['4','ZT','40\'000'],['5','T','5\'000']],
        'So liest du eine grosse Zahl.',[['Gruppen','Von rechts in Dreier-Gruppen',0],['Tabelle','Ziffern in die Stellenwerttabelle',1],['Werte','Ziffer mal Platz',2],['Zusammen','Alle Werte addieren',3]],
        [[['345\'678','Zahl',0],['300\'000 + 40\'000 + 5\'000','Tausender',1],['+ 600 + 70 + 8','Rest',2],['345\'678','Zahl',3]],[['802\'150','Zahl',0],['800\'000 + 2\'000','Stellen',1],['+ 100 + 50','Rest',2],['802\'150','Zahl',3]]],
        'Merke: Ziffer mal Platz ergibt den Wert.',[['Platz','HT, ZT, T, H, Z, E','von links nach rechts',0],['Wert','Ziffer mal Platz','4 ZT = 40\'000',1],['Vergleichen','von links beginnen','erste Ziffer entscheidet',2]])
    return t
T.append(zahlen1m)
def pairs_w(op,R,n):
    P=[]
    for a in range(12,98):
        for b in range(12,98):
            if op=='+' and a+b<=100:P.append((a,b,(a%10)+(b%10)>=10))
            if op=='-' and a>b and a-b>=10:P.append((a,b,(a%10)<(b%10)))
    R.shuffle(P);return P
def addw():
    t=Topic('kl4-mathe-schriftlich-plus','kl4','Schriftliche Grundoperationen','Schriftliche Addition','mathe',100,seed=62)
    t.th('basis','Untereinander schreiben','Schreibe die Zahlen genau untereinander. Einer unter Einer, Zehner unter Zehner.',[['Z E','Stellenwerte']])
    t.th('uber','Übertrag','Sind die Einer zusammen 10 oder mehr, schreibst du die Einer hin. Den Zehner nimmst du als Übertrag zu den Zehnern.',[['8 + 7 = 15','5 hinschreiben, 1 Übertrag']])
    R=t.rnd;P=pairs_w('+',R,0)
    A=[p for p in P if not p[2]];B=[p for p in P if p[2]]
    def st(a,b):
        e=a%10+b%10;z=a//10+b//10+(1 if e>=10 else 0)
        s=[['E: %d + %d = %d'%(a%10,b%10,e)+(' → %d, Übertrag 1'%(e%10) if e>=10 else ''),'Einer'],['Z: %d + %d%s = %d'%(a//10,b//10,' + 1' if e>=10 else '',z),'Zehner'],['%d + %d = %d'%(a,b,a+b),'Ergebnis']]
        return s
    for a,b,u in A[:10]:
        t.card(1,'%d + %d = ?'%(a,b),a+b,wr(a+b,0,100,R,deltas=(1,10,2)),hints=['Einer zuerst, dann Zehner.'],steps=st(a,b),th='basis')
    for a,b,u in B[:12]:
        t.card(2,'%d + %d = ?'%(a,b),a+b,wr(a+b,0,100,R,deltas=(10,1,2)),hints=['Achte auf den Übertrag.'],steps=st(a,b),th='uber')
    for a,b,u in B[12:20]:
        t.card(2,'Wie gross ist der Übertrag bei %d + %d?'%(a,b),1,[0,2],hints=['Einer zusammen: 10 oder mehr?'],steps=[['E: %d + %d = %d'%(a%10,b%10,a%10+b%10),'Einer'],['Übertrag 1','Übertrag']],th='uber')
    for (a,b,u),i in zip(B[20:26],range(6)):
        t.card(3,story('+',a,b,i,'k2'),a+b,wr(a+b,0,100,R,deltas=(10,1,2)),hints=['Schriftlich addieren.'],steps=st(a,b),th='uber')
    for a,b,u in A[10:14]+B[26:38]:
        if len(t.qs)>=16:break
        if len(t.qs)%2==0:t.exam('%d + %d = ?'%(a,b),a+b,wr(a+b,0,100,R,deltas=(10,1,2)),expl='%d + %d = %d'%(a,b,a+b))
        else:t.exam('%d + %d = ?'%(a,b),None,ans=[str(a+b)],expl='%d + %d = %d'%(a,b,a+b))
    theory_steps(t,'Beim schriftlichen Addieren rechnest du Stelle für Stelle von rechts nach links.',[TBL(['','Z','E'],[['Zahl','3','8'],['+','2','7'],['Übertrag','1','']],None)],
        [['Summand','Zahl, die du addierst','38 und 27'],['Summe','Ergebnis','65'],['Übertrag','Zehner aus den Einern','1 Zehner'],['Stellenwert','Platz der Ziffer','Z und E']],
        'Schreibe Einer unter Einer und Zehner unter Zehner.',[TBL(['','Z','E'],[['Zahl','4','6'],['+','3','9'],['Summe','8','5']],None)],
        'Rechne von rechts nach links.',['Spalte','Rechnung (38 + 27)'],[['Einer','8 + 7 = 15, schreibe 5, Übertrag 1'],['Zehner','3 + 2 + 1 = 6'],['Summe','65']],
        'So rechnest du schriftlich Plus.',[['Untereinander','Einer unter Einer',0],['Einer addieren','Bei 10 oder mehr: Übertrag',1],['Zehner addieren','Übertrag nicht vergessen',2],['Prüfen','Mit Überschlag',3]],
        [[['38 + 27','Aufgabe',0],['8 + 7 = 15','Einer',1],['3 + 2 + 1 = 6','Zehner',2],['65','Summe',3]],[['46 + 39','Aufgabe',0],['6 + 9 = 15','Einer',1],['4 + 3 + 1 = 8','Zehner',2],['85','Summe',3]]],
        'Merke: Von rechts nach links, Übertrag mitnehmen.',[['Untereinander','Stellen genau ausrichten','Z unter Z',0],['Übertrag','ab 10 Einern','1 Zehner dazu',1],['Prüfen','Überschlag','38 + 27 ist etwa 65',2]])
    return t
T.append(addw)
def subw():
    t=Topic('kl4-mathe-schriftlich-minus','kl4','Schriftliche Grundoperationen','Schriftliche Subtraktion','mathe',100,seed=63)
    t.th('basis','Untereinander schreiben','Schreibe die grössere Zahl oben. Einer unter Einer, Zehner unter Zehner.',[['Z E','Stellenwerte']])
    t.th('uber','Entbündeln','Reichen die Einer oben nicht, tauschst du einen Zehner in 10 Einer. Dann rechnest du weiter.',[['62 − 27','12 − 7 = 5, dann 5 − 3 = 2']])
    R=t.rnd;P=pairs_w('-',R,0)
    A=[p for p in P if not p[2]];B=[p for p in P if p[2]]
    def st(a,b):
        if a%10>=b%10:
            return [['E: %d %s %d = %d'%(a%10,M,b%10,a%10-b%10),'Einer'],['Z: %d %s %d = %d'%(a//10,M,b//10,a//10-b//10),'Zehner'],['%d %s %d = %d'%(a,M,b,a-b),'Ergebnis']]
        return [['E: %d %s %d = %d (Zehner entbündelt)'%(a%10+10,M,b%10,a%10+10-b%10),'Einer'],['Z: %d %s 1 %s %d = %d'%(a//10,M,M,b//10,a//10-1-b//10),'Zehner'],['%d %s %d = %d'%(a,M,b,a-b),'Ergebnis']]
    for a,b,u in A[:10]:
        t.card(1,'%d %s %d = ?'%(a,M,b),a-b,wr(a-b,0,100,R,deltas=(1,10,2)),hints=['Einer zuerst, dann Zehner.'],steps=st(a,b),th='basis')
    for a,b,u in B[:12]:
        t.card(2,'%d %s %d = ?'%(a,M,b),a-b,wr(a-b,0,100,R,deltas=(10,1,2)),hints=['Entbündle einen Zehner.'],steps=st(a,b),th='uber')
    for a,b,u in B[12:20]:
        t.card(2,'Reichen bei %d %s %d die Einer oben? (ja/nein)'%(a,M,b),'nein',['ja'],hints=['Ist die Einer-Ziffer oben kleiner?'],steps=[['%d < %d'%(a%10,b%10),'Einer vergleichen']],th='uber')
    for (a,b,u),i in zip(B[20:26],range(6)):
        t.card(3,story('-',a,b,i,'k2'),a-b,wr(a-b,0,100,R,deltas=(10,1,2)),hints=['Schriftlich subtrahieren.'],steps=st(a,b),th='uber')
    for a,b,u in A[10:14]+B[26:38]:
        if len(t.qs)>=16:break
        if len(t.qs)%2==0:t.exam('%d %s %d = ?'%(a,M,b),a-b,wr(a-b,0,100,R,deltas=(10,1,2)),expl='%d %s %d = %d'%(a,M,b,a-b))
        else:t.exam('%d %s %d = ?'%(a,M,b),None,ans=[str(a-b)],expl='%d %s %d = %d'%(a,M,b,a-b))
    theory_steps(t,'Beim schriftlichen Subtrahieren rechnest du Stelle für Stelle von rechts nach links.',[TBL(['','Z','E'],[['Zahl','6','2'],['−','2','7']],None)],
        [['Minuend','Zahl, von der du wegnimmst','62'],['Subtrahend','Zahl, die du wegnimmst','27'],['Differenz','Ergebnis','35'],['Entbündeln','1 Zehner in 10 Einer tauschen','62 → 5 Z und 12 E']],
        'Wenn oben zu wenig Einer stehen, tauschst du einen Zehner.',[TBL(['','Z','E'],[['Zahl','5','12'],['−','2','7'],['Differenz','3','5']],None)],
        'Rechne von rechts nach links.',['Spalte','Rechnung (62 − 27)'],[['Einer','2 < 7: Zehner entbündeln, 12 − 7 = 5'],['Zehner','6 − 1 − 2 = 3'],['Differenz','35']],
        'So rechnest du schriftlich Minus.',[['Untereinander','Grössere Zahl oben',0],['Einer prüfen','Zu wenig? Entbündeln',1],['Zehner','Entbündelten Zehner beachten',2],['Probe','Mit Plus',3]],
        [[['62 − 27','Aufgabe',0],['12 − 7 = 5','Einer',1],['5 − 2 = 3','Zehner',2],['35','Differenz',3]],[['84 − 36','Aufgabe',0],['14 − 6 = 8','Einer',1],['7 − 3 = 4','Zehner',2],['48','Differenz',3]]],
        'Merke: Zu wenig Einer? Zehner entbündeln.',[['Entbündeln','1 Z = 10 E','62: 5 Z und 12 E',0],['Probe','mit Plus','35 + 27 = 62',1],['Reihenfolge','von rechts','Einer, dann Zehner',2]])
    return t
T.append(subw)
def liter():
    t=Topic('kl4-mathe-liter-dl','kl4','Hohlmasse','Liter und Deziliter','mathe',1000000,seed=64)
    t.th('basis','Hohlmasse','Mit Liter (l) und Deziliter (dl) misst du Flüssigkeiten. 1 Liter sind 10 Deziliter.',[['1 l','= 10 dl']])
    R=t.rnd
    for l in [2,3,5,4,7,6,8,9]:
        t.card(1,'%d l = ? dl'%l,l*10,[l*10+10,l*100,l],hints=['1 l = 10 dl'],steps=[['%d × 10 = %d'%(l,l*10),'Mal 10']],th='basis')
    for dl in [30,50,20,70,90,40,60,80]:
        t.card(1,'%d dl = ? l'%dl,dl//10,wr(dl//10,0,20,R,deltas=(1,2,10)),hints=['10 dl = 1 l'],steps=[['%d : 10 = %d'%(dl,dl//10),'Durch 10']],th='basis')
    for a,b in [(3,5),(2,4),(6,3),(1,7),(4,8),(5,2)]:
        t.card(2,'%d l + %d dl = ? dl'%(a,b),a*10+b,[a*10+b+10,a+b,a*100+b],hints=['Erst l in dl umrechnen.'],steps=[['%d l = %d dl'%(a,a*10),'Umrechnen'],['%d + %d = %d'%(a*10,b,a*10+b),'Plus']],th='basis')
    for x,y in [(25,13),(48,15),(60,27),(35,35)]:
        t.card(2,'%d dl + %d dl = ? dl'%(x,y),x+y,wr(x+y,0,200,R,deltas=(10,1,5)),hints=['Plus rechnen.'],steps=[['%d + %d = %d'%(x,y,x+y),'Plus']],th='basis')
    for lv in [3,5,7,2,8,6]:
        t.card(1,'Wie viele dl sind im Messbecher?',lv,wr(lv,0,10,R,deltas=(1,2)),hints=['Lies die Marke ab.'],steps=[[str(lv)+' dl','Ablesen']],vis=[{"type":"jug","max":10,"level":lv,"step":1,"lab":2,"unit":"dl"}],th='basis')
    for q,a,w in [('Eine Trinkflasche fasst 5 dl. Wie viele Flaschen füllen 1 l?',2,[1,5,10]),('Ein Glas fasst 2 dl. Wie viele Gläser sind 1 l?',5,[2,10,20]),('Eine Badewanne fasst 150 l. Wie viele dl sind das?',1500,[150,15,15000]),('Ein Krug hat 3 l. Du trinkst 12 dl. Wie viele dl bleiben?',18,[12,30,15])]:
        t.card(3,q,a,w,hints=['Rechne in dl.'],steps=[[str(a),'Ergebnis']],th='basis')
    for l in [6,4,9,3]:
        t.exam('%d l = ? dl'%l,l*10,[l*10+10,l*100,l],expl='%d × 10 = %d'%(l,l*10))
    for dl in [40,80,20,60]:
        t.exam('%d dl = ? l'%dl,None,ans=[str(dl//10)],expl='%d : 10 = %d'%(dl,dl//10))
    for lv in [4,6,9]:
        t.exam('Wie viele dl sind im Messbecher?',lv,wr(lv,0,10,R,deltas=(1,2)),vis=[{"type":"jug","max":10,"level":lv,"step":1,"lab":2,"unit":"dl"}],expl='%d dl'%lv)
    for a,b in [(2,5),(7,3),(4,9)]:
        t.exam('%d l + %d dl = ? dl'%(a,b),None,ans=[str(a*10+b)],expl='%d dl'%(a*10+b))
    for x,y in [(25,13),(48,15)]:
        t.exam('%d dl + %d dl = ? dl'%(x,y),x+y,wr(x+y,0,200,R,deltas=(10,1,5)),expl=str(x+y))
    theory_steps(t,'Mit Liter und Deziliter misst du, wie viel in ein Gefäss passt.',[{"type":"jug","max":10,"level":10,"step":1,"lab":2,"unit":"1 l = 10 dl"}],
        [['Liter l','grosse Flüssigkeitsmenge','Milchpackung'],['Deziliter dl','kleine Menge','Trinkglas: 2 dl'],['Umrechnen','1 l = 10 dl','3 l = 30 dl'],['Messbecher','zeigt die Menge an','mit Skala']],
        'Lies die Marke am Flüssigkeitsstand ab.',[{"type":"jug","max":10,"level":6,"step":1,"lab":2,"unit":"6 dl"}],
        'Von l zu dl und zurück.',['Von','Nach','Rechnung'],[['l','dl','mal 10'],['dl','l','durch 10']],
        'So rechnest du mit Hohlmassen.',[['Einheit prüfen','Sind beide gleich?',0],['Umrechnen','l in dl: mal 10',1],['Rechnen','Plus oder Minus',2],['Einheit dazu','Antwort mit dl oder l',3]],
        [[['2 l + 5 dl','Aufgabe',0],['20 dl + 5 dl','umrechnen',1],['25 dl','Ergebnis',2]],[['60 dl','Menge',0],['60 : 10','durch 10',1],['6 l','Ergebnis',2]]],
        'Merke: 1 l sind 10 dl.',[['l → dl','mal 10','3 l = 30 dl',0],['dl → l','durch 10','50 dl = 5 l',1],['Rechnen','gleiche Einheit','dl + dl',2]])
    return t
T.append(liter)
def cl():
    t=Topic('kl4-mathe-zentiliter','kl4','Hohlmasse','Zentiliter','mathe',1000000,seed=65)
    t.th('basis','Zentiliter','Ein Zentiliter (cl) ist sehr klein. 1 dl sind 10 cl. 1 l sind 100 cl.',[['1 dl','= 10 cl'],['1 l','= 100 cl']])
    R=t.rnd
    for dl in [2,3,5,4,6,8,9,7]:
        t.card(1,'%d dl = ? cl'%dl,dl*10,[dl*10+10,dl*100,dl],hints=['1 dl = 10 cl'],steps=[['%d × 10 = %d'%(dl,dl*10),'Mal 10']],th='basis')
    for l in [2,3,5,4,6,8]:
        t.card(1,'%d l = ? cl'%l,l*100,[l*10,l*1000,l*100+10],hints=['1 l = 100 cl'],steps=[['%d × 100 = %d'%(l,l*100),'Mal 100']],th='basis')
    for c in [30,50,20,70,90,40,60,80]:
        t.card(2,'%d cl = ? dl'%c,c//10,wr(c//10,0,20,R,deltas=(1,2,10)),hints=['10 cl = 1 dl'],steps=[['%d : 10 = %d'%(c,c//10),'Durch 10']],th='basis')
    for c in [200,300,500,400,600,800]:
        t.card(2,'%d cl = ? l'%c,c//100,wr(c//100,0,20,R,deltas=(1,2,10)),hints=['100 cl = 1 l'],steps=[['%d : 100 = %d'%(c,c//100),'Durch 100']],th='basis')
    for q,a,w in [('Ein kleines Glas hat 20 cl. Wie viele Gläser füllt 1 l?',5,[2,10,20]),('Ein Joghurtbecher hat 18 cl. Du isst 2 Becher. Wie viele cl sind das?',36,[18,20,9]),('Ein Krug hat 1 l. Du giesst 35 cl aus. Wie viele cl bleiben?',65,[35,100,75]),('Eine Flasche hat 5 dl. Wie viele cl sind das?',50,[5,500,15]),('Drei Gläser haben je 25 cl. Wie viele cl sind das zusammen?',75,[25,50,100]),('Eine Tasse hat 15 cl. Wie viele Tassen füllt 1 l ungefähr?',6,[10,15,3])]:
        t.card(3,q,a,w,hints=['Rechne in cl.'],steps=[[str(a),'Ergebnis']],th='basis')
    for dl in [3,6,9,5]:
        t.exam('%d dl = ? cl'%dl,dl*10,[dl*10+10,dl*100,dl],expl='%d × 10 = %d'%(dl,dl*10))
    for l in [3,7,5,9]:
        t.exam('%d l = ? cl'%l,None,ans=[str(l*100),f(l*100)],expl='%d × 100 = %d'%(l,l*100))
    for c in [40,80,60]:
        t.exam('%d cl = ? dl'%c,None,ans=[str(c//10)],expl='%d : 10 = %d'%(c,c//10))
    for c in [300,700,900]:
        t.exam('%d cl = ? l'%c,c//100,wr(c//100,0,20,R,deltas=(1,2,10)),expl='%d : 100 = %d'%(c,c//100))
    for q,a,w in [('Ein Krug hat 1 l. Du giesst 35 cl aus. Wie viele cl bleiben?',65,[35,100,75]),('Drei Gläser haben je 25 cl. Wie viele cl sind das zusammen?',75,[25,50,100])]:
        t.exam(q,a,w,expl=str(a))
    theory_steps(t,'Zentiliter sind noch kleiner als Deziliter. Mit Umrechnen rechnest du mit allen Hohlmassen.',[TBL(['Einheit','Wert'],[['1 l','10 dl'],['1 dl','10 cl'],['1 l','100 cl']],None)],
        [['Zentiliter cl','sehr kleine Menge','Löffel: 1 cl'],['Deziliter dl','kleine Menge','Glas: 2 dl'],['Liter l','grosse Menge','Packung: 1 l'],['Umrechnen','in kleinere Einheit: mal','l → dl → cl']],
        'Eine Treppe: Jede Stufe ist mal 10.',[TBL(['l','dl','cl'],[['1','10','100'],['2','20','200'],['5','50','500']],None)],
        'Von gross nach klein: mal. Von klein nach gross: durch.',['Von','Nach','Rechnung'],[['l','dl','mal 10'],['dl','cl','mal 10'],['l','cl','mal 100'],['cl','l','durch 100']],
        'So rechnest du um.',[['Einheiten ansehen','Von welcher zu welcher?',0],['Schritte zählen','Eine oder zwei Stufen?',1],['Mal oder durch','Gross zu klein: mal',2],['Einheit dazu','cl, dl oder l',3]],
        [[['3 dl','Menge',0],['3 × 10','mal 10',1],['30 cl','Ergebnis',2]],[['400 cl','Menge',0],['400 : 100','durch 100',1],['4 l','Ergebnis',2]]],
        'Merke: Von gross nach klein mal, zurück durch.',[['l → cl','mal 100','2 l = 200 cl',0],['dl → cl','mal 10','3 dl = 30 cl',1],['cl → l','durch 100','500 cl = 5 l',2]])
    return t
T.append(cl)
def sach():
    t=Topic('kl4-mathe-sachaufgaben','kl4','Hohlmasse','Erste Sachaufgaben','mathe',1000000,seed=66)
    t.th('basis','Sachaufgaben lösen','Lies die Aufgabe. Finde die Frage. Rechne und schreibe eine Antwort.',[['Frage','Rechnung','Antwort']])
    R=t.rnd
    S=[('Ein Kanister hat %d l. Es werden %d l verbraucht. Wie viele l bleiben?','-',[(25,8),(40,15),(60,24),(35,9),(50,18),(75,30),(95,37),(82,45)]),
       ('Ein Fass hat %d l. Ein zweites Fass hat %d l. Wie viele l sind es zusammen?','+',[(120,45),(250,130),(80,95),(300,150),(175,25),(60,240),(410,90),(135,265)]),
       ('Eine Flasche hat %d dl. Wie viele dl sind in %d Flaschen?','*',[(5,6),(3,8),(7,4),(6,9),(8,5),(4,7),(9,3),(2,9)]),
       ('%d l Saft werden auf %d gleiche Gläser verteilt. Wie viele l hat jedes Glas?','/',[(24,6),(36,4),(40,8),(45,9),(63,7),(72,8),(48,6),(54,9)])]
    k=0
    for q,op,L in S:
        for i,(a,b) in enumerate(L):
            r={'+':a+b,'-':a-b,'*':a*b,'/':a//b}[op]
            sg={'+':'+','-':M,'*':'×','/':':'}[op]
            lvl=1 if i<2 else 2 if i<4 else 3
            t.card(lvl,q%(a,b),r,wr(r,0,1000000,R,deltas=(1,10,b,a)),hints=['Welche Rechnung passt zur Frage?'],steps=[['Rechnung: %d %s %d'%(a,sg,b),'Ansatz'],['%d %s %d = %d'%(a,sg,b,r),'Rechnen']],th='basis')
            if len(t.qs)<16 and i%3==0:
                t.exam(q%(a,b)+' ',None,ans=fv(r),expl='%d %s %d = %d'%(a,sg,b,r)) if False else None
    ex=[('Ein Kanister hat %d l. Es werden %d l verbraucht. Wie viele l bleiben?','-',(70,28)),('Ein Fass hat %d l. Ein zweites Fass hat %d l. Wie viele l sind es zusammen?','+',(340,160)),('Eine Flasche hat %d dl. Wie viele dl sind in %d Flaschen?','*',(9,8)),('%d l Saft werden auf %d gleiche Gläser verteilt. Wie viele l hat jedes Glas?','/',(56,7)),
        ('Ein Kanister hat %d l. Es werden %d l verbraucht. Wie viele l bleiben?','-',(90,45)),('Ein Fass hat %d l. Ein zweites Fass hat %d l. Wie viele l sind es zusammen?','+',(425,75)),('Eine Flasche hat %d dl. Wie viele dl sind in %d Flaschen?','*',(6,6)),('%d l Saft werden auf %d gleiche Gläser verteilt. Wie viele l hat jedes Glas?','/',(81,9))]
    for i,(q,op,(a,b)) in enumerate(ex*2):
        if len(t.qs)>=16:break
        if i>=8:a,b=a+ (b if op in '+-' else 0) if False else a,b
        r={'+':a+b,'-':a-b,'*':a*b,'/':a//b}[op];sg={'+':'+','-':M,'*':'×','/':':'}[op]
        if i>=8:
            a2,b2={'+':(a+10,b+5),'-':(a+10,b-2),'*':(a,b+1),'/':(a+b,b)}[op];a,b=a2,b2;r={'+':a+b,'-':a-b,'*':a*b,'/':a//b}[op]
        if i%2==0:t.exam(q%(a,b),r,wr(r,0,1000000,R,deltas=(1,10,b,a)),expl='%d %s %d = %d'%(a,sg,b,r))
        else:t.exam(q%(a,b),None,ans=fv(r),expl='%d %s %d = %d'%(a,sg,b,r))
    theory_steps(t,'Sachaufgaben erzählen eine kleine Geschichte. Du findest die Rechnung und löst sie.',[TBL(['Schritt','Beispiel'],[['Frage','Wie viele l bleiben?'],['Rechnung','25 − 8'],['Antwort','Es bleiben 17 l.']],None)],
        [['Sachaufgabe','Rechnen mit einer Geschichte','Kanister'],['Frage','Was wird gesucht?','Wie viele bleiben?'],['Rechnung','Plus, Minus, Mal, Durch','25 − 8'],['Antwort','Satz mit Einheit','17 l']],
        'Die Wörter verraten die Rechnung.',[TBL(['Wort','Rechnung'],[['zusammen, dazu','Plus'],['bleiben, weg','Minus'],['mehrmals, je','Mal'],['verteilen, gleiche Teile','Durch']],None)],
        'Vier Rechnungen, vier Hinweise.',['Rechnung','Beispiel'],[['Plus','120 l + 45 l'],['Minus','25 l − 8 l'],['Mal','5 dl × 6'],['Durch','24 l : 6']],
        'So löst du eine Sachaufgabe.',[['Lesen','Was ist gegeben?',0],['Frage','Was ist gesucht?',1],['Rechnen','Passende Rechnung',2],['Antworten','Satz mit Einheit',3]],
        [[['40 l, 15 l weg','gegeben',0],['40 − 15','Rechnung',1],['25 l','Antwort',2]],[['36 l, 4 Gläser','gegeben',0],['36 : 4','Rechnung',1],['9 l','Antwort',2]]],
        'Merke: Lesen, Frage, Rechnung, Antwort.',[['Frage','zuerst finden','Was ist gesucht?',0],['Rechnung','nach Hinweiswort','bleiben: Minus',1],['Antwort','mit Einheit','17 l',2]])
    return t
T.append(sach)
