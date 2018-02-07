import React, { PureComponent } from 'react';
import { ChromePicker } from 'react-color';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

class CategoryEdit extends PureComponent {
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

  componentWillReceiveProps(newProps) {
    this.updateStateFromProps(newProps);
  }

  fieldChanged = (event, field) => this.setState({ [field]: event.target.value });

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  onDelete = (event) => {
    event.preventDefault();
    this.props.onDelete(this.props.id);
  }

  render() {
    const {
      name,
      color,
    } = this.state;
    const {
      id,
    } = this.props;

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
        {id && (
          <Button
            fill
            label="Delete"
            critical
            onClick={this.onDelete}
          />
        )}
      </Form>
    );
  }
}

CategoryEdit.defaultProps = {
  onSubmit: () => {},
  onDelete: () => {},
};

export default CategoryEdit;
