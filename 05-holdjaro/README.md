# Holdjáró

A térképet gömbre illesztett rácsként kezeltem. Az indexelés 0-tól indul, az x keletre, az y északra nő. A pólusok a szélső sorokon kívül vannak.

- Kelet–nyugat irányban a térkép körbeér.
- Pólusátlépéskor az x fél térképszélességgel eltolódik, az y a szélső sorban marad, az N/S irány megfordul.
- Emiatt a szélesség páros és legalább 2, a magasság legalább 2.
- Akadálynál a holdjáró az utolsó szabad helyen marad, jelzi az akadály koordinátáit, és leállítja a parancssort.
