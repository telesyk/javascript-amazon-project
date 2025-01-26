import { renderProducts } from "./render.js";
import { onChange, onClick } from "./actions.js";
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
  const isEventElement = event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL);
  if (!isEventElement) return; // to ignore other uncontroled events
  onClick(event.target);
});

document.addEventListener('change', (event) => {
  const isEventElement = event.target.hasAttribute(ATTRIBUTE_DATA_CONTROL);
  if (!isEventElement) return; // to ignore other uncontroled events
  onChange(event.target);
});
