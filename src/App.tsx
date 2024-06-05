import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocketContext from './components/socket_context/context';
import { useContext } from 'react';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Player from './pages/Player/Player';
import CrewMember from './pages/CrewMemeber/CrewMember';
import StoreLeader from './pages/StoreLeader/StoreLeader';
import TraderJoesForm from './pages/TraderJoesForm/TraderJoesForm';
import Rules from './pages/Rules/Rules';
import Name from './components/Name/Name';
import './App.scss';

function App() {
    const { value } = useContext(SocketContext);
    const userName = value;

    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
}

export default App;
