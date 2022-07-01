import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsSection = () =>
  `<section class="film-details">
  </section>`;

export default class FilmDetailsSectionView extends AbstractView {
  get template() {
    return createFilmDetailsSection();
  }
}
