import { useState } from 'react';
import { useSocketContext } from '../../components/socket_context/context';
import Button from '../../components/Button/Button';
import './StoreLeader.scss';
import bagel from '../../assets/images/playingCards/everything_but_the_bagel_seasoning_37.png';
import butter from '../../assets/images/playingCards/cookie_butter_12.png';
import cheddar from '../../assets/images/playingCards/unexpected_cheddar_3.png';
import rotten from '../../assets/images/playingCards/rotten_52.png';
import { gameCard } from '../../utils/types';

let cardDict = {
    bagel: bagel,
    butter: butter,
    cheddar: cheddar,
    rotten: rotten,
    '': '',
}
function StoreLeader() {

    const { value } = useSocketContext();
    const { players, socketId } = value;

    const [ choosingTeam, setChoosingTeam ] = useState(true);
    const [ choosingShelf, setChoosingShelf ] = useState(false);

    const [ team, setTeam ] = useState<string[]>([]);
    const [ shelf, setShelf ] = useState<string[]>([]);

    const potentialItems: ({name: gameCard; id: string})[] = [
        {name: 'butter', id: '1'},
        {name: 'rotten', id: '2'},
        {name: 'rotten', id: '3'},
        {name: 'rotten', id: '4'},
        {name: 'bagel', id: '5'},
        {name: 'cheddar', id: '6'},
    ]


    function handleTeamFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // notify players that they're part of the team
        setChoosingTeam(false);
        setChoosingShelf(true);
    }

    function handleTeamInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = event.target
        if (checked) {
            setTeam(state => ([...state, value]))
        } else {
            setTeam(state => state.filter(member => member !== value))
        }
    }

    function handleShelfFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // notify of chosen shelf
    }

    function handleShelfInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = event.target
        if (checked) {
            setShelf(state => ([...state, value]))
        } else {
            setShelf(state => state.filter(item => item !== value))
        }
    }

    return (
        <main className="main main--lead">
            {choosingTeam && (
                <form className='lead__container' onSubmit={handleTeamFormSubmission}>
                <p className="lead__message">You are the Store Leader</p>
                <h1 className="lead__title">Pick your Team</h1>
                <div className="lead-form">
                    {players.filter((player) => player.socketId !== socketId).map((player) => {
                        return (
                            <label                  
                                className='lead-form__item lead-form__item--team' 
                                key={player.socketId}
                            >
                                <input 
                                    className='lead-form__checkbox'
                                    type="checkbox"
                                    id="team"
                                    name="team"
                                    value={player.socketId}
                                    checked={team.includes(player.socketId)}
                                    onChange={handleTeamInputChange}
                                />
                                <img 
                                    className={`lead-form__image lead-form__image--team ${team.includes(player.socketId) && 'lead-form__image--checked'}`} 
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
            {choosingShelf && (
                <form className='lead__container' onSubmit={handleShelfFormSubmission}>
                <p className="lead__message">You are the Store Leader</p>
                <h1 className="lead__title">Choose 3 items to Shelf:</h1>
                <div className="lead-form">
                    {potentialItems.map((item) => {
                        return (
                            <label className='lead-form__item lead-form__item--shelf'
                            key={item.id}
                            >
                                <input 
                                    className='lead-form__checkbox'
                                    id='shelf'
                                    name='shelf'
                                    type='checkbox'
                                    value={item.id}
                                    checked={shelf.includes(item.id)}
                                    onChange={handleShelfInputChange}
                                />
                                <img
                                    className={`lead-form__image lead-form__image--shelf ${shelf.includes(item.id) && 'lead-form__image--checked' }`}
                                    src={cardDict[item.name]}
                                    alt={item.name}
                                />
                            </label>
                        );
                    })}
                </div>
                <Button>Shelf</Button>
                </form>
            )}
        </main>
    );
}

export default StoreLeader;