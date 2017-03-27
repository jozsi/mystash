import { TRANSACTION_READ_REQUEST, TRANSACTION_READ_SUCCESS, TRANSACTION_READ_FAILURE } from '../actions';

const initialState = { list: [] };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_READ_REQUEST:
      return { ...state, isLoading: true };
    case TRANSACTION_READ_SUCCESS:
      return {
        ...state,
        list: payload,
        isLoading: false,
      };
    case TRANSACTION_READ_FAILURE:
      return {
        ...state,
        error: (payload.response || {}).error || payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
