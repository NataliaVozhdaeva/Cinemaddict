import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model';
import FilmsApiService from './films-api-service.js';

const AUTHORIZATION = 'Basic nepeivinaGertruda';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterlement = document.querySelector('.footer');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(
  siteMainElement,
  filmsModel,
  filterModel,
  siteHeaderElement,
  siteFooterlement
);

filterPresenter.show();
filmsBoardPresenter.show();
filmsModel.init();
