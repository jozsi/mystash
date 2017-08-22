const currencyFormatter = require('currency-formatter');
const db = require('../db');
const currencyValue = require('../../isomorphic/currencyValue');

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
  balance: {
    type: Number,
    default: 0,
  },
  initialBalance: {
    type: Number,
  },
  currency: {
    type: String,
    default: 'USD',
    enum: currencyFormatter.currencies.map(currency => currency.code),
  },
  user: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  toJSON: transformer,
  toObject: transformer,
});

walletSchema.virtual('formattedBalance').get(function formatValue() {
  return currencyValue(this.balance, this.currency);
});

walletSchema.pre('save', function preSave(next) {
  this.initialBalance = this.get('balance');
  next();
});

const Wallet = db.model('Wallet', walletSchema);

module.exports = Wallet;
