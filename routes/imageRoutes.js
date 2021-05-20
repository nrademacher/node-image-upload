const upload = require('../config/multerConfig'),
  imageController = require('../controllers/imageController'),
  router = require('express').Router();

router.post(
  '/postImages',
  upload.imageUpload.any(),
  imageController.createImage
);

module.exports = router;
