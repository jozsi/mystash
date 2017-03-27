import React from 'react';
import GrommetTable from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';

const Table = ({ columns, rows, onSelect }) => {
  const columnKeys = [...columns.keys()];

  return (
    <GrommetTable
      selectable
      onSelect={onSelect}
    >
      <TableHeader labels={[...columns.values()]} />
      <tbody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {columnKeys.map(key => <td key={key}>{row[key]}</td>)}
          </TableRow>
        ))}
      </tbody>
    </GrommetTable>
  );
};

Table.propTypes = {
  columns: React.PropTypes.shape({}),
  rows: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  onSelect: React.PropTypes.func,
};

Table.defaultProps = {
  columns: {},
  rows: [],
  onSelect: () => {},
};

export default Table;
