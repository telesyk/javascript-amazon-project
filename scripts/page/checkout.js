import { renderCheckout } from "../render.js";
import { updateCartState } from "../utils.js";
// console.log('checkout page');
const currentCartState = updateCartState();

renderCheckout(currentCartState);