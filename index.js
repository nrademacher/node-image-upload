const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/images');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '.jpg'); //Appending .jpg
    },
});

const upload = multer({ storage: storage }).single('photo');

const app = express();
const PORT = 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.post('/upload', upload, (req, res) => {
    if (!req.file) {
        console.log('No file received');
        return res.send({
            success: false,
        });
    } else {
        console.log('file received');
        return res.send({
            success: true,
        });
    }
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT);
});
