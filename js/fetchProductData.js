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
    console.log(
      `Produkter i kategori ${category1} och ${category2}:`,
      filteredProducts
    );
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
    sortedProducts.sort((a, b)=> a.price.$numberDecimal - b.price.$numberDecimal)
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b)=> b.price.$numberDecimal - a.price.$numberDecimal)
  }

  return sortedProducts
}


export async function filterAndDisplaySearch(search) {
  const products = await getProducts();

  search = search.toLowerCase();

  // Filtrera baserat på kategori or name or color
  const filteredProducts = products.filter(
    (product) =>
      product.categories.includes(search) ||
      product.name.toLowerCase() === search ||
      product.color.toLowerCase() === search
  );

  console.log(`Produkter with search ${search}:`, filteredProducts);
  displayProducts(filteredProducts);
}





