import { render } from "../render.js";
import FilmDetailsView from "../view/filmDetailsView";
import FilmDetailsFormView from "../view/filmDetailsFormView";
import CommentFormView from "../view/commentFormView";
import CommentsListView from "../view/commentsListView";

export default class FilmDetailsPresenter {
  popupForm = new FilmDetailsFormView();

  init = (filmsModel, container) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];
    this.comments = [...this.filmsModel.getComments()];

    let footer = document.querySelector(".footer");

    render(this.popupForm, footer);
    render(new FilmDetailsView(this.films[1]), this.popupForm.getElement());
    let filmDetailsContainer = document.querySelector(
      ".film-details__top-container"
    );
    render(
      new CommentsListView(this.films[1], this.comments),
      filmDetailsContainer
    );
    render(new CommentFormView(this.films[1]), filmDetailsContainer);
  };
}
