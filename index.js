
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 5000;
} else if (env === 'test') {
    process.env.PORT = 5000;
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {  app };
const api = require('./routes/api');
app.use('/api', api);

app.listen(port);

