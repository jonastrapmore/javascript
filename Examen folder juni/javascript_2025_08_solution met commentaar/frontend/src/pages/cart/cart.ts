// ============================================================================
// cart.ts = de logica achter de winkelmandje-pagina ('/cart').
// Zelf toegevoegd bestand. Het beantwoordt:
//   - "Winkelmandje inladen en renderen (4 punten)": mandje uit localStorage tonen + totaalprijs.
// (Het verwijderen van items zit in het cartItem-component zelf, zie cartItem.ts.)
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './cart.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {CartItem} from '../../models/cartItem.ts'

export class CartPage extends Page {

  #cartList = this.body.querySelector<HTMLDivElement>('#cart-list')!
  #totalPrice = this.body.querySelector<HTMLSpanElement>('#cart-total')!

  #cart: CartItem[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Winkelmandje inladen en renderen (4 punten)" ---
    // Observer op het mandje + inladen via de LocalStoragePersistenceProvider (verplicht).
    // Verwijdert een cart-item zichzelf, dan verwittigt de provider deze observer -> herrenderen.
    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()
  }

  render(): void {
    super.render()

    // Bouw de mandje-lijst opnieuw op.
    this.#cartList.innerHTML = ''
    this.#cart.map(cartItem => {
      // Per item een custom-cart-item maken.
      const cartItemElement = document.createElement('custom-cart-item')
      // Naam + prijs in één regel via een TEMPLATE LITERAL (zoals de opgave vraagt).
      cartItemElement.setAttribute('title', `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)`)
      // Het id meegeven zodat de X-knop in het component net dit item kan verwijderen.
      cartItemElement.setAttribute('id', cartItem.id)

      this.#cartList.appendChild(cartItemElement)
    })

    // Totaalprijs: alle prijzen optellen met reduce (startwaarde 0) en tonen met 2 decimalen.
    const total = this.#cart.map(x => x.product.price).reduce((a, b) => a + b, 0)
    this.#totalPrice.innerText = total.toFixed(2)
  }
}