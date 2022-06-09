import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';
import FilmDetailsFormView from '../view/filmDetailsFormView';

import { render, RenderPosition, remove, replace } from '../framework/render.js';

const body = document.querySelector('body');

export default class FilmDetailsPresenter {
  #filmDetailsContainer = null;
  #filmDetailsForm = null;
  #filmDetailsComponent = null;
  #commentsList = null;
  #changeData = null;
  film = null;
  #userDetails = null;
  #allComments = [];
  prevFilmDetailsComponent = null;
  prevFilmDetailsForm = null;
  prevCommentsList = null;

  constructor(filmDetailsContainer, changeData) {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#changeData = changeData;
  }

  show = (film, allComments) => {
    this.film = film;
    this.#userDetails = film.userDetails;
    this.#allComments = allComments;

    this.prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.prevFilmDetailsForm = this.#filmDetailsForm;
    this.prevCommentsList = this.commentsList;

    this.#filmDetailsComponent = new FilmDetailsView(this.film);
    this.#commentsList = new CommentsListView(this.film, this.#allComments);
    this.#filmDetailsForm = new FilmDetailsFormView();

    this.#filmDetailsComponent.setPopupCloseHandler(this.#closePopupHandler);

    this.#filmDetailsComponent.setFavoriteClickHandlerOnFilmDetails(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandlerOnFilmDetails(this.#handleAlreadyWatchedClick);
    this.#filmDetailsComponent.setAddToWatchListClickHandlerOnFilmDetails(this.#handleAddToWatchListClick);

    if (this.prevFilmDetailsComponent === null) {
      this.#renderPopup();
      return;
    }
    if (this.#filmDetailsComponent !== this.prevFilmDetailsComponent.element) {
      this.#filmDetailsForm = this.prevFilmDetailsForm;
      this.#commentsList = this.prevCommentsList;
      replace(this.#filmDetailsComponent, this.prevFilmDetailsComponent);
    }
  };

  #renderFilmDitails = () => {
    render(this.#filmDetailsComponent, this.#filmDetailsForm.element);
  };

  #renderPopup = () => {
    body.classList.add('hide-overflow');
    render(this.#filmDetailsForm, this.#filmDetailsContainer, RenderPosition.BEFOREBEGIN);

    this.#renderFilmDitails();
    this.#renderComments();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderComments = () => {
    render(this.#commentsList, this.#filmDetailsForm.element);
  };

  #closeFilmDetails = () => {
    body.classList.remove('hide-overflow');
    remove(this.#filmDetailsForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.prevFilmDetailsComponent = null;
    this.#filmDetailsComponent = null;
    this.film = null;
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

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.film, userDetails: { ...this.#userDetails, favorite: !this.#userDetails.favorite } });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.film,
      userDetails: { ...this.#userDetails, alreadyWatched: !this.#userDetails.alreadyWatched },
    });
  };

  #handleAddToWatchListClick = () => {
    this.#changeData({ ...this.film, userDetails: { ...this.#userDetails, watchlist: !this.#userDetails.watchlist } });
  };

  destroy = () => {
    remove(this.#filmDetailsForm);
  };
}
