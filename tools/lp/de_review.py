# -*- coding: utf-8 -*-
import json,os
def apply(c):
    F=json.load(open(os.path.join(os.path.dirname(__file__),'review_fixes.json')))
    T={t['id']:t for t in c['topics']};ok=bad=0;miss=[]
    for f in F:
        t=T.get(f['topic'])
        if not t:miss.append(f);bad+=1;continue
        w=f.get('where');fld=f['field'];new=f['new']
        if w=='theory' or f.get('id') in(0,'th-ausnahmen','th-umlaute'):
            s=json.dumps(t['explain'],ensure_ascii=False);o=f['old'] if isinstance(f['old'],str) else json.dumps(f['old'],ensure_ascii=False)
            o2=json.dumps(o,ensure_ascii=False)[1:-1];n2=json.dumps(new,ensure_ascii=False)[1:-1] if isinstance(new,str) else json.dumps(new,ensure_ascii=False)
            if o in s:t['explain']=json.loads(s.replace(o,new if isinstance(new,str) else json.dumps(new,ensure_ascii=False),1));ok+=1
            elif o2 in s:t['explain']=json.loads(s.replace(o2,n2,1));ok+=1
            else:miss.append(f);bad+=1
            continue
        L=t['cards'] if w=='card' else t['exam']['questions']
        it=[x for x in L if x.get('id')==f['id']]
        if not it:miss.append(f);bad+=1;continue
        it[0][fld]=new;ok+=1
    # gleiche Theorie-Korrektur fuer kl4 Wortarten (gleiches Beispiel)
    t=T.get('kl4-deu-wortarten')
    if t:
        a=json.dumps(t['explain'],ensure_ascii=False)
        a=a.replace('["zur", "Artikel", 3, "zur = zu der"], ["Schule", "Nomen", 0, "die Schule"]], "cap": "Er rennt schnell zur Schule."','["in", "", 5, "ein kleines Wort"], ["die", "", 3, "Begleiter von Schule"], ["Schule", "Nomen", 0, "die Schule"]], "cap": "Er rennt schnell in die Schule."')
        t['explain']=json.loads(a)
    print('Review-Fixes',ok,'nicht anwendbar',bad)
    json.dump(miss,open('/tmp/rev/miss.json','w'),ensure_ascii=False,indent=0)

import re
HINT_OLD='Schreibe die Antwort genau so, wie sie in der Auswahl stünde.'
HINT_NEW='Schreibe die Antwort genau so auf, wie man sie schreibt.'
def _sp(x):
    return re.sub(r'\s+([,.;:!?])',r'\1',x) if isinstance(x,str) else x
def clean(c):
    n_h=n_sp=n_same=n_dup=n_off=0
    for t in c['topics']:
        if t['subject']!='deu':continue
        cl=t['child'];keep=[];seen=set()
        for k in t['cards']:
            hs=k.get('hints')
            if hs:
                nh=[HINT_NEW if h==HINT_OLD else h for h in hs]
                if nh!=hs:k['hints']=nh;n_h+=1
            for f in('pre','a','ans'):
                if f in k and isinstance(k[f],str):
                    v=_sp(k[f])
                    if v!=k[f]:k[f]=v;n_sp+=1
            if 'pre' in k and k.get('ans',k.get('a'))==k['pre']:n_same+=1;continue
            if cl in('kl3','kl4') and re.search(r'Schreibe im (Plusquamperfekt|Futur)|Plusquamperfekt|Futur',k['q']) and 'pre' in k:n_off+=1;continue
            key=(k['q'],str(k.get('a')),str(k.get('pre')),str(k.get('opts')))
            if key in seen:n_dup+=1;continue
            seen.add(key);keep.append(k)
        t['cards']=keep
        for q in t['exam']['questions']:
            for f in('pre',):
                if f in q:q[f]=_sp(q[f])
    print('Bereinigt: Hinweise',n_h,'Leerzeichen',n_sp,'ohne Fehler',n_same,'doppelt',n_dup,'zu schwer fuer kl3/4',n_off)
