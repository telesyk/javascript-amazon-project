import { getProductData } from "./utils.js";
import { ATTRIBUTE_DATA_CONTROL, EVENT_ADD_TO_CART } from "./constants.js";

export const onClick = (eventTarget) => {
  const eventType = eventTarget.getAttribute(ATTRIBUTE_DATA_CONTROL);

  switch(eventType) {
    case EVENT_ADD_TO_CART:
      handleAddToCartClick(eventTarget);
      return;
    default:
      return;
  }
};

function handleAddToCartClick(target) {
  // action
  const productID = target.dataset.productId;
  const currentProduct = getProductData(productID);
  /* debug */console.log('AddToCart, product:', currentProduct);
}
