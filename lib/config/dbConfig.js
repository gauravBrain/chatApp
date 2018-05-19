"use strict"


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost/chatApp');

mongoose.connection.on('connected', function () {
    console.log('connected to chatApp');
});

mongoose.connection.on('error', function (err) {
    console.log('mongoose error -->',err);

});

mongoose.connection.on('disconnected', function () {
    console.log('connected to chatApp');

});

