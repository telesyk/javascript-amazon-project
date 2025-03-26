import { addAttributesToElement } from "../utils.js";

export function renderButton(content, attributes) {
  if (!content) {
    console.error('Can`t create Button');
    return;
  }

  const buttonElement = document.createElement('button');
  buttonElement.textContent = content;

  if (attributes && attributes.length > 0) {
    addAttributesToElement(buttonElement, attributes);
  }

  return buttonElement;
}