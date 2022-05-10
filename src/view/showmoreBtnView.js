import { createElement } from "../render.js";

const createShowmoreBtn = () =>
  `<button class="films-list__show-more">Show more</button> `;

export default class ShowmoreBtn {
  getTemplate() {
    return createShowmoreBtn();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
