import { Header } from "./header/index.js";
import { ALink } from "./a-link.js";

customElements.define('custom-header', Header);
customElements.define('a-link', ALink);

export { ALink, Header };