import io from "../socket";
import { IsocketWithDates, player, playerSocket } from "./types"

function convertSocketToPlayer(socket: playerSocket): player {
    let player = {
        socketId: socket.id,
        ...socket.data
    }

    return player;
}


function votingIsDone(playerSockets: playerSocket[]) {

    playerSockets.forEach(playerSocket => {
        if(!playerSocket.data.voted) {
            return false
        }
    })

    return true;
}

function resetVoting(playerSockets: playerSocket[]) {
    playerSockets.forEach(playerSocket => {
        playerSocket.data.voted = false;
    })
}


function chooseNextStoreLeader(playerSockets: playerSocket[]) {
    let players = playerSockets.map(
        playerSocket => {
            return {
                name: playerSocket.data.name,
                socketId: playerSocket.id,
                date: playerSocket.data.lastVisit,
            }
        }
    );

    players.sort(sortByDates);

    return players[0];
}


function sortByDates(a: IsocketWithDates, b: IsocketWithDates): number {
    if (a.date.year > b.date.year) {
        return -1
    } else if (a.date.year < a.date.year) {
        return 1
    }

    if (a.date.month > b.date.month) {
        return -1
    } else if (a.date.month < a.date.month) {
        return 1
    }

    if (a.date.day > b.date.day) {
        return -1
    } else if (a.date.day < a.date.day) {
        return 1
    }
      
    return 0
}

export { sortByDates, chooseNextStoreLeader, votingIsDone, resetVoting, convertSocketToPlayer }