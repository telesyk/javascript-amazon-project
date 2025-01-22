import { PRODUCTS } from "../data/products.js";
import { PRODUCTS_STORAGE_NAME, SELECTOR_CART_QUANTITY } from "./constants.js";
/**
 * 
 * @param {Number} count integer number
 * @returns an Array of numbers from 0 to ${count}
 */
export function createIntArray(count) {
  if (!count) return Error('Func "createIntArray" get uncorrect value "count"');
  let newArr = [];

  for (let i = 0; i < count; i++) {
    newArr.push('' + (i + 1));
  }

  return newArr;
}

/**
 * @param {Array} attrList array of object-list attributes for button
 */
export function getStringAttributes(attrList) {
  if (!(attrList instanceof Array)) return Error('"attrList" is not an Array.');

  let attrString = '';

  attrList.forEach(obj => {
    for (const [key, value] of Object.entries(obj)) {
      attrString += ` ${key}="${value}"`;
    }
  });

  return attrString;
}

/**
 * 
 * @returns Object of current card details
 */
export function getProductData(productID) {
  const currentProduct = PRODUCTS.filter((product) => product.id === productID);

  return currentProduct[0];
}

/**
 * 
 * @param {Array} data list of products in cart
 * @returns empty Array when no any data || data from localSorage
 */
export function updateLocalStorage(list) {
  const localData = localStorage.getItem(PRODUCTS_STORAGE_NAME);
  
  if (!list) {
    if (!localData) return [];

    return JSON.parse(localData);
  }
  
  localStorage.setItem(PRODUCTS_STORAGE_NAME, JSON.stringify(list));
}

export function updateCartCount() {
  const localData = updateLocalStorage();
  const cartCountElement = document.querySelector(SELECTOR_CART_QUANTITY);
  
  cartCountElement.innerHTML = localData.length;
}
