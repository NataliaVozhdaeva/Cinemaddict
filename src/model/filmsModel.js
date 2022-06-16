import Observable from '../framework/observable.js';
import { generateFilm } from '../mock/film.js';

export default class FilmsModel extends Observable {
  #films = Array.from({ length: 14 }, generateFilm);

  get films() {
    return this.#films;
  }

  updateComponent = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error("Can't update unexisting film");
    }

    this.#films = [...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)];

    this._notify(updateType, update);
  };

  addComponent = (updateType, update) => {
    this.#films = [update, ...this.#films];

    this._notify(updateType, update);
  };

  deleteComponent = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting film");
    }

    this.#films = [...this.#films.slice(0, index), ...this.#films.slice(index + 1)];

    this._notify(updateType);
  };
}
