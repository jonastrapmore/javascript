// ============================================================================
// products.ts = de logica achter de producten(home)pagina.
// Zelf toegevoegd bestand dat meerdere vragen bundelt:
//   - "Producten inladen en renderen (5 punten)": producten ophalen via API en tonen.
//   - "Producten filteren (2 punten)": filteren op naam (deel, niet hoofdlettergevoelig) + categorie.
//   - "Producten toevoegen aan winkelmandje (3 punten)": via custom event toevoegen/verwijderen.
//   - "Korting toepassen (2 punten)": via custom event de prijs * 0.9 in de database opslaan.
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'
import {productRestPersistenceProvider} from '../../data/data.ts'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {Product} from '../../models/product.ts'
import {CartItem} from '../../models/cartItem.ts'

export class ProductPage extends Page {

  // Verwijzingen naar de elementen op de pagina (uit products.html).
  #productContainer = this.body.querySelector<HTMLDivElement>('#products')!
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!

  // De producten (uit de API) en de inhoud van het winkelmandje (uit localStorage).
  #products: Product[] = []
  #cart: CartItem[] = []


  constructor() {
    super(HTML)

    // --- VRAAG "Producten toevoegen aan winkelmandje" ---
    // Observer op het winkelmandje: telkens het mandje wijzigt, herrenderen we zodat
    // de knoppen (+ of checkmark) meteen kloppen.
    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()

    // --- VRAAG "Producten inladen en renderen (5 punten)" ---
    // Observer op de producten + ophalen via de API (verplicht via RestPersistenceProvider).
    // getAll() vult de cache en verwittigt de observer -> render() toont de producten.
    this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
      this.#products = [...products]
      this.render()
    }))

    void productRestPersistenceProvider.getAll()

    // --- VRAAG "Producten filteren (2 punten)" ---
    // Er wordt pas gefilterd bij een klik op de knop (niet bij elke toetsaanslag).
    // preventDefault voorkomt dat het <form> de pagina herlaadt; daarna gewoon herrenderen.
    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })
  }

  render(): void {
    super.render()

    // Bouw de productenlijst opnieuw op (enkel de producten die door de filter geraken).
    this.#productContainer.innerHTML = ''
    this.#products.filter(product => this.#productMatchesFilter(product)).map(product => {
      // Zoek of dit product al in het mandje zit (om de knopstatus te bepalen).
      const cartItem = this.#cart.find(item => item.product.id === product.id)

      // --- VRAAG "Producten inladen en renderen (5 punten)" ---
      // Maak per product een custom-product-card en geef de gegevens door via attributen (strings).
      const productRow = document.createElement('custom-product-card')
      productRow.setAttribute('name', product.name)
      productRow.setAttribute('price', product.price.toFixed(2))
      productRow.setAttribute('category', product.category)
      // 'is-added' bepaalt of de knop een '+' of een checkmark toont.
      productRow.setAttribute('is-added', cartItem ? 'true' : 'false')

      // --- VRAAG "Producten toevoegen aan winkelmandje (3 punten)" ---
      // Luister op het custom event van de kaart. Zit het product al in het mandje? -> verwijderen,
      // anders -> een nieuw CartItem met eigen id aanmaken. Beide via de LocalStoragePersistenceProvider.
      // De observer hierboven herrendert daarna automatisch.
      productRow.addEventListener('addToCart', async () => {
        if (cartItem) {
          await cartLocalPersistenceProvider.delete(cartItem.id)
        } else {
          const newCartItem: CartItem = {product, id: crypto.randomUUID()}
          await cartLocalPersistenceProvider.create(newCartItem)
        }
      })

      // --- VRAAG "Korting toepassen (2 punten)" ---
      // Bereken de nieuwe prijs (prijs * 0.9) en sla die permanent op in de database via de API.
      // De RestPersistenceProvider verwittigt zijn observer -> de getoonde prijs wordt bijgewerkt.
      productRow.addEventListener('applyDiscount', async () => {
        const currentPrice = product.price
        const discount = currentPrice * 0.9
        const updatedProduct = {...product, price: discount}
        await productRestPersistenceProvider.update(product.id, updatedProduct)
      })

      this.#productContainer.appendChild(productRow)
    })

  }

  // --- VRAAG "Producten filteren (2 punten)" ---
  // Bepaalt of één product aan beide filters voldoet. In een aparte functie voor leesbaarheid (tip uit de opgave).
  // - naam: includes() laat zoeken op een DEEL van de naam; toLowerCase() maakt het niet hoofdlettergevoelig.
  // - categorie: gelijk aan de gekozen categorie, of '0' (= "All") -> dan telt de categorie niet mee.
  #productMatchesFilter(product: Product): boolean {
    const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
    const categoryMatches = product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase() || this.#categoryFilter.value === '0'


    return nameMatches && categoryMatches
  }
}