import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import './Home.scss';

function Home() {
    const navigate = useNavigate();

    return (  
        <main className="main main--home">
            <Button type="button" onClick={()=>{navigate('/room/1234')}}>New Game</Button>
            <Button type="button" onClick={()=>{navigate('/room/1234')}}>Join Game</Button>
        </main>
    );
}

export default Home;
