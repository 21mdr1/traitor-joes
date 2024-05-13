import { useState } from 'react';
import Button from '../../components/Button/Button';
import './StoreLeader.scss';

function StoreLeader() {

    const [ team, setTeam ] = useState(false);
    const [ shelf, setShelf ] = useState(true);

    return (
        <main className="main main--lead">
            {team && (
            <>
            <p className="lead__message">You are the Store Leader</p>
            <h1 className="lead__title">Pick your Team</h1>
            <div className="lead__team-container">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                    return (
                        <div className="lead__team-item"></div>
                    );
                })}
            </div>
            <p className="lead__message">Choose 3 people</p>
            <Button>Submit</Button>
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