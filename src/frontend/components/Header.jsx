import PropTypes from 'prop-types';
import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import GrommHeader from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Catalog from 'grommet/components/icons/base/Catalog';
import Logout from 'grommet/components/icons/base/Logout';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Tag from 'grommet/components/icons/base/Tag';
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
        label="myStash"
      />
    </Title>
    <Box
      flex
      justify="end"
      direction="row"
      responsive={false}
    >
      <Menu
        icon={<MenuIcon />}
        label={user.firstName}
      >
        <Anchor
          path="/"
          icon={<Catalog />}
          label="Wallets"
          primary
        />
        <Anchor
          path="/category"
          icon={<Tag />}
          label="Categories"
          primary
        />
        <Anchor
          onClick={onLogout}
          icon={<Logout />}
          label="Sign out"
          primary
        />
      </Menu>
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
