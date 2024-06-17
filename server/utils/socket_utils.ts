import io from "../socket";
import { IsocketWithDates, player } from "./types"

async function getListOfSocketData(roomCode: string): Promise<player[]> {
    let sockets = await io.in(roomCode).fetchSockets();

    return sockets.map((socketInst) => {
        return {
            socketId: socketInst.id,
            ...socketInst.data
        }
    });
}


function sortByDates(a: IsocketWithDates, b: IsocketWithDates): number {
    if (Number(a.date[0]) > Number(b.date[0])) {
        return -1
    } else if (Number(a.date[0]) < Number(b.date[0])) {
        return 1
    }
  
    if (Number(a.date[1]) > Number(b.date[1])) {
        return -1
    } else if (Number(a.date[1]) < Number(b.date[1])) {
        return 1
    }

    if (Number(a.date[2]) > Number(b.date[2])) {
        return -1
    } else if (Number(a.date[2]) < Number(b.date[2])) {
        return 1
    }
      
    return 0
}

export { sortByDates, getListOfSocketData }