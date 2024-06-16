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
    hand: string[];
    role: string;
    leader: string;
}

type socketContextSetter = React.Dispatch<React.SetStateAction<ISocketContextValue>>;

interface IContext {
    value: ISocketContextValue;
    setValue: socketContextSetter;
}

export type { player, ISocketContextValue, socketContextSetter, IContext };