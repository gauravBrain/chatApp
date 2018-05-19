angular.module('chatapp')
    .factory('socket', socketFactory)


    function socketFactory(){
        let socket = io.connect('http://localhost:3000/')
        return socket;
    }