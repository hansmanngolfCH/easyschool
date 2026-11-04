# Scout: Das kleine Einmaleins, Klasse 3 (CH)

Kennzeichnung: [Q] = in geöffneter Quelle gefunden, [E] = eigene Idee/Einschätzung.

## (a) Darstellungen (einfache SVG-Umsetzung)
1. **Punktefeld** [Q]: Raster aus Kreisen, Zeilen = Gruppen, Spalten = Gruppengrösse. SVG: `<circle>` in zwei Schleifen; Farbe pro Zeile abwechselnd.
2. **Geteiltes Punktefeld** [Q]: Feld mit farbiger Trennlinie, z. B. 7·8 als 5 Reihen + 2 Reihen. SVG: gleiche Kreise, zwei Farbgruppen plus eine gestrichelte `<line>`.
3. **Malkreuz** [Q, am 200er-Feld bzw. aus Punktefeld übertragen]: Kreuz aus vier Feldern mit Teilprodukten. SVG: Rechteck mit Mittelkreuz, vier `<text>`-Felder; gehört zum geteilten Punktefeld.
4. **Gruppenbild** [Q als Idee «gleiche Gruppen»]: z. B. 3 Teller mit je 4 Äpfeln. SVG: Kreise/Rechtecke als Teller, kleine Kreise darin; keine Bildrechte nötig.
5. **Punktestreifen/Malstreifen** [Q teils: Punktestreifen fürs Zehner-Einmaleins; «Malstreifen» selbst nur [E]]: eine Reihe Punkte in Fünfer-Blöcken, darüber Bögen für Sprünge. SVG: Kreise plus `<path>`-Bögen.
6. **Einmaleins-Tafel** [Q]: 10×10-Tabelle, bekannte Felder farbig, Kernreihen hervorgehoben. SVG oder HTML-Tabelle; Farbe als Zustand.
7. **Ein Bild, vier Aufgaben** [Q]: Punktefeld mit vier Termen darunter (4·5, 5·4, 20 : 5, 20 : 4). SVG: Feld plus Textzeilen.
8. **Zahlenstrahl mit Sprüngen** [E]: gleich lange Bögen, die an Vielfachen landen. SVG: Linie, Marken, Bögen.
Malmauer: in den Quellen nicht gefunden, daher nicht empfohlen.

## (b) 10 Formulierungen für Erklärschritte (eigene Worte, Kl. 3)
1. «Mal heisst: gleich viele, immer wieder. 3·4 sind drei Gruppen mit je vier.»
2. «Die erste Zahl sagt, wie viele Gruppen. Die zweite sagt, wie gross jede Gruppe ist.»
3. «Dreh das Bild: 3·4 und 4·3 haben dasselbe Ergebnis. So lernst du nur die Hälfte.»
4. «Fang mit den leichten Reihen an: 1er, 2er, 5er, 10er. Von dort aus kommst du überall hin.»
5. «Für die 4er-Reihe nimmst du die 2er-Aufgabe und verdoppelst sie.»
6. «Für die 5er-Reihe nimmst du die 10er-Aufgabe und halbierst sie.»
7. «Eine Gruppe mehr? Zähle die Gruppengrösse einmal dazu: 6·8 ist 5·8 plus 8.»
8. «Eine Gruppe weniger? Nimm sie weg: 9·8 ist 10·8 minus 8.»
9. «Schwere Aufgabe? Schneide das Feld in zwei leichte Stücke und addiere: 7·8 = 5·8 + 2·8.»
10. «Teilen ist die Gegenprobe: 21 : 3 = 7, weil 7·3 = 21 ist.»

## (c) 12 Aufgabenideen
| Nr. | Aufgabe | Schwierigkeit |
|---|---|---|
| 1 | Punktefeld zählen und als Malaufgabe schreiben | leicht |
| 2 | Zu 4·3 das passende Gruppenbild wählen | leicht |
| 3 | Kernaufgaben-Blitz: 2·7, 5·6, 10·4 | leicht |
| 4 | Tauschaufgabe nennen: 3·8 = ? | leicht |
| 5 | Ergänzen: 5 · __ = 35 | leicht-mittel |
| 6 | Päckchen: leichte Aufgabe markieren, schwere damit lösen (3·8 aus 2·8) | mittel |
| 7 | Verdoppeln: 4·6 aus 2·6, Hilfsaufgabe wählen | mittel |
| 8 | Feld teilen und Rechenweg zeigen (6·7) | mittel |
| 9 | Ein Bild, vier Aufgaben (inkl. Umkehr) | mittel |
| 10 | Fehler finden: fertiges Päckchen mit einem Fehler | mittel-schwer |
| 11 | Malkreuz vervollständigen (7·8 = 5·8 + 2·8) | schwer |
| 12 | Sachaufgabe: 24 Kinder, Gruppen zu 4, wie viele Gruppen? | schwer |

## (d) Quellen
Geöffnet und ausgewertet:
- Klett CH, Schweizer Zahlenbuch Handreichung Einmaleins: https://downloads.klett.ch/uploads/images/textbooks/Dateien/Schweizer-Zahlenbuch-1-4_Einmaleins_Handreichung.pdf (Einmaleins-Tafel, Malkreuz am 200er-Feld, Ableiten, Umkehraufgaben; «Malstreifen» kommt dort nicht vor)
- School-Scout-Vorschau «Schritt für Schritt zum kleinen Einmaleins» (Unterrichtsfolge, Punktefeld, Kernreihen, Kartenspiele, Tafel): https://www.school-scout.de/vorschau/79929/schritt-fuer-schritt-zum-kleinen-einmaleins.pdf
- PIKAS, halbschriftliche Multiplikation Kl. 3 (Punktefeld-Zerlegung, Malkreuz, Punktestreifen): https://pikas.dzlm.de/pikasfiles/uploads/upload/Material/unterricht_neu/zahlen_und_operationen/zr_1000/halbschriftliche_multiplikation/lad-mathematische-themen-klasse-3-komplett_2022_halbschriftlichemultiplikation.pdf
- Aus 11_recherche_einmaleins.md übernommen (dort geöffnet): PIKAS 1mal1 richtig üben https://pikas.dzlm.de/pikasfiles/uploads/upload/Material/gesamtes_Material/1mal1_richtig_ueben.pdf

Nur Trefferliste, nicht geöffnet:
- Friedrich Verlag «Malkreuz-Forscher» (Weiterleitung auf Login, Inhalt nicht gelesen): https://www.friedrich-verlag.de/friedrich-plus/grundschule/grundschulmagazin/malkreuz-forscher-8519
- Duden-Leseproben, elk/meinunterricht-Ebooks, Raabe, Bunte Fische, Beltz, TU Dortmund (eldorado), schule-bw, Klett Jahresplanung Zahlenbuch 3.

Ehrlich: Malmauer fand ich nirgends; Malstreifen und Zahlenstrahl-Sprünge sind [E]. Die Formulierungen in (b) und alle Aufgaben in (c) sind eigene Entwürfe, angelehnt an die genannten Konzepte, nicht kopiert.

## Zusammenfassung
Gut belegt sind Punktefeld, geteiltes Punktefeld/Malkreuz, Einmaleins-Tafel und die Folge Kernreihen, Tauschaufgaben, Ableiten, Umkehraufgaben; alle lassen sich mit Kreisen, Linien und Text als SVG zeichnen. Nur teilweise belegt sind Malstreifen und Zahlenstrahl-Sprünge, nicht gefunden wurde die Malmauer. Die Erklärsätze und Aufgaben sind eigene Entwürfe und sollten vor dem Einsatz fachlich geprüft werden.
