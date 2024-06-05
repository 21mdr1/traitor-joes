import { io, Socket } from 'socket.io-client';
import { socketEvents } from './events';
import { getQueueLength } from './emit';
import { ISocketContextValue } from '../utils/types';

interface ServerToClientEvents {
    'get-player-info': (callback: (player: {name: string, socketId: string}) => void) => void;
    'queueLength': ({ queueLength }: any) => void;
    'positionInLine': ({ positionInLine  }: any) => void ;
}

interface ClientToServerEvents {
    'join-room': (roomCode: string) => void;
    'leave-room': (roomCode: string) => void;
    'remove-user': (socketId: string, roomCode: string) => void;
    'get-players': (roomCode: string, callBack: (playerInfo: {name: string, socketId: string}[]) => void) => void;
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
    setValue(state => ({ ...state, userName: localStorage.getItem('name') || ''}));
    getQueueLength();
}

export default socket;
export { initSockets };
