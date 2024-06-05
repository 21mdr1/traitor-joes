interface player {
    name: string;
    socketId: string;
}

interface ISocketContextValue {
    queueLength: number;
    positionInLine: number;
    isRoomOwner: boolean;
    userName: string;
    socketId: string;
    roomCode: string;
    players: player[];
}

export type { player, ISocketContextValue};