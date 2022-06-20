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
  const textComment = newComment.comment;

  const addNewEmogi =
    newComment.emotion !== null
      ? `<img src="./images/emoji/${newComment.emotion}.png" width="55" height="55" alt="${newComment.emotion}"> `
      : '';

  return `
    <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">${addNewEmogi}</div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" 
        name="comment">${textComment}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emogiList}
      </div>
    </div>`;
}

export default class NewCommentView extends AbstractStatefulView {
  emotions = [];
  #removeListener = null;

  constructor(allComments, newComment = BLANK_COMMENT) {
    super();
    this._state = NewCommentView.parseCommentToState(newComment);
    this.#setInnerHandlers();
    this.allComments = allComments;
    //console.log('view ', this.allComments);
  }

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('.film-details__emoji-item')
      .forEach((emogi) => emogi.addEventListener('click', this.#emogiToggleHandler));

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#newCommentTextHandler);

    const pressKeyHandler = () => {
      const listener = (evt) => {
        if (evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey)) {
          this.#saveData();
        }
      };

      document.addEventListener('keydown', listener);

      return () => document.removeEventListener('keydown', listener);
    };

    if (this.#removeListener) {
      this.#removeListener();
    }

    this.#removeListener = pressKeyHandler(this.newComment);
  };

  /* setAddNewCommentHandler = (callback) => {
    this._callback.addNewComment = callback;
  }; */

  #saveData = () => {
    const readyNewComment = NewCommentView.parseStateToComment(this._state);
    this.allComments.push(readyNewComment);
    console.log(this.allComments);
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

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  reset = (newComment) => {
    this.updateElement(NewCommentView.parsCommentToState(newComment));
  };

  static parseCommentToState = (newComment) => ({
    ...newComment,
  });

  static parseStateToComment = (state) => {
    const newComment = { ...state };
    this._setState = {};
    return newComment;
  };

  get template() {
    return createNewCommentFormTemplate(this._state);
  }

  remove() {
    this.#removeListener();
    this.#removeListener = null;
  }
}
