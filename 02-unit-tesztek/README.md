# Szoftvertesztelés – 2. gyakorlat

## Szállítási díj tesztelése QUnittal

A feladatban a megadott szállításidíj-számító függvényhez készítettem teszteket. Főleg a súlyhatárokat, az ingyenes szállítás feltételét és a különböző szállítási módokat vizsgáltam. A függvény eredeti működését meghagytam, ezért a hibákat jelző tesztek nem sikeresek.

Az `index.html` tartalmazza a QUnit tesztoldalt, a `shipping.js` a vizsgált függvényt, a `shipping.test.js` pedig a 22 tesztesetet. A tesztoldal a QUnit 3.0.0-t használja, amelyet interneten keresztül tölt be.

## Elvárt működés

5 kg alatt 1500 Ft, 5 és 20 kg között a határokat is beleértve 2500 Ft, 20 kg felett pedig 5000 Ft az alapdíj. Magyarországra 20 000 Ft feletti rendelésnél ingyenes a szállítás. Pontosan 20 000 Ft-nál még fizetni kell.

Külföldre a díj kétszeres. Az expressz szállításnál az adott szállítás normál díjának másfélszeresével számoltam, tehát például egy 2 kg-os külföldi csomagnál `1500 × 2 × 1,5 = 4500 Ft` az elvárt összeg. Az ingyenes belföldi szállítást expressz esetén is ingyenesnek vettem, mert a leírás nem ad meg külön minimumfelárat.

A nulla rendelési érték és a nulla tömeg megengedett, csak a negatív értékeket tiltja a specifikáció. Ezeknél kivételt vártam; a hibajelzés pontos formáját a feladat nem határozza meg. Az országkódoknál érvényes kétbetűs kódokkal teszteltem, kis- és nagybetűvel is.

## Teszteredmények

Az elvárt eredményeket a specifikációból számoltam ki. A függvényt közvetlen meghívásokkal is ellenőriztem Node.js alatt, majd lefuttattam ugyanazokat az eseteket QUnittal. A két futtatás eredménye egyezett. A táblázatban a kapott értékek szerepelnek; a QUnit-teszteket szintén Node.js alatt futtattam.

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

A 22 tesztből 12 sikeres, 10 hibát jelez. A sikertelen esetek öt problémára vezethetők vissza.

## Talált hibák

### 1. Az 5 és 20 kg-os határokat rosszul kezeli

A `calculateShippingCost(10000, 5, "HU", false)` 5000 Ft-ot ad vissza 2500 Ft helyett (T03). Ugyanez történik 20 kg-nál is (T06). A `weight > 5 && weight < 20` feltétel egyik határértéket sem fogadja el, így ezek a legdrágább kategóriába kerülnek. A középső sávban az 5 és a 20 kg-nak is benne kellene lennie.

### 2. Már pontosan 20 000 Ft-nál ingyenes a szállítás

A `calculateShippingCost(20000, 2, "HU", false)` eredménye 0 Ft, pedig 1500 Ft lenne a helyes díj (T09). A feladat 20 000 Ft feletti rendelésről ír, a kód viszont `>= 20000` feltételt használ. Itt `> 20000` kellene.

### 3. A kisbetűs magyar országkódot külföldinek veszi

A `calculateShippingCost(10000, 2, "hu", false)` 3000 Ft-ot ad vissza 1500 Ft helyett (T13). Nagyobb rendelésnél az ingyenesség is elmarad: a `calculateShippingCost(20001, 2, "hu", false)` eredménye 3000 Ft a várt 0 Ft helyett (T14). A függvény csak a pontosan `"HU"` alakot ismeri fel. Az összehasonlítások előtt egységesíteni kellene a kis- és nagybetűket.

### 4. Az expressz felár 50 Ft, nem 50%

A `calculateShippingCost(10000, 2, "HU", true)` eredménye 1550 Ft, pedig 2250 Ft-ot kellene fizetni (T16). A kód `shippingCost + 50` műveletet végez a díj másfélszerezése helyett. Külföldi szállításnál is megjelenik a hiba: a T17 teszt 4500 Ft helyett 3050 Ft-ot ad.

### 5. Nem ellenőrzi a negatív bemeneteket

A `calculateShippingCost(-1, 2, "HU", false)` hívás 1500 Ft-ot ad hibajelzés helyett (T20). Negatív tömegnél ugyanez a probléma (T21). A `calculateShippingCost(30000, -1, "HU", false)` még az ingyenes szállítás feltételénél visszatér 0-val (T22). Az értékek ellenőrzésének a függvény elejére kellene kerülnie, az ingyenesség vizsgálata elé.
