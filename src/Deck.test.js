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

  describe('draw', () => {
    it('should return the top card of the deck', () => {
      // This assumes the starting cards are the same as pregeneratedCardArray
      const deck = getNewDeck();
      const drawnCard = deck.draw();
      const firstCard = pregeneratedCardArray[0]
      expect(drawnCard).toEqual(firstCard);
    });
  });

  describe('shuffle', () => {
    // mock Math.random
    const standardRandom = Math.random;
    beforeAll(() => {
      // random number well always be 1, so sort well always chose the first value to be larger.
      Object.defineProperty(Math, 'random', { value: () => 1, writable: true });
    });

    it('should cause draw to return a new card', () => {
      const deck = getNewDeck();

      deck.shuffle();
      const drawnCard = deck.draw();
      const firstCard = pregeneratedCardArray[0]
      expect(drawnCard).not.toEqual(firstCard)
    });

    afterAll(() => {
      Object.defineProperty(Math, 'random', { value: standardRandom, writable: true });
    });
  });
});
