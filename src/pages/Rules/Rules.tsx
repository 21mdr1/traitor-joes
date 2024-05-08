import './Rules.scss';

function Rules() {
    return (
        <main className='main main--rules'>
            <h1 className='rules__title'>Rules</h1>
            <div className="rules__p">Each round, a Store Leader will pick a number of Crew Members who will send them products. The Store Leader will decide what goes on the shelves, and when the shelves are fully stocked (or all their products are rotten), the game is over!</div>
            <h2 className='rules__subtitle'>Setup</h2>
            <ol className='rules__list'>
                <li className='rules__list-item'>Deal Roles</li>
                <li className='rules__list-item'>Deal 3 cards to all</li>
                <li className='rules__list-item'>The person who has most recently been to a Trader Joe's is the first Store Leader</li>
                <li className='rules__list-item'>The Store Leader chooses the Crew Members</li>
                <li className='rules__list-item'>The first Run Commences</li>
            </ol>
            <h2 className='rules__subtitle'>Tun Sequence</h2>
            <h3 className='rules__small-heading'>Phase 1: If you're a Crew Memeber</h3>
            <ol className='rules__list'>
                <li className='rules__list-item'>If you have 2 or fewer cards, draw 3 cards</li>
                <li className='rules__list-item'>Pick 2 to put in the 'basket'</li>
            </ol>
            <h3 className="rules__small-heading">Phase 2: If you're a Store Leader</h3>
            <ol className='rules__list'>
                <li className="rules__list-item">Add 1 card from your hand to the “basket”</li>
                <li className="rules__list-item">Look at the “basket”</li>
                <li className="rules__list-item">Choose 1 card more than the number of crew members and reveal them. These have made it into the store successfully. (Ex: if there are 4 crew members, 5 cards make it into the store.)</li>
                <li className="rules__list-item">Take the cards you did not let through and place them face down in the discard pile.</li>
            </ol>
            <h3 className="rules__small-heading">Resolution</h3>
            <ol className="rules__list">
                <li className="rules__list-item">Reveal which cards have gone through, and update point totals for each team</li>
                <li className="rules__list-item">For each “Rotten!” that goes through, discard one good card.</li>
                <li className="rules__list-item">If one team has won (reached quota) game ends immediately</li>
                <li className="rules__list-item">In the case of a tie (ie. both teams reaching quota on the same turn) traitors win!</li>
            </ol>
            <h3 className="rules__small-heading">Phase 4: Discussion</h3>
            <ol className="rules__list">
                <li className="rules__list-item">Everyone discusses the result</li>
                <li className="rules__list-item">Store Leader token passes to the right</li>
                <li className="rules__list-item">Players vote on if they want this store leader</li>
                <li className="rules__list-item">If yes, Store Leader chooses Crew Members and turn starts from beginning</li>
                <li className="rules__list-item">If vote fails or ties, pass Store Leader token to the right</li>
                <li className="rules__list-item">Keep voting</li>
            </ol>
        </main>
    );
}

export default Rules;