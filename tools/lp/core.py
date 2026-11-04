"""Generator-Kern für Lehrplan-Themen (Mathe Klasse 1 bis 3). Alle Zahlen werden gegen den Zahlenraum des Themas geprüft."""
import json,random,re
FRAC=re.compile(r'\d+')
def S(h,text,*v):
    return {"h":h,"text":text,"visuals":list(v)}
def TBL(head,rows,col=None):
    d={"type":"tbl","rows":rows}
    if head:d["head"]=head
    if col is not None:d["c"]=col
    return d
def CH(parts,cap=None):
    d={"type":"chips","parts":parts}
    if cap:d["cap"]=cap
    return d
def FL(steps): return {"type":"flow","steps":steps}
def KD(items): return {"type":"cards","items":items}
def EMO(rows,cap=None,grp=5,x=0):
    d={"type":"emo","rows":rows,"grp":grp}
    if cap:d["cap"]=cap
    if x:d["x"]=x
    return d
def FLD(cols,rows,filled,filled2=0,col=0,col2=1,cap=None):
    d={"type":"field","cols":cols,"rows":rows,"filled":filled,"col":col}
    if filled2:d["filled2"]=filled2;d["col2"]=col2
    if cap:d["cap"]=cap
    return d
def CLK(h,m=0,cap=None):
    d={"type":"clock","h":h,"m":m}
    if cap:d["cap"]=cap
    return d
def COINS(items,cap=None):
    d={"type":"coins","items":items}
    if cap:d["cap"]=cap
    return d
def SHP(kind,col=0,alt=None,axis=None,cap=None):
    d={"type":"shape","kind":kind,"col":col}
    if alt:d["alt"]=alt
    if axis:d["axis"]=axis
    if cap:d["cap"]=cap
    return d
def NL(mn,mx,step,minor=None,pts=None,q=None,cap=None):
    d={"type":"nline","min":mn,"max":mx,"step":step}
    if minor:d["minor"]=minor
    if pts:d["pts"]=pts
    if q is not None:d["q"]=q
    if cap:d["cap"]=cap
    return d
def BAR(segs,cap,col=0): return {"type":"bar","segs":segs,"cap":cap,"col":col}
def LINES(items,num=False): return {"type":"lines","num":num,"items":items}

class Topic:
    def __init__(self,id,child,chapter,title,art,hi,lo=0,seed=1,origin="ki"):
        self.t={"id":id,"child":child,"subject":"mathe","chapter":chapter,"title":title,"art":art,"origin":origin}
        self.hi=hi;self.rnd=random.Random(seed);self.cards=[];self.qs=[];self.theory={};self.explain=[];self.seen=set()
    def th(self,key,h,text,lines=None):
        d={"h":h,"text":text}
        if lines:d["lines"]=lines
        self.theory[key]=d
    def opts(self,a,wrong,n=4):
        o=[a]
        for w in wrong:
            if w not in o:o.append(w)
        return o[:n]
    def card(self,lvl,q,a,wrong=None,ans=None,hints=None,steps=None,vis=None,th='basis'):
        if q in self.seen:return False
        self.seen.add(q)
        d={"id":"c%d"%(len(self.cards)+1),"q":q,"a":str(a),"lvl":lvl,"th":th}
        if wrong is not None:
            o=self.opts(str(a),[str(w) for w in wrong])
            if len(o)<3:
                self.seen.discard(q);return False
            self.rnd.shuffle(o);d["opts"]=o
        else:d["ans"]=ans or [str(a)]
        d["hints"]=hints or []
        d["steps"]=steps or [[str(a),"Ergebnis"]]
        if vis:d["visuals"]=vis
        self.cards.append(d);return True
    def exam(self,q,a,wrong=None,vis=None,expl="",ans=None):
        if any(x['q']==q for x in self.qs):return False
        d={"id":"q%d"%(len(self.qs)+1),"q":q,"explain":expl}
        if wrong is not None:
            o=self.opts(str(a),[str(w) for w in wrong])
            if len(o)<3:return False
            self.rnd.shuffle(o);d["type"]="mc";d["options"]=o;d["answer"]=o.index(str(a))
        else:
            d["type"]="input";d["answer"]=ans or [str(a)]
        if vis:d["visuals"]=vis
        self.qs.append(d);return True
    def build(self,minutes=20):
        t=dict(self.t);t["explain"]=self.explain
        t["theory"]=self.theory;t["cards"]=self.cards
        t["exam"]={"minutes":minutes,"questions":self.qs}
        return t
    def check(self):
        errs=[];t=self.build()
        def walk(o,path):
            if isinstance(o,str):
                for m in FRAC.finditer(o):
                    n=int(m.group())
                    if n>self.hi:errs.append((path,n,o[:70]))
            elif isinstance(o,dict):
                for k,v in o.items():
                    if k in('id','th','lvl','answer','minutes','c','col','col2','grp','hc','now'):continue
                    walk(v,path+'.'+str(k))
            elif isinstance(o,list):
                for i,v in enumerate(o):walk(v,path)
            elif isinstance(o,(int,float)) and not isinstance(o,bool):
                pass
        for k in('explain','theory','cards'):walk(t[k],k)
        for q in t['exam']['questions']:
            walk({k:v for k,v in q.items() if k!='answer' or isinstance(v,list)},'exam')
        # numerische Felder in Visuals
        def vis_nums(vs,path):
            for v in vs:
                for k in('filled','filled2','min','max','q','h','m','count'):
                    if isinstance(v.get(k),int) and v[k]>self.hi:errs.append((path,v[k],k))
                for r in v.get('rows',[]) if v.get('type')=='emo' else []:
                    if r[1]>self.hi:errs.append((path,r[1],'emo'))
                for p in v.get('pts',[]) if isinstance(v.get('pts'),list) else []:
                    if p>self.hi:errs.append((path,p,'pts'))
                for it in v.get('items',[]) if v.get('type')=='coins' else []:
                    if it[0]>self.hi:errs.append((path,it[0],'coin'))
        for e in t['explain']:vis_nums(e.get('visuals',[]),'explain')
        for c in t['cards']:vis_nums(c.get('visuals',[]),'cards')
        for q in t['exam']['questions']:vis_nums(q.get('visuals',[]),'exam')
        if len(t['cards'])<30:errs.append(('cards',len(t['cards']),'weniger als 30 Karten'))
        if len(t['exam']['questions'])<16:errs.append(('exam',len(t['exam']['questions']),'weniger als 16 Fragen'))
        if len(t['explain'])<6:errs.append(('explain',len(t['explain']),'weniger als 6 Schritte'))
        for c in t['cards']:
            if 'opts' in c and c['a'] not in c['opts']:errs.append(('card',c['id'],'Antwort fehlt in Optionen'))
        return errs

def theory_steps(t,worum,worum_vis,begriffe,bild_text,bild_vis,aufbau_text,aufbau_head,aufbau_rows,vorgehen_text,vorgehen,beispiele,wichtig_text,wichtig_cards,begriffe_head=("Begriff","Das ist es","Beispiel"),gerüst_extra=None):
    ex=[S("Worum geht es?",worum,*worum_vis),
        S("Die Begriffe","Das sind die wichtigsten Begriffe.",TBL(list(begriffe_head),begriffe)),
        S("Im Bild",bild_text,*bild_vis),
        S("Der Aufbau",aufbau_text,TBL(list(aufbau_head) if aufbau_head else None,aufbau_rows)),
        S("So gehst du vor",vorgehen_text,FL(vorgehen)),
        S("Beispiele","Aufgaben mit Zwischenschritten.",*[CH(b) for b in beispiele]),
        S("Regeln und Wichtigstes",wichtig_text,KD(wichtig_cards))]
    if gerüst_extra:ex[4:4]=gerüst_extra
    t.explain=ex
