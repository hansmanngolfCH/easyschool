"""Pruefskript Mathe (32_mathe_pruefung): rechnet alle Karten/Pruefungsfragen der 21 neuen Mathe-Themen nach.
Aufruf: python3 32_mathe_pruefung.py   (liest ../../content.json, aendert nichts)
Ausgabe: strukturelle Probleme (generic) + Rechenfehler/Mehrdeutigkeit (solve). Leere Ausgabe bei WRONG/OPTCOUNT = alles korrekt.
"""
import json,re
d=json.load(open(__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)),'..','..','content.json')))
IDS='kl4-mathe-stellenwert kl7-mathe-negativ kl7-mathe-wurzel kl7-mathe-gleichungen kl7-mathe-prozent kl7-mathe-dreisatz kl7-mathe-winkel-dreiecke kl7-mathe-zins kl7-mathe-terme-aufstellen kl7-mathe-winkel-parallelen kl8-mathe-terme kl8-mathe-kreis-prisma kl8-mathe-lineare-funktionen kl8-mathe-potenzen kl8-mathe-oberflaeche kl8-mathe-koordinaten kl9-mathe-gleichungssysteme kl9-mathe-trigonometrie kl9-mathe-koerper kl9-mathe-stochastik kl9-mathe-einsetzung'.split()
T={t['id']:t for t in d['topics']}
def N(s):
    s=str(s).replace('−','-').replace('–','-').replace("'",'').replace('’','').replace(' ','').replace(' ','')
    s=s.replace('%','').replace('°','')
    return s
def num(s):
    s=N(s).replace(',','.')
    try: return float(s)
    except: pass
    m=re.fullmatch(r'(-?\d+)/(\d+)',s)
    if m: return int(m[1])/int(m[2])
    return None
issues=[]
def add(tid,idd,sev,msg): issues.append((tid,idd,sev,msg))
for tid in IDS:
    t=T[tid]
    for c in t['cards']:
        o=c.get('opts'); a=c['a']
        if o is not None:
            if a not in o: add(tid,c['id'],'KRIT','a nicht in opts: %r %r'%(a,o))
            if len(set(o))!=len(o): add(tid,c['id'],'MITTEL','doppelte Optionen')
            nv=[num(x) for x in o]
            if all(v is not None for v in nv) and len(set(nv))!=len(nv): add(tid,c['id'],'KRIT','numerisch gleiche Optionen %r'%o)
            if len(o)<3: add(tid,c['id'],'GERING','nur %d Optionen'%len(o))
        for fld in [c['q'],c['a']]+[x for st in c.get('steps',[]) for x in st]+(o or [])+c.get('hints',[]):
            if re.search(r'(?<![\w\s])-\d|\s-\d|= -|\+ -|\(-',str(fld)) : add(tid,c['id'],'GERING','ASCII-Minus/Format: %s'%fld); break
        if '.' in re.sub(r'\d+\.\d+\.?','',c['q']) and re.search(r'\d\.\d',c['q']): add(tid,c['id'],'GERING','Dezimalpunkt statt Komma in q')
        # step last vs answer
        st=c.get('steps')
        if st:
            last=' '.join(st[-1]); 
            if N(a) not in N(last) and N(a).replace('.',',') not in N(last): add(tid,c['id'],'MITTEL','letzter Step enthaelt a nicht: a=%r step=%r'%(a,st[-1]))
    for q in t['exam']['questions']:
        if q['type']=='mc':
            op=q['options']
            if not(0<=q['answer']<len(op)): add(tid,q['id'],'KRIT','answer idx out of range'); continue
            if op[q['answer']]!=q['explain']: add(tid,q['id'],'KRIT','options[answer]!=explain %r %r'%(op[q['answer']],q['explain']))
            if len(set(op))!=len(op): add(tid,q['id'],'MITTEL','doppelte Optionen')
            nv=[num(x) for x in op]
            if all(v is not None for v in nv) and len(set(nv))!=len(nv): add(tid,q['id'],'KRIT','numerisch gleiche Optionen %r'%op)
            if len(op)<3: add(tid,q['id'],'GERING','nur %d Optionen'%len(op))
            for x in op:
                if re.search(r'^-\d|\s-\d',x): add(tid,q['id'],'GERING','ASCII-Minus in Option %r'%x);break
        else:
            an=[N(x) for x in q['answer']]
            if N(q['explain']) not in an: add(tid,q['id'],'KRIT','explain nicht in answer-liste %r %r'%(q['explain'],q['answer']))
            # accepted forms
            if ',' in q['explain'] and not any('.' in x for x in q['answer']): add(tid,q['id'],'GERING','Dezimalpunkt-Eingabe nicht akzeptiert (nur Komma): %r'%q['answer'])
            if "'" in q['explain'] and not any("'" not in x for x in q['answer']): add(tid,q['id'],'GERING','Eingabe ohne Apostroph nicht akzeptiert')
        if re.search(r'\s-\d|= -\d',q['q']): add(tid,q['id'],'GERING','ASCII-Minus in Frage: %s'%q['q'])

import re,math,json
from fractions import Fraction as F
PI=3.14
def n(s):
    s=s.replace('−','-').replace("'",'').replace(',','.')
    return float(s)
def fmtnum(x):
    if abs(x-round(x))<1e-9: return str(int(round(x)))
    return ('%.10f'%x).rstrip('0').rstrip('.').replace('.',',')
def poly(s):
    return s
def sup(s):
    tr=str.maketrans('⁰¹²³⁴⁵⁶⁷⁸⁹','0123456789'); return int(s.translate(tr))
def tosup(k): return str(k).translate(str.maketrans('0123456789','⁰¹²³⁴⁵⁶⁷⁸⁹'))
def frac_str(f): 
    return '%d/%d'%(f.numerator,f.denominator) if f.denominator!=1 else str(f.numerator)
R={}
def rule(tid,pat):
    def deco(fn): R.setdefault(tid,[]).append((re.compile(pat),fn)); return fn
    return deco
NUM=r"(-?[\d'’]+(?:,\d+)?)"
def isqrt(x): return int(round(math.sqrt(x)))
def G(m,i): return n(m.group(i))
# --- stellenwert
tid='kl4-mathe-stellenwert'
names=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender']
@rule(tid,r"^([\d']+): Welche Ziffer steht bei den (\w+)\?$")
def f(m): s=m[1].replace("'",''); k=names.index(m[2]); return s[len(s)-1-k]
@rule(tid,r"^(\d) HT \+ (\d) ZT \+ (\d) T \+ (\d) H \+ (\d) Z \+ (\d) E = \?$")
def f(m): return "{:,}".format(int(''.join(m.groups()))).replace(',',"'")
@rule(tid,r"^Welche Zahl ist ([\d']+) (mehr|weniger) als ([\d']+)\?$")
def f(m): v=int(m[1].replace("'",'')); b=int(m[3].replace("'",'')); r=b+v if m[2]=='mehr' else b-v; return "{:,}".format(r).replace(',',"'")
@rule(tid,r"^Welche Zahl ist grösser: ([\d']+) oder ([\d']+)\?$")
def f(m): a,b=m[1],m[2]; return a if int(a.replace("'",''))>int(b.replace("'",'')) else b
@rule(tid,r"^Wie viele Tausender hat ([\d']+) insgesamt\?$")
def f(m): return str(int(m[1].replace("'",''))//1000)
@rule(tid,r"^Welchen Wert hat die (\d)\. Ziffer von links in ([\d']+)\?$")
def f(m): s=m[2].replace("'",''); i=int(m[1])-1; v=int(s[i])*10**(len(s)-1-i); return "{:,}".format(v).replace(',',"'")
@rule(tid,r"^Welchen Wert hat die Ziffer (\d) in ([\d']+)\?$")
def f(m):
    s=m[2].replace("'",''); 
    if s.count(m[1])!=1: return 'AMBIG'
    i=s.index(m[1]); v=int(m[1])*10**(len(s)-1-i); return "{:,}".format(v).replace(',',"'")
# --- negativ
tid='kl7-mathe-negativ'
def neg(x):
    x=int(x); return ('−%d'%-x) if x<0 else str(x)
def ev(expr):
    e=expr.replace('−','-').replace('·','*').replace(':','/').replace('^','**')
    return eval(e)
@rule(tid,r"^\(?(-?[−\d]+)\)? ([+−]) \(?(−?\d+)\)?( = \?)?$")
def f(m): pass
@rule(tid,r"^(.*) = \?$")
def f(m):
    e=m[1].replace('−','-')
    if not re.fullmatch(r"[\d\s()+\-]+",e): return None
    return neg(eval(e))
@rule(tid,r"^\|(−?\d+)\| = \?$")
def f(m): return str(abs(int(m[1].replace('−','-'))))
@rule(tid,r"^Wie heisst die Gegenzahl von (−?\d+)\?$")
def f(m): return neg(-int(m[1].replace('−','-')))
@rule(tid,r"^Welche Zahl ist kleiner: (−?\d+) oder (−?\d+)\?$")
def f(m): a,b=m[1],m[2]; return a if int(a.replace('−','-'))<int(b.replace('−','-')) else b
@rule(tid,r"^Am Morgen hat es (−?\d+) °C\. Bis am Mittag wird es (\d+) Grad wärmer\. Wie warm ist es am Mittag\?$")
def f(m): return neg(int(m[1].replace('−','-'))+int(m[2]))
@rule(tid,r"^Es hat (−?\d+) °C\. In der Nacht sinkt die Temperatur um (\d+) Grad\. Wie kalt wird es\?$")
def f(m): return neg(int(m[1].replace('−','-'))-int(m[2]))
@rule(tid,r"^Berechne (.*) für x = (−?\d+)\.$")
def f(m):
    e=m[1].replace('−','-').replace('·','*'); x=int(m[2].replace('−','-'))
    e=re.sub(r'(\d)x',r'\1*x',e); return neg(eval(e,{'x':x}))
# --- wurzel
tid='kl7-mathe-wurzel'
@rule(tid,r"^√(\d+) = \?$")
def f(m): return str(isqrt(int(m[1]))) if isqrt(int(m[1]))**2==int(m[1]) else 'NONSQ'
@rule(tid,r"^Ein Quadrat hat die Seitenlänge (\d+) cm\. Wie gross ist die Fläche in cm²\?$")
def f(m): return str(int(m[1])**2)
@rule(tid,r"^Ein Quadrat hat die Fläche (\d+) cm²\. Wie lang ist eine Seite in cm\?$")
def f(m): return str(isqrt(int(m[1])))+('' if isqrt(int(m[1]))**2==int(m[1]) else 'NONSQ')
@rule(tid,r"^Zwischen welchen ganzen Zahlen liegt √(\d+)\?$")
def f(m): k=int(math.floor(math.sqrt(int(m[1])))); return '%d und %d'%(k,k+1) if k*k!=int(m[1]) else 'SQ'
@rule(tid,r"^√(\d+) \+ √(\d+) = \?$")
def f(m): return str(isqrt(int(m[1]))+isqrt(int(m[2])))
@rule(tid,r"^\((−?\d+)\)² = \?$")
def f(m): return str(int(m[1].replace('−','-'))**2)
@rule(tid,r"^(\d+)² = \?$")
def f(m): return str(int(m[1])**2)
# --- gleichungen
tid='kl7-mathe-gleichungen'
def lin(s):
    return s
@rule(tid,r"^Löse: (\d+)x = (\d+)\. x = \?$")
def f(m): return neg(F(int(m[2]),int(m[1])))
@rule(tid,r"^Löse: x : (\d+) = (\d+)\. x = \?$")
def f(m): return str(int(m[1])*int(m[2]))
@rule(tid,r"^Löse: x \+ (\d+) = (\d+)\. x = \?$")
def f(m): return str(int(m[2])-int(m[1]))
@rule(tid,r"^Löse: (\d+)x ([+−-]) (\d+) = (−?-?\d+)\. x = \?$")
def f(m):
    a=int(m[1]); b=int(m[3])*(1 if m[2]=='+' else -1); c=int(m[4].replace('−','-')); v=F(c-b,a); return neg(v)
@rule(tid,r"^Löse: (\d+) · \(x \+ (\d+)\) = (\d+)\. x = \?$")
def f(m): return neg(F(int(m[3]),int(m[1]))-int(m[2]))
@rule(tid,r"^Ich denke mir eine Zahl, nehme sie mal (\d+) und zähle (\d+) dazu\. Ergebnis: (\d+)\. Welche Zahl habe ich gedacht\?$")
def f(m): return neg(F(int(m[3])-int(m[2]),int(m[1])))
@rule(tid,r"^Ist x = (-?\d+) eine Lösung von (\d+)x \+ (\d+) = (\d+)\?$")
def f(m): return 'ja' if int(m[2])*int(m[1])+int(m[3])==int(m[4]) else 'nein'
# --- prozent
tid='kl7-mathe-prozent'
def pr(x): return fmtnum(x)
@rule(tid,r"^Von (\d+) Schülern fehlen (\d+)\. Wie viel Prozent fehlen\?$")
def f(m): return pr(int(m[2])/int(m[1])*100)+' %'
@rule(tid,r"^(\d+) % eines Betrags sind (\d+) Fr\. Wie viel Franken sind 100 %\?$")
def f(m): return pr(int(m[2])/int(m[1])*100)
@rule(tid,r"^Ein (\w+) kostet (\d+) Fr\. Es gibt (\d+) % Rabatt\. Wie viel kostet er jetzt\?$")
def f(m): return pr(int(m[2])*(100-int(m[3]))/100)
@rule(tid,r"^Ein (\w+) kostet (\d+) Fr\. Der Preis steigt um (\d+) %\. Wie viel kostet es danach\?$")
def f(m): return pr(int(m[2])*(100+int(m[3]))/100)
@rule(tid,r"^Wie heisst (\d+) % als Bruch\?$")
def f(m): return frac_str(F(int(m[1]),100))
@rule(tid,r"^(0,\d+) als Prozent: wie viel %\?$")
def f(m): return pr(n(m[1])*100)+' %'
@rule(tid,r"^Ein Artikel kostet (\d+) Fr\. ohne Mehrwertsteuer\. Die Mehrwertsteuer beträgt (\d+) %\. Wie viel kostet er mit Mehrwertsteuer\?$")
def f(m): return pr(int(m[1])*(100+int(m[2]))/100)
@rule(tid,r"^Wie viel sind (\d+) % von (\d+)\?$")
def f(m): return pr(int(m[1])*int(m[2])/100)
# --- dreisatz
tid='kl7-mathe-dreisatz'
@rule(tid,r"^Ein Zug fährt in (\d+) Stunden (\d+) km\. Wie weit kommt er in (\d+) Stunden\?$")
def f(m): return pr(F(int(m[2]),int(m[1]))*int(m[3]))
@rule(tid,r"^(\d+) Arbeiter brauchen (\d+) Tage für eine Arbeit\. Wie viele Tage brauchen (\d+) Arbeiter\?$")
def f(m): return pr(F(int(m[1])*int(m[2]),int(m[3])))
@rule(tid,r"^Für (\d+) Personen braucht man (\d+) g Reis\. Wie viele Gramm braucht man für (\d+) Personen\?$")
def f(m): return pr(F(int(m[2]),int(m[1]))*int(m[3]))
@rule(tid,r"^(\d+) (?:kg|m) [\wä]+ kosten (\d+) Fr\. Wie viel kosten (\d+) (?:kg|m)\?$")
def f(m): return pr(F(int(m[2]),int(m[1]))*int(m[3]))
# --- winkel dreiecke
tid='kl7-mathe-winkel-dreiecke'
@rule(tid,r"^Der Winkel α misst (\d+)°\. Wie gross ist sein Nebenwinkel β\?$")
def f(m): return str(180-int(m[1]))
@rule(tid,r"^Der Winkel α misst (\d+)°\. Wie gross ist der Scheitelwinkel\?$")
def f(m): return m[1]
@rule(tid,r"^Ein gleichschenkliges Dreieck hat an der Spitze (\d+)°\. Wie gross ist ein Basiswinkel\?$")
def f(m): return pr((180-int(m[1]))/2)
@rule(tid,r"^Ein gleichschenkliges Dreieck hat Basiswinkel von je (\d+)°\. Wie gross ist der Winkel an der Spitze\?$")
def f(m): return str(180-2*int(m[1]))
@rule(tid,r"^Ein Viereck hat die Winkel (\d+)°, (\d+)° und (\d+)°\. Wie gross ist der vierte Winkel\?$")
def f(m): return str(360-sum(map(int,m.groups())))
@rule(tid,r"^Ein rechtwinkliges Dreieck hat einen Winkel von (\d+)°\. Wie gross ist der dritte Winkel\?$")
def f(m): return str(90-int(m[1]))
@rule(tid,r"^Ein Winkel von (\d+)° ist …$")
def f(m): x=int(m[1]); return 'spitz' if x<90 else 'rechtwinklig' if x==90 else 'stumpf' if x<180 else 'gestreckt'
@rule(tid,r"^Ein Dreieck hat die Winkel (\d+)° und (\d+)°\. Wie gross ist der dritte Winkel\?$")
def f(m): return str(180-int(m[1])-int(m[2]))
# --- zins
tid='kl7-mathe-zins'
@rule(tid,r"^Auf (\d+) Fr\. gibt es in einem Jahr (\d+) Fr\. Zins\. Wie hoch ist der Zinssatz in Prozent\?$")
def f(m): return pr(int(m[2])/int(m[1])*100)+' %'
@rule(tid,r"^Bei (\d+) % Zins gibt es im Jahr (\d+) Fr\. Zins\. Wie gross ist das Kapital\?$")
def f(m): return pr(int(m[2])/int(m[1])*100)
@rule(tid,r"^Du legst (\d+) Fr\. zu (\d+) % an\. Wie viel Geld hast du nach einem Jahr\?$")
def f(m): return pr(int(m[1])*(100+int(m[2]))/100)
@rule(tid,r"^Du legst (\d+) Fr\. zu (\d+) % für 6 Monate an\. Wie viel Zins bekommst du\?$")
def f(m): return pr(int(m[1])*int(m[2])/100/2)
@rule(tid,r"^Du legst (\d+) Fr\. für 1 Jahr zu (\d+) % Zins an\. Wie viel Zins bekommst du\?$")
def f(m): return pr(int(m[1])*int(m[2])/100)
# --- terme aufstellen: custom later
tid='kl7-mathe-terme-aufstellen'
@rule(tid,r"^Berechne (\d+)x \+ (\d+) für x = (\d+)\.$")
def f(m): return str(int(m[1])*int(m[3])+int(m[2]))
# --- winkel parallelen
tid='kl7-mathe-winkel-parallelen'
@rule(tid,r"^Zwei Parallelen werden von einer Geraden geschnitten\. Ein Winkel misst (\d+)°\. Wie gross ist der (?:Wechselwinkel|Stufenwinkel)\?$")
def f(m): return m[1]
@rule(tid,r"^Zwei Parallelen werden von einer Geraden geschnitten\. Ein Winkel misst (\d+)°\. Wie gross ist der Nebenwinkel seines Stufenwinkels\?$")
def f(m): return str(180-int(m[1]))
@rule(tid,r"^Zwei Geraden schneiden sich\. Ein Winkel misst (\d+)°\. Wie gross ist der Scheitelwinkel\?$")
def f(m): return m[1]
@rule(tid,r"^Ein Parallelogramm hat einen Winkel von (\d+)°\. Wie gross ist der benachbarte Winkel\?$")
def f(m): return str(180-int(m[1]))
@rule(tid,r"^Ein Parallelogramm hat einen Winkel von (\d+)°\. Wie gross ist der gegenüberliegende Winkel\?$")
def f(m): return m[1]
@rule(tid,r"^In einem Trapez ist AB parallel zu CD\. Der Winkel α bei A misst (\d+)°\. Wie gross ist der Winkel δ bei D\?$")
def f(m): return str(180-int(m[1]))
@rule(tid,r"^Ein Parallelogramm hat die Grundseite (\d+) cm und die Höhe (\d+) cm\. Wie gross ist die Fläche in cm²\?$")
def f(m): return str(int(m[1])*int(m[2]))
@rule(tid,r"^Ein Trapez hat die parallelen Seiten (\d+) cm und (\d+) cm und die Höhe (\d+) cm\. Wie gross ist die Fläche in cm²\?$")
def f(m): return pr(F(int(m[1])+int(m[2]),2)*int(m[3]))
# --- kl8 terme
tid='kl8-mathe-terme'
def mono(c,v): 
    return ('' if c==1 else str(c))+v
@rule(tid,r"^Vereinfache: (\d+)(\w) ([+−]) (\d+)\2$")
def f(m): c=int(m[1])+(int(m[4]) if m[3]=='+' else -int(m[4])); return mono(c,m[2])
@rule(tid,r"^Multipliziere aus: (\d+) · \(x ([+−]) (\d+)\)$")
def f(m): a=int(m[1]); b=int(m[3]); return '%dx %s %d'%(a,m[2],a*b)
@rule(tid,r"^\(x ([+−]) (\d+)\)² = \?$")
def f(m): b=int(m[2]); return 'x² %s %dx + %d'%(m[1],2*b,b*b)
@rule(tid,r"^\(x \+ (\d+)\)\(x − \1\) = \?$")
def f(m): return 'x² − %d'%(int(m[1])**2)
@rule(tid,r"^Faktorisiere: x² − (\d+) = \(x \+ (\d+)\)\(\?\)$")
def f(m): return ('x − %d'%int(m[2])) if int(m[2])**2==int(m[1]) else 'BAD'
@rule(tid,r"^Berechne (\d+)² mit der ersten binomischen Formel\.$")
def f(m): return str(int(m[1])**2)
# --- kreis prisma
tid='kl8-mathe-kreis-prisma'
@rule(tid,r"^Ein Kreis hat den Radius (\d+) cm\. Wie gross ist die Fläche in cm²\? \(π ≈ 3,14\)$")
def f(m): return fmtnum(int(m[1])**2*PI)
@rule(tid,r"^Ein Kreis hat den Durchmesser (\d+) cm\. Wie gross ist der Umfang in cm\? \(π ≈ 3,14\)$")
def f(m): return fmtnum(int(m[1])*PI)
@rule(tid,r"^Ein Kreis hat den Radius (\d+) cm\. Wie gross ist der Umfang in cm\? \(π ≈ 3,14\)$")
def f(m): return fmtnum(2*int(m[1])*PI)
@rule(tid,r"^Ein Prisma hat die rechteckige Grundfläche (\d+) cm × (\d+) cm und die Höhe (\d+) cm\. Wie gross ist das Volumen in cm³\?$")
def f(m): return str(int(m[1])*int(m[2])*int(m[3]))
@rule(tid,r"^Ein Prisma hat ein Dreieck als Grundfläche \(Grundseite (\d+) cm, Höhe (\d+) cm\)\. Das Prisma ist (\d+) cm hoch\. Wie gross ist das Volumen in cm³\?$")
def f(m): return fmtnum(int(m[1])*int(m[2])/2*int(m[3]))
@rule(tid,r"^Ein Prisma hat die rechteckige Grundfläche (\d+) cm × (\d+) cm und die Höhe (\d+) cm\. Wie gross ist die Mantelfläche in cm²\?$")
def f(m): return str(2*(int(m[1])+int(m[2]))*int(m[3]))
@rule(tid,r"^Ein Prisma hat das Volumen (\d+) cm³ und die Grundfläche (\d+) cm²\. Wie hoch ist es in cm\?$")
def f(m): return fmtnum(int(m[1])/int(m[2]))
# --- lineare funktionen
tid='kl8-mathe-lineare-funktionen'
def P(s): return int(s.replace('−','-'))
@rule(tid,r"^Eine Gerade geht durch P\((−?\d+)\|(−?\d+)\) und Q\((−?\d+)\|(−?\d+)\)\. Wie gross ist die Steigung m\?$")
def f(m): x1,y1,x2,y2=map(P,m.groups()); return neg(F(y2-y1,x2-x1))
@rule(tid,r"^Eine Gerade hat die Gleichung y = (−?-?\d*)x ([+−]) (\d+)\. Bei welchem y-Wert schneidet sie die y-Achse\?$")
def f(m): return neg(int(m[3])*(1 if m[2]=='+' else -1))
@rule(tid,r"^Wo schneidet die Gerade y = (−?-?\d*)x ([+−]) (\d+) die x-Achse \(Nullstelle\)\?$")
def f(m):
    a=m[1].replace('−','-'); a={'':1,'-':-1}.get(a,None) or int(a); b=int(m[3])*(1 if m[2]=='+' else -1); return neg(F(-b,a))
@rule(tid,r"^Wo schneidet die Gerade y = (−?-?\d*)x die x-Achse \(Nullstelle\)\?$")
def f(m): return '0'
@rule(tid,r"^Liegt der Punkt P\((−?\d+)\|(−?\d+)\) auf der Geraden y = (−?-?\d*)x(?: ([+−]) (\d+))?\?$")
def f(m):
    x,y=P(m[1]),P(m[2]); a=m[3].replace('−','-'); a={'':1,'-':-1}.get(a,None) or int(a); b=(int(m[5])*(1 if m[4]=='+' else -1)) if m[5] else 0
    return 'ja' if a*x+b==y else 'nein'
@rule(tid,r"^Ein Taxi kostet (\d+) Fr\. Grundpreis und (\d+) Fr\. pro km\. Wie viel kostet eine Fahrt von (\d+) km\?$")
def f(m): return str(int(m[1])+int(m[2])*int(m[3]))
@rule(tid,r"^f\(x\) = (−?-?\d*)x ([+−]) (\d+)\. Berechne f\((−?\d+)\)\.$")
def f(m):
    a=m[1].replace('−','-'); a={'':1,'-':-1}.get(a,None) or int(a); b=int(m[3])*(1 if m[2]=='+' else -1); return neg(a*P(m[4])+b)
@rule(tid,r"^Die Gerade y = (−?-?\d*)x(?: [+−] \d+)? …$")
def f(m):
    a=m[1].replace('−','-'); a={'':1,'-':-1}.get(a,None) or int(a); return 'steigt' if a>0 else 'fällt' if a<0 else 'ist waagrecht'
# --- potenzen
tid='kl8-mathe-potenzen'
@rule(tid,r"^x([⁰¹²³⁴⁵⁶⁷⁸⁹]+) · x([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return 'x'+tosup(sup(m[1])+sup(m[2]))
@rule(tid,r"^x([⁰¹²³⁴⁵⁶⁷⁸⁹]+) : x([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return 'x'+tosup(sup(m[1])-sup(m[2]))
@rule(tid,r"^(\d+)⁰ = \?$")
def f(m): return '1'
@rule(tid,r"^\((−?\d+)\)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return neg(P(m[1])**sup(m[2]))
@rule(tid,r"^(\d+) · 10([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return "{:,}".format(int(m[1])*10**sup(m[2])).replace(',',"'")
@rule(tid,r"^10([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return "{:,}".format(10**sup(m[1])).replace(',',"'")
@rule(tid,r"^Was ist grösser: (\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) oder (\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)\?$")
def f(m): a=int(m[1])**sup(m[2]); b=int(m[3])**sup(m[4]); return (m[1]+m[2]) if a>b else (m[3]+m[4])
@rule(tid,r"^(\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) \+ \1\2 = \?$")
def f(m): return str(2*int(m[1])**sup(m[2]))
@rule(tid,r"^(\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) = \?$")
def f(m): return "{:,}".format(int(m[1])**sup(m[2])).replace(',',"'")
# --- oberflaeche
tid='kl8-mathe-oberflaeche'
@rule(tid,r"^Ein Quader ist (\d+) cm lang, (\d+) cm breit und (\d+) cm hoch\. Wie gross ist die Oberfläche in cm²\?$")
def f(m): a,b,c=map(int,m.groups()); return str(2*(a*b+a*c+b*c))
@rule(tid,r"^Ein Prisma hat eine quadratische Grundfläche mit der Seite (\d+) cm und ist (\d+) cm hoch\. Wie gross ist die Oberfläche in cm²\?$")
def f(m): a,h=map(int,m.groups()); return str(2*a*a+4*a*h)
@rule(tid,r"^Ein Prisma hat als Grundfläche ein rechtwinkliges Dreieck mit den Seiten (\d+) cm, (\d+) cm und (\d+) cm\. Es ist (\d+) cm hoch\. Wie gross ist die Oberfläche in cm²\?$")
def f(m): a,b,c,h=map(int,m.groups()); assert a*a+b*b==c*c; return str(a*b+(a+b+c)*h)
@rule(tid,r"^Ein Zylinder hat den Radius (\d+) cm und die Höhe (\d+) cm\. Wie gross ist die Oberfläche in cm²\? \(π ≈ 3,14\)$")
def f(m): r,h=map(int,m.groups()); return fmtnum(2*r*r*PI+2*r*PI*h)
@rule(tid,r"^Ein Zylinder hat den Radius (\d+) cm und die Höhe (\d+) cm\. Wie gross ist nur der Mantel in cm²\? \(π ≈ 3,14\)$")
def f(m): r,h=map(int,m.groups()); return fmtnum(2*r*PI*h)
@rule(tid,r"^Ein Würfel hat die Kantenlänge (\d+) cm\. Aus wie vielen gleich grossen Quadraten besteht seine Oberfläche\?$")
def f(m): return '6'
@rule(tid,r"^Ein Würfel hat die Kantenlänge (\d+) cm\. Wie gross ist die Oberfläche in cm²\?$")
def f(m): return str(6*int(m[1])**2)
# --- koordinaten
tid='kl8-mathe-koordinaten'
def pt(x,y): return '(%s|%s)'%(neg(x),neg(y))
@rule(tid,r"^Gehe vom Nullpunkt (\d+) nach rechts und (\d+) nach oben\. Wie heisst der Punkt\?$")
def f(m): return '(%s|%s)'%(m[1],m[2])
@rule(tid,r"^Spiegle P\((−?\d+)\|(−?\d+)\) an der x-Achse\. Wie heisst der Bildpunkt\?$")
def f(m): return pt(P(m[1]),-P(m[2]))
@rule(tid,r"^Spiegle P\((−?\d+)\|(−?\d+)\) an der y-Achse\. Wie heisst der Bildpunkt\?$")
def f(m): return pt(-P(m[1]),P(m[2]))
@rule(tid,r"^Spiegle P\((−?\d+)\|(−?\d+)\) am Nullpunkt\. Wie heisst der Bildpunkt\?$")
def f(m): return pt(-P(m[1]),-P(m[2]))
@rule(tid,r"^Wie weit sind A\((−?\d+)\|(−?\d+)\) und B\((−?\d+)\|(−?\d+)\) voneinander entfernt\?$")
def f(m): x1,y1,x2,y2=map(P,m.groups()); assert y1==y2; return str(abs(x2-x1))
@rule(tid,r"^Wie heisst die Mitte der Strecke zwischen A\((−?\d+)\|(−?\d+)\) und B\((−?\d+)\|(−?\d+)\)\?$")
def f(m): x1,y1,x2,y2=map(P,m.groups()); return pt(F(x1+x2,2),F(y1+y2,2))
@rule(tid,r"^Ein Rechteck hat die Ecken A\((−?\d+)\|(−?\d+)\), B\((−?\d+)\|(−?\d+)\) und C\((−?\d+)\|(−?\d+)\)\. Wie heisst die vierte Ecke D\?$")
def f(m): x1,y1,x2,y2,x3,y3=map(P,m.groups()); assert y1==y2 and x2==x3; return pt(x1,y3)
@rule(tid,r"^In welchem Quadranten liegt P\((−?\d+)\|(−?\d+)\)\?$")
def f(m): x,y=P(m[1]),P(m[2]); return 'I' if x>0 and y>0 else 'II' if x<0 and y>0 else 'III' if x<0 and y<0 else 'IV'
# --- gleichungssysteme
tid='kl9-mathe-gleichungssysteme'
@rule(tid,r"^Es gilt x \+ y = (\d+) und x − y = (\d+)\. Wie gross ist (x|y)\?$")
def f(m): s,d=int(m[1]),int(m[2]); return neg(F(s+d,2) if m[3]=='x' else F(s-d,2))
@rule(tid,r"^Es gilt 2x \+ y = (\d+) und x \+ y = (\d+)\. Wie gross ist (x|y)\?$")
def f(m): a,b=int(m[1]),int(m[2]); x=a-b; return str(x if m[3]=='x' else b-x)
@rule(tid,r"^Die Summe zweier Zahlen ist (\d+), die Differenz ist (\d+)\. Wie heisst die (grössere|kleinere) Zahl\?$")
def f(m): s,d=int(m[1]),int(m[2]); return neg(F(s+d,2) if m[3]=='grössere' else F(s-d,2))
@rule(tid,r"^(\d+) Erwachsene und 1 Kind zahlen (\d+) Fr\. 1 Erwachsener und 1 Kind zahlen (\d+) Fr\. Wie viel kostet ein Erwachsenenticket\?$")
def f(m): return str((int(m[2])-int(m[3]))//(int(m[1])-1))
@rule(tid,r"^Es gilt y = (\d+)x und x \+ y = (\d+)\. Wie gross ist (x|y)\?$")
def f(m): k,s=int(m[1]),int(m[2]); x=F(s,k+1); return neg(x if m[3]=='x' else k*x)
@rule(tid,r"^Gilt x = (\d+) und y = (\d+) für beide Gleichungen x \+ y = (−?\d+) und x − y = (−?\d+)\?$")
def f(m): x,y,s,d=map(P,m.groups()); return 'ja' if x+y==s and x-y==d else 'nein'
# --- trig
tid='kl9-mathe-trigonometrie'
@rule(tid,r"^Zwei Dreiecke sind ähnlich\. Aus der Seite (\d+) cm wird (\d+) cm\. Wie lang wird die Seite (\d+) cm\?$")
def f(m): return str(F(int(m[2]),int(m[1]))*int(m[3]))
@rule(tid,r"^Ein Dreieck wird vergrössert\. Aus der Seite (\d+) cm wird (\d+) cm\. Wie gross ist der Streckfaktor\?$")
def f(m): return pr(F(int(m[2]),int(m[1])))
@rule(tid,r"^Im rechtwinkligen Dreieck ist die Gegenkathete von α (\d+) cm, die Ankathete (\d+) cm und die Hypotenuse (\d+) cm\. Wie gross ist (sin|cos|tan) α\?$")
def f(m):
    g,a,h=map(int,m.groups()[:3]); assert g*g+a*a==h*h
    v={'sin':F(g,h),'cos':F(a,h),'tan':F(g,a)}[m[4]]; return fmtnum(float(v)) 
@rule(tid,r"^Ein (\d+) m langer Stab wirft einen Schatten von (\d+) m\. Gleichzeitig wirft ein Baum (\d+) m Schatten\. Wie hoch ist der Baum in m\?$")
def f(m): return pr(F(int(m[1]),int(m[2]))*int(m[3]))
@rule(tid,r"^Im rechtwinkligen Dreieck ist α = 30° und die Hypotenuse (\d+) cm\. Wie lang ist die Gegenkathete\?$")
def f(m): return pr(int(m[1])/2)
# --- koerper
tid='kl9-mathe-koerper'
@rule(tid,r"^Eine Pyramide hat die quadratische Grundfläche (\d+) cm × (\d+) cm und die Höhe (\d+) cm\. Wie gross ist das Volumen in cm³\?$")
def f(m): a,b,h=map(int,m.groups()); return fmtnum(a*b*h/3)
@rule(tid,r"^Ein Kegel hat den Radius (\d+) cm und die Höhe (\d+) cm\. Wie gross ist das Volumen in cm³\? \(π ≈ 3,14\)$")
def f(m): r,h=map(int,m.groups()); return fmtnum(r*r*PI*h/3)
@rule(tid,r"^Ein Zylinder hat den Radius (\d+) cm und die Höhe (\d+) cm\. Wie gross ist die Mantelfläche in cm²\? \(π ≈ 3,14\)$")
def f(m): r,h=map(int,m.groups()); return fmtnum(2*r*PI*h)
@rule(tid,r"^Ein Zylinder hat den Radius (\d+) cm und die Höhe (\d+) cm\. Wie gross ist das Volumen in cm³\? \(π ≈ 3,14\)$")
def f(m): r,h=map(int,m.groups()); return fmtnum(r*r*PI*h)
@rule(tid,r"^Ein Zylinder hat das Volumen (\d+) cm³ und die Grundfläche (\d+) cm²\. Wie hoch ist er in cm\?$")
def f(m): return fmtnum(int(m[1])/int(m[2]))
@rule(tid,r"^Ein Quader (\d+) cm × (\d+) cm × (\d+) cm wird mit einem Würfel der Kantenlänge (\d+) cm verbunden\. Wie gross ist das Gesamtvolumen in cm³\?$")
def f(m): a,b,c,k=map(int,m.groups()); return str(a*b*c+k**3)
@rule(tid,r"^Ein Behälter fasst (\d+) cm³\. Wie viele Milliliter sind das\?$")
def f(m): return m[1]
@rule(tid,r"^Eine Kugel hat den Radius (\d+) cm\. Wie gross ist das Volumen in cm³\? \(π ≈ 3,14\)$")
def f(m): r=int(m[1]); return fmtnum(4*PI*r**3/3)
@rule(tid,r"^Eine Kugel hat den Radius (\d+) cm\. Wie gross ist die Oberfläche in cm²\? \(π ≈ 3,14\)$")
def f(m): r=int(m[1]); return fmtnum(4*PI*r*r)
# --- stochastik
tid='kl9-mathe-stochastik'
def lst(s): return [int(x) for x in s.split(', ')]
def med(l): l=sorted(l); k=len(l); return l[k//2] if k%2 else None
@rule(tid,r"^Bestimme den Median: ([\d, ]+)$")
def f(m):
    l=sorted(lst(m[1])); k=len(l)
    return str(l[k//2]) if k%2 else 'EVEN'
@rule(tid,r"^Berechne den Mittelwert: ([\d, ]+)$")
def f(m): l=lst(m[1]); return fmtnum(sum(l)/len(l))
@rule(tid,r"^Wie gross ist die Spannweite\? ([\d, ]+)$")
def f(m): l=lst(m[1]); return str(max(l)-min(l))
@rule(tid,r"^Die Wahrscheinlichkeit ist (\d+)/(\d+)\. Wie viel Prozent sind das\?$")
def f(m): return fmtnum(int(m[1])/int(m[2])*100)+' %'
@rule(tid,r"^Du wirfst eine Münze (\d+)-mal\. Wie gross ist die Wahrscheinlichkeit, dass immer Kopf kommt\?$")
def f(m): return frac_str(F(1,2**int(m[1])))
@rule(tid,r"^Welcher Wert kommt am häufigsten vor \(Modus\)\? ([\d, ]+)$")
def f(m):
    from collections import Counter
    c=Counter(lst(m[1])).most_common(); return str(c[0][0]) if len(c)==1 or c[0][1]>c[1][1] else 'MULTIMODE'
@rule(tid,r"^In einer Urne liegen (\d+) rote, (\d+) blaue und (\d+) grüne Kugeln\. Wie gross ist die Wahrscheinlichkeit für „(rot|blau|grün)“\?$")
def f(m): r,b,g=map(int,m.groups()[:3]); k={'rot':r,'blau':b,'grün':g}[m[4]]; return frac_str(F(k,r+b+g))
@rule(tid,r"^Du hast (\d+) Hosen und (\d+) T-Shirts\. Wie viele Kombinationen gibt es\?$")
def f(m): return str(int(m[1])*int(m[2]))
@rule(tid,r"^Du würfelst einmal\. Wie gross ist die Wahrscheinlichkeit für (.*)\?$")
def f(m):
    s=m[1]; 
    cond={'eine Primzahl':lambda k:k in (2,3,5),'eine gerade Zahl':lambda k:k%2==0,'eine 6':lambda k:k==6,'keine 6':lambda k:k!=6}
    if s in cond: return frac_str(F(sum(1 for k in range(1,7) if cond[s](k)),6))
    mm=re.fullmatch(r'eine Zahl (grösser|kleiner) als (\d)',s)
    if mm: t=int(mm[2]); return frac_str(F(sum(1 for k in range(1,7) if (k>t if mm[1]=='grösser' else k<t)),6))
# --- einsetzung
tid='kl9-mathe-einsetzung'
@rule(tid,r"^Es gilt y = (\d*)x(?: \+ (\d+))? und x \+ y = (\d+)\. Wie gross ist (x|y)\?$")
def f(m):
    a=int(m[1]) if m[1] else 1; b=int(m[2] or 0); s=int(m[3]); x=F(s-b,a+1); return neg(x if m[4]=='x' else a*x+b)
@rule(tid,r"^Es gilt y = (\d*)x(?: \+ (\d+))? und y = (\d*)x(?: \+ (\d+))?\. Wie gross ist (x|y)\?$")
def f(m):
    a=int(m[1]) if m[1] else 1; b=int(m[2] or 0); c=int(m[3]) if m[3] else 1; e=int(m[4] or 0); x=F(e-b,a-c); return neg(x if m[5]=='x' else a*x+b)
@rule(tid,r"^Ein Heft und ein Stift kosten zusammen (\d+) Fr\. Das Heft kostet (\d+) Fr\. mehr als der Stift\. Wie viel kostet der Stift\?$")
def f(m): return neg(F(int(m[1])-int(m[2]),2))
@rule(tid,r"^Ist x = (\d+), y = (\d+) eine Lösung von y = x \+ (-?\d+) und x \+ y = (\d+)\?$")
def f(m): x,y,c,s=map(int,m.groups()); return 'ja' if y==x+c and x+y==s else 'nein'

def check():
    out=[]
    covered={}
    for tid in IDS:
        rules=R.get(tid,[])
        items=[(c['id'],c['q'],c['a'],c.get('opts')) for c in T[tid]['cards']]
        for q in T[tid]['exam']['questions']:
            items.append((q['id'],q['q'],q['explain'],q.get('options')))
        for idd,qq,a,opts in items:
            res=None; matched=False
            for pat,fn in rules:
                m=pat.match(qq)
                if m:
                    try: r=fn(m)
                    except Exception as e: r='ERR %s'%e
                    if r is None: continue
                    matched=True; res=r; break
            if not matched: out.append((tid,idd,'UNMATCHED',qq,a)); continue
            if res in ('AMBIG','EVEN','MULTIMODE','NONSQ','SQ','BAD') or (isinstance(res,str) and (res.startswith('ERR') or 'NONSQ' in res)):
                out.append((tid,idd,res,qq,a)); continue
            if N(res)!=N(a): out.append((tid,idd,'WRONG',qq,'expected',res,'got',a))
            elif opts:
                cnt=sum(1 for o in opts if N(o)==N(res))
                if cnt!=1: out.append((tid,idd,'OPTCOUNT',qq,cnt,opts))
    return out

# --- terme-aufstellen (zusaetzliche Regeln)
tid='kl7-mathe-terme-aufstellen'
@rule(tid,r"^Eine Zahl x ist um (\d+) grösser als eine andere Zahl\. .*$")
def f(m): return 'x + %s'%m[1]
@rule(tid,r"^Wie heisst der Term für „x vermindert um (\d+)“\?$")
def f(m): return 'x − %s'%m[1]
@rule(tid,r"^Wie heisst der Term für „(\d+) mal x, dann (\d+) dazu“\?$")
def f(m): return '%sx + %s'%(m[1],m[2])
@rule(tid,r"^Wie heisst der Term für „(\d+) mal die Summe aus x und (\d+)“\?$")
def f(m): return '%s(x + %s)'%(m[1],m[2])
@rule(tid,r"^Ein Heft kostet x Fr\., ein Stift kostet (\d+) Fr\. Wie heisst der Term für (\d+) Hefte und einen Stift\?$")
def f(m): return '%sx + %s'%(m[2],m[1])
@rule(tid,r"^Ein Rechteck ist a cm lang und (\d+) cm breit\. Wie heisst der Term für den Umfang\?$")
def f(m): return '2a + %d'%(2*int(m[1]))
@rule(tid,r"^Ein Taxi kostet (\d+) Fr\. Grundpreis plus x Fr\. pro km\. Wie heisst der Term für eine Fahrt von (\d+) km\?$")
def f(m): return '%s + %sx'%(m[1],m[2])
@rule(tid,r"^Ein \w+ kostet x Fr\. Wie heisst der Term für (\d+) \w+\?$")
def f(m): return '%sx'%m[1]
@rule(tid,r"^Wie heisst der Term für „x verdoppelt“\?$|^Wie heisst der Term für das Doppelte von x\?$")
def f(m): return '2x'
@rule(tid,r"^Wie heisst der Term für die Hälfte von x\?$")
def f(m): return 'x : 2'
@rule(tid,r"^Ein Quadrat hat die Seitenlänge a\. Wie heisst der Term für den Umfang\?$")
def f(m): return '4a'

if __name__=='__main__':
    print('--- strukturelle Befunde (generic) ---')
    for i in issues:
        if i[2]!='GERING' or True: print(i)
    print('--- inhaltliche Nachrechnung (solve) ---')
    for o in check():
        if o[2] in ('WRONG','OPTCOUNT','AMBIG','EVEN','MULTIMODE','NONSQ','SQ','BAD') or str(o[2]).startswith('ERR'): print('PROBLEM',o)
        else: print('manuell geprueft',o[0],o[1],o[3][:60])
