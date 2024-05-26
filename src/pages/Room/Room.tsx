import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../../socket';
import './Room.scss';

function Room({ isRoomOwner, setIsRoomOwner }: {
    isRoomOwner: boolean;
    setIsRoomOwner: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}) {
    const navigate = useNavigate();
    const { roomCode } = useParams();

    let players = ['Maria', 'Ben', 'Katie', 'Christien', 'Christian', 'Julian']

    useEffect(() => {
        function onDisconnect() {
            sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
            setIsRoomOwner(false);
            navigate('/');
        }

        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('disconnect');
        }
    })

    function getPlayers() {

    }

    function removePlayer() {

    }

    function startGame() {
        navigate("/trader-joes");
    }

    function leaveRoom() {
        sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
        setIsRoomOwner(false);
        socket.emit('leave-room', roomCode || '');
        navigate('/');
    }

    return (
        <main className="main main--room">
            <p className="room-code">Room code: { roomCode }</p>
            <div className="players">
                <h1 className="players__title">Players:</h1>
                <ol className="players__list">
                    {players.map(player => (
                        <li key={ player } className="players__item">
                            <div className='players__name'>{ player }</div>
                            {isRoomOwner && <div className='players__x'>x</div>}
                        </li>
                    ))}
                </ol>
            </div> 
            {isRoomOwner &&
                <Button type="button" onClick={startGame}>Start Game</Button>
            }
            <Button type="button" onClick={leaveRoom}>Leave</Button>
        </main>
    );
}

export default Room;