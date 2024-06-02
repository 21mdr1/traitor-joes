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

export { addClientToQueue, getQueueLength, removeUserFromQueue }