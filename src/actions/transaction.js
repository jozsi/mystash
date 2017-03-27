import { CALL_API } from 'redux-api-middleware';
import {
  TRANSACTION_READ_REQUEST,
  TRANSACTION_READ_SUCCESS,
  TRANSACTION_READ_FAILURE,
} from '../actions';

export const read = walletId => ({
  [CALL_API]: {
    endpoint: `/transaction/${walletId}`,
    method: 'GET',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [TRANSACTION_READ_REQUEST, TRANSACTION_READ_SUCCESS, TRANSACTION_READ_FAILURE],
  },
});

export const create = () => {};
