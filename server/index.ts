import { Server } from 'socket.io';
// some types

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    'join-room': (roomCode: string) => void;
    'leave-room': (roomCode: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
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
    // console.log("conected", socket.id);
    socket.on('join-room', roomCode => {
        socket.join(roomCode);
        // console.log('joining-room', roomCode);
    });
    socket.on('leave-room', roomCode => {
        socket.leave(roomCode);
        // socket.to(room).emit('user left', socket.id)
        // console.log('leaving room', roomCode)
    });
    socket.on('remove-user', (socketId, roomCode) => {
        // let user = io.sockets.connected[socketId];
        // user.leave(roomCode)
    })
})

