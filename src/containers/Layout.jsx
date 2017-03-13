import React from 'react';
import { connect } from 'react-redux';
import Article from 'grommet/components/Article';
import App from 'grommet/components/App';
import Section from 'grommet/components/Section';
import { logout } from '../actions/user';
import Header from '../components/Header';

const Layout = ({ children, onLogout, user }) => (
  <App centered={false}>
    <Article>
      {user.token && <Header user={user} onLogout={onLogout} />}
      <Section pad="small">
        {children}
      </Section>
    </Article>
  </App>
);

Layout.propTypes = {
  children: React.PropTypes.node,
  user: React.PropTypes.shape({
    token: React.PropTypes.string,
  }).isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

Layout.defaultProps = {
  children: null,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { onLogout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
