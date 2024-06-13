import socket from './socket';
import { IContext } from '../utils/types';
import { leaveRoom } from './emit';
import { navigate } from '../App';

function socketEvents({ value, setValue }: IContext) {
    socket.on('connect', () => {
        // if (socket.recovered) {
        //     // any event missed during the disconnection period will be received now
        // } else {
        //     // new or unrecoverable session
        // }
        setValue(state => ({...state, socketId: socket.id || ''}))
    });

    socket.on('disconnect', () => {
        leaveRoom({ value, setValue });
    });

    socket.on('queueLength', ({ queueLength }) => {
        setValue(state => ({...state, queueLength}));
    });

    socket.on('positionInLine', ({ positionInLine }) => {
        setValue(state => ({...state, positionInLine}));
    });

    socket.on('user-was-added', (user) => {
        setValue(state => ({
            ...state,
            players: [...state.players, user]
        }));
    });

    socket.on('user-was-removed', (userSocketId) => {
        setValue(state => ({
            ...state,
            players: state.players.filter((player => player.socketId !== userSocketId))
        }));
    });

    socket.on('ask-to-leave', (roomCode) => {
        leaveRoom({ value, setValue });
    });

    socket.on('navigate-to', (page) => {
        navigate(page);
    });

    socket.on('get-date', (sendDate) => {
        let date = '1/1/2024'
        sendDate(date);
    });
}

function socketCleanUp() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('queueLength');
    socket.off('positionInLine');
    socket.off('user-was-added');
    socket.off('user-was-removed');
    socket.off('ask-to-leave');
    socket.off('navigate-to');
    // socket.off('get-date');
}

export { socketEvents, socketCleanUp };