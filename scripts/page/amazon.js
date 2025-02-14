import { renderProducts } from "../render.js";
import { onChange, onClick } from "../actions.js";
import { 
  updateCartQuantity,
  updateGeneralState,
  updateCheckoutState,
} from "../utils.js";

const currentGeneralState = updateGeneralState();
const currentCheckoutState = updateCheckoutState();

renderProducts(currentGeneralState);
updateCartQuantity(currentCheckoutState);

document.addEventListener('click', onClick);
document.addEventListener('change', onChange);
