import sys,json,importlib
sys.path.insert(0,'.')
mods=['k1','k1b','k2','k2b','k3','k4','k5','k5b','k6']
topics=[];bad=0
for m in mods:
    for f in importlib.import_module(m).T:
        t=f();e=t.check()
        if e:bad+=1;print('FEHLER',t.t['id'],e[:3])
        topics.append(t.build())
if bad:sys.exit(1)
P='../../content.json'
c=json.load(open(P))
ids={t['id'] for t in topics}
c['topics']=[t for t in c['topics'] if t['id'] not in ids]+topics
json.dump(c,open(P,'w'),ensure_ascii=False,indent=1)
print(len(topics),'Themen geschrieben;',[t['id'] for t in topics])
open('/tmp/newids.txt','w').write(' '.join(t['id'] for t in topics))
