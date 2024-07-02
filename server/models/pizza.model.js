const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['large', 'medium', 'small'],
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
},
status: {
  type: String,
  enum:['waiting','cooking','coming']
}
});

module.exports = mongoose.model('Pizza', PizzaSchema);
