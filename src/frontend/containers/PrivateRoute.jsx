import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? React.createElement(component, props)
        : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({ isAuthenticated: !!user.token });

export default connect(mapStateToProps)(PrivateRoute);
