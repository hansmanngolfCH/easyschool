# Inhaltsprüfung: «Plusrechnen bis 100» (Klasse 2)

Datei: plus100_neu.json (9 Theorieseiten, 104 Karten, 86 Prüfungsfragen).
Methode: Alle Karten und Prüfungsfragen per Python-Skript nachgerechnet (Terme, Platzhalter, Zahlenmauern inkl. Konsistenz der Steine, Ketten, Rechenstrich-Enden, Einkauf, Reicht-ein-Hunderter, Fehler-finden, Tauschaufgaben mit Auswertung aller Optionen, Zwischenschritte in `steps`/`explain`). Kontrolle auf ß, Doppelleerzeichen, Sonderzeichen.

## Rechenergebnis (positiv)
- 0 Rechenfehler: alle 104 Karten und 86 Prüfungsfragen haben eine korrekte markierte Antwort.
- Bei jeder Frage ist genau eine Option richtig, keine doppelten Optionen, alle Zahlen im Raum bis 100 (inkl. Distraktoren).
- Alle Zwischenschritte (`steps`, `explain`) stimmen. Alle 10 Zahlenmauern sind in sich stimmig. Alle Rechenstrich-Visuals (jumps) passen zur Aufgabe.
- Keine ß, kein «Hunderter»-Fehler, «Fr.» korrekt. Rechtschreibung der Texte insgesamt fehlerfrei.
- Antwortposition der Prüfungs-MC ausgewogen (Index 0/1/2/3 = 21/33/28/18).

## Mängelliste

### Hoch

1. **exam.questions q17–q86 (70 von 86 Fragen)** – Problem: Die Prüfung ist zu 81 % eine Kopie der Lernkarten (gleiche Frage, gleiche Zahlen, gleiche Distraktoren, nur Optionsreihenfolge gemischt). Neu sind nur q1–q16 (reine Plusaufgaben). Kinder, die die Karten geübt haben, erinnern sich an Antworten, statt zu rechnen; die Prüfung misst Auswendiglernen. Vorschlag: Alle Nicht-Plus-Typen (Zerlegen, Ergänzen, Platzhalter, Tausch, Schätzen, Mauer, Kette, Fehler, Einkauf, bis 100, Rechenstrich) mit neuen Zahlen und Namen für die Prüfung erzeugen; keine Karte 1:1 übernehmen. Schwere: hoch.

2. **exam (Gesamtumfang, minutes: 20)** – Problem: 86 Fragen in 20 Minuten sind für Zweitklässler unmöglich (ca. 14 Sekunden pro Frage); das Konzept nennt «16+ Fragen». Vorschlag: 16 bis 20 Fragen, gemischt aus allen Typen (z. B. 4 Plus, 2 Platzhalter, 2 Rechenstrich/Mauer, 2 Kette, 2 Fehler, 2 Einkauf, 2 Schätzen/Tausch, 2 bis 100); sonst `minutes` realistisch anpassen. Schwere: hoch.

3. **exam q1–q16 und cards c27–c34 (Thema «Zehnerübergang»)** – Problem: Das Kernthema des Konzepts (zweistellig + zweistellig mit Zehnerübergang, Seiten 5, 7, 8) wird kaum geprüft. Alle 16 Prüfungs-Plusaufgaben haben Einersumme < 10 (ohne Übergang). Bei den 8 Karten mit `th: uber` ist die Einersumme in 5 Fällen genau 10 (24+26, 21+59, 44+36, 57+13, 45+45), nur 3 haben echten Übergang mit Rest (19+76, 33+29, 47+17). Alle 8 sind `lvl: 2`, das Konzept verlangt «mit Übergang» auf Stufe 3. Die Platzhalter-Aufgaben (c15–c20, c47–c56) und die Sachaufgaben c21–c26 haben ebenfalls nie einen Übergang. Vorschlag: Mindestens 10 weitere Karten mit Einersumme 11 bis 18 (z. B. 36+27, 48+35, 29+46, 57+18, 38+45, 25+37, 49+24), als `lvl: 3`; in der Prüfung mindestens 5 der Plusaufgaben mit Übergang (z. B. 38+25, 47+26, 19+54); Einersumme genau 10 getrennt als leichtere Zwischenstufe kennzeichnen. Schwere: hoch.

### Mittel

4. **explain (Seiten 1–9) gegenüber cards** – Problem: Mehrere Kartentypen werden nirgends erklärt: Zahlenmauer (10 Karten), Rechenkette (5), Ergänzen/Platzhalter (22), bis 100 ergänzen (6), Schätzen/Runden (5; Hinweis «Runde beide Zahlen auf Zehner» setzt Runden voraus), Sachaufgabe/Einkauf (14). Die Hinweise «Zwei Nachbarn ergeben den Stein darüber» und «Erst bis zum nächsten Zehner, dann bis 100» sind die einzige Erklärung. Vorschlag: Zwei Kurzseiten ergänzen (a) «Zahlenmauer» mit einem gelösten Beispiel und (b) «Fehlende Zahl finden / bis 100 ergänzen» mit Rechenstrich (+5, +60). Für Schätzen: eine Zeile «35 ist fast 40» oder Aufgabentyp streichen. Schwere: mittel.

5. **cards c82–c86 und exam q64–q68 (Fehler finden)** – Problem: Alle 5 Aufgaben haben dieselbe Fehlerart und dieselbe richtige Antwort, die Option «Nichts, es stimmt» ist nie richtig, «Die Zehner/Einer zu addieren» ist offensichtlich unsinnig. Der Hinweis («Rechne die Einer: 6 + 7») verrät den Lösungsweg, die Antwort «Den Zehner von der Einer-Summe» ist für 7-Jährige sprachlich sperrig («Einer-Summe»). c82/q64 (36+27=53) ist wortgleich mit Seite 7. Vorschlag: Antwort umformulieren, z. B. «Er hat 6 + 7 = 13 gerechnet, aber den Zehner nicht dazugezählt.» (kurz: «Den Zehner vergessen»); mind. 1 bis 2 Aufgaben mit korrekter Rechnung (dann ist «Nichts, es stimmt» richtig); eine Aufgabe mit anderem Fehler (z. B. Einer und Zehner vertauscht, 36+27=59). Seite-7-Beispiel nicht als Karte/Prüfung wiederverwenden. Schwere: mittel.

6. **cards c88, c90, c92, c94 und exam q70, q72, q74, q76 («Reicht ein Hunderter?»)** – Problem: Alle vier Antworten lauten «ja»; mit 73, 51, 90, 75 ist die Frage zudem ohne Rechnen erratbar (Antwort «ja» ist immer richtig). Es gibt keinen Lerneffekt und keine Unterscheidung. Vorschlag: Mindestens 2 von 4 mit Ergebnis über 100, z. B. 65 Fr. + 48 Fr. = 113 («nein»), 57 Fr. + 46 Fr. = 103; Frage umformulieren «Reicht ein Hunderter (100 Fr.)?». Schwere: mittel.

7. **cards c87, c89, c91, c93 und exam q69, q71, q73, q75 (Einkauf)** – Problem: Grammatik: Artikel fehlen («Mia kauft Heft für 45 Fr. und Stifte …», «Ball … Seil», «Buch … Karte», «Mütze … Schal»); «Wie viel kostet das zusammen?» ist uneindeutig (was ist «das»?). Vorschlag: «Mia kauft ein Heft für 45 Fr. und Stifte für 28 Fr. Wie viel bezahlt sie zusammen?» (Leo: einen Ball, ein Seil; Nora: ein Buch, eine Karte; Ben: eine Mütze, einen Schal). Schwere: mittel.

8. **cards (Stufung `lvl`)** – Problem: Die Stufen entsprechen nicht der Schwierigkeit. Stufe 3 (45 Karten) enthält viele sehr leichte Aufgaben: Sachaufgaben c21–c26 ohne Übergang (22+64 usw.), 8 von 10 Zahlenmauern nur mit vollen Zehnern, Ketten c77–c81 nur additive Schritte. Stufe 2 «uber» (c27–c34) ist dagegen schwerer als vieles auf Stufe 3. Stufe 1 enthält 14 gleiche Rechnungen ohne Abwechslung (c1–c14). Verteilung: Stufe 1 = 26, Stufe 2 = 33, Stufe 3 = 45; knifflige Aufgaben im engeren Sinn (Übergang, Platzhalter mit Übergang, Mauer mit Einern) fehlen. Vorschlag: Sachaufgaben auf Stufe 2, einfache Mauern auf Stufe 2; Stufe 3 für Übergangsaufgaben (siehe 3), Mauern mit Einern (z. B. 14/26/35 oben 75), Platzhalter mit Übergang (37 + ? = 72), Ketten mit Übergang (28 + 5 + 30 + 7); Stufe-1-Block c1–c14 auf 8 kürzen. Schwere: mittel.

9. **cards c47–c56 (Platzhalter vorne/hinten)** – Problem: 5 Zahlenpaare werden doppelt gestellt (34+?=59 und ?+25=59 usw.); die zweite Frage ist nach der Tauschregel gleich leicht. Dazu gehören exam q29–q38. Alle ohne Übergang (z. B. 51+?=79: 1+8=9). Wirkt wie Kopie, keine Steigerung. Vorschlag: Pro Zahlenpaar nur eine Variante, dafür Platzhalter-Aufgaben mit Übergang (38+?=71, 27+?=63) auf Stufe 3 und «?+ …» nur dort. Schwere: mittel.

10. **cards c67–c76 / exam q49–q58 (Zahlenmauer)** – Problem: Es sind nur 5 verschiedene Mauern, jede zweimal («oben» und «Mitte fehlt»). Die gesuchte Mitte ist durch die Grundreihe sofort aus zwei Wegen bestimmbar (überbestimmt). «Welche Zahl fehlt in der Mitte?» ist mehrdeutig (Mitte der Mauer oder mittlere Reihe?). Fast alle Steine sind volle Zehner. Vorschlag: «Welche Zahl fehlt in der linken Zeile?» oder «im mittleren Stein der zweiten Reihe»; Mauern mit Einern und mind. eine Aufgabe mit fehlendem Stein in der Grundreihe (Mitte 50, oben 90, unten 20/?/10); Kopien streichen. Schwere: mittel.

11. **explain Seite 6 «Geschickt rechnen», zweiter chips-Block** – Problem: Fachlich/Leseführung: «35 + 35 | 70 | 35 + 36 | = 70 + 1 = | 71» liest sich ohne Gleichheitszeichen nach «35 + 35 70 35 + 36 …» und mischt zwei Aufgaben in einer Kette. Der erste Block («3 + 45 = 45 + 3 = 48») ist korrekt. «das Doppelte» wird nicht erklärt. Vorschlag: Zwei getrennte Zeilen: «35 + 35 = 70» und «35 + 36 = 70 + 1 = 71», dazu Text «Hilfsaufgabe: 35 + 35 kennst du. 35 + 36 ist 1 mehr.» Schwere: mittel.

12. **explain Seite 8 «Probe»** – Problem: Die Probe verlangt 63 − 27 (Minus mit Zehnerübergang), das ist schwerer als die eigentliche Plusaufgabe und für Klasse 2 am Ende des Themas «Plusrechnen» heikel; ein Rechenstrich mit einem Sprung «−27» zeigt den Weg nicht. Die Probe wird in keiner Karte und keiner Prüfungsfrage geübt, obwohl sie im Konzept (Seite 8) vorkommt. Vorschlag: Probe mit leichterem Beispiel (34 + 25 = 59, 59 − 25 = 34, ohne Übergang), Rechenstrich mit zwei Sprüngen (−20, −5); 2 bis 3 Karten «Probe: Stimmt 43 + 28 = 71? Rechne 71 − 28» ergänzen oder Seite kürzen. Schwere: mittel.

13. **cards (hints/steps), v. a. c1–c14, c35–c40, c47–c61, c67–c76** – Problem: 42 Karten haben als `steps` nur die Lösung («5 | Ergebnis»), also keinen Lösungsweg; 19 Karten haben denselben Hinweis «Rechne Schritt für Schritt.»; je Karte nur 1 Hinweis. c35–c40 («Das sind die Einer.») und c82–c86 verraten fast die Lösung; c15–c20 und c47–c56 verlangen «Rechne zurück mit Minus» (Minus als Hilfsmittel nicht eingeführt, Hinweis c48 «Tauschen darf man beim Plus» ist bei c50 u. a. ohne Erklärung). Vorschlag: Bei Platzhaltern Weg im Step zeigen («34 + 6 = 40, 40 + 19 = 59, 6 + 19 = 25»), bei Mauern «30 + 50 = 80», bei Einkauf «45 + 28: 40 + 20 = 60, 5 + 8 = 13, 73». Hinweise abstufen (Tipp 1 allgemein, Tipp 2 konkreter). Schwere: mittel.

14. **cards c95–c100 und exam q77–q82 (bis 100 ergänzen)** – Problem: Der Hinweis verlangt «Erst bis zum nächsten Zehner, dann bis 100», das Bild zeigt aber nur einen einzigen Sprung (z. B. 35 → ? mit Sprung 65). Das Bild widerspricht dem Tipp. Vorschlag: Visual mit Zwischenhalt (35 +5 → 40 +60 → 100; 48 +2 → 50 +50 → 100), Endzahl 100 sichtbar, nur der Sprung «?» offen. Schwere: mittel.

### Niedrig

15. **explain Seite 7 «Typischer Fehler»** – Problem: «ein Zehner kommt dazu» ist vage («Dazu wohin?»). Die falsche Gleichung «36 + 27 = 53» steht ausgeschrieben im Chip (gekennzeichnet mit ❌, vertretbar). Vorschlag: Text: «Ben rechnet 36 + 27 = 53. Das stimmt nicht. 6 + 7 sind 13. Das sind 1 Zehner und 3 Einer. Den Zehner hat Ben vergessen.» Schwere: niedrig.

16. **explain Seite 4 / Seite 1 / theory.uber** – Problem: Seite 4 nennt die Aufgabe 34 + 25 nicht; Seite 1 zeigt nie das Ergebnis; nirgends steht als Ganzes «34 + 25 = 59». `theory.uber`: Zeile «47 + 26 → 60 + 13 = 73» lässt die Teilrechnungen (40 + 20, 7 + 6) weg und ist anders aufgebaut als `theory.basis` («30 + 20 = 50, 4 + 5 = 9, 59» mit nacktem «59»). Begriffe «Summe», «Einer-Summe» sind für Klasse 2 schwer. Vorschlag: Seite 4 Text «So rechnest du 34 + 25 auch:»; Seite 1 Cap «34 + 25 = 59»; theory.uber: «40 + 20 = 60, 7 + 6 = 13, 60 + 13 = 73»; «Summe» durch «zusammen» ersetzen. Schwere: niedrig.

17. **explain Seite 9 «Regeln und Wichtigstes»** – Problem: Text «Das ist wichtig.» ist Füllsatz; Karte «38 + 2 + 3» ist ohne Anfang unvollständig (richtiger: «38 + 5 = 38 + 2 + 3»); Titel sperrig. Vorschlag: Titel «Das Wichtigste», Text «Merke dir diese drei Wege.», Karte «38 + 5 = 38 + 2 + 3 = 43». Schwere: niedrig.

18. **explain Seite 5** – Problem: «fehlen 2 bis zur 40» ist umgangssprachlich; der Titel «Über den Zehner» passt zu 38 + 5 (nur Einer), nicht zum ZE+ZE-Übergang, der erst indirekt auf Seite 7 gezeigt wird. Vorschlag: «Bei 38 + 5 gehst du zuerst bis 40. Dafür brauchst du 2. Dann bleiben 3.»; zusätzlich ein ZE+ZE-Beispiel (36 + 27 über 56 → 60 → 63) auf eigener Seite vor «Typischer Fehler». Schwere: niedrig.

19. **cards c62–c66, exam q44–q48 (Schätzen)** – Problem: Nur 2 Optionen (50 % Ratechance), eine Option liegt weit weg, c66 (14+66) ist genau 80, die Lösung «ist etwa 80» passt nicht. Rundungsregel nicht erklärt (siehe 4). Vorschlag: 3 Optionen (z. B. 70 / 80 / 90), exakte Ergebnisse (80) vermeiden oder «genau 80» formulieren. Schwere: niedrig.

20. **cards c57–c61, exam q39–q43 (Tauschaufgabe)** – Problem: Alle 5 Aufgaben identisch aufgebaut («einstellig + zweistellig»), richtige Antwort ist immer die Vertauschung; eine Nachbar-/Verdopplungsaufgabe (Seite 6) wird nur durch 45+45 gestreift. Optionen sind eindeutig (geprüft). Vorschlag: 2 Karten durch Nachbaraufgaben ersetzen («35 + 36: Welche Aufgabe hilft? 35 + 35 / 36 + 36»). Schwere: niedrig.

21. **exam (Anordnung, `explain`-Feld)** – Problem: Die Fragen sind nach Typ geblockt (q1–q16 Plus, dann Zerlegen, …), nicht gemischt. `explain` bei vielen Fragen nur «5», «8», «60» ohne Weg. Vorschlag: Reihenfolge mischen (leicht → knifflig), `explain` mit Rechenweg füllen. Schwere: niedrig.

22. **exam q2, q4, … q75 (type: input)** – Problem: Nur `answer: ["73"]`; Eingaben wie «73 Fr.» oder «73Fr.» könnten falsch gewertet werden. Vorschlag: Zusätzliche akzeptierte Antworten ergänzen («73 Fr.», «73 Franken») oder Aufgabentext «Antwort in Franken:» setzen. Schwere: niedrig.

23. **cards c21–c26 (Sachaufgaben)** – Problem: Hinweis «Welche Rechnung passt zur Geschichte?» ist unpassend, da nur Ergebnisse als Optionen stehen; alle sechs gleiche Struktur («hat X, dann kommen Y dazu»); die Zahlen haben nie einen Zehnerübergang. Vorschlag: Hinweis «Wie viele sind es zuerst, wie viele kommen dazu?»; eine Aufgabe mit anderem Kontext (zwei Gruppen, «zusammen») und eine mit Übergang (z. B. 38 + 27). Schwere: niedrig.

24. **cards c101–c104, exam q83–q86** – Problem: c102 und c103 haben dasselbe Ergebnis (78), alle vier Aufgaben haben dieselbe Struktur (Zehner + Einer); es kommt kein Sprung über den Zehner vor. Vorschlag: Eine Aufgabe mit Zwischenhalt (38, +2, +5 → 45) oder drei Sprüngen. Schwere: niedrig.

25. **cards, allgemein (Erklärungsbezug)** – Problem: Die Kartenfolge ist sortiert nach Aufgabentyp-Blöcken (14 gleiche Aufgaben am Stück, dann 6 Platzhalter, 6 Sach, …). Bei Zufallsmischung durch die App unproblematisch; falls feste Reihenfolge, wirkt es monoton. Vorschlag: Prüfen, ob die App mischt; sonst Karten nach Stufe und Typ abwechseln. Schwere: niedrig.

## Kennzahlen Abwechslung
- Karten: 104. Plus ohne Platzhalter 22 (21 %), Platzhalter 22 (21 %), Zahlenmauer 10 (10 %), Zerlegen 6, Zum Zehner 6, bis 100 6, Tausch 5, Schätzen 5, Kette 5, Fehler finden 5, Einkauf 4 + Reicht 4, Rechenstrich-Ende 4, Sachaufgabe 6. Das sind 14 Typen: Abwechslung gut, aber Typen mit nur einer Rechnung in mehreren Varianten (Mauer, Kette, Fehler, Reicht).
- Stufen: Stufe 1 = 26, Stufe 2 = 33, Stufe 3 = 45; alle drei kommen vor, die «kniffligen» Aufgaben sind aber nur teilweise schwer (siehe 3 und 8).
- Prüfung: 86 Fragen, 74 MC, 12 Input, 12 Typen; 70 Fragen identisch zu Karten.
- Dubletten: Platzhalter-Paare (5), Mauern (5 × 2), Fehler-finden-Antwort (5 × gleich), Reicht-ja (4 × gleich), Einkauf/Reicht mit gleichen Zahlen (4 Paare, bewusst).
- Fehler-finden-Aufgaben: eindeutig lösbar und fachlich korrekt (36+27, 48+35, 29+46, 57+18, 38+45 haben je den Einer-Übertrag vergessen; Ergebnis stimmt), aber zu uniform (siehe 5).

## Gesamteinschätzung
Fachlich und rechnerisch sauber: kein einziger Rechenfehler, eindeutige Antworten, Zahlenraum bis 100 eingehalten, Rechtschreibung gut. Die Theorie ist für Klasse 2 weitgehend gut lesbar (kurze Sätze, ein Bild pro Gedanke); kleine sprachliche und notationelle Schwächen (Seite 6 chips, Seite 9). Die didaktische Qualität hat Schwächen: (1) die Prüfung ist zu lang und fast eine Kopie der Karten, (2) das Kernthema Zehnerübergang ist unterrepräsentiert und nirgends in der Prüfung abgefragt, (3) mehrere Aufgabentypen werden ohne Erklärung abgefragt, (4) Stufung, Fehler-finden und Reicht-ein-Hunderter sind zu gleichförmig. Vor Veröffentlichung empfehlen sich mindestens die Punkte 1 bis 3 und 5 bis 7; danach wäre das Thema für den Einsatz geeignet.

Zahl der Mängel: hoch 3, mittel 11, niedrig 11 (gesamt 25).
