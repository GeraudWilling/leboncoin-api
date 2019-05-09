var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var leboncoin = require('./leboncoin');
const path = require('path');

// Running Server Details.
var server_port = process.env.PORT || 8080

var server = app.listen(server_port,  function () {
    console.log( "Listening on port " + server_port )
});
 

 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
 
app.post('/result', urlencodedParser, function (req, res){
  var reply='';
  reply += "Zip code: " + req.body.zip_code;
  reply += "<br/> Type appartement: " + req.body.rooms; 
  leboncoin.search_function(req.body.search_query,req.body.zip_code, req.body.rooms,req.body.square,reply, res)
});

