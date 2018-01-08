import React from 'react';
import Chart, {Axis, Base, Grid, Area, Bar, Layers, Line, Marker, MarkerLabel, HotSpots} from 'grommet/components/chart/Chart';
import Value from 'grommet/components/Value';

function Timeseries(props) {
  console.log('Props are', props);
  const { data } = props;

  if (!data.day || !data.day.length) {
    return null;
  }

  const values = data.runningTotal;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  console.log('Hey', minValue, typeof minValue);

  const xAxisLabels = data.day.map((x, i) => ({
    index: i,
    label: '' + x,
  }));

  const yAxisLabels = [{
    index: 0,
    label: '' + minValue,
  }, {
    index: 1,
    label: '' + maxValue,
  }];

  return (
    <Chart>
      <Axis
        vertical={true}
        count={2}
        labels={yAxisLabels}
        ticks={true}
      />
      <Base />
      <Layers>
        <Line
          values={values}
          min={minValue}
          max={maxValue}
          points
        />
        <Marker
          colorIndex='graph-2'
          count={values.length}
          index={2}
          vertical={true}
        />
      </Layers>
      <Axis
        count={xAxisLabels.length}
        labels={xAxisLabels}
        ticks
      />
    </Chart>
  );
}

export default Timeseries;
