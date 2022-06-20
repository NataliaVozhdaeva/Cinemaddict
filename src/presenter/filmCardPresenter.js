import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/filmCardView';
import { UserAction, UpdateType } from '../const.js';

export default class FilmCardPresenter {
  #filmCardContainer = null;
  #filmCard = null;
  #film = null;
  #userDetails = null;
  #changeData = null;

  #allComments = [];
  #filmDetailsPresenter = null;

  constructor(filmCardContainer, changeData, filmDetailsPresenter) {
    this.#filmCardContainer = filmCardContainer;
    this.#changeData = changeData;
    this.#filmDetailsPresenter = filmDetailsPresenter;
  }

  show = (film, allComments) => {
    this.#film = film;
    this.#userDetails = film.userDetails;
    this.#allComments = allComments;

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
    this.#filmDetailsPresenter.show(this.#film, this.#allComments, this.#changeData);
    console.log(this.#filmDetailsPresenter);
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
}
