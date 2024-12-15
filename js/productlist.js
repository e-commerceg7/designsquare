import { getProducts, productList, displayProducts, filterAndDisplay} from "./fetchProductData.js";
filterAndDisplay("women");

// 1. backend: add a sort query to the get products endpoint -- .sort()method
// 2. Modify the fech function to accept "sort" and "order" query parameters
// 3. add event listener ("change") to the sort drop down

const sortBtn = document.getElementById("sort-products")
sortBtn.addEventListener("change", ()=>{
    const [sortBy, order] = sortBtn.value.split("-")
    //modified fetchanddisplay function
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