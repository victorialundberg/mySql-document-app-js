var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
require('dotenv').config();
const CryptoJS = require("crypto-js");



var usersRouter = require('./routes/users');
var documentsRouter = require('./routes/documents');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'frontend')));


app.use('/users', usersRouter);
app.use('/documents', documentsRouter);

module.exports = app;
