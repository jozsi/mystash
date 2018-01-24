import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import createWrapperProxy from 'react-cosmos-wrapper-proxy';
import GrommetApp from 'grommet/components/App';
import configureStore from './store';

const ReduxProxy = createReduxProxy({
  createStore: state => configureStore(state),
});

export default [
  ReduxProxy,
  createRouterProxy(),
  createWrapperProxy({
    component: GrommetApp,
    fixtureKey: 'grommet',
  }),
];
