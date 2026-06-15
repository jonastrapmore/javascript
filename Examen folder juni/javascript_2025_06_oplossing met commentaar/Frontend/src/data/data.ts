// ============================================================================
// data.ts = centrale plaats waar de "persistence providers" worden aangemaakt.
// Door ze hier 1x te exporteren, deelt de hele app DEZELFDE instantie (en dus
// dezelfde cache + observers). Dat is belangrijk: als de home pagina een vraag
// verwijdert, worden alle observers (ook op andere pagina's) automatisch verwittigd.
// ============================================================================

import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Question} from '../models/questions.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {Quiz} from '../models/quiz.ts'

// --- VRAAG "Vragen renderen / verwijderen" ---
// De vragen komen van de API. De opgave verplicht het gebruik van de RestPersistenceProvider.
// Die spreekt de route http://localhost:3000/questions aan (GET/POST/PUT/DELETE).
export const questionPersistenceProvider = new RestPersistenceProvider<Question>('http://localhost:3000/questions')

// --- VRAAG "Quiz aanmaken (4 punten)" ---
// De quizzes worden lokaal in de browser bewaard. De opgave verplicht het gebruik van de
// LocalStoragePersistenceProvider met de storagekey 'quizzes'.
export const quizPersistenceProvider = new LocalStoragePersistenceProvider<Quiz>('quizzes')