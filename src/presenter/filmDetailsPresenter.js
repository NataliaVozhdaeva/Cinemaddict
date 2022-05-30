import { render, RenderPosition, remove } from '../framework/render.js';
import FilmCardView from '../view/filmCardView';
import FilmDetailsView from '../view/filmDetailsView';
//import FilmDetailsFormView from "../view/filmDetailsFormView";
//import CommentFormView from '../view/commentFormView';
import CommentsListView from '../view/commentsListView';

const body = document.querySelector('body');

export default class FilmDetailsPresenter {
  #filmContainer = null;

  #filmDetailsComponent = null;
  #filmCard = null;

  #film = null;
  #comments = [];

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  init = (film) => {
    this.#film = film;
    //this.#actualComments = actualComments;

    this.#filmCard = new FilmCardView(film);
    this.#filmDetailsComponent = new FilmDetailsView(film);
    //const commentsList = new CommentsListView(film, actualComments);

    this.#filmCard.setFilmDetailsHandler(this.#handleOpenDetailsClick);
    this.#filmDetailsComponent.setPopupCloseHandler(this.#handleClosePopup);

    render(this.#filmCard, this.#filmContainer);
  };

  #openFilmDetails = () => {
    const footer = document.querySelector('.footer');
    render(this.#filmDetailsComponent, footer, RenderPosition.BEFOREBEGIN);
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeFilmDetails = () => {
    remove(this.#filmDetailsComponent);
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleOpenDetailsClick = () => {
    this.#openFilmDetails();
  };

  #handleClosePopup = () => {
    this.#closeFilmDetails();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };
}

/*
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
  


  #comments = [];
  init = (filmsModel, container) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.films];
    this.#comments = [...this.filmsModel.comments];

    render(this.popupForm, container);
    render(new FilmDetailsView(this.films[1]), this.popupForm.element);
    let filmDetailsContainer = document.querySelector('.film-details__top-container');
    render(new CommentsListView(this.films[1], this.#comments), filmDetailsContainer);
    render(new CommentFormView(this.films[1]), filmDetailsContainer);
  };
  
  
  
  
 */

/* #renderOneFilmCard = (film) => {
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#filmSection.element);
    filmDetailsPresenter.init(film);
  };*/
