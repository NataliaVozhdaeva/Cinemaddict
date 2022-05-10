import { getRandomInteger } from "../utils.js";
import { EMOGI } from "../const.js";

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

export const generateComment = () => ({
  id: "42",
  author: generateAuthor(),
  comment: generateCommentContent(),
  date: "2019-05-11T16:12:32.554Z",
  emotion: EMOGI,
});
