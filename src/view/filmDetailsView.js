import { createElement } from '../render.js';
import { humanizeFullReliaseDate, humanizeFilmDuration } from '../utils.js';

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

export default class FilmDetailsView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailsViewTemplate(this.#film);
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

/* const CommentDate = humanizeCommentDate(allComments[1].date);

  const actualComments = allComments.filter(({ id }) =>
    comments.some((commentId) => commentId === id)
  );

  const createComments = (arr) =>
    arr
      .map(
        ({ author, comment, emotion }) => `
      <li class="film-details__comment">
         <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${CommentDate}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
      )
      .join("");

  const renderComments = createComments(actualComments);

  const createEmogiList = (currentEmogi) =>
    EMOGI.map(
      (emogi) => `
    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emogi}"
      value="${emogi}">
      ${currentEmogi === emogi ? "checked" : ""}
    <label class="film-details__emoji-label" for="emoji-${emogi}">
      <img src="./images/emoji/${emogi}.png" width="30" height="30" alt="${emogi}">
    </label>`
    ).join("");

  const emogiList = createEmogiList(emotion);
 */
