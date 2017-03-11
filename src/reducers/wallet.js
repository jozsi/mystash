import { WALLET_READ_SUCCESS, WALLET_CREATE_SUCCESS } from '../actions';

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WALLET_READ_SUCCESS:
      return [...state, ...payload];
    case WALLET_CREATE_SUCCESS:
      return [...state, payload];
    default:
      return state;
  }
};

export default reducer;
