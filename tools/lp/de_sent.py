"""Sympathische, sinnvolle Satzbausteine fuer die Deutsch-Karten (v4.85)."""
import random
NEWN=[('Klasse','Klassen','f','Klasse','person'),('Wasser','Wasser','n','Wassers','ding'),('Pilz','Pilze','m','Pilzes','ding'),('Nuss','Nüsse','f','Nuss','ding'),('Schülerin','Schülerinnen','f','Schülerin','person'),('Elefant','Elefanten','m','Elefanten','tier'),('Pinguin','Pinguine','m','Pinguins','tier'),('Delfin','Delfine','m','Delfins','tier'),('Papagei','Papageien','m','Papageis','tier'),('Drache','Drachen','m','Drachen','tier'),
('Esel','Esel','m','Esels','tier'),('Hamster','Hamster','m','Hamsters','tier'),('Käfer','Käfer','m','Käfers','tier'),('Giraffe','Giraffen','f','Giraffe','tier'),('Spinne','Spinnen','f','Spinne','tier'),
('Schildkröte','Schildkröten','f','Schildkröte','tier'),('Eule','Eulen','f','Eule','tier'),('Krokodil','Krokodile','n','Krokodils','tier'),('Zebra','Zebras','n','Zebras','tier'),
('Eichhörnchen','Eichhörnchen','n','Eichhörnchens','tier'),('Meerschweinchen','Meerschweinchen','n','Meerschweinchens','tier'),('Känguru','Kängurus','n','Kängurus','tier'),
('Pirat','Piraten','m','Piraten','person'),('Clown','Clowns','m','Clowns','person'),('Zauberer','Zauberer','m','Zauberers','person'),('Superheld','Superhelden','m','Superhelden','person'),
('Roboter','Roboter','m','Roboters','person'),('Hexe','Hexen','f','Hexe','person'),('Prinzessin','Prinzessinnen','f','Prinzessin','person'),('König','Könige','m','Königs','person'),
('Ritter','Ritter','m','Ritters','person'),('Schulleiterin','Schulleiterinnen','f','Schulleiterin','person'),('Hausmeister','Hausmeister','m','Hausmeisters','person'),('Gespenst','Gespenster','n','Gespenstes','person'),
('Pizza','Pizzen','f','Pizza','ding'),('Schokolade','Schokoladen','f','Schokolade','ding'),('Wurst','Würste','f','Wurst','ding'),('Rutsche','Rutschen','f','Rutsche','ding'),('Schaukel','Schaukeln','f','Schaukel','ding'),
('Pfütze','Pfützen','f','Pfütze','ding'),('Hausaufgabe','Hausaufgaben','f','Hausaufgabe','ding'),('Pause','Pausen','f','Pause','ding'),('Geschichte','Geschichten','f','Geschichte','ding'),('Rakete','Raketen','f','Rakete','ding'),
('Burg','Burgen','f','Burg','ding'),('Insel','Inseln','f','Insel','ding'),('Wolke','Wolken','f','Wolke','ding'),('Trommel','Trommeln','f','Trommel','ding'),('Gitarre','Gitarren','f','Gitarre','ding'),
('Eis','Eis','n','Eises','ding'),('Pausenbrot','Pausenbrote','n','Pausenbrotes','ding'),('Trampolin','Trampoline','n','Trampolins','ding'),('Schloss','Schlösser','n','Schlosses','ding'),('Schiff','Schiffe','n','Schiffes','ding'),
('Zelt','Zelte','n','Zeltes','ding'),('Lied','Lieder','n','Liedes','ding'),('Märchen','Märchen','n','Märchens','ding'),('Klassenzimmer','Klassenzimmer','n','Klassenzimmers','ding'),('Schwimmbad','Schwimmbäder','n','Schwimmbades','ding'),
('Rätsel','Rätsel','n','Rätsels','ding'),('Fest','Feste','n','Festes','ding'),('Fahrrad','Fahrräder','n','Fahrrads','ding'),('Bonbon','Bonbons','n','Bonbons','ding'),('Pool','Pools','m','Pools','ding'),
('Witz','Witze','m','Witzes','ding'),('Regenbogen','Regenbogen','m','Regenbogens','ding'),('Ballon','Ballons','m','Ballons','ding'),('Schneemann','Schneemänner','m','Schneemannes','ding'),('Keks','Kekse','m','Keks','ding'),
('Mond','Monde','m','Mondes','ding'),('Stern','Sterne','m','Sterns','ding'),('Schatz','Schätze','m','Schatzes','ding'),('Bus','Busse','m','Busses','ding'),('Roller','Roller','m','Rollers','ding'),('Hügel','Hügel','m','Hügels','ding'),
('Teich','Teiche','m','Teiches','ding'),('Spielplatz','Spielplätze','m','Spielplatzes','ding'),('Schulhof','Schulhöfe','m','Schulhofes','ding'),('Pausenhof','Pausenhöfe','m','Pausenhofes','ding')]
FOOD={'Wurst','Pizza','Eis','Kuchen','Suppe','Brot','Apfel','Schokolade','Keks','Banane','Birne','Torte','Pausenbrot','Karotte','Bonbon'}
SADJ={'tier':['frech','hungrig','müde','schlau','klein','gross','mutig','lustig','neugierig','schnell','brav'],'person':['freundlich','mutig','lustig','müde','frech','schlau','nett','fleissig','laut','neugierig']}
OADJ=['gross','klein','neu','alt','bunt','schwer','leicht']
FOODADJ=['lecker','süss','warm','frisch','gross','klein']
# (Subjekt, Verb 3.Sg, Objekt|None, Zusatz mit Wortart-Tags N V A J P D R K)
F=[('Hund','klaut','Wurst','vom:P Tisch:N'),('Katze','jagt','Maus','durch:P den:A Garten:N'),('Frosch','fängt','Käfer','am:P Teich:N'),('Pirat','vergräbt','Schatz','auf:P der:A Insel:N'),
('Zauberer','zaubert','Kaninchen','aus:P dem:A Hut:N'),('Clown','wirft','Ball','in:P die:A Luft:N'),('Lehrerin','erzählt','Witz','in:P der:A Pause:N'),('Lehrerin','liest','Märchen','vor:P der:A Klasse:N'),
('Hausmeister','repariert','Fahrrad','vor:P der:A Schule:N'),('Koch','backt','Pizza','im:P Ofen:N'),('Bäcker','backt','Brot','am:P Morgen:N'),('Mädchen','malt','Regenbogen','an:P die:A Tafel:N'),
('Junge','baut','Burg','im:P Sand:N'),('Papagei','klaut','Keks','aus:P der:A Dose:N'),('Elefant','spritzt','Wasser','auf:P den:A Zoowärter:N'),('Kind','isst','Eis','im:P Park:N'),('Opa','erzählt','Geschichte','am:P Abend:N'),
('Oma','strickt','Mütze','für:P ihren:A Enkel:N'),('Superheld','rettet','Katze','vom:P Baum:N'),('Ritter','verteidigt','Burg','gegen:P den:A Drachen:N'),('Hexe','kocht','Suppe','im:P grossen:J Kessel:N'),
('Roboter','trägt','Rucksack','zur:P Schule:N'),('Schüler','löst','Rätsel','in:P der:A Pause:N'),('Schülerin','zeichnet','Schneemann','auf:P ihr:A Heft:N'),('Trainer','pumpt','Ballon','für:P das:A Fest:N'),
('Igel','sucht','Pilz','im:P Wald:N'),('Eichhörnchen','versteckt','Nuss','unter:P dem:A Baum:N'),('Vater','kocht','Suppe','für:P die:A Familie:N'),('Mutter','packt','Pausenbrot','in:P den:A Rucksack:N'),
('Bruder','schiesst','Ball','ins:P Tor:N'),('Schwester','singt','Lied','im:P Chor:N'),('Freundin','schenkt','Bonbon','ihrer:A Nachbarin:N'),('Pinguin','rutscht',None,'den:A Hügel:N hinunter:D'),
('Elefant','badet',None,'im:P Teich:N'),('Krokodil','gähnt',None,'laut:D im:P Schlamm:N'),('Schildkröte','läuft',None,'langsam:D über:P die:A Wiese:N'),('Hamster','schläft',None,'tief:D in:P seinem:A Häuschen:N'),
('Giraffe','schaut',None,'über:P den:A Zaun:N'),('Känguru','springt',None,'hoch:D über:P den:A Bach:N'),('Eule','sitzt',None,'nachts:D auf:P dem:A Ast:N'),('Delfin','springt',None,'fröhlich:D aus:P dem:A Wasser:N'),
('Gespenst','spukt',None,'nachts:D im:P Schloss:N'),('Clown','stolpert',None,'über:P seine:A grossen:J Schuhe:N'),('Prinzessin','tanzt',None,'im:P Garten:N'),('Drache','schnarcht',None,'laut:D in:P der:A Höhle:N'),
('Klasse','lacht',None,'über:P den:A Witz:N'),('Schüler','wartet',None,'auf:P den:A Bus:N'),('Zebra','rennt',None,'schnell:D durch:P die:A Steppe:N'),('Spinne','krabbelt',None,'langsam:D die:A Wand:N hinauf:D'),
('Esel','trottet',None,'müde:D nach:P Hause:N'),('Hase','hoppelt',None,'über:P die:A Wiese:N'),('Fuchs','schleicht',None,'leise:D zum:P Hühnerstall:N'),('Bär','brummt',None,'zufrieden:D in:P seiner:A Höhle:N'),
('Affe','schaukelt',None,'am:P Seil:N'),('Löwe','brüllt',None,'laut:D im:P Zoo:N'),('Frosch','quakt',None,'am:P Teich:N'),('Ente','schwimmt',None,'auf:P dem:A Teich:N'),('Pferd','galoppiert',None,'über:P die:A Weide:N'),
('Maus','piepst',None,'unter:P dem:A Bett:N'),('Käfer','krabbelt',None,'über:P mein:A Heft:N'),('Biene','summt',None,'um:P die:A Blume:N'),('Schaf','blökt',None,'auf:P der:A Wiese:N'),
('Lehrer','gähnt',None,'vor:P der:A Pause:N'),('Mann','lacht',None,'über:P den:A Clown:N'),('Frau','wartet',None,'am:P Bahnhof:N'),('Arzt','lächelt',None,'freundlich:D im:P Zimmer:N'),
('Kind','hüpft',None,'auf:P dem:A Trampolin:N'),('Mädchen','rutscht',None,'auf:P der:A Rutsche:N'),('Junge','schaukelt',None,'hoch:D auf:P dem:A Spielplatz:N'),('Schüler','rennt',None,'über:P den:A Pausenhof:N'),
('Gärtner','giesst','Blume','am:P Morgen:N'),('Fahrer','hält','Bus','vor:P der:A Schule:N'),('Tante','bringt','Kuchen','zum:P Fest:N'),('Onkel','grillt','Wurst','im:P Garten:N'),('Nachbar','repariert','Roller','vor:P dem:A Haus:N'),
('Sängerin','singt','Lied','auf:P der:A Bühne:N'),('Maler','malt','Wolke','an:P die:A Wand:N'),('Polizist','sucht','Schlüssel','im:P Schulhaus:N'),('Pilot','fliegt','Rakete','zum:P Mond:N'),('König','isst','Torte','im:P Schloss:N')]
TAG={'N':'Nomen','V':'Verb','A':'Artikel','J':'Adjektiv','P':'Präposition','D':'Adverb','R':'Pronomen','K':'Konjunktion'}
def _extra(s):
    return [(w.split(':')[0],TAG[w.split(':')[1]]) for w in s.split()]
