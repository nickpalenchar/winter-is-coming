/**
 * Created by nick on 1/4/16.
 */
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
    defaultLocation: {type: [Number], default: [0,0] },
    google: {
        id: String,
        token: String,
        name: String,
        email: String
    }
});
UserSchema.statics.findOrCreate = require('./helper');
module.exports = {
    User: mongoose.model('User', UserSchema)
}