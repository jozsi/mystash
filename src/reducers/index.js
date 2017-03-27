import { combineReducers } from 'redux';
import hydrated from './hydrated';
import user from './user';
import transaction from './transaction';
import wallet from './wallet';

const reducers = combineReducers({
  user,
  hydrated,
  transaction,
  wallet,
});

export default reducers;
