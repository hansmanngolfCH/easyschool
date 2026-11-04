from cm import *
from th import *
import random
ID='kl2-mathe-plus100'
Z,E,SUM,ERR=0,3,2,1   # Chip-Farben: Zehner blau, Einer orange, Ergebnis grün, Rot nur für Fehler
def theory():
    return [
    S("Zwei Zahlen zusammen","Bei 34 + 25 legst du beide Zahlen ins Hunderterfeld. Zusammen sind es 59.",FLD(10,10,34,25,0,1,cap='34 grün + 25 blau = 59')),
    S("Zerlegen","25 sind 2 Zehner und 5 Einer.",BLK(0,2,5,cap='25 = 2 Zehner + 5 Einer'),BAR2([[20,'20'],[5,'5']],'25 = 20 + 5',1)),
    S("Erst Zehner, dann Einer","Springe zuerst 20, dann 5.",J(34,[[20,'+20'],[5,'+5']],'34 → 54 → 59'),CHN((34,'Start',Z),('+ 20','Zehner',Z),(54,'',SUM),('+ 5','Einer',E),(59,'Ziel',SUM))),
    S("Zehner und Einer getrennt","So rechnest du 34 + 25 auch: alle Zehner und alle Einer einzeln.",KD([['Zehner','30 + 20','= 50',0],['Einer','4 + 5','= 9',3],['Zusammen','50 + 9','= 59',2]])),
    S("Bis zum Zehner","Bei 38 + 5 gehst du zuerst bis 40. Dafür brauchst du 2. Dann bleiben 3.",J(38,[[2,'+2'],[3,'+3']],'38 → 40 → 43'),CHN((5,'',E),('=','',2),(2,'bis 40',E),('+','',2),(3,'Rest',E))),
    S("Mit zwei Zahlen über den Zehner","Bei 36 + 27: erst 20 dazu, dann bis 60, dann der Rest.",J(36,[[20,'+20'],[4,'+4'],[3,'+3']],'36 → 56 → 60 → 63'),CHN((36,'Start',Z),('+ 20','',Z),(56,'',SUM),('+ 4','bis 60',E),(60,'',SUM),('+ 3','Rest',E),(63,'Ziel',SUM))),
    S("Geschickt rechnen","Beim Plus darfst du tauschen. 3 + 45 ist gleich viel wie 45 + 3.",CHN(('3 + 45','',Z),('=','',2),('45 + 3','',Z),('=','',2),(48,'',SUM)),CHN(('35 + 35','',Z),('=','',2),(70,'',SUM)),CHN(('35 + 36','',Z),('=','',2),('70 + 1','1 mehr',E),('=','',2),(71,'',SUM))),
    S("Typischer Fehler","Ben rechnet 36 + 27 = 53. Das stimmt nicht. 6 + 7 sind 13. Das ist ein Zehner und 3 Einer. Den Zehner hat Ben vergessen.",CHN(('36 + 27','',Z),('=','',2),('53 ❌','Ben',ERR)),CHN(('36 + 27','',Z),('=','',2),('63 ✔️','richtig',SUM))),
    S("Probe","Mit Minus rechnest du zurück. Kommst du am Start an, stimmt es.",J(59,[[-20,'−20'],[-5,'−5']],'59 − 25 = 34'),CHN((34,'Start',Z),('+ 25','',Z),(59,'',SUM),('− 25','',E),(34,'wieder da',SUM))),
    S("Zahlenmauer","Zwei Steine nebeneinander ergeben zusammen den Stein darüber.",{"type":"wall","rows":[[80],[30,50],[10,20,30]]},CHN(('10 + 20','',Z),(30,'',SUM),('20 + 30','',Z),(50,'',SUM),('30 + 50','',Z),(80,'oben',SUM))),
    S("Bis 100 ergänzen","Wie viel fehlt bis 100? Gehe erst bis zum Zehner, dann bis 100.",J(35,[[5,'+5'],[60,'+60']],'35 → 40 → 100'),CHN((5,'bis 40',E),('+','',2),(60,'bis 100',Z),('=','',2),(65,'fehlt',SUM))),
    MERKE([['Zehner und Einer','einzeln rechnen','34 + 25: 30+20, 4+5',0],['Bis zum Zehner','dann den Rest','38 + 5 = 38 + 2 + 3',1],['Probe','Rückweg mit Minus','59 − 25 = 34',2]],"Merke dir diese drei Wege.")]
def extend(t):
    r=random.Random(77);N=NAMES
    t.cards=[c for c in t.cards if c.get('th')!='uber' or True];t.seen=set(t.seen)
    def fw(w):return None if w is None else [x for x in w if not isinstance(x,int) or 0<=x<=100]
    def card(l,q,a,wrong=None,ans=None,vis=None,hint='',step=None,h2=None):
        wrong=fw(wrong)
        t.card(l,q,a,wrong,ans=ans,hints=[hint]+([h2] if h2 else []) if hint else [],steps=[[step or str(a),'Rechenweg']],vis=vis)
    def exam(q,a,wrong=None,ans=None,vis=None,step=None):
        wrong=fw(wrong)
        t.exam(q,a,wrong,vis=vis,expl=step or str(a),ans=ans)
    def w3(a,deltas=(1,10,2)):return wr(a,0,100,r,deltas=deltas)
    def path(a,b):
        e=b%10;z=(a+9)//10*10
        return '%d + %d: %s'%(a,b,' → '.join(str(x) for x in [a,a+b//10*10]+([z+b//10*10,a+b] if a%10+e>10 else [a+b]) if True) )
    # --- Karten ---
    for n in [25,38,47,56,63,71]:
        card(1,'%d = %d + ?'%(n,n//10*10),n%10,wr(n%10,0,9,r,deltas=(1,2,3)),hint='Wie viele Einer hat die Zahl?',vis=[BLK(0,n//10,n%10)])
    for n in [38,47,56,69,73,84]:
        z=(n+9)//10*10
        card(1,'%d + ? = %d'%(n,z),z-n,wr(z-n,1,10,r,deltas=(1,2,3)),hint='Wie weit bis zum nächsten Zehner?',vis=[J(n,[[z-n,'?']],hide=True)])
    for a,b in [(36,27),(48,35),(29,46),(57,18),(38,45),(25,37),(49,24),(19,54),(66,17),(78,15)]:
        s=a+b;nc=(a//10+b//10)*10+(a%10+b%10)%10
        card(3,'%d + %d = ?'%(a,b),s,[nc,s+10,s-10,s+1],hint='Gehe zuerst bis zum vollen Zehner.',h2='Rechne die Einer: %d + %d.'%(a%10,b%10),step='%d → %d → %d'%(a,(a//10+b//10)*10+a%10,s) if False else '%d + %d = %d'%(a,b,s))
    for a,b in [(34,5),(52,6),(41,8),(63,4),(27,2),(75,3)]:
        card(1,'%d + %d = ?'%(a,b),a+b,w3(a+b,(1,2,10)),hint='Zähle die Einer dazu.',vis=[BLK(0,a//10,a%10)])
    for a,b in [(34,25),(42,36),(51,28),(23,45),(60,17),(38,26),(27,35),(46,39)]:
        c=a+b
        if (a%10+b%10)<=9:
            card(2,'%d + ? = %d'%(a,c),b,w3(b,(1,2,10)),hint='Rechne: Ziel minus Start.')
        else:
            card(3,'%d + ? = %d'%(a,c),b,w3(b,(1,2,10)),hint='Gehe erst zum Zehner, dann weiter.')
    for a,b in [(3,45),(6,52),(4,63),(7,31),(5,74)]:
        card(2,'Welche Aufgabe hat dasselbe Ergebnis wie %d + %d?'%(a,b),'%d + %d'%(b,a),['%d + %d'%(a,b+1),'%d − %d'%(b,a),'%d + %d'%(a+1,b)],hint='Beim Plus darfst du tauschen.')
    for a,b,h in [(35,36,'35 + 35'),(45,46,'45 + 45'),(25,26,'25 + 25')]:
        card(2,'%d + %d: Welche Aufgabe hilft dir dabei?'%(a,b),h,['%d + %d'%(a,b+10),'%d − %d'%(a,5),'%d + %d'%(b+1,b+1)],hint='Die zwei Zahlen sind fast gleich.')
    for a,b in [(48,31),(22,19),(39,52),(61,28),(14,66)]:
        s=a+b;near=(s+5)//10*10
        opts=[x for x in (near+10,near-10,near+20,near-20) if 0<=x<=100]
        card(2,'%d + %d: Ist das Ergebnis etwa %d, %d oder %d?'%(a,b,near-10 if near>=10 else near+10,near,near+10 if near<100 else near-20),near,[near-10 if near>=10 else near+10,near+10 if near<100 else near-20],hint='Runde beide Zahlen auf Zehner.',step='%d + %d ist etwa %d'%(a,b,near)) if s!=near else None
    for i,(b1,b2,b3) in enumerate([(10,20,30),(20,30,10),(15,25,20),(30,10,40),(12,18,20)]):
        m1,m2=b1+b2,b2+b3;top=m1+m2
        if i%3==0:
            card(2 if b1%10==0 and b2%10==0 else 3,'Zahlenmauer: Welche Zahl gehört auf den leeren Stein?',top,w3(top,(1,10,20)),vis=[{"type":"wall","rows":[['?'],[m1,m2],[b1,b2,b3]]}],hint='Zwei Nachbarn ergeben den Stein darüber.')
        elif i%3==1:
            card(3,'Zahlenmauer: Welche Zahl gehört auf den leeren Stein unten?',b1,w3(b1,(1,10,5)),vis=[{"type":"wall","rows":[[top],[m1,m2],['?',b2,b3]]}],hint='Der Stein darüber ist %d. Mit %d + ? = %d.'%(m1,b2,m1))
        else:
            card(3,'Zahlenmauer: Welche Zahl gehört auf den leeren Stein in der zweiten Reihe?',m2,w3(m2,(1,10,5)),vis=[{"type":"wall","rows":[[top],[m1,'?'],[b1,b2,b3]]}],hint='Zwei Nachbarn ergeben den Stein darüber.')
    for s0,ops in [(25,[10,4,20]),(31,[20,5,10]),(40,[7,20,10]),(18,[10,10,6]),(52,[4,30,2]),(28,[5,30,7]),(37,[6,20,8])]:
        tot=s0+sum(ops);ch=[s0]
        for o in ops:ch.append(ch[-1]+o)
        card(2 if all(o%10==0 or (s0%10+o<10) for o in ops) else 3,'Rechenkette: %d %s = ?'%(s0,' '.join('+ %d'%o for o in ops)),tot,w3(tot,(1,10,2)),hint='Rechne Schritt für Schritt.',step=' → '.join(map(str,ch)))
    # Fehler finden (vier Fälle)
    cases=[(36,27,'carry'),(48,35,'ok'),(29,46,'ones'),(57,18,'tens'),(38,45,'carry'),(25,37,'ok'),(44,38,'ones'),(52,29,'tens')]
    for a,b,k in cases:
        s=a+b
        shown={'carry':(a//10+b//10)*10+(a%10+b%10)%10,'ok':s,'ones':s+1 if s%10!=9 else s-1,'tens':s+10 if s<=90 else s-10}[k]
        corr={'carry':'Den Zehner vergessen','ok':'Es stimmt alles','ones':'Die Einer falsch gerechnet','tens':'Die Zehner falsch gerechnet'}[k]
        if k=='carry' and shown==s:continue
        opts=[x for x in ['Den Zehner vergessen','Es stimmt alles','Die Einer falsch gerechnet','Die Zehner falsch gerechnet'] if x!=corr]
        card(3,'%s rechnet %d + %d = %d. Was stimmt?'%(N[(a+b)%8],a,b,shown),corr,opts,hint='Rechne selbst nach: erst die Zehner, dann die Einer.',step='%d + %d = %d'%(a,b,s))
    # Einkauf mit Artikeln
    sh=[('ein Heft','Stifte',45,28,'Mia'),('einen Ball','ein Seil',32,19,'Leo'),('ein Buch','eine Karte',54,36,'Nora'),('eine Mütze','einen Schal',27,48,'Ben'),('ein Spiel','eine Tasche',65,48,'Lea'),('eine Flasche','ein Brot',57,46,'Noah')]
    for it1,it2,p1,p2,nm in sh:
        card(2,'%s kauft %s für %d Fr. und %s für %d Fr. Wie viel bezahlt %s zusammen?'%(nm,it1,p1,it2,p2,'sie' if nm in('Mia','Nora','Lea') else 'er'),p1+p2,ans=[str(p1+p2)] if p1+p2<=100 else None,wrong=None if p1+p2<=100 else [p1+p2-10,p1+p2+10,p1+p2+1],hint='Plus rechnen: erst Zehner, dann Einer.',step='%d + %d = %d'%(p1,p2,p1+p2)) if p1+p2<=100 else None
        card(3,'%s hat 100 Fr. und kauft %s für %d Fr. und %s für %d Fr. Reicht das Geld?'%(nm,it1,p1,it2,p2),'ja' if p1+p2<=100 else 'nein',['nein' if p1+p2<=100 else 'ja'],hint='Schätze zuerst, dann rechne.',step=('%d + %d = %d'%(p1,p2,p1+p2)) if p1+p2<=100 else '%d + %d ist mehr als 100'%(p1,p2))
    # Bis 100 ergänzen (mit Zwischenhalt)
    for n in [35,48,62,77,86,54]:
        z=(n+9)//10*10
        card(3,'%d + ? = 100'%n,100-n,w3(100-n,(1,10,5)),hint='Erst bis zum nächsten Zehner, dann bis 100.',vis=[J(n,[[z-n,'+%d'%(z-n)],[100-z,'?']],hide=False)])
    # Rechenstrich-Ende
    for a,b in [(34,25),(47,31),(52,26),(25,63)]:
        card(2,'Welche Zahl liegt am Ende des Rechenstrichs?',a+b,w3(a+b,(1,2,10)),vis=[J(a,[[b//10*10,'+%d'%(b//10*10)],[b%10,'+%d'%(b%10)]],hide=True)],hint='Rechne alle Sprünge.')
    # Probe
    for a,b in [(34,25),(43,28),(52,19),(61,27)]:
        card(2,'Wie rechnest du die Probe zu %d + %d = %d?'%(a,b,a+b),'%d − %d = %d'%(a+b,b,a),['%d + %d = %d'%(a,b,a+b),'%d − %d = %d'%(a+b,b,a+1),'%d − %d = %d'%(a+b,a+1,b)],hint='Mit Minus gehst du zum Start zurück.')
    # --- Prüfung neu: 20 gemischte Fragen, andere Zahlen als bei den Karten ---
    t.qs=[]
    ex=[]
    for a,b in [(43,26),(32,54),(58,23),(47,36),(29,64)]:
        s=a+b;nc=(a//10+b//10)*10+(a%10+b%10)%10
        exam('%d + %d = ?'%(a,b),s,[nc if nc!=s else s+1,s+10,s-1,s+1][:3] if nc!=s else [s+10,s-10,s+1],step='%d + %d = %d'%(a,b,s))
    for a,b in [(53,35),(61,28)]:
        exam('%d + %d = ?'%(a,b),None,ans=[str(a+b)],step='%d + %d = %d'%(a,b,a+b))
    for n,m in [(42,67),(55,81)]:
        exam('%d + ? = %d'%(n,m),m-n,wr(m-n,0,100,r,deltas=(1,2,10)),step='%d − %d = %d'%(m,n,m-n))
    exam('Zahlenmauer: Welche Zahl gehört oben hin?',70,[60,80,50],vis=[{"type":"wall","rows":[['?'],[30,40],[10,20,20]]}],step='30 + 40 = 70')
    exam('Zahlenmauer: Welche Zahl fehlt unten links?',15,[5,25,10],vis=[{"type":"wall","rows":[[75],[35,40],['?',20,20]]}],step='35 − 20 = 15')
    exam('Rechenkette: 27 + 10 + 6 + 20 = ?',63,[53,57,73],step='27 → 37 → 43 → 63')
    exam('Leo rechnet 39 + 24 = 52. Was stimmt?','Den Zehner vergessen',['Es stimmt alles','Die Zehner falsch gerechnet','Die Einer falsch gerechnet'],step='39 + 24 = 63')
    exam('Nora rechnet 45 + 32 = 77. Was stimmt?','Es stimmt alles',['Den Zehner vergessen','Die Einer falsch gerechnet','Die Zehner falsch gerechnet'],step='45 + 32 = 77')
    exam('Ben kauft einen Ball für 58 Fr. und eine Mütze für 26 Fr. Wie viel bezahlt er zusammen?',None,ans=['84'],step='58 + 26 = 84')
    exam('Mia hat 100 Fr. und kauft ein Buch für 63 Fr. und eine Tasche für 48 Fr. Reicht das Geld?','nein',['ja'],step='63 + 48 ist mehr als 100')
    exam('Welche Aufgabe hat dasselbe Ergebnis wie 8 + 41?','41 + 8',['8 + 42','41 − 8','9 + 41'],step='Tauschen')
    exam('64 + ? = 100',36,[26,34,46],vis=[J(64,[[6,'+6'],[30,'+30']][:1]+[[30,'?']],hide=False)],step='64 + 6 = 70, 70 + 30 = 100')
    exam('Wie rechnest du die Probe zu 47 + 26 = 73?','73 − 26 = 47',['73 + 26 = 99','73 − 47 = 36','47 − 26 = 21'],step='73 − 26 = 47')
    exam('Welche Zahl liegt am Ende des Rechenstrichs?',78,[68,77,88],vis=[J(54,[[20,'+20'],[4,'+4']],hide=True)],step='54 → 74 → 78')
    random.Random(5).shuffle(t.qs)
    for i,q in enumerate(t.qs):q['id']='q%d'%(i+1)
