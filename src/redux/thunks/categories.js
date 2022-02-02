import axios from 'axios';
import { actions as categoriesActions } from '../ducks/categories';

export const getCategories = () => async (dispatch) => {
  try {
    const { data: movieData } = await axios.get(
      '/medias/genre/movie/list', {
        params: {
          language: 'en-US',
        },
      },
    );
    const { data: tvData } = await axios.get(
      '/medias/genre/tv/list', {
        params: {
          language: 'en-US',//
        },
      },
    );
    dispatch(categoriesActions.setCategories([...movieData.genres, ...tvData.genres]));
  } catch (ex) {
    console.warn(ex);
  }
};

export default null;
