import { getProducts, productList, displayProducts, filterAndDisplay} from "./fetchProductData.js";
filterAndDisplay("men");

const categoryMap = {
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