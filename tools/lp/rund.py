import sys,json,importlib
sys.path.insert(0,'.')
mods=sys.argv[1:] or ['de1']
P='../../content.json';c=json.load(open(P));out=[];bad=0
for m in mods:
    for f in importlib.import_module(m).T:
        t=f();pr=t.problems()
        if pr:bad+=1;print('FEHLER',t.t['id'],pr[:5])
        out.append(t.build())
if bad:sys.exit(1)
ids={t['id'] for t in out}
c['topics']=[t for t in c['topics'] if t['id'] not in ids]+out
json.dump(c,open(P,'w'),ensure_ascii=False,indent=1)
print(len(out),'Themen:',[(t['id'],len(t['cards']),len(t['exam']['questions']),len(t['explain'])) for t in out])
