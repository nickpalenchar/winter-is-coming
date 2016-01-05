var express = require('express');
var router = express.Router();
var path = require('path');

// router.use(express.static('../public/'))

//Authentication/sessions mini-app
router.use(require('./auth'));

router.use('/public', express.static(path.join(__dirname, '../public')))
router.use('/app', express.static(path.join(__dirname, '../browser/js')))

router.get('/', function(req, res){
    console.log("IN")
    res.sendFile(path.join(__dirname, '../browser/index.html'));
})

router.get('/home', function(req, res){
    res.sendfile(path.join(__dirname, '../browser/index.html'))
})

//If no middleware was hit
router.use(function(req, res){
    res.status(400);
})

module.exports = router;
