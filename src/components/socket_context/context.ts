import React from "react";
import { createContext } from "react";

interface player {
    name: string;
    socketId: string;
}

interface ISocketContextValue {
    queueLength: number;
    positionInLine: number;
    isRoomOwner: boolean;
    userName: string;
    socketId: string;
    roomCode: string;
    players: player[];
}

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