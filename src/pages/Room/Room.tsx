import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router';
import './Room.scss';

function Room() {
    const navigate = useNavigate();
    const { roomCode } = useParams();

    let players = ['Maria', 'Ben', 'Katie', 'Christien', 'Christian', 'Julian']

    const isRoomOwner = true


    return (
        <main className="main main--room">
            <p>Room code: { roomCode }</p>
            <h1>Players:</h1>
            <ol>
                {players.map(player => <li>{ player }{isRoomOwner && '  x'}</li>)}
            </ol>
            {isRoomOwner &&
                <Button type="button" onClick={() => {navigate("/trader-joes")}}>Start Game</Button>
            }
            <Button type="button" onClick={() => { navigate("/") }}>Leave</Button>
        </main>
    );
}

export default Room;