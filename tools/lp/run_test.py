import sys,json
sys.path.insert(0,'.')
import k1
for f in k1.T:
    t=f();e=t.check()
    print(t.t['id'],len(t.cards),len(t.qs),len(t.explain),'FEHLER' if e else 'ok')
    for x in e[:6]:print('   ',x)
