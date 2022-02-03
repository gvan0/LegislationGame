import React, { Component } from 'react';
import Issue from '../Issues/Issue.js';
import './Law.css';

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        this.currentBillSize = this.currentBillSize.bind(this);
    }

    currentBillSize(abs) {
        var billScores = this.props.ActiveLaw.map(item => item.score);
        if (abs)
            billScores = billScores.map(item => Math.abs(item));
        return billScores.reduce((total, num) => total + num, 0);
    }

    render() {
        var getlaws = this.props.ActiveLaw;
        return (
            <div id="LAWS" className='page-header'>
                <h1>ACTIVE LAWS</h1>
                <ol className='activeLaws'>
                    {getlaws.map(item =>
                        <Issue key={item.game_LawID} issue={item.issueID} score={item.score} ></Issue>
                    )}
                </ol>
                <p>Law size: {this.currentBillSize(true)}<br />Law cost: {this.currentBillSize(false)}</p>
            </div>
        );
}
}