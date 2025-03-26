import {
  convertAttrToString,
} from "./utils.js";

export function renderAddButtonHTML(options) {
  const buttonText = !options?.content ? 'Add to Cart' : options.content;
  const attrString = !options.attr ? '' : convertAttrToString(options.attr);

  return `
    <button 
      ${attrString}
      class="add-to-cart-button button-primary">
      ${buttonText}
    </button>
  `;
}