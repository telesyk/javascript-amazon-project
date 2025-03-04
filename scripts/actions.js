import { 
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  EVENT_CHANGE_DELIVERY_OPTION,
  EVENT_REMOVE_FROM_CART,
  EVENT_SET_ITEM_QUANTITY,
  EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY,
} from "./constants.js";
import { 
  handleAddToCartEvent, 
  handleChangeDeliveryOption, 
  handleUpdateQuantity, 
  handleRemoveFromCart, 
  handleCheckoutItemQuantity
} from "./handlers.js";

export const onClick = (event) => {
  if (!event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL)) return;

  const eventType = event.target.getAttribute(ATTRIBUTE_DATA_CONTROL);

  switch(eventType) {
    case EVENT_ADD_TO_CART:
      handleAddToCartEvent(event.target);
      return;
    case EVENT_REMOVE_FROM_CART:
      handleRemoveFromCart(event.target);
      return;
    case EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY:
      handleCheckoutItemQuantity(event.target);
      return;
    default:
      return;
  }
};

export const onChange = (event) => {
  if (!event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL)) return;

  const eventType = event.target.getAttribute(ATTRIBUTE_DATA_CONTROL);

  switch(eventType) {
    case EVENT_SET_ITEM_QUANTITY:
      handleUpdateQuantity(event.target);
      return;
    case EVENT_CHANGE_DELIVERY_OPTION:
      handleChangeDeliveryOption(event.target);
      return;
    default:
      return;
  }
};
