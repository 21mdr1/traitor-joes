import { GameDeck, RoleDeck } from "./deck_utils";
import { player, playerSocket } from "./types";
import io from "../socket";

class Game {

    private players: playerSocket[];
    private deck: GameDeck;
    private storeLeader: number;
    private lastStoreLeader: number;
    private team: player[];
    private playedCards: string[];
    private averageWinCondition: number = 0;
    private traitorWinCondition: number = 0;

    constructor(players: playerSocket[]) {
        // get players and turn order
        this.players = players;
        this.initWinConditions();

        // make role and game decks and deal out cards
        this.deck = new GameDeck();
        this.doleOutRoles()
        this.initHands();

        // inits for later in the game
        this.storeLeader = -1;
        this.lastStoreLeader = -1;
        this.team = [];
        this.playedCards = [];
    }

    initWinConditions() {
        switch (this.numberOfPlayers()) {
            case 5:
            case 6:
                this.averageWinCondition = 20;
                this.traitorWinCondition = 7;
                break;
            case 7:
            case 8:
                this.averageWinCondition = 30;
                this.traitorWinCondition = 11;
                break;
            case 9:
            case 10:
                this.averageWinCondition = 40;
                this.traitorWinCondition = 15;
                break;
            default:
                this.averageWinCondition = 0;
                this.traitorWinCondition = 0;
        }
    }

    doleOutRoles() {
        let roles = new RoleDeck(this.numberOfPlayers());

        this.players.forEach((player) => {
            let role = roles.deal();
            player.data.role = role;
            io.to(player.id).emit('send-role', role);
        })
    }

    initHands() {
        this.players.forEach((player) => {
            this.deal(player);
        })
    }

    deal(player: playerSocket) {
        for(let i = 0; i < 3; i++) {
            let card = this.deck.deal();
            player.data.hand.push(card);
        }

        io.to(player.id).emit('send-hand', player.data.hand);
    }

    nextTurn() {

    }

    updateStoreLeader(storeLeader?: number, playerSocketId?: string) {
        this.lastStoreLeader = this.storeLeader;

        if(storeLeader && storeLeader >= 0) {
            this.storeLeader = storeLeader;
        } else if(playerSocketId) {

            for(let i = 0; i < this.numberOfPlayers(); i++) {
                if(this.players[i].id === playerSocketId) {
                    this.storeLeader = i;
                    break;
                }
            }
        } else {
            this.storeLeader = (this.storeLeader + 1) % this.numberOfPlayers()
        }
    }

    getStoreLeader() {
        return this.players[this.storeLeader];
    }

    numberOfPlayers() {
        return this.players.length;
    }
}

export { Game };