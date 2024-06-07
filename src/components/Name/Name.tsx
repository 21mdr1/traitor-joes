import { useSocketContext } from '../socket_context/context';
import { useState, useContext } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Name.scss';

function Name() {
    const { setValue } = useSocketContext();

    const [ name, setName ] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        localStorage.setItem('name', name);
        setValue(state => ({...state, userName: name}))
    }

    return (
        <div className='name'>
            <form className='name__form' onSubmit={handleFormSubmission}>
                <label htmlFor='name' className='name__label'>What is your name?</label>
                <Input 
                    id='name' 
                    name='name' 
                    type='text' 
                    placeholder='Name' 
                    value={name}
                    onChange={handleInputChange}
                />
                <Button disabled={!name}>Submit</Button>
            </form>
        </div>
    );
}

export default Name;