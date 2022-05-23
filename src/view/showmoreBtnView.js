import { createElement } from '../render.js';

const createShowmoreBtn = () =>
  `<button class="films-list__show-more">Show more</button> `;

export default class ShowmoreBtn {
  #element = null;

  get template() {
    return createShowmoreBtn();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
