import { roleCard, gameCard } from "./types";
class GameDeck {
    private deck: gameCard[];
    private discard: gameCard[];

    constructor() {

        this.deck = [];
        this.discard = [];

        this.reset();
        this.shuffle();

    }

    reset(): void {
        this.discard = [];

        this.deck = 
            Array<gameCard>(37).fill('bagel')
            .concat(Array<gameCard>(12).fill('butter'))
            .concat(Array<gameCard>(3).fill('cheddar'))
            .concat(Array<gameCard>(52).fill('rotten'));
    }

    shuffle(): void {
        let deckLength = this.deck.length;

        for (let i = 0; i < deckLength; i++) {
            let j = Math.floor(Math.random() * deckLength);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp
        }
    }

    deal(): gameCard {
        return this.deck.pop() || '';
    }

    isEmpty(): boolean {
        return this.deck.length == 0;
    }

    gameIsOver(): boolean {
        return this.deck.length == 0 && this.discard.length == 0;
    }

    reuseDiscardPile(): void {
        this.deck = [ ...this.discard ];
        this.discard = [];

        this.shuffle();
    }
}


class RoleDeck {
    private deck: roleCard[];

    constructor(numOfCards: number) {
        this.deck = [];

        this.reset(numOfCards);
        this.shuffle();
    }

    reset(numOfCards: number): void {
        this.deck = [];

        switch(numOfCards) {
            case 5:
                this.deck.concat(Array<roleCard>(3).fill('average'))
                this.deck.concat(Array<roleCard>(2).fill('traitor'))
                break
            case 6:
                this.deck.concat(Array<roleCard>(4).fill('average'))
                this.deck.concat(Array<roleCard>(2).fill('traitor'))
                break
            case 7:
                this.deck.concat(Array<roleCard>(4).fill('average'))
                this.deck.concat(Array<roleCard>(3).fill('traitor'))
                break
            case 8:
                this.deck.concat(Array<roleCard>(5).fill('average'))
                this.deck.concat(Array<roleCard>(3).fill('traitor'))
                break
            case 9:
                this.deck.concat(Array<roleCard>(5).fill('average'))
                this.deck.concat(Array<roleCard>(4).fill('traitor'))
                break
            case 10:
                this.deck.concat(Array<roleCard>(6).fill('average'))
                this.deck.concat(Array<roleCard>(4).fill('traitor'))
                break
            default:
                return
        }

    }

    shuffle(): void {
        let deckLength = this.deck.length;

        for (let i = 0; i < deckLength; i++) {
            let j = Math.floor(Math.random() * deckLength);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp
        }
    }

    deal(): roleCard {

        return this.deck.pop() || '';

    }

    isEmpty(): boolean {
        return this.deck.length == 0;
    }
}


export { GameDeck, RoleDeck }