import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsForm = () =>
  `<form class="film-details__inner" action="" method="get">
  </form>`;

export default class FilmDetailsFormView extends AbstractView {
  get template() {
    return createFilmDetailsForm();
  }
}
