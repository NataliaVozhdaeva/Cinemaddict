import { render, replace, remove } from '../framework/render.js';
//import { updateItem } from '../utils/common.js';
import FilmCardView from '../view/filmCardView';
import FilmDetailsPresenter from './filmDetailsPresenter';

const body = document.querySelector('body');
const footer = document.querySelector('footer');
const mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

export default class CardsPresenter {
  #filmCardContainer = null;
  #filmCard = null;
  #film = null;
  #userDetails = null;
  #changeData = null;
  #changeMode = null;
  #mode = null;
  #allComments = [];

  constructor(filmCardContainer, changeData, changeMode) {
    this.#filmCardContainer = filmCardContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    /* this.updatedFilmCard = updatedFilmCard; */
  }

  init = (film, allComments, updatedFilmCard) => {
    this.#film = film;
    this.#userDetails = film.userDetails;
    this.#allComments = allComments;
    this.updatedFilmCard = updatedFilmCard;

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
    const filmDetailsPresenter = new FilmDetailsPresenter(footer, this.#changeData, this.#changeMode);
    this.#changeMode();
    this.#mode = mode.DETAILS;
    filmDetailsPresenter.init(this.#film, this.#allComments);
    body.classList.add('hide-overflow');
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.#userDetails, favorite: !this.#userDetails.favorite } });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: { ...this.#userDetails, alreadyWatched: !this.#userDetails.alreadyWatched },
    });
  };

  #handleAddToWatchListClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.#userDetails, watchlist: !this.#userDetails.watchlist } });
  };

  resetView = () => {
    if (this.#mode !== mode.DEFAULT) {
      this.#closeFilmDetails();
    }
  };

  #closeFilmDetails = () => {
    body.classList.remove('hide-overflow');
    remove(this.filmDetailsPresenter);

    //document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = mode.DEFAULT;
  };

  destroy = () => {
    remove(this.#filmCard);
  };
}

/* 
const FILMCARD_PER_STEP = 5;

export default class FilmCardsPresenter {
  #filmSection = null;
  #filmsModel = null;

  #filmList = new FilmListView();
  #filmCardsContainer = new FilmCardsContainerView();
  #showMoreBtn = new ShowmoreBtn();
  #sortComponent = new SortListView();
  #noFilmsComponent = new NoFilmView();

  #films = [];
  #allComments = [];
  #renderedFilmCards = FILMCARD_PER_STEP;

  #filmDetailsPresenter = new Map();

  constructor(filmSection, filmsModel) {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.allComments = [...this.#filmsModel.comments];

    this.#renderFilmList();
  };

  #handleShowMoreBtnClick = () => {
    this.#renderManyCards(this.#renderedFilmCards, this.#renderedFilmCards + FILMCARD_PER_STEP);
    this.#renderedFilmCards += FILMCARD_PER_STEP;

    if (this.#renderedFilmCards >= this.#films.length) {
      remove(this.#showMoreBtn);
    }
  };

  #handleModeChange = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePreferenceChange = (updatedFilmCard) => {
    this.#films = updateItem(this.#films, updatedFilmCard);
    this.#filmDetailsPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #renderOneFilmCard = (film) => {
    const filmDetailsPresenter = new FilmDetailsPresenter(
      this.#filmCardsContainer.element,
      this.#handlePreferenceChange,
      this.#handleModeChange
    );
    filmDetailsPresenter.init(film, this.allComments);
    this.#filmDetailsPresenter.set(film.id, filmDetailsPresenter);
  };

  #renderManyCards = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderOneFilmCard(film));
    // console.log(this.#films);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmSection);
  };

  #renderShowMoreBtn = () => {
    render(this.#showMoreBtn, this.#filmList.element);

    this.#showMoreBtn.setClickHandler(this.#handleShowMoreBtnClick);
  };

  #clearFilmsContainer = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmDetailsPresenter.clear();
    this.#renderedFilmCards = FILMCARD_PER_STEP;
    remove(this.#showMoreBtn);
  };

  #renderFilmCardContainer = () => {
    render(this.#filmCardsContainer, this.#filmList.element);
    this.#renderManyCards(0, Math.min(this.#films.length, FILMCARD_PER_STEP));

    if (this.#films.length > FILMCARD_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  };

  #renderFilmList = () => {
    render(this.#filmList, this.#filmSection);

    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmCardContainer();
  };
} */
