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
        socket.emit('start-game', roomCode);
        navigate("/trader-joes");
    }, [ navigate ]);

    const leaveRoom = useCallback(function (roomCode: string) {
        socket.emit('leave-room', roomCode, socketId);
        sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
        setValue(state => ({
            ...state, 
            isRoomOwner: false, 
            roomCode: '', 
            players: []
        }));
        navigate('/');
    }, [ navigate, setValue ])

    useEffect(() => {
        socket.on('ask-to-leave', (roomCode) => {
            leaveRoom(roomCode);
        });
        // socket.on('disconnect', () => leaveRoom(roomCode));

        socket.on('user-was-added', (user) => {
            setValue(state => ({
                ...state,
                players: [...state.players, user]
            }));
        });

        socket.on('user-was-removed', (userSocketId) => {
            setValue(state => ({
                ...state,
                players: state.players.filter((player => player.socketId !== userSocketId))
            }));
        });

        socket.on('navigate-to', (page) => {
            navigate(page);
        })

        getPlayers();

        return () => {
            socket.off('ask-to-leave');
            socket.off('user-was-added');
            socket.off('user-was-removed');
            // socket.off('disconnect');
        }
    }, [ userName, getPlayers, navigate ]);

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