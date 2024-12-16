import { getProducts, productList, displayProducts, filterAndDisplay} from "./fetchProductData.js";
filterAndDisplay("women");

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