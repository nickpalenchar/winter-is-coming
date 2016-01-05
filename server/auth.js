// ID: 259296519915-e2j1dsaashacskkc8c6v3nn2h9oddo7f.apps.googleusercontent.com
// SECRET: VGfZmgi9LaB7X7F2TnfVo7to
var auth = require('express').Router();

var passport = require('passport');

var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('mongoose').model('User');

passport.use(new GoogleStrategy({
    clientID:'259296519915-e2j1dsaashacskkc8c6v3nn2h9oddo7f.apps.googleusercontent.com',
    clientSecret: 'VGfZmgi9LaB7X7F2TnfVo7to',
    callbackURL: 'http://127.0.0.1:8000/auth/google/callback'
    },
    function(token, refreshToken, profile, done){
        User.findOrCreate({'google.id': null })
            .then(function(user){
                return done(null, user);
            })
            .then(null, done);
    }));

//OAUTH
auth.use(session({ secret: 'tongiscool'}));
auth.use(function(req, res, next){
    //console.log("hello");
    console.log(req.session);
    next();
});
auth.use(passport.initialize());
auth.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

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