# Oefenexamen JavaScript — Groove Vault 🎶

Tijdens dit oefenexamen bouw je een eenvoudige website voor **Groove Vault**, een retro platenwinkel.
De website bestaat uit een homepagina en een overzicht van de collectie ("the crate").
Deze collectie kan bewerkt en gefilterd worden.

Dit is een oefenversie van het echte module-examen. De structuur en het puntenaantal zijn
identiek aan het origineel; enkel het thema verschilt. Onderaan vind je **uitbreidingen** om extra
te oefenen.

> **Belangrijk — starten:** open `index.html` met **Live Server**
> (rechtsklik in VS Code → *Open with Live Server*). De fetch-opdrachten halen lokale
> `.json`-bestanden op, en dat werkt enkel via een server, niet door het bestand gewoon te openen.

## Startbestanden

| Bestand | Inhoud |
|---|---|
| `index.html` | De volledige HTML met navbar, beide pagina's en het `<template>` voor één plaat. |
| `index.css` | De styling. **Niet aanpassen** is prima; alle nodige klassen bestaan al. |
| `index.js` | **Hier werk je in.** Een skelet met TODO's per opdracht. |
| `data/records.json` | De "API" voor de collectie (gebruik je voor de fetch / GET). |
| `data/extra.json` | Een pool van platen voor de "voeg toe"-knop. |
| `solution/index.solution.js` | Voorbeeldoplossing van de kern. Pas bekijken nadat je het zelf probeerde! |

Elke plaat (`record`) heeft volgende properties:

- `id`: Een getal. De primary key.
- `name`: Een string met de titel van de plaat.
- `artist`: Een string met de artiest.
- `genre`: Een string met het genre (synthwave, jazz, disco, ...).
- `year`: Een getal met het jaar van uitgave.
- `displayStatus`: Een string met de status, bv. `In Stock`, `Sold Out`, `Reserved`, `Pre-Order`, `Last Copy`.
- `imageUrl`: Een string met de URL naar de hoes.
- `description`: Een string die de plaat beschrijft.

---

## Pagina's & navigatie (2 punten)

De applicatie bevat twee pagina's. De HTML voor elke pagina is van elkaar te onderscheiden door de
CSS-klasse die eraan gekoppeld is.
Alle elementen met de `home-page` klasse (of kinderen daarvan) mogen enkel op de homepagina zichtbaar
zijn, en alle elementen met de `collection-page` klasse (of kinderen daarvan) enkel op de crate-pagina.
Heeft een element (of een parent ervan) geen van beide klassen, dan moet het op **alle** pagina's
zichtbaar zijn, zoals de navbar en de footer.

Zorg ervoor dat de gebruiker tussen de twee pagina's kan navigeren via de navigatiebalk bovenaan:

- Klik op **◉ GROOVE VAULT** (`#home-nav`) → verberg alle `collection-page` elementen, toon de homepagina.
- Klik op **Crate ▸** (`#collection-nav`) → verberg alle `home-page` elementen, toon de collectie.

Hint: aangezien de rest van het examen enkel code voor de collectiepagina bevat, mag je tijdens het
ontwikkelen de standaardpagina tijdelijk op de collectie zetten.

## Ophalen van platen (3 punten)

Haal via een **asynchrone functie** en een `fetch` de platen op en plaats deze in een globale variabele.
Gebruik hiervoor de URL in `RECORDS_URL` (`data/records.json`).
De "API" geeft een array van platen terug met de properties die hierboven beschreven staan.

## Renderen van de platen (6 punten)

Zorg ervoor dat de opgehaalde platen op het scherm verschijnen.
De markup voor één plaat vind je in het `<template>` tag onderaan `index.html`.
Let heel goed op de klasnamen in de voorbeeldlayout — neem ze **allemaal** over:
`record`, `record-img`, `status`, `metadata`, `header`, `description`, `delete-btn`.

Je bouwt dus per plaat de template na en vervangt de voorbeeldwaarden door de waarden uit de data.

Om alle punten te halen, gebruik je `document.createElement` en schrijf je **geen** HTML-strings in je
JavaScript.

> ALTERNATIEF: lukt de fetch niet, maak dan zelf in code een array met dezelfde properties aan en toon
> die. Je kan dan nog steeds de volle punten voor renderen halen.

## Plaat toevoegen (2 punten)

Zorg ervoor dat de gebruiker een plaat kan toevoegen.
Als op de **+ Voeg plaat toe** knop (`#add-button`) gedrukt wordt, gebeurt er een `fetch` naar
`EXTRA_URL` (`data/extra.json`), die een array van platen teruggeeft. Kies daaruit een **willekeurige**
plaat, voeg ze toe aan de globale array en toon ze op de pagina.

> In het échte examen is dit een `POST`-request naar de API die zelf een willekeurige plaat genereert.
> Hier simuleren we dat met een lokaal bestand zodat je het zonder server-backend kan oefenen.

> ALTERNATIEF: lukt de fetch niet, maak dan zelf een nieuw object aan dat je toevoegt en toont.
> Je haalt daarmee minstens de helft van de punten.

## Plaat verwijderen (3 punten)

Via de prullenbak-knop (`delete-btn`) op een plaat moet die verwijderd kunnen worden.
Hiervoor is geen fetch nodig: de plaat moet enkel verdwijnen uit de collectie én uit de UI.

## Platen filteren (4 punten)

Schrijf code die het mogelijk maakt de platen te filteren via de zoekbalk (`#search`).
De zoekfunctie moet zoeken op `name` én `genre`.
De zoekfunctie mag **niet** hoofdlettergevoelig zijn; de zoekstring mag eender waar in `name` of
`genre` voorkomen.

Het moet mogelijk zijn de filter leeg te maken en opnieuw alle platen te zien.
Voer de filter uit wanneer de gebruiker op **Enter** drukt (voor de volle punten), of voeg een
zoekknop toe (voor een voldoende).

> ALTERNATIEF: lukt het niet om op beide velden te filteren? Filter dan enkel op `name` voor een deel
> van de punten.

---

# Uitbreidingen (extra oefenen) ⭐

Deze tellen niet mee voor de "officiële" 20 punten, maar zijn ideaal om je JavaScript aan te scherpen.
Probeer ze in volgorde van moeilijkheid.

### ⭐ Uitbreiding 1 — Tellertje
Toon ergens op de crate-pagina hoeveel platen er momenteel zichtbaar zijn (bv. "12 platen").
Het getal moet meebewegen wanneer je toevoegt, verwijdert of filtert.

### ⭐ Uitbreiding 2 — Artiest en jaar tonen
Toon naast het genre ook de `artist` en `year` van elke plaat in de kaart.
Laat de zoekfunctie meteen ook op `artist` zoeken.

### ⭐⭐ Uitbreiding 3 — Sorteren
Voeg een dropdown (`<select>`) toe waarmee je de platen kan sorteren op titel (A–Z), op jaar
(oud → nieuw) en op jaar (nieuw → oud). De sortering moet samenwerken met de filter.

### ⭐⭐ Uitbreiding 4 — Filteren op status
Voeg een tweede dropdown toe om enkel platen met een bepaalde `displayStatus` te tonen
(bv. enkel "In Stock"). Een optie "Alles" toont opnieuw iedereen. Combineer dit met de zoekbalk.

### ⭐⭐⭐ Uitbreiding 5 — Onthouden met localStorage
Sla de collectie op in `localStorage` zodat je toegevoegde en verwijderde platen bewaard blijven na
een refresh. Haal bij het opstarten eerst uit `localStorage`; is daar niets, doe dan de fetch.

### ⭐⭐⭐ Uitbreiding 6 — "Sold Out" markeren
Geef platen met status `Sold Out` een visueel andere stijl (bv. grijswaarden of doorzichtig) door in
`createRecord` een extra klasse toe te voegen. Voeg de bijhorende CSS toe in `index.css`.

### ⭐⭐⭐⭐ Uitbreiding 7 — Plaat bewerken
Maak het mogelijk om de titel van een plaat aan te passen (bv. via een dubbelklik op de titel die in
een invoerveld verandert, of een potlood-knop). Pas zowel de data als de UI aan.

---

Veel succes en plezier! 🎧 — *keep the records spinning.*
