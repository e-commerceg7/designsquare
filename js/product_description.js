
const temporaryId = "675874568c163b7fe8d0b275" //A static ID taken from the 
// existing database, awaitng functionallity to send the ID from the product page list

const testItem = { /// manual extract from the database used for testing functions
    "categories": [
        "jeans",
        "men"
    ],
    "_id": "675874568c163b7fe8d0b275",
    "name": "Jeans",
    "description": "Comfortable and stylish jeans.",
    "price": {
        "$numberDecimal": "499"
    },
    "color": "Blue",
    "stock": 30,
    "date": "2024-12-10T17:03:18.900Z",
    "__v": 0,
    "image": "https://image.hm.com/assets/hm/bb/56/bb56b5102fef5008cc73e550fbae6b27d8ead12e.jpg?imwidth=1536"
}

function displayProduct(){

    const productDetails = document.getElementById("product-description-details");
    const itemImage = document.querySelector("img");
    const product = testItem/* getProduct(productId); */
    
    
    itemImage.src = product.image;
    productDetails.innerHTML = `
        <article id="product-details">
            <section id="description-header">
                <h1 id="item-name">${product.name}</h1>
                <h2 id="color">${product.color}</h2>
                <h2 id="price">${product.price.$numberDecimal} kr</h2>
                <p id="description">${product.description}</p>
                </section>
    `    
};

const addToCartBtn = document.querySelector(".to-cart-btn");
addToCartBtn.addEventListener("click", () => {
addToCart(testItem);
})
displayProduct();

//adding and item to shopping cart in local storage
function addToCart(product){
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const productSize = document.getElementById("size").value;
    product.size = productSize;
    shoppingCart.push(product);

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

//Fetch a single product by product ID, might not be neccessary if an object is returned from productlist page
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
        console.error("Fel vid hämtning av produkten", error);
    }
}




