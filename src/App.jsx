import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'grommet/grommet.min.css';
import { initialize } from './actions/user';
import routes from './routes';
import store from './store';

store.dispatch(initialize());

const App = () => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
);

export default App;
