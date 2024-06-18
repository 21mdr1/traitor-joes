import io from "./socket";
import { chooseNextStoreLeader, convertSocketToPlayer, resetVoting, sortByDates, votingIsDone } from "./utils/socket_utils";
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

    socket.on('send-last-visit', async (lastVisitDate, roomCode) => {
        socket.data.lastVisit = lastVisitDate;
        socket.data.voted = true;

        let playerSockets = await io.in(roomCode).fetchSockets();

        if(!votingIsDone(playerSockets)) {
            return
        }

        let nextStoreLeader = chooseNextStoreLeader(playerSockets);

        game.updateStoreLeader(-1, nextStoreLeader.socketId);

        socket.to(nextStoreLeader.socketId).emit('set-store-leader', 'potential');

        io.in(roomCode).emit('navigate-to', '/player');

        resetVoting(playerSockets);

    });

    socket.on('start-game', async (roomCode) => {
        game = new Game(await io.in(roomCode).fetchSockets());

        io.in(roomCode).emit('navigate-to', '/trader-joes');
    });

    socket.on('get-store-leader', (callback) => {
        let storeLeaderSocket = game.getStoreLeader();
        
        let storeLeader = convertSocketToPlayer(storeLeaderSocket);

        callback(storeLeader);
    });

    socket.on('approve-store-leader', async (vote, roomCode) => {
        socket.data.voted = true;
        socket.data.vote = vote;

        let playerSockets = await io.in(roomCode).fetchSockets();

        if(!votingIsDone(playerSockets)) {
            return
        }

        let yeses = 0; let nos = 0;

        playerSockets.forEach((playerSocket) => {
            if (playerSocket.data.vote) {
                yeses += 1;
            } else {
                nos += 1;
            }
        })
        
        if (yeses >= nos) {
            let nextStoreLeader = game.getStoreLeader();

            socket.to(nextStoreLeader.id).emit('set-store-leader', 'potential');

            socket.to(nextStoreLeader.id).emit('navigate-to', '/store-leader');

            io.in(roomCode).emit('store-leader-decision', true);

        } else {
            socket.to(game.getStoreLeader().id).emit('set-store-leader', 'no');

            game.updateStoreLeader();
            socket.to(game.getStoreLeader().id).emit('set-store-leader', 'potential');

            io.in(roomCode).emit('store-leader-decision', false);
        }

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