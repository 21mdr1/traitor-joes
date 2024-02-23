import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import CrewMember from './pages/CrewMemeber/CrewMember';
import StoreLeader from './pages/StoreLeader/StoreLeader';
import TraderJoesForm from './pages/TraderJoesForm/TraderJoesForm';
import Rules from './pages/Rules/Rules';
import { useEffect, useState } from 'react';
import socket from './socket';
import './App.scss';

function App() {
    const [ socketId, setSocketId ] = useState<string | undefined>("");
    const [ isConnected, setIsConnected ] = useState(socket.connected);
    const [ isRoomOwner, setIsRoomOwner ] = useState(false);
    const [ userName, setUserName ] = useState(""); // will be saved in localStorage

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            setSocketId(socket.id);
            console.log("connected", socket.id);
        }

        //socket.emit('custom-event', 10, 'H1', {a: 'a'});
        //socket.emit()

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, []);

    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Home setIsRoomOwner={setIsRoomOwner} /> } />
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
