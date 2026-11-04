from de import *
T=[]
WA4=['Nomen','Verb','Adjektiv','Pronomen']
def wortarten(ch,hard):
    t=DT('%s-deu-wortarten'%ch,ch,'Wortarten','Wortarten',seed=81+int(ch[2:]))
    t.th('basis','Wortarten','Nomen = Name. Verb = Tätigkeit. Adjektiv = wie etwas ist. Pronomen = steht für ein Nomen oder begleitet es.')
    THEORY(t,"Im Satz arbeiten viele Wörter zusammen. Jedes Wort hat seine Aufgabe und seine Wortart.",SC('words',words=[['Er','#9334E6'],['isst','#EA4335'],['roten','#34A853'],['Apfel','#4285F4']],say='Vier Wörter, vier Wortarten'),
      "Vier Wortarten kennst du jetzt.",["Wortart","Aufgabe","Beispiel"],[["{0|Nomen}","Name","Apfel, Schule"],["{1|Verb}","Tätigkeit","essen, laufen"],["{2|Adjektiv}","Eigenschaft","rot, schnell"],["{4|Pronomen}","Stellvertreter oder Begleiter","er, mein"]],
      "Jedes Wort bekommt seine Farbe.",
      [([("Er","Pronomen",4),("isst","Verb",1),("einen","",3),("roten","Adjektiv",2),("Apfel","Nomen",0)],"Er isst einen roten Apfel."),([("Meine","Pronomen",4),("Schwester","Nomen",0),("liest","Verb",1),("ein","",3),("spannendes","Adjektiv",2),("Buch","Nomen",0)],"Meine Schwester liest ein spannendes Buch."),([("Wir","Pronomen",4),("spielen","Verb",1),("im","",5),("Garten","Nomen",0)],"Wir spielen im Garten.")],
      "So bestimmst du die Wortart.",["Lies den ganzen Satz.","Setze «der, die oder das» davor: Passt es, ist es ein Nomen.","Frage: Was wird getan? Das ist das Verb.","Frage: Wie ist etwas? Das ist das Adjektiv.","Steht das Wort für ein Nomen oder begleitet es? Dann ist es ein Pronomen."],
      "Das ist wichtig.",[["Nomen","Gross schreiben.","Hund",0],["Verb","Verändert sich: ich lache, er lachte.","lachen",1],["Adjektiv","Kann man steigern: gross, grösser.","gross",2],["Pronomen","Ersetzt oder begleitet ein Nomen.","er, mein",4]],
      fehler=[["«schnell» ist ein Verb.","«schnell» ist ein Adjektiv.","Es sagt, wie etwas ist."],["«mein» ist ein Nomen.","«mein» ist ein Pronomen.","Es begleitet ein Nomen."],["«rennen» ist ein Adjektiv.","«rennen» ist ein Verb.","Man kann es tun."]])
    if hard:more(t,'Schwierigere Wörter','Manche Wörter sind nicht auf den ersten Blick erkennbar. Prüfe immer mit den Proben.',TBL(['Wort','Wortart','Probe'],[['die Freude','Nomen','die Freude, eine Freude'],['uns','Pronomen','ersetzt «wir»'],['geplant','Verb (Partizip)','ich plane'],['interessante','Adjektiv','steigerbar: interessanter']]))
    if not hard:
        S=[("Der Hund bellt laut.","Hund",0),("Der Hund bellt laut.","bellt",1),("Der Hund bellt laut.","laut",2),("Er isst einen roten Apfel.","Er",3),("Er isst einen roten Apfel.","isst",1),("Er isst einen roten Apfel.","roten",2),("Er isst einen roten Apfel.","Apfel",0),("Meine Schwester liest ein spannendes Buch.","Schwester",0),("Meine Schwester liest ein spannendes Buch.","liest",1),("Meine Schwester liest ein spannendes Buch.","spannendes",2),("Meine Schwester liest ein spannendes Buch.","Meine",3),("Wir spielen im Garten.","Wir",3),("Wir spielen im Garten.","spielen",1),("Wir spielen im Garten.","Garten",0),("Das kleine Kind schläft tief.","kleine",2),("Das kleine Kind schläft tief.","Kind",0),("Das kleine Kind schläft tief.","schläft",1),("Dein Bruder trägt eine schwere Tasche.","Dein",3),("Dein Bruder trägt eine schwere Tasche.","trägt",1),("Dein Bruder trägt eine schwere Tasche.","schwere",2),("Dein Bruder trägt eine schwere Tasche.","Tasche",0),("Sie backt einen leckeren Kuchen.","Sie",3),("Sie backt einen leckeren Kuchen.","backt",1),("Sie backt einen leckeren Kuchen.","leckeren",2)]
    else:
        S=[("Die Freude der Kinder ist gross.","Freude",0),("Die Freude der Kinder ist gross.","gross",2),("Die Freude der Kinder ist gross.","ist",1),("Unsere Reise war sehr schön.","Reise",0),("Unsere Reise war sehr schön.","Unsere",3),("Unsere Reise war sehr schön.","schön",2),("Unsere Reise war sehr schön.","war",1),("Der Lehrer lobt uns oft.","uns",3),("Der Lehrer lobt uns oft.","lobt",1),("Der Lehrer lobt uns oft.","Lehrer",0),("Die mutige Feuerwehr rettet die Familie.","mutige",2),("Die mutige Feuerwehr rettet die Familie.","rettet",1),("Die mutige Feuerwehr rettet die Familie.","Feuerwehr",0),("Ihr habt euren Ausflug gut geplant.","Ihr",3),("Ihr habt euren Ausflug gut geplant.","Ausflug",0),("Ihr habt euren Ausflug gut geplant.","geplant",1),("Das interessante Experiment gelingt uns.","interessante",2),("Das interessante Experiment gelingt uns.","Experiment",0),("Das interessante Experiment gelingt uns.","gelingt",1),("Meine Grossmutter erzählt eine lustige Geschichte.","Grossmutter",0),("Meine Grossmutter erzählt eine lustige Geschichte.","erzählt",1),("Meine Grossmutter erzählt eine lustige Geschichte.","lustige",2),("Meine Grossmutter erzählt eine lustige Geschichte.","Meine",3),("Wir bauen zusammen eine hohe Sandburg.","hohe",2),("Wir bauen zusammen eine hohe Sandburg.","bauen",1),("Wir bauen zusammen eine hohe Sandburg.","Sandburg",0)]
    hs=["Kannst du «der, die oder das» davor setzen?","Kannst du es tun oder geschieht es?","Sagt es, wie etwas ist?","Steht es für ein Nomen oder begleitet es?"]
    cls(t,[((s,w),c) for s,w,c in S],WA4,lambda p:p[0]+"\nWelche Wortart hat «%s»?"%p[1],hint=hs,why=lambda p,c:"«%s» ist ein %s."%(p[1],WA4[c]),disp=lambda p:p[1],ne=10,mq='Tippe alle {p} an.',mt=2)
    gaps(t,[("Das ___ Kind lacht. (Adjektiv)","kleine",["Haus","laufen","wir"]),("Wir ___ im Garten. (Verb)","spielen",["Garten","schön","unser"]),("Der ___ bellt. (Nomen)","Hund",["laut","laufen","er"]),("___ Ball ist rot. (Pronomen)","Mein",["Ball","rennen","rund"])] if not hard else [("Die ___ Katze schläft. (Adjektiv)","graue",["Katze","schlafen","sie"]),("Die Kinder ___ im Park. (Verb)","spielen",["Park","grün","ihr"]),("Die ___ ist gross. (Nomen)","Freude",["freuen","froh","uns"]),("___ Lehrer ist nett. (Pronomen)","Unser",["Lehrer","nett","lachen"])],ne=3,q='Welches Wort passt zur Wortart?')
    return t
T+= [lambda:wortarten('kl3',False),lambda:wortarten('kl4',True)]

def satzzeichen(ch,hard):
    t=DT('%s-deu-satzzeichen'%ch,ch,'Zeichensetzung','Satzzeichen ? und !',seed=91+int(ch[2:]))
    t.th('basis','Satzzeichen','Am Ende einer Aussage steht ein Punkt. Nach einer Frage steht ein Fragezeichen. Nach einem Befehl oder Ausruf steht ein Ausrufezeichen.')
    THEORY(t,"Auf dem Schulhof ruft jemand: «Kommst du?» Ein anderer ruft: «Pass auf!» Die Satzzeichen zeigen, wie ein Satz gemeint ist.",SC('talk',t1='Kommst du mit?',t2='Ja, ich komme!'),
      "Es gibt drei Satzzeichen am Satzende.",["Satzart","Zeichen","Beispiel"],[["{2|Aussage}","Punkt .","Ich spiele Ball."],["{0|Frage}","Fragezeichen ?","Spielst du Ball?"],["{1|Aufforderung / Ausruf}","Ausrufezeichen !","Spiel mit mir!"]],
      "Die Farben zeigen die Satzart.",
      [([("Ich","",7),("spiele","",7),("Ball","",7),(".","Punkt",2)],"Eine Aussage."),([("Spielst","",7),("du","",7),("Ball","",7),("?","Fragezeichen",0)],"Eine Frage."),([("Spiel","",7),("mit","",7),("mir","",7),("!","Ausrufezeichen",1)],"Eine Aufforderung.")],
      "So findest du das richtige Zeichen.",["Lies den Satz mit deiner Stimme.","Fragst du etwas? Dann setze ein Fragezeichen.","Befiehlst du etwas oder rufst du laut? Dann setze ein Ausrufezeichen.","Sagst du einfach etwas? Dann setze einen Punkt."],
      "Das ist wichtig.",[["Punkt","Nach einer Aussage.","Es regnet.",2],["Fragezeichen","Nach einer Frage.","Wie spät ist es?",0],["Ausrufezeichen","Nach Befehl oder Ausruf.","Sei leise!",1]],
      fehler=[["Wie heisst du.","Wie heisst du?","Eine Frage endet mit ?."],["Es regnet?","Es regnet.","Eine Aussage endet mit einem Punkt."],["Sei leise.","Sei leise!","Ein Befehl endet mit !."]])
    if hard:more(t,'Woran du Fragen erkennst','Fragesätze erkennst du an der Satzstellung oder am Fragewort.',TBL(['Art der Frage','Merkmal','Beispiel'],[['Fragewort','Wer, Wie, Wo, Warum …','Wo wohnst du?'],['Entscheidungsfrage','Verb steht vorne, Antwort ja oder nein','Kommst du mit?']]))
    if not hard:
        Q=[("Ich spiele gern Fussball",0),("Wie heisst du",1),("Komm sofort her",2),("Die Sonne scheint",0),("Hast du Hunger",1),("Pass auf",2),("Wir gehen schwimmen",0),("Wo wohnst du",1),("Räum dein Zimmer auf",2),("Mama kocht Suppe",0),("Kommst du mit",1),("Hör jetzt gut zu",2),("Der Hund bellt",0),("Wie alt bist du",1),("Sei leise",2),("Ich habe einen Bruder",0),("Wann gehen wir los",1),("Lies den Satz vor",2),("Wir sind müde",0),("Hast du mein Buch gesehen",1),("Mach die Tür zu",2),("Es schneit seit gestern",0),("Wer ist da",1)]
    else:
        Q=[("Am Wochenende besuchen wir unsere Grosseltern",0),("Hast du die Hausaufgaben schon gemacht",1),("Bring deine Turnsachen mit",2),("Der Zug fährt um acht Uhr ab",0),("Warum ist der Himmel blau",1),("Pass auf, die Strasse ist glatt",2),("Wir haben im Garten einen Schneemann gebaut",0),("Wohin fährst du in den Ferien",1),("Hör sofort auf damit",2),("Meine Schwester lernt gerade für die Prüfung",0),("Kannst du mir bitte helfen",1),("Komm sofort zu mir",2),("Im Sommer baden wir im See",0),("Wer hat den Kuchen gebacken",1),("Lauf schnell nach Hause",2),("Der Bus hatte heute Verspätung",0),("Wie lange dauert die Fahrt",1),("Halte sofort an",2),("Unsere Klasse macht morgen einen Ausflug",0),("Welches Buch hast du gelesen",1),("Gib mir den Ball",2),("Die Ferien beginnen nächste Woche",0),("Hast du heute Zeit für mich",1)]
    C=['Punkt','Fragezeichen','Ausrufezeichen']
    cls(t,Q,C,lambda p:"Welches Satzzeichen steht am Ende?\n«%s …»"%p if False else "%s …\nWelches Satzzeichen steht am Ende?"%p,hint=["Eine Aussage sagt etwas.","Eine Frage will eine Antwort.","Ein Befehl oder Ausruf ist laut."],why=lambda p,c:["Aussage: Punkt.","Frage: Fragezeichen.","Aufforderung oder Ausruf: Ausrufezeichen."][c],ne=8,mq='Tippe alle Sätze an, die mit einem {c} enden.',qm='Ordne jedem Satz sein Satzzeichen zu.',ntyp=0,ntx=0,sel=False,jnt='Stimmt das? Am Ende steht ein {c}.',jnp=True)
    mark={0:'.',1:'?',2:'!'}
    fixes(t,[(q+'',q+mark[c]) for q,c in Q[:15]],ne=0,q='Setze das richtige Satzzeichen ans Ende.',hint='Aussage, Frage oder Befehl?')
    for q,c in Q[15:]:t.efix('Setze das richtige Satzzeichen ans Ende.',q,q+mark[c],'')
    return t
T+= [lambda:satzzeichen('kl3',False),lambda:satzzeichen('kl4',True)]

def komma(ch,hard):
    t=DT('%s-deu-komma'%ch,ch,'Zeichensetzung','Das Komma',seed=101+int(ch[2:]))
    t.th('basis','Komma bei Aufzählungen','Zählst du mehrere Dinge auf, trennst du sie mit Komma. Vor «und» und «oder» steht kein Komma.')
    THEORY(t,"Du schreibst einen Einkaufszettel: Brot, Milch, Käse und Äpfel. Zwischen den Dingen stehen Kommas.",SC('words',words=[['Brot,','#4285F4'],['Milch,','#EA4335'],['Käse','#34A853'],['und','#F29900'],['Äpfel','#9334E6']],say='Aufzählung'),
      "Bei einer Aufzählung gelten klare Regeln.",["Regel","Beispiel"],[["{0|Komma} zwischen den Wörtern","Ich kaufe Brot{0|,} Milch und Käse."],["{1|Kein Komma} vor «und»","Milch und Käse"],["{1|Kein Komma} vor «oder»","Tee oder Kaffee"]],
      "Die Kommas sind farbig.",
      [([("Ich","",7),("kaufe","",7),("Brot","",0),(",","Komma",1),("Milch","",0),("und","kein Komma",3),("Käse","",0)],"Ich kaufe Brot, Milch und Käse."),([("Wir","",7),("singen","",0),(",","Komma",1),("tanzen","",0),("und","kein Komma",3),("lachen","",0)],"Wir singen, tanzen und lachen."),([("Ich","",7),("mag","",7),("rote","",0),(",","Komma",1),("gelbe","",0),("oder","kein Komma",3),("grüne","",0),("Äpfel","",7)],"Ich mag rote, gelbe oder grüne Äpfel.")],
      "So setzt du Kommas in einer Aufzählung.",["Suche alle Wörter, die aufgezählt werden.","Setze zwischen sie ein Komma.","Vor «und» oder «oder» setzt du kein Komma.","Lies den Satz laut und prüfe."],
      "Das ist wichtig.",[["Komma","Trennt Wörter einer Aufzählung.","Äpfel, Birnen, Nüsse",1],["Kein Komma","Vor «und» und «oder».","Brot und Käse",3],["Sprechen","Beim Lesen machst du eine kurze Pause.","Brot, Milch, Käse",0]],
      fehler=[["Ich esse Äpfel Birnen und Nüsse.","Ich esse Äpfel, Birnen und Nüsse.","Zwischen den Wörtern fehlt das Komma."],["Ich esse Äpfel, Birnen, und Nüsse.","Ich esse Äpfel, Birnen und Nüsse.","Vor «und» steht kein Komma."],["Ich, esse Äpfel Birnen und Nüsse.","Ich esse Äpfel, Birnen und Nüsse.","Nach «Ich» steht kein Komma."]])
    if hard:more(t,'Adjektive aufzählen','Auch Adjektive vor einem Nomen trennst du mit Komma, wenn du sie mit «und» tauschen könntest.',TBL(['Satz','Probe mit «und»','Komma?'],[['ein klug_ freundlicher Mann','klug und freundlich','ja: ein kluger, freundlicher Mann'],['ein alt_ Haus','nur ein Adjektiv','nein']] if False else [['ein kluger, freundlicher Mann','klug und freundlich','ja'],['ein altes Haus','nur ein Adjektiv','nein']]))
    if not hard:
        L=[("Ich kaufe",["Brot","Milch","Käse"]),("Meine Oma strickt",["Socken","Mützen","Schals"]),("Im Schrank liegen",["Hosen","Pullover","Jacken"]),("Im Zoo sehen wir",["Löwen","Affen","Elefanten"]),("In meiner Tasche sind",["ein Heft","ein Stift","ein Lineal"]),("Anna mag",["Katzen","Hunde","Pferde"]),("Wir packen",["Socken","Hosen","Pullover","Mützen"]),("Im Garten wachsen",["Rosen","Tulpen","Nelken"]),("Zum Frühstück gibt es",["Brot","Butter","Honig"]),("Tom spielt",["Fussball","Tennis","Handball"]),("Auf dem Tisch liegen",["Äpfel","Birnen","Nüsse","Trauben"]),("Im Schulranzen sind",["Bücher","Hefte","Stifte"])]
    else:
        L=[("Im Urlaub wollen wir",["schwimmen","tauchen","wandern"]),("Das Zimmer ist",["hell","gross","freundlich"]),("Zum Basteln brauchst du",["Papier","Schere","Leim"]),("Für den Kuchen brauchst du",["Mehl","Zucker","Eier","Butter"]),("Er ist ein",["kluger","freundlicher","mutiger"]),("Auf dem Markt gibt es",["frisches Gemüse","reife Früchte","duftendes Brot"]),("Die Kinder wollen",["springen","klettern","rutschen"]),("In der Pause spielen wir",["Fangen","Verstecken","Ball"]),("Die Wiese ist",["grün","weich","feucht"]),("Zur Party bringen wir",["Salat","Kuchen","Getränke","Chips"]),("Im Winter tragen wir",["Mützen","Schals","Handschuhe"])]
    def corr(a,items,end):
        if hard and a.startswith('Er ist ein'):
            return a+' '+', '.join(items[:-1])+' und '+items[-1]+' Mann.'
        s=a+' '+(', '.join(items[:-1])+' und '+items[-1])+end;return s
    def variants(a,items,end='.'):
        c=corr(a,items,end)
        w=[a+' '+' '.join(items[:-1])+' und '+items[-1]+end,a+' '+', '.join(items[:-1])+', und '+items[-1]+end,a+', '+', '.join(items[:-1])+' und '+items[-1]+end]
        if hard and a.startswith('Er ist ein'):
            w=[a+' '+' '.join(items[:-1])+' und '+items[-1]+' Mann.',a+' '+', '.join(items[:-1])+', und '+items[-1]+' Mann.',a+', '+', '.join(items[:-1])+' und '+items[-1]+' Mann.']
        return c,w
    ex=4
    for k,(a,items) in enumerate(L):
        c,w=variants(a,items)
        if k<len(L)-ex:
            t.mc(1 if k<5 else 2,"Welcher Satz hat die Kommas richtig?",c,w,"Zwischen den Wörtern steht ein Komma, vor «und» keines.")
            pre=a+' '+' '.join(items[:-1])+' und '+items[-1]+(' Mann.' if a.startswith('Er ist ein') else '.')
            t.fix(2,"Setze die Kommas richtig.",pre,c,"Setze zwischen die Wörter ein Komma, aber nicht vor «und».",None)
        else:
            t.emc("Welcher Satz hat die Kommas richtig?",c,w,'')
            t.efix("Setze die Kommas richtig.",a+' '+' '.join(items[:-1])+' und '+items[-1]+(' Mann.' if a.startswith('Er ist ein') else '.'),c,'')
    for k,(a,items) in enumerate(L[:6]):
        c,w=variants(a,items)
        t.mc(2,"Wo ist der Fehler? \n«%s»\nWas stimmt nicht?"%w[1] if False else "%s\nWas ist falsch?"%w[1],"Vor «und» steht ein Komma.",["Es fehlt ein Punkt.","Das Komma ist richtig.","Nach dem ersten Wort fehlt ein Komma."],'Vor «und» steht kein Komma.')
    cls(t,[x for a,i in L for x in ((corr(a,i,'.'),0),(variants(a,i)[1][0],1))],['richtig','falsch'],lambda p:"%s\nSind die Kommas richtig gesetzt?"%p,hint="Zwischen den Wörtern ein Komma, vor «und» keines.",ne=8,sel=False,ntyp=0,ntx=0,match=False,mt=3,jn=0,mq='Tippe alle Sätze an, die {c} sind.')
    return t
T+= [lambda:komma('kl3',False),lambda:komma('kl4',True)]
