import { useEffect, useState } from 'react';
import { useSocketContext } from '../../components/socket_context/context';
import CharacterInfo from '../../components/CharacterInfo/CharacterInfo';
import NextStoreLeader from '../../components/NextStoreLeader/NextStoreLeader';
import './Player.scss';
import bagel from '../../assets/images/playingCards/everything_but_the_bagel_seasoning_37.png';
import butter from '../../assets/images/playingCards/cookie_butter_12.png';
import cheddar from '../../assets/images/playingCards/unexpected_cheddar_3.png';
import rotten from '../../assets/images/playingCards/rotten_52.png'

let cardDict = {
    bagel: bagel,
    butter: butter,
    cheddar: cheddar,
    rotten: rotten,
    '': '',
}

function Player() {
        const [ info, setInfo ] = useState(true);
        const [ nextStoreLeader, setNextStoreLeader ] = useState(true);
        const { value } = useSocketContext();
        const { players, hand } = value;

        return (
            <main className='main main--player'>
                <div className="other-players">
                    {players.map((player) => {
                        return (
                            <img 
                                key={player.socketId} 
                                className='other-players__avi' 
                                src={`https://api.multiavatar.com/${player.name}.svg`}
                                alt={player.name}
                            />
                        );
                    })}
                </div>
                <div className="cards">
                    <h2 className="cards__title">Your cards:</h2>
                    <div className="cards__container">
                        {hand.map((card) => {
                            return (
                                <img 
                                    key={card} 
                                    className='cards__item' 
                                    src={cardDict[card]}
                                    alt={card}
                                />
                            );
                        })}
                    </div>
                </div>
                { nextStoreLeader && <NextStoreLeader setNextStoreLeader={setNextStoreLeader}/> }
                { info && <CharacterInfo setInfo={ setInfo } /> }
            </main>
        );
}

export default Player;