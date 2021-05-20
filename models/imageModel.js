const mongoose = require('mongoose'),
    { Schema } = mongoose,
    imageSchema = new Schema({
        imageName: {
            type: String,
            required: true,
        },
        imageId: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
    });

module.exports = mongoose.model('Image', imageSchema);
