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
