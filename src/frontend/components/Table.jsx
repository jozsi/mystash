import PropTypes from 'prop-types';
import React from 'react';
import GrommetTable from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import SpinningIcon from 'grommet/components/icons/Spinning';

const Table = ({
  columns,
  emptyMessage,
  isLoading,
  rows,
  onSelect,
}) => {
  const formatters = [...columns.values()];
  const hasData = !!rows.length;
  let content;

  if (hasData) {
    content = rows.map((row, i) => (
      <TableRow key={i} onClick={() => onSelect(i)} style={{ cursor: 'pointer' }}>
        {formatters.map((formatter, j) => <td key={j}>{formatter(row)}</td>)}
      </TableRow>
    ));
  } else {
    const message = isLoading ? <SpinningIcon /> : emptyMessage;
    if (message) {
      content = (
        <TableRow>
          <td colSpan={formatters.length} style={{ textAlign: 'center' }}>
            {message}
          </td>
        </TableRow>
      );
    }
  }

  return (
    <GrommetTable
      onSelect={onSelect}
    >
      <TableHeader labels={[...columns.keys()]} />
      <tbody>
        {content}
      </tbody>
    </GrommetTable>
  );
};

Table.propTypes = {
  columns: PropTypes.shape({}).isRequired,
  emptyMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
};

Table.defaultProps = {
  columns: {},
  emptyMessage: 'No data',
  isLoading: false,
  onSelect: () => {},
  rows: [],
};

export default Table;
