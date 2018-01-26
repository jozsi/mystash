import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Add from 'grommet/components/icons/base/Add';
import Close from 'grommet/components/icons/base/Close';
import Down from 'grommet/components/icons/base/Down';
import Up from 'grommet/components/icons/base/Up';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read as readCategory } from '../actions/category';
import { read as readTransaction, create, update, deleteTransaction } from '../actions/transaction';
import { readOne as readWallet } from '../actions/wallet';
import Category from '../components/Category';
import Table from '../components/Table';
import Timeseries from '../components/Timeseries';
import Transaction from '../components/Transaction';
import { byId } from '../reducers/wallet';
import currencyValue from '../../isomorphic/currencyValue';

class Wallet extends Component {
  state = {
    addVisible: false,
    selectedTransaction: {},
  };

  updateWallet(includeTransactions) {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    this.props.readWallet(id);

    if (includeTransactions) {
      this.props.readTransaction(id);
      this.props.readCategory();
    }
  }

  componentDidMount() {
    this.updateWallet(true);
  }

  TRANSACTION_TABLE = new Map([
    ['', row => (row.amount < 0 ? <Down colorIndex="critical" /> : <Up colorIndex="ok" />)],
    ['Date', row => moment(row.date).format('L')],
    ['Details', row => row.details],
    ['Category', row => (
      <Category
        categories={row.categories}
        categoryList={this.props.categoryList}
        disabled
        placeholder="None"
        style={{
          border: 'none',
          backgroundColor: 'inherit',
        }}
        arrowRenderer={null}
      />
    )],
    ['Amount', row => currencyValue(row.amount, this.props.wallet.currency)],
  ]);

  toggleAdd = () => {
    const addVisible = !this.state.addVisible;
    this.setState({ addVisible, selectedTransaction: {} });
  };
  transactionSubmitted = (transaction) => {
    const method = transaction.id ? 'update' : 'create';
    this.props[method]({ ...transaction, wallet: this.props.match.params.id })
      .then(() => this.updateWallet());
    this.toggleAdd();
  }
  transactionDeleted = (id) => {
    this.props.deleteTransaction(id)
      .then(() => this.updateWallet());
    this.toggleAdd();
  }
  rowSelected = (i) => {
    const selectedTransaction = this.props.transactionList[i];
    this.setState({
      addVisible: true,
      selectedTransaction,
    });
    if (this.transactionBox) {
      this.transactionBox.scrollIntoView(false);
    }
  };

  render() {
    const { transactionList, wallet, categoryList } = this.props;
    const { addVisible, selectedTransaction } = this.state;

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
          <Heading>{`${wallet.name} / ${wallet.formattedBalance}`}</Heading>
          {addVisible ? (
            <Button
              icon={<Close />}
              onClick={this.toggleAdd}
            />
          ) : (
            <Button
              icon={<Add />}
              label="Add"
              secondary
              onClick={this.toggleAdd}
            />
          )}
        </Box>
        {wallet.charts && (
          <div>
            <Timeseries
              actual={wallet.charts.actual}
              forecast={wallet.charts.forecast}
              previous={wallet.charts.previous}
            />
            <h3>{wallet.charts.forecast.forecastMessage}</h3>
          </div>
        )}
        <div ref={node => this.transactionBox = node}>
          <Animate
            enter={{ animation: 'slide-down', duration: 300 }}
            visible={addVisible}
          >
            <Quote borderColorIndex="neutral-4" size="full" align="center">
              <Transaction
                onSubmit={this.transactionSubmitted}
                onDelete={this.transactionDeleted}
                selectedTransaction={selectedTransaction}
                categoryList={categoryList}
              />
            </Quote>
          </Animate>
        </div>
        <Table
          rows={transactionList}
          columns={this.TRANSACTION_TABLE}
          emptyMessage="Let's add a transaction, shall we?"
          onSelect={this.rowSelected}
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
  categoryList: [],
};

const mapStateToProps = ({ transaction, wallet, category }, { match: { params } }) => ({
  transactionList: transaction.wallet === params.id ? transaction.list : [],
  wallet: byId(wallet, params.id),
  categoryList: category.list,
});

const mapDispatchToProps = {
  readTransaction,
  readWallet,
  create,
  update,
  deleteTransaction,
  readCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
