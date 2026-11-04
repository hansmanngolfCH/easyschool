# Inhaltsprüfung v456: kl2-mathe-plus100 und kl3-mathe-einmaleins

Methode: Beide Themen aus content.json per Python geprüft. Jede Aufgabe, jeder Hinweis, jeder Rechenweg, jede Prüfungsfrage, Zahlenmauern, Rechenketten, Sachaufgaben und Fehlertyp-Aufgaben wurden neu gerechnet. Zusätzlich wurden die Optionen, die Grafikdaten (jumps, blocks, wall, arr, tbl, bar, chips) und die Zahlen über 100 geprüft. Die Palette der Grafiken wurde in src/p2.js nachgelesen. Es wurden keine Dateien geändert.

Alle Lösungen `a`, alle `ans`/`answer`-Werte und alle Rechenwege stimmen rechnerisch. In jeder Aufgabe ist genau eine Option richtig. Grafikdaten stimmen mit Text und Aufgabe überein. Das gilt für Sprünge, Mauern (alle konsistent), Stellenwert-Blöcke, Punktefelder (r × c passt zur Frage) und Malkreuz-Tabellen.

## A. Echte Fehler

### A1. kl2-mathe-plus100, Prüfungsfrage q13 (Fehleranalyse passt nicht zur Lösung)
- Frage: "Leo rechnet 39 + 24 = 52. Was stimmt?" Richtig laut `answer`: "Den Zehner vergessen".
- Problem: 39 + 24 = 63. Wer den Übertrag-Zehner vergisst, kommt auf 53, nicht auf 52. Leos 52 passt zu keiner der vier Optionen. Die Aufgabe ist darum nicht eindeutig lösbar. Die Hilfe auf Seite 8 ("Typischer Fehler") lehrt genau das Muster 53 statt 63.
- Korrektur: Leo rechnet 39 + 24 = 53 (dann passt "Den Zehner vergessen"). Alternativ q und explain auf 52 ändern und die Option anpassen. Die erste Variante ist einfacher.

### A2. kl2-mathe-plus100, Karte c77 (Zahl über 100)
- Frage: "45 + 46: Welche Aufgabe hilft dir dabei?" Die Option "45 + 56" hat den Wert 101.
- Problem: Der Zahlenraum geht nur bis 100. Das Ergebnis 101 kommt als Wert einer Option vor. Die Option ist kein Fehler im Sinn der Lösung, sie sprengt aber den Zahlenraum.
- Korrektur: "45 + 56" ersetzen, zum Beispiel durch "45 + 36" (Wert 81). Die Parallelkarten c76 und c78 nutzen "35 + 46" und "25 + 36".

### A3. kl3-mathe-einmaleins, Karten c93 und c94 (Hinweis passt nicht zur Aufgabe)
- c93 "9 × 0 = ?" und c94 "6 × 1 = ?" tragen denselben Hinweis wie c91 und c92: "Null Gruppen sind nichts. Eine Gruppe ist die Zahl selbst."
- Problem: Der Hinweis passt nur zu 0 × 7 (c91) und 1 × 8 (c92). Bei 9 × 0 sind es 9 Gruppen mit je 0 Dingen. Bei 6 × 1 sind es 6 Gruppen mit je 1 Ding. Der Hinweis führt Kinder hier auf die falsche Spur.
- Korrektur:
  - c93: "9 Gruppen mit je 0 Punkten. Das sind 0 Punkte."
  - c94: "6 Gruppen mit je 1 Punkt. Das sind 6 Punkte."

### A4. kl3-mathe-einmaleins, Prüfungsfragen q2, q6, q23 (Prüfung wiederholt Lernkarten)
Diese drei Prüfungsfragen haben dieselben Zahlen und dieselbe Lösung wie eine Lernkarte. Die Vorgabe lautet aber, dass die Prüfung andere Zahlen verwendet.
- q2 "5 × 9 = 45. Wie viel ist 6 × 9?" ist identisch mit Karte c40.
- q6 "10 × 6 = 60. Wie viel ist 9 × 6?" ist identisch mit Karte c43.
- q23 "2 × 9 = 18. Wie viel ist 4 × 9?" ist identisch mit Karte c29.
- Korrektur-Vorschlag:
  - q2: "5 × 4 = 20. Wie viel ist 6 × 4?" mit Antwort 24 (Optionen 24, 20, 26, 28).
  - q6: "10 × 3 = 30. Wie viel ist 9 × 3?" mit Antwort 27 (Optionen 27, 33, 24, 26).
  - q23: "2 × 8 = 16. Wie viel ist 4 × 8?" mit Antwort 32 (Optionen 32, 24, 36, 18). Karte c28 hat dieses Muster schon, darum eventuell besser "2 × 5 = 10. Wie viel ist 4 × 5?" mit Antwort 20.
- Ebenfalls Lernkarten-Ergebnis: q4 "9 × 9 = 81" entspricht dem Ergebnis von Karte c45 (anderes Aufgabenformat, darum nur ein Hinweis).

## B. Verwirrende Antwortoptionen und Didaktik

### B1. kl3-mathe-einmaleins, Karten c72 und c74 (widersprüchliche Distraktoren)
- c72: "Dora rechnet 6 × 8 = 48" mit der Option "Falsch, richtig ist 48".
- c74: "Luzi rechnet 8 × 7 = 56" mit der Option "Falsch, richtig ist 56".
- Problem: Die Option sagt "falsch", nennt aber genau Doras bzw. Luzis Ergebnis. Sie ist in sich widersprüchlich. Ein Kind kann sie als zweite richtige Antwort lesen.
- Korrektur: Distraktoren mit anderen Werten verwenden. Für c72 zum Beispiel "Falsch, richtig ist 46". Für c74 zum Beispiel "Falsch, richtig ist 54". Die Karten c71, c73, c75 und c76 haben dieses Problem nicht.

### B2. kl2-mathe-plus100, Karten c27, c30, c32, c33, c34 (Thema "Übergang")
Die Karten tragen `th: uber`, aber die Einer ergeben genau 10 (4 + 6, 1 + 9, 4 + 6, 7 + 3, 5 + 5). Die Theorie "Wenn die Einer über 10 gehen" spricht von Summen grösser als 10. Nur c28 (15), c29 (12) und c31 (14) passen. Korrektur: Aufgaben mit Einersumme 11 bis 18 verwenden, zum Beispiel 28 + 15 oder 47 + 25. Alternativ den Titel der Theorie-Seite in "Wenn die Einer 10 oder mehr ergeben" ändern.

### B3. kl2-mathe-plus100, Karten c47 bis c56 (zwei Hinweise, zwei Strategien)
Hinweis 1: "Gehe zuerst bis zum vollen Zehner." Hinweis 2: "Rechne die Einer: 6 + 7." Der erste Hinweis meint die Zehnerbrücke (36 + 4 + 3), der zweite die Zerlegung in Einer. Das mischt zwei Wege. Korrektur: Hinweis 2 ändern, zum Beispiel "Wie viel fehlt von 36 bis 40? Den Rest der 27 rechnest du danach." Alternativ beim zweiten Weg bleiben.

### B4. kl2-mathe-plus100 und kl3-mathe-einmaleins, `steps` ohne Rechenweg (viele Karten)
Der Rechenweg besteht nur aus dem Ergebnis, mit der Bezeichnung "Rechenweg". Das zeigt kein Vorgehen.
- kl2, nur Zahl: c35 bis c46, c57 bis c70, c83 bis c87, c113 bis c122.
- kl2, nur die Antwort-Rechnung ohne Schritte: c71 bis c78.
- kl3, nur Zahl: c1 bis c10, c91 bis c94.
- Korrektur: eine echte Zeile eintragen, zum Beispiel c35 "20 + 5 = 25 → 25 − 20 = 5", c113 "35 + 5 = 40, 40 + 60 = 100, 5 + 60 = 65" und c1 "2 × 7 = 7 + 7 = 14".

### B5. kl3-mathe-einmaleins, Theorie: Null und Eins fehlen
Die Lernkarten c91 bis c94 üben 0 × n, n × 0 und n × 1. Keine Theorie-Seite erklärt das. Die Einführung nennt nur "1 × 1 bis 10 × 10". Korrektur: eine kurze Seite oder ein Satz hinzufügen, zum Beispiel "Mal 1 bleibt die Zahl. Mal 0 ist immer 0." Dazu eine Zeile "Von 0 × 0 bis 10 × 10" in der Einführung.

### B6. kl3-mathe-einmaleins, Karten c61 bis c64 (Bild verrät die Lösung)
Das Punktefeld zeigt die Lösung, zum Beispiel 4 Reihen mit je 5 bei "20 : 5". Das ist nur ein didaktischer Hinweis, kein Fehler. Eventuell das Bild erst nach dem Antworten als Erklärung zeigen.

## C. Sprache und Formulierung

### C1. kl3-mathe-einmaleins, Theorie `basis` (Gruppe mal Anzahl)
- Text: "Das Einmaleins sind die Malreihen von 1 bis 10. Jede Aufgabe ist eine Gruppe mal Anzahl."
- Problem: "Das Einmaleins sind" ist ungrammatisch. Es sollte "Das Einmaleins besteht aus" oder "Das Einmaleins ist" heissen. "Eine Gruppe mal Anzahl" klingt, als sei es eine einzige Gruppe. Seite 2 erklärt es richtig: "3 × 4 heisst 3 Gruppen mit je 4".
- Korrektur: "Das Einmaleins besteht aus den Malreihen von 1 bis 10. Bei jeder Aufgabe sagt die erste Zahl, wie viele Gruppen es sind. Die zweite Zahl sagt, wie viele in jeder Gruppe sind."

### C2. kl3-mathe-einmaleins, Seite 1 (Einführung)
"Du lernst, wie Malaufgaben gehen" ist umgangssprachlich und ungenau. Korrektur: "Du lernst, wie Malaufgaben funktionieren und wie du schwere Aufgaben aus leichten findest."

### C3. kl3-mathe-einmaleins, Seite "Tauschen"
"Schau dir das Bild von der Seite an." Das ist mehrdeutig (Bild neben dem Text, oder von der Seite betrachten). Korrektur: "Das zweite Bild ist das erste, nur gedreht." oder "Drehe das erste Bild. Dann siehst du 7 × 3."

### C4. kl3-mathe-einmaleins, Seite "Eine Gruppe mehr", Chips
Die Chips benennen die Farben "blau" und "gelb". Die Punktefelder zeigen Blau und Gelb, die Chips (Palette DC) aber Blau und Orange (Farbindex 0 und 3). Gelb und Orange sind für Kinder gut unterscheidbar, darum nur ein Hinweis. Korrektur: Farbindex für "7" auf eine gelbe Chip-Farbe ändern oder "gelb" in "orange" ändern.

### C5. kl2-mathe-plus100, Theorie-Seiten (Titel, Folgesätze)
- Seite 7 ("Geschickt rechnen"): Die Beschriftungen "Doppelte" und "Doppelte plus 1" sind sprachlich verkürzt. Korrektur: "Das Doppelte" und "Das Doppelte plus 1".
- Seite 12 ("Regeln und Wichtigstes"): Die Karten zeigen "drei Wege", die Seite 1 aber vier Dinge nennt (Zerlegen, Schritte, Geschickt, Probe). Das Geschickt-Rechnen fehlt. Korrektur: eine vierte Karte "Geschickt: tauschen oder verdoppeln, 35 + 36 = 70 + 1" ergänzen.

### C6. kl2-mathe-plus100, Prüfungsfrage q10 (Erklärung)
Die Erklärung "63 + 48 ist mehr als 100" nennt die Summe nicht. Das ist in Ordnung, weil 111 über dem Zahlenraum liegt. Korrektur: Erklärung "63 + 50 ist schon mehr als 100" (Schätzung), damit auch das Kind den Weg sieht.

## D. Hinweise zur Prüfung (kein Fehler)
- kl2-mathe-plus100: 7 von 20 Prüfungsfragen sind reine "a + b = ?" ohne Carry-Struktur (q1, q3, q4, q8, q9, q12, q16). Der Mix ist insgesamt aber in Ordnung (Mauern, Strecke, Probe, Sachaufgabe, Rechenkette, Fehleranalyse, Tauschen, Ergänzen). Alle Prüfungsfragen verwenden andere Zahlen als die Lernkarten. Der Fragetext q20 ("Welche Zahl liegt am Ende des Rechenstrichs?") ist wörtlich gleich wie c119 bis c122, aber mit eigenen Zahlen.
- Pronomen: Mia, Nora, Lea und Anna stehen mit "sie" (kl2 c103, c107 u. a.), Ben, Leo, Noah mit "er". Alles stimmt. Kein "ß" in beiden Themen. Keine Zahl über 100 in Texten, Hinweisen und Schritten. Als Wert einer Option nur "45 + 56 = 101" (siehe A2) und die Summen "mehr als 100" in c111/c112/q10.

## Zusammenfassung
- Geprüft: kl2-mathe-plus100: 12 Theorie-Seiten, 126 Karten, 20 Prüfungsfragen. kl3-mathe-einmaleins: 12 Theorie-Seiten, 94 Karten, 23 Prüfungsfragen. Das sind 24 Seiten, 220 Karten und 43 Prüfungsfragen.
- Rechenfehler in Lösungen, Optionen, Hinweisen und Schritten: 0.
- Inhaltliche Fehler: 4 (A1 bis A4, wobei A4 drei Prüfungsfragen betrifft; zusammen 7 betroffene Karten oder Fragen: kl2 q13, kl2 c77, kl3 c93, c94, q2, q6, q23).
- Weitere Funde: 2 verwirrende Distraktoren (B1), 5 Karten mit unpassendem Thema (B2), 10 Karten mit gemischten Strategien (B3), 63 Karten mit Schritt ohne Rechenweg (B4, davon 49 in kl2 und 14 in kl3), ausserdem B5, B6 und die Sprachpunkte C1 bis C6.
