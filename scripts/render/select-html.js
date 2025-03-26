import { 
  createIntArray,
} from "../utils.js";
import { 
  ATTRIBUTE_DATA_CONTROL,
  ATTRIBUTE_DATA_PRODUCT_ID,
  EVENT_SET_ITEM_QUANTITY,
} from "../constants.js";

export function renderSelectHTML({id, stock, attrString}) {
  if (!stock || !id) return '';

  const optionsList = createIntArray(stock);
  const optionsHTMLString = optionsList.map((value, index) => {
    if (index === 0) {
      return `<option selected value="${value}">${value}</option>`;
    }
    return `<option value="${value}">${value}</option>`;
  }).join('');

  return `
    <select 
      ${!attrString  ? '' : attrString}
      ${ATTRIBUTE_DATA_CONTROL}=${EVENT_SET_ITEM_QUANTITY} 
      ${ATTRIBUTE_DATA_PRODUCT_ID}=${id}
    >
      ${optionsHTMLString}
    </select>
  `;
}