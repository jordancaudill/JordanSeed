/*jshint node:true*/
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var async = require('async');

var app = express();
require('./api/users.js');

var port = 80;

// Start the express server on the given port
app.listen(port, function () {
    console.log('Server is running on localhost:' + port);
});

// Serve the static front end files
app.use(express.static('../client'));

// Connect to MongoDB, then Mongoose
var dbString = 'mongodb://localhost/testDB';
async.series([
        function(callback) {
            mongodb.connect(dbString, function (err, res) {
                callback(err, res);
            });
        },
        function(callback) {
            mongoose.connect(dbString, function(err, res) {
                callback(err, res);
            });
        }
    ],
    // This is the callback
    function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully connected to MongoDB and Mongoose.');
        }
    }
);

module.exports = app;