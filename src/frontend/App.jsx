import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import 'grommet/grommet-hpe.min.css';
import configureStore from './store';
import Auth from './containers/Auth';
import DevTools from './containers/DevTools';
import Home from './containers/Home';
import Layout from './containers/Layout';
import PrivateRoute from './containers/PrivateRoute';
import Wallet from './containers/Wallet';
import Category from './containers/Category';

const { persistor, store } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/wallet/:id" component={Wallet} />
            <PrivateRoute path="/category" component={Category} />
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Redirect to="/" />
          </Switch>
          {DevTools.enabled && <DevTools />}
        </Layout>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
