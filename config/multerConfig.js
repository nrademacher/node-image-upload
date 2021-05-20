const multer = require('multer'),
    path = require('path');
//multer.diskStorage() creates a storage space for storing files.

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, '../files'));
        } else {
            cb({ message: 'This file is not an image file' }, false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

module.exports = {
    imageUpload: multer({ storage: imageStorage }),
};
