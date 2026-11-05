# -*- coding: utf-8 -*-
"""Seiten umbauen: 'Typische Fehler' raus, 'Ausnahmen' rein, einige Tabellen sinnvoller."""
H3=["Ausnahme","Die Regel sagt","Hier aber"]
A={}
A['nva']=("Manche Wörter sehen wie Verben aus und sind doch Nomen. Mach die Probe mit «der, die, das».",["Wort","Sieht aus wie","Ist aber"],[
 ["das Essen","ein Verb","ein Nomen: «das Essen» passt"],
 ["das Lachen","ein Verb","ein Nomen: «das Lachen» passt"],
 ["das Spielen","ein Verb","ein Nomen: «Das Spielen macht Spass.»"]])
A['mehrzahl']=("Nicht jedes Nomen bekommt eine neue Endung.",["Wort","Besonderheit","Beispiel"],[
 ["das Fenster","Mehrzahl bleibt gleich","die Fenster"],
 ["der Lehrer","Mehrzahl bleibt gleich","die Lehrer"],
 ["das Mädchen","Mehrzahl bleibt gleich","die Mädchen"],
 ["die Milch","keine Mehrzahl","nur Einzahl"],
 ["die Ferien","keine Einzahl","nur Mehrzahl: die Eltern, die Ferien"]])
A['gross']=("Auch bei der Grossschreibung gibt es Sonderfälle.",H3,[
 ["Lauf schnell!","Verben schreibt man klein","am Satzanfang gross: «Lauf schnell!»"],
 ["ich","Wörter in der Mitte klein","«ich» ist nur am Satzanfang gross: «Heute lese ich.»"],
 ["Anna, Zürich, die Aare","Namen sind Nomen","Namen schreibst du immer gross"]])
A['pronomen']=("Pronomen haben ein paar Tricks.",["Wort","Besonderheit","Beispiel"],[
 ["es","steht manchmal für nichts","Es regnet. Es ist kalt."],
 ["Sie","Höflichkeitsform: gross","Haben Sie Zeit?"],
 ["ihr","zwei Aufgaben","«Ihr kommt» (Stellvertreter) – «ihr Hund» (Begleiter)"],
 ["sie","Einzahl oder Mehrzahl","Sie lacht. Sie lachen."]])
A['zeitformen']=("Nicht alle Verben halten sich an die Regel.",H3,[
 ["gehen","Präteritum mit -te","«ging», nicht «gehte»"],
 ["laufen, fahren, kommen","Perfekt mit «haben»","Bewegung: «ich bin gelaufen»"],
 ["sein, haben","Präteritum mit -te","«ich war», «ich hatte»"],
 ["morgen","Zukunft mit «werden»","Meist Präsens: «Morgen gehe ich schwimmen.»"]])
A['alphabet']=("Beim Ordnen nach dem ABC gibt es Sonderfälle.",H3,[
 ["ä, ö, ü","stehen nicht im ABC","im Wörterbuch bei a, o, u: «Bär» steht bei «Bad»"],
 ["gleicher Anfang","1. Buchstabe entscheidet","dann der 2.: «Affe» vor «Apfel» (f vor p)"],
 ["sch","klingt wie ein Laut","zählt als drei Buchstaben: s, c, h"]])
A['langvokal']=("Hier gibt es viele Ausnahmen. Sie lernst du am besten auswendig.",H3,[
 ["ck, tz","kurzer Vokal: Doppelbuchstabe","statt «kk» und «zz»: Decke, Katze"],
 ["Tiger, Igel, Biber","langes i: ie","langes i ohne «ie»"],
 ["mir, dir, wir","langes i: ie","langes i ohne «ie»"],
 ["Bus, das, mit, in","kurzer Vokal: doppelt","kurzer Vokal ohne Doppelbuchstabe"],
 ["Name, Tag, Mond","langer Vokal: h oder doppelt","langer Vokal ganz ohne Zeichen"]])
A['stammformen']=("Mischverben ändern den Stamm UND enden auf -te und -t. Sie passen in keine Gruppe.",["Grundform","Präteritum","Partizip II"],[
 ["denken","dachte","gedacht"],["bringen","brachte","gebracht"],["kennen","kannte","gekannt"],["wissen","wusste","gewusst"]])
A['satzzeichen']=("Nicht immer passt das Satzzeichen zur Satzart.",["Fall","Man denkt","Aber"],[
 ["Indirekte Frage","Fragezeichen","Punkt: «Ich weiss nicht, wie er heisst.»"],
 ["Ruhiger Befehl","Ausrufezeichen","Punkt ist möglich: «Bitte komm her.»"],
 ["Ausruf","Punkt","Ausrufezeichen: «Hilfe!» «Super!»"],
 ["Frage ohne Fragewort","Punkt","Fragezeichen: «Du kommst mit?»"]])
A['komma']=("Beim Komma gibt es feste Wörter.",["Wort","Komma?","Beispiel"],[
 ["und, oder","kein Komma davor","«Äpfel, Birnen und Nüsse»"],
 ["aber","Komma davor","«Ich will, aber ich darf nicht.»"],
 ["Anrede","Komma danach","«Anna, komm her!»"],
 ["Ja, Nein","Komma danach","«Ja, ich komme.»"]])
A['wortarten']=("Manche Wörter täuschen. Prüfe immer mit der Probe.",["Wort","Wortart","Probe"],[
 ["das Essen","Nomen","«das Essen» passt, auch wenn es wie ein Verb klingt"],
 ["die Freude","Nomen","die Freude, eine Freude (man kann sie nicht anfassen)"],
 ["uns","Pronomen","ersetzt «wir»"],
 ["geplant","Verb (Partizip)","ich plane"],
 ["interessante","Adjektiv","steigerbar: interessanter"]])
A['wortarten5']=("Manche Wörter sind schwierig. Die Probe hilft.",["Wort","Besonderheit","Beispiel"],[
 ["ihr","zwei Aufgaben","«ihr kommt» (Stellvertreter) – «ihr Hund» (Begleiter)"],
 ["das Lesen","Verb wird Nomen","«Das Lesen macht Spass.»"],
 ["heute, hier","nicht veränderbar","Adverbien: man kann sie nicht beugen oder steigern"]])
A['subjekt']=("Das Subjekt ist nicht immer leicht zu finden.",["Fall","Besonderheit","Beispiel"],[
 ["Es regnet.","«es» ohne Handelnden","«es» ist trotzdem das Subjekt: Es schneit."],
 ["Befehl","das Subjekt fehlt","«Komm her!» – «du» ist mitgedacht"],
 ["Frage","Subjekt nach dem Verb","«Kommt dein Bruder?» → dein Bruder"],
 ["anderer Satzbeginn","Subjekt nicht vorne","«Gestern las meine Schwester.» → meine Schwester"]])
A['plusquam']=("Das Plusquamperfekt brauchst du nur, wenn zwei Dinge nacheinander geschehen.",["Fall","Regel","Beispiel"],[
 ["nur ein Ereignis","kein Plusquamperfekt nötig","«Ich ging nach Hause.»"],
 ["Verben der Bewegung","mit «war»","«Er war gegangen.» (nicht «hatte»)"],
 ["zwei Ereignisse","das frühere im Plusquamperfekt","«Nachdem er gegessen hatte, ging er.»"]])
A['hauptsaetze']=("Bei diesen Wörtern musst du aufpassen.",["Wort","Komma?","Beispiel"],[
 ["und, oder","Komma darf fehlen","«Ich lese und sie malt.»"],
 ["aber, denn, sondern","Komma muss stehen","«Es regnet, aber wir gehen hinaus.»"],
 ["weil, dass","gehört zum Nebensatz","«Wir bleiben, weil es regnet.»"]])
A['grossklein']=("Hier gibt es Sonderfälle.",["Fall","Regel","Beispiel"],[
 ["montags, abends","Zeitwörter auf -s: klein","«abends», aber «am Abend»"],
 ["heute Abend","Tageszeit nach heute, gestern: gross","«gestern Morgen»"],
 ["Auto fahren","Nomen mit Verb: gross","«Rad fahren», «Ski fahren»"],
 ["nichts Neues","nach «etwas, nichts, viel»: gross","«etwas Schönes», «viel Gutes»"]])
A['faelle']=("Diese Fälle musst du besonders beachten.",["Fall","Regel","Beispiel"],[
 ["helfen, danken, gehören","verlangen den Dativ","«Ich helfe dem Mann.»"],
 ["auf, in, an, über","wo? Dativ – wohin? Akkusativ","«auf dem Stuhl» – «auf den Stuhl»"],
 ["es gibt","verlangt den Akkusativ","«Es gibt einen Apfel.»"],
 ["wegen, trotz","verlangen den Genitiv","«wegen des Regens»"],
 ["die, das","Nominativ = Akkusativ","«Die Frau sieht das Kind.»: Probe mit «wer/was»"]])
A['passiv']=("Nicht jedes Verb bildet ein Passiv wie gewohnt.",["Fall","Besonderheit","Beispiel"],[
 ["Verben ohne Objekt","Passiv nur mit «es»","«Es wird getanzt.»"],
 ["sein statt werden","Zustandspassiv","«Die Tür ist geöffnet.» (Zustand)"],
 ["haben, wissen, kennen","kein Passiv","«Das Buch wird gehabt» geht nicht"]])
A['konjunktiv']=("Wenn die Form gleich wie im Indikativ klingt, nimmst du eine Ersatzform.",["Fall","Problem","Lösung"],[
 ["sie haben","Konjunktiv I = Indikativ","«sie hätten» (Konjunktiv II)"],
 ["ich gehe","gleich wie Indikativ","«ich ginge» oder «ich würde gehen»"],
 ["sein","einziges Verb mit eigener Form in allen Personen","«ich sei, du seist, er sei, wir seien»"]])
A['hauptneben']=("Diese Wörter lösen oft Fehler aus.",["Fall","Besonderheit","Beispiel"],[
 ["denn, aber, sondern","verbinden Hauptsätze","Verb bleibt an zweiter Stelle: «..., denn es ist kalt.»"],
 ["Nebensatz vorne","danach folgt gleich das Verb","«Weil es regnet, bleiben wir.»"],
 ["mehrteiliges Verb","Hilfsverb ganz hinten","«..., weil er gekommen ist.»"]])
A['nebensatzarten']=("Kleine Wörter, grosse Wirkung.",["Wort","Besonderheit","Beispiel"],[
 ["das / dass","Probe: dieses oder welches?","«Das Buch, das ich lese» – «Ich weiss, dass du kommst.»"],
 ["als / wenn","einmalig oder wiederholt?","«Als ich klein war, …» – «Wenn ich Zeit habe, …»"],
 ["ob","keine direkte Frage","«Ich frage, ob er kommt.» (Punkt!)"]])
A['kommaerw']=("Bei Infinitivgruppen und Aufzählungen gibt es feste Regeln.",["Fall","Komma?","Beispiel"],[
 ["um, ohne, statt zu","Komma muss stehen","«Er ging, ohne zu grüssen.»"],
 ["einfaches «zu»","Komma darf fehlen","«Ich versuche zu lernen.»"],
 ["zwei Nebensätze mit und","kein Komma vor «und»","«Ich weiss, dass er kommt und dass sie bleibt.»"]])
A['satzglieder']=("Nicht jedes Satzglied ist ein einzelnes Wort.",["Fall","Besonderheit","Beispiel"],[
 ["Prädikat","kann zweiteilig sein","«Er steht früh auf.» – «Ich habe gelacht.»"],
 ["sich","gehört zum Verb","«Er freut sich.»: kein eigenes Satzglied"],
 ["es","manchmal kein Handelnder","«Es regnet.»: «es» ist das Subjekt"]])
A['zeitformen8']=("Diese Verben und Fälle verlangen besondere Beachtung.",["Fall","Regel","Beispiel"],[
 ["unregelmässige Verben","eigene Formen","«gehen – ging – gegangen»"],
 ["Zukunft","oft Präsens mit Zeitangabe","«Morgen fahre ich nach Bern.»"],
 ["sein, haben, Modalverben","Präteritum statt Perfekt","«Ich war müde.» (nicht «Ich bin müde gewesen»)"]])
A['wortarten8']=("Wörter wechseln manchmal die Wortart.",["Wort","Besonderheit","Beispiel"],[
 ["das / dass","Probe: dieses oder welches?","«das» Artikel oder Pronomen, «dass» Konjunktion"],
 ["Partizip","Verb oder Adjektiv","«ein gelesenes Buch» ist ein Adjektiv"],
 ["Nominalisierung","Verb wird Nomen","«das Laufen» schreibst du gross"]])
A['faelle8']=A['faelle']

def fam(tid):
    p=tid.split('-',2);n=p[2] if len(p)>2 else p[-1];cl=p[0]
    if n=='wortarten':return 'wortarten8' if cl=='kl8' else ('wortarten5' if cl in('kl5','kl6') else 'wortarten')
    if n=='zeitformen' and cl=='kl8':return 'zeitformen8'
    if n=='faelle':return 'faelle'
    return n if n in A else None
SKIP={'kl3-deu-wortarten':['geplant','interessante'],'kl4-deu-zeitformen':['laufen, fahren, kommen'],'kl4-deu-alphabet':['ä, ö, ü'],'kl6-deu-hauptsaetze':['und, oder'],
      'kl6-deu-grossklein':['heute Abend'],'kl9-deu-hauptneben':[]}
PRON=[["ich","ich lese","mein Buch"],["du","du liest","dein Buch"],["er","er liest","sein Buch"],["es","es spielt","sein Spielzeug"],
      ["sie (eine)","sie liest","ihr Buch"],["wir","wir lesen","unser Buch"],["ihr","ihr lest","euer Buch"],["sie (mehrere)","sie lesen","ihr Buch"]]
ALPHA=[["{0|Reihe}","Die Buchstaben stehen immer in der gleichen Reihenfolge.","A B C D E … X Y Z"],
       ["{1|Platz}","Jeder Buchstabe hat eine feste Nummer.","A ist der 1., M der 13., Z der 26."],
       ["{2|Davor}","Der Buchstabe, der gleich vorher kommt.","Vor K steht J."],
       ["{3|Danach}","Der Buchstabe, der gleich nachher kommt.","Nach K steht L."],
       ["{4|Vokale}","Die Selbstlaute: Sie klingen ganz von allein.","A, E, I, O, U"]]
STAMM=[["Schreibe die Grundform auf und sage sie laut.","","singen"],
       ["Frage: Ändert sich der Stamm? Dann ist das Verb unregelmässig.","","singen → sang (aus i wird a)"],
       ["Bilde das Partizip II: meist ge- + Stamm + -en.","","ge + sung + en = gesungen"],
       ["Sage die drei Formen wie eine Melodie.","","singen – sang – gesungen"],
       ["Prüfe mit der Liste.","","Liste: singen – sang – gesungen ✔"]]

def apply(c):
    n=0;rem=0
    for t in c['topics']:
        if t['subject']!='deu':continue
        ex=t['explain'];tid=t['id']
        # Typische Fehler entfernen
        k=fam(tid)
        sec=None
        if k:
            text,head,rows=A[k];sk=SKIP.get(tid,[])
            rows=[r for r in rows if r[0] not in sk]
            sec={"h":"Ausnahmen","text":text,"visuals":[{"type":"tbl","rows":rows,"head":head}]}
        idx=[i for i,e in enumerate(ex) if e['h'] in('Typische Fehler','Ausnahmen')]
        for i in reversed(idx):
            if i==idx[0] and sec:ex[i]=sec;sec=None;n+=1
            else:del ex[i];rem+=1
        if sec:
            j=len(ex)-1  # vor Merke / Regeln
            ex.insert(j,sec);n+=1
        for e in ex:
            if e['h']=='Die Pronomen im Überblick':
                e['visuals']=[{"type":"tbl","rows":PRON,"head":["Person","Stellvertreter","Begleiter"]}]
                e['text']='Zu jeder Person gibt es einen Stellvertreter und einen Begleiter. Merke dir beide Reihen.'
            if e['h']=='Schwierigere Wörter':e['_drop']=True
            if e['h']=='Das musst du wissen' and tid.endswith('-deu-alphabet'):
                e['visuals']=[{"type":"tbl","rows":ALPHA,"head":["Was","Bedeutung","Beispiel"]}]
            if e['h']=='So gehst du vor' and tid.endswith('-deu-stammformen'):
                for v in e['visuals']:
                    if v['type']=='lines':v['items']=[list(x) for x in STAMM]
        t['explain']=[e for e in ex if not e.get('_drop')]
    print('Ausnahmen eingefuegt',n,'Typische Fehler entfernt',rem)
