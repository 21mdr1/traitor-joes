import './DecisionBanner.scss';
import Modal from '../Modal/Modal';
import { useSocketContext } from '../socket_context/context';
import { useEffect, useState } from 'react';
import { getStoreLeader } from '../../sockets/emit';
import { player } from '../../utils/types';

function DecisionBanner() {

    const { value } = useSocketContext();
    const { leaderDecided } = value;
    const [ leader, setLeader ] = useState<player>({ name: '', socketId: '' });
    const [ denials, setDenials ] = useState(0);

    useEffect(() => {
        if (leaderDecided === 'decided') {
            getStoreLeader(setLeader);
        }
    }, [ setLeader ]);


    return (
        <Modal className='decision-banner'>
                { leaderDecided === 'decided' ? (
                    <p className='decision-banner__text'>
                        { leader.name } was chosen as the Store Leader.
                    </p>
                    ) : (
                    <p className='decision-banner__text'>
                        { leader.name } was not approved to be the Store Leader. You have denied store leaders { denials } time { denials !== 1 && 's' }. If you deny 3 store leades in a row, one good item will be turned into a Rotten item.
                    </p>
                )} 
        </Modal>
    );
}

export default DecisionBanner;