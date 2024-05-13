import { useState } from 'react';
import CharacterInfo from '../../components/CharacterInfo/CharacterInfo';
import NextStoreLeader from '../../components/NextStoreLeader/NextStoreLeader';
import './Player.scss';

function Player() {
        const [ info, setInfo ] = useState(false);
        const [ nextStoreLeader, setNextStoreLeader ] = useState(false);

        return (
            <main className='main main--player'>
                <div className="other-players">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                        return (
                            <div className='other-players__avi'></div>
                        );
                    })}
                </div>
                <div className="cards">
                    <h2 className="cards__title">Your cards:</h2>
                    <div className="cards__container">
                        {[1, 2, 3, 4, 5, 6].map(() => {
                            return (
                                <div className="cards__item"></div>
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