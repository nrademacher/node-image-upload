const imageModel = require('../models/imageModel');
//IMPORT CLOUDINARY CONFIG
const cloud = require('../config/cloudinaryConfig');

module.exports = {
    createImage: (req, res) => {
        let imageDetails = {
            file: req.files[0].originalname,
        };
        //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
        imageModel.find(
            { file: imageDetails.file },
            (err, callback) => {
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
                    cloud.uploads(attempt.imageUrl).then((result) => {
                        let imageDetails = {
                            file: result.url,
                            title: req.body.title,
                            location: req.body.location,
                            imageId: result.id,
                            userName: req.body.username,
                            password: req.body.password,
                        };
                        // Create image in the database
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
                    });
                }
            }
        );
    },
};
