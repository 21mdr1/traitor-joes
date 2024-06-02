import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../../sockets/socket';
import './Room.scss';

function Room({ isRoomOwner, setIsRoomOwner, userName }: {
    isRoomOwner: boolean;
    setIsRoomOwner: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    userName: string;
}) {
    const navigate = useNavigate();
    const roomCode = useParams().roomCode || "";

    interface player {
        name: string;
        socketId: string;
    }

    const [ players, setPlayers ] = useState<player[]>([
        { name: userName, socketId: socket.id || ''}
    ]);

    useEffect(() => {
        socket.on('get-player-info', (callback) => {
            let player = { name: userName, socketId: socket.id || '' }
            console.log('sending info', player)
            callback(player);
        });

        function onDisconnect() {
            sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
            setIsRoomOwner(false);
            navigate('/');
        }
        socket.on('disconnect', onDisconnect);

        getPlayers();

        return () => {
            socket.off('get-player-info');
            socket.off('disconnect');
        }
    }, [])

    function getPlayers() {

        function setPlayerInfo(playerInfo: player[]) {
            console.log('playerInfo', playerInfo)
            setPlayers([
                ...playerInfo,
                ...players
            ]);
        }

        socket.emit('get-players', roomCode, setPlayerInfo);
    }

    function removePlayer() {

    }

    function startGame() {
        navigate("/trader-joes");
    }

    function leaveRoom() {
        sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
        setIsRoomOwner(false);
        socket.emit('leave-room', roomCode);
        navigate('/');
    }

    return (
        <main className="main main--room">
            <p className="room-code">Room code: { roomCode }</p>
            <div className="players">
                <h1 className="players__title">Players:</h1>
                <ol className="players__list">
                    {players.map(player => (
                        <li key={ player.socketId } className="players__item">
                            <div className='players__name'>{ player.name }</div>
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