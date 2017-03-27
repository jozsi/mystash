import React, { Component } from 'react';
import { connect } from 'react-redux';
import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Add from 'grommet/components/icons/base/Add';
import { logout } from '../actions/user';
import { read, create } from '../actions/wallet';
import Table from '../components/Table';
import WalletAdd from '../containers/WalletAdd';

const WALLET_TABLE = new Map([
  ['name', 'Name'],
  ['formattedBalance', 'Balance'],
]);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addVisible: false,
    };
  }
  componentDidMount() {
    this.props.readWallet();
  }

  toggleAdd = () => this.setState({ addVisible: !this.state.addVisible });

  walletAdded = (wallet) => {
    this.props.createWallet(wallet);
    this.toggleAdd();
  }

  render() {
    const { wallet } = this.props;
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
          columns={WALLET_TABLE}
        />
      </Box>
    );
  }
}

Home.propTypes = {
  wallet: React.PropTypes.shape({
    list: React.PropTypes.array,
  }),
  readWallet: React.PropTypes.func.isRequired,
  createWallet: React.PropTypes.func.isRequired,
};

Home.defaultProps = {
  wallet: [],
};

const mapStateToProps = ({ user, wallet }) => ({
  user,
  wallet,
});

const mapDispatchToProps = {
  logoutUser: logout,
  readWallet: read,
  createWallet: create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
