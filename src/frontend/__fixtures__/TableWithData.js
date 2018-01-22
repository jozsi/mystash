import Component from '../components/Table';

export default {
  component: Component,
  props: {
    columns: new Map([
      ['Hello', row => row.hello],
      ['World', row => row.world],
    ]),
    rows: [{
      hello: 'hi',
      world: 'Earth',
    }],
  },
};
