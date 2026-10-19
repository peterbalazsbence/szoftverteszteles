# Mockito

A bankszámlás feladatot egy értesítési szolgáltatással egészítettem ki. A `BankService` befizetés után meghívja a `NotificationService` szolgáltatást. A tesztekben ezt mock helyettesíti, így valódi e-mail vagy SMS nem megy ki.

A `BankAccount` a 4. feladatból származik; itt is szerepel, hogy a példa külön Maven-projektként futtatható legyen.

## Tesztek

- Sikeres befizetésnél nő az egyenleg, és pontosan egy értesítés történik.
- Két befizetéshez két értesítés tartozik.
- Negatív és nulla összegnél nincs értesítés, az egyenleg sem változik.
- Az értesítés csak az egyenleg módosítása után történik.
- Az árfolyamszolgáltatás mockja EUR–HUF lekérdezésre a beállított 400-as értéket adja vissza. Ez a `when(...).thenReturn(...)` bemutatása, nem valódi árfolyamlekérdezés.

A bankszámlás tesztekben `@Mock` és `@InjectMocks`, az árfolyamos példában `mock()` szerepel. A hívásokat `verify()` segítségével ellenőriztem.

**Mind a 6 teszt sikeres volt.** A projekt Java 21-et, JUnit 5-öt és Mockito 5-öt használ.
