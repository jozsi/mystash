import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

const WalletsList = ({ list }) => (
  <List>
    {list.map(item => (
      <ListItem justify="between" key={item.id}>
        <span>{item.name}</span>
        <span className="secondary">{item.formattedBalance}</span>
      </ListItem>
    ))}
  </List>
);

WalletsList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object),
};

WalletsList.defaultProps = {
  list: [],
};

export default WalletsList;
