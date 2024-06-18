import io from "./socket";
import { chooseNextStoreLeader, resetVoting, sortByDates, votingIsDone } from "./utils/socket_utils";
import { Game } from "./utils/game_utils";

let game: Game;

io.on('connection', socket => {
    // if (socket.recovered) {
    //     // recovery was successful: socket.id, socket.rooms and socket.data were restored
    // } else {
    //     // new or unrecoverable session
    // }

    socket.on('send-name', name => {
        socket.data.name = name;
    });


    socket.on('join-room', (roomCode) => {
        socket.join(roomCode);
        socket.to(roomCode).emit('user-was-added', {    
            name: socket.data.name, 
            socketId: socket.id
        });
        socket.data.hand = [];
    });

    socket.on('leave-room', (roomCode) => {
        socket.leave(roomCode);
        socket.to(roomCode).emit('user-was-removed', socket.id);
    });

    socket.on('get-players', async (roomCode, sendPlayerInfo) => {

        let playerSockets = await io.in(roomCode).fetchSockets();

        sendPlayerInfo (playerSockets.map((playerSocket) => {
            return {
                name: playerSocket.data.name,
                socketId: playerSocket.id
            }
        }));
    });

    socket.on('remove-user', (socketId, roomCode) => {
        socket.to(socketId).emit('ask-to-leave', roomCode);
    });

    socket.on('send-last-visit', async lastVisitDate => {
        socket.data.lastVisit = lastVisitDate;
        socket.data.voted = true;

        let roomId = [...socket.rooms].filter(room => room !== socket.id)[0];

        let playerSockets = await io.in(roomId).fetchSockets();

        if(!votingIsDone(playerSockets)) {
            return
        }

        let nextStoreLeader = chooseNextStoreLeader(playerSockets);

        game.updateStoreLeader(-1, nextStoreLeader.socketId);

        socket.to(nextStoreLeader.socketId).emit('set-store-leader', 'current');

        // send people to player or store page
        io.in(roomId).except(nextStoreLeader.socketId).emit('navigate-to', '/player');
        io.to(nextStoreLeader.socketId).emit('navigate-to', '/store-leader');

        resetVoting(playerSockets);

    });

    socket.on('start-game', async (roomCode) => {
        game = new Game(await io.in(roomCode).fetchSockets());

        io.in(roomCode).emit('navigate-to', '/trader-joes');
    });
})



/*
function computeUserIdFromHeaders(headers) {
    // to be implemented
}

io.on("connection", async (socket) => {
    const userId = await computeUserIdFromHeaders(socket.handshake.headers);

    socket.join(userId);

    // and then later
    io.to(userId).emit("hi");
});

*/


/*
Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the auth payload).
*/