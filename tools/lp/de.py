"""Deutsch-Generator: Karten (mc, tippen, Korrekturfeld, Mehrfachwahl, Zuordnen) + Theorie + Pruefung."""
import random
from core import S,TBL,CH,KD,FL,LINES
N,V,A,AR,PR,AD,KJ,GR=0,1,2,3,4,5,6,7   # Farben: Nomen blau, Verb rot, Adjektiv gruen, Artikel gelb, Pronomen violett, Adverb/Praep. tuerkis, Konj. pink, neutral
def W(t,c):return '{%d|%s}'%(c,t)
def SC(kind,cap=None,**kw):
    d={"type":"scene","kind":kind};d.update(kw)
    if cap:d["cap"]=cap
    return d
def SENT(parts,cap=None):
    """parts: [(wort,label,farbe)] -> bunte Satzkacheln"""
    return CH([list(p) for p in parts],cap)
ART={'Präposition':'eine','Konjunktion':'eine','Aussage':'eine','Frage':'eine'}
PL={'Verb':'Verben','Adjektiv':'Adjektive','Präposition':'Präpositionen','Konjunktion':'Konjunktionen','Subjekt':'Subjekte','Prädikat':'Prädikate','Nomen':'Nomen','Pronomen':'Pronomen','Stellvertreter':'Stellvertreter','Begleiter':'Begleiter','Hauptsatz':'Hauptsätze','Nebensatz':'Nebensätze','Relativsatz':'Relativsätze','Konjunktionalsatz':'Konjunktionalsätze'}
class DT:
    def __init__(s,id,child,chapter,title,seed=1):
        s.t={"id":id,"child":child,"subject":"deu","chapter":chapter,"title":title,"art":"gram","origin":"ki"}
        s.r=random.Random(seed);s.cards=[];s.qs=[];s.explain=[];s.theory={};s.seen=set();s.sig=set()
    def th(s,key,h,text):s.theory[key]={"h":h,"text":text}
    def _add(s,d,key):
        if key in s.seen:return False
        s.seen.add(key);d["id"]="c%d"%(len(s.cards)+1);s.cards.append(d);return True
    def _opts(s,a,wrong):
        o=[a]
        for w in wrong:
            if w not in o:o.append(w)
        o=o[:4];s.r.shuffle(o);return o
    def mc(s,lvl,q,a,wrong,hint=None,why=None,th='basis',say=None):
        o=s._opts(a,wrong)
        if len(o)<2:raise SystemExit('zu wenige Optionen: '+q)
        sg=q+'|'.join(sorted(o))
        if sg in s.sig:return False
        s.sig.add(sg)
        d={"q":q,"a":a,"lvl":lvl,"th":th,"opts":o,"hints":[hint] if hint else []}
        if why:d["why"]=why
        if say:d["say"]=say
        return s._add(d,'mc'+q+'|'.join(sorted(o)))
    def inp(s,lvl,q,ans,hint=None,why=None,th='basis',cs=True):
        ans=ans if isinstance(ans,list) else [ans]
        d={"q":q,"a":ans[0],"ans":ans,"lvl":lvl,"th":th,"hints":[hint] if hint else []}
        if cs:d["cs"]=True
        if why:d["why"]=why
        return s._add(d,'in'+q)
    def fix(s,lvl,q,pre,a,hint=None,why=None,th='basis',alts=None):
        assert pre!=a,(pre,a)
        d={"q":q,"a":a,"ans":[a]+list(alts or []),"pre":pre,"lvl":lvl,"th":th,"hints":[hint] if hint else []}
        if why:d["why"]=why
        return s._add(d,'fx'+q+pre)
    def multi(s,lvl,q,right,wrong,hint=None,why=None,th='basis'):
        o=s._opts(right[0],right[1:]+wrong) if False else None
        allo=list(right)+list(wrong);s.r.shuffle(allo)
        d={"q":q,"a":', '.join(right),"ans":list(right),"multi":True,"opts":allo,"lvl":lvl,"th":th,"hints":[hint] if hint else []}
        if why:d["why"]=why
        return s._add(d,'mu'+q)
    def match(s,lvl,q,items,cats,hint=None,why=None,th='basis'):
        """items: [(text, kategorie-index)]"""
        its=[list(i) for i in items];s.r.shuffle(its)
        a='; '.join('%s → %s'%(i[0],cats[i[1]]) for i in items)
        d={"q":q,"a":a,"match":{"items":its,"cats":cats},"lvl":lvl,"th":th,"hints":[hint] if hint else []}
        if why:d["why"]=why
        return s._add(d,'ma'+q)
    # Pruefung
    def emc(s,q,a,wrong,expl=''):
        o=s._opts(a,wrong)
        if len(o)<2:raise SystemExit('Pruefung zu wenige Optionen: '+q)
        sg=q+'|'.join(sorted(o))
        if sg in s.sig:return False
        s.sig.add(sg)
        s.qs.append({"id":"q%d"%(len(s.qs)+1),"q":q,"explain":expl,"type":"mc","options":o,"answer":o.index(a)});return True
    def ein(s,q,ans,expl='',cs=True):
        if any(x['q']==q for x in s.qs):return False
        d={"id":"q%d"%(len(s.qs)+1),"q":q,"explain":expl,"type":"input","answer":ans if isinstance(ans,list) else [ans]}
        if cs:d["cs"]=True
        s.qs.append(d);return True
    def efix(s,q,pre,a,expl='',alts=None):
        assert pre!=a
        if any(x['q']==q and x.get('pre')==pre for x in s.qs):return False
        s.qs.append({"id":"q%d"%(len(s.qs)+1),"q":q,"explain":expl,"type":"input","answer":[a]+list(alts or []),"pre":pre});return True
    def build(s):
        t=dict(s.t);t["explain"]=s.explain;t["theory"]=s.theory;t["cards"]=s.cards
        t["exam"]={"minutes":20,"questions":s.qs};return t
    def problems(s):
        e=[];t=s.build()
        if len(t['cards'])<30:e.append('Karten %d<30'%len(t['cards']))
        if len(t['exam']['questions'])<16:e.append('Pruefung %d<16'%len(t['exam']['questions']))
        if len(t['explain'])<6:e.append('Theorie %d<6'%len(t['explain']))
        for c in t['cards']:
            if 'opts' in c and not c.get('multi') and c['a'] not in c['opts']:e.append('Option fehlt '+c['id'])
            if c.get('multi') and not all(x in c['opts'] for x in c['ans']):e.append('Multi '+c['id'])
            if 'match' in c and len(c['match']['items'])<2:e.append('Match '+c['id'])
        cs={(c['q'],c['a']) for c in t['cards']}
        for q in t['exam']['questions']:
            if q['type']=='mc' and len(set(q['options']))<len(q['options']):e.append('Dublette '+q['id'])
            a=q['options'][q['answer']] if q['type']=='mc' else q['answer'][0]
            if (q['q'],a) in cs:e.append('Pruefung=Karte '+q['id'])
        seen=set()
        for c in t['cards']:
            k=(c['q'],c['a'],c.get('pre'),tuple(sorted(c.get('opts',[]))))
            if k in seen:e.append('Doppelkarte '+c['id'])
            seen.add(k)
        return e

# ---------- Bausteine ----------
def THEORY(t,intro,intro_vis,rule_text,rule_head,rule_rows,sent_text,sents,steps_text,steps,merke_text,merke,fehler=None):
    """Standard-Theorie: 1 Einstieg (Szene), 2 Regel-Tabelle, 3 Beispielsaetze (farbig), 4 So gehst du vor, 5 Merke-Karten."""
    t.explain=[S("Worum geht es?",intro,intro_vis),
        S("Das musst du wissen",rule_text,TBL(rule_head,rule_rows)),
        S("Beispielsätze",sent_text,*[SENT(x[0],x[1]) for x in sents]),
        S("So gehst du vor",steps_text,LINES([[a,''] for a in steps],True)),
        S("Merke",merke_text,KD(merke))]
    if fehler:t.explain.insert(4,S("Typische Fehler","Diese Fehler passieren oft. So machst du es richtig.",TBL(["Falsch","Richtig","Warum"],fehler,[7]*len(fehler))))
def more(t,h,text,*vis):t.explain.insert(len(t.explain)-1,S(h,text,*vis))
def pick(rnd,seq,n):
    s=list(seq);rnd.shuffle(s);return s[:n]
def cls(t,items,cats,qf,hint=None,why=None,nc=1,ne=5,lvl=1,multi=True,mt=3,match=True,disp=None,mq='Tippe alle an: Welche sind {c}?',qm='Ordne jedem Wort die richtige Gruppe zu.',hintf=None,sel=True,ns=8,nsx=3,sq='Welches davon ist {a} {c}?',ntyp=8,ntx=2,skip=None,sqx='Welches dieser Wörter ist {a} {c}?',jn=6,jnt='Stimmt das? «{w}» ist {a} {c}.',jnp=False):
    """items [(payload,catIndex)] -> mc, Tippen, Mehrfachwahl, Zuordnen, Pruefung (hintere Items). skip(dispText)->True: mehrdeutige Anzeige-Texte nur im Satz."""
    r=t.r;disp=disp or (lambda p:p if isinstance(p,str) else p[0]);skip=skip or (lambda x:False)
    card_items=items[:len(items)-ne] if ne else items;ex_items=items[len(items)-ne:] if ne else []
    def wr(c):
        o=[x for i,x in enumerate(cats) if i!=c];r.shuffle(o);return o[:3]
    ty=min(ntyp,len(card_items)//3) if ntyp else 0
    mc_items=card_items[:len(card_items)-ty];ty_items=card_items[len(card_items)-ty:]
    for k,(p,c) in enumerate(mc_items):
        h=hintf(p,c) if hintf else ((hint[c] if c<len(hint) else hint[-1]) if isinstance(hint,(list,tuple)) else hint)
        w=why(p,c) if why else None
        t.mc(lvl if k<len(mc_items)*0.6 else min(lvl+1,3),qf(p),cats[c],wr(c),h,w)
    amb=lambda p:skip(disp(p))
    ok_items=[(p,c) for p,c in card_items if not amb(p)]
    for k,(p,c) in enumerate(ok_items[:jn*2:2] if jn else []):
        truth=(k%2==0);cc=c if truth else r.choice([x for x in range(len(cats)) if x!=c])
        w=p[1] if isinstance(p,tuple) else p;pre=(p[0]+'\n') if isinstance(p,tuple) else (p+'\n' if jnp else '')
        q=pre+jnt.format(w=w,c=cats[cc],a=ART.get(cats[cc],'ein'),p=PL.get(cats[cc],cats[cc]))
        t.mc(1,q,'Ja' if truth else 'Nein',['Nein' if truth else 'Ja'],'Prüfe genau.',(why(p,c) if why else None))
    cp=lambda c:PL.get(cats[c],cats[c])
    if multi:
        for c in range(len(cats)):
            right=[disp(p) for p,cc in ok_items if cc==c]
            wrong=[disp(p) for p,cc in ok_items if cc!=c]
            if len(right)>=mt and len(wrong)>=2:
                rr=pick(r,right,mt);ww=pick(r,wrong,6-mt)
                t.multi(2,mq.format(c=cp(c),p=cp(c),s=cats[c]),rr,ww,'Prüfe jedes Wort einzeln.',None)
    if sel:
        def one(k,exam):
            c=k%len(cats);pool=[p for p,cc in ok_items if cc==c];other=[p for p,cc in ok_items if cc!=c]
            if not pool or len(other)<3:return
            for _ in range(10):
                a=disp(r.choice(pool));ws=[disp(x) for x in pick(r,other,3)]
                if a in ws:continue
                q=(sqx or sq).format(c=cats[c],a=ART.get(cats[c],'ein'),p=cp(c)) if exam else sq.format(c=cats[c],a=ART.get(cats[c],'ein'),p=cp(c))
                before=len(t.qs) if exam else len(t.cards)
                (t.emc(q,a,ws,'') if exam else t.mc(2,q,a,ws,'Prüfe jedes Wort einzeln.',None))
                if (len(t.qs) if exam else len(t.cards))>before:return
        for k in range(ns):one(k,False)
        for k in range(nsx):one(k+1,True)
    if match and len(cats)>=2:
        for rep in range(2):
            ch=[];used=set()
            for c in range(min(len(cats),4)):
                pool=[(disp(p),c2) for p,c2 in ok_items if c2==c and disp(p) not in used]
                if pool:
                    x=r.choice(pool);used.add(x[0]);ch.append(x)
            if len(ch)>=2:
                idx={c:i for i,c in enumerate(sorted(set(c for _,c in ch)))}
                cl=[cats[c] for c in sorted(set(c for _,c in ch))]
                t.match(2,qm,[(a,idx[c]) for a,c in ch],cl,'Überlege bei jedem Teil einzeln.',None)
    for p,c in ty_items:
        q=qf(p)
        t.inp(2,q+'\nSchreibe die Antwort.' if '\n' in q else q,cats[c],'Schreibe die Antwort genau so, wie sie in der Auswahl stünde.',(why(p,c) if why else None))
    for i,(p,c) in enumerate(ex_items):
        if i>=len(ex_items)-ntx and ntx:t.ein(qf(p),cats[c],(why(p,c) if why else ''))
        else:t.emc(qf(p),cats[c],wr(c),(why(p,c) if why else ''))
def gaps(t,items,ne=3,lvl=2,q='Welches Wort passt in die Lücke?',hint=None,eq=None):
    """items [(Satz mit ___, richtig, [falsch..], why)]"""
    for k,(s,a,w,*y) in enumerate(items[:len(items)-ne] if ne else items):
        t.mc(lvl,s+'\n'+q,a,w,hint,(y[0] if y else None))
    for s,a,w,*y in (items[len(items)-ne:] if ne else []):
        t.emc(s+'\n'+(eq or q),a,w,(y[0] if y else ''))
def fixes(t,items,ne=3,q='Verbessere direkt im Feld.',lvl=2,hint=None,eq=None):
    """items [(falsch, richtig, why)] -> Korrekturfeld"""
    for k,(pre,a,*y) in enumerate(items[:len(items)-ne] if ne else items):
        t.fix(lvl,q,pre,a,hint,(y[0] if y else None),alts=(y[1] if len(y)>1 else None))
    for pre,a,*y in (items[len(items)-ne:] if ne else []):
        t.efix(eq or q,pre,a,(y[0] if y else ''),alts=(y[1] if len(y)>1 else None))
def forms(t,items,ne=3,lvl=2,hint=None):
    """items [(Frage, Antwort(en), why)] -> Tippen (Gross/Klein zaehlt)"""
    for q,a,*y in (items[:len(items)-ne] if ne else items):
        t.inp(lvl,q,a,hint,(y[0] if y else None))
    for q,a,*y in (items[len(items)-ne:] if ne else []):
        t.ein(q,a,(y[0] if y else ''))
