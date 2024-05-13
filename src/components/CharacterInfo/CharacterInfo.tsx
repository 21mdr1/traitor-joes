import Button from '../Button/Button';
import './CharacterInfo.scss';

function CharacterInfo() {
    return (
        <div className="info">
            <h1 className="info__title">You are a traitor</h1>
            <div className="info__content">
                <div className="info__image"></div>
                <p className="info__text">You are a traitor. Your goal is to get rotten produce into the shelves without getting caught.</p>
            </div>
            <Button>Ok</Button>
        </div>
    );
}

export default CharacterInfo;