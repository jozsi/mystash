import { RSAA } from 'redux-api-middleware';
import {
  CATEGORY_READ_REQUEST,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAILURE,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
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

export const update = category => ({
  [RSAA]: {
    endpoint: `/category/${category.id}`,
    method: 'PUT',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    body: JSON.stringify(category),
    types: [CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAILURE],
  },
});

export const deleteCategory = id => ({
  [RSAA]: {
    endpoint: `/category/${id}`,
    method: 'DELETE',
    headers: state => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user.token}`,
    }),
    types: [{
      type: CATEGORY_DELETE_REQUEST,
      payload: id,
    }, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAILURE],
  },
});
