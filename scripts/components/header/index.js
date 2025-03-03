import { convertKebabToCamel } from "../../utils.js";

const style = document.createElement('style');
style.textContent = `
.amazon-header {
  background-color: rgb(19, 25, 33);
  color: white;
  padding-left: 15px;
  padding-right: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: 60px;
}
.amazon-header-left-section {
  width: 180px;
}

@media (max-width: 800px) {
  .amazon-header-left-section {
    width: unset;
  }
}

.header-link {
  display: flex;
  padding: 6px;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0);
}
.header-link, .header-link > * {
  color: white;
  text-decoration: none;
}

.header-link:hover {
  border: 1px solid white;
}

.amazon-logo {
  width: 100px;
  margin-top: 5px;
}

.amazon-mobile-logo {
  display: none;
}

@media (max-width: 575px) {
  .amazon-logo {
    display: none;
  }

  .amazon-mobile-logo {
    display: block;
    height: 35px;
    margin-top: 5px;
  }
}

.amazon-header-middle-section {
  flex: 1;
  max-width: 850px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}

.search-bar {
  flex: 1;
  width: 0;
  font-size: 16px;
  height: 38px;
  padding-left: 15px;
  border: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-button {
  background-color: rgb(254, 189, 105);
  border: none;
  border-radius: 0 4px 4px 0;
  width: 45px;
  height: 40px;
  flex-shrink: 0;
}

.search-icon {
  height: 22px;
  margin-left: 2px;
  margin-top: 3px;
}

.amazon-header-right-section {
  width: 180px;
  flex-shrink: 0;
  display: flex;
  justify-content: end;
}

.returns-text {
  display: block;
  font-size: 13px;
}

.orders-link {
  flex-direction: column;
}

.orders-text {
  display: block;
  font-size: 15px;
  font-weight: 700;
}

.cart-link {
  align-items: center;
  position: relative;
}

.cart-icon {
  width: 50px;
}

.cart-text {
  font-size: 15px;
  font-weight: 700;
}

.cart-quantity {
  color: rgb(240, 136, 4);
  font-size: 16px;
  font-weight: 700;

  position: absolute;
  top: 4px;
  left: 22px;
  
  width: 26px;
  text-align: center;
}
`;
const template = document.createElement('template');
template.innerHTML = `
<header class="amazon-header">
  <div class="amazon-header-left-section">
  </div>

  <div class="amazon-header-middle-section">
  </div>

  <div class="amazon-header-right-section">
    <a-link id="ordersLink" class="orders-link header-link" href="orders.html">
      <span class="returns-text">Returns</span>
      <span class="orders-text">& Orders</span>
    </a-link>
    <a-link id="cartLink" class="cart-link header-link" href="checkout.html">
      <span class="cart-quantity"></span>
      <span class="cart-text">Cart</span>
    </a-link>
  </div>
</header>
`;

export class Header extends HTMLElement {
  static options = {};
  static observedAttributes = ['is-orders'];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(prop, prevValue, newValue) {
    this.constructor.observedAttributes.map(propName => {
      if (propName.split('-')[0] === 'is') {
        this.constructor.options[convertKebabToCamel(prop)] = !newValue ? true : false;
      }
    });
  }

  render() {
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const {isOrders} = this.constructor.options;
    const ordersElement = this.shadowRoot.querySelector('#ordersLink');

    if (!isOrders) ordersElement.remove();
  }
}
