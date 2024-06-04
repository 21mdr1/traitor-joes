import { Server } from 'socket.io';
// some types

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    'get-player-info': (callback: (player: {name: string; socketId: string}) => void) => void;
}

interface ClientToServerEvents {
    'join-room': (roomCode: string) => void;
    'leave-room': (roomCode: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
    'get-players': (roomCode: string, callBack: (playerInfo: {name: string, socketId: string}[]) => void) => void;
    'start-game': (roomCode: string) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

// now the code

const io = new Server<
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents, 
    SocketData
>(8080, {
    cors: {
        origin: ['http://localhost:3000'],
    }
});

// executed any time a client makes a connection
io.on('connection', socket => {
    socket.on('join-room', roomCode => {
        socket.join(roomCode);
    });

    socket.on('leave-room', roomCode => {
        socket.leave(roomCode);
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
        // let user = io.sockets.connected[socketId];
        // user.leave(roomCode)
    });
})

