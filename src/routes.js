import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import Home from './containers/Home';
import Layout from './containers/Layout';
import Login from './containers/Login';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  authenticatingSelector: state => !state.hydrated,
  predicate: user => user.token,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
});

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  authenticatingSelector: state => !state.hydrated,
  predicate: user => !user.token,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
  failureRedirectPath: '/',
});

const routes = {
  path: '/',
  component: Layout,
  childRoutes: [
    { path: 'login', component: UserIsNotAuthenticated(Login) },
  ],
  indexRoute: { component: UserIsAuthenticated(Home) },
};

export default routes;
