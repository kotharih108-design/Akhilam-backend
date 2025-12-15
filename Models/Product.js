const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  p_name: {
    type: String,
    required: true,
  },
  p_image: {
    type: String,
    required: true,
  },
  p_description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);