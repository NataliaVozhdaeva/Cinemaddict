import FilmDetailsView from '../view/film-details-view';
import CommentsListView from '../view/comments-list-view';
import FilmDetailsSectionView from '../view/film-details-section-view';
import FilmDetailsFormView from '../view/film-details-form-view';
import NewCommentView from '../view/new-comment-form-view';
import CommentsModel from '../model/comments-model.js';
import { UserAction, UpdateType } from '../const.js';
import { render, RenderPosition, remove, replace } from '../framework/render.js';
import LoadingView from '../view/loading-view.js';
import FilmsApiService from '../api/films-api-service.js';
import { AUTHORIZATION, END_POINT } from '../config';

const body = document.querySelector('body');

export default class FilmDetailsPresenter {
  #filmDetailsContainer = null;
  #filmDetailsSection = null;
  #filmDetailsForm = null;
  #filmDetailsComponent = null;
  #commentsList = null;
  #changeData = null;
  film = null;
  #userDetails = null;
  #newComment = null;
  prevFilmDetailsComponent = null;
  prevFilmDetailsSection = null;
  prevFilmDetailsForm = null;
  prevCommentsList = null;
  #commentsModel = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(filmDetailsContainer, changeData) {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#changeData = changeData;
    this.#commentsModel = new CommentsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  show = async (film) => {
    this.film = film;
    await this.#commentsModel.init(this.film.id).then(() => this.#commentsModel.comments);
    this.#userDetails = this.film.userDetails;
    this.prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.prevFilmDetailsSection = this.#filmDetailsSection;
    this.prevFilmDetailsForm = this.#filmDetailsForm;
    this.prevCommentsList = this.#commentsList;

    this.#filmDetailsSection = new FilmDetailsSectionView();
    this.#filmDetailsForm = new FilmDetailsFormView();
    this.#filmDetailsComponent = new FilmDetailsView(this.film);
    this.#commentsList = new CommentsListView(this.comments);
    this.#newComment = new NewCommentView();

    this.#filmDetailsComponent.setPopupCloseHandler(this.#closePopupHandler);
    this.#commentsList.setDeleteClickHandler(this.#handleDeleteClick);
    this.#newComment.setAddNewCommentHandler(this.#handleAddNewComment);

    this.#filmDetailsComponent.setFavoriteClickHandlerOnFilmDetails(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandlerOnFilmDetails(this.#handleAlreadyWatchedClick);
    this.#filmDetailsComponent.setAddToWatchListClickHandlerOnFilmDetails(this.#handleAddToWatchListClick);

    if (this.prevFilmDetailsComponent === null) {
      this.#renderPopup();
      return;
    }

    if (this.#filmDetailsComponent !== this.prevFilmDetailsComponentt) {
      this.#filmDetailsSection = this.prevFilmDetailsSection;
      this.#filmDetailsForm = this.prevFilmDetailsForm;
      replace(this.#filmDetailsComponent, this.prevFilmDetailsComponent);
    }

    if (this.#commentsList !== this.prevCommentsList) {
      replace(this.#commentsList, this.prevCommentsList);
      this.#renderNewCommentSection();
    }
  };

  #renderPopup = () => {
    body.classList.add('hide-overflow');
    render(this.#filmDetailsSection, this.#filmDetailsContainer, RenderPosition.BEFOREBEGIN);
    render(this.#filmDetailsForm, this.#filmDetailsSection.element);
    this.#renderFilmDitails();

    this.#renderComments();
    this.#renderNewCommentSection();

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderFilmDitails = () => {
    render(this.#filmDetailsComponent, this.#filmDetailsForm.element);
  };

  #renderComments = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    render(this.#commentsList, this.#filmDetailsForm.element);
  };

  #renderNewCommentSection = () => {
    render(this.#newComment, this.#commentsList.element);
  };

  #closeFilmDetails = () => {
    body.classList.remove('hide-overflow');
    remove(this.#filmDetailsSection);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_COMPONENT:
        this.setSaving();
        try {
          await this.#commentsModel.addComment(updateType, update, this.film);
        } catch (err) {
          this.setFilmDetailsFormAborting();
        }
        break;
      case UserAction.DELETE_COMPONENT:
        this.setDeleting(update);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch (err) {
          this.setDeleteCommentAborting(update);
        }

        break;
    }
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.show(this.film);
        this.#changeData(UserAction.UPDATE_COMPONENT, UpdateType.PATCH, this.film);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        break;
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#commentsList.element);
  };

  #handleDeleteClick = (comment) => {
    this.#handleViewAction(UserAction.DELETE_COMPONENT, UpdateType.MINOR, comment);
  };

  #handleAddNewComment = (comment) => {
    this.#handleViewAction(UserAction.ADD_COMPONENT, UpdateType.MINOR, comment);
  };

  destroy = () => {
    if (this.#newComment === null) {
      return;
    }
    remove(this.#filmDetailsSection);
  };

  setSaving = () => {
    this.#newComment.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setDeleting = (currentComment) => {
    this.#commentsList.updateElement(currentComment);
    this.#renderNewCommentSection();
  };

  setAborting = () => {
    this.#filmDetailsSection.shake();
  };

  setFilmDetailsFormAborting = () => {
    const resetState = () => {
      this.#newComment.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#filmDetailsForm.shake(resetState);
  };

  setDeleteCommentAborting = () => {
    const resetState = () => {
      this.#commentsList.updateElement();
    };
    this.#commentsList.shake(resetState);
    this.#renderNewCommentSection();
  };
}
