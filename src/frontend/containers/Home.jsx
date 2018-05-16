import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Distribution from 'grommet/components/Distribution';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Value from 'grommet/components/Value';
import Add from 'grommet/components/icons/base/Add';
import { logout } from '../actions/user';
import { read, create } from '../actions/wallet';
import { read as readRate } from '../actions/rate';
import Table from '../components/Table';
import WalletAdd from '../components/WalletAdd';

function precisionRound(number, precision = 2) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

class Home extends Component {
  state = {
    addVisible: false,
    total: 0,
  };

  componentDidMount() {
    this.props.readWallet()
      .then(({ payload = [] }) => Promise.all(payload.map(({ currency }) => this.props.readRate(`USD_${currency}`))))
      .then(() => {
        let total = 0;
        this.props.wallet.list.forEach(({ balance, currency }) => total += this.getRate(balance, currency));
        this.setState({ total });
      });
  }

  getRate = (balance, currency) => this.props.rate[`USD_${currency}`] ? balance / this.props.rate[`USD_${currency}`] : balance;

  getWalletDistribution = () => this.props.wallet.list.map(x => ({
    value: this.getRate(x.balance, x.currency),
    labelValue: x.formattedBalance,
    label: x.name,
  }));

  toggleAdd = () => this.setState({ addVisible: !this.state.addVisible });

  walletAdded = (wallet) => {
    this.props.createWallet(wallet);
    this.toggleAdd();
  }

  WALLET_TABLE = new Map([
    ['Name', row => row.name],
    ['Balance', row => `${row.formattedBalance}${row.currency !== 'USD' && this.props.rate['USD_' + row.currency] ? ` ($${precisionRound(this.getRate(row.balance, row.currency))})` : ''}`],
  ]);

  render() {
    const {
      wallet,
      history,
    } = this.props;
    const { addVisible } = this.state;

    return (
      <Box>
        <Box
          direction="row"
          justify="between"
          align="center"
        >
          <Heading>Wallets</Heading>
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
            <WalletAdd onAdd={this.walletAdded} />
          </Quote>
        </Animate>
        <Table
          rows={wallet.list}
          columns={this.WALLET_TABLE}
          onSelect={i => history.push(`/wallet/${wallet.list[i].id}`)}
          emptyMessage="Oh, I see we don't have any data yet. Don't worry, we'll be on the path to saving money in no time! Let's create a wallet..."
          isLoading={wallet.isLoading}
        />
        <Value
          value="$"
          units={precisionRound(this.state.total)}
          label="Total"
        />
        <Distribution
          series={this.getWalletDistribution()}
          size="small"
        />
      </Box>
    );
  }
}

Home.propTypes = {
  wallet: PropTypes.shape({
    list: PropTypes.array,
  }),
  readWallet: PropTypes.func.isRequired,
  createWallet: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  wallet: [],
};

const mapStateToProps = ({ user, wallet, rate }) => ({
  user,
  wallet,
  rate,
});

const mapDispatchToProps = {
  logoutUser: logout,
  readWallet: read,
  createWallet: create,
  readRate: readRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
