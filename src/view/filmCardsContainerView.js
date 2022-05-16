import { createElement } from "../render.js";

const createFilmCardsContainer = () =>
  `<div class="films-list__container"></div> `;

export default class FilmCardsContainerView {
  getTemplate() {
    return createFilmCardsContainer();
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
