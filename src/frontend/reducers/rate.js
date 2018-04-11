import {
  RATE_READ_REQUEST,
  RATE_READ_SUCCESS,
  RATE_READ_FAILURE,
} from '../actions';

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RATE_READ_SUCCESS:
      const newState = { ...state };
      Object.entries(payload).forEach(([key, { val }]) => newState[key] = val);
      return newState;
    case RATE_READ_REQUEST:
    case RATE_READ_FAILURE:
    default:
      return state;
  }
};

export default reducer;
