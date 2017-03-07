import React from 'react';
import App from 'grommet/components/App';

const Main = ({ children }) => (
  <App centered={false}>
    {children}
  </App>
);

Main.propTypes = {
  children: React.PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
