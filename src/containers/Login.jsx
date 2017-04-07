import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import { login } from '../actions/user';
import Logo from '../components/Logo';

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(fields) {
    const { dispatch } = this.props;
    dispatch(login(fields.username, fields.password));
  }

  render() {
    const { user } = this.props;

    return user.token ? <Redirect to="/" /> : (
      <Split flex="left" separator>

        <Article>
          <Section full colorIndex="brand" pad="large" justify="center" align="center">
            <Heading tag="h1"><strong>Wealthor</strong></Heading>
            <Paragraph align="center" size="large">
              Personal finance app
            </Paragraph>
          </Section>
        </Article>

        <Sidebar justify="between" align="center" pad="none" size="large">
          <span />
          <LoginForm
            align="start"
            onSubmit={this.onSubmit}
            errors={[user.error]}
            usernameType="email"
            logo={<Logo colorIndex="brand" />}
          />
          <Footer
            direction="row"
            size="small"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <span className="secondary">Star me on <a href="https://github.com/jozsi/wealthor">GitHub</a></span>
          </Footer>
        </Sidebar>

      </Split>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    error: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

const select = ({ user }) => ({ user });

export default connect(select)(Login);
