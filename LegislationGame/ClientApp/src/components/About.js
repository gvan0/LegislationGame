import React, { Component } from 'react';

export class About extends Component {
    static displayName = About.name;

    render() {
        return (
            <div className="container">
                <h1>About <u>Legislation: The Game</u></h1>

                <p>Legislation: The Game is a social deduction game with some extra layers of complication:</p>
                <ul>
                    <li>
                        Players have no inherent moralism about their side beyond a desire to score points.
                    </li>
                    <li>
                        Players can belong to multiple "teams". They may side with one person at one time, but against them at another.
                    </li>
                </ul>
                <p>This is less about political debates and more about the inherent difficulties of writing laws.</p>
                <p>We encourage its use in the classroom as a teaching tool. A teacher's guide is available in <a href="#">the rulebook</a>.</p>
            </div>
        );
    }
}
