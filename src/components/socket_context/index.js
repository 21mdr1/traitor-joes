import { useState, useEffect } from 'react';
import SocketContext from './context';
import { socketCleanUp } from '../../sockets/events';
import { initSockets } from '../../sockets/socket';

function SocketProvider(props) {
    const [ value, setValue ] = useState({
        queueLength: 0,
        positionInLine: 0,
        isRoomOwner: false,
        userName: localStorage.getItem('name') || '',
        socketId: '',
        roomCode: '',
        players: [],
    });

    useEffect(() => {
        initSockets({ value, setValue });
        return socketCleanUp;
    }, 
    [ value, setValue ]);

    return(
        <SocketContext.Provider value={{ value, setValue }}>
            { props.children }
        </SocketContext.Provider>
    )
};

export default SocketProvider;