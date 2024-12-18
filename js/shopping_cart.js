// Funktion för att hämta kundvagnen från localStorage
function loadCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Funktion för att rendera kundvagnen
// Funktion för att rendera kundvagnen
function renderCart() {
  const cart = loadCart(); // Hämta kundvagnen från localStorage
  const cartTable = document.getElementById("shopping-cart-list");
  cartTable.innerHTML = ` 
    <tr>
      <th></th>
      <th>Description</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Total</th>
      <th></th>
    </tr>
  `;

  cart.forEach(product => {
    const row = document.createElement("tr");
    row.dataset.id = product.id;  // Sätt ett id för varje rad
    row.innerHTML = `
      <td><img src="${product.imageUrl}" alt="Picture of ${product.description}" style="width: 50px;"></td>
      <td>
        <h3>${product.description}</h3>
        <p>${product.size} - ${product.color}</p>
      </td>
      <td>
        <button type="button" class="qty-btn decrement">-</button>
        <input class="qty-input" type="number" value="${product.quantity}" min="1">
        <button type="button" class="qty-btn increment">+</button>
      </td>
      <td>${parseFloat(product.price)} kr</td>  <!-- Visar pris per styck -->
      <td>${(parseFloat(product.price) * product.quantity).toFixed(2)} kr</td>  <!-- Visar total per produkt -->
      <td><button type="button" class="edit-btn remove">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });

  // Total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td></td>
    <td></td>
    <td id="total">Total:</td>
    <td></td>
    <td>${calculateTotal(cart)} kr</td> <!-- Den totala summan -->
    <td colspan="2">
      <button type="submit" id="checkout-btn">Checkout</button>
    </td>
  `;
  cartTable.appendChild(totalRow);
}



// Funktion för att beräkna totalbeloppet
function calculateTotal(cart) {
  return cart.reduce((total, product) => {
    const price = parseFloat(product.price);  // Konvertera priset till ett tal
    const quantity = product.quantity; // Använd kvantiteten
    return total + (price * quantity);  // Multiplicera priset med kvantiteten och lägg till till totalen
  }, 0).toFixed(2);  // Vi använder toFixed för att få resultatet till två decimaler
}


// Funktion för att uppdatera kundvagnen när kvantiteten ändras
function updateQuantity(id, newQuantity) {
  const cart = loadCart();
  const productIndex = cart.findIndex(item => item.id === id);
  if (productIndex !== -1) {
    cart[productIndex].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
    renderCart(); // Återrendera kundvagnen
  }
}

// Funktion för att ta bort en produkt från kundvagnen
function removeProduct(id) {
  const cart = loadCart();
  const updatedCart = cart.filter(product => product.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart)); // Uppdatera localStorage
  renderCart(); // Återrendera kundvagnen
}

// Eventlistener för att hantera ändringar i kvantitet och borttagning
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('decrement')) {
    const input = e.target.nextElementSibling;
    const newQuantity = Math.max(1, parseInt(input.value) - 1);
    input.value = newQuantity;
    const productId = e.target.closest('tr').dataset.id;
    updateQuantity(productId, newQuantity);
  }

  if (e.target.classList.contains('increment')) {
    const input = e.target.previousElementSibling;
    const newQuantity = parseInt(input.value) + 1;
    input.value = newQuantity;
    const productId = e.target.closest('tr').dataset.id;
    updateQuantity(productId, newQuantity);
  }

  if (e.target.classList.contains('remove')) {
    const productId = e.target.closest('tr').dataset.id;
    removeProduct(productId);
  }
});

// Initial render när sidan laddas
renderCart();


//till product_desription.js
//lägg till const shoppingCart=...
/* imageUrl: productData.image, */

  
  
  