import dotProp from 'dot-prop-immutable';
import {
  WALLET_READ_REQUEST,
  WALLET_READ_SUCCESS,
  WALLET_READ_FAILURE,
  WALLET_READ_ONE_REQUEST,
  WALLET_READ_ONE_SUCCESS,
  WALLET_READ_ONE_FAILURE,
  WALLET_CREATE_SUCCESS,
} from '../actions';

const initialState = {
  list: [],
  ids: {},
  isLoading: false,
};

const upsert = (state, item) => {
  const idx = state.ids[item.id];
  if (idx !== undefined) {
    return dotProp.set(state, `list.${idx}`, item);
  }

  const nextState = {
    ...state,
    list: [
      ...state.list,
      item,
    ],
  };
  nextState.ids[item.id] = nextState.list.length - 1;

  return nextState;
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WALLET_READ_REQUEST:
    case WALLET_READ_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case WALLET_READ_SUCCESS: {
      let nextState = {
        ...state,
        isLoading: false,
      };
      payload.forEach(item => nextState = upsert(nextState, item));

      return nextState;
    }

    case WALLET_READ_ONE_SUCCESS:
    case WALLET_CREATE_SUCCESS: {
      const newState = upsert(state, payload);
      newState.isLoading = false;

      return newState;
    }

    case WALLET_READ_FAILURE:
    case WALLET_READ_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: (payload.response || {}).error || payload.message,
      };

    default:
      return state;
  }
};

export default reducer;

export const byId = (state, id) => state.list[state.ids[id]];
