import { createElement } from "../render.js";

const createFilmCardsContainer = () =>
  `<div class="films-list__container"></div> `;

export default class FilmCardsContainerView {
  #element = null;
  get template() {
    return createFilmCardsContainer();
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
