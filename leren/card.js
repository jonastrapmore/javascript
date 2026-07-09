let students = []
const searchInput = document.getElementById('search')
const studentCards = document.getElementById('result')

getStudents().then(() => {
  renderStudents();
});

async function getStudents() {
    const response = await fetch("https://tm-statweb.be/students.php")
    students = await response.json()
}

searchInput.addEventListener('input', () =>{
    renderStudents()
})

searchInput.addEventListener('dblclick', () =>{
    searchInput.value = ''
    renderStudents()
})

function renderStudents(){
    const searchValue = searchInput.value.toLowerCase()
    const filterdStudents = students.filter((stud) => stud.name.toLowerCase().includes(searchValue)|| stud.level.toLowerCase().includes(searchValue))

    studentCards.innerHTML = ''
    filterdStudents.forEach(stud => {
        const card = createStud(stud)
        studentCards.appendChild(card)
    });
}

function createStud(stud){
    const divCol = document.createElement('col')
    
    const divCard = document.createElement('div')
    divCard.className = 'card mb-3'

    const img = document.createElement('img')
    img.src = stud.avatar
    img.className = 'card-img-top'

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body'

    const h5 = document.createElement('h5')
    h5.className = 'card-title'
    h5.textContent = stud.name

    const p = document.createElement('p')
    p.className = 'card-text'
    p.textContent = `level: ${stud.level}`

    const btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.textContent = 'Remove'

    btn.addEventListener('click', () =>{
        studentCards.removeChild(divCol)
    })

    divCardBody.appendChild(h5)
    divCardBody.appendChild(p)
    divCardBody.appendChild(btn)
    divCard.appendChild(img)
    divCard.appendChild(divCardBody)
    divCol.appendChild(divCard)

    return divCol
}