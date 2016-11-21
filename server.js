/*jshint node:true*/
'use strict';
var express = require('express');
var app = express();
var port = 3000;

app.listen(port, function () {
    console.log('Server is running on localhost:' + port);
});

app.use(express.static('client'));