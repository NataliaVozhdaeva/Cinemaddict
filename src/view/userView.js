import AbstractView from '../framework/view/abstract-view.js';

const createUserSection = (films) => {
  const userDetailsArr = [];

  films.forEach((film) => {
    userDetailsArr.push(film.userDetails);
  });

  let counter = 0;

  userDetailsArr.forEach((element) => {
    element.alreadyWatched ? (counter += 1) : (counter = counter);
  });

  const countRang = function (counter) {
    if (counter > 20) {
      return 'Movie Buff';
    } else if (counter > 10 && counter < 21) {
      return 'Fan';
    } else if (counter > 0 && counter < 11) {
      return 'Novice';
    } else {
      return '';
    }
  };

  let rang = countRang(counter);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rang}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
    //console.log(this.#films);
  }

  get template() {
    return createUserSection(this.#films);
  }
}
