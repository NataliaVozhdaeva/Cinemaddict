import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";
//import PopupView from "../view/popupView";
//import PopupFormView from "../view/popupFormView";

let filmPosters = document.querySelectorAll(".film-card__poster");

export default class FilmCardsPresenter {
  /*#filmSection = null;
  #filmsModel = null;*/

  filmList = new FilmListView();
  filmCardContainer = new FilmCardsContainerView();
  //popupForm = new PopupFormView();

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

    /*  filmPosters.forEach((poster) => {
      poster.addEventListener("click", () => {
        console.log("click");
         render(this.popupForm, this.documentBody);
        render(
          new PopupView(this.presentFilms[1]),
          this.popupForm.getElement()
        ); 
      });
    });
 */
    render(new ShowmoreBtn(), this.filmSection);
  };
}
