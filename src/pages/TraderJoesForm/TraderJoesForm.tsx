import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './TraderJoesForm.scss';

function TraderJoesForm() {
    const navigate = useNavigate();

    const [ date, setDate ] = useState('');

    function formSubmitionHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(date);
        navigate('/player');
    }

    function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    return (
        <main className="main main--tjform">
            <form onSubmit={formSubmitionHandler} className='date-form'>
                <label 
                    className='date-form__label' 
                    htmlFor='date'
                >
                    When was the last time you went to Trader Joes?
                </label>
                <Input 
                    id='date'
                    name='date' 
                    type='date'
                    onChange={inputChangeHandler}
                    value={date}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </main>
    );
}

export default TraderJoesForm;