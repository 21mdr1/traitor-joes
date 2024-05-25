import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../../socket';
import './Room.scss';

function Room({ isRoomOwner }: {
    isRoomOwner: boolean;
}) {
    const navigate = useNavigate();
    const { roomCode } = useParams();

    let players = ['Maria', 'Ben', 'Katie', 'Christien', 'Christian', 'Julian']

    // leave button should leave the room
    // socket.leave('roomName');
    // socket.on('disconnecting' ...) on the client side, is how the client learns about being disconnected from a room
    // remove room owner status when leaving room

    function getPlayers() {

    }

    function removePlayer() {

    }

    function startGame() {

    }

    function leaveRoom() {

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
                <Button type="button" onClick={() => {navigate("/trader-joes")}}>Start Game</Button>
            }
            <Button type="button" onClick={() => { navigate("/") }}>Leave</Button>
        </main>
    );
}

export default Room;