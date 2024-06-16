import { useState, useEffect, SetStateAction } from 'react';
import Button from '../Button/Button';
import './NextStoreLeader.scss';
import Modal from '../Modal/Modal';

function NextStoreLeader({ setNextStoreLeader }: {
    setNextStoreLeader: React.Dispatch<SetStateAction<boolean>>
}) {
    const [ leader, setLeader ] = useState('');
    
    useEffect(() => {
        setLeader('Ben');
    })

    return (
        <Modal className='next-leader'>
            <h1 className="next-leader__title">{leader} will be the next Store Leader</h1>

            <p className="next-leader__text">{leader} will get to choose this shift's team and items to shelf. If you deny 3 store leades in a row, one good item will be turned into a Rotten item.</p>
            
            <div className='next-leader__buttons'>
                <Button onClick={() => setNextStoreLeader(false)}>Approve</Button>
                <Button onClick={() => setNextStoreLeader(false)}>Deny</Button>
            </div>
        </Modal>
    );
}

export default NextStoreLeader;