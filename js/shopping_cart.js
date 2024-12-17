document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.getElementById("shopping-cart-list");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = loadCart();
  
    // Funktion för att uppdatera totalsumman
    function updateTotal() {
      let total = 0;
      cart.forEach((item) => {
        total += item.quantity * item.price;
      });
      document.getElementById("total").nextElementSibling.textContent = `${total} kr`;
      saveCart();
    }
  
    // Funktion för att ladda kundvagn från localStorage
    function loadCart() {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : getInitialCart();
    }
  
    // Funktion för att spara kundvagn i localStorage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Returnerar initial data om ingen finns i localStorage
    function getInitialCart() {
      return [
        { id: 1, description: "T-shirt", size: "X-small", price: 50, quantity: 1 },
        { id: 2, description: "T-shirt", size: "X-small", price: 50, quantity: 1 },
        { id: 3, description: "T-shirt", size: "X-small", price: 50, quantity: 1 },
      ];
    }
  
    // Funktion för att rendera kundvagnen i DOM
    function renderCart() {
      const rows = cart.map((item) => {
        return `
          <tr data-id="${item.id}">
            <td><img src="" alt="Picture of item"></td>
            <td>
              <h3>${item.description}</h3>
              <p>${item.size}</p>
            </td>
            <td>
              <button type="button" class="qty-btn decrement">-</button>
              <input class="qty-input" type="numeric" value="${item.quantity}" min="1" max="999">
              <button type="button" class="qty-btn increment">+</button>
            </td>
            <td>${item.price} kr</td>
            <td><button type="button" class="edit-btn remove">Remove</button></td>
          </tr>
        `;
      }).join("");
  
      const totalRow = `
        <tr>
          <td></td>
          <td></td>
          <td id="total">Total:</td>
          <td>${calculateTotal()} kr</td>
          <td colspan="2"><button type="submit" id="checkout-btn">Checkout</button></td>
        </tr>
      `;
  
      cartTable.innerHTML = `
        <tr>
          <th></th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
        ${rows}
        ${totalRow}
      `;
    }
  
    // Räkna ut totalpris
    function calculateTotal() {
      return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    }
  
    // Händelsehanterare för hela tabellen
    cartTable.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      const itemId = Number(row?.dataset.id);
      const item = cart.find((product) => product.id === itemId);
  
      if (event.target.classList.contains("remove")) {
        // Ta bort produkt
        cart = cart.filter((product) => product.id !== itemId);
        renderCart();
        saveCart();
      } else if (event.target.classList.contains("increment")) {
        // Öka kvantitet
        item.quantity = Math.min(item.quantity + 1, 999);
        renderCart();
      } else if (event.target.classList.contains("decrement")) {
        // Minska kvantitet
        if (item.quantity > 1) {
          item.quantity -= 1;
          renderCart();
        }
      }
      updateTotal();
    });
  
    // Hantera ändringar i inputfält
    cartTable.addEventListener("input", (event) => {
      if (event.target.classList.contains("qty-input")) {
        const row = event.target.closest("tr");
        const itemId = Number(row.dataset.id);
        const item = cart.find((product) => product.id === itemId);
        const value = parseInt(event.target.value, 10);
  
        item.quantity = Math.min(Math.max(value, 1), 999) || 1; // Validera input
        renderCart();
      }
      updateTotal();
    });
  
    // Checkout-knappen
    checkoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
      alert("Your order has been successfully submitted");
    });
  
    // Starta med att rendera kundvagnen
    renderCart();
    updateTotal();
  });
  
  
  