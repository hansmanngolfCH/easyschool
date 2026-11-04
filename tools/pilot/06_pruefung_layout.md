# Layout-/Design-Prüfung EasySchool (Pilot kl2-mathe-plus100, 390 px)

Geprüft: kl2-mathe-plus100_L0..L8, _E (Prüfung, Lang-Screenshot 390x20101, in Ausschnitten angesehen, nur Anfang), _P (Lernkarte), kl3-mathe-plus1000_L3 (Vergleich).
CSS-/SVG-Hinweise sind Vorschläge; Selektoren vor Umsetzung in p2.js / extra.css / v3.html prüfen (nichts wurde geändert).

## Mängelliste

### Hoch

1. **L1, L2, L3, L5, L8 – Farben bedeuten je Seite etwas anderes (Zehner/Einer).**
   Zehner = grün (Material L1), blau (Balken "20" L1, Karte "Zehner" L3), rot (Chip "+ 20 Zehner" L2). Einer = orange/braun (Material, Chip L2), rot (Karte "Einer" L3), gelb (Balken "5"). Rot heisst zugleich "Zehner", "Einer", "Ziel", "richtig", "Zum Zehner". Kinder können keine Farb-Logik lernen.
   Vorschlag: eine feste Palette für alle Grafiken: Zehner = blau, Einer = orange, Summe/Ergebnis = grün, Start = grau-blau; Rot nur für Fehler. Gleiche Variablen (`--c-zehner`, `--c-einer`, `--c-summe`) in Material-SVG, Balken, Chips und Karten verwenden.

2. **L7 – Semantik vertauscht.** "53 ❌ Ben" steht auf Orange (neutral/Warnung), "63 ✔️ richtig" auf Rot (Fehlerfarbe). Rot + Häkchen widerspricht.
   Vorschlag: falsch = Rot (#D93025, hell #FCE8E6), richtig = Grün (#188038, hell #E6F4EA). "Ben" und "richtig" als gleichartige Beschriftung gleicher Farbe wie das Chip.

3. **L0 – Hunderterfeld: Reihenfolge und Legende passen nicht zusammen.** Text "34 + 25", aber die ersten 25 Kugeln oben sind grün, danach 34 blau (Beschriftung "34 blau + 25 grün"). Die Zehnerlogik (Zeilen zu 10) ist zudem nur durch eine punktierte Mittellinie bei 5 angedeutet; 34 und 25 laufen über Zeilen hinweg ineinander.
   Vorschlag: zuerst die 34 (Blau, ab oben links), dann 25 (Grün) direkt anschliessend; Farbpunkte-Legende ("● 34  ● 25") statt Fliesstext; ganze Zehnerzeilen mit leicht dickerem Abstand trennen.

4. **L3, L5, L6, L7, L8 – Rechenstrich-Beschriftungen zu klein.** Zahlen unter dem Strich ca. 9 px fett, Bogen-Labels ca. 10 px, Punkte r≈2–3 px. Für Klasse 2 am Handy kaum lesbar; in der Prüfung (_E, _P) noch kleiner, der Zielpunkt "?" ist nur ein Pünktchen.
   Vorschlag: im SVG `font-size` mind. 13–14 px (bei viewBox-Skalierung auf realen Wert prüfen), Punkte r≥5, Strichdicke 2.5, Label-Pille `rx` und Padding vergrössern; Strich-Höhe des SVG von ca. 100 px auf ca. 120 px.

5. **L6 und L7 – Pfeile/Labels überlappen.** Bei "+4" und "+3" (L7) stehen zwei Pillen fast aneinander, die Bögen schneiden sich und die Pfeilspitzen sind grösser als die Bögen. Bei engen Sprüngen (<50 px) wird das unleserlich.
   Vorschlag: Bogenhöhe proportional zur Länge mit Minimum 28 px; Pillen bei Kollision versetzen (zweite Pille höher, `y-=14`) oder Sprünge < 40 px mit Zahl unter dem Strich beschriften; Pfeilspitze (marker) kleiner als Bogenhöhe.

### Mittel

6. **L1 – Zerlegen-Grafik zerfällt in drei lose Teile.** Zehnerstangen (gross, oben) – "25" (grau, klein, linksbündig) – Balken (schmal, unten) mit grossem Leerraum dazwischen. Zehner und Einer sind unterschiedlich gross zum Balken (Stange 28x150 px, Balken-Segment 20 px hoch). Die Beschriftungen "20" und "5" im Balken sind weisse Mini-Schrift (ca. 9 px), auf Gelb praktisch unlesbar (Kontrast ca. 1.6:1).
   Vorschlag: Leerraum halbieren (Gap 24 → 12), "25" als 20-px-Zahl über dem Material; Balkenbeschriftung 14 px bold, auf Gelb dunkle Schrift (#5F3B00); Balkenhöhe 28 px.

7. **L1 – Material: Einer-Würfel und Zehnerstangen stehen auf unterschiedlicher Grundlinie** (Stangen oben ausgerichtet, Würfel unten). Zehnerstange wirkt "hohl" (hellgrün mit Strichen), Einer gefüllt. Wirkt zufällig.
   Vorschlag: `align-items:flex-end` bzw. gleiche y-Grundlinie im SVG, Würfelgrösse = Breite der Stange/… (1 Einer = 1/10 Stangenhöhe massstäblich, sonst falsche Verhältnisse für das Stellenwertverständnis).

8. **L3, L5, L8, kl3-L3 – Chip-Reihen: ungleiche Höhen und Breiten.** Chips mit Unterzeile ("Start", "Zehner") sind höher als solche ohne (L3 "54" sitzt oben mit leerem Boden, L5 "=" / "+" kleiner als "2 bis 40"). Breiten schwanken zwischen 32 und 70 px. In L8 bricht das letzte Chip ("36 wieder da") alleine in die 2. Zeile, in L6 sind die Zeilenabstände zwischen den Chip-Gruppen unterschiedlich (ca. 12 px vs. 20 px).
   Vorschlag: `.chip{min-height:52px;display:flex;flex-direction:column;justify-content:center;align-items:center;min-width:44px}`, Operatoren (=, +) als schlanke Chips 32 px breit mit gleicher Höhe; `gap:8px` konsistent (`row-gap:8px`); Zeilenumbrüche nur zwischen Gruppen (`flex-basis:100%` Trenner) statt zufällig.

9. **Chips – Schriftgrössen.** Zahl ca. 17 px bold, Unterzeile ("Start", "bis 40", "wieder da", "Zwischenstand") ca. 9–10 px fett, farbig auf Pastell: Kontrast Blau auf Hellblau ca. 3.3:1, Orange auf Hellorange ca. 2.4:1 (L3 "Einer", L5 "Rest"), Rot auf Rosa ca. 4:1.
   Vorschlag: Unterzeile mind. 11–12 px und dunkle Töne (Blau #174EA6, Orange #8A4B00, Rot #A50E0E, Grün #0D652D); Chip-Rand unten (3 px) kann die Farbe tragen.

10. **L3 und L8 (Karten "Zehner/Einer/Zusammen", "Zerlegen/Zum Zehner/Probe") – 2-Spalten-Raster mit verwaister Karte.** Dritte Karte steht links allein, rechts ist leer; Kartenhöhen unterschiedlich (L8: "Probe" ist höher wegen Zeilenumbruch "Rückweg mit Minus"). Obere Farbleiste ist abgerundet mit Rand, wirkt wie "Tab".
   Vorschlag: 3 Karten einspaltig (volle Breite) oder `grid-template-columns:repeat(3,1fr)` mit kleinerer Schrift; `align-items:stretch`; für Zusammen/Summe breite Karte (`grid-column:1/-1`). Text kürzen ("Rückweg: Minus").

11. **L3, L8 Karten – Textkontrast und -grösse.** Kartentitel in Blau (#4285F4) auf Hellblau nur ca. 3:1, Titel in Rot auf Rosa ca. 4:1; Zeilen "= 50", "= 9", "25 = 20 + 5" grau ca. 11 px (ca. 3.5:1). Die wichtige Rechnung ("30 + 20") ist nur 13 px fett.
   Vorschlag: Titel 15 px in dunklem Farbton (Mängel 9), Rechnung 17 px, Ergebniszeile 14 px #3C4043.

12. **Buttons – Hauptaktion wechselt Text und Emoji pro Seite** (Verstanden 👀, Kapiert 💡, Gespeichert 💾, Gecheckt ✅, Sitzt 🧠, Alles klar 🎯, Verstanden, Kapiert, Gespeichert). Das ist als Spielerei gedacht, aber "Gespeichert 💾" auf Seite 3 und 9 irritiert (Handlung ist "Weiter", nicht Speichern). Emojis wirken je nach Plattform unterschiedlich gross.
   Vorschlag: einheitlich "Weiter" (letzte Seite "Fertig"); falls Abwechslung gewünscht, nur ein fester Satz Kurzwörter ohne "Gespeichert".

13. **Buttons – Grössen und Position.** L0: "Verstanden" steht allein, linksbündig, schmal (ca. 215 px) mit 16 px Rand rechts leer; L1–L8: "Zurück" (ca. 98 px, weiss) + Hauptbutton (ca. 215 px) – das Paar füllt auch nur ca. 80 % der Breite, rechts bleibt ca. 33 px frei. Höhen ca. 54 px (gut), aber Position der Buttons springt von y=635 bis y=470 je nach Inhalt (kein feste Stelle zum Tippen).
   Vorschlag: Buttonleiste `display:flex;gap:12px` mit Hauptbutton `flex:1`, Zurück `flex:0 0 96px`; auf L0 auch volle Breite; Leiste unten fixieren (`position:sticky;bottom:12px`) für gleiche Daumenposition.

14. **Kopfbereich – "Zurück"-Pille oben rechts** (ca. 107x56 px, grosser Rand, Pfeil + fetter Text) ist deutlich grösser/wuchtiger als der Haupt-Zurück-Button unten (blau, klein) und kollidiert optisch mit dem Logo. Zwei "Zurück" auf einem Screen mit unterschiedlicher Bedeutung (oben: Thema verlassen, unten: vorherige Seite).
   Vorschlag: oben "✕ Schliessen" oder nur Pfeil-Icon 44x44; unten "Zurück" beibehalten. Pille 40 px hoch.

15. **L0..L8 – Fortschritt/Header.** "Block 1 von 9" ist graue Mini-Schrift (11 px, fett) rechts neben dem Balken; die Überschrift "AI-THEORIE · PLUSRECHNEN BIS 100" ist 11 px, hellgrau, Grossbuchstaben (Kontrast ca. 3.8:1). Für Kinder "AI-Theorie" unverständlich.
   Vorschlag: 13 px, #5F6368; Begriff "AI-Theorie" durch "Erklärung" ersetzen; "Block 1 von 9" als "Seite 1/9" 13 px.

16. **_E, _P – Rechenstrich in Prüfung noch kleiner und flacher** (Karte nur ca. 120 px hoch, Strichgrafik schmaler; "?" Pille ca. 10 px). Im Lernkarten-Screenshot fehlt der Block-Titel, Karte hat andere Ränder (Radius 24 statt 18) und Innenabstand als Theorie-Karten (Rahmen im Rahmen: Frage-Karte + Grafik-Karte).
   Vorschlag: gleiche SVG-Grösse wie in der Theorie (Mängel 4); Grafik-Karte ohne eigenen Rahmen (`border:0`) innerhalb der Frage-Karte.

17. **_E – "+10 XP fürs Anschauen"-Toast überdeckt Aufgabentext** (liegt über Aufgabe 3 "11 + 25 = ?"), und erscheint in L8, _P, kl3 über leerem Bereich knapp am unteren Rand. In der Prüfung ist "Fürs Anschauen" ausserdem unpassend (Prüfung ≠ Anschauen).
   Vorschlag: Toast in Prüfungsmodus unterdrücken; sonst `bottom:calc(env(safe-area-inset-bottom)+72px)`, `pointer-events:none`, 2 s; Text je Modus.

18. **_E – Aufgaben 3 und 4 (Zahleneingabe) haben grossen leeren Bereich** (ca. 70 px Leerraum, punktierte Linie, darunter nur ein Stift-Button 58x50). Wirkt unfertig; Stift-Button ohne Beschriftung. Fragezeilen "Kreuze eine Antwort an." sind ca. 10 px fett, zu klein; Antwort-Radios (A–D) 22 px, Ränder hellgrau.
   Vorschlag: Eingabefeld 56 px hoch mit Platzhalter "Antwort hier schreiben ✏️" und sichtbarer Linie; Hinweis 13 px; Optionen min. 48 px Höhe (sind ca. 40 px).

### Niedrig

19. **L2, L5, L6, L7 – Beschriftung "34 → 54 → 59" (grau, ca. 13 px, 0.85 Deckkraft)** steht lose zwischen Strich und Chips, linksbündig mit anderem Einzug (x=50) als Titel und Text (x=33); Karte-in-Karte-Einzug (16 px + 17 px) wirkt doppelt.
   Vorschlag: Zeile 15 px #3C4043 zentriert unter dem Strich; inneren Rand der Grafik-Karte auf 12 px reduzieren, Text und Grafik auf eine gemeinsame linke Kante bringen.

20. **Abstände Titel–Text–Grafik–Buttons.** Titelzeile (Kreis 38 px, Text 18–19 px) zu Text 16 px, Text zu Grafikkarte 16–24 px (je Seite verschieden: L1 ca. 20, L4 ca. 22, L8 ca. 24), Grafikkarte zu Buttons 16–20 px. Kleine Schwankungen wirken unruhig; L8 "Das ist wichtig." füllt nur den Platz.
   Vorschlag: `.theory-text{margin:0 0 16px}` `.theory-gfx{margin:0 0 20px}` einheitlich; L8-Text ersetzen ("Merke dir diese drei Regeln.").

21. **Titel-Kreis mit Nummer (grüner Kreis 1..9)** ist gleichzeitig Seitenzahl und "Block"-Zahl, die Farbe Grün ist auch Summenfarbe (Mängel 1). Obere grüne Kartenkante mit Rundung wirkt in allen Seiten gleich (gut), kollidiert aber mit den Farbleisten der Unterkarten (Blau/Rot/Grün).
   Vorschlag: Kreis in Neutralfarbe (Primärblau #1A73E8 wie Buttons) oder auf Themenfarbe.

22. **Versionszeile "Version v4.54 · Impressum"** (11 px, hellgrau) steht je nach Seitenlänge unterschiedlich hoch direkt unter den Buttons, "Impressum" noch kleiner (ca. 9 px) und kaum anklickbar (Tippfläche < 44 px).
   Vorschlag: ans Seitenende (`margin-top:auto`), 12 px, Tippfläche `padding:12px`.

23. **kl3-mathe-plus1000_L3 gegenüber kl2:** gleiches Muster (gut), aber Chip "Zwischenstand" ist breiter und seine Unterzeile Rot, das Ergebnis-Chip bleibt Rot (wie "wieder da" in kl2 L8) – Rot = "Ergebnis/Ziel" hier, "Zehner" in kl2-L3, "Einer" in L4. Rechenstrichlänge identisch, Zahlen (3-stellig "234", "334") passen noch knapp unter den Punkt.
   Vorschlag: siehe Mangel 1; bei 4-stelligen Zahlen Label `font-size` 12 px und `text-anchor:middle` mit Kollisionsprüfung.

## Was gut ist

- Einheitlicher Seitenaufbau: nummerierter Titelkreis, kurzer Satz, Grafik in Karte, Buttonleiste – auf allen 9 Seiten gleich, auch im Thema Plus bis 1000 (kl3) wiederverwendet.
- Grosse Buttons (ca. 54 px hoch, Radius voll), gute Tippgrösse, klare Hauptaktion in Blau, "Zurück" ruhig in Weiss.
- Texte kurz, gross genug (ca. 16 px, dunkel auf Weiss), Schriftart gut lesbar und einheitlich (Inter-ähnlich).
- Hunderterfeld (L0) ist gross, sauber, mit Glanz-Kugeln und punktierter Mitte; Grössenverhältnis zur Karte gut.
- Rechenstrich-Muster (rote Bögen mit Pille, Punkte Start grün / Ziel blau) ist in Theorie, Prüfung, Lernkarte und kl3 wiedererkennbar.
- Chip-Folge "Start / + Zehner / = / + Einer / Ziel" bildet die Rechnung nacheinander ab; Zahlenmauer in der Prüfung ist klar und mit gestricheltem Feld für "?" gut gelöst.
- Fortschrittsbalken und "Block x von y" geben Orientierung; Prüfungsseite hat klaren Kopf (Name/Datum) und Antwortzeilen A–D mit guter Breite.
- Keine abgeschnittenen Texte oder horizontales Scrollen bei 390 px gefunden.

## Anmerkung zur Prüfung
Der Prüfungs-Screenshot (_E) ist ein 20101 px langer Streifen; nur die ersten ca. 1700 px wurden im Detail beurteilt. Die Aussagen zu Aufgaben 3–6 beziehen sich auf diesen Ausschnitt.
