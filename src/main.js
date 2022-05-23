import { render } from './render.js';
import NavView from './view/navView';
import SortListView from './view/sortView.js';
import UserSectionView from './view/userView';
import FilmCardsPresenter from './presenter/filmcardsPresenter.js';
import FilmsModel from './model/filmsModel.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmCardsPresenter = new FilmCardsPresenter();
const filmsModel = new FilmsModel();

render(new UserSectionView(), siteHeaderElement);
render(new NavView(), siteMainElement);
render(new SortListView(), siteMainElement);
filmCardsPresenter.init(siteMainElement, filmsModel);
