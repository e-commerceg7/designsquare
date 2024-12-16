import { getProducts } from "./fetchProductData.js";
import { getCreateProductURL } from "./routes/createNewProduct.js";

// Hämta formulär och knapp logik för att lägga till en produkt
const addProductButton = document.querySelector(".add-product-button-admin");
const addProductForm = document.getElementById("add-product-form");

addProductButton.addEventListener("click", () => {
  if (
    addProductForm.style.display === "none" ||
    addProductForm.style.display === ""
  ) {
    addProductForm.style.display = "block"; // Visa formuläret för att lägga till en produkt
    addProductButton.style.display = "none"; // Dölj knappen
  } else {
    addProductForm.style.display = "none"; // Dölj formuläret
    addProductButton.style.display = "block"; // Visa knappen igen
  }
});

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hämta formulärvärden
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

  // Skicka POST-begäran till backend för att lägga till produkten
  try {
    const url = await getCreateProductURL();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        color,
        stock,
        categories,
        image,
      }),
    });

    if (response.ok) {
      const newProduct = await response.json();
      console.log("Product added:", newProduct);
      showAllProducts(); // Uppdatera produktlistan
      addProductForm.style.display = "none"; // Dölja formuläret
    } else {
      console.error("Error adding product");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Hämta alla produkter och visa dem
const productList = document.querySelector(".admin-product-list");
async function showAllProducts() {
  try {
    const products = await getProducts();

    if (products && products.length > 0) {
      displayProducts(products);
    } else {
      productList.innerHTML = "<p>Inga produkter tillgängliga</p>";
    }
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    productList.innerHTML = "<p>Fel vid hämtning av produkter</p>";
  }
}

function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.image || "#";
    productImage.alt = product.name;

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("p");
    productName.classList.add("product-name");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = `${
      product.price?.$numberDecimal || "Okänt pris"
    } kr`;

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Edit-knapp
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editProductForm(product);
    });

    // Delete-knapp
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteProduct(product._id);
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    productCard.appendChild(buttonContainer);

    productList.appendChild(productCard);
  });
}

showAllProducts();

// Funktion för att uppdatera produkt
async function editProductForm(product) {
  // Visa formulär för att redigera produkt
  addProductForm.style.display = "block";
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-description").value = product.description;
  document.getElementById("product-price").value =
    product.price?.$numberDecimal;
  document.getElementById("product-color").value = product.color;
  document.getElementById("product-stock").value = product.stock;
  document.getElementById("product-categories").value =
    product.categories.join(",");
  document.getElementById("product-image").value = product.image;

  // Ändra formulärets submit-funktion för att uppdatera produkten
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;
    const color = document.getElementById("product-color").value;
    const stock = document.getElementById("product-stock").value;
    const categories = document
      .getElementById("product-categories")
      .value.split(",");
    const image = document.getElementById("product-image").value;

    try {
      const response = await fetch(`${getProducts()}/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          color,
          stock,
          categories,
          image,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Product updated:", updatedProduct);
        showAllProducts(); // Uppdatera produktlistan
        addProductForm.style.display = "none"; // Dölja formuläret
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

// Funktion för att radera produkt
async function deleteProduct(productId) {
  try {
    const response = await fetch(`${getProducts()}/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Product deleted");
      showAllProducts(); // Uppdatera produktlistan
    } else {
      console.error("Error deleting product");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
