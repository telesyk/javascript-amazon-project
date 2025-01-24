import { renderProducts } from "./render.js";
import { onClick } from "./actions.js";
import { ATTRIBUTE_DATA_CONTROL } from "./constants.js";
import { 
  updateCartQuantity,
  updateGeneralState,
  updateCartState,
} from "./utils.js";

const currentGeneralState = updateGeneralState();
const currentCartState = updateCartState();

renderProducts(currentGeneralState);
updateCartQuantity(currentCartState);

document.addEventListener('click', (event) => {
  const isClickEventElement = event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL);
  
  if (!isClickEventElement) return;
  
  onClick(event.target);
});
