import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read as readTransaction } from '../actions/transaction';
import { read as readWallet } from '../actions/wallet';
import Table from '../components/Table';
import { byId } from '../reducers/wallet';
import currencyValue from '../../isomorphic/currencyValue';

class Wallet extends Component {
  componentDidMount() {
    const { match: { params }, wallet } = this.props;
    if (!wallet.id) {
      this.props.readWallet();
    }
    this.props.readTransaction(params.id);
  }

  TRANSACTION_TABLE = new Map([
    ['Date', row => moment(row.date).format('L')],
    ['Details', row => row.details],
    ['Amount', row => currencyValue(row.amount, this.props.wallet.currency)],
  ]);

  render() {
    const { transactionList } = this.props;

    return (
      <Table
        rows={transactionList}
        columns={this.TRANSACTION_TABLE}
      />
    );
  }
}

Wallet.propTypes = {
  transactionList: React.PropTypes.arrayOf(React.PropTypes.shape({
    amount: React.PropTypes.number,
    date: React.PropTypes.string,
    details: React.PropTypes.string,
  })),
  wallet: React.PropTypes.shape({
    currency: React.PropTypes.string,
  }),
  readTransaction: React.PropTypes.func.isRequired,
  readWallet: React.PropTypes.func.isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.object,
  }).isRequired,
};

Wallet.defaultProps = {
  transactionList: [],
  wallet: {},
};

const mapStateToProps = ({ transaction, wallet }, { match: { params } }) => ({
  transactionList: transaction.list,
  wallet: byId(wallet, params.id),
});

const mapDispatchToProps = {
  readTransaction,
  readWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
