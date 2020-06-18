export const getImageUrl = ({ size = 'w500', path }) => {
  return `http://image.tmdb.org/t/p/${size}/${path}`;
};
