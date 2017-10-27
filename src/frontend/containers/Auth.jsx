import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Article from 'grommet/components/Article';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Sidebar from 'grommet/components/Sidebar';
import Section from 'grommet/components/Section';
import Split from 'grommet/components/Split';
import { login, signup } from '../actions/user';
import AuthForm from '../components/AuthForm';
import Logo from '../components/Logo';

class Auth extends Component {
  onSubmit = (fields) => {
    const { dispatch } = this.props;
    const action = this.isSignup() ? signup : login;
    dispatch(action(fields.username, fields.password, fields.firstName, fields.lastName));
  }

  isSignup = () => this.props.match.path === '/signup';

  render() {
    const { user } = this.props;
    const signupLink = <Link to="/signup" href="/signup">Need an account?</Link>;
    const loginLink = <Link to="/login" href="/login">Have an account?</Link>;
    const signupForm = this.isSignup();
    const link = signupForm ? loginLink : signupLink;
    const label = signupForm ? 'Sign Up' : 'Log In';

    return user.token ? <Redirect to="/" /> : (
      <Split flex="left" separator>

        <Article>
          <Section full colorIndex="brand" pad="large" justify="center" align="center">
            <Heading tag="h1"><strong>myStash</strong></Heading>
            <Paragraph align="center" size="large">
              Personal finance app
            </Paragraph>
          </Section>
        </Article>

        <Sidebar justify="between" align="center" pad="none" size="large">
          <span />
          <AuthForm
            align="start"
            onSubmit={this.onSubmit}
            errors={[user.error]}
            usernameType="email"
            logo={<Logo colorIndex="brand" />}
            label={label}
            link={link}
            extraFields={signupForm}
          />
          <Footer
            direction="row"
            size="small"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <span className="secondary">Star me on <a href="https://github.com/jozsi/mystash">GitHub</a></span>
          </Footer>
        </Sidebar>

      </Split>
    );
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    error: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

const select = ({ user }) => ({ user });

export default connect(select)(Auth);
