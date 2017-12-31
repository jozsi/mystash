import {
  TRANSACTION_READ_REQUEST,
  TRANSACTION_READ_SUCCESS,
  TRANSACTION_READ_FAILURE,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_SUCCESS,
} from '../actions';

const initialState = { list: [] };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_READ_REQUEST:
      return {
        ...initialState,
        wallet: payload,
        isLoading: true,
      };
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
    case TRANSACTION_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case TRANSACTION_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(({ id }) => id !== payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
