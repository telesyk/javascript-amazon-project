import { 
  getCurrentProductData,
  groupCartItems,
  updateCartQuantity,
  updateCartState,
} from "./utils.js";
import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART
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

function handleAddToCartEvent(target) {
  const productID = target.dataset.productId;
  const currentProduct = getCurrentProductData(productID);
  const currentCartState = updateCartState();
  const newCartState = groupCartItems(currentCartState, currentProduct);

  updateCartState(newCartState);
  updateCartQuantity(newCartState);
}

/**
 * Update card left items count
 */