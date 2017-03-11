import { CALL_API } from 'redux-api-middleware';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../actions';

export const login = (email, password) => ({
  [CALL_API]: {
    endpoint: '/user/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
    types: [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
  },
});

export const logout = () => dispatch => dispatch({ type: USER_LOGOUT });
