import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

import FilmCardView from '../view/filmCardView';
import ControlBtnsView from '../view/controlBtnsView.js';

export default class FilmCardPresenter {
  #filmCardContainer = null;
  #filmCard = null;
  #controlBtns = null;
  #film = null;
  #userDetails = null;
  #changeData = null;
  #filmDetailsPresenter = null;

  constructor(filmCardContainer, changeData, filmDetailsPresenter) {
    this.#filmCardContainer = filmCardContainer;
    this.#changeData = changeData;
    this.#filmDetailsPresenter = filmDetailsPresenter;
  }

  show = (film) => {
    this.#film = film;
    this.#userDetails = film.userDetails;
    const prevFilmCard = this.#filmCard;
    this.#filmCard = new FilmCardView(film);
    this.#controlBtns = new ControlBtnsView(film);

    this.#filmCard.setFilmDetailsHandler(this.#openFilmDetails);
    this.#controlBtns.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#controlBtns.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#controlBtns.setAddToWatchListClickHandler(this.#handleAddToWatchListClick);

    if (prevFilmCard === null) {
      render(this.#filmCard, this.#filmCardContainer);
      render(this.#controlBtns, this.#filmCard.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmCard !== prevFilmCard.element) {
      replace(this.#filmCard, prevFilmCard);
      render(this.#controlBtns, this.#filmCard.element, RenderPosition.BEFOREEND);
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
    this.#controlBtns.shake();
  };
}
