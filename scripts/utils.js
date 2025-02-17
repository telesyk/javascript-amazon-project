import { PRODUCTS } from "../data/products.js";
import { 
  STORAGE_NAME_PRODUCTS,
  STORAGE_NAME_CHECKOUT,
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
  if (!count) return;
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
  if (!attrList || !(attrList instanceof Array)) return;

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
    shippingPrice: 0,
  };
}

/**
 * 
 * @param {Array} data list of products in cart
 * @returns empty Array when no any data || data from localSorage
 */
export function updateCheckoutState(data) {
  const localCartState = localStorage.getItem(STORAGE_NAME_CHECKOUT);
  
  if (!data) {
    if (!localCartState) return [];

    return JSON.parse(localCartState);
  }

  localStorage.setItem(STORAGE_NAME_CHECKOUT, JSON.stringify(data));
}

export function updateCartQuantity(data) {
  if (!data || !(data instanceof Array)) return;
  
  const quantity = getItemsQuantity(data);
  const cartQuantityElement = document.querySelector(SELECTOR_CART_QUANTITY);
  
  cartQuantityElement.innerHTML = quantity === 0 ? '' : quantity;
}

export function getItemsQuantity(data) {
  if (!data || !(data instanceof Array)) return;

  let quantity = 0;

  data.map(item => quantity += item.quantity || 0);
  
  return quantity;
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
      shippingPrice: 0,
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
  const localState = localStorage.getItem(STORAGE_NAME_PRODUCTS);

  if (!data) {
    if (!localState) {
      localStorage.setItem(STORAGE_NAME_PRODUCTS, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    };

    return JSON.parse(localState);
  }

  localStorage.setItem(STORAGE_NAME_PRODUCTS, JSON.stringify(data));
}

export function updateAddedMessage(cardContainer) {
  let prevTimeoutId; // initial previous timeoutId
  const messageElement = cardContainer.querySelector(SELECTOR_CART_ADDED_MESSAGE);
  
  messageElement.classList.add(SELECTOR_IS_VISIBLE);

  if (prevTimeoutId) clearTimeout(prevTimeoutId); // clear previous timeoutId if exist

  const timeoutId = setTimeout(() => messageElement.classList.remove(SELECTOR_IS_VISIBLE), 2500); // if previous timeoutId not exist create new one and remove css-class

  prevTimeoutId = timeoutId; // save new timeoutId
}

export function convertCentToDollar(cents) {
  return (cents / 100).toFixed(2);
}

export function getNextDate(days) {
  const daysMS = days * 86400000; // 1 day = 86400000 ms
  const currentDateMS = Date.parse(new Date());

  return new Date(currentDateMS + daysMS);
}

export function getFormatedDateString(date) {
  const dateFormat = [
    'en-GB',
    {
      month: 'long',
      weekday: 'long',
      day: 'numeric',
    }
  ];
  
  const dateString = date.toLocaleDateString(...dateFormat);
  const weekDayNComma = dateString.split(' ')[0] + ',';

  return weekDayNComma + dateString.substring(weekDayNComma.length - 1);
}

export function convertHTMLToNodeElement(template) {
  if(!template) return;
  
  const parser = new DOMParser();
  const element = parser.parseFromString(template, 'text/html');

  return element.body.firstChild;
}

export function getCheckoutPrices() {
  const currentCheckoutState = updateCheckoutState();
  const productsSummaryPrice = currentCheckoutState.reduce((total, product) => {
    const prodPrice = product.priceCents * product.quantity;
    return total + prodPrice;
  }, 0);
  const productsSummaryShippingPrice = currentCheckoutState.reduce((total, product) => total + product.shippingPrice, 0);
  const productsQuantity = currentCheckoutState.reduce((total, product) => total + product.quantity, 0);

  return {
    quantity: productsQuantity,
    productsPrice: productsSummaryPrice,
    shippingPrice: productsSummaryShippingPrice
  }
}
