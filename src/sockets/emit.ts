import socket from './socket';
import { player } from '../utils/types';

function addClientToQueue() {
    socket.emit('addClientToQueue');
}

function getQueueLength() {
    socket.emit('queueLengthToSocket');
}

function removeUserFromQueue() {
    socket.emit('removeUserFromQueue');
}

function joinRoom(roomCode: string, user: player) {
    socket.emit('join-room', roomCode, user);
}

export { addClientToQueue, getQueueLength, removeUserFromQueue, joinRoom }