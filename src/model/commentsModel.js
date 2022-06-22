import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {
  #filmsApiService = null;
  #comments = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async (film) => {
    try {
      const comments = await this.#filmsApiService.getComments(film);
      this.#comments = comments;
    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };

  get comments() {
    return this.#comments;
  }

  addComment = async (updateType, update, updatedFilm) => {
    try {
      const response = await this.#filmsApiService.addComment(update, updatedFilm);
      const newComment = response;
      this.#comments = [newComment, ...this.#comments];
    } catch (err) {
      throw new Error("Can't add comment");
    }
    this._notify(updateType, update);
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting comment");
    }

    try {
      await this.#filmsApiService.deleteComment(update);
      this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
      this._notify(updateType);
    } catch (err) {
      throw new Error("Can't delete comment");
    }
  };
}
