import { getProducts, productList, displayProducts, 
    filterAndDisplay, filteredProducts, sortProducts, 
    filterProducts, loadingFilter, getSubcategories, 
    createCategoryFilter, currentProducts, filterContainer,
    sortDropdown} from "./fetchProductData.js";



loadingFilter("men")
filterAndDisplay("men")