import React from "react";
import { createContext } from "react";
import { ISocketContextValue } from '../../utils/types';

const value: ISocketContextValue = {
    queueLength: 0,
    positionInLine: 0,
    isRoomOwner: false,
    userName: localStorage.getItem('name') || '',
    socketId: '',
    roomCode: '',
    players: [],
}

const setValue: React.Dispatch<React.SetStateAction<ISocketContextValue>> = () => {}

const SocketContext = createContext({ value, setValue });

export default SocketContext;