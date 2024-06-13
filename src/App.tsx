import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSocketContext } from './components/socket_context/context';
import socket from './sockets/socket';
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Player from './pages/Player/Player';
import CrewMember from './pages/CrewMemeber/CrewMember';
import StoreLeader from './pages/StoreLeader/StoreLeader';
import TraderJoesForm from './pages/TraderJoesForm/TraderJoesForm';
import Rules from './pages/Rules/Rules';
import Name from './components/Name/Name';
import './App.scss';
import { sendName } from './sockets/emit';

let navigate: any = null;

function App() {
    const { value, setValue } = useSocketContext();
    const { userName } = value;
    navigate = useNavigate();

    useEffect(() => {
        socket.connect();
        sendName(userName);
        setValue(state => ({...state, socketId: socket.id || ''}));
    }, [setValue]);

    return (
        <>
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/rules" element={ <Rules /> } />
              <Route path="/room/:roomCode" element={ <Room /> } />
              <Route path="/player" element={ <Player /> } />
              <Route path="/crew-member" element={ <CrewMember /> } />
              <Route path="/store-leader" element={ <StoreLeader /> } />
              <Route path="/trader-joes" element={ <TraderJoesForm /> } />
          </Routes>
          {!userName && (<Name />)}
        </>
    );
}

export default App;
export { navigate };
