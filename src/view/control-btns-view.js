import AbstractView from '../framework/view/abstract-view.js';

const createControlBtnsTemplate = (film) => {
  const { userDetails } = film;

  const addToWatchlistClassName = userDetails.watchlist ? ' film-card__controls-item--active' : '';
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = userDetails.favorite ? 'film-card__controls-item--active' : '';

  return ` <div class='film-card__controls '>
      <button class='film-card__controls-item film-card__controls-item--add-to-watchlist  ${addToWatchlistClassName}' type='button'>Add to watchlist</button>
      <button class='film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}' type='button'>Mark as watched</button>
      <button class='film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}' type='button'>Mark as favorite</button>
          </div>`;
};

export default class ControlBtnsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createControlBtnsTemplate(this.#film);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setAddToWatchListClickHandler = (callback) => {
    this._callback.addToWatchListClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchListClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #addToWatchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  };
}
