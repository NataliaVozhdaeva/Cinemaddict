import { render } from '../framework/render.js';

//import { updateItem } from '../utils/common.js';
import FilmCardView from '../view/filmCardView';
import FilmDetailsPresenter from './filmDetailsPresenter';

const body = document.querySelector('body');
const footer = document.querySelector('footer');

export default class CardsPresenter {
  #filmCardContainer = null;
  #filmCard = null;
  #film = null;

  #allComments = [];

  constructor(filmCardContainer) {
    this.#filmCardContainer = filmCardContainer;
  }

  init = (film, allComments) => {
    this.#film = film;
    this.#allComments = allComments;
    this.#filmCard = new FilmCardView(film);

    this.#filmCard.setFilmDetailsHandler(this.#openFilmDetails);

    render(this.#filmCard, this.#filmCardContainer);
    /*   console.log(this.#allComments);
    console.log(this.#film); */
  };

  get element() {
    return this.#film;
  }

  #openFilmDetails = () => {
    const filmDetailsPresenter = new FilmDetailsPresenter(footer);
    /* console.log(this.#allComments);
    console.log(this.#film); */
    filmDetailsPresenter.init(this.film, this.#allComments);
    /* 
    this.#renderFilmDetailsForm();
    render(this.#filmDetailsComponent, this.#filmDetailsForm.element);
    render(this.commentsList, this.#filmDetailsForm.element); */
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeFilmDetails = () => {
    console.log('close FD');
    /*  remove(this.#filmDetailsForm);
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT; */
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  /* #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }; 
*/
}
/*   #renderPopup = (film) => {
    //render(this.#filmCardsContainer, this.#filmList.element);
    const filmDetailsPresenter = new FilmDetailsPresenter(
      this.filmCardsContainer,
      this.#handlePreferenceChange,
      this.#handleModeChange
    );
    filmDetailsPresenter.init(film, this.allComments);
    this.#filmDetailsPresenter.set(film.id, filmDetailsPresenter);
  }; */
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
