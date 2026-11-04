from core import *
EM=['🍎','🐟','⭐','🎈','🍓','🐞','🍪','🌸','🐥','🚗']
NAMES=['Mia','Leo','Nora','Ben','Lea','Noah','Anna','Jan','Fridolin','Pippa','Bruno','Zora','Hugo','Lotta','Balduin','Mika','Frieda','Oskar','Tilda','Konrad','Emil','Greta','Moritz','Nele','Valentin','Wilma','Theo','Henri','Ida','Jonas','Klara','Lenny','Mathilda','Nepomuk','Olga','Paulchen','Rosalie','Sepp','Trudi','Urs','Vreni','Wendelin','Xaver','Yara','Zenzi','Anton','Berta','Cäsar','Dora','Egon','Fiona','Gustav','Heidi','Ignaz','Jolanda','Kasimir','Luzi','Mirko']
FEM={'Mia','Nora','Lea','Anna','Pippa','Zora','Lotta','Frieda','Tilda','Greta','Nele','Wilma','Ida','Klara','Mathilda','Olga','Rosalie','Trudi','Vreni','Yara','Zenzi','Berta','Dora','Fiona','Heidi','Jolanda','Luzi'}
def sie(n):return 'sie' if n in FEM else 'er'
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
