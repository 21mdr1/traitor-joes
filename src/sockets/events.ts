import socket from './socket';
import { ISocketContextValue } from '../utils/types';

function socketEvents({ value, setValue }: {
    value: ISocketContextValue;
    setValue: React.Dispatch<React.SetStateAction<ISocketContextValue>>;
}) {
    socket.on('connect', () => {
        setValue(state => ({...state, socketId: socket.id || ''}))
    });

    socket.on('disconnect', () => {
        setValue(state => ({
            ...state, 
            isRoomOwner: false, 
            socketId: '', 
            roomCode: '', 
            players: []
        }));
        sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
    });

    socket.on('queueLength', ({ queueLength }) => {
        setValue(state => ({...state, queueLength}));
    });

    socket.on('positionInLine', ({ positionInLine }) => {
        setValue(state => ({...state, positionInLine}));
    });

    socket.on('get-player-info', ( sendPlayerInfo ) => {
        sendPlayerInfo({ name: value.userName, socketId: value.socketId });
    });
}

export { socketEvents };