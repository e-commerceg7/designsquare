import { getProducts, productList, displayProducts, filterAndDisplay, filteredProducts, sortProducts} from "./fetchProductData.js";
filterAndDisplay("children");

const sortDropdown = document.getElementById("sort-products")
sortDropdown.addEventListener("change", (event)=>{
    const sortBy = event.target.value
    const sortedProducts = sortProducts(sortBy)
    displayProducts(sortedProducts)
})


const categoryMap = {
    jackets: 'jackets',
    jeans: 'jeans',
    hoodies: 'hoodies',
    shoes: 'shoes',
    pants: 'pants',
    sweatshirts: 'sweatshirts',
    shorts: 'shorts',
    sleepwear: 'sleepwear'
}

Object.keys(categoryMap).forEach(id => {
    const button = document.getElementById(id);
    button.addEventListener("click", ()=>{
        filterAndDisplay('children', categoryMap[id])
    })
})



// --