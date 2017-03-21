import currencies from 'currency-formatter/currencies';
import escapeStringRegexp from 'escape-string-regexp';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import NumberInput from 'grommet/components/NumberInput';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';

const currencyList = currencies.map(currency => ({
  value: currency.code,
  label: `${currency.code} (${currency.symbol})`,
}));

class WalletAdd extends Component {
  static propTypes = {
    onAdd: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      balance: 0,
      currency: {
        label: 'USD ($)',
        value: 'USD',
      },
      filteredCurrencies: currencyList,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.onAdd) {
      const { name, balance, currency: { value } } = this.state;
      this.props.onAdd({
        name,
        balance,
        currency: value,
      });
    }
  };

  fieldChanged = (event, field) => this.setState({ [field]: event.target.value });

  currencyChanged = ({ option }) => this.setState({ currency: option });

  filterCurrencies = (event) => {
    const search = event.target.value;
    const re = new RegExp(escapeStringRegexp(search), 'i');
    const filteredCurrencies = !search
      ? currencyList
      : currencyList.filter(currency => currency.label.search(re) !== -1);
    this.setState({
      filteredCurrencies,
      search,
    });
  }

  render() {
    const { balance, currency, filteredCurrencies, name } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Header>
          <Heading>
            Add Wallet
          </Heading>
        </Header>
        <FormFields>
          <FormField label="Name">
            <TextInput
              onDOMChange={ev => this.fieldChanged(ev, 'name')}
              value={name}
            />
          </FormField>
          <FormField label="Balance">
            <NumberInput
              onChange={ev => this.fieldChanged(ev, 'balance')}
              min={0}
              value={balance}
            />
          </FormField>
          <FormField label="Currency">
            <Select
              onChange={this.currencyChanged}
              options={filteredCurrencies}
              onSearch={this.filterCurrencies}
              value={currency}
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

export default WalletAdd;
