import { remove, render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import NewCommentView from '../view/newCommentFormView.js';

export default class NewCommentPresenter {
  #commentContainer = null;
  #changeData = null;
  #destroyCallback = null;
  #newComment = null;

  constructor(commentContainer, changeData) {
    this.#commentContainer = commentContainer;
    this.#changeData = changeData;
  }

  show = (callback) => {
    this.#destroyCallback = callback;

    if (this.#newComment !== null) {
      return;
    }

    this.#newComment = new NewCommentView();
    this.#newComment.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#newComment, this.#commentContainer);
  };

  destroy = () => {
    if (this.#newComment === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#newComment);
    this.#newComment = null;
  };

  #handleFormSubmit = (comment) => {
    this.#changeData(UserAction.ADD_COMPONENT, UpdateType.MINOR, { ...comment, id: '5' });
    this.destroy();
  };
}
