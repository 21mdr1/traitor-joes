import { useNavigate } from 'react-router';
import { generateRandomCode } from '../../utils/mathUtils';
import Button from '../../components/Button/Button';
import socket from '../../socket';
import './Home.scss';

function Home({ setIsRoomOwner }: {
    setIsRoomOwner: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}) {
    const navigate = useNavigate();

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
            <Button type="button" onClick={joinGame}>Join Game</Button>
        </main>
    );
}

export default Home;
