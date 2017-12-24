import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import DevTools from './containers/DevTools';
import reducers from './reducers';

const middlewares = [
  applyMiddleware(
    thunk,
    apiMiddleware,
  ),
];

if (DevTools.enabled) {
  middlewares.push(DevTools.instrument());
}

const config = {
  key: 'root',
  storage,
  whitelist: [
    'user',
  ],
};

const configureStore = (
  reducer = persistCombineReducers(config, reducers),
  enhancer = compose(...middlewares),
) => {
  const store = createStore(
    reducer,
    enhancer,
  );

  const persistor = persistStore(store);

  return {
    persistor,
    store,
  };
};

export default configureStore;
