import { browserHistory } from 'react-router';
import { USER_LOAD, USER_LOGIN, USER_LOGOUT } from '../actions';
import { login as apiLogin } from '../api/user';

const localStorage = window.localStorage;

export function initialize() {
  return (dispatch) => {
    const { token } = localStorage;
    if (token) {
      dispatch({
        type: USER_LOAD,
        payload: { token },
      });
    } else {
      browserHistory.push('/login');
    }
  };
}

export function login(email, password) {
  return dispatch => (
    apiLogin(email, password)
      .then((response) => {
        const payload = response.data;
        dispatch({ type: USER_LOGIN, payload });
        try {
          localStorage.token = payload.token;
        } catch (e) {
          // Unable to preserve session, probably due to being in private browsing mode.
        }
        browserHistory.push('/home');
      })
      .catch(response => dispatch({
        type: USER_LOGIN,
        payload: response.response.data,
      }))
  );
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    try {
      localStorage.removeItem('token');
    } catch (e) {
      // Unable to preserve session, probably due to being in private browsing mode.
    }
    window.location.href = '/login';  // Full Reload
  };
}
