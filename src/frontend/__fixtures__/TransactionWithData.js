import base from './Transaction';

export default {
  ...base,
  props: {
    ...base.props,
    selectedTransaction: {
      id: '5a67ae4492085804299954ee',
      amount: -100,
      details: 'Hello Transaction',
      date: '2018-01-23T21:51:00.420Z',
    },
  },
};
