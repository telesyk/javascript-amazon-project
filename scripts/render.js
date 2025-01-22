import { createArr, getStringAttributes } from "./utils.js";
import { 
  EVENT_ADD_TO_CART,
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
} from "./constants.js";

export const renderQuantityStringHTML = (quantity) => {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
};

export const renderSelectHTML = (count) => {
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

export const renderAddButton = (options) => {
  const buttonText = !options?.content ? 'Add to Cart' : options.content;
  const attrString = !options.attr ? '' : getStringAttributes(options.attr);

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

  const isCardActive = data.quantity > 0;
  const productRateImgName = data.rating.stars * 10;
  const productPrice = (data.priceCents / 100).toFixed(2);
  const quantityHTML = renderQuantityStringHTML(data.quantity);
  const selectHTML = renderSelectHTML(data.quantity);
  const selectContent = data.quantity === 0 ? 'No items left' :
                        data.quantity === 1 ? data.quantity :
                        selectHTML;
  const btnOptions = {
    attr: [{
      'aria-disabled': 'false',
      [ATTRIBUTE_DATA_CONTROL]: EVENT_ADD_TO_CART,
      [ATTRIBUTE_DATA_PRODUCT_ID]: data.id,
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
        ${data.quantity < 5 ? quantityHTML : ''}
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
