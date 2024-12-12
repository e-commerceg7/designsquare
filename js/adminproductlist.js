import { getProducts } from "./fetchProductData.js";

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

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      console.log(`Edit product: ${product.name}`);
      // Lägg till logik för redigering här
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      console.log(`Delete product: ${product.name}`);
      // Lägg till logik för borttagning här
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    productCard.appendChild(buttonContainer);

    productList.appendChild(productCard);
  });
}

showAllProducts();
