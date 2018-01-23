import base from './AuthForm';

export default {
  ...base,
  props: {
    ...base.props,
    errors: [
      'I am an error',
    ],
  },
};
