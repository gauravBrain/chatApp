"use strict";

(function(){

    angular.module('chatapp')
    .factory('socket', socketFactory)


    function socketFactory(){
        var socket = io.connect('http://localhost:3000/')
        return socket;
    }


})()

