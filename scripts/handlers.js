import { renderProductCard } from "./render.js";
import { 
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
} from "./constants.js";

export function handleAddToCartEvent(target) {
  const productID = target.dataset.productId;
  const productQuantity = Number(target.dataset.productQuantity);
  const currentProductData = getCurrentProductData(productID, productQuantity);
  const currentCartState = updateCartState();
  const newCartState = groupCartItems(currentCartState, currentProductData);
  const productElement = document.getElementById(productID);

  updateCartState(newCartState);
  updateCartQuantity(newCartState);

  const newProductElement = renderProductCard(currentProductData);
  productElement.innerHTML = newProductElement.innerHTML;

  if (currentProductData) updateAddedMessage(productElement); // display message/alert "Product added"
}

export function handleChangeQuantity(target) {
  const cardContainerElement = document.getElementById(target.dataset.productId);
  const buttonSelector = `[${ATTRIBUTE_DATA_CONTROL}=${EVENT_ADD_TO_CART}]`;
  const addButtonElement = cardContainerElement.querySelector(buttonSelector);
  
  addButtonElement.dataset.productQuantity = target.value;
}

export function handleChangeDeliveryOption(target) {
  const { deliveryDate } = target.dataset;
  const parentContainer = target.closest('[id]'); // SHOULD be rewrited with more conventioned style
  const cartDeliveryDateElement = parentContainer.querySelector(SELECTOR_CHECKOUT_DELIVERY_DATE);

  cartDeliveryDateElement.innerHTML = deliveryDate;
}
