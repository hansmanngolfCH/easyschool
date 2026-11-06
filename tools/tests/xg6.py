from playwright.sync_api import sync_playwright
import json
c=json.load(open('/home/claude/lernwerkstatt/content.json'))
bad=[];n=0
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':360,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8123/test.html');pg.wait_for_timeout(1000)
    for t in c['topics']:
        pg.evaluate("([c,s])=>{var n=window.__nav();n.child=c;n.subject=s;n.view='child';window.__r()}",[t['child'],t['subject']])
        pg.evaluate("(id)=>window.__A.xgame({dataset:{id:id}})",t['id'])
        for k in range(10):
            pg.evaluate("(k)=>{var n=window.__nav();n.i=k;n.phase='play';window.__r();clearTimeout(0)}",k)
            r=pg.evaluate("""()=>{var o=[...document.querySelectorAll('.xo')],bad=0;o.forEach(function(x){var b=x.querySelector('b')||x;if(x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2)bad++});var q=document.querySelector('.xg-q');return [o.length,bad,document.documentElement.scrollWidth>window.innerWidth+1]}""")
            n+=1
            if r[1] or r[2]:bad.append((t['id'],k,r))
    print(n,'rounds checked; problems:',len(bad),bad[:6],errs[:2])
    b.close()
