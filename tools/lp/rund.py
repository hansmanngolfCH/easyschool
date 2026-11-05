import sys,json,importlib
sys.path.insert(0,'.')
mods=sys.argv[1:] or ['de1']
P='../../content.json';c=json.load(open(P));out=[];bad=0
for m in mods:
    for f in importlib.import_module(m).T:
        t=f()
        if len(sys.argv)>0:
            import de_more;de_more.extend(t)
        pr=t.problems()
        if pr:bad+=1;print('FEHLER',t.t['id'],pr[:5])
        out.append(t.build())
if bad:sys.exit(1)
ids={t['id'] for t in out}
import de_more
for i,t in enumerate(c['topics']):
    if t['subject']=='deu' and t['id'] not in ids and not t.get('ext2') and t['id'].startswith('kl8-deu-') and de_more.fam(type('X',(),{'t':t})) in de_more.FAMS:
        nt,n=de_more.extend_json(t);pr=[]
        c['topics'][i]=nt;out.append(nt) if False else None;print('JSON',t['id'],'+',n)
c['topics']=[t for t in c['topics'] if t['id'] not in ids]+out
de_more.replace_fehler(c);de_more.add_examples(c)
json.dump(c,open(P,'w'),ensure_ascii=False,indent=1)
print(len(out),'Themen:',[(t['id'],len(t['cards']),len(t['exam']['questions']),len(t['explain'])) for t in out])
