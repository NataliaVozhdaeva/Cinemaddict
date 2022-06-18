import { render, remove } from '../framework/render.js';
import SortListView from '../view/sortView.js';
import FilmCardsContainerView from '../view/filmCardsContainerView';
import FilmListView from '../view/filmListView';
import ShowmoreBtnView from '../view/showmoreBtnView';
import NoFilmView from '../view/noFilmsView';
import FilmCardPresenter from './filmCardPresenter';
import FilmDetailsPresenter from './filmDetailsPresenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortByDate, sortByRating } from '../utils/films.js';
import { filter } from '../utils/filters.js';

const FILMCARD_PER_STEP = 5;
const footer = document.querySelector('footer');

export default class FilmsBoardPresenter {
  #filmSection = null;
  #filmsModel = null;
  #filterModel = null;
  #showMoreBtn = null;
  #filmDetailsPresenter = null;
  #sortComponent = null;
  #noFilmsComponent = null;

  #cardsPresenter = new Map();

  #filmList = new FilmListView();
  #filmCardsContainer = new FilmCardsContainerView();

  #renderedFilmCards = FILMCARD_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  constructor(filmSection, filmsModel, filterModel) {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#filmDetailsPresenter = new FilmDetailsPresenter(footer, this.#handleViewAction);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  show = () => {
    this.#renderFilmList();
  };

  #handleShowMoreBtnClick = () => {
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
    this.#noFilmsComponent = new NoFilmView(this.#filterType);
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
      this.#filmDetailsPresenter
    );
    cardsPresenter.show(film, this.allComments);
    this.#cardsPresenter.set(film.id, cardsPresenter);
  };

  #renderManyCards = (films) => {
    films.forEach((film) => this.#renderOneFilmCard(film));
  };

  #renderFilmList = () => {
    const films = this.films;
    const filmCount = films.length;

    render(this.#filmList, this.#filmSection);

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    render(this.#filmCardsContainer, this.#filmList.element);
    this.#renderManyCards(films.slice(0, Math.min(filmCount, this.#renderedFilmCards)));

    if (filmCount > this.#renderedFilmCards) {
      this.#renderShowMoreBtn();
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_COMPONENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMPONENT:
        this.#filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_COMPONENT:
        this.#filmsModel.deleteFilm(updateType, update);
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
        this.#clearBoard({ resetRenderedFilmCards: true, resetSortType: true });
        this.#renderFilmList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedFilmCards: true });
    this.#renderFilmList();
  };

  #clearBoard = ({ resetRenderedFilmCards = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#cardsPresenter.forEach((presenter) => presenter.destroy());
    this.#cardsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreBtn);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

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
