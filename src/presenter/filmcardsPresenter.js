import { render, RenderPosition, remove } from '../framework/render.js';
import SortListView from '../view/sortView.js';
import FilmCardsContainerView from '../view/filmCardsContainerView';
import FilmListView from '../view/filmListView';
import FilmCardView from '../view/filmCardView';
import ShowmoreBtn from '../view/showmoreBtnView';
import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';
import NoFilmView from '../view/noFilmsView';
import FilmDetailsPresenter from './filmDetailsPresenter';

const FILMCARD_PER_STEP = 5;

export default class FilmCardsPresenter {
  #filmSection = null;
  #filmsModel = null;

  #filmList = new FilmListView();
  #filmCardContainer = new FilmCardsContainerView();
  #showMoreBtn = new ShowmoreBtn();
  #sortComponent = new SortListView();
  #noFilmsComponent = new NoFilmView();

  #films = [];
  //#comments = [];
  #renderedFilmCards = FILMCARD_PER_STEP;

  constructor(filmSection, filmsModel) {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    //this.#comments = [...this.#filmsModel.comments];

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

  /*#renderOneFilmCard = (film) => {
     const filmCard = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);
    const commentsListView = new CommentsListView(film, actualComments);
    const body = document.querySelector('body');

    const openFilmDetails = () => {
      const footer = document.querySelector('.footer');
      render(filmDetailsComponent, footer, RenderPosition.BEFOREBEGIN);
      render(commentsListView, filmDetailsComponent.element.querySelector('form'));
    };

    const closeFilmDetails = () => {
      filmDetailsComponent.element.remove();
      filmDetailsComponent.removeElement();
      body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCard.setFilmDetailsHandler(() => {
      if (document.querySelector('.film-details')) {
        filmDetailsComponent.element.remove();
        filmDetailsComponent.removeElement();
      }

      openFilmDetails();
      body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsComponent.setPopupCloseHandler(() => {
      closeFilmDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(filmCard, this.#filmCardContainer.element); 
  };*/

  #renderOneFilmCard = (film) => {
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#filmCardContainer.element);
    filmDetailsPresenter.init(film);
  };

  #renderManyCards = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderOneFilmCard(film));
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmSection);
  };

  #renderShowMoreBtn = () => {
    render(this.#showMoreBtn, this.#filmList.element);

    this.#showMoreBtn.setClickHandler(this.#handleShowMoreBtnClick);
  };

  #renderFilmCardContainer = () => {
    render(this.#filmCardContainer, this.#filmList.element);
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
}
