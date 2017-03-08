import { USER_LOGIN, USER_LOGOUT } from '../actions';
import { login as apiLogin } from '../api/user';

export const login = (email, password) => dispatch => apiLogin(email, password)
  .then(response => dispatch({ type: USER_LOGIN, payload: response.data }))
  .catch(response => dispatch({ type: USER_LOGIN, payload: response.response.data }));

export const logout = dispatch => dispatch({ type: USER_LOGOUT });
