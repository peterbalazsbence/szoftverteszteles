# 4. gyakorlat – BankAccount

Az osztály egy egyszerű bankszámlát kezel. Az induló egyenleg 0, a `deposit()` növeli, a `withdraw()` csökkenti, a `getBalance()` pedig visszaadja az aktuális összeget.

Nulla vagy negatív összeget nem fogad el, és az egyenlegnél többet sem lehet felvenni. Hibás műveletnél `IllegalArgumentException` keletkezik, az egyenleg változatlan marad. A kiírásnak megfelelően az összegek típusa `double`.

## Tesztek

A kiírás mind a tíz esetét külön JUnit 5-teszttel ellenőriztem:

- új számla egyenlege;
- egyszeri és több egymást követő befizetés;
- részleges és teljes pénzfelvétel;
- az egyenlegnél nagyobb összeg felvétele;
- negatív és nulla összegű befizetés, illetve pénzfelvétel.

Ezen felül teszteltem az üres számláról történő felvételt, a törtes összegeket, két számla függetlenségét, valamint a `NaN`, a végtelen és a túlcsorduló összegek elutasítását.

**Mind a 15 teszt sikeres volt.** A projekt Maven-alapú, JUnit 5.12.2-t használ; az ellenőrzés JDK 21 alatt, Java 8-ra fordítva történt.
