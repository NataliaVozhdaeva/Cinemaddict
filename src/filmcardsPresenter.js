import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";
import FilmDetailsPresenter from "../presenter/filmDetailsPresenter";

import FilmDetailsView from "../view/filmDetailsView";
import CommentFormView from "../view/commentFormView";
import CommentsListView from "../view/commentsListView";

const filmDetailsPresenter = new FilmDetailsPresenter();

export default class FilmCardsPresenter {
  #filmSection = null;
  #filmsModel = null;

  #filmList = new FilmListView();
  #filmCardContainer = new FilmCardsContainerView();

  #films = [];

  init = (filmSection, filmsModel) => {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;

    this.#films = [...this.#filmsModel.films];
    this.allComments = [...this.#filmsModel.comments];
    render(this.#filmList, this.#filmSection);
    render(this.#filmCardContainer, this.#filmList.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilmCard(this.#films[i], this.allComments);
    }

    /* let footer = document.querySelector(".footer");
    filmDetailsPresenter.init(filmsModel, footer); */

    render(new ShowmoreBtn(), this.#filmSection);
  };

  #renderFilmCard = (film, actualComments) => {
    const filmCard = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);
    const commentsListView = new CommentsListView(film, actualComments);
    //console.log(commentsListView);
    let body = document.querySelector("body");

    const openFilmDetails = () => {
      body.appendChild(filmDetailsComponent.element);

      render(
        commentsListView,
        filmDetailsComponent.element.querySelector("form")
      );
    };

    const closeFilmDetails = () => {
      body.removeChild(filmDetailsComponent.element);
      body.classList.remove("hide-overflow");
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener("keydown", onEscKeyDown);
      }
    };

    filmCard.element
      .querySelector(".film-card__link")
      .addEventListener("click", () => {
        let popup = document.querySelector(".film-details");
        if (!body.contains(popup)) {
          openFilmDetails();
        } else {
          body.removeChild(popup);
          openFilmDetails();
        }
        body.classList.add("hide-overflow");
        document.addEventListener("keydown", onEscKeyDown);
      });

    filmDetailsComponent.element
      .querySelector(".film-details__close-btn")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener("keydown", onEscKeyDown);
      });

    render(filmCard, this.#filmCardContainer.element);
  };
}
