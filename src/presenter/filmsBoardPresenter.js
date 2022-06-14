import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import SortListView from '../view/sortView.js';
import FilmCardsContainerView from '../view/filmCardsContainerView';
import FilmListView from '../view/filmListView';
import ShowmoreBtn from '../view/showmoreBtnView';
import NoFilmView from '../view/noFilmsView';
import FilmCardPresenter from './filmCardPresenter';
import FilmDetailsPresenter from './filmDetailsPresenter.js';

const FILMCARD_PER_STEP = 5;
const footer = document.querySelector('footer');

export default class FilmsBoardPresenter {
  #filmSection = null;
  #filmsModel = null;

  #cardsPresenter = new Map();

  #filmList = new FilmListView();
  #filmCardsContainer = new FilmCardsContainerView();
  #showMoreBtn = new ShowmoreBtn();
  #sortComponent = new SortListView();
  #noFilmsComponent = new NoFilmView();
  #filmDetailsPresenter = null;

  #films = [];
  #renderedFilmCards = FILMCARD_PER_STEP;

  constructor(filmSection, filmsModel) {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;
    this.#filmDetailsPresenter = new FilmDetailsPresenter(footer, this.#handlePreferenceChange);
  }

  show = () => {
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

  #renderSort = () => {
    render(this.#sortComponent, this.#filmList.element);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmSection);
  };

  #renderShowMoreBtn = () => {
    render(this.#showMoreBtn, this.#filmList.element);
    this.#showMoreBtn.setClickHandler(this.#handleShowMoreBtnClick);
  };

  #renderOneFilmCard = (film) => {
    const cardsPresenter = new FilmCardPresenter(
      this.#filmCardsContainer.element,
      this.#handlePreferenceChange,
      this.#filmDetailsPresenter
    );
    cardsPresenter.show(film, this.allComments);
    this.#cardsPresenter.set(film.id, cardsPresenter);
  };

  #renderManyCards = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderOneFilmCard(film));
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

  #handlePreferenceChange = (updatedFilmCard) => {
    this.#films = updateItem(this.#films, updatedFilmCard);
    this.#cardsPresenter.get(updatedFilmCard.id).show(updatedFilmCard, this.allComments);
    if (this.#filmDetailsPresenter.film !== null) {
      this.#filmDetailsPresenter.show(updatedFilmCard, this.allComments);
    }
  };
}

/*  #clearFilmsContainer = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmDetailsPresenter.clear();
    this.#renderedFilmCards = FILMCARD_PER_STEP;
    remove(this.#showMoreBtn);
  }; */
