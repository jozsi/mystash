import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'grommet/grommet.min.css';
import routes from './routes';
import DevTools from './containers/DevTools';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <div>
      <Router
        routes={routes}
        history={history}
      />
      {DevTools.enabled && <DevTools />}
    </div>
  </Provider>
);

export default App;
