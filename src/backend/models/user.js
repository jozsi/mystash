const bcrypt = require('bcryptjs');
const isemail = require('isemail');
const jwt = require('jsonwebtoken');
const db = require('../db');

const transformer = {
  getters: true,
  hide: ['_id', '__v', 'password'],
  transform: (doc, ret, options) => {
    options.hide.forEach(key => delete ret[key]);
    return ret;
  },
};

const userSchema = new db.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: isemail.validate,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  toJSON: transformer,
  toObject: transformer,
});

userSchema.virtual('token').get(function getToken() {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { noTimestamp: true });
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function preSave(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = db.model('User', userSchema);

module.exports = User;
