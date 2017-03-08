import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'grommet/grommet.min.css';
import { initialize } from './actions/user';
import routes from './routes';
import DevTools from './screens/DevTools';
import store from './store';

store.dispatch(initialize());

const App = () => (
  <Provider store={store}>
    <div>
      <Router routes={routes} history={browserHistory} />
      <DevTools />
    </div>
  </Provider>
);

export default App;
