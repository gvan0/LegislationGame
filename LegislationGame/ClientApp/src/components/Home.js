import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                    <h1>Welcome to <u>Legislation: The Game</u>!</h1>
                    <p>Please note this game is in pre-alpha and provided as is. Changes will be made based on availability and player feedback.</p>
                    <p>Loss of data may occur without notice, though we will communicate any changes in advance.</p>
                    <p>For more information and to stay up to date, please visit and follow <a href="https://www.legislationthegame.com/">the blog</a>.</p>
                    <p>This site uses cookies to identify users and hosted games.</p>
                    <p>This game has been tested in Chrome, Firefox and Edge. Results not guaraunteed in other browsers. Online interactions are not moderated.</p>
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Guided Play</h4>
                        </div>
                        <div className="card-body">
                            <ul>
                                <li>
                                    <a href="/Host">Create a game</a>
                                </li>
                                <li>
                                    <a href="/Game">Join a game</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Manual Play</h4>
                        </div>
                        <div className="card-body">
                            <ol>
                                <li>
                                    <a href="/TestBoard">Load the board on your big screen</a>
                                </li>
                                <li>
                                    <a href="/TestHand">Load the hand builder on your small screens</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
