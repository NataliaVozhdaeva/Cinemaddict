import { render } from "../render.js";
import FilmCardsContainerView from "../view/filmCardsContainer";
//import FilmSection from "../view/filmsSection";
import FilmListView from "../view/filmList";
import FilmCardView from "../view/filmCard";
import ShowmoreBtn from "../view/showmoreBtn";

export default class FilmCardsPresenter {
  filmList = new FilmListView();
  filmCardContainer = new FilmCardsContainerView();

  init = (filmSection) => {
    this.filmSection = filmSection;

    render(this.filmList, this.filmSection);
    render(this.filmCardContainer, this.filmList.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmCardContainer.getElement());
    }

    render(new ShowmoreBtn(), this.filmSection);
  };
}

/*boardComponent = new BoardView();
  taskListComponent = new TaskListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TaskView(), this.taskListComponent.getElement());
    }

    render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };*/

/*render(new FilmsSectionView(), siteMainElement);

const filmsSection = siteMainElement.querySelector(".films");
render(new FilmListView(), filmsSection);

const filmList = filmsSection.querySelector(".films-list");
render(new FilmCardsContainerView(), filmList);

const filmCardsContainer = filmList.querySelector(".films-list__container");
render(new FilmCardView(), filmCardsContainer);
render(new FilmCardView(), filmCardsContainer);
render(new FilmCardView(), filmCardsContainer);
render(new FilmCardView(), filmCardsContainer);
render(new FilmCardView(), filmCardsContainer);
*/
