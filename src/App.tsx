import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import CrewMember from './pages/CrewMemeber/CrewMember';
import StoreLeader from './pages/StoreLeader/StoreLeader';
import TraderJoesForm from './pages/TraderJoesForm/TraderJoesForm';
import Rules from './pages/Rules/Rules';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/rules" element={ <Rules /> } />
        <Route path="/room/:roomCode" element={ <Room /> } />
        <Route path="/crew-member" element={ <CrewMember /> } />
        <Route path="/store-leader" element={ <StoreLeader /> } />
        <Route path="/trader-joes" element={ <TraderJoesForm /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
