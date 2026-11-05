"""Deutsch: zusaetzliche Karten mit immer neuen Saetzen/Woertern (v4.82).
Wird von rund.py nach dem Bau jedes Themas aufgerufen: extend(t)."""
import random,itertools
# ---------------------------------------------------------------- Wortschatz
# (Einzahl, Mehrzahl, Geschlecht, Genitiv, Gruppe)
NOUNS=[('Hund','Hunde','m','Hundes','tier'),('Katze','Katzen','f','Katze','tier'),('Vogel','Vögel','m','Vogels','tier'),('Pferd','Pferde','n','Pferdes','tier'),
('Fisch','Fische','m','Fisches','tier'),('Maus','Mäuse','f','Maus','tier'),('Kuh','Kühe','f','Kuh','tier'),('Schaf','Schafe','n','Schafes','tier'),('Ente','Enten','f','Ente','tier'),
('Igel','Igel','m','Igels','tier'),('Frosch','Frösche','m','Frosches','tier'),
('Kind','Kinder','n','Kindes','person'),('Mann','Männer','m','Mannes','person'),('Frau','Frauen','f','Frau','person'),('Lehrerin','Lehrerinnen','f','Lehrerin','person'),
('Lehrer','Lehrer','m','Lehrers','person'),('Bäcker','Bäcker','m','Bäckers','person'),('Mädchen','Mädchen','n','Mädchens','person'),('Arzt','Ärzte','m','Arztes','person'),
('Schüler','Schüler','m','Schülers','person'),('Mutter','Mütter','f','Mutter','person'),('Vater','Väter','m','Vaters','person'),('Bruder','Brüder','m','Bruders','person'),
('Schwester','Schwestern','f','Schwester','person'),('Freundin','Freundinnen','f','Freundin','person'),('Koch','Köche','m','Kochs','person'),('Gärtner','Gärtner','m','Gärtners','person'),
('Fahrer','Fahrer','m','Fahrers','person'),
('Tisch','Tische','m','Tisches','ding'),('Stuhl','Stühle','m','Stuhls','ding'),('Buch','Bücher','n','Buches','ding'),('Auto','Autos','n','Autos','ding'),('Haus','Häuser','n','Hauses','ding'),
('Ball','Bälle','m','Balls','ding'),('Baum','Bäume','m','Baumes','ding'),('Blume','Blumen','f','Blume','ding'),('Tasche','Taschen','f','Tasche','ding'),('Schule','Schulen','f','Schule','ding'),
('Garten','Gärten','m','Gartens','ding'),('Bild','Bilder','n','Bildes','ding'),('Lampe','Lampen','f','Lampe','ding'),('Fenster','Fenster','n','Fensters','ding'),('Tür','Türen','f','Tür','ding'),
('Apfel','Äpfel','m','Apfels','ding'),('Brot','Brote','n','Brotes','ding'),('Kuchen','Kuchen','m','Kuchens','ding'),('Suppe','Suppen','f','Suppe','ding'),('Tasse','Tassen','f','Tasse','ding'),
('Zug','Züge','m','Zuges','ding'),('Velo','Velos','n','Velos','ding'),('Turm','Türme','m','Turmes','ding'),('Korb','Körbe','m','Korbes','ding'),('Wiese','Wiesen','f','Wiese','ding'),
('Jacke','Jacken','f','Jacke','ding'),('Mütze','Mützen','f','Mütze','ding'),('Heft','Hefte','n','Heftes','ding'),('Stift','Stifte','m','Stiftes','ding'),('Uhr','Uhren','f','Uhr','ding'),
('Spiel','Spiele','n','Spiels','ding')]

NOUNS+=[('Hase','Hasen','m','Hasen','tier'),('Bär','Bären','m','Bären','tier'),('Löwe','Löwen','m','Löwen','tier'),('Affe','Affen','m','Affen','tier'),('Wolf','Wölfe','m','Wolfes','tier'),('Fuchs','Füchse','m','Fuchses','tier'),
('Henne','Hennen','f','Henne','tier'),('Ziege','Ziegen','f','Ziege','tier'),('Biene','Bienen','f','Biene','tier'),('Schnecke','Schnecken','f','Schnecke','tier'),('Huhn','Hühner','n','Huhns','tier'),('Kaninchen','Kaninchen','n','Kaninchens','tier'),('Schwein','Schweine','n','Schweins','tier'),
('Onkel','Onkel','m','Onkels','person'),('Tante','Tanten','f','Tante','person'),('Opa','Opas','m','Opas','person'),('Oma','Omas','f','Oma','person'),('Nachbar','Nachbarn','m','Nachbarn','person'),('Polizist','Polizisten','m','Polizisten','person'),('Sängerin','Sängerinnen','f','Sängerin','person'),
('Maler','Maler','m','Malers','person'),('Verkäuferin','Verkäuferinnen','f','Verkäuferin','person'),('Junge','Jungen','m','Jungen','person'),('Kollege','Kollegen','m','Kollegen','person'),('Trainer','Trainer','m','Trainers','person'),('Pilot','Piloten','m','Piloten','person'),
('Brille','Brillen','f','Brille','ding'),('Kerze','Kerzen','f','Kerze','ding'),('Flasche','Flaschen','f','Flasche','ding'),('Bank','Bänke','f','Bank','ding'),('Wand','Wände','f','Wand','ding'),('Treppe','Treppen','f','Treppe','ding'),('Decke','Decken','f','Decke','ding'),('Karte','Karten','f','Karte','ding'),
('Kissen','Kissen','n','Kissens','ding'),('Messer','Messer','n','Messers','ding'),('Regal','Regale','n','Regals','ding'),('Bett','Betten','n','Bettes','ding'),('Sofa','Sofas','n','Sofas','ding'),('Dach','Dächer','n','Daches','ding'),('Glas','Gläser','n','Glases','ding'),('Licht','Lichter','n','Lichtes','ding'),
('Löffel','Löffel','m','Löffels','ding'),('Teller','Teller','m','Tellers','ding'),('Schrank','Schränke','m','Schranks','ding'),('Rucksack','Rucksäcke','m','Rucksacks','ding'),('Ball','Bälle','m','Balls','ding'),('Koffer','Koffer','m','Koffers','ding'),('Schlüssel','Schlüssel','m','Schlüssels','ding'),
('Wald','Wälder','m','Waldes','ding'),('Berg','Berge','m','Berges','ding'),('See','Seen','m','Sees','ding'),('Bach','Bäche','m','Baches','ding'),('Hut','Hüte','m','Hutes','ding'),('Schal','Schals','m','Schals','ding'),('Mantel','Mäntel','m','Mantels','ding'),('Schuh','Schuhe','m','Schuhs','ding'),
('Hose','Hosen','f','Hose','ding'),('Socke','Socken','f','Socke','ding'),('Torte','Torten','f','Torte','ding'),('Birne','Birnen','f','Birne','ding'),('Banane','Bananen','f','Banane','ding'),('Karotte','Karotten','f','Karotte','ding')]
NOUNS=list({n[0]:n for n in NOUNS}.values())
NB={n[0]:n for n in NOUNS}
def pool(g):return [n for n in NOUNS if n[4]==g]
ADJ=['süss','sauber','dunkel','stark','leicht','jung','rund','lieb','froh','spitz','glatt','krank','klug','ruhig','frech','scharf','klein','gross','schnell','laut','leise','warm','lustig','nass','hell','kalt','weich','neu','alt','freundlich','müde','fleissig','mutig','schön','bunt','schwer']
NAMES=[('Emma','f'),('Luca','m'),('Sara','f'),('Finn','m'),('Zoe','f'),('Elias','m'),('Ella','f'),('Paul','m'),('Lara','f'),('Tim','m'),('Julia','f'),('David','m'),('Anna','f'),('Tom','m'),('Lea','f'),('Ben','m'),('Mia','f'),('Noah','m'),('Nora','f'),('Leo','m'),('Lina','f'),('Jan','m'),('Eva','f'),('Max','m')]
def A(g,case='nom',defn=True):
    if defn:return {'nom':{'m':'der','f':'die','n':'das'},'akk':{'m':'den','f':'die','n':'das'},'dat':{'m':'dem','f':'der','n':'dem'},'gen':{'m':'des','f':'der','n':'des'}}[case][g]
    return {'nom':{'m':'ein','f':'eine','n':'ein'},'akk':{'m':'einen','f':'eine','n':'ein'},'dat':{'m':'einem','f':'einer','n':'einem'},'gen':{'m':'eines','f':'einer','n':'eines'}}[case][g]
def adjend(g,case):
    return 'e' if (case=='nom' or (case=='akk' and g!='m')) else 'en'
def AD(a,e):
    return a+e[1:] if a.endswith('e') and e.startswith('e') else a+e
def NP(n,case='nom',adj=None,defn=True,cap=False):
    sg,pl,g,gen,_=n
    noun=gen if case=='gen' and g!='f' else sg
    if case=='dat' and False:noun=sg
    parts=[A(g,case,defn)]
    if adj:parts.append(AD(adj,(adjend(g,case) if defn else {'m':'er','f':'e','n':'es'}[g] if case=='nom' else adjend(g,case))))
    parts.append(noun)
    s=' '.join(parts)
    return s[0].upper()+s[1:] if cap else s
def NPtok(n,case='nom',adj=None,cap=False):
    sg,pl,g,gen,_=n
    noun=gen if case=='gen' and g!='f' else sg
    t=[(A(g,case),'Artikel')]
    if adj:t.append((AD(adj,adjend(g,case)),'Adjektiv'))
    t.append((noun,'Nomen'))
    if cap:t[0]=(t[0][0].capitalize(),t[0][1])
    return t
# intransitive Verben + passende Adverbien
INTR=[('schläft',['ruhig','tief','lange']),('läuft',['schnell','langsam','weit']),('lacht',['laut','herzlich']),('singt',['leise','schön','laut']),
('spielt',['draussen','gern','lange']),('wartet',['geduldig','ruhig']),('arbeitet',['fleissig','schnell']),('springt',['hoch','weit']),('wohnt',['hier','dort'])]
# transitive: (3. Pers., Subjektgruppen, Objekte)
TRANS=[('isst',['person','tier'],['Apfel','Brot','Kuchen','Suppe']),('liest',['person'],['Buch','Heft']),('malt',['person'],['Bild','Blume','Haus']),
('kauft',['person'],['Tasche','Jacke','Mütze','Heft','Stift','Ball','Velo']),('baut',['person'],['Turm','Haus']),('trägt',['person'],['Tasche','Korb']),
('sieht',['person','tier'],['Hund','Katze','Vogel','Zug','Baum','Auto']),('fängt',['tier'],['Maus','Ball']),('wäscht',['person'],['Jacke','Mütze','Tasse','Auto']),
('öffnet',['person'],['Tür','Fenster','Tasche']),('putzt',['person'],['Fenster','Tisch','Tür']),('zeichnet',['person'],['Bild','Haus','Blume']),('trinkt',['tier'],[])]
TRANS=[x for x in TRANS if x[2]]
LOC=[('liegt',['Hund','Katze','Buch','Ball','Heft','Tasche','Jacke']),('sitzt',['Hund','Katze','Vogel','Kind','Frosch']),('steht',['Tisch','Stuhl','Auto','Lampe','Korb','Baum']),('wartet',['Kind','Hund','Mann','Frau'])]
PREP_PLACES=[('auf','dem Tisch','dem Stuhl','dem Dach','der Wiese'),('unter','dem Tisch','dem Baum','der Bank'),('neben','dem Haus','der Tür','dem Baum'),('hinter','dem Haus','dem Baum','der Tür'),('vor','dem Haus','der Schule','der Tür'),('in','dem Garten','der Schule','der Küche')]
# Verben: (Infinitiv, 3.Sg Praesens, 3.Sg Praeteritum, Partizip II, Hilfsverb, stark?)
VERBS=[('spielen','spielt','spielte','gespielt','hat',0),('lachen','lacht','lachte','gelacht','hat',0),('arbeiten','arbeitet','arbeitete','gearbeitet','hat',0),('warten','wartet','wartete','gewartet','hat',0),
('tanzen','tanzt','tanzte','getanzt','hat',0),('wohnen','wohnt','wohnte','gewohnt','hat',0),('singen','singt','sang','gesungen','hat',1),('laufen','läuft','lief','gelaufen','ist',1),
('schlafen','schläft','schlief','geschlafen','hat',1),('kommen','kommt','kam','gekommen','ist',1),('gehen','geht','ging','gegangen','ist',1),('fahren','fährt','fuhr','gefahren','ist',1),
('schwimmen','schwimmt','schwamm','geschwommen','ist',1),('fliegen','fliegt','flog','geflogen','ist',1),('springen','springt','sprang','gesprungen','ist',1),('bleiben','bleibt','blieb','geblieben','ist',1),
('fallen','fällt','fiel','gefallen','ist',1),('rufen','ruft','rief','gerufen','hat',1)]
VERBS+=[('machen','macht','machte','gemacht','hat',0),('lernen','lernt','lernte','gelernt','hat',0),('kaufen','kauft','kaufte','gekauft','hat',0),('malen','malt','malte','gemalt','hat',0),('suchen','sucht','suchte','gesucht','hat',0),
('fragen','fragt','fragte','gefragt','hat',0),('kochen','kocht','kochte','gekocht','hat',0),('baden','badet','badete','gebadet','hat',0),('tanzen','tanzt','tanzte','getanzt','hat',0),('reisen','reist','reiste','gereist','ist',0),
('wandern','wandert','wanderte','gewandert','ist',0),('rennen','rennt','rannte','gerannt','ist',1),('steigen','steigt','stieg','gestiegen','ist',1),('sitzen','sitzt','sass','gesessen','hat',1),('liegen','liegt','lag','gelegen','hat',1)]
VERBS=list({v[0]:v for v in VERBS}.values())
STRONG=[('sehen','sieht','sah','gesehen','hat',1),('essen','isst','ass','gegessen','hat',1),('trinken','trinkt','trank','getrunken','hat',1),('schreiben','schreibt','schrieb','geschrieben','hat',1),
('lesen','liest','las','gelesen','hat',1),('finden','findet','fand','gefunden','hat',1),('geben','gibt','gab','gegeben','hat',1),('nehmen','nimmt','nahm','genommen','hat',1),
('sprechen','spricht','sprach','gesprochen','hat',1),('helfen','hilft','half','geholfen','hat',1),('werfen','wirft','warf','geworfen','hat',1),('ziehen','zieht','zog','gezogen','hat',1),
('bringen','bringt','brachte','gebracht','hat',1),('denken','denkt','dachte','gedacht','hat',1),('heissen','heisst','hiess','geheissen','hat',1),('treffen','trifft','traf','getroffen','hat',1),
('waschen','wäscht','wusch','gewaschen','hat',1),('tragen','trägt','trug','getragen','hat',1),('fangen','fängt','fing','gefangen','hat',1),('beginnen','beginnt','begann','begonnen','hat',1),
('gewinnen','gewinnt','gewann','gewonnen','hat',1),('schneiden','schneidet','schnitt','geschnitten','hat',1),('brechen','bricht','brach','gebrochen','hat',1)]+[v for v in VERBS if v[5]]
FOOD=['Brot','Milch','Käse','Äpfel','Reis','Eier','Butter','Honig','Nudeln','Tomaten','Zucker','Mehl','Birnen','Joghurt','Salat']
LISTS=[('Ich kaufe {}.',FOOD),('Zum Frühstück gibt es {}.',FOOD),('Im Zoo sehen wir {}.',['Löwen','Affen','Elefanten','Zebras','Bären','Giraffen','Pinguine']),
('Im Rucksack habe ich {}.',['ein Heft','einen Stift','einen Apfel','eine Flasche','ein Lineal','eine Jacke']),('Im Garten blühen {}.',['Rosen','Tulpen','Nelken','Veilchen','Narzissen']),
('Meine Schwester ist {}.',['freundlich','klug','mutig','lustig','hilfsbereit','geduldig']),('Am Wochenende wollen wir {}.',['schwimmen','wandern','lesen','spielen','baden','tanzen']),
('In der Pause spielen wir {}.',['Fussball','Fangen','Verstecken','Seilspringen','Tischtennis']),('Auf dem Hof leben {}.',['Hühner','Kühe','Schafe','Pferde','Enten','Katzen']),
('In meinem Zimmer stehen {}.',['ein Bett','ein Tisch','ein Stuhl','ein Regal','eine Lampe'])]
LISTS+=[('Auf dem Markt gibt es {}.',['Gemüse','Obst','Fisch','Blumen','Eier','Honig','Käse','Brot','Kräuter']),('In der Schule brauche ich {}.',['ein Heft','einen Bleistift','ein Lineal','einen Radiergummi','eine Schere','einen Kleber','ein Etui']),
('Im Wald sehen wir {}.',['Rehe','Hasen','Füchse','Eichhörnchen','Vögel','Pilze','Käfer','Ameisen']),('Zum Geburtstag wünsche ich mir {}.',['ein Buch','ein Velo','einen Ball','ein Spiel','eine Uhr','Farbstifte']),
('Im Sommer machen wir {}.',['Ausflüge','Picknicks','Spiele','Radtouren','Wanderungen','Feste']),('Im Winter tragen wir {}.',['Mützen','Schals','Handschuhe','Jacken','Stiefel','Pullover']),
('Meine Oma backt {}.',['Kuchen','Brot','Zopf','Kekse','Torten','Brötchen']),('Am See kann man {}.',['schwimmen','baden','fischen','segeln','spielen','picknicken']),
('Im Zirkus gibt es {}.',['Clowns','Pferde','Artisten','Zauberer','Löwen','Seiltänzer']),('Auf dem Spielplatz gibt es {}.',['eine Rutsche','eine Schaukel','einen Sandkasten','eine Wippe','ein Klettergerüst']),
('Der Bus ist {}.',['gelb','gross','laut','voll','schnell','neu','sauber']),('Im Schrank liegen {}.',['Hosen','Pullover','Socken','Hemden','Schals','Mützen']),('In der Küche stehen {}.',['Töpfe','Pfannen','Teller','Tassen','Gläser','Schüsseln']),
('Zum Frühstück trinke ich {}.',['Milch','Tee','Kakao','Wasser','Saft']),('Auf der Wiese blühen {}.',['Margeriten','Löwenzahn','Klee','Glockenblumen','Mohn']),('Im Zimmer hängen {}.',['Bilder','Poster','Lampen','Uhren','Sterne'])]
# Hauptsatz + Konjunktion + Hauptsatz
HS=[('Wir wollten spielen','aber','es regnete'),('Anna ist müde','denn','sie hat schlecht geschlafen'),('Tom mag Fussball','aber','er spielt lieber Tennis'),('Ich komme heute nicht','denn','ich bin krank'),
('Der Hund bellt laut','aber','die Katze schläft weiter'),('Mia lernt viel','denn','morgen ist ein Test'),('Wir gehen nicht schwimmen','sondern','wir bleiben zu Hause'),('Ben hat Hunger','doch','im Kühlschrank ist nichts'),
('Lea liest gern','aber','sie hat heute keine Zeit'),('Der Zug fährt ab','denn','es ist schon spät'),('Ich möchte ein Eis','aber','ich habe kein Geld dabei'),('Wir fahren nicht mit dem Bus','sondern','wir gehen zu Fuss'),
('Nora singt schön','doch','sie hat Angst vor dem Auftritt'),('Das Wetter ist schlecht','aber','wir gehen trotzdem hinaus'),('Er rennt schnell','denn','er will den Zug erreichen'),('Der Kuchen riecht gut','aber','er ist noch heiss'),
('Die Kinder lachen','denn','der Clown ist lustig'),('Ich helfe dir gern','aber','ich habe wenig Zeit'),('Das Buch ist spannend','doch','es ist sehr dick'),('Wir bleiben nicht lange','sondern','wir gehen bald heim'),
('Leo ist klein','aber','er läuft sehr schnell'),('Ich ziehe eine Jacke an','denn','es ist kalt'),('Die Sonne scheint','aber','es weht ein kalter Wind'),('Eva malt ein Bild','denn','sie schenkt es ihrer Oma')]
# Hauptsatz + Nebensatz: (Hauptsatz, Konjunktion, Nebensatz, Art, Stellung 'nach'/'vor')
NS=[('Wir bleiben zu Hause','weil','es regnet','Kausalsatz'),('Anna lacht','weil','der Film lustig ist','Kausalsatz'),('Tom ist müde','weil','er spät ins Bett ging','Kausalsatz'),
('Der Hund bellt','weil','ein Fremder kommt','Kausalsatz'),('Ich lerne viel','weil','morgen ein Test ist','Kausalsatz'),('Wir gehen schwimmen','wenn','die Sonne scheint','Konditionalsatz'),
('Ich helfe dir','wenn','du Hilfe brauchst','Konditionalsatz'),('Du kannst einen Apfel essen','wenn','du Hunger hast','Konditionalsatz'),('Wir bleiben zu Hause','wenn','es regnet','Konditionalsatz'),
('Ich rufe dich an','wenn','ich Zeit habe','Konditionalsatz'),('Wir waschen die Hände','bevor','wir essen','Temporalsatz'),('Anna liest ein Buch','während','der Hund schläft','Temporalsatz'),
('Wir spielen','bis','es dunkel wird','Temporalsatz'),('Ich gehe heim','sobald','die Schule aus ist','Temporalsatz'),('Wir gingen hinaus','nachdem','es aufgehört hatte zu regnen','Temporalsatz'),
('Wir gehen spazieren','obwohl','es kalt ist','Konzessivsatz'),('Anna lacht','obwohl','sie traurig ist','Konzessivsatz'),('Tom spielt draussen','obwohl','es regnet','Konzessivsatz'),
('Er machte die Hausaufgaben','obwohl','er müde war','Konzessivsatz'),('Alle kamen','obwohl','das Wetter schlecht war','Konzessivsatz'),('Ich lerne','damit','ich gute Noten bekomme','Finalsatz'),
('Wir stehen früh auf','damit','wir den Zug erreichen','Finalsatz'),('Sie spart Geld','damit','sie ein Velo kaufen kann','Finalsatz'),('Der Lehrer erklärt es noch einmal','damit','alle es verstehen','Finalsatz'),
('Ich schreibe es auf','damit','ich es nicht vergesse','Finalsatz'),('Ich weiss','dass','du recht hast','Dass-Satz'),('Er sagt','dass','er müde ist','Dass-Satz'),('Wir hoffen','dass','die Sonne scheint','Dass-Satz'),
('Sie glaubt','dass','der Zug Verspätung hat','Dass-Satz'),('Ich finde','dass','der Film gut war','Dass-Satz')]
REL=[('Das Buch','das ich lese','ist spannend'),('Der Mann','der dort steht','ist mein Onkel'),('Die Katze','die auf dem Dach sitzt','gehört uns'),('Das Kind','das lacht','heisst Mia'),('Die Tasche','die ich gekauft habe','ist rot'),
('Der Hund','der im Garten spielt','heisst Bello'),('Die Frau','die dort wartet','ist meine Lehrerin'),('Das Auto','das vor dem Haus steht','gehört meinem Vater')]
AKTPAS=[('Der Koch kocht die Suppe.','Die Suppe wird vom Koch gekocht.','kochen'),('Die Mutter backt einen Kuchen.','Ein Kuchen wird von der Mutter gebacken.','backen'),
('Der Gärtner giesst die Blumen.','Die Blumen werden vom Gärtner gegossen.','giessen'),('Die Lehrerin liest eine Geschichte.','Eine Geschichte wird von der Lehrerin gelesen.','lesen'),
('Der Bäcker backt das Brot.','Das Brot wird vom Bäcker gebacken.','backen'),('Die Kinder malen ein Bild.','Ein Bild wird von den Kindern gemalt.','malen'),
('Der Vater wäscht das Auto.','Das Auto wird vom Vater gewaschen.','waschen'),('Die Schüler lösen die Aufgabe.','Die Aufgabe wird von den Schülern gelöst.','lösen'),
('Der Maler streicht die Wand.','Die Wand wird vom Maler gestrichen.','streichen'),('Die Katze fängt die Maus.','Die Maus wird von der Katze gefangen.','fangen'),
('Die Nachbarin pflegt den Garten.','Der Garten wird von der Nachbarin gepflegt.','pflegen'),('Der Arzt untersucht das Kind.','Das Kind wird vom Arzt untersucht.','untersuchen'),
('Die Schwester deckt den Tisch.','Der Tisch wird von der Schwester gedeckt.','decken'),('Der Hund bewacht das Haus.','Das Haus wird vom Hund bewacht.','bewachen'),
('Die Oma strickt eine Mütze.','Eine Mütze wird von der Oma gestrickt.','stricken'),('Der Lehrer korrigiert die Hefte.','Die Hefte werden vom Lehrer korrigiert.','korrigieren'),
('Die Feuerwehr löscht das Feuer.','Das Feuer wird von der Feuerwehr gelöscht.','löschen'),('Die Freundin schickt einen Brief.','Ein Brief wird von der Freundin geschickt.','schicken')]
NOM=[('Beim Lesen vergeht die Zeit schnell.','Lesen'),('Das Schwimmen macht mir Spass.','Schwimmen'),('Im Sommer gehen wir zum Baden.','Baden'),('Er hat Angst vor dem Fliegen.','Fliegen'),
('Zum Kochen braucht man Zeit.','Kochen'),('Das Lernen fällt mir leicht.','Lernen'),('Beim Essen spricht man nicht.','Essen'),('Ich freue mich auf das Wandern.','Wandern'),
('Das Tanzen macht ihr Freude.','Tanzen'),('Zum Schreiben nehme ich einen Stift.','Schreiben'),('Beim Malen vergisst sie die Zeit.','Malen'),('Das Rennen ist sehr anstrengend.','Rennen'),
('Beim Aufräumen helfen alle mit.','Aufräumen'),('Vor dem Schlafen putze ich die Zähne.','Schlafen'),('Das Singen im Chor gefällt mir.','Singen'),('Zum Backen brauchst du Mehl.','Backen'),
('Im Sport lernen wir das Werfen.','Werfen'),('Beim Spielen lachen wir viel.','Spielen'),('Das Zeichnen ist mein Hobby.','Zeichnen'),('Zum Lesen setze ich mich ans Fenster.','Lesen')]
ADJN=[('Das Beste kommt zum Schluss.','Beste'),('Ich wünsche dir alles Gute.','Gute'),('Er hat etwas Neues gekauft.','Neues'),('Sie erzählt nichts Besonderes.','Besonderes'),
('Das Schönste war der Ausflug.','Schönste'),('Wir sahen viel Interessantes.','Interessantes'),('Im Dunkeln habe ich Angst.','Dunkeln'),('Alles Liebe zum Geburtstag.','Liebe')]
KONJ=[('Anna sagt: «Ich bin müde.»','Anna sagt, sie sei müde.','Anna sagt, sie ist müde.'),('Tom sagt: «Ich habe Hunger.»','Tom sagt, er habe Hunger.','Tom sagt, er hat Hunger.'),
('Lea sagt: «Ich gehe nach Hause.»','Lea sagt, sie gehe nach Hause.','Lea sagt, sie geht nach Hause.'),('Ben sagt: «Ich komme später.»','Ben sagt, er komme später.','Ben sagt, er kommt später.'),
('Mia sagt: «Ich kann schwimmen.»','Mia sagt, sie könne schwimmen.','Mia sagt, sie kann schwimmen.'),('Noah sagt: «Ich will ein Eis.»','Noah sagt, er wolle ein Eis.','Noah sagt, er will ein Eis.'),
('Nora sagt: «Ich muss lernen.»','Nora sagt, sie müsse lernen.','Nora sagt, sie muss lernen.'),('Leo sagt: «Ich weiss die Antwort.»','Leo sagt, er wisse die Antwort.','Leo sagt, er weiss die Antwort.'),
('Die Lehrerin sagt: «Ich lese eine Geschichte vor.»','Die Lehrerin sagt, sie lese eine Geschichte vor.','Die Lehrerin sagt, sie liest eine Geschichte vor.'),
('Der Vater sagt: «Ich arbeite heute länger.»','Der Vater sagt, er arbeite heute länger.','Der Vater sagt, er arbeitet heute länger.'),
('Die Mutter sagt: «Ich bin zu Hause.»','Die Mutter sagt, sie sei zu Hause.','Die Mutter sagt, sie ist zu Hause.'),('Der Trainer sagt: «Ich habe einen Plan.»','Der Trainer sagt, er habe einen Plan.','Der Trainer sagt, er hat einen Plan.')]
KONJ2=[('Wenn ich reich ___, kaufte ich ein Schloss.','wäre',['bin','war','sei']),('Wenn ich Zeit ___, käme ich mit.','hätte',['habe','hatte','hat']),('Wenn es nicht regnen ___, gingen wir hinaus.','würde',['wird','wurde','werde']),
('Wenn er fliegen ___, wäre er ein Vogel.','könnte',['kann','konnte','könne']),('Ich ___ gern ein Hund, dann könnte ich den ganzen Tag spielen.','wäre',['bin','sei','war']),('Wenn wir mehr Geld ___, würden wir reisen.','hätten',['haben','hatten','hat']),
('Wenn sie früher aufstünde, ___ sie den Zug.','erreichte',['erreicht','erreichen','erreiche']),('Wenn du mir helfen ___, wäre ich froh.','würdest',['wirst','wurdest','werdest'])]
SATZ_Q=['Wo wohnt {n}?','Wann kommt {n}?','Hast du {a} {x}?','Wer hat {a} {x}?','Wie heisst {a} {x}?','Kommst du heute mit?','Spielst du gern Fussball?','Was machst du am Wochenende?','Warum bist du so müde?','Wohin geht ihr?','Magst du Schokolade?','Wer kommt mit?']
SATZ_E=['Achtung, ein Auto kommt!','Pass auf!','Komm schnell her!','Halt!','Lauf, so schnell du kannst!','Sei leise!','Hör mir bitte zu!','Mach sofort das Licht aus!','Hilfe, es brennt!','Wie schön das ist!','Stopp, nicht weiterlaufen!','Warte auf mich!','Vorsicht, das Eis ist glatt!','Schau, ein Regenbogen!']

_DK="Sonne Tasse Mutter Treppe Koffer Puppe Wetter Schiff Mittag Sommer Ball Tonne Fall kommen Tanne Wasser Bett Mitte Futter Kette Rolle Pfanne Messer Butter Hammer Himmel Teller Löffel Zettel Wolle Brille Kanne Hütte Affe Schüssel Kasse Mappe Rennen Wille Qualle Teppich Zimmer Mann Kamm Schlüssel Bürste Tomate".split()
_IE="Biene Tier Wiese Fliege Liebe Spiel Ziege Brief Ziel Riese Krieg Wiege Dieb Lied Spiegel Ziegel Fieber Frieden Bier Wiesel Zwiebel Stiefel Tiger Schiene Sieger Fliegen Biegen Zügel Wiederholen Liegen Lieber Tiere Lieder Sieben Dienstag Spielplatz Familie Ziegen Papier".split()
_DH="Bahn Zahl Uhr Sohn Wahl Kuh Huhn Stuhl Wohnung Fahrrad Lehrer Mühle Zahn Hahn Reh Fehler Schuh Mohn Nahrung Ohr Jahr Bohne Fahne Lohn Zehe Sahne Mehl Strahl Ruhe Höhle Gefühl Zahlen Fahren Wohnen Lehren Mehr Sehr Fahrer Zähne Söhne Kühe Jahre Ohren Uhren".split()
_DV="Boot Meer Haar Moos Saal Tee See Paar Schnee Beere Waage Zoo Aal Klee Kaffee Idee Fee Beet Seele Armee Allee Staat Speer Heer Leere Boote Meere Haare Seen Paare Beete Seelen Waagen Zoos Ideen Säle Staaten".split()
def _mk(words,fn):
    out=[]
    for w in words:
        wr=fn(w)
        if wr and wr!=w:out.append((w,wr))
    return out
import re as _re
def _dk(w):
    m=_re.search(r'([bdfgklmnprstz])\1',w,_re.I)
    return w[:m.start()]+w[m.start()]+w[m.end():] if m else None
def _ie(w):return w.replace('ie','i',1) if 'ie' in w and w not in('Familie',) else None
def _dh(w):
    m=_re.search(r'[aeiouäöü]h',w);return w[:m.start()+1]+w[m.end():] if m else None
def _dv(w):
    m=_re.search(r'([aeoö])\1',w);return w[:m.start()]+w[m.start()]+w[m.end():] if m else None
LANGV={'Doppelter Konsonant':_mk(_DK,_dk),'ie':_mk(_IE,_ie),'Dehnungs-h':_mk(_DH,_dh),'Doppelter Vokal':_mk(_DV,_dv)}
ABC_POOLS=[['Rose','Reh','Regen','Rucksack','Rutsche','Rock'],['Garten','Gabel','Gans','Glas','Gurke','Geige'],['Nuss','Nase','Nadel','Nest','Nudel'],['Pilz','Puppe','Pinsel','Pferd','Pfanne'],['Wald','Wolke','Wurst','Wiese','Wolf','Wand'],['Lampe','Leiter','Löffel','Löwe','Licht'],['Dach','Dose','Dorf','Drache','Delfin'],['Apfel','Affe','Ameise','Auto','Ast'],['Zahn','Zebra','Zelt','Ziege','Zimmer'],['Vogel','Vase','Veilchen','Velo','Vater'],['Eis','Ente','Esel','Eimer','Elefant'],['Baum','Ball','Bild','Blume','Brot','Bruder','Buch'],['Schule','Schaf','Schwester','Schüler','Spiel','Stift','Stuhl','Suppe'],['Tasche','Tasse','Tisch','Tür','Turm'],['Katze','Kind','Kuchen','Kuh','Korb'],
['Hund','Haus','Heft','Hase','Huhn'],['Maus','Mann','Mutter','Mütze','Mädchen'],['Fisch','Fenster','Frau','Frosch','Freundin']]
def _k(w):return w.lower().replace('ä','a').replace('ö','o').replace('ü','u')
# ---------------------------------------------------------------- Satzbausteine
def s_intr(r,adjp=0.6):
    n=r.choice(pool('person')+pool('tier'));v,advs=r.choice(INTR);adv=r.choice(advs)
    adj=r.choice(ADJ) if r.random()<adjp else None
    tok=NPtok(n,'nom',adj,cap=True)+[(v,'Verb'),(adv,'Adverb')]
    return tok
def s_trans(r,adjp=0.5):
    v,sg,objs=r.choice(TRANS);sn=r.choice([x for g in sg for x in pool(g)]);on=NB[r.choice(objs)]
    if sn[0]==on[0]:return s_trans(r,adjp)
    a1=r.choice(ADJ) if r.random()<adjp else None;a2=r.choice(ADJ) if r.random()<adjp else None
    return NPtok(sn,'nom',a1,cap=True)+[(v,'Verb')]+NPtok(on,'akk',a2)
def s_loc(r,adjp=0):
    v,ns=r.choice(LOC);n=NB[r.choice(ns)];pre=r.choice(PREP_PLACES);pp=r.choice(pre[1:])
    adj=r.choice(ADJ) if r.random()<.5 else None
    return NPtok(n,'nom',adj,cap=True)+[(v,'Verb'),(pre[0],'Präposition')]+[(pp.split()[0],'Artikel'),(pp.split()[1],'Nomen')]
def s_pron(r):
    nm,g=r.choice(NAMES);pr={'f':'Sie','m':'Er'}[g];v,advs=r.choice(INTR)
    return [(pr,'Pronomen'),(v,'Verb'),(r.choice(advs),'Adverb')]
def text(tok):return ' '.join(w for w,_ in tok)+'.'
def lowernouns(tok,first=True):
    out=[]
    for i,(w,p) in enumerate(tok):
        out.append(w.lower() if (p=='Nomen' or (i==0 and first)) else w)
    return ' '.join(out)+'.'
def sent_gen(r,kinds=('i','t','l')):
    k=r.choice(kinds)
    return {'i':s_intr,'t':s_trans,'l':s_loc}[k](r)
def umlaut(w):
    for a,b in (('au','äu'),('a','ä'),('o','ö'),('u','ü')):
        i=w.rfind(a)
        if i>=0 and (a!='a' or w.rfind('au')!=i-0 or True):
            if a=='a' and w.endswith('au'):continue
            return w[:i]+b+w[i+len(a):]
    return w
def MC(t,lvl,q,a,wrong,hint=None,why=None):
    w=[x for x in dict.fromkeys(wrong) if x!=a]
    if not w:return False
    return t.mc(lvl,q,a,w[:3],hint,why)
def rr(t):return random.Random(sum(ord(c)*(i+3) for i,c in enumerate(t.t['id'])))
def cls_of(t):return int(t.t['id'].split('-')[0][2:])
def fam(t):return t.t['id'].split('-',2)[2]
# ---------------------------------------------------------------- Familien
def f_wortarten(t,r):
    k=cls_of(t);f=fam(t)
    cats=['Nomen','Verb','Adjektiv'] if f=='nva' else ['Nomen','Verb','Adjektiv','Pronomen'] if k<=4 else ['Nomen','Verb','Adjektiv','Pronomen','Präposition','Konjunktion']
    n=0;tries=0
    while n<70 and tries<600:
        tries+=1
        c=r.choice(cats)
        if f=='nva':
            if r.random()<.5:
                nn=r.choice(NOUNS);ad=r.choice(ADJ);vv=r.choice(['ist','war','bleibt'])
                tok=[(A(nn[2],'nom'),'Artikel'),(nn[0],'Nomen'),(vv,'Verb'),(ad,'Adjektiv')];tok[0]=(tok[0][0].capitalize(),'Artikel')
            else:
                tok=s_intr(r,1.0)
        elif c=='Pronomen':tok=s_pron(r)
        elif c=='Präposition':tok=s_loc(r)
        elif c=='Konjunktion':
            m,cj,sb,_=r.choice(NS);tok=[(w,'Nomen' if False else 'Konjunktion' if w==cj else '') for w in (m+' '+cj+' '+sb).split()]
            txt=m+', '+cj+' '+sb+'.';words=[w for w in (m+' '+cj+' '+sb).split() if w==cj];
            if t.mc(1 if k<=5 else 2,txt+'\nWelche Wortart hat «%s»?'%cj,'Konjunktion',['Nomen','Verb','Pronomen'] if k<=6 else ['Nomen','Verb','Präposition'],'Konjunktionen verbinden Sätze.',None):n+=1
            continue
        else:tok=sent_gen(r,('i','t','l'))
        cand=[(w,p) for w,p in tok if p==c]
        if not cand:continue
        w,p=r.choice(cand)
        wrong=[x for x in cats if x!=c];r.shuffle(wrong)
        if t.mc(1 if k<=4 else 2,text(tok)+'\nWelche Wortart hat «%s»?'%w,c,wrong[:3],'Prüfe: Kannst du das Wort verändern? Was sagt es aus?',None):n+=1
    for _ in range(26):
        tok=sent_gen(r,('i','t','l'));a=text(tok);b=lowernouns(tok)
        if b!=a:t.fix(2,'Schreibe die Nomen und den Satzanfang gross. Verbessere im Feld.',b,a,'Nomen schreibt man gross.')
    # mehrere antippen
    for _ in range(6):
        tok=sent_gen(r,('i','t'));g=r.choice(['Nomen','Verb'] if f=='nva' else ['Nomen','Verb','Adjektiv'])
        right=[w for w,p in tok if p==g]
        wrong=[w for w,p in tok if p!=g and p not in('Adverb',)]
        if len(right)>=1 and len(wrong)>=2 and g!='Verb' or (g=='Verb' and wrong):
            if len(right)>=1 and len(wrong)>=2:
                t.multi(2,text(tok)+'\nTippe alle %s an.'%({'Nomen':'Nomen','Verb':'Verben','Adjektiv':'Adjektive'}[g]),right,wrong[:4-len(right)] if len(right)<3 else wrong[:2],'Prüfe jedes Wort einzeln.',None)
def f_pronomen(t,r):
    n=0;tries=0
    while n<60 and tries<600:
        tries+=1;x=r.random()
        if x<.45:
            nn=r.choice(pool('person')+pool('tier')+pool('ding'));g=nn[2];adv=r.choice(['ist müde','ist nett','ist gross','ist neu','ist alt','schläft']) if nn[4]!='ding' else r.choice(['ist neu','ist alt','ist gross','ist klein'])
            ans={'m':'Er','f':'Sie','n':'Es'}[g]
            s1=NP(nn,'nom',cap=True)+' '+('steht dort.' if nn[4]=='ding' else 'ist da.')
            if t.mc(1,s1+' ___ '+adv.split(' ',1)[0]+' '+(adv.split(' ',1)[1] if ' ' in adv else '')+'.\nWelches Pronomen passt in die Lücke?',ans,[w for w in ['Er','Sie','Es','Wir','Ihr'] if w!=ans],'Wofür steht das Nomen: der, die oder das?',None):n+=1
        elif x<.58:
            nn=r.choice(pool('person')+pool('tier'));g=nn[2];ans={'m':'Er','f':'Sie','n':'Es'}[g];bad={'m':'Sie','f':'Er','n':'Er'}[g]
            if t.fix(2,'Ersetze das Nomen durch ein Pronomen. Verbessere im Feld.',NP(nn,'nom',cap=True)+' schläft. '+bad+' ist müde.',NP(nn,'nom',cap=True)+' schläft. '+ans+' ist müde.','Der, die oder das? Er, sie oder es?'):n+=1
        elif x<.7:
            nm,g=r.choice(NAMES);ob=r.choice(pool('tier')+pool('ding'))
            ans={'m':'sein','f':'ihr'}[g];wr=[w for w in ['sein','ihr','mein','dein','unser'] if w!=ans]
            if t.mc(2,'Das ist %s. Das ist ___ %s.\nWelches Wort passt in die Lücke?'%(nm,ob[0]),ans,wr,'%s ist %s.'%(nm,'ein Junge' if g=='m' else 'ein Mädchen'),None):n+=1
        elif x<.85:
            pl=r.choice(['Die Kinder','Die Katzen','Die Hunde','Die Lehrer','Die Mädchen','Meine Freunde']);v=r.choice(['spielen','lachen','warten','singen','schlafen'])
            if t.mc(1,'%s %s. ___ haben Spass.\nWelches Pronomen passt in die Lücke?'%(pl,v),'Sie',['Er','Es','Du'],'Mehrere Kinder, Tiere oder Dinge: sie.',None):n+=1
        else:
            w,c=r.choice([('Mein','Begleiter'),('Dein','Begleiter'),('Unser','Begleiter'),('Sein','Begleiter'),('Ihr','Begleiter'),('Er','Stellvertreter'),('Sie','Stellvertreter'),('Wir','Stellvertreter'),('Ich','Stellvertreter'),('Du','Stellvertreter')])
            nn=r.choice(NOUNS)
            s=(w+' '+nn[0]+' ist da.') if c=='Begleiter' and w not in('Unser',) and nn[2]!='f' else (w+'e '+nn[0]+' ist da.') if c=='Begleiter' and nn[2]=='f' else (w+' '+nn[0]+' ist da.') if c=='Begleiter' else w+' '+r.choice(['lacht','singt','schläft','wartet'])+'.'
            if c=='Begleiter' and nn[2]=='f':s=w+'e '+nn[0]+' ist da.' if w!='Ihr' else 'Ihre '+nn[0]+' ist da.'
            if t.mc(2,s+'\nIst «%s» ein Begleiter oder ein Stellvertreter?'%w,c,['Stellvertreter' if c=='Begleiter' else 'Begleiter'],'Ein Begleiter steht vor einem Nomen. Ein Stellvertreter ersetzt es.',None):n+=1
def f_mehrzahl(t,r):
    n=0
    for nn in r.sample(NOUNS,len(NOUNS)):
        sg,pl,g,gen,_=nn
        cands=[sg+'e',sg+'en',sg+'n',sg+'s',sg+'er',umlaut(sg)+'e',umlaut(sg)+'er',umlaut(sg),sg]
        wr=[c for c in dict.fromkeys(cands) if c!=pl and c!=gen and not(c==sg and sg!=pl and False)]
        wr=[c for c in wr if 'ee' not in c and not c.endswith('ene') and not c.endswith('ns') and not c.endswith('es') and not c.endswith('ner') and not c.endswith('en'+'n')]
        if len(wr)<2:wr+= [sg+'s',sg+'n']
        if sg==pl:wr=[c for c in wr if c!=sg]
        r.shuffle(wr)
        if MC(t,1 if n%3 else 2,'Wie heisst die Mehrzahl von «%s %s»?'%(A(g,'nom'),sg),pl,wr,'Die Mehrzahl hat oft eine andere Endung oder einen Umlaut.'):n+=1
        if n%2==0 and sg!=pl:
            fr=r.choice(['Ich sehe {} {}.','Auf dem Bild sind {} {}.','Dort stehen {} {}.','Im Zimmer sind {} {}.'])
            num=r.choice(['zwei','drei','vier','viele','fünf'])
            if nn[4]=='person' and nn[0] in('Kind',) :pass
            t.fix(2,'Verbessere direkt im Feld.',fr.format(num,sg),fr.format(num,pl),'Nach «%s» steht die Mehrzahl.'%num)
        if nn[1]!=nn[0] and r.random()<.5:
            MC(t,2,'Wie heisst die Einzahl von «die %s»?'%pl,sg,[x for x in [pl+'s',pl+'n',pl[:-2] if pl.endswith('en') else pl+'er',umlaut(pl)] if x!=sg and 'ee' not in x],'Überlege: Wie heisst nur ein Einziges?')
def f_gross(t,r):
    n=0;tries=0
    while n<46 and tries<400:
        tries+=1;tok=sent_gen(r,('i','t','l'));a=text(tok)
        mode=r.random()
        if mode<.5:p=lowernouns(tok)
        elif mode<.8:p=' '.join([w.lower() if ps=='Nomen' else w for w,ps in tok])+'.'
        else:p=a[0].lower()+a[1:]
        if p!=a and t.fix(2,'Schreibe den Satz richtig: Gross oder klein?',p,a,'Satzanfang und Nomen schreibt man gross.'):n+=1
    for _ in range(14):
        nn=r.choice(NOUNS);MC(t,1,'Wie schreibt man das Wort richtig? (%s)'%(('Namenwort') ),nn[0],[nn[0].lower()],'Nomen schreibt man gross.')
def f_zeit(t,r):
    k=cls_of(t);f=fam(t);n=0;tries=0
    tenses=['Präsens','Präteritum','Perfekt']+(['Plusquamperfekt','Futur I'] if (k>=5 or f=='plusquam') else [])
    def form(v,nm,te):
        inf,pr,pt,pp,aux,_=v
        return {'Präsens':'%s %s heute.'%(nm,pr),'Präteritum':'%s %s gestern.'%(nm,pt),'Perfekt':'%s %s gestern %s.'%(nm,'ist' if aux=='ist' else 'hat',pp),
                'Plusquamperfekt':'%s %s vorher %s.'%(nm,'war' if aux=='ist' else 'hatte',pp),'Futur I':'%s wird morgen %s.'%(nm,inf)}[te]
    while n<60 and tries<800:
        tries+=1;v=r.choice(VERBS);nm=r.choice(NAMES)[0];te=r.choice(tenses);x=r.random()
        if x<.45:
            if t.mc(1 if te in tenses[:3] else 2,form(v,nm,te)+'\nIn welcher Zeitform steht der Satz?',te,[z for z in tenses if z!=te],'Achte auf das Verb und auf Wörter wie «heute», «gestern», «vorher», «morgen».',None):n+=1
        elif x<.7:
            te2=r.choice(tenses[:3]);ans=form(v,nm,te2).split()
            core={'Präsens':v[1],'Präteritum':v[2],'Perfekt':('ist ' if v[4]=='ist' else 'hat ')+v[3]}[te2]
            wr=[v[1],v[2],('ist ' if v[4]=='ist' else 'hat ')+v[3],'ge'+v[0][:-2]+'t' if v[5] else v[0]]
            if t.mc(2,'%s ___ gestern. (%s)\nWelche Form passt? Verb: «%s»'%(nm,te2,v[0]) if te2!='Präsens' else '%s ___ heute. (Präsens)\nWelche Form passt? Verb: «%s»'%(nm,v[0]),core,[w for w in wr if w!=core],'Bilde die Form des Verbs.',None):n+=1
        elif x<.85:
            te2=r.choice(['Präteritum','Perfekt']);good=form(v,nm,te2)
            bad={'Präteritum':'%s %s gestern.'%(nm,v[1]),'Perfekt':'%s %s gestern %s.'%(nm,v[1],'' ) if False else '%s %s gestern.'%(nm,v[1])}[te2]
            if te2=='Perfekt':bad='%s gestern %s.'%(nm,v[3])
            if bad!=good and t.fix(2,'Schreibe den Satz in der Zeitform %s. Verbessere im Feld.'%te2,bad,good,'Bilde die Form %s.'%te2):n+=1
        else:
            if v[5]:
                wrongpp='ge'+v[1][:-1]+'t' if v[1].endswith('t') else 'ge'+v[1]+'t'
                if v[4]=='ist':
                    pre='%s hat gestern %s.'%(nm,v[3]);a='%s ist gestern %s.'%(nm,v[3])
                else:
                    pre='%s hat gestern %s.'%(nm,wrongpp);a='%s hat gestern %s.'%(nm,v[3])
                if pre!=a and t.fix(2,'Verbessere direkt im Feld.',pre,a,'Starke Verben bilden das Partizip II unregelmässig.'):n+=1
def f_alphabet(t,r):
    k=cls_of(t);n=0;tries=0
    words=[x[0] for x in NOUNS if x[0][0] not in 'ÄÖÜ']
    while n<60 and tries<800:
        tries+=1;x=r.random()
        if k>=4 and x<.5:
            pl=r.choice(ABC_POOLS);ws=r.sample(pl,min(r.choice([4,5,5,6]),len(pl)))
        else:ws=r.sample(words,r.choice([4,5,5,6]))
        so=sorted(ws,key=_k)
        if x<.3:
            if MC(t,1 if k<4 else 2,'Welches Wort kommt im Alphabet zuerst?\n'+', '.join(ws) if False else 'Welches Wort kommt im Alphabet zuerst: '+', '.join(ws)+'?',so[0],so[1:],'Schau auf den ersten Buchstaben%s.'%(' und dann auf den zweiten' if k>=4 else '')):n+=1
        elif x<.55:
            if MC(t,1 if k<4 else 2,'Welches Wort kommt im Alphabet zuletzt: '+', '.join(ws)+'?',so[-1],so[:-1],'Der letzte Buchstabe im Alphabet ist ganz hinten.'):n+=1
        elif x<.8:
            if t.fix(2,'Ordne die Wörter nach dem Alphabet. Schreibe sie mit Komma.',', '.join(ws),', '.join(so),'Vergleiche Buchstabe für Buchstabe.'):n+=1
        else:
            if len(so)>=3 and MC(t,2,'Welches Wort steht im Alphabet zwischen «%s» und «%s»?'%(so[0],so[2]),so[1],[w for w in words if _k(w)<_k(so[0]) or _k(w)>_k(so[2])][:3],'Es kommt nach dem ersten und vor dem zweiten.'):n+=1
def f_langvokal(t,r):
    items=[(w,wr,c) for c,l in LANGV.items() for w,wr in r.sample(l,min(len(l),24))];r.shuffle(items);cats=list(LANGV)
    for i,(w,wr,c) in enumerate(items):
        t.fix(2,'Verbessere direkt im Feld.',wr,w,'Regel: '+c+'.')
        MC(t,1,'Wie schreibt man es richtig?',w,[wr],'Denke an die Regel: Wie ist der Vokal? lang oder kurz?')
        if i%2==0:MC(t,2,'Welche Regel gilt bei «%s»?'%w,c,[x for x in cats if x!=c],'Sprich das Wort: Ist der Vokal lang oder kurz?')
def f_stamm(t,r):
    n=0
    for v in r.sample(STRONG,len(STRONG)):
        inf,pr,pt,pp,aux,_=v
        w1=['ge'+inf[:-2]+'t','ge'+inf,'ge'+pr[:-1] if pr.endswith('t') else 'ge'+pr+'t']
        if MC(t,2,'Wie heisst das Partizip II von «%s»?'%inf,pp,w1,'Starke Verben verändern oft den Vokal im Stamm.'):n+=1
        w2=[inf[:-2]+'te',pr,inf[:-2]+'t']
        MC(t,2,'Wie heisst das Präteritum von «%s» (er/sie/es)?'%inf,pt,w2,'Das Präteritum ist oft unregelmässig.')
        nm=r.choice(NAMES)[0]
        t.inp(2,'Schreibe das Partizip II von «%s».'%inf,pp,'Der Stamm ändert sich.')
        wrong='ge'+(pr[:-1] if pr.endswith('t') else pr)+'t'
        if wrong!=pp:t.fix(2,'Verbessere direkt im Feld.','%s %s gestern %s.'%(nm,'ist' if aux=='ist' else 'hat',wrong),'%s %s gestern %s.'%(nm,aux,pp),'Das ist ein starkes Verb.')
def f_satzz(t,r):
    n=0;tries=0
    while n<60 and tries<900:
        tries+=1;x=r.random()
        if x<.4:
            tok=sent_gen(r,('i','t','l'));a=text(tok);b=a[:-1]
            if r.random()<.5 and t.fix(1,'Setze das richtige Satzzeichen ans Ende.',b,a,'Eine Aussage endet mit einem Punkt.'):n+=1
            elif MC(t,1,a[:-1]+'\nWelches Satzzeichen steht am Ende?','.',['?','!'],'Eine Aussage erzählt etwas.'):n+=1
        elif x<.75:
            q=r.choice(SATZ_Q);nm=r.choice(NAMES)[0];nn=r.choice(NOUNS)
            s=q.format(n=nm,a=A(nn[2],'akk',False),x=nn[0]) if '{a}' in q else q.format(n=nm)
            if '{n}' in q and s.startswith('Wann') or '{n}' in q:pass
            if r.random()<.5 and t.fix(1,'Setze das richtige Satzzeichen ans Ende.',s[:-1],s,'Eine Frage endet mit einem Fragezeichen.'):n+=1
            elif MC(t,1,s[:-1]+'\nWelches Satzzeichen steht am Ende?','?',['.','!'],'Bei einer Frage fragst du etwas.'):n+=1
        else:
            s=r.choice(SATZ_E)
            if r.random()<.5 and t.fix(1,'Setze das richtige Satzzeichen ans Ende.',s[:-1]+'.',s,'Ein Ausruf oder Befehl endet mit einem Ausrufezeichen.'):n+=1
            elif MC(t,1,s[:-1]+'\nWelches Satzzeichen steht am Ende?','!',['.','?'],'Bei einem Ausruf oder Befehl setzt du ein Ausrufezeichen.'):n+=1
def listsent(r,k):
    fr,p=r.choice(LISTS);cnt=3 if k<4 else r.choice([4,5]);it=r.sample(p,min(cnt,len(p)));cj='und' if (k<4 or r.random()<.7) else 'oder'
    body=', '.join(it[:-1])+' '+cj+' '+it[-1]
    ok=fr.format(body);nocomma=fr.format(' '.join(it[:-1])+' '+cj+' '+it[-1]);cbefore=fr.format(', '.join(it[:-1])+', '+cj+' '+it[-1]);head=fr.split('{}')[0].rstrip()
    return ok,nocomma,cbefore,fr,it,cj
def f_komma(t,r):
    k=cls_of(t);n=0;tries=0
    while n<60 and tries<600:
        tries+=1;ok,nc,cb,fr,it,cj=listsent(r,k);x=r.random()
        if x<.6:
            if t.fix(2,'Setze die Kommas richtig.',nc,ok,'Bei einer Aufzählung steht zwischen den Wörtern ein Komma. Vor «und» und «oder» steht keins.'):n+=1
        elif x<.8:
            bad=r.choice([nc,cb]);show,truth=(ok,'richtig') if r.random()<.45 else (bad,'falsch')
            if MC(t,1,show+'\nSind die Kommas richtig gesetzt?',truth,['falsch' if truth=='richtig' else 'richtig'],'Zwischen den Aufzählungen steht ein Komma, vor «und» keins.'):n+=1
        else:
            if t.fix(2,'Verbessere direkt im Feld.',cb,ok,'Vor «und» und «oder» setzt man kein Komma.'):n+=1
def f_hs(t,r):
    n=0
    for a,cj,b in r.sample(HS,len(HS)):
        ok='%s, %s %s.'%(a,cj,b);nc='%s %s %s.'%(a,cj,b)
        t.fix(2,'Setze das Komma.',nc,ok,'Vor «%s» steht bei zwei Hauptsätzen ein Komma.'%cj)
        MC(t,1,(ok if n%2==0 else nc)+'\nStimmt die Kommasetzung?','richtig' if n%2==0 else 'falsch',['falsch' if n%2==0 else 'richtig'],'Vor aber, denn, doch und sondern steht ein Komma.')
        MC(t,2,'%s ___ %s.\nWelches Wort verbindet die zwei Hauptsätze sinnvoll?'%(a,b),cj,[x for x in ['aber','denn','sondern','doch','und'] if x!=cj],'Lies beide Teile. Wie hängen sie zusammen?')
        n+=1
    for a,cj,b in HS[:0]:pass
def f_kommaerw(t,r):
    n=0
    for a,cj,b,_ in r.sample(NS,len(NS)):
        ok='%s, %s %s.'%(a,cj,b);nc='%s %s %s.'%(a,cj,b)
        t.fix(2,'Setze das Komma.',nc,ok,'Vor dem Nebensatz steht ein Komma.')
        if n%2==0:MC(t,1,ok+'\nStimmt die Kommasetzung?','richtig',['falsch'],'Nebensätze trennt man mit einem Komma ab.')
        else:MC(t,1,nc+'\nStimmt die Kommasetzung?','falsch',['richtig'],'Zwischen Hauptsatz und Nebensatz steht ein Komma.')
        n+=1
    for h,rel,rest in REL:
        ok='%s, %s, %s.'%(h,rel,rest);nc='%s %s %s.'%(h,rel,rest)
        t.fix(3,'Setze die Kommas.',nc,ok,'Der Relativsatz wird von Kommas eingeschlossen.')
        MC(t,2,ok+'\nStimmen die Kommas?','richtig',['falsch'],'Ein eingeschobener Nebensatz hat zwei Kommas.')
def f_hauptneben(t,r):
    n=0
    for a,cj,b,art in r.sample(NS,28):
        MC(t,1,b+'.\nIst das ein Hauptsatz oder ein Nebensatz?' if False else '%s %s.\nIst das ein Hauptsatz oder ein Nebensatz?'%(cj,b),'Nebensatz',['Hauptsatz'],'Beim Nebensatz steht das Verb am Ende.')
        MC(t,1,a+'.\nIst das ein Hauptsatz oder ein Nebensatz?','Hauptsatz',['Nebensatz'],'Der Hauptsatz kann allein stehen.')
        words=(cj+' '+b).split();wr=[w for w in words[1:] if w!=cj]
        MC(t,2,'%s, %s %s.\nWelches Wort leitet den Nebensatz ein?'%(a,cj,b),cj,wr[:3] or ['und'],'Das Einleitewort steht am Anfang des Nebensatzes.')
        verb=b.split()[-1]
        if len(b.split())>=2 and n%2==0:MC(t,2,'%s %s.\nWo steht das Verb im Nebensatz?'%(cj,b),'am Ende',['an zweiter Stelle','am Anfang'],'Im Nebensatz steht das Verb ganz hinten.')
        n+=1
    for h,rel,rest in REL:
        MC(t,2,'%s, %s, %s.\nWelcher Teil ist der Nebensatz?'%(h,rel,rest),rel,[h,rest],'Der Relativsatz beginnt mit «der», «die» oder «das» und das Verb steht am Ende.')
def f_nebenarten(t,r):
    arts=['Kausalsatz','Konditionalsatz','Temporalsatz','Konzessivsatz','Finalsatz','Dass-Satz']
    for a,cj,b,art in r.sample(NS,34):
        MC(t,2,'%s, %s %s.\nWelche Art von Nebensatz ist das?'%(a,cj,b),art,[x for x in arts if x!=art],'Das Einleitewort verrät die Art: weil, wenn, als, obwohl, damit, dass …')
        if art!='Dass-Satz':MC(t,1,'%s %s.\nWas drückt der Nebensatz aus?'%(cj,b),{'Kausalsatz':'einen Grund','Konditionalsatz':'eine Bedingung','Temporalsatz':'eine Zeit','Konzessivsatz':'einen Gegengrund','Finalsatz':'einen Zweck'}[art],[x for x in['einen Grund','eine Bedingung','eine Zeit','einen Gegengrund','einen Zweck'] if x!={'Kausalsatz':'einen Grund','Konditionalsatz':'eine Bedingung','Temporalsatz':'eine Zeit','Konzessivsatz':'einen Gegengrund','Finalsatz':'einen Zweck'}[art]],'Frage: Warum? Wann? Unter welcher Bedingung? Trotz was? Wozu?')
    for h,rel,rest in REL:
        MC(t,2,'%s, %s, %s.\nWelche Art von Nebensatz ist «%s»?'%(h,rel,rest,rel),'Relativsatz',['Kausalsatz','Temporalsatz','Konditionalsatz'],'Er bezieht sich auf ein Nomen und beginnt mit «der, die, das».')
def f_subjekt(t,r):
    n=0;tries=0;sat=fam(t)=='satzglieder'
    while n<60 and tries<600:
        tries+=1;x=r.random()
        if x<.5:tok=s_trans(r,.3);subj=' '.join(w for w,_ in tok[:len([1 for _ in tok])-len(NPtok(NOUNS[0],'akk'))] ) 
        tok=r.choice([s_trans,s_intr,s_loc])(r,.3) if True else None
        if tok is None:continue
        # Teile: Subjekt = bis zum Verb, Praedikat = Verb
        vi=[i for i,(w,p) in enumerate(tok) if p=='Verb'][0]
        subj=' '.join(w for w,_ in tok[:vi]);verb=tok[vi][0];rest=' '.join(w for w,_ in tok[vi+1:])
        if not rest:continue
        s=text(tok)
        if r.random()<.5:
            if MC(t,1 if not sat else 2,s+'\nWelcher Teil ist das Subjekt?',subj,[verb,rest],'Frage: Wer oder was tut etwas?'):n+=1
        else:
            if MC(t,1 if not sat else 2,s+'\nWelcher Teil ist das Prädikat?',verb,[subj,rest],'Das Prädikat ist das Verb.'):n+=1
        if sat and r.random()<.4:
            ts=r.choice([s_trans])(r,.3);vi2=[i for i,(w,p) in enumerate(ts) if p=='Verb'][0];obj=' '.join(w for w,_ in ts[vi2+1:]);s2=text(ts)
            MC(t,2,s2+'\nWelcher Teil ist das Akkusativobjekt (wen oder was)?',obj,[' '.join(w for w,_ in ts[:vi2]),ts[vi2][0]],'Frage: Wen oder was?')
            dn=r.choice(pool('person'));vb,art=r.choice([('hilft','dem'),('dankt','dem'),('gehört','dem')]);d=NP(dn,'dat') if False else A(dn[2],'dat')+' '+dn[0]
            s3='%s %s %s.'%(r.choice(NAMES)[0],vb,d)
            MC(t,2,s3+'\nWelcher Teil ist das Dativobjekt (wem)?',d,[s3.split()[0],vb],'Frage: Wem?')
def f_subjekt_fix(t,r):
    PL=[('Die Kinder','spielen','spielt'),('Die Hunde','laufen','läuft'),('Die Katzen','schlafen','schläft'),('Wir','singen','singt'),('Die Schüler','lachen','lacht'),('Meine Freunde','kommen','kommt'),('Die Vögel','fliegen','fliegt'),('Ihr','wartet','warten'),('Ich','spiele','spielt'),('Du','singst','singt'),('Er','läuft','laufen'),('Sie (viele)','tanzen','tanzt')]
    for sj,ok,bad in r.sample(PL,len(PL)):
        sj=sj.replace(' (viele)','');adv=r.choice(['heute','im Garten','gern','laut','am Morgen'])
        t.fix(2,'Das Prädikat passt nicht zum Subjekt. Verbessere im Feld.','%s %s %s.'%(sj,bad,adv),'%s %s %s.'%(sj,ok,adv),'Das Prädikat richtet sich nach dem Subjekt.')
    for _ in range(12):
        tok=s_trans(r,.3);vi=[i for i,(w,p) in enumerate(tok) if p=='Verb'][0]
        s1=text(tok);alt=tok[:]
        if tok[0][0].lower() in('der','die','das'):
            n1=tok[vi-1][0]
            nn=[x for x in NOUNS if x[0]==n1]
            if nn and nn[0][0]!=nn[0][1]:
                pl=nn[0][1];sg_form=' '.join(w for w,_ in tok[:vi]);
                good='Die '+pl+' '+VP.get(tok[vi][0],tok[vi][0])+' '+' '.join(w for w,_ in tok[vi+1:])+'.' if tok[vi][0] in VP and not any(p=='Adjektiv' for w,p in tok[:vi]) else None
                if good:t.fix(3,'Setze das Subjekt in die Mehrzahl. Verbessere im Feld.',s1,good,'Auch das Verb ändert sich.')
VP={'isst':'essen','liest':'lesen','malt':'malen','kauft':'kaufen','baut':'bauen','trägt':'tragen','sieht':'sehen','fängt':'fangen','wäscht':'waschen','öffnet':'öffnen','putzt':'putzen','zeichnet':'zeichnen'}
def f_faelle(t,r):
    n=0;tries=0;k=cls_of(t)
    FR={'Nominativ':('nom','%s wartet.'),'Akkusativ':('akk','Ich sehe %s.'),'Dativ':('dat','Ich helfe %s.'),'Genitiv':('gen','Das ist das Fahrrad %s.')}
    cats=['Nominativ','Genitiv','Dativ','Akkusativ']
    while n<70 and tries<700:
        tries+=1;nn=r.choice(pool('person')+pool('tier'));c=r.choice(cats);cs,fr=FR[c];ad=r.choice(ADJ) if (k>=8 and r.random()<.4) else None
        np_=NP(nn,cs,ad,cap=(cs=='nom'));s=fr%np_
        x=r.random()
        if x<.5:
            if MC(t,2,s+'\nIn welchem Fall steht «%s»?'%np_.replace(np_[0],np_[0].lower() if cs=='nom' else np_[0],1) if False else s+'\nIn welchem Fall steht «%s»?'%(np_[0].lower()+np_[1:] if cs=='nom' else np_),c,[z for z in cats if z!=c],{'Nominativ':'Wer oder was?','Genitiv':'Wessen?','Dativ':'Wem?','Akkusativ':'Wen oder was?'}[c],None):n+=1
        elif x<.8 and not ad:
            art=A(nn[2],cs);ans=art
            if t.mc(2,(fr%('___ '+(nn[3] if cs=='gen' and nn[2]!='f' else nn[0]))).replace('___','___')+'\nWelcher Artikel passt?',ans,[z for z in ['der','die','das','den','dem','des'] if z!=ans and (z in('der','die','das','den','dem','des'))][:3],'Frage: %s'%{'nom':'Wer oder was?','gen':'Wessen?','dat':'Wem?','akk':'Wen oder was?'}[cs],None):n+=1
        else:
            wrongs={'akk':{'m':'dem','f':'der','n':'dem'},'dat':{'m':'den','f':'die','n':'das'},'nom':{'m':'den','f':'der','n':'dem'},'gen':{'m':'dem','f':'die','n':'das'}}[cs][nn[2]]
            right=fr%(A(nn[2],cs)+' '+(nn[3] if cs=='gen' and nn[2]!='f' else nn[0])) if not ad else None
            if right and cs!='nom':
                wrong=fr%(wrongs+' '+(nn[3] if cs=='gen' and nn[2]!='f' else nn[0]))
                if wrong!=right and t.fix(3,'Korrigiere den Artikel.',wrong,right,'Frage: %s'%{'nom':'Wer oder was?','gen':'Wessen?','dat':'Wem?','akk':'Wen oder was?'}[cs]):n+=1
def f_passiv(t,r):
    n=0
    for akt,pas,inf in r.sample(AKTPAS,len(AKTPAS)):
        MC(t,1,akt+'\nIst der Satz Aktiv oder Passiv?','Aktiv',['Passiv'],'Aktiv: Der Täter handelt.')
        MC(t,1,pas+'\nIst der Satz Aktiv oder Passiv?','Passiv',['Aktiv'],'Passiv: «werden» + Partizip II.')
        wr=[akt,pas.replace(' wird ',' hat ').replace(' werden ',' haben '),pas.replace(' wird ',' ').replace(' werden ',' ')]
        MC(t,2,'Wie heisst das Passiv?\n'+akt,pas,wr,'Der Gegenstand wird zum Subjekt. «werden» + Partizip II.')
        nop=pas.replace(' wird ',' ').replace(' werden ',' ')
        if nop!=pas:t.fix(2,'Verbessere direkt im Feld.',nop,pas,'Das Passiv braucht «werden».')
def f_konj(t,r):
    for d,ind,wr in r.sample(KONJ,len(KONJ)):
        MC(t,2,d+'\nWie heisst die indirekte Rede?',ind,[wr,d.split(':')[0]+', ich '+d.split('Ich ',1)[1].rstrip('.»') if False else wr.replace('sagt, ','sagt: ')],'In der indirekten Rede steht der Konjunktiv I.')
        if wr!=ind:t.fix(2,'Verbessere direkt im Feld.',wr,ind,'Konjunktiv I: sei, habe, gehe, komme …')
    for s,a,w in KONJ2:
        MC(t,2,s+'\nWelche Form passt?',a,w,'Möglichkeit oder Wunsch: Konjunktiv II.')
def f_grosskl(t,r):
    for s,w in r.sample(NOM,len(NOM)):
        t.fix(2,'Schreibe richtig: Gross oder klein?',s.replace(w,w.lower(),1),s,'Nach «beim», «zum», «das», «im» wird ein Verb zum Nomen und gross geschrieben.')
    for s,w in ADJN:
        t.fix(3,'Schreibe richtig: Gross oder klein?',s.replace(w,w.lower(),1),s,'Nach «etwas», «nichts», «viel», «alles» oder «das» wird das Adjektiv gross geschrieben.')
    for s,w in r.sample(NOM,10):
        MC(t,1,s.replace(w,'___',1)+'\nWie schreibt man das Wort?',w,[w.lower()],'Nominalisierte Verben schreibt man gross.')
    for a,b,w in [('Wir wollen','gehen','schwimmen'),('Ich möchte','lernen','lesen'),('Sie kann gut','tanzen','singen'),('Er will heute','kochen','backen')]:
        MC(t,2,'%s %s.\nWie schreibt man «%s» hier?'%(a,w,w),w,[w.capitalize()],'Hier ist es ein Verb. Verben schreibt man klein.')
FAMS_PLACE=0
FAMS={'nva':'f_wortarten','wortarten':'f_wortarten','pronomen':'f_pro_all','mehrzahl':'f_mehrzahl','gross':'f_gross','zeitformen':'f_zeit','plusquam':'f_zeit','alphabet':'f_alphabet',
'langvokal':'f_langvokal','stammformen':'f_stamm','satzzeichen':'f_satzz','komma':'f_komma','hauptsaetze':'f_hs','kommaerw':'f_kommaerw','hauptneben':'f_hn_all','nebensatzarten':'f_na_all',
'subjekt':'f_subj_all','satzglieder':'f_subjekt','faelle':'f_faelle','passiv':'f_passiv','konjunktiv':'f_konj','grossklein':'f_grosskl'}
def f_subj_all(t,r):
    f_subjekt(t,r);f_subjekt_fix(t,r)
def f_hn_all(t,r):
    f_hauptneben(t,r)
    for a,cj,b,art in r.sample(NS,len(NS)):
        w=b.split()
        if len(w)>=2:
            bad='%s %s %s'%(cj,w[-1],' '.join(w[:-1]))
            t.fix(2,'Im Nebensatz steht das Verb am Ende. Verbessere im Feld.','%s, %s.'%(a,bad.strip()),'%s, %s %s.'%(a,cj,b),'Im Nebensatz steht das Verb ganz hinten.')
def f_na_all(t,r):
    f_nebenarten(t,r)
    ALT={'Kausalsatz':('obwohl','weil','Der Nebensatz soll einen Grund nennen.'),'Konzessivsatz':('weil','obwohl','Der Nebensatz soll einen Gegengrund nennen.'),'Finalsatz':('weil','damit','Der Nebensatz soll einen Zweck nennen.'),'Konditionalsatz':('weil','wenn','Der Nebensatz soll eine Bedingung nennen.')}
    for a,cj,b,art in r.sample(NS0,len(NS0)):
        if art in ALT and cj==ALT[art][1]:
            bad,ok,q=ALT[art];t.fix(2,q+' Verbessere die Konjunktion im Feld.','%s, %s %s.'%(a,bad,b),'%s, %s %s.'%(a,ok,b),'Das Einleitewort verrät die Art des Nebensatzes.')
def f_pro_all(t,r):
    f_pronomen(t,r)
    for _ in range(26):
        nn=r.choice(pool('person')+pool('tier'));g=nn[2];ans={'m':'Er','f':'Sie','n':'Es'}[g];bad=r.choice([x for x in('Er','Sie','Es') if x!=ans])
        v=r.choice(['schläft','lacht','spielt','wartet','singt'])
        t.fix(2,'Ersetze das Nomen durch das richtige Pronomen. Verbessere im Feld.','%s %s. %s ist da.'%(NP(nn,'nom',cap=True),v,bad),'%s %s. %s ist da.'%(NP(nn,'nom',cap=True),v,ans),'Der: er. Die: sie. Das: es.')
    for _ in range(10):
        nm,g=r.choice(NAMES);ob=r.choice(pool('tier')+pool('ding'));ans={'m':'sein','f':'ihr'}[g];bad={'m':'ihr','f':'sein'}[g]
        t.fix(2,'Verbessere direkt im Feld.','%s hat einen Freund. Das ist %s %s.'%(nm,bad,ob[0]) if False else 'Das ist %s. Das ist %s %s.'%(nm,bad+('e' if ob[2]=='f' else ''),ob[0]),'Das ist %s. Das ist %s %s.'%(nm,ans+('e' if ob[2]=='f' else ''),ob[0]),'Ein Junge: sein. Ein Mädchen: ihr.')
def extend(t):
    f=fam(t)
    if f in FAMS:
        of=t.fix;cnt=[0]
        def fx(lvl,q,pre,a,*ar,**kw):
            if pre==a:return False
            cnt[0]+=1
            if any(c['q']==q and c['a']==a for c in t.cards):return False
            if cnt[0]%3==0 and sum(1 for z in t.qs if z.get('pre'))<10:
                return t.efix(q,pre,a,'')
            return of(lvl,q,pre,a,*ar,**kw)
        t.fix=fx
    if f in FAMS:
        r=rr(t);before=len(t.cards)
        globals()[FAMS[f]](t,r)
        ex={(q['q'],q['options'][q['answer']] if q['type']=='mc' else q['answer'][0]) for q in t.qs}
        t.cards=[c for c in t.cards if (c['q'],c['a']) not in ex]
        for i,c in enumerate(t.cards):c['id']='c%d'%(i+1)
        boost(t,r)
        return len(t.cards)-before
    return 0

def extend_json(tp):
    """Bestehendes Thema (JSON) erweitern: Adapter ueber DT."""
    from de import DT
    t=DT(tp['id'],tp['child'],tp['chapter'],tp['title'],seed=sum(ord(c) for c in tp['id']))
    t.t=dict(tp);t.explain=tp['explain'];t.theory=tp['theory'];t.cards=tp['cards'];t.qs=tp['exam']['questions']
    for c in t.cards:
        t.seen.add('x'+c['q']+str(c.get('pre'))+c['a'])
        if 'opts' in c and not c.get('multi'):t.sig.add(c['q']+'|'.join(sorted(c['opts'])))
    n=extend(t) if not tp.get('ext') else (boost(t,rr(t)) or 0)
    out=t.build();out['ext']=1;out['ext2']=1;return out,n

# ===================================================== v4.83: 50 % Korrekturkarten ab Klasse 4
WEAK=[('spielen','spiel'),('lachen','lach'),('arbeiten','arbeit'),('warten','wart'),('tanzen','tanz'),('wohnen','wohn'),('malen','mal'),('kaufen','kauf'),('hören','hör'),('lernen','lern'),
('putzen','putz'),('baden','bad'),('machen','mach'),('suchen','such'),('zeigen','zeig'),('rechnen','rechn'),('fragen','frag'),('kochen','koch'),('zählen','zähl'),('tragen_','')]
WEAK+=[('packen','pack'),('lieben','lieb'),('leben','leb'),('füllen','füll'),('glauben','glaub'),('danken','dank'),('turnen','turn'),('winken','wink'),('regnen','regn'),('stellen','stell'),('legen','leg'),('holen','hol'),('fehlen','fehl'),('schenken','schenk'),('rufen','ruf')]
WEAK=[w for w in WEAK if w[1]]
def conj(stem,p):
    sib=stem[-1] in 'szx'
    et=stem[-1] in 'td' or stem.endswith(('chn','gn','ffn'))
    return {'ich':stem+'e','du':stem+('t' if sib else 'est' if et else 'st'),'er':stem+('et' if et else 't'),'wir':stem+'en','ihr':stem+('et' if et else 't'),'sie':stem+'en'}[p]
SUBJ=[('Ich','ich'),('Du','du'),('Er','er'),('Sie','er'),('Wir','wir'),('Ihr','ihr'),('Die Kinder','sie'),('Mein Freund','er'),('Meine Schwester','er'),('Die Katzen','sie'),('Anna und Tom','sie')]
def g_agree(r,k):
    inf,stem=r.choice(WEAK);sj,p=r.choice(SUBJ);bad=r.choice([x for x in('ich','du','er','wir','ihr','sie') if conj(stem,x)!=conj(stem,p)])
    adv=r.choice(['heute','gern','im Garten','jeden Tag','am Nachmittag','zusammen'])
    return (2,'Das Verb passt nicht zum Subjekt. Verbessere im Feld.','%s %s %s.'%(sj,conj(stem,bad),adv),'%s %s %s.'%(sj,conj(stem,p),adv),'Das Verb richtet sich nach dem Subjekt.')
def g_cap(r,k):
    tok=sent_gen(r,('i','t','l'));a=text(tok);b=lowernouns(tok)
    return (2,'Schreibe richtig: Gross oder klein? Verbessere im Feld.',b,a,'Satzanfang und Nomen schreibt man gross.') if a!=b else None
def g_adj(r,k):
    nn=r.choice(NOUNS);ad=r.choice(ADJ);c=r.choice(['nom','akk'])
    good=NP(nn,c,ad,cap=(c=='nom'));bad=A(nn[2],c)+' '+ad+' '+(nn[0]);bad=bad[0].upper()+bad[1:] if c=='nom' else bad
    if c=='nom':return (2,'Die Endung des Adjektivs fehlt. Verbessere im Feld.','%s steht dort.'%bad,'%s steht dort.'%good,'Das Adjektiv passt sich an: der kleine, die kleine, das kleine.')
    return (3,'Die Endung des Adjektivs fehlt. Verbessere im Feld.','Ich sehe %s.'%bad,'Ich sehe %s.'%good,'Nach «den» endet das Adjektiv auf -en, nach «die» und «das» auf -e.')
def g_pron(r,k):
    nn=r.choice(pool('person')+pool('tier')+pool('ding'));g=nn[2];ans={'m':'Er','f':'Sie','n':'Es'}[g];bad=r.choice([x for x in('Er','Sie','Es') if x!=ans])
    v=r.choice(['steht dort','ist neu','ist schön','liegt hier']) if nn[4]=='ding' else r.choice(['schläft','lacht','spielt','wartet'])
    return (2,'Ersetze das Nomen durch das richtige Pronomen. Verbessere im Feld.','%s %s. %s ist da.'%(NP(nn,'nom',cap=True),v,bad),'%s %s. %s ist da.'%(NP(nn,'nom',cap=True),v,ans),'Der: er. Die: sie. Das: es.')
def g_tense(r,k):
    v=r.choice(VERBS);nm=r.choice(NAMES)[0];inf,pr,pt,pp,aux,st=v;x=r.random()
    wa='hat' if aux=='ist' else 'ist'
    if x<.3:return (2,'Setze die richtige Hilfsform ein (hat oder ist). Verbessere im Feld.','%s %s gestern %s.'%(nm,wa,pp),'%s %s gestern %s.'%(nm,aux,pp),'Bewegung und Zustandsänderung: ist. Sonst: hat.')
    if x<.5:return (2,'Schreibe im Präteritum. Verbessere im Feld.','%s %s gestern.'%(nm,pr),'%s %s gestern.'%(nm,pt),'Präteritum: erzählte Vergangenheit.')
    if x<.7:return (3,'Schreibe im Plusquamperfekt. Verbessere im Feld.','%s %s vorher %s.'%(nm,'hatte' if aux=='ist' else 'war',pp),'%s %s vorher %s.'%(nm,'war' if aux=='ist' else 'hatte',pp),'Plusquamperfekt: hatte/war + Partizip II.')
    if x<.85:return (2,'Schreibe im Perfekt. Verbessere im Feld.','%s %s gestern.'%(nm,pt),'%s %s gestern %s.'%(nm,aux,pp),'Perfekt: hat/ist + Partizip II.')
    return (2,'Schreibe im Futur. Verbessere im Feld.','%s %s morgen.'%(nm,pr),'%s wird morgen %s.'%(nm,inf),'Futur: wird + Grundform.')
def g_cl(r,k):
    ok,nc,cb,fr,it,cj=listsent(r,k);bad=r.choice([nc,cb]);return (2,'Setze die Kommas richtig. Verbessere im Feld.',bad,ok,'Zwischen den Aufzählungen steht ein Komma, vor «und» und «oder» keins.')
def g_chs(r,k):
    a,cj,b=r.choice(HS);return (2,'Setze das Komma. Verbessere im Feld.','%s %s %s.'%(a,cj,b),'%s, %s %s.'%(a,cj,b),'Vor «%s» steht bei zwei Hauptsätzen ein Komma.'%cj)
def g_cns(r,k):
    a,cj,b,_=r.choice(NSALL);return (2,'Setze das Komma. Verbessere im Feld.','%s %s %s.'%(a,cj,b),'%s, %s %s.'%(a,cj,b),'Vor dem Nebensatz steht ein Komma.')
def g_crel(r,k):
    h,rel,rest=r.choice(RELALL);return (3,'Setze die Kommas. Verbessere im Feld.','%s %s %s.'%(h,rel,rest),'%s, %s, %s.'%(h,rel,rest),'Der Relativsatz wird von Kommas eingeschlossen.')
def g_nsord(r,k):
    a,cj,b,_=r.choice(NSALL);w=b.split()
    if len(w)<2:return None
    bad='%s %s %s'%(cj,w[-1],' '.join(w[:-1]));return (2,'Im Nebensatz steht das Verb am Ende. Verbessere im Feld.','%s, %s.'%(a,bad.replace('  ',' ').strip()),'%s, %s %s.'%(a,cj,b),'Im Nebensatz steht das Verb ganz hinten.')
def g_nsconj(r,k):
    ALT={'Kausalsatz':('obwohl','weil','Der Nebensatz soll einen Grund nennen.'),'Konzessivsatz':('weil','obwohl','Der Nebensatz soll einen Gegengrund nennen.'),'Finalsatz':('weil','damit','Der Nebensatz soll einen Zweck nennen.'),'Konditionalsatz':('weil','wenn','Der Nebensatz soll eine Bedingung nennen.')}
    a,cj,b,art=r.choice(NS)
    if art in ALT and cj==ALT[art][1]:
        bad,ok,q=ALT[art];return (2,q+' Verbessere die Konjunktion im Feld.','%s, %s %s.'%(a,bad,b),'%s, %s %s.'%(a,ok,b),'Das Einleitewort verrät die Art des Nebensatzes.')
def g_case(r,k):
    nn=r.choice(NOUNS);cs=r.choice(['akk','dat']);fr={'akk':['Ich sehe %s.','Wir besuchen %s.','Sie geht durch %s.','Er kauft %s für uns.'],'dat':['Ich helfe %s.','Sie dankt %s.','Wir gehen mit %s.','Er spricht mit %s.']}
    if nn[4]=='ding' and cs=='dat':fr['dat']=['Wir gehen mit %s.','Sie sitzt bei %s.','Ich komme von %s.']
    if nn[4]!='ding' and cs=='akk':fr['akk']=['Ich sehe %s.','Wir besuchen %s.']
    f=r.choice(fr[cs]);ad=r.choice(ADJ) if r.random()<.35 else None
    good=f%NP(nn,cs,ad)
    wr={'akk':{'m':'dem','f':'der','n':'dem'},'dat':{'m':'den','f':'die','n':'das'}}[cs][nn[2]]
    right=A(nn[2],cs)
    bad=good.replace(right+' ',wr+' ',1)
    return (3,'Der Artikel ist falsch. Verbessere im Feld.',bad,good,'Frage: %s'%('Wen oder was?' if cs=='akk' else 'Wem?')) if bad!=good else None
def g_gen(r,k):
    nn=r.choice([n for n in NOUNS if n[4] in('person','tier')])
    good='Das ist das Fahrrad %s.'%NP(nn,'gen');bad='Das ist das Fahrrad %s.'%NP(nn,'nom')
    return (3,'Setze in den Genitiv (wessen?). Verbessere im Feld.',bad,good,'Frage: Wessen Fahrrad?') if bad!=good else None
def g_plur(r,k):
    nn=r.choice(NOUNS)
    if nn[0]==nn[1]:return None
    fr=r.choice(['Ich sehe {} {}.','Auf dem Bild sind {} {}.','Dort stehen {} {}.','Im Zimmer sind {} {}.']);num=r.choice(['zwei','drei','vier','viele','fünf'])
    return (2,'Nach «%s» steht die Mehrzahl. Verbessere im Feld.'%num,fr.format(num,nn[0]),fr.format(num,nn[1]),'Die Mehrzahl hat oft eine andere Endung oder einen Umlaut.')
def g_punct(r,k):
    x=r.random()
    if x<.4:tok=sent_gen(r,('i','t','l'));a=text(tok);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',a[:-1],a,'Eine Aussage endet mit einem Punkt.')
    if x<.75:
        q=r.choice(SATZ_Q);nm=r.choice(NAMES)[0];nn=r.choice(NOUNS);s=q.format(n=nm,a=A(nn[2],'akk',False),x=nn[0]) if '{a}' in q else q.format(n=nm);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',s[:-1],s,'Eine Frage endet mit einem Fragezeichen.')
    s=r.choice(SATZ_E);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',s[:-1]+'.',s,'Ein Ausruf oder Befehl endet mit einem Ausrufezeichen.')
def g_alpha(r,k):
    ws=r.sample([x[0] for x in NOUNS if x[0][0] not in 'ÄÖÜ'],r.choice([4,5,6])) if r.random()<.5 else r.sample(r.choice(ABC_POOLS),r.choice([4,5]))
    so=sorted(ws,key=_k)
    return (2,'Ordne die Wörter nach dem Alphabet. Verbessere im Feld.',', '.join(ws),', '.join(so),'Vergleiche Buchstabe für Buchstabe.') if ws!=so else None
def g_langv(r,k):
    c=r.choice(list(LANGV));w,wr=r.choice(LANGV[c]);fr=r.choice(['Wir üben das Wort «{}».','Ich schreibe das Wort «{}» richtig.','Das Wort «{}» ist nicht leicht.','Wie schreibt man «{}»?'])
    return (2,'Verbessere direkt im Feld.',fr.format(wr),fr.format(w),'Regel: '+c+'.')
def g_pas(r,k):
    akt,pas,inf=r.choice(AKTALL);nop=pas.replace(' wird ',' ').replace(' werden ',' ')
    if r.random()<.5 and nop!=pas:return (2,'Das Passiv braucht «werden». Verbessere im Feld.',nop,pas,'Passiv: werden + Partizip II.')
    return (3,'Schreibe im Passiv. Verbessere im Feld.',akt,pas,'Der Gegenstand wird zum Subjekt: werden + Partizip II.')
def g_konj(r,k):
    d,ind,wr=r.choice(KONJALL)
    if r.random()<.6:return (2,'Schreibe in der indirekten Rede. Verbessere im Feld.',wr,ind,'Konjunktiv I: sei, habe, gehe, komme …')
    s,a,w=r.choice(KONJ2);return (3,'Setze die richtige Form ein. Verbessere im Feld.',s.replace('___',w[0]),s.replace('___',a),'Möglichkeit oder Wunsch: Konjunktiv II.')
NOMF=['Beim {} vergeht die Zeit.','Das {} macht Spass.','Zum {} braucht man Zeit.','Ich freue mich auf das {}.','Vor dem {} putze ich die Zähne.' if False else 'Beim {} hilft er mit.']
NOMV=['Lesen','Schwimmen','Kochen','Backen','Tanzen','Malen','Singen','Rennen','Spielen','Lernen','Basteln','Wandern','Turnen','Zeichnen','Aufräumen']
def g_nom(r,k):
    v=r.choice(NOMV);f=r.choice(NOMF);return (2,'Schreibe richtig: Gross oder klein? Verbessere im Feld.',f.format(v.lower()),f.format(v),'Nach «beim», «zum», «das» wird das Verb zum Nomen: gross.')
def g_subjpl(r,k):
    nn=r.choice([n for n in NOUNS if n[4] in('person','tier') and n[0]!=n[1]]);inf,stem=r.choice(WEAK);adv=r.choice(['im Garten','gern','heute','laut'])
    return (3,'Setze das Subjekt in die Mehrzahl. Verbessere im Feld.','%s %s %s.'%(NP(nn,'nom',cap=True),conj(stem,'er'),adv),'Die %s %s %s.'%(nn[1],conj(stem,'sie'),adv),'Auch das Verb ändert sich.')
GEN={'agree':g_agree,'cap':g_cap,'adj':g_adj,'pron':g_pron,'tense':g_tense,'cl':g_cl,'chs':g_chs,'cns':g_cns,'crel':g_crel,'nsord':g_nsord,'nsconj':g_nsconj,'case':g_case,'gen':g_gen,'plur':g_plur,'punct':g_punct,'alpha':g_alpha,'langv':g_langv,'pas':g_pas,'konj':g_konj,'nom':g_nom,'subjpl':g_subjpl}
FIXSET={'wortarten':['cap','adj','agree','pron'],'pronomen':['pron','agree','case'],'zeitformen':['tense','agree'],'plusquam':['tense'],'alphabet':['alpha'],'langvokal':['langv'],'stammformen':['tense'],
'satzzeichen':['punct'],'komma':['cl','chs','cns'],'subjekt':['agree','subjpl','case','pron'],'satzglieder':['agree','subjpl','case','gen'],'hauptsaetze':['chs','cl'],'grossklein':['cap','nom'],'faelle':['case','gen','adj'],
'passiv':['pas'],'konjunktiv':['konj'],'hauptneben':['nsord','cns','crel'],'nebensatzarten':['nsconj','cns'],'kommaerw':['cns','crel','nsord']}
def boost(t,r):
    f=fam(t)
    if (cls_of(t)<4 and f!='alphabet') or f not in FIXSET:return 0
    gens=[GEN[g] for g in FIXSET[f]];added=0
    def nfix():return sum(1 for c in t.cards if 'pre' in c)
    def need():return max(0,len(t.cards)-2*nfix())
    tries=0
    while need()>0 and tries<6000:
        tries+=1;x=r.choice(gens)(r,cls_of(t))
        if not x:continue
        lvl,q,pre,a,h=x
        if pre==a or any(c.get('pre')==pre or c['a']==a and 'pre' in c for c in t.cards):continue
        if any(z.get('pre')==pre or z['answer'][0]==a for z in t.qs if 'answer' in z and z['type']=='input'):continue
        d={"q":q,"a":a,"ans":[a],"pre":pre,"lvl":lvl,"th":'basis',"hints":[h]};t.cards.append(d);added+=1
    for i,c in enumerate(t.cards):c['id']='c%d'%(i+1)
    # Pruefung: 50 %
    cardkeys={(c['q'],c['a']) for c in t.cards}
    def nef():return sum(1 for z in t.qs if z.get('pre'))
    tries=0
    while len(t.qs)-2*nef()>0 and tries<6000:
        tries+=1;x=r.choice(gens)(r,cls_of(t))
        if not x:continue
        lvl,q,pre,a,h=x
        if pre==a or (q,a) in cardkeys or any(c.get('pre')==pre or c['a']==a for c in t.cards if 'pre' in c):continue
        if any(z.get('pre')==pre or (z['type']=='input' and z['answer'][0]==a) for z in t.qs):continue
        t.efix(q,pre,a,h)
    return added

# ===================================================== mehr Variation: generierte Satzmuster
PP={'isst':'gegessen','liest':'gelesen','malt':'gemalt','kauft':'gekauft','baut':'gebaut','trägt':'getragen','sieht':'gesehen','fängt':'gefangen','wäscht':'gewaschen','öffnet':'geöffnet','putzt':'geputzt','zeichnet':'gezeichnet'}
def _gen_pas(r):
    v,sg,objs=r.choice([x for x in TRANS if 'person' in x[1] and x[0] in PP]);sn=r.choice(pool('person'));on=NB[r.choice(objs)]
    if sn[0]==on[0]:return None
    akt='%s %s %s.'%(NP(sn,'nom',cap=True),v,NP(on,'akk'))
    ag=('vom ' if sn[2]!='f' else 'von der ')+sn[0]
    pas='%s wird %s %s.'%(NP(on,'nom',cap=True),ag,PP[v]) if False else '%s wird %s %s.'%(NP(on,'nom',cap=True),ag,PP[v])
    return akt,pas,v
_r0=random.Random(77);_seen=set(a for a,_,_ in AKTPAS)
for _ in range(400):
    x=_gen_pas(_r0)
    if x and x[0] not in _seen and len(AKTPAS)<70:_seen.add(x[0]);AKTPAS.append(x)
def g_pas2(r,k):
    x=_gen_pas(r)
    if not x:return None
    akt,pas,v=x;nop=pas.replace(' wird ',' ')
    if r.random()<.5:return (2,'Das Passiv braucht «werden». Verbessere im Feld.',nop,pas,'Passiv: werden + Partizip II.')
    return (3,'Schreibe im Passiv. Verbessere im Feld.',akt,pas,'Der Gegenstand wird zum Subjekt: werden + Partizip II.')
KB=[('bin','sei','ist','müde'),('habe','habe','hat','Hunger'),('komme','komme','kommt','später'),('gehe','gehe','geht','nach Hause'),('kann','könne','kann','schwimmen'),('muss','müsse','muss','lernen'),('will','wolle','will','ein Eis'),
('weiss','wisse','weiss','die Antwort'),('spiele','spiele','spielt','gern Fussball'),('lerne','lerne','lernt','jeden Tag'),('arbeite','arbeite','arbeitet','heute länger'),('fahre','fahre','fährt','mit dem Zug'),('lese','lese','liest','ein Buch'),('schlafe','schlafe','schläft','schon')]
SAY=['sagt','meint','erzählt','berichtet','behauptet']
def _gen_konj(r):
    nm,g=r.choice(NAMES+[('Der Lehrer','m'),('Die Mutter','f'),('Der Trainer','m'),('Die Nachbarin','f')]);p='er' if g=='m' else 'sie';i,k1,ind,c=r.choice(KB);sy=r.choice(SAY)
    if k1==ind:ind_form=ind
    d='%s %s: «Ich %s %s.»'%(nm,sy,i,c);good='%s %s, %s %s %s.'%(nm,sy,p,k1,c);bad='%s %s, %s %s %s.'%(nm,sy,p,ind,c)
    return d,good,bad
_rk=random.Random(91);_sk=set(d for d,_,_ in KONJ)
for _ in range(300):
    d,g,b=_gen_konj(_rk)
    if g!=b and d not in _sk and len(KONJ)<60:_sk.add(d);KONJ.append((d,g,b))
def g_konj2(r,k):
    d,g,b=_gen_konj(r)
    return (2,'Schreibe in der indirekten Rede. Verbessere im Feld.',b,g,'Konjunktiv I: sei, habe, gehe, komme …') if g!=b else None
# Nebensaetze generieren
NS0=list(NS)
_MP=['bleibt zu Hause','geht schwimmen','spielt draussen','lernt viel','macht einen Spaziergang','isst ein Eis','liest ein Buch','ruft die Oma an','geht früh ins Bett','räumt das Zimmer auf','fährt mit dem Velo','kauft ein Brot','holt den Ball','zieht eine Jacke an']
_SB={'weil':('Kausalsatz',['es regnet','{p} müde ist','{p} Hunger hat','es kalt ist','morgen ein Test ist','{p} krank ist','{p} Zeit hat','es spät ist']),
'wenn':('Konditionalsatz',['es regnet','die Sonne scheint','{p} Zeit hat','{p} Hunger hat','es warm ist','{p} fertig ist','es schneit']),
'bevor':('Temporalsatz',['{p} isst','{p} das Haus verlässt','es dunkel wird']),'während':('Temporalsatz',['es regnet','{p} wartet','der Hund schläft']),
'sobald':('Temporalsatz',['{p} fertig ist','die Schule aus ist','es aufhört zu regnen']),'bis':('Temporalsatz',['es dunkel wird','{p} müde ist','die Mutter kommt']),
'nachdem':('Temporalsatz',['{p} gegessen hat','es geregnet hat','{p} gearbeitet hat']),'obwohl':('Konzessivsatz',['es regnet','{p} müde ist','es kalt ist','{p} krank ist','{p} wenig Zeit hat','es spät ist']),
'damit':('Finalsatz',['{p} gut vorbereitet ist','alle es verstehen','{p} nichts vergisst','{p} pünktlich ankommt','wir sicher ankommen'])}
def _gen_ns(r):
    nm,g=r.choice(NAMES);p='er' if g=='m' else 'sie';cj=r.choice(list(_SB));art,sbs=_SB[cj];b=r.choice(sbs).format(p=p)
    return ('%s %s'%(nm,r.choice(_MP)),cj,b,art)
_rn=random.Random(53);_sn=set((a,c,b) for a,c,b,_ in NS)
for _ in range(500):
    x=_gen_ns(_rn)
    if (x[0],x[1],x[2]) not in _sn and len(NS)<120:_sn.add((x[0],x[1],x[2]));NS.append(x)
_RP=[('{rp} dort wartet',['ist sehr nett','kommt aus Bern','ist neu']),('{rp} im Garten spielt',['ist sehr laut','gehört uns','ist müde']),('{rp} neben der Tür steht',['ist alt','gehört meinem Vater','ist schön']),('{rp} so laut lacht',['ist mein Freund','ist heute gut gelaunt'])]
def _gen_rel(r):
    nn=r.choice(NOUNS);rp={'m':'der','f':'die','n':'das'}[nn[2]];vp,rest=r.choice(_RP)
    if nn[4]=='ding' and 'lacht' in vp:return None
    return (NP(nn,'nom',cap=True),vp.format(rp=rp),r.choice(rest))
_rr=random.Random(12)
for _ in range(200):
    x=_gen_rel(_rr)
    if x and x not in REL and len(REL)<40:REL.append(x)
def g_nsconj2(r,k):return g_nsconj(r,k)
# Semantik-sichere Liste fuer Konjunktions-Korrektur
_old_nsconj=g_nsconj
def g_nsconj(r,k):
    ALT={'Kausalsatz':('obwohl','weil','Der Nebensatz soll einen Grund nennen.'),'Konzessivsatz':('weil','obwohl','Der Nebensatz soll einen Gegengrund nennen.'),'Finalsatz':('weil','damit','Der Nebensatz soll einen Zweck nennen.'),'Konditionalsatz':('weil','wenn','Der Nebensatz soll eine Bedingung nennen.')}
    a,cj,b,art=r.choice(NS0)
    if art in ALT and cj==ALT[art][1]:
        bad,ok,q=ALT[art];return (2,q+' Verbessere die Konjunktion im Feld.','%s, %s %s.'%(a,bad,b),'%s, %s %s.'%(a,ok,b),'Das Einleitewort verrät die Art des Nebensatzes.')
GEN['nsconj']=g_nsconj;GEN['pas2']=g_pas2;GEN['konj2']=g_konj2
NSALL=list(NS);NS[:]=NS0
RELALL=list(REL);REL[:]=REL[:8]
AKTALL=list(AKTPAS);AKTPAS[:]=AKTPAS[:18]
KONJALL=list(KONJ);KONJ[:]=KONJ[:12]
FIXSET['passiv']=['pas','pas2'];FIXSET['konjunktiv']=['konj','konj2']
FIXSET['nebensatzarten']=['nsconj','cns','nsord','crel'];FIXSET['hauptneben']=['nsord','cns','crel']

# ===================================================== v4.85: sympathische, sinnvolle Saetze (Frames)
import de_sent as DS
NOUNS+=DS.NEWN
NOUNS[:]=list({n[0]:n for n in NOUNS}.values());NB.clear();NB.update({n[0]:n for n in NOUNS})
def _weak(n):return n[2]=='m' and n[3] in(n[0]+'n',n[0]+'en')
def _noun(n,case):
    if case=='gen' and n[2]!='f':return n[3]
    if case in('akk','dat') and _weak(n):return n[3]
    return n[0]
def NP(n,case='nom',adj=None,defn=True,cap=False):
    sg,pl,g,gen,_=n
    parts=[A(g,case,defn)]
    if adj:parts.append(AD(adj,(adjend(g,case) if defn else {'m':'er','f':'e','n':'es'}[g] if case=='nom' else adjend(g,case))))
    parts.append(_noun(n,case));s=' '.join(parts)
    return s[0].upper()+s[1:] if cap else s
def NPtok(n,case='nom',adj=None,cap=False):
    t=[(A(n[2],case),'Artikel')]
    if adj:t.append((AD(adj,adjend(n[2],case)),'Adjektiv'))
    t.append((_noun(n,case),'Nomen'))
    if cap:t[0]=(t[0][0].capitalize(),t[0][1])
    return t
def frame_parts(r,mode='x',adjp=.55):
    while True:
        sk,v,ok,ex=r.choice(DS.F)
        if mode=='i' and ok:continue
        if mode=='t' and not ok:continue
        sn=NB[sk];on=NB[ok] if ok else None
        if on and on[0]==sn[0]:continue
        sa=r.choice(DS.SADJ.get(sn[4],DS.OADJ)) if r.random()<adjp else None
        oa=None
        if on and r.random()<adjp*.7:oa=r.choice(DS.FOODADJ if on[0] in DS.FOOD else DS.OADJ)
        return {'subj':NPtok(sn,'nom',sa,cap=True),'verb':(v,'Verb'),'obj':NPtok(on,'akk',oa) if on else [],'extra':DS._extra(ex)}
def _tok(p):return p['subj']+[p['verb']]+p['obj']+p['extra']
def s_intr(r,adjp=.55):return _tok(frame_parts(r,'i',adjp))
def s_trans(r,adjp=.5):return _tok(frame_parts(r,'t',adjp))
def s_loc(r,adjp=.5):return _tok(frame_parts(r,'x',adjp))
def text(tok):return (' '.join(w for w,_ in tok)+'.').replace(' ,',',')
def sent_gen(r,kinds=('i','t','l'),long=0):
    if long and r.random()<long:
        a=_tok(frame_parts(r,'x'));b=_tok(frame_parts(r,'x'));cj=r.choice(['und','aber','denn','und'])
        b=[(b[0][0].lower(),b[0][1])]+b[1:]
        return a+([(',','Zeichen')] if cj!='und' else [])+[(cj,'Konjunktion')]+b
    return _tok(frame_parts(r,'x'))
# --- Subjekt / Praedikat / Objekt
def f_subjekt(t,r):
    n=0;tries=0;sat=fam(t)=='satzglieder'
    while n<60 and tries<600:
        tries+=1;p=frame_parts(r,'x',.4);tok=_tok(p);s=text(tok)
        subj=' '.join(w for w,_ in p['subj']);verb=p['verb'][0];rest=' '.join(w for w,_ in p['obj']+p['extra'])
        if r.random()<.5:
            if MC(t,1 if not sat else 2,s+'\nWelcher Teil ist das Subjekt?',subj,[verb,rest],'Frage: Wer oder was tut etwas?'):n+=1
        else:
            if MC(t,1 if not sat else 2,s+'\nWelcher Teil ist das Prädikat?',verb,[subj,rest],'Das Prädikat ist das Verb.'):n+=1
        if sat and r.random()<.5:
            q=frame_parts(r,'t',.4)
            obj=' '.join(w for w,_ in q['obj']);MC(t,2,text(_tok(q))+'\nWelcher Teil ist das Akkusativobjekt (wen oder was)?',obj,[' '.join(w for w,_ in q['subj']),q['verb'][0],' '.join(w for w,_ in q['extra'])],'Frage: Wen oder was?')
            dn=r.choice(pool('person')+pool('tier'));vb=r.choice(['hilft','dankt','gehört','winkt','gratuliert'])
            d=NP(dn,'dat');s3='%s %s %s.'%(r.choice(NAMES)[0],vb,d)
            MC(t,2,s3+'\nWelcher Teil ist das Dativobjekt (wem)?',d,[s3.split()[0],vb],'Frage: Wem?')
def f_subjekt_fix(t,r):
    PL=[('Die Kinder','spielen','spielt'),('Die Hunde','laufen','läuft'),('Die Katzen','schlafen','schläft'),('Wir','singen','singt'),('Die Schüler','lachen','lacht'),('Meine Freunde','kommen','kommt'),('Die Vögel','fliegen','fliegt'),('Ihr','wartet','warten'),('Ich','spiele','spielt'),('Du','singst','singt'),('Er','läuft','laufen'),('Sie (viele)','tanzen','tanzt')]
    for sj,ok,bad in r.sample(PL,len(PL)):
        sj=sj.replace(' (viele)','');adv=r.choice(['heute','im Garten','gern','laut','am Morgen'])
        t.fix(2,'Das Prädikat passt nicht zum Subjekt. Verbessere im Feld.','%s %s %s.'%(sj,bad,adv),'%s %s %s.'%(sj,ok,adv),'Das Prädikat richtet sich nach dem Subjekt.')
PL2={'isst':'essen','liest':'lesen','sieht':'sehen','fängt':'fangen','trägt':'tragen','wäscht':'waschen','läuft':'laufen','schläft':'schlafen','fährt':'fahren','hält':'halten','gibt':'geben','schiesst':'schiessen','vergräbt':'vergraben','hüpft':'hüpfen','brüllt':'brüllen'}
def _pl3(v):
    if v in PL2:return PL2[v]
    if v.endswith('et'):return v[:-2]+'en'
    if v.endswith('sst') or v.endswith('ßt'):return None
    return v[:-1]+'en'
def g_subjpl(r,k):
    for _ in range(30):
        sk,v,ok,ex=r.choice(DS.F);sn=NB[sk]
        if sn[0]==sn[1] and sn[2]!='f':continue
        pv=_pl3(v)
        if not pv or sn[0]==sn[1]:continue
        on=NB[ok] if ok else None
        sing=' '.join(w for w,_ in NPtok(sn,'nom',None,cap=True));rest=(' '+NP(on,'akk') if on else '')+' '+' '.join(w for w,_ in DS._extra(ex))
        return (3,'Setze das Subjekt in die Mehrzahl. Verbessere im Feld.','%s %s%s.'%(sing,v,rest),'Die %s %s%s.'%(sn[1],pv,rest),'Auch das Verb ändert sich.')
def g_adj(r,k):
    p=frame_parts(r,'x',0)
    sn=None
    for _ in range(30):
        sk,v,ok,ex=r.choice(DS.F);sn=NB[sk]
        if sn[4]!='ding':break
    ad=r.choice(DS.SADJ.get(sn[4],DS.OADJ));good=NPtok(sn,'nom',ad,cap=True);bad=[good[0],(ad,'Adjektiv'),good[2]]
    rest=(' '+NP(NB[ok],'akk') if ok else '')+' '+' '.join(w for w,_ in DS._extra(ex))
    if sn[0]==(NB[ok][0] if ok else ''):return None
    return (2,'Die Endung des Adjektivs fehlt. Verbessere im Feld.',' '.join(w for w,_ in bad)+' %s%s.'%(v,rest),' '.join(w for w,_ in good)+' %s%s.'%(v,rest),'Das Adjektiv passt sich an: der kleine, die kleine, das kleine.')
GEN['subjpl']=g_subjpl;GEN['adj']=g_adj
def g_cap(r,k):
    tok=sent_gen(r,long=.6 if k>=4 else .25);a=text(tok);b=lowernouns(tok)
    return (2,'Schreibe richtig: Gross oder klein? Verbessere im Feld.',b,a,'Satzanfang und Nomen schreibt man gross.') if a!=b else None
GEN['cap']=g_cap
def g_punct(r,k):
    x=r.random()
    if x<.4:tok=sent_gen(r,long=.4 if k>=4 else 0);a=text(tok);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',a[:-1],a,'Eine Aussage endet mit einem Punkt.')
    if x<.75:
        q=r.choice(SATZ_Q);nm=r.choice(NAMES)[0];nn=r.choice(NOUNS);s=q.format(n=nm,a=A(nn[2],'akk',False),x=nn[0]) if '{a}' in q else q.format(n=nm);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',s[:-1],s,'Eine Frage endet mit einem Fragezeichen.')
    s=r.choice(SATZ_E);return (1,'Setze das richtige Satzzeichen ans Ende. Verbessere im Feld.',s[:-1]+'.',s,'Ein Ausruf oder Befehl endet mit einem Ausrufezeichen.')
GEN['punct']=g_punct
# --- Verben mit sinnvollen Ergaenzungen
VC={'essen':['ein Eis','eine Pizza','einen Apfel'],'lesen':['ein Märchen','einen Comic','ein Buch'],'schreiben':['einen Brief','eine Geschichte','eine Karte'],'trinken':['ein Glas Milch','einen Kakao'],'finden':['einen Schatz','einen Käfer','einen Stein'],
'geben':['dem Hund einen Knochen','der Katze Milch'],'nehmen':['den Rucksack','einen Apfel'],'werfen':['den Ball','einen Schneeball'],'ziehen':['den Schlitten','einen Wagen'],'bringen':['einen Kuchen','die Hefte'],'denken':['an die Ferien','an eine Pizza'],
'treffen':['einen Freund','die Nachbarin'],'waschen':['das Auto','die Mütze'],'tragen':['den Rucksack','die Tasche'],'fangen':['den Ball','einen Fisch'],'beginnen':['mit der Hausaufgabe','mit dem Spiel'],'gewinnen':['das Spiel','den Preis'],
'schneiden':['das Brot','die Wurst'],'brechen':['den Stock','das Eis'],'sprechen':['mit der Lehrerin','mit dem Freund'],'helfen':['der Oma','dem Nachbarn'],'sehen':['einen Regenbogen','ein Gespenst'],'singen':['ein Lied','im Chor'],'rufen':['den Hund','laut um Hilfe'],
'kommen':['zur Schule','nach Hause'],'gehen':['zur Schule','in den Park'],'fahren':['mit dem Velo','zum See'],'schwimmen':['im See','im Schwimmbad'],'fliegen':['über den Wald','zum Mond'],'springen':['über die Pfütze','ins Wasser'],'bleiben':['zu Hause','im Bett'],
'fallen':['in die Pfütze','vom Stuhl'],'laufen':['zum Bus','durch den Park'],'schlafen':['im Zelt','lange'],'spielen':['mit dem Ball','im Garten'],'lachen':['über den Witz','laut'],'arbeiten':['im Garten','fleissig'],'warten':['auf den Bus','vor der Schule'],
'tanzen':['im Wohnzimmer','auf der Bühne'],'wohnen':['in der Stadt','auf dem Land'],'malen':['ein Bild','einen Drachen'],'lernen':['das Alphabet','für den Test'],'kaufen':['ein Eis','ein Heft'],'suchen':['den Schlüssel','den Hund'],
'fragen':['die Lehrerin','nach dem Weg'],'kochen':['eine Suppe','Nudeln'],'baden':['im See','im Pool'],'reisen':['nach Italien','ans Meer'],'wandern':['durch den Wald','auf den Berg'],'rennen':['zum Bus','über den Hof'],'steigen':['auf den Baum','auf den Berg'],
'sitzen':['auf der Bank','am Tisch'],'liegen':['im Gras','im Bett'],'machen':['die Hausaufgaben','einen Spaziergang']}
VBS=[v for v in dict.fromkeys(VERBS+STRONG) if v[0] in VC]
def tsent(nm,v,te,c):
    inf,pr,pt,pp,aux,_=v
    return {'Präsens':'%s %s heute %s.'%(nm,pr,c),'Präteritum':'%s %s gestern %s.'%(nm,pt,c),'Perfekt':'%s %s gestern %s %s.'%(nm,aux,c,pp),
            'Plusquamperfekt':'%s %s vorher %s %s.'%(nm,'war' if aux=='ist' else 'hatte',c,pp),'Futur I':'%s wird morgen %s %s.'%(nm,c,inf)}[te]
def f_zeit(t,r):
    k=cls_of(t);f=fam(t);n=0;tries=0
    tenses=['Präsens','Präteritum','Perfekt']+(['Plusquamperfekt','Futur I'] if (k>=5 or f=='plusquam') else [])
    while n<60 and tries<800:
        tries+=1;v=r.choice(VBS);nm=r.choice(NAMES)[0];te=r.choice(tenses);c=r.choice(VC[v[0]]);x=r.random();inf,pr,pt,pp,aux,st=v
        if x<.5:
            if t.mc(1 if te in tenses[:3] else 2,tsent(nm,v,te,c)+'\nIn welcher Zeitform steht der Satz?',te,[z for z in tenses if z!=te],'Achte auf das Verb und auf Wörter wie «heute», «gestern», «vorher», «morgen».',None):n+=1
        elif x<.8:
            te2=r.choice(tenses[:3]);core={'Präsens':pr,'Präteritum':pt,'Perfekt':aux+' '+pp}[te2]
            full=tsent(nm,v,te2,c)
            q=full.replace(core.split()[0] if te2!='Perfekt' else aux+' ',' ___ ' if False else '___ ',1) if False else None
            wr=[pr,pt,('ist ' if aux=='ist' else 'hat ')+pp,('hat ' if aux=='ist' else 'ist ')+pp]
            if te2=='Perfekt':
                qq='%s ___ gestern %s %s. (Perfekt)\nWelche Hilfsform passt?'%(nm,c,pp)
                if t.mc(2,qq,aux,['hat' if aux=='ist' else 'ist','wird','war'],'Bewegung oder Zustandsänderung: ist. Sonst: hat.',None):n+=1
            else:
                zeit='heute' if te2=='Präsens' else 'gestern'
                qq='%s ___ %s %s. (%s)\nWelche Form passt? Verb: «%s»'%(nm,zeit,c,te2,inf)
                if t.mc(2,qq,core,[w for w in [pr,pt,aux+' '+pp,'wird '+inf] if w!=core],'Bilde die Form des Verbs.',None):n+=1
        else:
            te2=r.choice(['Präteritum','Perfekt']);good=tsent(nm,v,te2,c)
            bad=tsent(nm,v,'Präsens',c).replace('heute','gestern')
            if bad!=good and t.fix(2,'Schreibe den Satz in der Zeitform %s. Verbessere im Feld.'%te2,bad,good,'Bilde die Form %s.'%te2):n+=1
def g_tense(r,k):
    v=r.choice(VBS);nm=r.choice(NAMES)[0];c=r.choice(VC[v[0]]);inf,pr,pt,pp,aux,st=v;x=r.random();wa='hat' if aux=='ist' else 'ist'
    if x<.3:return (2,'Setze die richtige Hilfsform ein (hat oder ist). Verbessere im Feld.',tsent(nm,v,'Perfekt',c).replace(' '+aux+' ',' '+wa+' ',1),tsent(nm,v,'Perfekt',c),'Bewegung und Zustandsänderung: ist. Sonst: hat.')
    if x<.5:return (2,'Schreibe im Präteritum. Verbessere im Feld.',tsent(nm,v,'Präsens',c).replace('heute','gestern'),tsent(nm,v,'Präteritum',c),'Präteritum: erzählte Vergangenheit.')
    if x<.7:
        good=tsent(nm,v,'Plusquamperfekt',c);bad=good.replace(' war ',' hatte ',1) if ' war ' in good else good.replace(' hatte ',' war ',1)
        return (3,'Schreibe im Plusquamperfekt. Verbessere im Feld.',bad,good,'Plusquamperfekt: hatte/war + Partizip II.')
    if x<.85:return (2,'Schreibe im Perfekt. Verbessere im Feld.',tsent(nm,v,'Präteritum',c),tsent(nm,v,'Perfekt',c),'Perfekt: hat/ist + Partizip II.')
    return (2,'Schreibe im Futur. Verbessere im Feld.',tsent(nm,v,'Präsens',c).replace('heute','morgen'),tsent(nm,v,'Futur I',c),'Futur: wird + Grundform.')
GEN['tense']=g_tense
def f_stamm(t,r):
    n=0
    for v in r.sample([x for x in VBS if x[5]],len([x for x in VBS if x[5]])):
        inf,pr,pt,pp,aux,_=v;nm=r.choice(NAMES)[0];c=r.choice(VC[inf])
        w1=['ge'+inf[:-2]+'t','ge'+inf,'ge'+(pr[:-1] if pr.endswith('t') else pr)+'t']
        if MC(t,2,'Wie heisst das Partizip II von «%s»?'%inf,pp,w1,'Starke Verben verändern oft den Vokal im Stamm.'):n+=1
        MC(t,2,'Wie heisst das Präteritum von «%s» (er/sie/es)?'%inf,pt,[inf[:-2]+'te',pr,inf[:-2]+'t'],'Das Präteritum ist oft unregelmässig.')
        t.inp(2,'Schreibe das Partizip II von «%s».'%inf,pp,'Der Stamm ändert sich.')
        wrong='ge'+(pr[:-1] if pr.endswith('t') else pr)+'t';good=tsent(nm,v,'Perfekt',c)
        bad=good.replace(' '+pp+'.',' '+wrong+'.')
        if bad!=good:t.fix(2,'Verbessere direkt im Feld.',bad,good,'Das ist ein starkes Verb.')
        MC(t,2,tsent(nm,v,'Präteritum',c)+'\nWie heisst die Grundform des Verbs?',inf,[pr,pp,pt],'Die Grundform endet auf -en.')

# --- sympathische Haupt-/Nebensaetze
NSC=[('Die Klasse lacht','weil','der Lehrer einen Witz erzählt','Kausalsatz'),('Der Hund bellt','weil','der Briefträger kommt','Kausalsatz'),('Anna freut sich','weil','heute Pizza auf dem Plan steht','Kausalsatz'),
('Tom zieht eine Jacke an','weil','es draussen kalt ist','Kausalsatz'),('Der Frosch quakt laut','weil','er Hunger hat','Kausalsatz'),('Mia lernt fleissig','weil','morgen ein Test ist','Kausalsatz'),
('Der Igel rollt sich ein','weil','ein Fuchs vorbeikommt','Kausalsatz'),('Wir bleiben drinnen','weil','es in Strömen regnet','Kausalsatz'),('Leo kichert','weil','sein Freund eine Grimasse schneidet','Kausalsatz'),
('Die Katze schnurrt','weil','sie gekrault wird','Kausalsatz'),('Ben ist müde','weil','er nachts ein Gespenst gehört hat','Kausalsatz'),('Lara klatscht','weil','ihr Team gewonnen hat','Kausalsatz'),
('Wir gehen schwimmen','wenn','die Sonne scheint','Konditionalsatz'),('Du darfst ein Eis essen','wenn','du dein Zimmer aufgeräumt hast','Konditionalsatz'),('Der Schneemann schmilzt','wenn','die Sonne scheint','Konditionalsatz'),
('Ich helfe dir','wenn','du mir ein Bonbon gibst','Konditionalsatz'),('Der Hund kommt sofort','wenn','du pfeifst','Konditionalsatz'),('Wir bauen einen Schneemann','wenn','es schneit','Konditionalsatz'),
('Die Blumen wachsen','wenn','du sie giesst','Konditionalsatz'),('Ich rufe dich an','wenn','ich zu Hause bin','Konditionalsatz'),('Die Katze miaut','wenn','sie Hunger hat','Konditionalsatz'),
('Wir waschen die Hände','bevor','wir essen','Temporalsatz'),('Anna liest ein Buch','während','der Hund schläft','Temporalsatz'),('Wir spielen draussen','bis','es dunkel wird','Temporalsatz'),
('Ich rufe dich an','sobald','ich zu Hause bin','Temporalsatz'),('Die Kinder rennen hinaus','sobald','die Pausenglocke läutet','Temporalsatz'),('Tom putzt die Zähne','nachdem','er gegessen hat','Temporalsatz'),
('Der Clown lacht','während','die Kinder klatschen','Temporalsatz'),('Wir singen ein Lied','bevor','die Schule aus ist','Temporalsatz'),('Die Maus schlüpft ins Loch','bevor','die Katze sie sieht','Temporalsatz'),
('Mia macht die Hausaufgaben','nachdem','sie ein Pausenbrot gegessen hat','Temporalsatz'),('Wir gehen spazieren','obwohl','es regnet','Konzessivsatz'),('Tom spielt draussen','obwohl','es kalt ist','Konzessivsatz'),
('Anna lacht','obwohl','sie hingefallen ist','Konzessivsatz'),('Der Hund schläft weiter','obwohl','die Kinder laut singen','Konzessivsatz'),('Leo isst ein Eis','obwohl','er schon Bauchweh hat','Konzessivsatz'),
('Die Schüler bleiben ruhig','obwohl','der Clown frech grinst','Konzessivsatz'),('Mia lernt weiter','obwohl','ihr Lieblingslied läuft','Konzessivsatz'),('Der Pinguin schwitzt nicht','obwohl','die Sonne scheint','Konzessivsatz'),
('Ich lerne fleissig','damit','ich gute Noten bekomme','Finalsatz'),('Wir stehen früh auf','damit','wir den Bus erreichen','Finalsatz'),('Sie spart Geld','damit','sie ein Fahrrad kaufen kann','Finalsatz'),
('Der Lehrer erklärt es nochmal','damit','alle es verstehen','Finalsatz'),('Ich schreibe es auf','damit','ich es nicht vergesse','Finalsatz'),('Papa packt ein Pausenbrot ein','damit','ich nicht hungrig bleibe','Finalsatz'),
('Anna malt ein Bild','damit','ihre Oma sich freut','Finalsatz'),('Der Hausmeister streut Salz','damit','niemand ausrutscht','Finalsatz'),('Ich weiss','dass','du ein guter Freund bist','Dass-Satz'),
('Er sagt','dass','die Pizza fantastisch schmeckt','Dass-Satz'),('Wir hoffen','dass','morgen die Sonne scheint','Dass-Satz'),('Sie glaubt','dass','der Hund ihre Hausaufgaben gefressen hat','Dass-Satz'),
('Ich finde','dass','Schule Spass macht','Dass-Satz'),('Die Lehrerin freut sich','dass','alle mitmachen','Dass-Satz'),('Tom meint','dass','der Sonntag der beste Tag ist','Dass-Satz'),('Mia verspricht','dass','sie nicht mehr kichert','Dass-Satz')]
NS0=list(NSC);NS[:]=NSC;NSALL=list(NSC)
HS+=[('Der Hund will die Wurst','aber','der Tisch ist zu hoch'),('Anna liebt Sonntage','denn','da gibt es Pfannkuchen'),('Die Katze schläft','aber','der Hund jagt den Ball'),('Ich esse gern Pizza','aber','Spinat mag ich nicht'),
('Heute ist Sonntag','denn','die Schule hat zu'),('Leo ist klein','doch','er springt hoch wie ein Känguru'),('Wir gehen nicht nach Hause','sondern','wir spielen noch Fussball'),('Lena lacht laut','denn','der Clown stolpert über seine Schuhe'),
('Der Bus kommt spät','aber','die Klasse singt fröhlich weiter'),('Der Papagei spricht','doch','niemand versteht ihn'),('Die Hausaufgaben sind fertig','denn','Mia hat schnell gearbeitet'),('Mein Opa kocht heute','aber','die Suppe ist versalzen'),
('Anna bastelt einen Roboter','denn','sie will ihn zum Geburtstag schenken'),('Der Pinguin watschelt','doch','er will lieber fliegen')]
REL[:]=[('Der Hund','der im Garten buddelt','ist ganz schmutzig'),('Die Katze','die auf dem Sofa schläft','heisst Mimi'),('Das Mädchen','das so laut lacht','ist meine Freundin'),('Der Clown','der über seine Schuhe stolpert','bringt alle zum Lachen'),
('Die Lehrerin','die uns ein Märchen vorliest','ist sehr nett'),('Der Papagei','der unsere Namen kennt','sitzt auf dem Schrank'),('Das Eis','das ich esse','schmeckt nach Erdbeere'),('Die Pizza','die Papa gebacken hat','duftet herrlich'),
('Der Junge','der neben mir sitzt','erzählt immer Witze'),('Das Känguru','das im Zoo wohnt','hüpft den ganzen Tag'),('Die Schildkröte','die langsam läuft','gewinnt trotzdem das Rennen'),('Der Pirat','der den Schatz sucht','hat nur ein Holzbein')]
RELALL=list(REL)

# --- Korrekturen v4.85b
def _pl3(v):
    if v in PL2:return PL2[v]
    if v.endswith('iert'):return v[:-1]+'en'
    if v.endswith('elt') or v.endswith('ert'):return v[:-1]+'n'
    if v.endswith('et'):return v[:-2]+'en'
    if v.endswith('sst'):return None
    return v[:-1]+'en'
WEAKC=[w for w in WEAK if w[0] in VC]
def g_agree(r,k):
    inf,stem=r.choice(WEAKC);sj,p=r.choice(SUBJ);bad=r.choice([x for x in('ich','du','er','wir','ihr','sie') if conj(stem,x)!=conj(stem,p)]);c=r.choice(VC[inf])
    return (2,'Das Verb passt nicht zum Subjekt. Verbessere im Feld.','%s %s %s.'%(sj,conj(stem,bad),c),'%s %s %s.'%(sj,conj(stem,p),c),'Das Verb richtet sich nach dem Subjekt.')
GEN['agree']=g_agree
LOCN=['Tisch','Stuhl','Haus','Baum','Bank','Wiese','Schule','Garten','Dach','Rutsche','Schaukel','Bett','Sofa','Schrank','Regal','Hügel','Teich','Spielplatz','Schulhof','Burg','Insel','Wolke','Trampolin','Pfütze','Treppe','Wand','Zelt','Bus','Wald','Berg']
GOODS=['Tasche','Jacke','Mütze','Heft','Stift','Ball','Velo','Hose','Socke','Kissen','Brille','Pizza','Eis','Kuchen','Bonbon','Roller','Rucksack','Buch','Apfel','Ballon','Schal','Löffel']
def g_case(r,k):
    cs=r.choice(['akk','dat']);ad=r.choice(ADJ) if r.random()<.3 else None
    if cs=='akk':
        if r.random()<.5:nn=r.choice(pool('person')+pool('tier'));f=r.choice(['Ich sehe %s.','Wir besuchen %s.','Sie ruft %s.','Er füttert %s.' if nn[4]=='tier' else 'Er grüsst %s.'])
        else:nn=NB[r.choice(GOODS)];f=r.choice(['Er kauft %s für uns.','Sie schenkt mir %s.','Ich suche %s.','Wir brauchen %s.'])
    else:
        if r.random()<.5:nn=r.choice(pool('person')+pool('tier'));f=r.choice(['Ich helfe %s.','Sie dankt %s.','Wir winken %s.','Er gratuliert %s.' if nn[4]=='person' else 'Er hilft %s.'])
        else:nn=NB[r.choice(LOCN)];f=r.choice(['Wir sitzen auf %s.','Der Ball liegt unter %s.','Die Katze schläft neben %s.','Ich warte vor %s.','Der Hund versteckt sich hinter %s.'])
    good=f%NP(nn,cs,ad)
    wr={'akk':{'m':'dem','f':'der','n':'dem'},'dat':{'m':'den','f':'die','n':'das'}}[cs][nn[2]];right=A(nn[2],cs)
    bad=good.replace(right+' ',wr+' ',1)
    return (3,'Der Artikel ist falsch. Verbessere im Feld.',bad,good,'Frage: %s'%('Wen oder was?' if cs=='akk' else 'Wem?')) if bad!=good else None
GEN['case']=g_case
VBS=[v for v in VBS if v[0] not in('liegen','sitzen')]
def _front(a,cj,b):
    w=a.split()
    if len(w)<3 or w[0] in('Die','Der','Das','Papa','Mama') or 'sich' in w:return None
    inv=[w[1],w[0].lower() if w[0] not in NAMESET else w[0]]+w[2:]
    return '%s %s, %s'%(cj.capitalize(),b,' '.join(inv))+'.'
NAMESET={n for n,_ in NAMES}|{'Tom','Anna','Mia','Leo','Ben','Lara'}
def g_cnsv(r,k):
    a,cj,b,_=r.choice(NSALL);good=_front(a,cj,b)
    if not good:return None
    return (3,'Setze das Komma. Verbessere im Feld.',good.replace(', ',' ',1) if False else good.replace(b+',',b,1),good,'Steht der Nebensatz vorne, folgt nach ihm ein Komma.')
def g_nsord2(r,k):
    a,cj,b,_=r.choice(NSALL);good=_front(a,cj,b);w=b.split()
    if not good or len(w)<2:return None
    bad='%s %s %s, %s.'%(cj.capitalize(),w[-1],' '.join(w[:-1]),good.split(', ',1)[1][:-1])
    return (3,'Im Nebensatz steht das Verb am Ende. Verbessere im Feld.',bad,good,'Im Nebensatz steht das Verb ganz hinten.')
GEN['cnsv']=g_cnsv;GEN['nsord2']=g_nsord2
for _f in('hauptneben','nebensatzarten','kommaerw'):FIXSET[_f]=list(dict.fromkeys(FIXSET[_f]+['cnsv','nsord2']))

def add_examples(c):
    import de_ex;miss=set();n=0
    for t in c['topics']:
        if t['subject']!='deu':continue
        for e in t['explain']:
            if e['h']!='So gehst du vor':continue
            for v in e['visuals']:
                if v['type']!='lines':continue
                for it in v['items']:
                    ex=de_ex.EX.get(it[0])
                    if ex:
                        while len(it)<3:it.append('')
                        it[2]=ex;n+=1
                    else:miss.add(it[0])
    print('Beispiele',n,'ohne:',sorted(miss))

def replace_fehler(c):
    import de_ex;n=0
    for t in c['topics']:
        if t['subject']!='deu':continue
        k=de_ex.worked_key(t['id'])
        if not k:continue
        txt,groups,cap=de_ex.ANNO[k]
        for i,e in enumerate(t['explain']):
            if e['h'] in('Typische Fehler','Ein Beispiel Schritt für Schritt'):
                t['explain'][i]={"h":"Ein Beispiel gezeichnet","text":txt,"visuals":[{"type":"anno","groups":groups,"cap":cap}]};n+=1
    print('Fehler ersetzt',n)

LETA='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
def f_alphabet(t,r):
    pass  # Karten kommen aus de4.alphabet + boost
def g_abc_miss(r,k):
    L=r.choice([5,6,7,8]) if k>=4 else r.choice([4,5,6]);a=r.randrange(0,27-L);run=list(LETA[a:a+L]);drop=r.sample(range(1,L-1),1 if L<7 else 2)
    pre=', '.join(x for i,x in enumerate(run) if i not in drop)
    return (2,'Es fehlen Buchstaben. Verbessere im Feld.',pre,', '.join(run),'Sage das ABC leise auf.')
def g_abc_swap(r,k):
    L=r.choice([5,6,7]);a=r.randrange(0,27-L);run=list(LETA[a:a+L]);i=r.randrange(0,L-1);p=run[:];p[i],p[i+1]=p[i+1],p[i]
    return (2,'Zwei Buchstaben sind vertauscht. Verbessere im Feld.',', '.join(p),', '.join(run),'Sage das ABC leise auf.')
def g_abc_back(r,k):
    L=r.choice([4,5,6]);a=r.randrange(0,27-L);run=list(LETA[a:a+L])
    return (3,'Schreibe die Buchstaben rückwärts. Verbessere im Feld.',', '.join(run),', '.join(run[::-1]),'Beginne beim letzten Buchstaben.')
def g_abc_next(r,k):
    i=r.randrange(1,24);run=[LETA[i-1],LETA[i],LETA[i+1]]
    bad=[LETA[i-1],LETA[i],LETA[i+2]]
    return (2,'Das ABC ist falsch. Verbessere im Feld.',', '.join(bad),', '.join(run),'Sage das ABC leise auf.')
GEN['abc_miss']=g_abc_miss;GEN['abc_swap']=g_abc_swap;GEN['abc_back']=g_abc_back;GEN['abc_next']=g_abc_next
FIXSET['alphabet']=['abc_miss','abc_swap','abc_back','abc_next','alpha']
