import { useSocketContext } from '../socket_context/context';
import traitor from '../../assets/images/roleCards/traitor_joe_4.png';
import average from '../../assets/images/roleCards/average_joe_6.png';
import Button from '../Button/Button';
import './CharacterInfo.scss';

function CharacterInfo({ setInfo }:{
    setInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    let { value } = useSocketContext();
    let { role } = value;

    return (
        <div className="info__container">
            <div className="info">
                <h1 className="info__title">You are {role === 'average' ? 'an Average' : 'a Traitor'} Joe</h1>
                <div className="info__content">
                    <img 
                        className="info__image"
                        src={ role === 'average' ? average : traitor }
                        alt={ `${role} joe`}
                    />
                    <p className="info__text">{
                        role === 'average' ? 
                        'You are an Average Joe. Your goal is to prevent the Traitor Joes from getting the rotten produce into the shelves.' :
                        'You are a Traitor Joe. Your goal is to get rotten produce into the shelves without getting caught.'
                    }</p>
                </div>
                <Button onClick={() => setInfo(false) }>Ok</Button>
            </div>
        </div>
    );
}

export default CharacterInfo;