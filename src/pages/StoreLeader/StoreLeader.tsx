import { useState } from 'react';
import { useSocketContext } from '../../components/socket_context/context';
import Button from '../../components/Button/Button';
import './StoreLeader.scss';

function StoreLeader() {

    const { value } = useSocketContext();
    const { players, socketId } = value;

    const [ choosingTeam, setChoosingTeam ] = useState(true);
    const [ shelf, setShelf ] = useState(false);

    const [ team, setTeam ] = useState<string[]>([]);

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // notify players that they're part of the team
        setChoosingTeam(false);
        setShelf(true);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = event.target

        if (checked) {
            setTeam(state => ([...state, value]))
        } else {
            setTeam(state => state.filter(member => member !== value))
        }
    }

    return (
        <main className="main main--lead">
            {choosingTeam && (
                <form className='lead__container' onSubmit={handleFormSubmission}>
                <p className="lead__message">You are the Store Leader</p>
                <h1 className="lead__title">Pick your Team</h1>
                <div className="lead-form">
                    {players.filter((player) => player.socketId !== socketId).map((player) => {
                        return (
                            <label                  
                                className={`lead-form__item ${team.includes(player.socketId) && 'lead-form__item--checked'}`} 
                                key={player.socketId}
                            >
                                <input 
                                    className='lead-form__checkbox'
                                    type="checkbox"
                                    id="team"
                                    name="team"
                                    value={player.socketId}
                                    checked={team.includes(player.socketId)}
                                    onChange={handleInputChange}
                                />
                                <img 
                                    className='lead__image' 
                                    src={`https://api.multiavatar.com/${player.name}.svg`}
                                    alt={player.name}
                                />
                            </label>
                        );
                    })}
                </div>
                <p className="lead__message">Choose 3 people</p>
                <Button>Submit</Button>
                </form>
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