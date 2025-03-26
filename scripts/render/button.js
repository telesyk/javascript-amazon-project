import { convertHTMLToNodeElement } from "../utils.js";

export function renderButton(content) {
  if (!content) {
    console.error('Can`t create Button');
    return;
  }

  const template = `
    <button>${content}</button>
  `;

  return convertHTMLToNodeElement(template);
}