import React from 'react';
import { Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Timeseries(props) {
  console.log('Props are', props);
  const { actual, forecast, previous } = props;

  const values = forecast.day.map((x, i) => ({
    name: '' + x,
    forecast: forecast.runningTotal[i],
  }));

  actual.runningTotal.forEach((x, i) => values[i].actual = x);
  previous.runningTotal.forEach((x, i) => values[i].previous = x);

  return (
    <ComposedChart width={730} height={250} data={values}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="previous" stroke="#ffc658" fill="#ffc658" />
      <Line type="monotone" dataKey="actual" stroke="#8884d8" />
      <Line type="monotone" dataKey="forecast" stroke="#82ca9d" strokeDasharray="3 3" dot={{ strokeDasharray: 'none' }} />
    </ComposedChart>
  );
}

export default Timeseries;
