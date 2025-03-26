export function renderQuantityStringHTML(quantity) {
  if (!quantity) return '';

  return `<div class="product-quantity-left">Only <b>${quantity}</b> left</div>`;
}
