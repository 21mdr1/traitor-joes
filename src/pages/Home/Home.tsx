import { useSocketContext } from '../../components/socket_context/context';
import { useState, useContext } from 'react';
import { generateRandomCode } from '../../utils/mathUtils';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { joinRoom, sendName } from '../../sockets/emit';
import './Home.scss';

function Home() {
    const [ joiningGame, setJoiningGame ] = useState(false);
    const [ workingCode, setWorkingCode ] = useState('');
    const { value, setValue } = useSocketContext();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setWorkingCode(event.target.value.toUpperCase());
    }
    
    function handleFormSubmition(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        sendName(value.userName);
        joinRoom({value, setValue}, workingCode, false);
    }

    return (  
        <main className="main main--home">
            <Button type="button" onClick={() => {sendName(value.userName); joinRoom({value, setValue}, generateRandomCode(5), true)}}>New Game</Button>
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
                            value={ workingCode }
                            onChange={ handleInputChange }
                        />
                        <Button disabled={workingCode.length !== 5}>Join Room</Button>
                        <Button type='button' level='secondary' onClick={() => {setJoiningGame(false)}}>Go back</Button>
                    </form>
                </div>
            )}
        </main>
    );
}

export default Home;
