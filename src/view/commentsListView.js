import AbstractView from '../framework/view/abstract-view.js';
import { humanizeCommentDate } from '../utils/films';

function createCommentsListTemplate(film, allComments) {
  const { comments } = film;
  const actualComments = allComments.filter(({ id }) => comments.some((commentId) => commentId === id));

  const createComments = (arr) =>
    arr
      .map(
        ({ date, author, comment, emotion }) => `
      <li class="film-details__comment">
         <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span> 
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
      )
      .join('');

  const renderComments = createComments(actualComments);

  return `
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments <span class="film-details__comments-count">${comments.length}</span>
      </h3>
      <ul class="film-details__comments-list">
        ${renderComments}
      </ul>
    </section>
  </div>
`;
}

export default class CommentsListView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createCommentsListTemplate(this.#film, this.#comments);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((commentCloseBtn) => commentCloseBtn.addEventListener('click', this.#commentDeleteClickHandler));
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this.#comments);
  };
}
