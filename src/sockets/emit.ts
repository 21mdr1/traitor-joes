import socket from './socket';

function addClientToQueue() {
    socket.emit('addClientToQueue');
}

function getQueueLength() {
    socket.emit('queueLengthToSocket');
}

function removeUserFromQueue() {
    socket.emit('removeUserFromQueue');
}

function joinRoom(roomCode: string, user: {name: string, socketId: string}) {
    socket.emit('join-room', roomCode, user);
}

export { addClientToQueue, getQueueLength, removeUserFromQueue, joinRoom }