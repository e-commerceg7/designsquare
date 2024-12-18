window.onload = function() {
    fetch('nav.html') .then(response => response.text())         
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
        basketIcon.update();
    })         
    .catch(error => console.error('Det gick inte att ladda navbaren:', error));
} 

export const basketIcon = {
    getQuantity: function(){
        const customerCart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;
        customerCart.forEach((item) => total += item.quantity)
        return total;
    },

    update: function(){
        const basket = document.getElementById("inCartBubble");
        basket.innerHTML = basketIcon.getQuantity();
    }
}

//Object with the different functions for the shopping cart
export const shoppingCart = {
    name: "cart",
    checkIfInCart: function (customerCart, productId){
        
            const itemIndex = customerCart.findIndex(item => item.id === productId && item.size === document.getElementById("size").value);
            return itemIndex;
    },
    addToCart: async function (currentProduct){
        const customerCart = this.getCart();
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
            
            /* localStorage.setItem(this.name, JSON.stringify(customerCart)); */
            this.saveCart(customerCart);
            basketIcon.update();
    },
    getCart: function(){
        const customerCart = JSON.parse(localStorage.getItem(this.name)) || [];
        return customerCart
    },

    saveCart: function(customerCart){
        localStorage.setItem(this.name, JSON.stringify(customerCart));
    }
};