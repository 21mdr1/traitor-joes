import socket from './socket';
import { player, IContext, ISocketContextValue,socketContextSetter, dateObj } from '../utils/types';
import { navigate } from '../App';

function sendName(name: string) {
    socket.emit('send-name', name);
}

function joinRoom({ setValue }: IContext, roomCode: string, isRoomOwner: boolean) {
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

function startGame({ value }: IContext) {
    const { roomCode } = value;
    socket.emit('start-game', roomCode);
}

function sendLastVisitDate(lastVisitDate: dateObj, { value }: IContext) {
    socket.emit('send-last-visit', lastVisitDate, value.roomCode);
}

function getStoreLeader(setLeader: React.Dispatch<React.SetStateAction<player>>) {
    socket.emit('get-store-leader', (storeLeader) => {
        setLeader(storeLeader);
    });
}

function approveStoreLeader(vote: boolean, { value }: IContext) {
    socket.emit('approve-store-leader', vote, value.roomCode);
}

export { sendName, joinRoom, leaveRoom, getPlayers, removePlayer, startGame, sendLastVisitDate, getStoreLeader, approveStoreLeader };