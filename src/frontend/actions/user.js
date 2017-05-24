import { RSAA } from 'redux-api-middleware';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGOUT,
} from '../actions';

export const login = (email, password) => ({
  [RSAA]: {
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

export const signup = (email, password, firstName, lastName) => ({
  [RSAA]: {
    endpoint: '/user',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
    types: [USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE],
  },
});

export const logout = () => dispatch => dispatch({ type: USER_LOGOUT });
