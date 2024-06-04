import socket from './socket';

function socketEvents({ value, setValue }) {
    socket.on('connect', () => {
        setValue(state => ({...state, socketId: socket.id}))
    });

    socket.on('disconnect', () => {
        setValue(state => ({...state, 
            isRoomOwner: false, 
            socketId: '', 
            roomCode: '', 
            players: []}));
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