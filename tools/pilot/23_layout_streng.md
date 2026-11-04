# Layout-Prüfung streng (Massstab AGENTEN.md «Qualitätsmassstab Grafik» + QUALITAET.md Regeln v4.56)

Themen: kl2-mathe-plus100, kl3-mathe-einmaleins. Breiten: 390 px und 1100 px. Keine App-Datei geändert.
Screenshots: /tmp/w4/ (Tp390_NN / Te390_NN / Tp1100_NN / Te1100_NN = Theorie Block 1-13; Kp390_NNa/b, Ke390_NNa/b, Kp1100_*, Ke1100_* = Lernkarte vor/nach Antwort, NN = Index der Grafikkarten; Xrun_* = ganze Prüfung; XM_*/XD_* = Montagen; C_*/D_*/CD* = Montagen; Z_p1.png = Zoom).
Geprüft: 13 Theorie-Seiten je Thema und Breite (52 Screenshots), alle 33 plus100- und 27 einmaleins-Grafikkarten (je Breite einmal richtig oder falsch beantwortet, abwechselnd; also je Thema 30/33 bzw. 27 Karten x 2 Breiten), Prüfungs-Einstieg und komplette Prüfungsseite beider Themen (390 und 1100). «Im Zweifel nicht bestanden.»

Messwerte (DOM, 390 px): Rechenstrich-Punkt Durchmesser 6.8 px, Höhe 99 px; Punktefeld-Punkt 23.4 px (Blöcke 6 und 8: 18.7 px), Höhe 107-260 px; Zehnerbild/Punktefeld sind links verankert (svg left = 0, Breite 107-263 px in 290 px Container). Desktop 1100: Rechenstrich skaliert mit Containerbreite 864 px (Punkt 15.8 px, Höhe 230 px), Punktefeld bleibt 107-263 px breit (= 12-30 % der Kartenbreite).

## Hauptbefunde (systemisch, ein Fix wirkt auf viele Grafiken)

S1. **Punktefeld/Zehnerbild links statt zentriert** (alle arr- und blocks-Grafiken in Theorie und Prüfung; in Lernkarten zentriert, aber Innenrahmen sitzt eng um die Punkte). Korrektur: im Renderer von `vArr`/`vBlocks` das svg mit `display:block;margin:0 auto` ausgeben bzw. Container `.vis{display:flex;justify-content:center}`.
S2. **Desktop: Punktefeld winzig (12-30 % der Kartenbreite), Rechenstrich/Szene riesig** (Pfeilspitzen, Pillen 3x so gross wie die Rechnung darunter). Korrektur: alle Grafiken in einen Wrapper `max-width:520px;margin:0 auto` (Mobil unverändert); Rechenstrich-svg `max-width:520px`; Punktefeld-svg `width:min(100%,360px);height:auto` (also skalierbar, nicht feste Pixel).
S3. **Rechenstrich zu klein/zu dünn (Mobil) und überlappend:** Punkt 6.8 px, Beschriftung ca. 9-10 px, Bogen flach. Pillen und Zahlen kollidieren bei kurzen Sprüngen: «48» und «50» ergeben «4850», «+2»-Pille liegt auf Pfeil, 35/40, 60/63 berühren sich. Korrektur in `vJumps`: viewBox-Höhe auf ca. 130 erhöhen, Punkt r = 5, Zahlen 13 px, Pillen 12 px; Mindestabstand zwischen Beschriftungen 26 px (sonst Zahl wechselseitig oberhalb/unterhalb der Linie, kleinere in zweiter Zeile y+14); Pille über dem Sprungmittelpunkt, aber nie breiter als der Sprung (bei Sprung < 40 px Pille eine Reihe höher versetzen); Mindestlänge Sprungpfeil 28 px (sqrt-Skala).
S4. **Rechenstrich in Lernkarten ist ROT** (Pfeile, Pillen, «?»). Verstoss «Rot nur für Fehler». Korrektur: Pfeile/Pillen in Blau (Sprung 1) und Orange (Sprung 2) wie in der Theorie; «?»-Sprung gestrichelt dunkelgrau; Start/Ziel-Punkte neutral dunkel (Index 7).
S5. **Start-/Ziel-/Zwischenpunkte bunt (grün, gelb, blau) im Rechenstrich** (Theorie Block 3, 5, 6, 9, 11, alle Karten): verstösst gegen «Start/Ziel/Ergebnis neutral dunkel». Korrektur: `vJumps` Punktfarbe fix `#374151` ausser dem Punkt, der gleichzeitig Sprungziel einer farbigen Zahl in der Rechnung ist (dann nicht nötig: Punkte immer neutral).
S6. **Lernkarten: Rechnung unter der Grafik fehlt.** «Rechenweg in Schritten» zeigt bei Zehnerbild, Rechenstrich, Punktefeld oft nur «58 / Rechenweg», «59 / Rechenweg» (Lösung statt Rechnung) und keine Chip-Kette; Farben der Grafik tauchen nirgends wieder auf. Korrektur: Parameter `steps` darf nie nur die Lösung enthalten (z. B. [«52 + 6 = 58», «Zehner bleiben, Einer dazu»]); unter der Grafik die farbige Rechenkette wie in der Theorie (`vChips`) einblenden; Wort «Rechenweg» als Unterzeile ersetzen durch kurzen Handlungssatz.
S7. **Doppelter Rahmen:** jede Kartengrafik sitzt in einem zweiten abgerundeten Innenrahmen innerhalb der Karte. Korrektur: `.card .vis{border:0;background:none;padding:0}`.
S8. **Kacheln/Plaketten mit farbigem Oberrand und grauer Fläche** (Theorie plus100 Block 4 und 12: Zehner/Einer/Zusammen/Probe; dritte Kachel einzeln mit 150 px Leere daneben). Korrektur: `vCards` ohne Hintergrundfarbe, ohne Oberrand; weiss, Titel farbig nur wenn Grafikbezug, sonst dunkel; Grid `repeat(auto-fit,minmax(150px,1fr))` oder letzte Kachel `grid-column:1/-1`; kein Grau (`#e5e7eb`-Flächen entfernen).
S9. **Textkästen mit Rahmen als «Grafik»** (einmaleins Block 3, 10, 11; plus100 Block 7): jede Zeile ein eigener umrandeter Kasten mit grauer Unterzeile. Korrektur: `vPairs`/`vLines` ohne Kastenrahmen, Zeilen durch dünne Trennlinie, Unterzeile 13 px dunkelgrau; nicht-grafische Inhalte als Rechenkette (4 × 5 = 20 farbig) statt Boxliste.
S10. **Toast «+10 XP fürs Anschauen» verdeckt den Weiter-Knopf** (einmaleins Block 4, 6, 12; Desktop Block 6 sogar mitten im Knopf). Korrektur: Toast `top:72px` oder `bottom:110px`, Dauer 1.2 s.
S11. **Punktgrösse uneinheitlich:** 23.4 px (Mehrzahl), 18.7 px (Block 6 Halbieren, Block 8 Eine Gruppe weniger), 7 px in Rechenstrich-Punkten. Korrektur: `vArr` Punktabstand und Radius für alle Felder einheitlich (r = 10, Abstand 28) und nur das Feld als Ganzes per `width:min(100%,Nxpx)` skalieren, nicht Punkte einzeln.
S12. **Trenn-/Stufenlinie überragt das Feld** (gestrichelte Linie bei 5|2-Zerlegung ragt links/rechts über die Punkte hinaus, in Block 5, 7, 8, 9, Karten 10-17, Prüfung Frage 2/5). Korrektur: Linie nur von erstem bis letztem Punktrand (x1 = erste Mitte − r, x2 = letzte Mitte + r), kein Überstand.

## Tabelle A: Theorie plus100 (390 px, Desktop wo abweichend)

| Seite | bestanden? | Problem | Korrektur |
|---|---|---|---|
| 1 Worum geht es? (Markt-Szene + Liste) | bestanden | Szene zentriert, füllt Karte. Desktop: Szene 864 px breit, wirkt gross, aber ausgewogen | Desktop `max-width:560px` (S2) |
| 2 Zahlen zerlegen (Zehnerstangen + Einer) | **nicht bestanden** | Stangen links oben, Einer unten rechts mit Bronze-Rahmen (Klötzchen), rechts oben grosse Leere, nicht zentriert; Desktop: 220 px Bild winzig links in 864 px Karte; Einer-Quadrate wirken wie Plaketten | Zentrieren (S1); Einer als Würfelchen ohne Rahmen in 2 x 5-Raster neben den Stangen, gleiche Höhe wie Stangen; Desktop skalieren |
| 3 In Schritten (Rechenstrich 34 → 54 → 59) | nicht bestanden | S3, S5; Rechenstrich nur 99 px hoch/Punkt 7 px, Zahlen 11 px; Punkt 54 orange, 59 blau (nicht neutral). Desktop zu gross (Pfeilspitzen 40 px) | S2, S3, S5 |
| 4 Zehner und Einer getrennt (Schritte + 3 Kacheln) | **nicht bestanden** | Farbige Plaketten mit Oberrand, graue Fläche «Zusammen», 3. Kachel einzeln mit Leere (Mobil) | S8 |
| 5 Bis zum Zehner (Rechenstrich 38 → 40 → 43) | nicht bestanden | S3 (klein), S5 (Punkte bunt), Pillen/Zahlen eng. Rechenkette 38 + 2 + 3 = 43 farblich korrekt (türkis/orange) | S3, S5 |
| 6 Über den Zehner (36 → 56 → 60 → 63) | **nicht bestanden** | Pillen «+4» und «+3» überlappen, Pfeile als Haken, «60»/«63» berühren sich; Desktop: Pfeilspitzen überdecken Zahlen | S3 (versetzte Pillen, Mindestsprung 28 px) |
| 7 Geschickt rechnen (3 Boxen + Chips) | nicht bestanden | S9: drei umrandete Kästen mit grauer Unterzeile statt Grafik; Chips 70 + 1 = 71 ok | S9 |
| 8 Typischer Fehler | bestanden (knapp) | Emoji-Haken/Kreuz sind klein, «Ben»/«richtig» grau 10 px; Rot nur beim Fehler (ok) | Unterzeilen 12 px dunkelgrau |
| 9 Probe (Rechenstrich zurück 59 → 39 → 34) | nicht bestanden | S3, S5; «−5»-Pille ragt über Linie, 34/39 eng | S3, S5 |
| 10 Zahlenmauer 10/20/30 → 80 | nicht bestanden (Farbabgleich) | Mauer sauber und zentriert, aber 3 Farben (blau/grün/gelb) kommen in der Rechnung nicht wieder (alle schwarz); Mauer 2,5 x so hoch wie Rechenstrich (Grössenungleichheit) | Mauersteine einfarbig weiss mit dünnem Rand, nur der gerechnete Stein blau; Höhe auf ca. 120 px; oder Schritte-Zahlen in Steinfarbe |
| 11 Bis 100 ergänzen (35 → 40 → 100) | **nicht bestanden** | Pille «+5» liegt auf Startpunkt, «35» und «40» berühren sich (Desktop identisch), Pfeil +5 als Haken | S3 |
| 12 Regeln (3 Kacheln) | **nicht bestanden** | S8: 2 + 1 Kacheln, graue Kachel, 11 px graue Zusatzzeile, rechts 150 px Leere (Mobil) | S8 |

## Tabelle B: Theorie einmaleins

| Seite | bestanden? | Problem | Korrektur |
|---|---|---|---|
| 1 Teller-Szene | **nicht bestanden** | Mobil: Szene mit nur 3 Tellern, 1 Keks, grosse leere beige Fläche; Desktop: 864 x 331 px, Banner «3 Teller · je 4 Kekse» riesig, Teller unten, 60 % Leerfläche | Szene auf 4 Kekse je Teller zeichnen, Banner max. 18 px, Desktop `max-width:560px;height:200px` |
| 2 Mal = gleiche Gruppen (Punktefeld + Rechenstrich) | **nicht bestanden** | Feld 138 px breit links oben in 290 px Karte, Rechenstrich darunter mit anderer Strichstärke; Leerraum rechts und zwischen Feld und Strich (ca. 60 px); Desktop: Feld winzig links, Rechenstrich riesig; Rechenstrich 0-4-8-12 grün-orange-blau Punkte (S5) | S1, S2, S5; Feld und Strich auf gleiche Breite, Abstand 16 px |
| 3 Leichte Reihen | nicht bestanden | S9: 3 Kästen mit grauer Beschriftung; reine Zahlenlisten | S9 (als Zahlenstrahl-Reihe oder Chips) |
| 4 Tauschen (3 x 7 und 7 x 3) | nicht bestanden | Zwei Felder untereinander (Mobil 520 px hoch), links verankert, Beschriftungen «3 Reihen mit je 7» klein grau, 7er-Feld mit 190 px Leere rechts; Desktop: beide Felder winzig, Rechnung links; Toast verdeckt Knopf | S1, S10; Felder nebeneinander (2 Spalten) ab 380 px; Beschriftung 13 px dunkel |
| 5 Verdoppeln (4 x 7) | nicht bestanden | S1, S12; Punktgrösse 18.7 px; Desktop: Feld 210 px in 864 px | S1, S2, S11, S12 |
| 6 Halbieren (10 x 8) | nicht bestanden | Feld 260 px hoch, graue «weggenommene» Punkte (graue Fläche, schlecht lesbar), Punkte 18.7 px (kleiner als Block 4); Toast im Knopf (Desktop) | graue Punkte weiss mit dünnem Rand; S11, S10 |
| 7 Eine Gruppe mehr (5 x 7 + 7) | nicht bestanden | S1, S12; Rechnung 6 x 7 = 5 x 7 + 7 = 42 mit Farben blau/gelb korrekt | S1, S12 |
| 8 Eine Gruppe weniger (10 x 4 − 4) | nicht bestanden | Schmales Feld (263 px hoch, 110 px breit) links, 10 Reihen mit kleinen Punkten (18.7), rechts 180 px leer; Desktop Feld 110 px in 864 px | S1, S2, S11 |
| 9 Zerlegen (5 x 8 + 2 x 8) | nicht bestanden (knapp) | Feld ok gross, aber links und überstehende Linie (S12); Farben blau/orange/neutral stimmen | S1, S12 |
| 10 Ein Bild, vier Aufgaben | **nicht bestanden** | Feld 169 x 138 links, darunter vier umrandete Kästen (S9) | S1, S9 |
| 11 Mal 0 und mal 1 | **nicht bestanden** | Eine Punktreihe (6 Punkte) klein links oben, vier Kästen (S9); Karte wirkt leer-links | S1, S9 |
| 12 Typischer Fehler | bestanden | Schritte schwarz, Kette 7 x 6 = 36 (rot, Fehler) / 42; sauber | – |
| 13 Regeln und Wichtigstes (Step 12) | **nicht bestanden** | S8: 2 + 1 Kacheln mit farbigem Oberrand, graue Kachel «Ableiten» allein in Zeile 2 mit 150 px Leere rechts, Zusatzzeile 11 px grau; Toast unten | S8, S10 |

## Tabelle C: Lernkarten plus100 (33 Grafikkarten; Indizes = Dateinummer Kp390_NN)

| Karte | bestanden? | Problem | Korrektur |
|---|---|---|---|
| 00-05 (blocks «25 = 20 + ?» ... «71 = 70 + ?», richtig und falsch gesehen) | **nicht bestanden** | Stangen und Einer links verankert, Einer-Würfel bei 8 Stück kleiner als bei 3 (uneinheitlich, 14 vs. 22 px), Innenrahmen (S7), Rechenweg «25 − 20 = 5 / Rechenweg» ohne farbige Kette (S6); Grafik ohne Gegenstück in Rechnung | S1, S6, S7; feste Würfelgrösse, Einer in 2 Reihen à 5 |
| 06-11 (jumps «38 + ? = 40» ... «84 + ? = 90») | **nicht bestanden** | S3, S4, S5: roter Bogen flach in 99 px hohem Rahmen, Zahlen 38 und «?» 9 px, «?»-Pille 9 px; nach der Antwort bleibt «?» stehen (Lösung nicht eingetragen); Rechenweg nur «40 − 38 = 2 / Rechenweg» | S3, S4, S5; Lösung nach Antwort grün ins «?» schreiben |
| 12-17 (blocks «34 + 5 = ?» ... «75 + 3 = ?») | **nicht bestanden** | Die +5/+3 sind in der Grafik nicht sichtbar (nur Startzahl gezeigt), Rechenweg «58 / Rechenweg» ohne Rechnung; sonst wie 00-05 | S1, S6; zweite Gruppe in Orange mitzeichnen |
| 18-22 (Zahlenmauer, richtig und falsch) | nicht bestanden | Mauer gross und zentriert (gut), aber 3 Pastellfarben ohne Bezug zur Rechnung, gelber Strichrahmen «?» bleibt nach Antwort leer; Rechenweg in einer Zeile «10 + 20 = 30, 20 + 30 = 50, 30 + 50 = 80» umbrechend lang (Karte 19 «30 + 10 = 40, 10 + 40 = 50, 40 + 50 = 90») | Lösung grün einsetzen; Steine einfarbig weiss; Schritte als nummerierte Zeilen |
| 23-28 (jumps «35 + ? = 100» ... «54 + ? = 100») | **nicht bestanden** | Pille «+5»/«+2»/«+3» liegt auf Start; «48» und «50» überlagern sich zu «4850» (Karte 24, Zoom Z_p1.png), «35 40» eng; rot (S4) | S3, S4 |
| 29-32 (jumps «Welche Zahl liegt am Ende?») | nicht bestanden | S3-S5; «85 ?» direkt nebeneinander (Karte 32: 85 und ? 12 px Abstand), Pille «+7» am Pfeil klebend | S3-S5 |
| alle plus100-Karten Desktop 1100 | nicht bestanden | Karte 930 px breit, Grafik 200-260 px mittig mit grossem Leerrand links/rechts (Zehnerbild 185 px, Mauer 190 px, Rechenstrich 205 px); Rechenstrich ca. 90 px hoch | S2: Grafik auf 360-520 px skalieren |

## Tabelle D: Lernkarten einmaleins (27 Grafikkarten)

| Karte | bestanden? | Problem | Korrektur |
|---|---|---|---|
| 00-05 «Welche Aufgabe gehört zum Punktefeld?» | nicht bestanden | Feld zentriert (gut), aber kleine Punkte in Innenrahmen (S7), Rahmenbreite wechselt je nach Feld (125-190 px); Karte 03 (5 Reihen à 3): Feld 130 px breit in 290 px Karte, Leere; nach falscher Antwort «Deine Antwort: 5 × 5 / Richtig ist: 4 × 5» korrekt (rot/grün, gleicher Stil), Rechenweg nur als Text | S7, S11; Rechenkette 4 × 5 = 20 farbig unter Feld |
| 06-09 «Wie viele Punkte sind es?» | nicht bestanden | gleiche Probleme; Karte 07 (4 x 4) und 09 (5 x 6) zwei verschieden grosse Felder; Rechenweg «3 × 5 = 15 / Rechenweg» ohne Farben | S7, S6 |
| 10-13 «7 × 8 = 5 × 8 + 2 × 8 = ?» | nicht bestanden | S12: gestrichelte Linie ragt über das Feld; Felder 8 x 7 breiter als der Innenrahmen wirkt; Rechenweg «40 + 16 = 56» ohne Farben (blau 40 / orange 16 aus der Grafik wird nicht wiederholt) | S12, S6 |
| 14-17 «Die 5 blauen Reihen sind 40 …» | nicht bestanden | Fragetext dreizeilig 22 px gross dominiert, Feld darunter eng; S12; Rechenweg «2 × 8 = 16» ohne Farbe | S12, S6 |
| 18-21 «20 : 5 = ?» ... «16 : 8 = ?» | nicht bestanden | Teilen: nur grünes Feld ohne Gruppierung (keine Kreise um die Gruppen), nicht ersichtlich, was geteilt wird; Rechenweg «4 × 5 = 20» | Punkte zu Gruppen (dünne Kreise/Abstände) zusammenfassen; S6 |
| 22-26 «Setze fort: 3, 6, 9, 12, ?» (Rechenstrich mit 5-6 Pillen) | **nicht bestanden** | Pillen 9 px, Pfeile dicht, Punkt 7 px; Mauer von +3-Pillen berührt sich («+3» «+3» auf 36 px); orange (ok, nicht rot), aber «?»-Pille kleiner als die übrigen; Karte 23 hat 6 Pillen und überlappt am stärksten | S3 (Pillen nur über jedem zweiten Sprung oder Schrift 11 px + 2 Zeilen), Rechenstrich 130 px hoch |
| alle einmaleins-Karten Desktop | nicht bestanden | Feld 125-260 px in 930 px Karte, 70 % leer | S2 |

## Tabelle E: Prüfung

| Seite/Frage | bestanden? | Problem | Korrektur |
|---|---|---|---|
| Prüfungs-Einstieg plus100 und einmaleins (390) | bestanden | Prüfungsblatt-Grafik zentriert, Notenskala ok, Kacheln «15 Fragen» mit Rahmen akzeptabel; «Name» auf Blatt 8 px | – |
| Prüfungs-Einstieg Desktop | nicht bestanden (knapp) | Grafik und Notenskala ok, Kacheln mit Rahmen; ganze Seite 1100 px mit Leerraum unten rechts, Toast mittig | Einstieg `max-width:640px`; Toast S10 |
| plus100 Frage Zahlenmauer fehlt unten links / oben / unten (3 Fragen) | nicht bestanden (Farbabgleich) | Mauer gut gross und zentriert, aber Farben gelb/grün/blau ohne Rechnungsbezug (Prüfung hat keine Rechnung: ok); Strichrahmen «?» klar | Steine einfarbig weiss/Rand (wie Karten-Fix) |
| plus100 Frage Rechenstrich (64 + ? = 100, 54/74/?) | **nicht bestanden** | S3, S4: rot, «64» und «70» berühren sich, Pille «+6» klebt; Desktop: Strich 860 px breit, Pfeilspitzen sehr gross, deutlich grösser als die Mauer | S2, S3, S4 |
| einmaleins Frage «Welche Aufgabe gehört zum Punktefeld?» | nicht bestanden | Feld links verankert (Mobil 70 px Leere rechts), Desktop 12 % der Breite | S1, S2 |
| einmaleins Frage 7 x 7 = 5 x 7 + 2 x 7 und «8 × 7: 5 blaue Reihen» | nicht bestanden | S1, S12, Feld 260 px hoch, links | S1, S12 |
| einmaleins «Setze fort: 7, 14, 21, ?» (Prüfung) | bestanden (keine Grafik; Text) | In Lernkarten Rechenstrich, in Prüfung Text: uneinheitlich aber zulässig | – |
| Aufgaben-Trenner | bestanden | 3 px blaugrau, deutlich dicker als Antwortrahmen | – |
| «Falsch, richtig ist 48»-Antworten (Frage Fehlerkorrektur) | nicht bestanden (Text) | Antwortoption lang und doppelt («Falsch, richtig ist …»); in Lernkarte erscheint dann «Richtig ist: Falsch, richtig ist 63» | Option nur «63» bzw. «Es stimmt alles» |

## Zusammenfassung der schwersten Funde
1. Punktefelder/Zehnerbilder links statt zentriert, auf Desktop winzig (S1, S2): betrifft ca. 40 Grafiken.
2. Rechenstrich: zu klein, Beschriftungen überlappen («4850»), in Karten rot, Punkte bunt (S3-S5): betrifft ca. 35 Grafiken.
3. Lernkarten ohne Rechnung unter der Grafik, Rechenweg nur «58 / Rechenweg», Farben nicht abgeglichen (S6).
4. Kacheln/Kästen mit Plaketten, grauer Fläche, Rahmen (S8, S9) in 5 Theorie-Seiten.
5. Toast verdeckt Weiter-Knopf (S10), Punktgrössen und Linienüberstand uneinheitlich (S11, S12).
