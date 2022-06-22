import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeCommentDate } from '../utils/films';

let isDeleting = false;

function createCommentsListTemplate(comments, currentComment) {
  //currentComment ? (isDeleting = currentComment.isDeleting) : '';

  //const { isDeleting, id } = currentComment;

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
                <button class="film-details__comment-delete" data-id="${id}" > ${
          id === currentComment.id ? 'Deleting...' : 'Delete'
        }
               </button>
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

export default class CommentsListView extends AbstractStatefulView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createCommentsListTemplate(this.#comments, this._state);
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
    let currentComment = this.#comments.find((comment) => comment.id === currentId);
    currentComment = {
      isDeleting: true,
      ...currentComment,
    };
    this._setState({
      currentComment,
    });
    this._callback.deleteClick(currentComment);
  };

  _restoreHandlers = () => {
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((commentDeleteBtn) => commentDeleteBtn.addEventListener('click', this.#commentDeleteClickHandler));
  };
}
