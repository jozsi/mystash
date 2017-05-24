import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Article from 'grommet/components/Article';
import App from 'grommet/components/App';
import Section from 'grommet/components/Section';
import { logout } from '../actions/user';
import Header from '../components/Header';

const Layout = ({ children, onLogout, user }) => (
  <App centered={false}>
    <Article>
      {user.token && <Header user={user} onLogout={onLogout} />}
      <Section pad={user.token ? 'small' : 'none'}>
        {children}
      </Section>
    </Article>
  </App>
);

Layout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  children: null,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { onLogout: logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
