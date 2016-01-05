var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require('bluebird')

var chalk = require('chalk');
var weather = require('./weather');
var https = require('https');

var WEATHER_API_KEY = 'e6f535d2149d18e9cfa119b264ed1399';
var DEFAULT_LAT_LONG = [40.71405, -74.00594] //New York, NY


// router.use(express.static('../public/'))

//Authentication/sessions mini-app
router.use(require('./auth'));

router.use('/public', express.static(path.join(__dirname, '../public')))
router.use('/app', express.static(path.join(__dirname, '../browser/js')))

router.get('/', function(req, res){
    console.log("IN")
    res.sendFile(path.join(__dirname, '../browser/index.html'));
});

router.get('/home', function(req, res){
    res.sendfile(path.join(__dirname, '../browser/index.html'))
});

router.get('/weather', function(req, res){
    https.get('https://api.forecast.io/forecast/'+WEATHER_API_KEY+'/'+DEFAULT_LAT_LONG[0]+','+DEFAULT_LAT_LONG[1], function(httpRes){
        var result = '';

        console.log(chalk.cyan("--weather API-- "), chalk.yellow.bold(httpRes.statusCode));
        httpRes.on('data', function(d){
            result += d;
        });
        httpRes.on('end', function(){
            result = JSON.parse(result);
            var messageToSend = weather.generateMessage(result);
            res.send(messageToSend);
        });
    });
});

router.get('/weather/:lat/:long', function(req, res){
    console.log(chalk.red(req.params.lat), chalk.blue(req.params.long));
    https.get('https://api.forecast.io/forecast/'+WEATHER_API_KEY+'/'+req.params.lat+','+req.params.long, function(httpRes){
        var result = '';

        console.log(chalk.cyan("--weather API-- "), chalk.yellow.bold(httpRes.statusCode));
        httpRes.on('data', function(d){
            result += d;
        });
        httpRes.on('end', function(){
            result = JSON.parse(result);
            var messageToSend = weather.generateMessage(result);
            res.send(messageToSend);
        });
    });
});

var promsisifiedHttpsGet = function(url) {
    new Promise(function(resolve, reject) {


    })
}

//If no middleware was hit
router.use(function(req, res){
    res.status(400);
})

module.exports = router;
