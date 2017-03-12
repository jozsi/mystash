import React, { Component } from 'react';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Title from 'grommet/components/Title';
import Pulse from 'grommet/components/icons/Pulse';
import Logout from 'grommet/components/icons/base/Logout';
import { logout } from '../actions/user';
import { read, create } from '../actions/wallet';
import WalletsList from '../components/WalletsList';

class Home extends Component {
  componentDidMount() {
    this.props.readWallet();
  }

  render() {
    const { user, wallet, logoutUser, createWallet } = this.props;

    return (
      <Article>
        <Header fixed>
          <Title>
            {`Hello, ${user.firstName}!`}
          </Title>
          <Box
            flex
            justify="end"
            direction="row"
            responsive={false}
          >
            <Anchor
              onClick={logoutUser}
              icon={<Logout />}
              label="Sign out"
              reverse
              primary
            />
          </Box>
        </Header>
        <Section>
          <Box
            direction="row"
            justify="between"
          >
            <Heading>Wallets</Heading>
            <Anchor
              icon={<Pulse />}
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
        </Section>
      </Article>
    );
  }
}

Home.propTypes = {
  user: React.PropTypes.shape({
    firstName: React.PropTypes.string,
  }).isRequired,
  wallet: React.PropTypes.shape({
    list: React.PropTypes.array,
  }),
  logoutUser: React.PropTypes.func.isRequired,
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
