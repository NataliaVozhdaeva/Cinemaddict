import { render, remove } from '../framework/render.js';
//import { updateItem } from '../utils/common.js';
import SortListView from '../view/sortView.js';
import FilmCardsContainerView from '../view/filmCardsContainerView';
import FilmListView from '../view/filmListView';
import ShowmoreBtnView from '../view/showmoreBtnView';
import NoFilmView from '../view/noFilmsView';
import FilmCardPresenter from './filmCardPresenter';
import FilmDetailsPresenter from './filmDetailsPresenter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { sortByDate, sortByRating } from '../utils/films.js';

const FILMCARD_PER_STEP = 5;
const footer = document.querySelector('footer');

export default class FilmsBoardPresenter {
  #filmSection = null;
  #filmsModel = null;
  // #commentsModel = null;

  #cardsPresenter = new Map();

  #filmList = new FilmListView();
  #filmCardsContainer = new FilmCardsContainerView();
  #showMoreBtn = /* new ShowmoreBtn(); */ null;
  #sortComponent = /* new SortListView(); */ null;
  #noFilmsComponent = new NoFilmView();
  #filmDetailsPresenter = null;
  #renderedFilmCards = FILMCARD_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  //#films = [];
  //#sourcedFilms = [];

  constructor(filmSection, filmsModel) {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    //this.#commentsModel = commentsModel;
    this.#filmDetailsPresenter = new FilmDetailsPresenter(
      footer,
      this.#handleViewAction /* this.#handlePreferenceChange */
    );
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return [...this.#filmsModel.films].sort(sortByDate);
      case SortType.BY_RATING:
        return [...this.#filmsModel.films].sort(sortByRating);
    }
    return this.#filmsModel.films;
  }

  /*   get comments() {
    return this.#commentsModel.comments;
  } */

  show = () => {
    /*  this.#films = [...this.#filmsModel.films];
    this.allComments = [...this.#commentsModel.comments];
    this.#sourcedFilms = [...this.#filmsModel.films];
 */
    this.#renderFilmList();
    //console.log(this.#filmsModel);
  };

  #handleShowMoreBtnClick = () => {
    /*    this.#renderManyCards(this.#renderedFilmCards, this.#renderedFilmCards + FILMCARD_PER_STEP);
    this.#renderedFilmCards += FILMCARD_PER_STEP; */

    const filmCount = this.films.length;
    const newrenderedFilmCards = Math.min(filmCount, this.#renderedFilmCards + FILMCARD_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCards, newrenderedFilmCards);

    this.#renderManyCards(films);
    this.#renderedFilmCards = newrenderedFilmCards;

    if (this.#renderedFilmCards >= filmCount) {
      remove(this.#showMoreBtn);
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortListView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filmList.element);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmSection);
  };

  #renderShowMoreBtn = () => {
    this.#showMoreBtn = new ShowmoreBtnView();
    this.#showMoreBtn.setClickHandler(this.#handleShowMoreBtnClick);
    render(this.#showMoreBtn, this.#filmList.element);
  };

  #renderOneFilmCard = (film) => {
    const cardsPresenter = new FilmCardPresenter(
      this.#filmCardsContainer.element,
      this.#handleViewAction,
      /*   this.#handlePreferenceChange, */
      this.#filmDetailsPresenter
    );
    cardsPresenter.show(film, this.allComments);
    this.#cardsPresenter.set(film.id, cardsPresenter);
  };

  #renderManyCards = (films) => {
    /* this.#films.slice(from, to).forEach((film) => this.#renderOneFilmCard(film)); */
    films.forEach((film) => this.#renderOneFilmCard(film));
  };

  /*#renderFilmCardContainer = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, FILMCARD_PER_STEP));
    render(this.#filmCardsContainer, this.#filmList.element);
    this.#renderManyCards(films);

    if (filmCount > FILMCARD_PER_STEP) {
      this.#renderShowMoreBtn();
    }

      --render(this.#filmCardsContainer, this.#filmList.element);
   -- this.#renderManyCards(0, Math.min(this.#films.length, FILMCARD_PER_STEP));

    --if (this.#films.length > FILMCARD_PER_STEP) {
    --  this.#renderShowMoreBtn();
   -- } 
  };*/

  #renderFilmList = () => {
    const films = this.films;
    const filmCount = films.length;

    render(this.#filmList, this.#filmSection);

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    //this.#renderFilmCardContainer();
    render(this.#filmCardsContainer, this.#filmList.element);
    this.#renderManyCards(films.slice(0, Math.min(filmCount, this.#renderedFilmCards)));

    if (filmCount > this.#renderedFilmCards) {
      this.#renderShowMoreBtn();
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_COMPONENT:
        this.#filmsModel.updateComponent(updateType, update);
        break;
      case UserAction.ADD_FILM:
        this.#filmsModel.addComponent(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this.#filmsModel.deleteComponent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#cardsPresenter.get(data.id).show(data);

        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderFilmList();
        if (this.#filmDetailsPresenter.film !== null) {
          this.#filmDetailsPresenter.show(data);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderFilmList({ resetRenderedFilmCards: true, resetSortType: true });
        break;
    }
  };

  /* #handlePreferenceChange = (updatedFilmCard) => {
   this.#films = updateItem(this.#films, updatedFilmCard);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilmCard);

    this.#cardsPresenter.get(updatedFilmCard.id).show(updatedFilmCard, this.allComments);
    if (this.#filmDetailsPresenter.film !== null) {
      this.#filmDetailsPresenter.show(updatedFilmCard, this.allComments);
    }
  };*/

  /*   #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.BY_DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  }; */

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedFilmCards: true });
    this.#renderFilmList();
    /* this.#clearFilmsContainer();
    this.#renderFilmCardContainer(); */
  };

  /*  #clearFilmsContainer = () => {
    this.#cardsPresenter.forEach((presenter) => presenter.destroy());
    this.#cardsPresenter.clear();
    this.#renderedFilmCards = FILMCARD_PER_STEP;
    remove(this.#showMoreBtn);
  }; */

  #clearBoard = ({ resetRenderedFilmCards = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#cardsPresenter.forEach((presenter) => presenter.destroy());
    this.#cardsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#showMoreBtn);

    if (resetRenderedFilmCards) {
      this.#renderedFilmCards = FILMCARD_PER_STEP;
    } else {
      this.#renderedFilmCards = Math.min(filmCount, this.#renderedFilmCards);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
