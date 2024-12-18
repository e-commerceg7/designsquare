
const urlParams = new URLSearchParams(window.location.search); //get URL sent from productlist page
const productId = urlParams.get("id");


loadPage(productId) //add dynamic content to page

async function loadPage(productId){
    const product = await getProduct(productId);
    displayProduct(product);

    //Add the function to add the item to the cart on the Add to cart button
    const addToCartBtn = document.querySelector(".to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        shoppingCart.addToCart(product);
    });
    
}


function displayProduct(product){
    const productData = product;
    const productDetails = document.getElementById("product-description");
    const itemImage = document.querySelector("img");
    
    //Display the current products details on the page
    itemImage.src = productData.image;
    productDetails.innerHTML = `
                <h1 id="item-name">${productData.name}</h1>
                <h2 id="color">${productData.color}</h2>
                <h2 id="price">${productData.price.$numberDecimal} kr</h2>
                <p id="description">${productData.description}</p>
    ` 
    
    //Check if in stock and display the result on page
    const inStockSection = document.getElementById("stock");
    const inStock = product.stock;
    if(inStock > 0) {
        inStockSection.classList.add("inStock");
        inStockSection.innerText = "In stock" 
    } else {
        inStockSection.classList.add("outOfStock");
        inStockSection.innerText = "Out of stock"
    }
};

//Object with the different functions for the shopping cart
const shoppingCart = {
    name: "cart",
    checkIfInCart: function (customerCart, productId){
        
            const itemIndex = customerCart.findIndex(item => item.id === productId && item.size === document.getElementById("size").value);
            return itemIndex;
    },
    addToCart: async function (currentProduct){
        const customerCart = JSON.parse(localStorage.getItem(this.name)) || [];
        const inCartIndex = this.checkIfInCart(customerCart, currentProduct._id);
        const productData = await currentProduct;
        if(inCartIndex !== -1){
            customerCart[inCartIndex].quantity += 1;
        } else {
            const item = {
                id: productData._id,
                description: productData.name,
                size: document.getElementById("size").value,
                color: productData.color,
                price: productData.price.$numberDecimal,
                quantity: 1
            };
            customerCart.push(item);
            }
            
            localStorage.setItem(this.name, JSON.stringify(customerCart));
    },
};


//Fetch a single product by productId
async function getProduct(productId){
    try{
        const response = await fetch("https://ecommerce-api-ashy-ten.vercel.app/products/" + productId);
    
        if(!response.ok) {
            throw new Error("Det gick inte att hämta produkten.");
        }
    
        const result = await response.json();
        return result;

    } catch(error) {
        console.error("Fel vid hämtning av produkten", error);
    }
}




