import { handleAction, createAction } from 'redux-actions';

const setCategories = createAction('CATEGORIES/SET_CATEGORIES');

export const actions = {
  setCategories,
};

const categoriesHandler = handleAction(
  setCategories,
  (state, action) => action.payload,
  null,
);

export const reducers = {
  categories: categoriesHandler,
};
