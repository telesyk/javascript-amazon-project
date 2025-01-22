import { 
  getProductData,
  updateCartCount,
  updateLocalStorage,
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
  const currentProduct = getProductData(productID);
  const currentLocalData = updateLocalStorage();

  /**
   * Need to group the product items by ID
   * and calc quantity of each
   * Then set updated data to localStorage
   * \/ rewrite \/
   */

  updateLocalStorage([currentProduct, ...currentLocalData]);
  updateCartCount();
}
