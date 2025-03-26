import {
  convertCentToDollar,
  convertHTMLToNodeElement,
} from "./utils.js";
import { 
  EVENT_ADD_TO_CART,
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  ATTRIBUTE_DATA_PRODUCT_QUANTITY,
} from "./constants.js";
import {
  renderAddButtonHTML,
  renderQuantityStringHTML,
  renderSelectHTML,
} from "./render-add-button-html.js";

export function renderProductCard({
  id,
  stock,
  priceCents,
  quantity,
  image,
  name,
  rating
}) {
  const btnOptions = {
    attr: {
      'aria-disabled': 'false',
      [ATTRIBUTE_DATA_CONTROL]: EVENT_ADD_TO_CART,
      [ATTRIBUTE_DATA_PRODUCT_ID]: id,
      [ATTRIBUTE_DATA_PRODUCT_QUANTITY]: quantity || 1,
    },
  };
  const isCardActive = stock > 0;
  const productRateImgName = rating.stars * 10;
  const dollarPrice = convertCentToDollar(priceCents);
  const buttonHTML = renderAddButtonHTML(btnOptions);
  const quantityLeftHTML = renderQuantityStringHTML(stock);
  const selectHTML = renderSelectHTML({stock, id});
  const selectContent = stock === 0 ? 'No items left' :
                        stock === 1 ? stock :
                        selectHTML;
  const htmlTemplate = `
    <div class="product-container" id="${id}">
      <div class="product-image-container">
        <img class="product-image" src="${image}">
      </div>

      <div class="product-name limit-text-to-2-lines">${name}</div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productRateImgName}.png">
        <div class="product-rating-count link-primary">${rating.count}</div>
      </div>

      <div class="product-price">$${dollarPrice}</div>

      <div class="product-quantity-container">
        ${selectContent}
        ${stock < 5 ? quantityLeftHTML : ''}
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-message">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      ${!isCardActive ? '' : buttonHTML}
    </div>
  `;

  return convertHTMLToNodeElement(htmlTemplate);
}