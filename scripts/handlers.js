import { renderCheckout, renderPaymentSummary, renderProductCard } from "./render.js";
import { 
  setCheckoutState,
  getCheckoutPrices,
  getCurrentProductData,
  groupCartItems,
  updateAddedMessage,
  updateCartQuantity,
  updateCartState,
  updateGeneralState,
  getCheckoutState,
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
  const currentCheckoutState = getCheckoutState();
  const isInCheckout = currentCheckoutState.find(product => product.id === productID);
  const newCheckoutState = !isInCheckout ? [
    ...currentCheckoutState,
    {
      id: currentProductData.id,
      quantity: productQuantity,
      price: currentProductData.priceCents,
      shippingPrice: 0,
    },
  ] : currentCheckoutState.map(product => {
    return product.id === productID ? {
      ...product,
      quantity: productQuantity
    } : product;
  });

  updateCartState(newCartState);
  updateCartQuantity(newCartState);
  setCheckoutState(newCheckoutState);

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

  const currentCheckoutState = getCheckoutState();
  const newCheckoutState = currentCheckoutState.map(product => {
    return parentContainer.id === product.id ? {
      ...product,
      shippingPrice: Number(deliveryPrice)
    } : product;
  })
  setCheckoutState(newCheckoutState);
  const currentCheckoutPrices = getCheckoutPrices();
  const elementPaymentSummaryContainer = document.querySelector(SELECTOR_PAYMENT_SUMMARY);
  const elementPaymentSummary = renderPaymentSummary({ ...currentCheckoutPrices });

  elementCartDeliveryDate.innerHTML = deliveryDate;
  elementPaymentSummaryContainer.innerHTML = elementPaymentSummary.innerHTML;
}

export function handleRemoveFromCart(target) {
  const parentContainer = target.closest('[id]'); // SHOULD be rewrited with more conventioned style
  const productId = parentContainer.id;
  const currentCartState = updateCartState();
  const currentGeneralState = updateGeneralState();
  const removedProduct = currentCartState.filter(product => product.id === productId)[0];
  const newCartState = currentCartState.filter(product => product.id !== productId);
  const newGeneralState = currentGeneralState.map(product => {
    return product.id === removedProduct.id ? {
      ...product,
      stock: product.stock + removedProduct.quantity,
    } : product;
  });
  const currentCheckoutState = getCheckoutState();
  const newCheckoutState = currentCheckoutState.filter(product => product.id !== removedProduct.id);

  updateCartState(newCartState);
  updateGeneralState(newGeneralState);
  setCheckoutState(newCheckoutState);

  renderCheckout(newCartState);
}
