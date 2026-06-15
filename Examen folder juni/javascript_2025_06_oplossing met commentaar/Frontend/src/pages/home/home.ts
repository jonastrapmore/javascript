// ============================================================================
// home.ts = de logica achter de home pagina ("Quiz builder").
// Dit bestand is volledig zelf toegevoegd (stond niet in de startcode) en bundelt:
//   - "Vragen renderen (4 punten)": vragen ophalen via de API en tonen.
//   - "Vragen filteren (3 punten)": filteren op type + moeilijkheidsgraad.
//   - "Vragen toevoegen aan een quiz (3 punten)": vragen (de)selecteren via custom event.
//   - "Quiz aanmaken (4 punten)": geselecteerde vragen in een nieuwe quiz bewaren.
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './home.html?raw'
import type {Question} from '../../models/questions.ts'
import {questionPersistenceProvider, quizPersistenceProvider} from '../../data/data.ts'
import {QuestionComponent} from '../../components/question/question.ts'

export class HomePage extends Page {

  // De vragen die uit de API komen + de container waarin we ze tonen.
  #questions: Question[] = []
  #questionContainer = this.body.querySelector<HTMLDivElement>('#questions')!

  // --- VRAAG "Vragen filteren (3 punten)" ---
  // De huidige filterstatus wordt in deze velden bijgehouden.
  // selectedType start op 'multiple-choice' omdat die radio in de HTML standaard aangevinkt is.
  #selectedType: 'multiple-choice' | 'true-false' = 'multiple-choice'
  #difficultyFilter = this.body.querySelector<HTMLSelectElement>('#difficulty-filter')!
  #selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all'

  #trueFalseInput = this.body.querySelector<HTMLInputElement>('#true-false')!
  #multipleChoiceInput = this.body.querySelector<HTMLInputElement>('#multiple-choice')!

  // --- VRAAG "Vragen toevoegen aan een quiz / Quiz aanmaken" ---
  // Een Set houdt de id's bij van de vragen die voor de nieuwe quiz geselecteerd zijn.
  // Een Set is handig: elk id zit er max. één keer in en heeft snelle has/add/delete.
  #selectedQuestionIds: Set<string> = new Set()
  #quizNameInput = this.body.querySelector<HTMLInputElement>('#quiz-name')!
  #createQuizButton = this.body.querySelector<HTMLButtonElement>('#create-quiz')!

  constructor() {
    super(HTML)

    // --- VRAAG "Vragen renderen (4 punten)" ---
    // We registreren een observer op de provider: telkens de vragenlijst verandert
    // (na ophalen of na een delete), krijgen we de nieuwe lijst en herrenderen we.
    // De unsubscribe wordt bewaard zodat de Page hem opruimt bij het verlaten van de pagina.
    this.unsubscribe.push(questionPersistenceProvider.addObserver(questions => {
      this.#questions = questions
      this.render()
    }))

    // Start het ophalen van ALLE vragen via de API (verplicht via RestPersistenceProvider).
    // getAll() vult de cache en verwittigt daarna de observer hierboven -> de UI vult zich.
    // 'void' = we negeren bewust de teruggegeven Promise (we werken via de observer).
    void questionPersistenceProvider.getAll()

    // --- VRAAG "Vragen filteren (3 punten)" ---
    // Bij elke wijziging van een radio of de dropdown updaten we de filterstatus en herrenderen.
    // Beide filters werken zo automatisch samen (zie #questionMatchesFilter).
    this.#trueFalseInput.addEventListener('change', () => {
      this.#selectedType = 'true-false'
      this.render()
    })

    this.#multipleChoiceInput.addEventListener('change', () => {
      this.#selectedType = 'multiple-choice'
      this.render()
    })

    this.#difficultyFilter.addEventListener('change', () => {
      this.#selectedDifficulty = this.#difficultyFilter.value as 'easy' | 'medium' | 'hard' | 'all'
      this.render()
    })

    // Herrender ook wanneer de quiznaam verandert (zodat o.a. de knopstatus klopt).
    this.#quizNameInput.addEventListener('change', () => this.render())

    // --- VRAAG "Quiz aanmaken (4 punten)" ---
    // Klik op "Create quiz": maak een nieuwe quiz met de geselecteerde vragen.
    // We filteren de volledige vragenlijst op de geselecteerde id's en bewaren de quiz
    // in localStorage via de quizPersistenceProvider (verplicht, storagekey 'quizzes').
    this.#createQuizButton.addEventListener('click', async () => {
      void quizPersistenceProvider.create({
        name: this.#quizNameInput.value!,
        questions: this.#questions.filter(q => this.#selectedQuestionIds.has(q.id))
      })
      // Daarna alles leegmaken zodat de gebruiker meteen een nieuwe quiz kan bouwen.
      this.#selectedQuestionIds = new Set()
      this.#quizNameInput.value = ''
      this.render()
    })
  }

  render(): void {
    super.render() // plaatst de pagina-HTML in het #app element

    // Begin met een lege container en bouw de vragen opnieuw op.
    this.#questionContainer.innerHTML = ''

    // --- VRAAG "Vragen renderen" + "Vragen filteren" ---
    // We tonen enkel de vragen die door de filter geraken (#questionMatchesFilter).
    this.#questions.filter(q => this.#questionMatchesFilter(q)).map(q => {
      // Voor elke vraag maken we een nieuw <custom-question> element aan...
      const question = new QuestionComponent()
      // ...en geven we alle gegevens door via attributen (altijd strings, in kebab-case).
      question.setAttribute('question', q.question)
      question.setAttribute('type', q.type)
      question.setAttribute('difficulty', q.difficulty)
      question.setAttribute('correct-answer', q.correctAnswer)
      // Array -> JSON-string, want attributen kunnen geen array bevatten.
      question.setAttribute('incorrect-answers', JSON.stringify(q.incorrectAnswers))
      question.setAttribute('id', q.id)
      // 'selected' bepaalt of de knop een '+' of '-' toont (zit de vraag al in de quiz?).
      question.setAttribute('selected', this.#selectedQuestionIds.has(q.id).toString())

      // --- VRAAG "Vragen toevoegen aan een quiz (3 punten)" ---
      // We luisteren naar het CUSTOM EVENT dat de knop in het component afvuurt.
      // Zit de vraag al in de selectie? -> verwijderen, anders -> toevoegen. Daarna herrenderen
      // zodat de knop direct van + naar - wisselt (of omgekeerd).
      question.addEventListener('add-remove-question', () => {
        if (this.#selectedQuestionIds.has(q.id)) {
          this.#selectedQuestionIds.delete(q.id)
        } else {
          this.#selectedQuestionIds.add(q.id)
        }
        this.render()
      })

      this.#questionContainer.appendChild(question)
    })

    // --- VRAAG "Quiz aanmaken (4 punten)" ---
    // De knop is enkel actief als er minstens één vraag geselecteerd is.
    this.#createQuizButton.disabled = this.#selectedQuestionIds.size === 0
  }

  // --- VRAAG "Vragen filteren (3 punten)" ---
  // Bepaalt of één vraag aan ALLE actieve filters voldoet (type EN moeilijkheidsgraad).
  // Bij 'all' negeren we de moeilijkheidsfilter, zodat de filters samen blijven werken.
  #questionMatchesFilter(question: Question): boolean {
    if (question.type !== this.#selectedType) return false

    return this.#selectedDifficulty === 'all' || question.difficulty === this.#selectedDifficulty
  }

}