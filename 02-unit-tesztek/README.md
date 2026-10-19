# 2. gyakorlat – Szállítási díj QUnittal

A megadott függvényhez 22 QUnit-tesztet készítettem. A súlyhatárokat, az ingyenességet, az országkódokat és az expressz szállítást ellenőriztem. Az eredeti kódot meghagytam. A közvetlen függvényhívásokat és a QUnit-teszteket Node.js alatt futtattam; az eredmények egyeztek.

Az alapdíj 5 kg alatt 1500 Ft, 5–20 kg között 2500 Ft, felette 5000 Ft. Belföldön 20 000 Ft felett ingyenes a szállítás, külföldre kétszeres díj jár. Expressznél a normál díj másfélszeresével számoltam; az ingyenes szállítást ilyenkor is ingyenesnek vettem. A nulla bemenetet elfogadtam, negatív értéknél kivételt vártam.

Az `index.html` a böngészős tesztoldal; a QUnit 3.0.0 betöltéséhez internet szükséges.

## Tesztek

**Eredmény: 12 sikeres, 10 sikertelen teszt.**

| Teszt | Rendelés (Ft) | Tömeg (kg) | Ország | Expressz | Elvárt díj (Ft) | Kapott díj (Ft) | Megfelelt? |
|---|---:|---:|:---:|:---:|---:|---:|:---:|
| T01 | 10 000 | 0 | HU | Nem | 1500 | 1500 | Igen |
| T02 | 10 000 | 4,99 | HU | Nem | 1500 | 1500 | Igen |
| T03 | 10 000 | 5 | HU | Nem | 2500 | 5000 | Nem |
| T04 | 10 000 | 5,01 | HU | Nem | 2500 | 2500 | Igen |
| T05 | 10 000 | 19,99 | HU | Nem | 2500 | 2500 | Igen |
| T06 | 10 000 | 20 | HU | Nem | 2500 | 5000 | Nem |
| T07 | 10 000 | 20,01 | HU | Nem | 5000 | 5000 | Igen |
| T08 | 19 999 | 2 | HU | Nem | 1500 | 1500 | Igen |
| T09 | 20 000 | 2 | HU | Nem | 1500 | 0 | Nem |
| T10 | 20 001 | 2 | HU | Nem | 0 | 0 | Igen |
| T11 | 10 000 | 2 | DE | Nem | 3000 | 3000 | Igen |
| T12 | 30 000 | 10 | DE | Nem | 5000 | 5000 | Igen |
| T13 | 10 000 | 2 | hu | Nem | 1500 | 3000 | Nem |
| T14 | 20 001 | 2 | hu | Nem | 0 | 3000 | Nem |
| T15 | 10 000 | 2 | de | Nem | 3000 | 3000 | Igen |
| T16 | 10 000 | 2 | HU | Igen | 2250 | 1550 | Nem |
| T17 | 10 000 | 2 | DE | Igen | 4500 | 3050 | Nem |
| T18 | 20 001 | 2 | HU | Igen | 0 | 0 | Igen |
| T19 | 0 | 2 | HU | Nem | 1500 | 1500 | Igen |
| T20 | −1 | 2 | HU | Nem | Hibajelzés | 1500 | Nem |
| T21 | 10 000 | −1 | HU | Nem | Hibajelzés | 1500 | Nem |
| T22 | 30 000 | −1 | HU | Nem | Hibajelzés | 0 | Nem |

## Talált hibák

| Hiba | Oka | Teszt |
|---|---|---|
| 5 és 20 kg-nál 5000 Ft-ot számol 2500 Ft helyett. | A középső sáv feltétele kizárja a két határértéket. | T03, T06 |
| Már 20 000 Ft-nál ingyenes a szállítás. | A feltétel `>= 20000`, pedig `> 20000` kellene. | T09 |
| A `hu` országkódot külföldinek veszi. | Csak a nagybetűs `HU` alakot ismeri fel. | T13, T14 |
| Az expressz felár 50 Ft. | 50% helyett fix 50-et ad hozzá. | T16, T17 |
| Elfogadja a negatív értékeket. | Hiányzik az ellenőrzés, amelynek az ingyenesség vizsgálata elé kellene kerülnie. | T20–T22 |

A hibák a táblázatban szereplő bemenetekkel reprodukálhatók. A sikertelen QUnit-tesztek ezeket az eltéréseket jelzik.
