import Component from '../components/Timeseries';

export default {
  component: Component,
  props: {
    actual: {
      day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      runningTotal: [1,3,2,4,8,6,6,6,4,3,2,1,4,5,7,3,2,4,2,1,5,4,4,4]
    },
    forecast: {
      day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      runningTotal :[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,5,6,6,7,8,8],
      forecastMessage: "It looks like you're gonna be spending about the same as last month."
    },
    previous: {
      day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      runningTotal: [1,2,3,5,7,5,3,2,4,8,7,6,4,1,1,2,4,5,6,7,8,7,7,6,6,5,4,7,8,7,7],
    },
  }
};
