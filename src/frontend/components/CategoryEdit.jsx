import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import TextInput from 'grommet/components/TextInput';

class CategoryEdit extends Component {
  state = {
    name: '',
    color: '',
  }

  updateStateFromProps({ name, color }) {
    this.setState({
      name,
      color,
    });
  }

  componentDidMount() {
    this.updateStateFromProps(this.props);
  }

  fieldChanged = (event, field) => this.setState({ [field]: event.target.value });

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    const {
      name,
      color,
    } = this.state;

    return (
      <Form
        plain
        onSubmit={this.onSubmit}
      >
        <FormFields>
          <FormField label="Name">
            <TextInput
              value={name}
              onDOMChange={ev => this.fieldChanged(ev, 'name')}
            />
          </FormField>
          <FormField>
            <ChromePicker
              color={color}
              onChangeComplete={({ hex }) => this.setState({ color: hex })}
            />
          </FormField>
          <FormField>
            <Button
              label="Submit"
              type="submit"
              primary
              onClick={this.onSubmit}
            />
          </FormField>
        </FormFields>
      </Form>
    );
  }
}

export default CategoryEdit;
