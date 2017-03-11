import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import hydrated from './hydrated';
import user from './user';

const reducers = combineReducers({
  user,
  routing,
  hydrated,
});

export default reducers;
