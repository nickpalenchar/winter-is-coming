/**
 * Created by nick on 1/4/16.
 */
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;

var mongoose = require('mongoose');

var MONGOOSE_URI = 'mongodb://localhost/winter-is-coming';

mongoose.connect(MONGOOSE_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongodb connection error"));

module.exports = {
    //Schema1: Schema1;
    //Schema2: Schema2;
}