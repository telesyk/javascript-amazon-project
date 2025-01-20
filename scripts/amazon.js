/**
 * @constant PRODUCTS - data loaded to the HTML page directly
 * @function renderProducts - make the rendering of all products, take the data from data/products.js
 *  */
renderProducts(PRODUCTS);

function renderProducts(productsList) {
  if (!productsList) return;

  const productsElement = document.querySelector('#jsProductsGrid');
  const productsFragment = new DocumentFragment();

  const renderQuantityHTML = (quantity) => {
    if (!quantity) return '';

    return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
  };

  const renderSelectHTML = (count) => {
    if (!count) return '';

    const optionsList = createArr(count);

    return `
      <select>
        ${optionsList.map((item, index) => {
          if (index === 0) {
            return `<option selected value="${item}">${item}</option>`;
          }
          return `<option value="${item}">${item}</option>`;
        })}
      </select>
    `;
  };

  const renderProductTemplate = (product) => {
    if (!product) return;

    const isCardActive = product.quantity > 0;
    const productRateImgName = product.rating.stars * 10;
    const productPrice = (product.priceCents / 100).toFixed(2);
    const quantityHTML = renderQuantityHTML(product.quantity);
    const selectHTML = renderSelectHTML(product.quantity);
    const selectContent = product.quantity === 0 ? 'No items left' :
                          product.quantity === 1 ? product.quantity :
                          selectHTML;

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
  
        <button aria-disabled="false" ${isCardActive ? '' : 'disabled'} class="add-to-cart-button button-primary">
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

function createArr(count) {
  let newArr = [];

  for (let i = 0; i < count; i++) {
    newArr.push('' + (i + 1));
  }

  return newArr;
}
