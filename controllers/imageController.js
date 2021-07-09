const imageModel = require('../models/imageModel');
const mongoose = require('mongoose');
const cloud = require('../config/cloudinaryConfig');

module.exports = {
  createImage: async (req, res) => {
    if (req.body.secret !== process.env.UPLOAD_SECRET) {
      return res.json({
        error: 'Unauthorized',
      });
    }
    let imageDetails;
    if (!req.files[0]) {
      let item = {
        album: req.body.album.toLowerCase(),
        title: req.body.title,
        location: req.body.location,
      };
      const match = await imageModel.findOne({
        title: item.title,
        album: item.album,
      });
      if (match) {
        imageModel
          .updateOne(match, item)
          .then((image) => {
            res.json({
              success: true,
              data: image,
            });
          })
          .catch((error) => {
            res.json({
              success: false,
              message: `Error creating image in the database: ${error.message}`,
            });
          });
        return true;
      }
    } else {
      imageDetails = {
        file: req.files[0].originalname,
      };
    }
    //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
    imageModel.find({ file: imageDetails.file }, async (err, callback) => {
      //CHECKING IF ERROR OCCURRED.
      if (err) {
        res.json({
          err: err,
          message: `There was a problem creating the image because: ${err.message}`,
        });
      } else {
        let attempt = {
          imageUrl: req.files[0].path,
          imageName: req.files[0].originalname,
          imageId: '',
        };
        cloud.uploads(attempt.imageUrl).then(async (result) => {
          let imageDetails = {
            file: result.url,
            album: req.body.album.toLowerCase(),
            title: req.body.title,
            location: req.body.location,
            imageId: result.id,
          };
          // Create image in the database
          const match = await imageModel.findOne({
            title: imageDetails.title,
            album: imageDetails.album,
          });
          if (match) {
            imageModel
              .updateOne(match, imageDetails)
              .then((image) => {
                res.json({
                  success: true,
                  data: image,
                });
              })
              .catch((error) => {
                res.json({
                  success: false,
                  message: `Error creating image in the database: ${error.message}`,
                });
              });
          } else {
            imageModel
              .create(imageDetails)
              .then((image) => {
                res.json({
                  success: true,
                  data: image,
                });
              })
              .catch((error) => {
                res.json({
                  success: false,
                  message: `Error creating image in the database: ${error.message}`,
                });
              });
          }
        });
      }
    });
  },
};
