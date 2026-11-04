#!/usr/bin/env python3
"""EasySchool Inhalts-Pruefung.
python3 tools/check.py                 pruefen (Exit 1 bei Fehlern)
python3 tools/check.py --accept ID...  geaenderte/neue Themen bewusst freigeben (Lock aktualisieren)
python3 tools/check.py --accept-all    alles freigeben
Gesperrt (frozen) = Themen im Lock. Aenderungen an gesperrten Themen sind Fehler, bis sie freigegeben werden.
Neue Themen werden gegen die Qualitaetsregeln geprueft."""
import json,hashlib,sys,os,re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CJ=os.path.join(R,'content.json');LK=os.path.join(R,'tools','content.lock.json')
def h(t):return hashlib.sha256(json.dumps(t,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:16]
c=json.load(open(CJ,encoding='utf8'));T={t['id']:t for t in c['topics']}
lock=json.load(open(LK)) if os.path.exists(LK) else {}
args=sys.argv[1:]
if args and args[0] in('--accept','--accept-all'):
    ids=list(T) if args[0]=='--accept-all' else args[1:]
    for i in ids:
        if i not in T:print('unbekannt:',i);sys.exit(1)
        lock[i]=h(T[i])
    for i in list(lock):
        if i not in T and args[0]=='--accept-all':del lock[i]
    json.dump(lock,open(LK,'w'),indent=1,sort_keys=True);print('Lock aktualisiert:',len(ids),'Thema/Themen');sys.exit(0)
err=[];warn=[];new=[]
def quality(t):
    e=[];lang=t['subject'] in('franz','engl')
    mn={'cards':25 if lang else 30,'exam':16,'explain':1 if lang else 6}
    if len(t['cards'])<mn['cards']:e.append('zu wenige Karten (%d, min %d)'%(len(t['cards']),mn['cards']))
    if len(t['exam']['questions'])<mn['exam']:e.append('zu wenige Pruefungsfragen (%d, min %d)'%(len(t['exam']['questions']),mn['exam']))
    if len(t['explain'])<mn['explain']:e.append('zu wenige Theorie-Schritte (%d, min %d)'%(len(t['explain']),mn['explain']))
    for k in('child','subject','chapter','title'):
        if not str(t.get(k,'')).strip():e.append('Feld fehlt: '+k)
    ids=set()
    for x in t['cards']:
        if x['id'] in ids:e.append('doppelte Karten-ID '+x['id'])
        ids.add(x['id'])
        if not str(x.get('q','')).strip() or not str(x.get('a','')).strip():e.append('Karte ohne Frage/Antwort: '+x['id'])
        if x.get('opts') and not x.get('multi') and str(x['a']) not in [str(o) for o in x['opts']]:warn.append('%s/%s: richtige Antwort nicht in den Optionen'%(t['id'],x['id']))
    for s in t['explain']:
        if not (s.get('h') and s.get('text')):e.append('Theorie-Schritt ohne Titel/Text')
    for q in t['exam']['questions']:
        if not str(q.get('q','')).strip():e.append('Pruefungsfrage ohne Text')
    return e
if len(T)!=len(c['topics']):err.append('doppelte Themen-IDs')
for i in lock:
    if i not in T:err.append('GESPERRTES Thema entfernt: '+i)
for i,t in T.items():
    if i in lock:
        if h(t)!=lock[i]:err.append('GESPERRTES Thema veraendert: %s (mit --accept %s bewusst freigeben)'%(i,i))
    else:
        new.append(i)
        for m in quality(t):err.append('NEU %s: %s'%(i,m))
print('Themen: %d gesperrt, %d neu'%(len([i for i in T if i in lock]),len(new)))
for n in new:print('  neu:',n)
for w in warn[:20]:print('WARNUNG',w)
for e in err:print('FEHLER',e)
if err:sys.exit(1)
print('OK: Inhalt entspricht den Regeln.')
