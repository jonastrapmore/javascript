# Uitleg oplossing — Herexamen JavaScript 2024-2025 (Webshop)

Dit document legt stap voor stap uit hoe het herexamen (map `2025_08`) is opgelost. Per vraag van de
opgave staat **wat** er moest gebeuren, **welke bestanden** aangepast zijn en **hoe** de code werkt.

> Belangrijk uit de opgave: er staan geen punten op de opmaak, enkel op de functionaliteit. Alles moet
> in **TypeScript** en **strongly typed** zijn, en elke wijziging moet meteen zichtbaar zijn na het drukken op een knop.

## Wat bouwen we?

Een kleine webshop met twee pagina's:

- **Producten (`/`)** — toont alle producten uit de database, met filters (naam + categorie), een knop om
  een product in het winkelmandje te steken en een knop om korting toe te passen.
- **Winkelmand (`/cart`)** — toont de producten in het mandje (lokaal opgeslagen), de totaalprijs en een
  knop om een product uit het mandje te verwijderen.

## Hoe werkt het meegegeven "framework"? (achtergrond)

Deze klassen **krijg je** en pas je niet aan:

- **`CustomElement`** (`router/customElement.ts`) — basisklasse voor een herbruikbaar HTML-element. Je geeft
  HTML als string mee; subklassen definiëren `observedAttributes` + `attributeChangedCallback` om op
  attribuutwijzigingen te reageren, en kunnen via `dispatchEvent` een custom event naar de parent sturen.
- **`Page`** (`router/page.ts`) — basisklasse voor een pagina. `render()` plaatst de pagina-HTML in het
  `#app` element. `unsubscribe` houdt opruim-functies bij die bij het verlaten van de pagina lopen.
- **`Router`** (`router/router.ts`) — leest bij opstarten `window.location.pathname` en toont de bijhorende pagina.
- **`PersistenceProvider`** (`data/persistenceProvider.ts`) — abstracte databron met het **observer-patroon**:
  via `addObserver(...)` registreer je een callback die loopt telkens de data wijzigt (`notifyObservers`).
  - **`RestPersistenceProvider`** — praat met de API via `fetch` (GET/POST/PUT/DELETE) + cache.
  - **`LocalStoragePersistenceProvider`** — bewaart de data in `localStorage` onder een `key`.

> **Kernidee:** een pagina haalt data op via een provider, registreert een observer en herrendert telkens de
> data wijzigt. Daardoor is elke wijziging meteen zichtbaar — precies wat de opgave vraagt.

## Datamodellen (strongly typed)

- `models/product.ts` → `Product { id, name, price, category }`
- `models/cartItem.ts` → `CartItem { id, product: Product }` (een mandje-regel verwijst naar een volledig product)

---

## Stap 1 — Pagina's & componenten (1 punt)

**Opgave:** zorg dat de pagina's bereikbaar zijn op `/` en `/cart`, registreer de custom elements (navbar
verplicht als `custom-navbar`) en laat de navbar-links werken.

**Aangepaste bestanden:** `main.ts`, `components/navbar/navbar.ts` (nieuw), `components/navbar/navbar.html`.

**Hoe:**
1. In `main.ts` registreren we de drie custom elements en zetten we de routes op:
   ```ts
   window.customElements.define('custom-navbar', CustomNavbar)
   window.customElements.define('custom-cart-item', CustomCartItem)
   window.customElements.define('custom-product-card', CustomProductCard)
   new Router({ '/': ProductPage, '/cart': CartPage })
   ```
2. `navbar.ts` is een minimaal custom element dat enkel zijn HTML toont.
3. In `navbar.html` kregen de links een geldig pad: `href="/"` en `href="/cart"` (waren leeg in de startcode).

---

## Stap 2 — Producten inladen en renderen (5 punten)

**Opgave:** haal alle producten op via de API (verplicht via `RestPersistenceProvider`) en toon ze met een
zelfgebouwd custom element per product. Voor de maximumscore moeten enkel de **properties** (attributen)
werken, de custom events nog niet.

**Aangepaste bestanden:** `data/data.ts`, `components/productCard/product.ts` (nieuw), `pages/products/products.ts` (nieuw).

**Hoe:**
1. In `data.ts`:
   ```ts
   export const productRestPersistenceProvider =
     new RestPersistenceProvider<Product>('http://localhost:3000/products')
   ```
2. In `products.ts` registreren we een observer en starten we de fetch:
   ```ts
   this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
     this.#products = [...products]; this.render()
   }))
   void productRestPersistenceProvider.getAll()
   ```
3. In `render()` maken we per product een `custom-product-card` en geven we de gegevens door via
   **attributen** (strings, in **kebab-case** — zie de tip).
4. In `product.ts` zet `attributeChangedCallback` elke waarde op de juiste plek; de prijs wordt netjes
   getoond met `Number(newValue).toFixed(2) + ' EUR'`.

---

## Stap 3 — Producten filteren (2 punten)

**Opgave:** filter op categorie én op (een deel van) de naam, niet hoofdlettergevoelig. Combinatie moet
werken. Filter pas bij een klik op de knop, niet bij elke toetsaanslag.

**Aangepast bestand:** `pages/products/products.ts`.

**Hoe:**
1. Op de filterknop een listener die `evt.preventDefault()` doet (anders herlaadt het `<form>`) en `render()` oproept:
   ```ts
   this.#filterBtn.addEventListener('click', evt => { evt.preventDefault(); this.render() })
   ```
2. In `render()` filteren we met een aparte hulpfunctie (tip uit de opgave):
   ```ts
   #productMatchesFilter(product) {
     const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
     const categoryMatches = product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase()
                             || this.#categoryFilter.value === '0'
     return nameMatches && categoryMatches
   }
   ```
   - `includes(...)` laat zoeken op een **deel** van de naam, `toLowerCase()` maakt het hoofdletter-ongevoelig.
   - Bij categorie `'0'` (= "All") telt de categorie niet mee, dus werken beide filters samen.

---

## Stap 4 — Producten toevoegen aan winkelmandje (3 punten)

**Opgave:** gebruik een **custom event** in de productCard om een product in het mandje te steken (verplicht
via `LocalStoragePersistenceProvider`). Het symbool op de knop wordt een checkmark (✓) als het product al in het mandje zit.

**Aangepaste bestanden:** `data/data.ts`, `components/productCard/product.ts`, `pages/products/products.ts`.

**Hoe:**
1. In `data.ts`: `export const cartLocalPersistenceProvider = new LocalStoragePersistenceProvider<CartItem>('cart')`.
2. In `product.ts` vuurt de knop een custom event af (de knop zit niet zelf aan de data):
   ```ts
   this.#addBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('addToCart')))
   ```
   Het `is-added`-attribuut bepaalt het symbool: `&check;` (groen) of `+`.
3. In `products.ts` luisteren we op `addToCart`: zit het product al in het mandje → verwijderen, anders een
   nieuw `CartItem` met eigen `crypto.randomUUID()` aanmaken. De observer op het mandje herrendert daarna automatisch.
   ```ts
   productRow.setAttribute('is-added', cartItem ? 'true' : 'false')
   productRow.addEventListener('addToCart', async () => {
     cartItem
       ? await cartLocalPersistenceProvider.delete(cartItem.id)
       : await cartLocalPersistenceProvider.create({product, id: crypto.randomUUID()})
   })
   ```

---

## Stap 5 — Korting toepassen (2 punten)

**Opgave:** gebruik een custom event in de productCard om korting toe te passen. Bewaar de nieuwe prijs in de
database via `RestPersistenceProvider`. Formule: `nieuwePrijs = prijs * 0.9`.

**Aangepaste bestanden:** `components/productCard/product.ts`, `pages/products/products.ts`.

**Hoe:**
1. In `product.ts`: `this.#discountBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('applyDiscount')))`.
2. In `products.ts` luisteren we op `applyDiscount`, berekenen we de nieuwe prijs en slaan we die op via `update(...)`:
   ```ts
   productRow.addEventListener('applyDiscount', async () => {
     const updatedProduct = {...product, price: product.price * 0.9}
     await productRestPersistenceProvider.update(product.id, updatedProduct)
   })
   ```
   Omdat de REST-provider naar de database schrijft, is de korting **permanent** (resetten kan via `backupProducts.json`).

---

## Stap 6 — Winkelmandje inladen en renderen (4 punten)

**Opgave:** laad het mandje in via `LocalStoragePersistenceProvider` en toon het op `/cart`. Gebruik het
custom element `cartItem`, met een **template literal** voor naam + prijs op één regel. Toon ook de totaalprijs.

**Aangepaste bestanden:** `components/cartItem/cartItem.ts` (nieuw), `pages/cart/cart.ts` (nieuw).

**Hoe:**
1. In `cart.ts` registreren we een observer op het mandje en laden we het in (`getAll()`).
2. In `render()` maken we per item een `custom-cart-item` met een template literal als titel:
   ```ts
   cartItemElement.setAttribute('title', `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)`)
   cartItemElement.setAttribute('id', cartItem.id)
   ```
3. De totaalprijs berekenen we met `reduce`:
   ```ts
   const total = this.#cart.map(x => x.product.price).reduce((a, b) => a + b, 0)
   this.#totalPrice.innerText = total.toFixed(2)
   ```
4. In `cartItem.ts` toont `attributeChangedCallback` de `title`.

---

## Stap 7 — Producten verwijderen uit winkelmandje (3 punten)

**Opgave:** verwijder producten via `LocalStoragePersistenceProvider`. Voor de maximumscore **geen** custom
event gebruiken, maar de provider **rechtstreeks** aanspreken.

**Aangepast bestand:** `components/cartItem/cartItem.ts`.

**Hoe:** de X-knop in het cartItem-component roept rechtstreeks `delete(...)` aan:
```ts
this.#deleteBtn.addEventListener('click', () => {
  void cartLocalPersistenceProvider.delete(this.id)
})
```
`this.id` is het `id`-attribuut dat `cart.ts` op het element zette. `delete(...)` haalt het item uit
localStorage en verwittigt de observer → de winkelmandje-pagina herrendert en het item verdwijnt meteen.

> Let op het verschil met stap 4: daar gebruiken we **wel** een custom event (knop in productCard → pagina
> beslist), hier **niet** (de cartItem spreekt zelf de provider aan). Dat is exact wat de opgave per onderdeel vraagt.

---

## Overzicht: welk bestand hoort bij welke vraag?

| Bestand | Bewerkt? | Vraag/vragen |
|---|---|---|
| `main.ts` | gewijzigd | Pagina's & componenten (registratie + routes) |
| `components/navbar/navbar.ts` | **nieuw** | Pagina's & componenten |
| `components/navbar/navbar.html` | gewijzigd | Pagina's & componenten (links) |
| `data/data.ts` | gewijzigd | Producten renderen/korting + winkelmandje (providers) |
| `components/productCard/product.ts` | **nieuw** | Renderen, Toevoegen aan mandje, Korting |
| `pages/products/products.ts` | **nieuw** | Renderen, Filteren, Toevoegen aan mandje, Korting |
| `components/cartItem/cartItem.ts` | **nieuw** | Winkelmandje renderen + Verwijderen uit mandje |
| `pages/cart/cart.ts` | **nieuw** | Winkelmandje inladen en renderen |

## Hoe testen?

1. Start de **server** (map `server`) zodat de API op `http://localhost:3000/products` draait.
2. Start de **frontend** (map `frontend`, meestal `npm install` + `npm run dev`).
3. Op `/` verschijnen de producten. Test de filters, voeg producten toe (knop → ✓) en pas korting toe.
4. Op `/cart` zie je het mandje met totaalprijs; test de X-knop om een item te verwijderen.
5. Vastgelopen door 'rommeldata'? Wis de localStorage van localhost in je browser en herstel
   `server/src/data/products.json` met `backupProducts.json` (tip uit de opgave).
