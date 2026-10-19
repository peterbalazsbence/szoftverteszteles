# 5. gyakorlat – Holdjáró

A `Rover` osztály megkapja a kezdőkoordinátákat, az irányt (`N`, `E`, `S`, `W`), a térkép méretét és az akadályok koordinátáit. Az `f` előrelép, a `b` hátralép, az `l` és az `r` helyben fordít. A parancsokat egy szövegben kapja meg.

```javascript
const rover = new Rover(2, 1, "N", 8, 6, [[2, 3]]);
rover.execute("ffrf");
// { x: 2, y: 2, direction: "N", obstacle: { x: 2, y: 3 } }
```

Minden lépés előtt ellenőrzi a célmezőt. Akadálynál az utolsó szabad helyen marad, visszaadja az akadály koordinátáit, és leállítja a parancssort. Új paranccsal később folytatható a mozgás. Ha nem ütközik akadályba, az `obstacle` értéke `null`.

## A gömb kezelése

A kiírás ábráját egy hosszúsági és szélességi cellákból álló rácsként értelmeztem. Az `x` kelet felé, az `y` észak felé nő; az indexelés nullától indul. A pólusok a legszélső sorokon kívül vannak, nem külön mezők.

- Kelet–nyugat irányban a térkép körbeér.
- A póluson áthaladva az `x` fél térképszélességgel eltolódik, az `y` a szélső sorban marad, az észak–dél irány pedig megfordul.
- Például egy 8 × 6-os térképen `(1, 5, N)` állapotból előrelépve `(5, 5, S)` lesz az új állapot.

Ezért a szélesség legalább 2 és páros, a magasság legalább 2. Az akadályokat az átlépés utáni koordinátán is ellenőrzi. Hibás kezdőállapot, akadálylista vagy parancs esetén `RangeError` keletkezik. Az ismeretlen parancsot tartalmazó teljes sorozatot mozgás nélkül elutasítja.

## Tesztelés

Az új működéseket sikertelen tesztből kiindulva készítettem el. A teszt és a hozzá tartozó megoldás külön commitba került. Ezután további esetekkel ellenőriztem a már működő részeket; ezek is egyenként lettek commitolva.

**Mind a 32 QUnit-teszt sikeres volt Node.js alatt.** A tesztek a mozgást, a fordulásokat, a parancssorokat, a térképszéleket, mindkét pólust, az akadályokat és az érvénytelen bemeneteket vizsgálják.

Az `index.html` a böngészős tesztoldal, a QUnit 3.0.0 betöltéséhez internet szükséges.
