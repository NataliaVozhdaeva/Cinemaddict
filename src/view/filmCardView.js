import AbstractView from '../framework/view/abstract-view.js';
import { humanizeReliaseDate, humanizeFilmDuration } from '../utils/films.js';

const createFilmTemplate = (film) => {
  const { filmInfo, comments } = film;
  const releaseDate = humanizeReliaseDate(filmInfo.release.date);
  const filmDuration = humanizeFilmDuration(filmInfo.runtime);

  const createShotDescription = function (text) {
    if (text.length > 140) {
      let shotDescription = text.slice(0, 139);
      return (shotDescription += '...');
    } else {
      return text;
    }
  };

  const description = createShotDescription(filmInfo.description);
  const genres = filmInfo.genre.join(', ');

  return `<article class='film-card'>
          <a class='film-card__link'>
            <h3 class='film-card__title'>${filmInfo.title}</h3>
            <p class='film-card__rating'>${filmInfo.totalRating}</p>
            <p class='film-card__info'>
              <span class='film-card__year'>${releaseDate}</span>
              <span class='film-card__duration'>${filmDuration}</span>
              <span class='film-card__genre'>${genres}</span>
            </p>
            <img src=${filmInfo.poster} alt='' class='film-card__poster'>
            <p class='film-card__description'>${description}</p>
            <span class='film-card__comments'>${comments.length} comments</span>
          </a>
         
        </article> `;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }

  setFilmDetailsHandler = (callback) => {
    this._callback.showFilmDetails = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#showFilmDetailsClickHandler);
  };

  #showFilmDetailsClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showFilmDetails();
  };
}
