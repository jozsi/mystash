import React from 'react';
import PropTypes from 'prop-types';
import { Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Timeseries(props) {
  const {
    actual,
    forecast,
    previous,
  } = props;

  const values = forecast.day.map((x, i) => ({
    name: '' + x,
    forecast: forecast.runningTotal[i],
    actual: actual.runningTotal[i],
    previous: previous.runningTotal[i],
  }));

  return (
    <ComposedChart width={730} height={250} data={values}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="previous" stroke="#2ad2c9" fill="#2ad2c9" />
      <Line type="monotone" dataKey="actual" stroke="#614767" />
      <Line type="monotone" dataKey="forecast" stroke="#ff8d6d" strokeDasharray="3 3" dot={{ strokeDasharray: 'none' }} />
    </ComposedChart>
  );
}

const shape = {
  day: PropTypes.arrayOf(PropTypes.number),
  runningTotal: PropTypes.arrayOf(PropTypes.number),
};

Timeseries.propTypes = {
  previous: PropTypes.shape(shape).isRequired,
  actual: PropTypes.shape(shape).isRequired,
  forecast: PropTypes.shape({
    ...shape,
    forecastMessage: PropTypes.string,
  }).isRequired,
};

export default Timeseries;
