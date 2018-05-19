const socketio = require('socket.io');

function getRendomString() {
    return ("" + Math.random()).substring(2, 7)
}


function listen(server) {

    var usernames = {};
    var rooms = [];
    var count = 0;

    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {

        count = count + 1;
        console.log('active sockets => ' + count);
        socket.emit('ativeUsers',count);


        socket.on('createroom', function (data) {
            let new_room = getRendomString();
            rooms.push(new_room);
            data.room = new_room;
            socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
            socket.emit('roomcreated', data);
        });


        socket.on('adduser', function (data) {
            var username = data.username;
            var room = data.room;

            if (rooms.indexOf(room) !== -1) {
                socket.username = username;
                socket.room = room;
                usernames[username] = username;
                socket.join(room);
                socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
                socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
            } else {
                socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
            }
        });

        socket.on('sendchat', function (data) {
            io.sockets.in(socket.room).emit('updatechat', socket.username, data);
        });

        socket.on('sendToall',function (data) {
            io.sockets.emit('updatechat', 'practice', data);
        })


        socket.on('disconnect', function () {
            count = count - 1;
            console.log('active sockets => ' + count);
            socket.emit('ativeUsers',count);
            delete usernames[socket.username];
            io.sockets.emit('updateusers', usernames);
            if (socket.username !== undefined) {
                socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
                socket.leave(socket.room);
            }
        });

    })



}


module.exports = {
    listen
}