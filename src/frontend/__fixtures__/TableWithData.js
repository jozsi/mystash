import base from './Table';

export default {
  ...base,
  props: {
    ...base.props,
    rows: [{
      hello: 'hi',
      world: 'Earth',
    }],
  },
};
