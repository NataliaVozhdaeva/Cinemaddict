import AbstractView from '../framework/view/abstract-view.js';

const createFooter = (films) => `<section class="footer__statistics">
              <p>${films.length} movies inside</p>
          </section>`;

export default class FooterView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFooter(this.#films);
  }
}
