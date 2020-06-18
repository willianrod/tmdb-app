import { actions as categoriesActions } from "../ducks/categories";
import axios from "axios";

export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        "/medias/genre/movie/list", {
          params: {
            language: 'pt-BR'
          }
        }
      );
      dispatch(categoriesActions.setCategories(data.genres));
    } catch (ex) {
      console.warn(ex);
    }
  };
};
