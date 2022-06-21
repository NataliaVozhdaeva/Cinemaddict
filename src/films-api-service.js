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

  /*    getComments = (film) => {
    return this._load({ url: `comments/${film.id}` }).then(ApiService.parseResponse);
  };
  */
  getComments = async (film) => {
    const response = await this._load({ url: `comments/${film.id}` });
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

  /* 
  addComment = async (comment ) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }; */

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (film) => {
    const release = {
      ...film.filmInfo.release,
      release_country: film.filmInfo.release['releaseCountry'],
    };

    const film_info = {
      ...film.filmInfo,
      alternative_title: film.filmInfo['alternativeTitle'],
      total_rating: film.filmInfo['totalRating'],
      age_rating: film.filmInfo['ageRating'],
      release: release,
    };

    const user_details = {
      ...film.userDetails,
      already_watched: film.userDetails['alreadyWatched'],
      watching_date: film.userDetails['watchingDate'],
    };

    const adaptedFilm = {
      ...film,
      film_info,
      user_details,
    };

    delete adaptedFilm['filmInfo'];
    delete adaptedFilm['userDetails'];

    delete film_info['alternativeTitle'];
    delete film_info['totalRating'];
    delete film_info['ageRating'];

    delete release['releaseCountry'];

    delete user_details['alreadyWatched'];
    delete user_details['watchingDate'];

    return adaptedFilm;
  };
}

/* 
     getComments = async (film) => {
    const actualId = film.id;
    const response = await this._load({
      url: `'comments/:${actualId}'`,
      method: Method.GET,
      body: JSON.stringify(updatedFilm),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }; */
