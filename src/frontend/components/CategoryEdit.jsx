import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
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
        onClick={ev => ev.stopPropagation()}
      >
        <FormField label="Name">
          <TextInput
            value={name}
            onDOMChange={ev => this.fieldChanged(ev, 'name')}
          />
        </FormField>
        <ChromePicker
          color={color}
          onChangeComplete={({ hex }) => this.setState({ color: hex })}
          className="mystash-color-picker"
        />
        <Button
          fill
          label="Submit"
          type="submit"
          primary
          onClick={this.onSubmit}
        />
      </Form>
    );
  }
}

export default CategoryEdit;
