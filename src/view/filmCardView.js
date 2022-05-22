import { createElement } from '../render.js';
import { humanizeReliaseDate, humanizeFilmDuration } from '../utils.js';

const createFilmTemplate = (film) => {
  const { filmInfo, userDetails, comments } = film;
  const releaseDate = humanizeReliaseDate(filmInfo.release.date);
  const filmDuration = humanizeFilmDuration(filmInfo.runtime);

  const addToWatchlistClassName = userDetails.watchlist
    ? ' film-card__controls-item--active'
    : '';

  const alreadyWatchedClassName = userDetails.already_watched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = userDetails.favorite
    ? 'film-card__controls-item--active'
    : '';

  const createShotDescription = function (text) {
    if (text.length > 140) {
      let shotDescription = text.slice(0, 139);
      return (shotDescription += '...');
    } else {
      return text;
    }
  };

  const description = createShotDescription(filmInfo.description);

  return `<article class='film-card'>
          <a class='film-card__link'>
            <h3 class='film-card__title'>${filmInfo.title}</h3>
            <p class='film-card__rating'>${filmInfo.totalRating}</p>
            <p class='film-card__info'>
              <span class='film-card__year'>${releaseDate}</span>
              <span class='film-card__duration'>${filmDuration}</span>
              <span class='film-card__genre'>${filmInfo.genre}</span>
            </p>
            <img src=${filmInfo.poster} alt='' class='film-card__poster'>
            <p class='film-card__description'>${description}</p>
            <span class='film-card__comments'>${comments.length} comments</span>
          </a>
          <div class='film-card__controls'>
            <button class='film-card__controls-item film-card__controls-item--add-to-watchlist  ${addToWatchlistClassName}' type='button'>Add to watchlist</button>
            <button class='film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}' type='button'>Mark as watched</button>
            <button class='film-card__controls-item film-card__controls-item--favorite ${favoriteClassName} type='button'>Mark as favorite</button>
          </div>
        </article> `;
};

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }
  get template() {
    return createFilmTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
