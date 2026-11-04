import re,json
OPT={'oben':'⬆️','unten':'⬇️','gleich viele':'🟰','ja':'✔️','nein':'❌','Kreis':'◯','Dreieck':'△','Quadrat':'□','Rechteck':'▭','Viereck':'◇','gleich':'🟰'}
EXEMOJI={'Teller':'🍽️','Fenster':'🪟','Dach':'🏠','Spielfeld-Kästchen':'🔲','Uhr':'⏰','Ball':'⚽','Tür':'🚪','Zelt':'⛺','Pizza':'🍕'}
def opt(o):
    if o in OPT:return OPT[o]
    m=re.fullmatch(r'(\d+) Uhr',o)
    if m:return '%s:00'%m.group(1)
    m=re.fullmatch(r'(\d+) Franken',o)
    if m:return '%s Fr.'%m.group(1)
    return o
def sym(q):
    """gibt (symbolische Frage, say) oder None (Karte weglassen)"""
    m=re.match
    r=m(r'Wie viele .* siehst du\?$',q) or m(r'Wie viele Punkte sind gefärbt\?$',q)
    if r:return '❓'
    r=m(r'Welche Zahl kommt nach der (\d+)\?$',q)
    if r:return '%s ➜ ❓'%r.group(1)
    r=m(r'Welche Zahl kommt vor der (\d+)\?$',q)
    if r:return '❓ ➜ %s'%r.group(1)
    r=m(r'Welche Zahl fehlt\? (.+)$',q)
    if r:return r.group(1).replace('___','❓').replace(',',' ')
    r=m(r'(\d+) Punkte sind es\. (\d+) Punkte sind rot, der Rest ist blau\. Wie viele sind blau\?$',q)
    if r:return '%s = %s + ❓'%(r.group(1),r.group(2))
    r=m(r'(\d+) ist 1 Zehner und wie viele Einer\?$',q)
    if r:return '%s = 10 + ❓'%r.group(1)
    r=m(r'Welche Zahl ist 1 Zehner und (\d+) Einer\?$',q)
    if r:return '10 + %s = ❓'%r.group(1)
    if m(r'Wo hat es mehr',q):return '📈 ❓'
    if m(r'Wo hat es weniger',q):return '📉 ❓'
    r=m(r'Setze das Zeichen: (.+)$',q)
    if r:return r.group(1)
    r=m(r'Welche Zahl ist (grösser|kleiner): (\d+) oder (\d+)\?$',q)
    if r:return '%s %s | %s ❓'%('📈' if r.group(1)=='grösser' else '📉',r.group(2),r.group(3))
    r=m(r'Verdopple die Zahl (\d+)\.$',q)
    if r:return '%s + %s = ❓'%(r.group(1),r.group(1))
    r=m(r'Das Doppelte von (\d+) ist \?$',q)
    if r:return '%s + %s = ❓'%(r.group(1),r.group(1))
    r=m(r'Das Doppelte von \? ist (\d+)\.$',q)
    if r:return '❓ + ❓ = %s'%r.group(1)
    r=m(r'Halbiere die Zahl (\d+)\.$',q) or m(r'Die Hälfte von (\d+) ist \?$',q)
    if r:return '%s = ❓ + ❓'%r.group(1)
    r=m(r'(\d+) \+ \? = (\d+)\. Welche Zahl fehlt\?$',q)
    if r:return '%s + ❓ = %s'%(r.group(1),r.group(2))
    r=m(r'Stimmt das\? Die Hälfte von (\d+) ist (\d+)\.$',q)
    if r:return '%s = %s + %s ❓'%(r.group(1),r.group(2),r.group(2))
    if re.fullmatch(r'[\d+−\- ?=]+',q):return q.replace('?','❓')
    r=m(r'(.*) = \?$',q)
    if r:return r.group(1)+' = ❓'
    r=m(r'(\d+) \+ \? = (\d+)$',q) or m(r'(\d+) − \? = (\d+)$',q)
    if r:return q.replace('?','❓')
    r=m(r'Welcher? .*Form.*: Wie heisst sie\?$',q) or m(r'Die .* Form: Wie heisst sie\?$',q) or m(r'Wie heisst die Form\?$',q)
    if r:return '❓'
    r=m(r'Wie viele Ecken hat diese Form\?$',q)
    if r:return '❓ ◣'
    r=m(r'Welche Form hat keine Ecken\?$',q)
    if r:return '0 ◣ ❓'
    r=m(r'Welche Form hat genau 3 Ecken\?$',q)
    if r:return '3 ◣ ❓'
    r=m(r'Ein (\w[\w-]*) .*Welche Form\?$',q)
    if r and r.group(1) in EXEMOJI:return EXEMOJI[r.group(1)]+' ❓'
    r=m(r'Eine (\w[\w-]*) .*Welche Form\?$',q)
    if r and r.group(1) in EXEMOJI:return EXEMOJI[r.group(1)]+' ❓'
    r=m(r'Ein (Dach|Fenster) .*Welche Form\?$',q)
    if r:return EXEMOJI[r.group(1)]+' ❓'
    if m(r'Wie viele Franken sind das\?$',q):return '❓ Fr.'
    if m(r'Wie viele Rappen sind das\?$',q):return '❓ Rp.'
    r=m(r'Was ist mehr: (\d+) Franken oder (\d+) Franken\?$',q)
    if r:return '📈 %s Fr. | %s Fr.'%(r.group(1),r.group(2))
    r=m(r'Ein Heft kostet (\d+) Franken\. Du zahlst (\d+) Franken\. Wie viel bekommst du zurück\?$',q)
    if r:return '📓 %s Fr. · 💰 %s Fr. · ↩️ ❓'%(r.group(1),r.group(2))
    r=m(r'Du hast (\d+) Franken und bekommst (\d+) Franken dazu\. Wie viel hast du\?$',q)
    if r:return '%s Fr. + %s Fr. = ❓'%(r.group(1),r.group(2))
    if m(r'Wie viel Uhr ist es\?$',q):return '❓'
    r=m(r'Es ist (\d+) Uhr\. Wie viel Uhr ist es in einer Stunde\?$',q)
    if r:return '%s:00 +1 ➜ ❓'%r.group(1)
    r=m(r'Es ist (\d+) Uhr\. Wie viel Uhr war es vor einer Stunde\?$',q)
    if r:return '%s:00 −1 ➜ ❓'%r.group(1)
    return None
def story_vis(q,tid):
    return None
def convert(t):
    """macht ein kl1-Thema wortlos: Fragen als Symbol, Optionen als Symbole, say=Original."""
    from core import EMO
    out=[];seen=set()
    EM=['🍎','🐟','⭐','🎈','🍓','🐞']
    def story(c,i):
        m=re.match(r'\w+ hat (\d+) .*\. Dann kommen (\d+) dazu\. Wie viele sind es jetzt\?$',c['q'])
        if m:return [EMO([[EM[i%6],int(m.group(1))],[EM[(i+2)%6],int(m.group(2))]])]
        m=re.match(r'\w+ hat (\d+) .*\. Davon sind (\d+) weg\. Wie viele sind noch da\?$',c['q'])
        if m:return [EMO([[EM[i%6],int(m.group(1))]],x=int(m.group(2)))]
        return None
    for i,c in enumerate(t['cards']):
        sv=story(c,i)
        if sv:c=dict(c);c['visuals']=sv;s='❓'
        else:s=sym(c['q'])
        if s is None:continue
        key=(s,json.dumps(c.get('visuals'),sort_keys=True))
        if key in seen:continue
        seen.add(key)
        c=dict(c);c['say']=c['q'].replace('○','und');c['q']=s
        if 'opts' in c:c['opts']=[opt(o) for o in c['opts']];c['a']=opt(c['a'])
        c['hints']=[];c['steps']=[[opt(x[0]),''] for x in c.get('steps',[])]
        out.append(c)
    for i,c in enumerate(out):c['id']='c%d'%(i+1)
    t['cards']=out
    qs=[];seen=set()
    for q in t['exam']['questions']:
        s=sym(q['q'])
        if s is None:continue
        key=(s,json.dumps(q.get('visuals'),sort_keys=True))
        if key in seen:continue
        seen.add(key);q=dict(q);q['say']=q['q'].replace('○','und');q['q']=s
        if q['type']=='mc':
            ans=q['options'][q['answer']];q['options']=[opt(o) for o in q['options']];q['answer']=q['options'].index(opt(ans))
        q['explain']=''
        qs.append(q)
    for i,q in enumerate(qs):q['id']='q%d'%(i+1)
    t['exam']['questions']=qs
    return t
