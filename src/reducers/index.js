import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import hydrated from './hydrated';
import user from './user';
import wallet from './wallet';

const reducers = combineReducers({
  user,
  routing,
  hydrated,
  wallet,
});

export default reducers;
