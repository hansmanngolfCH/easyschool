"""Zusätzliche Fragetypen für Themen mit wenig Abwechslung. EX[id](t) ergänzt Karten und Prüfungsfragen."""
from cm import *
from th import BLK
def FB(*rows):return {"type":"fbar","rows":[list(r) for r in rows]}
EX={}
import pilot_plus100
EX[pilot_plus100.ID]=pilot_plus100.extend
import pilot_einmaleins
EX[pilot_einmaleins.ID]=pilot_einmaleins.extend
def ex(i):
    def d(f):EX[i]=f;return f
    return d
def both(t,lvl,q,a,wrong=None,ans=None,vis=None,hint='',step=None,exam=True):
    st=[[step or str(a),'Ergebnis']]
    t.card(lvl,q,a,wrong,ans=ans,hints=[hint] if hint else [],steps=st,vis=vis)
    if exam:t.exam(q,a,wrong,vis=vis,expl=step or str(a),ans=ans)
@ex('kl2-mathe-zahlenstrahl')
def _(t):
    r=t.rnd
    for n in [20,30,40,50,60,70,80]:
        both(t,2,'Welche Zahl ist 10 mehr als %d?'%n,n+10,wr(n+10,0,100,r,deltas=(1,5,20)),vis=[NL(n-10 if n>10 else 0,n+20,10,pts=[n])],hint='Ein Zehnersprung nach rechts.')
        both(t,2,'Welche Zahl ist 10 weniger als %d?'%n,n-10,wr(n-10,0,100,r,deltas=(1,5,20)),vis=[NL(max(0,n-30),n+10,10,pts=[n])],hint='Ein Zehnersprung nach links.')
    for a,b in [(10,30),(20,60),(40,80),(30,70),(50,90),(0,40)]:
        both(t,3,'Welche Zahl liegt in der Mitte von %d und %d?'%(a,b),(a+b)//2,wr((a+b)//2,0,100,r,deltas=(5,10,20)),hint='Halbiere den Abstand.',step='Mitte: %d'%((a+b)//2))
    for n in [20,40,60,80,30,50]:
        both(t,2,'Wie viele Zehnerschritte sind es von 0 bis %d?'%n,n//10,wr(n//10,0,10,r,deltas=(1,2)),vis=[NL(0,100,10,lab='ends')],hint='Zähle die langen Striche.')
@ex('kl2-mathe-nachbarzahlen')
def _(t):
    r=t.rnd
    for n in [24,37,58,63,71,45,89,16]:
        both(t,2,'Welche Zahl fehlt? %d, ?, %d'%(n-1,n+1),n,wr(n,0,100,r,deltas=(1,2,10)),hint='Die Zahl liegt zwischen den beiden.')
        both(t,2,'Welche Zahl hat die Nachbarn %d und %d?'%(n-1,n+1),n,wr(n,0,100,r,deltas=(1,2,10)))
    for n in [43,67,28,95,51]:
        both(t,3,'Zwischen welchen vollen Zehnern liegt %d?'%n,'%d und %d'%(n//10*10,n//10*10+10),[x for x in ['%d und %d'%(n//10*10-10,n//10*10),'%d und %d'%(n//10*10+10,n//10*10+20),'%d und %d'%(n//10*10,n//10*10+5)] if '110' not in x and '-' not in x],hint='Schau auf die Zehnerziffer.')
@ex('kl2-mathe-hunderterfeld')
def _(t):
    r=t.rnd
    for z,e in [(2,6),(4,3),(7,5),(5,0),(8,9),(3,4),(6,7),(1,2)]:
        n=z*10+e
        both(t,2,'Wie viele Zehner hat %d?'%n,z,wr(z,0,10,r,deltas=(1,2)),vis=[FLD(10,10,z*10,e,0,1)],hint='Zehner sind volle Reihen.')
        both(t,2,'Wie viele Einer hat %d?'%n,e,wr(e,0,9,r,deltas=(1,2)),vis=[FLD(10,10,z*10,e,0,1)],hint='Einer sind einzelne Punkte.')
        both(t,2,'%d Zehner und %d Einer: Welche Zahl ist das?'%(z,e),n,wr(n,10,99,r,deltas=(1,10)),hint='Zehner mal 10, dann Einer dazu.')
    for n in [23,34,45,56,67,38]:
        both(t,3,'Welche Zahl hat eine Reihe mehr als %d?'%n,n+10,wr(n+10,0,100,r,deltas=(1,2,10)),vis=[FLD(10,10,n//10*10,n%10,0,1)],hint='Eine Reihe sind 10.')
@ex('kl3-mathe-zahlen1000')
def _(t):
    r=t.rnd
    for n in [345,708,520,167,904,432,615,880]:
        h,z,e=n//100,n%100//10,n%10
        both(t,2,'%d Hunderter, %d Zehner und %d Einer: Welche Zahl ist das?'%(h,z,e),n,wr(n,100,999,r,deltas=(1,10,100)),vis=[BLK(h,z,e)])
        both(t,2,'Wie viele Zehner stehen in %d (nur die Zehnerstelle)?'%n,z,wr(z,0,9,r,deltas=(1,2,3)))
        both(t,3,'Welche Zahl ist 100 mehr als %d?'%n,n+100 if n+100<=1000 else n-100,wr(n+100 if n+100<=1000 else n-100,0,1000,r,deltas=(1,10,100)),hint='Nur die Hunderterziffer ändert sich.')
    for n in [250,430,670,810]:
        both(t,3,'Welche Zahl liegt in der Mitte von %d und %d?'%(n-50,n+50),n,wr(n,0,1000,r,deltas=(10,50,100)),vis=[NL(n-100,n+100,50,lab='ends',pts=[n])] if False else None)
@ex('kl3-mathe-runden')
def _(t):
    r=t.rnd
    for n in [14,26,35,48,53,67,71,89,92]:
        z=round(n/10+0.0001)*10 if n%10!=5 else n//10*10+10
        z=(n+5)//10*10
        both(t,2,'Runde %d auf Zehner.'%n,z,wr(z,0,100,r,deltas=(10,20)),vis=[NL(n//10*10,n//10*10+10,1,pts=[n],lab=r.choice(['all','ends']))],hint='Schau auf die Einer: 0 bis 4 ab, 5 bis 9 auf.')
    for n in [240,360,450,520,780,830,910]:
        h=(n+50)//100*100
        both(t,3,'Runde %d auf Hunderter.'%n,h,wr(h,0,1000,r,deltas=(100,200)),hint='Schau auf die Zehner.')
    for z in [20,30,50,70,80]:
        both(t,3,'Welche Zahl wird auf %d gerundet?'%z,z+3,[z+7,z+6,z-6] if z>=10 else None,hint='Sie liegt nahe bei %d.'%z)
    for n in [33,38,74,76]:
        both(t,2,'Wird %d auf- oder abgerundet (auf Zehner)?'%n,'abgerundet' if n%10<5 else 'aufgerundet',['aufgerundet' if n%10<5 else 'abgerundet'])
@ex('kl4-mathe-sachaufgaben')
def _(t):
    r=t.rnd;N=NAMES
    for i,(g,m) in enumerate([(3,2),(4,3),(5,2),(6,2),(4,5),(3,4)]):
        both(t,2,'%s füllt %d Gläser mit je %d dl. Wie viele dl sind das zusammen?'%(N[i],g,m),g*m,ans=[str(g*m)],hint='Gleiche Gruppen: mal rechnen.',step='%d × %d = %d'%(g,m,g*m))
    for i,(l,d) in enumerate([(2,5),(3,4),(1,7),(4,2)]):
        both(t,3,'Ein Krug hat %d l. %s schenkt %d dl ein. Wie viele dl bleiben?'%(l,N[i+2],d),l*10-d,ans=[str(l*10-d)],hint='Zuerst Liter in dl umrechnen.',step='%d l = %d dl, minus %d dl = %d dl'%(l,l*10,d,l*10-d))
    for i,(a,b) in enumerate([(25,35),(40,15),(30,45),(60,25)]):
        both(t,2,'%s trinkt %d cl und dann noch %d cl. Wie viele cl sind es zusammen?'%(N[i],a,b),a+b,ans=[str(a+b)],hint='Plus rechnen.',step='%d + %d = %d'%(a,b,a+b))
    for i,(f,k) in enumerate([(12,3),(20,4),(15,5),(18,6)]):
        both(t,3,'%d dl Saft werden auf %d gleiche Gläser verteilt. Wie viele dl hat ein Glas?'%(f,k),f//k,ans=[str(f//k)],hint='Teilen.',step='%d : %d = %d'%(f,k,f//k))
@ex('kl5-mathe-schriftlich-durch')
def _(t):
    r=t.rnd
    for a,b in [(84,4),(96,3),(68,2),(75,5),(63,3),(92,4),(86,2),(55,5)]:
        q=a//b
        both(t,2,'Rechne %d : %d.'%(a,b),q,ans=[str(q)],hint='Zerlege %d in Zehner und Einer.'%a,step='%d : %d = %d'%(a,b,q))
        both(t,3,'Probe: Welche Zahl mal %d ergibt %d?'%(b,a),q,wr(q,1,100,r,deltas=(1,2,10)),hint='Teilen ist das Gegenteil von Malnehmen.')
    for a,b in [(17,5),(23,4),(38,6),(47,5),(29,4),(34,8)]:
        both(t,3,'Rechne %d : %d. Welchen Rest gibt es?'%(a,b),a%b,wr(a%b,0,b-1 if b>1 else 1,r,deltas=(1,2)),hint='Wie oft passt %d in %d, was bleibt übrig?'%(b,a),step='%d : %d = %d Rest %d'%(a,b,a//b,a%b))
@ex('kl6-mathe-bruch-dezimal-prozent')
def _(t):
    r=t.rnd
    for p,fr in [(50,'1/2'),(25,'1/4'),(75,'3/4'),(20,'1/5'),(10,'1/10'),(40,'2/5')]:
        both(t,2,'Wie viele Felder von 100 sind bei %d %% gefärbt?'%p,p,wr(p,0,100,r,deltas=(5,10,25)),vis=[FLD(10,10,p)])
        both(t,3,'Welcher Bruch entspricht %d %%?'%p,fr,[x for x in ['1/2','1/4','3/4','1/5','1/10','2/5','3/10'] if x!=fr][:3],hint='%d %% = %d/100 – kürze.'%(p,p))
    for n in [200,300,500,800,400]:
        both(t,3,'Wie viel sind 10 %% von %d?'%n,n//10,wr(n//10,0,1000,r,deltas=(10,20,5)),hint='10 % ist ein Zehntel.')
    for d,p in [('0,5',50),('0,25',25),('0,75',75),('0,1',10),('0,2',20)]:
        both(t,2,'Wie viel Prozent sind %s?'%d,'%d %%'%p,['%d %%'%x for x in (p+5,p+10,p-5 if p>5 else p+20)],hint='Mal 100.')
@ex('kl5-mathe-brueche')
def _(t):
    r=t.rnd
    for n,k in [(2,1),(4,3),(8,5),(5,2),(10,7),(6,1),(3,2),(8,3),(10,9)]:
        both(t,2,'Der Bruch %d/%d: Wie viele Teile hat das Ganze?'%(k,n),n,wr(n,1,50,r,deltas=(1,2)),vis=[FB((n,k,'%d/%d'%(k,n)))],hint='Der Nenner steht unten.')
        both(t,2,'Der Bruch %d/%d: Wie viele Teile sind gefärbt?'%(k,n),k,wr(k,1,n,r,deltas=(1,2)),vis=[FB((n,k,'%d/%d'%(k,n)))],hint='Der Zähler steht oben.')
    for n in [2,3,4,5,6,8,10]:
        both(t,3,'Wie viele %s-Teile ergeben ein Ganzes?'%('Viertel' if n==4 else '1/%d'%n),n,wr(n,1,50,r,deltas=(1,2)),hint='Zähler gleich Nenner.')
    for a,b in [('1/2','1/4'),('1/3','1/5'),('1/4','1/8'),('3/4','1/4'),('2/5','4/5')]:
        big=a if eval(a)>eval(b) else b;sm=b if big==a else a
        both(t,3,'Welcher Bruch ist grösser: %s oder %s?'%(a,b),big,[sm],hint='Mehr Teile heisst kleineres Stück. Gleicher Nenner: mehr Teile ist mehr.')
@ex('kl5-mathe-flaeche')
def _(t):
    r=t.rnd
    for l,b in [(8,3),(9,4),(6,5),(7,6),(10,4),(5,5),(9,9),(8,8),(12,3)]:
        both(t,2,'Ein Rechteck ist %d cm lang und %d cm breit. Wie gross ist die Fläche (in cm²)?'%(l,b),l*b,wr(l*b,1,100,r,deltas=(2,l,b)),vis=[{"type":"area","c":min(l,10),"r":b,"a":min(l,10),"b":b,"la":'%d cm'%l,"lb":'%d cm'%b}] if l<=10 else None,hint='Länge mal Breite.',step='%d × %d = %d'%(l,b,l*b))
    for fl,l in [(24,6),(40,8),(36,9),(30,5),(48,8),(72,9)]:
        both(t,3,'Die Fläche ist %d cm² und die Länge %d cm. Wie breit ist das Rechteck (in cm)?'%(fl,l),fl//l,wr(fl//l,1,100,r,deltas=(1,2,3)),hint='Teilen: Fläche durch Länge.',step='%d : %d = %d'%(fl,l,fl//l))
    for a,b,c,d in [(6,4,8,3),(5,5,7,3),(9,2,6,3)]:
        big='%d × %d'%(a,b) if a*b>c*d else '%d × %d'%(c,d)
        both(t,3,'Welche Fläche ist grösser: %d × %d oder %d × %d?'%(a,b,c,d),big,['%d × %d'%(c,d) if big=='%d × %d'%(a,b) else '%d × %d'%(a,b)],hint='Rechne beide aus.')
@ex('kl5-mathe-volumen')
def _(t):
    r=t.rnd
    for l,b,h in [(4,3,2),(5,2,3),(3,3,3),(6,2,4),(5,4,2),(4,4,3),(2,2,2),(5,5,2)]:
        v=l*b*h
        if v<=100:
            both(t,2,'Ein Quader ist %d cm lang, %d cm breit und %d cm hoch. Wie gross ist das Volumen (in cm³)?'%(l,b,h),v,wr(v,1,100,r,deltas=(2,l,b)),vis=[{"type":"quader","l":'%d cm'%l,"b":'%d cm'%b,"h":'%d cm'%h}],hint='Länge mal Breite mal Höhe.',step='%d × %d × %d = %d'%(l,b,h,v))
            both(t,3,'In eine Schicht passen %d Würfel. Der Körper hat %d Schichten. Wie viele Würfel sind es?'%(l*b,h),v,wr(v,1,100,r,deltas=(2,l,b)),hint='Würfel pro Schicht mal Schichten.')
    for l,b,v in [(4,3,24),(5,2,30),(6,2,24),(5,4,40),(3,3,18)]:
        both(t,3,'Eine Schicht hat %d Würfel. Das Volumen ist %d cm³. Wie hoch ist der Quader (in cm)?'%(l*b,v),v//(l*b),wr(v//(l*b),1,100,r,deltas=(1,2)),hint='Volumen durch Würfel pro Schicht.')
@ex('kl6-mathe-erweitern-kuerzen')
def _(t):
    r=t.rnd
    for (z,n),k in [((1,2),3),((1,3),2),((2,3),2),((3,4),2),((1,4),3),((2,5),2),((1,5),4),((3,5),3)]:
        both(t,2,'Erweitere %d/%d mit %d.'%(z,n,k),'%d/%d'%(z*k,n*k),['%d/%d'%(z*k,n),'%d/%d'%(z,n*k),'%d/%d'%(z+k,n+k)],hint='Zähler und Nenner mal %d.'%k)
    for (z,n),k in [((2,4),2),((3,6),3),((4,8),4),((6,9),3),((10,20),10),((8,12),4),((5,10),5),((6,8),2)]:
        both(t,2,'Kürze %d/%d durch %d.'%(z,n,k),'%d/%d'%(z//k,n//k),['%d/%d'%(z//k,n),'%d/%d'%(z,n//k),'%d/%d'%(z//k+1,n//k)],hint='Zähler und Nenner durch %d.'%k)
    for (z,n),m in [((1,2),8),((1,3),9),((3,4),8),((2,5),10),((1,4),12),((2,3),9)]:
        k=m//n
        both(t,3,'Welche Zahl fehlt? %d/%d = ?/%d'%(z,n,m),z*k,wr(z*k,1,100,r,deltas=(1,2)),hint='Mit welcher Zahl wurde der Nenner malgenommen?')
