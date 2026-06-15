// ============================================================================
// main.ts = het startpunt van de applicatie.
// Hier worden (1) de drie custom elements geregistreerd en (2) de router opgezet.
// Hoort volledig bij VRAAG "Pagina's & componenten (1 punt)".
// ============================================================================

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {ProductPage} from './pages/products/products.ts'
import {CartPage} from './pages/cart/cart.ts'

import {CustomNavbar} from './components/navbar/navbar.ts'
import {CustomCartItem} from './components/cartItem/cartItem.ts'
import {CustomProductCard} from './components/productCard/product.ts'

// --- VRAAG "Pagina's & componenten (1 punt)" ---
// Custom elements moeten eerst geregistreerd worden voor je hun tag in HTML mag gebruiken.
// De opgave schrijft de naam 'custom-navbar' voor; de twee andere namen mochten we zelf kiezen.
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-cart-item', CustomCartItem)
window.customElements.define('custom-product-card', CustomProductCard)

// --- VRAAG "Pagina's & componenten (1 punt)" ---
// De router koppelt de producten(home)pagina aan '/' en de winkelmandje-pagina aan '/cart'.
new Router({
  '/': ProductPage,
  '/cart': CartPage
})