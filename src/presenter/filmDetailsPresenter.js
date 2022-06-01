import { render, RenderPosition, remove, replace } from '../framework/render.js';
import FilmCardView from '../view/filmCardView';
import FilmDetailsView from '../view/filmDetailsView';
import CommentsListView from '../view/commentsListView';

const body = document.querySelector('body');
const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

export default class FilmDetailsPresenter {
  #filmContainer = null;

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
    //console.log(this.userDetails);

    const prevFilmCard = this.#filmCard;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCard = new FilmCardView(film);
    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.commentsList = new CommentsListView(film, allComments);

    this.#filmCard.setFilmDetailsHandler(this.#openDetailsClickHandler);
    this.#filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCard.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCard.setAddToWatchListClickHandler(this.#handleAddToWatchListClick);

    this.#filmDetailsComponent.setPopupCloseHandler(this.#closePopupHandler);

    if (prevFilmDetailsComponent === null || prevFilmCard === null) {
      render(this.#filmCard, this.#filmContainer);
      return;
    }

    /* 
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCard, prevFilmCard);
    } 
    
    if (this.#mode === Mode.DETAILS) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    } 

    remove(prevFilmCard);
    remove(prevFilmDetailsComponent);*/
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFilmDetails();
    }
  };

  destroy = () => {
    remove(this.#filmCard);
    remove(this.#filmDetailsComponent);
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.userDetails, favorite: !this.userDetails.favorite } });
    console.log(this.userDetails);
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: { ...this.userDetails, alreadyWatched: !this.userDetails.alreadyWatched },
    });
    console.log(this.userDetails);
  };

  #handleAddToWatchListClick = () => {
    this.#changeData({ ...this.#film, userDetails: { ...this.userDetails, watchlist: !this.userDetails.watchlist } });
    console.log(this.userDetails);
  };

  #openFilmDetails = () => {
    const footer = document.querySelector('.footer');
    render(this.#filmDetailsComponent, footer, RenderPosition.BEFOREBEGIN);
    render(this.commentsList, document.querySelector('.film-details__inner'));
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.DETAILS;
  };

  #closeFilmDetails = () => {
    remove(this.#filmDetailsComponent);
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
