import Input from '../Input/Input';
import './Name.scss';

function Name() {
    return (
        <div className='name'>
            <form className='name__form'>
                <label htmlFor='name' className='name__label'>What is your name?</label>
                <Input 
                    id='name' 
                    name='name' 
                    type='text' 
                    placeholder='Name' 
                />
            </form>
        </div>
    );
}

export default Name;