import axios from 'axios';
import { actions as categoriesActions } from '../ducks/categories';

export const getCategories = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      '/medias/genre/movie/list', {
        params: {
          language: 'pt-BR',
        },
      },
    );
    dispatch(categoriesActions.setCategories(data.genres));
  } catch (ex) {
    console.warn(ex);
  }
};

export default null;
