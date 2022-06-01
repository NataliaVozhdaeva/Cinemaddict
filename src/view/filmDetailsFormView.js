import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailForm = () =>
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  </form>
  </section>`;

export default class FilmDetailsFormView extends AbstractView {
  get template() {
    return createFilmDetailForm();
  }
}
