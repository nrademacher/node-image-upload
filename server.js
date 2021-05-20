require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors');
(mongoose = require('mongoose')), (router = require('./routes/index'));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Assign Mongoose connection to the variable db
let db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to MongoDB using Mongoose');
});
app.use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(cors())
    //Index route
    .use('/', router)
    .set('port', process.env.PORT || 8000)
    .listen(app.get('port'), () => {
        console.log(`Server running at http://localhost:${app.get('port')}`);
    });
