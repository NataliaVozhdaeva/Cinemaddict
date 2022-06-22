import { getRandomInteger } from '../utils/common.js';
import { EMOGI } from '../const.js';
import { nanoid } from 'nanoid';

const generateTitle = () => {
  const titles = [
    'The Man with the Golden Arm',
    'The Great Flamarion',
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
    'The dance of life',
    'Popeye & Sindbad',
    'Sagebrush trail',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    './images/posters/the-dance-of-life.jpg',
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateFilmDescription = () => {
  const descriptions = [
    'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateCommentContent = () => {
  const commentsTexts = [
    'Grate',
    'So-so',
    'I didnt understood anything',
    'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    'Фигня ваше кино, мне Танька рассказывала',
    'Its wonderful!',
    'Very bad',
    'But I was waiting for Chuk Norris...',
    'Almost two hours? Seriously?',
  ];
  const randomIndex = getRandomInteger(0, commentsTexts.length - 1);

  return commentsTexts[randomIndex];
};

const generateAuthor = () => {
  const autors = ['Ilya OReilly', 'John Dow', 'Will Smith', 'Jane Ostin', 'Volan dMort'];
  const randomIndex = getRandomInteger(0, autors.length - 1);

  return autors[randomIndex];
};

const generateEmogi = () => {
  const emogi = EMOGI;
  const randomIndex = getRandomInteger(0, EMOGI.length - 1);

  return emogi[randomIndex];
};

const generateId = () => {
  const id = ['0', '1', '2', '3'];
  const randomIndex = getRandomInteger(0, id.length - 1);
  return id[randomIndex];
};

const generateActualComments = () => {
  const actualComments = [
    ['0', '3'],
    ['1', '2'],
  ];
  const randomIndex = getRandomInteger(0, actualComments.length - 1);
  return actualComments[randomIndex];
};

const generateRating = () => {
  const rating = ['0', '1', '2', '3', '4', '5'];
  const randomIndex = getRandomInteger(0, rating.length - 1);
  return rating[randomIndex];
};

const generateReleaseDate = () => {
  const date = [
    '2019-05-11T00:00:00.000Z',
    '2020-05-11T00:00:00.000Z',
    '2021-05-11T00:00:00.000Z',
    '2009-05-11T00:00:00.000Z',
    '2011-05-11T00:00:00.000Z',
  ];
  const randomIndex = getRandomInteger(0, date.length - 1);
  return date[randomIndex];
};

const generateFilm = () => ({
  id: nanoid(),
  comments: generateActualComments(),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: generateRating(),
    poster: generatePoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: ['Takeshi Kitano'],
    actors: ['Morgan Freeman, Cергей Безруков'],
    release: {
      date: generateReleaseDate(),
      releaseCountry: 'Finland',
    },
    runtime: 77,
    genre: ['Comedy', 'Music', 'Horror'],
    description: generateFilmDescription(),
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: false,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});

const generateComment = () => ({
  id: generateId(),
  author: generateAuthor(),
  comment: generateCommentContent(),
  date: '2022-05-11T16:12:32.554Z',
  emotion: generateEmogi(),
});

export { generateFilm, generateComment };
