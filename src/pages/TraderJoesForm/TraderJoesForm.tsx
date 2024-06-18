import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import './TraderJoesForm.scss';
import { sendLastVisitDate } from '../../sockets/emit';

function TraderJoesForm() {

    const [ date, setDate ] = useState('');
    const [ waiting, setWaiting ] = useState(false);

    function formSubmitionHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let dateArr = date.split('-');

        sendLastVisitDate({
            year: Number(dateArr[0]),
            month: Number(dateArr[1]),
            day: Number(dateArr[2]),
        })

        setWaiting(true);    
    }

    function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    function formIsValid(): boolean {
        return !!date
    }

    let dtToday = new Date();

    let maxDate = dtToday.toISOString().slice(0, 10);

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
                    max={maxDate}
                />
                <Button type='submit' disabled={!formIsValid()}>Submit</Button>
            </form>
            {waiting && (
                <div className='waiting__background'>
                    <div className='waiting__message'>
                    Waiting for the rest of the players...
                    </div>
                </div>
            )}
        </main>
    );
}

export default TraderJoesForm;