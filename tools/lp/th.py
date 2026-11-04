from core import *
def BAR2(parts,cap=None,col=0):return {"type":"bar","segs":parts,"cap":cap or "","col":col}
def J(frm,jumps,cap=None,hide=False,fmt=None):
    d={"type":"jumps","from":frm,"jumps":jumps}
    if cap:d["cap"]=cap
    if hide:d["hideEnd"]=True
    return d
def BLK(h=0,z=0,e=0,cap=None):
    d={"type":"blocks","h":h,"z":z,"e":e}
    if cap:d["cap"]=cap
    return d
def ARR(r,c,split=0,cap=None,rows=False,col=0):
    d={"type":"arr","r":r,"c":c,"split":split,"col":col}
    if rows:d["splitRows"]=True
    if cap:d["cap"]=cap
    return d
def COL(op,a,b,cap=None,hideRes=False,carry=True):
    d={"type":"col","op":op,"a":a,"b":b}
    if cap:d["cap"]=cap
    if hideRes:d["hideRes"]=True
    if not carry:d["carry"]=False
    return d
def PIE(p,f,cap=None):
    d={"type":"pie","parts":p,"filled":f}
    if cap:d["cap"]=cap
    return d
def CV(frm,to):return {"type":"conv","from":frm,"to":to}
def G(h,text,*v):return S(h,text,*v)
BEGH=("Begriff","Das ist es","Beispiel")
def BEG(rows,head=BEGH):return S("Die Begriffe","Alle wichtigen Begriffe auf einen Blick.",TBL(list(head),rows))
def MERKE(items,text="Das ist wichtig."):return S("Regeln und Wichtigstes",text,KD(items))
# --- Familien ---
def addsub_blocks(mode,op,beg,exs,probe=None,wichtig=None,worum="",tx=True):
    """exs: Liste (a,b) – Beispiele. Gibt 10-13 Blöcke mit Balken/Rechenstrich/Material."""
    P=op=='+';sg='+' if P else '−'
    B=[]
    a,b=exs[0]
    r=a+b if P else a-b
    def t(s):return s if tx else ''
    B.append(S(t("Worum geht es?") if tx else "👀",t(worum),BAR2([[a,str(a)],[b,str(b)]] if P else [[r,str(r)],[b,'− '+str(b)]],'%d %s %d = %d'%(a,sg,b,r),1 if not P else 0)))
    if beg and tx:B.append(BEG(beg))
    return B

def CHN(*items):return CH([[str(a),str(b) if b else '',c] for a,b,c in items])
def split_blocks(op,three,exs,beg,worum,merke,tx=2):
    """Halbschriftlich: Z/E (three=False) oder H/Z/E (three=True). exs: 3 Beispiele (a,b)."""
    P=op=='+';sg='+' if P else '−';B=[]
    def parts(n):
        return ([(n//100*100,'H'),(n%100//10*10,'Z'),(n%10,'E')] if three else [(n//10*10,'Z'),(n%10,'E')])
    def jumpsfor(a,b):
        pb=[p for p in parts(b) if p[0]];cur=a;js=[]
        for v,_ in pb:
            js.append([v if P else -v,('+' if P else '−')+str(v)]);cur+=v if P else -v
        return js
    a,b=exs[0];r=a+b if P else a-b
    B.append(S("Worum geht es?",worum,BAR2([[a,str(a)],[b,str(b)]] if P else [[r,str(r)],[b,'− '+str(b)]],'%d %s %d = %d'%(a,sg,b,r),0 if P else 1)))
    B.append(BEG(beg))
    B.append(S("Im Bild","",BLK(*( [a//100,a%100//10,a%10] if three else [0,a//10,a%10]),cap=str(a)),BLK(*( [b//100,b%100//10,b%10] if three else [0,b//10,b%10]),cap=str(b))))
    pa=parts(a);pb=parts(b)
    B.append(S("Zerlegen","Teile die zweite Zahl.",BAR2([[v,str(v)] for v,_ in pb if v],'%d = %s'%(b,' + '.join(str(v) for v,_ in pb if v)),2)))
    js=jumpsfor(a,b)
    cur=a
    for k,(v,nm) in enumerate(pb):
        if not v:continue
        nxt=cur+v if P else cur-v
        B.append(S({'H':'Hunderter','Z':'Zehner','E':'Einer'}[nm]+(' dazu' if P else ' weg'),"",J(cur,[[v if P else -v,('+' if P else '−')+str(v)]],'%d %s %d = %d'%(cur,sg,v,nxt)),CHN(('%d %s %d'%(cur,sg,v),'',0),(nxt,'Zwischenstand',1))))
        cur=nxt
    B.append(S("Alles zusammen","",J(a,js,'%d %s %d = %d'%(a,sg,b,r)),CHN(*([(a,'Start',0)]+[(('+' if P else '−')+str(v),'',2) for v,_ in pb if v]+[(r,'Ergebnis',1)]))))
    for (x,y) in exs[1:]:
        rr=x+y if P else x-y
        B.append(S("Beispiel: %d %s %d"%(x,sg,y),"",BAR2([[x,str(x)],[y,str(y)]] if P else [[rr,str(rr)],[y,'− '+str(y)]],'%d %s %d = %d'%(x,sg,y,rr),0 if P else 1),J(x,jumpsfor(x,y)),CHN(*([(x,'Start',0)]+[(('+' if P else '−')+str(v),'',2) for v,_ in parts(y) if v]+[(rr,'Ergebnis',1)]))))
    x,y=exs[0]
    rr=x+y if P else x-y
    B.append(S("Probe","Rechne zurück.",J(rr,[[-y if P else y,('−' if P else '+')+str(y)]],'%d %s %d = %d'%(rr,'−' if P else '+',y,x)),CHN((rr,'',0),('−' if P else '+','',2),(y,'',1),(x,'stimmt!',2))))
    B.append(MERKE(merke))
    return B
