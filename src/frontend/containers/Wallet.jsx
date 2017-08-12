import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Add from 'grommet/components/icons/base/Add';
import Down from 'grommet/components/icons/base/Down';
import Up from 'grommet/components/icons/base/Up';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
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

const getTotal = list => list.reduce((sum, x) => sum + x.amount, 0);
const totalExpenses = list => getTotal(list.filter(x => x.amount < 0));
const totalIncomes = list => getTotal(list.filter(x => x.amount > 0));
const getTypeDistribution = (list) => {
  const expenses = totalExpenses(list);
  const incomes = totalIncomes(list);

  return [{
    label: 'Expenses',
    value: expenses * -1,
    colorIndex: 'graph-2',
  }, {
    label: 'Incomes',
    value: incomes,
    colorIndex: 'graph-1',
  }];
};

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
    ['', row => (row.amount < 0 ? <Down colorIndex="critical" /> : <Up colorIndex="ok" />)],
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
        <AnnotatedMeter
          type="circle"
          series={getTypeDistribution(transactionList)}
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
