import AbstractView from '../framework/view/abstract-view.js';
import { humanizeReliaseDate, humanizeFilmDuration } from '../utils/films.js';

const createFilmTemplate = (film) => {
  const { filmInfo, userDetails, comments } = film;
  const releaseDate = humanizeReliaseDate(filmInfo.release.date);
  const filmDuration = humanizeFilmDuration(filmInfo.runtime);

  const addToWatchlistClassName = userDetails.watchlist ? ' film-card__controls-item--active' : '';

  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';

  const favoriteClassName = userDetails.favorite ? 'film-card__controls-item--active' : '';

  const createShotDescription = function (text) {
    if (text.length > 140) {
      let shotDescription = text.slice(0, 139);
      return (shotDescription += '...');
    } else {
      return text;
    }
  };

  const description = createShotDescription(filmInfo.description);
  const genres = filmInfo.genre.join(', ');

  return `<article class='film-card'>
          <a class='film-card__link'>
            <h3 class='film-card__title'>${filmInfo.title}</h3>
            <p class='film-card__rating'>${filmInfo.totalRating}</p>
            <p class='film-card__info'>
              <span class='film-card__year'>${releaseDate}</span>
              <span class='film-card__duration'>${filmDuration}</span>
              <span class='film-card__genre'>${genres}</span>
            </p>
            <img src=${filmInfo.poster} alt='' class='film-card__poster'>
            <p class='film-card__description'>${description}</p>
            <span class='film-card__comments'>${comments.length} comments</span>
          </a>
          <div class='film-card__controls'>
            <button class='film-card__controls-item film-card__controls-item--add-to-watchlist  ${addToWatchlistClassName}' type='button'>Add to watchlist</button>
            <button class='film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}' type='button'>Mark as watched</button>
            <button class='film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}' type='button'>Mark as favorite</button>
          </div>
        </article> `;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }

  setFilmDetailsHandler = (callback) => {
    this._callback.showFilmDetails = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#showFilmDetailsClickHandler);
  };

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

  #showFilmDetailsClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showFilmDetails();
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
