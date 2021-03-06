import React from 'react';
import produce from 'immer';

import { getNewDeck } from './Deck';
import './DeckDrawer.scss';

// TODO:  don't use a sprite sheet for html img tags =x
//        Should either use individual images, or this should be made with canvas.
//        The card width and height are 90 x 135 and it's also in DeckDrawer.scss
const getCardImagePosition = ({ x, y }) =>
  `${-8 + x * -98}px ${-8 + y * -143}px`;

export default class DeckDrawer extends React.Component {
  constructor() {
    super();

    this.deck = getNewDeck();

    this.state = {
      cardsRemaining: this.deck.length(),
      dealtCards: [],
    }
  }

  dealOneCard = () => {
    const dealtCard = this.deck.dealOneCard();
    if (!dealtCard) return;

    // create a new array of drawn cards with the new card pushed.
    const dealtCards = produce(this.state.dealtCards, draftDrawnCards => {
      draftDrawnCards.push(dealtCard);
    });

    this.setState({
      dealtCards,
      cardsRemaining: this.deck.length()
    });
  };

  render = () =>
    <div className="DeckDrawer">
      <p>Cards left: { this.state.cardsRemaining }</p>
      <div>
        <button onClick={ () => this.deck.shuffle() }>Shuffle</button>
        <button onClick={ this.dealOneCard }>Draw</button>
      </div>
      <img src="./cardback.png" alt="card back" onClick={ this.dealOneCard } />
      <div>
        { this.state.dealtCards.map(card =>
          <img
            src="./cardfronts.sheet.png"
            alt={ `${card.rank} of ${card.suit}` }
            className="faceCard"
            style={{ objectPosition: getCardImagePosition(card) }}
            key={ card.rank + card.suit }
          />
        )}
      </div>
    </div>
}
