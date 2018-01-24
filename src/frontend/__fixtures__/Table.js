import Component from '../components/Table';

export default {
  component: Component,
  grommet: true,
  props: {
    columns: new Map([
      ['Hello', row => row.hello],
      ['World', row => row.world],
    ]),
  },
};
