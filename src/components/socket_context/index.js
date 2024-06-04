import { useState, useEffect } from 'react';
import SocketContext from './context';
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

    useEffect(() => 
        initSockets({ value, setValue }), 
    [ value, setValue ]);

    return(
        <SocketContext.Provider value={{ value, setValue }}>
            { props.children }
        </SocketContext.Provider>
    )
};

export default SocketProvider;