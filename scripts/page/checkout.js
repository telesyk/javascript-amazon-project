import { onChange, onClick } from "../actions.js";
import { renderCheckout } from "../render.js";
import { updateCartState } from "../utils.js";

const currentCartState = updateCartState();

renderCheckout(currentCartState);

document.addEventListener('change', onChange);
document.addEventListener('click', onClick);

/* 
* Make interactive "delete" buttons
* + Update delivery date on change Radio-buttons
* + Update Total price on change delivery options
* + Calculate summary price 
* Make delivery options same aftter reload
*/