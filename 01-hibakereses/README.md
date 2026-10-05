# Szoftvertesztelés – 1. gyakorlat

## DiscountCalculator

A feladatban egy webáruház kedvezményszámító függvényét vizsgáltam. A tesztekhez a kedvezménysávok határait, a VIP-kedvezményt és a negatív rendelési értéket választottam. Az elvárt összegeket a specifikáció alapján számoltam ki, majd összehasonlítottam őket a függvény eredményeivel.

A megadott függvényt nem javítottam át. A 13 tesztesetet Node.js alatt, a `run-tests.js` fájllal futtattam le.

## Elvárt működés

| Rendelési érték | Kedvezmény |
|---|---:|
| 10 000 Ft alatt | 0% |
| 10 000–24 999 Ft | 5% |
| 25 000–49 999 Ft | 10% |
| 50 000 Ft-tól | 15% |

VIP vásárlónál ehhez további 5 százalékpont jár, de a kedvezmény legfeljebb 20% lehet. A fizetendő összeg a rendelési érték és az `1 − kedvezmény` szorzata. Például 25 000 Ft-nál, VIP-kedvezmény nélkül: `25000 × 0,9 = 22500 Ft`.

A negatív rendelési érték érvénytelen. A leírás nem adja meg a hibajelzés pontos módját, ezért a tesztben kivételt vártam. Egész forintra nem kerekítettem, mert a specifikáció nem kér ilyet.

## Teszteredmények

| Teszt | Rendelési érték (Ft) | VIP | Elvárt eredmény (Ft) | Kapott eredmény (Ft) | Megfelelt? |
|---|---:|:---:|---:|---:|:---:|
| T01 | 0 | Nem | 0 | 0 | Igen |
| T02 | 9999 | Nem | 9999 | 9999 | Igen |
| T03 | 10 000 | Nem | 9500 | 10 000 | Nem |
| T04 | 10 001 | Nem | 9500,95 | 10 000,95 | Nem |
| T05 | 24 999 | Nem | 23 749,05 | 24 998,95 | Nem |
| T06 | 25 000 | Nem | 22 500 | 24 999,90 | Nem |
| T07 | 49 999 | Nem | 44 999,10 | 49 998,90 | Nem |
| T08 | 50 000 | Nem | 42 500 | 49 999,90 | Nem |
| T09 | 50 001 | Nem | 42 500,85 | 50 000,85 | Nem |
| T10 | 1000 | Igen | 950 | 999,80 | Nem |
| T11 | 25 000 | Igen | 21 250 | 24 999,80 | Nem |
| T12 | 50 000 | Igen | 40 000 | 49 999,80 | Nem |
| T13 | −1000 | Nem | Hibajelzés | −1000 | Nem |

A 13 tesztből 2 adott helyes eredményt, 11 esetben eltérés volt. Ezek mögött öt különböző hibát találtam.

## Talált hibák

### 1. Pontosan 10 000 Ft-nál nem jár kedvezmény

A `calculateDiscountedPrice(10000, false)` hívás eredménye 10 000 Ft, pedig 9500 Ft lenne a helyes érték (T03). Az első feltételben `orderValue > 10000` szerepel, ezért a 10 000 Ft kimarad az 5%-os sávból. Itt `>=` összehasonlításra lenne szükség.

### 2. Pontosan 50 000 Ft-nál rossz kedvezményt választ

A `calculateDiscountedPrice(50000, false)` hívás 49 999,90 Ft-ot ad vissza a várt 42 500 Ft helyett (T08). A 10%-os sáv feltétele még az 50 000 Ft-ot is tartalmazza, holott ott már 15% jár. A második sáv felső határának `< 50000`, a harmadik sáv alsó határának `>= 50000` kellene lennie.

Ennél a tesztnél a végösszeg számítása is hibás. Ha csak azt javítanánk, a rosszul kiválasztott 10% miatt még mindig 45 000 Ft lenne az eredmény.

### 3. Hibásan adja hozzá a VIP-kedvezményt

A `calculateDiscountedPrice(1000, true)` hívás 999,80 Ft-ot ad vissza 950 Ft helyett (T10). A kód `discount += 5` utasítást használ, miközben a kedvezményt tört alakban tárolja. Az 5 százalékponthoz `0.05`-öt kellene hozzáadni. Így viszont minden VIP-vásárló kedvezménye eléri a 20%-os korlátot.

Ezt a tesztet a végösszeg hibás számítása is érinti. Annak javítása után 800 Ft lenne az eredmény, tehát a VIP-hiba külön is megmaradna.

### 4. Nem a kedvezmény összegét vonja le

A `calculateDiscountedPrice(25000, false)` eredménye 24 999,90 Ft, pedig 22 500 Ft-ot kellene fizetni (T06). A `return orderValue - discount` csak 0,10 Ft-ot von le, nem a rendelési érték 10%-át. A helyes számítás: `orderValue * (1 - discount)`.

### 5. Elfogadja a negatív rendelési értéket

A `calculateDiscountedPrice(-1000, false)` hívás −1000-et ad vissza hibajelzés helyett (T13). A függvény elején nincs ellenőrzés a negatív bemenetre. Ezt még a kedvezmény kiszámítása előtt kellene elutasítani.
