import { render } from './framework/render.js';
import UserSectionView from './view/userView';
import FilmsBoardPresenter from './presenter/filmsBoardPresenter';
import FilmsModel from './model/filmsModel.js';

import FilterModel from './model/filtersModel';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsApiService from './films-api-service.js';

const AUTHORIZATION = 'Basic nepeivinaGertruda';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, filterModel);

render(new UserSectionView(), siteHeaderElement);

filterPresenter.show();
filmsBoardPresenter.show();
filmsModel.init();
