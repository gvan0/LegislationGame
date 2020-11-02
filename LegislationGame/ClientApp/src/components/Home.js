import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="container">
            <h1>Hello, world!</h1>
            <p>Welcome to <u>Legislation: The Game</u>.</p>

            <p>Please sign in to see your see your game progress and history.</p>
            <p>This game has been tested in Chrome, Firefox and Edge. Results not garaunteed in other browsers. Online interactions are not moderated.</p>
            <p>Next scheduled maintenance: TBD </p>
        </div>
    );
  }
}
