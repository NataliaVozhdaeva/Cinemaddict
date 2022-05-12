import { generateFilm, generateComment } from "../mock/film.js";

export default class FilmsModel {
  #films = Array.from({ length: 5 }, generateFilm);
  #comments = Array.from({ length: 5 }, generateComment);
  getFilms = () => this.#films;
  getComments = () => this.#comments;
}
