import { getProducts, productList, displayProducts, filterAndDisplay} from "./fetchProductData.js";
filterAndDisplay("children");

const jackets = document.getElementById('jackets')
const jeans = document.getElementById('jeans')
const hoodies = document.getElementById('hoodies')
const shoes = document.getElementById('shoes')
const pants = document.getElementById('pants')
const sweatshirts = document.getElementById('sweatshirts')
const shorts = document.getElementById('shorts')
const sleepwear = document.getElementById('sleepwear')

jackets.addEventListener("click", ()=>{
    filterAndDisplay('children', 'jackets')
})
jeans.addEventListener("click", ()=>{
    filterAndDisplay('children', 'jeans')
})
hoodies.addEventListener("click", ()=>{
    filterAndDisplay('children', 'hoodies')
})
shoes.addEventListener("click", ()=>{
    filterAndDisplay('children', 'shoes')
})
pants.addEventListener("click", ()=>{
    filterAndDisplay('children', 'pants')
})
sweatshirts.addEventListener("click", ()=>{
    filterAndDisplay('children', 'sweatshirts')
})
shorts.addEventListener("click", ()=>{
    filterAndDisplay('children', 'shorts')
})
sleepwear.addEventListener("click", ()=>{
    filterAndDisplay('children', 'sleepwear')
})
