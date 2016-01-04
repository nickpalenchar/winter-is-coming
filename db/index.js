/**
 * Created by nick on 1/4/16.
 */
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var MONGOOSE_URI = 'mongodb://localhost/winter-is-coming';

mongoose.connect(MONGOOSE_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongodb connection error"));

var UserSchema = new schema({
    username: String,
    defaultLocation: {type: Number, default: }
});

module.exports = {
    //Schema1: Schema1;
    //Schema2: Schema2;
}