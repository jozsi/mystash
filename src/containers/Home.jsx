import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Add from 'grommet/components/icons/base/Add';
import { logout } from '../actions/user';
import { read, create } from '../actions/wallet';
import WalletsList from '../components/WalletsList';

class Home extends Component {
  componentDidMount() {
    this.props.readWallet();
  }

  render() {
    const { wallet, createWallet } = this.props;

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
            onClick={() => createWallet({
              name: `Random ${Date.now()}`,
              balance: Math.round(Math.random() * 1000),
            })}
          />
        </Box>
        <WalletsList
          list={wallet.list}
          isLoading={wallet.isLoading}
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
