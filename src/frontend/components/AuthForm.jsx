import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import CSSClassnames from 'grommet/utils/CSSClassnames';

class AuthForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  };

  componentDidMount() {
    if (this.usernameRef) {
      this.usernameRef.focus();
    }
  }

  onFieldChange = (event, field) => this.setState({ [field]: event.target.value });
  onUsernameChange = event => this.onFieldChange(event, 'username');
  onPasswordChange = event => this.onFieldChange(event, 'password');
  onFirstNameChange = event => this.onFieldChange(event, 'firstName');
  onLastNameChange = event => this.onFieldChange(event, 'lastName');
  onSubmit = (event) => {
    event.preventDefault();
    let { firstName, lastName, password, username } = this.state;

    username = username.trim();
    password = password.trim();
    const fields = {
      username,
      password,
    };

    if (this.props.extraFields) {
      firstName = firstName.trim();
      lastName = lastName.trim();
      fields.firstName = firstName;
      fields.lastName = lastName;
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(fields);
    }
  }

  render() {
    const { align, errors, logo, title, usernameType, label, link, extraFields } = this.props;

    const classes = CSSClassnames.LOGIN_FORM;

    const errorsNode = errors.map((error, index) => {
      let errorComponent;
      if (error) {
        errorComponent = <div key={index} className="error">{error}</div>;
      }
      return errorComponent;
    });

    let titleNode;
    if (title) {
      titleNode = <Heading strong>{title}</Heading>;
    }

    const usernameLabel = usernameType === 'email' ? 'Email' : 'Username';

    return (
      <Form className={classes} pad="medium" onSubmit={this.onSubmit}>
        <Box align={align}>
          {logo}
          {titleNode}
        </Box>
        <fieldset>
          <FormField htmlFor="username" label={usernameLabel}>
            <input
              type={usernameType}
              ref={(ref) => { this.usernameRef = ref; }}
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          </FormField>
          {extraFields && <FormField htmlFor="firstName" label="First Name">
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.onFirstNameChange}
            />
          </FormField>}
          {extraFields && <FormField htmlFor="lastName" label="Last Name">
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.onLastNameChange}
            />
          </FormField>}
          <FormField htmlFor="password" label="Password">
            <input
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </FormField>
          {errorsNode}
        </fieldset>
        <Footer
          size="small"
          direction="row"
          align="center"
          justify="between"
          pad="none"
        >
          <Button
            primary
            type="submit"
            label={label}
            onClick={this.onSubmit}
          />
          {link}
        </Footer>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  errors: PropTypes.arrayOf(PropTypes.string),
  logo: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  usernameType: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.node,
  extraFields: PropTypes.bool,
};

AuthForm.defaultProps = {
  align: 'start',
  logo: null,
  errors: [],
  onSubmit: () => {},
  title: '',
  usernameType: 'email',
  label: 'Submit',
  link: null,
  extraFields: false,
};

export default AuthForm;
