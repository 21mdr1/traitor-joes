import { useSocketContext } from '../../components/socket_context/context';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';
import { getPlayers, leaveRoom, removePlayer, startGame } from '../../sockets/emit';
import './Room.scss';

function Room() {
    const { value, setValue } = useSocketContext();
    const { isRoomOwner, players, roomCode } = value;

    useEffect(() => {
        getPlayers(roomCode, setValue);
    }, [ roomCode, setValue ]);

    return (
        <main className="main main--room">
            <p className="room-code">Room code: { roomCode }</p>
            <div className="players">
                <h1 className="players__title">Players:</h1>
                <ol className="players__list">
                    {players.map(player => (
                        <li key={ player.socketId } className="players__item">
                            <div className='players__name'>{ player.name }</div>
                            {isRoomOwner && (
                                <div 
                                    className='players__x' 
                                    onClick={() => removePlayer(player.socketId, value)}
                                >
                                    x
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div> 
            {isRoomOwner &&
                <Button type="button" onClick={() => startGame({value, setValue})}>Start Game</Button>
            }
            <Button type="button" level='secondary' onClick={() => leaveRoom({ value, setValue })}>Leave</Button>
        </main>
    );
}

export default Room;