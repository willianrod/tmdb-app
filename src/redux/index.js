import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';

import thunk from 'redux-thunk';

import duckReducers from './ducks';

const allReducers = combineReducers(duckReducers);

const middlewares = [thunk];

export const store = createStore(
  allReducers,
  compose(applyMiddleware(...middlewares)),
);

export default null;
