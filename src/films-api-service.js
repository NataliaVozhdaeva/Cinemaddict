import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: 'movies' }).then(ApiService.parseResponse);
  }

  getComments = async (id) => {
    const response = await this._load({ url: `comments/${id}` });
    return ApiService.parseResponse(response);
  };

  updateFilm = async (film) => {
    const updatedFilm = this.#adaptToServer(film);
    const response = await this._load({
      url: `movies/${updatedFilm.id}`,
      method: Method.PUT,
      body: JSON.stringify(updatedFilm),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addComment = async (comment, film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {
      ...film,
      film_info: {
        ...film.filmInfo,
        alternative_title: film.filmInfo.alternativeTitle,
        total_rating: film.filmInfo.totalRating,
        age_rating: film.filmInfo.ageRating,
        release: {
          ...film.filmInfo.release,
          release_country: film.filmInfo.release.releaseCountry,
        },
      },
      user_details: {
        ...film.userDetails,
        already_watched: film.userDetails.alreadyWatched,
        watching_date: film.userDetails.watchingDate,
      },
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.film_info.ageRating;

    delete adaptedFilm.film_info.release.releaseCountry;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.user_details.alreadyWatched;
    delete adaptedFilm.user_details.watchingDate;

    return adaptedFilm;
  };
}
