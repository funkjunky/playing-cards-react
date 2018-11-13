import React from 'react';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className='App-header'>
          <h1>Card Dealer</h1>
          <h2>This app shuffles and draws cards from a deck.</h2>
          <p>The cards start ordered.</p>
          <p>Hit the 'shuffle' button to randomize the cards.</p>
          <p>Click either the 'draw' button, or the top of the deck to draw a card</p>
        </header>
      </div>
    );
  }
}

export default App;
