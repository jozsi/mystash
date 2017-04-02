import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read } from '../actions/transaction';
import Table from '../components/Table';
import currencyValue from '../../isomorphic/currencyValue';

const TRANSACTION_TABLE = new Map([
  ['Date', row => moment(row.date).format('L')],
  ['Details', row => row.details],
  ['Amount', row => currencyValue(row.amount, 'USD')],  // TODO: remove hardcoded currency
]);

class Wallet extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.read(params.id);
  }

  render() {
    const { transactionList } = this.props;

    return (
      <Table
        rows={transactionList}
        columns={TRANSACTION_TABLE}
      />
    );
  }
}

Wallet.propTypes = {
  transactionList: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  read: React.PropTypes.func.isRequired,
  match: React.PropTypes.shape({}).isRequired,
};

Wallet.defaultProps = {
  transactionList: [],
};

const mapStateToProps = ({ transaction }) => ({ transactionList: transaction.list });
const mapDispatchToProps = { read };

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
