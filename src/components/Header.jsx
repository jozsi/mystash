import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import GrommHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Logout from 'grommet/components/icons/base/Logout';

const Header = ({ user, logout }) => (
  <GrommHeader
    fixed
    colorIndex="brand"
    pad="small"
  >
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
        onClick={logout}
        icon={<Logout />}
        label="Sign out"
        reverse
        primary
      />
    </Box>
  </GrommHeader>
);

Header.propTypes = {
  user: React.PropTypes.shape({
    firstName: React.PropTypes.string,
  }).isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;
