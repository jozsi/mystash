import {
  CATEGORY_READ_REQUEST,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAILURE,
  CATEGORY_CREATE_SUCCESS,
} from '../actions';

const initialState = { list: [] };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_READ_REQUEST:
      return {
        ...initialState,
        isLoading: true,
      };
    case CATEGORY_READ_SUCCESS:
      return {
        ...state,
        list: payload,
        isLoading: false,
      };
    case CATEGORY_READ_FAILURE:
      return {
        ...state,
        error: (payload.response || {}).error || payload.message,
        isLoading: false,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, payload],
      };
    default:
      return state;
  }
};

export default reducer;
