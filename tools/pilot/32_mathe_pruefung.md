# Fachprüfung Mathe (21 neue Themen) – Bericht 32

Prüfer: strenger Mathe-Lehrer (Schweiz, Kt. AG), Stand `content.json` vom 05.11.2026.
Geprüft wurden **alle 740 Karten und alle 374 Prüfungsfragen** (21 Themen) sowie alle `explain`-Abschnitte und `theory`-Blöcke. `content.json` und der Generator wurden **nicht** verändert.

Prüfskript (wiederholbar, read-only): `tools/pilot/32_mathe_pruefung.py`

## 1. Vorgehen

1. Strukturcheck für jede Karte/Frage: `a` in `opts`; mc-`answer`-Index gültig und `options[answer] == explain`; keine doppelten oder numerisch gleichen Optionen (auch `0,5` = `1/2`); input-`answer` enthält die Musterlösung; Format (ASCII-Minus, Dezimalpunkt, π = 3,14).
2. Unabhängige Nachrechnung: Pro Aufgabentyp wurde per Regex die Aufgabe aus dem Text geparst und die Lösung neu berechnet (mit `Fraction`, π = 3,14). Verglichen wurden Musterlösung, Anzahl der Optionen mit demselben Wert (muss genau 1 sein), Eindeutigkeit (Ziffer kommt nur einmal vor, Median nur bei ungerader Anzahl, Modus eindeutig, √ keine Quadratzahl bei «zwischen», Dreiecke/Quadrate sind pythagoreisch, Punkte nicht auf Achsen).
3. Steps: jede Gleichung `A = B = C` in den Rechenschritten wurde numerisch geprüft.
4. Hinweise (`hints`) auf passende Zahlen/Vorzeichen geprüft; Duplikate, Ablenker, Antwortposition, Prüfungsabdeckung und Theorie (`explain`, `theory`) manuell gelesen.

## 2. Ergebnis in Kürze

| Prüfung | Ergebnis |
|---|---|
| Musterlösung rechnerisch falsch | **0 von 1114** (1099 automatisch nachgerechnet, 15 Begriffs-/Wertefragen von Hand geprüft) |
| `a` nicht in `opts` / mc-Index falsch / `explain` ≠ Option | 0 |
| Numerisch gleiche Optionen (zwei richtige Zahlen) | 0 |
| Rechenschritte (steps) rechnerisch falsch | 0 |
| Zwei fachlich richtige Optionen (inhaltlich) | **1** (winkel-parallelen c21) |
| Doppelte Aufgaben | 0 |

Schweregrad-Definition: **kritisch** = Musterlösung falsch oder eine «falsche» Option ist fachlich ebenfalls richtig (Schüler mit richtigem Wissen wird bestraft). **mittel** = Aufgabe/Theorie/Prüfung fachlich oder didaktisch deutlich mangelhaft (unklarer Text, Stoff nicht erklärt, unsinniger Kontext, Prüfung deckt Thema nicht ab). **gering** = Schönheit, Typografie, schwacher Ablenker, Grammatik.

IDs: `cN` = Karte, `qN` = Prüfungsfrage. `§N` = Abschnitt N von `explain` (1 Worum geht es, 2 Begriffe, 3 Im Bild, 4 Aufbau, 5 So gehst du vor, 6 Beispiele, 7 Regeln).

## 3. Kritische Funde

| Thema | ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|---|
| kl7-mathe-winkel-parallelen | c21 | «Welches Viereck hat zwei Paare paralleler Seiten?» Antwort Parallelogramm, aber Option **Quadrat** hat ebenfalls zwei Paare paralleler Seiten (ist ein Spezialfall des Parallelogramms). Zwei richtige Optionen. | Option «Quadrat» ersetzen durch «allgemeines Viereck» (Optionen: Trapez, Drachen, Parallelogramm, allgemeines Viereck). Alternativ Frage: «Welches Viereck hat zwei Paare paralleler Seiten, aber im Allgemeinen keine rechten Winkel?» | kritisch |

Alle übrigen Musterlösungen sind korrekt.

## 4. Funde pro Thema

### kl4-mathe-stellenwert
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c1, c6, c10, c16, c20, c26, c30, q1, q9, q11 | Grammatik: «Welche Ziffer steht bei den Einer / Zehner / Hunderter / Tausender / Zehntausender / Hunderttausender?» (Dativ Plural fehlt). | «… bei den Einern / Zehnern / Hundertern / Tausendern / Zehntausendern / Hunderttausendern?» (Wortliste im Generator ergänzen). | gering |
| c5, c15, c25 vs. c7, c11 | Uneinheitliche Schreibweise 4-stelliger Zahlen: Optionen «8090», «4090», «8030» ohne Apostroph, aber «9'000», «3'000» mit Apostroph. | Eine Regel für das ganze Thema (z. B. ab 4 Stellen immer mit Apostroph: 8'090, 4'090). | gering |
| §7 Regel «Vergleichen» | «Zuerst die linke Stelle» ist ungenau (nicht die linkste Stelle, sondern die erste verschiedene). | «Von links die erste Stelle suchen, die sich unterscheidet». | gering |

### kl7-mathe-negativ
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c19, c30 | Hinweis «Minus eine negative Zahl ist Plus.» bei positivem x («8 − x für x = 1», «5 − x für x = 3»); der Hinweis passt nicht zur Aufgabe. | Hinweis ändern: «Setze x ein und rechne 8 − 1.» (Hinweis nur bei negativem x verwenden, wie c8). | gering |
| c11 | Hinweis/Step «(−12) + 0 … nach rechts 0 Schritte» ist sinnlos. | Aufgabe ersetzen (z. B. (−12) + 5) oder Hinweis «Plus 0 ändert die Zahl nicht». | gering |
| q1 | «11 − 5 = ?» enthält keine negative Zahl; in der Prüfung zu Negativen Zahlen trivial. | «5 − 11 = ?» (Antwort −6) oder «(−11) − 5». | gering |
| §4 «Minus minus: Wird zu Plus», §7 Karte «Gegenzahl – Minus minus ergibt Plus», §6 Chip «−2 = Gegenzahl» | Ungenau/falsch beschriftet: Die Regel gehört zur Subtraktion («Minus eine negative Zahl wird Plus», 4 − (−2) = 4 + 2). Die Gegenzahl von −2 ist +2, nicht −2. | §4: «Minus eine negative Zahl: wird zu Plus». §7: Titel «Subtraktion» statt «Gegenzahl»; Chip-Label «Subtrahend». | gering |

### kl7-mathe-wurzel
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c5, c14, c20, c27, c35 | Letzter Step endet mit «√36 = 6»; die Summe (Endergebnis, z. B. 5 + 6 = 11) fehlt. | Dritten Step «5 + 6 = 11 | Summe» ergänzen. | gering |
| c4, c13, c19, c26, c34 | Step «7² = 49, 8² = 64» nennt nicht, dass 49 < 63 < 64 und damit das Ergebnis folgt. | Step: «49 < 63 < 64, also liegt √63 zwischen 7 und 8». | gering |

### kl7-mathe-gleichungen
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c7, c18, c29, q9 | Alle vier Ja/Nein-Fragen «Ist x = … eine Lösung von …?» haben die Antwort **nein**; die Antwort ist erratbar. Step zeigt nur die Rechnung des «nein»-Falls. | Mindestens die Hälfte mit Antwort «ja» (z. B. x = 2 bei 6x + 5 = 17); bei «ja» Step «6 · 2 + 5 = 17 ✓». | mittel |
| c8, c19, q7, q18 | ASCII-Bindestrich statt «−»: Steps «5x = -19 − 1 = -20», «3x = -2 − 1 = -3»; Fragen «2x − 7 = -5», «4x − 10 = -6». | Überall «−» (U+2212) verwenden. | gering |
| Prüfung (mc) | Antwortposition ungleich: 6 von 9 richtigen Antworten stehen auf Position B. | Optionen im Generator mischen. | gering |

### kl7-mathe-prozent
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c1, c13, q6, q18 | Unsinniger Kontext: «Von 1000 Schülern fehlen 750» (75 %), «Von 400 Schülern fehlen 300», «Von 1000 … 600». Niemand fehlt zu 60–75 %. | Realistisch: «Von 25 Schülern der Klasse fehlen 3» / «Von 200 Schülern der Schule fehlen 10». | mittel |
| c7, c17, c28, q4, q16 | Mehrwertsteuersätze 2 %, 4 %, 8 % sind nicht schweizerisch bzw. veraltet (CH 2026: 8,1 % / 2,6 % / 3,8 %). | Satz 8,1 % mit Betrag 1000 Fr. (81 Fr.) oder neutral «Der Aufschlag beträgt 10 %». | mittel |
| §1–§7 (Theorie) | Erklärt nur «Prozentwert berechnen». Aufgaben «Prozentsatz bestimmen» (c1, c9, c13, c19, c23, c30, c34, q6, q10, q18) und «Grundwert bestimmen» (c2, c11, c14, …, q5, q8, q17) sowie Bruch/Dezimalzahl ↔ Prozent (c5, c6, c27, q2, q9, q14) werden nicht erklärt. | §5/§6 um «Prozentsatz = Prozentwert : Grundwert · 100» und «Grundwert: erst 1 %, dann mal 100» sowie 25 % = 1/4 = 0,25 ergänzen. | mittel |
| c14 | Ablenker «-35» (negativer Frankenbetrag, ASCII-Minus). | Ablenker durch plausible Fehlerwerte ersetzen (z. B. 22,5 = 75 % von 30). | gering |
| c3, c10, c15, c31, c36, q12 (Pulli 300–1000 Fr.); c4, c16 (Velo 1000 Fr.); q7 (Velo +60 %) | Unrealistische Preise/Preissteigerung. | Pulli 40–150 Fr., Velo 400–900 Fr., Preissteigerung 5–15 %. | gering |

### kl7-mathe-dreisatz
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c2, c8, c12, c18, c22, c27, c30, c36, q4, q9, q11 (umgekehrter Dreisatz) | Theorie §5/§6 zeigt nur den proportionalen Dreisatz. Der Weg beim umgekehrten Dreisatz (Arbeitstage insgesamt = Arbeiter · Tage, dann teilen) ist nur im Hinweis, nicht im Aufbau. | §6 um ein Beispiel «3 Arbeiter · 10 Tage = 30 Arbeitstage; 30 : 6 = 5 Tage» ergänzen. | mittel |
| c2, c8, c12, c18, c22, c27, c30, c36, q4, q9, q11 | Voraussetzung «alle arbeiten gleich schnell» fehlt (sonst nicht eindeutig lösbar). | Zusatz «(Alle arbeiten gleich schnell.)». | gering |
| c20, c29, q1, q3, q7, q15, q18; c33, q10, q12; q6 | Unrealistische Preise: Äpfel/Kartoffeln 5–9 Fr./kg, Reis 7–8 Fr./kg; Zug mit 42 km/h (q6). | Äpfel/Kartoffeln 2–4 Fr./kg, Reis 3–5 Fr./kg; Zug mit ≥ 70 km/h. | gering |
| §7 «Proportional: Beide Werte steigen» | Ungenau; auch beim umgekehrten Dreisatz steigt ein Wert. | «Doppelt so viel → doppelt so teuer (Quotient bleibt gleich)». | gering |
| c4 | «Je schneller das Auto, desto kürzer die Fahrzeit» ohne «auf derselben Strecke». | Zusatz ergänzen. | gering |

### kl7-mathe-winkel-dreiecke
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c7, c18, c36, q10 | Winkelarten (spitz, rechter, stumpf, gestreckt) kommen in der Theorie nicht vor, werden aber abgefragt. | §2 Tabelle um «spitz < 90°, rechter Winkel = 90°, stumpf 90°–180°, gestreckt = 180°» ergänzen. | mittel |
| c36 | «Ein Winkel von 90° ist … rechtwinklig»: Ein Winkel ist «recht», «rechtwinklig» ist eine Figur. | Antwort «recht» (Frage: «Ein Winkel von 90° ist ein … Winkel»), Hinweis anpassen. | gering |
| c22, c28, q7, q9 | Ablenker sind negative Winkel («-20», «-19», «-51», «-8») mit ASCII-Minus; sofort ausscheidbar. | Fehlerwerte wie 180 − α, α + β, 90 − α + β verwenden. | gering |
| §1 | Pizza-Einstieg (360°) passt nicht zum Thema «Winkelsumme 180°». | Dreieck-Einstieg wählen (z. B. Dreieck aus Papier abreissen und Ecken aneinanderlegen). | gering |

### kl7-mathe-zins
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c3, c4, c7, c8, c11, c12, c13, c15, c19, c20, c23, c27, c29, c33, c35, q4, q5, q10, q17, q18 | Zinssätze 3–6 % sind für Schweizer Sparkonten unrealistisch (2026 meist < 2 %). | Sätze 1–2 % und höhere Kapitalien (z. B. 10'000 Fr.). | gering |
| c4, c12, c20, c27, c33, q5, q10, q17 | «zu 6 % für 6 Monate»: nicht gesagt, dass der Satz pro Jahr gilt. | «zu 6 % pro Jahr für 6 Monate». | gering |
| c9, q3 | Nur 2 Optionen (1 %, 2 %). | Auf 4 Optionen erweitern. | gering |
| Theorie | Kapital aus Zins und Zinssatz (c2-Typ, q12) ist nicht erklärt. | §6 Beispiel «Kapital = Zins : Zinssatz · 100». | gering |

### kl7-mathe-terme-aufstellen
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c1, c16, c29 | Widersprüchlicher Text: «Eine Zahl x ist um 11 grösser als eine andere Zahl. … (Die andere Zahl ist x.)» – x ist erst die grössere, dann die andere Zahl. | «Eine Zahl ist um 11 grösser als x. Wie heisst der Term für diese Zahl?» | mittel |
| q1 | Option «-1» (ASCII-Minus) und nur 3 Optionen. | 4 Optionen, «−1» mit U+2212. | gering |
| Prüfung | Nur 16 statt 18 Fragen (wie kl9-einsetzung). | Auf 18 ergänzen. | gering |
| §4 | «grösser um», «vermindert um», «Summe aus» werden abgefragt (c1, c2, c6, c20, c32, q2, q7), stehen aber nicht in der Tabelle. | Tabelle ergänzen. | gering |

### kl7-mathe-winkel-parallelen
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| Prüfung q1–q18 | Prüfung besteht nur aus zwei Aufgabentypen: Stufenwinkel (q1, q3, q5 … q17) und Scheitelwinkel (q2, q4, q6 … q18); die Antwort ist jeweils die gegebene Zahl. Wechselwinkel, Nebenwinkel, Parallelogramm, Trapez und Flächen (11 Kartentypen) fehlen. | Mindestens je 2 Fragen zu Wechselwinkel, Nebenwinkel des Stufenwinkels, Parallelogramm, Trapez und Fläche. | mittel |
| c1, c10, c11, c14, c15, c24, c25, c28, c33, c34, q1, q3 … q17 (ungerade) | «Ein Winkel misst 67°. Wie gross ist der Wechselwinkel / Stufenwinkel?» – ohne Figur/Bezeichnung unklar, wessen Winkel gemeint ist. | «Der Winkel α misst 67°. Wie gross ist sein Stufenwinkel α'?» und Skizze. | mittel |
| §2, §4, §7 (Theorie) | Nebenwinkel fehlt in der Tabelle, «gegenüberliegende Winkel im Parallelogramm sind gleich» (c5, c19) fehlt, Definition Trapez/Parallelogramm für c7/c21 fehlt; «Wechselwinkel: Gegenüber an Parallelen» ungenau. | Tabelle ergänzen: Nebenwinkel 180°, Parallelogramm: gegenüber gleich, Trapez: ein Paar parallel, Wechselwinkel: auf verschiedenen Seiten der Geraden. | mittel |
| c6, c20, c31 | «Trapez, AB parallel CD, δ bei D»: Ohne Hinweis auf Reihenfolge der Ecken (ABCD im Umlaufsinn) nicht eindeutig. | «Trapez ABCD mit AB ∥ CD (Ecken im Umlaufsinn)». | gering |
| c2, c16, c29 | «Nebenwinkel seines Stufenwinkels» ist verschachtelt. | «Winkel α = 109°. Wie gross ist der Nebenwinkel von α?» (Stufenwinkel separat). | gering |
| c7 | «genau ein Paar paralleler Seiten» setzt exklusive Trapez-Definition voraus. | Definition in Theorie festhalten. | gering |

### kl8-mathe-terme
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c8, c19, c29 | Steps rechnen nicht aus (nach «(10 + 4)² = 10² + 2·10·4 + 4²» folgt direkt «196»). | Zwischenstep «100 + 80 + 16 = 196». | gering |
| c2, c13 | Ablenker «11x + 18» sinnlos (addiert die Koeffizienten). | «11x + 18» durch einen echten Schülerfehler ersetzen, z. B. «2x + 11» (addiert statt multipliziert). | gering |

### kl8-mathe-kreis-prisma
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| Theorie (c5, c15, c23, q4, q12 Mantelfläche; c6, c16, c24, q9, q17 Höhe aus V : G; c4, c9, c14, q1, q6, q8, … Dreiecksfläche) | Mantelfläche, Höhe aus Volumen und Dreiecks-Grundfläche (g · h : 2) werden abgefragt, aber nicht erklärt. | §4/§6 ergänzen: Mantel = Umfang · Höhe, h = V : G, Dreieck A = g · h : 2. | mittel |
| §1, scene, c10 | «Velorad hat 50 cm Radius» ist unrealistisch (Durchmesser 1 m; Velorad r ≈ 35 cm). | r = 35 cm (U = 219,8 cm) oder «Traktorrad». | gering |
| c4, c9, c14, q1, q6, q8, q14, q16 | «Grundseite 6 cm, Höhe 7 cm … Das Prisma ist 10 cm hoch» – zwei «Höhen» verwechselbar. | «Dreieckshöhe 7 cm» und «Prismenhöhe 10 cm». | gering |

### kl8-mathe-lineare-funktionen
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c2, c12, c23, c34 (Frage), c10, c28, c32 (Steps) | ASCII-Bindestrich: «y = -5x − 3», «-2 · (−3) − 3 = 3». | Durchgehend «−». | gering |
| §2 «Funktion: Jedem x gehört ein y» | Unpräzise. | «Jedem x gehört **genau ein** y». | gering |
| Prüfung (mc) | 7 von 12 richtigen Antworten auf Position B. | Optionen mischen. | gering |

### kl8-mathe-potenzen
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| §4 «a⁰ ist immer 1» (c3, c15, c25, q7, q18) | Falsch für a = 0 (0⁰ ist nicht definiert). | «a⁰ = 1 (für a ≠ 0)»; auch Hinweis «Jede Zahl hoch 0 ist 1» anpassen. | gering |
| c24, c29 | Ergebnis «x¹» ist unüblich. | Antwort «x» (Erklärung: x¹ = x), Ablenker «1», «x⁷» beibehalten. | gering |
| Theorie | Vorzeichenregel bei negativer Basis (c4, c11, c16, c30, c34, q4, q12) steht nur im Hinweis; Vielfache von Zehnerpotenzen (c5, c17, c26, c35, q1, q9, q16) nicht erklärt. | §4 ergänzen: (−2)³ = −8, (−2)² = 4; 5 · 10² = 500. | gering |

### kl8-mathe-oberflaeche
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| §2 «Grundfläche: Boden und Deckel» | Widerspruch zur Formel O = 2 · G + U · h (G ist **eine** Fläche). Nach der Tabelle wäre O = G + M. | «Grundfläche G: Boden (Deckel ist gleich gross)». | mittel |
| §7 «Einheit: Immer cm²» | Falsch verallgemeinert (m², mm² …). | «Eine Flächeneinheit (cm², m² …)». | gering |
| §4 | Formel des Quaders O = 2 · (a·b + a·c + b·c) fehlt, obwohl c1, c8, c14 … und q7, q8, q14 danach fragen. | Zeile «Quader» ergänzen. | gering |

### kl8-mathe-koordinaten
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| Prüfung q1–q18 | Alle 18 Fragen sind Spiegelungen an x- oder y-Achse . Quadrant, Mitte, Abstand, Nullpunktspiegelung, Rechteck fehlen. | Je 2–3 Fragen zu Quadrant, Mittelpunkt, Abstand, Nullpunkt, vierte Ecke. | mittel |
| c5, c6, c7, c12, c13, c19, c20, c21, c26, c27, c33, c34, c35 | Abstand (gleiches y), Streckenmitte und Rechteck-Ecke sind in der Theorie nicht erklärt. | §4/§7 ergänzen: Mitte = ((x₁+x₂):2 | (y₁+y₂):2), Abstand = Differenz der x-Werte. | mittel |

### kl9-mathe-gleichungssysteme
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c8, c28 (Antwort «ja») | Step prüft nur die erste Gleichung («2 + 5 = 7»); für «ja» müssen beide Gleichungen stimmen. | Zweiten Step «2 − 5 = −3 ✓ zweite Gleichung» ergänzen. | mittel |
| c7, c18, c27, q9 (y = 4x …) | Aufgabe nutzt das Einsetzen, die Theorie behandelt nur das Additionsverfahren. | Hinweis in §4 «Wenn y = … schon dasteht: einsetzen (siehe nächstes Thema)». | gering |

### kl9-mathe-trigonometrie
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| Prüfung | 14 von 18 Fragen sind Ähnlichkeit/Streckfaktor (q2–q6, q8, q10–q15, q17, q18), nur 4 zu sin/cos/tan (q1, q7, q9, q16). Das Themenfeld Trigonometrie ist unterrepräsentiert. | Mind. 8 Fragen sin/cos/tan (Seitenverhältnis, Gegenkathete, Winkel zu Wert). | mittel |
| c5 | «cos 0° = ?» – im Dreieck gibt es keinen Winkel 0°; steht nicht in §7 (Standardwerte nennen sin 30°, cos 60°, tan 45°). | Durch eine Aufgabe zu den Standardwerten aus §7 ersetzen, z. B. «Welchen Wert hat cos 30°?» nur wenn 0,87 in §7 steht, sonst «cos 60°». | gering |
| c5, c14, c23 | Ablenker «0,87» (= cos 30° / sin 60°) ist nicht Teil der Theorie. | Ablenker «0,6», «0,8» (aus 3-4-5-Dreieck). | gering |
| q16 | Eingabe «3/4» wird nicht akzeptiert (nur 0,75 / 0.75). | «3/4» in `answer` aufnehmen. | gering |

### kl9-mathe-koerper
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c3, c16, c27, q10 (Mantel Zylinder); c8, c20, c31, q7 (Kugeloberfläche) | Formeln Mantelfläche Zylinder (2·r·π·h) und Kugeloberfläche (4·π·r²) kommen im `explain` nicht vor. | §4 ergänzen: «Zylinder-Mantel M = 2 · r · π · h», «Kugel O = 4 · π · r · r». | mittel |
| c5, c18, c29, q2, q14 | «wird mit einem Würfel verbunden»: Überlappung nicht ausgeschlossen. | «… und ein Würfel werden ohne Überlappung zusammengeklebt.» | gering |

### kl9-mathe-stochastik
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c8, c20, c31, q9 (Modus); c2, c15, c26, q10 (Kombinationen); c7, q7 (Münze mehrfach) | Modus, Multiplikation von Möglichkeiten und mehrstufige Zufallsversuche werden abgefragt, aber nicht erklärt. | §2/§4 ergänzen: Modus = häufigster Wert; Kombinationen = Anzahl · Anzahl; Münze: 1/2 · 1/2. | mittel |
| c9, c21 | Ablenker «3/2» (Wahrscheinlichkeit > 1) widerspricht der Theorie («zwischen 0 und 1»). | Durch «3/10» o. ä. ersetzen. | gering |

### kl9-mathe-einsetzung
| ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|
| c10, c27, q1, q11, q12 | Unübliche Schreibweise «y = 1x + 12». | «y = x + 12». | mittel |
| c30, q3, q11 (Frage), c26, c33, c35 (Steps) | «y = x + 0», «4x + 0», «2 · 8 + 0» – überflüssiges «+ 0». | «y = x», «4x», «2 · 8 = 16». | mittel |
| c18, q4 | «y = x + -1», «y = x + -2» (Plus-Minus-Schreibweise). | «y = x − 1», «y = x − 2». | mittel |
| c6 | Ablenker «Wenn nur eine Unbekannte vorkommt» ist fachlich fragwürdig (dann braucht es kein Gleichsetzen, ist aber «einfach»). | Durch einen eindeutig falschen Ablenker ersetzen (z. B. «Wenn beide Gleichungen dieselbe Zahl enthalten»). Achtung: «beide Gleichungen nach x aufgelöst» wäre ebenfalls richtig und darf nicht als Ablenker stehen. | mittel |
| c7 | Ablenker «Nur bei Dreiecken» ist unsinnig. | «Wenn zwei Gleichungen keine gemeinsame Lösung haben» o. ä. | gering |
| c6, c19, §2 | «Beide Gleichungen nach y aufgelöst» zu eng: Gleichsetzen geht bei jeder gleichen Variablen. | «… nach derselben Unbekannten aufgelöst». | gering |
| Prüfung | Nur 16 statt 18 Fragen. | Auf 18 ergänzen. | gering |

## 5. Themenübergreifende Funde

| Thema | ID | Problem | Korrekturvorschlag | Schweregrad |
|---|---|---|---|---|
| alle Themen mit input-Fragen und Einheit (u. a. dreisatz, zins, prozent, kreis-prisma, oberflaeche, koerper, trigonometrie, lineare-funktionen, winkel) | alle numerischen input-Fragen | `checkAns` vergleicht exakt. Eingaben mit Einheit («216 Fr.», «75,36 cm», «879,2 cm²», «2000 ml», «72 km») werden als falsch gewertet, obwohl richtig. | Einheit in der Antwortprüfung abstreifen oder Varianten in `answer` aufnehmen. | mittel |
| koerper q18, zins q2/q18 | Antworten ≥ 1000 (1256, 2040, 1545) | Schreibweise mit Tausenderapostroph («1'256», «2'040») wird nicht akzeptiert, obwohl in Optionen sonst so geschrieben (kl4 Stellenwert listet beide Formen). | Beide Schreibweisen in `answer`. | gering |
| gleichungen, lineare-funktionen, einsetzung u. a. | Ja/Nein- und 2-Optionen-Karten (z. B. winkel-dreiecke, lin-funktionen c4/c9/c14/c19/c25/c30/c36, gleichungssysteme c8/c19/c28) | Ratewahrscheinlichkeit 50 %. | Mit Pflicht-Begründung oder 4-Optionen-Format ergänzen (zusätzliche Option «nur die erste Gleichung stimmt»). | gering |

## 6. Zusammenfassung der Anzahl

(Zählung nach Tabellenzeilen; eine Zeile kann mehrere Karten-IDs bündeln.)

| Schweregrad | Anzahl Funde |
|---|---|
| kritisch | 1 |
| mittel | 23 |
| gering | 53 |
| **Summe** | **77** |

Kritisch: winkel-parallelen c21 (zwei richtige Optionen). Keine rechnerisch falsche Musterlösung gefunden.
