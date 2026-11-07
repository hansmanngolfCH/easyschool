# EasySchool – Arbeitsregeln für Claude (jede neue Sitzung zuerst lesen)

Lern-App (Vanilla-JS, eine `index.html`), GitHub Pages, easy-school.ch. Repo: hansmanngolfCH/easyschool, Branch main. Kinder: kl1–kl9 (Fächer mathe, deu, franz, engl). Weitere Regeln: `tools/QUALITAET.md`, `tools/AGENTEN.md`.

## Umgang mit dem Besitzer
- Immer auf **Deutsch** antworten, kurz, ehrlich. Nur sagen, was wirklich getestet ist. Es gibt keinen iPhone-Test und die Live-Seite ist aus dem Sandkasten nicht erreichbar: Das immer erwähnen.
- Nach **jeder** Veröffentlichung «Version vX.XX» nennen. Vorher `APP_VERSION` in `src/p1.js` erhöhen (aktuell v5.49; nächste v5.50 usw.).
- Mehrdeutige Wünsche: Auslegung offen nennen.

## Bauen und Testen
- Quellcode in `src/` (p1…p7, extra.css, avatars.js, v3.html). `index.html` wird gebaut aus: v3.html, extra.css, p1, avatars, p2, p3, p4, p5, p6, p6b, p6c, p6d, p7. Bau-Skript: `tools/build_workdir.py` (im Arbeitsordner mit allen Teilen ausführen; erzeugt `index.html` und `test.html` mit Test-Hooks `window.__nav`, `__r`, `__X`).
- Syntaxprüfung: `<script>`-Blöcke aus index.html nach /tmp/all.js, `node --check`.
- Testskripte in `tools/tests/` (Playwright, lokaler Server `python3 -m http.server`, **nie `pkill`** verwenden): `pc.py` (alle Übungskarten auf Abschneiden prüfen, muss 0 Probleme melden), `xg6.py` (Easy-lernen-Runden), `geo.py` (Screenshots der Theorieschritte), `rw.py`.
- Vor jeder Veröffentlichung: `python3 tools/check.py` muss OK melden. Geänderte Themen sind in `tools/content.lock.json` gesperrt: nach Freigabe mit `--accept <id>`.
- Veröffentlichen: `index.html`, `content.json`, geänderte Teile nach `src/` kopieren, `git add -A`, Commit mit den vorgegebenen Attribution-Zeilen, `git push origin main` (bei Fehler nach ~6 s `git pull --rebase`, dann erneut).

## Inhalts- und Stilregeln (vom Besitzer festgelegt)
- Karten-IDs nie umbenennen (Lernfortschritt hängt daran). Mathe immer nachrechnen.
- **Pro Aufgabe/Schritt nur eine Grafik.** Nie zwei Grafiken, die dasselbe zeigen. Grafiken exakt, modern, clean, hell; kein «billiger» Look.
- **Klasse 1:** Sätze nur mit 3–4 Wörtern, kurze Wort-Titel, möglichst Zahlen/Symbole. Klasse 2: sehr wenig Text.
- Schweizer Rechtschreibung (ss, «Anführungen»). Kein Satzpunkt direkt hinter Zahl/Rechnung: Frage in neue Zeile.
- Mathe-Aufgaben ohne «Löse:»; Rechnungen enden mit `=`; Lücken als `_` (wird hellgrau dargestellt), nie «?» oder ❓.
- Theorie: vorne «Kurz wiederholt» wenn auf anderem Thema aufbauend; nur relevante Begriffe; Formeln **herleiten**; Eselsbrücken; 4–9 Schritte.
- **Easy lernen** (p6.js): 10 Aufgaben, weisser Hintergrund, keine eigenen XP, keine Herzen, Pool pro Thema ≥ 30 Fragen, verschiedene Fragen/Antworten, Text darf nie abgeschnitten sein. Taschenrechner-Knopf (🧮) nur Mathe ab Klasse 7.
- **Schriftlich rechnen (kl4–6, Themen schriftlich-plus/-minus/-mal/-durch):** Rechenaufgaben immer als Häuschen-Raster untereinander (`wcol` in p2.js, Erkennung `wcFor`), Kinder füllen Ergebnis- und Übertragsfelder selbst. In Karten und Prüfungen keine Hilfe im Raster (keine Spaltenmarkierung, keine Anleitung), Hilfe nur über den Tipp-Knopf und in der Theorie. Übertrag als kleine 1 unten links über dem Strich, Ergebnis doppelt unterstrichen; Minus mit Übertrag zur unteren Zahl; Division mit «−», Strich und Herunterholen. Ab Oberstufe Rechner statt Raster.
- **Aufgaben-Text:** Hauptfrage kurz und deutlich (gross); Zusätze/Anleitungen («Schreibe nur die Zahl.», «(in cm)», «Runde …») klein darunter (`qSplit` in p2.js).
- **Grafiken in Aufgaben (Karten, Easy lernen, Prüfung): Hilfe ja, Lösung oder Lösungsteile nein.** `visT` entfernt Lösungen automatisch (Bildunterschrift weg, Lösungszahl → «_»); erst nach dem Prüfen volle Grafik. Neue Grafiken trotzdem ohne Lösung bauen. Ausnahme: Diagramme/Münzen, deren Ablesen die Aufgabe ist.
- **Theorie-Grafik = Fokus:** Die Grafik eines Schritts hebt genau das hervor, was Titel und Text erklären (Endung, Grossbuchstabe, Komma, geänderte Ziffer, Nenner …), farbig markiert; der Rest neutral. Mittel: Fokus-Grafik `hl` (`"rows":["klein[e|Endung]"]`, `[Text|Label|Farbe]`, `[~x~]` = durchgestrichen) oder `{Farbe|Text}` in tbl/lines/chips/flow und Bildunterschriften.
- Karten-Antworten (MC): kurze Antworten 2 × 2 nebeneinander, lange (>14 Zeichen) untereinander. Platzhalter in Gleichungen/Vergleichen immer `_`, nie ○.
- Buttons heissen **AI-Karten** und **Easy lernen**.
- **Glücksrad:** nach 5 richtigen Antworten in Folge immer; sonst zufällig nach 4–9 Fragen; am Ende von Prüfung, Karten und Easy lernen; plus Theorie-Regel (3 Aufgaben). Keine 3-Minuten-Regel.
- Neue Themen aus Drive-Unterlagen: Skill `easyschool-import`. Englisch Double Decker: Wörter nur aus den Heften/Exporten der Kinder (Quizlet-Export, Buchseiten), nichts raten.

## Offene Ideen
- Fehlende Pools (<30 Fragen): kl8 Pythagoras, kl2-deu-gross, kl5/kl6-deu-grossklein.
- Erklärungen für ~968 Prüfungs-MC-Fragen mit leerer/kurzer Erklärung.
- Karten kl1: Hinweise; Bilder-Karten kl1–4 im neuen Stil.
- Altes kl3 «Das kleine Einmaleins» ggf. entfernen (neues 1×1 ab kl4).
- Karten: «Die grün Form» → «grüne»; Karten/Prüfungen mit «?» statt `_` bei Lücken.
