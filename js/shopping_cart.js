
const addToCartBtn = document.querySelector(".to-cart-btn");

addToCartBtn.addEventListener("click", () => {
    addToCart(productId);
})

//adding and item to shopping cart in local storage
function addToCart(productId){
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    shoppingCart.push(item);

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

//Fetch a single product by product ID
async function getProduct(productId){
    try{
        const response = await fetch("https://ecommerce-api-seven-omega.vercel.app/products/" + productId);
    
        if(!response.ok) {
            throw new Error("Det gick inte att hämta produkten.");
        }
    
        const product = await response.json();
        console.log(product);
        return product;
    } catch(error) {
        console.error("Fel vi hämtning av produkter", error);
    }
}

getProduct()
/* function displayProduct(){

}; */


/* const test = getProduct("675874568c163b7fe8d0b275");

console.log("test"); */


