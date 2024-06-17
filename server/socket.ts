import { Server } from 'socket.io';
import { roleCard, player, gameCard, storeLeaderStatus } from './utils/types';

interface ServerToClientEvents {
    'ask-to-leave': (roomCode: string) => void;
    'user-was-added': (user: player) => void;
    'user-was-removed': (socketId: string) => void;
    'navigate-to': (page: string) => void;
    'get-date': (sendDate: (date: string) => void) => void;
    'send-role': (role: roleCard) => void;
    'send-hand': (hand: gameCard[]) => void;
    'set-store-leader': (status: storeLeaderStatus) => void;
}

interface ClientToServerEvents {
    'send-name': (name: string) => void;
    'join-room': (roomCode: string) => void;
    'leave-room': (roomCode: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
    'get-players': (roomCode: string, sendPlayerInfo: (playerInfo: player[]) => void) => void;
    'start-game': (roomCode: string) => void;
    'send-last-visit': (lastVisitDate: string) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    'last-visit': string;
    role: roleCard;
    hand: gameCard[];
}

const io = new Server<
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents, 
    SocketData
>(8080, {
    cors: {
        origin: ['http://localhost:3000'],
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
    }
});

export default io;
export type { ServerToClientEvents, ClientToServerEvents, SocketData};