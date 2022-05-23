import { render } from '../render.js';
//import FilmDetailsView from "../view/filmDetailsView";
//import FilmDetailsFormView from "../view/filmDetailsFormView";
import CommentFormView from '../view/commentFormView';
import CommentsListView from '../view/commentsListView';

export default class FilmDetailsPresenter {
  //#popupForm = new FilmDetailsFormView();
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
}
