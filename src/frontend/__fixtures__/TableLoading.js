import base from './Table';

export default {
  ...base,
  props: {
    ...base.props,
    isLoading: true,
  },
};
