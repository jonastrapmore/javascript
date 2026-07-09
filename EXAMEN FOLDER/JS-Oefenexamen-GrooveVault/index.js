// =============================================================
//  OEFENEXAMEN — GROOVE VAULT
//  Vul dit bestand aan. Lees README.md voor de volledige opgave.
//  Tip: start de pagina met "Live Server" (rechtsklik > Open with Live Server),
//       anders werkt de fetch naar de lokale json-bestanden niet.
// =============================================================


// ----- Handige verwijzingen naar elementen in de DOM -----
const homeNav = document.getElementById('home-nav')
const collectionNav = document.getElementById('collection-nav')
const homePageElements = document.querySelectorAll('.home-page')
const collectionPageElements = document.querySelectorAll('.collection-page')
const recordsContainer = document.getElementById('records-container')
const searchInput = document.getElementById('search')
const addButton = document.getElementById('add-button')
const teller = document.querySelector('#record-count')
const sort = document.querySelector('#sort')

// De URL's die je voor de fetch nodig hebt:
const RECORDS_URL = 'data/records.json'   // GET: de volledige collectie
const EXTRA_URL = 'data/extra.json'       // "POST": pool om een willekeurige plaat toe te voegen

// Globale variabele waarin je de platen bijhoudt.
let records = []

// =============================================================
//  1. PAGINA'S & NAVIGATIE (2 ptn)
//  - Toon enkel .home-page elementen op de homepagina
//  - Toon enkel .collection-page elementen op de crate-pagina
//  - Navigeer via de navbar (GROOVE VAULT  <->  Crate)

// =============================================================

// TODO: voeg click-listeners toe op homeNav en collectionNav
homeNav.addEventListener('click', () => {
    homePageElements.forEach(e => e.hidden = false)
    collectionPageElements.forEach(e => e.hidden = true)
})

collectionNav.addEventListener('click', () => {
    homePageElements.forEach(e => e.hidden = true)
    collectionPageElements.forEach(e => e.hidden = false)
})


// =============================================================
//  2. OPHALEN VAN PLATEN (3 ptn)
//  - Schrijf een async functie die met fetch de records ophaalt
//    uit RECORDS_URL en in de globale variabele plaatst.
// =============================================================

// TODO: async function getRecords() { ... }
async function getRecords() {
    const response = await fetch(RECORDS_URL)
    records = await response.json()
}


// =============================================================
//  3. RENDEREN VAN DE PLATEN (6 ptn)
//  - Toon elke plaat op het scherm.
//  - Bouw de markup uit het <template> na met document.createElement
//    (schrijf GEEN HTML-strings in je JavaScript).
//  - Let goed op alle klasnamen: record, record-img, status,
//    metadata, header, description, delete-btn.
// =============================================================

// TODO: function renderRecords() { ... }
// TODO: function createRecord(record) { ... return divRecord }

function renderRecords() {
    recordsContainer.innerHTML = ''
    const aantal = sortRecords()

    aantal.forEach(record => {
        const divRecord = createRecord(record)
        recordsContainer.appendChild(divRecord)
    });

    teller.textContent = `${aantal.length} ${aantal.length === 1 ? 'plaat' : 'platen'}`
}

function createRecord(record) {
    // <template>
    //     <div class="record">
    //         <img class="record-img" src="https://picsum.photos/seed/groove1/300/300" alt="Neon Mirage" />

    //         <div class="status">In Stock</div>

    //         <div class="metadata">
    //             <div class="header">
    //                 <div>
    //                     <h5>Neon Mirage</h5>
    //                     <p>Synthwave</p>
    //                 </div>
    //                 <button class="btn delete-btn" type="button" aria-label="Verwijder plaat">
    //                     🗑️
    //                 </button>
    //             </div>
    //             <p class="description">Pulserende synths en zonsondergang-vibes, het ultieme album voor een nachtelijke rit.</p>
    //         </div>
    //     </div>
    // </template>

    const divRecord = document.createElement('div')
    divRecord.className = 'record'

    const imgRecord = document.createElement('img')
    imgRecord.className = 'record-img'
    imgRecord.src = record.imageUrl
    imgRecord.alt = record.name

    const divStatus = document.createElement('div')
    divStatus.className = 'status'
    divStatus.textContent = record.displayStatus

    const divMetadata = document.createElement('div')
    divMetadata.className = 'metadata'

    const divHeader = document.createElement('div')
    divHeader.className = 'header'

    const divBody = document.createElement('div')

    const h5 = document.createElement('h5')
    h5.textContent = record.name

    const pGenre = document.createElement('p')
    pGenre.textContent = record.genre

    const pYear = document.createElement('p')
    pYear.textContent = record.year

    const pArtist = document.createElement('p')
    pArtist.textContent = record.artist

    const delBtn = document.createElement('button')
    delBtn.className = 'btn delete-btn'
    delBtn.type = 'button'
    delBtn.textContent = '🗑️'
    delBtn.setAttribute('aria-label', 'Verwijder plaat')

    delBtn.addEventListener('click', () => delRecord(record))

    const pDescription = document.createElement('p')
    pDescription.className = 'description'
    pDescription.textContent = record.description

    divBody.appendChild(h5)
    divBody.appendChild(pGenre)
    divBody.appendChild(pArtist)
    divBody.appendChild(pYear)
    divHeader.appendChild(divBody)
    divHeader.appendChild(delBtn)
    divMetadata.appendChild(divHeader)
    divMetadata.appendChild(pDescription)
    divRecord.appendChild(imgRecord)
    divRecord.appendChild(divStatus)
    divRecord.appendChild(divMetadata)

    return divRecord
}


// =============================================================
//  4. PLAAT TOEVOEGEN (2 ptn)
//  - Bij klik op "+ Voeg plaat toe": haal via fetch een willekeurige
//    plaat uit EXTRA_URL, voeg ze toe aan de globale array en toon ze.
// =============================================================

// TODO: addButton click-listener + async function addRecord()
addButton.addEventListener('click', addRecord)

async function addRecord() {
    const response = await fetch(EXTRA_URL)
    const extraRecords = await response.json()

    const randomIndex = Math.floor(Math.random() * extraRecords.length)
    const randomRecord = extraRecords[randomIndex]

    records.push(randomRecord)
    renderRecords()
}


// =============================================================
//  5. PLAAT VERWIJDEREN (3 ptn)
//  - Via de prullenbak-knop op een plaat verdwijnt ze uit de
//    collectie én uit de UI. (Geen fetch nodig.)
// =============================================================

// TODO: handel dit af in createRecord()
function delRecord(record) {
    const index = records.indexOf(record)
    if (index > -1) {
        records.splice(index, 1)
    }
    renderRecords()
}

// =============================================================
//  6. PLATEN FILTEREN (4 ptn)
//  - Zoekbalk filtert op name én genre (niet hoofdlettergevoelig).
//  - Filter leegmaken toont opnieuw alles.
//  - Uitvoeren bij Enter.
// =============================================================

// TODO: searchInput listener + filter-logica in renderRecords()
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        renderRecords()
    }
})

searchInput.addEventListener('dblclick', () => {
    searchInput.value = ''
    renderRecords()
})

function filterRecords() {
    const searchValue = searchInput.value.toLowerCase()
    return records.filter(r =>
        r.name.toLowerCase().includes(searchValue) ||
        r.genre.toLowerCase().includes(searchValue) ||
        r.artist.toLowerCase().includes(searchValue)
    )
}

sort.addEventListener('change', renderRecords)

function sortRecords() {
    const gefilterdeRecords = filterRecords()

    switch (sort.value) {
        case 'title-asc':
            return gefilterdeRecords.sort((a, b) => a.name.localeCompare(b.name))
        case 'year-asc':
            return gefilterdeRecords.sort((a, b) => a.year - b.year)
        case 'year-desc':
            return gefilterdeRecords.sort((a, b) => b.year - a.year)
        default:
            return gefilterdeRecords
    }
}

// =============================================================
//  TELLER
// =============================================================
//zie filterrecords()

// ----- Opstarten -----
// TODO: roep je ophaalfunctie aan en render daarna de platen.
getRecords().then(() => {
    renderRecords()
})