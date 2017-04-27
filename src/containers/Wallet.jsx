import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Add from 'grommet/components/icons/base/Add';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read as readTransaction, create } from '../actions/transaction';
import { read as readWallet } from '../actions/wallet';
import Table from '../components/Table';
import TransactionAdd from '../components/TransactionAdd';
import { byId } from '../reducers/wallet';
import currencyValue from '../../isomorphic/currencyValue';

class Wallet extends Component {
  state = {
    addVisible: false,
  };

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

  toggleAdd = () => this.setState({ addVisible: !this.state.addVisible });
  transactionAdded = (transaction) => {
    this.props.create({ ...transaction, wallet: this.props.match.params.id });
    this.toggleAdd();
  }

  render() {
    const { transactionList, wallet } = this.props;
    const { addVisible } = this.state;

    if (!wallet.id) {
      return null;
    }

    return (
      <Box>
        <Box
          direction="row"
          justify="between"
          align="center"
        >
          <Heading>{wallet.name}</Heading>
          <Button
            icon={<Add />}
            label="Add"
            secondary
            onClick={this.toggleAdd}
          />
        </Box>
        <Animate
          enter={{ animation: 'slide-down', duration: 300 }}
          visible={addVisible}
        >
          <Quote borderColorIndex="neutral-4" size="full" align="center">
            <TransactionAdd onAdd={this.transactionAdded} />
          </Quote>
        </Animate>
        <Table
          rows={transactionList}
          columns={this.TRANSACTION_TABLE}
          emptyMessage="Let's add a transaction, shall we?"
        />
      </Box>
    );
  }
}

Wallet.propTypes = {
  transactionList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    date: PropTypes.string,
    details: PropTypes.string,
  })),
  wallet: PropTypes.shape({
    currency: PropTypes.string,
  }),
  create: PropTypes.func.isRequired,
  readTransaction: PropTypes.func.isRequired,
  readWallet: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

Wallet.defaultProps = {
  transactionList: [],
  wallet: {},
};

const mapStateToProps = ({ transaction, wallet }, { match: { params } }) => ({
  transactionList: transaction.wallet === params.id ? transaction.list : [],
  wallet: byId(wallet, params.id),
});

const mapDispatchToProps = {
  readTransaction,
  readWallet,
  create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
