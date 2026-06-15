// ============================================================================
// main.ts = het startpunt van de applicatie (wordt door index.html ingeladen).
// Hier worden (1) de custom elements geregistreerd en (2) de router opgezet.
// ============================================================================

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {HomePage} from './pages/home/home.ts'
import {QuestionComponent} from './components/question/question.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {QuizzesPage} from './pages/quizzes/quizzes.ts'
import {TestPage} from './pages/test/test.ts'

// --- VRAAG "Routing (1 punt)" ---
// Een custom element moet eerst bij de browser GEREGISTREERD worden voor je het in HTML mag gebruiken.
// We koppelen hier de zelfgekozen tag-naam aan de bijhorende klasse.
// Vanaf nu mag je <custom-question> en <custom-navbar> als gewone HTML-tags schrijven.
window.customElements.define('custom-question', QuestionComponent)
window.customElements.define('custom-navbar', CustomNavbar)

// --- VRAAG "Routing (1 punt)" ---
// De Router (gegeven code) koppelt elk URL-pad aan een Page-klasse.
// Bij het opstarten bekijkt de router de huidige URL en toont de juiste pagina.
// De home pagina hangt aan '/', de quizzes pagina aan '/quizzes'.
// '/quizzes-test' is de meegegeven testpagina (telt niet mee voor de punten).
new Router({
  '/': HomePage,
  '/quizzes': QuizzesPage,
  '/quizzes-test': TestPage,
})