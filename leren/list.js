let students = []
const searchInput = document.getElementById('search')
const studenList = document.getElementById('student-list')

async function getStudents() {
    const response = await fetch("https://tm-statweb.be/students.php")
    students = await response.json()
}
getStudents().then(() => {
  renderStudents();
});

function renderStudents(){
    searchValue = searchInput.value.toLowerCase()
    const filterdStudents = students.filter((stud) => stud.name.toLowerCase().includes(searchValue)|| stud.level.toLowerCase().includes(searchValue))

    studenList.innerHTML = ''
    filterdStudents.forEach(stud => {
        const li = createStud(stud)
        studenList.appendChild(li)
    });
}

function createStud(stud){
    const li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'

    const span = document.createElement('span')
    span.textContent = `${stud.name} / ${stud.level}`

    const btn = document.createElement('button')
    btn.className = 'btn btn-danger btn-sm'
    btn.textContent = 'Remove'

    btn.addEventListener('click', () =>{
        studenList.removeChild(li)
    })

    li.appendChild(span)
    li.appendChild(btn)

    return li
}

searchInput.addEventListener('input', () => {
    renderStudents()
})