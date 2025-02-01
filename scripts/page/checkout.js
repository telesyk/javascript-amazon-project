import { renderCheckout } from "../render.js";
import { updateCartState } from "../utils.js";
// console.log('checkout page');
const currentCartState = updateCartState();

renderCheckout(currentCartState);

/* 
* Make interactive "delete" buttons
* - Update delivery date on change Radio-buttons
* Update Total price on change delivery options
* Calculate summary price 
*/