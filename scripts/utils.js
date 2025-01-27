import { PRODUCTS } from "../data/products.js";
import { 
  PRODUCTS_STORAGE_NAME,
  PRODUCTS_STORAGE_STATE_NAME,
  SELECTOR_CART_QUANTITY,
  SELECTOR_CART_ADDED_MESSAGE,
  SELECTOR_IS_VISIBLE
} from "./constants.js";

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
export function convertAttrToString(attrList) {
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
export function getCurrentProductData(productID, productQuantity) {
  const generalState = updateGeneralState();
  const currentProduct = generalState.filter((product) => product.id === productID);

  if (currentProduct[0].stock < 1) {
    console.warn('New item NOT added');
    return null;
  } /* Temporal solution to ignore more items add */
  
  const newProductQuantity = !productQuantity ? 1 : productQuantity;
  const newProductStock = currentProduct[0].stock - newProductQuantity;

  if (newProductStock < 0) { // WHEN at one momemnt add MORE then stock HAS
    console.warn('Could NOT add more then in stock');
    return null;
  } /* Temporal solution to ignore more items add */

  const newGeneralState = generalState.map(item => {
    if (item.id !== productID) return item;
    return {
      ...item,
      stock: newProductStock,
    }
  });

  updateGeneralState(newGeneralState);

  return {
    ...currentProduct[0],
    quantity: newProductQuantity,
    stock: newProductStock,
  };
}

/**
 * 
 * @param {Array} data list of products in cart
 * @returns empty Array when no any data || data from localSorage
 */
export function updateCartState(data) {
  const localCartState = localStorage.getItem(PRODUCTS_STORAGE_NAME);
  
  if (!data) {
    if (!localCartState) return [];

    return JSON.parse(localCartState);
  }

  localStorage.setItem(PRODUCTS_STORAGE_NAME, JSON.stringify(data));
}

export function updateCartQuantity(data) {
  if (!data || !(data instanceof Array)) return new Error('Invalid value of "data"');
  
  let quantity = 0;
  const cartQuantityElement = document.querySelector(SELECTOR_CART_QUANTITY);

  data.map(item => {
    quantity += item.quantity || 0;
  });
  
  cartQuantityElement.innerHTML = quantity;
}

export function groupCartItems(cartList, newItem) {
  if (!cartList) return Error('Invalid value');
  if (!newItem) return cartList;

  const isExist = cartList.find(item => item.id === newItem.id);
  
  if (!isExist) return [newItem, ...cartList];

  const newList = cartList.map(item => {
    if (item.id !== newItem.id) return item;

    return {
      ...item,
      quantity: item.quantity + newItem.quantity,
      stock: newItem.stock,
    }
  });

  return newList;
}

/**
 * 
 * @param {Array} data set/get the global products list
 * @returns updated products list
 */
export function updateGeneralState(data) {
  const localState = localStorage.getItem(PRODUCTS_STORAGE_STATE_NAME);

  if (!data) {
    if (!localState) {
      localStorage.setItem(PRODUCTS_STORAGE_STATE_NAME, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    };

    return JSON.parse(localState);
  }

  localStorage.setItem(PRODUCTS_STORAGE_STATE_NAME, JSON.stringify(data));
}

export function updateAddedMessage(targetButton) {
  let prevTimeoutId; // initial previous timeoutId
  const messageElement = targetButton.parentElement.querySelector(SELECTOR_CART_ADDED_MESSAGE);
  
  messageElement.classList.add(SELECTOR_IS_VISIBLE);

  if (prevTimeoutId) clearTimeout(prevTimeoutId); // clear previous timeoutId if exist

  const timeoutId = setTimeout(() => messageElement.classList.remove(SELECTOR_IS_VISIBLE), 2500); // if previous timeoutId not exist create new one and remove css-class

  prevTimeoutId = timeoutId; // write new timeoutId
}