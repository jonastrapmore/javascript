let products = null
const productList = document.getElementById('product-list')
const filterBtns = document.getElementById('filter-buttons')
const menu = document.getElementById('menu')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
let cart = []


//alle data binnhalen en de pagina aanmaken
async function getProducts() {

    try {
        const filepath = 'data/products.json'
        const response = await fetch(filepath)
        products = await response.json()

        createFilterButtons() //creeren van de filters
        createPage('all')  //creeren van de pagina vol productcards

    } catch (error) {
        const errorMessage = document.getElementById('errorMessage')
        errorMessage.classList.remove('d-none')
        errorMessage.textContent = 'Error while loading products.'
    }

}

//functie voor het creeren van de filters
function createFilterButtons() {
    filterBtns.classList.remove('d-none')
    filterBtns.innerHTML = ''

    //knop all products creeren
    const buttonAll = document.createElement('button')
    buttonAll.className = 'btn btn-dark rounded-pill filter-btn'
    buttonAll.dataset.category = 'all'
    buttonAll.textContent = 'All products'

    buttonAll.addEventListener('click', function(){
        if (!products) return
        createPage(this.dataset.category)
    })

    filterBtns.appendChild(buttonAll)

    //alle andere category's creeren
    const allCat = [...new Set(products.products.map(product => product.category))]

    allCat.forEach(cat => {
        const button = document.createElement('button')
        button.className = 'btn btn-dark rounded-pill filter-btn'
        button.dataset.category = cat
        button.textContent = cat

        //listener openen op de button
        button.addEventListener('click', function () {
            if (!products) return

            const gekozenCategorie = this.dataset.category
            createPage(gekozenCategorie)
        })

        filterBtns.appendChild(button)
    });
}

//functie voor het creeren van de juiste producten aan de hand van de filter die mee gegeven wordt
function createPage(category) {
    productList.innerHTML = ''

    let filteredProducts = products.products
    if (category !== 'all') {
        filteredProducts = products.products.filter(product => product.category === category)
    }

    filteredProducts.forEach(product => {
        const card = createCard(product)
        productList.appendChild(card)
    })
}

//functie voor het creren van 1 card die wordt teruggestuurd
function createCard(product) {
    const col = document.createElement('div')
    col.className = 'col'

    const card = document.createElement('div')
    card.className = 'card'

    const cardImg = document.createElement('img')
    cardImg.className = 'card-img-top'
    cardImg.src = product.image
    cardImg.alt = product.name

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const cardTitle = document.createElement('h5')
    cardTitle.className = 'card-title'
    cardTitle.textContent = product.name

    const cardTitleBadge = document.createElement('span')
    cardTitleBadge.className = 'badge text-bg-secondary mx-2'
    cardTitleBadge.textContent = `€${product.price}`

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.textContent = product.description

    const cardBtn = document.createElement('button')
    cardBtn.className = 'btn btn-dark rounded-pill addToCart'
    cardBtn.textContent = 'Add to cart'
    cardBtn.dataset.productId = product.id

    cardBtn.addEventListener('click', function () {
        if (!products) return
        addProductToCart(Number(this.dataset.productId))
    })

    cardTitle.appendChild(cardTitleBadge)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardBtn)
    card.appendChild(cardImg)
    card.appendChild(cardBody)
    col.appendChild(card)

    return col
}

//luisteren op welke knop er gedrukt wordt om in winkelwagen toe te voegen
function addProductToCart(productId) {
    const product = products.products.find(p => p.id === productId)
    if (!product) return

    cart.push(product)
    cartDropDown()
}

//winkelwagen vullen
function cartDropDown() {
    menu.innerHTML = ''

    if (cart.length === 0) {
        const listItem = document.createElement('li')
        listItem.className = 'px-2 py-1'

        const row = document.createElement('div')
        row.className = 'd-flex justify-content-between align-items-center gap-2 w-100'

        const emptyText = document.createElement('span')
        emptyText.className = 'small text-muted'
        emptyText.textContent = "No products found"

        const placeholder = document.createElement('span')
        placeholder.className = 'btn btn-sm invisible'
        placeholder.textContent = 'Verwijderen'

        row.appendChild(emptyText)
        row.appendChild(placeholder)
        listItem.appendChild(row)
        menu.appendChild(listItem)
        document.getElementById('cart-counter').textContent = '0'
        cartTotal.textContent = '€0'
        checkoutBtn.disabled = true
        return
    }

    const grouped = {}

    cart.forEach(item => {
        if (!grouped[item.id]) {
            grouped[item.id] = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 0
            }
        }
        grouped[item.id].quantity++
    })

    Object.values(grouped).forEach(item => {
        const listItem = document.createElement('li')
        listItem.className = 'px-2 py-1'

        const row = document.createElement('div')
        row.className = 'd-flex justify-content-between align-items-center gap-2 w-100'

        const info = document.createElement('span')
        info.className = 'small text-truncate'
        info.style.maxWidth = '160px'
        info.textContent = `${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`

        const btnDelete = document.createElement('button')
        btnDelete.className = 'btn btn-sm btn-danger remove-from-cart'
        btnDelete.dataset.productId = item.id
        btnDelete.textContent = `Verwijderen`

        btnDelete.addEventListener('click', function () {
            if (!products) return
            removeProductFromCart(Number(this.dataset.productId))
        })

        row.appendChild(info)
        row.appendChild(btnDelete)
        listItem.appendChild(row)
        menu.appendChild(listItem)
    })

    document.getElementById('cart-counter').textContent = String(cart.length)
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    cartTotal.textContent = `€${total.toFixed(2)}`
    checkoutBtn.disabled = false
}

//verwijder knoppen luisteren. 
function removeProductFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId)
    if (index === -1) return

    cart.splice(index, 1)
    cartDropDown()
}


//checkout knop luisteren
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return

    alert('Thank you for your purchase')
    cart = []
    cartDropDown()
    createPage('all')
})

cartDropDown()
getProducts()