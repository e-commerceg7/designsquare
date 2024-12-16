import {filterAndDisplaySearch} from "./fetchProductData.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('search');
filterAndDisplaySearch(search);
