import AbstractView from '../framework/view/abstract-view.js';

const createFilmCardsContainer = () => '<div class="films-list__container"></div> ';

export default class FilmCardsContainerView extends AbstractView {
  get template() {
    return createFilmCardsContainer();
  }
}
