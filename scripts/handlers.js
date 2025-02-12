import { renderPaymentSummary, renderProductCard } from "./render.js";
import { 
  setCheckoutState,
  getCheckoutPrices,
  getCurrentProductData,
  groupCartItems,
  updateAddedMessage,
  updateCartQuantity,
  updateCartState,
} from "./utils.js";
import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  SELECTOR_CHECKOUT_DELIVERY_DATE,
  SELECTOR_PAYMENT_SUMMARY,
} from "./constants.js";

export function handleAddToCartEvent(target) {
  const productID = target.dataset.productId;
  const productQuantity = Number(target.dataset.productQuantity);
  const currentProductData = getCurrentProductData(productID, productQuantity);
  const currentCartState = updateCartState();
  const newCartState = groupCartItems(currentCartState, currentProductData);
  const elementProduct = document.getElementById(productID);

  updateCartState(newCartState);
  updateCartQuantity(newCartState);

  const elementNewProduct = renderProductCard(currentProductData);
  elementProduct.innerHTML = elementNewProduct.innerHTML;

  if (currentProductData) updateAddedMessage(elementProduct); // display message/alert "Product added"
}

export function handleChangeQuantity(target) {
  const elementCardContainer = document.getElementById(target.dataset.productId);
  const buttonSelector = `[${ATTRIBUTE_DATA_CONTROL}=${EVENT_ADD_TO_CART}]`;
  const elementAddButton = elementCardContainer.querySelector(buttonSelector);
  
  elementAddButton.dataset.productQuantity = target.value;
}

export function handleChangeDeliveryOption(target) {
  const { deliveryDate, deliveryPrice } = target.dataset;
  const parentContainer = target.closest('[id]'); // SHOULD be rewrited with more conventioned style
  const elementCartDeliveryDate = parentContainer.querySelector(SELECTOR_CHECKOUT_DELIVERY_DATE);

  setCheckoutState(parentContainer.id, Number(deliveryPrice));
  const currentCheckoutPrices = getCheckoutPrices();
  const elementPaymentSummaryContainer = document.querySelector(SELECTOR_PAYMENT_SUMMARY);
  const elementPaymentSummary = renderPaymentSummary({ ...currentCheckoutPrices });

  elementCartDeliveryDate.innerHTML = deliveryDate;
  elementPaymentSummaryContainer.innerHTML = elementPaymentSummary.innerHTML;
}
