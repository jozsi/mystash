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

calendar.daysLeftInMonth = function() {
  return moment().endOf('month').diff(moment(), 'days');
}

calendar.getFirstDayOfPreviousMonth = function() {
  return moment().startOf('month').subtract(1, 'month').format(DATE_FORMAT);
}

calendar.getLastDayOfPreviousMonth = function() {
  return moment().subtract(1, 'month').endOf('month').format(DATE_FORMAT);
}

module.exports = calendar;
