import { 
  getCurrentProductData,
  groupCartItems,
  updateCartQuantity,
  updateCartState,
} from "./utils.js";
import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  EVENT_SET_ITEM_QUANTITY,
  SELECTOR_CART_ADDED_MESSAGE,
  SELECTOR_IS_VISIBLE
} from "./constants.js";

export const onClick = (eventTarget) => {
  const eventType = eventTarget.getAttribute(ATTRIBUTE_DATA_CONTROL);

  switch(eventType) {
    case EVENT_ADD_TO_CART:
      handleAddToCartEvent(eventTarget);
      return;
    default:
      return;
  }
};

export const onChange = (eventTarget) => {
  const eventType = eventTarget.getAttribute(ATTRIBUTE_DATA_CONTROL);

  switch(eventType) {
    case EVENT_SET_ITEM_QUANTITY:
      handleChangeQuantity(eventTarget);
      return;
    default:
      return;
  }
};

function handleAddToCartEvent(target) {
  const productID = target.dataset.productId;
  const productQuantity = Number(target.dataset.productQuantity);
  const currentProduct = getCurrentProductData(productID, productQuantity);
  const currentCartState = updateCartState();
  const newCartState = groupCartItems(currentCartState, currentProduct);
  const addedMessageElement = target.parentElement.querySelector(SELECTOR_CART_ADDED_MESSAGE);

  updateCartState(newCartState);
  updateCartQuantity(newCartState);
  
  !currentProduct ? 
    addedMessageElement.classList.remove(SELECTOR_IS_VISIBLE) : 
    addedMessageElement.classList.add(SELECTOR_IS_VISIBLE);
}

function handleChangeQuantity(target) {
  const cardContainerElement = target.closest('.product-container');
  const buttonSelector = `[${ATTRIBUTE_DATA_CONTROL}=${EVENT_ADD_TO_CART}]`;
  const addButtonElement = cardContainerElement.querySelector(buttonSelector);
  
  addButtonElement.dataset.productQuantity = target.value;
}

/**
 * Update card left items count
 */