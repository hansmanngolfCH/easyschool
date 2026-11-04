import sys,json,importlib
sys.path.insert(0,'.')
from core import Topic
import k1w
mods=['k1','k1b','k2','k2b','k3','k4','k5','k5b','k6']
THEORY={}
for tm in ['th_k1','th_k2','th_k3','th_k4','th_k5','th_k6']:
    try:THEORY.update(importlib.import_module(tm).T_())
    except ModuleNotFoundError as e:
        if tm not in str(e):raise
import th_txt
for k,v in th_txt.X.items():
    if k in THEORY:
        assert len(v)==len(THEORY[k]),k
        for b,t in zip(THEORY[k],v):
            if t:b['text']=t
import th_add
for k,v in th_add.A.items():
    assert len(v)==len(THEORY[k]),k
    for b,t in zip(THEORY[k],v):
        if t and not t.startswith('Diese Wörter'):b['text']=t
import th_fix
for k,v in THEORY.items():th_fix.apply(k,v)
DROP_BEG='''kl2-mathe-hunderterfeld kl2-mathe-zahlenstrahl kl2-mathe-plus100 kl2-mathe-minus100 kl2-mathe-mal-2-5-10 kl2-mathe-meter-cm kl2-mathe-uhr-halb-viertel
kl3-mathe-zahlen1000 kl3-mathe-plus1000 kl3-mathe-minus1000 kl3-mathe-rechte-winkel
kl4-mathe-liter-dl kl4-mathe-zentiliter
kl5-mathe-million kl5-mathe-bruchteile kl5-mathe-schriftlich-mal kl5-mathe-flaeche kl5-mathe-volumen kl5-mathe-tonnen
kl6-mathe-dezimal-vertiefung kl6-mathe-bruch-dezimal kl6-mathe-bruch-dezimal-prozent'''.split()
for k in DROP_BEG:
    assert THEORY[k][1]['h']=='Die Begriffe',k
    del THEORY[k][1]
topics=[];bad=0;missing=[]
for m in mods:
    for f in importlib.import_module(m).T:
        t=f()
        import extras
        if t.t['id'] in extras.EX:extras.EX[t.t['id']](t)
        d=t.build();hi=t.hi
        if d['child']=='kl1':d=k1w.convert(d)
        if d['id'] in THEORY:d['explain']=THEORY[d['id']]
        else:missing.append(d['id'])
        tmp=Topic(d['id'],d['child'],d['chapter'],d['title'],d['art'],hi)
        tmp.t=d;tmp.explain=d['explain'];tmp.theory=d['theory'];tmp.cards=d['cards'];tmp.qs=d['exam']['questions']
        e=tmp.check()
        if e:bad+=1;print('FEHLER',d['id'],e[:4])
        topics.append(d)
if bad:sys.exit(1)
P='../../content.json'
c=json.load(open(P));ids={t['id'] for t in topics}
c['topics']=[t for t in c['topics'] if t['id'] not in ids]+topics
json.dump(c,open(P,'w'),ensure_ascii=False,indent=1)
print(len(topics),'Themen;','ohne neue Theorie:',missing)
open('/tmp/newids.txt','w').write(' '.join(ids))
