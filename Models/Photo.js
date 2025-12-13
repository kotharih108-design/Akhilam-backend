const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  images: [{ type: String }]
}, { timestamps: true, strict: true });

module.exports = { Photo: mongoose.model('Photo', PhotoSchema) };
