const db = require('../db');

const transformer = {
  getters: true,
  hide: ['_id', '__v'],
  transform: (doc, ret, options) => {
    options.hide.forEach(key => delete ret[key]);
    return ret;
  },
};

const transactionSchema = new db.Schema({
  amount: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wallet: {
    type: db.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },
}, {
  toJSON: transformer,
  toObject: transformer,
});

const Transaction = db.model('Transaction', transactionSchema);

module.exports = Transaction;
