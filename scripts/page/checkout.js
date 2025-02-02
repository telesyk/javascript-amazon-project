import { renderCheckout } from "../render.js";
import { updateCartState } from "../utils.js";

const currentCartState = updateCartState();

renderCheckout(currentCartState);

/* 
* Make interactive "delete" buttons
* - Update delivery date on change Radio-buttons
* Update Total price on change delivery options
* Calculate summary price 
*/