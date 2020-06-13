import React, { Component } from 'react';
import Issue from './Issue.js';
import './Law.css';

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        this.state = {
            Laws: (props === undefined ? [] : props.ActiveLaw.state.Laws)
        };
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