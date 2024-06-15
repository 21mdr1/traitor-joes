import socket from './socket';
import { player, IContext, ISocketContextValue,socketContextSetter } from '../utils/types';
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

function sendName(name: string) {
    socket.emit('send-name', name);
}

function joinRoom({ value, setValue }: IContext, roomCode: string, isRoomOwner: boolean) {
    socket.emit('join-room', roomCode);
    setValue(state => ({...state, isRoomOwner, roomCode}))
    navigate(`/room/${roomCode}`);
}

function leaveRoom({ value, setValue }: IContext) {
    const { roomCode } = value;
    socket.emit('leave-room', roomCode);
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

function getPlayers(roomCode: string, setValue: socketContextSetter) {
    socket.emit('get-players', roomCode, (playerInfo: player[]) => {
        setValue(state => ({...state, players:
            [...playerInfo]
        }));
    });
}

function startGame({ value, setValue }: IContext) {
    const { roomCode } = value;
    socket.emit('start-game', roomCode);
}

function sendLastVisitDate(lastVisitDate: string) {
    socket.emit('send-last-visit', lastVisitDate)
}

export { addClientToQueue, getQueueLength, removeUserFromQueue, sendName, joinRoom, leaveRoom, getPlayers, removePlayer, startGame, sendLastVisitDate };