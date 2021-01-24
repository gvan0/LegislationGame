import React, { Component } from 'react';

export class Rules extends Component {
    static displayName = Rules.name;

    render() {
        return (
            <div className="container">
                <h1>Welcome to <u>Legislation: The Game</u>!</h1>

                <p> Here are the simplified rules:</p>
                <ul>
                    <li>Each player draws 4 red cards.</li>
                    <li>One turn consists of placing two blue cards on the bill.</li>
                    <li>Each player votes Aye (Yes) / Nay (No).</li>
                    <li>If the bill passes, laws are adjusted with the blue cards on the bill.</li>
                    <li>If a player's red cards clue match blue cards in law, they win.</li>
                    <li>If not, start a new turn.</li>
                </ul>
                <p>The complete rulebook is available <a href="#">here</a> for offline play. </p>
            </div>
        );
    }
}
