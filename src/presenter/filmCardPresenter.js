import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/filmCardView';
import { UserAction, UpdateType } from '../const.js';
//import FilmDetailsPresenter from './filmDetailsPresenter.js';
/* import CommentsModel from '../model/commentsModel';

import FilmsApiService from '../films-api-service.js';

const AUTHORIZATION = 'Basic nepeivinaGertruda';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict'; */

//const footer = document.querySelector('footer');

export default class FilmCardPresenter {
  #filmCardContainer = null;
  #filmCard = null;
  #film = null;
  #userDetails = null;
  #changeData = null;
  #filmDetailsPresenter = null;
  // #filmsModel = null;
  // #commentsModel = null;

  constructor(filmCardContainer, changeData, filmDetailsPresenter) {
    this.#filmCardContainer = filmCardContainer;
    //this.#filmsModel = filmsModel;
    this.#changeData = changeData;
    this.#filmDetailsPresenter = filmDetailsPresenter;
    //new FilmDetailsPresenter(footer, this.#handleViewAction);
    //this.#commentsModel = new CommentsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
    //this.#commentsModel.addObserver(this.#handleModelEvent);

    //this.#filmDetailsPresenter = filmDetailsPresenter;
  }

  /*   get comments() {
    console.log(this.#commentsModel);
    return this.#commentsModel.comments;
  } */

  show = (film) => {
    this.#film = film;
    this.#userDetails = film.userDetails;
    const prevFilmCard = this.#filmCard;

    this.#filmCard = new FilmCardView(film);

    this.#filmCard.setFilmDetailsHandler(this.#openFilmDetails);
    this.#filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCard.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCard.setAddToWatchListClickHandler(this.#handleAddToWatchListClick);

    if (prevFilmCard === null) {
      render(this.#filmCard, this.#filmCardContainer);
      return;
    }

    if (this.#filmCard !== prevFilmCard.element) {
      replace(this.#filmCard, prevFilmCard);
    }
  };

  get element() {
    return this.#film;
  }

  #openFilmDetails = () => {
    this.#filmDetailsPresenter.show(this.#film);
  };

  #handleFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#userDetails, favorite: !this.#userDetails.favorite },
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#userDetails, alreadyWatched: !this.#userDetails.alreadyWatched },
    });
  };

  #handleAddToWatchListClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#userDetails, watchlist: !this.#userDetails.watchlist },
    });
  };

  destroy = () => {
    remove(this.#filmCard);
  };

  setAborting = () => {
    this.#filmCard.shake();
  };
}
