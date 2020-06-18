import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import { reducers as duckReducers } from './ducks';

const allReducers = combineReducers(duckReducers);

const mainReducer = (state, action) => {
  return allReducers(state, action);
};

const composeEnhancers =
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
