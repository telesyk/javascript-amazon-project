/**
 * @constant PRODUCTS - data loaded to the HTML page directly
 * @function renderProducts - make the rendering of all products, take the data from 'data/products.js'
 *  */
import { PRODUCTS } from "../data/products.js";
import { renderProductCard } from "./render.js";
import { onClick } from "./actions.js";
import { 
  SELECTOR_PRODUCT_ELEMENT, 
  ATTRIBUTE_DATA_CONTROL,
} from "./constants.js";

const renderProducts = (productsList) => {
  if (!productsList) return;

  const productsElement = document.querySelector(SELECTOR_PRODUCT_ELEMENT);
  const productsFragment = new DocumentFragment();
  
  productsList.forEach(item => {
    const productsTemplate = renderProductCard(item);
    const parser = new DOMParser();
    const productParsed = parser.parseFromString(productsTemplate, 'text/html');
  
    productsFragment.append(productParsed.body.firstChild);
  });
  
  productsElement.append(productsFragment);
};

renderProducts(PRODUCTS);

document.addEventListener('click', (event) => {
  const isClickEventElement = event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL);
  
  if (!isClickEventElement) return;
  
  onClick(event.target);
});
