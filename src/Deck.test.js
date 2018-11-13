import Deck, { generateCardArray, pregeneratedCardArray, getNewDeck } from './Deck';

describe('Deck helpers', () => {
  describe('generateCardArray', () => {
    it('Should return a new array of card objects that is the same as pregeneratedCardArray', () => {
      const cardArray = generateCardArray();
      expect(cardArray).toEqual(pregeneratedCardArray);
    });
  });

  describe('getNewDeck', () => {
    it('Should return a new Deck instance', () => {
      const deck = getNewDeck();
      expect(deck).toBeInstanceOf(Deck);
    });
  });
});

describe('Deck', () => {
  it('starts with 52 cards', () => {
    const deck = getNewDeck();
    expect(deck.length()).toBe(52);
  });

  describe('dealOneCard', () => {
    it('should return the top card of the deck', () => {
      // This assumes the starting cards are the same as pregeneratedCardArray
      const deck = getNewDeck();
      const dealtCard = deck.dealOneCard();
      const firstCard = pregeneratedCardArray[0]
      expect(dealtCard).toEqual(firstCard);
      expect(deck.length()).toBe(pregeneratedCardArray.length - 1);
    });

    it('should not return a new card when the deck is out of cards', () => {
      const deck = getNewDeck();

      // we're using the root array to iterate through all cards, for convinience.
      pregeneratedCardArray.forEach(_ => deck.dealOneCard());

      const dealtCard = deck.dealOneCard();
      expect(dealtCard).toBeUndefined();
    });
  });

  describe('shuffle', () => {
    // mock Math.random
    const standardRandom = Math.random;
    beforeAll(() => {
      // random number well always be 1, so sort well always chose the first value to be larger.
      Object.defineProperty(Math, 'random', { value: () => 1, writable: true });
    });

    it('should cause dealOneCard to return a unique card', () => {
      const deck = getNewDeck();

      deck.shuffle();
      const dealtCard = deck.dealOneCard();
      const firstCard = pregeneratedCardArray[0]
      expect(dealtCard).not.toEqual(firstCard)
    });

    afterAll(() => {
      Object.defineProperty(Math, 'random', { value: standardRandom, writable: true });
    });
  });
});
