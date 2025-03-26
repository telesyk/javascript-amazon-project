import {
  convertCentToDollar,
  getNextDate,
  getFormatedDateString,
  convertHTMLToNodeElement,
} from "../utils.js";
import {
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  ATTRIBUTE_DATA_PRODUCT_QUANTITY,
  EVENT_REMOVE_FROM_CART,
  EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY,
} from "../constants.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import {
  renderDeliveryOptionHTML,
  renderSelectHTML
} from "../render.js";

export function renderCheckoutItem({
  id,
  priceCents,
  quantity,
  image,
  name,
  index,
  shippingPrice,
  stock,
}) {
  const dollarPrice = convertCentToDollar(priceCents);
  const deliveryOptionsHTML = deliveryOptions.reduce((html, option) => {
    const optionHTML = renderDeliveryOptionHTML({...option, index, shippingPrice});
    return html + optionHTML;
  }, '');
  const deliveryOptionChecked = deliveryOptions.filter(option => option.price === shippingPrice)[0];
  const deliveryDateString = getFormatedDateString( getNextDate(deliveryOptionChecked.dateValue) );
  const selectAttrString = 'class="quantity-control js-quantity-control"';
  const selectHTML = renderSelectHTML({id, stock: stock + quantity, attrString: selectAttrString});
  const template = `
    <div class="cart-item-container" id="${id}">
      <div class="delivery-date">
        Delivery date: <span class="js-checkout-item-delivery-date">${deliveryDateString}</span>
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${image}" />
        <div class="cart-item-details">
          <div class="product-name">${name}</div>
          <div class="product-price">$${dollarPrice}</div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label is-visible js-quantity-label">${quantity}</span>
              ${selectHTML}
            </span>
            <button 
              class="update-quantity-link link-primary" 
              ${ATTRIBUTE_DATA_CONTROL}=${EVENT_UPDATE_CHECKOUT_ITEM_QUANTITY}
              ${ATTRIBUTE_DATA_PRODUCT_QUANTITY}=${quantity} 
              ${ATTRIBUTE_DATA_PRODUCT_ID}=${id}
            >Update</button>
            <button 
              class="delete-quantity-link link-primary" 
              ${ATTRIBUTE_DATA_CONTROL}=${EVENT_REMOVE_FROM_CART}
              ${ATTRIBUTE_DATA_PRODUCT_ID}=${id}
            >Delete</button>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML}
        </div>
      </div>
    </div>
  `;

  return convertHTMLToNodeElement(template);
}