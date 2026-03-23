const students = [
    { naam: 'Alice', leeftijd: 19, afstudeerrichting: 'Wiskunde' },
    { naam: 'Bart', leeftijd: 23, afstudeerrichting: 'Boekhouden' },
    { naam: 'Hannelore', leeftijd: 18, afstudeerrichting: 'IT' },
    { naam: 'Hugo', leeftijd: 52, afstudeerrichting: 'IT' },
    { naam: 'Balthazar', leeftijd: 37, afstudeerrichting: 'IT' },
    { naam: 'Marc', leeftijd: 88, afstudeerrichting: 'IT' },
]

const studentsContainer = document.querySelector('.result')
const formAdd = document.querySelector('.student-toevoegen')
const naamInput = document.querySelector('#naam')
const leeftijdInput = document.querySelector('#leeftijd')
const afstudeerrichtingInput = document.querySelector('#afstudeerrichting')

formAdd.addEventListener('click', function () {
    let naam = naamInput.value
    let leeftijd = leeftijdInput.value
    let afstudeerrichting = afstudeerrichtingInput.value

    addStudent(naam, leeftijd, afstudeerrichting)
})

function addStudent(naam1, leeftijd1, afstudeerrichting1) {
    const newStudent = { naam: naam1, leeftijd: leeftijd1, afstudeerrichting: afstudeerrichting1 }
    students.push(newStudent)
    studentsContainer.textContent = ""
    showStudents()
}

function showStudents() {
    students.forEach(stud => {
        const card = document.createElement('div')
        card.className = 'card m-2'
        card.style.width = '18rem'

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.textContent = stud.naam

        const cardText = document.createElement('p')
        cardText.className = 'card-text'
        cardText.textContent = `Leeftijd: ${stud.leeftijd}, Afstudeerrichting: ${stud.afstudeerrichting}`

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        card.appendChild(cardBody)
        studentsContainer.appendChild(card)
    });
}

showStudents();