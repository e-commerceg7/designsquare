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
  
  if(products.length === 0) {
     productList.innerHTML = "<p>Sorry, we couldn't find any products here.</p>"
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");


    productCard.innerHTML = `
          <a href="product_description.html?id=${product._id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy"/>
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



// Below are functions for loading category-buttons on product-list pages

export let currentProducts = []
export const filterContainer = document.getElementById("filter-container")

export async function filterProducts (category) {
  const products = await getProducts()
  filteredProducts = products.filter((product) => 
    product.categories.includes(category)
  )
  return filteredProducts
}


export async function loadingFilter(category){
  currentProducts = await filterProducts(category)
  const subcategories = getSubcategories(currentProducts)
  console.log(subcategories)
  createCategoryFilter(category, subcategories)
}

export function getSubcategories (products) {
  console.log( "Received products:", products)
  if(!Array.isArray(products)) {
      console.error("Error: Expected an array, but received:", products);
      return [];
  }
  const subcategories = new Set()
  products.forEach((product)=>{
      if(product.categories[1]) {
          subcategories.add(product.categories[1])
      }
  })
  console.log(subcategories)
  return Array.from(subcategories)
}

export function createCategoryFilter(category, subcategories){
  filterContainer.innerHTML = ""
  const allCategoryBtn = document.createElement("button")
  allCategoryBtn.textContent = "All Categories"
  allCategoryBtn.classList.add("category-button")
  allCategoryBtn.addEventListener("click", ()=>[
    filterAndDisplay(category)
  ])
  filterContainer.appendChild(allCategoryBtn)

  subcategories.forEach((subcategory) => {
      const button = document.createElement("button")
      button.textContent = subcategory
      button.classList.add("category-button")
      button.addEventListener("click", ()=>{
          filterAndDisplay(category, subcategory)
      })
      filterContainer.appendChild(button)
  })
  
}

// functions for sort-dropdown on product-list pages

export function sorteraProducts () {
  const sortDropdown = document.getElementById("sort-products")
  sortDropdown.addEventListener("change", (event)=>{
    const sortBy = event.target.value
    const sortedProducts = sortProducts(sortBy)
    displayProducts(sortedProducts)
})
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
