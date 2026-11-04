# EasySchool: Qualitaetsregeln fuer Inhalte

1. **Bestehende Themen bleiben unveraendert.** Sie sind in `tools/content.lock.json` gesperrt. Aenderungen nur nach Absprache und mit `check.py --accept <id>`. Karten-IDs nie umbenennen (daran haengt der Lernfortschritt).
2. **Neue Themen** nur aus den Unterlagen aus dem Drive. Nichts erfinden. Mathe-Aufgaben werden immer neu nachgerechnet, nie von Fotos uebernommen.
3. **Mindestumfang neuer Themen:** Mathe/Deutsch: 30 Karten, 16 Pruefungsfragen, 6 Theorie-Schritte (jeder mit Titel und Text, Begriff, Erklaerung, Beispiel, warum es so ist). Franzoesisch/Englisch: 25 Karten, 16 Pruefungsfragen, Woerterliste.
4. **Pruefung vor jeder Veroeffentlichung:** `python3 tools/check.py` muss "OK" melden.
5. **Nach Freigabe:** neues Thema mit `--accept <id>` sperren, damit es spaeter nicht versehentlich geaendert wird.
6. Theorie heisst im ganzen UI "AI-Theorie" (bei Franz/Engl "Woerterliste").

## Theorie-Gerüst (verbindlich für alle neuen und überarbeiteten Themen)
Die Erklärung (`explain`) besteht aus höchstens 6–8 Schritten in dieser Reihenfolge:
1. **Worum geht es?** 1–2 Sätze: Was ist das, wo finde ich es, warum muss man es definieren/kennen.
2. **Begriffe klären:** Tabelle (Begriff + kurze Erklärung + Beispiel). Bei Deutsch Pflicht: Tabelle aller Wortarten/Fälle/Zeiten/Satzglieder.
3. **Aufbau:** Wie ist es gebaut (Regel, Satz, Formel, Bildung).
4. **Anwenden:** Wo und wie wende ich es an (Schritte oder Proben).
5. **Beispiele:** nur 2–3 wenige, gut gewählte.
6. **Das Wichtigste:** ein Merksatz.
Keine «Nochmal anders»-Wiederholungen, keine Schritte nur zum Wiederholen. Gilt für Mathe und Deutsch, Klasse 3 bis 8.

## Grafik-Regel (verbindlich): Je höher die Klasse und das Niveau, desto weniger Grafik
- Klasse 3 bis 5: viele Grafiken, Balken, Farben, Bilder, Zwischenschritte. Gilt für Theorie, Lernen, KI-Lernen und Prüfungsaufgaben.
- Klasse 6 und 7: Grafik nur dort, wo sie das Verständnis wirklich stützt. Tabellen und kurze Schritt-für-Schritt-Karten bleiben.
- Klasse 8 und höher: sparsam. Hauptsächlich Tabellen, Formeln und Rechenwege. Grafik nur, wenn nötig.
- Ausnahme Inhalt: Bei Themen, die selbst grafisch sind (Geometrie, Formen, Winkel, Flächen, Körper, Diagramme, Funktionsgraphen), braucht es auch in hohen Klassen Grafiken. Dort gilt: so viele wie nötig, damit man es sieht.
- In Prüfungsaufgaben nur mit Vorsicht: Grafik nur, wenn die Aufgabe ohne sie nicht lösbar ist (zum Beispiel Dreieck, Diagramm). Nie als Hinweis auf die Lösung. Prüfungen bleiben klassisch.
- Vor jedem neuen Thema prüfen: Klasse, Niveau und Themenart, dann den Grafikanteil festlegen.
- Bestand (Stand v4.46): Deutsch und Mathe Klasse 8 sind nach dieser Regel gestrafft (Tabellen, Rechenwege; Grafik nur bei Dreieck, Quadrate, Zeitstrahl, Beispielsätzen). Klasse 3 (Länge, Gewicht) bleibt bewusst grafisch.

## Regeln v4.49 (vom Besitzer, 04.11.2026)

### Mathe-Theorie: Grafik statt Tabelle
- Vorbild sind kl3-mathe-meter-km und kl3-mathe-gramm-kg: 12 bis 15 kleine Blöcke, jeder mit **Balken, Rechenstrich, Punktefeld, Würfel/Stangen/Platten, Pfeil-Umrechnung (conv), Chips und Flow** und nur ganz kurzem Text.
- **Nur eine Tabelle**: die Begriffe. Alle anderen Blöcke zeigen Rechenwege und Schritte als Grafik mit Zwischenschritten und Zwischensummen (nicht als Tabelle).
- Reihenfolge bleibt: Worum geht es, Begriffe (Tabelle), Bild, Aufbau/Rechenweg in Einzelschritten, Beispiele (Balken + Chips), Probe, Regeln und Wichtigstes zum Schluss.
- Verfügbare Grafiken: bar (Balken), jumps (Rechenstrich mit Sprüngen), blocks (Hunderterplatte/Zehnerstange/Einerwürfel), arr (Malfeld), col (schriftliche Rechnung), field, emo, pie, fbar, conv, flow, chips, nline, jug, quader, angle, circle, par, clock, coins.

### Lesen nach Klassenstufe
- **Klasse 1: kann nicht lesen.** Theorie und Aufgaben nur mit Zahlen, Zeichen (+ − = < >) und Grafiken. Keine Sätze. Fragen als Symbol (❓), Antworten als Zahlen oder Symbole. Jede Aufgabe hat ein 🔊 zum Vorlesen (Feld `say`), das Kind braucht den Text nicht zu lesen.
- **Klasse 2: sehr wenig Text** (höchstens ein kurzer Satz pro Block, Aufgaben mit wenigen Wörtern).
- **Ab Klasse 3: normaler Text**, aber kurz.

### Oberstufe (ab Klasse 7)
- Grafiken **detaillierter** (Beschriftung, Masse, Hilfslinien, Zwischenschritte).
- **Geometrie weniger farbig, sehr genau und detailliert**: dünne dunkle Linien, genaue Skalen, Winkel mit Bogen und Gradzahl, Massangaben. Keine bunten Füllungen. Die Geometrie-Grafiken haben dafür die Option `tech: true`.

## Regeln v4.54 – Fach-Durchsicht (Doppelprüfung)
- Bei **jedem neuen Thema** zuerst die Theorie fachlich prüfen: Fehlt eine Seite, die zum Thema gehört (z. B. Zehnerübergang beim Rechnen, Fläche ≠ Umfang, Schätzen, Alltag)? Ist jede Seite für dieses Thema wirklich relevant?
- Der Aufbau ist **nicht überall gleich**: Seiten, Reihenfolge und Darstellung (Balken, Rechenstrich, Material, Feld, Pfeile, Uhr, Körper …) richten sich nach dem Thema. Die Tabelle «Begriffe» nur, wenn das Thema Fachwörter hat.
- Lernkarten und Prüfung: nur Fragetypen, die zum Thema passen; mehrere Formen pro Thema (Ablesen, Ergänzen, Umkehren, Fehler finden, Sachaufgabe …).
- Zahlenstrahl: Beschriftung wechseln (alle Zahlen / jede zweite / nur Anfang und Ende), nicht immer vollständig.
- Danach ein zweiter Durchgang (nochmals ansehen): Texte lesen, Grafiken im Browser bei 390 px prüfen.

## Regeln v4.56 – Erklärung, Farben, Rückmeldung (verbindlich für jedes neue Thema)
- **Erste Theorie-Seite = Einführung**: «Worum geht es?» – was ist das Thema, was lernt man (Kacheln mit den Inhalten).
- **Keine nackte Grafik, keine nackte Aufgabe**: Jede Theorie-Seite hat einen kurzen erklärenden Text (was tun wir in diesem Schritt). Grössere Rechnungen: Rechenweg als nummerierte Schritte («Schritt 1, 2, 3») mit LINES(num).
- **Rechnung unter der Grafik** (Mathe): unter jeder Grafik steht die Rechnung (Chips oder Schritte).
- **Farben abgleichen**: gleiche Teile haben in Grafik und Rechnung dieselbe Farbe (z. B. 20 im Rechenstrich und in der Rechnung blau). Kein Hunderterfeld mit Feldern im Rechenweg.
- **Rechenzeichen grau** (+ − × : =) in allen Chips, nie bunt.
- **Tipps (hints)** passen zu Klassenstufe und Zahlenraum der Aufgabe (Zahlen und Wortwahl, z. B. «bis zum nächsten Zehner, dann bis 100»).
- **Rückmeldung bei falscher Antwort**: rot «Deine Antwort: …» und darunter im gleichen Stil grün «Richtig ist: …». Dieses Paar überall verwenden, wo eine falsche und die richtige Antwort gezeigt werden.
- **Prüfung**: Aufgaben mit dickerer, gut sichtbarer Linie trennen; Prüfungs-Einstieg mit Prüfungsblatt-Grafik; Prüfungsfragen haben andere Zahlen als die Lernkarten.
- **Extra-XP-Spiele etwas schwerer**: Mathe eine Auswahl mehr, Sprachen ein Buchstabe mehr übrig.
- **Namen**: ≥ 58 Namen, Pronomen mit sie(name). Namen wiederholen sich selten.
- **Grafikgrösse**: Punktefelder/Balken/Rechenstrich ähnlich gross und gleich fein; Punktegrösse einheitlich; zentriert; Rechenketten brechen nicht um (höchstens ca. 7 Chips).
- **Pipeline pro Thema**: Recherche → Methoden-Scout → Konzept → Bau → Inhalts-Prüfer (rechnet alles nach, Rechtschreibung, doppelte Aufgaben Prüfung/Karten) → Layout-Prüfer (Screenshots) → Korrekturen.
- **Farblogik (v4.56)**: In Rechenketten keine Kästen, nur die Zahlen farbig. Nur Zahlen, die zur Grafik gehören, sind farbig (gleiche Farbe wie ihr Teil in der Grafik). Start, Ziel und alles ohne Grafik-Bezug sind neutral (Farbindex 7 = dunkelgrau). Rechenzeichen hellgrau. Inhalts- und Layout-Prüfer müssen diese Logik prüfen.
- **XP/Fortschritt (v4.59)**: XP-Anzeigen in den App-Farben (Blau/Grün), Fortschritt nie in Violett.
- **Einführungsseite mit Szene (v4.61)**: Theorie-Seite 1 beginnt NICHT mit Kacheln, sondern mit einem Erklärtext aus dem Alltag und einer individuell passenden, wenn möglich bewegten Szene (Typ "scene", z. B. Markt mit Äpfeln, Teller mit Keksen, Baustelle, Weg). Pro Thema eine eigene Szene planen und in p2.js (vScene) ergänzen. Danach eine kurze Liste "Das lernst du".
- **Schritte-Layout (v4.63)**: Nummerierte Schritte (LINES num) kompakt: eine Karte, eine Zeile pro Schritt, Rechnung links, Beschriftung rechts.
- **Richtig-Anzeige (v4.64)**: Bei richtiger Antwort nur ein grüner Balken «Richtig: <Lösung>», die Lösung nicht nochmals darunter.
