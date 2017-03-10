import { REHYDRATE } from 'redux-persist/constants';
import { USER_LOGIN, USER_LOGOUT } from '../actions';

const initialState = {
  rehydrated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { ...state, ...payload };
    case USER_LOGOUT:
      return initialState;
    case REHYDRATE:
      return { ...state, ...(payload.user || {}), rehydrated: true };
    default:
      return state;
  }
};

export default reducer;
