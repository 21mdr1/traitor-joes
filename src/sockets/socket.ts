import { io, Socket } from 'socket.io-client';
import { socketEvents } from './events';
import { getQueueLength } from './emit';
import { player, ISocketContextValue } from '../utils/types';

interface ServerToClientEvents {
    'get-player-info': (sendPlayerInfo: (player: player) => void) => void;
    'queueLength': ({ queueLength }: any) => void;
    'positionInLine': ({ positionInLine  }: any) => void;
    'ask-to-leave': (roomCode: string) => void;
    'user-was-added': (user: player) => void;
    'user-was-removed': (socketId: string) => void;
    'navigate-to': (page: string) => void;
}

interface ClientToServerEvents {
    'join-room': (roomCode: string, user: player) => void;
    'leave-room': (roomCode: string, socketId: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
    'get-players': (roomCode: string, sendPlayerInfo: (playerInfo: player[]) => void) => void;
    'start-game': (roomCode: string) => void;
    'addClientToQueue': () => void;
    'getQueueLength': () => void;
    'removeUserFromQueue': () => void;
    'queueLengthToSocket': () => void;
}

const URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:8080';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { autoConnect: false });

function initSockets({ value, setValue }: {
    value: ISocketContextValue;
    setValue: React.Dispatch<React.SetStateAction<ISocketContextValue>>;
}) {
    socketEvents({ value, setValue });
    getQueueLength();
}

export default socket;
export { initSockets };
