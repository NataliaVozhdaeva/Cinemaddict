import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainerView";
import FilmListView from "../view/filmListView";
import FilmCardView from "../view/filmCardView";
import ShowmoreBtn from "../view/showmoreBtnView";

export default class FilmCardsPresenter {
  filmList = new FilmListView();
  filmCardContainer = new FilmCardsContainerView();

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

    render(new ShowmoreBtn(), this.filmSection);
  };
}
