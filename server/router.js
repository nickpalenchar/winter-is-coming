var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/index.html'));
})

//If not middleware was hit
router.use(function(req, res){
    res.statusCode(400).send();
})

module.exports = router;