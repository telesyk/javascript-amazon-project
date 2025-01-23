import { PRODUCTS } from "../data/products.js";
import { 
  PRODUCTS_STORAGE_NAME,
  PRODUCTS_STORAGE_STATE_NAME,
  SELECTOR_CART_QUANTITY
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
export function getProductData(productID, productQuantity) {
  const currentProduct = PRODUCTS.filter((product) => product.id === productID);

  return {
    quantity: !productQuantity ? 1 : productQuantity,
    ...currentProduct[0]
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
  if (!cartList || !newItem) return new Error('Invalid values');

  const isExist = cartList.find(item => item.id === newItem.id);
  
  if (!isExist) return [newItem, ...cartList];

  const newList = cartList.map(item => {
    if (item.id !== newItem.id) return item;

    return {
      ...item,
      quantity: item.quantity + newItem.quantity,
    }
  });

  return newList;
}

/**
 * 
 * @param {Array} data set/get the global products list
 * @returns updated products list
 */
export function updateGlobalState(data) {
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
