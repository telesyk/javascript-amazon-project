/**
 * @constant PRODUCTS - data loaded to the HTML page directly
 * @function renderProducts - make the rendering of all products, take the data from data/products.js
 *  */
renderProducts(PRODUCTS);

function renderProducts(productsList) {
  if (!productsList) return;

  const productsElement = document.querySelector('#jsProductsGrid');
  const productsFragment = new DocumentFragment();

  const renderProductTemplate = (product) => {
    if (!product) return;

    return `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          $${product.priceCents / 100}
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
  };
  
  productsList.forEach(item => {
    const productsTemplate = renderProductTemplate(item);
    const parser = new DOMParser();
    const productParsed = parser.parseFromString(productsTemplate, 'text/html');
  
    productsFragment.append(productParsed.body.firstChild);
  });
  
  productsElement.append(productsFragment);
}
