// ============================================================================
// data.ts = centrale plaats waar de "persistence providers" worden aangemaakt.
// Door ze hier 1x te exporteren deelt de hele app DEZELFDE instantie (cache + observers).
// Voegt een product toe aan het mandje op de productenpagina? Dan ziet de winkelmandje-pagina
// dat automatisch, want beide gebruiken net dezelfde cartLocalPersistenceProvider.
// ============================================================================

import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Product} from '../models/product.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {CartItem} from '../models/cartItem.ts'

// --- VRAAG "Producten inladen en renderen" + "Korting toepassen" ---
// De producten komen van de API. Verplicht via de RestPersistenceProvider (route /products).
// Deze provider gebruiken we ook om de korting permanent in de database te bewaren (update).
export const productRestPersistenceProvider = new RestPersistenceProvider<Product>('http://localhost:3000/products')

// --- VRAAG "Producten toevoegen aan winkelmandje" + "Winkelmandje pagina" ---
// Het winkelmandje wordt lokaal bewaard. Verplicht via de LocalStoragePersistenceProvider,
// hier met storagekey 'cart'.
export const cartLocalPersistenceProvider = new LocalStoragePersistenceProvider<CartItem>('cart')