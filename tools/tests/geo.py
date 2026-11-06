from playwright.sync_api import sync_playwright
import json,sys
c=json.load(open('/home/claude/lernwerkstatt/content.json'))
T={x['id']:x for x in c['topics']}
ids=sys.argv[1:]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':900})
    pg.goto('http://localhost:8123/test.html');pg.wait_for_timeout(1000)
    for tid in ids:
        t=T[tid]
        for s in range(len(t['explain'])):
            pg.evaluate("([t,c,s,sub])=>{var n=window.__nav();n.child=c;n.subject=sub;n.view='learn';n.topicId=t;n.step=s;window.__r()}",[tid,t['child'],s,t['subject']]);pg.wait_for_timeout(500)
            pg.screenshot(path='/tmp/w2/geo_%s_%d.png'%(tid,s),full_page=True)
    b.close()
