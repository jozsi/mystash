import {
  CATEGORY_READ_REQUEST,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAILURE,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS,
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
    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id !== payload.id) {
            return item;
          }

          return {
            ...item,
            ...payload,
          };
        }),
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(({ id }) => id !== payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
