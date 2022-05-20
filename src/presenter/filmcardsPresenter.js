import { render } from "../render.js";
//import SortListView from "./view/sortView.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";
import FilmDetailsView from "../view/filmDetailsView";
import CommentsListView from "../view/commentsListView";
import NoFilmView from "../view/noFilmsView";

//const filmDetailsPresenter = new FilmDetailsPresenter();

const FILMCARD_PER_STEP = 5;

export default class FilmCardsPresenter {
  #filmSection = null;
  #filmsModel = null;

  #filmList = new FilmListView();
  #filmCardContainer = new FilmCardsContainerView();
  #showMoreBtn = new ShowmoreBtn();

  #films = [];
  #comments = [];
  #renderedFilmCards = FILMCARD_PER_STEP;

  init = (filmSection, filmsModel) => {
    this.#filmSection = filmSection;
    this.#filmsModel = filmsModel;

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#filmsModel.comments];

    if (this.#films.length === 0) {
      render(new NoFilmView(), this.#filmSection);
    } else {
      render(this.#filmList, this.#filmSection);
      render(this.#filmCardContainer, this.#filmList.element);

      for (
        let i = 0;
        i < Math.min(this.#films.length, FILMCARD_PER_STEP);
        i++
      ) {
        this.#renderFilmCard(this.#films[i], this.#comments);
      }

      if (this.#films.length > FILMCARD_PER_STEP) {
        render(this.#showMoreBtn, this.#filmSection);

        this.#showMoreBtn.element.addEventListener(
          "click",
          this.#handleShowMoreBtnClick
        );
      }
    }
  };

  #handleShowMoreBtnClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(
        this.#renderedFilmCards,
        this.#renderedFilmCards + FILMCARD_PER_STEP
      )
      .forEach((film) => this.#renderFilmCard(film, this.#comments));

    this.#renderedFilmCards += FILMCARD_PER_STEP;

    if (this.#renderedFilmCards >= this.#films.length) {
      this.#showMoreBtn.element.remove();
      this.#showMoreBtn.removeElement();
    }
  };

  #renderFilmCard = (film, actualComments) => {
    const filmCard = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);
    const commentsListView = new CommentsListView(film, actualComments);

    let body = document.querySelector("body");

    const openFilmDetails = () => {
      body.appendChild(filmDetailsComponent.element);
      filmDetailsComponent.element
        .querySelector("form")
        .appendChild(commentsListView.element);

      /*   render(
        commentsListView,
        filmDetailsComponent.element.querySelector("form")
      ); */
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
