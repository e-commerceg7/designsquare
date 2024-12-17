import { getProducts, productList, displayProducts, filterAndDisplay, filteredProducts, sortProducts} from "./fetchProductData.js";

let currentProducts = []
const filterContainer = document.getElementById("filter-container")


filterAndDisplay("women");
currentProducts = filterProducts("women")
console.log(`current products are: ${currentProducts}`)
const subcategories = getSubcategories(currentProducts)
createCategoryFilter(subcategories)


async function filterProducts (category){
    const products = await getProducts()
    filteredProducts = products.filter((product) =>
        product.categories.includes(category)
      );
    
    return products
  }


function getSubcategories (products) {
    const subcategories = new Set()
    products.forEach((product)=>{
        if(product.categories[1]) {
            subcategories.add(product.categories[1])
        }
    })
    return Array.from(subcategories)
    console.log(subcategories)
}

function createCategoryFilter(subcategories){
    filterContainer.innerHTML = ""
    subcategories.forEach((subcategory) => {
        const button = document.createElement("button")
        button.textContent = subcategory
        button.classList.add("category-button")
        button.addEventListener("click", ()=>{
            filterAndDisplay("women", subcategory)
        })
        filterContainer.appendChild(button)
    })
}

// button.addEventListener("click", ()=>{
//     filterAndDisplay('women', categoryMap[id])
// })




const sortDropdown = document.getElementById("sort-products")
sortDropdown.addEventListener("change", (event)=>{
    const sortBy = event.target.value
    const sortedProducts = sortProducts(sortBy)
    displayProducts(sortedProducts)
})

// const categoryMap = {
//     women: 'women',
//     "t-shirt": 't-shirt',
//     shirts: 'shirts',
//     activewear: 'activewear',
//     dresses: 'dresses',
//     leggings: 'leggings',
//     skirts: 'skirts',
//     cardigans: 'cardigans',
//     jackets: 'jackets',
//     sweaters: 'sweaters'
// }

// Object.keys(categoryMap).forEach(id => {
//     const button = document.getElementById(id);
//     if (!button) {
//         console.error(`Button with id "${id}" not found in the HTML.`);
//         return;
//     }
//     button.addEventListener("click", ()=>{
//         filterAndDisplay('women', categoryMap[id])
//     })
// })
