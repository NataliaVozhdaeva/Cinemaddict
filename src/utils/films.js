import dayjs from 'dayjs';

const humanizeReliaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');
const humanizeFullReliaseDate = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');

const humanizeFilmDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const humanizeCommentDate = (commentDate) => dayjs().to(dayjs(commentDate));

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

function compareRating(dateA, dateB) {
  return dateB - dateA;
}

const sortByRating = (filmA, filmB) => compareRating(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

export {
  humanizeReliaseDate,
  humanizeFullReliaseDate,
  humanizeFilmDuration,
  humanizeCommentDate,
  sortByRating,
  sortByDate,
};
