const imageModel = require('../models/imageModel');
//IMPORT CLOUDINARY CONFIG
const cloud = require('../config/cloudinaryConfig');

module.exports = {
    createImage: (req, res) => {
        let imageDetails = {
            imageName: req.files[0].originalname,
        };
        //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
        imageModel.find(
            { imageName: imageDetails.imageName },
            (err, callback) => {
                //CHECKING IF ERROR OCCURRED.
                if (err) {
                    res.json({
                        err: err,
                        message: `There was a problem creating the image because: ${err.message}`,
                    });
                } else {
                    let attempt = {
                        imageName: req.files[0].originalname,
                        imageUrl: req.files[0].path,
                        imageId: '',
                    };
                    cloud.uploads(attempt.imageUrl).then((result) => {
                        let imageDetails = {
                            imageName: req.files[0].originalname,
                            imageUrl: result.url,
                            imageId: result.id,
                            clientId: req.body.clientId,
                            clientUsername: req.body.clientUsername,
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
