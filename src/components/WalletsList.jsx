import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

const WalletsList = ({ list, isLoading }) => (
  <List>
    {list.map(item => (
      <ListItem justify="between" key={item.id}>
        <span>{item.name}</span>
        <span className="secondary">{item.formattedBalance}</span>
      </ListItem>
    ))}
    <ListPlaceholder
      emptyMessage={`Oh, I see we don't have any data yet.
        Don't worry, we'll be on the path to saving money in no time! Let's create a wallet`}
      unfilteredTotal={list.length}
      filteredTotal={isLoading ? undefined : list.length}
    />
  </List>
);

WalletsList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading: React.PropTypes.bool,
};

WalletsList.defaultProps = {
  list: [],
  isLoading: false,
};

export default WalletsList;
