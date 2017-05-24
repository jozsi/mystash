import PropTypes from 'prop-types';
import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import GrommHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Logout from 'grommet/components/icons/base/Logout';
import Logo from './Logo';

const Header = ({ onLogout, user }) => (
  <GrommHeader
    fixed
    colorIndex="brand"
    pad="small"
  >
    <Title>
      <Logo />
      <Anchor
        path="/"
        label={`Hello, ${user.firstName}!`}
      />
    </Title>
    <Box
      flex
      justify="end"
      direction="row"
      responsive={false}
      pad={{ horizontal: 'small' }}
    >
      <Anchor
        onClick={onLogout}
        icon={<Logout />}
        label="Sign out"
        reverse
        primary
      />
    </Box>
  </GrommHeader>
);

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
