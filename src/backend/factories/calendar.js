const moment = require('moment');

const calendar = {};

const DATE_FORMAT = 'YYYY-MM-DD';

calendar.getFirstDayOfMonth = function(date) {
  return moment(date).startOf('month').format(DATE_FORMAT);
}

calendar.getLastDayOfMonth = function(date) {
  return moment(date).endOf('month').format(DATE_FORMAT);
}

calendar.getCurrentDate = function(date) {
  return moment().format(DATE_FORMAT);
}

calendar.dayOfMonth = function(date, asInt=true) {
  if (asInt) {
    return parseInt(moment(date).format('D'), 10); 
  }
  return moment(date).format('D');
}

calendar.daysLeftInMonth = function() {
  return moment().endOf('month').diff(moment(), 'days');
}

calendar.daysInMonth = function(date) {
  return moment(date).endOf('month').diff(moment(date).startOf('month'), 'days') + 1; 
}

calendar.getFirstDayOfPreviousMonth = function(asText) {
  let date = moment().startOf('month').subtract(1, 'month');
  if (asText) {
    return date.format(DATE_FORMAT);
  }

  return date;
}

calendar.getLastDayOfPreviousMonth = function(asText) {
  let date = moment().subtract(1, 'month').endOf('month');
  if (asText) {
    return date.format(DATE_FORMAT);
  }

  return date;
}

calendar.formatted = function(date) {
  return date.format(DATE_FORMAT);
}

module.exports = calendar;
