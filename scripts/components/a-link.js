const style = document.createElement('style');
const template = document.createElement('template');
style.textContent = ``;
template.innerHTML = `<a href=""><slot></slot></a>`;

export class ALink extends HTMLElement {
  static attributes = [];
  static observedAttributes = ['href', 'title', 'class'];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(prop, prevValue, newValue) {
    this.constructor.observedAttributes.map(propName => {
      if (propName === prop) {
        this.constructor.attributes.push({
          [prop]: newValue
        });
      }
    });
  }

  render() {
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content.cloneNode(true));

    const rootElement = this.shadow.querySelector('a');
    this.constructor.attributes.map(attr => {
      const key = Object.keys(attr)[0];
      rootElement.setAttribute(key, attr[key]);
    });
  }
}
