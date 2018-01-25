import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

function Category(props) {
  const {
    categories,
    categoryList,
    ...rest,
  } = props;

  return (
    <Select
      multi
      value={categories}
      options={categoryList.map(({ id, name, color }) => ({
        value: id,
        label: name,
        style: {
          backgroundColor: color,
          color: '#000000',
        },
      }))}
      {...rest}
    />
  );
}

export default Category;
