const db = require('../db');
const defaults = require('../factories/categories');

const transformer = {
  getters: true,
  hide: ['_id', '__v'],
  transform: (doc, ret, options) => {
    options.hide.forEach(key => delete ret[key]);
    return ret;
  },
};

const categorySchema = new db.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: '#cccccc',
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

categorySchema.static('createDefaults', function createDefaults(user) {
  const docs = defaults.map(category => ({
    ...category,
    user,
  }));
  return this.insertMany(docs);
});

const Category = db.model('Category', categorySchema);

module.exports = Category;
