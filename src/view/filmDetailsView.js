import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFullReliaseDate, humanizeFilmDuration } from '../utils/films.js';

function createFilmDetailsViewTemplate(film) {
  const { filmInfo, userDetails } = film;

  const fullReleaseDate = humanizeFullReliaseDate(filmInfo.release.date);
  const genresCount = filmInfo.genre;

  const createGenreCountTemplate = (arr) =>
    `<td class="film-details__term">
    ${arr.length > 1 ? 'Genres' : 'Genre'}
    </td>
  ${
    arr.length > 1
      ? `<td class="film-details__cell">
        ${Object.values(genresCount)
          .map(
            (value) => `
        <span class="film-details__genre">${value}</span>`
          )
          .join('')}`
      : `<td class="film-details__cell">
        <span class="film-details__genre">${genresCount}</span>`
  }`;

  const genres = createGenreCountTemplate(genresCount);
  const filmDuration = humanizeFilmDuration(filmInfo.runtime);

  const addToWatchlistClassName = userDetails.watchlist ? 'film-details__control-button--active' : '';

  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-details__control-button--active' : '';

  const favoriteClassName = userDetails.favorite ? 'film-details__control-button--active' : '';

  return `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmInfo.poster} alt="">

          <p class="film-details__age">${filmInfo.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${fullReleaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">${genres}
             
            </tr>
          </table>

          <p class="film-details__film-description">${filmInfo.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" 
          class="film-details__control-button film-details__control-button--watchlist ${addToWatchlistClassName}" 
          id="watchlist" name="watchlist">Add to watchlist
        </button>
        <button type="button" 
          class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}"
          id="watched" name="watched">Already watched
        </button>
        <button type="button" 
          class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" 
          id="favorite" name="favorite">Add to favorites
        </button>
      </section>
    </div>
  </form>
  </section>`;
}

export default class FilmDetailsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsViewTemplate(this.#film);
  }

  setFavoriteClickHandlerOnFilmDetails = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandlerOnFilmDetails = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setAddToWatchListClickHandlerOnFilmDetails = (callback) => {
    this._callback.addToWatchListClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchListClickHandler);
  };

  setPopupCloseHandler = (callback) => {
    this._callback.popupClose = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseHandler);
  };

  #popupCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupClose(this.#film);
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
