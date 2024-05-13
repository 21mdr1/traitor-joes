import Button from '../../components/Button/Button';
import './CrewMember.scss';

function CrewMember() {

    return (
        <main className='main main--crew'>
            <p className="crew__message">You are a Team Member</p>
            <h1 className="crew__title">Choose 3 items to Shelf:</h1>
            <div className="crew__shelf-container">
                {[1, 2, 3, 4, 5, 6].map(() => {
                    return (
                        <div className="crew__shelf-item"></div>
                    );
                })}
            </div>
            <Button>Send</Button>
        </main>
    );
}

export default CrewMember;