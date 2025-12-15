const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  i_title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);