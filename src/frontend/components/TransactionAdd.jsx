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

class TransactionAdd extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
  }

  static defaultProps = {
    onAdd: () => {},
  }

  state = {
    amount: 0,
    date: undefined,
    details: '',
    expense: true,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { expense, ...transaction } = this.state;
    if (expense) {
      transaction.amount *= -1;
    }
    this.props.onAdd(transaction);
  };

  fieldChanged = (event, field) => this.setState({ [field]: event.target.value });
  dateChanged = date => this.setState({ date });
  toggleType = () => this.setState({ expense: !this.state.expense });

  render() {
    const { amount, date, details, expense } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Header>
          <Heading>
            Add Transaction
          </Heading>
        </Header>
        <FormFields>
          <FormField>
            <RadioButton
              label="Expense"
              checked={expense}
              onChange={this.toggleType}
            />
            <RadioButton
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
        <Footer pad={{ vertical: 'small' }}>
          <Button
            label="Submit"
            type="submit"
            primary
            onClick={this.onSubmit}
          />
        </Footer>
      </Form>
    );
  }
}

export default TransactionAdd;
