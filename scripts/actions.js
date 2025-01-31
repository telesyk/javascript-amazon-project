import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  EVENT_SET_ITEM_QUANTITY,
} from "./constants.js";
import { handleAddToCartEvent, handleChangeQuantity } from "./handlers.js";

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
