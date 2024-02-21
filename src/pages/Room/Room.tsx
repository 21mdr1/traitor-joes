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
            <p className="room-code">Room code: { roomCode }</p>
            <div className="players">
                <h1 className="players__title">Players:</h1>
                <ol className="players__list">
                    {players.map(player => <li className="players__item">{ player }{isRoomOwner && '  x'}</li>)}
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