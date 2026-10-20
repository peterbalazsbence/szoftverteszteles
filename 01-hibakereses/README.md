# 1. gyakorlat – DiscountCalculator

Futtatás: Node.js. Negatív összegnél kivételt vártam, az eredményeket nem kerekítettem egész forintra.

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

## Talált hibák

| Hiba | Oka | Teszt |
|---|---|---|
| 10 000 Ft-nál kimarad az 5% kedvezmény. | Az alsó határnál `>` szerepel `>=` helyett. | T03 |
| 50 000 Ft-nál csak 10% kedvezményt választ. | Ez az érték még a második sávba kerül, pedig már 15% járna. | T08 |
| Minden VIP-vásárlónál 20%-ra áll a kedvezmény. | A kód `5`-öt ad hozzá `0.05` helyett. | T10 |
| Hibás a fizetendő összeg. | A kedvezmény arányát vonja le; helyesen `orderValue * (1 - discount)` lenne. | T06 |
| Elfogadja a negatív összeget. | Hiányzik a bemenet ellenőrzése. | T13 |
