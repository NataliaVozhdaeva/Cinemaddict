import { render, remove, RenderPosition } from '../framework/render.js';
import SortListView from '../view/sortView.js';
import FilmCardsContainerView from '../view/filmCardsContainerView';
import FilmListView from '../view/filmListView';
import ShowmoreBtnView from '../view/showmoreBtnView';
import NoFilmView from '../view/noFilmsView';
import FilmCardPresenter from './filmCardPresenter';
import FilmDetailsPresenter from './filmDetailsPresenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortByDate, sortByRating, sortByCommentsLength } from '../utils/films.js';
import { filter } from '../utils/filters.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import UserView from '../view/userView';
import FooterView from '../view/footer-view.js';
import MostRatedView from '../view/most-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import FilmSectionView from '../view/films-section-view.js';

const FILMCARD_PER_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class FilmsBoardPresenter {
  #filmMainContainer = null;
  #headerSection = null;
  #footerSection = null;
  #filmsModel = null;
  #showMoreBtn = null;
  #filmDetailsPresenter = null;
  #sortComponent = null;
  #noFilmsComponent = null;
  #filterModel = null;
  #userComponent = null;
  #footerStatistic = null;
  #mostRatedComponent = null;
  #mostCommentedComponent = null;
  #filmCardsContainer = null;
  #filmsTopContainer = null;
  #filmsCommentedContainer = null;

  #loadingComponent = new LoadingView();
  #filmsSection = new FilmSectionView();
  #filmList = new FilmListView();

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #cardsPresenter = new Map();
  #topCardsPresenter = new Map();
  #mostCommentedCardsPresenter = new Map();

  #renderedFilmCards = FILMCARD_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(filmMainContainer, filmsModel, filterModel, headerSection, footerSection) {
    this.#filmMainContainer = filmMainContainer;
    this.#headerSection = headerSection;
    this.#footerSection = footerSection;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#filmDetailsPresenter = new FilmDetailsPresenter(this.#footerSection, this.#handleViewAction);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);
    //const basedFilms = filteredFilms;

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
      /* case SortType.DEFAULT:
        return basedFilms; */
    }

    return filteredFilms;
  }

  show = () => {
    this.#renderFilmsSection();
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

  #renderFilmsSection = () => {
    render(this.#filmsSection, this.#filmMainContainer);
    this.#renderSort();
  };

  #renderUserComponent = () => {
    this.#userComponent = new UserView(this.#filmsModel.films);
    render(this.#userComponent, this.#headerSection);
  };

  #renderFooterStatistic = () => {
    this.#footerStatistic = new FooterView(this.#filmsModel.films);
    render(this.#footerStatistic, this.#footerSection);
  };

  #renderSort = () => {
    this.#sortComponent = new SortListView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filmsSection.element, RenderPosition.BEFOREBEGIN);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmList.element);
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmView(this.#filterType);
    render(this.#noFilmsComponent, this.#filmMainContainer);
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
    render(this.#filmList, this.#filmsSection.element, RenderPosition.AFTERBEGIN);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCount = films.length;

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#filmCardsContainer = new FilmCardsContainerView();
    render(this.#filmCardsContainer, this.#filmList.element);

    this.#renderManyCards(films.slice(0, Math.min(filmCount, this.#renderedFilmCards)));

    if (filmCount > this.#renderedFilmCards) {
      this.#renderShowMoreBtn();
    }
  };

  #renderMostCommentedComponent = () => {
    const currentilmCount = 2;
    this.films.sort(sortByCommentsLength);
    const currentFilms = this.films.slice(0, currentilmCount);

    this.#mostCommentedComponent = new MostCommentedView();
    render(this.#mostCommentedComponent, this.#filmsSection.element);

    this.#filmsCommentedContainer = new FilmCardsContainerView();
    render(this.#filmsCommentedContainer, this.#mostCommentedComponent.element);

    this.#renderMostCommentedFilmsCards(currentFilms);
  };

  #renderMostCommentedFilmsCards = (films) => {
    films.forEach((film) => this.#renderOneMostCommentedCard(film));
  };

  #renderOneMostCommentedCard = (film) => {
    const mostCommentedCardsPresenter = new FilmCardPresenter(
      this.#filmsCommentedContainer.element,
      this.#handleViewAction,
      this.#filmDetailsPresenter
    );
    mostCommentedCardsPresenter.show(film, this.allComments);
    this.#mostCommentedCardsPresenter.set(film.id, mostCommentedCardsPresenter);
  };

  #renderMostRatedComponent = () => {
    const currentilmCount = 2;
    this.films.sort(sortByRating);
    const currentFilms = this.films.slice(0, currentilmCount);

    this.#mostRatedComponent = new MostRatedView();
    render(this.#mostRatedComponent, this.#filmsSection.element);

    this.#filmsTopContainer = new FilmCardsContainerView();
    render(this.#filmsTopContainer, this.#mostRatedComponent.element);

    this.#renderTopFilmsCards(currentFilms);
  };

  #renderTopFilmsCards = (films) => {
    films.forEach((film) => this.#renderOneTopCard(film));
  };

  #renderOneTopCard = (film) => {
    const topCardsPresenter = new FilmCardPresenter(
      this.#filmsTopContainer.element,
      this.#handleViewAction,
      this.#filmDetailsPresenter
    );
    topCardsPresenter.show(film, this.allComments);
    this.#topCardsPresenter.set(film.id, topCardsPresenter);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    //this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_COMPONENT:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch (err) {
          this.#cardsPresenter.get(update.id).setAborting();
          this.#filmDetailsPresenter.setAborting();
        }
        break;
    }
    //this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#cardsPresenter.get(data.id).show(data);
        break;
      case UpdateType.MINOR:
        remove(this.#userComponent);
        remove(this.#mostRatedComponent);
        remove(this.#mostCommentedComponent);
        this.#renderUserComponent();
        this.#clearBoard();
        this.#renderSort();
        this.#renderFilmList();
        if (this.#filmDetailsPresenter.film !== null) {
          this.#filmDetailsPresenter.show(data);
        }
        this.#renderMostRatedComponent();
        this.#renderMostCommentedComponent();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCards: true, resetSortType: true });
        this.#renderSort();
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderUserComponent();
        this.#renderFilmList();
        this.#renderMostRatedComponent();
        this.#renderMostCommentedComponent();
        this.#renderFooterStatistic();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedFilmCards: true });
    this.#renderSort();
    this.#renderFilmList();
  };

  #clearBoard = ({ resetRenderedFilmCards = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#cardsPresenter.forEach((presenter) => presenter.destroy());
    this.#cardsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#showMoreBtn);
    remove(this.#filmCardsContainer);

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
