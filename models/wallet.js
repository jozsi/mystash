const currencyFormatter = require('currency-formatter');
const db = require('../db');

const transformer = {
  getters: true,
  hide: ['_id', '__v'],
  transform: (doc, ret, options) => {
    options.hide.forEach(key => delete ret[key]);
    return ret;
  },
};

const walletSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'USD',
    enum: currencyFormatter.currencies.map(currency => currency.code),
  },
  owner: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  toJSON: transformer,
  toObject: transformer,
});

walletSchema.virtual('formattedValue').get(function formatValue() {
  return currencyFormatter.format(this.value, { code: this.currency });
});

const Wallet = db.model('Wallet', walletSchema);

module.exports = Wallet;
