type roleCard = 'average' | 'traitor' | '';
type gameCard = 'bagel' | 'butter' | 'cheddar' | 'rotten' | '';
type storeLeaderStatus = 'no' | 'current' | 'last' | '';

type dateObj = {
    year: number;
    month: number;
    day: number;
}
interface player {
    name: string;
    socketId: string;
    role?: roleCard;
    turn?: string;
    hand?: gameCard[];
}

interface ISocketContextValue {
    isRoomOwner: boolean;
    userName: string;
    socketId: string;
    roomCode: string;
    players: player[];
    hand: gameCard[];
    role: roleCard;
    leader: storeLeaderStatus;
}

type socketContextSetter = React.Dispatch<React.SetStateAction<ISocketContextValue>>;

interface IContext {
    value: ISocketContextValue;
    setValue: socketContextSetter;
}

export type { player, ISocketContextValue, socketContextSetter, IContext, roleCard, gameCard, storeLeaderStatus, dateObj };