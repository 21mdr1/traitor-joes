import socket from './socket';

function socketEvents({ setValue }) {
    socket.on('queueLength', ({ queueLength }) => {
        setValue(state => ({...state, queueLength}));
    });

    socket.on('positionInLine', ({ positionInLine }) => {
        setValue(state => ({...state, positionInLine}));
    })
}

export { socketEvents };