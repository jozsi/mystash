import { combineReducers } from 'redux';
import hydrated from './hydrated';
import user from './user';
import wallet from './wallet';

const reducers = combineReducers({
  user,
  hydrated,
  wallet,
});

export default reducers;
