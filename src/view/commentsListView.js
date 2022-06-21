import AbstractView from '../framework/view/abstract-view.js';
import { humanizeCommentDate } from '../utils/films';

function createCommentsListTemplate(comments) {
  const createComments = (arr) =>
    arr
      .map(
        ({ date, author, comment, emotion, id }) => `
      <li class="film-details__comment">
         <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span> 
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
                <button class="film-details__comment-delete" data-id="${id}">Delete</button>
              </p>
            </div>
          </li>`
      )
      .join('');

  const renderComments = createComments(comments);

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
  //#filtercomments = null;
  #comments = null;

  constructor(comments) {
    super();
    //this.#filtercomments = filtercomments;
    this.#comments = comments;
  }

  get template() {
    return createCommentsListTemplate(this.#comments);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((commentDeleteBtn) => commentDeleteBtn.addEventListener('click', this.#commentDeleteClickHandler));
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    const currentId = evt.target.dataset.id;
    const currentComment = this.#comments.find((comment) => comment.id === currentId);

    this._callback.deleteClick(currentComment);
  };
}
