var router = require('express').Router();
var path = require('path');

var passport = require('passport');

var session = require('express-session');

//OAUTH
router.use(session({ secret: 'tongiscool'}));
router.use(function(req, res, next){
    //console.log("hello");
    console.log(req.session);
    next();
});
router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next){
    if(!req.session.counter) req.session.counter = 0;
    console.log('counter ', ++req.session.counter);
    next();
})

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/index.html'));
})

//If no middleware was hit
router.use(function(req, res){
    res.status(400);
})

module.exports = router;