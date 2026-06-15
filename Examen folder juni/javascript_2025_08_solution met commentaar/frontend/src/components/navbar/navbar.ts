// ============================================================================
// navbar.ts = het custom element voor de navigatiebalk (<custom-navbar>).
// Zelf toegevoegd bestand. Hoort bij VRAAG "Pagina's & componenten (1 punt)".
// De navbar heeft geen eigen logica nodig: hij toont enkel de HTML uit navbar.html.
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {

  constructor() {
    super(HTML) // de basisklasse zet de meegegeven HTML als inhoud van het element
  }
}