import { render } from "./render.js";
import NavView from "./view/nav";
import SortListView from "./view/sort.js";
import UserSectionView from "./view/user";
import FilmCardsPresenter from "./presenter/filmcardsPresenter.js";
import PopupView from "./view/popup";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");
const filmCardsPresenter = new FilmCardsPresenter();

render(new UserSectionView(), siteHeaderElement);
render(new NavView(), siteMainElement);
render(new SortListView(), siteMainElement);
filmCardsPresenter.init(siteMainElement);

render(new PopupView(), siteMainElement);
