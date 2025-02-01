import { 
  createIntArray,
  convertAttrToString,
  getItemsQuantity,
  convertCentToDollar
} from "./utils.js";
import { 
  EVENT_ADD_TO_CART,
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  SELECTOR_PRODUCT_GRID,
  EVENT_SET_ITEM_QUANTITY,
  ATTRIBUTE_DATA_PRODUCT_QUANTITY,
  SELECTOR_CHECKOUT_HEADER_ITEMS,
  SELECTOR_CHECKOUT_LIST,
} from "./constants.js";
import { deliveryOptions } from "../data/delivery-options.js";

function renderQuantityStringHTML(quantity) {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
}

function renderSelectHTML(data) {
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

function renderAddButtonHTML(options) {
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

function renderProductCard(data) {
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
  const btnOptions = {
    attr: [{
      'aria-disabled': 'false',
      [ATTRIBUTE_DATA_CONTROL]: EVENT_ADD_TO_CART,
      [ATTRIBUTE_DATA_PRODUCT_ID]: id,
      [ATTRIBUTE_DATA_PRODUCT_QUANTITY]: quantity || 1,
    }],
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
  const parser = new DOMParser();
  const element = parser.parseFromString(htmlTemplate, 'text/html');

  return element.body.firstChild;
}

export function renderProducts(productsList) {
  if (!productsList) return;

  const productsElement = document.querySelector(SELECTOR_PRODUCT_GRID);
  const productsFragment = new DocumentFragment();
  
  productsList.forEach(product => {
    const productElement = renderProductCard(product);
  
    productsFragment.append(productElement);
  });
  
  productsElement.append(productsFragment);
}

function renderCheckoutHeaderItemsHTML(quantity) {
  if (!quantity) return;

  const text = quantity !== 1 ? 'items' : 'item';

  return `
    Checkout (<a class="return-to-home-link" href="amazon.html">
      ${quantity} ${text}
    </a>)
  `;
}

function renderDeliveryOptionHTML(data) {
  if (!data) return;

  const {
    index,
    deliveryDate,
    deliveryName,
    attributes,
    isChecked,
  } = data;
  const attrString = convertAttrToString(attributes);

  return `
    <label class="delivery-option">
      <input 
        class="delivery-option-input"
        name="delivery-option-${index}"
        type="radio"
        ${!attributes ? '' : attrString}
        ${!isChecked ? '' : 'checked'} 
      />
      <div>
        <div class="delivery-option-date">${deliveryDate}</div>
        <div class="delivery-option-price">${deliveryName}</div>
      </div>
    </label>
  `;
}

function renderCheckoutItem(data) {
  if (!data) return;

  const {
    id,
    priceCents,
    quantity,
    image,
    name,
    index,
  } = data;
  const dollarPrice = convertCentToDollar(priceCents);
  const deliveryOptionsHTML = deliveryOptions.reduce((html, option) => {
    const optionHTML = renderDeliveryOptionHTML({...option, index});
    return html + optionHTML;
  }, '');
  const template = `
    <div class="cart-item-container" id="${id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${image}" />
        <div class="cart-item-details">
          <div class="product-name">${name}</div>
          <div class="product-price">$${dollarPrice}</div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML}
        </div>
      </div>
    </div>
  `;
  const parser = new DOMParser();
  const element = parser.parseFromString(template, 'text/html');

  return element.body.firstChild;
}

export function renderCheckout(cartProducts) {
  if (!cartProducts) return;

  const cartItemsQuantity = getItemsQuantity(cartProducts);
  const headerItemsElement = document.querySelector(SELECTOR_CHECKOUT_HEADER_ITEMS);
  const checkoutOrderListElement = document.querySelector(SELECTOR_CHECKOUT_LIST);
  const headerItemsHTML = renderCheckoutHeaderItemsHTML(cartItemsQuantity);
  const fragmentElement = document.createDocumentFragment();

  cartProducts.forEach((product, index) => {
    const checkoutItemElement = renderCheckoutItem({...product, index});
  
    fragmentElement.append(checkoutItemElement);
  });

  headerItemsElement.innerHTML = headerItemsHTML;
  checkoutOrderListElement.append(fragmentElement);
}
