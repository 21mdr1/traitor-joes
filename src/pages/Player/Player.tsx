import { useState, useEffect } from 'react';
import CharacterInfo from '../../components/CharacterInfo/CharacterInfo';
import NextStoreLeader from '../../components/NextStoreLeader/NextStoreLeader';
import './Player.scss';
import bagel from '../../assets/images/playingCards/everything_but_the_bagel_seasoning_37.png';
import butter from '../../assets/images/playingCards/cookie_butter_12.png';
import cheddar from '../../assets/images/playingCards/unexpected_cheddar_3.png';
import rotten from '../../assets/images/playingCards/rotten_52.png'

interface players {
    name: string;
    socketId: string;
}

let cardDict = {
    bagel: bagel,
    butter: butter,
    cheddar: cheddar,
    rotten: rotten,
}

type cardType = 'bagel' | 'butter' | 'cheddar' | 'rotten'

function Player() {
        const [ info, setInfo ] = useState(false);
        const [ nextStoreLeader, setNextStoreLeader ] = useState(false);
        const [ hand, setHand ] = useState<cardType[]>([]);
        const [ otherPlayers, setOtherPlayers ] = useState<players[]>([]);

        useEffect(() => {
            setHand(
                [
                    'butter',
                    'rotten',
                    'cheddar'
                ]
            );

            setOtherPlayers([
                {name: 'maria', socketId: '1'},
                {name: 'ben', socketId: '2'},
                {name: 'christian', socketId: '3'},
                {name: 'christien', socketId: '4'},
                {name: 'katie', socketId: '5'},
            ]);
        }, []);

        return (
            <main className='main main--player'>
                <div className="other-players">
                    {otherPlayers.map((player) => {
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
                { info && <CharacterInfo /> }
                { nextStoreLeader && <NextStoreLeader/> }
            </main>
        );
}

export default Player;