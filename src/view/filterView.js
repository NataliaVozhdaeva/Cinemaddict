import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter) => {
  const { name, count } = filter;

  const utilityFilterTemplate = (filter) =>
    filter.name === 'All movies'
      ? `<a href="#All" class="main-navigation__item main-navigation__item--active">${name} </a>`
      : `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;

  return utilityFilterTemplate(filter);
};

/* не забыть! Навешивать класс  main-navigation__item--active по клику*/

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
   </nav> `;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
