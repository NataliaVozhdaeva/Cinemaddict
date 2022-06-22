const EMOGI = ['smile', 'sleeping', 'puke', 'angry'];

const FilterType = {
  ALL: 'All',
  WATCHLIST: 'Watchlist ',
  HISTORY: 'History',
  FAVORITES: 'Favorite',
};

const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

const UserAction = {
  ADD_COMPONENT: 'ADD_COMPONENT',
  DELETE_COMPONENT: 'DELETE_COMPONENT',
  UPDATE_COMPONENT: 'UPDATE_COMPONENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { EMOGI, FilterType, SortType, UserAction, UpdateType };
