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

const generateFilm = () => ({
  id: "0",
  comments: ["42", "33", "28"],
  filmInfo: {
    title: generateTitle(),
    alternative_title: "Laziness Who Sold Themselves",
    totalRating: 5.3,
    poster: "./images/posters/the-dance-of-life.jpg",
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
  emotion: EMOGI,
});

export { generateFilm, generateComment };
