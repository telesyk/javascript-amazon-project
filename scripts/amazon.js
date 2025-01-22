import { PRODUCTS } from "../data/products.js";
import { renderProducts } from "./render.js";
import { onClick } from "./actions.js";
import {
  ATTRIBUTE_DATA_CONTROL,
} from "./constants.js";
import { updateCartCount } from "./utils.js";

renderProducts(PRODUCTS);
updateCartCount();

document.addEventListener('click', (event) => {
  const isClickEventElement = event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL);
  
  if (!isClickEventElement) return;
  
  onClick(event.target);
});
