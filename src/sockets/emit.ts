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

function joinRoom(roomCode: string) {
    socket.emit('join-room', roomCode);
}

export { addClientToQueue, getQueueLength, removeUserFromQueue, joinRoom }