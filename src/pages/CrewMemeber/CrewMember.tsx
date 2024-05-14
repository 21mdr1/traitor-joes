import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './CrewMember.scss';

function CrewMember() {

    const navigate = useNavigate();

    const [ cards, setCards ] = useState({
        "one": false,
        "two": false,
        "three": false,
        "four": false,
        "five": false,
        "six": false
    });

    const nums: ('one' | 'two' | 'three' | 'four' | 'five' | 'six')[] = ['one', 'two', 'three', 'four', 'five', 'six']

    return (
        <main className='main main--crew'>
            <form className='crew__form' onSubmit={ (event) => {
                event.preventDefault();
                console.log(cards);
                navigate('/player');
            }}>
                <p className="crew__message">You are a Team Member</p>
                <h1 className="crew__title">Choose 3 items to Shelf:</h1>
                <div className="crew__shelf-container">
                    {nums.map((num) => {
                        return (
                            <>
                            <input 
                                type='checkbox' 
                                name='card' 
                                id={num} 
                                className="crew__shelf-item-box" 
                                checked={cards[num]}
                                onChange={(event) => {
                                    const { name, checked } = event.target;
                                    setCards({ [name]: checked, ...cards  })
                                }}
                            />
                            <label className="crew__shelf-item" htmlFor={num}></label>
                            </>
                        );
                    })}
                </div>
                <Button>Send</Button>
            </form>
        </main>
    );
}

export default CrewMember;