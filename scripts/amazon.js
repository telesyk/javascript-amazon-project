import { PRODUCTS } from '../data/products.js';

function renderProducts() {
  const productsElement = document.querySelector('#jsProductsGrid');
  const productsFragment = new DocumentFragment();
  
  PRODUCTS.forEach(item => {
    const productsTemplate = `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${item.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${item.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${item.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${item.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          $${item.priceCents / 100}
        </div>
  
        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
  
        <div class="product-spacer"></div>
  
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>
    `;
    const parser = new DOMParser();
    const productParsed = parser.parseFromString(productsTemplate, 'text/html');
  
    productsFragment.append(productParsed.body.firstChild);
  });
  
  productsElement.append(productsFragment);
}

renderProducts();
