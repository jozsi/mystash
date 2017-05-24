import { RSAA } from 'redux-api-middleware';
import {
  WALLET_READ_REQUEST,
  WALLET_READ_SUCCESS,
  WALLET_READ_FAILURE,
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS,
  WALLET_CREATE_FAILURE,
} from '../actions';

export const read = () => ({
  [RSAA]: {
    endpoint: '/wallet',
    method: 'GET',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [WALLET_READ_REQUEST, WALLET_READ_SUCCESS, WALLET_READ_FAILURE],
  },
});

export const create = wallet => ({
  [RSAA]: {
    endpoint: '/wallet',
    method: 'POST',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    body: JSON.stringify(wallet),
    types: [WALLET_CREATE_REQUEST, WALLET_CREATE_SUCCESS, WALLET_CREATE_FAILURE],
  },
});
