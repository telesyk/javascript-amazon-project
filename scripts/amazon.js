/**
 * @constant PRODUCTS - data loaded to the HTML page directly
 * @function renderProducts - make the rendering of all products, take the data from 'data/products.js'
 *  */
import { PRODUCTS } from "../data/products.js";
import { renderAddButton, renderQuantityStringHTML, renderSelectHTML } from "./render.js";

const renderProductTemplate = (product) => {
  if (!product) return;

  const isCardActive = product.quantity > 0;
  const productRateImgName = product.rating.stars * 10;
  const productPrice = (product.priceCents / 100).toFixed(2);
  const quantityHTML = renderQuantityStringHTML(product.quantity);
  const selectHTML = renderSelectHTML(product.quantity);
  const selectContent = product.quantity === 0 ? 'No items left' :
                        product.quantity === 1 ? product.quantity :
                        selectHTML;
  const btnOptions = {
    attr: [{
      'aria-disabled': 'false',
      'data-control': 'add-to-card'
    }],
  };
  const buttonHTML = renderAddButton(btnOptions);

  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">${product.name}</div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productRateImgName}.png">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>

      <div class="product-price">$${productPrice}</div>

      <div class="product-quantity-container">
        ${selectContent}
        ${product.quantity < 5 ? quantityHTML : ''}
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      ${!isCardActive ? '' : buttonHTML}
    </div>
  `;
};

const renderProducts = (productsList) => {
  if (!productsList) return;

  const productsElement = document.querySelector('#jsProductsGrid');
  const productsFragment = new DocumentFragment();
  
  productsList.forEach(item => {
    const productsTemplate = renderProductTemplate(item);
    const parser = new DOMParser();
    const productParsed = parser.parseFromString(productsTemplate, 'text/html');
  
    productsFragment.append(productParsed.body.firstChild);
  });
  
  productsElement.append(productsFragment);
};

renderProducts(PRODUCTS);
