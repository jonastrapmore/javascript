let products = []
const errormsg = document.getElementById('error')
const productList = document.getElementById('product-list')
const shopCart = document.getElementById('shopcart')
const filterButtons = document.getElementById('filter-buttons')

console.log('shopCart element:', shopCart)

getProducts().then(() => {
    renderFilterButtons()
    renderProducts('all')
})
.catch(() => {

})
async function getProducts() {
    try {
        const response = await fetch("data/products.json")
        products = await response.json()
    } catch (error) {
        errormsg.hidden = false
        throw error
    }
}

function renderProducts(category) {
    productList.innerHTML = ''

    let filteredproducts = products.products
    if (category !== 'all') {
        filteredproducts = products.products.filter(product => product.category === category)
    }

    filteredproducts.forEach(prod => {
        const card = createProd(prod)
        productList.appendChild(card)
    })
}

function createProd(prod) {
    const col = document.createElement('div')
    col.className = 'col'

    const divCard = document.createElement('div')
    divCard.className = 'card mb-3'

    const img = document.createElement('img')
    img.className = 'card-img-top'
    img.src = prod.image

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body'

    const h5 = document.createElement('h5')
    h5.className = 'card-title'
    h5.textContent = prod.name

    const spanLabel = document.createElement('span')
    spanLabel.className = 'badge text-bg-secondary ms-2'
    spanLabel.textContent = prod.price

    const p = document.createElement('p')
    p.className = 'card-text'
    p.textContent = prod.description

    const addBtn = document.createElement('button')
    addBtn.className = 'btn btn-dark'
    addBtn.textContent = 'Add to Cart'
    addBtn.dataset.productId = prod.id

    addBtn.addEventListener('click', () => {
        addProductToCart(prod)
    })

    col.appendChild(divCard)
    divCard.appendChild(img)
    divCard.appendChild(divCardBody)
    divCardBody.appendChild(h5)
    h5.appendChild(spanLabel)
    divCardBody.appendChild(p)
    divCardBody.appendChild(addBtn)

    return col
}

function addProductToCart(prod) {
    const li = document.createElement('li')
    li.className = 'dropdown-item d-flex justify-content-between align-items-center'
    li.textContent = `${prod.name} - ${prod.price}`
    
    shopCart.appendChild(li)
}

function renderFilterButtons() {
    filterButtons.classList.remove('d-none')
    filterButtons.innerHTML = ''

    //create all products button
    const filterAllBtn = document.createElement('button')
    filterAllBtn.className = 'btn btn-dark rounded-pill filter-btn'
    filterAllBtn.dataset.category = 'all'
    filterAllBtn.textContent = 'All products'

    filterAllBtn.addEventListener('click', () => {
        renderProducts('all')
    })
    filterButtons.appendChild(filterAllBtn)

    //all de rest aanmaken
    const allCat = [...new Set(products.products.map(prod => prod.category))]

    allCat.forEach(cat => {
        const filterBtn = document.createElement('button')
        filterBtn.className = 'btn btn-dark rounded-pill filter-btn'
        filterBtn.dataset.category = cat
        filterBtn.textContent = cat

        filterBtn.addEventListener('click', () => {
            renderProducts(cat)
        })
        filterButtons.appendChild(filterBtn)
    });
}