import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import DevTools from './containers/DevTools';
import reducers from './reducers';

const middlewares = [applyMiddleware(
  thunk,
  routerMiddleware(browserHistory)
)];

if (DevTools.enabled) {
  middlewares.push(DevTools.instrument());
}

const store = createStore(
  reducers,
  compose(...middlewares),
);

export default store;
