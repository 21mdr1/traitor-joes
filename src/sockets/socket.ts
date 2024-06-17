import { io, Socket } from 'socket.io-client';
import { socketEvents } from './events';
import { player, ISocketContextValue } from '../utils/types';
import { roleCard, gameCard, storeLeaderStatus } from '../utils/types';

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

const URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:8080';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { autoConnect: false });

function initSockets({ value, setValue }: {
    value: ISocketContextValue;
    setValue: React.Dispatch<React.SetStateAction<ISocketContextValue>>;
}) {
    socketEvents({ value, setValue });
}

export default socket;
export { initSockets };
