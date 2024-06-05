import io from "./socket";

io.on('connection', socket => {
    socket.on('join-room', roomCode => {
        socket.join(roomCode);
        // let other members know you joined
    });

    socket.on('leave-room', roomCode => {
        socket.leave(roomCode);
        // let other members know you left
    });

    socket.on('get-players', (roomCode, sendPlayerInfo) => {
        console.log('getting players for room', roomCode);

        socket.timeout(5000).to(roomCode).emit('get-player-info', (err: Error, player: {name: string, socketId: string}[]) => {
            if (err) {
                console.log(err);
            } else{
                sendPlayerInfo(player || []);
            }
        })
    });

    socket.on('remove-user', (socketId, roomCode) => {
        // user.leave(roomCode)
    });
})

