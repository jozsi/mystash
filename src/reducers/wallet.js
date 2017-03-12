import { WALLET_READ_REQUEST, WALLET_READ_SUCCESS, WALLET_READ_FAILURE, WALLET_CREATE_SUCCESS } from '../actions';

const initialState = { list: [] };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WALLET_READ_REQUEST:
      return { ...state, isLoading: true };
    case WALLET_READ_SUCCESS:
      return {
        ...state,
        list: payload,
        isLoading: false,
      };
    case WALLET_READ_FAILURE:
      return {
        ...state,
        error: (payload.response || {}).error || payload.message,
        isLoading: false,
      };
    case WALLET_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, payload],
      };
    default:
      return state;
  }
};

export default reducer;
