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

    socket.on('ask-to-leave', (_) => {
        leaveRoom({ value, setValue });
    });

    socket.on('navigate-to', (page) => {
        navigate(page);
    });

    socket.on('get-date', (sendDate) => {
        let date = '1/1/2024'
        sendDate(date);
    });

    socket.on('send-hand', (hand) => {
        setValue(state => ({
            ...state,
            hand
        }));
    });

    socket.on('send-role', (role) => {
        setValue(state => ({
            ...state,
            role
        }));
    });

    socket.on('set-store-leader', (status) => {
        setValue(state => ({
            ...state,
            leader: status,
        }));
    });
}

function socketCleanUp() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('user-was-added');
    socket.off('user-was-removed');
    socket.off('ask-to-leave');
    socket.off('navigate-to');
    socket.off('get-date');
    socket.off('send-hand');
    socket.off('send-role');
    socket.off('set-store-leader');
}

export { socketEvents, socketCleanUp };