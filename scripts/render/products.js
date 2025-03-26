import {
  SELECTOR_PRODUCT_GRID,
} from "../constants.js";

import { renderProductCard } from "../render.js";


export function renderProducts(productsList) {
  if (!productsList) return;

  const elementProducts = document.querySelector(SELECTOR_PRODUCT_GRID);
  const fragmentProducts = new DocumentFragment();
  
  productsList.forEach(product => {
    const productElement = renderProductCard(product);
  
    fragmentProducts.append(productElement);
  });
  
  elementProducts.append(fragmentProducts);
}