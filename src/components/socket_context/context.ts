import { createContext, useContext } from "react";
import { IContext } from '../../utils/types';

const SocketContext = createContext<IContext>({ 
    value: {
        queueLength: 0,
        positionInLine: 0,
        isRoomOwner: false,
        userName: localStorage.getItem('name') || '',
        socketId: '',
        roomCode: '',
        players: [],
        hand: [],
        role: '',
        leader: 'no',
    }, 
    setValue: () => {} 
});

function useSocketContext() {
    return useContext(SocketContext);
}

export default SocketContext;
export { useSocketContext };