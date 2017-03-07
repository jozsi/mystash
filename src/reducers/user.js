import { USER_LOAD, USER_LOGIN, USER_LOGOUT } from '../actions';
import { createReducer } from './utils';

const initialState = {};

const handlers = {
  [USER_LOAD]: (state, action) => action.payload,
  [USER_LOGIN]: (state, action) => Object.assign({}, state, action.payload),
  [USER_LOGOUT]: () => ({}),
};

export default createReducer(initialState, handlers);
