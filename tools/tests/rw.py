from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8123/index.html');pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{var res=[];for(var t=0;t<40;t++){var d=document.getElementById('rwd');if(d)d.remove();window.__nav&&0;
      return typeof rewardAfter+' '+typeof window.__nav}}"""))
    print(errs)
