import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { EMOGI } from '../const.js';

const BLANK_COMMENT = {
  id: null,
  author: null,
  comment: '',
  date: '2022-05-11T16:12:32.554Z',
  emotion: null,
};

function createNewCommentFormTemplate(newComment) {
  const createEmogiList = () =>
    EMOGI.map(
      (emogi) => `
    <input 
      class="film-details__emoji-item visually-hidden" 
      name="comment-emoji" 
      type="radio" 
      id="emoji-${emogi}" 
      value="${emogi}"
      ${emogi === newComment.emotion ? 'checked' : ''}
      >
    <label class="film-details__emoji-label" for="emoji-${emogi}">
      <img src="./images/emoji/${emogi}.png" width="30" height="30" alt="${emogi}">
    </label>`
    ).join('');

  const emogiList = createEmogiList(EMOGI);

  const addNewEmogi =
    newComment.emotion !== null
      ? `<img src="./images/emoji/${newComment.emotion}.png" width="55" height="55" alt="${newComment.emotion}"> `
      : '';

  return `
    <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">${addNewEmogi}</div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.comment}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emogiList}
      </div>
    </div>`;
}

export default class NewCommentView extends AbstractStatefulView {
  emotions = [];

  constructor(newComment = BLANK_COMMENT) {
    super();
    this._state = NewCommentView.parseCommentToState(newComment);
    this.#setInnerHandlers();
  }

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('.film-details__emoji-item')
      .forEach((emogi) => emogi.addEventListener('click', this.#emogiToggleHandler));

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#newCommentTextHandler);
  };

  #emogiToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.value,
    });
  };

  #newCommentTextHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  static parseCommentToState = (newComment) => ({
    ...newComment,
  });

  static parseStateToComment = (state) => {
    const newComment = { ...state };

    return newComment;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  get template() {
    //console.log(this._state);

    return createNewCommentFormTemplate(this._state);
  }
}
