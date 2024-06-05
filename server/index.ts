import io from "./socket";

io.on('connection', socket => {
    socket.on('join-room', (roomCode, user) => {
        socket.join(roomCode);
        socket.to(roomCode).emit('user-was-added', user);
    });

    socket.on('leave-room', (roomCode, socketId) => {
        socket.leave(roomCode);
        socket.to(roomCode).emit('user-was-removed', socketId);
    });

    socket.on('get-players', (roomCode, sendPlayerInfo) => {
        socket.timeout(5000).to(roomCode).emit('get-player-info', (err: Error, player: {name: string, socketId: string}[]) => {
            if (err) {
                console.log(err);
            } else{
                sendPlayerInfo(player || []);
            }
        })
    });

    socket.on('remove-user', (socketId, roomCode) => {
        socket.to(socketId).emit('ask-to-leave', roomCode);
    });
})

