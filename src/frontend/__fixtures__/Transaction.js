import Component from '../components/Transaction';

export default {
  component: Component,
  grommet: true,
  props: {
    categoryList: [{
      id: '5a63d493c41e0909cc291fa6',
      color: '#2ad2c9',
      name: 'First category',
    }, {
      id: '5a63d493c41e0909cc291fa7',
      color: '#614767',
      name: 'Second category',
    }, {
      id: '5a63d493c41e0909cc291fa8',
      color: '#ff8d6d',
      name: 'Third category',
    }],
  },
};
