const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

CategorySchema.methods.toJSON = function() {
  const { __v, _id, state, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

module.exports = model('Category', CategorySchema);