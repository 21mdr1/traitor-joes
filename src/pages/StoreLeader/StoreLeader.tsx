import { useState } from 'react';
import { useSocketContext } from '../../components/socket_context/context';
import Button from '../../components/Button/Button';
import './StoreLeader.scss';

function StoreLeader() {

    const { value } = useSocketContext();
    const { players, socketId } = value;

    const [ team, setTeam ] = useState(true);
    const [ shelf, setShelf ] = useState(false);

    return (
        <main className="main main--lead">
            {team && (
            <>
            <p className="lead__message">You are the Store Leader</p>
            <h1 className="lead__title">Pick your Team</h1>
            <div className="lead__team-container">
                {players.filter((player) => player.socketId !== socketId).map((player) => {
                    return (
                        <img 
                            key={player.socketId} 
                            className='lead__team-item' 
                            src={`https://api.multiavatar.com/${player.name}.svg`}
                            alt={player.name}
                        />
                    );
                })}
            </div>
            <p className="lead__message">Choose 3 people</p>
            <Button onClick={() => {setTeam(false); setShelf(true)}}>Submit</Button>
            </>
            )}
            {shelf && (
                <>
                <p className="lead__message">You are the Store Leader</p>
                <h1 className="lead__title">Choose 3 items to Shelf:</h1>
                <div className="lead__shelf-container">
                    {[1, 2, 3, 4, 5, 6].map(() => {
                        return (
                            <div className="lead__shelf-item"></div>
                        );
                    })}
                </div>
                <Button>Shelf</Button>
                </>
            )}
        </main>
    );
}

export default StoreLeader;