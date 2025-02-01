import { createIntArray, convertAttrToString, updateCartState, getItemsQuantity } from "./utils.js";
import { 
  EVENT_ADD_TO_CART,
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  SELECTOR_PRODUCT_GRID,
  EVENT_SET_ITEM_QUANTITY,
  ATTRIBUTE_DATA_PRODUCT_QUANTITY,
  SELECTOR_CHECKOUT_HEADER_ITEMS,
} from "./constants.js";

export function renderQuantityStringHTML(quantity) {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
}

export function renderSelectHTML(data) {
  if (!data || !data.stock || !data.id) return '';

  const optionsList = createIntArray(data.stock);

  return `
    <select 
      ${ATTRIBUTE_DATA_CONTROL}=${EVENT_SET_ITEM_QUANTITY} 
      ${ATTRIBUTE_DATA_PRODUCT_ID}=${data.id}
    >
      ${optionsList.map((value, index) => {
        if (index === 0) {
          return `<option selected value="${value}">${value}</option>`;
        }
        return `<option value="${value}">${value}</option>`;
      })}
    </select>
  `;
}

export function renderAddButtonHTML(options) {
  const buttonText = !options?.content ? 'Add to Cart' : options.content;
  const attrString = !options.attr ? '' : convertAttrToString(options.attr);

  return `
    <button 
      ${attrString}
      class="add-to-cart-button button-primary">
      ${buttonText}
    </button>
  `;
}

export function renderProductCard(data) {
  if (!data) return;

  const {
    id,
    stock,
    priceCents,
    quantity,
    image,
    name,
    rating
  } = data;
  const isCardActive = stock > 0;
  const productRateImgName = rating.stars * 10;
  const productPrice = (priceCents / 100).toFixed(2);
  const quantityLeftHTML = renderQuantityStringHTML(stock);
  const selectHTML = renderSelectHTML({stock, id});
  const selectContent = stock === 0 ? 'No items left' :
                        stock === 1 ? stock :
                        selectHTML;
  const btnOptions = {
    attr: [{
      'aria-disabled': 'false',
      [ATTRIBUTE_DATA_CONTROL]: EVENT_ADD_TO_CART,
      [ATTRIBUTE_DATA_PRODUCT_ID]: id,
      [ATTRIBUTE_DATA_PRODUCT_QUANTITY]: quantity || 1,
    }],
  };
  const buttonHTML = renderAddButtonHTML(btnOptions);
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

      <div class="product-price">$${productPrice}</div>

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
  const parser = new DOMParser();
  const element = parser.parseFromString(htmlTemplate, 'text/html');

  return element.body.firstChild;
}

export function renderProducts(productsList) {
  if (!productsList) return;

  const productsElement = document.querySelector(SELECTOR_PRODUCT_GRID);
  const productsFragment = new DocumentFragment();
  
  productsList.forEach(cardData => {
    const productCardElement = renderProductCard(cardData);
  
    productsFragment.append(productCardElement);
  });
  
  productsElement.append(productsFragment);
}

export function renderCheckoutHeaderItems(quantity) {
  if (!quantity) return;

  const text = quantity !== 1 ? 'items' : 'item';

  return `
    Checkout (<a class="return-to-home-link" href="amazon.html">
      ${quantity} ${text}
    </a>)
  `;
}

export function renderCheckout(data) {
  if (!data) return;

  const cartItemsQuantity = getItemsQuantity(data);
  const headerItemsElement = document.querySelector(SELECTOR_CHECKOUT_HEADER_ITEMS);
  const headerItemsHTML = renderCheckoutHeaderItems(cartItemsQuantity);
  
  headerItemsElement.innerHTML = headerItemsHTML;
}
