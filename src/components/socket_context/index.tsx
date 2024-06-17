import { useState, useEffect, ReactNode } from 'react';
import SocketContext from './context';
import { socketCleanUp } from '../../sockets/events';
import { initSockets } from '../../sockets/socket';
import { ISocketContextValue } from '../../utils/types';

function SocketProvider({ children }: {
    children: ReactNode;
}) {
    const [ value, setValue ] = useState<ISocketContextValue>({
        isRoomOwner: false,
        userName: localStorage.getItem('name') || '',
        socketId: '',
        roomCode: '',
        players: [],
        hand: [],
        role: '',
        leader: 'no',
    });

    useEffect(() => {
        initSockets({ value, setValue });
        return socketCleanUp;
    }, 
    [ value, setValue ]);

    return (
        <SocketContext.Provider value={{ value, setValue }}>
            { children }
        </SocketContext.Provider>
    );
};

export default SocketProvider;