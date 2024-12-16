import { getProducts, productList, displayProducts, filterAndDisplay, filteredProducts, sortProducts} from "./fetchProductData.js";
filterAndDisplay("women");


const dateDesc = document.getElementById("date-desc")
dateDesc.addEventListener("click", ()=>{
    sortProducts("date-asc")
    displayProducts(filteredProducts)
})

const priceAsc = document.getElementById("price-asc")
priceAsc.addEventListener("click", ()=>{
    sortProducts("price-asc")
    displayProducts(filteredProducts)
})

const priceDesc = document.getElementById("price-desc")
priceDesc.addEventListener("click", ()=>{
    sortProducts("price-desc")
    displayProducts(filteredProducts)
})

const categoryMap = {
    "t-shirt": 't-shirt',
    shirts: 'shirts',
    activewear: 'activewear',
    dresses: 'dresses',
    leggings: 'leggings',
    skirts: 'skirts',
    cardigans: 'cardigans',
    jackets: 'jackets',
    sweaters: 'sweaters'
}

Object.keys(categoryMap).forEach(id => {
    const button = document.getElementById(id);
    if (!button) {
        console.error(`Button with id "${id}" not found in the HTML.`);
        return;
    }
    button.addEventListener("click", ()=>{
        filterAndDisplay('women', categoryMap[id])
    })
})