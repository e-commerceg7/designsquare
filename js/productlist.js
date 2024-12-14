import { getProducts, productList, displayProducts, filterAndDisplay} from "./fetchProductData.js";
filterAndDisplay("women");

// 1. backend: add a sort query to the get products endpoint -- .sort()method
// 2. Modify the fech function to accept "sort" and "order" query parameters
// 3. add event listener ("change") to the sort drop down

const sortBtn = document.getElementById("sort-products")
sortBtn.addEventListener("change", ()=>{
    const [sortBy, order] = sortBtn.value.split("-")
    //modified fetchanddisplay function
})