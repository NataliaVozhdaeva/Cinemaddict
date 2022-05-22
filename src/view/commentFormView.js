import { EMOGI } from '../const.js';
import { createElement } from '../render.js';

function createCommentsFormTemplate(film) {
  const { comments } = film;

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

  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${comments.length}</span>
        </h3>
          
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
</div>`;
}

export default class CommentFormView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createCommentsFormTemplate(this.#film);
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
