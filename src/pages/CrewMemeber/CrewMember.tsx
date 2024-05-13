import { useState } from 'react';
import Button from '../../components/Button/Button';
import './CrewMember.scss';

function CrewMember() {

    const [ info, setInfo ] = useState(false);

    return (
        <main className='main main--crew'>
            <div className="team">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                    return (
                        <div className='team__avi'></div>
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
            {info && (
                <div className="info">
                    <h1 className="info__title">You are a traitor</h1>
                    <div className="info__content">
                        <div className="info__image"></div>
                        <p className="info__text">You are a traitor. Your goal is to get rotten produce into the shelves without getting caught.</p>
                    </div>
                    <Button>Ok</Button>
                </div>
            )}
        </main>
    );
}

export default CrewMember;