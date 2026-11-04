from cm import *
from th import *
import random
ID='kl3-mathe-einmaleins'
G1,G2,GR,ST=0,3,2,4   # erste Zahl blau, zweite orange, Ergebnis grün, Start violett
def theory():
    return [
    S("Worum geht es?","Hier lernst du das kleine Einmaleins. Es besteht aus den Malaufgaben von 1 × 1 bis 10 × 10. Du lernst, wie Malaufgaben gehen und wie du schwere Aufgaben aus leichten findest.",ARR(3,4,cap=''),KD([['Gruppen','Mal heisst gleiche Gruppen','3 × 4',G1],['Tauschen','Die Reihenfolge ist egal','3 × 4 = 4 × 3',G2],['Ableiten','Aus leichten Aufgaben','4 × 7 aus 2 × 7',GR],['Teilen','Die Umkehrung','12 : 3 = 4',ST]])),
    S("Mal heisst gleiche Gruppen","3 × 4 heisst: 3 Gruppen mit je 4 Punkten. Die erste Zahl sagt, wie viele Gruppen. Die zweite Zahl sagt, wie viele in jeder Gruppe sind. Zähle alle Punkte zusammen.",ARR(3,4),J(0,[[4,'+4',G2],[4,'+4',G2],[4,'+4',G2]]),CHN((3,'Gruppen',G1),('×','',2),(4,'je Gruppe',G2),('=','',2),(12,'Punkte',GR))),
    S("Leichte Reihen zuerst","Beginne mit den leichten Reihen: 2er, 5er und 10er. Von hier aus findest du fast alle anderen Aufgaben. Sprich die Reihen laut und zähle dazu mit.",LINES([['2, 4, 6, 8, 10, 12, 14, 16, 18, 20','2er-Reihe'],['5, 10, 15, 20, 25, 30, 35, 40, 45, 50','5er-Reihe'],['10, 20, 30, 40, 50 … 100','10er-Reihe']])),
    S("Tauschen","Du darfst die Zahlen tauschen. 3 × 7 und 7 × 3 geben beide 21. So musst du nur die Hälfte der Aufgaben lernen. Schau dir die beiden Bilder an.",ARR(3,7,cap='3 Reihen mit je 7'),ARR(7,3,col=2,cap='7 Reihen mit je 3'),CHN(('3 × 7','',G1),('=','',2),('7 × 3','',G2),('=','',2),(21,'',GR))),
    S("Verdoppeln","Die 4er-Reihe ist das Doppelte der 2er-Reihe. Rechne 4 × 7 so: Zuerst 2 × 7, dann verdoppeln.",BAR2([[14,'2 × 7',G1],[14,'2 × 7',G1]],''),LINES([['2 × 7 = 14','Schritt 1: leichte Aufgabe'],['14 + 14 = 28','Schritt 2: verdoppeln'],['4 × 7 = 28','Schritt 3: Ergebnis']],True),CHN(('2 × 7','',G1),('+','',2),('2 × 7','',G1),('=','',2),(28,'4 × 7',GR))),
    S("Halbieren","Die 5er-Reihe ist die Hälfte der 10er-Reihe. Rechne 5 × 8 so: Zuerst 10 × 8, dann halbieren.",BAR2([[40,'5 × 8',G1],[40,'5 × 8',G1]],''),LINES([['10 × 8 = 80','Schritt 1: leichte Aufgabe'],['80 : 2 = 40','Schritt 2: halbieren'],['5 × 8 = 40','Schritt 3: Ergebnis']],True),CHN(('10 × 8','',G1),('=','',2),(80,'',G1),(':','',2),(2,'',2),('=','',2),(40,'5 × 8',GR))),
    S("Eine Gruppe mehr","Bei 6 × 7 nimmst du die 5er-Aufgabe und eine Gruppe dazu. Im Bild siehst du beide Teile. Die Farben zeigen, was zusammengehört.",ARR(6,7,split=5,rows=True,col=2),LINES([['5 × 7 = 35','Schritt 1: Kernaufgabe'],['35 + 7 = 42','Schritt 2: eine Gruppe dazu'],['6 × 7 = 42','Schritt 3: Ergebnis']],True),CHN(('6 × 7','',ST),('=','',2),('5 × 7','blau',G1),('+','',2),(7,'gelb',G2),('=','',2),(42,'',GR))),
    S("Eine Gruppe weniger","Bei 9 × 4 nimmst du die 10er-Aufgabe und nimmst eine Gruppe weg. Das geht oft schneller als zählen.",ARR(10,4,split=9,rows=True,col=2),LINES([['10 × 4 = 40','Schritt 1: Kernaufgabe'],['40 − 4 = 36','Schritt 2: eine Gruppe weg'],['9 × 4 = 36','Schritt 3: Ergebnis']],True),CHN(('10 × 4','',G1),('−','',2),(4,'',G2),('=','',2),(36,'9 × 4',GR))),
    S("Zerlegen","Eine schwere Aufgabe zerlegst du in zwei leichte. Bei 7 × 8 nimmst du 5 Reihen und 2 Reihen. Das nennt man Malkreuz. Links steht, wie viele Reihen es sind.",ARR(7,8,split=5,rows=True,col=2),TBL(None,[['5','5 × 8 = 40'],['2','2 × 8 = 16']],[0,3]),LINES([['5 × 8 = 40','Schritt 1: erster Teil'],['2 × 8 = 16','Schritt 2: zweiter Teil'],['40 + 16 = 56','Schritt 3: zusammen']],True)),
    S("Ein Bild, vier Aufgaben","Zu einem Punktefeld gehören vier Aufgaben. Zwei sind Malaufgaben. Zwei sind Teilaufgaben. Teilen ist die Umkehrung von Mal.",ARR(4,5),LINES([['4 × 5 = 20','Mal'],['5 × 4 = 20','Tauschen'],['20 : 5 = 4','Teilen'],['20 : 4 = 5','Teilen']])),
    S("Mal 0 und mal 1","Bei Mal 1 hast du nur eine Gruppe. Das Ergebnis ist die Zahl selbst. Bei Mal 0 hast du keine Gruppe. Das Ergebnis ist immer 0. Tauschen geht auch hier.",ARR(1,6,col=0),LINES([['1 × 6 = 6','Eine Gruppe mit 6'],['6 × 1 = 6','Tauschen'],['0 × 6 = 0','Keine Gruppe'],['6 × 0 = 0','Tauschen']])),
    S("Typischer Fehler","Mia rechnet 7 × 6 = 36. Das stimmt nicht. 36 ist 6 × 6. Mia hat eine Gruppe vergessen. Rechne bei Zweifeln mit einer Kernaufgabe nach.",LINES([['5 × 6 = 30','Schritt 1: Kernaufgabe'],['30 + 6 = 36','Schritt 2: erst 6 Gruppen'],['36 + 6 = 42','Schritt 3: noch eine Gruppe']],True),CHN(('7 × 6','',ST),('=','',2),('36 ❌','Mia',1)),CHN(('7 × 6','',ST),('=','',2),('42 ✔️','richtig',GR))),
    MERKE([['Tauschen','a × b = b × a','3 × 7 = 7 × 3',G1],['Zerlegen','5er plus Rest','7 × 8 = 40 + 16',G2],['Ableiten','mehr, weniger, doppelt','9 × 4 = 40 − 4',ST]],"Merke dir diese drei Wege.")]
def extend(t):
    r=random.Random(91);N=NAMES
    t.cards=[];t.seen=set();t.qs=[]
    def fw(w):return None if w is None else [x for x in w if not isinstance(x,int) or 0<=x<=100]
    def card(l,q,a,wrong=None,ans=None,vis=None,hint='',h2=None,step=None,th='basis'):
        t.card(l,q,a,fw(wrong),ans=ans,hints=([hint]+([h2] if h2 else [])) if hint else [],steps=[[step or str(a),'Rechenweg']],vis=vis,th=th)
    def exam(q,a,wrong=None,ans=None,vis=None,step=None):
        t.exam(q,a,fw(wrong),vis=vis,expl=step or str(a),ans=ans)
    def w(a,d=(1,2,10)):return wr(a,0,100,r,deltas=d)
    # A Kernaufgaben
    for a,b,h in [(2,7,'Die 2er-Reihe: 2, 4, 6, 8 …'),(5,6,'Die 5er-Reihe: 5, 10, 15 …'),(10,4,'Bei 10 × kommt eine Null dazu.'),(5,9,'Die 5er-Reihe endet immer auf 0 oder 5.'),(2,8,'Verdopple die 8.'),(10,7,'Hänge eine Null an die 7.'),(1,9,'Eine Gruppe mit 9 sind 9.'),(5,4,'Die 5er-Reihe: 5, 10, 15, 20.'),(2,9,'Verdopple die 9.'),(10,3,'Hänge eine Null an die 3.')]:
        card(1,'%d × %d = ?'%(a,b),a*b,w(a*b,(a,b,10,5)),hint=h,step='%d × %d = %d'%(a,b,a*b))
    # B Punktefeld lesen
    for a,b in [(3,4),(4,5),(2,6),(5,3),(3,7),(4,6)]:
        card(1,'Welche Aufgabe gehört zum Punktefeld?','%d × %d'%(a,b),['%d + %d'%(a,b),'%d × %d'%(a,b+1),'%d × %d'%(a+1,b)],vis=[ARR(a,b)],hint='Zähle die Reihen und dann die Punkte in einer Reihe.',step='%d Reihen mit je %d: %d × %d = %d'%(a,b,a,b,a*b))
    for a,b in [(3,5),(4,4),(2,9),(5,6)]:
        card(1,'Wie viele Punkte sind es?',a*b,w(a*b,(a,b,1,5)),vis=[ARR(a,b)],hint='Rechne Reihen mal Punkte pro Reihe.',step='%d × %d = %d'%(a,b,a*b))
    # C Tauschen
    for a,b in [(3,8),(6,4),(7,5),(9,3),(8,6)]:
        card(1 if a*b<=40 else 2,'Welche Aufgabe hat dasselbe Ergebnis wie %d × %d?'%(a,b),'%d × %d'%(b,a),['%d × %d'%(a,b+1),'%d + %d'%(b,a),'%d × %d'%(b+1,a)],hint='Bei Mal darfst du tauschen.',th='tausch',step='%d × %d = %d × %d'%(a,b,b,a))
    # D Verdoppeln
    for a,b,k in [(4,7,2),(4,6,2),(4,8,2),(4,9,2),(8,4,4),(8,6,4)]:
        c=k*b
        card(2,'%d × %d = %d. Wie viel ist %d × %d?'%(k,b,c,a,b),a*b,w(a*b,(b,c,10)),hint='Verdopple das Ergebnis.',h2='%d + %d'%(c,c),step='%d + %d = %d'%(c,c,a*b))
    # E Halbieren
    for b in [6,8,7,9]:
        card(2,'10 × %d = %d. Wie viel ist 5 × %d?'%(b,10*b,b),5*b,w(5*b,(5,10,b)),hint='Halbiere das Ergebnis.',h2='Die Hälfte von %d.'%(10*b),step='%d : 2 = %d'%(10*b,5*b))
    # F Gruppe mehr
    for a,b,k in [(6,7,5),(3,8,2),(3,9,2),(6,8,5),(6,9,5),(3,6,2)]:
        c=k*b
        card(2,'%d × %d = %d. Wie viel ist %d × %d?'%(k,b,c,a,b),a*b,w(a*b,(b,1,10)),hint='Eine Gruppe mehr: Zähle %d dazu.'%b,step='%d + %d = %d'%(c,b,a*b))
    # G Gruppe weniger
    for b in [7,6,8,9,5]:
        card(3,'10 × %d = %d. Wie viel ist 9 × %d?'%(b,10*b,b),9*b,w(9*b,(b,1,10)),hint='Eine Gruppe weniger: Nimm %d weg.'%b,step='%d − %d = %d'%(10*b,b,9*b))
    # H Zerlegen
    for a,b in [(7,8),(7,6),(7,9),(7,4)]:
        card(3,'%d × %d = 5 × %d + 2 × %d = ?'%(a,b,b,b),a*b,w(a*b,(b,2,10)),vis=[ARR(a,b,split=5,rows=True,col=2)],hint='Rechne 5 × %d und 2 × %d einzeln.'%(b,b),h2='%d + %d'%(5*b,2*b),th='tausch',step='%d + %d = %d'%(5*b,2*b,a*b))
    # I Malkreuz
    for b in [8,6,9,7]:
        card(3,'Malkreuz: Welche Zahl gehört auf das Fragezeichen?',2*b,w(2*b,(2,b,10)),vis=[TBL(None,[['5','5 × %d = %d'%(b,5*b)],['2','2 × %d = ?'%b]],[0,3])],hint='Rechne 2 × %d.'%b,th='tausch',step='2 × %d = %d'%(b,2*b))
    # J Ergänzen und Teilen
    for a,b in [(5,7),(2,9),(3,6),(4,8),(6,5),(9,3)]:
        card(2,'%d × ? = %d'%(a,a*b),b,w(b,(1,2)) if True else None,hint='Welche Zahl mal %d gibt %d?'%(a,a*b),step='%d × %d = %d'%(a,b,a*b))
    for a,b in [(4,5),(3,6),(5,4),(2,8)]:
        card(2,'%d : %d = ?'%(a*b,b),a,w(a,(1,2)),vis=[ARR(a,b)],hint='Wie viele Reihen mit %d passen in %d?'%(b,a*b),step='%d × %d = %d'%(a,b,a*b))
    for a,b in [(24,4),(18,3),(35,5),(48,6),(42,7),(72,8)]:
        card(3,'%d : %d = ?'%(a,b),a//b,w(a//b,(1,2)),hint='Denke an die Malaufgabe: ? × %d = %d.'%(b,a),step='%d × %d = %d'%(a//b,b,a))
    # K Fehler
    for a,b,k in [(7,6,'min'),(6,8,'ok'),(9,7,'plus'),(8,7,'ok'),(7,9,'min'),(6,9,'plus')]:
        c=a*b;shown={'min':c-b,'ok':c,'plus':c+a}[k]
        corr='Es stimmt alles' if k=='ok' else 'Falsch, richtig ist %d'%c
        fh=['Es stimmt alles']+['Falsch, richtig ist %d'%x for x in (c,c+10,c-10,c+a) if x!=shown and 0<=x<=100]
        nm=N[(a*b)%len(N)]
        opts=[x for x in fh if x!=corr]
        card(3,'%s rechnet %d × %d = %d. Was stimmt?'%(nm,a,b,shown),corr,opts,hint='Rechne mit einer Kernaufgabe nach.',step='%d × %d = %d'%(a,b,c))
    # L Sachaufgaben
    sa=[('Ein Päckli hat 6 Karten. Wie viele Karten sind in 7 Päckli?',42,'7 × 6'),('Eine Spinne hat 8 Beine. Wie viele Beine haben 9 Spinnen?',72,'9 × 8'),('In einer Schachtel sind 9 Kugeln. Wie viele Kugeln sind in 6 Schachteln?',54,'6 × 9'),('Ein Tisch hat 4 Beine. Wie viele Beine haben 8 Tische?',32,'8 × 4'),('In jeder Reihe sitzen 5 Kinder. Es hat 9 Reihen. Wie viele Kinder sind es?',45,'9 × 5')]
    for q,a,s in sa:card(3,q,a,w(a,(5,6,8,10)),hint='Gleich grosse Gruppen: Rechne mal.',step=s+' = '+str(a))
    for a,b,nm in [(24,4,'Mia'),(30,5,'Leo'),(36,6,'Nora'),(28,7,'Ben')]:
        card(3,'%d Kinder bilden Gruppen mit je %d Kindern. Wie viele Gruppen sind es?'%(a,b),a//b,w(a//b,(1,2)),hint='Wie oft passt %d in %d?'%(b,a),step='%d : %d = %d'%(a,b,a//b))
    # M Muster
    for s,n in [(3,4),(4,5),(6,4),(8,3),(7,4)]:
        seq=[s*i for i in range(1,n+1)]
        card(2,'Setze fort: '+', '.join(map(str,seq))+', ?',s*(n+1),w(s*(n+1),(s,1,2)),vis=[J(0,[[s,'+%d'%s,G2] for _ in range(n)]+[[s,'?',G2]],hide=True)],hint='Jeder Sprung ist %d gross.'%s,step='%d + %d = %d'%(seq[-1],s,s*(n+1)))
    # O Nuller und Einser
    for q,a,h in [('0 × 7 = ?',0,'Null Gruppen mit 7: Das ist nichts.'),('1 × 8 = ?',8,'Eine Gruppe mit 8 ist 8.'),('9 × 0 = ?',0,'Tauschen: 0 × 9. Null Gruppen sind nichts.'),('6 × 1 = ?',6,'Tauschen: 1 × 6. Eine Gruppe mit 6 ist 6.')]:
        card(2,q,a,[x for x in (1,7,8,9,6,10) if x!=a][:3],hint=h,step=q.replace('?',str(a)))
    # --- Prüfung: andere Zahlen als bei den Karten ---
    for a,b in [(5,8),(2,6),(10,9)]:
        exam('%d × %d = ?'%(a,b),a*b,w(a*b,(a,b,10)),step='%d × %d = %d'%(a,b,a*b))
    for a,b in [(4,9),(6,6)]:
        exam('%d × %d = ?'%(a,b),None,ans=[str(a*b)],step='%d × %d = %d'%(a,b,a*b))
    exam('Welche Aufgabe gehört zum Punktefeld?','4 × 7',['4 + 7','4 × 8','5 × 7'],vis=[ARR(4,7)],step='4 Reihen mit je 7')
    exam('Welche Aufgabe hat dasselbe Ergebnis wie 4 × 9?','9 × 4',['4 × 10','4 + 9','9 × 5'],step='Tauschen')
    exam('4 × 3 = 12. Wie viel ist 8 × 3?',24,[21,36,15],step='12 + 12 = 24')
    exam('10 × 5 = 50. Wie viel ist 5 × 5?',25,[15,45,55],step='50 : 2 = 25')
    exam('5 × 6 = 30. Wie viel ist 6 × 6?',36,[32,42,35],step='30 + 6 = 36')
    exam('10 × 3 = 30. Wie viel ist 9 × 3?',27,[21,33,37],step='30 − 3 = 27')
    exam('7 × 7 = 5 × 7 + 2 × 7 = ?',49,[42,56,47],vis=[ARR(7,7,split=5,rows=True,col=2)],step='35 + 14 = 49')
    exam('6 × ? = 54',9,[8,7,10],step='6 × 9 = 54')
    exam('56 : 7 = ?',8,[7,9,6],step='8 × 7 = 56')
    exam('45 : 9 = ?',None,ans=['5'],step='5 × 9 = 45')
    exam('Setze fort: 7, 14, 21, ?',28,[24,27,35],step='21 + 7 = 28')
    exam('Ben rechnet 8 × 6 = 54. Was stimmt?','Falsch, richtig ist 48',['Es stimmt alles','Falsch, richtig ist 58','Falsch, richtig ist 44'],step='8 × 6 = 48')
    exam('Lea rechnet 9 × 9 = 81. Was stimmt?','Es stimmt alles',['Falsch, richtig ist 72','Falsch, richtig ist 91','Falsch, richtig ist 90'],step='9 × 9 = 81')
    exam('Ein Auto hat 4 Räder. Wie viele Räder haben 7 Autos?',28,[24,32,21],step='7 × 4 = 28')
    exam('Auf jedem Teller liegen 6 Kekse. Es hat 8 Teller. Wie viele Kekse sind es?',None,ans=['48'],step='8 × 6 = 48')
    exam('32 Kinder bilden Gruppen mit je 4 Kindern. Wie viele Gruppen sind es?',8,[7,9,28],step='32 : 4 = 8')
    exam('Malkreuz: 8 × 7 = 5 × 7 + 3 × 7. Welche Zahl gehört auf das Fragezeichen?',21,[15,24,28],vis=[TBL(None,[['5','5 × 7 = 35'],['3','3 × 7 = ?']],[0,3])],step='3 × 7 = 21')
    exam('3 × 9 = 2 × 9 + ?',9,[3,6,18],step='Eine Gruppe mehr: 9')
    random.Random(8).shuffle(t.qs)
    for i,q in enumerate(t.qs):q['id']='q%d'%(i+1)
