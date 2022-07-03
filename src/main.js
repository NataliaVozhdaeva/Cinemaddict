import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model';
import FilmsApiService from './api/films-api-service.js';
import { AUTHORIZATION, END_POINT } from './config';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(
  siteMainElement,
  filmsModel,
  filterModel,
  siteHeaderElement,
  siteFooterElement
);

filterPresenter.show();
filmsBoardPresenter.show();
filmsModel.init();
