
var express = require('express');
var fs = require('fs');
var app = module.exports = express();
app.use(express.static(__dirname));
app.listen(8080);