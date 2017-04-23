import { REHYDRATE } from 'redux-persist/constants';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGOUT,
} from '../actions';

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REHYDRATE: {
      if (payload.user) {
        const { error, isLoading, ...rest } = payload.user;
        return { ...state, ...rest };
      }
      return state;
    }
    case USER_SIGNUP_REQUEST:
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case USER_SIGNUP_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        error: (payload.response || {}).error || payload.message,
        isLoading: false,
      };
    case USER_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
