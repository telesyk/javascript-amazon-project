import { createIntArray, convertAttrToString } from "./utils.js";
import { 
  EVENT_ADD_TO_CART,
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  SELECTOR_PRODUCT_GRID,
  EVENT_SET_ITEM_QUANTITY,
  ATTRIBUTE_DATA_PRODUCT_QUANTITY,
} from "./constants.js";

export const renderQuantityStringHTML = (quantity) => {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
};

export const renderSelectHTML = (stockCount) => {
  if (!stockCount) return '';

  const optionsList = createIntArray(stockCount);

  return `
    <select ${ATTRIBUTE_DATA_CONTROL}=${EVENT_SET_ITEM_QUANTITY}>
      ${optionsList.map((item, index) => {
        if (index === 0) {
          return `<option selected value="${item}">${item}</option>`;
        }
        return `<option value="${item}">${item}</option>`;
      })}
    </select>
  `;
};

export const renderAddButton = (options) => {
  const buttonText = !options?.content ? 'Add to Cart' : options.content;
  const attrString = !options.attr ? '' : convertAttrToString(options.attr);

  return `
    <button 
      ${attrString}
      class="add-to-cart-button button-primary">
      ${buttonText}
    </button>
  `;
};

export const renderProductCard = (data) => {
  if (!data) return;

  const isCardActive = data.stock > 0;
  const productRateImgName = data.rating.stars * 10;
  const productPrice = (data.priceCents / 100).toFixed(2);
  const quantityLeftHTML = renderQuantityStringHTML(data.stock);
  const selectHTML = renderSelectHTML(data.stock);
  const selectContent = data.stock === 0 ? 'No items left' :
                        data.stock === 1 ? data.stock :
                        selectHTML;
  const btnOptions = {
    attr: [{
      'aria-disabled': 'false',
      [ATTRIBUTE_DATA_CONTROL]: EVENT_ADD_TO_CART,
      [ATTRIBUTE_DATA_PRODUCT_ID]: data.id,
      [ATTRIBUTE_DATA_PRODUCT_QUANTITY]: data.quantity || 1,
    }],
  };
  const buttonHTML = renderAddButton(btnOptions);

  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${data.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">${data.name}</div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productRateImgName}.png">
        <div class="product-rating-count link-primary">${data.rating.count}</div>
      </div>

      <div class="product-price">$${productPrice}</div>

      <div class="product-quantity-container">
        ${selectContent}
        ${data.stock < 5 ? quantityLeftHTML : ''}
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

export const renderProducts = (productsList) => {
  if (!productsList) return;

  const productsElement = document.querySelector(SELECTOR_PRODUCT_GRID);
  const productsFragment = new DocumentFragment();
  
  productsList.forEach(item => {
    const productsTemplate = renderProductCard(item);
    const parser = new DOMParser();
    const productParsed = parser.parseFromString(productsTemplate, 'text/html');
  
    productsFragment.append(productParsed.body.firstChild);
  });
  
  productsElement.append(productsFragment);
};
