import { createContext, useContext } from "react";
import { IContext, gameCard, player, roleCard } from '../../utils/types';

const SocketContext = createContext<IContext>({ 
    value: {
        isRoomOwner: false,
        userName: localStorage.getItem('name') || '',
        socketId: '',
        roomCode: '',
        players: [] as player[],
        hand: [] as gameCard[],
        role: '' as roleCard,
        leader: 'no',
        leaderDecided: 'na',
    }, 
    setValue: () => {} 
});

function useSocketContext() {
    return useContext(SocketContext);
}

export default SocketContext;
export { useSocketContext };