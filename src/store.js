import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import DevTools from './containers/DevTools';
import reducers from './reducers';

const middlewares = [
  applyMiddleware(
    thunk,
    routerMiddleware(browserHistory),
    apiMiddleware,
  ),
];

if (DevTools.enabled) {
  middlewares.push(DevTools.instrument());
}

const store = createStore(
  reducers,
  compose(...middlewares),
);

persistStore(store, { whitelist: ['user'] });

export default store;
