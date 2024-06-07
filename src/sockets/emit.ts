import socket from './socket';
import { player, IContext, ISocketContextValue } from '../utils/types';
import { navigate } from '../App';

function addClientToQueue() {
    socket.emit('addClientToQueue');
}

function getQueueLength() {
    socket.emit('queueLengthToSocket');
}

function removeUserFromQueue() {
    socket.emit('removeUserFromQueue');
}

function joinRoom({ value, setValue }: IContext, roomCode: string, isRoomOwner: boolean) {
    const { userName, socketId } = value;
    socket.emit('join-room', roomCode, {name: userName, socketId});
    sessionStorage.setItem('isRoomOwner', JSON.stringify(isRoomOwner));
    setValue(state => ({...state, isRoomOwner, roomCode}))
    navigate(`/room/${roomCode}`);
}

function leaveRoom({ value, setValue }: IContext) {
    const { roomCode, socketId } = value;
    socket.emit('leave-room', roomCode, socketId);
    sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
    setValue(state => ({
        ...state, 
        isRoomOwner: false, 
        roomCode: '', 
        players: []
    }));
    navigate('/');
}

function removePlayer(playerSocketId: string, value: ISocketContextValue) {
    const { roomCode } = value;
    socket.emit('remove-user', playerSocketId, roomCode);
}

function getPlayers({ value, setValue }: IContext) {
    const { roomCode, userName, socketId } = value;
    socket.emit('get-players', roomCode, (playerInfo: player[]) => {
        setValue(state => ({...state, players:
            [{name: userName, socketId: socketId}, ...playerInfo]
        }));
    });
}

function startGame({ value, setValue }: IContext) {
    const { roomCode } = value;
    socket.emit('start-game', roomCode);
    navigate("/trader-joes");
}

export { addClientToQueue, getQueueLength, removeUserFromQueue, joinRoom, leaveRoom, getPlayers, removePlayer, startGame };