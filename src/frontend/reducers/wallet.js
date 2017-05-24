import { WALLET_READ_REQUEST, WALLET_READ_SUCCESS, WALLET_READ_FAILURE, WALLET_CREATE_SUCCESS } from '../actions';

const initialState = { list: [], ids: {} };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WALLET_READ_REQUEST:
      return { ...state, isLoading: true };
    case WALLET_READ_SUCCESS: {
      const nextState = {
        ...state,
        list: payload,
        isLoading: false,
      };
      nextState.list.forEach((item, i) => {
        nextState.ids[item.id] = i;
      });
      return nextState;
    }
    case WALLET_READ_FAILURE:
      return {
        ...state,
        error: (payload.response || {}).error || payload.message,
        isLoading: false,
      };
    case WALLET_CREATE_SUCCESS: {
      const nextState = {
        ...state,
        list: [...state.list, payload],
      };
      nextState.ids[payload.id] = nextState.list.length - 1;
      return nextState;
    }
    default:
      return state;
  }
};

export default reducer;

export const byId = (state, id) => state.list[state.ids[id]];
