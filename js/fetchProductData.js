export async function getProducts() {
  try {
    const response = await fetch(
      "https://ecommerce-api-ashy-ten.vercel.app/products"
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


    productCard.innerHTML = `
          <a href="product_description.html?id=${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
          <div class="product-info">
            <p class="product-name">${product.name}</p>
            <p class="product-price">${product.price.$numberDecimal} kr</p>
          </div>
    `


    // const productImage = document.createElement("img");
    // productImage.src = product.image || "#";
    // productImage.alt = product.name;

    // const productInfo = document.createElement("div");
    // productInfo.classList.add("product-info");

    // const productName = document.createElement("p");
    // productName.classList.add("product-name");
    // productName.textContent = product.name;

    // const price = product.price?.$numberDecimal || "Okänt pris";
    // const productPrice = document.createElement("p");
    // productPrice.classList.add("product-price");
    // productPrice.textContent = `${price} kr`;

    // productInfo.appendChild(productName);
    // productInfo.appendChild(productPrice);
    // productCard.appendChild(productImage);
    // productCard.appendChild(productInfo);
    productList.appendChild(productCard);
  });
}


export let filteredProducts = []
export async function filterAndDisplay(category1, category2 = null) {
  const products = await getProducts();

  // Filtrera baserat på kategori
  filteredProducts = products.filter((product) =>
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

export function sortProducts(sortBy) {
  const sortedProducts = [...filteredProducts]
  if (sortBy === "date-desc") {
    sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortBy === "price-asc") {
    sortedProducts.sort((a, b)=> a.price - b.price)
  } else if (order === "price-desc") {
    sortedProducts.sort((a, b)=> b.price - a.price)
  }

  return sortedProducts
}


export async function filterAndDisplaySearch(search) {
  const products = await getProducts();

  search = search.toLowerCase();

  // Filtrera baserat på kategori or name or color
  const filteredProducts = products.filter((product) =>
   product.categories.includes(search) || product.name.toLowerCase() === search || product.color.toLowerCase() === search
  );

  console.log(`Produkter with search ${search}:`, filteredProducts);
  displayProducts(filteredProducts);
}