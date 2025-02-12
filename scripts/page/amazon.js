import { renderProducts } from "../render.js";
import { onChange, onClick } from "../actions.js";
import { 
  updateCartQuantity,
  updateGeneralState,
  updateCartState,
} from "../utils.js";

const currentGeneralState = updateGeneralState();
const currentCartState = updateCartState();

renderProducts(currentGeneralState);
updateCartQuantity(currentCartState);

document.addEventListener('click', onClick);
document.addEventListener('change', onChange);
