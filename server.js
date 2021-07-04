require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./routes/index');

const MONGO_URI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to MongoDB using Mongoose');
});

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors({ origin: 'https://www.katjaschmelzer.de/upload' }))
  //Index route
  .use('/', router)
  .set('port', process.env.PORT || 8000)
  .listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
  });
