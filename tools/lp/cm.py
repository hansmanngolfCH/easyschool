from core import *
EM=['🍎','🐟','⭐','🎈','🍓','🐞','🍪','🌸','🐥','🚗']
NAMES=['Mia','Leo','Nora','Ben','Lea','Noah','Anna','Jan']
def wr(a,lo,hi,rnd,k=3,deltas=(1,2,3,10,5)):
    c=[]
    for d in deltas:
        for x in (a-d,a+d):
            if lo<=x<=hi and x!=a and x not in c:c.append(x)
    near=[x for x in c if abs(x-a)<=3];far=[x for x in c if abs(x-a)>3]
    rnd.shuffle(near);rnd.shuffle(far)
    r=(near+far)[:k]
    i=lo
    while len(r)<k and i<=hi:
        if i!=a and i not in r:r.append(i)
        i+=1
    return r
def word(n):
    return str(n)
def f(n):
    s='{:,}'.format(n).replace(',',"'")
    return s
def fv(n):return [str(n),f(n)] if n>=1000 else [str(n)]
def wrs(a,rnd,pool):
    """falsche Optionen aus Pool (ohne a)"""
    w=[x for x in pool if x!=a];rnd.shuffle(w);return w[:3]
