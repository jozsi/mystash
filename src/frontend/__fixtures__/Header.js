import Component from '../components/Header';

export default {
  component: Component,
  grommet: true,
  props: {
    user: {
      firstName: 'Cosmos',
    },
    onLogout: () => {},
  },
  url: '/',
};
