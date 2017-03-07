import Main from './components/Main';
import Home from './screens/Home';
import Login from './screens/Login';

export default {
  path: '/',
  component: Main,
  childRoutes: [
    { path: 'login', component: Login },
    { path: 'home', component: Home },
  ],
  indexRoute: { component: Home },
};
