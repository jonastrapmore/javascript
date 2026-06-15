// ============================================================================
// quizzes.ts = de logica achter de quizzes pagina.
// De startcode gaf al de lijst met quiznamen links; in deze oplossing zijn de
// observer + het renderen van de vragen toegevoegd. Het beantwoordt:
//   - "Quizzes weergeven (1 punt)": de vragen van de gekozen quiz tonen,
//     met verborgen vuilbakje (hide-delete) maar zichtbare +/- knop.
//   - "Quiz updaten (2 punten)": via de '-' knop een vraag UIT de quiz halen
//     (enkel in localStorage, niet uit de database).
// ============================================================================

import HTML from './quizzes.html?raw'
import {Page} from '../../router/page.ts'
import {Quiz} from '../../models/quiz.ts'
import {quizPersistenceProvider} from '../../data/data.ts'
import {QuestionComponent} from '../../components/question/question.ts'

export class QuizzesPage extends Page {

  #quizNameList = this.body.querySelector<HTMLUListElement>('#quizzes-list')!
  #questionList = this.body.querySelector<HTMLUListElement>('#questions-list')!
  // De id van de quiz die de gebruiker links heeft aangeklikt (null = nog niets gekozen).
  #activeQuiz: string | null = null
  #quizzes: Quiz[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Quizzes weergeven (1 punt)" ---
    // Observer op de quiz-provider: bij elke wijziging (bv. na "Quiz updaten") krijgen we
    // de actuele quizzes en herrenderen we automatisch.
    this.unsubscribe.push(quizPersistenceProvider.addObserver(quizzes => {
      this.#quizzes = quizzes
      this.render()
    }))

    // Laad de quizzes uit localStorage in en verwittig meteen de observer hierboven.
    void quizPersistenceProvider.getAll()
  }

  render() {
    super.render()

    // Bouw links de lijst met quiznamen opnieuw op (gegeven code).
    this.#quizNameList.innerHTML = ''
    this.#quizzes.map(quiz => {
      const li = document.createElement('li')
      li.innerText = quiz.name
      li.classList.add('list-group-item', 'list-group-item-action')
      this.#quizNameList.appendChild(li)

      // Klik op een quiznaam => die quiz wordt de actieve quiz en we herrenderen.
      li.addEventListener('click', () => {
        this.#activeQuiz = quiz.id
        this.render()
      })
    })


    // Zoek de actieve quiz op. Is er geen gekozen, toon dan een hint i.p.v. vragen.
    const activeQuiz = this.#quizzes.find(quiz => quiz.id === this.#activeQuiz)
    this.#questionList.innerHTML = activeQuiz ? '' : 'Select a quiz to see the questions, if there are no quizzes, create one!'

    // --- VRAAG "Quizzes weergeven (1 punt)" ---
    // Toon elke vraag van de actieve quiz met hetzelfde <custom-question> element als op home.
    activeQuiz?.questions.map(q => {
      const question = new QuestionComponent()
      question.setAttribute('question', q.question)
      question.setAttribute('type', q.type)
      question.setAttribute('difficulty', q.difficulty)
      question.setAttribute('correct-answer', q.correctAnswer)
      question.setAttribute('incorrect-answers', JSON.stringify(q.incorrectAnswers))
      question.setAttribute('id', q.id)
      // De vraag zit per definitie IN de quiz => knop toont '-'.
      question.setAttribute('selected', 'true')
      // Vuilbakje verbergen op de quizzes pagina (mag enkel op home blijven staan).
      question.setAttribute('hide-delete', 'true')

      // --- VRAAG "Quiz updaten (2 punten)" ---
      // De '-' knop vuurt het custom event af. We verwijderen de vraag ENKEL uit deze quiz
      // (niet uit de database) door de quiz te updaten met een vragenlijst zonder deze vraag.
      // De update() schrijft naar localStorage en verwittigt de observer -> UI ververst meteen.
      question.addEventListener('add-remove-question', () => {
        void quizPersistenceProvider.update(activeQuiz.id, {
          ...activeQuiz,
          questions: activeQuiz.questions.filter(question => question.id !== q.id)
        })
      })

      this.#questionList.appendChild(question)
    })

  }
}
