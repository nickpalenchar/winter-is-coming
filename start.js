var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());

app.use(express.static('/public'));

//app.get('/', function(req, res){
//    res.send("Hello World!");
//});

app.use(require('./server/router'));

app.listen(8000, function(){
    console.log("server is listening on port 8000");
});

//server and routing goes here