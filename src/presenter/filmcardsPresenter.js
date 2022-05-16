import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";
import FilmDetailsView from "../view/filmDetailsView.js";
import FilmDetailsFormView from "../view/filmDetailsFormView";
import FilmDetailsPresenter from "../presenter/filmDetailsPresenter";

const filmDetailsPresenter = new FilmDetailsPresenter();

export default class FilmCardsPresenter {
  /*#filmSection = null;
  #filmsModel = null;*/

  filmList = new FilmListView();
  filmCardContainer = new FilmCardsContainerView();
  filmDetailsView = new FilmDetailsView();
  popupForm = new FilmDetailsFormView();

  //#filmCards = [];

  init = (filmSection, filmsModel) => {
    this.filmSection = filmSection;
    this.filmsModel = filmsModel;

    this.films = [...this.filmsModel.getFilms()];

    render(this.filmList, this.filmSection);
    render(this.filmCardContainer, this.filmList.getElement());
    for (let i = 0; i < this.films.length; i++) {
      render(
        new FilmCardView(this.films[i]),
        this.filmCardContainer.getElement()
      );
    }
    let footer = document.querySelector(".footer");
    filmDetailsPresenter.init(filmsModel, footer);

    render(new ShowmoreBtn(), this.filmSection);
  };
}
