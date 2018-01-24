import { RSAA } from 'redux-api-middleware';
import {
  CATEGORY_READ_REQUEST,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAILURE,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
} from '../actions';

export const read = () => ({
  [RSAA]: {
    endpoint: '/category',
    method: 'GET',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [CATEGORY_READ_REQUEST, CATEGORY_READ_SUCCESS, CATEGORY_READ_FAILURE],
  },
});

export const create = category => ({
  [RSAA]: {
    endpoint: '/category',
    method: 'POST',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    body: JSON.stringify(category),
    types: [CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAILURE],
  },
});
