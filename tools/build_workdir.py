h=open('v3.html').read();k=h.index('</style>')
c=open('extra.css').read()
js=''.join(open(f).read()+'\n' for f in ['p1.js','avatars.js','p2.js','p3.js','p4.js','p5.js','p6.js','p6b.js','p6c.js','p6d.js','p7.js'])
out='<!doctype html>\n<html lang="de" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="color-scheme" content="light"><meta name="theme-color" content="#ffffff">\n'+h[:k]+c+'</style></head><body>\n<div id="app" aria-live="polite"></div>\n<div id="toasts" class="toasts" aria-live="polite"></div>\n<script>\n'+js+'</script>\n<script data-goatcounter="https://easysxhool.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>\n</body></html>\n'
open('index.html','w').write(out)
i=out.rindex("})();");t=out[:i]+"window.__nav=function(){return nav};window.__r=render;window.__sr=showReward;window.__rw=function(){return RW};window.__A=ACT;window.__v=varyItem;window.__C=function(){return C};window.__X={visuals:visuals,topicById:topicById,topicsOf:topicsOf,isV:isV,xgVocabPool:xgVocabPool,xgSalatPool:xgSalatPool,xgCardPool:xgCardPool};"+out[i:]
open('test.html','w').write(t)
