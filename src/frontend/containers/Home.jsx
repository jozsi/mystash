import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Distribution from 'grommet/components/Distribution';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Add from 'grommet/components/icons/base/Add';
import { logout } from '../actions/user';
import { read, create } from '../actions/wallet';
import { read as readRate } from '../actions/rate';
import Table from '../components/Table';
import WalletAdd from '../components/WalletAdd';

const getWalletDistribution = walletList => walletList.map(x => ({
  value: x.balance,
  labelValue: x.formattedBalance,
  label: x.name,
}));

class Home extends Component {
  state = {
    addVisible: false,
  };

  componentDidMount() {
    this.props.readWallet().then(({ payload = [] }) => payload.forEach(({ currency }) => this.props.readRate(`USD_${currency}`)));
  }

  toggleAdd = () => this.setState({ addVisible: !this.state.addVisible });

  walletAdded = (wallet) => {
    this.props.createWallet(wallet);
    this.toggleAdd();
  }

  WALLET_TABLE = new Map([
    ['Name', row => row.name],
    ['Balance', row => `${row.formattedBalance} ($${this.props.rate['USD_' + row.currency] * row.balance})`],
  ]);

  render() {
    const { wallet, history } = this.props;
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
        <Distribution
          series={getWalletDistribution(wallet.list)}
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
