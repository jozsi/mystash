const currencyFormatter = require('currency-formatter');

module.exports = (value, currency) => currencyFormatter.format(value, { code: currency });
