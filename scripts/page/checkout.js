import { onChange, onClick } from "../actions.js";
import { renderCheckout } from "../render.js";
import { updateCheckoutState } from "../utils.js";

const currentCheckoutState = updateCheckoutState();

renderCheckout(currentCheckoutState);

document.addEventListener('change', onChange);
document.addEventListener('click', onClick);
