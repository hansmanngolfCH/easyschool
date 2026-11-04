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
