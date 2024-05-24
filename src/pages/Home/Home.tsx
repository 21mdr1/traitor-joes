import { useState } from 'react';
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

    function createNewGame(): void {
        const roomCode = generateRandomCode(5);
        socket.connect();
        setIsRoomOwner(true);
        navigate(`/room/${socket.id}`);
    }

    function joinGame(): void {
        socket.connect();
        setIsRoomOwner(false);
        navigate(`/room/${socket.id}`);
    }

    return (  
        <main className="main main--home">
            <Button type="button" onClick={createNewGame}>New Game</Button>
            <Button type="button" onClick={() => setJoiningGame(true)}>Join Game</Button>
            {joiningGame && (
                <div className='room-form__container'>
                    <form className='room-form'>
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
