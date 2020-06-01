import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="container">
        <h1>Hello, world!</h1>
           <p>Welcome to <u>Legislation: The Game</u>.</p>

            <p> Here are the rules:</p>
        <ul>
          <li>Each player draws 4 red cards.</li>
                <li>One turn consists of placing two blue cards on the bill.</li>
                <li>Each player votes Aye (Yes) / Nay (No).</li>
                <li>If the bill passes, laws are adjusted with the blue cards on the bill.</li>
                <li>If a player's red cards clue match blue cards in law, they win.</li>
                <li>If not, start a new turn.</li>
        </ul>
            <p>See the <a href="https://drive.google.com/open?id=1YzTyB1bk9w3g2N3w8ynV0mFpjfjVtyRlQZk9rHHNZUQ">complete rulebook</a>.</p>
            <p>This game has been tested in Chrome, Firefox and Edge. Results not garaunteed in other browsers.</p>
      </div>
    );
  }
}
