const Wallet = require('./wallet');
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

transactionSchema.post('save', async (doc, next) => {
  try {
    const wallet = await Wallet.findOneAndUpdate({
      _id: doc.wallet,
      user: doc.user,
    }, {
      $inc: { balance: doc.amount },
    }, { new: true });
    if (!wallet) {
      throw new Error('Wallet not found.');
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Transaction = db.model('Transaction', transactionSchema);

module.exports = Transaction;
