import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoFilmTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoFilmTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmTextType[filterType];

  return ` <section class="films-list">
      <h2 class="films-list__title">${noFilmsTextValue}</h2>
    </section>`;
};

export default class NoFilmView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmTemplate(this.#filterType);
  }
}
