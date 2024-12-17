import { getProducts, productList, displayProducts, filterAndDisplay, filteredProducts, sortProducts} from "./fetchProductData.js";
filterAndDisplay("men");

const sortDropdown = document.getElementById("sort-products")
sortDropdown.addEventListener("change", (event)=>{
    const sortBy = event.target.value
    const sortedProducts = sortProducts(sortBy)
    displayProducts(sortedProducts)
})


const categoryMap = {
    men: 'men',
    jeans: 'jeans',
    shorts: 'shorts',
    polo: 'polo',
    shirts: 'shirts',
    "t-shirt": 't-shirt',
    pants: 'pants'
}

Object.keys(categoryMap).forEach(id => {
    const button = document.getElementById(id);
    if (!button) {
        console.error(`Button with id "${id}" not found in the HTML.`);
        return;
    }
    button.addEventListener("click", ()=>{
        filterAndDisplay('men', categoryMap[id])
    })
})