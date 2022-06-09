import { generateFilm, generateComment } from '../mock/film.js';

export default class FilmsModel {
  #films = Array.from({ length: 14 }, generateFilm);
  #comments = Array.from({ length: 5 }, generateComment);
  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
