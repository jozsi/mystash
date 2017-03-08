import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import DevTools from './screens/DevTools';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
  ),
);

export default store;
