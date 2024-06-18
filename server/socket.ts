import { Server } from 'socket.io';
import { roleCard, player, gameCard, storeLeaderStatus, dateObj } from './utils/types';

interface ServerToClientEvents {
    'ask-to-leave': (roomCode: string) => void;
    'user-was-added': (user: player) => void;
    'user-was-removed': (socketId: string) => void;
    'navigate-to': (page: string) => void;
    'get-date': (sendDate: (date: string) => void) => void;
    'send-role': (role: roleCard) => void;
    'send-hand': (hand: gameCard[]) => void;
    'set-store-leader': (status: storeLeaderStatus) => void;
    'store-leader-decision': (decision: boolean) => void;
}

interface ClientToServerEvents {
    'send-name': (name: string) => void;
    'join-room': (roomCode: string) => void;
    'leave-room': (roomCode: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
    'get-players': (roomCode: string, sendPlayerInfo: (playerInfo: player[]) => void) => void;
    'start-game': (roomCode: string) => void;
    'send-last-visit': (lastVisitDate: dateObj, roomCode: string) => void;
    'get-store-leader': (callback: (storeLeader: player) => void) => void;
    'approve-store-leader': (vote: boolean, roomCode: string) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    lastVisit: dateObj;
    role: roleCard;
    hand: gameCard[];
    voted: boolean;
    vote: boolean;
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