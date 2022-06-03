import { render } from './framework/render.js';
//import FilterView from './view/filterView';
import UserSectionView from './view/userView';
import BoardFilmsPresenter from './presenter/boardFilmsPresenter.js';
import FilmsModel from './model/filmsModel.js';
//import { generateFilter } from './mock/mockForFilter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const boardFilmsPresentor = new BoardFilmsPresenter(siteMainElement, filmsModel);
//const filters = generateFilter(filmsModel.films.userDetails);

render(new UserSectionView(), siteHeaderElement);
//render(new FilterView(filters), siteMainElement);

boardFilmsPresentor.init();
