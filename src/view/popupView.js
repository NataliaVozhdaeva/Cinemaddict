import { EMOGI } from "../const.js";
import { createElement } from "../render.js";
import {
  humanizeFullReliaseDate,
  humanizeFilmDuration,
  humanizeCommentDate,
} from "../utils.js";

function createPopupTemplate(film, allComments) {
  const { filmInfo, userDetails, comments } = film;
  const { id, author, comment, date, emotion } = allComments;

  const fullReleaseDate = humanizeFullReliaseDate(filmInfo.release.date);
  let genresCount = filmInfo.genre;

  const createGenreCountTemplate = (genresCount) =>
    `<td class="film-details__term">
    ${genresCount.length > 1 ? "Genres" : "Genre"}
  </td>
  ${
    genresCount.length > 1
      ? `<td class="film-details__cell">
      ${Object.entries(genresCount)
        .map(
          ([genresCount, value]) => `
      <span class="film-details__genre">${value}</span>`
        )
        .join("")}
    `
      : `<td class="film-details__cell">
      <span class="film-details__genre">${genresCount}</span>`
  }`;

  const genres = createGenreCountTemplate(genresCount);

  const CommentDate = humanizeCommentDate(allComments[1].date);

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

  /* 
мне кажется неправильным переписывать весь кусок кода, который делал все то же самое
для карточки фильма, но придумать как это сюда передать у меня что-то не получается...

*/
  const filmDuration = humanizeFilmDuration(filmInfo.runtime);

  const addToWatchlistClassName = userDetails.watchlist
    ? "film-details__control-button--active"
    : "";

  const alreadyWatchedClassName = userDetails.already_watched
    ? "film-details__control-button--active"
    : "";

  const favoriteClassName = userDetails.favorite
    ? "film-details__control-button--active"
    : "";

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmInfo.poster} alt="">

          <p class="film-details__age">${filmInfo.age_rating}</p>
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
              <td class="film-details__cell">${filmInfo.release.release_country}</td>
            </tr>
            <tr class="film-details__row">${genres}
             
            </tr>
          </table>

          <p class="film-details__film-description">${filmInfo.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${addToWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${renderComments}
          </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${emogiList}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
`;
}

export default class PopupView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createPopupTemplate(this.film, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
