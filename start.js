var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());

app.use(express.static('/public'));

app.get('/', function(req, res){
    res.send("Hello World!");
});


// handle any errors
app.use(function(err, req, res) {
    res.status(err.status || 500);
    console.log({ error: err });
    res.send("An error occured: \n", err.status, err.message);
});

app.use(require('./server/router'));

app.listen(8000, function(){
    console.log("server is listening on port 8000");
});

//server and routing goes here