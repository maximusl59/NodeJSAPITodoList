const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

app.use(bodyParser.json());

require('dotenv').config();

app.use(cors());

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/node-js-api', {useNewUrlParser: true}).then(() => {
  console.log('mongodb connected');
}).catch((err) => {
  console.log(err);
});

require('./helpers/extend-node-input-validator');
require('./routes/index')(app);

const http = require('http');
const server = http.Server(app);
const port = process.env.PORT||3000;
server.listen(port, () => {
  console.log('server is running on localhost:' + port);
});