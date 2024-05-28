import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Player from './pages/Player/Player';
import CrewMember from './pages/CrewMemeber/CrewMember';
import StoreLeader from './pages/StoreLeader/StoreLeader';
import TraderJoesForm from './pages/TraderJoesForm/TraderJoesForm';
import Rules from './pages/Rules/Rules';
import Name from './components/Name/Name';
import { useEffect, useState } from 'react';
import socket from './socket';
import './App.scss';

function App() {
    const [ isRoomOwner, setIsRoomOwner ] = useState<boolean>(sessionStorage.getItem('isRoomOwner') === 'true' || false);
    const [ userName, setUserName ] = useState<string>(localStorage.getItem('name') || "");

    useEffect(() => {
        function onConnect() {

        }

        function onDisconnect() {
            // sessionStorage.setItem('isRoomOwner', JSON.stringify(false));
            // setIsRoomOwner(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        // on the client side: socket.emit('send-message', message, room);
        // on the server side: 
        // socket.on('send-message', (message, room) => {
        //    socket.to(room).emit('receive-message', message);
        //}
        // on client side: socket.on("receive-message", message => {
        //    do thing
        //})

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
              <Route path="/room/:roomCode" element={ <Room isRoomOwner={isRoomOwner} setIsRoomOwner={setIsRoomOwner} userName={userName} /> } />
              <Route path="/player" element={ <Player /> } />
              <Route path="/crew-member" element={ <CrewMember /> } />
              <Route path="/store-leader" element={ <StoreLeader /> } />
              <Route path="/trader-joes" element={ <TraderJoesForm /> } />
          </Routes>
          {!userName && (<Name setUserName={setUserName} />)}
      </BrowserRouter>
    );
}

export default App;
