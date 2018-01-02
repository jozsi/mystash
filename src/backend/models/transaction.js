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

const preSaveMiddleware = async function(next) {
  try {
    const count = await Wallet.count({
      _id: this.wallet,
      user: this.user,
    });

    if (!count) {
      throw new Error('Wallet not found.');
    }

    next();
  } catch (err) {
    next(err);
  }
};

const preUpdateMiddleware = async function(next) {
  try {
    this.preUpdateDocument = await Transaction.findOne(this.getQuery());
    next();
  } catch (err) {
    next(err);
  }
};

const updateBalanceMiddleware = async function(doc, next) {
  try {
    let amount = doc.amount;
    if (this.preUpdateDocument) {
      amount -= this.preUpdateDocument.amount;
    } else if (this.op === 'findOneAndRemove') {
      amount *= -1;
    }

    if (amount) {
      const wallet = await Wallet.findOneAndUpdate({
        _id: doc.wallet,
        user: doc.user,
      }, {
        $inc: {
          balance: amount,
        },
      });
      if (!wallet) {
        throw new Error('Wallet not found.');
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

transactionSchema.pre('save', preSaveMiddleware);
transactionSchema.pre('findOneAndUpdate', preUpdateMiddleware);
transactionSchema.post('findOneAndUpdate', updateBalanceMiddleware);
transactionSchema.post('findOneAndRemove', updateBalanceMiddleware);
transactionSchema.post('save', updateBalanceMiddleware);

const Transaction = db.model('Transaction', transactionSchema);

module.exports = Transaction;
