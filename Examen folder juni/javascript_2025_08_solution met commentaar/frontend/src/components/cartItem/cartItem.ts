// ============================================================================
// cartItem.ts = het custom element dat ÉÉN regel in het winkelmandje toont (<custom-cart-item>).
// Zelf toegevoegd bestand. Het beantwoordt:
//   - "Winkelmandje inladen en renderen (4 punten)": de titel (naam + prijs) tonen.
//   - "Producten verwijderen uit winkelmandje (3 punten)": de X-knop spreekt RECHTSTREEKS
//     de LocalStoragePersistenceProvider aan (de opgave vraagt hier expliciet GEEN custom event).
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './cartItem.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'

export class CustomCartItem extends CustomElement {

  static observedAttributes = ['title', 'id']

  #cartItem = this.componentBody.querySelector<HTMLTableCellElement>('#cart-item')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)

    // --- VRAAG "Producten verwijderen uit winkelmandje (3 punten)" ---
    // Voor de maximumscore mag hier GEEN custom event gebruikt worden: we spreken rechtstreeks
    // de juiste provider aan. this.id is het 'id'-attribuut van dit cart-item; delete() haalt het
    // uit localStorage en verwittigt de observers -> de winkelmandje-pagina herrendert.
    this.#deleteBtn.addEventListener('click', () => {
      void cartLocalPersistenceProvider.delete(this.id)
    })
  }

  // --- VRAAG "Winkelmandje inladen en renderen (4 punten)" ---
  // De pagina geeft de naam + prijs als één string door via het 'title'-attribuut (template literal).
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#cartItem.innerText = newValue
        break
    }
  }
}