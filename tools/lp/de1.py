from de import *
T=[]
def schrift():
    t=DT('kl1-deu-schrift','kl1','Schreiben','Erste eigene Schrift',seed=11)
    t.explain=[S("Worum geht es?","Du lernst Buchstaben und Zahlen schreiben. Zuerst fährst du sie mit dem Finger nach.",SC('letters',word='ABC',say='Wir schreiben!')),
      S("So sitzt du richtig","Gut sitzen hilft beim Schreiben.",KD([["Gerade sitzen","Beide Füsse stehen auf dem Boden.","Der Rücken ist gerade.",0],["Stift halten","Drei Finger halten den Stift locker.","Nicht zu fest drücken.",2],["Heft drehen","Das Heft liegt ein wenig schräg.","So sieht man die Zeile gut.",3]])),
      S("So fährst du nach","Das machst du bei jedem Buchstaben.",LINES([["Schau dir den Buchstaben genau an.",""],["Setze den Finger oben an.",""],["Fahre der gestrichelten Linie nach.",""],["Tippe auf Fertig.",""]],True)),
      S("Gross und klein","Jeder Buchstabe hat eine grosse und eine kleine Form.",TBL(["Gross","Klein"],[["A","a"],["E","e"],["M","m"],["T","t"],["S","s"]])),
      S("Die Zahlen","Auch Zahlen fährst du von oben nach unten nach.",TBL(None,[["0","1","2","3","4"],["5","6","7","8","9"]])),
      S("Die Richtung","Beim Schreiben gibt es feste Richtungen.",KD([["Von oben","Fast alle Buchstaben beginnen oben.","A, E, F, H",0],["Von links","Wir schreiben von links nach rechts.","M, N, T",1],["Mit Pausen","Manchmal setzt du den Stift neu an.","E, F, H, T",2]])),
      S("Merke","Langsam und genau ist besser als schnell.",KD([["Ruhig","Nimm dir Zeit.","Fahre genau nach.",2],["Üben","Jeden Tag ein bisschen.","So wirst du besser.",0]]))]
    t.th('basis','Nachfahren','Fahre die gestrichelte Linie mit dem Finger nach. Schau genau hin.')
    for ch in 'AEIOULMTFHNBDPRSK':
        d={"q":"Fahre den Buchstaben %s nach."%ch,"a":ch,"trace":ch,"say":"Fahre den Buchstaben %s nach."%ch,"lvl":1,"th":"basis","hints":["Setze den Finger oben an."]}
        t._add(d,'tr'+ch)
    for ch in 'aeimlt0123456789'[:16]:
        d={"q":"Fahre %s nach."%("die Zahl "+ch if ch.isdigit() else "den Buchstaben "+ch),"a":ch,"trace":ch,"say":"Fahre %s nach."%("die Zahl "+ch if ch.isdigit() else "den Buchstaben "+ch),"lvl":1,"th":"basis","hints":["Fahre langsam."]}
        t._add(d,'tr'+ch)
    pairs=[('A','a','o e u'),('E','e','a c o'),('M','m','n w h'),('T','t','f l i'),('S','s','z c o'),('B','b','d p h'),('D','d','b p q'),('R','r','n p f'),('F','f','t l k'),('H','h','n b k')]
    for g,k,w in pairs[:6]:
        t.mc(1,"Welcher kleine Buchstabe passt zu «%s»?"%g,k,w.split(),None,None,say="Welcher kleine Buchstabe passt zu %s?"%g)
    for g,k,w in pairs[6:]:
        t.emc("Welcher kleine Buchstabe passt zu «%s»?"%g,k,w.split())
    for k,g,w in [('a','A','O E U'),('m','M','N W H'),('t','T','F L I'),('s','S','Z C O'),('b','B','D P H'),('e','E','A C O')]:
        t.emc("Welcher grosse Buchstabe passt zu «%s»?"%k,g,w.split())
    for z in [3,5,7,8]:
        t.emc("Welche Zahl kommt nach %d?"%z,str(z+1),[str(z-1),str(z+2),str(z+3)])
    for z in [2,4,6,9]:
        t.emc("Welche Zahl fehlt? %d, ___, %d"%(z,z+2),str(z+1),[str(z),str(z+2),str(z+3)])
    t.emc("Wo beginnst du beim Schreiben meistens?","oben",["unten","in der Mitte","rechts"])
    t.emc("In welche Richtung schreibst du?","von links nach rechts",["von rechts nach links","von unten nach oben","im Kreis"])
    return t
T.append(schrift)

WA=['Nomen','Verb','Adjektiv']
def _why(p,c):
    w=p if isinstance(p,str) else p[1]
    return ["«%s» ist ein Nomen. Du kannst «der, die oder das» davor setzen."%w,"«%s» ist ein Verb. Es sagt, was jemand tut."%w,"«%s» ist ein Adjektiv. Es sagt, wie etwas ist."%w][c]
def nva():
    t=DT('kl2-deu-nva','kl2','Wortarten','Nomen, Verben und Adjektive',seed=21)
    t.th('basis','Drei Wortarten','Nomen sind Namen für Menschen, Tiere und Dinge. Verben sagen, was man tut. Adjektive sagen, wie etwas ist.')
    THEORY(t,"Du siehst ein Kind und eine Katze im Garten. Mit Wörtern sagst du, was du siehst: Namen, Tätigkeiten und Eigenschaften.",SC('words',words=[['Die','#9AA0A6'],['Katze','#4285F4'],['schläft','#EA4335'],['leise','#34A853']],say='Jedes Wort hat eine Aufgabe.'),
      "Es gibt drei Wortarten. Jede hat eine Farbe.",["Wortart","Das sagt sie","Beispiele"],[["{0|Nomen}","Name von Menschen, Tieren, Dingen","der Hund, die Schule, das Buch"],["{1|Verb}","Was jemand tut","laufen, singen, schlafen"],["{2|Adjektiv}","Wie etwas ist","gross, rot, schnell"]],
      "In jedem Satz findest du alle drei Wortarten. Die Farben helfen dir.",
      [([("Der","Artikel",3),("Hund","Nomen",0),("bellt","Verb",1),("laut","Adjektiv",2)],"Der Hund bellt laut."),([("Das","Artikel",3),("kleine","Adjektiv",2),("Kind","Nomen",0),("lacht","Verb",1)],"Das kleine Kind lacht."),([("Die","Artikel",3),("Katze","Nomen",0),("schläft","Verb",1),("leise","Adjektiv",2)],"Die Katze schläft leise.")],
      "So findest du die Wortart eines Wortes.",["Lies das Wort.","Probiere «der, die oder das» davor: Passt es, ist es ein Nomen.","Frage: Kann man es tun? Dann ist es ein Verb.","Frage: Sagt es, wie etwas ist? Dann ist es ein Adjektiv."],
      "Das ist wichtig.",[["Nomen","Schreibt man gross.","der Hund",0],["Verb","Steht oft in der Grundform: -en.","laufen",1],["Adjektiv","Schreibt man klein.","schnell",2]],fehler=[["Das Nomen «Hund» ist ein Verb.","Hund ist ein Nomen.","Du kannst «der Hund» sagen."],["«laut» ist ein Nomen.","laut ist ein Adjektiv.","Es sagt, wie etwas ist."],["«laufen» ist ein Adjektiv.","laufen ist ein Verb.","Man kann es tun."]])
    N_=['Hund','Tisch','Schule','Apfel','Ball','Blume','Katze','Haus','Buch','Auto','Stuhl','Vogel']
    V_=['laufen','singen','lachen','malen','essen','springen','lesen','trinken','schlafen','hüpfen','spielen','schreiben']
    A_=['gross','rot','schnell','laut','leise','warm','lustig','nass','hell','kalt','klein','weich']
    items=[]
    for i in range(12):items+= [(N_[i],0),(V_[i],1),(A_[i],2)]
    cls(t,items,WA,lambda p:"Welche Wortart ist «%s»?"%p,hint=["Kannst du «der, die oder das» davor setzen?","Kannst du es tun?","Sagt es, wie etwas ist?"],why=_why,nc=18,ne=8)
    S_=[("Der Hund bellt laut.","Hund",0),("Der Hund bellt laut.","bellt",1),("Der Hund bellt laut.","laut",2),("Das Kind spielt im Garten.","Kind",0),("Das Kind spielt im Garten.","spielt",1),("Die Sonne scheint warm.","scheint",1),("Die Sonne scheint warm.","warm",2),("Mein Bruder liest ein dickes Buch.","dickes",2),("Mein Bruder liest ein dickes Buch.","liest",1),("Mein Bruder liest ein dickes Buch.","Buch",0),("Im Winter ist es kalt.","kalt",2),("Im Winter ist es kalt.","Winter",0)]
    cls(t,[((s,w),c) for s,w,c in S_],WA,lambda p:p[0]+"\nWelche Wortart hat «%s»?"%p[1],hint=["Kannst du «der, die oder das» davor setzen?","Kannst du es tun?","Sagt es, wie etwas ist?"],why=_why,nc=8,ne=4,lvl=2,multi=False,match=False,disp=lambda p:p[1])
    gaps(t,[("Das Kind ___ im Garten.","spielt",["Ball","rot","Garten"]),("Die Blume ist ___.","gelb",["Tisch","singen","Ball"]),("Der ___ bellt laut.","Hund",["laufen","schnell","rot"]),("Die Katze ___ auf dem Sofa.","schläft",["Maus","weich","Sofa"]),("Der Apfel ist ___.","süss",["Baum","essen","Korb"]),("Mama ___ ein Buch.","liest",["gross","Buch","Tisch"])],ne=4,q='Welches Wort passt?')
    return t
T.append(nva)

def mehrzahl():
    t=DT('kl2-deu-mehrzahl','kl2','Wortformen','Einzahl und Mehrzahl bei Nomen',seed=22)
    t.th('basis','Einzahl und Mehrzahl','Einzahl heisst: ein Ding. Mehrzahl heisst: mehrere Dinge. Beim Nomen ändert sich meist das Ende.')
    THEORY(t,"Auf dem Markt liegt ein Apfel. Daneben liegen viele Äpfel. Das Nomen sieht dann anders aus.",SC('words',words=[['ein Apfel','#4285F4'],['viele Äpfel','#34A853']],say='Einzahl und Mehrzahl'),
      "Die Einzahl nennt eins. Die Mehrzahl nennt mehrere. Das Nomen verändert sich.",["Einzahl","Mehrzahl","Was ändert sich?"],[["der {0|Hund}","die {0|Hunde}","-e"],["das {0|Kind}","die {0|Kinder}","-er"],["die {0|Blume}","die {0|Blumen}","-n"],["der {0|Apfel}","die {0|Äpfel}","Umlaut ä"],["das {0|Auto}","die {0|Autos}","-s"]],
      "Der Artikel in der Mehrzahl ist immer «die».",
      [([("Der","Artikel",3),("Hund","Einzahl",0),("bellt","",1)],"Ein Hund bellt."),([("Die","Artikel",3),("Hunde","Mehrzahl",0),("bellen","",1)],"Viele Hunde bellen."),([("Das","Artikel",3),("Kind","Einzahl",0),("lacht","",1)],"Ein Kind lacht."),([("Die","Artikel",3),("Kinder","Mehrzahl",0),("lachen","",1)],"Viele Kinder lachen.")],
      "So bildest du die Mehrzahl.",["Lies das Nomen in der Einzahl.","Sage: «Ich sehe viele …».","Höre, wie das Nomen endet.","Schreibe das Nomen in der Mehrzahl auf."],
      "Das ist wichtig.",[["Endung","Es gibt kein einziges Muster für alle Nomen.","Hund – Hunde",0],["Umlaut","Manchmal wird aus a, o, u ein ä, ö, ü und aus au ein äu.","Baum – Bäume",1],["Prüfen","Sprich den Satz laut. Dann hörst du es.","viele Bälle",2]],fehler=[["die Katzes","die Katzen","Katze bekommt -n."],["die Baume","die Bäume","Aus au wird äu."],["die Kinde","die Kinder","Kind bekommt -er."]])
    P=[('Hund','Hunde'),('Katze','Katzen'),('Kind','Kinder'),('Baum','Bäume'),('Blume','Blumen'),('Haus','Häuser'),('Ball','Bälle'),('Buch','Bücher'),('Tisch','Tische'),('Auto','Autos'),('Apfel','Äpfel'),('Schule','Schulen'),('Vogel','Vögel'),('Stuhl','Stühle'),('Hand','Hände'),('Tasche','Taschen'),('Fisch','Fische'),('Bild','Bilder')]
    allp=[p[1] for p in P]
    for i,(e,m) in enumerate(P[:12]):
        w=[x for x in allp if x!=m];t.r.shuffle(w)
        t.mc(1 if i<6 else 2,"Wie heisst die Mehrzahl von «%s»?"%e,m,w[:3],"Sage: Ich sehe viele …",None)
    for i,(e,m) in enumerate(P[:8]):
        w=[x[0] for x in P if x[0]!=e];t.r.shuffle(w)
        t.mc(2,"Wie heisst die Einzahl von «%s»?"%m,e,w[:3],"Das ist nur ein Ding.",None)
    for e,m in P[12:]:
        w=[x for x in allp if x!=m];t.r.shuffle(w);t.emc("Wie heisst die Mehrzahl von «%s»?"%e,m,w[:3],'')
    for e,m in P[12:16]:
        w=[x[0] for x in P if x[0]!=e];t.r.shuffle(w);t.emc("Wie heisst die Einzahl von «%s»?"%m,e,w[:3],'')
    for n_,(a,b,why_) in enumerate([("Katzes","Katzen","Die Mehrzahl von Katze heisst Katzen."),("Baume","Bäume","Aus a, o, u wird oft ä, ö, ü."),("Kinde","Kinder","Die Mehrzahl von Kind heisst Kinder."),("Blumes","Blumen","Die Mehrzahl von Blume heisst Blumen."),("Haeuser","Häuser","Aus au wird äu."),("Apfels","Äpfel","Die Mehrzahl von Apfel heisst Äpfel.")]):
        pass
    fixes(t,[("Katzes","Katzen","Die Mehrzahl von Katze heisst Katzen."),("Baume","Bäume","Aus au wird äu."),("Kinde","Kinder","Die Mehrzahl von Kind heisst Kinder."),("Blumes","Blumen","Die Mehrzahl von Blume heisst Blumen."),("Hause","Häuser","Die Mehrzahl von Haus heisst Häuser."),("Äpfeln","Äpfel","Die Mehrzahl von Apfel heisst Äpfel."),("Buche","Bücher","Die Mehrzahl von Buch heisst Bücher."),("Vogel","Vögel","Die Mehrzahl von Vogel heisst Vögel.")],ne=3,q='Schreibe die Mehrzahl richtig.')
    cls(t,[(("ein Hund"),0),("viele Hunde",1),("eine Katze",0),("zwei Katzen",1),("ein Kind",0),("drei Kinder",1),("ein Ball",0),("viele Bälle",1),("ein Baum",0),("viele Bäume",1),("ein Auto",0),("zwei Autos",1)],['Einzahl','Mehrzahl'],lambda p:"Einzahl oder Mehrzahl? «%s»"%p,hint="Ist es ein Ding oder sind es mehrere?",nc=6,ne=4,jnt='Stimmt das? «{w}» steht in der {c}.',multi=True,mt=3,mq='Tippe alle an: Welche stehen in der {c}?',match=True)
    return t
T.append(mehrzahl)

def gross():
    t=DT('kl2-deu-gross','kl2','Rechtschreibung','Grossschreibung',seed=23)
    t.th('basis','Gross schreiben','Am Satzanfang schreibt man gross. Nomen schreibt man auch gross.')
    THEORY(t,"Auf dem Schild vor dem Laden steht ein Satz. Er beginnt mit einem grossen Buchstaben. Auch die Namen von Dingen schreibt man gross.",SC('words',words=[['Der','#F29900'],['Hund','#4285F4'],['bellt','#EA4335']],say='Gross oder klein?'),
      "Zwei Regeln sagen dir, wann du gross schreibst.",["Regel","Beispiel"],[["Der Satz beginnt gross.","{3|Die} Sonne scheint."],["Nomen schreibt man gross.","der {0|Hund}, die {0|Schule}"],["Verben schreibt man klein.","laufen, singen"],["Adjektive schreibt man klein.","gross, rot"]],
      "Sieh dir an, welche Wörter gross sind.",
      [([("Der","Satzanfang",3),("Hund","Nomen",0),("bellt","Verb",1)],"Der Hund bellt."),([("Die","Satzanfang",3),("Katze","Nomen",0),("schläft","Verb",1)],"Die Katze schläft."),([("Mein","Satzanfang",3),("Bruder","Nomen",0),("spielt","Verb",1),("Ball","Nomen",0)],"Mein Bruder spielt Ball.")],
      "So prüfst du die Grossschreibung.",["Beginne den Satz mit einem grossen Buchstaben.","Suche die Nomen im Satz.","Probiere «der, die oder das» davor.","Schreibe jedes Nomen gross."],
      "Das ist wichtig.",[["Satzanfang","Das erste Wort ist immer gross.","Die Sonne scheint.",3],["Nomen","Namen von Menschen, Tieren, Dingen.","der Tisch",0],["Klein","Verben und Adjektive.","laufen, rot",1]],fehler=[["der hund bellt.","Der Hund bellt.","Satzanfang und Nomen gross."],["Ich Lese ein Buch.","Ich lese ein Buch.","Verben schreibt man klein."],["Das Rote Auto.","Das rote Auto.","Adjektive schreibt man klein."]])
    W_=[("hund","Hund"),("katze","Katze"),("tisch","Tisch"),("schule","Schule"),("apfel","Apfel"),("ball","Ball"),("blume","Blume"),("haus","Haus"),("stuhl","Stuhl"),("fisch","Fisch"),("tasche","Tasche"),("buch","Buch"),("auto","Auto"),("baum","Baum"),("vogel","Vogel"),("sonne","Sonne")]
    for pre,a in W_[:11]:t.fix(1,"Schreibe das Wort richtig.",pre,a,"Nomen schreibt man gross.","«%s» ist ein Nomen. Man schreibt es gross."%a)
    for pre,a in W_[11:]:t.efix("Schreibe das Wort richtig.",pre,a,"Nomen schreibt man gross.")
    fixes(t,[("der hund bellt.","Der Hund bellt."),("die katze schläft.","Die Katze schläft."),("mein ball ist rot.","Mein Ball ist rot."),("die sonne scheint.","Die Sonne scheint."),("das kind lacht.","Das Kind lacht."),("ich male ein haus.","Ich male ein Haus."),("wir lesen ein buch.","Wir lesen ein Buch."),("der vogel singt.","Der Vogel singt.")],ne=3,q='Schreibe den Satz richtig.',lvl=2)
    gaps(t,[("___ Hund bellt.","Der",["der","bellt","hund"]),("Das ___ ist rot.","Auto",["auto","rot","laufen"]),("Ich ___ gern.","lese",["Lese","Buch","Tisch"]),("Die ___ scheint.","Sonne",["sonne","warm","scheint"]),("Der ___ ist rund.","Ball",["ball","rund","ist"]),("Wir essen einen ___.","Apfel",["apfel","essen","rot"]),("Im ___ ist es kalt.","Winter",["winter","kalt","ist"])],ne=5,q='Welche Schreibweise ist richtig?')
    cls(t,[("Hund",0),("laufen",1),("Haus",0),("singen",1),("Ball",0),("lachen",1),("Tisch",0),("malen",1),("Katze",0),("spielen",1),("Buch",0),("essen",1)],['gross schreiben','klein schreiben'],lambda p:"Wie schreibst du «%s» in der Mitte des Satzes?"%p.lower(),hint="Nomen gross, Verben klein.",nc=9,ne=3,jn=0,sel=False,multi=True,mt=3,mq='Tippe alle Wörter an, die man {s} muss.',match=True)
    return t
T.append(gross)
