import { createElement } from "../render.js";

const createFilmsSection = () => `<section class="films"></section>`;

export default class FilmsSectionView {
  getTemplate() {
    return createFilmsSection();
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
