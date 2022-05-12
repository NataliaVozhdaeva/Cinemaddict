import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";
import PopupView from "../view/popupView";

export default class FilmCardsPresenter {
  /*#filmSection = null;
  #filmsModel = null;*/

  filmList = new FilmListView();
  filmCardContainer = new FilmCardsContainerView();

  #filmCards = [];

  init = (filmSection, filmsModel) => {
    this.filmSection = filmSection;
    this.filmsModel = filmsModel;

    this.presentFilms = [...this.filmsModel.getFilms()];
    this.presentComments = [...this.filmsModel.getComments()];

    render(this.filmList, this.filmSection);
    render(this.filmCardContainer, this.filmList.getElement());
    for (let i = 0; i < this.presentFilms.length; i++) {
      render(
        new FilmCardView(this.presentFilms[i]),
        this.filmCardContainer.getElement()
      );
    }

    let filmPosters = document.querySelectorAll(".film-card__poster");
    let popupCloseBtn = document.querySelector(".film-details__close-btn");
    filmPosters.forEach((poster, index) => {
      poster.addEventListener("click", () => {
        let footer = document.querySelector(".footer");
        render(
          new PopupView(this.presentFilms[index], this.presentComments),
          footer,
          "afterend"
        );
      });
    });

    render(new ShowmoreBtn(), this.filmSection);
  };
}

/*film-details__close-btn*/
