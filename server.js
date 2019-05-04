var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var leboncoin = require('./leboncoin');
 
// Running Server Details.
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
 
 
app.get('/', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/result'  method='post' name='form1'>";
  html += "<p>Zip code:<input type= 'number' name='zip_code'></p>";
  html += "<p>Rooms:<input type='text' name='rooms'></p>";
  html += "<p>Square:<input type='text' name='square'></p>";
  html += "<p>Search:<input type='search_query' name='search_query'></p>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/result', urlencodedParser, function (req, res){
  var reply='';
  reply += "Zip code: " + req.body.zip_code;
  reply += "<br/> Type appartement: " + req.body.rooms; 
  leboncoin.search_function(req.body.search_query,req.body.zip_code, req.body.rooms,req.body.square,reply, res)
});