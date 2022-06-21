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
      // console.log('model ', this.#comments);
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

  /* #adaptToClient = (film) => {
    const release = {
      ...film.film_info.release,
      releaseCountry: film.film_info.release['release_country'],
    };

    const filmInfo = {
      ...film.film_info,
      alternativeTitle: film.film_info['alternative_title'],
      totalRating: film.film_info['total_rating'],
      ageRating: film.film_info['age_rating'],
      release: release,
    };

    const userDetails = {
      ...film.user_details,
      alreadyWatched: film.user_details['already_watched'],
      watchingDate:
        film.user_details['watching_date'] !== null
          ? new Date(film.user_details['watching_date'])
          : film.user_details['watching_date'],
    };

    const adaptedFilm = {
      ...film,
      filmInfo,
      userDetails,
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    delete filmInfo['alternative_title'];
    delete filmInfo['total_rating'];
    delete filmInfo['age_rating'];

    delete release['release_country'];

    delete userDetails['already_watched'];
    delete userDetails['watching_date'];

    return adaptedFilm;
  }; */
}
