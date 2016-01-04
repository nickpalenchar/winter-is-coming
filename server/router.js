var router = require('express').Router();
var path = require('path');

//Authentication/sessions mini-app
router.use(require('./auth'));


router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/index.html'));
})

//If no middleware was hit
router.use(function(req, res){
    res.status(400);
})

module.exports = router;