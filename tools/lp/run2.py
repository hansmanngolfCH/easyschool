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
topics=[];bad=0;missing=[]
for m in mods:
    for f in importlib.import_module(m).T:
        t=f();d=t.build();hi=t.hi
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
