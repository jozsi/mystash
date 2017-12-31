import { RSAA } from 'redux-api-middleware';
import {
  TRANSACTION_READ_REQUEST,
  TRANSACTION_READ_SUCCESS,
  TRANSACTION_READ_FAILURE,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAILURE,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAILURE,
} from '../actions';

export const read = walletId => ({
  [RSAA]: {
    endpoint: `/transaction/in/${walletId}`,
    method: 'GET',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [{
      type: TRANSACTION_READ_REQUEST,
      payload: walletId,
    }, TRANSACTION_READ_SUCCESS, TRANSACTION_READ_FAILURE],
  },
});

export const create = transaction => ({
  [RSAA]: {
    endpoint: '/transaction',
    method: 'POST',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    body: JSON.stringify(transaction),
    types: [TRANSACTION_CREATE_REQUEST, TRANSACTION_CREATE_SUCCESS, TRANSACTION_CREATE_FAILURE],
  },
});

export const deleteTransaction = id => ({
  [RSAA]: {
    endpoint: `/transaction/${id}`,
    method: 'DELETE',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [{
      type: TRANSACTION_DELETE_REQUEST,
      payload: id,
    }, TRANSACTION_DELETE_SUCCESS, TRANSACTION_DELETE_FAILURE],
  },
});
