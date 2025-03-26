import {
  getNextDate,
  getFormatedDateString,
} from "../utils.js";
import {
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DELIVERY_DATE,
  EVENT_CHANGE_DELIVERY_OPTION,
  ATTRIBUTE_DELIVERY_PRICE,
} from "../constants.js";

export function renderDeliveryOptionHTML({
  index,
  name,
  price,
  dateValue,
  shippingPrice,
}) {
  const deliveryDateString = getFormatedDateString( getNextDate(dateValue) );
  const attributeDeliveryDate = `${ATTRIBUTE_DELIVERY_DATE}="${deliveryDateString}"`;

  return `
    <label class="delivery-option">
      <input 
        class="delivery-option-input"
        type="radio"
        name="delivery-option-${index}"
        ${ATTRIBUTE_DELIVERY_PRICE}=${price}
        ${ATTRIBUTE_DATA_CONTROL}=${EVENT_CHANGE_DELIVERY_OPTION}
        ${!dateValue ? '' : attributeDeliveryDate}
        ${shippingPrice !== price ? '' : 'checked'} 
      />
      <div>
        <div class="delivery-option-date">Within ${dateValue} ${dateValue !== 1 ? 'days' : 'day'}</div>
        <div class="delivery-option-price">${name}</div>
      </div>
    </label>
  `;
}
