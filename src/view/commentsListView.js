import { createElement } from "../render.js";
import { humanizeCommentDate } from "../utils.js";

function createCommentsListTemplate(film, allComments) {
  const { comments } = film;
  const { id, author, comment, date, emotion } = allComments;

  const actualComments = allComments.filter(({ id }) =>
    comments.some((commentId) => commentId === id)
  );
  const CommentDate = humanizeCommentDate(allComments[1].date);

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

  return `<ul class="film-details__comments-list">
            ${renderComments}
          </ul>`;
}

export default class CommentsListView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createCommentsListTemplate(this.film, this.comments);
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
