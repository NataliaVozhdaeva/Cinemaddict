import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';
import FilmDetailsFormView from '../view/filmDetailsFormView';
import NewCommentView from '../view/newCommentFormView';
import CommentsModel from '../model/commentsModel.js';
import { UserAction, UpdateType } from '../const.js';
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
  #newComment = null;
  prevFilmDetailsComponent = null;
  prevFilmDetailsForm = null;
  prevCommentsList = null;
  #commentsModel = null;

  constructor(filmDetailsContainer, changeData) {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#changeData = changeData;
    this.#commentsModel = new CommentsModel();
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  show = (film) => {
    this.film = film;
    this.#userDetails = film.userDetails;
    this.prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.prevFilmDetailsForm = this.#filmDetailsForm;
    this.prevCommentsList = this.#commentsList;
    //this.prevCommentsModel = this.#commentsModel;

    this.#filmDetailsForm = new FilmDetailsFormView();
    this.#filmDetailsComponent = new FilmDetailsView(this.film);
    this.#commentsList = new CommentsListView(this.#filterComments);
    this.#newComment = new NewCommentView();

    this.#filmDetailsComponent.setPopupCloseHandler(this.#closePopupHandler);
    this.#commentsList.setDeleteClickHandler(this.#handleDeleteClick);

    this.#filmDetailsComponent.setFavoriteClickHandlerOnFilmDetails(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandlerOnFilmDetails(this.#handleAlreadyWatchedClick);
    this.#filmDetailsComponent.setAddToWatchListClickHandlerOnFilmDetails(this.#handleAddToWatchListClick);

    if (this.prevFilmDetailsComponent === null) {
      this.#renderPopup();
      return;
    }

    if (this.#filmDetailsComponent !== this.prevFilmDetailsComponentt) {
      this.#filmDetailsForm = this.prevFilmDetailsForm;
      replace(this.#filmDetailsComponent, this.prevFilmDetailsComponent);
    }

    if (this.#commentsList !== this.prevCommentsList) {
      replace(this.#commentsList, this.prevCommentsList);
      this.#renderNewCommentForm();
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
    this.#renderNewCommentForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderComments = () => {
    render(this.#commentsList, this.#filmDetailsForm.element);
  };

  #renderNewCommentForm = () => {
    render(this.#newComment, this.#commentsList.element);
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

  #filterComments = () => {
    const allComments = this.comments;
    const commentForFilm = this.film.comments;
    const actualComments = allComments.filter(({ id }) => commentForFilm.some((commentId) => commentId === id));
    return actualComments;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.film,
      userDetails: { ...this.#userDetails, favorite: !this.#userDetails.favorite },
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.film,
      userDetails: { ...this.#userDetails, alreadyWatched: !this.#userDetails.alreadyWatched },
    });
  };

  #handleAddToWatchListClick = () => {
    this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.MINOR, {
      ...this.film,
      userDetails: { ...this.#userDetails, watchlist: !this.#userDetails.watchlist },
    });
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_COMPONENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMPONENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.show(this.film);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleDeleteClick = (comment) => {
    this.#handleViewAction(UserAction.DELETE_COMPONENT, UpdateType.PATCH, comment);
  };

  destroy = () => {
    remove(this.#filmDetailsForm);
  };
}
