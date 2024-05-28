import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { generateRandomCode } from '../../utils/mathUtils';
import Button from '../../components/Button/Button';
import socket from '../../socket';
import './Home.scss';
import Input from '../../components/Input/Input';

function Home({ setIsRoomOwner }: {
    setIsRoomOwner: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}) {
    const navigate = useNavigate();

    const [ joiningGame, setJoiningGame ] = useState(false);
    const [ roomCode, setRoomCode ] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomCode(event.target.value);
    }
    
    function handleFormSubmition(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        joinGame(roomCode, false);
    }

    function joinGame(roomCode: string, isRoomOwner: boolean) {
        roomCode = roomCode.toUpperCase();
        socket.connect();
        socket.emit('join-room', roomCode);
        sessionStorage.setItem('isRoomOwner', JSON.stringify(isRoomOwner));
        setIsRoomOwner(isRoomOwner);
        navigate(`/room/${roomCode}`);
    }

    return (  
        <main className="main main--home">
            <Button type="button" onClick={() => {joinGame(generateRandomCode(5), true)}}>New Game</Button>
            <Button type="button" onClick={() => setJoiningGame(true)}>Join Game</Button>
            {joiningGame && (
                <div className='room-form__container'>
                    <form className='room-form' onSubmit={handleFormSubmition}>
                        <label htmlFor='room' className='room-form__label'>Enter Room Code:</label>
                        <Input
                            type='text'
                            name='room'
                            id='room'
                            placeholder='Enter Room Code'
                            value={ roomCode }
                            onChange={ handleInputChange }
                        />
                        <Button disabled={roomCode.length !== 5}>Join Room</Button>
                    </form>
                </div>
            )}
        </main>
    );
}

export default Home;
