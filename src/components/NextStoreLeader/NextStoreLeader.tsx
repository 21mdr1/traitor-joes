import Button from '../Button/Button';
import './NextStoreLeader.scss';

function NextStoreLeader() {

    const leader = 'Ben'

    return (
        <div className='next-leader'>
            <h1 className="next-leader__title">{leader} will be the next Store Leader</h1>
            <p className="next-leader__text">{leader} will get to choose this shift's team and items to shelf. If you deny 3 store leades in a row, one good item will be turned into a Rotten item.</p>

            <Button>Approve</Button>
            <Button>Deny</Button>
        </div>
    );
}

export default NextStoreLeader;