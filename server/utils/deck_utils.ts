class GameDeck {
    private deck: string[];
    private discard: string[];

    constructor() {

        this.deck = [];
        this.discard = [];

        this.reset();
        this.shuffle();

    }

    reset() {
        this.discard = [];

        this.deck = 
            Array<string>(37).fill('bagel')
            .concat(Array<string>(12).fill('butter'))
            .concat(Array<string>(3).fill('cheddar'))
            .concat(Array<string>(52).fill('rotten'));
    }

    shuffle() {
        let deckLength = this.deck.length;

        for (let i = 0; i < deckLength; i++) {
            let j = Math.floor(Math.random() * deckLength);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp
        }
    }

    deal() {
        let card = this.deck.pop() || '';

        this.discard.push(card);

        return card;
    }

    isEmpty() {
        return this.deck.length == 0;
    }

    gameIsOver() {
        return this.deck.length == 0 && this.discard.length == 0;
    }

    reuseDiscardPile() {
        this.deck = [ ...this.discard ];
        this.discard = [];

        this.shuffle();
    }
}


class RoleDeck {
    private deck: string[];

    constructor(numOfCards: number) {
        this.deck = [];

        this.reset(numOfCards);
        this.shuffle();
    }

    reset(numOfCards: number) {
        this.deck = [];

        switch(numOfCards) {
            case 5:
                this.deck.concat(Array<string>(3).fill('average'))
                this.deck.concat(Array<string>(2).fill('traitor'))
                break
            case 6:
                this.deck.concat(Array<string>(4).fill('average'))
                this.deck.concat(Array<string>(2).fill('traitor'))
                break
            case 7:
                this.deck.concat(Array<string>(4).fill('average'))
                this.deck.concat(Array<string>(3).fill('traitor'))
                break
            case 8:
                this.deck.concat(Array<string>(5).fill('average'))
                this.deck.concat(Array<string>(3).fill('traitor'))
                break
            case 9:
                this.deck.concat(Array<string>(5).fill('average'))
                this.deck.concat(Array<string>(4).fill('traitor'))
                break
            case 10:
                this.deck.concat(Array<string>(6).fill('average'))
                this.deck.concat(Array<string>(4).fill('traitor'))
                break
            default:
                return
        }

    }

    shuffle() {
        let deckLength = this.deck.length;

        for (let i = 0; i < deckLength; i++) {
            let j = Math.floor(Math.random() * deckLength);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp
        }
    }

    deal() {

        return this.deck.pop();

    }

    isEmpty() {
        return this.deck.length == 0;
    }
}