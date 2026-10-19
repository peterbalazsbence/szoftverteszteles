# 3. gyakorlat – Arab számok átalakítása római számmá

A `toRoman(number)` függvényt JavaScriptben készítettem el, QUnit-tesztekkel. Az 1–3999 közötti egész számokat alakítja át, más bemenetre `RangeError` kivételt dob. Ezt a tartományt választottam, mert a kiírás nem ad meg külön szabályt a nullára vagy a nagyobb számok jelölésére.

| Bemenet | Eredmény |
|---:|---|
| 1 | I |
| 4 | IV |
| 9 | IX |
| 49 | XLIX |
| 944 | CMXLIV |
| 2026 | MMXXVI |
| 3999 | MMMCMXCIX |

## Fejlesztés és tesztelés

Először az egyes jelölésekhez írtam sikertelen tesztet, majd hozzáadtam a szükséges működést. Így haladtam az `I`-től a nagyobb számokig és a kivonásos alakokig (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`). A hibát jelző tesztek és a hozzájuk tartozó megoldások külön commitokban szerepelnek.

A függvény csökkenő sorrendben veszi végig a jelöléseket, és addig fűzi hozzá őket az eredményhez, amíg az értékük levonható a maradékból. A bemenet ellenőrzését a nulla elutasításának tesztjével vezettem be. Ezután összetett számokkal és további érvénytelen bemenetekkel is ellenőriztem a kész működést.

**Mind a 34 QUnit-teszt sikeres volt Node.js alatt.** A tesztek az alapjeleket, a kivonásos alakokat, az ismétléseket, a tartományhatárokat és a hibás bemeneteket fedik le.

Az `index.html` a böngészős tesztoldal; a QUnit 3.0.0 betöltéséhez internet szükséges.
