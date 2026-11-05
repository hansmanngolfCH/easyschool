from de import *
T=[]
LET='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
def alphabet(ch,hard):
    t=DT('%s-deu-alphabet'%ch,ch,'Wortkunde','Das Alphabet',seed=51+int(ch[2:]))
    t.th('basis','Alphabet','Das ABC hat 26 Buchstaben. Wörter ordnet man nach dem ersten Buchstaben. Ist er gleich, zählt der zweite.')
    THEORY(t,"Du suchst im Wörterbuch das Wort «Katze». Du weisst, dass K nach J und vor L kommt. Dann findest du es schnell.",SC('letters',word='ABC',say='Das ABC hilft beim Suchen'),
      "Im Wörterbuch stehen die Wörter nach dem ABC.",["Schritt","Beispiel"],[["{0|1. Buchstabe}","Ball kommt vor Dach: B vor D"],["{1|2. Buchstabe}","Hand kommt vor Hund: a vor u"],["{2|3. Buchstabe}","Hase kommt vor Haus: s vor u"]],
      "Hier siehst du, welcher Buchstabe entscheidet.",
      [([("Ball","B",0),("Dach","D",1),("Esel","E",2)],"B, D, E: Der erste Buchstabe entscheidet."),([("Hand","a",0),("Hase","a",0),("Hund","u",1)],"Alle drei beginnen mit H. Dann zählt der zweite Buchstabe."),([("Hand","n",0),("Hase","s",1),("Haus","u",2)],"Hand, Hase, Haus: Auch der zweite Buchstabe ist gleich. Der dritte entscheidet: n, s, u.")],
      "So ordnest du Wörter nach dem ABC.",["Schau auf den ersten Buchstaben jedes Wortes.","Ordne die Wörter nach diesem Buchstaben.","Ist der erste Buchstabe gleich, vergleiche den zweiten.","Lies die Reihe noch einmal zur Kontrolle."],
      "Das ist wichtig.",[["Reihenfolge","A B C D E F G H I J K L M N O P Q R S T U V W X Y Z","A vorne, Z hinten",0],["Nachschlagen","Öffne das Wörterbuch in der Nähe des Buchstabens.","K ist in der Mitte",1],["Umlaute","ä sortiert man bei a, ö bei o, ü bei u.","Bär bei B-a",2]],fehler=[["Dach, Ball, Esel","Ball, Dach, Esel","B kommt vor D."],["Hund, Hand, Hase","Hand, Hase, Hund","Zweiter Buchstabe: a kommt vor u."],["K kommt nach L","K kommt vor L","Das ABC: … J K L …"]])
    if hard:more(t,'Umlaute und Wörterbuch','Im Wörterbuch stehen ä, ö, ü bei a, o, u. Wörter mit gleichem Anfang ordnest du nach dem nächsten Buchstaben.',TBL(['Wort','Sortiert wie','Beispiel-Reihe'],[['Bär','Bar','Bad, Bär, Bein'],['Löwe','Lowe','Lampe, Löwe, Lupe'],['Mütze','Mutze','Mund, Mütze, Mutter']]))
    r=t.r
    for k in range(9):
        i=r.randrange(1,24);x=LET[i]
        t.mc(1,"Welcher Buchstabe kommt nach «%s»?"%x,LET[i+1],[LET[i-1],LET[(i+3)%26],LET[(i+5)%26]],"Sage das ABC leise auf.")
    for k in range(6):
        i=r.randrange(2,25);x=LET[i]
        t.mc(1,"Welcher Buchstabe kommt vor «%s»?"%x,LET[i-1],[LET[i+1],LET[(i+4)%26],LET[i-3]],"Sage das ABC leise auf.")
    for k in range(5):
        i=r.randrange(1,23);t.mc(2,"Welcher Buchstabe fehlt? %s  %s  ___  %s"%(LET[i-1],LET[i],LET[i+2]) if False else "Welcher Buchstabe fehlt? %s, ___, %s"%(LET[i],LET[i+2]),LET[i+1],[LET[i],LET[i+2],LET[i+3]],"Sage das ABC leise auf.")
    if not hard:
        ws=['Apfel','Ball','Dach','Esel','Fisch','Gans','Hase','Igel','Kuh','Lamm','Maus','Nase','Ohr','Pferd','Rose','Sonne','Tisch','Uhr','Vogel','Wolke','Zebra','Baum','Mond','Katze']
        sets=[r.sample(ws,3) for _ in range(14)]
    else:
        sets=[['Hund','Hand','Haus','Hase'],['Schule','Schaf','Schiff','Schuh'],['Ball','Baum','Bank','Bild'],['Tasche','Tafel','Tag','Tante'],['Mund','Mutter','Mantel','Maus'],['Kind','Katze','Kuh','Kerze'],['Blume','Bruder','Brot','Blatt'],['Fisch','Feder','Fuss','Fenster'],['Sonne','Sand','Sofa','Suppe'],['Stern','Stuhl','Stein','Strasse'],['Wald','Wasser','Wind','Wiese'],['Lampe','Lied','Licht','Löwe'],['Pferd','Pilz','Puppe','Pfeil'],['Rad','Rose','Regen','Ring']]
    for k,st in enumerate(sets):
        s=sorted(st);a=s[0];ws_=[w for w in st if w!=a]
        if k<len(sets)-4:t.mc(2,"Welches Wort kommt im ABC zuerst? %s"%', '.join(st),a,ws_,"Vergleiche die Anfangsbuchstaben.",'Richtig geordnet: %s.'%', '.join(s))
        else:t.emc("Welches Wort kommt im ABC zuerst? %s"%', '.join(st),a,ws_,'Richtig geordnet: %s.'%', '.join(s))
    for k,st in enumerate(sets[:5]):
        s=sorted(st);wrong=[]
        while len(wrong)<3:
            p=st[:];r.shuffle(p)
            if p!=s and ', '.join(p) not in wrong:wrong.append(', '.join(p))
        t.mc(2,"Welche Reihenfolge ist richtig?",', '.join(s),wrong,"Ordne nach dem ersten Buchstaben.")
    for k,st in enumerate(sets[5:8]):
        a=sorted(st)[-1];t.emc("Welches Wort kommt im ABC zuletzt? %s"%', '.join(st),a,[w for w in st if w!=a],'')
    forms(t,[("Schreibe den Buchstaben nach «%s»."%LET[i],LET[i+1],'Der nächste Buchstabe im ABC.') for i in (2,6,11,15,19,22)],ne=3,hint='Schreibe den grossen Buchstaben.')
    for k in range(4):
        i=r.randrange(2,22);t.emc('Welcher Buchstabe kommt nach «%s»?'%LET[i],LET[i+1],[LET[i-1],LET[i+3],LET[i+4]],'')
    for w in ['Katze','Mond','Pferd'] if not hard else ['Wasser','Pilz','Schaf']:
        t.emc("Bei welchem Buchstaben suchst du «%s» im Wörterbuch?"%w,w[0],[x for x in 'ABDHLTSM' if x!=w[0]][:3],'')
    return t
T+= [lambda:alphabet('kl3',False),lambda:alphabet('kl4',True)]

def langvokal(ch,hard):
    t=DT('%s-deu-langvokal'%ch,ch,'Rechtschreibung','Verdopplung und Langvokale',seed=61+int(ch[2:]))
    t.th('basis','Kurz und lang','Nach einem kurzen Vokal steht oft ein doppelter Konsonant: kommen. Ein langer Vokal wird mit ie, h oder doppeltem Vokal geschrieben.')
    THEORY(t,"Hörst du den Unterschied? «Sonne» spricht man kurz, «Boot» spricht man lang. Die Schreibweise zeigt es dir.",SC('letters',word='SONNE',say='Kurz oder lang?'),
      "Vier Muster helfen dir beim Schreiben.",["Muster","Beispiele","So hörst du es"],[["{1|Doppelter Konsonant}","kommen, Mutter, Sonne","Vokal ist kurz"],["{2|ie}","Biene, Tier, Wiese","langes i"],["{3|Dehnungs-h}","Bahn, Zahl, Uhr","Vokal ist lang"],["{0|Doppelter Vokal}","Boot, Meer, Haar","aa, ee, oo"]],
      "Die Farben zeigen, wo das Muster steckt.",
      [([("ko","",7),("mm","Doppelkonsonant",1),("en","",7)],"kommen"),([("B","",7),("ie","langes i",2),("ne","",7)],"Biene"),([("Ba","",7),("h","Dehnungs-h",3),("n","",7)],"Bahn"),([("B","",7),("oo","Doppelvokal",0),("t","",7)],"Boot")],
      "So schreibst du ein Wort richtig.",["Sprich das Wort langsam.","Höre, ob der Vokal kurz oder lang klingt.","Kurz? Dann schreibst du oft einen doppelten Konsonanten.","Lang? Dann kann ie, h oder ein doppelter Vokal passen.","Schau im Zweifel im Wörterbuch nach."],
      "Das ist wichtig.",[["Kurz","Nach kurzem Vokal: oft doppelter Konsonant","Mutter",1],["Lang","ie ist der häufigste Weg","Tier",2],["Merken","Manche Wörter muss man üben.","Bahn, Boot",3]],
      fehler=[["komen","kommen","Kurzer Vokal: mm."],["Bine","Biene","Langes i: ie."],["Bot","Boot","Doppelter Vokal."],["Ban","Bahn","Dehnungs-h."]])
    if hard:more(t,'Wortfamilien helfen','Wörter einer Familie behalten ihre Schreibweise. Wenn du ein Wort kennst, schreibst du die anderen genauso.',TBL(['Wort','Verwandte Wörter','Das bleibt gleich'],[['fahren','die Fahrt, der Fahrer','Dehnungs-h'],['kommen','du kommst, der Kommende','mm'],['liegen','die Wiese? nein: das Lager? nein','ie']] if False else [['fahren','die Fahrt, der Fahrer','Dehnungs-h'],['kommen','er kommt, ankommen','mm'],['spielen','das Spiel, der Spieler','ie'],['wohnen','die Wohnung, der Bewohner','Dehnungs-h']]))
    C=['Doppelkonsonant','ie','Dehnungs-h','Doppelvokal']
    if not hard:
        W_=[('kommen',0),('Biene',1),('Bahn',2),('Boot',3),('Mutter',0),('Tier',1),('Zahl',2),('Meer',3),('Sonne',0),('Wiese',1),('Uhr',2),('Haar',3),('Tasse',0),('Ziege',1),('Huhn',2),('Moos',3),('Ball',0),('Brief',1),('Stuhl',2),('Saal',3),('Mitte',0),('Fliege',1),('Bohne',2),('Beere',3)]
        FX=[("komen","kommen"),("Sone","Sonne"),("Bal","Ball"),("Tase","Tasse"),("Bine","Biene"),("Wise","Wiese"),("Tir","Tier"),("Ban","Bahn"),("Zal","Zahl"),("Bot","Boot"),("Mer","Meer"),("Har","Haar"),("Stul","Stuhl"),("Mita","Mitte")]
    else:
        W_=[('Brille',0),('Spiegel',1),('Zahn',2),('Schnee',3),('Treppe',0),('Fieber',1),('Kohle',2),('Paar',3),('Wetter',0),('Riese',1),('Mohn',2),('Moor',3),('Puppe',0),('Liebe',1),('Strahl',2),('Tee',3),('Wolle',0),('Lied',1),('Wahl',2),('Aal',3),('Schiff',0),('Ziel',1),('Ruhe',2),('Beet',3)]
        FX=[("Brile","Brille"),("Trepe","Treppe"),("Pupe","Puppe"),("Spigel","Spiegel"),("Fiber","Fieber"),("Lid","Lied"),("Fahrad","Fahrrad"),("Zan","Zahn"),("Ruge","Ruhe"),("Schne","Schnee"),("Par","Paar"),("Kafe","Kaffee"),("Wole","Wolle"),("Schif","Schiff")]
    cls(t,W_,C,lambda p:"Welches Muster steckt in «%s»?"%p,hint=["Kurzer Vokal: doppelter Konsonant.","Langes i: ie.","Langer Vokal: h nach dem Vokal.","Langer Vokal: doppelter Vokal."],why=lambda p,c:"In «%s» steckt: %s."%(p,C[c]),ne=8,ntyp=4,mq='Tippe alle Wörter mit {c} an.',qm='Ordne jedem Wort sein Muster zu.',mt=3)
    fixes(t,FX,ne=5,q='Schreibe das Wort richtig.',hint='Sprich das Wort langsam: kurz oder lang?')
    return t
T+= [lambda:langvokal('kl3',False),lambda:langvokal('kl4',True)]

STF=[('gehen','ging','gegangen'),('sehen','sah','gesehen'),('essen','ass','gegessen'),('trinken','trank','getrunken'),('laufen','lief','gelaufen'),('singen','sang','gesungen'),('schreiben','schrieb','geschrieben'),('fahren','fuhr','gefahren'),('kommen','kam','gekommen'),('geben','gab','gegeben'),('schlafen','schlief','geschlafen'),('finden','fand','gefunden'),('nehmen','nahm','genommen'),('lesen','las','gelesen'),('helfen','half','geholfen'),('sitzen','sass','gesessen'),('liegen','lag','gelegen'),('bringen','brachte','gebracht'),('denken','dachte','gedacht'),('wissen','wusste','gewusst'),('fliegen','flog','geflogen'),('schwimmen','schwamm','geschwommen'),('rufen','rief','gerufen'),('sprechen','sprach','gesprochen'),('ziehen','zog','gezogen'),('beginnen','begann','begonnen'),('stehen','stand','gestanden'),('bleiben','blieb','geblieben')]
def stammformen(ch,hard):
    t=DT('%s-deu-stammformen'%ch,ch,'Wortkunde','Unregelmässige Stammformen',seed=71+int(ch[2:]))
    t.th('basis','Stammformen','Starke Verben ändern ihren Stamm: gehen – ging – gegangen. Diese Formen musst du lernen.')
    THEORY(t,"Gestern bist du in die Schule gegangen. Das Verb «gehen» sagt nicht «gehte», sondern «ging». Solche Verben nennt man unregelmässig.",SC('talk',t1='Ich gehe jetzt.',t2='Ich ging gestern.'),
      "Jedes Verb hat drei Formen: Grundform, Präteritum und Partizip II.",["Grundform","Präteritum","Partizip II"],[["{1|gehen}","{3|ging}","{2|gegangen}"],["{1|sehen}","{3|sah}","{2|gesehen}"],["{1|trinken}","{3|trank}","{2|getrunken}"],["{1|schreiben}","{3|schrieb}","{2|geschrieben}"]],
      "So brauchst du die Formen im Satz.",
      [([("Ich","",7),("gehe","Grundform",1),("heim","",7)],"Jetzt: Ich gehe heim."),([("Ich","",7),("ging","Präteritum",3),("heim","",7)],"Früher: Ich ging heim."),([("Ich","",7),("bin","",7),("heim","",7),("gegangen","Partizip II",2)],"Beim Erzählen: Ich bin heim gegangen.")],
      "So lernst du die Formen.",["Sage alle drei Formen laut auf.","Schreibe sie untereinander auf.","Decke zwei Formen zu und rate sie.","Prüfe mit der Liste."],
      "Das ist wichtig.",[["Nicht -te","gehen heisst ging, nicht gehte.","ging",3],["Partizip","Oft mit ge- am Anfang.","gesehen",2],["Üben","Lerne jeden Tag zwei Verben.","trinken – trank",1]],
      fehler=[["gehte","ging","gehen ist unregelmässig."],["gesehn","gesehen","Das Partizip endet auf -en."],["trinkte","trank","trinken wird zu trank."]])
    r=t.r;pool=STF[:20] if not hard else STF[:22];exv=STF[20:28] if not hard else STF[22:28]
    allp=[x[1] for x in STF];allg=[x[2] for x in STF]
    for i,(g,p,pp) in enumerate(pool[:14]):
        w=[x for x in allp if x!=p];r.shuffle(w)
        t.mc(1 if i<7 else 2,"Wie heisst das Präteritum von «%s»?"%g,p,w[:2]+[g[:-2]+'te'],"Sage: Gestern … ich.",'%s – %s – %s'%(g,p,pp))
    for i,(g,p,pp) in enumerate(pool[6:18]):
        w=[x for x in allg if x!=pp];r.shuffle(w)
        t.mc(2,"Wie heisst das Partizip II von «%s»?"%g,pp,w[:2]+['ge'+g[:-2]+'t'],"Sage: Ich habe … oder Ich bin …",'%s – %s – %s'%(g,p,pp))
    for g,p,pp in pool[14:18]:
        t.inp(2,"Schreibe das Präteritum von «%s»."%g,p,"Es endet nicht auf -te.",'%s – %s – %s'%(g,p,pp))
    for g,p,pp in pool[18:22]:
        t.inp(2,"Schreibe das Partizip II von «%s»."%g,pp,"Oft beginnt es mit ge-.",'%s – %s – %s'%(g,p,pp))
    fixes(t,[("gehte","ging"),("sehte","sah"),("essete","ass"),("trinkte","trank"),("laufte","lief"),("singte","sang"),("schreibte","schrieb"),("fahrte","fuhr")],ne=3,q='Schreibe das Präteritum richtig.',lvl=2)
    for g,p,pp in exv[:4]:
        w=[x for x in allp if x!=p];r.shuffle(w);t.emc("Wie heisst das Präteritum von «%s»?"%g,p,w[:3],'%s – %s – %s'%(g,p,pp))
    for g,p,pp in exv[4:8]:
        w=[x for x in allg if x!=pp];r.shuffle(w);t.emc("Wie heisst das Partizip II von «%s»?"%g,pp,w[:3],'%s – %s – %s'%(g,p,pp))
    for g,p,pp in exv[:3]:t.ein("Schreibe das Präteritum von «%s»."%g,p,'%s – %s – %s'%(g,p,pp))
    for g,p,pp in exv[4:6]:t.ein("Schreibe das Partizip II von «%s»."%g,pp,'%s – %s – %s'%(g,p,pp))
    if hard:
        EI=[('geben','gibt'),('sehen','sieht'),('essen','isst'),('lesen','liest'),('helfen','hilft'),('nehmen','nimmt'),('sprechen','spricht'),('laufen','läuft'),('fahren','fährt'),('schlafen','schläft')]
        more(t,'Wechsel im Stamm','Bei manchen Verben ändert sich der Stamm schon in der er/sie/es-Form. Das ist ein weiterer Hinweis, dass das Verb unregelmässig ist.',TBL(['Grundform','ich','er / sie / es'],[[g,g[:-2]+'e' if False else {'geben':'gebe','sehen':'sehe','essen':'esse','lesen':'lese','helfen':'helfe','nehmen':'nehme'}[g],'{3|'+e+'}'] for g,e in EI[:6]]))
        for g,e in EI[:7]:
            w=[x for _,x in EI if x!=e][:3];t.mc(2,"Wie heisst die er-Form von «%s»? Er ___ ."%g,e,w,"Der Stamm ändert sich.")
        for g,e in EI[7:]:
            w=[x for _,x in EI if x!=e][:3];t.emc("Wie heisst die er-Form von «%s»? Er ___ ."%g,e,w,'')
        t.ein("Schreibe die er-Form von «nehmen». Er ___ .","nimmt",'')
    return t
T+= [lambda:stammformen('kl3',False),lambda:stammformen('kl4',True)]

# ---- v4.89: Alphabet neu: Fokus auf die Buchstabenreihe, Woerter ordnen an zweiter Stelle
VOK='AEIOU'
def alphabet(ch,hard):
    t=DT('%s-deu-alphabet'%ch,ch,'Wortkunde','Das Alphabet',seed=51+int(ch[2:]))
    t.th('basis','Alphabet','Das ABC hat 26 Buchstaben in fester Reihe: A ist der 1., Z der 26. Zu jedem Buchstaben gibt es einen davor und einen danach.')
    def row(a,b):return [(LET[i],str(i+1),1 if LET[i] in VOK else 7) for i in range(a,b)]
    THEORY(t,"Du sagst das ABC auf: A, B, C, D … Jeder Buchstabe hat seinen festen Platz. K ist der 11. Buchstabe. Davor steht J, danach steht L.",SC('letters',word='ABC',say='Das ABC hat eine feste Reihe'),
      "Das ABC ist eine Reihe mit 26 Buchstaben.",["Was","Beispiel"],[["{0|Reihe}","A B C D E … X Y Z"],["{1|Platz}","A ist der 1., M der 13., Z der 26."],["{2|Davor}","Vor K steht J."],["{3|Danach}","Nach K steht L."],["{4|Vokale}","A, E, I, O, U"]],
      "Hier siehst du die Reihe mit Platznummern. Die Vokale sind blau.",
      [(row(0,13),"A bis M: Platz 1 bis 13."),(row(13,26),"N bis Z: Platz 14 bis 26."),([("J","davor",7),("K","dieser",0),("L","danach",7)],"Vor K steht J, nach K steht L.")],
      "So findest du einen Buchstaben im ABC.",["Sage das ABC leise auf, bis du beim Buchstaben bist.","Welcher Buchstabe kommt kurz davor? Das ist der Buchstabe davor.","Welcher Buchstabe kommt gleich danach? Das ist der Buchstabe danach.","Zähle mit, wenn du den Platz wissen willst."],
      "Das ist wichtig.",[["Reihe","26 Buchstaben, A vorne, Z hinten.","A B C … Z",0],["Vokale","A, E, I, O, U. Alle anderen sind Konsonanten.","Auge, Ofen",1],["Mitte","M ist der 13. Buchstabe, die Mitte vom ABC.","A–M und N–Z",2],["Wörter ordnen","Zuerst zählt der erste Buchstabe, dann der zweite.","Hand vor Hund",3]],
      fehler=[["x","y","z"]])
    more(t,'Wörter nach dem ABC ordnen','Auch Wörter stehen in der Reihe des ABC. Zuerst zählt der erste Buchstabe. Ist er gleich, zählt der zweite.',
      SENT([("Ball","B",0),("Dach","D",1),("Esel","E",2)],"B, D, E: Der erste Buchstabe entscheidet."),SENT([("Hand","a",0),("Hase","a",0),("Hund","u",1)],"Alle beginnen mit H. Dann zählt der zweite Buchstabe: a, a, u."))
    if hard:more(t,'Umlaute und Wörterbuch','Im Wörterbuch stehen ä, ö, ü bei a, o, u. Das ß schreibst du in der Schweiz als ss.',TBL(['Wort','Sortiert wie','Beispiel-Reihe'],[['Bär','Bar','Bad, Bär, Bein'],['Löwe','Lowe','Lampe, Löwe, Lupe'],['Mütze','Mutze','Mund, Mütze, Mutter']]))
    r=t.r
    for i in r.sample(range(0,25),9):t.mc(1,"Welcher Buchstabe kommt nach «%s»?"%LET[i],LET[i+1],[LET[i-1] if i else 'Z',LET[(i+3)%26],LET[(i+5)%26]],"Sage das ABC leise auf.")
    for i in r.sample(range(1,26),9):t.mc(1,"Welcher Buchstabe kommt vor «%s»?"%LET[i],LET[i-1],[LET[(i+1)%26],LET[(i+4)%26],LET[(i-3)%26]],"Sage das ABC leise auf.")
    for i in r.sample(range(1,22),6):t.mc(2,"Welcher Buchstabe fehlt? %s, ___, %s"%(LET[i],LET[i+2]),LET[i+1],[LET[i],LET[i+2],LET[i+3]],"Sage das ABC leise auf.")
    for i in r.sample(range(0,26),8):t.mc(2,"Der wievielte Buchstabe im ABC ist «%s»?"%LET[i],'der %d.'%(i+1),['der %d.'%(i+2),'der %d.'%i,'der %d.'%(i+4)],"Zähle das ABC von A an.")
    for i in r.sample(range(2,24),6):t.mc(2,"Welcher Buchstabe ist der %d. im ABC?"%(i+1),LET[i],[LET[i-1],LET[i+1],LET[i+2]],"Zähle das ABC von A an.")
    t.mc(1,"Wie viele Buchstaben hat das ABC?",'26',['24','28','30'],"Zähle A bis Z.")
    t.mc(1,"Welcher Buchstabe steht am Anfang vom ABC?",'A',['B','Z','M'],"")
    t.mc(1,"Welcher Buchstabe steht am Ende vom ABC?",'Z',['A','Y','X'],"")
    t.multi(2,"Tippe alle Vokale an.",['A','E','I','O'],['B','K','M','T'],"Vokale: A, E, I, O, U.")
    t.multi(2,"Tippe alle Konsonanten an.",['B','K','M'],['A','E','O','U'][:3],"Alle ausser A, E, I, O, U.")
    for a,b in [(1,5),(6,10),(11,14)]:t.mc(2,"Wie viele Buchstaben liegen zwischen %s und %s?"%(LET[a],LET[b]),str(b-a-1),[str(b-a),str(b-a+1),str(b-a-2)],"Zähle die Buchstaben dazwischen.")
    ws=['Apfel','Ball','Dach','Esel','Fisch','Gans','Hase','Igel','Kuh','Lamm','Maus','Nase','Ohr','Pferd','Rose','Sonne','Tisch','Uhr','Vogel','Wolke','Zebra','Baum','Mond','Katze']
    for k in range(6):
        st=r.sample(ws,3);s=sorted(st);t.mc(2,"Welches Wort kommt im ABC zuerst? %s"%', '.join(st),s[0],s[1:],"Vergleiche die Anfangsbuchstaben.",'Richtig geordnet: %s.'%', '.join(s))
    if hard:
        for st in [['Hund','Hand','Haus','Hase'],['Schule','Schaf','Schiff','Schuh'],['Ball','Baum','Bank','Bild'],['Mund','Mutter','Mantel','Maus']]:
            s=sorted(st);t.mc(2,"Welches Wort kommt im ABC zuerst? %s"%', '.join(st),s[0],s[1:],"Vergleiche den zweiten Buchstaben.",'Richtig geordnet: %s.'%', '.join(s))
    forms(t,[("Schreibe den Buchstaben nach «%s»."%LET[i],LET[i+1],'Der nächste Buchstabe im ABC.') for i in (2,6,11,15,19,22)],ne=3,hint='Schreibe den grossen Buchstaben.')
    for i in r.sample(range(2,22),5):t.emc('Welcher Buchstabe kommt nach «%s»?'%LET[i],LET[i+1],[LET[i-1],LET[i+3],LET[i+4]],'')
    for i in r.sample(range(2,23),3):t.emc('Welcher Buchstabe kommt vor «%s»?'%LET[i],LET[i-1],[LET[i+1],LET[i+3],LET[i-3]],'')
    for i in r.sample(range(0,26),3):t.emc("Der wievielte Buchstabe im ABC ist «%s»?"%LET[i],'der %d.'%(i+1),['der %d.'%(i+2),'der %d.'%i,'der %d.'%(i+4)],'')
    t.emc("Wie viele Buchstaben hat das ABC?",'26',['24','28','30'],'')
    for w in ['Katze','Mond','Pferd'] if not hard else ['Wasser','Pilz','Schaf']:
        t.emc("Bei welchem Buchstaben suchst du «%s» im Wörterbuch?"%w,w[0],[x for x in 'ABDHLTSM' if x!=w[0]][:3],'')
    for a,b in [(0,5),(8,13)]:
        run=', '.join(LET[a:b]);miss=', '.join(LET[a:a+2]+LET[a+3:b]);t.fix(2,'Ein Buchstabe fehlt. Verbessere im Feld.',miss,run,'Sage das ABC leise auf.')
    return t
