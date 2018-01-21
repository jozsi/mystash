import Component from '../components/Header';

export default {
  component: Component,
  props: {
    user: {
      firstName: 'Cosmos',
    },
    onLogout: () => {},
  },
  url: '/',
};
