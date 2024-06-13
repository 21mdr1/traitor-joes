import io from "./socket";

io.on('connection', socket => {
    // if (socket.recovered) {
    //     // recovery was successful: socket.id, socket.rooms and socket.data were restored
    // } else {
    //     // new or unrecoverable session
    // }

    socket.on('send-name', name => {
      socket.data.name = name;
    });


    socket.on('join-room', (roomCode) => {
        socket.join(roomCode);
        socket.to(roomCode).emit('user-was-added', { name: socket.data.name, socketId: socket.id});
    });

    socket.on('leave-room', (roomCode) => {
        socket.leave(roomCode);
        socket.to(roomCode).emit('user-was-removed', socket.id);
    });

    socket.on('get-players', async (roomCode, sendPlayerInfo) => {

      let playerSockets = await io.in(roomCode).fetchSockets();

      sendPlayerInfo (playerSockets.map((playerSocket) => {
        return {
          name: playerSocket.data.name,
          socketId: playerSocket.id
        }
      }));
    });

    socket.on('remove-user', (socketId, roomCode) => {
        socket.to(socketId).emit('ask-to-leave', roomCode);
    });

    socket.on('start-game', (roomCode) => {
        io.sockets.in(roomCode).emit('navigate-to', '/trader-joes');

        io.sockets.timeout(20000).in(roomCode).emit('get-date', (err: Error, dates: string[]) => {
            console.log('waiting...');
            if (err) {
                console.log(err);
            } else {
                console.log(dates);
                // calculate who is the person to start the game
                // then emit the answer
            }
        });
    })
})



/*
Client:
try {
  const response = await socket.timeout(5000).emitWithAck('request', { foo: 'bar' }, 'baz');
  console.log(response.status); // 'ok'
} catch (e) {
  // the server did not acknowledge the event in the given delay
}

Server:
io.on('connection', (socket) => {
  socket.on('request', (arg1, arg2, callback) => {
    console.log(arg1); // { foo: 'bar' }
    console.log(arg2); // 'baz'
    callback({
      status: 'ok'
    });
  });
});

*/

/*

exports.get_users_in_room = function (roomid) {
	var clients = sockets.io.sockets.clients(parseFloat(roomid));
	return _.map(clients, function(client) { return client.user });
}

socket.set and socket.get
*/

/*
Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the auth payload).
*/


/* 

socket.once(eventName, listener)
Adds a one-time listener function for the event named eventName

socket.once("details", (...args) => {
  // ...
});

*/


/* 

socket.onAny(listener)
Adds a listener that will be fired when any event is emitted.

socket.onAny((eventName, ...args) => {
  // ...
});

*/