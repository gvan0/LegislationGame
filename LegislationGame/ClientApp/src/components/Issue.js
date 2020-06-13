import React, { Component } from 'react';

export default class Issue extends Component {
    static displayName = Issue.name;

    constructor(props) {
        super(props);
        var iconOptions = ["empty", "fas fa-handshake", "fas fa-balance-scale", "fas fa-book", "fas fa-flag-usa", "fas fa-piggy-bank", "fas fa-dove", "fas fa-baby", "fas fa-bell"];
        this.state = {
            issue: props.issue,
            icon: iconOptions[props.issue],
            score: props.score
        };
        this.scoreAlign = this.scoreAlign.bind(this);
    }

    scoreAlign(ans) {
        var scor = this.state.score;
        if(ans === undefined || scor === 0)
            return (scor === 0);
        if (scor > 0)
            return (scor >= ans);
        else if (scor < 0)
            return (scor <= ans);
        else 
            return (scor === 0);
    }

    render() {
        return (
                <li> <i className={this.state.icon}></i> : {this.props.score}</li>
        );
    }


}