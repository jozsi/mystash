import PropTypes from 'prop-types';
import React from 'react';
import GrommetTable from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';

const Table = ({ columns, rows, onSelect }) => {
  const formatters = [...columns.values()];

  return (
    <GrommetTable
      selectable
      onSelect={onSelect}
    >
      <TableHeader labels={[...columns.keys()]} />
      <tbody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {formatters.map((formatter, j) => <td key={j}>{formatter(row)}</td>)}
          </TableRow>
        ))}
      </tbody>
    </GrommetTable>
  );
};

Table.propTypes = {
  columns: PropTypes.shape({}),
  rows: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func,
};

Table.defaultProps = {
  columns: {},
  rows: [],
  onSelect: () => {},
};

export default Table;
