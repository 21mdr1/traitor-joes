import { Server } from 'socket.io';

interface ServerToClientEvents {
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

export default io;