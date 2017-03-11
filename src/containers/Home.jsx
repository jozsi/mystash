import React from 'react';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Logout from 'grommet/components/icons/base/Logout';
import { logout } from '../actions/user';

const Home = props => (
  <Header fixed>
    <Title>
      {`Hello, ${props.user.firstName}!`}
    </Title>
    <Box
      flex
      justify="end"
      direction="row"
      responsive={false}
    >
      <Anchor
        onClick={props.logout}
        icon={<Logout />}
        label="Sign out"
        reverse
        primary
      />
    </Box>
  </Header>
);

Home.propTypes = {
  user: React.PropTypes.shape({
    firstName: React.PropTypes.string,
  }).isRequired,
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { logout })(Home);
