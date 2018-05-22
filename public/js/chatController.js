"use strict";

(function(){

    angular
    .module('chatapp')
    .controller('chatController', chatController)


chatController.$inject = ['$scope', 'socket'];
function chatController($scope, socket) {

    $scope.users = [];
    $scope.curtrentUser = '';

    socket.on('ativeUsers', function(data) {
        $scope.ativeUsers = data;
        $scope.$apply();
    })

    $scope.createRoom = function (data) {
        $scope.curtrentUser = data.username;
        socket.emit('createroom', data);
    }

    $scope.joinRoom = function (data) {
        $scope.curtrentUser = data.username;
        socket.emit('adduser', data);
    }

    socket.on('updatechat', function (username, data) {
        var user = {};
        user.username = username;
        user.message = data;
        user.date = new Date().getTime();
        user.image = username.charAt(0).toUpperCase();
        $scope.users.push(user);
        $scope.$apply();
    });

    socket.on('roomcreated', function (data) {
        socket.emit('adduser', data);
    });

    $scope.doPost = function (message) {
        socket.emit('sendchat', message);
    }

    $scope.sendToall = function(msg){
        socket.emit('sendToall', msg);
    }


}





})();

