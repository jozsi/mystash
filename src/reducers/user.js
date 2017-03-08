import { USER_LOGIN, USER_LOGOUT } from '../actions';

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { state, ...payload };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
