from playwright.sync_api import sync_playwright
import json,collections
c=json.load(open('/home/claude/lernwerkstatt/content.json'))
bad=collections.defaultdict(list);n=0
JS="""()=>{var out=[];var doc=document.documentElement.scrollWidth>window.innerWidth+1;
document.querySelectorAll('#app *').forEach(function(e){var cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return;
 var ox=cs.overflowX,oy=cs.overflowY;
 if((oy==='hidden'||ox==='hidden')&&(e.scrollHeight>e.clientHeight+3&&oy==='hidden'||e.scrollWidth>e.clientWidth+3&&ox==='hidden')&&e.clientHeight>0&&e.textContent.trim().length>3&&!/svg|path/i.test(e.tagName))out.push((e.className||e.tagName)+'')});
return [doc,out.slice(0,4)]}"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':360,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8123/test.html');pg.wait_for_timeout(1000)
    for t in c['topics']:
        for rep in range(2):
            pg.evaluate("([c,s])=>{var n=window.__nav();n.child=c;n.subject=s;n.view='child';window.__r()}",[t['child'],t['subject']])
            ok=pg.evaluate("(id)=>{try{window.__A.practice({dataset:{scope:'topic:'+id,force:'1'}});var n=window.__nav();return n.queue?n.queue.length:0}catch(e){return -1}}",t['id'])
            for k in range(max(ok,0)):
                pg.evaluate("(k)=>{var n=window.__nav();n.idx=k;window.__r()}",k)
                r=pg.evaluate(JS);n+=1
                if r[0] or r[1]:bad[t['id']].append((k,r))
    print(n,'cards checked; topics with problems:',len(bad),errs[:2])
    cls=collections.Counter(x for v in bad.values() for _,r in v for x in r[1])
    print(cls.most_common(8),sum(1 for v in bad.values() for _,r in v if r[0]),'page-overflow')
    for k,v in list(bad.items())[:5]:print(k,v[:1])
    b.close()
