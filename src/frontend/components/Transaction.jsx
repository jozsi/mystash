import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import NumberInput from 'grommet/components/NumberInput';
import RadioButton from 'grommet/components/RadioButton';
import TextInput from 'grommet/components/TextInput';
import Trash from 'grommet/components/icons/base/Trash';

class Transaction extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    onSubmit: () => {},
    onDelete: () => {},
  }

  state = {
    amount: 0,
    date: undefined,
    details: '',
    expense: true,
    id: undefined,
  };

  updateStateFromProps(props) {
    const { amount, date, details, id } = props.selectedTransaction;
    if (!id) {
      return;
    }
    const expense = amount < 0;
    this.setState({
      amount: Math.abs(amount),
      date: new Date(date),
      details,
      expense,
      id,
    });
  }

  componentDidMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateStateFromProps(newProps);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { expense, ...transaction } = this.state;
    if (expense) {
      transaction.amount *= -1;
    }
    this.props.onSubmit(transaction);
  };

  onDelete = () => this.props.onDelete(this.state.id);

  fieldChanged = (event, field) => this.setState({ [field]: event.target.value });
  dateChanged = date => this.setState({ date });
  toggleType = () => this.setState({ expense: !this.state.expense });

  render() {
    const {
      amount,
      date,
      details,
      expense,
      id,
    } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Header>
          <Heading>
            {id ? 'Edit' : 'Add'} Transaction
          </Heading>
        </Header>
        <FormFields>
          <FormField>
            <RadioButton
              id="expense-true"
              label="Expense"
              checked={expense}
              onChange={this.toggleType}
            />
            <RadioButton
              id="expense-false"
              label="Income"
              checked={!expense}
              onChange={this.toggleType}
            />
          </FormField>
          <FormField label="Amount">
            <NumberInput
              onChange={ev => this.fieldChanged(ev, 'amount')}
              min={0}
              value={amount}
            />
          </FormField>
          <FormField label="Details">
            <TextInput
              onDOMChange={ev => this.fieldChanged(ev, 'details')}
              value={details}
            />
          </FormField>
          <FormField label="Date">
            <DateTime
              format="YYYY-MM-DD"
              onChange={this.dateChanged}
              value={date}
            />
          </FormField>
        </FormFields>
        <Footer justify="between" pad={{ vertical: 'small' }}>
            <Button
              label="Submit"
              type="submit"
              primary
              onClick={this.onSubmit}
            />
            {id && (
              <Button
                icon={<Trash />}
                onClick={this.onDelete}
                hoverIndicator={{ background: 'critical' }}
              />
            )}
        </Footer>
      </Form>
    );
  }
}

export default Transaction;
