// const style = document.createElement('style');
const template = document.createElement('template');
// style.textContent = `
// a:-webkit-any-link {
//   color: transparent;
// }
// `.trim();
template.innerHTML = `<a href=""><slot></slot></a>`;

/* Non shadow element */
export class ALink extends HTMLElement {
  static attributes = [];
  static observedAttributes = ['href', 'title'];

  constructor() {
    super();

    // this.shadow = this.attachShadow({ mode: 'open' });
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
    // this.shadow.appendChild(style);
    // this.shadow.appendChild(template.content.cloneNode(true));
    // this.appendChild(style);
    this.appendChild(template.content.cloneNode(true));

    const rootElement = this.querySelector('a');
    // const rootElement = this.shadow.querySelector('a');
    this.constructor.attributes.map(attr => {
      const key = Object.keys(attr)[0];
      rootElement.setAttribute(key, attr[key]);
    });
  }
}
