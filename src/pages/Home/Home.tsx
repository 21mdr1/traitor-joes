import { useState } from 'react';
import './Home.scss';

// type CalculatorProps = {
//     left: number,
//     operator: string,
//     right: number,
// }

function Home() {
    // let [ title, setTitle ] = useState<string>(null);

    /* 
    type RequestState =
        | { status: 'idle' }
        | { status: 'loading' }
        | { status: 'success', data: any }
        | { status: 'error', error: Error };

    const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
    */
    let [ name, setName ] = useState("");

    return (
        <>
            <div>
                <p>What's your name?</p>
                <input />
            </div>
            <div>
                <button>New Game</button>
                <button>Join Game</button>
            </div>
        </>
    );
}

export default Home;
