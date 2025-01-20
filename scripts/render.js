import { createArr, getStringAttributes } from "./utils.js";

export const renderQuantityStringHTML = (quantity) => {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
};

export const renderSelectHTML = (count) => {
  if (!count) return '';

  const optionsList = createArr(count);

  return `
    <select>
      ${optionsList.map((item, index) => {
        if (index === 0) {
          return `<option selected value="${item}">${item}</option>`;
        }
        return `<option value="${item}">${item}</option>`;
      })}
    </select>
  `;
};

export const renderAddButton = (options) => {
  const buttonText = !options?.content ? 'Add to Cart' : options.content;
  const attrString = !options.attr ? '' : getStringAttributes(options.attr);

  return `
    <button 
      ${attrString}
      class="add-to-cart-button button-primary">
      ${buttonText}
    </button>
  `;
};

