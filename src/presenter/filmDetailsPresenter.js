import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';
import FilmDetailsFormView from '../view/filmDetailsFormView';

import { render, RenderPosition, remove, replace } from '../framework/render.js';

export default class FilmDetailsPresenter {
  #filmDetailsContainer = null;
  //#filmDetailsView = null;
  #film = null;
  #allComments = [];

  constructor(filmDetailsContainer) {
    this.#filmDetailsContainer = filmDetailsContainer;
  }

  init = (film, allComments) => {
    this.#film = film;
    this.#allComments = allComments;

    this.filmDetailsComponent = new FilmDetailsView(this.#film);
    this.commentsList = new CommentsListView(this.#film, this.#allComments);
    this.filmDetailsForm = new FilmDetailsFormView();

    render(this.filmDetailsComponent, this.#filmDetailsContainer);
  };
}

/* import { render, RenderPosition, remove, replace } from '../framework/render.js';
import FilmCardView from '../view/filmCardView';
import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';
import FilmDetailsFormView from '../view/filmDetailsFormView';

const body = document.querySelector('body');
const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

export default class FilmDetailsPresenter {
  #filmContainer = null;

  #filmDetailsForm = null;
  #filmDetailsComponent = null;
  #filmCard = null;

  #changeData = null;
  #changeMode = null;

  #film = null;
  #allComments = [];
  #mode = Mode.DEFAULT;

  constructor(filmContainer, changeData, changeMode) {
    this.#filmContainer = filmContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, allComments) => {
    this.#film = film;
    this.userDetails = film.userDetails;
    this.#allComments = allComments;

    const prevFilmCard = this.#filmCard;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    const prevFilmDetailsForm = this.#filmDetailsForm;
    const prevCommentsList = this.commentsList;

    
    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.commentsList = new CommentsListView(film, allComments);
    this.#filmDetailsForm = new FilmDetailsFormView();

    this.#filmCard.setFilmDetailsHandler(this.#openDetailsClickHandler);
    this.#filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCard.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCard.setAddToWatchListClickHandler(this.#handleAddToWatchListClick);

    this.#filmDetailsComponent.setPopupCloseHandler(this.#closePopupHandler);
    this.#filmDetailsComponent.setFavoriteClickHandlerOnFilmDetails(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandlerOnFilmDetails(this.#handleAlreadyWatchedClick);
    this.#filmDetailsComponent.setAddToWatchListClickHandlerOnFilmDetails(this.#handleAddToWatchListClick);

    if (prevFilmDetailsComponent === null || prevFilmCard === null) {
      render(this.#filmCard, this.#filmContainer);
      return;
    }

    if (this.#filmCard !== prevFilmCard.element) {
      replace(this.#filmCard, prevFilmCard);
    }

    if (this.#filmDetailsComponent !== prevFilmDetailsComponent.element) {
      this.#filmDetailsForm = prevFilmDetailsForm;
      this.commentsList = prevCommentsList;
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }
  };

  #renderFilmDetailsForm = () => {
    const footer = document.querySelector('.footer');
    render(this.#filmDetailsForm, footer, RenderPosition.BEFOREBEGIN);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFilmDetails();
    }
  };

  destroy = () => {
    remove(this.#filmCard);
    remove(this.#filmDetailsForm);
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.userDetails, favorite: !this.userDetails.favorite } });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: { ...this.userDetails, alreadyWatched: !this.userDetails.alreadyWatched },
    });
  };

  #handleAddToWatchListClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.userDetails, watchlist: !this.userDetails.watchlist } });
  };

  #openFilmDetails = () => {
    this.#changeMode();
    this.#mode = Mode.DETAILS;
    this.#renderFilmDetailsForm();
    render(this.#filmDetailsComponent, this.#filmDetailsForm.element);
    render(this.commentsList, this.#filmDetailsForm.element);
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeFilmDetails = () => {
    remove(this.#filmDetailsForm);
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #openDetailsClickHandler = () => {
    this.#openFilmDetails();
  };

  #closePopupHandler = () => {
    this.#closeFilmDetails();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };
}
 */
