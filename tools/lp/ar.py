from cm import *
M='−'
def pairs_for(mode,op,rnd):
    P=[]
    if mode=='k1a':
        for a in range(1,10):
            for b in range(1,10):
                if op=='+' and a+b<=10:P.append((a,b))
                if op=='-' and b<a<=10 and a>=2:P.append((a,b))
    elif mode=='k1b':
        for a in range(2,20):
            for b in range(2,10):
                if op=='+' and a+b<=20 and a<10<a+b:P.append((a,b))
                if op=='-' and 10<a<=20 and a-b<10 and a-b>=1:P.append((a,b))
    elif mode=='k2':
        for a in range(11,100):
            for b in range(11,100):
                if op=='+' and a+b<=100 and (a%10)+(b%10)<10 and a%10 and b%10 and a%10!=0:P.append((a,b))
                if op=='-' and a>b and (a%10)>(b%10) and b%10 and a%10 and a-b>=10:P.append((a,b))
    elif mode=='k2x':  # Übergang
        for a in range(11,90):
            for b in range(11,90):
                if op=='+' and a+b<=100 and (a%10)+(b%10)>=10:P.append((a,b))
                if op=='-' and a>b and (a%10)<(b%10) and a-b>=10 and b%10:P.append((a,b))
    elif mode=='k3':
        for a in range(101,1000,7):
            for b in range(101,1000,13):
                if op=='+' and a+b<=1000:P.append((a,b))
                if op=='-' and a>b and a-b>=10:P.append((a,b))
    rnd.shuffle(P);return P
def steps_for(mode,op,a,b):
    if mode in('k1a',):
        return [['%d %s %d = %d'%(a,'+' if op=='+' else M,b,a+b if op=='+' else a-b),'Rechnen']]
    if mode=='k1b':
        if op=='+':
            f=10-a;r=b-f
            return [['%d + %d = 10'%(a,f),'Bis zur 10'],['10 + %d = %d'%(r,a+b),'Rest dazu']]
        f=a-10;r=b-f
        return [['%d %s %d = 10'%(a,M,f),'Bis zur 10'],['10 %s %d = %d'%(M,r,a-b),'Rest weg']]
    if mode in('k2','k2x'):
        ta,oa,tb,ob=a//10*10,a%10,b//10*10,b%10
        if op=='+':
            return [['%d + %d = %d'%(ta,tb,ta+tb),'Zehner'],['%d + %d = %d'%(oa,ob,oa+ob),'Einer'],['%d + %d = %d'%(ta+tb,oa+ob,a+b),'Zusammen']]
        return [['%d %s %d = %d'%(a,M,tb,a-tb),'Zehner weg'],['%d %s %d = %d'%(a-tb,M,ob,a-b),'Einer weg']]
    if mode=='k3':
        ha,hb=a//100*100,b//100*100;za,zb=a%100//10*10,b%100//10*10;ea,eb=a%10,b%10
        if op=='+':
            return [['%d + %d = %d'%(ha,hb,ha+hb),'Hunderter'],['%d + %d = %d'%(za,zb,za+zb),'Zehner'],['%d + %d = %d'%(ea,eb,ea+eb),'Einer'],['%d + %d + %d = %d'%(ha+hb,za+zb,ea+eb,a+b),'Zusammen']]
        s1=a-hb;s2=s1-zb;
        return [['%d %s %d = %d'%(a,M,hb,s1),'Hunderter weg'],['%d %s %d = %d'%(s1,M,zb,s2),'Zehner weg'],['%d %s %d = %d'%(s2,M,eb,a-b),'Einer weg']]
def vis_for(mode,op,a,b,i):
    e=EM[i%len(EM)]
    if mode=='k1a':
        return [EMO([[e,a],[EM[(i+3)%len(EM)],b]])] if op=='+' else [EMO([[e,a]],x=b)]
    if mode=='k1b':
        return [FLD(10,2,a,b)] if op=='+' else [FLD(10,2,a-b,b,0,3)]
    return None
def story(op,a,b,i,mode):
    n=NAMES[i%len(NAMES)]
    thing=['Äpfel','Murmeln','Stifte','Karten','Steine','Bücher'][i%6] if mode!='k3' else ['Seiten','Schritte','Perlen','Kleber','Zettel','Punkte'][i%6]
    if op=='+':return '%s hat %d %s. Dann kommen %d dazu. Wie viele sind es jetzt?'%(n,a,thing,b)
    return '%s hat %d %s. Davon sind %d weg. Wie viele sind noch da?'%(n,a,thing,b)
def addsub(t,mode,op,hi,n1=14,n2=8,n3=8,nex=16,lo=0,textlvl3=True):
    P=pairs_for(mode,op,t.rnd);sg='+' if op=='+' else M
    res=lambda a,b:a+b if op=='+' else a-b
    w=lambda r:wr(r,0,hi,t.rnd)
    used=0
    for i,(a,b) in enumerate(P[:n1]):
        r=res(a,b)
        t.card(1,'%d %s %d = ?'%(a,sg,b),r,w(r),hints=['Rechne Schritt für Schritt.'] if mode!='k1a' else ['Zähle mit.'],steps=steps_for(mode,op,a,b),vis=vis_for(mode,op,a,b,i))
    for i,(a,b) in enumerate(P[n1:n1+n2]):
        r=res(a,b)
        if op=='+':
            t.card(2,'%d + ? = %d'%(a,r),b,w(b),hints=['Rechne zurück mit Minus.'],steps=[['%d %s %d = %d'%(r,M,a,b),'Umkehren']])
        else:
            t.card(2,'%d %s ? = %d'%(a,M,r),b,w(b),hints=['Rechne zurück mit Plus.'],steps=[['%d %s %d = %d'%(a,M,r,b),'Umkehren']])
    for i,(a,b) in enumerate(P[n1+n2:n1+n2+n3]):
        r=res(a,b)
        if textlvl3:t.card(3,story(op,a,b,i,mode),r,w(r),hints=['Welche Rechnung passt zur Geschichte?'],steps=[['%d %s %d = %d'%(a,sg,b,r),'Rechnung']])
    ex=P[n1+n2+n3:]+P[:n1+n2+n3][::-1]
    k=0
    for i,(a,b) in enumerate(ex):
        if len(t.qs)>=nex:break
        r=res(a,b)
        if k%2==0:t.exam('%d %s %d = ?'%(a,sg,b),r,w(r),vis=vis_for(mode,op,a,b,i) if mode in('k1a','k1b') and k<4 else None,expl='%d %s %d = %d'%(a,sg,b,r))
        else:t.exam('%d %s %d = ?'%(a,sg,b),None,ans=[str(r)],expl='%d %s %d = %d'%(a,sg,b,r))
        k+=1
