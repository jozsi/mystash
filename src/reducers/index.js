import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';

const reducers = combineReducers({
  user,
  routing,
});

export default reducers;
