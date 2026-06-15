# Uitleg oplossing — Examen JavaScript 2025-06 (Quiz builder)

Dit document legt stap voor stap uit hoe het examen 2025-06 is opgelost. Per vraag van de
opgave staat beschreven **wat** er moest gebeuren, **welke bestanden** aangepast zijn en
**hoe** de code werkt. Zo kan je de denkstappen volgen en het zelf opnieuw maken.

## Wat bouwen we?

Een applicatie met twee pagina's:

- **Home (`/`)** — "Quiz builder": toont alle trivia-vragen uit de database, met filters,
  een verwijderknop en de mogelijkheid om vragen te selecteren en in een nieuwe quiz te steken.
- **Quizzes (`/quizzes`)** — toont de lokaal opgeslagen quizzes en hun vragen, en laat toe
  vragen uit een quiz te verwijderen.

## Hoe werkt het meegegeven "framework"? (achtergrond)

Deze klassen **krijg je** en pas je niet aan, maar je moet weten hoe ze werken:

- **`CustomElement`** (`router/customElement.ts`) — basisklasse voor een herbruikbaar HTML-element.
  Je geeft HTML als string mee; bij `connectedCallback` wordt die in de DOM gezet. Subklassen
  definiëren `observedAttributes` + `attributeChangedCallback` om op attribuutwijzigingen te reageren.
- **`Page`** (`router/page.ts`) — basisklasse voor een pagina. `render()` plaatst de pagina-HTML
  in het `#app` element. `unsubscribe` is een lijst opruim-functies die bij het verlaten van de
  pagina worden uitgevoerd (`cleanup()`), zodat observers niet blijven hangen.
- **`Router`** (`router/router.ts`) — koppelt URL-paden aan `Page`-klassen. Elk element met een
  `data-link` attribuut wordt een werkende navigatielink (zonder volledige herlaad).
- **`PersistenceProvider`** (`data/persistenceProvider.ts`) — abstracte databron met het
  **observer-patroon**: componenten registreren een observer via `addObserver(...)` en worden
  automatisch verwittigd (`notifyObservers`) wanneer de data verandert. Twee implementaties:
  - **`RestPersistenceProvider`** — praat met de API via `fetch` (GET/POST/PUT/DELETE) en houdt een cache bij.
  - **`LocalStoragePersistenceProvider`** — bewaart de data in `localStorage` onder een `key`.

> **Kernidee:** een pagina haalt data op via een provider, registreert een observer, en herrendert
> telkens de provider laat weten dat de data wijzigde. Daardoor is elke wijziging meteen zichtbaar in de UI.

---

## Stap 1 — Routing (1 punt)

**Opgave:** registreer het navigatiebalk-element en plaats het bovenaan home en quizzes. Zorg dat
beide pagina's bereikbaar zijn via de navbar (`/` en `/quizzes`).

**Aangepaste bestanden:** `main.ts`, `pages/home/home.html`, `pages/quizzes/quizzes.html`,
`components/navbar/navbar.html`.

**Hoe:**
1. In `main.ts` registreren we de custom elements bij de browser:
   ```ts
   window.customElements.define('custom-question', QuestionComponent)
   window.customElements.define('custom-navbar', CustomNavbar)
   ```
   Pas na het registreren mag je de tags `<custom-navbar>` en `<custom-question>` in HTML gebruiken.
2. We maken de router aan met de routes:
   ```ts
   new Router({ '/': HomePage, '/quizzes': QuizzesPage, '/quizzes-test': TestPage })
   ```
3. In `home.html` en `quizzes.html` zetten we bovenaan `<custom-navbar></custom-navbar>`.
4. De navbar bevat `<a data-link="...">`-links; de router maakt daar werkende navigatie van.

---

## Stap 2 — Vragen renderen (4 punten)

**Opgave:** haal alle vragen op via de API (verplicht via `RestPersistenceProvider`) en toon ze op
de home pagina met een zelfgebouwd custom element per vraag.

**Aangepaste bestanden:** `data/data.ts`, `components/question/question.ts` (nieuw), `pages/home/home.ts` (nieuw).

**Hoe:**
1. In `data.ts` maken we de provider voor de vragen:
   ```ts
   export const questionPersistenceProvider =
     new RestPersistenceProvider<Question>('http://localhost:3000/questions')
   ```
2. In `home.ts` registreren we een observer en starten we de fetch:
   ```ts
   this.unsubscribe.push(questionPersistenceProvider.addObserver(questions => {
     this.#questions = questions
     this.render()
   }))
   void questionPersistenceProvider.getAll()
   ```
   `getAll()` haalt de data op en verwittigt de observer → `render()` vult de UI.
3. In `render()` maken we per vraag een `new QuestionComponent()` en geven we de gegevens door via
   **attributen** (altijd strings, in **kebab-case** — zie de tip in de opgave). De array met foute
   antwoorden gaat als JSON-string mee: `JSON.stringify(q.incorrectAnswers)`.
4. In `question.ts` luistert `attributeChangedCallback` op die attributen (`observedAttributes`) en
   plaatst elke waarde op de juiste plek in de UI. De JSON-string van de foute antwoorden wordt terug
   geparsed (`JSON.parse`) en als `<li>`'s in de lijst gezet.

---

## Stap 3 — Vragen filteren (3 punten)

**Opgave:** filter de vragen op type (radio) en moeilijkheidsgraad (dropdown). Beide filters moeten
tegelijk werken.

**Aangepast bestand:** `pages/home/home.ts`.

**Hoe:**
1. We houden de filterstatus bij in `#selectedType` en `#selectedDifficulty`.
2. Op de radio's en de dropdown zetten we `change`-listeners die de status updaten en `render()` oproepen.
3. In `render()` filteren we de vragen met de hulpfunctie:
   ```ts
   #questionMatchesFilter(question) {
     if (question.type !== this.#selectedType) return false
     return this.#selectedDifficulty === 'all' || question.difficulty === this.#selectedDifficulty
   }
   ```
   Door eerst op type te checken en daarna op moeilijkheid (waarbij `'all'` alles toelaat), werken
   beide filters automatisch samen.

---

## Stap 4 — Vragen verwijderen (2 punten)

**Opgave:** klik op het vuilbakje → verwijder de vraag via de API uit de database, en werk de UI bij.
Verplicht via `RestPersistenceProvider`.

**Aangepast bestand:** `components/question/question.ts`.

**Hoe:**
```ts
this.#deleteBtn.addEventListener('click', () => questionPersistenceProvider.delete(this.id))
```
`delete(id)` doet een `DELETE`-request, verwijdert het item uit de cache en verwittigt de observers.
Omdat de home pagina een observer heeft, herrendert ze automatisch en verdwijnt de vraag uit de UI.

---

## Stap 5 — Vragen toevoegen aan een quiz (3 punten)

**Opgave:** met de knop naast het vuilbakje selecteer/deselecteer je een vraag voor de quiz. Toon `+`
als de vraag nog niet geselecteerd is en `-` als ze al geselecteerd is. Gebruik een **custom event**
om de klik aan de parent door te geven.

**Aangepaste bestanden:** `components/question/question.ts`, `pages/home/home.ts`.

**Hoe:**
1. In het component vuurt de knop een **custom event** af (een component mag niet rechtstreeks aan de
   pagina-data zitten):
   ```ts
   this.#addRemoveBtn.addEventListener('click', () => {
     this.dispatchEvent(new CustomEvent('add-remove-question'))
   })
   ```
2. Het `selected`-attribuut bepaalt het symbool: `newValue === 'true' ? '-' : '+'`.
3. In `home.ts` houden we de selectie bij in een `Set<string>` (`#selectedQuestionIds`) en luisteren we
   op het event: zit de vraag erin → verwijderen, anders → toevoegen, en daarna `render()`:
   ```ts
   question.addEventListener('add-remove-question', () => {
     this.#selectedQuestionIds.has(q.id)
       ? this.#selectedQuestionIds.delete(q.id)
       : this.#selectedQuestionIds.add(q.id)
     this.render()
   })
   ```

---

## Stap 6 — Quiz aanmaken (4 punten)

**Opgave:** de knop "Create quiz" is enkel actief bij minstens één geselecteerde vraag. Bij klik worden
de geselecteerde vragen in een nieuwe quiz gestopt (naam uit het input-veld) en bewaard in
**localStorage** via `LocalStoragePersistenceProvider` met storagekey `quizzes`. Na het aanmaken worden
de selectie en het input-veld leeggemaakt.

**Aangepaste bestanden:** `data/data.ts`, `pages/home/home.ts`.

**Hoe:**
1. In `data.ts`:
   ```ts
   export const quizPersistenceProvider = new LocalStoragePersistenceProvider<Quiz>('quizzes')
   ```
2. Knop activeren/deactiveren in `render()`:
   ```ts
   this.#createQuizButton.disabled = this.#selectedQuestionIds.size === 0
   ```
3. Bij klik maken we de quiz aan met de geselecteerde vragen en maken we daarna alles leeg:
   ```ts
   void quizPersistenceProvider.create({
     name: this.#quizNameInput.value!,
     questions: this.#questions.filter(q => this.#selectedQuestionIds.has(q.id))
   })
   this.#selectedQuestionIds = new Set()
   this.#quizNameInput.value = ''
   this.render()
   ```
   `create(...)` schrijft naar `localStorage` en geeft de nieuwe quiz een uniek `id`.

---

## Stap 7 — Quizzes weergeven (1 punt)

**Opgave:** breid de gegeven quizzes-code uit zodat de vragen in een quiz zichtbaar worden (zelfde
component als op home). Het vuilbakje moet hier verborgen zijn (maar niet op home); de +/- knop blijft zichtbaar.

**Aangepast bestand:** `pages/quizzes/quizzes.ts`.

**Hoe:**
1. Observer + `getAll()` op de `quizPersistenceProvider` (laadt de quizzes uit localStorage).
2. Klik op een quiznaam zet `#activeQuiz` en herrendert.
3. Voor de actieve quiz tonen we elke vraag met hetzelfde `QuestionComponent`. We zetten:
   - `selected="true"` (de vraag zit per definitie in de quiz → knop toont `-`),
   - `hide-delete="true"` → in het component verbergt dit het vuilbakje (`this.#deleteBtn.hidden = ...`).

---

## Stap 8 — Quiz updaten (2 punten)

**Opgave:** via de `-` knop wordt een vraag **enkel uit de quiz** verwijderd (niet uit de database). Je
past dus enkel de data in **localStorage** aan.

**Aangepast bestand:** `pages/quizzes/quizzes.ts`.

**Hoe:** op het custom event roepen we `update(...)` op de quiz-provider aan met een vragenlijst zonder
de betrokken vraag:
```ts
question.addEventListener('add-remove-question', () => {
  void quizPersistenceProvider.update(activeQuiz.id, {
    ...activeQuiz,
    questions: activeQuiz.questions.filter(question => question.id !== q.id)
  })
})
```
`update(...)` schrijft naar `localStorage` en verwittigt de observer → de UI ververst meteen. De
database (via de REST-provider) wordt hier bewust **niet** aangeraakt.

---

## Overzicht: welk bestand hoort bij welke vraag?

| Bestand | Bewerkt? | Vraag/vragen |
|---|---|---|
| `main.ts` | gewijzigd | Routing (registratie + routes) |
| `components/navbar/navbar.html` | gewijzigd | Routing (extra testlink) |
| `pages/home/home.html` | gewijzigd | Routing (navbar toegevoegd) |
| `pages/quizzes/quizzes.html` | gewijzigd | Routing (navbar toegevoegd) |
| `data/data.ts` | gewijzigd | Vragen renderen/verwijderen + Quiz aanmaken (providers) |
| `components/question/question.ts` | **nieuw** | Renderen, Verwijderen, Toevoegen aan quiz, Quizzes weergeven |
| `pages/home/home.ts` | **nieuw** | Renderen, Filteren, Toevoegen aan quiz, Quiz aanmaken |
| `pages/quizzes/quizzes.ts` | gewijzigd | Quizzes weergeven, Quiz updaten |

## Hoe testen?

1. Start de **server** (map `Server`) zodat de API op `http://localhost:3000/questions` draait.
2. Start de **frontend** (map `Frontend`, meestal `npm install` + `npm run dev`).
3. Open de app: vragen verschijnen op `/`. Test filters, verwijderen, vragen selecteren en een quiz aanmaken.
4. Controleer op `/quizzes` (en `/quizzes-test`) dat de aangemaakte quiz en zijn vragen verschijnen, en
   dat de `-` knop een vraag uit de quiz haalt.
