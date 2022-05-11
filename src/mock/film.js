import { getRandomInteger } from "../utils.js";
import { EMOGI } from "../const.js";

const generateTitle = () => {
  const titles = [
    "A Little Pony Without The Carpet",
    "The Man with the Golden Arm",
    "The Great Flamarion",
    "Santa Claus Conquers the Martians",
    "Made for Each Other",
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    "./images/posters/the-dance-of-life.jpg",
    "./images/posters/made-for-each-other.png",
    "./images/posters/popeye-meets-sinbad.png",
    "./images/posters/sagebrush-trail.jpg",
    "./images/posters/santa-claus-conquers-the-martians.jpg",
    "./images/posters/the-great-flamarion.jpg",
    "./images/posters/the-man-with-the-golden-arm.jpg",
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateCommentContent = () => {
  const commentsTexts = [
    "Grate",
    "So-so",
    "I didn't understood anything",
    "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
    "Фигня ваше кино, мне Танька рассказывала",
    "It's wonderful!",
    "Very bad",
    "But I was waiting for Chuk Norris...",
    "Almost two hours? Seriously?",
  ];
  const randomIndex = getRandomInteger(0, commentsTexts.length - 1);

  return commentsTexts[randomIndex];
};

const generateAuthor = () => {
  const autors = [
    "Ilya O'Reilly",
    "John Dow",
    "Will Smith",
    "Jane Ostin",
    "Volan d'Mort",
  ];
  const randomIndex = getRandomInteger(0, autors.length - 1);

  return autors[randomIndex];
};

const generateEmogi = () => {
  const emogi = EMOGI;
  const randomIndex = getRandomInteger(0, EMOGI.length - 1);

  return emogi[randomIndex];
};

const generateFilm = () => ({
  id: "42",
  comments: [],
  filmInfo: {
    title: generateTitle(),
    alternative_title: "Laziness Who Sold Themselves",
    totalRating: 5.3,
    poster: generatePoster(),
    age_rating: 0,
    director: "Tom Ford",
    writers: ["Takeshi Kitano"],
    actors: ["Morgan Freeman, Cергей Безруков"],
    release: {
      date: "2019-05-11T00:00:00.000Z",
      release_country: "Finland",
    },
    runtime: 77,
    genre: ["Comedy", "Music"],
    description:
      'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  },
  userDetails: {
    watchlist: true,
    already_watched: false,
    watching_date: "2019-04-12T16:12:32.554Z",
    favorite: true,
  },
});

const generateComment = () => ({
  id: "42",
  author: generateAuthor(),
  comment: generateCommentContent(),
  date: "2019-05-11T16:12:32.554Z",
  emotion: generateEmogi(),
});

export { generateFilm, generateComment };
