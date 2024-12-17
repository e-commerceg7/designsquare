import { getProducts } from "./fetchProductData.js";

// Hämta formulär och knappar
const addProductButton = document.querySelector(".add-product-button-admin");
const addProductForm = document.getElementById("add-product-form");

// Globala variabler för redigering
let isEditing = false;
let editingProductId = null;

// Visa/dölj formuläret för att lägga till/redigera produkt
addProductButton.addEventListener("click", () => {
  resetForm();
  toggleFormVisibility();
});

// Hantera formulärets submit (skapa eller uppdatera produkt)
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const description = document.getElementById("product-description").value;
  const price = document.getElementById("product-price").value;
  const color = document.getElementById("product-color").value;
  const stock = document.getElementById("product-stock").value;
  const categories = document
    .getElementById("product-categories")
    .value.split(",")
    .map((category) => category.trim());
  const image = document.getElementById("product-image").value;

  const updatedProduct = {
    name,
    description,
    price,
    color,
    stock,
    categories,
    image,
  };

  if (isEditing) {
    await updateProduct(editingProductId, updatedProduct); // Anropa den externa updateProduct-funktionen
  } else {
    await createProduct(updatedProduct); // Skapa ny produkt om vi inte är i redigeringsläge
  }
});

// Skapa en ny produkt
async function createProduct(productData) {
  try {
    const url = "https://ecommerce-api-ashy-ten.vercel.app/products";
    const response = await fetch(url, {
      method: "POST", // POST för att skapa en produkt
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log("Product added successfully.");
      showAllProducts();
      resetForm();
    } else {
      console.error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateProduct(productId, productData) {
  try {
    // definierar API-url för att uppdatera produkten.
    const url = `https://ecommerce-api-ashy-ten.vercel.app/products/${productId}`;

    const response = await fetch(url, {
      method: "PUT", // Använd PUT för att uppdatera en produkt (express PUT för att uppdatera)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log("Product updated successfully.");
      showAllProducts(); // Uppdatera produktlistan
      resetForm(); // Återställ formuläret
    } else {
      console.error("Failed to update product.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteProduct(productId) {
  try {
    // URL för att identifiera produkten i databasen och radera den
    const url = `https://ecommerce-api-ashy-ten.vercel.app/products/${productId}`;

    const response = await fetch(url, {
      method: "DELETE", // Använd DELETE för att radera en produkt
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Product deleted successfully.");
      showAllProducts(); // Uppdatera produktlistan
    } else {
      console.error("Failed to delete product. Status:", response.status);
    }
  } catch (error) {
    console.error("Error during product deletion:", error);
  }
}

// Hämta alla produkter och visa dem
async function showAllProducts() {
  try {
    const products = await getProducts();

    if (products && products.length > 0) {
      displayProducts(products);
    } else {
      console.log("Inga produkter tillgängliga.");
    }
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
  }
}

function displayProducts(products) {
  const productList = document.querySelector(".admin-product-list");
  if (!productList) return;

  productList.innerHTML = ""; // Rensa befintlig lista

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description || "Ingen beskrivning"}</p>
      <p><strong>Pris:</strong> ${product.price.$numberDecimal} kr</p>
   

      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Koppla knappar till funktioner
    productCard.querySelector(".edit-btn").addEventListener("click", () => {
      setEditForm(product);
    });

    productCard.querySelector(".delete-btn").addEventListener("click", () => {
      deleteProduct(product._id);
    });

    productList.appendChild(productCard);
  });
}

// Sätt formulär för redigering
function setEditForm(product) {
  isEditing = true; // Indikerar att vi redigerar en produkt
  editingProductId = product._id; // Sparar produktens ID för uppdatering

  // Fyll formuläret med befintliga produktvärden
  document.getElementById("product-name").value = product.name || "";
  document.getElementById("product-description").value =
    product.description || "";
  document.getElementById("product-price").value =
    product.price?.$numberDecimal || product.price || "";
  document.getElementById("product-color").value = product.color || "";
  document.getElementById("product-stock").value = product.stock || "";
  document.getElementById("product-categories").value =
    product.categories?.join(", ") || "";
  document.getElementById("product-image").value = product.image || "";

  toggleFormVisibility(true); // Visa formuläret
}

// Återställ formuläret
function resetForm() {
  isEditing = false;
  editingProductId = null;
  addProductForm.reset();
}

// Växla synlighet på formuläret
function toggleFormVisibility(show = false) {
  if (show || addProductForm.style.display === "none") {
    addProductForm.style.display = "block";
  } else {
    addProductForm.style.display = "none";
  }
}

showAllProducts();
