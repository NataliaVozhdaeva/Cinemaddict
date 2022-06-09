import AbstractView from '../framework/view/abstract-view.js';
import { humanizeCommentDate } from '../utils/films';
import { EMOGI } from '../const.js';

function createCommentsListTemplate(film, allComments) {
  const { comments } = film;
  const actualComments = allComments.filter(({ id }) => comments.some((commentId) => commentId === id));
  const CommentDate = humanizeCommentDate(allComments.date);
  /*  console.log(allComments);
  console.log(actualComments); */

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
      .join('');

  const renderComments = createComments(actualComments);

  const createEmogiList = () =>
    EMOGI.map(
      (emogi) => `
    <input 
      class="film-details__emoji-item visually-hidden" 
      name="comment-emoji" 
      type="radio" 
      id="emoji-${emogi}" 
      value="${emogi}">
    <label class="film-details__emoji-label" for="emoji-${emogi}">
      <img src="./images/emoji/${emogi}.png" width="30" height="30" alt="${emogi}">
    </label>`
    ).join('');

  const emogiList = createEmogiList(EMOGI);

  return `
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments <span class="film-details__comments-count">${comments.length}</span>
      </h3>
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
}
