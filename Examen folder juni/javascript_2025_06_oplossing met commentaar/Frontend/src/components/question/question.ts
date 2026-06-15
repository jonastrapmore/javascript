// ============================================================================
// question.ts = het custom element dat ÉÉN vraag weergeeft (<custom-question>).
// Dit bestand is volledig zelf toegevoegd (stond nog niet in de startcode).
// Het beantwoordt meerdere vragen van de opgave tegelijk:
//   - "Vragen renderen (4 punten)": de inhoud van de vraag tonen via attributen.
//   - "Vragen verwijderen (2 punten)": de vuilbak-knop.
//   - "Vragen toevoegen aan een quiz (3 punten)": de +/- knop + custom event.
//   - "Quizzes weergeven (1 punt)": het vuilbakje kunnen verbergen (hide-delete).
// ============================================================================

// ?raw zorgt dat Vite de inhoud van question.html als gewone string inlaadt.
import HTML from './question.html?raw'
import {CustomElement} from '../../router/customElement.ts'
import {questionPersistenceProvider} from '../../data/data.ts'

export class QuestionComponent extends CustomElement {
  // observedAttributes = de lijst attributen die we "in de gaten houden".
  // Telkens één van deze attributen verandert (via setAttribute), roept de browser
  // automatisch attributeChangedCallback op. Let op: kebab-case (zie tip in de opgave),
  // want je kan enkel STRINGS doorgeven aan een custom element.
  static observedAttributes = ['question', 'type', 'difficulty', 'correct-answer', 'incorrect-answers', 'selected', 'hide-delete']

  // Verwijzingen naar de HTML-elementen binnen het component (uit question.html).
  // Zo moeten we ze maar één keer opzoeken en kunnen we ze later snel updaten.
  #questionText = this.componentBody.querySelector<HTMLHeadingElement>('#question-text')!
  #questionType = this.componentBody.querySelector<HTMLHeadingElement>('#question-type')!
  #questionDifficulty = this.componentBody.querySelector<HTMLParagraphElement>('#question-difficulty')!
  #answersList = this.componentBody.querySelector<HTMLUListElement>('#answers-list')!
  #correctAnswer = this.componentBody.querySelector<HTMLParagraphElement>('#correct-answer')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-question')!
  #addRemoveBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-remove-question')!

  constructor() {
    super(HTML) // de CustomElement-basisklasse zet de HTML in this.componentBody

    // --- VRAAG "Vragen verwijderen (2 punten)" ---
    // Klik op het vuilbakje => verwijder de vraag via de RestPersistenceProvider (= uit de database).
    // this.id is het 'id'-attribuut dat de pagina op dit element zette. Omdat de provider zijn
    // observers verwittigt, herrendert de home pagina automatisch en verdwijnt de vraag uit de UI.
    this.#deleteBtn.addEventListener('click', () => questionPersistenceProvider.delete(this.id))

    // --- VRAAG "Vragen toevoegen aan een quiz (3 punten)" ---
    // Een custom element mag NIET rechtstreeks aan de selectie van de pagina prutsen.
    // Daarom stuurt de knop een CUSTOM EVENT 'add-remove-question' naar de parent (de pagina).
    // De pagina luistert hierop en beslist zelf of de vraag toegevoegd of verwijderd wordt.
    this.#addRemoveBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-remove-question'))
    })
  }

  // --- VRAAG "Vragen renderen (4 punten)" ---
  // attributeChangedCallback wordt automatisch opgeroepen wanneer een geobserveerd attribuut wijzigt.
  // We vertalen elk attribuut (een string) naar de juiste plek in de UI.
  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'question':
        this.#questionText.innerText = newValue
        break
      case 'type':
        this.#questionType.innerText = newValue
        break
      case 'difficulty':
        this.#questionDifficulty.innerText = newValue
        break
      case 'correct-answer':
        this.#correctAnswer.innerText = newValue
        break
      case 'incorrect-answers':
        // De foute antwoorden zijn een ARRAY, maar attributen zijn altijd strings.
        // De pagina geeft ze door als JSON-string; hier parsen we terug naar een array
        // en bouwen we voor elk fout antwoord een <li> in de lijst.
        this.#answersList.innerHTML = ''
        const answers = JSON.parse(newValue)
        answers.map((answer: string) => {
          const li = document.createElement('li')
          li.innerText = answer
          this.#answersList.appendChild(li)
        })
        break
      case 'selected':
        // --- VRAAG "Vragen toevoegen aan een quiz (3 punten)" ---
        // Zit de vraag al in de quiz? Toon '-' (verwijderen), anders '+' (toevoegen).
        this.#addRemoveBtn.innerText = newValue === 'true' ? '-' : '+'
        break
      case 'hide-delete':
        // --- VRAAG "Quizzes weergeven (1 punt)" ---
        // Op de quizzes pagina moet het vuilbakje verborgen worden, op de home pagina niet.
        // De pagina stuurt hide-delete="true" mee om de delete-knop te verbergen.
        this.#deleteBtn.hidden = newValue === 'true'
    }
  }
}