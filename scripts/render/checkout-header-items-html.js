export function renderCheckoutHeaderItemsHTML(quantity) {
  if (!quantity) return '';

  const text = quantity !== 1 ? 'items' : 'item';

  return `
    Checkout (<a class="return-to-home-link" href="index.html">
      ${quantity} ${text}
    </a>)
  `;
}
