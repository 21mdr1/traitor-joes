import { useState, useEffect, SetStateAction, useCallback } from 'react';
import Button from '../Button/Button';
import './NextStoreLeader.scss';
import Modal from '../Modal/Modal';
import { approveStoreLeader, getStoreLeader } from '../../sockets/emit';
import { player } from '../../utils/types';
import { useSocketContext } from '../socket_context/context';

function NextStoreLeader({ setNextStoreLeader }: {
    setNextStoreLeader: React.Dispatch<SetStateAction<boolean>>
}) {

    const socketContext = useSocketContext();

    const [ leader, setLeader ] = useState<player>({name: '', socketId: ''});
    
    useEffect(() => {
        getStoreLeader(setLeader);
    }, [ setLeader ]);

    const vote = useCallback((vote: boolean) => {
        setNextStoreLeader(false);
        approveStoreLeader(vote, socketContext);
    }, [setNextStoreLeader, socketContext]);

    return (
        <Modal className='next-leader'>
            <h1 className="next-leader__title">{leader.name} will be the next Store Leader</h1>

            <p className="next-leader__text">{leader.name} will get to choose this shift's team and items to shelf. If you deny 3 store leades in a row, one good item will be turned into a Rotten item.</p>
            
            <div className='next-leader__buttons'>
                <Button onClick={() => vote(true)}>Approve</Button>
                <Button onClick={() => vote(false)}>Deny</Button>
            </div>
        </Modal>
    );
}

export default NextStoreLeader;