import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="container">
            <div className="card col-md-3" style={{ width: "25%", float: "right"}}>
                <div className="card-header">
                    <h4 class="card-title">Let's play!</h4>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            <a href="/TestBoard">Load the board on your big screen</a><br />
                        </li>
                        <li>
                            <a href="/TestHand">Load the hand builder on your small screens</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-9">
            <h1>Welcome to <u>Legislation: The Game</u>!</h1>
                <p>Please note this game is in pre-alpha and provided as is. Changes will be made based on availability and player feedback. Loss of data may occur without notice, though we will try to communicate in advance.</p>
                <p>This game has been tested in Chrome, Firefox and Edge. Results not guaraunteed in other browsers. Online interactions are not moderated.</p>
                <p>Last completed maintenance: N/A </p>
                <p>Next scheduled maintenance: TBD </p>
            </div>
        </div>
    );
  }
}
