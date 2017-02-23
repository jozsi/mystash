const bcrypt = require('bcryptjs');
const isemail = require('isemail');
const db = require('../db');

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
    select: false,
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
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.preSave = async function preSave(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (next) {
    next();
  }
};

userSchema.pre('save', userSchema.methods.preSave);

const User = db.model('User', userSchema);

module.exports = User;
