import { RSAA } from 'redux-api-middleware';
import {
  RATE_READ_REQUEST,
  RATE_READ_SUCCESS,
  RATE_READ_FAILURE,
} from '../actions';

export const read = (pair = 'USD_RON') => ({
  [RSAA]: {
    endpoint: `https://free.currencyconverterapi.com/api/v5/convert?q=${pair}&compact=y`,
    method: 'GET',
    types: [RATE_READ_REQUEST, RATE_READ_SUCCESS, RATE_READ_FAILURE],
  },
});
