import socket from '../../sockets/socket';
import SocketContext from '../../components/socket_context/context';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { generateRandomCode } from '../../utils/mathUtils';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Home.scss';

function Home() {
    const navigate = useNavigate();

    const [ joiningGame, setJoiningGame ] = useState(false);
    const { value, setValue } = useContext(SocketContext);
    const { roomCode } = value;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(state => ({...state, roomCode: event.target.value}));
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
        setValue(state => ({...state, isRoomOwner}))
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
