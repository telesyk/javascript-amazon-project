import { 
  createIntArray,
  convertAttrToString,
  getItemsQuantity,
  convertCentToDollar,
  getNextDate,
  getFormatedDateString,
  convertHTMLToNodeElement,
  getCheckoutPrices,
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
  ATTRIBUTE_DELIVERY_DATE,
  EVENT_CHANGE_DELIVERY_OPTION,
  SELECTOR_PAYMENT_SUMMARY,
  ATTRIBUTE_DELIVERY_PRICE,
  EVENT_REMOVE_FROM_CART,
} from "./constants.js";
import { deliveryOptions } from "../data/delivery-options.js";

function renderQuantityStringHTML(quantity) {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
}

function renderSelectHTML({id, stock}) {
  if (!stock || !id) return '';

  const optionsList = createIntArray(stock);

  return `
    <select 
      ${ATTRIBUTE_DATA_CONTROL}=${EVENT_SET_ITEM_QUANTITY} 
      ${ATTRIBUTE_DATA_PRODUCT_ID}=${id}
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

  return convertHTMLToNodeElement(htmlTemplate);
}

export function renderProducts(productsList) {
  if (!productsList) return;

  const elementProducts = document.querySelector(SELECTOR_PRODUCT_GRID);
  const fragmentProducts = new DocumentFragment();
  
  productsList.forEach(product => {
    const productElement = renderProductCard(product);
  
    fragmentProducts.append(productElement);
  });
  
  elementProducts.append(fragmentProducts);
}

function renderCheckoutHeaderItemsHTML(quantity) {
  if (!quantity) return '';

  const text = quantity !== 1 ? 'items' : 'item';

  return `
    Checkout (<a class="return-to-home-link" href="index.html">
      ${quantity} ${text}
    </a>)
  `;
}

function renderDeliveryOptionHTML({
  index,
  name,
  price,
  dateValue,
  isChecked,
}) {
  const deliveryDateString = getFormatedDateString( getNextDate(dateValue) );
  const attributeDeliveryDate = `${ATTRIBUTE_DELIVERY_DATE}="${deliveryDateString}"`;
  const attributeDeliveryPrice = `${ATTRIBUTE_DELIVERY_PRICE}="${price}"`;
  const attributeDataControl = `${ATTRIBUTE_DATA_CONTROL}="${EVENT_CHANGE_DELIVERY_OPTION}"`;

  return `
    <label class="delivery-option">
      <input 
        class="delivery-option-input"
        type="radio"
        name="delivery-option-${index}"
        ${attributeDeliveryPrice}
        ${attributeDataControl}
        ${!dateValue ? '' : attributeDeliveryDate}
        ${!isChecked ? '' : 'checked'} 
      />
      <div>
        <div class="delivery-option-date">Within ${dateValue} ${dateValue !== 1 ? 'days' : 'day'}</div>
        <div class="delivery-option-price">${name}</div>
      </div>
    </label>
  `;
}

export function renderPaymentSummary({
  quantity,
  productsPrice,
  shippingPrice,
}) {
  const summaryBeforeTax = productsPrice + shippingPrice;
  const taxPrice = 0.1 * summaryBeforeTax;
  const summaryPrice = taxPrice + summaryBeforeTax;

  const template = `
  <div>
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${convertCentToDollar(productsPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${convertCentToDollar(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${convertCentToDollar(summaryBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${convertCentToDollar(taxPrice)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${convertCentToDollar(summaryPrice)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
  `;

  return convertHTMLToNodeElement(template);
}

function renderCheckoutItem({
  id,
  priceCents,
  quantity,
  image,
  name,
  index,
}) {
  const dollarPrice = convertCentToDollar(priceCents);
  const deliveryOptionsHTML = deliveryOptions.reduce((html, option) => {
    const optionHTML = renderDeliveryOptionHTML({...option, index});
    return html + optionHTML;
  }, '');
  const deliveryOptionChecked = deliveryOptions.filter(option => option.isChecked)[0];
  const deliveryDateString = getFormatedDateString( getNextDate(deliveryOptionChecked.dateValue) );
  const attributeDeleteDataControl = `${ATTRIBUTE_DATA_CONTROL}="${EVENT_REMOVE_FROM_CART}"`;
  const template = `
    <div class="cart-item-container" id="${id}">
      <div class="delivery-date">
        Delivery date: <span class="js-checkout-item-delivery-date">${deliveryDateString}</span>
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
            <button class="update-quantity-link link-primary">
              Update
            </button>
            <button 
              class="delete-quantity-link link-primary" 
              ${attributeDeleteDataControl}
            >
              Delete
            </button>
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

  return convertHTMLToNodeElement(template);
}

export function renderCheckout(cartProducts) {
  if (!cartProducts) return;

  const cartItemsQuantity = getItemsQuantity(cartProducts);
  const elementHeaderItems = document.querySelector(SELECTOR_CHECKOUT_HEADER_ITEMS);
  const elementCheckoutList = document.querySelector(SELECTOR_CHECKOUT_LIST);
  const headerItemsHTML = renderCheckoutHeaderItemsHTML(cartItemsQuantity);
  const fragmentCheckout = document.createDocumentFragment();
  const elementPaymentSummaryContainer = document.querySelector(SELECTOR_PAYMENT_SUMMARY);
  const checkoutPrices = getCheckoutPrices();
  const elementPaymentSummary = renderPaymentSummary({
    quantity: cartItemsQuantity,
    productsPrice: checkoutPrices.productsPrice,
    shippingPrice: checkoutPrices.shippingPrice
  });

  elementCheckoutList.innerHTML = ''; // used when need to re-render checkout

  if (cartProducts.length < 1) {
    const emptyListContainer = `
      <p>You have yet <a href="/" title="Products page">nothing</a> in a cart</p>
    `;
    elementCheckoutList.innerHTML = emptyListContainer;
  } else {
    cartProducts.forEach((product, index) => {
      const checkoutItemElement = renderCheckoutItem({...product, index});
    
      fragmentCheckout.append(checkoutItemElement);
    });
    elementCheckoutList.append(fragmentCheckout);
  }

  elementHeaderItems.innerHTML = headerItemsHTML;
  elementPaymentSummaryContainer.innerHTML = elementPaymentSummary.innerHTML;
}
