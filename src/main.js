import { render } from './framework/render.js';
import NavView from './view/navView';
import UserSectionView from './view/userView';
import FilmCardsPresenter from './presenter/filmcardsPresenter.js';
import FilmsModel from './model/filmsModel.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filmCardsPresenter = new FilmCardsPresenter(siteMainElement, filmsModel);

render(new UserSectionView(), siteHeaderElement);
render(new NavView(), siteMainElement);

filmCardsPresenter.init();
