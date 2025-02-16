import { 
  renderCheckout,
  renderPaymentSummary,
  renderProductCard,
  renderCheckoutHeaderItemsHTML,
} from "./render.js";
import { 
  getCheckoutPrices,
  getCurrentProductData,
  groupCartItems,
  updateAddedMessage,
  updateCartQuantity,
  updateCheckoutState,
  updateGeneralState,
} from "./utils.js";
import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY,
  SELECTOR_CHECKOUT_DELIVERY_DATE,
  SELECTOR_IS_VISIBLE,
  SELECTOR_PAYMENT_SUMMARY,
  SELECTOR_QUANTITY_CONTROL,
  SELECTOR_QUANTITY_LABEL,
  SELECTOR_CHECKOUT_HEADER_ITEMS,
} from "./constants.js";

export function handleAddToCartEvent(target) {
  const productID = target.dataset.productId;
  const productQuantity = Number(target.dataset.productQuantity);
  const currentProductData = getCurrentProductData(productID, productQuantity);
  const currentCheckoutState = updateCheckoutState();
  const newCartState = groupCartItems(currentCheckoutState, currentProductData);
  const elementProduct = document.getElementById(productID);

  updateCheckoutState(newCartState);
  updateCartQuantity(newCartState);

  const elementNewProduct = renderProductCard(currentProductData);
  elementProduct.innerHTML = elementNewProduct.innerHTML;

  if (currentProductData) updateAddedMessage(elementProduct); // display message/alert "Product added"
}

export function handleUpdateQuantity(target) {
  const elementCardContainer = document.getElementById(target.dataset.productId);
  const buttons = elementCardContainer.querySelectorAll(`[${ATTRIBUTE_DATA_CONTROL}]`);
  buttons.forEach(btn => {
    if (
      btn.matches(`[${ATTRIBUTE_DATA_CONTROL}=${EVENT_ADD_TO_CART}]`) ||
      btn.matches(`[${ATTRIBUTE_DATA_CONTROL}=${EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY}]`)
    ) {
      btn.dataset.productQuantity = target.value;
    }
  });
}

export function handleChangeDeliveryOption(target) {
  const { deliveryDate, deliveryPrice } = target.dataset;
  const parentContainer = target.closest('[id]'); // SHOULD be rewrited with more conventioned style
  const elementCartDeliveryDate = parentContainer.querySelector(SELECTOR_CHECKOUT_DELIVERY_DATE);
  const currentCheckoutState = updateCheckoutState();
  const newCheckoutState = currentCheckoutState.map(product => {
    return parentContainer.id === product.id ? {
      ...product,
      shippingPrice: Number(deliveryPrice)
    } : product;
  });

  updateCheckoutState(newCheckoutState);

  const currentCheckoutPrices = getCheckoutPrices();
  const elementPaymentSummaryContainer = document.querySelector(SELECTOR_PAYMENT_SUMMARY);
  const elementPaymentSummary = renderPaymentSummary({ ...currentCheckoutPrices });

  elementCartDeliveryDate.innerHTML = deliveryDate;
  elementPaymentSummaryContainer.innerHTML = elementPaymentSummary.innerHTML;
}

export function handleRemoveFromCart(target) {
  const productId = target.dataset.productId;
  const currentCheckoutState = updateCheckoutState();
  const currentGeneralState = updateGeneralState();
  const removedProduct = currentCheckoutState.filter(product => product.id === productId)[0];
  const newCartState = currentCheckoutState.filter(product => product.id !== productId);
  const newGeneralState = currentGeneralState.map(product => {
    return product.id === removedProduct.id ? {
      ...product,
      stock: product.stock + removedProduct.quantity,
    } : product;
  });

  updateCheckoutState(newCartState);
  updateGeneralState(newGeneralState);

  renderCheckout(newCartState);
}

export function handleCheckoutItemQuantity(target) {
  const parentContainer = document.getElementById(target.dataset.productId)
  const elementQuantityControl = parentContainer.querySelector(SELECTOR_QUANTITY_CONTROL);
  const elementQuantityLabel = parentContainer.querySelector(SELECTOR_QUANTITY_LABEL);
  const elementPaymentSummaryContainer = document.querySelector(SELECTOR_PAYMENT_SUMMARY);
  const elementHeaderCheckout = document.querySelector(SELECTOR_CHECKOUT_HEADER_ITEMS);
  const currentCheckoutState = updateCheckoutState();
  const currentGeneralState = updateGeneralState();
  const newProductState = (product) => {
    return {
      ...product,
      quantity: Number(target.dataset.productQuantity),
      stock: (product.quantity + product.stock) - Number(target.dataset.productQuantity),
    };
  };
  
  target.innerText = target.innerText !== 'Save' ? 'Save' : 'Update';
  elementQuantityLabel.innerHTML = target.dataset.productQuantity;
  elementQuantityControl.classList.toggle(SELECTOR_IS_VISIBLE);
  elementQuantityLabel.classList.toggle(SELECTOR_IS_VISIBLE);
  
  const newCheckoutState = currentCheckoutState.map(product => {
    return product.id === target.dataset.productId ? newProductState(product) : product;
  });
  const newGeneralState = currentGeneralState.map(product => {
    return product.id === target.dataset.productId ? newProductState(product) : product;
  });

  updateCheckoutState(newCheckoutState);
  updateGeneralState(newGeneralState);

  const checkoutPrices = getCheckoutPrices();
  const headerCheckoutHTML = renderCheckoutHeaderItemsHTML(checkoutPrices.quantity);
  const elementNewPaymentSummary = renderPaymentSummary(checkoutPrices);

  elementPaymentSummaryContainer.innerHTML = elementNewPaymentSummary.innerHTML;
  elementHeaderCheckout.innerHTML = headerCheckoutHTML;
}
