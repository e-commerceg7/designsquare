import { getProducts, productList, displayProducts, filterAndDisplay, filteredProducts, sortProducts, filterProducts, loadingFilter, getSubcategories, createCategoryFilter, currentProducts, filterContainer} from "./fetchProductData.js";


filterAndDisplay("women")
loadingFilter("women")

const sortDropdown = document.getElementById("sort-products")
sortDropdown.addEventListener("change", (event)=>{
    const sortBy = event.target.value
    const sortedProducts = sortProducts(sortBy)
    displayProducts(sortedProducts)
})

