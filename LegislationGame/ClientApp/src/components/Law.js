import React, { Component } from 'react';
import Issue from './Issue.js';
import './Law.css';

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        if (props === undefined || props.ActiveLaw === undefined) {
            var seedLaws = [];
            for (var x = 0; x < props.size; x++) {
                seedLaws[x] = new Issue({ issue:x+1, score:0});
            }
            this.state = { Laws: seedLaws };
        } else {
            this.state = {
                Laws: (props === undefined ? [] : props.ActiveLaw.state.Laws)
            };
        }
    }

    render() {
        return (
            <div id="LAWS" className='page-header'>
                <h1>ACTIVE LAWS</h1>
                <ul className='activeLaws'>
                    {this.state.Laws.map(item =>
                        <Issue key={item.state.issue} issue={item.state.issue} score ={item.state.score} ></Issue>
                    )}
                </ul>
            </div>
        );
}
}