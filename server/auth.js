// ID: 259296519915-e2j1dsaashacskkc8c6v3nn2h9oddo7f.apps.googleusercontent.com
// SECRET: VGfZmgi9LaB7X7F2TnfVo7to
var auth = require('express').Router();

var passport = require('passport');

var session = require('express-session');

//OAUTH
auth.use(session({ secret: 'tongiscool'}));
auth.use(function(req, res, next){
    //console.log("hello");
    console.log(req.session);
    next();
});
auth.use(passport.initialize());
auth.use(passport.session());

auth.use(function(req, res, next){
    if(!req.session.counter) req.session.counter = 0;
    console.log('counter ', ++req.session.counter);
    next();
});

auth.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

auth.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

module.exports = auth;