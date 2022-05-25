import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeReliaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');
const humanizeFullReliaseDate = (releaseDate) =>
  dayjs(releaseDate).format('DD MMMM YYYY');

const humanizeFilmDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  return `${hours  }h ${  minutes  }m`;
};

const isFilmChoose = (choose) => Object.values(choose).some(Boolean);

const humanizeCommentDate = (commentDate) =>
  dayjs(commentDate).format('YYYY/MM/DD HH:mm');

export {
  getRandomInteger,
  humanizeReliaseDate,
  humanizeFullReliaseDate,
  humanizeFilmDuration,
  isFilmChoose,
  humanizeCommentDate,
};
