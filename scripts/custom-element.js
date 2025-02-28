const template = document.createElement('template');
template.innerHTML = `
  <style>
    label {
      display: flex;
      gap: 1rem;
      align-items: center;
      color: orange;
    }
    p {
      margin: 0;
      transition: color ease 0.25s;
    }
    .description {
      font-size: 0.75em;
      color: grey;
      opacity: 0;
      transition: opacity ease 0.25s;
    }
    input:checked + p {
      color: green;
    }
    input:checked ~ .description {
      color: orange;
      opacity: 1;
    }
  </style>

  <label>
    <input type="checkbox" />
    <p><slot></slot></p>
    <p class="description">
      <slot name="description"></slot>
    </p>
  </label>
`;

class CustomElement extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append( template.content.cloneNode(true) );
    this.checkboxElement = shadow.querySelector('input');
  }

  static observedAttributes = ['checked'];

  attributeChangedCallback(name, prevVal, newVal) {
    if (name === 'checked') this.updateChecked(newVal);
  }

  connectedCallback() {
    console.log('connected');
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  updateChecked(value) {
    this.checkboxElement.checked = value !== null && value !== 'false';
  }
}

customElements.define('custom-element', CustomElement);

const item = document.querySelectorAll('custom-element');
item[1].remove();


// test-coounter
class CounterElement extends HTMLElement {
  static observedAttributes = ['count'];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.counter = 0;
  }

  connectedCallback() {
    this.render();

    const button = this.shadow.querySelector('button');
    button.addEventListener('click', this.handleIncrement.bind(this));
  }

  attributeChangedCallback(propName, prevValue, newValue) {
    if (propName === 'count') this.updateCounter(newValue);
  }

  updateCounter(value) {
    this.counter = Number(value) || this.counter;
  }

  handleIncrement(event) {
    this.counter++;
    const counter = this.shadow.querySelector('.counter');
    counter.textContent = this.counter;
    this.setAttribute('count', this.counter);
  }

  createStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .counter-wrapper {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin: 1rem 0;
      }
    `;
    return style;
  }

  createTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="counter-wrapper">
        <div class="counter">${this.counter}</div>
        <button>Increment</button>
      </div>
    `;
    return template;
  }

  render() {
    const template = this.createTemplate();
    const style = this.createStyle();

    this.shadow.appendChild( style );
    this.shadow.appendChild( template.content.cloneNode(true) );
  }
}

customElements.define('counter-element', CounterElement);
