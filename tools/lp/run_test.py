import sys,importlib
sys.path.insert(0,'.')
for m in sys.argv[1:]:
    M=importlib.import_module(m)
    for f in M.T:
        t=f();e=t.check()
        print(t.t['id'],len(t.cards),len(t.qs),len(t.explain),'FEHLER' if e else 'ok')
        for x in e[:6]:print('   ',x)
