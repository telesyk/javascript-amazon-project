import {
  getItemsQuantity,
  getCheckoutPrices,
} from "../utils.js";
import {
  SELECTOR_CHECKOUT_HEADER_ITEMS,
  SELECTOR_CHECKOUT_LIST,
  SELECTOR_PAYMENT_SUMMARY,
} from "../constants.js";

import {
  renderCheckoutItem,
  renderPaymentSummary,
  renderCheckoutHeaderItemsHTML,
} from "../render.js";

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