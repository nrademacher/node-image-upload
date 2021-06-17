const mongoose = require('mongoose'),
  { Schema } = mongoose,
  imageSchema = new Schema({
    file: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    imageId: {
      type: String,
    },
  });

module.exports = mongoose.model('Image', imageSchema);
