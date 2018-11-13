export const generateCardArray = () =>
  ['spaces', 'hearts', 'diamonds', 'clubs'].map((suit, y) =>
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map((rank, x) =>
      // Note:  the x, y couples this data to the card image.
      //        This is easier, but more restricting on graphics.
      ({ suit, rank, x, y })
    )
  ).flat();

export const pregeneratedCardArray = generateCardArray();

export default class Deck {
  constructor() {
    this.cards = [...pregeneratedCardArray];
  }

  shuffle(times = 1) {
    for(let i=0; i<times; ++i) {
      this.cards.sort((a, b) => Math.random() < 0.5 ? 1 : -1);
    }
  }

  draw() {
    return this.cards.shift();
  }

  length() {
    return this.cards.length
  }
}

export const getNewDeck = () => new Deck();


