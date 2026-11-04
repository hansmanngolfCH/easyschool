# EasySchool: Qualitaetsregeln fuer Inhalte

1. **Bestehende Themen bleiben unveraendert.** Sie sind in `tools/content.lock.json` gesperrt. Aenderungen nur nach Absprache und mit `check.py --accept <id>`. Karten-IDs nie umbenennen (daran haengt der Lernfortschritt).
2. **Neue Themen** nur aus den Unterlagen aus dem Drive. Nichts erfinden. Mathe-Aufgaben werden immer neu nachgerechnet, nie von Fotos uebernommen.
3. **Mindestumfang neuer Themen:** Mathe/Deutsch: 30 Karten, 16 Pruefungsfragen, 6 Theorie-Schritte (jeder mit Titel und Text, Begriff, Erklaerung, Beispiel, warum es so ist). Franzoesisch/Englisch: 25 Karten, 16 Pruefungsfragen, Woerterliste.
4. **Pruefung vor jeder Veroeffentlichung:** `python3 tools/check.py` muss "OK" melden.
5. **Nach Freigabe:** neues Thema mit `--accept <id>` sperren, damit es spaeter nicht versehentlich geaendert wird.
6. Theorie heisst im ganzen UI "AI-Theorie" (bei Franz/Engl "Woerterliste").
