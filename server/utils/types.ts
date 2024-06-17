import { RemoteSocket } from "socket.io";
import { DecorateAcknowledgementsWithMultipleResponses } from "socket.io/dist/typed-events";
import { ServerToClientEvents, SocketData } from "../socket";


type roleCard = 'average' | 'traitor' | '';
type gameCard = 'bagel' | 'butter' | 'cheddar' | 'rotten' | '';
type storeLeaderStatus = 'no' | 'current' | 'last' | '';


interface IsocketWithDates {
    date: string[]
}

interface player {
    name: string;
    socketId: string;
    role?: roleCard;
    turn?: string;
    hand?: gameCard[];
}

type playerSocket = RemoteSocket<DecorateAcknowledgementsWithMultipleResponses<ServerToClientEvents>, SocketData>;

export type { IsocketWithDates, player, roleCard, gameCard, playerSocket, storeLeaderStatus };