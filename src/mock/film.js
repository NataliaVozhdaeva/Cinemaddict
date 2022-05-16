import { getRandomInteger } from "../utils.js";
import { EMOGI } from "../const.js";

const generateTitle = () => {
  const titles = [
    "The Man with the Golden Arm",
    "The Great Flamarion",
    "Santa Claus Conquers the Martians",
    "Made for Each Other",
    "The dance of life",
    "Popeye & Sindbad",
    "Sagebrush trail",
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

const generateFilmDescription = () => {
  const descriptions = [
    'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",
    "Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.",
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
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

const generateId = () => {
  const id = ["0", "1", "2", "3"];
  const randomIndex = getRandomInteger(0, id.length - 1);
  return id[randomIndex];
};

const generateFilm = () => ({
  id: ["42"],
  comments: ["0", "3"],
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
    description: generateFilmDescription(),
  },
  userDetails: {
    watchlist: true,
    already_watched: false,
    watching_date: "2019-04-12T16:12:32.554Z",
    favorite: true,
  },
});

const generateComment = () => ({
  id: generateId(),
  author: generateAuthor(),
  comment: generateCommentContent(),
  date: "2022-05-11T16:12:32.554Z",
  emotion: generateEmogi(),
});

export { generateFilm, generateComment };
