const womenLink = document.getElementById("women-link");
const menLink = document.getElementById("men-link");
const childrenLink = document.getElementById("children-link");
const womenFilter = document.getElementById("women-filter");
const menFilter = document.getElementById("men-filter");
const childrenFilter = document.getElementById("children-filter");
import { getProducts } from "./fetchProductData.js";
const productList = document.querySelector(".product-list");

//***add <a>to wrap img to link to product detail page (need product ID)

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

    const price = product.price?.$numberDecimal || "Okänt pris";
    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = `${price} kr`;

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    productList.appendChild(productCard);
  });
}

async function filterAndDisplay(category) {
  const products = await getProducts();

  // Filtrera baserat på kategori
  const filteredProducts = products.filter((product) =>
    product.categories.includes(category)
  );

  console.log(`Produkter i kategori ${category}:`, filteredProducts);
  displayProducts(filteredProducts);
}

womenLink.addEventListener("click", () => {
  womenFilter.classList.add("active");
  menFilter.classList.remove("active");
  childrenFilter.classList.remove("active");
  filterAndDisplay("women");
});

menLink.addEventListener("click", () => {
  menFilter.classList.add("active");
  womenFilter.classList.remove("active");
  childrenFilter.classList.remove("active");
  filterAndDisplay("men");
});

childrenLink.addEventListener("click", () => {
  childrenFilter.classList.add("active");
  womenFilter.classList.remove("active");
  menFilter.classList.remove("active");
  filterAndDisplay("children");
});
