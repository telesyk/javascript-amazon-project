import {
  convertCentToDollar,
  convertHTMLToNodeElement,
} from "./utils.js";

export function renderPaymentSummary({
  quantity,
  productsPrice,
  shippingPrice,
}) {
  const summaryBeforeTax = productsPrice + shippingPrice;
  const taxPrice = 0.1 * summaryBeforeTax;
  const summaryPrice = taxPrice + summaryBeforeTax;

  const template = `
  <div>
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${convertCentToDollar(productsPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${convertCentToDollar(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${convertCentToDollar(summaryBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${convertCentToDollar(taxPrice)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${convertCentToDollar(summaryPrice)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
  `;

  return convertHTMLToNodeElement(template);
}