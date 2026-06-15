// ============================================================================
// product.ts = het custom element dat ÉÉN product weergeeft (<custom-product-card>).
// Zelf toegevoegd bestand. Het beantwoordt:
//   - "Producten inladen en renderen (5 punten)": product tonen via attributen.
//   - "Producten toevoegen aan winkelmandje (3 punten)": de + / checkmark-knop + custom event.
//   - "Korting toepassen (2 punten)": de -10% knop + custom event.
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class CustomProductCard extends CustomElement {
  // De attributen die we observeren. Telkens één wijzigt (via setAttribute) wordt
  // attributeChangedCallback opgeroepen. Let op kebab-case ('is-added'): aan een custom
  // element kan je enkel strings doorgeven en de namen moeten in kebab-case staan.
  static observedAttributes = ['name', 'price', 'category', 'is-added']

  // Verwijzingen naar de HTML-elementen binnen de kaart (uit product.html).
  readonly #name = this.componentBody.querySelector<HTMLTableCellElement>('#name')!
  readonly #price = this.componentBody.querySelector<HTMLTableCellElement>('#price')!
  readonly #category = this.componentBody.querySelector<HTMLTableCellElement>('#category')!
  readonly #addBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!
  readonly #discountBtn = this.componentBody.querySelector<HTMLButtonElement>('#discount-button')!

  // Houdt bij of dit product al in het winkelmandje zit (bepaalt het symbool op de knop).
  #isAdded: boolean = false

  constructor() {
    super(HTML)

    // --- VRAAG "Producten toevoegen aan winkelmandje (3 punten)" ---
    // De knop mag de data niet zelf aanpassen; hij stuurt een CUSTOM EVENT naar de parent
    // (de productenpagina), die beslist of het product toegevoegd of verwijderd wordt.
    this.#addBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addToCart'))
    })

    // --- VRAAG "Korting toepassen (2 punten)" ---
    // Idem: klik op -10% stuurt een custom event; de pagina past de korting toe via de API.
    this.#discountBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('applyDiscount'))
    })
  }

  // --- VRAAG "Producten inladen en renderen (5 punten)" ---
  // Vertaal elk geobserveerd attribuut (een string) naar de juiste plek in de UI.
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'price':
        // De prijs komt binnen als string; we tonen ze met 2 decimalen + 'EUR'.
        this.#price.innerText = Number(newValue).toFixed(2) + ' EUR'
        break
      case 'category':
        this.#category.innerText = newValue
        break
      case 'is-added':
        // --- VRAAG "Producten toevoegen aan winkelmandje (3 punten)" ---
        // Zit het product al in het mandje? Toon een groene checkmark (&check;), anders een '+'.
        this.#isAdded = newValue === 'true'
        if (this.#isAdded) {
          this.#addBtn.setAttribute('class', 'btn btn-success')
          this.#addBtn.innerHTML = '&check;'
        } else {
          this.#addBtn.setAttribute('class', 'btn btn-primary')
          this.#addBtn.innerHTML = '+'
        }
        break
    }
  }
}