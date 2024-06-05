import socket from '../../sockets/socket';
import { useNavigate, useParams } from 'react-router';
import SocketContext from '../../components/socket_context/context';
import { useContext, useEffect, useCallback } from 'react';
import Button from '../../components/Button/Button';
import { player } from '../../utils/types';
import './Room.scss';

function Room() {
    const navigate = useNavigate();
    const roomCode = useParams().roomCode || "";

    const { value, setValue } = useContext(SocketContext);
    const { isRoomOwner, userName, players, socketId } = value;

    const getPlayers = useCallback(function () {

        function setPlayerInfo(playerInfo: player[]) {
            setValue(state => ({...state, players:
                [{name: userName, socketId: socketId}, ...playerInfo]
            }));
        }

        socket.emit('get-players', roomCode, setPlayerInfo);
    }, [roomCode, setValue, userName, socketId]);

    const removePlayer = useCallback(function (playerSocketId: string) {
       socket.emit('remove-user', playerSocketId, roomCode);
    }, []);

    const startGame = useCallback(function() {
        navigate("/trader-joes");
    }, [ navigate ]);

    const leaveRoom = useCallback(function (roomCode: string) {
        sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
        setValue(state => ({...state, isRoomOwner: false}));
        socket.emit('leave-room', roomCode);
        navigate('/');
    }, [ navigate, setValue ])

    useEffect(() => {
        socket.on('get-player-info', (sendInfo) => {
            sendInfo({ name: userName, socketId: socket.id || '' });
        });
        socket.on('remove-user', (roomCode) => {
            leaveRoom(roomCode);
        })

        // function onDisconnect() {
        //     sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
        //     setValue(state => ({...state, isRoomOwner: false}));
        //     navigate('/');
        // }
        // socket.on('disconnect', onDisconnect);

        getPlayers();

        return () => {
            socket.off('get-player-info');
            // socket.off('disconnect');
        }
    }, [ userName, getPlayers ])

    return (
        <main className="main main--room">
            <p className="room-code">Room code: { roomCode }</p>
            <div className="players">
                <h1 className="players__title">Players:</h1>
                <ol className="players__list">
                    {players.map(player => (
                        <li key={ player.socketId } className="players__item">
                            <div className='players__name'>{ player.name }</div>
                            {isRoomOwner && <div className='players__x' onClick={() => removePlayer(player.socketId)}>x</div>}
                        </li>
                    ))}
                </ol>
            </div> 
            {isRoomOwner &&
                <Button type="button" onClick={startGame}>Start Game</Button>
            }
            <Button type="button" level='secondary' onClick={() => leaveRoom(roomCode)}>Leave</Button>
        </main>
    );
}

export default Room;