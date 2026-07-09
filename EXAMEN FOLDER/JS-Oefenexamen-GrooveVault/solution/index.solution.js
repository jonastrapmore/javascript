// =============================================================
//  GROOVE VAULT — VOORBEELDOPLOSSING (kern van het examen)
//  Bekijk dit pas nadat je het zelf geprobeerd hebt!
//  Wil je deze testen? Verander in index.html de regel
//      <script src="index.js"></script>
//  tijdelijk naar
//      <script src="solution/index.solution.js"></script>
// =============================================================

const homeNav = document.getElementById('home-nav')
const collectionNav = document.getElementById('collection-nav')
const homePageElements = document.querySelectorAll('.home-page')
const collectionPageElements = document.querySelectorAll('.collection-page')
const recordsContainer = document.getElementById('records-container')
const searchInput = document.getElementById('search')
const addButton = document.getElementById('add-button')

const RECORDS_URL = 'data/records.json'
const EXTRA_URL = 'data/extra.json'

let records = []

// ---------- 1. Navigatie ----------
function showHome() {
    homePageElements.forEach(e => e.hidden = false)
    collectionPageElements.forEach(e => e.hidden = true)
}
function showCollection() {
    homePageElements.forEach(e => e.hidden = true)
    collectionPageElements.forEach(e => e.hidden = false)
}
homeNav.addEventListener('click', showHome)
collectionNav.addEventListener('click', showCollection)

// ---------- 2. Ophalen ----------
async function getRecords() {
    const response = await fetch(RECORDS_URL)
    records = await response.json()
}

// ---------- 3 & 6. Renderen + filteren ----------
function renderRecords() {
    const searchValue = searchInput.value.toLowerCase()

    const filtered = records.filter(r =>
        r.name.toLowerCase().includes(searchValue) ||
        r.genre.toLowerCase().includes(searchValue)
    )

    recordsContainer.innerHTML = ''
    filtered.forEach(record => {
        recordsContainer.appendChild(createRecord(record))
    })
}

function createRecord(record) {
    const divRecord = document.createElement('div')
    divRecord.className = 'record'

    const img = document.createElement('img')
    img.className = 'record-img'
    img.src = record.imageUrl
    img.alt = record.name

    const status = document.createElement('div')
    status.className = 'status'
    status.textContent = record.displayStatus

    const metadata = document.createElement('div')
    metadata.className = 'metadata'

    const header = document.createElement('div')
    header.className = 'header'

    const titleWrap = document.createElement('div')

    const h5 = document.createElement('h5')
    h5.textContent = record.name

    const genre = document.createElement('p')
    genre.textContent = record.genre

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn delete-btn'
    deleteBtn.type = 'button'
    deleteBtn.setAttribute('aria-label', 'Verwijder plaat')
    deleteBtn.textContent = '🗑️'

    // ---------- 5. Verwijderen ----------
    deleteBtn.addEventListener('click', () => {
        const index = records.indexOf(record)
        if (index > -1) records.splice(index, 1)
        renderRecords()
    })

    const description = document.createElement('p')
    description.className = 'description'
    description.textContent = record.description

    titleWrap.appendChild(h5)
    titleWrap.appendChild(genre)
    header.appendChild(titleWrap)
    header.appendChild(deleteBtn)
    metadata.appendChild(header)
    metadata.appendChild(description)
    divRecord.appendChild(img)
    divRecord.appendChild(status)
    divRecord.appendChild(metadata)

    return divRecord
}

// ---------- 4. Toevoegen ----------
async function addRecord() {
    const response = await fetch(EXTRA_URL)
    const pool = await response.json()
    const randomRecord = pool[Math.floor(Math.random() * pool.length)]
    records.push(randomRecord)
    renderRecords()
}
addButton.addEventListener('click', addRecord)

// ---------- 6. Zoeken bij Enter + leegmaken ----------
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') renderRecords()
})
searchInput.addEventListener('search', renderRecords) // het kruisje (x) leegmaken

// ---------- Opstarten ----------
getRecords().then(renderRecords)
