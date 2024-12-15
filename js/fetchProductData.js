export async function getProducts() {
  try {
    const response = await fetch(
      "https://ecommerce-api-seven-omega.vercel.app/products"
    );
    if (!response.ok) {
      throw new Error("Något gick fel vid hämtning av produkterna");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("fel vid hämtning av produkter:", error);
  }
}

export const productList = document.querySelector(".product-list");

//***add <a>to wrap img to link to product detail page (need product ID)
export function displayProducts(products) {
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

export async function filterAndDisplay(category1, category2 = null) {
  const products = await getProducts();

  // Filtrera baserat på kategori
  const filteredProducts = products.filter((product) =>
    category2 
      ? product.categories.includes(category1) && product.categories.includes(category2)
      : product.categories.includes(category1)
  );

  if (category2) {
    console.log(`Produkter i kategori ${category1} och ${category2}:`, filteredProducts);
  } else {
    console.log(`Produkter i kategori ${category1}:`, filteredProducts);
  }
  displayProducts(filteredProducts);
}