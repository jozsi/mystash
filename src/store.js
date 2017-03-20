import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import DevTools from './containers/DevTools';
import reducers from './reducers';

export default new Promise((resolve) => {
  const middlewares = [
    applyMiddleware(
      thunk,
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

  persistStore(store, { whitelist: ['user'] }, () => resolve(store));
});
